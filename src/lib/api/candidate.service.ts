import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where,
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

const ADMIN_EMAILS = new Set(["info@jamaldrenthe.com", "info@vvc.works"])

function isAdminIdentifier(value?: string): boolean {
  return Boolean(value && ADMIN_EMAILS.has(value.trim().toLowerCase()))
}

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
  const map = new Map<string, Candidate>()
  for (const list of lists) {
    for (const item of list) {
      if (!item) continue
      const key = (item.email && item.email.trim().toLowerCase()) || item.id
      if (!key) continue
      if (map.has(key)) {
        map.set(key, { ...map.get(key)!, ...item })
      } else {
        map.set(key, item)
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => {
    const rawA = a.createdAt?.toDate ? a.createdAt.toDate() : a.createdAt
    const rawB = b.createdAt?.toDate ? b.createdAt.toDate() : b.createdAt
    const timeA = rawA ? new Date(rawA).getTime() : 0
    const timeB = rawB ? new Date(rawB).getTime() : 0
    return timeB - timeA
  })
}

/**
 * Abonneert op realtime kandidaten uit vvc-dev Firestore en CRMos REST met strikte multi-tenant isolatie
 * (geen onversleutelde PII-opslag in localStorage).
 */
export function subscribeCandidates(
  callback: (candidates: Candidate[]) => void,
  partnerEmailOrCode?: string
): () => void {
  let unsubscribeFirestore: Unsubscribe | null = null
  let isCancelled = false

  let firestoreCandidates: Candidate[] = []
  let crmosCandidates: Candidate[] = []

  const normalizedFilter = partnerEmailOrCode?.trim().toLowerCase() || ""
  const viewerIsAdmin = isAdminIdentifier(normalizedFilter)

  const filterForPartner = (items: Candidate[]): Candidate[] => {
    if (viewerIsAdmin) return items
    if (!normalizedFilter) return []
    return items.filter((data) => {
      const pEmail = data.partnerEmail?.trim().toLowerCase()
      const pCode = data.partnerCode?.trim().toLowerCase()
      return pEmail === normalizedFilter || pCode === normalizedFilter
    })
  }

  const emit = () => {
    if (isCancelled) return
    const merged = mergeCandidateLists(crmosCandidates, firestoreCandidates)
    callback(filterForPartner(merged))
  }

  const fetchCrmosContacts = async () => {
    if (!normalizedFilter) return
    try {
      const queryTag = viewerIsAdmin
        ? "#vvc"
        : `#partner:${normalizedFilter.split("@")[0]}`
      const res = await crmos.getContacts({ tag: queryTag })
      if (res && res.data && Array.isArray(res.data)) {
        crmosCandidates = res.data.map((c: any) => {
          const cf = c.custom_fields || {}
          let stage: Candidate["stage"] = "Contact Gelegd"
          if (cf.stage === "Double Team Pilot" || c.status === "qualified") {
            stage = "Double Team Pilot"
          } else if (cf.stage === "Kwalificatie (Storting)") {
            stage = "Kwalificatie (Storting)"
          } else if (cf.stage === "Plaatsing Behaald" || c.status === "customer") {
            stage = "Plaatsing Behaald"
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
          }
        })
        emit()
      }
    } catch (err) {
      console.warn("CRMos candidates fetch notice:", err)
    }
  }

  if (normalizedFilter) {
    fetchCrmosContacts()
  }
  const crmosInterval = setInterval(fetchCrmosContacts, 30000)

  // Firestore snapshot realtime listener met server-side scoping zodat Firestore Rules niet falen voor niet-admins
  if (normalizedFilter) {
    getFirebaseFirestore()
      .then((db) => {
        if (isCancelled) return
        const candidatesRef = collection(db, "candidates")
        const q = viewerIsAdmin
          ? query(candidatesRef, orderBy("createdAt", "desc"))
          : query(candidatesRef, where("partnerEmail", "==", normalizedFilter))

        unsubscribeFirestore = onSnapshot(
          q,
          (snapshot) => {
            const items: Candidate[] = []
            snapshot.forEach((docSnap) => {
              const data = docSnap.data()

              let stage: Candidate["stage"] = "Contact Gelegd"
              if (data.stage === "Double Team Pilot" || data.status === "screening") {
                stage = "Double Team Pilot"
              } else if (data.stage === "Kwalificatie (Storting)" || data.status === "voorgesteld") {
                stage = "Kwalificatie (Storting)"
              } else if (data.stage === "Plaatsing Behaald" || data.status === "geplaatst") {
                stage = "Plaatsing Behaald"
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
              })
            })

            firestoreCandidates = items
            emit()
          },
          (error) => {
            console.warn("Firestore candidates onSnapshot notice:", error)
          }
        )
      })
      .catch((err) => {
        console.warn("Firebase Firestore init notice:", err)
      })
  } else {
    emit()
  }

  return () => {
    isCancelled = true
    clearInterval(crmosInterval)
    if (unsubscribeFirestore) {
      unsubscribeFirestore()
    }
  }
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
