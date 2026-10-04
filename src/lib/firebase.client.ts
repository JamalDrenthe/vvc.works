import type { Auth } from "firebase/auth"
import { config } from "@/lib/config"

export async function getFirebaseAuth(): Promise<Auth> {
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

  const [{ getApps, initializeApp }, { getAuth }] = await Promise.all([
    import("firebase/app"),
    import("firebase/auth"),
  ])
  const existingApp = getApps().find((app) => app.name === "[DEFAULT]")
  if (existingApp && existingApp.options.projectId !== projectId) {
    throw new Error("Firebase is al geïnitialiseerd voor een ander project.")
  }

  const app = existingApp ?? initializeApp(config.firebase)
  return getAuth(app)
}
