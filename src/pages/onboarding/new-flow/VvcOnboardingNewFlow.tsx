import { useState } from "react"
import { useNavigate } from "react-router"
import {
  CheckCircle2,
  RotateCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

// Sub-components
import { Step1Registration } from "./Step1Registration"
import { Step2VvcIntro } from "./Step2VvcIntro"
import { Step3QuantumInitium } from "./Step3QuantumInitium"
import { Step4Investbotiq } from "./Step4Investbotiq"
import { Step5InternalEcosystem } from "./Step5InternalEcosystem"
import { Step6QualityControl1 } from "./Step6QualityControl1"
import { Step7QualityControl2 } from "./Step7QualityControl2"
import { EmailConfirmationModal } from "./EmailConfirmationModal"

// Types
import type {
  RegistrationData,
  Step2Data,
  Step3Data,
  Step4Data,
  EmailConfirmationData,
} from "./types"

const INITIAL_REGISTRATION: RegistrationData = {
  crmosCode: "",
  isCrmosFetched: false,
  gender: "",
  firstName: "Voornaam",
  lastName: "Achternaam",
  email: "voorbeeld@vvc.works",
  phone: "",
  city: "",
  street: "",
  houseNumber: "",
  birthDate: "",
  cvFileName: "",
  motivationLetter: "",
  avatarUrl: "",
  idDocumentName: "",
  idFrontDocumentName: "",
  idBackDocumentName: "",
  referralCode: "VVC-PARTNER-VIP",
  hasKvk: false,
  kvkNumber: "",
  btwNumber: "",
  hasLtd: false,
}

const INITIAL_STEP2: Step2Data = {
  videoWatched: false,
  q1Credo: "",
  q2Partners: "",
  q3Matrix: "",
  quizPassed: false,
  wantsPassiveIncome: true,
  hoursPerWeek: "20-30 uur",
  trajectoryDuration: "2 jaar",
  contractType: "partnership",
}

const INITIAL_STEP3: Step3Data = {
  videoWatched: false,
  pdfRead: false,
  enteredEcosystem: false,
  wantsShares: true,
  q1Quantum: "",
  connected: false,
  progress: 0,
}

const INITIAL_STEP4: Step4Data = {
  videoWatched: false,
  pdfRead: false,
  q1Investbotiq: "",
  connected: false,
  progress: 0,
  iqAgentActive: false,
  iqBotActive: false,
}

const STEPS = [
  { id: 1, label: "Kaart 1", title: "Registratie Compleet" },
  { id: 2, label: "Kaart 2", title: "Wat is VVC" },
  { id: 3, label: "Kaart 3", title: "QI (Quantum Initium)" },
  { id: 4, label: "Kaart 4", title: "IQ (Investbotiq)" },
  { id: 5, label: "Kaart 5", title: "Intern Ecosysteem" },
  { id: 6, label: "Kaart 6", title: "Kwaliteitscontrole 1" },
  { id: 7, label: "Kaart 7", title: "Kwaliteitscontrole 2" },
]

export function VvcOnboardingNewFlow() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [activeStep, setActiveStep] = useState(1)
  const [emailModalData, setEmailModalData] = useState<EmailConfirmationData | null>(null)

  // Helper to normalize demo/default names & emails
  const normalizeRegistrationData = (u: typeof user) => {
    let email = u?.email || ""
    let firstName = u?.fullName ? u.fullName.split(" ")[0] : ""
    let lastName = u?.fullName ? u.fullName.split(" ").slice(1).join(" ") : ""

    if (!email || email.toLowerCase() === "ceo@vvc.nl") {
      email = "voorbeeld@vvc.works"
    }
    if (!firstName || firstName === "CEO") {
      firstName = "Voornaam"
    }
    if (!lastName || lastName === "Account") {
      lastName = "Achternaam"
    }

    return { email, firstName, lastName }
  }

  // Form State
  const [registration, setRegistration] = useState<RegistrationData>(() => {
    const { email, firstName, lastName } = normalizeRegistrationData(user)
    return {
      ...INITIAL_REGISTRATION,
      email,
      firstName,
      lastName,
    }
  })

  const [step2, setStep2] = useState<Step2Data>(INITIAL_STEP2)
  const [step3, setStep3] = useState<Step3Data>(INITIAL_STEP3)
  const [step4, setStep4] = useState<Step4Data>(INITIAL_STEP4)
  const [internalConnections, setInternalConnections] = useState<Record<string, boolean>>({})
  const [qualityConnections, setQualityConnections] = useState<Record<string, boolean>>({})

  const userEmail = registration.email || user?.email || "voorbeeld@vvc.works"

  const handleUpdateRegistration = (updated: Partial<RegistrationData>) => {
    setRegistration((prev) => ({ ...prev, ...updated }))
  }

  const handleToggleInternalConnection = (id: string, connected: boolean) => {
    setInternalConnections((prev) => ({ ...prev, [id]: connected }))
  }

  const handleToggleQualityConnection = (id: string, connected: boolean) => {
    setQualityConnections((prev) => ({ ...prev, [id]: connected }))
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in pb-12">
      {/* ─── FLOW SWITCHER BANNER ─── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0d0d0d] border border-[#222222] p-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta block mb-0.5">
            Onboarding Flow Selectie
          </span>
          <h1 className="text-base font-black text-white uppercase tracking-tight">
            VVC Onboarding New Flow
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-magenta text-white text-xs font-black uppercase tracking-wider">
            ★ New Flow (Actief)
          </span>
          <button
            type="button"
            onClick={() => navigate("/onboarding/old-flow")}
            className="px-3 py-1.5 border border-[#333333] hover:border-white text-[#888888] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <RotateCcw size={12} /> Old Flow
          </button>
        </div>
      </div>

      {/* ─── STEP PROGRESS STEPPER (7 KAARTEN) ─── */}
      <div className="bg-[#0a0a0a] border border-[#222222] p-4 lg:p-6 space-y-4">
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
          <span className="text-white">
            Voortgang: <strong className="text-magenta">Stap {activeStep}</strong> van 7
          </span>
          <span className="text-[#888888] font-mono">
            {Math.round(((activeStep - 1) / 7) * 100)}% Gereed
          </span>
        </div>

        {/* Horizontal scrollable stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {STEPS.map((s) => {
            const isActive = activeStep === s.id
            const isCompleted = activeStep > s.id

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveStep(s.id)}
                className={cn(
                  "p-2.5 text-left border transition-all text-xs",
                  isActive
                    ? "border-magenta bg-magenta/15 text-white ring-1 ring-magenta"
                    : isCompleted
                      ? "border-emerald-500/40 bg-[#07130b] text-white"
                      : "border-[#222222] bg-[#111111] text-[#777777] hover:border-[#333333]",
                )}
              >
                <div className="flex justify-between items-center text-[10px] font-mono font-bold mb-1">
                  <span>{s.label}</span>
                  {isCompleted ? (
                    <CheckCircle2 size={11} className="text-emerald-400" />
                  ) : isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-magenta animate-pulse" />
                  ) : null}
                </div>
                <div className="text-[11px] font-bold truncate leading-tight">
                  {s.title}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── ACTIEVE KAART WEERGAVE ─── */}
      {activeStep === 1 && (
        <Step1Registration
          data={registration}
          onChange={handleUpdateRegistration}
          onNext={() => setActiveStep(2)}
        />
      )}

      {activeStep === 2 && (
        <Step2VvcIntro
          data={step2}
          onChange={(up) => setStep2((prev) => ({ ...prev, ...up }))}
          onNext={() => setActiveStep(3)}
          onPrev={() => setActiveStep(1)}
        />
      )}

      {activeStep === 3 && (
        <Step3QuantumInitium
          data={step3}
          userEmail={userEmail}
          onChange={(up) => setStep3((prev) => ({ ...prev, ...up }))}
          onOpenEmailModal={(modalData) => setEmailModalData(modalData)}
          onNext={() => setActiveStep(4)}
          onPrev={() => setActiveStep(2)}
        />
      )}

      {activeStep === 4 && (
        <Step4Investbotiq
          data={step4}
          userEmail={userEmail}
          onChange={(up) => setStep4((prev) => ({ ...prev, ...up }))}
          onOpenEmailModal={(modalData) => setEmailModalData(modalData)}
          onNext={() => setActiveStep(5)}
          onPrev={() => setActiveStep(3)}
        />
      )}

      {activeStep === 5 && (
        <Step5InternalEcosystem
          connections={internalConnections}
          userEmail={userEmail}
          onToggleConnection={handleToggleInternalConnection}
          onOpenEmailModal={(modalData) => setEmailModalData(modalData)}
          onNext={() => setActiveStep(6)}
          onPrev={() => setActiveStep(4)}
        />
      )}

      {activeStep === 6 && (
        <Step6QualityControl1
          connections={qualityConnections}
          userEmail={userEmail}
          onToggleConnection={handleToggleQualityConnection}
          onOpenEmailModal={(modalData) => setEmailModalData(modalData)}
          onNext={() => setActiveStep(7)}
          onPrev={() => setActiveStep(5)}
        />
      )}

      {activeStep === 7 && (
        <Step7QualityControl2
          connections={qualityConnections}
          userEmail={userEmail}
          onToggleConnection={handleToggleQualityConnection}
          onOpenEmailModal={(modalData) => setEmailModalData(modalData)}
          onPrev={() => setActiveStep(6)}
        />
      )}

      {/* ─── EMAIL CONFIRMATION MODAL ─── */}
      <EmailConfirmationModal
        data={emailModalData}
        onClose={() => setEmailModalData(null)}
      />
    </div>
  )
}
