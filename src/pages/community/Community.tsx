import { useState } from "react"
import {
  UserCheck,
  Zap,
  ChevronRight,
  Flame,
  Clock,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface PartnerProfile {
  id: string
  name: string
  role: string
  focus: string
  dealsClosed: number
  available: boolean
  strengths: string[]
  bio: string
}

interface EventItem {
  id: string
  title: string
  host: string
  date: string
  time: string
  category: "War Room" | "Masterclass" | "Strategy Clinic"
  description: string
  registered: boolean
}

interface CommunityWin {
  id: string
  author: string
  timeAgo: string
  title: string
  amount: string
  sector: string
  likes: number
}

const PARTNERS: PartnerProfile[] = [
  {
    id: "p1",
    name: "Sanne van Dijk",
    role: "Senior Partner",
    focus: "Banken & Neobanken",
    dealsClosed: 29,
    available: true,
    strengths: ["CASS Overstappen", "Hoge Drempelstortingen", "Double Team Lead"],
    bio: "Focus op premium B2C banken (Barclays, Lloyds) en enterprise B2B overstappen.",
  },
  {
    id: "p2",
    name: "Marcus de Boer",
    role: "Partner",
    focus: "Crypto & Web3",
    dealsClosed: 24,
    available: true,
    strengths: ["Bitvavo Revenue Share", "Bybit VIP", "On-chain Onboarding"],
    bio: "Exclusieve focus op volume traders en permanente revenue share accounts.",
  },
  {
    id: "p3",
    name: "Tessa Visser",
    role: "Partner",
    focus: "HR & Flex-werk",
    dealsClosed: 19,
    available: false,
    strengths: ["YoungCapital Staffing", "Temper Onboarding", "Contract Sourcing"],
    bio: "Gespecialiseerd in bulk referrals en flexwerk platform verificaties.",
  },
  {
    id: "p4",
    name: "Daan Koster",
    role: "Partner",
    focus: "Factoring & Trade Finance",
    dealsClosed: 16,
    available: true,
    strengths: ["Finqle B2B", "Factoring Deals", "MKB Outreach"],
    bio: "Hoge ticketwaarde per lead. Zoekt een gedreven Closer voor Double Team samenwerking.",
  },
]

const INITIAL_EVENTS: EventItem[] = [
  {
    id: "e1",
    title: "VVC War Room: Q4 Pipeline Acceleration",
    host: "Jamal Drenthe (CEO)",
    date: "Aankomende Donderdag",
    time: "20:00 - 21:15",
    category: "War Room",
    description: "Strategische allocatie van warme leads en review van de nieuwste bonussen in De 126 Bedrijven.",
    registered: false,
  },
  {
    id: "e2",
    title: "Masterclass: High-Ticket B2B FinTech Conversie",
    host: "Sanne van Dijk",
    date: "Dinsdag 14 Okt",
    time: "19:30 - 20:30",
    category: "Masterclass",
    description: "Hoe je B2B rekeningen sluit via Tide en Wamo met minimale wachttijd en maximale commissie.",
    registered: true,
  },
  {
    id: "e3",
    title: "Double Team Pilot Clinic: Deals Sluiten in Duo",
    host: "Marcus de Boer & Tessa Visser",
    date: "Zaterdag 18 Okt",
    time: "11:00 - 12:30",
    category: "Strategy Clinic",
    description: "Hands-on workflow review: hoe verdeel je outreach en closing voor dubbele velocity.",
    registered: false,
  },
]

const INITIAL_WINS: CommunityWin[] = [
  {
    id: "w1",
    author: "Jamal Drenthe",
    timeAgo: "22m geleden",
    title: "Finqle Enterprise Factoring Partner geactiveerd",
    amount: "€ 1.631",
    sector: "Factoring",
    likes: 18,
  },
  {
    id: "w2",
    author: "Sanne van Dijk",
    timeAgo: "1u geleden",
    title: "3x Barclays CASS switch volbracht met Double Team",
    amount: "£ 600",
    sector: "Banken",
    likes: 12,
  },
  {
    id: "w3",
    author: "Marcus de Boer",
    timeAgo: "3u geleden",
    title: "Bitvavo VIP account verificatie voltooid",
    amount: "€ 400 + 15% revshare",
    sector: "Crypto",
    likes: 9,
  },
]

export default function CommunityPage() {
  const [filterFocus, setFilterFocus] = useState<string>("All")
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS)
  const [wins, setWins] = useState<CommunityWin[]>(INITIAL_WINS)
  const [newPostText, setNewPostText] = useState("")

  const filteredPartners = PARTNERS.filter(
    (p) => filterFocus === "All" || p.focus === filterFocus,
  )

  const handleRequestPilot = (partner: PartnerProfile) => {
    toast.success(`Double Team Pilot aangevraagd bij ${partner.name}!`, {
      description: "Jullie afstemmingssessie is klaargezet in je dashboard controlecentrum.",
    })
  }

  const toggleEventRegistration = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const next = !e.registered
          if (next) {
            toast.success("Aanmelding bevestigd", {
              description: `Je staat op de lijst voor: "${e.title}". Calendar invite verstuurd.`,
            })
          } else {
            toast.info("Aanmelding geannuleerd")
          }
          return { ...e, registered: next }
        }
        return e
      }),
    )
  }

  const handlePostWin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPostText.trim()) return

    const newWin: CommunityWin = {
      id: `w-${Date.now()}`,
      author: "Jij (Actieve Partner)",
      timeAgo: "Zojuist",
      title: newPostText,
      amount: "Executie Deal",
      sector: "VVC Netwerk",
      likes: 1,
    }
    setWins([newWin, ...wins])
    setNewPostText("")
    toast.success("Win gedeeld met de club!", {
      description: "Je executie resultaat is direct zichtbaar op de club feed.",
    })
  }

  const handleLike = (id: string) => {
    setWins((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w)),
    )
  }

  return (
    <div className="space-y-12 max-w-7xl mx-auto animate-fade-in">
      {/* ─── HERO ─── */}
      <section className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end border-b border-[#222222] pb-8">
        <div>
          <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-4">
            De Kracht Van Het Netwerk
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white uppercase leading-none tracking-tighter mb-3">
            VVC <span className="text-magenta">Community</span> & Pilots
          </h1>
          <p className="text-[#888888] text-base max-w-2xl font-medium">
            Geen bazen, alleen partners. Match direct in Double Teams, neem deel aan wekelijkse War Rooms en deel je executie-overwinningen.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#111111] border border-[#222222] px-4 py-2 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase text-white tracking-wider">
              42 Partners Online
            </span>
          </div>
        </div>
      </section>

      {/* ─── DOUBLE TEAM PILOT MATCHING ─── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-1">
              Samen Scoren
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Double Team Matcher
            </h2>
            <p className="text-xs text-[#888888] font-medium">
              Koppel met een partner voor complementaire vaardigheden (Sourcing + Closing).
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {["All", "Banken & Neobanken", "Crypto & Web3", "HR & Flex-werk", "Factoring & Trade Finance"].map(
              (f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilterFocus(f)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap border transition-colors",
                    filterFocus === f
                      ? "border-magenta bg-magenta text-white"
                      : "border-[#222222] bg-[#0a0a0a] text-[#888888] hover:text-white hover:border-[#444444]",
                  )}
                >
                  {f}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-[#0a0a0a] border border-[#222222] p-6 flex flex-col justify-between hover:border-[#333333] transition-colors"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-base font-black text-white uppercase tracking-tight">
                      {partner.name}
                    </h3>
                    <div className="text-xs text-magenta font-bold">
                      {partner.role}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-[9px] font-black uppercase px-2 py-0.5 border tracking-wider",
                      partner.available
                        ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
                        : "border-[#444444] text-[#777777] bg-[#111111]",
                    )}
                  >
                    {partner.available ? "Beschikbaar" : "Volzet"}
                  </span>
                </div>

                <p className="text-xs text-[#888888] font-medium line-clamp-2 mb-4 leading-relaxed">
                  {partner.bio}
                </p>

                <div className="space-y-1.5 mb-6">
                  <div className="text-[10px] font-bold uppercase text-[#666666] tracking-wider">
                    Kernkracht:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {partner.strengths.map((str) => (
                      <span
                        key={str}
                        className="text-[10px] bg-[#151515] border border-[#262626] text-[#aaaaaa] px-2 py-0.5"
                      >
                        {str}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs border-t border-[#1f1f1f] pt-4 mb-4">
                  <span className="text-[#666666]">Deals afgerond</span>
                  <span className="text-white font-black">{partner.dealsClosed}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRequestPilot(partner)}
                  disabled={!partner.available}
                  className="w-full bg-white hover:bg-magenta hover:text-white text-black font-black uppercase tracking-widest text-[11px] py-2.5 px-3 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-black disabled:cursor-not-allowed"
                >
                  <Zap size={14} /> Start Double Team
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── KALENDER & CLUB WIN STREAM ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Events / Masterclasses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border-b border-[#222222] pb-4 flex justify-between items-end">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-1">
                Kennis & Strategie
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                War Rooms & Masterclasses
              </h2>
            </div>
            <div className="text-xs text-[#888888] font-bold">
              Live Sessies
            </div>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-[#0a0a0a] border border-[#222222] p-6 hover:border-[#333333] transition-colors flex flex-col sm:flex-row justify-between gap-6"
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-magenta border border-magenta/40 px-2 py-0.5">
                      {event.category}
                    </span>
                    <span className="text-xs text-[#888888] flex items-center gap-1">
                      <Clock size={12} /> {event.date} • {event.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white uppercase tracking-tight">
                    {event.title}
                  </h3>
                  <p className="text-xs text-[#888888] leading-relaxed">
                    {event.description}
                  </p>
                  <div className="text-xs text-[#aaaaaa] font-bold">
                    Host: <span className="text-white">{event.host}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col justify-end items-end shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleEventRegistration(event.id)}
                    className={cn(
                      "px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2",
                      event.registered
                        ? "bg-[#1a1a1a] border border-[#444444] text-[#888888] hover:border-red-500/50 hover:text-red-400"
                        : "bg-magenta hover:bg-white hover:text-black text-white",
                    )}
                  >
                    {event.registered ? (
                      <>
                        <UserCheck size={14} /> Aangemeld
                      </>
                    ) : (
                      <>
                        Deelnemen <ChevronRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Club Win Stream */}
        <div className="space-y-6">
          <div className="border-b border-[#222222] pb-4">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-1">
              Executie Muur
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Club Wins Feed
            </h2>
          </div>

          {/* Quick Win Poster */}
          <form
            onSubmit={handlePostWin}
            className="bg-[#0a0a0a] border border-[#222222] p-4 space-y-3"
          >
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Deel een verse deal of gesloten bonus met de club…"
              rows={2}
              className="w-full bg-[#111111] border border-[#333333] p-3 text-xs text-white placeholder-[#555555] focus:outline-none focus:border-magenta resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newPostText.trim()}
                className="bg-magenta hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest px-4 py-2 transition-colors disabled:opacity-40"
              >
                Deel Win
              </button>
            </div>
          </form>

          {/* Feed List */}
          <div className="space-y-3">
            {wins.map((win) => (
              <div
                key={win.id}
                className="bg-[#0a0a0a] border border-[#222222] p-4 hover:border-[#2f2f2f] transition-colors"
              >
                <div className="flex justify-between items-center text-[11px] mb-2">
                  <span className="font-bold text-white">{win.author}</span>
                  <span className="text-[#666666]">{win.timeAgo}</span>
                </div>
                <p className="text-xs text-[#cccccc] font-medium mb-3">
                  {win.title}
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-[#1a1a1a]">
                  <span className="text-xs font-black text-magenta">
                    {win.amount}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleLike(win.id)}
                    className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-magenta transition-colors"
                  >
                    <Flame size={14} className="text-magenta" />
                    <span>{win.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
