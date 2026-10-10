import { createContext } from "react"
import type { AuthUser, LoginCredentials } from "@/types"

export interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  logout: () => Promise<void>
  clearError: () => void
}

/**
 * Aparte module zodat de provider-file alleen React-componenten exporteert
 * (vereist door react-refresh/only-export-components).
 */
export const AuthContext = createContext<AuthContextValue | null>(null)
