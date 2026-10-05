import { NavLink, useLocation, useNavigate } from "react-router"
import {
  LayoutDashboard,
  Target,
  Activity,
  Users,
  Crosshair,
  UserPlus,
  Settings,
  X,
  LogOut,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isMobileMenuOpen: boolean
  onCloseMobileMenu: () => void
}

interface NavGroup {
  label: string
  emphasis?: boolean
  items: Array<NavEntry | AppEntry>
}

interface NavEntry {
  kind: "nav"
  to: string
  icon: React.ReactNode
  label: string
}

interface AppEntry {
  kind: "app"
  to: string
  label: string
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Performance",
    items: [
      {
        kind: "nav",
        to: "/dashboard",
        icon: <LayoutDashboard size={18} />,
        label: "Dashboard",
      },
      {
        kind: "nav",
        to: "/analytics",
        icon: <Activity size={18} />,
        label: "Analytics",
      },
      {
        kind: "nav",
        to: "/community",
        icon: <Users size={18} />,
        label: "Community",
      },
    ],
  },
  {
    label: "Onboarding",
    items: [
      {
        kind: "nav",
        to: "/onboarding",
        icon: <Target size={18} />,
        label: "Overzicht",
      },
      {
        kind: "nav",
        to: "/onboarding/companies",
        icon: <Briefcase size={18} />,
        label: "126 Bedrijven",
      },
      {
        kind: "nav",
        to: "/onboarding/academy",
        icon: <GraduationCap size={18} />,
        label: "VVC Academy",
      },
    ],
  },
  {
    label: "Netwerk",
    items: [
      {
        kind: "nav",
        to: "/prospects",
        icon: <Crosshair size={18} />,
        label: "Prospects",
      },
      {
        kind: "nav",
        to: "/talenten",
        icon: <UserPlus size={18} />,
        label: "Talenten",
      },
    ],
  },
  {
    label: "VVC Apps",
    emphasis: true,
    items: [
      { kind: "app", to: "/apps/boostplug", label: "Boostplug" },
      { kind: "app", to: "/apps/woningvry", label: "WoningVry" },
      { kind: "app", to: "/apps/spontiva", label: "Spontiva" },
      { kind: "app", to: "/apps/investbotiq", label: "Investbotiq" },
      { kind: "app", to: "/apps/djobba", label: "Djobba" },
    ],
  },
]

export function Sidebar({ isMobileMenuOpen, onCloseMobileMenu }: SidebarProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const location = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate("/login", { replace: true })
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-[#050505] border-r border-[#222222] flex flex-col transition-transform duration-300 ease-in-out",
        "md:relative md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      {/* Logo */}
      <div className="h-24 flex items-center justify-between px-8 border-b border-[#222222] shrink-0">
        <button
          type="button"
          onClick={() => {
            navigate("/dashboard")
            onCloseMobileMenu()
          }}
          className="flex items-center select-none cursor-pointer"
        >
          <span className="font-black italic text-white text-3xl tracking-tighter">
            VVC
          </span>
          <span className="text-magenta text-4xl leading-none ml-0 font-normal">
            .
          </span>
        </button>
        <button
          type="button"
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={onCloseMobileMenu}
          aria-label="Sluit menu"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-8 px-6 custom-scrollbar space-y-10">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div
              className={cn(
                "text-[10px] font-bold mb-4 tracking-[0.2em] uppercase",
                group.emphasis ? "text-magenta" : "text-[#666666]",
              )}
            >
              {group.label}
            </div>
            <div
              className={cn(
                "space-y-1",
                group.emphasis && "border-l border-[#222222] pl-2 ml-2",
              )}
            >
              {group.items.map((item) =>
                item.kind === "nav" ? (
                  <NavItem
                    key={item.to}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                    onNavigate={onCloseMobileMenu}
                    currentPath={location.pathname}
                  />
                ) : (
                  <AppItem
                    key={item.to}
                    to={item.to}
                    label={item.label}
                    onNavigate={onCloseMobileMenu}
                    currentPath={location.pathname}
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      {/* User profile */}
      <div className="p-6 border-t border-[#222222] bg-[#0a0a0a] shrink-0">
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-magenta text-white flex items-center justify-center font-bold text-lg shrink-0">
              {user?.initials ?? "VVC"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white uppercase tracking-wider truncate">
                {user?.fullName ?? "Onbekend"}
              </p>
              <p className="text-[10px] text-[#888888] font-bold tracking-widest uppercase mt-0.5">
                {user?.role.replace("_", " ") ?? "—"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <button
              type="button"
              onClick={handleLogout}
              className="text-[#666666] hover:text-magenta transition-colors p-1"
              aria-label="Uitloggen"
              title="Uitloggen"
            >
              <LogOut size={16} />
            </button>
            <Settings
              size={16}
              className="text-[#666666] group-hover:text-white transition-colors"
            />
          </div>
        </div>
      </div>
    </aside>
  )
}

/* ─── Internals ────────────────────────────────────────────────── */

function NavItem({
  to,
  icon,
  label,
  onNavigate,
  currentPath,
}: {
  to: string
  icon: React.ReactNode
  label: string
  onNavigate: () => void
  currentPath: string
}) {
  const isActive = matchActive(currentPath, to)
  return (
    <NavLink
      to={to}
      end={to === "/onboarding"}
      onClick={onNavigate}
      className={cn(
        "w-full flex items-center px-4 py-3 transition-all duration-200 group text-left border-l-4",
        isActive
          ? "text-white border-magenta bg-[#111111]"
          : "text-[#666666] hover:text-white border-transparent hover:bg-[#0a0a0a]",
      )}
    >
      <span
        className={cn(
          "transition-colors",
          isActive
            ? "text-magenta"
            : "text-[#555555] group-hover:text-white",
        )}
      >
        {icon}
      </span>
      <span
        className={cn(
          "ml-4 text-xs tracking-widest uppercase",
          isActive ? "font-black" : "font-bold",
        )}
      >
        {label}
      </span>
    </NavLink>
  )
}

function AppItem({
  to,
  label,
  onNavigate,
  currentPath,
}: {
  to: string
  label: string
  onNavigate: () => void
  currentPath: string
}) {
  const isActive = currentPath === to
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={cn(
        "w-full flex items-center px-4 py-2.5 transition-all text-left group",
        isActive ? "text-white" : "text-[#666666] hover:text-white",
      )}
    >
      <span
        className={cn(
          "text-xs tracking-wider uppercase flex items-center",
          isActive ? "font-black" : "font-bold",
        )}
      >
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full mr-3 transition-colors",
            isActive ? "bg-magenta" : "bg-[#333333] group-hover:bg-white",
          )}
        />
        {label}
      </span>
    </NavLink>
  )
}

/** Geeft true voor exacte match, of als `to` een prefix is van het pad. */
function matchActive(pathname: string, to: string): boolean {
  if (to === pathname) return true
  if (to !== "/" && pathname.startsWith(`${to}/`)) return true
  return false
}
