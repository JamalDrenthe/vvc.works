import { cn } from "@/lib/utils"

interface FeedItemProps {
  name: string
  action: string
  value: string
  time: string
  highlight?: boolean
  delay?: number
}

/**
 * Eén regel in de Live Executie feed (dashboard rechterkant).
 * Gebruikt initial-tile + actie + waarde + tijd.
 */
export function FeedItem({
  name,
  action,
  value,
  time,
  highlight,
  delay,
}: FeedItemProps) {
  return (
    <div
      className="flex gap-4 items-start border-b border-[#222222] pb-4 last:border-0 last:pb-0 transition-colors duration-150 hover:bg-[#0a0a0a] px-1 -mx-1"
      style={{ animationDelay: `${delay ?? 0}s` }}
    >
      <div
        className={cn(
          "w-8 h-8 flex items-center justify-center font-black text-xs shrink-0",
          highlight ? "bg-magenta text-white" : "bg-[#222222] text-[#888888]",
        )}
      >
        {name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <p className="text-sm text-white font-bold leading-snug">
          {name} <span className="text-[#888888] font-normal">{action}</span>
        </p>
        <div className="flex justify-between items-center mt-1">
          <span
            className={cn(
              "text-xs font-black tracking-wider",
              highlight ? "text-magenta" : "text-white",
            )}
          >
            {value}
          </span>
          <span className="text-[10px] text-[#555555] font-bold uppercase tracking-widest">
            {time}
          </span>
        </div>
      </div>
    </div>
  )
}
