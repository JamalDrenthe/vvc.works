import { useState } from "react"
import {
  ChevronRight,
  ChevronLeft,
  Bot,
} from "lucide-react"
import { toast } from "sonner"
import { LoadingBarConnector } from "./LoadingBarConnector"
import type { EmailConfirmationData } from "./types"

const INTERNAL_PLATFORMS: Array<{ id: string; name: string; description: string }> = [
  { id: "xabi-world", name: "Xabi World", description: "Digitale entertainment en lifestyle ecosystemen." },
  { id: "spontiva", name: "Spontiva", description: "Social networking en spontane zakelijke ontmoetingen." },
  { id: "boostplug", name: "Boostplug", description: "High-voltage affiliate en referral acceleratie engine (boostplug.one)." },
  { id: "logs-rent", name: "Logs Rent", description: "Logistieke verhuur en operationele asset tracking." },
  { id: "zheavenzy", name: "Zheavenzy", description: "Exclusieve luxury en lifestyle partnerschappen." },
  { id: "djobba", name: "Djobba", description: "On-demand talent matching en gig-economy verdeling." },
  { id: "woningvry", name: "WoningVry", description: "Woningmarkt frictieloze bemiddeling en huurverlichting (woningvry.nl)." },
  { id: "crmos", name: "CRMos", description: "Het centrale operatiesysteem voor pipeline-, lead- en dealmanagement." },
  { id: "immigratiepunt", name: "Immigratiepunt", description: "Juridische en zakelijke vestiging voor internationale professionals." },
  { id: "trusted-works", name: "Trusted Works", description: "Geverifieerde contracten, escrow en kwaliteitsborging." },
]

interface Step5Props {
  connections: Record<string, boolean>
  userEmail: string
  onToggleConnection: (id: string, connected: boolean) => void
  onOpenEmailModal: (data: EmailConfirmationData) => void
  onNext: () => void
  onPrev: () => void
}

export function Step5InternalEcosystem({
  connections,
  userEmail,
  onToggleConnection,
  onOpenEmailModal,
  onNext,
  onPrev,
}: Step5Props) {
  const [connectAllTrigger, setConnectAllTrigger] = useState(false)

  const allConnected = INTERNAL_PLATFORMS.every((p) => connections[p.id])
  const connectedCount = INTERNAL_PLATFORMS.filter((p) => connections[p.id]).length

  const handleConnectAll = () => {
    setConnectAllTrigger(true)
    toast.success("Bulk-koppeling gestart voor alle 10 interne platformen!", {
      description: "De IQ Bot initieert alle handshakes automatisch.",
    })
  }

  const validateAndProceed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!allConnected) {
      toast.error(`Koppel alle 10 interne platformen (${connectedCount}/10 gekoppeld).`)
      return
    }

    toast.success("Kaart 5 voltooid: Alle interne platformen zijn gekoppeld!")
    onNext()
  }

  return (
    <div className="bg-[#0a0a0a] border border-[#222222] p-6 lg:p-10 space-y-8 animate-fade-in">
      {/* ─── HEADER ─── */}
      <div className="border-b border-[#222222] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-2">
            Stap 5 — Kaart 5
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
            Intern Ecosysteem Koppelingen
          </h2>
          <p className="text-xs text-[#888888] font-medium mt-1">
            Volg de instructies van de IQ Agent & Bot en koppel de 10 interne zusterplatformen van VVC.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#888888]">
            Status: <strong className="text-magenta">{connectedCount}</strong> / 10 Gekoppeld
          </span>
          <button
            type="button"
            onClick={handleConnectAll}
            disabled={allConnected}
            className="bg-magenta hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest px-4 py-2 transition-colors disabled:opacity-40"
          >
            Koppel Alles Tegelijk
          </button>
        </div>
      </div>

      {/* ─── AGENT & BOT INSTRUCTIES ─── */}
      <div className="bg-[#111111] border border-magenta/30 p-5 space-y-3">
        <div className="flex items-center gap-2 text-magenta text-xs font-black uppercase tracking-wider">
          <Bot size={16} /> Instructies Van De Investbotiq IQ Agent & IQ Bot
        </div>
        <p className="text-xs text-[#aaaaaa] leading-relaxed">
          De geactiveerde IQ Agent heeft 10 interne platformen klaargezet voor synchronisatie.
          Elke koppeling verzorgt een automatische 0 naar 100 handshake met e-mailnotificatie en kent jouw
          VVC partnercode toe aan de respectievelijke backend.
        </p>
      </div>

      <form onSubmit={validateAndProceed} className="space-y-6">
        {/* ─── 10 PLATFORM CONNECTORS ─── */}
        <div className="space-y-3">
          {INTERNAL_PLATFORMS.map((platform) => (
            <LoadingBarConnector
              key={platform.id}
              platformId={platform.id}
              name={platform.name}
              description={platform.description}
              isConnected={!!connections[platform.id]}
              userEmail={userEmail}
              autoStart={connectAllTrigger}
              onComplete={(emailData) => {
                onToggleConnection(platform.id, true)
                onOpenEmailModal(emailData)
              }}
              onOpenEmailModal={onOpenEmailModal}
            />
          ))}
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
            Voltooi Kaart 5 & Doorgaan <ChevronRight size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
