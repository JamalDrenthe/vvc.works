/**
 * Centrale type-definities voor de hele applicatie.
 * Alle features importeren uit @/types — geen ad-hoc types in pagina's of components.
 */

/* ─── Auth ─────────────────────────────────────────────────────── */

export type UserRole = "ceo" | "senior_partner" | "partner" | "talent"

export interface AuthUser {
  id: string
  email: string
  fullName: string
  initials: string
  role: UserRole
  /** Status weergegeven in de header pill ("Actief", "On track", etc.) */
  status: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthSession {
  user: AuthUser
  accessToken: string
}

/* ─── Companies (uit app1: De 126 Bedrijven) ───────────────────── */

/**
 * Sectoren komen overeen met de hoofdstukken uit het strategisch
 * onderzoek (Banken & Neobanken, Crypto & Web3, ...). Categorie is de
 * meer specifieke sub-classificatie die historisch al in app1 stond.
 */
export type CompanySector =
  | "Banken & Neobanken"
  | "Crypto & Web3"
  | "Betalingen & BNPL"
  | "Telecom"
  | "Gig Economy & Platforms"
  | "HR & Flex-werk"
  | "Factoring & Trade Finance"

export type CompanyStatus =
  | "Actief"
  | "Actief (Partner)"
  | "Actief (Indirect)"
  | "Gedeeltelijk"
  | "Gepauzeerd"
  | "Inactief"
  | "Overgenomen"
  | "Geen actieve bonus"

export type CompanyTarget = "B2C" | "B2B" | "B2C/B2B" | "B2B/B2C"

export interface Company {
  id: number
  name: string
  /** Hoofdsector — gebruikt voor filtering en Academy mapping */
  sector: CompanySector
  /** Sub-categorie (historisch, vrij tekstveld) */
  category: string
  target: CompanyTarget | string
  status: CompanyStatus | string
  bonus: string
  reqs: string
}

/* ─── Navigation (gebruikt door Sidebar) ───────────────────────── */

export type RouteId =
  | "dashboard"
  | "onboarding"
  | "onboarding-companies"
  | "onboarding-academy"
  | "analytics"
  | "community"
  | "prospects"
  | "talenten"
  | "app-boostplug"
  | "app-woningvry"
  | "app-spontiva"
  | "app-investbotiq"
  | "app-djobba"
