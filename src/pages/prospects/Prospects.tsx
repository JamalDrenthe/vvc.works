import { useState, useMemo } from "react"
import {
  Crosshair,
  Plus,
  Search,
  Clock,
  ArrowRight,
  CheckCircle2,
  Building2,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { DataCard } from "@/components/common/DataCard"
import { cn } from "@/lib/utils"

type PipelineStage =
  | "Contact Gelegd"
  | "Double Team Pilot"
  | "Kwalificatie (Storting)"
  | "Plaatsing Behaald"

interface Prospect {
  id: string
  name: string
  company: string
  targetSector: string
  targetType: "B2C" | "B2B"
  stage: PipelineStage
  expectedBonus: string
  lastContact: string
  notes: string
  priority: "High" | "Medium" | "Standard"
}

const INITIAL_PROSPECTS: Prospect[] = [
  {
    id: "lead-1",
    name: "Alex van Leeuwen",
    company: "Barclays Premier Overstap",
    targetSector: "Banken & Neobanken",
    targetType: "B2C",
    stage: "Kwalificatie (Storting)",
    expectedBonus: "£ 200",
    lastContact: "Vandaag",
    notes: "CASS switch ingediend, wacht op automatische incasso verificatie.",
    priority: "High",
  },
  {
    id: "lead-2",
    name: "Thomas Bakker (Vastgoed BV)",
    company: "Tide Business Account",
    targetSector: "Banken & Neobanken",
    targetType: "B2B",
    stage: "Double Team Pilot",
    expectedBonus: "£ 100 + £ 75",
    lastContact: "Gisteren",
    notes: "Samen met Sanne in gesprek over UK limited en holding structuur.",
    priority: "High",
  },
  {
    id: "lead-3",
    name: "Sophie Meijer",
    company: "Bitvavo VIP Trading",
    targetSector: "Crypto & Web3",
    targetType: "B2C",
    stage: "Plaatsing Behaald",
    expectedBonus: "€ 20 + 15% revshare",
    lastContact: "2 dgn geleden",
    notes: "Eerste storting van € 5.000 gedaan. Revshare loopt actief.",
    priority: "Medium",
  },
  {
    id: "lead-4",
    name: "Klaas Veenstra Logistics",
    company: "Finqle Factoring Partnership",
    targetSector: "Factoring & Trade Finance",
    targetType: "B2B",
    stage: "Double Team Pilot",
    expectedBonus: "€ 1.631",
    lastContact: "3 dgn geleden",
    notes: "Factuurstroom van € 80k/mnd. Pitch gepland met Daan Koster.",
    priority: "High",
  },
  {
    id: "lead-5",
    name: "Mila Jansen",
    company: "YoungCapital Trainee",
    targetSector: "HR & Flex-werk",
    targetType: "B2C",
    stage: "Contact Gelegd",
    expectedBonus: "€ 250",
    lastContact: "4 dgn geleden",
    notes: "Oriënterend gesprek over startersbaan in consultancy.",
    priority: "Standard",
  },
]

const STAGES: PipelineStage[] = [
  "Contact Gelegd",
  "Double Team Pilot",
  "Kwalificatie (Storting)",
  "Plaatsing Behaald",
]

export default function ProspectsPage() {
  const [prospects, setProspects] = useState<Prospect[]>(INITIAL_PROSPECTS)
  const [selectedStage, setSelectedStage] = useState<string>("All")
  const [search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Form State
  const [formName, setFormName] = useState("")
  const [formCompany, setFormCompany] = useState("")
  const [formSector, setFormSector] = useState("Banken & Neobanken")
  const [formTargetType, setFormTargetType] = useState<"B2C" | "B2B">("B2B")
  const [formExpectedBonus, setFormExpectedBonus] = useState("")
  const [formNotes, setFormNotes] = useState("")
  const [formPriority, setFormPriority] = useState<"High" | "Medium" | "Standard">("High")

  const filteredProspects = useMemo(() => {
    return prospects.filter((p) => {
      const matchStage = selectedStage === "All" || p.stage === selectedStage
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.company.toLowerCase().includes(search.toLowerCase()) ||
        p.targetSector.toLowerCase().includes(search.toLowerCase())
      return matchStage && matchSearch
    })
  }, [prospects, selectedStage, search])

  const handleAdvanceStage = (id: string) => {
    setProspects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const currentIndex = STAGES.indexOf(p.stage)
          if (currentIndex < STAGES.length - 1) {
            const nextStage = STAGES[currentIndex + 1]
            toast.success(`Prospect bevorderd naar: ${nextStage}`, {
              description: `${p.name} staat nu in ${nextStage}.`,
            })
            return { ...p, stage: nextStage, lastContact: "Zojuist" }
          } else {
            toast.info("Plaatsing is al voltooid!")
          }
        }
        return p
      }),
    )
  }

  const handleAddProspect = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim() || !formCompany.trim()) {
      toast.error("Vul ten minste de naam en het doelbedrijf in.")
      return
    }

    const newProspect: Prospect = {
      id: `lead-${Date.now()}`,
      name: formName.trim(),
      company: formCompany.trim(),
      targetSector: formSector,
      targetType: formTargetType,
      stage: "Contact Gelegd",
      expectedBonus: formExpectedBonus.trim() || "Variabel",
      lastContact: "Vandaag",
      notes: formNotes.trim() || "Eerste contact gelegd via warm netwerk.",
      priority: formPriority,
    }

    setProspects([newProspect, ...prospects])
    setIsModalOpen(false)
    setFormName("")
    setFormCompany("")
    setFormExpectedBonus("")
    setFormNotes("")
    toast.success("Nieuwe prospect succesvol toegevoegd aan de pipeline!")
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto animate-fade-in">
      {/* ─── HEADER ─── */}
      <section className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end border-b border-[#222222] pb-8">
        <div>
          <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-4">
            Pipeline Intelligence
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white uppercase leading-none tracking-tighter mb-3">
            Warme <span className="text-magenta">Prospects</span> & Leads
          </h1>
          <p className="text-[#888888] text-base max-w-2xl font-medium">
            Beheer je relaties, match ze aan de beste partnerbonussen uit De 126 Bedrijven en convergeer naar directe commissie.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-magenta hover:bg-white hover:text-black text-white font-black px-5 py-3 uppercase tracking-widest text-xs flex items-center gap-2 transition-colors duration-200"
        >
          <Plus size={16} /> Nieuwe Prospect
        </button>
      </section>

      {/* ─── KPI STRIP ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px">
        <DataCard
          title="Pipeline Waarde"
          value="€ 38.450"
          sub="Verwachte bonusopbrengst"
          highlight
        />
        <DataCard
          title="Actieve Leads"
          value={prospects.length.toString()}
          sub="In actieve verwerking"
        />
        <DataCard
          title="In Kwalificatie"
          value={prospects.filter((p) => p.stage === "Kwalificatie (Storting)").length.toString()}
          sub="Storting of CASS switch lopend"
        />
        <DataCard
          title="Voltooide Deals"
          value={prospects.filter((p) => p.stage === "Plaatsing Behaald").length.toString()}
          sub="Uitbetaald & passief"
        />
      </section>

      {/* ─── CONTROLS: SEARCH & STAGE FILTER ─── */}
      <section className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-[#0a0a0a] border border-[#222222] p-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Zoek op prospect, bedrijf of sector…"
            className="w-full bg-[#111111] border border-[#222222] text-xs text-white pl-9 pr-4 py-2.5 placeholder-[#555555] focus:outline-none focus:border-magenta"
          />
        </div>

        {/* Stage Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {["All", ...STAGES].map((stage) => (
            <button
              key={stage}
              type="button"
              onClick={() => setSelectedStage(stage)}
              className={cn(
                "px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors",
                selectedStage === stage
                  ? "bg-magenta text-white"
                  : "bg-transparent text-[#888888] hover:text-white hover:bg-[#151515]",
              )}
            >
              {stage === "All" ? "Alle Fasen" : stage}
            </button>
          ))}
        </div>
      </section>

      {/* ─── PROSPECTS PIPELINE LIST ─── */}
      <section className="space-y-4">
        {filteredProspects.length === 0 ? (
          <div className="bg-[#0a0a0a] border border-[#222222] p-12 text-center">
            <Crosshair size={36} className="text-[#444444] mx-auto mb-3" />
            <p className="text-white font-bold text-sm">Geen prospects gevonden voor deze selectie.</p>
            <p className="text-[#666666] text-xs mt-1">Pas je zoekopdracht of filter aan, of voeg een nieuwe prospect toe.</p>
          </div>
        ) : (
          filteredProspects.map((lead) => (
            <div
              key={lead.id}
              className="bg-[#0a0a0a] border border-[#222222] p-6 hover:border-[#333333] transition-colors flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
            >
              {/* Lead Info */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-black text-white uppercase tracking-tight">
                    {lead.name}
                  </span>
                  <span className="text-[10px] bg-[#161616] border border-[#2f2f2f] text-[#888888] px-2 py-0.5 font-bold uppercase">
                    {lead.targetType}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-black uppercase px-2 py-0.5 border tracking-wider",
                      lead.priority === "High"
                        ? "border-magenta/60 text-magenta bg-magenta/10"
                        : "border-[#444444] text-[#888888]",
                    )}
                  >
                    {lead.priority} Priori
                  </span>
                </div>

                <div className="text-xs text-[#aaaaaa] flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1.5 font-bold text-white">
                    <Building2 size={13} className="text-magenta" /> {lead.company}
                  </span>
                  <span className="text-[#666666]">•</span>
                  <span>{lead.targetSector}</span>
                  <span className="text-[#666666]">•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> Contact: {lead.lastContact}
                  </span>
                </div>

                <p className="text-xs text-[#777777] italic max-w-2xl">
                  &ldquo;{lead.notes}&rdquo;
                </p>
              </div>

              {/* Stage & Value & Next Action */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 shrink-0 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-[#1f1f1f]">
                {/* Expected Bonus */}
                <div className="text-left lg:text-right">
                  <div className="text-[10px] uppercase font-bold text-[#666666] tracking-wider">
                    Bonus Potentieel
                  </div>
                  <div className="text-base font-black text-magenta">
                    {lead.expectedBonus}
                  </div>
                </div>

                {/* Stage Badge */}
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#666666] tracking-wider mb-1">
                    Fase
                  </div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-[#151515] border border-[#2c2c2c] text-white">
                    {lead.stage}
                  </span>
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={() => handleAdvanceStage(lead.id)}
                  disabled={lead.stage === "Plaatsing Behaald"}
                  className="bg-white hover:bg-magenta hover:text-white text-black font-black uppercase tracking-widest text-[11px] py-2.5 px-4 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-black disabled:cursor-not-allowed"
                >
                  {lead.stage === "Plaatsing Behaald" ? (
                    <>
                      <CheckCircle2 size={14} className="text-emerald-500" /> Uitbetaald
                    </>
                  ) : (
                    <>
                      Volgende Fase <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* ─── ADD PROSPECT MODAL ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-[#333333] max-w-xl w-full p-8 relative animate-fade-in-up">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-[#666666] hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-1">
                Warm Netwerk
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                Nieuwe Prospect Toevoegen
              </h2>
            </div>

            <form onSubmit={handleAddProspect} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                  Naam Prospect / Contactpersoon *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Bijv. David Mulder"
                  className="w-full bg-[#151515] border border-[#2e2e2e] p-3 text-xs text-white focus:outline-none focus:border-magenta"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                    Gekoppeld Doelbedrijf *
                  </label>
                  <input
                    type="text"
                    required
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="Bijv. Barclays, Tide, Bitvavo"
                    className="w-full bg-[#151515] border border-[#2e2e2e] p-3 text-xs text-white focus:outline-none focus:border-magenta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                    Verwachte Bonuswaarde
                  </label>
                  <input
                    type="text"
                    value={formExpectedBonus}
                    onChange={(e) => setFormExpectedBonus(e.target.value)}
                    placeholder="Bijv. £200 of €50"
                    className="w-full bg-[#151515] border border-[#2e2e2e] p-3 text-xs text-white focus:outline-none focus:border-magenta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                    Sector
                  </label>
                  <select
                    value={formSector}
                    onChange={(e) => setFormSector(e.target.value)}
                    className="w-full bg-[#151515] border border-[#2e2e2e] p-3 text-xs text-white focus:outline-none focus:border-magenta"
                  >
                    <option value="Banken & Neobanken">Banken & Neobanken</option>
                    <option value="Crypto & Web3">Crypto & Web3</option>
                    <option value="Betalingen & BNPL">Betalingen & BNPL</option>
                    <option value="Telecom">Telecom</option>
                    <option value="HR & Flex-werk">HR & Flex-werk</option>
                    <option value="Factoring & Trade Finance">Factoring & Trade Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                    Doelgroep
                  </label>
                  <div className="flex gap-2">
                    {(["B2B", "B2C"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormTargetType(type)}
                        className={cn(
                          "flex-1 py-3 text-xs font-bold uppercase tracking-wider border transition-colors",
                          formTargetType === type
                            ? "border-magenta bg-magenta text-white"
                            : "border-[#2e2e2e] bg-[#151515] text-[#888888]",
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                  Prioriteit
                </label>
                <div className="flex gap-2">
                  {(["High", "Medium", "Standard"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormPriority(p)}
                      className={cn(
                        "flex-1 py-2.5 text-xs font-bold uppercase tracking-wider border transition-colors",
                        formPriority === p
                          ? "border-magenta bg-magenta text-white"
                          : "border-[#2e2e2e] bg-[#151515] text-[#888888]",
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                  Notities & Strategie
                </label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Bijv. Warme relatie via studie. Heeft switch-intent voor betaalrekening."
                  rows={3}
                  className="w-full bg-[#151515] border border-[#2e2e2e] p-3 text-xs text-white focus:outline-none focus:border-magenta resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#222222]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold uppercase text-[#888888] hover:text-white transition-colors"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="bg-magenta hover:bg-white hover:text-black text-white font-black px-6 py-2.5 text-xs uppercase tracking-widest transition-colors"
                >
                  Toevoegen Aan Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
