/**
 * Runtime configuratie. Eén centrale plek voor environment-afhankelijke flags.
 * Voeg nieuwe env-vars hier toe (en in .env.example) — niet in losse modules.
 */

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").trim()
const useMock =
  import.meta.env.VITE_USE_MOCK === "true" ||
  !import.meta.env.VITE_API_BASE_URL
const requestedAuthProvider = (import.meta.env.VITE_AUTH_PROVIDER ?? "")
  .trim()
  .toLowerCase()

function resolveAuthProvider(): "mock" | "api" | "firebase" {
  switch (requestedAuthProvider) {
    case "firebase":
      return "firebase"
    case "api":
      return "api"
    case "mock":
      return import.meta.env.DEV ? "mock" : "firebase"
    default:
      if (!import.meta.env.DEV) {
        return apiBaseUrl ? "api" : "firebase"
      }
      return useMock ? "mock" : "api"
  }
}

export const config = {
  apiBaseUrl,
  authProvider: resolveAuthProvider(),
  /**
   * Mock-data wordt uitsluitend in lokale development gebruikt als er geen VITE_API_BASE_URL is gezet.
   */
  useMock: import.meta.env.DEV && useMock,
  firebase: {
    apiKey: (import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDDB2YIivG4WdG3ro8Y0Gf05Ym_YvagEJQ").trim(),
    authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "vvc-dev.firebaseapp.com").trim(),
    projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID || "vvc-dev").trim(),
    appId: (import.meta.env.VITE_FIREBASE_APP_ID || "1:842240578643:web:355208fbb23ef575a0ea12").trim(),
  },
  storageKey: {
    session: "vvc.session",
  },
} as const
