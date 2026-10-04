import type { Unsubscribe, User } from "firebase/auth"
import { config } from "@/lib/config"
import { api } from "@/lib/api/client"
import type { AuthSession, LoginCredentials, UserRole } from "@/types"

/**
 * Auth API. De authenticatieprovider staat los van de appdata-modus.
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
    if (config.authProvider === "firebase") {
      try {
        const [{ signInWithEmailAndPassword }, { getFirebaseAuth }] =
          await Promise.all([
            import("firebase/auth"),
            import("@/lib/firebase.client"),
          ])
        const credential = await signInWithEmailAndPassword(
          await getFirebaseAuth(),
          credentials.email.trim(),
          credentials.password,
        )
        return toFirebaseSession(credential.user)
      } catch (error) {
        throw mapFirebaseError(error)
      }
    }

    if (config.authProvider === "mock") {
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
    if (config.authProvider !== "api") {
      return null
    }
    return api.get<AuthSession["user"]>("/auth/me")
  },

  async logout(): Promise<void> {
    if (config.authProvider === "firebase") {
      const [{ signOut }, { getFirebaseAuth }] = await Promise.all([
        import("firebase/auth"),
        import("@/lib/firebase.client"),
      ])
      await signOut(await getFirebaseAuth())
      return
    }

    if (config.authProvider === "mock") return
    try {
      await api.post<void>("/auth/logout")
    } catch {
      /* idempotent: server logout is best-effort */
    }
  },

  async observeFirebaseSession(
    onSession: (session: AuthSession | null) => void,
    onError: (error: Error) => void,
  ): Promise<Unsubscribe> {
    const [{ onIdTokenChanged }, { getFirebaseAuth }] = await Promise.all([
      import("firebase/auth"),
      import("@/lib/firebase.client"),
    ])
    const auth = await getFirebaseAuth()
    let eventVersion = 0
    let active = true
    const unsubscribe = onIdTokenChanged(
      auth,
      (user) => {
        const currentVersion = ++eventVersion
        if (!user) {
          onSession(null)
          return
        }

        void toFirebaseSession(user)
          .then((session) => {
            if (
              active &&
              currentVersion === eventVersion &&
              auth.currentUser?.uid === user.uid
            ) {
              onSession(session)
            }
          })
          .catch((error: unknown) => {
            if (
              active &&
              currentVersion === eventVersion &&
              auth.currentUser?.uid === user.uid
            ) {
              onError(
                error instanceof Error
                  ? error
                  : new Error("Firebase-authenticatie kon niet worden gecontroleerd."),
              )
            }
          })
      },
      (error) => {
        eventVersion += 1
        if (active) onError(error)
      },
    )
    return () => {
      active = false
      eventVersion += 1
      unsubscribe()
    }
  },
}

const USER_ROLES: UserRole[] = ["ceo", "senior_partner", "partner", "talent"]

function isUserRole(value: unknown): value is UserRole {
  return USER_ROLES.some((role) => role === value)
}

async function toFirebaseSession(user: User): Promise<AuthSession> {
  const { getIdTokenResult } = await import("firebase/auth")
  const tokenResult = await getIdTokenResult(user)
  const fullName =
    user.displayName?.trim() ||
    user.email?.split("@")[0] ||
    "VVC-gebruiker"
  const initials = fullName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")

  return {
    accessToken: tokenResult.token,
    user: {
      id: user.uid,
      email: user.email ?? "",
      fullName,
      initials,
      role: isUserRole(tokenResult.claims.role)
        ? tokenResult.claims.role
        : "talent",
      status: "Actief",
    },
  }
}

function mapFirebaseError(error: unknown): Error {
  if (!(error instanceof Error) || !("code" in error)) {
    return new Error("Inloggen via Firebase is niet gelukt.")
  }

  const code = error.code
  if (typeof code !== "string") {
    return new Error("Inloggen via Firebase is niet gelukt.")
  }

  switch (code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return new Error("E-mailadres of wachtwoord is onjuist.")
    case "auth/user-disabled":
      return new Error("Dit account is uitgeschakeld.")
    case "auth/configuration-not-found":
    case "auth/operation-not-allowed":
      return new Error(
        "Firebase Authentication is nog niet geconfigureerd. Schakel de e-mail/wachtwoordprovider in Firebase in.",
      )
    case "auth/network-request-failed":
      return new Error("Geen verbinding met Firebase. Controleer je netwerk.")
    default:
      return new Error("Inloggen via Firebase is niet gelukt.")
  }
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
