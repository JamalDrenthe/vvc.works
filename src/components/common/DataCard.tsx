import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataCardProps {
  title: string
  value: string
  sub: string
  highlight?: boolean
  isScore?: boolean
  delay?: number
}

/**
 * KPI-kaart voor het dashboard. Brutalist look — vierkante hoeken,
 * scherpe contrasten. Optioneel highlighted (magenta vlak) of met
 * sterren-icoon voor scores.
 */
export function DataCard({
  title,
  value,
  sub,
  highlight,
  isScore,
  delay,
}: DataCardProps) {
  return (
    <div
      className={cn(
        "p-8 border flex flex-col justify-between min-h-[160px] transition-colors duration-200 hover:border-[#333333]",
        highlight
          ? "bg-magenta text-white border-magenta"
          : "bg-[#0a0a0a] border-[#222222]",
      )}
      style={{ animationDelay: `${delay ?? 0}s` }}
    >
      <div
        className={cn(
          "text-[10px] font-black uppercase tracking-[0.2em]",
          highlight ? "text-white/80" : "text-[#888888]",
        )}
      >
        {title}
      </div>
      <div>
        <div className="flex items-end gap-2">
          <div className="text-4xl font-black tracking-tighter">{value}</div>
          {isScore && (
            <Star className="mb-1 text-magenta fill-magenta" size={20} />
          )}
        </div>
        <div
          className={cn(
            "text-xs font-bold mt-2",
            highlight ? "text-white" : "text-[#555555]",
          )}
        >
          {sub}
        </div>
      </div>
    </div>
  )
}
