/**
 * CRMos REST API & Bi-directionele Integratie Client
 * Volledige bi-directionele integratie (lezen én schrijven) voor AI agents en VVC platform.
 * 
 * Voldoet aan de universele ecosysteem-spelregels:
 * - Base URL: https://crmos.one/api/v1 (of lokaal http://localhost:5173/api/v1)
 * - Header: X-CRMOS-API-KEY: crm_live_vvc_verdienende_vrienden_club_2026 (of Master Key)
 * - Header: Content-Type: application/json
 */

export const CRMOS_API_KEYS = {
  MASTER: "crm_live_master_jamaldrenthe_2026_all_ecosystem",
  VVC: "crm_live_vvc_verdienende_vrienden_club_2026",
  SPONTIVA: "crm_live_spontiva_recruitment_2026",
  BOOSTPLUG: "crm_live_boostplug_energy_iot_2026",
  QUANTUM_INITIUM: "crm_live_quantum_initium_enterprise_2026",
  IMMIGRATIEPUNT: "crm_live_immigratiepunt_portal_2026",
  WONINGVRY: "crm_live_woningvry_realestate_2026",
  DJOBBA_WORKS: "crm_live_djobba_works_freelance_2026",
  TRUSTING_WORK: "crm_live_trusting_work_staffing_2026",
  LOGS_RENT: "crm_live_logs_rent_logistics_2026",
  ZHEAVENZY: "crm_live_zheavenzy_atelier_2026",
  XABI_WORLD: "crm_live_xabi_world_international_2026",
  CRMOS: "crm_live_crmos_core_platform_2026",
} as const;

export interface CRMosContact {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  company_tags?: string[];
  tags?: string[];
  notes?: string;
  status?: "lead" | "qualified" | "customer" | "partner" | "inactive";
  custom_fields?: Record<string, any>;
}

export interface CRMosDeal {
  id?: string;
  name: string;
  value: number;
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
  company_name: string;
  contact_id?: string;
  contact_email?: string;
  probability?: number;
  notes?: string;
}

export interface CRMosActivity {
  id?: string;
  contact_id: string;
  type: "call" | "email" | "meeting" | "note" | "task";
  title: string;
  description: string;
  performed_by?: string;
}

export interface CRMosCandidate {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role_applied?: string;
  deal_model?: "no_cure_no_pay" | "fixed" | "freelance";
  company?: string;
  tags?: string[];
  skills?: string[];
  experience_years?: number;
  location?: string;
  notes?: string;
}

export interface CRMosWebhookRegistration {
  company: string;
  url: string;
  events: Array<"candidate.placed" | "deal.won" | "contact.upserted">;
  secret?: string;
}

let cachedBridgeToken: string | null = null;
let tokenExpiresAt = 0;

export async function getCrmosBridgeToken(): Promise<string | null> {
  const now = Date.now();
  if (cachedBridgeToken && now < tokenExpiresAt - 60000) {
    return cachedBridgeToken;
  }

  try {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsBPKp7i7Cd959bF8hZzTDtV_V_7cI9Xo",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "vvc-sync-test@crmos.one",
          password: "VvcSyncTest2026!",
          returnSecureToken: true,
        }),
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    cachedBridgeToken = data.idToken;
    tokenExpiresAt = now + (parseInt(data.expiresIn || "3600", 10) * 1000);
    return cachedBridgeToken;
  } catch (err) {
    console.warn("CRMos bridge auth notice:", err);
    return null;
  }
}

export class CRMosClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(
    baseUrl: string = "https://crmos.one/api/v1",
    apiKey: string = CRMOS_API_KEYS.VVC
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.apiKey = apiKey;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    const token = await getCrmosBridgeToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : { "X-CRMOS-API-KEY": this.apiKey }),
      ...(options.headers as Record<string, string> || {}),
    };

    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      throw new Error(`CRMos API Error [${res.status} ${res.statusText}]: ${errBody}`);
    }

    return res.json() as Promise<T>;
  }

  // 1. HEALTH & CONNECTIVITEIT
  async health(): Promise<{ status: string }> {
    return this.request<{ status: string }>("/health");
  }

  // 2. ZOEKEN & LEZEN
  async search(query: string) {
    return this.request<{ success: boolean; data: any }>(`/search?q=${encodeURIComponent(query)}`);
  }

  async getContacts(params?: { q?: string; email?: string; company_tag?: string; tag?: string }) {
    const sp = new URLSearchParams();
    if (params?.q) sp.append("q", params.q);
    if (params?.email) sp.append("email", params.email);
    if (params?.company_tag) sp.append("company_tag", params.company_tag);
    if (params?.tag) sp.append("tag", params.tag);
    const qs = sp.toString() ? `?${sp.toString()}` : "";
    return this.request<{ success: boolean; data: CRMosContact[] }>(`/contacts${qs}`);
  }

  async getContactById(id: string) {
    return this.request<{ success: boolean; data: CRMosContact }>(`/contacts/${encodeURIComponent(id)}`);
  }

  async lookupVvcTag(tag: string) {
    return this.request<{ success: boolean; data: any }>(`/vvc/lookup?tag=${encodeURIComponent(tag)}`);
  }

  async getTeams() {
    return this.request<{ success: boolean; data: any[] }>(`/teams`);
  }

  async getCompanies() {
    return this.request<{ success: boolean; data: any[] }>(`/companies`);
  }

  async getDeals(company?: string) {
    const qs = company ? `?company=${encodeURIComponent(company)}` : "";
    return this.request<{ success: boolean; data: CRMosDeal[] }>(`/deals${qs}`);
  }

  async getCandidates() {
    return this.request<{ success: boolean; data: CRMosCandidate[] }>(`/candidates`);
  }

  // 3. SCHRIJVEN & VERRIJKEN
  async upsertContact(contact: CRMosContact) {
    return this.request<{ success: boolean; data: CRMosContact }>("/contacts/upsert", {
      method: "POST",
      body: JSON.stringify(contact),
    });
  }

  async createContact(contact: CRMosContact) {
    return this.request<{ success: boolean; data: CRMosContact }>("/contacts", {
      method: "POST",
      body: JSON.stringify(contact),
    });
  }

  async updateContact(id: string, updates: Partial<CRMosContact>) {
    return this.request<{ success: boolean; data: CRMosContact }>(`/contacts/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  }

  async createDeal(deal: CRMosDeal) {
    return this.request<{ success: boolean; data: CRMosDeal }>("/deals", {
      method: "POST",
      body: JSON.stringify(deal),
    });
  }

  async logActivity(activity: CRMosActivity) {
    return this.request<{ success: boolean; data: CRMosActivity }>("/activities", {
      method: "POST",
      body: JSON.stringify(activity),
    });
  }

  async createCandidate(candidate: CRMosCandidate) {
    return this.request<{ success: boolean; data: CRMosCandidate }>("/candidates", {
      method: "POST",
      body: JSON.stringify(candidate),
    });
  }

  // 4. WEBHOOK REGISTRATIE
  async registerWebhook(webhook: CRMosWebhookRegistration) {
    return this.request<{ success: boolean; message: string }>("/webhooks", {
      method: "POST",
      body: JSON.stringify(webhook),
    });
  }
}

export const crmos = new CRMosClient();
