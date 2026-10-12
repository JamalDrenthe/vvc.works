import { useEffect, useRef } from "react"

interface AutoPlayVideoModalProps {
  isOpen: boolean
  videoSrc: string
  onComplete: () => void
}

/**
 * AutoPlayVideoModal
 *
 * Implements an immersive, unobstructed video popup that:
 * - Starts playing automatically upon opening
 * - Contains NO controls (no play, no pause, no close button)
 * - Contains NO progress/scrubber bar
 * - Automatically closes when the video reaches the end
 */
export function AutoPlayVideoModal({
  isOpen,
  videoSrc,
  onComplete,
}: AutoPlayVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const videoEl = videoRef.current
    if (videoEl) {
      videoEl.currentTime = 0
      const playPromise = videoEl.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay audio blocked by browser policy, trying muted:", err)
          if (videoEl) {
            videoEl.muted = true
            videoEl.play().catch((e) => {
              console.error("Autoplay muted failed:", e)
            })
          }
        })
      }
    }
  }, [isOpen, videoSrc])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-2 sm:p-6 lg:p-10 backdrop-blur-md animate-fade-in select-none"
    >
      <div className="relative w-full max-w-5xl aspect-video bg-black border border-[#222222] shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          playsInline
          controls={false}
          onEnded={onComplete}
          onError={() => {
            console.error("Video failed to play, completing connection fallback.")
            onComplete()
          }}
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>
    </div>
  )
}
