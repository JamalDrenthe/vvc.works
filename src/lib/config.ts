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
  crmosFirebase: {
    apiKey: (import.meta.env.VITE_CRMOS_FIREBASE_API_KEY ?? "AIzaSyCsBPKp7i7Cd959bF8hZzTDtV_V_7cI9Xo").trim(),
    authDomain: (import.meta.env.VITE_CRMOS_FIREBASE_AUTH_DOMAIN ?? "crmosone-dev.firebaseapp.com").trim(),
    projectId: (import.meta.env.VITE_CRMOS_FIREBASE_PROJECT_ID ?? "crmosone-dev").trim(),
    storageBucket: (import.meta.env.VITE_CRMOS_FIREBASE_STORAGE_BUCKET ?? "crmosone-dev.firebasestorage.app").trim(),
    appId: (import.meta.env.VITE_CRMOS_FIREBASE_APP_ID ?? "1:560657459503:web:cafda0014c240cdc7099da").trim(),
  },
  storageKey: {
    session: "vvc.session",
  },
} as const
