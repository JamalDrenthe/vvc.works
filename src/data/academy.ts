import type { CompanySector } from "@/types"

/**
 * VVC Academy — leerplatform content.
 *
 * Elke module komt overeen met een sector uit het strategisch onderzoek
 * naar referralprogramma's. De page rendert deze data; aanpassen kan
 * hier zonder JSX-werk in Academy.tsx.
 */

export interface AcademyMetric {
  label: string
  value: string
}

export interface AcademyCaseStudy {
  name: string
  insight: string
}

export interface AcademyModule {
  id: string
  number: number
  sector: CompanySector
  iconName:
    | "landmark"
    | "bitcoin"
    | "credit-card"
    | "antenna"
    | "users"
    | "briefcase"
    | "trending-up"
  /** Tailwind color klasse voor accent (text + border) */
  accent: string
  /** Kort kerninzicht (1-2 zinnen) */
  principle: string
  /** Kernmetriek-tegels */
  metrics: AcademyMetric[]
  /** Mini cases uit het onderzoek */
  caseStudies: AcademyCaseStudy[]
  /** Actionable lessen voor VVC-partners */
  lessons: string[]
}

export const academyModules: AcademyModule[] = [
  {
    id: "banken",
    number: 2,
    sector: "Banken & Neobanken",
    iconName: "landmark",
    accent: "text-blue-400 border-blue-500/30",
    principle:
      "De strijd om de primaire rekening: traditionele banken kopen klanten met CASS-overstapbonussen, neobanken bouwen netwerkeffecten via multi-stap verificatie. Beide modellen rapporteren een payback-periode korter dan 12 maanden zolang het account 'primair' wordt.",
    metrics: [
      { label: "Bonusrange", value: "£10 – £200" },
      { label: "Drempelstortng", value: "£20 – £2.000" },
      { label: "Verificatie-stappen", value: "3 – 5" },
      { label: "Actieve programma's", value: "11/20" },
    ],
    caseStudies: [
      {
        name: "Barclays — £200 / £2.000 storting",
        insight:
          "Verplichte CASS-overstap + 2 incasso's verhuizen + £2.000 storting binnen 30 dagen. Strategisch ontworpen om bonus-hoppers te blokkeren — alleen klanten die hun primaire financiële hub verhuizen kwalificeren.",
      },
      {
        name: "Revolut — Multi-stap verificatie",
        insight:
          "ID-check + externe storting + fysieke kaart + 3 legitieme transacties (geen forex, geen gokken). Mitigeert het risico van spookaccounts en burner-kaarten volledig.",
      },
      {
        name: "Tide — £100 B2B + £75 cashback",
        insight:
          "Combineert directe referral met Limited Company-oprichting (REFER200 code). Aankomende Britse ondernemer komt binnen één funnel binnen.",
      },
    ],
    lessons: [
      "Filter op B2B banken (Tide, Counting Up, Wamo) voor hogere conversie-waarde dan B2C overstap.",
      "B2C banken vereisen een prospect met écht switch-intent — niet een gelegenheids-rekening.",
      "Plaatsing telt pas mee na 30-60 dagen actieve transacties; plan je opvolging hierop.",
    ],
  },
  {
    id: "crypto",
    number: 3,
    sector: "Crypto & Web3",
    iconName: "bitcoin",
    accent: "text-amber-400 border-amber-500/30",
    principle:
      "Exponentieel hoge Customer Acquisition Costs gecompenseerd door volume × fee. De markt verschuift van eenmalige aanmeldbonussen naar permanente revenue share — wat particuliere gebruikers in financieel gemotiveerde ambassadeurs verandert.",
    metrics: [
      { label: "Bonusrange", value: "€5 – $2.000" },
      { label: "Revenue share", value: "15% – 50%" },
      { label: "Lockup-tijd", value: "30 – 365 dgn" },
      { label: "Gepauzeerd in", value: "UK + 3 regio's" },
    ],
    caseStudies: [
      {
        name: "Bitvavo — €20 + 15% levenslang",
        insight:
          "De referrer krijgt 15% revenue share op alle handelskosten van de aangebrachte vriend — een levenslange passieve inkomstenstroom. Eenmalige €20 voor de nieuwe gebruiker dient als instap.",
      },
      {
        name: "Crypto.com — Whales boven alles",
        insight:
          "1.000 CRO lockup levert $10; 5.000.000 CRO levert $2.000 + 50% commissie over 12 maanden. Programma is gericht op grote spelers, niet retail volume.",
      },
      {
        name: "Blockchain.com — gepauzeerd",
        insight:
          "Programma 'tijdelijk gepauzeerd voor onderhoud' is in de branche eufemisme voor compliance-herziening. FCA-druk dwingt platforms om hun acquisitie te herzien.",
      },
    ],
    lessons: [
      "Bij crypto-cases: verifieer eerst de jurisdictie van je prospect — UK-, SG- en CA-prospects vallen vaak buiten het programma.",
      "Revenue share modellen (Bitvavo) leveren meer uit dan eenmalige bonussen mits prospects actief handelen.",
      "Stablecoin-aankopen worden vaak uitgesloten van kwalificatie. Coach je prospect op fiat → BTC/ETH route.",
    ],
  },
  {
    id: "betalingen",
    number: 4,
    sector: "Betalingen & BNPL",
    iconName: "credit-card",
    accent: "text-emerald-400 border-emerald-500/30",
    principle:
      "Scherpe dichotomie tussen consumenten-wallets (£10 micro-bonussen voor viraliteit) en B2B-gateways (tot $250 per zakelijk account met €30.000+ transactie-eisen). Enterprise BNPL-providers werken integratie-first en hebben nauwelijks publieke P2P programma's.",
    metrics: [
      { label: "B2C bonus", value: "£10 – $100" },
      { label: "B2B bonus", value: "£100 – $250" },
      { label: "B2B volume-eis", value: "$30.000+" },
      { label: "Geen actief programma", value: "13/22" },
    ],
    caseStudies: [
      {
        name: "Payoneer — $250 / $30.000",
        insight:
          "Hoge beloning, hoge drempel: nieuw zakelijk account moet $30.000 aan in-aanmerking-komende uitgaande transacties verwerken binnen 150 dagen. Alleen serieuze freelancers en MKB's kwalificeren.",
      },
      {
        name: "SumUp — Hybride model",
        insight:
          "B2C: £10 na 3 in-store betalingen. B2B: €5.000 voor 30 merchants in 60 dagen — gestaffeld om kwaliteit te garanderen via €500 transactie-minimum per merchant.",
      },
      {
        name: "Adyen / Buckaroo — Geen P2P",
        insight:
          "Enterprise gateways doen RFP's en SLA's. Geen viraliteit, geen referral links. Acquisitie verloopt 100% via accountmanagers — niet geschikt voor VVC-plaatsing.",
      },
    ],
    lessons: [
      "Filter Adyen, Buckaroo, MultiSafepay, Pay.nl en BNPL-merchants uit je targets — geen P2P kanaal beschikbaar.",
      "Payoneer-prospects moeten écht internationaal MKB zijn met aantoonbaar transactie-volume.",
      "SumUp B2B affiliate is een eigen carrière-pad: 30 merchants leveren €5.000, niet een snelle €10.",
    ],
  },
  {
    id: "telecom",
    number: 5,
    sector: "Telecom",
    iconName: "antenna",
    accent: "text-cyan-400 border-cyan-500/30",
    principle:
      "Verzadigde markt waarin groei = churn. Europese providers verschuiven van cash-bonussen naar structurele ecosysteem-loyaliteit (Odido's Klantvoordeel) terwijl Amerikaanse providers (T-Mobile) nog steeds agressief cash hanteren tot $500/jaar.",
    metrics: [
      { label: "NL/UK bonusrange", value: "£25 – €50" },
      { label: "US (T-Mobile)", value: "$50 – $100/lijn" },
      { label: "Jaarlimiet US", value: "$500" },
      { label: "Vouchers", value: "Amazon UK, PayPal" },
    ],
    caseStudies: [
      {
        name: "KPN — €50 × max 2/jaar",
        insight:
          "Maandelijks opzegbare contracten zijn uitgesloten — KPN beschermt zich tegen quick-flip referrals. Maximaal 2 per jaar maximaliseert opbrengst op €100.",
      },
      {
        name: "Odido — Klantvoordeel i.p.v. cash",
        insight:
          "Geen P2P bonus. In plaats daarvan: bestaande klanten krijgen vaste kortingen + gratis data bij koppeling van meerdere abonnementen op één adres. Lock-in is sterker dan cash.",
      },
      {
        name: "T-Mobile US — $50-$100/lijn",
        insight:
          "Nummerbehoud (port-in) op postpaid plan vereist; tot $500/jaar voor verwijzer. Agressief Amerikaans model dat in Europa amper voorkomt.",
      },
    ],
    lessons: [
      "Telecom prospects moeten serieuze switch-intent hebben — niet 'misschien'. Maandelijkse opzegbaarheid blokkeert vaak uitbetaling.",
      "Odido is geen P2P case maar wel een referentiepunt: als prospect al een lopend Odido-pakket heeft, is overstap duur.",
      "Voor B2B telecom (EE business £50): kandidaten met een aangetoonde 30+ dagen retentie kwalificeren — coach hier proactief op.",
    ],
  },
  {
    id: "gig",
    number: 6,
    sector: "Gig Economy & Platforms",
    iconName: "users",
    accent: "text-purple-400 border-purple-500/30",
    principle:
      "Tweezijdige markten waarderen aanbod (hosts/dienstverleners) ordes van grootte hoger dan vraag (gasten/gebruikers). Airbnb betaalt $105–$900 voor een nieuwe host, maar slechts $50 voor experiences. Ecosysteem-krediet (Grover Bucks) houdt acquisitiebudget binnen het platform.",
    metrics: [
      { label: "Airbnb host bonus", value: "$105 – $900" },
      { label: "Airbnb experiences", value: "$50" },
      { label: "Reserveringsdrempel", value: "$100 / 180 dgn" },
      { label: "Grover krediet", value: "€30 intern" },
    ],
    caseStudies: [
      {
        name: "Airbnb — Asymmetrische waardering",
        insight:
          "Nieuwe 'entire home' host levert $105–$900 afhankelijk van locatie. Aanbrengen van een nieuwe gast is verwaarloosbaar. Hosting is schaars, vraag is overvloedig.",
      },
      {
        name: "Grover Bucks — Closed loop",
        insight:
          "$30/€30 wordt uitsluitend als intern krediet uitgekeerd (max 20 per abonnement per maand). Acquisitie-kapitaal blijft binnen het platform en verhoogt retentie.",
      },
      {
        name: "Uber — In-app rittegoed",
        insight:
          "Geen cash, alleen rittegoed na de eerste afgerekende rit. Wrijvingsloze viraliteit, en de waarde wordt direct ingelost binnen het platform.",
      },
    ],
    lessons: [
      "Voor Airbnb: target woningeigenaren of property managers — niet reizigers.",
      "Grover-prospects krijgen 1 maand gratis maar uitbetaling is intern krediet. Communiceer dit helder vóór de plaatsing.",
      "Veel platforms in deze sector (Fiverr, Gearbooker, Kamernet) hebben geen actief programma — niet inzetten op deze prospects.",
    ],
  },
  {
    id: "hr",
    number: 7,
    sector: "HR & Flex-werk",
    iconName: "briefcase",
    accent: "text-rose-400 border-rose-500/30",
    principle:
      "Hoogvolume 'war for talent'. Grote spelers (Adecco) hanteren tot €500 per geplaatste kandidaat in logistiek, maar pas na 3 maanden actief dienstverband zonder verzuim. Veel platforms in dit segment hebben P2P bonussen geschrapt ten gunste van permanente arbeidsvoorwaarden als value-prop.",
    metrics: [
      { label: "Adecco NL/DE", value: "Tot €500" },
      { label: "Adecco UK", value: "£50 voucher" },
      { label: "Retentievereiste", value: "3 mnd / 8 wk" },
      { label: "Actief in NL flex", value: "1/15" },
    ],
    caseStudies: [
      {
        name: "Adecco — €500 logistiek",
        insight:
          "Massale werving voor Amazon distributiecentra (CGN9, DTM8). Tot €500 maar pas na 3 maanden onafgebroken dienstverband zonder ongeoorloofd verzuim. Strenge eisen filteren no-shows.",
      },
      {
        name: "Temper / YoungOnes — Geen vaste bonus",
        insight:
          "Marketing-focus ligt op €20/u bruto, ingebouwde verzekeringen, pensioenopbouw en BTW/KVK-ontzorging — niet op eenmalige aanmeldbonus.",
      },
      {
        name: "Youbahn → Timing",
        insight:
          "Volledig opgenomen in Timing per november 2024. Vacatures gemigreerd; aparte bonussen niet meer van toepassing. Belangrijke status-check voor wervers.",
      },
    ],
    lessons: [
      "Adecco-plaatsingen vereisen actieve opvolging gedurende drie maanden. Plan retentie-checkins.",
      "Voor NL flex-platforms (Temper, YoungOnes, Maqqie) is er geen P2P bonus. Verkoopargument moet de arbeidsvoorwaarden zijn.",
      "Verifieer overgangen (zoals Youbahn → Timing) voordat je een prospect op een verlaten platform plaatst.",
    ],
  },
  {
    id: "factoring",
    number: 8,
    sector: "Factoring & Trade Finance",
    iconName: "trending-up",
    accent: "text-magenta border-magenta/40",
    principle:
      "Hyper-gespecialiseerd B2B-segment. Geen virale links, wel diepe broker-/affiliate-netwerken met juridisch zware KYC/AML protocollen. Per dossier kan de commissie €1.631+ bedragen — mits het aangebrachte bedrijf tienduizenden euro's aan factuurvolume realiseert.",
    metrics: [
      { label: "Finqle commissie", value: "€735 – €1.631" },
      { label: "Aantal partners-only", value: "5/22" },
      { label: "KYC/AML vereist", value: "100%" },
      { label: "Acquisitiekanaal", value: "Broker portals" },
    ],
    caseStudies: [
      {
        name: "Finqle (NL/UK) — €1.631 per dossier",
        insight:
          "Hoogwaardig affiliate model voor technologie- en integratiepartners. Bedragen variëren van €735 tot €1.631 per actieve klant na strenge KYC.",
      },
      {
        name: "Sonovate — Deal-flow %",
        insight:
          "Specifiek gericht op recruitment bureaus die hun freelance-portefeuilles aanbrengen. 'Partners' ontvangen percentage op gerealiseerd kredietvolume.",
      },
      {
        name: "Bibby / Kriya — Introducer netwerk",
        insight:
          "Commissies per gesloten MKB-deal via accountancykantoren en consultancybedrijven. Géén open programma voor particulieren.",
      },
    ],
    lessons: [
      "Factoring is alleen geschikt als jij een directe relatie hebt met MKB-financieel verantwoordelijken — niet voor cold outreach.",
      "Commissies in deze sector zijn de hoogste van de hele matrix, maar vereisen een formele partner-status met VVC.",
      "Alle andere factoringspelers (Bibby, Hitachi, Working Capital) werken via brokers — niet via P2P.",
    ],
  },
]

/* ─── Strategische conclusies uit sectie 10 van het onderzoek ─────── */

export interface StrategicTakeaway {
  title: string
  body: string
}

export const strategicTakeaways: StrategicTakeaway[] = [
  {
    title: "Van naakte acquisitie naar geverifieerde retentie",
    body: "Eenmalige bonussen zijn inefficiënt en fraudegevoelig. Bedrijven knippen beloningen op in micro-transacties (Bunq, Revolut) of transformeren ze naar interne credits (Grover Bucks). Het marketingbudget vloeit terug in de eigen omzet en vergroot platformbetrokkenheid.",
  },
  {
    title: "B2B = professionele broker-netwerken",
    body: "SumUp, GoCardless, Finqle en Sonovate evolueren naar formele affiliate-netwerken. Een particuliere klant is blij met £10 PayPal, maar B2B programma's draaien pas break-even bij €1.500+ payouts na tienduizenden euro's aan factuurvolume.",
  },
  {
    title: "Regulering is permanent",
    body: "FCA, lokale toezichthouders en compliance-herzieningen pauzeren steeds vaker programma's in crypto en Web3. Wie de balans vindt tussen frictieloze peer-to-peer bonus en strenge wetgeving, wint op de lange termijn.",
  },
]
