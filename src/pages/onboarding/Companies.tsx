import { useEffect, useMemo, useState } from "react"
import { Filter, Layers, Search, Sparkles } from "lucide-react"
import { CompanyCard } from "@/components/common/CompanyCard"
import { CompanyModal } from "@/components/common/CompanyModal"
import { companiesApi } from "@/lib/api/companies.api"
import { getStatusVisual } from "@/lib/company-status"
import { cn } from "@/lib/utils"
import type { Company } from "@/types"

const ALL = "All" as const

const STATUS_FILTERS = [
  ALL,
  "Actief",
  "Actief (Partner)",
  "Actief (Indirect)",
  "Gedeeltelijk",
  "Gepauzeerd",
  "Geen actieve bonus",
] as const

/**
 * "De 126 Bedrijven" — strategische matrix uit het VVC onderzoek.
 *
 * UI biedt drie filtervlakken bovenop fulltext search:
 *  - Sector (Banken & Neobanken, Crypto & Web3, …)
 *  - Doelgroep (B2C / B2B)
 *  - Status (Actief, Partner, Gepauzeerd, …)
 *
 * Stats-strip toont realtime hoeveel bedrijven aan de filterset voldoen
 * en welk deel daarvan daadwerkelijk claimbaar is.
 */
export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sectorFilter, setSectorFilter] = useState<string>(ALL)
  const [targetFilter, setTargetFilter] = useState<string>(ALL)
  const [statusFilter, setStatusFilter] = useState<string>(ALL)
  const [search, setSearch] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  useEffect(() => {
    let cancelled = false
    void companiesApi
      .list()
      .then((rows) => {
        if (!cancelled) {
          setCompanies(rows)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const sectors = useMemo(
    () => [ALL, ...Array.from(new Set(companies.map((c) => c.sector)))],
    [companies],
  )

  const filtered = useMemo(() => {
    const needle = search.toLowerCase()
    return companies.filter((c) => {
      const matchSector = sectorFilter === ALL || c.sector === sectorFilter
      const matchTarget =
        targetFilter === ALL ||
        (targetFilter === "B2C" && c.target.includes("B2C")) ||
        (targetFilter === "B2B" && c.target.includes("B2B"))
      const matchStatus = statusFilter === ALL || c.status === statusFilter
      const matchSearch =
        !needle ||
        c.name.toLowerCase().includes(needle) ||
        c.reqs.toLowerCase().includes(needle) ||
        c.category.toLowerCase().includes(needle)
      return matchSector && matchTarget && matchStatus && matchSearch
    })
  }, [companies, sectorFilter, targetFilter, statusFilter, search])

  /** Aggregate stats over de complete dataset, niet over de filter. */
  const stats = useMemo(() => {
    const total = companies.length
    const claimable = companies.filter(
      (c) => getStatusVisual(c.status).claimable,
    ).length
    const partnerOnly = companies.filter(
      (c) => c.status === "Actief (Partner)",
    ).length
    const paused = companies.filter(
      (c) => c.status === "Gepauzeerd" || c.status === "Gedeeltelijk",
    ).length
    return { total, claimable, partnerOnly, paused }
  }, [companies])

  return (
    <div className="space-y-6 animate-fade-in relative max-w-7xl mx-auto">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#222222] pb-6">
        <div>
          <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-3">
            Onboarding · Testcases
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
            De 126 Bedrijven Matrix
          </h2>
          <p className="text-[#888888] max-w-2xl">
            Strategische analyse van referralprogramma's in 7 sectoren —
            van CASS-overstapbonussen tot enterprise broker-netwerken. Selecteer
            een ecosysteem voor jouw scenario-based testcase.
          </p>
        </div>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]"
            size={16}
          />
          <input
            type="text"
            placeholder="Zoek bedrijf, eis of categorie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#0a0a0a] border border-[#333333] pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-magenta w-full sm:w-80 text-white placeholder-[#555555]"
          />
        </div>
      </div>

      {/* ─── Stats strip ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile label="Totaal" value={stats.total} icon={<Layers size={16} />} />
        <StatTile
          label="Claimbaar"
          value={stats.claimable}
          accent="text-emerald-400"
          icon={<Sparkles size={16} />}
        />
        <StatTile
          label="Partner-only"
          value={stats.partnerOnly}
          accent="text-magenta"
        />
        <StatTile
          label="Gepauzeerd"
          value={stats.paused}
          accent="text-amber-400"
        />
      </div>

      {/* ─── Filters ─── */}
      <div className="bg-[#0a0a0a] border border-[#222222] p-4 space-y-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#888888]">
          <Filter size={14} />
          Filters
        </div>

        <FilterRow label="Sector">
          {sectors.map((s) => (
            <FilterChip
              key={s}
              active={sectorFilter === s}
              onClick={() => setSectorFilter(s)}
            >
              {s === ALL ? "Alle sectoren" : s}
            </FilterChip>
          ))}
        </FilterRow>

        <FilterRow label="Doelgroep">
          {[ALL, "B2C", "B2B"].map((t) => (
            <FilterChip
              key={t}
              active={targetFilter === t}
              onClick={() => setTargetFilter(t)}
            >
              {t === ALL ? "Alle doelgroepen" : t}
            </FilterChip>
          ))}
        </FilterRow>

        <FilterRow label="Status">
          {STATUS_FILTERS.map((s) => (
            <FilterChip
              key={s}
              active={statusFilter === s}
              onClick={() => setStatusFilter(s)}
            >
              {s === ALL ? "Alle statussen" : s}
            </FilterChip>
          ))}
        </FilterRow>

        <div className="flex justify-between items-center pt-2 border-t border-[#222222] text-[11px] font-bold uppercase tracking-widest">
          <span className="text-[#888888]">
            <span className="text-white">{filtered.length}</span> van{" "}
            {stats.total} bedrijven
          </span>
          {(sectorFilter !== ALL ||
            targetFilter !== ALL ||
            statusFilter !== ALL ||
            search) && (
            <button
              type="button"
              onClick={() => {
                setSectorFilter(ALL)
                setTargetFilter(ALL)
                setStatusFilter(ALL)
                setSearch("")
              }}
              className="text-magenta hover:text-white transition-colors"
            >
              Reset alles
            </button>
          )}
        </div>
      </div>

      {/* ─── Cards grid ─── */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#0a0a0a] border border-[#222222] p-5 h-48 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-[#666666] text-sm font-bold uppercase tracking-widest">
          Geen bedrijven gevonden die voldoen aan je criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onClick={() => setSelectedCompany(company)}
            />
          ))}
        </div>
      )}

      {selectedCompany && (
        <CompanyModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  )
}

/* ─── Sub-componenten ──────────────────────────────────────────────── */

function StatTile({
  label,
  value,
  accent = "text-white",
  icon,
}: {
  label: string
  value: number
  accent?: string
  icon?: React.ReactNode
}) {
  return (
    <div className="bg-[#0a0a0a] border border-[#222222] p-4">
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#888888] mb-2">
        <span>{label}</span>
        {icon && <span className="text-[#555555]">{icon}</span>}
      </div>
      <div className={cn("text-3xl font-black tracking-tighter", accent)}>
        {value}
      </div>
    </div>
  )
}

function FilterRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <span className="text-[10px] font-black uppercase tracking-widest text-[#666666] w-20 shrink-0">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border transition-all duration-150",
        active
          ? "bg-magenta border-magenta text-white"
          : "bg-transparent border-[#333333] text-[#aaaaaa] hover:border-white hover:text-white",
      )}
    >
      {children}
    </button>
  )
}
