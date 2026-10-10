import { useState, useMemo } from "react"
import {
  Download,
  Sparkles,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { toast } from "sonner"
import { DataCard } from "@/components/common/DataCard"
import { cn } from "@/lib/utils"

type TimeRange = "7d" | "30d" | "quarter" | "ytd"

interface LeaderboardUser {
  rank: number
  name: string
  role: string
  deals: number
  conversionRate: string
  volume: string
  status: "Elite" | "Senior" | "Partner"
}

const PERFORMANCE_DATA: Record<TimeRange, {
  summary: {
    conversionRate: string
    velocity: string
    volume: string
    qualityScore: string
  }
  chartData: Array<{ label: string; volume: number; placements: number }>
}> = {
  "7d": {
    summary: {
      conversionRate: "36.4%",
      velocity: "8.2 dgn",
      volume: "€ 14.800",
      qualityScore: "9.9",
    },
    chartData: [
      { label: "Ma", volume: 1800, placements: 2 },
      { label: "Di", volume: 2400, placements: 3 },
      { label: "Wo", volume: 1600, placements: 2 },
      { label: "Do", volume: 3200, placements: 4 },
      { label: "Vr", volume: 2900, placements: 3 },
      { label: "Za", volume: 1400, placements: 1 },
      { label: "Zo", volume: 1500, placements: 2 },
    ],
  },
  "30d": {
    summary: {
      conversionRate: "34.8%",
      velocity: "11.4 dgn",
      volume: "€ 68.400",
      qualityScore: "9.8",
    },
    chartData: [
      { label: "Week 1", volume: 14200, placements: 12 },
      { label: "Week 2", volume: 18600, placements: 15 },
      { label: "Week 3", volume: 16400, placements: 14 },
      { label: "Week 4", volume: 19200, placements: 18 },
    ],
  },
  quarter: {
    summary: {
      conversionRate: "32.1%",
      velocity: "12.8 dgn",
      volume: "€ 194.200",
      qualityScore: "9.7",
    },
    chartData: [
      { label: "Juli", volume: 58000, placements: 48 },
      { label: "Aug", volume: 64200, placements: 54 },
      { label: "Sept", volume: 72000, placements: 61 },
    ],
  },
  ytd: {
    summary: {
      conversionRate: "35.2%",
      velocity: "10.6 dgn",
      volume: "€ 482.000",
      qualityScore: "9.8",
    },
    chartData: [
      { label: "Q1", volume: 98000, placements: 82 },
      { label: "Q2", volume: 124000, placements: 104 },
      { label: "Q3", volume: 138000, placements: 118 },
      { label: "Q4", volume: 122000, placements: 106 },
    ],
  },
}

const SECTOR_METRICS = [
  { sector: "Banken & Neobanken", volume: 44200, yieldRate: "89%" },
  { sector: "Crypto & Web3", volume: 38600, yieldRate: "94%" },
  { sector: "HR & Flex-werk", volume: 29400, yieldRate: "82%" },
  { sector: "Factoring & Trade", volume: 26800, yieldRate: "91%" },
  { sector: "Betalingen & BNPL", volume: 21500, yieldRate: "78%" },
]

const LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Jamal Drenthe",
    role: "CEO & Founder",
    deals: 38,
    conversionRate: "48.2%",
    volume: "€ 54.200",
    status: "Elite",
  },
  {
    rank: 2,
    name: "Sanne van Dijk",
    role: "Senior Partner",
    deals: 29,
    conversionRate: "42.0%",
    volume: "€ 38.900",
    status: "Elite",
  },
  {
    rank: 3,
    name: "Marcus de Boer",
    role: "Partner (FinTech Lead)",
    deals: 24,
    conversionRate: "37.5%",
    volume: "€ 29.400",
    status: "Senior",
  },
  {
    rank: 4,
    name: "Tessa Visser",
    role: "Partner (Double Team)",
    deals: 19,
    conversionRate: "34.1%",
    volume: "€ 22.800",
    status: "Partner",
  },
  {
    rank: 5,
    name: "Lars Hendriks",
    role: "Trainee Senior Consultant",
    deals: 14,
    conversionRate: "31.8%",
    volume: "€ 16.500",
    status: "Partner",
  },
]

