import { useContext } from "react"
import { AuthContext } from "@/context/auth-context"

/**
 * Toegang tot de auth-context. Faalt expliciet wanneer de provider ontbreekt
 * zodat we niet met `null` checks vervuilen in de pagina's.
 */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth moet binnen <AuthProvider> aangeroepen worden")
  }
  return ctx
}
