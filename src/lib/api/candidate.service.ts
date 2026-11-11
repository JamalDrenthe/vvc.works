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

/**
 * Abonneert op realtime kandidaten uit vvc-dev Firestore met bi-directionele updates
 */
export function subscribeCandidates(
  callback: (candidates: Candidate[]) => void,
  partnerEmailOrCode?: string
): () => void {
  let unsubscribeFirestore: Unsubscribe | null = null

  getFirebaseFirestore()
    .then((db) => {
      const candidatesRef = collection(db, "candidates")
      const q = query(candidatesRef, orderBy("createdAt", "desc"))

      unsubscribeFirestore = onSnapshot(
        q,
        (snapshot) => {
          const items: Candidate[] = []
          snapshot.forEach((docSnap) => {
            const data = docSnap.data()
            // Optionele filtering op partner als opgegeven
            if (
              partnerEmailOrCode &&
              data.partnerEmail &&
              data.partnerEmail !== "organisch" &&
              data.partnerEmail !== "direct" &&
              data.partnerEmail.toLowerCase() !== partnerEmailOrCode.toLowerCase() &&
              data.partnerCode?.toLowerCase() !== partnerEmailOrCode.toLowerCase()
            ) {
              return
            }

            // Normaliseer stage
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

          callback(items)
        },
        (error) => {
          console.warn("Firestore candidates onSnapshot notice:", error)
        }
      )
    })
    .catch((err) => {
      console.warn("Firebase Firestore init notice:", err)
    })

  return () => {
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
