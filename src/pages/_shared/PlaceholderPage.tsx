import { useNavigate } from "react-router"

interface PlaceholderPageProps {
  title: string
  icon: React.ReactNode
  description: string
}

/**
 * Generieke placeholder voor modules die nog gebouwd worden.
 * Vervangt het ad-hoc <PlaceholderPage> component uit app2 en wordt nu
 * door alle "in audit"-pagina's gedeeld.
 */
export function PlaceholderPage({
  title,
  icon,
  description,
}: PlaceholderPageProps) {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto animate-fade-in-up">
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        {icon}
      </div>
      <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-4">
        {title}
      </h2>
      <div className="w-8 h-1 bg-magenta mb-6" />
      <p className="text-[#888888] text-lg leading-relaxed">{description}</p>
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="mt-12 text-white font-black uppercase tracking-widest text-xs border-b border-magenta pb-1 hover:text-magenta transition-colors duration-200"
      >
        Terug naar Dashboard
      </button>
    </div>
  )
}
