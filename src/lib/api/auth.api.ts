import { config } from "@/lib/config"
import { api } from "@/lib/api/client"
import type { AuthSession, LoginCredentials } from "@/types"

/**
 * Auth API. Wisselt automatisch tussen mock-implementatie (lokale stub voor
 * demo/development) en een echte backend wanneer VITE_API_BASE_URL is gezet.
 */

const MOCK_USERS: Array<{ password: string; session: AuthSession }> = [
  {
    password: "executie",
    session: {
      accessToken: "mock-token-sanne",
      user: {
        id: "u_sanne",
        email: "sanne@vvc.nl",
        fullName: "Sanne Verbruggen",
        initials: "SV",
        role: "senior_partner",
        status: "Actief",
      },
    },
  },
  {
    password: "ceo",
    session: {
      accessToken: "mock-token-ceo",
      user: {
        id: "u_ceo",
        email: "ceo@vvc.nl",
        fullName: "CEO Account",
        initials: "CEO",
        role: "ceo",
        status: "Actief",
      },
    },
  },
]

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    if (config.useMock) {
      const match = MOCK_USERS.find(
        (u) =>
          u.session.user.email.toLowerCase() ===
            credentials.email.trim().toLowerCase() &&
          u.password === credentials.password,
      )
      if (!match) {
        await wait(400)
        throw new Error("Onjuiste inloggegevens.")
      }
      await wait(400)
      return match.session
    }
    return api.post<AuthSession>("/auth/login", credentials, {
      skipAuth: true,
    })
  },

  async me(): Promise<AuthSession["user"] | null> {
    if (config.useMock) {
      return null
    }
    return api.get<AuthSession["user"]>("/auth/me")
  },

  async logout(): Promise<void> {
    if (config.useMock) return
    try {
      await api.post<void>("/auth/logout")
    } catch {
      /* idempotent: server logout is best-effort */
    }
  },
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
