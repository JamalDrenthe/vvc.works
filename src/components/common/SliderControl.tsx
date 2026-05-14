import { cn } from "@/lib/utils"

interface SliderControlProps {
  label: string
  value: number
  max: number
  onChange: (val: number) => void
  subtext: string
  isHighlight?: boolean
}

/**
 * Brutalist range slider voor de financiële calculator.
 * Magenta variant via `isHighlight`.
 */
export function SliderControl({
  label,
  value,
  max,
  onChange,
  subtext,
  isHighlight,
}: SliderControlProps) {
  const percentage = (value / max) * 100
  const trackColor = isHighlight ? "#e6007e" : "#ffffff"

  return (
    <div>
      <div className="flex justify-between items-end mb-3">
        <label className="text-sm font-black uppercase tracking-wider text-white">
          {label}
        </label>
        <span
          className={cn(
            "text-lg font-black transition-colors duration-150",
            isHighlight ? "text-magenta" : "text-white",
          )}
        >
          {value}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className={cn(
          "w-full h-1 bg-[#333333] appearance-none cursor-pointer mb-2",
          isHighlight && "highlight-slider",
        )}
        style={{
          background: `linear-gradient(to right, ${trackColor} ${percentage}%, #333333 ${percentage}%)`,
        }}
      />
      <p className="text-xs text-[#666666] font-medium">{subtext}</p>
    </div>
  )
}
