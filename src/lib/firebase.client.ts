import type { Auth } from "firebase/auth"
import type { Firestore } from "firebase/firestore"
import { config } from "@/lib/config"

let authPromise: Promise<Auth> | null = null
let firestorePromise: Promise<Firestore> | null = null

function validateFirebaseConfig() {
  const { apiKey, authDomain, projectId, appId } = config.firebase
  const missing = [
    !apiKey && "VITE_FIREBASE_API_KEY",
    !authDomain && "VITE_FIREBASE_AUTH_DOMAIN",
    !projectId && "VITE_FIREBASE_PROJECT_ID",
    !appId && "VITE_FIREBASE_APP_ID",
  ].filter((value): value is string => Boolean(value))

  if (missing.length > 0) {
    throw new Error(`Firebase-configuratie ontbreekt: ${missing.join(", ")}.`)
  }
}

async function getFirebaseApp() {
  validateFirebaseConfig()
  const { getApps, initializeApp } = await import("firebase/app")
  const existingApp = getApps().find((app) => app.name === "[DEFAULT]")
  if (existingApp && existingApp.options.projectId !== config.firebase.projectId) {
    throw new Error("Firebase is al geïnitialiseerd voor een ander project.")
  }
  return existingApp ?? initializeApp(config.firebase)
}

export async function getFirebaseAuth(): Promise<Auth> {
  if (!authPromise) {
    authPromise = (async () => {
      const [{ getAuth }, app] = await Promise.all([
        import("firebase/auth"),
        getFirebaseApp(),
      ])
      return getAuth(app)
    })()
  }
  return authPromise
}

export async function getFirebaseFirestore(): Promise<Firestore> {
  if (!firestorePromise) {
    firestorePromise = (async () => {
      const [{ getFirestore }, app] = await Promise.all([
        import("firebase/firestore"),
        getFirebaseApp(),
      ])
      return getFirestore(app)
    })()
  }
  return firestorePromise
}
