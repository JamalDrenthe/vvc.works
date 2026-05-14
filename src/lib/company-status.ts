import type { CompanyStatus } from "@/types"

/**
 * Eén bron van waarheid voor hoe een `Company.status` visueel en
 * conceptueel wordt vertaald: gebruikt door zowel CompanyCard
 * (badge styling) als CompanyModal (context-uitleg).
 */
export interface StatusVisual {
  /** Tailwind classes voor de status-pill */
  pill: string
  /** Korte label getoond in de UI */
  label: string
  /** Of de case clickable / claimbaar is */
  claimable: boolean
  /** Of de card grayscale getoond moet worden */
  muted: boolean
  /** Lange uitleg getoond in de modal */
  longExplainer: string
}

const FALLBACK: StatusVisual = {
  pill: "bg-[#111111] text-[#888888] border-[#222222]",
  label: "Onbekend",
  claimable: false,
  muted: true,
  longExplainer:
    "Geen status-mapping gevonden — neem contact op met je VVC partner.",
}

const VISUALS: Record<CompanyStatus, StatusVisual> = {
  Actief: {
    pill: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    label: "Actief",
    claimable: true,
    muted: false,
    longExplainer:
      "Programma is actueel en geverifieerd in dit kwartaal. Bonus wordt uitgekeerd zodra de aangebrachte klant alle kwalificatievoorwaarden voltooit binnen de gestelde termijn.",
  },
  "Actief (Partner)": {
    pill: "bg-magenta/15 text-magenta border-magenta/40",
    label: "Partner-only",
    claimable: true,
    muted: false,
    longExplainer:
      "Dit programma loopt uitsluitend via een gesloten partner-/broker-netwerk met formele KYC en AML-procedures. Commissies worden uitonderhandeld per deal en pas uitgekeerd na succesvolle volume-realisatie. Plaatsing vereist een persoonlijke introductie via VVC.",
  },
  "Actief (Indirect)": {
    pill: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    label: "Indirect",
    claimable: true,
    muted: false,
    longExplainer:
      "Geen directe P2P-link, maar de bonus is bereikbaar via een externe partner (cashback-netwerk, holding-structuur of jongerenpropositie). Zorg dat de attributie correct is — anders gaat de uitbetaling verloren.",
  },
  Gedeeltelijk: {
    pill: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    label: "Gedeeltelijk",
    claimable: true,
    muted: false,
    longExplainer:
      "Programma is in sommige regio's of klantsegmenten actief, maar gepauzeerd in andere (vaak wegens FCA of lokale toezichthouders). Verifieer dat jouw prospect in een geldige jurisdictie zit voordat je de case start.",
  },
  Gepauzeerd: {
    pill: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    label: "Gepauzeerd",
    claimable: false,
    muted: true,
    longExplainer:
      "Programma is tijdelijk inactief — in de praktijk vaak een eufemisme voor een lopende compliance-herziening. Plaatsing op dit moment is risicovol: claim verschuiven naar een ander dossier tot status weer 'Actief' is.",
  },
  Inactief: {
    pill: "bg-red-500/10 text-red-400 border-red-500/30",
    label: "Inactief",
    claimable: false,
    muted: true,
    longExplainer:
      "Bedrijf is gestopt met haar operationele diensten. Geen plaatsing mogelijk.",
  },
  Overgenomen: {
    pill: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    label: "Overgenomen",
    claimable: false,
    muted: true,
    longExplainer:
      "Bedrijf is geïntegreerd in een andere entiteit. Stuur prospects door naar het overnemende platform en gebruik dat dossier voor je plaatsing.",
  },
  "Geen actieve bonus": {
    pill: "bg-[#111111] text-[#666666] border-[#222222]",
    label: "Geen bonus",
    claimable: false,
    muted: true,
    longExplainer:
      "Geen openbaar P2P referralprogramma. Acquisitie verloopt via enterprise sales, RFP's, of account-managers — niet via virale links. Niet geschikt voor VVC plaatsing.",
  },
}

/** Geeft de visuele mapping voor een status-string terug (met fallback). */
export function getStatusVisual(status: string): StatusVisual {
  return (VISUALS as Record<string, StatusVisual>)[status] ?? FALLBACK
}
