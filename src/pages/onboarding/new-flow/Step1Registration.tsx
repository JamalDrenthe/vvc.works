import { useState } from "react"
import {
  User,
  Calendar as CalendarIcon,
  FileText,
  ChevronRight,
  Database,
  Shield,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
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

  // Calendar Picker state helper
  const parsedBirthDate = data.birthDate ? new Date(data.birthDate) : new Date(1998, 0, 15)
  const [birthYear, setBirthYear] = useState(parsedBirthDate.getFullYear())
  const [birthMonth, setBirthMonth] = useState(parsedBirthDate.getMonth())
  const [birthDay, setBirthDay] = useState(parsedBirthDate.getDate())

  const handleFetchFromCrmos = (e: React.FormEvent) => {
    e.preventDefault()
    if (!crmosInputCode.trim()) {
      toast.error("Voer een geldige CRMos code in.")
      return
    }

    // Auto-fill profile from CRMos
    onChange({
      crmosCode: crmosInputCode.trim(),
      isCrmosFetched: true,
      gender: "Man",
      firstName: "Jamal",
      lastName: "Drenthe",
      email: "info@jamaldrenthe.com",
      phone: "+31 6 12345678",
      city: "Amsterdam",
      street: "Keizersgracht",
      houseNumber: "421",
      birthDate: "1996-04-18",
      referralCode: "VVC-FOUNDER-ELITE",
      hasKvk: true,
      kvkNumber: "84729103",
      btwNumber: "NL847291032B01",
      hasLtd: true,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      idDocumentName: "Paspoort_NL_Geverifieerd.pdf",
      cvFileName: "Curriculum_Vitae_Jamal_Drenthe.pdf",
    })
    toast.success("Profielgegevens succesvol opgehaald uit CRMos!", {
      description: `CRMos code [${crmosInputCode}] gekoppeld en gevalideerd.`,
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
    if (!data.city || !data.street || !data.houseNumber) {
      toast.error("Vul je volledige adresgegevens in.")
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

    toast.success("Kaart 1 voltooid: Registratie compleet!")
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
            Maak Het Eerste Deel Van De Registratie Compleet
          </h2>
          <p className="text-xs text-[#888888] font-medium mt-1">
            Persoonlijke verificatie, adres, ID-documenten en juridische structuur.
          </p>
        </div>

        {/* CRMos Toggle */}
        <div className="bg-[#111111] border border-[#2a2a2a] p-3 flex flex-col sm:flex-row items-center gap-3">
          <div className="text-left">
            <div className="text-[10px] font-black uppercase text-white tracking-wider flex items-center gap-1.5">
              <Database size={13} className="text-magenta" /> Haal op uit CRMos
            </div>
            <div className="text-[10px] text-[#777777]">
              {data.isCrmosFetched ? "CRMos Data Gekoppeld ✔" : "Heb je een CRMos code?"}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowCrmosInput(!showCrmosInput)}
            className="border border-[#444444] hover:border-magenta text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 transition-colors"
          >
            {showCrmosInput ? "Sluit Code Veld" : "Enter Code"}
          </button>
        </div>
      </div>

      {/* CRMos Code Input Drawer */}
      {showCrmosInput && (
        <form
          onSubmit={handleFetchFromCrmos}
          className="bg-[#120a11] border border-magenta/40 p-4 flex flex-col sm:flex-row gap-3 items-center justify-between animate-fade-in"
        >
          <div className="text-xs text-white font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-magenta animate-pulse" />
            CRMos Sync: Voer je code in (bijv. <code className="text-magenta font-mono">CRMOS-VVC-2026</code>)
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={crmosInputCode}
              onChange={(e) => setCrmosInputCode(e.target.value)}
              placeholder="CRMOS-XXXX-XXXX"
              className="bg-[#1c1c1c] border border-[#333333] text-xs text-white px-3 py-2 font-mono uppercase focus:outline-none focus:border-magenta"
            />
            <button
              type="submit"
              className="bg-magenta hover:bg-white hover:text-black text-white text-xs font-black uppercase tracking-wider px-4 py-2 transition-colors"
            >
              Synchroniseren
            </button>
          </div>
        </form>
      )}

      {/* ─── FORM ─── */}
      <form onSubmit={validateAndProceed} className="space-y-6">
        {/* VELD 1: Geboren als Man of Vrouw */}
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

        {/* NAAM & CONTACT */}
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

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
              * E-Mailadres
            </label>
            <input
              type="email"
              required
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="naam@domein.nl"
              className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white focus:outline-none focus:border-magenta"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
              * Telefoonnummer
            </label>
            <input
              type="tel"
              required
              value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+31 6 12345678"
              className="w-full bg-[#111111] border border-[#262626] p-3 text-xs text-white focus:outline-none focus:border-magenta"
            />
          </div>
        </div>

        {/* ADRESGEGEVENS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-1.5">
              * Woonplaats
            </label>
            <input
              type="text"
              required
              value={data.city}
              onChange={(e) => onChange({ city: e.target.value })}
              placeholder="Bijv. Amsterdam, Rotterdam"
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
              placeholder="Bijv. 12B"
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

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowCalendarPicker(!showCalendarPicker)}
              className="flex-1 bg-[#111111] border border-[#262626] hover:border-magenta p-3 text-xs text-left text-white flex items-center justify-between transition-colors"
            >
              <span className={data.birthDate ? "text-white font-medium" : "text-[#666666]"}>
                {data.birthDate || "Selecteer geboortedatum via kalender"}
              </span>
              <CalendarIcon size={16} className="text-magenta" />
            </button>
          </div>

          {/* Advanced Calendar Selector Modal / Inline Box */}
          {showCalendarPicker && (
            <div className="mt-3 p-4 bg-[#141414] border border-[#333333] space-y-4 animate-fade-in">
              <div className="text-xs font-black uppercase text-white border-b border-[#222222] pb-2">
                Kies Datum: Dag / Maand / Jaar
              </div>
              <div className="grid grid-cols-3 gap-3">
                {/* Dag */}
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

                {/* Maand */}
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

                {/* Jaar */}
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

        {/* UPLOADS: CV, Motivatie, Profielfoto, ID/Paspoort */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#1f1f1f]">
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

          {/* Profielfoto Upload */}
          <div className="border border-[#262626] bg-[#111111] p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase text-white">
                * Profielfoto (Upload)
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
              <label className="flex-1 border border-dashed border-[#333333] hover:border-magenta p-3 text-center cursor-pointer transition-colors block">
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
                <span className="text-xs text-[#888888]">Kies profielfoto…</span>
              </label>
            </div>
          </div>

          {/* ID/Paspoort Upload */}
          <div className="border border-[#262626] bg-[#111111] p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase text-white flex items-center gap-1">
                <Shield size={14} className="text-magenta" /> * ID / Paspoort (Upload)
              </span>
              {data.idDocumentName && (
                <span className="text-[10px] text-emerald-400 font-mono">Geverifieerd ✔</span>
              )}
            </div>
            <label className="border border-dashed border-[#333333] hover:border-magenta p-4 block text-center cursor-pointer transition-colors">
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    onChange({ idDocumentName: file.name })
                    toast.success(`ID Document geüpload: ${file.name}`)
                  }
                }}
              />
              <span className="text-xs text-[#888888]">
                {data.idDocumentName ? data.idDocumentName : "Upload ID of Paspoort (PDF/JPG)"}
              </span>
            </label>
          </div>
        </div>

        {/* REFERRAL CODE */}
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

        {/* JURIDISCH: KVK, BTW, LTD */}
        <div className="pt-2 border-t border-[#1f1f1f] space-y-4">
          <div className="text-xs font-black uppercase text-white tracking-wider">
            Zakelijke & Juridische Structuur
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
