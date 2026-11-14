import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type Unsubscribe,
} from "firebase/firestore"
import { getFirebaseFirestore } from "@/lib/firebase.client"
import { crmos } from "./crmosRest.client"

export interface Candidate {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  postalCode?: string
  houseNumber?: string
  age?: string
  companyName?: string
  kvk?: string
  partnerId?: string | null
  partnerEmail?: string
  partnerName?: string
  partnerCode?: string | null
  hours?: number
  placements?: number
  referrals?: number
  refValue?: number
  basisIncome?: number
  bonusIncome?: number
  passiveMonthly?: number
  grandTotal?: number
  grandAnnual?: number
  verified?: boolean
  cvName?: string
  status: "nieuw" | "screening" | "voorgesteld" | "geplaatst"
  stage: "Contact Gelegd" | "Double Team Pilot" | "Kwalificatie (Storting)" | "Plaatsing Behaald"
  source?: string
  notes?: string
  createdAt?: any
  updatedAt?: any
}

// Map pipeline stage to CRMos status
function mapStageToStatus(stage: Candidate["stage"]): Candidate["status"] {
  switch (stage) {
    case "Plaatsing Behaald":
      return "geplaatst"
    case "Kwalificatie (Storting)":
      return "voorgesteld"
    case "Double Team Pilot":
      return "screening"
    case "Contact Gelegd":
    default:
      return "nieuw"
  }
}

function mergeCandidateLists(...lists: Candidate[][]): Candidate[] {
  const map = new Map<string, Candidate>();
  for (const list of lists) {
    for (const item of list) {
      if (!item) continue;
      const key = (item.email && item.email.trim().toLowerCase()) || item.id;
      if (!key) continue;
      if (map.has(key)) {
        map.set(key, { ...map.get(key)!, ...item });
      } else {
        map.set(key, item);
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timeB - timeA;
  });
}

function getLocalCandidates(): Candidate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("vvc_pitch_candidates");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((c: any) => ({
          id: c.id || `local_${c.email}`,
          firstName: c.firstName || "Kandidaat",
          lastName: c.lastName || "",
          fullName: `${c.firstName || ""} ${c.lastName || ""}`.trim() || "Kandidaat",
          email: c.email || "",
          phone: c.phone || "",
          postalCode: c.postalCode,
          houseNumber: c.houseNumber,
          age: c.age,
          companyName: c.companyName,
          kvk: c.kvk,
          partnerId: c.partnerId,
          partnerEmail: c.partnerEmail,
          partnerName: c.partnerName,
          partnerCode: c.partnerCode,
          hours: Number(c.hours) || 0,
          placements: Number(c.placements) || 0,
          referrals: Number(c.referrals) || 0,
          refValue: Number(c.refValue) || 25,
          basisIncome: Number(c.basisIncome) || 0,
          bonusIncome: Number(c.bonusIncome) || 0,
          passiveMonthly: Number(c.passiveMonthly) || 0,
          grandTotal: Number(c.grandTotal) || 0,
          grandAnnual: Number(c.grandAnnual) || 0,
          verified: Boolean(c.verified),
          cvName: c.cvName,
          status: c.status || "nieuw",
          stage: c.stage || "Contact Gelegd",
          source: c.source || "pitchtool",
          notes: c.notes,
          createdAt: c.savedAt || new Date().toISOString(),
        }))
      : [];
  } catch {
    return [];
  }
}

/**
 * Abonneert op realtime kandidaten uit vvc-dev Firestore en CRMos REST met bi-directionele updates
 */
