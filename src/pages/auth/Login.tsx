import { useState, type FormEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { ChevronRight, Loader2, ShieldCheck } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { config } from "@/lib/config"

interface LocationState {
  from?: { pathname?: string }
}

export default function LoginPage() {
  const { login, loginWithGoogle, error, isLoading, clearError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    try {
      const authenticated = await loginWithGoogle()
      if (!authenticated) return
      const target =
        (location.state as LocationState | null)?.from?.pathname ?? "/dashboard"
      navigate(target, { replace: true })
    } catch {
      /* error wordt al via context state getoond */
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const authenticated = await login({ email, password })
      if (!authenticated) return
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

      <div className="bg-[#0a0a0a] border border-[#222222] p-8 space-y-6">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading || isGoogleLoading}
          className="w-full border border-[#333333] bg-[#111111] text-white font-bold py-3 px-4 uppercase tracking-wider text-xs flex justify-center items-center gap-3 transition-colors duration-200 hover:border-magenta hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Inloggen via Google…
            </>
          ) : (
            <>
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Inloggen met Google
            </>
          )}
        </button>

        <div className="relative flex items-center justify-center">
          <span className="w-full border-t border-[#222222]" />
          <span className="bg-[#0a0a0a] px-3 text-[10px] uppercase tracking-widest text-[#666666]">of</span>
          <span className="w-full border-t border-[#222222]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
