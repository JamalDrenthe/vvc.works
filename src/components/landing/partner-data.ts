export interface PartnerCompany {
  id: string
  name: string
  category: string
  logoType: "revolut" | "bunq" | "barclays" | "monzo" | "stripe" | "adyen" | "traderepublic" | "binance" | "boostplug" | "crmos"
  badge: string
  stats: string
  highlight?: boolean
}

export interface PartnerReview {
  id: string
  companyId: string
  companyName: string
  authorName: string
  authorRole: string
  rating: number
  verified: boolean
  date: string
  headline: string
  content: string
  metricBadge: string
  category: "fintech" | "banking" | "ecosystem"
}

export const PARTNER_COMPANIES: PartnerCompany[] = [
  {
    id: "revolut",
    name: "Revolut",
    category: "Fintech & Banking",
    logoType: "revolut",
    badge: "Officiële Integratie",
    stats: "€200+ Referral Bonus",
    highlight: true,
  },
  {
    id: "bunq",
    name: "bunq",
    category: "Neobank & Payments",
    logoType: "bunq",
    badge: "Directe API Partner",
    stats: "B2C & B2B Gekoppeld",
    highlight: true,
  },
  {
    id: "barclays",
    name: "Barclays",
    category: "Tier-1 Banking",
    logoType: "barclays",
    badge: "CASS Switch Partner",
    stats: "£200 Cash Bonus",
  },
  {
    id: "monzo",
    name: "Monzo",
    category: "Digital Bank",
    logoType: "monzo",
    badge: "Instant Payout",
    stats: "Top Acquisitiekanaal",
  },
  {
    id: "trade-republic",
    name: "Trade Republic",
    category: "Wealth & Crypto",
    logoType: "traderepublic",
    badge: "Geverifieerde Broker",
    stats: "Aandelen & Cash Bonus",
    highlight: true,
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Payment Infrastructure",
    logoType: "stripe",
    badge: "Global Payouts",
    stats: "Instant Settlement",
  },
  {
    id: "adyen",
    name: "Adyen",
    category: "Enterprise Payments",
    logoType: "adyen",
    badge: "Geverifieerde Escrow",
    stats: "99.99% Uptime",
  },
  {
    id: "binance",
    name: "Binance",
    category: "Web3 & Digital Assets",
    logoType: "binance",
    badge: "VIP Referral Pool",
    stats: "Tier-1 Liquiditeit",
  },
  {
    id: "boostplug",
    name: "Boostplug",
    category: "Ecosysteem Engine",
    logoType: "boostplug",
    badge: "Interne Versneller",
    stats: "boostplug.one live",
    highlight: true,
  },
  {
    id: "crmos",
    name: "CRMos",
    category: "Pipeline & Data OS",
    logoType: "crmos",
    badge: "Live Firestore Bridge",
    stats: "Real-time Sync",
    highlight: true,
  },
]

export const PARTNER_REVIEWS: PartnerReview[] = [
  {
    id: "rev-1",
    companyId: "revolut",
    companyName: "Revolut",
    authorName: "Mark van Dijk",
    authorRole: "Head of Growth & Affiliates Benelux",
    rating: 5,
    verified: true,
    date: "Oktober 2026",
    headline: "Bovengemiddelde conversie en uitstekende retentie",
    content:
      "VVC levert structureel actieve, geverifieerde gebruikers aan ons platform. Het volume is betrouwbaar en de frictieloze onboarding zorgt voor een directe activatiegraad die 3x hoger ligt dan traditionele affiliatekanalen.",
    metricBadge: "+340% LTV Waarde",
    category: "fintech",
  },
  {
    id: "rev-2",
    companyId: "bunq",
    companyName: "bunq",
    authorName: "Sophie de Boer",
    authorRole: "Senior Partnership Director",
    rating: 5,
    verified: true,
    date: "Oktober 2026",
    headline: "Kwalitatieve instroom van serieuze professionals",
    content:
      "De synergie met de Verdienende Vrienden Club is ongeëvenaard. Zowel de B2C als B2B flows worden razendsnel afgerond met complete verificatie. Een strategische samenwerking waar we continue op kunnen bouwen.",
    metricBadge: "99.2% Kwalificatie",
    category: "banking",
  },
  {
    id: "rev-3",
    companyId: "traderepublic",
    companyName: "Trade Republic",
    authorName: "Thomas Laurent",
    authorRole: "Institutional Institutional Accounts",
    rating: 5,
    verified: true,
    date: "September 2026",
    headline: "Duurzaam investerend vermogen en gedisciplineerde gebruikers",
    content:
      "Via het educatiemodel van VVC starten gebruikers direct met doordachte spaarplannen en asset-allocaties. Geen vluchtige bonuszoekers, maar langdurige vermogensopbouwers. Exact wat we zoeken in een partner.",
    metricBadge: "€1.8M+ AUM Instroom",
    category: "fintech",
  },
  {
    id: "rev-4",
    companyId: "crmos",
    companyName: "CRMos",
    authorName: "Daan Westerveld",
    authorRole: "Lead Ecosystem Architect",
    rating: 5,
    verified: true,
    date: "Oktober 2026",
    headline: "Naadloze tweerichtings data-uitwisseling in milliseconden",
    content:
      "Dankzij de directe Firestore synchronisatie tussen CRMos en VVC zijn gebruikersprofielen, KYC-statussen en lead-pipelines direct gesynchroniseerd. Absolute enterprise-grade betrouwbaarheid.",
    metricBadge: "< 120ms Sync Tijd",
    category: "ecosystem",
  },
  {
    id: "rev-5",
    companyId: "boostplug",
    companyName: "Boostplug",
    authorName: "Jamal Drenthe",
    authorRole: "Managing Director Boostplug.one",
    rating: 5,
    verified: true,
    date: "Oktober 2026",
    headline: "Maximale hefboom op referral cashflows",
    content:
      "Boostplug fungeert als de hoogvoltage motor voor VVC. De geautomatiseerde deal-distributie en live tracking over De 126 Bedrijven genereert consistente dagelijkse commissies voor onze leden.",
    metricBadge: "126+ Gekoppelde Deals",
    category: "ecosystem",
  },
  {
    id: "rev-6",
    companyId: "monzo",
    companyName: "Monzo",
    authorName: "Alistair Campbell",
    authorRole: "Strategic Distribution Partner UK",
    rating: 5,
    verified: true,
    date: "Oktober 2026",
    headline: "Ongeëvenaarde executiesnelheid en transparantie",
    content:
      "Samenwerken met het VVC netwerk betekent duidelijke afspraken, strakke naleving van bankrichtlijnen en instant beloningsuitkeringen. Een benchmark voor hoe moderne fintech-partnerschappen horen te functioneren.",
    metricBadge: "100% Payout SLA",
    category: "banking",
  },
]
