import { useState } from "react"
import {
  Sparkles,
  ChevronLeft,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  User,
  CreditCard,
  Zap,
} from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { LoadingBarConnector } from "./LoadingBarConnector"
import type {
  RegistrationData,
  Step2Data,
  Step3Data,
  Step4Data,
  EmailConfirmationData,
} from "./types"

interface Step7Props {
  registration: RegistrationData
  step2: Step2Data
  step3: Step3Data
  step4: Step4Data
  internalConnections: Record<string, boolean>
  qualityConnections: Record<string, boolean>
  userEmail: string
  onToggleConnection: (id: string, connected: boolean) => void
  onOpenEmailModal: (data: EmailConfirmationData) => void
  onNavigateToStep: (stepNumber: number) => void
  onPrev: () => void
}

export function Step7QualityControl2({
  registration,
  step2,
  step3,
  step4,
  internalConnections,
  qualityConnections,
  userEmail,
  onToggleConnection,
  onOpenEmailModal,
  onNavigateToStep,
  onPrev,
}: Step7Props) {
  const navigate = useNavigate()
  const [customPlatformName, setCustomPlatformName] = useState("VVC Custom Kwaliteit Hub")
  const [isEditingName, setIsEditingName] = useState(false)
  const [isActivated, setIsActivated] = useState(false)

  const isConnected = !!qualityConnections["quality-slot-2"]

  // Audit status checks
  const isSecurityComplete = !!(
    registration.email &&
    registration.phone &&
    registration.isEmailVerified &&
    registration.isPhoneVerified &&
    registration.twoFactorEnabled
  )
  const isAddressComplete = !!(
    registration.country &&
    registration.city &&
    registration.street &&
    registration.houseNumber &&
    registration.postalCode
  )
  const isDocumentsComplete = !!(
    (registration.idFrontDocumentName || registration.idDocumentName) &&
    registration.privacyAccepted &&
    registration.termsAccepted &&
    registration.partnerDataSharingAccepted
  )
  const isContractComplete = !!(
    step2.contractType &&
    step2.contractSigned &&
    step2.signatureName &&
    step2.incomeTermsAccepted
  )
  const isFinancialComplete = !!(step2.iban && step2.accountHolderName)
  const isEcosystemComplete = !!(step3.connected && step4.connected && isConnected)

  const missingSteps: Array<{ label: string; stepNumber: number; reason: string }> = []
  if (!isSecurityComplete) {
    missingSteps.push({
      label: "Kaart 1: Accountbeveiliging",
      stepNumber: 1,
      reason: "Verifieer e-mail/SMS en schakel tweestapsverificatie (2FA) in.",
    })
  }
  if (!isAddressComplete) {
    missingSteps.push({
      label: "Kaart 1: Adresgegevens",
      stepNumber: 1,
      reason: "Vul je postcode en volledige adresgegevens in.",
    })
  }
  if (!isDocumentsComplete) {
    missingSteps.push({
      label: "Kaart 1: Documenten & Privacy",
      stepNumber: 1,
      reason: "Upload ID-document en accepteer de privacy/voorwaarden.",
    })
  }
  if (!isContractComplete) {
    missingSteps.push({
      label: "Kaart 2: Contractuele Route",
      stepNumber: 2,
      reason: "Kies je samenwerkingsvorm en onderteken de overeenkomst digitaal.",
    })
  }
  if (!isFinancialComplete) {
    missingSteps.push({
      label: "Kaart 2: Betaalrekening (IBAN)",
      stepNumber: 2,
      reason: "Koppel je IBAN voor correcte provisie- en salarisuitbetaling.",
    })
  }
  if (!step3.connected) {
    missingSteps.push({
      label: "Kaart 3: Quantum Initium Bridge",
      stepNumber: 3,
      reason: "Koppel de Quantum Initium holding handshake.",
    })
  }
  if (!step4.connected) {
    missingSteps.push({
      label: "Kaart 4: Investbotiq Engine",
      stepNumber: 4,
      reason: "Activeer Investbotiq en de IQ Agent/Bot.",
    })
  }
  if (!isConnected) {
    missingSteps.push({
      label: "Kaart 7: Slot 2 Kwaliteitscontrole",
      stepNumber: 7,
      reason: "Koppel het laatste externe kwaliteitscontrole slot hieronder.",
    })
  }

  const handleActivateParticipant = () => {
    if (missingSteps.length > 0) {
      toast.error(`Er zijn nog ${missingSteps.length} openstaande verificatiestappen.`, {
        description: "Rond alle verplichte stappen af om definitief te activeren.",
      })
      return
    }

    setIsActivated(true)
    toast.success("🎉 Deelnemer Definitief Geactiveerd binnen VVC!", {
      description: "Jouw officiële VVC Partner Token en handelsrechten zijn live gezet.",
    })
  }

  return (
    <div className="bg-[#0a0a0a] border border-[#222222] p-6 lg:p-10 space-y-8 animate-fade-in">
      {/* ─── HEADER ─── */}
      <div className="border-b border-[#222222] pb-6">
        <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-2">
          Stap 7 — Kaart 7 (Finale Stap)
        </div>
        <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
          Definitieve Controle & Deelnemer Activatie
        </h2>
        <p className="text-xs text-[#888888] font-medium mt-1">
          Laatste kwaliteitsbridge koppelen, documenten en contractuele routes goedkeuren, en de deelnemer officieel activeren binnen VVC.
        </p>
      </div>

      <div className="space-y-6">
        {/* ─── KOPPEL SLOT 2 ─── */}
        <div className="bg-[#111111] border border-[#242424] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
                <Sparkles size={14} className="text-magenta" /> * Koppel met Kwaliteitscontrole Slot 2
              </span>
              <p className="text-xs text-[#777777] mt-0.5">
                Configureer optioneel een specifieke platformnaam of gebruik de gereserveerde VVC Kwaliteit Hub.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsEditingName(!isEditingName)}
              className="border border-[#333333] hover:border-magenta text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 transition-colors self-start sm:self-auto"
            >
              {isEditingName ? "Opslaan" : "Wijzig Naam"}
            </button>
          </div>

          {isEditingName && (
            <div className="flex gap-2 animate-fade-in">
              <input
                type="text"
                value={customPlatformName}
                onChange={(e) => setCustomPlatformName(e.target.value)}
                placeholder="Platform naam…"
                className="bg-[#181818] border border-[#333333] text-xs text-white px-3 py-2 focus:outline-none focus:border-magenta flex-1"
              />
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="bg-magenta text-white font-bold text-xs uppercase px-4 py-2"
              >
                Klaar
              </button>
            </div>
          )}

          <LoadingBarConnector
            platformId="quality-slot-2"
            name={customPlatformName}
            description="Flexibele externe kwaliteitscontrole webhook & data bridge."
            isConnected={isConnected}
            userEmail={userEmail}
            onComplete={(emailData) => {
              onToggleConnection("quality-slot-2", true)
              onOpenEmailModal(emailData)
            }}
            onOpenEmailModal={onOpenEmailModal}
          />
        </div>

        {/* ─── AUDIT COCKPIT: GEGEVENS CONTROLEREN & DOCUMENTEN GOEDKEUREN ─── */}
        <div className="bg-[#111111] border border-[#262626] p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#222222] pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta">
                Pre-Activation Audit
              </span>
              <h3 className="text-base font-black text-white uppercase tracking-tight flex items-center gap-2">
                <ShieldCheck size={18} className="text-magenta" /> Definitieve Controle Overzicht
              </h3>
            </div>
            <div className="text-xs font-mono text-[#888888]">
              Status:{" "}
              {missingSteps.length === 0 ? (
                <strong className="text-emerald-400">100% Geverifieerd & Akkoord</strong>
              ) : (
                <strong className="text-amber-400">{missingSteps.length} Actiepunt(en)</strong>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Kaart 1: Persoonlijk & Beveiliging */}
            <div className="bg-[#161616] border border-[#292929] p-4 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold uppercase text-white">
                <span className="flex items-center gap-1.5">
                  <User size={13} className="text-magenta" /> Persoon & Beveiliging
                </span>
                {isSecurityComplete && isAddressComplete ? (
                  <CheckCircle2 size={13} className="text-emerald-400" />
                ) : (
                  <AlertTriangle size={13} className="text-amber-400" />
                )}
              </div>
              <ul className="text-[11px] text-[#aaaaaa] space-y-1">
                <li>• Naam: {registration.firstName} {registration.lastName}</li>
                <li>• E-mail: {registration.isEmailVerified ? "Geverifieerd ✔" : "Niet geverifieerd ⚠️"}</li>
                <li>• Telefoon: {registration.isPhoneVerified ? "SMS OTP Geverifieerd ✔" : "Niet geverifieerd ⚠️"}</li>
                <li>• 2FA: {registration.twoFactorEnabled ? "Actief (" + registration.twoFactorMethod + ") ✔" : "Niet ingesteld"}</li>
                <li>• Adres: {registration.city || "Onbekend"} ({registration.postalCode || "Geen postcode"})</li>
              </ul>
              {(!isSecurityComplete || !isAddressComplete) && (
                <button
                  type="button"
                  onClick={() => onNavigateToStep(1)}
                  className="text-[10px] font-bold uppercase text-magenta hover:underline pt-1 block"
                >
                  Wijzig in Kaart 1 →
                </button>
              )}
            </div>

            {/* Kaart 2: Contract & Financiën */}
            <div className="bg-[#161616] border border-[#292929] p-4 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold uppercase text-white">
                <span className="flex items-center gap-1.5">
                  <CreditCard size={13} className="text-magenta" /> Overeenkomst & Financiën
                </span>
                {isContractComplete && isFinancialComplete ? (
                  <CheckCircle2 size={13} className="text-emerald-400" />
                ) : (
                  <AlertTriangle size={13} className="text-amber-400" />
                )}
              </div>
              <ul className="text-[11px] text-[#aaaaaa] space-y-1">
                <li>• Status: <strong className="text-white uppercase">{step2.contractType || "Niet gekozen"}</strong></li>
                <li>• Duur: {step2.trajectoryDuration || "Niet gekozen"}</li>
                <li>• Ondertekend: {step2.contractSigned ? `Door ${step2.signatureName} ✔` : "Niet ondertekend ⚠️"}</li>
                <li>• Betaalrekening: {step2.iban ? "IBAN Gekoppeld ✔" : "Geen IBAN ⚠️"}</li>
                <li>• Payout methode: {step2.payoutMethod.toUpperCase()}</li>
              </ul>
              {(!isContractComplete || !isFinancialComplete) && (
                <button
                  type="button"
                  onClick={() => onNavigateToStep(2)}
                  className="text-[10px] font-bold uppercase text-magenta hover:underline pt-1 block"
                >
                  Wijzig in Kaart 2 →
                </button>
              )}
            </div>

            {/* Kaart 3 t/m 7: Ecosysteem Bridges */}
            <div className="bg-[#161616] border border-[#292929] p-4 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold uppercase text-white">
                <span className="flex items-center gap-1.5">
                  <Zap size={13} className="text-magenta" /> Ecosysteem Handshakes
                </span>
                {isEcosystemComplete ? (
                  <CheckCircle2 size={13} className="text-emerald-400" />
                ) : (
                  <AlertTriangle size={13} className="text-amber-400" />
                )}
              </div>
              <ul className="text-[11px] text-[#aaaaaa] space-y-1">
                <li>• Quantum Initium: {step3.connected ? "100% Verbonden ✔" : "Niet verbonden ⚠️"}</li>
                <li>• Investbotiq Engine: {step4.connected ? "100% Verbonden ✔" : "Niet verbonden ⚠️"}</li>
                <li>• Interne Zusters: {Object.values(internalConnections).filter(Boolean).length}/10 Gekoppeld</li>
                <li>• Kwaliteitskanalen: {Object.values(qualityConnections).filter(Boolean).length}/15 Gekoppeld</li>
              </ul>
            </div>
          </div>

          {/* Ontbrekende stappen alert */}
          {missingSteps.length > 0 ? (
            <div className="bg-[#1b1207] border border-amber-500/40 p-4 space-y-2 animate-fade-in">
              <div className="text-xs font-bold uppercase text-amber-400 flex items-center gap-2">
                <AlertTriangle size={14} /> Openstaande Stappen Voor Definitieve Activatie:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {missingSteps.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-[#110c05] border border-amber-500/20 p-2.5 flex justify-between items-center gap-2"
                  >
                    <div>
                      <span className="block text-xs font-bold text-white">{m.label}</span>
                      <span className="text-[10px] text-[#888888]">{m.reason}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigateToStep(m.stepNumber)}
                      className="bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black font-bold text-[10px] uppercase px-2.5 py-1 transition-colors shrink-0 whitespace-nowrap"
                    >
                      Afhandelen →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#07130b] border border-emerald-500/40 p-4 flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                <CheckCircle2 size={16} /> Alle verificaties, contracten en ecosysteem-bridges zijn 100% goedgekeurd.
              </div>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 uppercase">
                Klaar Voor Activatie
              </span>
            </div>
          )}
        </div>

        {/* ─── ACTIVATIE KNOP & CERTIFICAAT ─── */}
        {!isActivated ? (
          <div className="bg-[#111111] border border-[#2a2a2a] p-6 text-center space-y-4">
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              Klaar Voor Definitieve Toelating Tot Het VVC Ecosysteem?
            </h3>
            <p className="text-xs text-[#888888] max-w-lg mx-auto">
              Door op onderstaande knop te klikken wordt je partnerprofiel definitief geactiveerd, worden de contractuele routes bekrachtigd en ontvang je jouw officiële VVC Partner Code.
            </p>
            <button
              type="button"
              onClick={handleActivateParticipant}
              className="bg-magenta hover:bg-white hover:text-black text-white font-black py-4 px-10 uppercase tracking-widest text-xs transition-colors shadow-2xl inline-flex items-center gap-2"
            >
              <Award size={18} /> Activeer Deelnemer Binnen VVC
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#120811] via-[#1a0c18] to-[#0a0a0a] border-2 border-magenta p-8 text-center space-y-4 animate-fade-in-up">
            <div className="w-16 h-16 mx-auto bg-magenta text-white flex items-center justify-center shadow-lg shadow-magenta/30">
              <Award size={36} />
            </div>

            <div className="inline-block border border-emerald-500 text-emerald-400 bg-emerald-500/10 text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em]">
              Officieel Geactiveerd ✔
            </div>

            <h3 className="text-3xl font-black text-white uppercase tracking-tight">
              Welkom Bij De Verdienende Vrienden Club
            </h3>

            <div className="bg-black/50 border border-magenta/40 p-3 max-w-md mx-auto text-xs font-mono text-magenta">
              VVC Partner Code: <strong>VVC-MEMBER-NL-2026-9812</strong>
            </div>

            <p className="text-sm text-[#cccccc] max-w-xl mx-auto leading-relaxed">
              Gefeliciteerd <strong>{registration.firstName} {registration.lastName}</strong>! Jouw onboarding is 100% succesvol voltooid.
              Je contract voor <strong>{step2.contractType?.toUpperCase()}</strong> is geactiveerd, je betaalrekening is gekoppeld en alle 27 platformbridges draaien in realtime.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="bg-white hover:bg-magenta hover:text-white text-black font-black py-4 px-10 uppercase tracking-widest text-xs transition-colors shadow-2xl flex items-center justify-center gap-2 group"
              >
                Naar Controlecentrum (Dashboard) <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/onboarding/companies")}
                className="border border-[#444444] hover:border-white text-white font-bold py-4 px-8 uppercase tracking-widest text-xs transition-colors"
              >
                Verken De 126 Bedrijven
              </button>
            </div>
          </div>
        )}

        {/* ─── NAVIGATIE KNOPPEN ─── */}
        <div className="pt-6 border-t border-[#222222] flex justify-between items-center">
          <button
            type="button"
            onClick={onPrev}
            className="border border-[#333333] hover:border-white text-white font-bold py-3.5 px-6 uppercase tracking-widest text-xs transition-colors flex items-center gap-2"
          >
            <ChevronLeft size={16} /> Vorige Kaart
          </button>
        </div>
      </div>
    </div>
  )
}
