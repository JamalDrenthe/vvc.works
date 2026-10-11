import { useState } from "react"
import {
  Sparkles,
  ChevronLeft,
  Award,
  ArrowRight,
} from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { LoadingBarConnector } from "./LoadingBarConnector"
import type { EmailConfirmationData } from "./types"

interface Step7Props {
  connections: Record<string, boolean>
  userEmail: string
  onToggleConnection: (id: string, connected: boolean) => void
  onOpenEmailModal: (data: EmailConfirmationData) => void
  onPrev: () => void
}

export function Step7QualityControl2({
  connections,
  userEmail,
  onToggleConnection,
  onOpenEmailModal,
  onPrev,
}: Step7Props) {
  const navigate = useNavigate()
  const [customPlatformName, setCustomPlatformName] = useState("VVC Custom Kwaliteit Hub")
  const [isEditingName, setIsEditingName] = useState(false)

  const isConnected = !!connections["quality-slot-2"]

  const handleFinishOnboarding = () => {
    if (!isConnected) {
      toast.error("Rond eerst de koppeling van Kaart 7 af (laat de balk tot 100% lopen).")
      return
    }

    toast.success("🎉 Gefeliciteerd! VVC Onboarding New Flow is 100% voltooid!", {
      description: "Jouw profiel, bridges en partnerstatus zijn volledig geactiveerd.",
    })
    navigate("/dashboard")
  }

  return (
    <div className="bg-[#0a0a0a] border border-[#222222] p-6 lg:p-10 space-y-8 animate-fade-in">
      {/* ─── HEADER ─── */}
      <div className="border-b border-[#222222] pb-6">
        <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-2">
          Stap 7 — Kaart 7 (Finale Stap)
        </div>
        <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
          Externe Ecosysteem Voor Kwaliteitscontrole (Deel 2)
        </h2>
        <p className="text-xs text-[#888888] font-medium mt-1">
          Koppel het gereserveerde kwaliteitskanaal (nog in te vullen) om je onboarding officieel af te ronden.
        </p>
      </div>

      <div className="space-y-6">
        {/* ─── KOPPEL SLOT ─── */}
        <div className="bg-[#111111] border border-[#242424] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
                <Sparkles size={14} className="text-magenta" /> * Koppel met Nog In Te Vullen Slot
              </span>
              <p className="text-xs text-[#777777] mt-0.5">
                Configureer optioneel een specifieke platformnaam of gebruik de gereserveerde VVC Kwaliteit Hub.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsEditingName(!isEditingName)}
              className="border border-[#333333] hover:border-magenta text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 transition-colors self-start sm:self-auto"
            >
              {isEditingName ? "Opslaan" : "Wijzig Naam"}
            </button>
          </div>

          {isEditingName && (
            <div className="flex gap-2 animate-fade-in">
              <input
                type="text"
                value={customPlatformName}
                onChange={(e) => setCustomPlatformName(e.target.value)}
                placeholder="Platform naam…"
                className="bg-[#181818] border border-[#333333] text-xs text-white px-3 py-2 focus:outline-none focus:border-magenta flex-1"
              />
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="bg-magenta text-white font-bold text-xs uppercase px-4 py-2"
              >
                Klaar
              </button>
            </div>
          )}

          <LoadingBarConnector
            platformId="quality-slot-2"
            name={customPlatformName}
            description="Flexibele externe kwaliteitscontrole webhook & data bridge."
            isConnected={isConnected}
            userEmail={userEmail}
            onComplete={(emailData) => {
              onToggleConnection("quality-slot-2", true)
              onOpenEmailModal(emailData)
            }}
            onOpenEmailModal={onOpenEmailModal}
          />
        </div>

        {/* ─── CERTIFICAAT VAN VOLTOOIING (Als Kaart 7 gekoppeld is) ─── */}
        {isConnected && (
          <div className="bg-gradient-to-br from-[#120811] via-[#1a0c18] to-[#0a0a0a] border-2 border-magenta p-8 text-center space-y-4 animate-fade-in-up">
            <div className="w-16 h-16 mx-auto bg-magenta text-white flex items-center justify-center shadow-lg shadow-magenta/30">
              <Award size={36} />
            </div>

            <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em]">
              Executie Certificering
            </div>

            <h3 className="text-3xl font-black text-white uppercase tracking-tight">
              Onboarding Volledig Afgerond
            </h3>

            <p className="text-sm text-[#cccccc] max-w-xl mx-auto leading-relaxed">
              Alle 7 kaarten van de <strong>VVC Onboarding New Flow</strong> zijn met succes doorlopen.
              Je identiteit is geverifieerd, alle interne en externe platformbridges zijn geactiveerd (100%),
              en je hebt volledige toegang tot het VVC Controlecentrum.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="bg-white hover:bg-magenta hover:text-white text-black font-black py-4 px-10 uppercase tracking-widest text-xs transition-colors shadow-2xl flex items-center justify-center gap-2 group"
              >
                Naar Controlecentrum (Dashboard) <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/onboarding/companies")}
                className="border border-[#444444] hover:border-white text-white font-bold py-4 px-8 uppercase tracking-widest text-xs transition-colors"
              >
                Verken De 126 Bedrijven
              </button>
            </div>
          </div>
        )}

        {/* ─── NAVIGATIE KNOPPEN ─── */}
        <div className="pt-6 border-t border-[#222222] flex justify-between items-center">
          <button
            type="button"
            onClick={onPrev}
            className="border border-[#333333] hover:border-white text-white font-bold py-3.5 px-6 uppercase tracking-widest text-xs transition-colors flex items-center gap-2"
          >
            <ChevronLeft size={16} /> Vorige Kaart
          </button>
          {!isConnected && (
            <button
              type="button"
              disabled={!isConnected}
              className="bg-magenta text-white font-black py-3.5 px-8 uppercase tracking-widest text-xs opacity-50 cursor-not-allowed"
            >
              Koppel Eerst Slot 2
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
