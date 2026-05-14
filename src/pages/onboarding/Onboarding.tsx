import { useNavigate } from "react-router"
import {
  Award,
  ChevronRight,
  GraduationCap,
  Repeat,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import { PillarCard } from "@/components/common/PillarCard"

/**
 * Onboarding welkom — uit app1's DashboardTab. Hero + strategische
 * framework + groeipad + CTA's naar de twee onboarding submodules.
 *
 * Het framework-blok introduceert de B2C vs B2B dichotomie uit het VVC
 * referral-onderzoek. Dit zet de toon voor de 126 Bedrijven Matrix:
 * waarom verschilt een £10 PayPal bonus van een €1.631 Finqle partner
 * commissie — en hoe positioneer jij jezelf binnen die spreiding.
 */
export default function OnboardingPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-10 max-w-6xl mx-auto animate-fade-in">
      {/* ─── HERO ─── */}
      <section className="bg-gradient-to-br from-[#0a0a0a] to-black p-8 lg:p-12 border border-[#222222] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-magenta/20 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-block border border-magenta text-magenta text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-6">
          Stap 1 — Onboarding
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Stop met de sleur.
          <br />
          Word{" "}
          <span className="text-magenta">CEO van je eigen route.</span>
        </h1>
        <p className="text-lg text-[#888888] max-w-2xl mb-8 leading-relaxed">
          Welkom bij de Verdienende Vrienden Club. Hier zijn geen bazen, alleen
          partners. Jouw onboarding draait niet om theorie, maar om pure
          executie. Kies je eerste scenario, bewijs je executiekracht en start
          met bouwen aan je passieve inkomen.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => navigate("/onboarding/companies")}
            className="bg-magenta hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-xs py-3 px-8 transition-colors flex items-center gap-2 group"
          >
            Start Testcase
            <ChevronRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <button
            type="button"
            onClick={() => navigate("/onboarding/academy")}
            className="border border-[#333333] hover:border-white text-white font-black uppercase tracking-widest text-xs py-3 px-8 transition-colors flex items-center gap-2"
          >
            <GraduationCap size={16} />
            Naar Academy
          </button>
        </div>
      </section>

      {/* ─── STRATEGISCH FRAMEWORK ─── */}
      <section>
        <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-magenta mb-2">
              Het Framework
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              CAC × LTV — waarom referrals niet meer "strooien met geld" zijn
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate("/onboarding/academy")}
            className="text-magenta hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-colors"
          >
            Verdiep in de Academy <ChevronRight size={14} />
          </button>
        </div>

        <div className="bg-[#0a0a0a] border border-[#222222] p-6 lg:p-8 mb-4">
          <p className="text-[#aaaaaa] leading-relaxed mb-4">
            Uit onze analyse van <span className="text-white font-black">126 ondernemingen</span> blijkt
            dat referralprogramma's fundamenteel zijn getransformeerd. De vroege markt kenmerkte zich
            door onvoorwaardelijke eenmalige cash-uitkeringen. De huidige markt? Sterk{" "}
            <span className="text-white font-black">voorwaardelijk</span>, gefaseerd en
            ecosysteem-gebonden — om Customer Acquisition Cost te optimaliseren tegen Lifetime Value.
          </p>
          <p className="text-[#aaaaaa] leading-relaxed">
            Voor jou als VVC-partner betekent dit dat <span className="text-magenta font-black">het
            kiezen van het juiste scenario</span> belangrijker is dan ooit. Een PayPal £10 case en een
            Finqle €1.631 case vragen radicaal andere executiestrategieën.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FrameworkCard
            tag="B2C — Volume & Viraliteit"
            tagColor="text-emerald-400"
            icon={<Zap size={20} className="text-emerald-400" />}
            title="Frictieloze onboarding"
            range="£10 – $2.000"
            bullets={[
              "Direct bevredigende cash, free shares of abonnementskorting",
              "Multi-stap verificatie (ID, fysieke kaart, transactie-drempel)",
              "Volume compenseert lagere individuele klantwaarde",
              "Voorbeelden: PayPal, Bitvavo, Revolut, KPN",
            ]}
          />
          <FrameworkCard
            tag="B2B — Performance & Lange Cycli"
            tagColor="text-magenta"
            icon={<Shield size={20} className="text-magenta" />}
            title="Gesloten partnernetwerken"
            range="£100 – €1.631"
            bullets={[
              "Revenue sharing, geen eenmalige bonussen",
              "Strenge omzetdrempels (€30.000+) en KYC/AML protocollen",
              "Plaatsing via accountmanagers, geen virale links",
              "Voorbeelden: Payoneer, Finqle, Sonovate, SumUp Partners",
            ]}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <TrendCard
            icon={<Repeat size={18} className="text-blue-400" />}
            title="Revenue Share"
            desc="Bitvavo betaalt 15% levenslang over handelskosten. Crypto.com tot 50%. Het einde van de eenmalige bonus."
          />
          <TrendCard
            icon={<Shield size={18} className="text-amber-400" />}
            title="Regulering (FCA)"
            desc="Crypto.com is gepauzeerd in UK / Singapore / Canada. Compliance is permanent restrictie op subsidies."
          />
          <TrendCard
            icon={<Users size={18} className="text-magenta" />}
            title="Ecosysteem Lock-in"
            desc="Grover Bucks blijven intern. Bunq Points beperken uitstroom. Odido beloont multi-abonnement koppels."
          />
        </div>
      </section>

      {/* ─── VVC GROEIPAD ─── */}
      <section>
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
          Het VVC Groeipad
        </h2>
        <p className="text-[#888888] mb-6 max-w-2xl">
          Drie pijlers waarmee jij — net als de bedrijven die wij analyseren —
          niet meer afhankelijk bent van één eenmalige uitbetaling.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PillarCard
            icon={<TrendingUp size={28} className="text-blue-400" />}
            title="Pijler 1: Uurloon"
            value="€30 / uur"
            desc="Gegarandeerde basis voor jouw beluren. Stabiliteit tijdens de executie."
            color="border-blue-500/30 bg-blue-500/5"
          />
          <PillarCard
            icon={<Award size={28} className="text-magenta" />}
            title="Pijler 2: Directe Bonus"
            value="€300 / deal"
            desc="Directe beloning voor succesvolle plaatsingen. Jouw executie is cash."
            color="border-magenta/40 bg-magenta/5"
            highlight
          />
          <PillarCard
            icon={<Users size={28} className="text-emerald-400" />}
            title="Pijler 3: Passief"
            value="€25 / maand"
            desc="Per geplaatste kandidaat. Het VVC sneeuwbaleffect — vergelijkbaar met Bitvavo's revenue share."
            color="border-emerald-500/30 bg-emerald-500/5"
          />
        </div>
      </section>
    </div>
  )
}

/* ─── Sub-componenten ──────────────────────────────────────────────── */

function FrameworkCard({
  tag,
  tagColor,
  icon,
  title,
  range,
  bullets,
}: {
  tag: string
  tagColor: string
  icon: React.ReactNode
  title: string
  range: string
  bullets: string[]
}) {
  return (
    <article className="bg-[#0a0a0a] border border-[#222222] p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 bg-black border border-[#222222] flex items-center justify-center">
          {icon}
        </div>
        <span
          className={`text-[10px] font-black uppercase tracking-[0.2em] ${tagColor}`}
        >
          {tag}
        </span>
      </div>
      <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">
        {title}
      </h3>
      <p className="text-3xl font-black text-white tracking-tighter mb-4">
        {range}
      </p>
      <ul className="space-y-2 text-sm text-[#aaaaaa] leading-relaxed flex-1">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-magenta shrink-0 font-black">·</span>
            {b}
          </li>
        ))}
      </ul>
    </article>
  )
}

function TrendCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="bg-[#0a0a0a] border border-[#222222] p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className="text-xs font-black uppercase tracking-widest text-white">
          {title}
        </h4>
      </div>
      <p className="text-xs text-[#888888] leading-relaxed">{desc}</p>
    </div>
  )
}
