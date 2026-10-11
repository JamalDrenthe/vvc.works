import { useState } from "react"
import {
  Play,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Volume2,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import type { Step2Data } from "./types"

interface Step2Props {
  data: Step2Data
  onChange: (updated: Partial<Step2Data>) => void
  onNext: () => void
  onPrev: () => void
}

export function Step2VvcIntro({ data, onChange, onNext, onPrev }: Step2Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [submittedQuiz, setSubmittedQuiz] = useState(data.quizPassed)

  // Quiz questions
  const isQ1Correct = data.q1Credo === "Executie is de enige waarheid"
  const isQ2Correct = data.q2Partners === "Geen bazen, alleen partners"
  const isQ3Correct = data.q3Matrix === "126 Bedrijven"

  const allQuestionsAnswered = !!(data.q1Credo && data.q2Partners && data.q3Matrix)
  const is100Percent = isQ1Correct && isQ2Correct && isQ3Correct

  const handlePlayVideo = () => {
    setIsPlaying(true)
    onChange({ videoWatched: true })
    toast.success("VVC Introductievideo gestart.")
  }

  const handleCheckQuiz = () => {
    setSubmittedQuiz(true)
    if (is100Percent) {
      onChange({ quizPassed: true })
      toast.success("Gefeliciteerd! Je hebt 100% gescoord op de VVC Kennistoets! 🏆")
    } else {
      onChange({ quizPassed: false })
      toast.error("Nog geen 100% score. Herzie je antwoorden en probeer opnieuw.")
    }
  }

  const validateAndProceed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.videoWatched) {
      toast.error("Bekijk eerst de VVC introductievideo.")
      return
    }
    if (!is100Percent) {
      toast.error("Je moet 100% scoren op de VVC vragen om door te gaan naar Kaart 3.")
      return
    }
    if (!data.hoursPerWeek) {
      toast.error("Selecteer hoeveel uur je per week beschikbaar bent.")
      return
    }
    if (!data.trajectoryDuration) {
      toast.error("Kies een gewenste trajectduur (1, 2, 3 jaar of onbepaalde tijd).")
      return
    }
    if (!data.contractType) {
      toast.error("Selecteer je gewenste samenwerkingsvorm (in dienst, zzp, partnership of franchise).")
      return
    }

    toast.success("Kaart 2 voltooid!")
    onNext()
  }

  return (
    <div className="bg-[#0a0a0a] border border-[#222222] p-6 lg:p-10 space-y-8 animate-fade-in">
      {/* ─── HEADER ─── */}
      <div className="border-b border-[#222222] pb-6">
        <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-2">
          Stap 2 — Kaart 2
        </div>
        <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
          Wat Is VVC & Bepaal Jouw Traject
        </h2>
        <p className="text-xs text-[#888888] font-medium mt-1">
          Bekijk de introductievideo, scoor 100% op het club-credo en definieer je beschikbaarheid en verdienmodel.
        </p>
      </div>

      <form onSubmit={validateAndProceed} className="space-y-8">
        {/* ─── VIDEO SECTION ─── */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
              <Play size={14} className="text-magenta" /> * Wat is VVC: Bekijk de video
            </span>
            {data.videoWatched && (
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 size={12} /> Video Bekeken
              </span>
            )}
          </div>

          <div className="relative aspect-video w-full bg-[#111111] border border-[#292929] overflow-hidden flex items-center justify-center group">
            {/* Ambient shimmer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#160d15] to-black opacity-80" />

            {isPlaying ? (
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 text-center bg-black/90">
                <div className="w-16 h-16 rounded-full bg-magenta/20 border border-magenta flex items-center justify-center text-magenta animate-pulse mb-4">
                  <Volume2 size={28} />
                </div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">
                  VVC Master Orientation — &ldquo;Geen bazen, maar partners&rdquo;
                </h4>
                <p className="text-xs text-[#888888] max-w-md mb-4">
                  De introductievideo over executiekracht, referral-hefbomen en de clubstructuur speelt af.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-magenta">03:45 / 05:20</span>
                  <div className="w-48 bg-[#222222] h-1.5 overflow-hidden">
                    <div className="bg-magenta h-1.5 w-3/4 animate-pulse" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative z-10 text-center p-6 flex flex-col items-center">
                <button
                  type="button"
                  onClick={handlePlayVideo}
                  className="w-20 h-20 bg-magenta hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-105 mb-4"
                >
                  <Play size={32} className="ml-1" />
                </button>
                <div className="text-sm font-black text-white uppercase tracking-tight">
                  Start Video: Het VVC Fundament
                </div>
                <div className="text-xs text-[#888888] mt-1">
                  Duur: 5 minuten • Verplicht onderdeel
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── QUIZ SECTION (SCOOR 100%) ─── */}
        <div className="bg-[#111111] border border-[#262626] p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#222222] pb-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta">
                Toelatingstoets
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                * Beantwoord de vragen over VVC (Scoor 100%)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-black uppercase px-3 py-1 border tracking-wider",
                  is100Percent
                    ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                    : submittedQuiz
                      ? "border-red-500 text-red-400 bg-red-500/10"
                      : "border-[#444444] text-[#888888]",
                )}
              >
                {is100Percent ? "Score: 100% (Geslaagd)" : submittedQuiz ? "Score: Onvoldoende" : "Nog Niet Ingevuld"}
              </span>
            </div>
          </div>

          {/* Vraag 1 */}
          <div className="space-y-2">
            <span className="block text-xs font-bold text-white uppercase">
              1. Wat is het centrale credo van de Verdienende Vrienden Club?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                "Praten is belangrijker dan doen",
                "Executie is de enige waarheid",
                "Kantooruren bepalen je waarde",
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onChange({ q1Credo: opt })}
                  className={cn(
                    "p-3 text-xs text-left border transition-all font-medium",
                    data.q1Credo === opt
                      ? "border-magenta bg-magenta/15 text-white ring-1 ring-magenta font-bold"
                      : "border-[#292929] bg-[#161616] text-[#888888] hover:text-white hover:border-[#444444]",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Vraag 2 */}
          <div className="space-y-2">
            <span className="block text-xs font-bold text-white uppercase">
              2. Wat typeert de samenwerking binnen het netwerk?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                "Geen bazen, alleen partners",
                "Hiërarchische managers met targets",
                "Vaste 9-tot-5 loondienstregels",
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onChange({ q2Partners: opt })}
                  className={cn(
                    "p-3 text-xs text-left border transition-all font-medium",
                    data.q2Partners === opt
                      ? "border-magenta bg-magenta/15 text-white ring-1 ring-magenta font-bold"
                      : "border-[#292929] bg-[#161616] text-[#888888] hover:text-white hover:border-[#444444]",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Vraag 3 */}
          <div className="space-y-2">
            <span className="block text-xs font-bold text-white uppercase">
              3. Hoeveel bedrijven zijn geanalyseerd in het strategische referral-onderzoek?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                "10 Bedrijven",
                "126 Bedrijven",
                "500 Bedrijven",
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onChange({ q3Matrix: opt })}
                  className={cn(
                    "p-3 text-xs text-left border transition-all font-medium",
                    data.q3Matrix === opt
                      ? "border-magenta bg-magenta/15 text-white ring-1 ring-magenta font-bold"
                      : "border-[#292929] bg-[#161616] text-[#888888] hover:text-white hover:border-[#444444]",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Valideer Score Knop */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleCheckQuiz}
              disabled={!allQuestionsAnswered}
              className="bg-white hover:bg-magenta hover:text-white text-black font-black px-6 py-2.5 text-xs uppercase tracking-widest transition-colors disabled:opacity-40"
            >
              Controleer Score (Moet 100% zijn)
            </button>
          </div>
        </div>

        {/* ─── VOORKEUREN & TRAJECT ─── */}
        <div className="space-y-6 pt-2 border-t border-[#1f1f1f]">
          <div className="text-xs font-black uppercase text-white tracking-wider">
            Doelen & Beschikbaarheid
          </div>

          {/* Passief inkomen toggle */}
          <div className="bg-[#111111] border border-[#262626] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="block text-xs font-bold text-white uppercase">
                Wil je passief inkomen opbouwen?
              </span>
              <span className="text-[10px] text-[#777777]">
                Via het sneeuwbaleffect van talenten en permanente revenue shares.
              </span>
            </div>
            <div className="flex gap-1">
              {(["Ja", "Nee"] as const).map((opt) => {
                const isJa = opt === "Ja"
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onChange({ wantsPassiveIncome: isJa })}
                    className={cn(
                      "px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors",
                      data.wantsPassiveIncome === isJa
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

          {/* Uur beschikbaar per week */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-white mb-2">
              * Hoeveel uur ben je beschikbaar per week?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["10-20 uur", "20-30 uur", "30-40 uur", "40+ uur (Fulltime)"].map((hours) => (
                <button
                  key={hours}
                  type="button"
                  onClick={() => onChange({ hoursPerWeek: hours })}
                  className={cn(
                    "p-3 text-xs font-bold uppercase tracking-wider border transition-colors text-center",
                    data.hoursPerWeek === hours
                      ? "border-magenta bg-magenta text-white"
                      : "border-[#262626] bg-[#111111] text-[#888888] hover:text-white hover:border-[#444444]",
                  )}
                >
                  {hours}
                </button>
              ))}
            </div>
          </div>

          {/* Trajectduur */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-white mb-2">
              Voor welk traject ga je?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["1 jaar", "2 jaar", "3 jaar", "onbepaalde tijd"] as const).map((duration) => (
                <button
                  key={duration}
                  type="button"
                  onClick={() => onChange({ trajectoryDuration: duration })}
                  className={cn(
                    "p-3 text-xs font-bold uppercase tracking-wider border transition-colors text-center",
                    data.trajectoryDuration === duration
                      ? "border-magenta bg-magenta text-white"
                      : "border-[#262626] bg-[#111111] text-[#888888] hover:text-white hover:border-[#444444]",
                  )}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>

          {/* Samenwerkingsvorm */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-white mb-2">
              * Wil je in dienst, zzp, partnership of franchise?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["in dienst", "zzp", "partnership", "franchise"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => onChange({ contractType: type })}
                  className={cn(
                    "p-3 text-xs font-bold uppercase tracking-wider border transition-colors text-center",
                    data.contractType === type
                      ? "border-magenta bg-magenta text-white"
                      : "border-[#262626] bg-[#111111] text-[#888888] hover:text-white hover:border-[#444444]",
                  )}
                >
                  {type}
                </button>
              ))}
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
            Voltooi Kaart 2 & Doorgaan <ChevronRight size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
