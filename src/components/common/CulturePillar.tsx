import { cn } from "@/lib/utils"

interface CulturePillarProps {
  number: string
  title: string
  description: string
  highlight?: boolean
  delay?: number
}

/**
 * Eén pijler in "De Brandstof van de Club".
 * Gebruikt op het dashboard.
 */
export function CulturePillar({
  number,
  title,
  description,
  highlight,
  delay,
}: CulturePillarProps) {
  return (
    <div
      className="flex gap-6 items-start"
      style={{ animationDelay: `${delay ?? 0}s` }}
    >
      <div
        className={cn(
          "text-4xl font-black leading-none",
          highlight ? "text-magenta" : "text-[#222222]",
        )}
      >
        {number}
      </div>
      <div>
        <h4
          className={cn(
            "font-black uppercase tracking-widest text-sm mb-2",
            highlight ? "text-magenta" : "text-white",
          )}
        >
          {title}
        </h4>
        <p className="text-[#888888] text-sm">{description}</p>
      </div>
    </div>
  )
}
