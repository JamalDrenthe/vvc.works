import { useState, useMemo } from "react"
import {
  Copy,
  Check,
  Star,
  Calendar,
  Zap,
  Plus,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { DataCard } from "@/components/common/DataCard"
import { cn } from "@/lib/utils"

interface Talent {
  id: string
  name: string
  role: "Trainee Senior Consultant" | "Trainee Senior Closer" | "Trainee Senior Resourcer"
  progress: string
  completedModules: number
  totalModules: number
  placementsThisMonth: number
  monthlyPassiveYield: string
  qualityScore: number
  status: "Top Performer" | "On Track" | "Coaching Vereist"
  joinedDate: string
}

const INITIAL_TALENTS: Talent[] = [
  {
    id: "t-1",
    name: "Lars Hendriks",
    role: "Trainee Senior Consultant",
    progress: "Gevorderd (Live Cases)",
    completedModules: 3,
    totalModules: 3,
    placementsThisMonth: 6,
    monthlyPassiveYield: "€ 350 / mnd",
    qualityScore: 9.8,
    status: "Top Performer",
    joinedDate: "12 aug 2026",
  },
  {
    id: "t-2",
    name: "Elena de Vries",
    role: "Trainee Senior Closer",
    progress: "Double Team Gekoppeld",
    completedModules: 3,
    totalModules: 3,
    placementsThisMonth: 4,
    monthlyPassiveYield: "€ 250 / mnd",
    qualityScore: 9.4,
    status: "On Track",
    joinedDate: "28 aug 2026",
  },
  {
    id: "t-3",
    name: "Jesse van den Berg",
    role: "Trainee Senior Resourcer",
    progress: "Academy Module 2/3",
    completedModules: 2,
    totalModules: 3,
    placementsThisMonth: 2,
    monthlyPassiveYield: "€ 150 / mnd",
    qualityScore: 9.1,
    status: "On Track",
    joinedDate: "10 sep 2026",
  },
  {
    id: "t-4",
    name: "Nadine Bakker",
    role: "Trainee Senior Closer",
    progress: "Onboarding & Audit",
    completedModules: 1,
    totalModules: 3,
    placementsThisMonth: 0,
    monthlyPassiveYield: "€ 0 / mnd",
    qualityScore: 8.7,
    status: "Coaching Vereist",
    joinedDate: "02 okt 2026",
  },
]

export default function TalentenPage() {
  const [talents, setTalents] = useState<Talent[]>(INITIAL_TALENTS)
  const [roleFilter, setRoleFilter] = useState<string>("All")
  const [copiedLink, setCopiedLink] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // New Talent Form State
  const [formName, setFormName] = useState("")
  const [formRole, setFormRole] = useState<Talent["role"]>("Trainee Senior Consultant")

  const filteredTalents = useMemo(() => {
    return talents.filter(
      (t) => roleFilter === "All" || t.role === roleFilter,
    )
  }, [talents, roleFilter])

  const totalMonthlyYield = useMemo(() => {
    return talents.reduce((acc, t) => {
      const match = t.monthlyPassiveYield.match(/\d+/)
      return acc + (match ? parseInt(match[0], 10) : 0)
    }, 0)
  }, [talents])

  const totalPlacements = useMemo(() => {
    return talents.reduce((acc, t) => acc + t.placementsThisMonth, 0)
  }, [talents])

  const handleCopyInviteLink = () => {
    const inviteUrl = `${window.location.origin}/register?ref=VVC-PARTNER-VIP`
    void navigator.clipboard.writeText(inviteUrl)
    setCopiedLink(true)
    toast.success("Exclusieve Talent Invite Link gekopieerd!", {
      description: "Deel deze link met potentiële trainees om hen onder jouw leiding te onboarden.",
    })
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const handlePlanCoaching = (talentName: string) => {
    toast.success(`1-op-1 Executie Coaching ingepland voor ${talentName}`, {
      description: "Agenda-uitnodiging verzonden naar beide partijen.",
    })
  }

  const handleAddTalent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim()) return

    const newTalent: Talent = {
      id: `t-${Date.now()}`,
      name: formName.trim(),
      role: formRole,
      progress: "Net Aangemeld",
      completedModules: 0,
      totalModules: 3,
      placementsThisMonth: 0,
      monthlyPassiveYield: "€ 0 / mnd",
      qualityScore: 9.0,
      status: "On Track",
      joinedDate: "Vandaag",
    }

    setTalents([newTalent, ...talents])
    setIsModalOpen(false)
    setFormName("")
    toast.success(`${formName} toegevoegd aan je talentenportfolio!`)
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto animate-fade-in">
      {/* ─── HEADER ─── */}
      <section className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end border-b border-[#222222] pb-8">
        <div>
          <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-4">
            Hefboom & Retentie
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white uppercase leading-none tracking-tighter mb-3">
            Talenten & <span className="text-magenta">Portfolio</span>
          </h1>
          <p className="text-[#888888] text-base max-w-2xl font-medium">
            Het portfolio dat het sneeuwbaleffect aandrijft. Scout trainees, coach hen op executiekracht en genereer structurele hefboom-inkomsten.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopyInviteLink}
            className="border border-[#333333] bg-[#111111] hover:border-magenta text-white font-bold px-4 py-2.5 text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            {copiedLink ? "Gekopieerd!" : "Kopieer Invite Link"}
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-magenta hover:bg-white hover:text-black text-white font-black px-5 py-2.5 uppercase tracking-widest text-xs flex items-center gap-2 transition-colors"
          >
            <Plus size={16} /> Talent Onboarden
          </button>
        </div>
      </section>

      {/* ─── KPI STRIP ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px">
        <DataCard
          title="Passieve Hefboom"
          value={`€ ${totalMonthlyYield} / mnd`}
          sub="Maandelijkse kickbackopbrengst"
          highlight
        />
        <DataCard
          title="Actieve Trainees"
          value={talents.length.toString()}
          sub="Onder jouw leiding"
        />
        <DataCard
          title="Trainee Plaatsingen"
          value={totalPlacements.toString()}
          sub="Deze maand gerealiseerd"
        />
        <DataCard
          title="Gem. Kwaliteitsscore"
          value="9.5"
          sub="CSAT & Executie audit"
          isScore
        />
      </section>

      {/* ─── HEFBOOM STRATEGIE BANNER ─── */}
      <section className="bg-gradient-to-r from-[#0d0d0d] via-[#140a12] to-[#0d0d0d] border border-magenta/30 p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-magenta text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            <Zap size={14} /> Het Sneeuwbaleffect van VVC
          </div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2">
            Waarom Bazen Afhankelijk Zijn En Partners Schalen
          </h2>
          <p className="text-xs text-[#aaaaaa] leading-relaxed font-medium">
            Elk talent dat je opleidt via de VVC Academy vergroot je slagkracht. Jij behoudt een permanente overschrijvingscommissie op alle deals die zij binnen het 126 Bedrijven Ecosysteem closen, zonder operationele micromanagement.
          </p>
        </div>

        <div className="shrink-0">
          <button
            type="button"
            onClick={handleCopyInviteLink}
            className="bg-white hover:bg-magenta hover:text-white text-black font-black uppercase tracking-widest text-xs py-3 px-6 transition-colors"
          >
            Nodig Talenten Uit
          </button>
        </div>
      </section>

      {/* ─── TALENTEN LIJST MET FILTER ─── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222222] pb-4">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-1">
              Actief Portfolio
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Trainee & Talent Roster
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              ["All", "Alle Rollen"],
              ["Trainee Senior Consultant", "Consultants"],
              ["Trainee Senior Closer", "Closers"],
              ["Trainee Senior Resourcer", "Resourcers"],
            ].map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setRoleFilter(val)}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors",
                  roleFilter === val
                    ? "bg-magenta text-white"
                    : "bg-[#0a0a0a] border border-[#222222] text-[#888888] hover:text-white hover:border-[#444444]",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTalents.map((talent) => (
            <div
              key={talent.id}
              className="bg-[#0a0a0a] border border-[#222222] p-6 hover:border-[#333333] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">
                      {talent.name}
                    </h3>
                    <div className="text-xs text-magenta font-bold">
                      {talent.role}
                    </div>
                  </div>

                  <span
                    className={cn(
                      "text-[9px] font-black uppercase px-2.5 py-0.5 border tracking-wider",
                      talent.status === "Top Performer"
                        ? "border-magenta text-magenta bg-magenta/10"
                        : talent.status === "On Track"
                          ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
                          : "border-amber-500/50 text-amber-400 bg-amber-500/10",
                    )}
                  >
                    {talent.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-[#111111] border border-[#1f1f1f] p-3 mb-6">
                  <div>
                    <div className="text-[9px] uppercase font-bold text-[#666666]">
                      Plaatsingen
                    </div>
                    <div className="text-base font-black text-white">
                      {talent.placementsThisMonth}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-bold text-[#666666]">
                      Kwaliteit
                    </div>
                    <div className="text-base font-black text-magenta flex items-center gap-1">
                      {talent.qualityScore}
                      <Star size={12} className="fill-magenta text-magenta" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-bold text-[#666666]">
                      Opbrengst
                    </div>
                    <div className="text-xs font-black text-white pt-1">
                      {talent.monthlyPassiveYield}
                    </div>
                  </div>
                </div>

                {/* Voortgang bar */}
                <div className="space-y-1.5 mb-6">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#888888]">
                    <span>Academy & Traject Voortgang</span>
                    <span className="text-white">
                      {talent.completedModules} / {talent.totalModules} Modules
                    </span>
                  </div>
                  <div className="w-full bg-[#181818] h-1.5">
                    <div
                      className="bg-magenta h-1.5"
                      style={{
                        width: `${(talent.completedModules / talent.totalModules) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-[11px] text-[#666666] pt-0.5">
                    Fase: <span className="text-[#aaaaaa] font-medium">{talent.progress}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#1f1f1f]">
                <button
                  type="button"
                  onClick={() => handlePlanCoaching(talent.name)}
                  className="flex-1 bg-[#161616] hover:bg-magenta hover:text-white border border-[#2f2f2f] text-white font-bold py-2.5 px-3 uppercase text-[11px] tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar size={13} /> Coaching Inplannen
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ADD TALENT MODAL ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-[#333333] max-w-md w-full p-8 relative animate-fade-in-up">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-[#666666] hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-1">
                Portfolio Uitbreiding
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                Nieuw Talent Toevoegen
              </h2>
            </div>

            <form onSubmit={handleAddTalent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                  Volledige Naam Trainee *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Bijv. Tim Veldman"
                  className="w-full bg-[#151515] border border-[#2e2e2e] p-3 text-xs text-white focus:outline-none focus:border-magenta"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                  Richting & Functie
                </label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as Talent["role"])}
                  className="w-full bg-[#151515] border border-[#2e2e2e] p-3 text-xs text-white focus:outline-none focus:border-magenta"
                >
                  <option value="Trainee Senior Consultant">Trainee Senior Consultant</option>
                  <option value="Trainee Senior Closer">Trainee Senior Closer</option>
                  <option value="Trainee Senior Resourcer">Trainee Senior Resourcer</option>
                </select>
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
                  Toevoegen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
