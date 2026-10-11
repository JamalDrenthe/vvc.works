import { useState } from "react"
import {
  Play,
  FileText,
  Download,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Zap,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { LoadingBarConnector } from "./LoadingBarConnector"
import type { Step3Data, EmailConfirmationData } from "./types"

interface Step3Props {
  data: Step3Data
  userEmail: string
  onChange: (updated: Partial<Step3Data>) => void
  onOpenEmailModal: (data: EmailConfirmationData) => void
  onNext: () => void
  onPrev: () => void
}

export function Step3QuantumInitium({
  data,
  userEmail,
  onChange,
  onOpenEmailModal,
  onNext,
  onPrev,
}: Step3Props) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [qAnswer, setQAnswer] = useState(data.q1Quantum || "")

  const handleDownloadPdf = () => {
    onChange({ pdfRead: true })
    toast.success("Quantum Initium Whitepaper & Architectuur PDF geopend!")
  }

  const handleEnterEcosystem = () => {
    onChange({ enteredEcosystem: true })
    toast.success("Succesvol aangemeld in het Quantum Initium Ecosysteem!")
  }

  const validateAndProceed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.connected) {
      toast.error("Koppel eerst met Quantum Initium (laat de balk tot 100% lopen).")
      return
    }
    if (!data.enteredEcosystem) {
      toast.error("Klik eerst op 'Kom in het ecosysteem (Start)'.")
      return
    }

    toast.success("Kaart 3 voltooid: Quantum Initium gekoppeld!")
    onNext()
  }

  return (
    <div className="bg-[#0a0a0a] border border-[#222222] p-6 lg:p-10 space-y-8 animate-fade-in">
      {/* ─── HEADER ─── */}
      <div className="border-b border-[#222222] pb-6">
        <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-2">
          Stap 3 — Kaart 3
        </div>
        <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
          QI — Quantum Initium
        </h2>
        <p className="text-xs text-[#888888] font-medium mt-1">
          Leer hoe het Quantum Initium ecosysteem werkt, bekijk de video en whitepaper, en activeer de bridge.
        </p>
      </div>

      <form onSubmit={validateAndProceed} className="space-y-8">
        {/* ─── VIDEO & PDF SECTION ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Box */}
          <div className="bg-[#111111] border border-[#242424] p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black uppercase text-white flex items-center gap-2">
                  <Play size={14} className="text-magenta" /> * Video: Leer over Quantum Initium
                </span>
                {data.videoWatched && (
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Bekeken ✔</span>
                )}
              </div>

              <div className="relative aspect-video bg-black border border-[#2e2e2e] flex items-center justify-center overflow-hidden mb-3">
                {isVideoPlaying ? (
                  <div className="p-4 text-center">
                    <span className="text-xs text-magenta font-mono">Quantum Initium Orientation</span>
                    <div className="w-32 bg-[#222222] h-1 mt-2 mx-auto">
                      <div className="bg-magenta h-1 w-2/3 animate-pulse" />
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
              Uitleg over de kernarchitectuur van Quantum Initium en hoe dit de basis vormt voor het partnernetwerk.
            </p>
          </div>

          {/* PDF Box */}
          <div className="bg-[#111111] border border-[#242424] p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black uppercase text-white flex items-center gap-2">
                  <FileText size={14} className="text-magenta" /> * PDF: QI Architectuur & Documentatie
                </span>
                {data.pdfRead && (
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Gelezen ✔</span>
                )}
              </div>

              <div className="border border-[#2e2e2e] bg-[#0c0c0c] p-6 text-center space-y-3 mb-3">
                <div className="w-12 h-12 mx-auto bg-magenta/10 border border-magenta/40 flex items-center justify-center text-magenta">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase">QI_System_Overview_v2.4.pdf</h4>
                  <div className="text-[10px] text-[#777777]">14 Pagina's • Volledige Ecosysteem Map</div>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="border border-[#333333] hover:border-magenta text-white text-xs font-bold uppercase px-4 py-2 transition-colors inline-flex items-center gap-2"
                >
                  <Download size={13} /> Bekijk & Download PDF
                </button>
              </div>
            </div>

            <p className="text-xs text-[#888888] font-medium">
              Gedetailleerde whitepaper met de technische en financiële grondbeginselen van QI.
            </p>
          </div>
        </div>

        {/* ─── QUIZ & START KNOP ─── */}
        <div className="bg-[#111111] border border-[#262626] p-6 space-y-5">
          <div className="text-xs font-black uppercase text-white tracking-wider">
            Vragen & Ecosysteem Start
          </div>

          <div>
            <label className="block text-xs font-bold text-white uppercase mb-2">
              Wat is de voornaamste functie van Quantum Initium binnen VVC?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                "De technologische backbone en holding-infrastructuur",
                "Een losstaand uitzendbureau zonder koppeling",
                "Een administratief factuurprogramma",
              ].map((ans) => (
                <button
                  key={ans}
                  type="button"
                  onClick={() => {
                    setQAnswer(ans)
                    onChange({ q1Quantum: ans })
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

          {/* Kom in het ecosysteem (start) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-3 border-t border-[#1f1f1f]">
            <div>
              <span className="block text-xs font-bold text-white uppercase">
                Kom in het ecosysteem (Start)
              </span>
              <span className="text-[10px] text-[#777777]">
                Activeer je partnerprofiel direct binnen het QI netwerk.
              </span>
            </div>
            <button
              type="button"
              onClick={handleEnterEcosystem}
              className={cn(
                "px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2",
                data.enteredEcosystem
                  ? "bg-emerald-500/20 border border-emerald-500 text-emerald-300"
                  : "bg-white hover:bg-magenta hover:text-white text-black",
              )}
            >
              {data.enteredEcosystem ? (
                <>
                  <CheckCircle2 size={14} /> In Ecosysteem Actief
                </>
              ) : (
                <>
                  <Zap size={14} /> Start Ecosysteem
                </>
              )}
            </button>
          </div>
        </div>

        {/* ─── AANDELEN VRAAG ─── */}
        <div className="bg-[#111111] border border-[#262626] p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="block text-xs font-bold text-white uppercase">
              * Wil je aandelen in het ecosysteem?
            </span>
            <span className="text-[10px] text-[#777777]">
              Mogelijkheid tot equity participation en winstdeling bij aanhoudende partner-executie.
            </span>
          </div>
          <div className="flex gap-2">
            {(["Ja", "Nee"] as const).map((opt) => {
              const isJa = opt === "Ja"
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onChange({ wantsShares: isJa })}
                  className={cn(
                    "px-5 py-2 text-xs font-bold uppercase tracking-wider border transition-colors",
                    data.wantsShares === isJa
                      ? "border-magenta bg-magenta text-white"
                      : "border-[#333333] text-[#777777]",
                  )}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>

        {/* ─── KOPPEL MET QUANTUM INITIUM (0 naar 100 met e-mail bevestiging) ─── */}
        <div className="space-y-3">
          <div className="text-xs font-black uppercase text-white tracking-wider">
            * Koppel met Quantum Initium (Loading bar 0 naar 100 met e-mail bevestiging)
          </div>

          <LoadingBarConnector
            platformId="quantum-initium"
            name="Quantum Initium"
            description="De centrale backbone van het VVC ecosysteem. Realtime verificatie van partnerrechten."
            isConnected={data.connected}
            userEmail={userEmail}
            onComplete={(emailData) => {
              onChange({ connected: true, progress: 100 })
              onOpenEmailModal(emailData)
            }}
            onOpenEmailModal={onOpenEmailModal}
          />
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
            Voltooi Kaart 3 & Doorgaan <ChevronRight size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
