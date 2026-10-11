import { useState } from "react"
import {
  Play,
  FileText,
  Download,
  Bot,
  Cpu,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { LoadingBarConnector } from "./LoadingBarConnector"
import type { Step4Data, EmailConfirmationData } from "./types"

interface Step4Props {
  data: Step4Data
  userEmail: string
  onChange: (updated: Partial<Step4Data>) => void
  onOpenEmailModal: (data: EmailConfirmationData) => void
  onNext: () => void
  onPrev: () => void
}

export function Step4Investbotiq({
  data,
  userEmail,
  onChange,
  onOpenEmailModal,
  onNext,
  onPrev,
}: Step4Props) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [qAnswer, setQAnswer] = useState(data.q1Investbotiq || "")

  const handleDownloadPdf = () => {
    onChange({ pdfRead: true })
    toast.success("Investbotiq Handleiding & Bot Specificatie geopend!")
  }

  const validateAndProceed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.connected) {
      toast.error("Koppel eerst Investbotiq met VVC (laat de balk tot 100% lopen).")
      return
    }
    if (!data.iqAgentActive || !data.iqBotActive) {
      toast.error("Activeer zowel de IQ Agent als de IQ Bot via de toggles.")
      return
    }

    toast.success("Kaart 4 voltooid: Investbotiq geconfigureerd!")
    onNext()
  }

  return (
    <div className="bg-[#0a0a0a] border border-[#222222] p-6 lg:p-10 space-y-8 animate-fade-in">
      {/* ─── HEADER ─── */}
      <div className="border-b border-[#222222] pb-6">
        <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-2">
          Stap 4 — Kaart 4
        </div>
        <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
          IQ — Investbotiq
        </h2>
        <p className="text-xs text-[#888888] font-medium mt-1">
          Ontdek de autonome handels- en marktintelligence bots van Investbotiq, koppel het platform en activeer je agents.
        </p>
      </div>

      <form onSubmit={validateAndProceed} className="space-y-8">
        {/* ─── VIDEO & PDF ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video */}
          <div className="bg-[#111111] border border-[#242424] p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black uppercase text-white flex items-center gap-2">
                  <Play size={14} className="text-magenta" /> * Video: Wat is Investbotiq?
                </span>
                {data.videoWatched && (
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Bekeken ✔</span>
                )}
              </div>

              <div className="relative aspect-video bg-black border border-[#2e2e2e] flex items-center justify-center overflow-hidden mb-3">
                {isVideoPlaying ? (
                  <div className="p-4 text-center">
                    <span className="text-xs text-magenta font-mono">Investbotiq IQ Engine Video</span>
                    <div className="w-32 bg-[#222222] h-1 mt-2 mx-auto">
                      <div className="bg-magenta h-1 w-4/5 animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsVideoPlaying(true)
                      onChange({ videoWatched: true })
                    }}
                    className="w-12 h-12 bg-magenta text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    <Play size={20} className="ml-0.5" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-[#888888] font-medium">
              Leer hoe Investbotiq algoritmes gebruikt om marktkansen en arbitrage automatisch te signaleren.
            </p>
          </div>

          {/* PDF */}
          <div className="bg-[#111111] border border-[#242424] p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black uppercase text-white flex items-center gap-2">
                  <FileText size={14} className="text-magenta" /> * PDF: Investbotiq Bot Blueprint
                </span>
                {data.pdfRead && (
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Gelezen ✔</span>
                )}
              </div>

              <div className="border border-[#2e2e2e] bg-[#0c0c0c] p-6 text-center space-y-3 mb-3">
                <div className="w-12 h-12 mx-auto bg-magenta/10 border border-magenta/40 flex items-center justify-center text-magenta">
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase">Investbotiq_IQ_Framework_v1.pdf</h4>
                  <div className="text-[10px] text-[#777777]">Specificaties van de IQ Agent & Bot</div>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="border border-[#333333] hover:border-magenta text-white text-xs font-bold uppercase px-4 py-2 transition-colors inline-flex items-center gap-2"
                >
                  <Download size={13} /> Download Handleiding
                </button>
              </div>
            </div>

            <p className="text-xs text-[#888888] font-medium">
              Volledig inzicht in de instellingen, risicoparameters en geautomatiseerde triggers van de bots.
            </p>
          </div>
        </div>

        {/* ─── QUIZ OVER INVESTBOTIQ ─── */}
        <div className="bg-[#111111] border border-[#262626] p-6 space-y-3">
          <label className="block text-xs font-bold text-white uppercase">
            * Vraag: Welke rol spelen de IQ Agent en IQ Bot voor VVC partners?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              "Ze analyseren data en automatiseren repetitieve executie",
              "Ze vervangen alle menselijke communicatie volledig",
              "Ze dienen uitsluitend als advertentiebanner",
            ].map((ans) => (
              <button
                key={ans}
                type="button"
                onClick={() => {
                  setQAnswer(ans)
                  onChange({ q1Investbotiq: ans })
                }}
                className={cn(
                  "p-3 text-xs text-left border transition-all font-medium",
                  qAnswer === ans
                    ? "border-magenta bg-magenta/15 text-white ring-1 ring-magenta font-bold"
                    : "border-[#292929] bg-[#161616] text-[#888888] hover:text-white",
                )}
              >
                {ans}
              </button>
            ))}
          </div>
        </div>

        {/* ─── KOPPEL INVESTBOTIQ (Loading bar 0 naar 100 met e-mail bevestiging) ─── */}
        <div className="space-y-3">
          <div className="text-xs font-black uppercase text-white tracking-wider">
            * Koppel Investbotiq met VVC (Loading bar 0 naar 100 met e-mail bevestiging)
          </div>

          <LoadingBarConnector
            platformId="investbotiq"
            name="Investbotiq"
            description="Algoritmische investerings- en rendementsinfrastructuur."
            isConnected={data.connected}
            userEmail={userEmail}
            onComplete={(emailData) => {
              onChange({ connected: true, progress: 100 })
              onOpenEmailModal(emailData)
            }}
            onOpenEmailModal={onOpenEmailModal}
          />
        </div>

        {/* ─── ACTIVEER IQ AGENT & IQ BOT TOGGLES ─── */}
        <div className="space-y-4 pt-2 border-t border-[#1f1f1f]">
          <div className="text-xs font-black uppercase text-white tracking-wider">
            * Activeer de IQ Agent en IQ Bot (Toggles)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* IQ Agent Toggle */}
            <div
              className={cn(
                "p-5 border transition-all",
                data.iqAgentActive
                  ? "bg-[#09150d] border-emerald-500/50"
                  : "bg-[#111111] border-[#262626]",
              )}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#1c1c1c] border border-[#333333] flex items-center justify-center text-magenta">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase">IQ Agent</h4>
                    <span className="text-[10px] text-[#777777]">Markt- en Deal Scanner</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const next = !data.iqAgentActive
                    onChange({ iqAgentActive: next })
                    if (next) toast.success("IQ Agent geactiveerd!")
                  }}
                  className={cn(
                    "px-4 py-1.5 text-xs font-black uppercase tracking-wider border transition-colors",
                    data.iqAgentActive
                      ? "border-emerald-500 bg-emerald-500 text-black"
                      : "border-[#444444] text-[#888888] hover:text-white",
                  )}
                >
                  {data.iqAgentActive ? "Actief ✔" : "Inschakelen"}
                </button>
              </div>
              <p className="text-xs text-[#888888]">
                Scant automatisch warme netwerk opportuniteiten en matcht deals tegen actuele bonussen.
              </p>
            </div>

            {/* IQ Bot Toggle */}
            <div
              className={cn(
                "p-5 border transition-all",
                data.iqBotActive
                  ? "bg-[#09150d] border-emerald-500/50"
                  : "bg-[#111111] border-[#262626]",
              )}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#1c1c1c] border border-[#333333] flex items-center justify-center text-magenta">
                    <Bot size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase">IQ Bot</h4>
                    <span className="text-[10px] text-[#777777]">Workflow Automator</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const next = !data.iqBotActive
                    onChange({ iqBotActive: next })
                    if (next) toast.success("IQ Bot geactiveerd!")
                  }}
                  className={cn(
                    "px-4 py-1.5 text-xs font-black uppercase tracking-wider border transition-colors",
                    data.iqBotActive
                      ? "border-emerald-500 bg-emerald-500 text-black"
                      : "border-[#444444] text-[#888888] hover:text-white",
                  )}
                >
                  {data.iqBotActive ? "Actief ✔" : "Inschakelen"}
                </button>
              </div>
              <p className="text-xs text-[#888888]">
                Verwerkt API-verzoeken, synchroniseert platform-statussen en initieert automatische kwalificatie.
              </p>
            </div>
          </div>
        </div>

        {/* ─── NAVIGATIE KNOPPEN ─── */}
        <div className="pt-6 border-t border-[#222222] flex justify-between items-center">
          <button
            type="button"
            onClick={onPrev}
            className="border border-[#333333] hover:border-white text-white font-bold py-3.5 px-6 uppercase tracking-widest text-xs transition-colors flex items-center gap-2"
          >
            <ChevronLeft size={16} /> Vorige Kaart
          </button>
          <button
            type="submit"
            className="bg-magenta hover:bg-white hover:text-black text-white font-black py-3.5 px-8 uppercase tracking-widest text-xs transition-colors flex items-center gap-2"
          >
            Voltooi Kaart 4 & Doorgaan <ChevronRight size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
