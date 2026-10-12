import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

interface AutoPlayVideoModalProps {
  isOpen: boolean
  videoSrc: string
  onComplete: () => void
}

/**
 * AutoPlayVideoModal
 *
 * Implements a fullscreen vertical video popup (9:16 portrait) that:
 * - Uses React Portal to cover the entire viewport (including headers)
 * - Correctly fits 9:16 portrait videos without awkward 16:9 letterbox borders
 * - Automatically plays upon opening
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

  // Prevent background scrolling while video modal is active
  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  // Autoplay video on mount (always muted)
  useEffect(() => {
    if (!isOpen) return

    const videoEl = videoRef.current
    if (videoEl) {
      videoEl.muted = true
      videoEl.volume = 0
      videoEl.currentTime = 0
      videoEl.play().catch((err) => {
        console.error("Autoplay failed:", err)
      })
    }
  }, [isOpen, videoSrc])

  if (!isOpen) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[99999] bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none animate-fade-in"
    >
      {/* 
        The videos are 9:16 portrait (1080x1920 / 720x1280).
        On mobile, they fill the screen height (100dvh).
        On desktop, they are centered with max-w-[480px].
      */}
      <div className="relative w-full h-[100dvh] max-w-[480px] flex items-center justify-center bg-black overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          playsInline
          muted
          controls={false}
          onEnded={onComplete}
          onError={() => {
            console.error("Video failed to play, completing connection fallback.")
            onComplete()
          }}
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>
    </div>,
    document.body,
  )
}
