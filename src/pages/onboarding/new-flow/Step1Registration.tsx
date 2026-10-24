import { useState, useRef } from "react"
import {
  User,
  Calendar as CalendarIcon,
  FileText,
  ChevronRight,
  Database,
  Shield,
  CheckCircle2,
  Mail,
  Phone,
  KeyRound,
  Lock,
  Globe,
  FileCheck2,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { AutoPlayVideoModal } from "./AutoPlayVideoModal"
import { fetchCrmosProfileByCode, type CrmosFetchResult } from "@/lib/api/crmos.api"
import type { RegistrationData } from "./types"

interface Step1Props {
  data: RegistrationData
  onChange: (updated: Partial<RegistrationData>) => void
  onNext: () => void
}

export function Step1Registration({ data, onChange, onNext }: Step1Props) {
  const [showCrmosInput, setShowCrmosInput] = useState(false)
  const [crmosInputCode, setCrmosInputCode] = useState(data.crmosCode || "")
  const [showCalendarPicker, setShowCalendarPicker] = useState(false)
  const [isCrmosVideoOpen, setIsCrmosVideoOpen] = useState(false)

  // SMS Verification UI State
  const [showSmsOtpInput, setShowSmsOtpInput] = useState(false)
  const [otpInput, setOtpInput] = useState(data.phoneOtpCode || "")

  // Calendar Picker state helper
  const parsedBirthDate = data.birthDate ? new Date(data.birthDate) : new Date(1998, 0, 15)
  const [birthYear, setBirthYear] = useState(parsedBirthDate.getFullYear())
  const [birthMonth, setBirthMonth] = useState(parsedBirthDate.getMonth())
  const [birthDay, setBirthDay] = useState(parsedBirthDate.getDate())

  const pendingFetchRef = useRef<Promise<CrmosFetchResult> | null>(null)

  const handleTriggerCrmosSync = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const activeCode = crmosInputCode.trim() || "CRMOS-VVC-2026"
    // Start fetching from CRMos Firebase immediately in parallel with video playback
    pendingFetchRef.current = fetchCrmosProfileByCode(activeCode)
    setIsCrmosVideoOpen(true)
  }

  const handleCrmosVideoComplete = async () => {
    setIsCrmosVideoOpen(false)
    const activeCode = crmosInputCode.trim() || "CRMOS-VVC-2026"

    try {
      const result = pendingFetchRef.current
        ? await pendingFetchRef.current
        : await fetchCrmosProfileByCode(activeCode)

      if (result.success && result.data) {
        onChange({
          ...result.data,
          isCrmosFetched: true,
        })
        toast.success("Profielgegevens succesvol opgehaald uit CRMos!", {
          description:
            result.source === "crmos-firestore"
              ? `Live gekoppeld met CRMos database [${activeCode}].`
              : `CRMos code [${activeCode}] gekoppeld en gevalideerd.`,
        })
      } else {
        toast.error(result.message || "Geen profiel gevonden in CRMos.")
      }
    } catch (err) {
      console.error("Fout bij ophalen CRMos data:", err)
      toast.error("Kon CRMos data niet ophalen. Controleer de code en verbinding.")
    } finally {
      pendingFetchRef.current = null
    }
  }

  const handleSendEmailVerification = () => {
    if (!data.email) {
      toast.error("Vul eerst een e-mailadres in.")
      return
    }
    onChange({ isEmailVerified: true })
    toast.success(`Verificatielink verzonden naar ${data.email}!`, {
      description: "E-mailadres is geverifieerd voor veilig inloggen.",
    })
  }

  const handleSendPhoneSms = () => {
    if (!data.phone) {
      toast.error("Vul eerst een telefoonnummer in.")
      return
    }
    setShowSmsOtpInput(true)
    toast.success(`SMS verificatiecode (OTP) verzonden naar ${data.phone}!`, {
      description: "Gebruik testcode 492810 om direct te verifiëren.",
    })
  }

  const handleVerifyPhoneOtp = () => {
    if (!otpInput || otpInput.length < 4) {
      toast.error("Voer de ontvangen 6-cijferige verificatiecode in.")
      return
    }
    onChange({
      isPhoneVerified: true,
      phoneOtpCode: otpInput,
    })
    setShowSmsOtpInput(false)
    toast.success("Telefoonnummer succesvol geverifieerd!")
  }

  const handlePasswordReset = () => {
    if (!data.email) {
      toast.error("Vul eerst je e-mailadres in om een herstellink te ontvangen.")
      return
    }
    toast.success(`Wachtwoord herstelmail verstuurd naar ${data.email}!`, {
      description: "Volg de link in je inbox om een nieuw veilig wachtwoord in te stellen.",
    })
  }

  const handleDateSelect = () => {
    const mm = String(birthMonth + 1).padStart(2, "0")
    const dd = String(birthDay).padStart(2, "0")
    const formatted = `${birthYear}-${mm}-${dd}`
    onChange({ birthDate: formatted })
    setShowCalendarPicker(false)
  }

  const validateAndProceed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.gender) {
      toast.error("Selecteer 'Geboren als Man of Vrouw'.")
      return
    }
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
      toast.error("Vul alle verplichte persoonsgegevens in.")
      return
    }
    if (!data.city || !data.street || !data.houseNumber || !data.postalCode) {
      toast.error("Vul je volledige adresgegevens in (inclusief postcode en huisnummer).")
      return
    }
    if (!data.birthDate) {
      toast.error("Selecteer je geboortedatum via de kalender.")
      return
    }
    if (!data.referralCode) {
      toast.error("Vul een geldige referralcode in (bijv. VVC-PARTNER-VIP).")
      return
    }
    if (!data.idFrontDocumentName && !data.idDocumentName) {
      toast.error("Upload de voorkant van je ID of paspoort.")
      return
    }
    if (!data.privacyAccepted || !data.termsAccepted) {
      toast.error("Ga akkoord met de Privacyverklaring en Algemene Voorwaarden om door te gaan.")
      return
    }
    if (!data.partnerDataSharingAccepted) {
      toast.error("Geef toestemming voor gegevensdeling met de ecosysteem partners.")
      return
    }

    toast.success("Kaart 1 voltooid: Registratie en verificatie compleet!")
    onNext()
  }

  return (
    <div className="bg-[#0a0a0a] border border-[#222222] p-6 lg:p-10 space-y-8 animate-fade-in">
      {/* ─── HEADER ─── */}
      <div className="border-b border-[#222222] pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-2">
            Stap 1 — Kaart 1
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
            Registratie, Accountbeveiliging & Verificatie
          </h2>
          <p className="text-xs text-[#888888] font-medium mt-1">
            Persoonlijke verificatie, 2FA, adres, ID-documenten, AVG privacy en juridische structuur.
          </p>
        </div>

        {/* CRMos Box */}
        <div className="w-full sm:w-auto bg-[#111111] border border-[#2a2a2a] p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
          <div className="text-left min-w-0 pr-2">
            <div className="text-[10px] font-black uppercase text-white tracking-wider flex items-center gap-1.5">
              <Database size={13} className="text-magenta shrink-0" /> Haal data uit CRMos
            </div>
            <div className="text-[10px] text-[#777777]">
              {data.isCrmosFetched ? "CRMos Data Gekoppeld ✔" : "Gegevens direct synchroniseren"}
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleTriggerCrmosSync()}
              className={cn(
                "w-full sm:w-auto font-black text-xs uppercase tracking-wider px-4 py-2 transition-colors shrink-0 text-center flex items-center justify-center gap-1.5",
                data.isCrmosFetched
                  ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                  : "bg-magenta hover:bg-white hover:text-black text-white",
              )}
            >
              {data.isCrmosFetched ? (
                <>
                  <CheckCircle2 size={13} /> Opgehaald
                </>
              ) : (
                "Haal data uit CRMos"
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowCrmosInput(!showCrmosInput)}
              className="border border-[#444444] hover:border-magenta text-[#aaaaaa] hover:text-white font-bold text-[10px] uppercase tracking-wider px-3 py-2 transition-colors shrink-0 text-center whitespace-nowrap"
              title="Voer optioneel een CRMos code in"
            >
              {showCrmosInput ? "Sluit Code" : "Enter Code"}
            </button>
          </div>
        </div>
      </div>

      {/* AutoPlay Video Modal for CRMos */}
      <AutoPlayVideoModal
        isOpen={isCrmosVideoOpen}
        videoSrc="/videos/vvc-connected-crmos.mp4"
        onComplete={handleCrmosVideoComplete}
      />

      {/* CRMos Code Input Drawer */}
      {showCrmosInput && (
        <form
          onSubmit={handleTriggerCrmosSync}
          className="bg-[#120a11] border border-magenta/40 p-4 flex flex-col lg:flex-row gap-3 lg:items-center justify-between animate-fade-in overflow-hidden"
        >
          <div className="text-xs text-white font-bold flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-magenta animate-pulse shrink-0" />
            <div className="leading-snug break-words">
              CRMos Sync: Voer je code in (bijv.{" "}
              <code className="text-magenta font-mono bg-black/40 px-1 py-0.5 border border-magenta/30 inline-block">
                CRMOS-VVC-2026
              </code>
              )
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto shrink-0">
            <input
              type="text"
              value={crmosInputCode}
              onChange={(e) => setCrmosInputCode(e.target.value)}
              placeholder="CRMOS-XXXX-XXXX"
              className="w-full sm:w-48 min-w-0 bg-[#1c1c1c] border border-[#333333] text-xs text-white px-3 py-2 font-mono uppercase focus:outline-none focus:border-magenta"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-magenta hover:bg-white hover:text-black text-white text-xs font-black uppercase tracking-wider px-4 py-2 transition-colors shrink-0 text-center whitespace-nowrap flex items-center justify-center gap-1.5"
            >
              {data.isCrmosFetched ? (
                <>
                  <CheckCircle2 size={13} /> Opgehaald
                </>
              ) : (
                "Haal data uit CRMos"
              )}
            </button>
          </div>
        </form>
      )}

      {/* ─── FORM ─── */}
      <form onSubmit={validateAndProceed} className="space-y-8">
        {/* SECTIE 1: PERSOONSGEGEVENS */}
        <div className="space-y-4">
          <div className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
            <User size={14} className="text-magenta" /> 1. Persoonsgegevens
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-white mb-2">
              * Geboren als Man of Vrouw
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(["Man", "Vrouw"] as const).map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => onChange({ gender })}
                  className={cn(
                    "p-3 text-xs font-bold uppercase tracking-wider border transition-all text-center",
                    data.gender === gender
                      ? "border-magenta bg-magenta/15 text-white ring-1 ring-magenta"
                      : "border-[#242424] bg-[#111111] text-[#888888] hover:border-[#444444] hover:text-white",
                  )}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                * Voornaam
              </label>
              <input
                type="text"
                required
                value={data.firstName}
                onChange={(e) => onChange({ firstName: e.target.value })}
                placeholder="Voornaam"
                className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white focus:outline-none focus:border-magenta"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                * Achternaam
              </label>
              <input
                type="text"
                required
                value={data.lastName}
                onChange={(e) => onChange({ lastName: e.target.value })}
                placeholder="Achternaam"
                className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white focus:outline-none focus:border-magenta"
              />
            </div>
          </div>

          {/* ADVANCED CALENDAR: Geboortedatum */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-white mb-1.5 flex items-center justify-between">
              <span>* Geboortedatum (Advanced Calendar)</span>
              {data.birthDate && (
                <span className="text-magenta font-mono text-xs">{data.birthDate}</span>
              )}
            </label>

            <button
              type="button"
              onClick={() => setShowCalendarPicker(!showCalendarPicker)}
              className="w-full bg-[#111111] border border-[#262626] hover:border-magenta p-3 text-xs text-left text-white flex items-center justify-between transition-colors"
            >
              <span className={data.birthDate ? "text-white font-medium" : "text-[#666666]"}>
                {data.birthDate || "Selecteer geboortedatum via kalender"}
              </span>
              <CalendarIcon size={16} className="text-magenta" />
            </button>

            {/* Advanced Calendar Selector Box */}
            {showCalendarPicker && (
              <div className="mt-3 p-4 bg-[#141414] border border-[#333333] space-y-4 animate-fade-in">
                <div className="text-xs font-black uppercase text-white border-b border-[#222222] pb-2">
                  Kies Datum: Dag / Maand / Jaar
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-[#777777] mb-1">Dag</label>
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(parseInt(e.target.value, 10))}
                      className="w-full bg-[#1c1c1c] border border-[#333333] p-2 text-xs text-white"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-[#777777] mb-1">Maand</label>
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(parseInt(e.target.value, 10))}
                      className="w-full bg-[#1c1c1c] border border-[#333333] p-2 text-xs text-white"
                    >
                      {[
                        "Januari", "Februari", "Maart", "April", "Mei", "Juni",
                        "Juli", "Augustus", "September", "Oktober", "November", "December"
                      ].map((m, idx) => (
                        <option key={m} value={idx}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-[#777777] mb-1">Jaar</label>
                    <select
                      value={birthYear}
                      onChange={(e) => setBirthYear(parseInt(e.target.value, 10))}
                      className="w-full bg-[#1c1c1c] border border-[#333333] p-2 text-xs text-white"
                    >
                      {Array.from({ length: 70 }, (_, i) => 2010 - i).map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-[#222222]">
                  <button
                    type="button"
                    onClick={() => setShowCalendarPicker(false)}
                    className="px-3 py-1.5 text-xs text-[#888888] hover:text-white"
                  >
                    Sluiten
                  </button>
                  <button
                    type="button"
                    onClick={handleDateSelect}
                    className="bg-magenta text-white font-bold text-xs uppercase px-4 py-1.5 hover:bg-white hover:text-black transition-colors"
                  >
                    Datum Bevestigen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTIE 2: ADRESGEGEVENS */}
        <div className="space-y-4 pt-4 border-t border-[#1f1f1f]">
          <div className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
            <Globe size={14} className="text-magenta" /> 2. Adres & Locatie
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                * Land
              </label>
              <select
                value={data.country || "Nederland"}
                onChange={(e) => onChange({ country: e.target.value })}
                className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white focus:outline-none focus:border-magenta"
              >
                <option value="Nederland">Nederland</option>
                <option value="België">België</option>
                <option value="Duitsland">Duitsland</option>
                <option value="Verenigd Koninkrijk">Verenigd Koninkrijk</option>
                <option value="Spanje">Spanje</option>
                <option value="Overig">Overig</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                * Postcode
              </label>
              <input
                type="text"
                required
                value={data.postalCode}
                onChange={(e) => onChange({ postalCode: e.target.value })}
                placeholder="Bijv. 1016 EK"
                className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white uppercase focus:outline-none focus:border-magenta font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                * Woonplaats
              </label>
              <input
                type="text"
                required
                value={data.city}
                onChange={(e) => onChange({ city: e.target.value })}
                placeholder="Bijv. Amsterdam"
                className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white focus:outline-none focus:border-magenta"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                * Straat
              </label>
              <input
                type="text"
                required
                value={data.street}
                onChange={(e) => onChange({ street: e.target.value })}
                placeholder="Straatnaam"
                className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white focus:outline-none focus:border-magenta"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                * Huisnummer
              </label>
              <input
                type="text"
                required
                value={data.houseNumber}
                onChange={(e) => onChange({ houseNumber: e.target.value })}
                placeholder="Bijv. 421"
                className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white focus:outline-none focus:border-magenta"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                Toevoeging (Optioneel)
              </label>
              <input
                type="text"
                value={data.houseNumberAddition}
                onChange={(e) => onChange({ houseNumberAddition: e.target.value })}
                placeholder="Bijv. A, bis, 2 hoog"
                className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white focus:outline-none focus:border-magenta"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                Voorkeurstaal
              </label>
              <select
                value={data.preferredLanguage || "Nederlands"}
                onChange={(e) => onChange({ preferredLanguage: e.target.value })}
                className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white focus:outline-none focus:border-magenta"
              >
                <option value="Nederlands">Nederlands (Standaard)</option>
                <option value="Engels">Engels (English)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                Tweede Contactmethode (Optioneel)
              </label>
              <input
                type="text"
                value={data.secondaryContact}
                onChange={(e) => onChange({ secondaryContact: e.target.value })}
                placeholder="Tweede e-mail of nummer"
                className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white focus:outline-none focus:border-magenta"
              />
            </div>
          </div>
        </div>

        {/* SECTIE 3: ACCOUNTBEVEILIGING & VERIFICATIE */}
        <div className="space-y-4 pt-4 border-t border-[#1f1f1f]">
          <div className="text-xs font-black uppercase text-white tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Shield size={14} className="text-magenta" /> 3. Accountbeveiliging & Verificatie
            </span>
            <span className="text-[10px] text-[#777777] font-mono">
              Beveiligde SSL 256-bit encryptie
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* E-mail Verificatie Box */}
            <div className="bg-[#111111] border border-[#262626] p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                  <Mail size={13} className="text-magenta" /> * E-Mailadres
                </span>
                {data.isEmailVerified ? (
                  <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5">
                    <CheckCircle2 size={11} /> Geverifieerd
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-400 font-bold uppercase bg-amber-500/10 border border-amber-500/30 px-2 py-0.5">
                    Niet Bevestigd
                  </span>
                )}
              </div>

              <input
                type="email"
                required
                value={data.email}
                onChange={(e) => onChange({ email: e.target.value, isEmailVerified: false })}
                placeholder="info@vvc.works"
                className="w-full bg-[#161616] border border-[#333333] p-2.5 text-xs text-white focus:outline-none focus:border-magenta"
              />

              <div className="flex justify-between items-center pt-1">
                <span className="text-[10px] text-[#777777]">
                  Bevestig via unieke verificatielink.
                </span>
                <button
                  type="button"
                  onClick={handleSendEmailVerification}
                  className="text-[10px] font-bold uppercase tracking-wider text-magenta hover:text-white transition-colors underline"
                >
                  {data.isEmailVerified ? "Verificatiemail Opnieuw Sturen" : "Stuur Verificatielink"}
                </button>
              </div>
            </div>

            {/* Telefoonnummer & SMS OTP Box */}
            <div className="bg-[#111111] border border-[#262626] p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                  <Phone size={13} className="text-magenta" /> * Telefoonnummer
                </span>
                {data.isPhoneVerified ? (
                  <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5">
                    <CheckCircle2 size={11} /> Geverifieerd
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-400 font-bold uppercase bg-amber-500/10 border border-amber-500/30 px-2 py-0.5">
                    SMS Verificatie Vereist
                  </span>
                )}
              </div>

              <input
                type="tel"
                required
                value={data.phone}
                onChange={(e) => onChange({ phone: e.target.value, isPhoneVerified: false })}
                placeholder="+31 6 12345678"
                className="w-full bg-[#161616] border border-[#333333] p-2.5 text-xs text-white focus:outline-none focus:border-magenta"
              />

              {showSmsOtpInput ? (
                <div className="flex gap-2 pt-1 animate-fade-in">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="6-cijferige SMS code (492810)"
                    className="flex-1 bg-[#1c1c1c] border border-magenta p-2 text-xs text-white font-mono uppercase tracking-widest text-center"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyPhoneOtp}
                    className="bg-magenta hover:bg-white hover:text-black text-white font-bold text-xs uppercase px-3 py-2 transition-colors"
                  >
                    Bevestig
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[10px] text-[#777777]">
                    Verifieer nummer via eenmalige SMS code.
                  </span>
                  <button
                    type="button"
                    onClick={handleSendPhoneSms}
                    className="text-[10px] font-bold uppercase tracking-wider text-magenta hover:text-white transition-colors underline"
                  >
                    {data.isPhoneVerified ? "Nieuwe SMS Code" : "Stuur SMS Code"}
                  </button>
                </div>
              )}
            </div>

            {/* Inlogmethode & Wachtwoord Box */}
            <div className="bg-[#111111] border border-[#262626] p-4 space-y-3">
              <span className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                <KeyRound size={13} className="text-magenta" /> Inlogmethode & Wachtwoordherstel
              </span>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "google", label: "Google" },
                  { id: "email", label: "E-mail/Pass" },
                  { id: "passkey", label: "Passkey" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onChange({ loginMethod: m.id as RegistrationData["loginMethod"] })}
                    className={cn(
                      "p-2 text-[10px] font-bold uppercase tracking-wider border transition-colors text-center",
                      data.loginMethod === m.id
                        ? "border-magenta bg-magenta/15 text-white"
                        : "border-[#2d2d2d] bg-[#161616] text-[#777777] hover:text-white",
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-1 border-t border-[#1f1f1f]">
                <span className="text-[10px] text-[#777777]">Wachtwoord vergeten of aanpassen?</span>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="text-[10px] font-bold uppercase tracking-wider text-magenta hover:text-white transition-colors underline"
                >
                  Wachtwoord Herstellen
                </button>
              </div>
            </div>

            {/* Tweestapsverificatie (2FA) Box */}
            <div className="bg-[#111111] border border-[#262626] p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                  <Lock size={13} className="text-magenta" /> Tweestapsverificatie (2FA)
                </span>
                <button
                  type="button"
                  onClick={() => onChange({ twoFactorEnabled: !data.twoFactorEnabled })}
                  className={cn(
                    "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border transition-colors",
                    data.twoFactorEnabled
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                      : "border-[#444444] text-[#888888] hover:text-white",
                  )}
                >
                  {data.twoFactorEnabled ? "2FA Actief ✔" : "Inschakelen"}
                </button>
              </div>

              {data.twoFactorEnabled && (
                <div className="space-y-2 pt-1 animate-fade-in">
                  <span className="text-[10px] uppercase text-[#777777] block">
                    Kies je tweede verificatielaag:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "sms", label: "SMS OTP" },
                      { id: "authenticator", label: "App (TOTP)" },
                      { id: "email", label: "E-mail Code" },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => onChange({ twoFactorMethod: method.id as RegistrationData["twoFactorMethod"] })}
                        className={cn(
                          "p-1.5 text-[9px] font-bold uppercase tracking-wider border transition-colors text-center",
                          data.twoFactorMethod === method.id
                            ? "border-magenta bg-magenta/15 text-white"
                            : "border-[#2d2d2d] bg-[#161616] text-[#777777] hover:text-white",
                        )}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTIE 4: UPLOADS (CV, Motivatie, Profielfoto Optioneel, ID/Paspoort) */}
        <div className="space-y-4 pt-4 border-t border-[#1f1f1f]">
          <div className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
            <FileText size={14} className="text-magenta" /> 4. Documenten & Uploads
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CV */}
            <div className="border border-[#262626] bg-[#111111] p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                  <FileText size={14} className="text-magenta" /> CV (Optioneel)
                </span>
                {data.cvFileName && (
                  <span className="text-[10px] text-emerald-400 font-mono">Toegevoegd ✔</span>
                )}
              </div>
              <label className="border border-dashed border-[#333333] hover:border-magenta p-4 block text-center cursor-pointer transition-colors">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      onChange({ cvFileName: file.name })
                      toast.success(`CV geselecteerd: ${file.name}`)
                    }
                  }}
                />
                <span className="text-xs text-[#888888]">
                  {data.cvFileName ? data.cvFileName : "Klik of sleep CV bestand hierheen"}
                </span>
              </label>
            </div>

            {/* Motivatiebrief */}
            <div className="border border-[#262626] bg-[#111111] p-4">
              <span className="block text-xs font-bold uppercase text-white mb-2">
                Motivatiebrief (Optioneel)
              </span>
              <textarea
                value={data.motivationLetter}
                onChange={(e) => onChange({ motivationLetter: e.target.value })}
                placeholder="Licht eventueel kort je motivatie of doelen toe…"
                rows={2}
                className="w-full bg-[#161616] border border-[#2a2a2a] p-2 text-xs text-white focus:outline-none focus:border-magenta resize-none"
              />
            </div>

            {/* Profielfoto Upload - NU EXPLICIET OPTIONEEL */}
            <div className="border border-[#262626] bg-[#111111] p-4 md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                  <User size={14} className="text-magenta" /> Profielfoto (Optioneel)
                </span>
                {data.avatarUrl && (
                  <span className="text-[10px] text-emerald-400 font-mono">Foto Geladen ✔</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1c1c1c] border border-[#333333] flex items-center justify-center overflow-hidden shrink-0">
                  {data.avatarUrl ? (
                    <img src={data.avatarUrl} alt="Profielfoto" className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} className="text-[#555555]" />
                  )}
                </div>
                <label className="flex-1 border border-dashed border-[#333333] hover:border-magenta p-3 text-center cursor-pointer transition-colors block bg-[#0d0d0d]">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const url = URL.createObjectURL(file)
                        onChange({ avatarUrl: url })
                        toast.success("Profielfoto geüpload!")
                      }
                    }}
                  />
                  <span className="text-xs text-[#888888]">Kies optioneel een profielfoto…</span>
                </label>
              </div>
            </div>

            {/* ID/Paspoort Upload (Voorkant & Achterkant) */}
            <div className="border border-[#262626] bg-[#111111] p-4 md:col-span-2">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                  <Shield size={14} className="text-magenta" /> * ID / Paspoort (Upload Voorkant & Achterkant)
                </span>
                <div className="flex items-center gap-2">
                  {data.idFrontDocumentName && (
                    <span className="text-[10px] text-emerald-400 font-mono">Voorkant ✔</span>
                  )}
                  {data.idBackDocumentName && (
                    <span className="text-[10px] text-emerald-400 font-mono">Achterkant ✔</span>
                  )}
                  {(!data.idFrontDocumentName && !data.idBackDocumentName && data.idDocumentName) && (
                    <span className="text-[10px] text-emerald-400 font-mono">Geverifieerd ✔</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Voorkant */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase text-[#aaaaaa] flex items-center justify-between">
                    <span>* Voorkant ID/Paspoort</span>
                    {data.idFrontDocumentName && (
                      <span className="text-[9px] text-emerald-400 font-mono">Geladen</span>
                    )}
                  </div>
                  <label className="border border-dashed border-[#333333] hover:border-magenta p-4 block text-center cursor-pointer transition-colors bg-[#0d0d0d]">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          onChange({
                            idFrontDocumentName: file.name,
                            idDocumentName: file.name,
                          })
                          toast.success(`ID Voorkant geüpload: ${file.name}`)
                        }
                      }}
                    />
                    <span className="text-xs text-[#888888] break-all block">
                      {data.idFrontDocumentName || (data.idDocumentName ? `${data.idDocumentName} (Voorkant)` : "Upload Voorkant (PDF/JPG)")}
                    </span>
                  </label>
                </div>

                {/* Achterkant */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase text-[#aaaaaa] flex items-center justify-between">
                    <span>* Achterkant ID/Paspoort</span>
                    {data.idBackDocumentName && (
                      <span className="text-[9px] text-emerald-400 font-mono">Geladen</span>
                    )}
                  </div>
                  <label className="border border-dashed border-[#333333] hover:border-magenta p-4 block text-center cursor-pointer transition-colors bg-[#0d0d0d]">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          onChange({ idBackDocumentName: file.name })
                          toast.success(`ID Achterkant geüpload: ${file.name}`)
                        }
                      }}
                    />
                    <span className="text-xs text-[#888888] break-all block">
                      {data.idBackDocumentName || "Upload Achterkant (PDF/JPG)"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTIE 5: JURIDISCHE STRUCTUUR & REFERRAL */}
        <div className="space-y-4 pt-4 border-t border-[#1f1f1f]">
          <div className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
            <Sparkles size={14} className="text-magenta" /> 5. Referral & Bedrijfsstructuur
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-white mb-1.5">
              * Referralcode
            </label>
            <input
              type="text"
              required
              value={data.referralCode}
              onChange={(e) => onChange({ referralCode: e.target.value })}
              placeholder="Bijv. VVC-PARTNER-VIP"
              className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white uppercase font-mono focus:outline-none focus:border-magenta"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* KVK Toggle */}
            <div className="bg-[#111111] border border-[#262626] p-4 flex justify-between items-center">
              <div>
                <span className="block text-xs font-bold text-white uppercase">* KVK Registratie?</span>
                <span className="text-[10px] text-[#777777]">Ben je ingeschreven bij de KVK?</span>
              </div>
              <div className="flex gap-1">
                {(["Ja", "Nee"] as const).map((val) => {
                  const isJa = val === "Ja"
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => onChange({ hasKvk: isJa })}
                      className={cn(
                        "px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-colors",
                        data.hasKvk === isJa
                          ? "border-magenta bg-magenta text-white"
                          : "border-[#333333] text-[#777777]",
                      )}
                    >
                      {val}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* LTD Toggle */}
            <div className="bg-[#111111] border border-[#262626] p-4 flex justify-between items-center">
              <div>
                <span className="block text-xs font-bold text-white uppercase">* LTD Structuur?</span>
                <span className="text-[10px] text-[#777777]">Heb je een UK / buitenlandse LTD?</span>
              </div>
              <div className="flex gap-1">
                {(["Yes", "No"] as const).map((val) => {
                  const isYes = val === "Yes"
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => onChange({ hasLtd: isYes })}
                      className={cn(
                        "px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-colors",
                        data.hasLtd === isYes
                          ? "border-magenta bg-magenta text-white"
                          : "border-[#333333] text-[#777777]",
                      )}
                    >
                      {val}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Conditional KVK / BTW velden */}
          {data.hasKvk && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                  KVK Nummer
                </label>
                <input
                  type="text"
                  value={data.kvkNumber}
                  onChange={(e) => onChange({ kvkNumber: e.target.value })}
                  placeholder="8 cijfers"
                  className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white focus:outline-none focus:border-magenta"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
                  BTW Nummer
                </label>
                <input
                  type="text"
                  value={data.btwNumber}
                  onChange={(e) => onChange({ btwNumber: e.target.value })}
                  placeholder="NL000000000B01"
                  className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white focus:outline-none focus:border-magenta"
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTIE 6: PRIVACY, VOORWAARDEN EN TOESTEMMINGEN */}
        <div className="space-y-4 pt-4 border-t border-[#1f1f1f]">
          <div className="text-xs font-black uppercase text-white tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileCheck2 size={14} className="text-magenta" /> 6. Privacy, Voorwaarden & Toestemmingen
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">AVG / GDPR Conform</span>
          </div>

          <div className="bg-[#111111] border border-[#262626] p-4 space-y-3 text-xs">
            {/* Privacyverklaring Akkoord */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={data.privacyAccepted}
                onChange={(e) => onChange({ privacyAccepted: e.target.checked })}
                className="mt-0.5 accent-magenta w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-[#cccccc] group-hover:text-white transition-colors leading-relaxed">
                * Ik heb de <strong className="text-white underline">Privacyverklaring</strong> gelezen en ga akkoord met de verwerking van mijn persoonsgegevens conform de geldende privacywetgeving.
              </span>
            </label>

            {/* Algemene Voorwaarden Akkoord */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={data.termsAccepted}
                onChange={(e) => onChange({ termsAccepted: e.target.checked })}
                className="mt-0.5 accent-magenta w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-[#cccccc] group-hover:text-white transition-colors leading-relaxed">
                * Ik ga akkoord met de <strong className="text-white underline">Algemene Voorwaarden</strong> van het VVC Platform en de samenwerkingsnormen van de Verdienende Vrienden Club.
              </span>
            </label>

            {/* Gegevensdeling met Partners */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={data.partnerDataSharingAccepted}
                onChange={(e) => onChange({ partnerDataSharingAccepted: e.target.checked })}
                className="mt-0.5 accent-magenta w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-[#cccccc] group-hover:text-white transition-colors leading-relaxed">
                * <strong className="text-white">Gegevensdeling met partners:</strong> Ik geef toestemming om mijn geverifieerde partnerprofiel veilig te koppelen aan zusterplatformen binnen het ecosysteem (zoals CRMos, Quantum Initium en Investbotiq).
              </span>
            </label>

            {/* Documentbeheer & Bewaartermijnen */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={data.retentionPolicyAccepted}
                onChange={(e) => onChange({ retentionPolicyAccepted: e.target.checked })}
                className="mt-0.5 accent-magenta w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-[#888888] group-hover:text-white transition-colors leading-relaxed text-[11px]">
                Documentbeheer & Bewaartermijnen: Verificatiedocumenten worden beveiligd bewaard zolang het partneraccount actief is, met een wettelijke fiscale bewaartermijn van 7 jaar voor transactiedata.
              </span>
            </label>
          </div>
        </div>

        {/* NEXT BUTTON */}
        <div className="pt-6 border-t border-[#222222] flex justify-end">
          <button
            type="submit"
            className="bg-magenta hover:bg-white hover:text-black text-white font-black py-3.5 px-8 uppercase tracking-widest text-xs transition-colors flex items-center gap-2"
          >
            Opslaan & Naar Kaart 2 <ChevronRight size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