export default function AnalyticsPage() {
  const [range, setRange] = useState<TimeRange>("30d")
  const activeData = useMemo(() => PERFORMANCE_DATA[range], [range])

  const handleExport = () => {
    toast.success("Analytics rapport gegenereerd", {
      description: `Gedetailleerde CSV van periode [${range.toUpperCase()}] gedownload naar klembord/bestand.`,
    })
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto animate-fade-in">
      {/* ─── HERO & HEADER ─── */}
      <section className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end border-b border-[#222222] pb-8">
        <div>
          <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-4">
            Executie Intelligence
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white uppercase leading-none tracking-tighter mb-3">
            Analytics & <span className="text-magenta">Performance</span>
          </h1>
          <p className="text-[#888888] text-base max-w-2xl font-medium">
            Realtime data over partner executie, plaatsings-velocity en opgebouwd rendement. Cijfers liegen nooit.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time range switcher */}
          <div className="flex border border-[#222222] bg-[#0a0a0a] p-1">
            {(
              [
                ["7d", "7 Dagen"],
                ["30d", "30 Dagen"],
                ["quarter", "Kwartaal"],
                ["ytd", "YTD"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setRange(key)}
                className={cn(
                  "px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-colors",
                  range === key
                    ? "bg-magenta text-white"
                    : "text-[#888888] hover:text-white hover:bg-[#151515]",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="border border-[#333333] bg-[#111111] hover:border-magenta text-white font-bold px-4 py-2 text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <Download size={14} /> Exporteer
          </button>
        </div>
      </section>

      {/* ─── KPI STRIP ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px">
        <DataCard
          title="Conversieratio"
          value={activeData.summary.conversionRate}
          sub="Leads naar kwalificatie"
          highlight
        />
        <DataCard
          title="Gem. Velocity"
          value={activeData.summary.velocity}
          sub="Eerste touch naar plaatsing"
        />
        <DataCard
          title="Deal Volume"
          value={activeData.summary.volume}
          sub={`Periode: ${range.toUpperCase()}`}
        />
        <DataCard
          title="Executie Score"
          value={activeData.summary.qualityScore}
          sub="Club benchmarks"
          isScore
        />
      </section>

      {/* ─── CHARTS ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trend Chart */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-[#222222] p-6 lg:p-8 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-1">
                Gegenereerd Volume & Velocity
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                Netwerk Yield ({range.toUpperCase()})
              </h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-[#888888]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-magenta" /> Volume (€)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-white" /> Plaatsingen
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeData.chartData}>
                <defs>
                  <linearGradient id="magentaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e6007e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#e6007e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                <XAxis
                  dataKey="label"
                  stroke="#666666"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#222222" }}
                />
                <YAxis
                  stroke="#666666"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#222222" }}
                  tickFormatter={(val) => `€${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#111111] border border-[#333333] p-3 text-xs shadow-xl">
                          <p className="font-bold text-white uppercase mb-1">
                            {payload[0].payload.label}
                          </p>
                          <p className="text-magenta font-black">
                            Volume: €{payload[0].value?.toLocaleString()}
                          </p>
                          <p className="text-white font-bold">
                            Plaatsingen: {payload[0].payload.placements}
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#e6007e"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#magentaGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Yield Breakdown */}
        <div className="bg-[#0a0a0a] border border-[#222222] p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-1">
              Spreiding
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-6">
              Sectoren met hoogste Yield
            </h2>

            <div className="space-y-4">
              {SECTOR_METRICS.map((item) => (
                <div key={item.sector} className="border-b border-[#1c1c1c] pb-3 last:border-none">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-white">{item.sector}</span>
                    <span className="text-magenta font-black">
                      € {item.volume.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-[#666666]">
                    <span>Uitbetalingsratio</span>
                    <span className="text-white font-medium">{item.yieldRate}</span>
                  </div>
                  <div className="w-full bg-[#181818] h-1.5 mt-2">
                    <div
                      className="bg-magenta h-1.5"
                      style={{
                        width: `${Math.min(100, (item.volume / 50000) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#222222] flex items-center justify-between text-[11px] text-[#888888]">
            <span>Bron: 126 Bedrijven Matrix</span>
            <span className="text-white font-bold flex items-center gap-1">
              Geauditeerd <Sparkles size={12} className="text-magenta" />
            </span>
          </div>
        </div>
      </section>

      {/* ─── EXECUTIE FUNNEL ─── */}
      <section className="bg-[#0a0a0a] border border-[#222222] p-6 lg:p-8">
        <div className="mb-6">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-1">
            Doorstroom
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            VVC Conversie Funnel
          </h2>
          <p className="text-xs text-[#888888] mt-1 font-medium">
            Van eerste touch tot permanente passieve commissiestroom.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { step: "01", name: "Warm Contact", count: "164 leads", rate: "100%", sub: "Netwerk intake" },
            { step: "02", name: "Double Team Pilot", count: "112 leads", rate: "68.3%", sub: "Partner match" },
            { step: "03", name: "Kwalificatie", count: "76 leads", rate: "67.8%", sub: "Verificatie/storting" },
            { step: "04", name: "Plaatsing", count: "52 deals", rate: "68.4%", sub: "Bonus uitgekeerd" },
            { step: "05", name: "Passief Behouden", count: "48 accounts", rate: "92.3%", sub: "Maandelijkse kickback" },
          ].map((stage, idx) => (
            <div
              key={stage.step}
              className={cn(
                "p-4 border border-[#222222] bg-[#111111] flex flex-col justify-between relative",
                idx === 3 && "border-magenta/60 bg-[#160d13]",
              )}
            >
              <div>
                <div className="flex justify-between items-center text-[10px] text-magenta font-black mb-2">
                  <span>{stage.step}</span>
                  <span className="text-[#666666] font-bold">{stage.rate}</span>
                </div>
                <div className="text-sm font-black text-white uppercase">{stage.name}</div>
                <div className="text-xs text-[#888888] font-medium mt-1">{stage.sub}</div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#222222] text-xs font-black text-white">
                {stage.count}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TOP PERFORMERS LEADERBOARD ─── */}
      <section className="bg-[#0a0a0a] border border-[#222222] p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-1">
              Erelijst
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Top Executie Leaderboard
            </h2>
          </div>
          <div className="text-xs text-[#888888] uppercase tracking-wider font-bold">
            Live score
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222222] text-[10px] uppercase tracking-widest text-[#666666]">
                <th className="py-3 px-4 font-bold">#</th>
                <th className="py-3 px-4 font-bold">Partner</th>
                <th className="py-3 px-4 font-bold">Rol</th>
                <th className="py-3 px-4 font-bold text-center">Plaatsingen</th>
                <th className="py-3 px-4 font-bold text-center">Conversie</th>
                <th className="py-3 px-4 font-bold text-right">Volume</th>
                <th className="py-3 px-4 font-bold text-center">Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a] text-xs">
              {LEADERBOARD.map((user) => (
                <tr
                  key={user.rank}
                  className="hover:bg-[#111111] transition-colors font-medium text-white"
                >
                  <td className="py-4 px-4 font-black text-magenta">{user.rank}</td>
                  <td className="py-4 px-4 font-black">{user.name}</td>
                  <td className="py-4 px-4 text-[#888888]">{user.role}</td>
                  <td className="py-4 px-4 text-center font-bold">{user.deals}</td>
                  <td className="py-4 px-4 text-center text-[#aaaaaa]">
                    {user.conversionRate}
                  </td>
                  <td className="py-4 px-4 text-right font-black text-magenta">
                    {user.volume}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={cn(
                        "inline-block px-2.5 py-0.5 text-[10px] uppercase font-black tracking-widest border",
                        user.status === "Elite"
                          ? "border-magenta text-magenta bg-magenta/10"
                          : user.status === "Senior"
                            ? "border-white text-white bg-white/10"
                            : "border-[#444444] text-[#888888]",
                      )}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
