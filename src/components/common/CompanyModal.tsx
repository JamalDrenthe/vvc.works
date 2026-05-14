import { AlertTriangle, Briefcase, CheckCircle2, Info, Target, X } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { getStatusVisual } from "@/lib/company-status"
import type { Company } from "@/types"

interface CompanyModalProps {
  company: Company
  onClose: () => void
}

/**
 * Detail-modal voor een Bedrijfscase. Klik op overlay sluit; inner panel
 * stopt propagation. Gebruikt sonner toast i.p.v. native alert (UX).
 *
 * Wordt context-aware gerenderd:
 *  - claimable status → standaard scenario + actieplan + Claim CTA
 *  - non-claimable status → strategische uitleg waarom deze case niet
 *    geschikt is en wat het VVC-alternatief is
 */
export function CompanyModal({ company, onClose }: CompanyModalProps) {
  const visual = getStatusVisual(company.status)

  const handleClaim = () => {
    toast.success("Testcase geclaimd", {
      description: `Scenario voor ${company.name} is gestart. Succes met de executie.`,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="company-modal-title"
    >
      <div
        className="bg-[#0a0a0a] border border-[#333333] w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-magenta relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-[#666666] hover:text-white bg-[#111111] p-2 transition-colors cursor-pointer z-10"
          aria-label="Sluiten"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* ─── Header ─── */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-magenta/20 border border-magenta/30 flex items-center justify-center text-magenta">
              <Briefcase size={24} />
            </div>
            <div className="min-w-0">
              <h2
                id="company-modal-title"
                className="text-3xl font-black text-white tracking-tight"
              >
                {company.name}
              </h2>
              <p className="text-[#888888] text-xs uppercase tracking-widest font-bold mt-1">
                {company.sector} · {company.category} · {company.target}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <span
              className={cn(
                "inline-block text-[10px] font-black uppercase tracking-widest px-2 py-1 border",
                visual.pill,
              )}
            >
              {visual.label}
            </span>
          </div>

          {/* ─── Bonus cards (alleen bij claimbare status) ─── */}
          {visual.claimable ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-black border border-[#222222] p-4">
                <p className="text-[10px] text-[#888888] uppercase tracking-widest font-black mb-1">
                  Platform Bonus
                </p>
                <p className="text-2xl font-black text-emerald-400">
                  {company.bonus}
                </p>
              </div>
              <div className="bg-magenta/10 border border-magenta/30 p-4">
                <p className="text-[10px] text-magenta uppercase tracking-widest font-black mb-1">
                  VVC Plaatsingsbonus
                </p>
                <p className="text-2xl font-black text-magenta">€300,-</p>
              </div>
            </div>
          ) : (
            <ContextBanner
              status={company.status}
              explainer={visual.longExplainer}
            />
          )}

          {/* ─── Scenario voorwaarden of strategische context ─── */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-white mb-3 flex items-center gap-2">
                <Target size={16} className="text-magenta" />
                {visual.claimable
                  ? "De Scenario Voorwaarden"
                  : "Strategische Context"}
              </h3>
              <div className="bg-[#111111] p-4 text-[#cccccc] leading-relaxed text-sm border border-[#222222]">
                {company.reqs}
                {visual.claimable && (
                  <p className="mt-3 text-xs text-[#888888] italic">
                    *Let op: in lijn met het VVC beleid mag deze case geen vorm
                    van fraude of ongeoorloofd bonus-hoppen betreffen. Executie
                    vereist hoogwaardige plaatsing.
                  </p>
                )}
              </div>
            </div>

            {/* ─── Actieplan of VVC-alternatief ─── */}
            {visual.claimable ? (
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-magenta" />
                  Jouw Actieplan
                </h3>
                <ul className="space-y-3">
                  <ActionStep
                    step="1"
                    text={`Analyseer de voorwaarden van het ${company.name} ecosysteem en de specifieke ${company.sector}-dynamiek.`}
                  />
                  <ActionStep
                    step="2"
                    text={`Identificeer een kwalitatieve ${company.target} prospect in je warme netwerk.`}
                  />
                  <ActionStep
                    step="3"
                    text="Sluit de deal en begeleid de onboarding conform de voorwaarden. Resultaat is de enige waarheid."
                  />
                </ul>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-white mb-3 flex items-center gap-2">
                  <Info size={16} className="text-magenta" />
                  Wat nu?
                </h3>
                <div className="bg-black border border-[#222222] p-4 text-sm text-[#cccccc] leading-relaxed">
                  Filter op <strong className="text-white">Actief</strong> of
                  <strong className="text-white"> Actief (Partner)</strong> om
                  bedrijven te vinden waar wél een directe plaatsing mogelijk
                  is. Voor strategische context over deze categorie: bekijk de{" "}
                  <strong className="text-magenta">VVC Academy</strong> module
                  voor <strong className="text-white">{company.sector}</strong>.
                </div>
              </div>
            )}
          </div>

          {/* ─── Footer CTA's ─── */}
          <div className="mt-10 pt-6 border-t border-[#222222] flex flex-col sm:flex-row gap-4">
            {visual.claimable ? (
              <>
                <button
                  type="button"
                  onClick={handleClaim}
                  className="flex-1 bg-magenta hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-xs py-3 px-6 transition-colors duration-200"
                >
                  Claim deze Testcase
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-[#333333] text-white hover:border-white transition-colors font-black uppercase tracking-widest text-xs"
                >
                  Annuleren
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-[#111111] hover:bg-[#1a1a1a] border border-[#333333] hover:border-white text-white font-black uppercase tracking-widest text-xs py-3 px-6 transition-colors duration-200"
              >
                Begrepen — Terug naar Matrix
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ContextBanner({
  status,
  explainer,
}: {
  status: string
  explainer: string
}) {
  return (
    <div className="bg-[#111111] border border-[#333333] p-4 mb-8 flex gap-3">
      <AlertTriangle
        size={20}
        className="text-amber-400 shrink-0 mt-0.5"
        aria-hidden="true"
      />
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">
          {status}
        </p>
        <p className="text-sm text-[#cccccc] leading-relaxed">{explainer}</p>
      </div>
    </div>
  )
}

function ActionStep({ step, text }: { step: string; text: string }) {
  return (
    <li className="flex gap-3 text-sm text-[#cccccc] bg-black p-3 border border-[#222222]">
      <span className="font-black text-magenta">{step}.</span>
      <span>{text}</span>
    </li>
  )
}
