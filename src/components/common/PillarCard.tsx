import { cn } from "@/lib/utils"

interface PillarCardProps {
  icon: React.ReactNode
  title: string
  value: string
  desc: string
  color: string
  highlight?: boolean
}

/**
 * Drie-kolom-kaart voor "Het VVC Groeipad" op de Onboarding pagina.
 * Achtergrond/border via `color` (bv. "border-magenta/30 bg-magenta/5").
 */
export function PillarCard({
  icon,
  title,
  value,
  desc,
  color,
  highlight,
}: PillarCardProps) {
  return (
    <div
      className={cn(
        "p-6 border relative overflow-hidden transition-transform hover:-translate-y-1",
        color,
      )}
    >
      {highlight && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-magenta to-orange-400" />
      )}
      <div className="mb-4">{icon}</div>
      <h3 className="text-[#888888] text-xs uppercase tracking-widest font-bold mb-1">
        {title}
      </h3>
      <div className="text-3xl font-black text-white mb-3 tracking-tight">
        {value}
      </div>
      <p className="text-sm text-[#888888] leading-relaxed">{desc}</p>
    </div>
  )
}
