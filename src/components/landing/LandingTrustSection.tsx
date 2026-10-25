import { useState, useEffect } from "react"
import {
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import {
  PARTNER_COMPANIES,
  PARTNER_REVIEWS,
  type PartnerCompany,
  type PartnerReview,
} from "./partner-data"
import { CompanyLogoRenderer } from "./CompanyLogos"
import { cn } from "@/lib/utils"

interface LandingTrustSectionProps {
  className?: string
  compact?: boolean
}

type FilterCategory = "all" | "fintech" | "banking" | "ecosystem"

export function LandingTrustSection({
  className,
  compact = false,
}: LandingTrustSectionProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all")
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Filter reviews
  const filteredReviews = PARTNER_REVIEWS.filter((rev) => {
    if (selectedCompanyId) {
      return rev.companyId === selectedCompanyId
    }
    if (activeCategory === "all") return true
    return rev.category === activeCategory
  })

  const currentReview: PartnerReview | undefined =
    filteredReviews[currentReviewIndex % (filteredReviews.length || 1)] || PARTNER_REVIEWS[0]

  // Auto-cycle reviews when playing
  useEffect(() => {
    if (!isAutoPlaying || filteredReviews.length <= 1) return
    const timer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % filteredReviews.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, filteredReviews.length])

  const nextReview = () => {
    setIsAutoPlaying(false)
    setCurrentReviewIndex((prev) => (prev + 1) % filteredReviews.length)
  }

  const prevReview = () => {
    setIsAutoPlaying(false)
    setCurrentReviewIndex((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length)
  }

  const handleCategorySelect = (category: FilterCategory) => {
    setActiveCategory(category)
    setSelectedCompanyId(null)
    setCurrentReviewIndex(0)
  }

  return (
    <div
      className={cn(
        "w-full flex flex-col space-y-6 text-white",
        className
      )}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* ─── HOOFDKOP MET STATUS BADGE ─── */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 border border-magenta/60 bg-magenta/10 text-magenta text-[10px] font-black px-2.5 py-1 uppercase tracking-[0.2em] rounded-sm">
            <Sparkles size={11} className="animate-pulse" />
            Samenwerkingen &amp; Reviews
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#888888] uppercase tracking-wider bg-[#111111] border border-[#222222] px-2 py-1 rounded-sm">
            <ShieldCheck size={11} className="text-emerald-400" />
            100% Geverifieerd
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white">
          Vertrouwd door <span className="text-magenta">marktleiders</span> &amp; fintechs.
        </h2>
        <p className="text-[#888888] text-xs leading-relaxed max-w-xl">
          VVC koppelt leden rechtstreeks aan topbanken, betaalgiganten en ons eigen exclusieve
          ecosysteem met directe cashbeloningen en live leadflows.
        </p>
      </div>

      {/* ─── CATEGORIE SELECTIE PILLS ─── */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {(
          [
            { id: "all", label: "Alle Samenwerkingen" },
            { id: "fintech", label: "Fintech & Betalingen" },
            { id: "banking", label: "Neobanken & CASS" },
            { id: "ecosystem", label: "Interne Ecosystemen" },
          ] as const
        ).map((tab) => {
          const isActive = activeCategory === tab.id && !selectedCompanyId
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleCategorySelect(tab.id)}
              className={cn(
                "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all rounded-sm border",
                isActive
                  ? "bg-white text-black border-white shadow-sm"
                  : "bg-[#0f0f0f] text-[#888888] border-[#252525] hover:border-[#444] hover:text-white"
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ─── LOGO'S VAN ANDERE BEDRIJVEN (SAMENWERKINGEN) ─── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-[#777777]">
          <span>Gevalideerde Bedrijven &amp; Partners ({PARTNER_COMPANIES.length})</span>
          <span className="hidden sm:inline text-magenta">Klik op logo voor review</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {PARTNER_COMPANIES.map((company: PartnerCompany) => {
            const isSelected = selectedCompanyId === company.id
            return (
              <button
                key={company.id}
                type="button"
                onClick={() => {
                  setSelectedCompanyId(isSelected ? null : company.id)
                  setCurrentReviewIndex(0)
                }}
                className={cn(
                  "group relative p-3 rounded-sm border transition-all duration-200 flex flex-col justify-between items-start text-left min-h-[72px]",
                  isSelected
                    ? "bg-[#18091a] border-magenta shadow-[0_0_15px_rgba(230,0,126,0.3)] ring-1 ring-magenta"
                    : "bg-[#0d0d0d] border-[#222222] hover:border-[#444444] hover:bg-[#141414]"
                )}
              >
                <div className="w-full flex items-center justify-between mb-2">
                  <CompanyLogoRenderer type={company.logoType} className="h-5 w-auto max-w-[100px]" />
                  {company.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-magenta animate-ping" />
                  )}
                </div>

                <div className="w-full flex items-center justify-between text-[9px] text-[#666666] font-semibold tracking-wider">
                  <span className="truncate group-hover:text-white transition-colors">
                    {company.badge}
                  </span>
                  <span className="text-magenta text-[8px] font-black uppercase">
                    {company.stats.split(" ")[0]}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── REVIEW CARD UITLICHTING ─── */}
      {currentReview && (
        <div className="bg-gradient-to-b from-[#111111] to-[#0a0a0a] border border-[#222222] p-5 sm:p-6 rounded-sm relative overflow-hidden shadow-2xl">
          {/* Decoratieve achtergrondgloed */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-magenta/10 rounded-full blur-2xl pointer-events-none" />

          {/* Review Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black border border-[#2a2a2a] rounded">
                <CompanyLogoRenderer type={currentReview.companyId} className="h-5 w-auto" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    {currentReview.companyName}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[9px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                    <CheckCircle2 size={10} />
                    Geverifieerd
                  </span>
                </div>
                <span className="text-[10px] text-[#666666] font-medium">
                  {currentReview.date}
                </span>
              </div>
            </div>

            {/* 5 Sterren visual */}
            <div className="flex items-center gap-1 bg-black/60 px-2.5 py-1.5 border border-[#222222] rounded">
              <div className="flex text-amber-400">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] font-black text-white ml-1">5.0</span>
            </div>
          </div>

          {/* Headline & Quote */}
          <div className="mb-5 space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-magenta font-serif text-lg leading-none">“</span>
              {currentReview.headline}
              <span className="text-magenta font-serif text-lg leading-none">”</span>
            </h3>
            <p className="text-[#a0a0a0] text-xs leading-relaxed font-normal italic">
              {currentReview.content}
            </p>
          </div>

          {/* Review Footer / Author & Pager */}
          <div className="pt-4 border-t border-[#1e1e1e] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#333333] flex items-center justify-center text-[11px] font-black text-magenta">
                {currentReview.authorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-wide">
                  {currentReview.authorName}
                </p>
                <p className="text-[10px] text-[#777777] font-medium">
                  {currentReview.authorRole}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-magenta bg-magenta/10 border border-magenta/30 px-2.5 py-1 rounded">
                {currentReview.metricBadge}
              </span>

              <div className="flex items-center gap-1 ml-2">
                <button
                  type="button"
                  onClick={prevReview}
                  aria-label="Vorige review"
                  className="p-1.5 bg-[#141414] hover:bg-[#222222] text-[#888888] hover:text-white border border-[#2a2a2a] rounded transition-colors"
                >
                  <ChevronLeft size={13} />
                </button>
                <span className="text-[10px] text-[#666666] font-mono px-1">
                  {(currentReviewIndex % filteredReviews.length) + 1}/{filteredReviews.length}
                </span>
                <button
                  type="button"
                  onClick={nextReview}
                  aria-label="Volgende review"
                  className="p-1.5 bg-[#141414] hover:bg-[#222222] text-[#888888] hover:text-white border border-[#2a2a2a] rounded transition-colors"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── LIVE PROOF METRICS ─── */}
      {!compact && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          <div className="p-3 bg-[#0a0a0a] border border-[#1f1f1f] rounded text-center">
            <span className="text-lg font-black text-white tracking-tight block">126+</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#777777]">
              Actieve Bedrijven
            </span>
          </div>

          <div className="p-3 bg-[#0a0a0a] border border-[#1f1f1f] rounded text-center">
            <span className="text-lg font-black text-magenta tracking-tight block">€2.4M+</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#777777]">
              Uitgekeerde Bonussen
            </span>
          </div>

          <div className="p-3 bg-[#0a0a0a] border border-[#1f1f1f] rounded text-center">
            <span className="text-lg font-black text-white tracking-tight block">99.8%</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#777777]">
              Kwalificatie Ratio
            </span>
          </div>

          <div className="p-3 bg-[#0a0a0a] border border-[#1f1f1f] rounded text-center">
            <span className="text-lg font-black text-emerald-400 tracking-tight block">Instant</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#777777]">
              CASS &amp; API Payouts
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
