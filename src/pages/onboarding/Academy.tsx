import { useState } from "react"
import { useNavigate } from "react-router"
import {
  Antenna,
  Bitcoin,
  Briefcase,
  ChevronDown,
  CreditCard,
  Landmark,
  Lightbulb,
  Quote,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  academyModules,
  strategicTakeaways,
  type AcademyModule,
} from "@/data/academy"

const ICON_MAP = {
  landmark: Landmark,
  bitcoin: Bitcoin,
  "credit-card": CreditCard,
  antenna: Antenna,
  users: Users,
  briefcase: Briefcase,
  "trending-up": TrendingUp,
} as const

/**
 * VVC Academy — leerplatform gebouwd op het strategisch onderzoek naar
 * referralprogramma's in 126 ondernemingen.
 *
 * Structuur:
 *  1. Hero — positionering van de Academy
 *  2. Fundament — CAC × LTV framework + B2C/B2B dichotomie
 *  3. Module-navigatie + 7 sectormodules (expandable)
 *  4. Strategische conclusies — uit sectie 10 van het onderzoek
 *  5. CTA naar de 126 Bedrijven Matrix
 */
export default function AcademyPage() {
  const navigate = useNavigate()
  const [openModuleId, setOpenModuleId] = useState<string | null>(
    academyModules[0]?.id ?? null,
  )

  return (
    <div className="space-y-10 animate-fade-in max-w-6xl mx-auto">
      {/* ─── HERO ─── */}
      <header className="border-b border-[#222222] pb-6">
        <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-3">
          Onboarding · Academy
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-3">
          De Strategische Anatomie van een Referral
        </h2>
        <p className="text-[#888888] max-w-3xl leading-relaxed">
          Diepgaande analyse van 126 ondernemingen — van CASS-overstapbonussen
          en Web3 revenue share tot enterprise factoring commissies. Begrijp
          waarom een £10 case niet hetzelfde is als een €1.631 case, en
          positioneer jezelf binnen die spreiding.
        </p>
      </header>

      {/* ─── FUNDAMENT — META FRAMEWORK ─── */}
      <section className="bg-gradient-to-br from-[#0a0a0a] to-black border border-magenta/20 p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute -right-32 -top-32 w-64 h-64 bg-magenta/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-3">
          <Target size={16} className="text-magenta" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta">
            Fundament · Module 1
          </span>
        </div>
        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
          CAC × LTV — De Nieuwe Wet van Acquisitie
        </h3>
        <p className="text-[#aaaaaa] leading-relaxed mb-6 max-w-3xl">
          De architectuur van referralprogramma's ondergaat een fundamentele
          transformatie. Vroeger: onvoorwaardelijke eenmalige cash-uitkeringen.
          Nu: sterk voorwaardelijke, gefaseerde en ecosysteem-gebonden
          beloningen — om Customer Acquisition Cost te optimaliseren in relatie
          tot de Customer Lifetime Value.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FundamentPanel
            tag="B2C — Viraliteit"
            tagColor="text-emerald-400"
            stat="£10 – $2.000"
            statLabel="Bonusrange"
            principles={[
              "Frictieloze onboarding + directe psychologische beloningen",
              "Volume compenseert lagere individuele klantwaarde",
              "Multi-stap verificatie weert spookaccounts",
              "Gamificatie & netwerkeffecten (Bunq Points, Revolut)",
            ]}
          />
          <FundamentPanel
            tag="B2B — Performance"
            tagColor="text-magenta"
            stat="£100 – €1.631"
            statLabel="Commissie per dossier"
            principles={[
              "Lange beslissingscycli, due diligence vereist",
              "Omzetdrempels in tienduizenden euro's",
              "Revenue sharing in plaats van eenmalige bonus",
              "Gesloten partnermodellen (KYC + AML)",
            ]}
          />
        </div>
      </section>

      {/* ─── MODULE NAVIGATIE ─── */}
      <section>
        <div className="flex items-end justify-between mb-4 flex-wrap gap-3">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-1">
              7 Modules
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              Sectorspecifieke Dynamiek
            </h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">
            Klik om uit te klappen
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {academyModules.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() =>
                setOpenModuleId(openModuleId === m.id ? null : m.id)
              }
              className={cn(
                "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border transition-colors duration-150",
                openModuleId === m.id
                  ? "bg-magenta border-magenta text-white"
                  : "bg-transparent border-[#333333] text-[#aaaaaa] hover:border-white hover:text-white",
              )}
            >
              {`0${m.number}. ${m.sector}`}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {academyModules.map((module) => (
            <ModuleAccordion
              key={module.id}
              module={module}
              isOpen={openModuleId === module.id}
              onToggle={() =>
                setOpenModuleId(openModuleId === module.id ? null : module.id)
              }
            />
          ))}
        </div>
      </section>

      {/* ─── STRATEGISCHE CONCLUSIES ─── */}
      <section className="bg-[#0a0a0a] border border-[#222222] p-8 lg:p-10">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={16} className="text-magenta" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta">
            Module 9 · Conclusie
          </span>
        </div>
        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
          Strategische Implicaties voor VVC
        </h3>
        <p className="text-[#aaaaaa] leading-relaxed mb-6 max-w-3xl">
          Drie meta-conclusies uit het volledige onderzoek. Pas deze toe op
          elke case die je oppakt — ongeacht sector.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {strategicTakeaways.map((t, i) => (
            <article
              key={t.title}
              className="bg-black border border-[#222222] p-5 flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-black text-magenta tracking-tighter">
                  0{i + 1}
                </span>
                <div className="h-px flex-1 bg-[#222222]" />
              </div>
              <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">
                {t.title}
              </h4>
              <p className="text-xs text-[#aaaaaa] leading-relaxed">{t.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#222222]">
          <div className="flex items-start gap-3 max-w-3xl">
            <Quote size={20} className="text-magenta shrink-0 mt-1" />
            <p className="text-[#cccccc] italic leading-relaxed">
              De focus is definitief verschoven van{" "}
              <span className="text-white font-black">naakte acquisitie</span>{" "}
              naar{" "}
              <span className="text-magenta font-black">
                geverifieerde langetermijnretentie
              </span>
              . Bedrijven die deze balans vinden tussen frictieloze peer-to-peer
              bonus en strenge compliance bezitten op lange termijn het
              krachtigste wapen in de strijd om klantwaarde.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-magenta/10 border border-magenta/40 p-8 lg:p-10 text-center">
        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
          Klaar voor je eerste plaatsing?
        </h3>
        <p className="text-[#aaaaaa] mb-6 max-w-xl mx-auto">
          Pas wat je hier hebt geleerd toe op de matrix van 113 actieve cases.
        </p>
        <button
          type="button"
          onClick={() => navigate("/onboarding/companies")}
          className="bg-magenta hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-xs py-3 px-8 transition-colors"
        >
          Naar de 126 Bedrijven Matrix
        </button>
      </section>
    </div>
  )
}

/* ─── Sub-componenten ──────────────────────────────────────────────── */

function FundamentPanel({
  tag,
  tagColor,
  stat,
  statLabel,
  principles,
}: {
  tag: string
  tagColor: string
  stat: string
  statLabel: string
  principles: string[]
}) {
  return (
    <div className="bg-black border border-[#222222] p-5">
      <p
        className={cn(
          "text-[10px] font-black uppercase tracking-[0.2em] mb-3",
          tagColor,
        )}
      >
        {tag}
      </p>
      <div className="mb-4">
        <p className="text-3xl font-black text-white tracking-tighter">
          {stat}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666] mt-1">
          {statLabel}
        </p>
      </div>
      <ul className="space-y-2 text-sm text-[#aaaaaa] leading-relaxed">
        {principles.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="text-magenta shrink-0 font-black">·</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ModuleAccordion({
  module,
  isOpen,
  onToggle,
}: {
  module: AcademyModule
  isOpen: boolean
  onToggle: () => void
}) {
  const Icon = ICON_MAP[module.iconName]

  return (
    <article
      className={cn(
        "bg-[#0a0a0a] border transition-colors",
        isOpen ? "border-magenta/40" : "border-[#222222]",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[#111111] transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div
            className={cn(
              "w-12 h-12 bg-black border flex items-center justify-center shrink-0",
              module.accent,
            )}
          >
            <Icon size={22} className={module.accent.split(" ")[0]} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#888888]">
              Module 0{module.number}
            </p>
            <h4 className="text-lg font-black text-white uppercase tracking-tight truncate">
              {module.sector}
            </h4>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={cn(
            "text-[#888888] shrink-0 transition-transform duration-200",
            isOpen && "rotate-180 text-magenta",
          )}
        />
      </button>

      {isOpen && (
        <div className="border-t border-[#222222] p-6 space-y-6 animate-fade-in">
          {/* Kernprincipe */}
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-2 flex items-center gap-2">
              <Target size={12} /> Kernprincipe
            </h5>
            <p className="text-[#cccccc] leading-relaxed">{module.principle}</p>
          </div>

          {/* Metrics */}
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-3 flex items-center gap-2">
              <TrendingUp size={12} /> Kerncijfers
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {module.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-black border border-[#222222] p-3"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666] mb-1">
                    {m.label}
                  </p>
                  <p className="text-lg font-black text-white tracking-tight">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Case studies */}
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-3 flex items-center gap-2">
              <Quote size={12} /> Case Studies
            </h5>
            <div className="space-y-3">
              {module.caseStudies.map((cs) => (
                <div
                  key={cs.name}
                  className="bg-black border-l-2 border-magenta border-y border-r border-y-[#222222] border-r-[#222222] p-4"
                >
                  <p className="text-sm font-black text-white mb-1">
                    {cs.name}
                  </p>
                  <p className="text-sm text-[#aaaaaa] leading-relaxed">
                    {cs.insight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Lessons */}
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-3 flex items-center gap-2">
              <ShieldCheck size={12} /> Lessen voor VVC-partners
            </h5>
            <ul className="space-y-2">
              {module.lessons.map((lesson, idx) => (
                <li
                  key={lesson}
                  className="flex gap-3 text-sm text-[#cccccc] bg-black p-3 border border-[#222222]"
                >
                  <span className="font-black text-magenta shrink-0">
                    0{idx + 1}.
                  </span>
                  <span className="leading-relaxed">{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  )
}
