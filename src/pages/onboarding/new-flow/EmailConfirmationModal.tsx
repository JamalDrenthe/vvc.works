import { Mail, CheckCircle2, X, Copy } from "lucide-react"
import { toast } from "sonner"
import type { EmailConfirmationData } from "./types"

interface EmailConfirmationModalProps {
  data: EmailConfirmationData | null
  onClose: () => void
}

export function EmailConfirmationModal({
  data,
  onClose,
}: EmailConfirmationModalProps) {
  if (!data) return null

  const handleCopyCode = () => {
    void navigator.clipboard.writeText(data.confirmationCode)
    toast.success("Bevestigingscode gekopieerd naar klembord!")
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#0c0c0c] border border-magenta/40 max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-fade-in-up">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#666666] hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Email Header */}
        <div className="flex items-center gap-3 border-b border-[#222222] pb-5 mb-5">
          <div className="w-12 h-12 bg-magenta/10 border border-magenta flex items-center justify-center text-magenta shrink-0">
            <Mail size={24} />
          </div>
          <div>
            <div className="inline-block border border-magenta text-magenta text-[9px] font-black px-2 py-0.5 uppercase tracking-widest mb-1">
              E-Mail Bevestiging (100% Voltooid)
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              Koppeling Geactiveerd: {data.platformName}
            </h3>
          </div>
        </div>

        {/* Email Body Simulation */}
        <div className="bg-[#111111] border border-[#222222] p-4 text-xs space-y-3 mb-6">
          <div className="flex justify-between items-center text-[#777777] border-b border-[#1c1c1c] pb-2">
            <span><strong>Aan:</strong> {data.recipientEmail || "voorbeeld@vvc.works"}</span>
            <span className="text-[10px]">{data.timestamp}</span>
          </div>
          <div className="text-[#888888]">
            <span><strong>Van:</strong> ecosystem@vvc.works</span>
          </div>
          <div className="text-white font-bold text-sm pt-1">
            Onderwerp: Handshake Succesvol — {data.platformName} bridge actief
          </div>
          <p className="text-[#aaaaaa] leading-relaxed pt-1">
            Beste VVC-partner,
            <br />
            De automatische verificatie en data-handshake tussen het <strong>VVC Platform</strong> en{" "}
            <strong className="text-white">{data.platformName}</strong> is zojuist met succes afgerond (100%).
            Alle benodigde rechten en webhooks zijn operationeel.
          </p>

          <div className="bg-[#080808] border border-[#2a2a2a] p-3 flex justify-between items-center mt-3">
            <div>
              <div className="text-[9px] uppercase text-[#666666] font-bold">Unieke Auth Token</div>
              <div className="font-mono text-magenta text-xs font-bold">{data.confirmationCode}</div>
            </div>
            <button
              type="button"
              onClick={handleCopyCode}
              className="text-[#888888] hover:text-white p-1 transition-colors"
              title="Kopieer code"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-magenta hover:bg-white hover:text-black text-white font-black py-3 px-6 uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} /> Bevestiging Sluiten & Doorgaan
          </button>
        </div>
      </div>
    </div>
  )
}
