import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { AuthContext, type AuthContextValue } from "@/context/auth-context"
import { authApi } from "@/lib/api/auth.api"
import { config } from "@/lib/config"
import type { AuthSession, AuthUser, LoginCredentials } from "@/types"

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const STORAGE_KEY = config.storageKey.session

function readSessionFromStorage(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthSession) : null
  } catch {
    return null
  }
}

function writeSessionToStorage(session: AuthSession | null) {
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    /* private mode of storage disabled — graceful degradation */
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const session = readSessionFromStorage()
    return {
      user: session?.user ?? null,
      isAuthenticated: !!session,
      isLoading: false,
      error: null,
    }
  })

  // Re-validate session against backend on mount (no-op in mock mode).
  const didValidate = useRef(false)
  useEffect(() => {
    if (didValidate.current || config.useMock) return
    didValidate.current = true
    const session = readSessionFromStorage()
    if (!session) return
    void authApi
      .me()
      .then((user) => {
        if (user) {
          const next: AuthSession = { ...session, user }
          writeSessionToStorage(next)
          setState((s) => ({ ...s, user, isAuthenticated: true }))
        }
      })
      .catch(() => {
        writeSessionToStorage(null)
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
      })
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((s) => ({ ...s, isLoading: true, error: null }))
    try {
      const session = await authApi.login(credentials)
      writeSessionToStorage(session)
      setState({
        user: session.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Inloggen mislukt."
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: message,
      })
      throw err
    }
  }, [])

  const logout = useCallback(async () => {
    await authApi.logout()
    writeSessionToStorage(null)
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  }, [])

  const clearError = useCallback(
    () => setState((s) => ({ ...s, error: null })),
    [],
  )

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, login, logout, clearError }),
    [state, login, logout, clearError],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
