import { useParams } from "react-router"
import { Layers, Zap } from "lucide-react"

const KNOWN_APPS = new Set([
  "boastplug",
  "woningvrij",
  "spontiva",
  "investbotiq",
  "djobba",
])

/**
 * Detail-pagina per VVC App. Wordt gestuurd door /apps/:appId.
 */
export default function AppDetailPage() {
  const { appId } = useParams<{ appId: string }>()
  const safeId = appId?.toLowerCase() ?? ""
  const isKnown = KNOWN_APPS.has(safeId)
  const displayName = (appId ?? "App").replace(/^[a-z]/, (c) => c.toUpperCase())

  return (
    <div className="h-full flex flex-col justify-center max-w-4xl mx-auto animate-fade-in">
      <div className="bg-[#0a0a0a] border border-[#222222] p-12 lg:p-20 flex flex-col items-center justify-center text-center relative animate-fade-in-up">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div
            className="absolute top-0 left-1/4 w-px h-full animate-shimmer"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #e6007e, transparent)",
              backgroundSize: "100% 200%",
            }}
          />
          <div
            className="absolute top-1/3 left-0 w-full h-px animate-shimmer"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>

        <div className="w-20 h-20 bg-black border border-[#333333] flex items-center justify-center mb-8 relative z-10">
          <Layers size={32} className="text-magenta" />
        </div>

        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6 relative z-10">
          {displayName}
        </h2>

        <div className="w-12 h-1 bg-magenta mb-8 relative z-10" />

        <p className="text-[#888888] max-w-2xl mb-12 text-lg font-medium leading-relaxed relative z-10">
          {isKnown ? (
            <>
              Onderdeel van het exclusieve{" "}
              <strong className="text-white">VVC App Ecosysteem</strong>. Dit
              is jouw tool om markten te domineren, efficiëntie te maximaliseren
              en directe waarde te creëren voor het netwerk.
            </>
          ) : (
            <>
              Geen geldige app gevonden voor &ldquo;{appId}&rdquo;. Selecteer
              een app uit het zijmenu om verder te gaan.
            </>
          )}
        </p>

        {isKnown && (
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full justify-center">
            <button
              type="button"
              className="bg-magenta text-white px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-200 flex items-center justify-center gap-3"
            >
              <Zap size={16} /> Initialiseer Tool
            </button>
            <button
              type="button"
              className="bg-transparent text-white border border-[#444444] px-10 py-4 font-black uppercase tracking-widest text-sm hover:border-white transition-colors duration-200"
            >
              Documentatie
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
