import { useState } from "react"
import {
  Play,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { LoadingBarConnector } from "./LoadingBarConnector"
import type { EmailConfirmationData } from "./types"

const QUALITY_PLATFORMS_1: Array<{ id: string; name: string; category: string }> = [
  { id: "cloudiaudi", name: "CloudiAudi", category: "Audio Intelligence" },
  { id: "grover", name: "Grover", category: "Tech & Hardware Subscriptions" },
  { id: "temper", name: "Temper", category: "Flex-work & Hospitality" },
  { id: "young-ones", name: "Young Ones", category: "Freelance & Gig Economy" },
  { id: "nowjobs", name: "NowJobs", category: "Direct Staffing" },
  { id: "staffyou", name: "StaffYou", category: "Flex & Payroll" },
  { id: "spotify", name: "Spotify", category: "Music & Streaming" },
  { id: "tidal", name: "Tidal", category: "HiFi Audio Streaming" },
  { id: "apple-music", name: "Apple Music", category: "Media Ecosystem" },
  { id: "deezer", name: "Deezer", category: "Global Streaming" },
  { id: "amazon-music", name: "Amazon Music", category: "Prime Audio Network" },
  { id: "soundcloud", name: "SoundCloud", category: "Creator & Stream Network" },
  { id: "pandora", name: "Pandora", category: "Radio & Music Stream" },
  { id: "youtube", name: "YouTube", category: "Video & Content Verification" },
]

interface Step6Props {
  connections: Record<string, boolean>
  userEmail: string
  onToggleConnection: (id: string, connected: boolean) => void
  onOpenEmailModal: (data: EmailConfirmationData) => void
  onNext: () => void
  onPrev: () => void
}

export function Step6QualityControl1({
  connections,
  userEmail,
  onToggleConnection,
  onOpenEmailModal,
  onNext,
  onPrev,
}: Step6Props) {
  const [videoWatched, setVideoWatched] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [qAnswer, setQAnswer] = useState("")
  const [bulkTrigger, setBulkTrigger] = useState(false)

  const allConnected = QUALITY_PLATFORMS_1.every((p) => connections[p.id])
  const connectedCount = QUALITY_PLATFORMS_1.filter((p) => connections[p.id]).length

  const handleConnectAll = () => {
    setBulkTrigger(true)
    toast.success("Bulk verificatie gestart voor alle 14 kwaliteitsplatformen!", {
      description: "Alle API handshakes lopen nu van 0 naar 100%.",
    })
  }

  const validateAndProceed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!videoWatched) {
      toast.error("Bekijk eerst de video over VVC Kwaliteitscontrole.")
      return
    }
    if (!qAnswer) {
      toast.error("Beantwoord de vraag over kwaliteitscontrole.")
      return
    }
    if (!allConnected) {
      toast.error(`Koppel alle 14 platformen (${connectedCount}/14 gekoppeld).`)
      return
    }

    toast.success("Kaart 6 voltooid: Externe Kwaliteitscontrole Deel 1 afgerond!")
    onNext()
  }

  return (
    <div className="bg-[#0a0a0a] border border-[#222222] p-6 lg:p-10 space-y-8 animate-fade-in">
      {/* ─── HEADER ─── */}
      <div className="border-b border-[#222222] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-2">
            Stap 6 — Kaart 6
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
            Externe Ecosysteem Voor Kwaliteitscontrole (Deel 1)
          </h2>
          <p className="text-xs text-[#888888] font-medium mt-1">
            Leer over de VVC audit-standaarden, bekijk de video en koppel de 14 externe kwaliteits- en mediakanalen.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#888888]">
            Status: <strong className="text-magenta">{connectedCount}</strong> / 14 Gekoppeld
          </span>
          <button
            type="button"
            onClick={handleConnectAll}
            disabled={allConnected}
            className="bg-magenta hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest px-4 py-2 transition-colors disabled:opacity-40"
          >
            Koppel Alle 14 Tegelijk
          </button>
        </div>
      </div>

      <form onSubmit={validateAndProceed} className="space-y-8">
        {/* ─── VIDEO & QUIZ OVER KWALITEITSCONTROLE ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video */}
          <div className="bg-[#111111] border border-[#242424] p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black uppercase text-white flex items-center gap-2">
                  <Play size={14} className="text-magenta" /> * Video: Kwaliteitscontrole Methodologie
                </span>
                {videoWatched && (
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Bekeken ✔</span>
                )}
              </div>

              <div className="relative aspect-video bg-black border border-[#2e2e2e] flex items-center justify-center overflow-hidden mb-3">
                {isVideoPlaying ? (
                  <div className="p-4 text-center">
                    <span className="text-xs text-magenta font-mono">Quality Assurance Framework Video</span>
                    <div className="w-32 bg-[#222222] h-1 mt-2 mx-auto">
                      <div className="bg-magenta h-1 w-3/4 animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsVideoPlaying(true)
                      setVideoWatched(true)
                    }}
                    className="w-12 h-12 bg-magenta text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    <Play size={20} className="ml-0.5" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-[#888888] font-medium">
              Hoe VVC data integriteit en CSAT waarborgt over alle flex- en streaming ecosystemen.
            </p>
          </div>

          {/* Vragen */}
          <div className="bg-[#111111] border border-[#242424] p-5 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-1">
                Kwaliteitsaudit
              </div>
              <h4 className="text-xs font-bold text-white uppercase mb-3">
                * Waarom is externe kwaliteitscontrole essentieel voor partners?
              </h4>

              <div className="space-y-2">
                {[
                  "Om 100% legitieme transacties te borgen en afkeur van bonussen te voorkomen",
                  "Om willekeurige formulieren handmatig in te vullen",
                  "Het is alleen een formaliteit zonder financieel effect",
                ].map((ans) => (
                  <button
                    key={ans}
                    type="button"
                    onClick={() => setQAnswer(ans)}
                    className={cn(
                      "w-full p-2.5 text-xs text-left border transition-all font-medium",
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

            <p className="text-xs text-[#888888] font-medium pt-3">
              Kwaliteitscontrole garandeert dat partners zonder geschillen hun bonussen uitgekeerd krijgen.
            </p>
          </div>
        </div>

        {/* ─── 14 KOPPELINGEN ─── */}
        <div className="space-y-3">
          <div className="text-xs font-black uppercase text-white tracking-wider">
            * Koppel met de 14 Externe Kwaliteits- & Mediakanalen (0 naar 100 met e-mailbevestiging)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {QUALITY_PLATFORMS_1.map((p) => (
              <LoadingBarConnector
                key={p.id}
                platformId={p.id}
                name={p.name}
                description={p.category}
                isConnected={!!connections[p.id]}
                userEmail={userEmail}
                autoStart={bulkTrigger}
                onComplete={(emailData) => {
                  onToggleConnection(p.id, true)
                  onOpenEmailModal(emailData)
                }}
                onOpenEmailModal={onOpenEmailModal}
              />
            ))}
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
            Voltooi Kaart 6 & Doorgaan <ChevronRight size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
