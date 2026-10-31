import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  type Unsubscribe,
} from "firebase/firestore"
import { getFirebaseFirestore } from "@/lib/firebase.client"

export interface UserStats {
  hoursPerWeek: number
  placementsPerMonth: number
  activeCandidates: number
  ytdEarnings: number
  activeLeads: number
  totalPlacements: number
  qualityScore: number
  updatedAt?: unknown
}

export interface ActivityFeedItem {
  id: string
  name: string
  action: string
  value: string
  time: string
  highlight?: boolean
  timestamp?: unknown
}

export interface PartnerSession {
  title: string
  description: string
  status: "idle" | "in_progress" | "completed"
  partnerName?: string
  lastUpdated?: unknown
}

const DEFAULT_STATS: UserStats = {
  hoursPerWeek: 20,
  placementsPerMonth: 10,
  activeCandidates: 50,
  ytdEarnings: 64800,
  activeLeads: 18,
  totalPlacements: 12,
  qualityScore: 9.8,
}

const DEFAULT_FEED: ActivityFeedItem[] = [
  {
    id: "feed-1",
    name: "Marcus R.",
    action: "Sloot een Double Team deal.",
    value: "+€600",
    time: "12m",
  },
  {
    id: "feed-2",
    name: "Lisa M.",
    action: "Plaatsing bevestigd: IT Auditor.",
    value: "+€300",
    time: "45m",
    highlight: true,
  },
  {
    id: "feed-3",
    name: "David K.",
    action: "Mystery Shopping Audit VZ voltooid.",
    value: "Check",
    time: "2u",
  },
  {
    id: "feed-4",
    name: "Sarah B.",
    action: "Portfolio gegroeid naar 40 actieve kandidaten.",
    value: "+€1000/m",
    time: "3u",
  },
]

export const dashboardFirebaseService = {
  /**
   * Realtime observer voor gebruikersstatistieken in Firestore: `users/{userId}/dashboard/stats`
   */
  async subscribeUserStats(
    userId: string,
    onData: (stats: UserStats) => void,
    onError?: (err: Error) => void
  ): Promise<Unsubscribe> {
    try {
      const db = await getFirebaseFirestore()
      const statsDocRef = doc(db, "users", userId, "dashboard", "stats")

      return onSnapshot(
        statsDocRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data() as Partial<UserStats>
            onData({
              ...DEFAULT_STATS,
              ...data,
            })
          } else {
            void setDoc(statsDocRef, {
              ...DEFAULT_STATS,
              updatedAt: serverTimestamp(),
            }, { merge: true })
            onData(DEFAULT_STATS)
          }
        },
        (err) => {
          console.warn("[DashboardFirebase] Realtime stats subscription warning:", err)
          onData(DEFAULT_STATS)
          onError?.(err)
        }
      )
    } catch (e) {
      console.warn("[DashboardFirebase] Firestore offline/missing config, using fallback stats:", e)
      onData(DEFAULT_STATS)
      return () => {}
    }
  },

  /**
   * Update sliders of KPI velden van de gebruiker direct in Firestore
   */
  async updateUserStats(userId: string, updates: Partial<UserStats>): Promise<void> {
    try {
      const db = await getFirebaseFirestore()
      const statsDocRef = doc(db, "users", userId, "dashboard", "stats")
      await setDoc(
        statsDocRef,
        {
          ...updates,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )
    } catch (err) {
      console.warn("[DashboardFirebase] Kon stats niet updaten in Firestore:", err)
    }
  },

  /**
   * Realtime observer voor de club live executie feed: `activity_feed` collectie
   */
  async subscribeLiveFeed(
    onFeed: (items: ActivityFeedItem[]) => void,
    onError?: (err: Error) => void
  ): Promise<Unsubscribe> {
    try {
      const db = await getFirebaseFirestore()
      const feedCol = collection(db, "activity_feed")
      const q = query(feedCol, orderBy("timestamp", "desc"), limit(10))

      return onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            const items = snap.docs.map((d) => ({
              id: d.id,
              ...(d.data() as Omit<ActivityFeedItem, "id">),
            }))
            onFeed(items)
          } else {
            onFeed(DEFAULT_FEED)
          }
        },
        (err) => {
          console.warn("[DashboardFirebase] Realtime feed subscription warning:", err)
          onFeed(DEFAULT_FEED)
          onError?.(err)
        }
      )
    } catch (e) {
      console.warn("[DashboardFirebase] Firestore feed offline, using fallback feed:", e)
      onFeed(DEFAULT_FEED)
      return () => {}
    }
  },

  /**
   * Verzend een nieuwe live deal of plaatsing naar Firestore
   */
  async postFeedItem(item: Omit<ActivityFeedItem, "id" | "timestamp">): Promise<void> {
    try {
      const db = await getFirebaseFirestore()
      const feedCol = collection(db, "activity_feed")
      const newDoc = doc(feedCol)
      await setDoc(newDoc, {
        ...item,
        timestamp: serverTimestamp(),
      })
    } catch (err) {
      console.warn("[DashboardFirebase] Kon feed item niet publiceren:", err)
    }
  },

  /**
   * Haal of observeer de partner sessie status
   */
  async subscribePartnerSession(
    userId: string,
    onSession: (session: PartnerSession) => void
  ): Promise<Unsubscribe> {
    const defaultSession: PartnerSession = {
      title: "Double Team Pilot",
      description: "Jouw partner wacht op afstemming voor de nieuwe vastgoed prospect.",
      status: "idle",
      partnerName: "Sophie de Boer",
    }

    try {
      const db = await getFirebaseFirestore()
      const sessDoc = doc(db, "users", userId, "dashboard", "partner_session")

      return onSnapshot(
        sessDoc,
        (snap) => {
          if (snap.exists()) {
            onSession(snap.data() as PartnerSession)
          } else {
            onSession(defaultSession)
          }
        },
        () => onSession(defaultSession)
      )
    } catch {
      onSession(defaultSession)
      return () => {}
    }
  },

  /**
   * Start een interactieve partner sessie
   */
  async startPartnerSession(userId: string): Promise<void> {
    try {
      const db = await getFirebaseFirestore()
      const sessDoc = doc(db, "users", userId, "dashboard", "partner_session")
      await setDoc(sessDoc, {
        status: "in_progress",
        lastUpdated: serverTimestamp(),
      }, { merge: true })
    } catch (err) {
      console.warn("[DashboardFirebase] Kon partner sessie niet starten:", err)
    }
  }
}
