import { useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"

interface AutoPlayVideoModalProps {
  isOpen: boolean
  videoSrc: string
  onComplete: () => void
}

/**
 * AutoPlayVideoModal
 *
 * Implements a premium fullscreen vertical video popup (9:16 portrait) that:
 * - Uses React Portal to float cleanly over the page and app shell
 * - Correctly preserves 9:16 portrait aspect ratio without distortion or ugly black bars
 * - Autoplays immediately upon opening
 * - 100% MUTED (no sound across all browsers and devices)
 * - Contains NO controls (no play, no pause, no close button)
 * - Contains NO scrubber or progress bar
 * - Automatically closes when playback finishes (with safety timeout fallback)
 */
export function AutoPlayVideoModal({
  isOpen,
  videoSrc,
  onComplete,
}: AutoPlayVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const completedRef = useRef(false)

  const handleFinish = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete()
  }, [onComplete])

  // Prevent background scrolling while video modal is active
  useEffect(() => {
    if (!isOpen) return
    completedRef.current = false
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  // Autoplay video on mount (always strictly muted)
  useEffect(() => {
    if (!isOpen) return

    const videoEl = videoRef.current
    if (videoEl) {
      videoEl.defaultMuted = true
      videoEl.muted = true
      videoEl.volume = 0
      videoEl.currentTime = 0

      // Disable all audio tracks if browser supports audioTracks API
      if ("audioTracks" in videoEl && (videoEl as unknown as { audioTracks: { enabled: boolean }[] }).audioTracks) {
        const tracks = (videoEl as unknown as { audioTracks: { enabled: boolean }[] }).audioTracks
        for (let i = 0; i < tracks.length; i++) {
          tracks[i].enabled = false
        }
      }

      const playPromise = videoEl.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay muted fallback attempt:", err)
          if (videoEl) {
            videoEl.muted = true
            videoEl.play().catch((e) => {
              console.error("Autoplay completely failed:", e)
              handleFinish()
            })
          }
        })
      }
    }

    // Safety timeout: videos are 8.0s, close automatically after 9.5s if onEnded fails
    const safetyTimer = setTimeout(() => {
      handleFinish()
    }, 9500)

    return () => {
      clearTimeout(safetyTimer)
    }
  }, [isOpen, videoSrc, handleFinish])

  if (!isOpen) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none animate-fade-in"
    >
      {/* 
        The videos are 9:16 portrait (1080x1920 / 720x1280).
        Aspect ratio 9/16 locked so it fits beautifully on mobile, tablet, and desktop without stretching or black bars.
      */}
      <div className="relative h-[88vh] max-h-[860px] aspect-[9/16] max-w-[92vw] rounded-2xl overflow-hidden bg-black shadow-[0_0_50px_rgba(255,0,128,0.3)] border border-magenta/50 flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          playsInline
          muted
          preload="auto"
          controls={false}
          disablePictureInPicture
          onEnded={handleFinish}
          onError={() => {
            console.error("Video failed to play, completing connection fallback.")
            handleFinish()
          }}
          className="w-full h-full object-cover rounded-2xl pointer-events-none"
        />
      </div>
    </div>,
    document.body,
  )
}
