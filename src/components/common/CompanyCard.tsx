import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { getStatusVisual } from "@/lib/company-status"
import type { Company } from "@/types"

interface CompanyCardProps {
  company: Company
  onClick: () => void
}

/**
 * Eén bedrijfskaart op de "126 Bedrijven" pagina.
 *
 * Visuele logica:
 *  - Actief / Partner / Indirect / Gedeeltelijk → volle kleuren, claimbaar
 *  - Gepauzeerd / Inactief / Overgenomen / Geen bonus → gemuted, alleen
 *    info-modal (geen claim CTA)
 *
 * Status-pill kleur en gedrag komen uit @/lib/company-status zodat
 * CompanyCard en CompanyModal consistent blijven.
 */
export function CompanyCard({ company, onClick }: CompanyCardProps) {
  const visual = getStatusVisual(company.status)
  const isB2B = company.target.includes("B2B") && !company.target.startsWith("B2C")

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${company.name} — ${visual.label}: bekijk case-details`}
      className={cn(
        "bg-[#0a0a0a] border border-[#222222] p-5 transition-all duration-200 flex flex-col h-full text-left w-full cursor-pointer",
        visual.muted
          ? "opacity-60 hover:opacity-90 hover:border-[#333333]"
          : "hover:border-magenta/50 hover:shadow-magenta group",
      )}
    >
      <div className="flex justify-between items-start mb-4 gap-3">
        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              "text-xl font-bold truncate transition-colors",
              visual.muted
                ? "text-[#aaaaaa]"
                : "text-white group-hover:text-magenta",
            )}
          >
            {company.name}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#888888] bg-[#111111] px-2 py-1">
              {company.category}
            </span>
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 text-[10px] font-black uppercase tracking-widest px-2 py-1 border",
            isB2B
              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          )}
        >
          {company.target}
        </span>
      </div>

      <div className="flex-1">
        <div
          className={cn(
            "text-2xl font-black mb-2 tracking-tight",
            visual.muted ? "text-[#666666]" : "text-white",
          )}
        >
          {company.bonus}
        </div>
        <p className="text-sm text-[#888888] line-clamp-2 leading-relaxed">
          {company.reqs}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-[#222222] flex justify-between items-center gap-2">
        <span
          className={cn(
            "text-[10px] font-black uppercase tracking-widest px-2 py-1 border",
            visual.pill,
          )}
        >
          {visual.label}
        </span>
        {visual.claimable ? (
          <span className="text-magenta text-xs font-black uppercase tracking-widest flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
            Bekijk Case <ChevronRight size={14} />
          </span>
        ) : (
          <span className="text-[#555555] text-[10px] font-bold uppercase tracking-widest">
            Info →
          </span>
        )}
      </div>
    </button>
  )
}
