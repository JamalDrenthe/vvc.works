import { useLocation, useParams } from "react-router"
import { Bell, Layers, Menu, Search } from "lucide-react"

interface HeaderProps {
  onOpenMobileMenu: () => void
}

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/onboarding": "Onboarding",
  "/onboarding/companies": "126 Bedrijven",
  "/onboarding/academy": "Academy",
  "/analytics": "Analytics",
  "/community": "Community",
  "/prospects": "Prospects",
  "/talenten": "Talenten",
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const location = useLocation()
  const params = useParams()

  const isAppPage = location.pathname.startsWith("/apps/")
  const appId = params.appId ?? "App"
  const isBoostplug = ["boostplug", "boastplug"].includes(appId.toLowerCase())
  const isWoningVry = ["woningvry", "woningvrij"].includes(appId.toLowerCase())
  const title = isAppPage
    ? (isBoostplug ? "Boostplug" : isWoningVry ? "WoningVry" : appId)
    : (TITLES[location.pathname] ?? "VVC Platform")
  const isDashboard = location.pathname === "/dashboard"

  return (
    <header className="h-24 border-b border-[#222222] flex items-center justify-between px-8 lg:px-12 shrink-0 z-10 bg-black/90 backdrop-blur-sm sticky top-0">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="md:hidden text-white"
          onClick={onOpenMobileMenu}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
          {isAppPage && <Layers className="text-magenta" size={24} />}
          {title}
          {isDashboard && (
            <span className="w-2 h-2 rounded-full bg-magenta animate-pulse-glow ml-2" />
          )}
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden sm:flex items-center border-b border-[#444444] pb-1 focus-within:border-magenta transition-colors duration-200">
          <Search size={16} className="text-[#666666] mr-2" />
          <input
            type="text"
            placeholder="ZOEKEN..."
            className="bg-transparent border-none text-sm text-white placeholder-[#666666] w-48 focus:outline-none uppercase tracking-wider font-bold"
          />
        </div>

        <button
          type="button"
          className="relative text-[#888888] hover:text-white transition-colors duration-200"
          aria-label="Notificaties"
        >
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-magenta text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>
      </div>
    </header>
  )
}
