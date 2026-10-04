import { useState, type FormEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { ChevronRight, Loader2, ShieldCheck } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { config } from "@/lib/config"

interface LocationState {
  from?: { pathname?: string }
}

export default function LoginPage() {
  const { login, error, isLoading, clearError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await login({ email, password })
      const target =
        (location.state as LocationState | null)?.from?.pathname ?? "/dashboard"
      navigate(target, { replace: true })
    } catch {
      /* error wordt al via context state getoond */
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-10">
        <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-6">
          Toegang Vereist
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-white uppercase leading-[1.05] tracking-tighter mb-3">
          Log in op
          <br />
          <span className="text-magenta">je platform.</span>
        </h1>
        <p className="text-[#888888] text-sm">
          Centrale toegang tot Onboarding, Dashboard en het VVC App-ecosysteem.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#0a0a0a] border border-[#222222] p-8 space-y-6"
      >
        <Field
          id="email"
          label="E-mail"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(v) => {
            setEmail(v)
            if (error) clearError()
          }}
          placeholder="naam@vvc.nl"
        />

        <Field
          id="password"
          label="Wachtwoord"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(v) => {
            setPassword(v)
            if (error) clearError()
          }}
          placeholder="••••••••"
        />

        {error && (
          <div
            className="border border-red-500/40 bg-red-500/10 text-red-300 text-xs font-bold uppercase tracking-widest px-4 py-3"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="flex-1 bg-magenta text-white font-black py-3 px-4 uppercase tracking-widest text-xs flex justify-center items-center gap-2 transition-colors duration-200 hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-magenta disabled:hover:text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={14} />
                Inloggen…
              </>
            ) : (
              <>
                Inloggen
                <ChevronRight size={14} />
              </>
            )}
          </button>
          <Link
            to="/register"
            className="flex-1 border border-[#333333] text-[#888888] font-black py-3 px-4 uppercase tracking-widest text-xs flex justify-center items-center gap-2 transition-colors duration-200 hover:border-magenta hover:text-white"
          >
            Registreren
            <ChevronRight size={14} />
          </Link>
        </div>

        {config.authProvider === "mock" && (
          <div className="border-t border-[#222222] pt-4 text-[10px] text-[#666666] font-bold uppercase tracking-widest leading-relaxed">
            <div className="flex items-center gap-2 text-magenta mb-2">
              <ShieldCheck size={12} />
              Demo-modus actief
            </div>
            <p className="normal-case tracking-normal font-medium text-[#888888]">
              Login met <code className="text-white">sanne@vvc.nl</code> /{" "}
              <code className="text-white">executie</code> of{" "}
              <code className="text-white">ceo@vvc.nl</code> /{" "}
              <code className="text-white">ceo</code>.
            </p>
          </div>
        )}
      </form>
    </div>
  )
}

/* ─── Internal field component ─────────────────────────────────── */

interface FieldProps {
  id: string
  label: string
  type: string
  autoComplete?: string
  required?: boolean
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

function Field({
  id,
  label,
  type,
  autoComplete,
  required,
  value,
  onChange,
  placeholder,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#888888] mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-black border border-[#333333] text-white px-4 py-3 text-sm font-medium placeholder-[#444444] focus:outline-none focus:border-magenta transition-colors"
      />
    </div>
  )
}
