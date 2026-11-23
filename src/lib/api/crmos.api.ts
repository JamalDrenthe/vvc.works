import { crmos } from "@/lib/api/crmosRest.client"

export interface CrmosProfileData {
  crmosCode: string
  gender?: "Man" | "Vrouw" | "Anders"
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  street: string
  houseNumber: string
  houseNumberAddition?: string
  postalCode: string
  city: string
  birthDate?: string
  preferredLanguage?: string
  secondaryContact?: string
  hasKvk?: boolean
  kvkNumber?: string
  btwNumber?: string
  hasLtd?: boolean
  referralCode?: string
  avatarUrl?: string
  idDocumentName?: string
  idFrontDocumentName?: string
  idBackDocumentName?: string
  cvFileName?: string
  isEmailVerified?: boolean
  isPhoneVerified?: boolean
  twoFactorEnabled?: boolean
  twoFactorMethod?: "authenticator" | "sms" | "email"
  loginMethod?: "google" | "email" | "passkey"
  privacyAccepted?: boolean
  termsAccepted?: boolean
  partnerDataSharingAccepted?: boolean
  retentionPolicyAccepted?: boolean
}

export interface CrmosFetchResult {
  success: boolean
  data?: CrmosProfileData
  message?: string
  source?: "crmos-firestore" | "verified-sandbox"
}

function mapLookupRecordToProfile(code: string, d: Record<string, any>): CrmosProfileData {
  return {
    crmosCode: code,
    gender: d.gender || d.geslacht || "Man",
    firstName: d.firstName || d.first_name || d.voornaam || "",
    lastName: d.lastName || d.last_name || d.achternaam || "",
    email: d.email || "",
    phone: d.phone || d.telefoon || "",
    country: d.country || d.land || "Nederland",
    street: d.street || d.straat || "",
    houseNumber: d.houseNumber || d.huisnummer || "",
    houseNumberAddition: d.houseNumberAddition || d.toevoeging || "",
    postalCode: d.postalCode || d.postcode || "",
    city: d.city || d.woonplaats || "",
    birthDate: d.birthDate || d.geboortedatum || "",
    preferredLanguage: d.preferredLanguage || d.taal || "Nederlands",
    secondaryContact: d.secondaryContact || "",
    hasKvk: Boolean(d.hasKvk || d.kvkNumber || d.kvk),
    kvkNumber: d.kvkNumber || d.kvk || "",
    btwNumber: d.btwNumber || d.btw || "",
    hasLtd: Boolean(d.hasLtd || d.ltd),
    referralCode: d.referralCode || "VVC-PARTNER",
    isEmailVerified: Boolean(d.isEmailVerified ?? true),
    isPhoneVerified: Boolean(d.isPhoneVerified ?? false),
    twoFactorEnabled: Boolean(d.twoFactorEnabled ?? false),
    twoFactorMethod: d.twoFactorMethod || "authenticator",
    loginMethod: d.loginMethod || "google",
    privacyAccepted: Boolean(d.privacyAccepted ?? false),
    termsAccepted: Boolean(d.termsAccepted ?? false),
    partnerDataSharingAccepted: Boolean(d.partnerDataSharingAccepted ?? false),
    retentionPolicyAccepted: Boolean(d.retentionPolicyAccepted ?? false),
  }
}

/**
 * Haalt profielgegevens veilig op via de geauthenticeerde CRMos REST API
 * met het actuele Firebase ID-token van de ingelogde sessie (geen hardcoded credentials).
 */
export async function fetchCrmosProfileByCode(rawCode: string): Promise<CrmosFetchResult> {
  const code = rawCode.trim().toUpperCase()

  if (!code || !/^[A-Z0-9_-]{3,40}$/.test(code)) {
    return {
      success: false,
      message: "Voer een geldige CRMos gebruikerscode in.",
    }
  }

  try {
    const res = await crmos.lookupVvcTag(code)
    if (res?.success && res.data && typeof res.data === "object") {
      return {
        success: true,
        source: "crmos-firestore",
        data: mapLookupRecordToProfile(code, res.data as Record<string, any>),
      }
    }
  } catch (error: unknown) {
    console.warn("CRMos tag lookup notice:", error)
  }

  // Uitsluitend in lokale development: generiek demoprofiel zonder echte persoonsgegevens
  if (import.meta.env.DEV && code === "CRMOS-VVC-DEV") {
    return {
      success: true,
      source: "verified-sandbox",
      data: {
        crmosCode: code,
        gender: "Anders",
        firstName: "Demo",
        lastName: "Partner",
        email: "test@vvc.works",
        phone: "+31 6 00000000",
        country: "Nederland",
        street: "Voorbeeldstraat",
        houseNumber: "1",
        postalCode: "1000 AA",
        city: "Amsterdam",
        preferredLanguage: "Nederlands",
        referralCode: "VVC-DEMO",
        hasKvk: false,
        hasLtd: false,
        isEmailVerified: true,
        isPhoneVerified: false,
        twoFactorEnabled: false,
        loginMethod: "email",
        privacyAccepted: false,
        termsAccepted: false,
        partnerDataSharingAccepted: false,
        retentionPolicyAccepted: false,
      },
    }
  }

  return {
    success: false,
    message: `Geen gekoppeld profiel gevonden voor code "${code}". Controleer je uitnodigingscode of vul je gegevens handmatig in.`,
  }
}
