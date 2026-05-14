import { Outlet } from "react-router"

/**
 * Wrapper voor publiekelijke auth-pagina's (login, register, forgot-password).
 * Zorgt voor consistente branding zonder de hoofdsidebar/header.
 */
export function AuthLayout() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Decoratieve achtergrondlijnen, brutalist sfeer */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-magenta to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="px-8 lg:px-12 py-8 flex items-center">
          <div className="flex items-center select-none">
            <span className="font-black italic text-white text-3xl tracking-tighter">
              VVC
            </span>
            <span className="text-magenta text-4xl leading-none ml-0 font-normal">
              .
            </span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 pb-12">
          <Outlet />
        </main>

        <footer className="px-8 lg:px-12 py-6 text-[10px] font-bold tracking-[0.2em] uppercase text-[#444444]">
          © {new Date().getFullYear()} VVC Platform · Executie is de enige
          waarheid.
        </footer>
      </div>
    </div>
  )
}
