import { Outlet, Link, useLocation } from "react-router"
import { Star } from "lucide-react"
import { LandingTrustSection } from "@/components/landing/LandingTrustSection"

/**
 * Hoofdlayout voor publieke landingspagina's & auth (Login, Register).
 * Biedt een hoogwaardige split-screen weergave met officiële samenwerkingen,
 * geverifieerde bedrijfslogo's en partnerreviews.
 */
export function AuthLayout() {
  const location = useLocation()
  const isRegister = location.pathname.includes("/register")

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-magenta selection:text-white">
      {/* ─── ACHTERGROND SFEERLIJNEN & SUBTIELE GLOED ─── */}
      <div className="fixed inset-0 pointer-events-none opacity-25">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-magenta to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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

          {/* Social Proof Pills in Header */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#0d0d0d] border border-[#222222] rounded-full text-[11px] text-[#888888]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white">126+</span> Bedrijfssamenwerkingen
              <span className="text-[#444444]">|</span>
              <div className="flex text-amber-400 items-center">
                <Star size={11} className="fill-amber-400" />
                <span className="text-white font-bold ml-1">5.0</span>
              </div>
            </div>

            <Link
              to={isRegister ? "/login" : "/register"}
              className="text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 border border-[#333333] hover:border-magenta bg-[#111111] text-white rounded transition-colors"
            >
              {isRegister ? "Naar Inloggen" : "Lid Worden"}
            </Link>
          </div>
        </header>

        {/* ─── HOOFDCONTENT / LANDINGSPAGINA GRID ─── */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* LINKER KOLOM: HET AUTH / FORMULIER DEEL */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start w-full">
              <Outlet />
            </div>

            {/* RECHTER KOLOM: SAMENWERKINGEN, BEDRIJFSLOGO'S & REVIEWS */}
            <div className="lg:col-span-7 w-full lg:sticky lg:top-8">
              <LandingTrustSection />
            </div>
          </div>
        </main>

        {/* ─── FOOTER ─── */}
        <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-bold tracking-[0.15em] uppercase text-[#555555]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} VVC Platform</span>
            <span>·</span>
            <span className="text-white">Executie is de enige waarheid.</span>
          </div>
          <div className="flex items-center gap-4 text-[#666666]">
            <span>126+ Partnernetwerken</span>
            <span>·</span>
            <span>GDPR &amp; AVG Gecertificeerd</span>
            <span>·</span>
            <span className="text-magenta">24/7 API Monitoring</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
