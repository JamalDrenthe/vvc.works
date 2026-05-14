import { useState } from "react"
import { ChevronRight, Zap } from "lucide-react"
import { DataCard } from "@/components/common/DataCard"
import { SliderControl } from "@/components/common/SliderControl"
import { FeedItem } from "@/components/common/FeedItem"
import { CulturePillar } from "@/components/common/CulturePillar"

/**
 * Dashboard pagina — samenvoeging van app2's VvcElitePlatform dashboard:
 * hero + KPI strip + financiële calculator + culture pillars + live feed.
 */
export default function DashboardPage() {
  const [hours, setHours] = useState(20)
  const [placements, setPlacements] = useState(10)
  const [activeCandidates, setActiveCandidates] = useState(50)

  const activeEarnings = Math.round(hours * 4.33 * 30)
  const bonusEarnings = placements * 300
  const passiveEarnings = activeCandidates * 25
  const totalEarnings = activeEarnings + bonusEarnings + passiveEarnings

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* ─── HERO ─── */}
      <section
        className="flex flex-col md:flex-row gap-8 justify-between items-end border-b border-[#222222] pb-8 animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="max-w-2xl">
          <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-6">
            Executie Is De Enige Waarheid
          </div>
          <h2 className="text-4xl lg:text-[60px] font-black text-white uppercase leading-[1.1] tracking-tighter mb-4">
            Geen bazen,
            <br />
            <span className="text-magenta">maar partners.</span>
          </h2>
          <p className="text-[#888888] text-lg font-medium max-w-xl">
            Welkom in je controlecentrum. Jij bent de CEO van je eigen route.
            100% focus op scoren. Geen kantooruren, alleen resultaat.
          </p>
        </div>

        <div className="w-full md:w-auto bg-[#111111] border border-[#333333] p-6 min-w-[300px]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-black text-white uppercase tracking-widest">
              Actie Vereist
            </span>
            <Zap size={16} className="text-magenta" />
          </div>
          <h3 className="font-bold text-white mb-2">Double Team Pilot</h3>
          <p className="text-[#888888] text-sm mb-6">
            Jouw partner wacht op afstemming voor de nieuwe vastgoed prospect.
          </p>
          <button
            type="button"
            className="w-full bg-white text-black hover:bg-magenta hover:text-white font-black py-3 px-4 transition-colors duration-200 uppercase tracking-widest text-xs flex justify-center items-center group"
          >
            Start Sessie
            <ChevronRight
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
        </div>
      </section>

      {/* ─── KPI STRIP ─── */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px animate-fade-in-up"
        style={{ animationDelay: "0.25s" }}
      >
        <DataCard
          title="YTD Verdiensten"
          value="€ 64.800"
          sub="Jaar 1 On Track"
          delay={0.3}
        />
        <DataCard
          title="Actieve Leads"
          value="18"
          sub="Warm Netwerk"
          highlight
          delay={0.4}
        />
        <DataCard
          title="Plaatsingen"
          value="12"
          sub="+3 vs vorige maand"
          delay={0.5}
        />
        <DataCard
          title="Kwaliteitsscore"
          value="9.8"
          sub="Klanttevredenheid"
          isScore
          delay={0.6}
        />
      </section>

      {/* ─── FINANCIËLE CALCULATOR ─── */}
      <section
        className="bg-[#0a0a0a] border border-[#222222] p-8 lg:p-12 animate-fade-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="flex-1 space-y-10">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                Het Financiële Model
              </h3>
              <p className="text-[#666666] text-sm">
                Direct resultaat &amp; duurzaam bezit. Bereken je OTE.
              </p>
            </div>

            <div className="space-y-8">
              <SliderControl
                label="Actieve Uren / Week"
                value={hours}
                max={40}
                onChange={setHours}
                subtext="€30,- per uur (Risicovrije basis)"
              />
              <SliderControl
                label="Plaatsingen / Maand"
                value={placements}
                max={20}
                onChange={setPlacements}
                subtext="€300,- bonus per plaatsing (Executie)"
                isHighlight
              />
              <SliderControl
                label="Actieve Kandidaten (Portfolio)"
                value={activeCandidates}
                max={150}
                onChange={setActiveCandidates}
                subtext="€25,- per maand per kandidaat (Passief sneeuwbaleffect)"
              />
            </div>
          </div>

          <div className="lg:w-96 flex flex-col justify-center">
            <div className="bg-black border border-[#333333] p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-magenta" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#222222]" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#222222]" />

              <div className="text-[10px] font-black text-[#888888] uppercase tracking-[0.2em] mb-8">
                Verwacht Maandinkomen
              </div>

              <div className="space-y-4 mb-8">
                <Row label="1. ACTIEF (BASIS)" value={activeEarnings} />
                <Row label="2. DIRECT (BONUS)" value={bonusEarnings} />
                <Row
                  label="3. PASSIEF (GROEI)"
                  value={passiveEarnings}
                  emphasis
                />
              </div>

              <div>
                <div className="text-[10px] font-black text-[#888888] uppercase tracking-[0.2em] mb-1">
                  Totaal
                </div>
                <div
                  key={totalEarnings}
                  className="text-5xl font-black text-white tracking-tighter animate-count-up"
                >
                  €{totalEarnings.toLocaleString("nl-NL")}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#222222]">
                <p className="text-xs text-[#666666] font-medium leading-relaxed">
                  &ldquo;Een model ontworpen voor exponentiële groei, niet
                  lineaire verhogingen.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CULTURE + FEED ─── */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up"
        style={{ animationDelay: "0.55s" }}
      >
        <div className="bg-[#111111] p-8 lg:p-10 border border-[#222222]">
          <h3 className="text-xl font-black uppercase tracking-tight mb-8 border-b border-[#333333] pb-4">
            De Brandstof van de Club
          </h3>
          <div className="space-y-8">
            <CulturePillar
              number="01"
              title="Loyaliteit (Vriendschap)"
              description="Eerlijke samenwerking gericht op gedeeld succes. Geen politiek, pure coöperatie."
              delay={0.6}
            />
            <CulturePillar
              number="02"
              title="Executie (Resultaat)"
              description="Resultaat is de enige waarheid. Wij praten niet, wij leveren. 100% focus op scoren."
              highlight
              delay={0.7}
            />
            <CulturePillar
              number="03"
              title="Eigenaarschap"
              description="Wees de CEO van je eigen route. De vrijheid om te winnen met de rugdekking van de club."
              delay={0.8}
            />
          </div>
        </div>

        <div className="bg-[#050505] p-8 lg:p-10 border border-[#222222]">
          <div className="flex items-center justify-between mb-8 border-b border-[#333333] pb-4">
            <h3 className="text-xl font-black uppercase tracking-tight">
              Live Executie
            </h3>
            <div className="w-2 h-2 rounded-full bg-magenta animate-pulse-glow" />
          </div>

          <div className="space-y-6">
            <FeedItem
              name="Marcus R."
              action="Sloot een Double Team deal."
              value="+€600"
              time="12m"
              delay={0.6}
            />
            <FeedItem
              name="Lisa M."
              action="Plaatsing bevestigd: IT Auditor."
              value="+€300"
              time="45m"
              highlight
              delay={0.7}
            />
            <FeedItem
              name="David K."
              action="Mystery Shopping Audit VZ voltooid."
              value="Check"
              time="2u"
              delay={0.8}
            />
            <FeedItem
              name="Sarah B."
              action="Portfolio gegroeid naar 40 actieve kandidaten."
              value="+€1000/m"
              time="3u"
              delay={0.9}
            />
          </div>

          <button
            type="button"
            className="w-full mt-8 py-3 text-xs font-black text-white border border-[#333333] hover:bg-white hover:text-black transition-colors duration-200 uppercase tracking-widest"
          >
            Volledige Feed
          </button>
        </div>
      </section>
    </div>
  )
}

function Row({
  label,
  value,
  emphasis,
}: {
  label: string
  value: number
  emphasis?: boolean
}) {
  return (
    <div className="flex justify-between items-center border-b border-[#222222] pb-2">
      <span
        className={
          emphasis
            ? "text-sm font-bold text-magenta"
            : "text-sm font-bold text-[#888888]"
        }
      >
        {label}
      </span>
      <span
        className={
          emphasis
            ? "text-sm font-bold text-magenta"
            : "text-sm font-bold text-white"
        }
      >
        € {value.toLocaleString("nl-NL")}
      </span>
    </div>
  )
}
