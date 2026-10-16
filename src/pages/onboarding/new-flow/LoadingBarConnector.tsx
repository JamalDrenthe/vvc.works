import { useState, useEffect, useCallback } from "react"
import { CheckCircle2, Loader2, Zap } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { AutoPlayVideoModal } from "./AutoPlayVideoModal"
import type { EmailConfirmationData } from "./types"

interface LoadingBarConnectorProps {
  platformId: string
  name: string
  description?: string
  isConnected: boolean
  userEmail: string
  buttonLabel?: string
  connectedLabel?: string
  videoSrc?: string
  onComplete: (data: EmailConfirmationData) => void
  onOpenEmailModal: (data: EmailConfirmationData) => void
  autoStart?: boolean
}

export function LoadingBarConnector({
  platformId,
  name,
  description,
  isConnected,
  userEmail,
  buttonLabel,
  connectedLabel = "Verbonden",
  videoSrc,
  onComplete,
  onOpenEmailModal,
  autoStart = false,
}: LoadingBarConnectorProps) {
  const [progress, setProgress] = useState(isConnected ? 100 : 0)
  const [isRunning, setIsRunning] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [latestEmailData, setLatestEmailData] = useState<EmailConfirmationData | null>(
    isConnected
      ? {
          platformName: name,
          recipientEmail: userEmail || "info@vvc.works",
          confirmationCode: `VVC-AUTH-${platformId.toUpperCase()}-992`,
          timestamp: "Actief geregistreerd",
        }
      : null,
  )

  const completeConnection = useCallback(() => {
    setProgress(100)
    setIsRunning(false)
    const emailData: EmailConfirmationData = {
      platformName: name,
      recipientEmail: userEmail || "info@vvc.works",
      confirmationCode: `VVC-${platformId.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleTimeString("nl-NL", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }
    setLatestEmailData(emailData)
    onComplete(emailData)
    onOpenEmailModal(emailData)
    toast.success(`100% Gekoppeld met ${name}!`, {
      description: `E-mailbevestiging succesvol verzonden naar ${emailData.recipientEmail}.`,
    })
  }, [name, platformId, userEmail, onComplete, onOpenEmailModal])

  const startConnection = useCallback(() => {
    if (isRunning || progress === 100) return

    // If videoSrc is provided, open the auto-play video modal instead of running standard timer
    if (videoSrc) {
      setIsVideoModalOpen(true)
      return
    }

    setIsRunning(true)
    setProgress(0)

    let current = 0
    const interval = setInterval(() => {
      const jump = Math.floor(Math.random() * 18) + 12
      current = Math.min(100, current + jump)
      setProgress(current)

      if (current >= 100) {
        clearInterval(interval)
        completeConnection()
      }
    }, 200)
  }, [isRunning, progress, videoSrc, completeConnection])

  const handleVideoComplete = () => {
    setIsVideoModalOpen(false)
    completeConnection()
  }

  useEffect(() => {
    if (!autoStart || isConnected || progress === 100 || isRunning) return

    const timer = setTimeout(() => {
      // For autoStart, run loading bar animation
      setIsRunning(true)
      setProgress(0)
      let current = 0
      const interval = setInterval(() => {
        const jump = Math.floor(Math.random() * 18) + 12
        current = Math.min(100, current + jump)
        setProgress(current)
        if (current >= 100) {
          clearInterval(interval)
          completeConnection()
        }
      }, 200)
    }, 100)

    return () => clearTimeout(timer)
  }, [autoStart, isConnected, progress, isRunning, completeConnection])

  return (
    <>
      {videoSrc && (
        <AutoPlayVideoModal
          isOpen={isVideoModalOpen}
          videoSrc={videoSrc}
          onComplete={handleVideoComplete}
        />
      )}

      <div
        className={cn(
          "border p-5 transition-all duration-200 bg-[#0a0a0a]",
          progress === 100
            ? "border-emerald-500/40 bg-[#07120b]"
            : isRunning
              ? "border-magenta/60 bg-[#12070f]"
              : "border-[#222222] hover:border-[#333333]",
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-white uppercase tracking-tight">
                {name}
              </h4>
              {progress === 100 ? (
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 flex items-center gap-1">
                  <CheckCircle2 size={11} /> {connectedLabel} (100%)
                </span>
              ) : isRunning ? (
                <span className="text-[10px] font-bold uppercase tracking-wider text-magenta bg-magenta/10 border border-magenta/40 px-2 py-0.5 flex items-center gap-1">
                  <Loader2 size={11} className="animate-spin" /> Koppelen ({progress}%)
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] bg-[#141414] border border-[#262626] px-2 py-0.5">
                  Niet gekoppeld
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-[#888888] font-medium mt-1">
                {description}
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            {progress === 100 ? (
              <button
                type="button"
                onClick={() => latestEmailData && onOpenEmailModal(latestEmailData)}
                className="w-full sm:w-auto border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold py-2 px-4 text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                title="Klik om de e-mailbevestiging te bekijken"
              >
                <CheckCircle2 size={13} className="text-emerald-400" /> {connectedLabel}
              </button>
            ) : (
              <button
                type="button"
                onClick={startConnection}
                disabled={isRunning}
                className="w-full sm:w-auto bg-magenta hover:bg-white hover:text-black text-white font-black py-2.5 px-5 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <Loader2 size={13} className="animate-spin" /> Bezig...
                  </>
                ) : (
                  <>
                    <Zap size={13} /> {buttonLabel || `Koppel met ${name}`}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar (0 to 100) */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[#666666]">
            <span>Koppeling Status</span>
            <span className={progress === 100 ? "text-emerald-400 font-mono" : "text-white font-mono"}>
              {progress}%
            </span>
          </div>
          <div className="w-full bg-[#161616] h-2 relative overflow-hidden">
            <div
              className={cn(
                "h-2 transition-all duration-200",
                progress === 100 ? "bg-emerald-500" : "bg-magenta",
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
