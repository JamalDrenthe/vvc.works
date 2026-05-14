/**
 * Runtime configuratie. Eén centrale plek voor environment-afhankelijke flags.
 * Voeg nieuwe env-vars hier toe (en in .env.example) — niet in losse modules.
 */

export const config = {
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL ?? "").trim(),
  /**
   * Mock-data wordt automatisch gebruikt als er geen VITE_API_BASE_URL is gezet.
   * Forceren kan via VITE_USE_MOCK=true|false.
   */
  useMock:
    import.meta.env.VITE_USE_MOCK === "true" ||
    !import.meta.env.VITE_API_BASE_URL,
  storageKey: {
    session: "vvc.session",
  },
} as const
