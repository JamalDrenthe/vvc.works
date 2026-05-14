import { Navigate, Outlet, useLocation } from "react-router"
import { useAuth } from "@/hooks/useAuth"

/**
 * Guard voor authenticated routes. Bewaart de oorspronkelijke locatie zodat
 * de gebruiker na een succesvolle login automatisch naar de juiste pagina gaat.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <div className="text-xs font-black uppercase tracking-[0.3em] text-[#888888]">
          Authenticating…
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

/** Tegenhanger: stuur al-ingelogde users weg van /login. */
export function PublicOnlyRoute() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}