export function subscribeCandidates(
  callback: (candidates: Candidate[]) => void,
  partnerEmailOrCode?: string
): () => void {
  let unsubscribeFirestore: Unsubscribe | null = null;
  let isCancelled = false;

  let firestoreCandidates: Candidate[] = [];
  let crmosCandidates: Candidate[] = [];
  let localCandidates: Candidate[] = getLocalCandidates();

  const filterForPartner = (items: Candidate[]): Candidate[] => {
    if (!partnerEmailOrCode) return items;
    const lowerFilter = partnerEmailOrCode.toLowerCase();
    return items.filter((data) => {
      if (!data.partnerEmail || data.partnerEmail === "organisch" || data.partnerEmail === "direct") {
        return true;
      }
      return (
        data.partnerEmail.toLowerCase() === lowerFilter ||
        data.partnerCode?.toLowerCase() === lowerFilter
      );
    });
  };

  const emit = () => {
    if (isCancelled) return;
    const merged = mergeCandidateLists(localCandidates, crmosCandidates, firestoreCandidates);
    callback(filterForPartner(merged));
  };

  // 1. Direct lokale kandidaten emitten
  emit();

  // 2. Ophalen uit CRMos Contacts API
  const fetchCrmosContacts = async () => {
      const queryTag = partnerEmailOrCode
        ? `#partner:${partnerEmailOrCode.toLowerCase()}`
        : "#vvc";
      const res = await crmos.getContacts({ tag: queryTag });
      if (res && res.data && Array.isArray(res.data)) {
        crmosCandidates = res.data.map((c: any) => {
          const cf = c.custom_fields || {};
          let stage: Candidate["stage"] = "Contact Gelegd";
          if (cf.stage === "Double Team Pilot" || c.status === "qualified") {
            stage = "Double Team Pilot";
          } else if (cf.stage === "Kwalificatie (Storting)") {
            stage = "Kwalificatie (Storting)";
          } else if (cf.stage === "Plaatsing Behaald" || c.status === "customer") {
            stage = "Plaatsing Behaald";
          }

          return {
            id: cf.firestore_candidate_id || c.id || `crmos_${c.email}`,
            firstName: c.first_name || "Kandidaat",
            lastName: c.last_name || "",
            fullName: `${c.first_name || ""} ${c.last_name || ""}`.trim() || "Kandidaat",
            email: c.email || "",
            phone: c.phone || "",
            postalCode: cf.postal_code,
            houseNumber: cf.house_number,
            age: cf.age,
            companyName: c.company,
            kvk: cf.kvk,
            partnerId: cf.partner_id,
            partnerEmail: cf.partner_email,
            partnerName: cf.partner_name,
            partnerCode: cf.partner_code,
            hours: Number(cf.hours) || 0,
            placements: Number(cf.placements) || 0,
            referrals: Number(cf.referrals) || 0,
            refValue: Number(cf.ref_value) || 25,
            basisIncome: Number(cf.basis_income) || 0,
            bonusIncome: Number(cf.bonus_income) || 0,
            passiveMonthly: Number(cf.passive_monthly) || 0,
            grandTotal: Number(cf.monthly_goal) || 0,
            grandAnnual: Number(cf.annual_goal) || 0,
            verified: Boolean(cf.voice_verified),
            cvName: cf.cv_name,
            status: mapStageToStatus(stage),
            stage,
            source: "pitchtool",
            notes: c.notes,
            createdAt: cf.submitted_at || new Date().toISOString(),
          };
        });
        emit();
      }
    } catch (err) {
      console.warn("CRMos candidates fetch notice:", err);
    }
  };

  fetchCrmosContacts();
  const crmosInterval = setInterval(fetchCrmosContacts, 15000);

  // 3. Firestore snapshot realtime listener
  getFirebaseFirestore()
    .then((db) => {
      if (isCancelled) return;
      const candidatesRef = collection(db, "candidates");
      const q = query(candidatesRef, orderBy("createdAt", "desc"));

      unsubscribeFirestore = onSnapshot(
        q,
        (snapshot) => {
          const items: Candidate[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();

            let stage: Candidate["stage"] = "Contact Gelegd";
            if (data.stage === "Double Team Pilot" || data.status === "screening") {
              stage = "Double Team Pilot";
            } else if (data.stage === "Kwalificatie (Storting)" || data.status === "voorgesteld") {
              stage = "Kwalificatie (Storting)";
            } else if (data.stage === "Plaatsing Behaald" || data.status === "geplaatst") {
              stage = "Plaatsing Behaald";
            }

            items.push({
              id: docSnap.id,
              firstName: data.firstName || data.fullName?.split(" ")[0] || "Kandidaat",
              lastName: data.lastName || data.fullName?.split(" ").slice(1).join(" ") || "",
              fullName: data.fullName || `${data.firstName || ""} ${data.lastName || ""}`.trim() || "Kandidaat",
              email: data.email || "",
              phone: data.phone || "",
              postalCode: data.postalCode,
              houseNumber: data.houseNumber,
              age: data.age,
              companyName: data.companyName,
              kvk: data.kvk,
              partnerId: data.partnerId,
              partnerEmail: data.partnerEmail,
              partnerName: data.partnerName,
              partnerCode: data.partnerCode,
              hours: Number(data.hours) || 0,
              placements: Number(data.placements) || 0,
              referrals: Number(data.referrals) || 0,
              refValue: Number(data.refValue) || 25,
              basisIncome: Number(data.basisIncome) || 0,
              bonusIncome: Number(data.bonusIncome) || 0,
              passiveMonthly: Number(data.passiveMonthly) || 0,
              grandTotal: Number(data.grandTotal) || 0,
              grandAnnual: Number(data.grandAnnual) || 0,
              verified: Boolean(data.verified),
              cvName: data.cvName,
              status: data.status || mapStageToStatus(stage),
              stage,
              source: data.source || "pitchtool",
              notes: data.notes,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            });
          });

          firestoreCandidates = items;
          emit();
        },
        (error) => {
          console.warn("Firestore candidates onSnapshot notice:", error);
        }
      );
    })
    .catch((err) => {
      console.warn("Firebase Firestore init notice:", err);
    });

  return () => {
    isCancelled = true;
    clearInterval(crmosInterval);
    if (unsubscribeFirestore) {
      unsubscribeFirestore();
    }
  };
}

/**
 * Update candidate stage in Firestore en CRMos
 */
export async function updateCandidateStage(
  id: string,
  stage: Candidate["stage"]
): Promise<void> {
  const status = mapStageToStatus(stage)
  try {
    const db = await getFirebaseFirestore()
    const candRef = doc(db, "candidates", id)
    await updateDoc(candRef, {
      stage,
      status,
      updatedAt: serverTimestamp(),
    })
  } catch (err) {
    console.warn("Firestore updateDoc error:", err)
  }

  // Sync stage to CRMos
  try {
    await crmos.upsertContact({
      email: id.includes("@") ? id : `${id}@vvc.works`,
      first_name: "VVC",
      last_name: "Candidate",
      status: status === "geplaatst" ? "customer" : "qualified",
      tags: ["#vvc", `#stage:${stage.toLowerCase().replace(/\s+/g, "-")}`],
      custom_fields: { stage, status, updated_at: new Date().toISOString() },
    })
  } catch (crmErr) {
    console.warn("CRMos status sync notice:", crmErr)
  }
}
