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
      return "mock"
    default:
      return useMock ? "mock" : "api"
  }
}

export const config = {
  apiBaseUrl,
  authProvider: resolveAuthProvider(),
  /**
   * Mock-data wordt automatisch gebruikt als er geen VITE_API_BASE_URL is gezet.
   * Forceren kan via VITE_USE_MOCK=true|false.
   */
  useMock,
  firebase: {
    apiKey: (import.meta.env.VITE_FIREBASE_API_KEY ?? "").trim(),
    authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "").trim(),
    projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "").trim(),
    appId: (import.meta.env.VITE_FIREBASE_APP_ID ?? "").trim(),
  },
  storageKey: {
    session: "vvc.session",
  },
} as const
