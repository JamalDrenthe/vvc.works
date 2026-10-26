import { Outlet, Link, useLocation } from "react-router"

/**
 * Rustige, exclusieve hoofdlayout voor publieke auth-pagina's (Login, Register).
 * Focus op rust, esthetiek, privacy en directe toegang zonder afleiding.
 */
export function AuthLayout() {
  const location = useLocation()
  const isRegister = location.pathname.includes("/register")

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-magenta selection:text-white flex flex-col justify-between">
      {/* ─── ACHTERGROND SFEERLIJNEN & SUBTIELE GLOED ─── */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-magenta/40 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-magenta/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        {/* ─── TOP HEADER ─── */}
        <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-[#181818]">
          <Link
            to="/login"
            className="flex items-center gap-3 select-none group"
            aria-label="VVC Platform Home"
          >
            <img
              src="/vvc-logo.svg"
              alt="VVC Logo"
              className="w-10 h-10 rounded-full shadow-[0_0_15px_rgba(230,0,126,0.35)] group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-black italic text-white text-lg tracking-tight leading-none">
                VERDIENENDE VRIENDEN CLUB
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#777777] mt-0.5">
                Elite Platform &amp; Ecosystem
              </span>
            </div>
          </Link>

          {/* Actieknop Rechts in Header */}
          <div className="flex items-center gap-3">
            <Link
              to={isRegister ? "/login" : "/register"}
              className="text-[11px] font-black uppercase tracking-wider px-4 py-2 border border-[#333333] hover:border-magenta bg-[#111111] text-white rounded transition-colors"
            >
              {isRegister ? "Naar Inloggen" : "Lid Worden"}
            </Link>
          </div>
        </header>

        {/* ─── HOOFDCONTENT / GECENTREERD & RUSTIG ─── */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 flex items-center justify-center">
          <div className="w-full flex justify-center">
            <Outlet />
          </div>
        </main>

        {/* ─── FOOTER ─── */}
        <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-medium text-[#555555]">
          <span>© {new Date().getFullYear()} Verdienende Vrienden Club. Alle rechten voorbehouden.</span>
          <div className="flex items-center gap-6">
            <span className="text-[#444444]">Beveiligde SSL-verbinding</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
