import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router"
import { ChevronRight, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { api } from "@/lib/api/client"
import { config } from "@/lib/config"

type Route = "talent" | "partner"

const TALENT_FUNCTIE = [
  "Trainee Senior Consultant",
  "Trainee Senior Resourcer",
  "Trainee Senior Closer",
]
const TALENT_ERVARING = [
  "Geen ervaring (Starter)",
  "1-2 jaar",
  "3-5 jaar",
  "5+ jaar (Expert)",
]
const TALENT_SITUATIE = [
  "Loondienst (Fulltime)",
  "Loondienst (Parttime)",
  "Ondernemer / ZZP",
  "Student",
  "Werkzoekend",
]
const TALENT_INKOMEN = ["€3.000 - €5.000", "€5.000 - €10.000", "€10.000+"]
const TALENT_UREN = [
  "10-20 uur",
  "20-30 uur",
  "30-40 uur",
  "40+ uur (Fulltime)",
]
const TALENT_KANAAL = ["Instagram", "LinkedIn", "TikTok", "Via via", "Anders"]

const PARTNER_GROOTTE = [
  "1-10 medewerkers",
  "11-50 medewerkers",
  "51-200 medewerkers",
  "200+ medewerkers",
]
const PARTNER_SECTOR = [
  "Financiële Dienstverlening",
  "Vastgoed & Makelaardij",
  "Automotive",
  "High-End Retail",
  "Overig",
]
const PARTNER_TEAM = [
  "Geen (Startend)",
  "1-5 verkopers",
  "5-15 verkopers",
  "15+ verkopers",
]
const PARTNER_START = [
  "Zo snel mogelijk",
  "Binnen 1 maand",
  "Binnen 3 maanden",
  "Oriënterend",
]
const PARTNER_DIENST = [
  "Kwaliteitscontrole",
  "Workflowtesten",
  "Mystery Shopping",
  "Anders",
]

export default function RegisterPage() {
  const navigate = useNavigate()
  const [route, setRoute] = useState<Route>("talent")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget))
      if (config.useMock) {
        await wait(600)
      } else {
        await api.post("/auth/register", { route, ...data }, { skipAuth: true })
      }
      toast.success(
        route === "talent" ? "Aanmelding verzonden" : "Offerte aangevraagd",
        {
          description:
            "We nemen zo snel mogelijk contact met je op. Je kunt hierna inloggen zodra je account is aangemaakt.",
        },
      )
      navigate("/login")
    } catch (err) {
      toast.error("Verzenden mislukt", {
        description:
          err instanceof Error ? err.message : "Probeer het later opnieuw.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-10">
        <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-6">
          Start Hier
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-white uppercase leading-[1.05] tracking-tighter mb-3">
          Word onderdeel
          <br />
          <span className="text-magenta">van de club.</span>
        </h1>
        <p className="text-[#888888] text-sm">
          Kies je route: Talent of Partner.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <RouteTab
          active={route === "talent"}
          onClick={() => setRoute("talent")}
        >
          Talent
        </RouteTab>
        <RouteTab
          active={route === "partner"}
          onClick={() => setRoute("partner")}
        >
          Bedrijven
        </RouteTab>
      </div>

      <form
        key={route}
        onSubmit={handleSubmit}
        className="bg-[#0a0a0a] border border-[#222222] p-8 space-y-6"
      >
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">
            {route === "talent" ? "Word Lid" : "Word Partner"}
          </h2>
          <p className="text-[#888888] text-sm mt-1">
            {route === "talent"
              ? "Geen motivatiebrieven. Wij selecteren op professionaliteit en executie."
              : "Vraag een offerte aan voor kwaliteitscontrole, workflowtesten of mystery shopping."}
          </p>
        </div>

        {route === "talent" ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field id="naam" name="naam" label="Volledige Naam" required placeholder="Jouw naam" autoComplete="name" />
              <Field id="email" name="email" label="E-mailadres" type="email" required placeholder="jouw@email.nl" autoComplete="email" />
              <Field id="telefoon" name="telefoon" label="Telefoonnummer" type="tel" required placeholder="06 12345678" autoComplete="tel" />
              <Field id="woonplaats" name="woonplaats" label="Woonplaats" required placeholder="Amsterdam" />
            </div>
            <Field id="linkedin" name="linkedin" label="LinkedIn Profiel" type="url" placeholder="https://linkedin.com/in/..." />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Select id="functie" name="functie" label="Interesse in functie" options={TALENT_FUNCTIE} />
              <Select id="ervaring" name="ervaring" label="Ervaring in Sales" options={TALENT_ERVARING} />
              <Select id="situatie" name="situatie" label="Huidige Situatie" options={TALENT_SITUATIE} />
              <Select id="inkomensdoel" name="inkomensdoel" label="Inkomensdoel (p/m)" options={TALENT_INKOMEN} />
              <Select id="beschikbaarheid" name="beschikbaarheid" label="Beschikbaarheid (uren p/w)" options={TALENT_UREN} />
              <Select id="kanaal" name="kanaal" label="Hoe ken je ons?" options={TALENT_KANAAL} />
            </div>
            <TextArea id="motivatie" name="motivatie" label="Motivatie" placeholder="Waarom ben jij de juiste persoon voor VVC?" />
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field id="bedrijfsnaam" name="bedrijfsnaam" label="Bedrijfsnaam" required placeholder="Bedrijfsnaam" autoComplete="organization" />
              <Field id="contactpersoon" name="contactpersoon" label="Contactpersoon" required placeholder="Naam contactpersoon" />
              <Field id="email" name="email" label="E-mailadres" type="email" required placeholder="jouw@bedrijf.nl" autoComplete="email" />
              <Field id="telefoon" name="telefoon" label="Telefoonnummer" type="tel" required placeholder="06 12345678" autoComplete="tel" />
            </div>
            <Field id="website" name="website" label="Website" type="url" placeholder="https://..." />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Select id="grootte" name="grootte" label="Bedrijfsgrootte (FTE)" options={PARTNER_GROOTTE} />
              <Select id="sector" name="sector" label="Sector" options={PARTNER_SECTOR} />
              <Select id="team" name="team" label="Omvang Sales Team" options={PARTNER_TEAM} />
              <Select id="startdatum" name="startdatum" label="Gewenste Startdatum" options={PARTNER_START} />
              <Select id="dienst" name="dienst" label="Primaire Dienst" options={PARTNER_DIENST} />
            </div>
            <TextArea id="uitdaging" name="uitdaging" label="Wat is uw grootste uitdaging?" placeholder="Omschrijf uw uitdaging" />
          </>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-magenta text-white font-black py-3 px-4 uppercase tracking-widest text-xs flex justify-center items-center gap-2 transition-colors duration-200 hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-magenta disabled:hover:text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={14} />
              Verzenden…
            </>
          ) : (
            <>
              {route === "talent" ? "Start Onboarding" : "Offerte Aanvragen"}
              <ChevronRight size={14} />
            </>
          )}
        </button>

        <div className="border-t border-[#222222] pt-4 text-center">
          <Link
            to="/login"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-[#888888] hover:text-magenta transition-colors"
          >
            Al lid? Inloggen
          </Link>
        </div>
      </form>
    </div>
  )
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

/* ─── Interne componenten ──────────────────────────────────────── */

function RouteTab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] border transition-colors ${
        active
          ? "bg-magenta border-magenta text-white"
          : "bg-transparent border-[#333333] text-[#888888] hover:border-magenta hover:text-white"
      }`}
    >
      {children}
    </button>
  )
}

const labelClass =
  "block text-[10px] font-black uppercase tracking-[0.2em] text-[#888888] mb-2"
const inputClass =
  "w-full bg-black border border-[#333333] text-white px-4 py-3 text-sm font-medium placeholder-[#444444] focus:outline-none focus:border-magenta transition-colors"

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  required,
  placeholder,
}: {
  id: string
  name: string
  label: string
  type?: string
  autoComplete?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  )
}

function Select({
  id,
  name,
  label,
  options,
}: {
  id: string
  name: string
  label: string
  options: string[]
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <select id={id} name={name} required className={inputClass}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

function TextArea({
  id,
  name,
  label,
  placeholder,
}: {
  id: string
  name: string
  label: string
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={4}
        placeholder={placeholder}
        className={`${inputClass} resize-y`}
      />
    </div>
  )
}
