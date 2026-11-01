export interface JobPosting {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  sector: string;
  domain: string;
  type: string;
  contractOption: string;
  duration: string;
  compensation: string;
  compensationDetail: string;
  location: string;
  factoringAvailable: boolean;
  experience: string;
  description: string;
  tasks: string[];
  requirements: string[];
  skills: string[];
}

export const DJOBBA_VACANCIES: JobPosting[] = [
  {
    "id": "vac_ir_01",
    "code": "01/13",
    "title": "Investor Relations Manager",
    "subtitle": "Corporate / Pre-IPO • Financieel",
    "sector": "Financieel",
    "domain": "Corporate / Pre-IPO",
    "type": "VAST / HYBRIDE",
    "contractOption": "32–40 uur per week | ZZP/freelance of vast contract",
    "duration": "32–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + succesfee",
    "compensationDetail": "Salaris in overleg + succesfee over elk aangebracht en gecontracteerd investeringsvolume",
    "location": "100% remote (reisbereidheid voor internationale roadshows)",
    "factoringAvailable": true,
    "experience": "5+ jaar corporate finance, private equity, venture capital of IR",
    "description": "Ter voorbereiding op een internationale beursnotering en meerdere kapitaalrondes zoeken wij een Investor Relations Manager. Je bent het vaste aanspreekpunt richting de financiële markt en onderhoudt relaties met institutionele beleggers, family offices en strategische co-investeerders.",
    "tasks": [
      "Werven en onboarden van institutionele investeerders en kapitaalverstrekkers",
      "Regisseren van de internationale IR-roadshow en het bookbuilding-proces",
      "Presenteren van groeimodellen, kwartaalcijfers en IFRS-rapportage aan investeringscomités",
      "Schakelen met corporate finance-adviseurs, toezichthouders, juristen en auditors"
    ],
    "requirements": [
      "HBO/WO in finance, economie of bedrijfskunde, of gelijkwaardige ervaring",
      "Aantoonbaar netwerk binnen institutioneel kapitaal, family offices en private equity",
      "Nederlands en Engels op boardroomniveau",
      "Ervaring met IFRS, kapitaalmarkttransacties en pre-IPO-trajecten"
    ],
    "skills": [
      "Investor Relations",
      "Corporate Finance",
      "Pre-IPO",
      "IFRS",
      "Private Equity",
      "Bookbuilding"
    ]
  },
  {
    "id": "vac_cmp_02",
    "code": "02/13",
    "title": "Campagnemanager (Growth & Crowdfunding)",
    "subtitle": "Growth & crowdfunding • Marketing",
    "sector": "Marketing",
    "domain": "Growth & crowdfunding",
    "type": "VAST / HYBRIDE",
    "contractOption": "32–40 uur per week | ZZP/freelance of vast contract",
    "duration": "32–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + campagnevergoeding",
    "compensationDetail": "Salaris in overleg + vergoeding per geactiveerd B2B-lid en voltooide financieringscampagne",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "3+ jaar growth marketing, B2B of crowdfunding",
    "description": "Je bent verantwoordelijk voor de B2B-wervingscampagnes en co-financieringstrajecten voor nieuwe hardware- en vastgoedprojecten. Je bouwt datagedreven funnels die op Europese schaal converteren.",
    "tasks": [
      "Ontwerpen, lanceren en optimaliseren van crowdfunding- en ledenwervingscampagnes",
      "Uitrollen van multi-channel campagnes (LinkedIn, Meta, Google, programmatic, e-mail) voor Europese wervingshubs",
      "Continueren van A/B-tests op landingspagina's, advertenties en onboarding-flows",
      "Monitoren van campagnedata, acquisitiekosten (CAC) en funnelconversie"
    ],
    "requirements": [
      "HBO/WO in marketing, communicatie of data-analyse, of gelijkwaardige ervaring",
      "Minimaal 3 jaar ervaring met B2B performance marketing, leadgeneratie of grootschalige crowdfundingcampagnes",
      "Sterk in zowel copywriting als data-analyse",
      "Ondernemend en resultaatgericht"
    ],
    "skills": [
      "Growth Marketing",
      "B2B Funnels",
      "Crowdfunding",
      "Performance Ads",
      "A/B Testing",
      "CAC Optimalisatie"
    ]
  },
  {
    "id": "vac_spm_03",
    "code": "03/13",
    "title": "Sponsor- & Partnership Manager",
    "subtitle": "Media, tech, events • Sales",
    "sector": "Sales",
    "domain": "Media, tech, events",
    "type": "ZZP / INTERIM GIG",
    "contractOption": "24–40 uur per week | ZZP/freelance of vast contract",
    "duration": "24–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + dealvergoeding",
    "compensationDetail": "Salaris in overleg + percentage van elke gecontracteerde sponsor- of partnership-deal",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "3+ jaar B2B-partnerships, media of sponsoring",
    "description": "Je sluit commerciële samenwerkingen, sponsorcontracten en strategische allianties voor de media-, compute- en community-platforms van de groep.",
    "tasks": [
      "Binnenhalen van B2B-sponsors, adverteerders en mediapartners voor evenementen, platforms en hubs",
      "Initiëren van samenwerkingen met hardwareleveranciers, vastgoedpartijen en softwarelicentiepartners",
      "Ontwikkelen van sponsorpakketten en joint-venture-voorstellen",
      "Voeren van onderhandelingen van eerste pitch tot getekend contract"
    ],
    "requirements": [
      "HBO/WO, of vergelijkbare werkervaring",
      "Ervaring in B2B-sales, sponsorwerving, media-exploitatie of strategic partnerships",
      "Commercieel sterk, representatief en zelfsturend"
    ],
    "skills": [
      "Strategic Partnerships",
      "B2B Sponsoring",
      "Contractonderhandeling",
      "Joint Ventures",
      "Media Exploitatie"
    ]
  },
  {
    "id": "vac_esc_04",
    "code": "04/13",
    "title": "Executive Search Consultant",
    "subtitle": "Boardroom & C-level • Administratief",
    "sector": "Administratief",
    "domain": "Boardroom & C-level",
    "type": "VAST / HYBRIDE",
    "contractOption": "32–40 uur per week | ZZP/freelance of vast contract",
    "duration": "32–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + plaatsingsfee",
    "compensationDetail": "Salaris in overleg + plaatsingsfee per geplaatste executive gebaseerd op jaarsalaris",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "5+ jaar executive search of boardroom consulting",
    "description": "Je werft boardroomposities voor de eigen holdings en voor opdrachtgevers van de B2B recruitment-marketplace. Je opereert op strategisch niveau en bent verantwoordelijk voor het vinden en binden van bestuurders en toezichthouders.",
    "tasks": [
      "Werven van statutaire directieleden, non-executive directors (RvC) en country managers",
      "Plaatsen van C-level executives (CIO, CTO, Chief AI Officer, VP Engineering) bij externe opdrachtgevers",
      "Begeleiden van het volledige search-, selectie- en benoemingsproces op boardroomniveau"
    ],
    "requirements": [
      "HBO/WO, of gedegen praktijkervaring",
      "Minimaal 5 jaar ervaring bij een executive search-bureau of als senior headhunter voor C-level posities",
      "Gesprekspartner voor CEO's, commissarissen en investeringsmaatschappijen",
      "Nederlands en Engels vloeiend"
    ],
    "skills": [
      "Executive Search",
      "Boardroom Consulting",
      "C-Level Recruitment",
      "Directie & RvC",
      "Succession Planning"
    ]
  },
  {
    "id": "vac_rec_05",
    "code": "05/13",
    "title": "360° Recruiter (IT-Detachering)",
    "subtitle": "IT-detachering • Sales",
    "sector": "Sales",
    "domain": "IT-detachering",
    "type": "VAST / HYBRIDE",
    "contractOption": "24–40 uur per week | ZZP/freelance of vast contract",
    "duration": "24–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + margedeling",
    "compensationDetail": "Salaris in overleg + margedeling over gerealiseerde detacheringsomzet",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "2+ jaar 360°-recruitment of IT-detachering",
    "description": "Je beheert zowel de klantkant (IT-detacheringsopdrachten) als de kandidatenkant (selectie en plaatsing van internationale specialisten die via de eigen relocatie-tak instromen).",
    "tasks": [
      "Binnenhalen van B2B IT-detacheringscontracten en aanvragen",
      "Matchen van vooraf geverifieerde kennismigranten en IT-professionals aan jouw klantportefeuille",
      "Voeren van tariefonderhandelingen, begeleiden van sollicitatiegesprekken en afsluiten van contracten via het recruitment-systeem"
    ],
    "requirements": [
      "HBO/WO, of vergelijkbare ervaring",
      "Ervaring als 360°-recruiter, accountmanager of consultant in IT-, engineering- of tech-detachering",
      "Commercieel gedreven, proactief en relatiegericht",
      "Ervaring met moderne recruitmentsoftware en matchingtools"
    ],
    "skills": [
      "360 Recruitment",
      "IT Detachering",
      "Tariefonderhandeling",
      "Account Management",
      "Kandidaat Matching"
    ]
  },
  {
    "id": "vac_thh_06",
    "code": "06/13",
    "title": "Tech Headhunter (AI & Engineering)",
    "subtitle": "AI & engineering • IT",
    "sector": "IT",
    "domain": "AI & engineering",
    "type": "ZZP / INTERIM GIG",
    "contractOption": "24–40 uur per week | ZZP/freelance of vast contract",
    "duration": "24–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + succesfee",
    "compensationDetail": "Salaris in overleg + succesfee per geplaatste en geverifieerde tech-specialist",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "Aantoonbare ervaring in tech-sourcing of direct search",
    "description": "Je spoort wereldwijd AI-engineers, systeemarchitecten en senior developers op voor externe B2B-klanten en de eigen R&D-, AI- en hardware-afdelingen. Voor geplaatste kandidaten regelt de groep ook visum en huisvesting.",
    "tasks": [
      "Actief sourcen via GitHub, LinkedIn Recruiter, StackOverflow en eigen sourcing-tools",
      "Overtuigen van internationaal talent met het totaalpakket: baan, visum, relocatie en huisvesting",
      "Begeleiden van kandidaten door technische assessments tot contractondertekening"
    ],
    "requirements": [
      "HBO/WO, of vergelijkbare praktijkervaring",
      "Ervaring met het sourcen van schaarse developers en engineers",
      "Bekend met Python, Rust, Kubernetes en LLM-architecturen",
      "Vloeiend Engels, comfortabel met kandidaten in verschillende tijdzones"
    ],
    "skills": [
      "Direct Search",
      "Tech Sourcing",
      "AI Engineers",
      "Python / Rust",
      "GitHub Sourcing",
      "Relocatie"
    ]
  },
  {
    "id": "vac_htc_07",
    "code": "07/13",
    "title": "High-Ticket Closer (B2B-Conversie)",
    "subtitle": "B2B-conversie • Sales",
    "sector": "Sales",
    "domain": "B2B-conversie",
    "type": "ZZP / INTERIM GIG",
    "contractOption": "24–40 uur per week | ZZP/freelance of vast contract",
    "duration": "24–40 uur/week (flexibele agenda)",
    "compensation": "Salaris + commissie",
    "compensationDetail": "Salaris in overleg + commissie per gecontracteerde B2B-transactie",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "Aantoonbaar trackrecord in high-ticket closing",
    "description": "Je voert de eindgesprekken met warme, voorgekwalificeerde zakelijke leads en sluit de deals voor de gecombineerde proposities (compute, digitale infrastructuur, zakelijk vastgoed). Koude acquisitie is geen onderdeel van de functie.",
    "tasks": [
      "Voeren van consultatieve videocalls en telefoongesprekken met zakelijke beslissers",
      "Toelichten van de modulaire B2B-pakketten en het rendement van het ecosysteem",
      "Zorgen dat overeenkomsten tijdens of direct na het gesprek digitaal worden ondertekend",
      "Afstemmen met marketing en sales over leadkwaliteit"
    ],
    "requirements": [
      "HBO/WO, of gelijkwaardige saleservaring",
      "Trackrecord in consultative selling en high-ticket closing (bij voorkeur B2B SaaS, finance, vastgoed of consultancy)",
      "Sterk in actief luisteren, bezwaren behandelen en vertrouwen opbouwen",
      "Resultaatgericht en gedisciplineerd"
    ],
    "skills": [
      "High-Ticket Closing",
      "Consultative Selling",
      "Deal Sluiting",
      "Bezwaarhantering",
      "B2B Proposities"
    ]
  },
  {
    "id": "vac_cag_08",
    "code": "08/13",
    "title": "Commercieel Agent (Compute & Huisvesting)",
    "subtitle": "Compute & huisvesting • Sales",
    "sector": "Sales",
    "domain": "Compute & huisvesting",
    "type": "ZZP / INTERIM GIG",
    "contractOption": "24–40 uur per week | ZZP/freelance of vast contract",
    "duration": "24–40 uur/week | Flexibel",
    "compensation": "Salaris + doorlopende courtage",
    "compensationDetail": "Salaris in overleg + doorlopende courtage over contractverlengingen van jouw portefeuille",
    "location": "100% remote (eigen regio-indeling mogelijk)",
    "factoringAvailable": true,
    "experience": "Zelfstandige B2B-sales of agentuurervaring",
    "description": "Je vertegenwoordigt de commerciële eindproducten van de operationele clusters in de zakelijke markt: GPU-rekenkracht, zakelijke account-infrastructuur en short-/long-stay huisvesting voor expats en projectteams.",
    "tasks": [
      "Verkopen van GPU-servers en digitale infrastructuur aan AI-bedrijven, mediabureaus en tech-ondernemingen",
      "Bemiddelen in B2B-huisvestingscontracten voor bedrijven die internationale specialisten huisvesten",
      "Opbouwen en beheren van een eigen klantenkring met meerjarige afnamecontracten"
    ],
    "requirements": [
      "HBO/WO, of gedegen commerciële achtergrond",
      "Sterk zakelijk netwerk in tech, media of corporate vastgoed",
      "Zelfstandig, plant eigen agenda, bouwt graag aan terugkerende omzet"
    ],
    "skills": [
      "GPU Compute",
      "Corporate Housing",
      "Cloud Infrastructuur",
      "B2B Agentuur",
      "Recurring Revenue"
    ]
  },
  {
    "id": "vac_bsr_09",
    "code": "09/13",
    "title": "B2B Sales Representative (SaaS & Ecosysteem)",
    "subtitle": "SaaS & ecosysteem • Sales",
    "sector": "Sales",
    "domain": "SaaS & ecosysteem",
    "type": "VAST / HYBRIDE",
    "contractOption": "32–40 uur per week | ZZP/freelance of vast contract",
    "duration": "32–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + commissie",
    "compensationDetail": "Salaris in overleg + commissie per gesloten B2B-deal plus maandelijkse staffelbonus",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "Junior / Medior / Senior",
    "description": "Je vult de commerciële pijplijn: je vertegenwoordigt de B2B SaaS-software (CRM, AI-outreach, workflow-automatisering) en de bredere ecosysteem-proposities, opent deuren bij nieuwe zakelijke klanten en zet contacten om in verkoopkansen en getekende orders.",
    "tasks": [
      "Uitvoeren van gepersonaliseerde outbound campagnes via telefoon, videomessaging, e-mail en LinkedIn",
      "Geven van online productdemo's aan MKB- en enterprise-bedrijven",
      "Kwalificeren van zakelijke partijen en beheren van de eigen salesfunnel in samenwerking met de closers"
    ],
    "requirements": [
      "HBO/WO, of sterke aantoonbare saleservaring",
      "Communicatief vaardig, bestand tegen afwijzing, energie van nieuwe contacten",
      "Affiniteit met B2B SaaS, AI-tools en moderne salesmethodieken"
    ],
    "skills": [
      "B2B SaaS Sales",
      "Outbound Prospecting",
      "Product Demo's",
      "Pipeline Management",
      "CRMos"
    ]
  },
  {
    "id": "vac_ssc_10",
    "code": "10/13",
    "title": "Senior Strategy Consultant (AI & M&A)",
    "subtitle": "AI, werkkapitaal, M&A • Financieel",
    "sector": "Financieel",
    "domain": "AI, werkkapitaal, M&A",
    "type": "VAST / HYBRIDE",
    "contractOption": "32–40 uur per week | ZZP/freelance of vast contract",
    "duration": "32–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + projectfee",
    "compensationDetail": "Salaris in overleg + projectfee over de contractwaarde van elk enterprise-traject of M&A transactie",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "7+ jaar strategy consulting, M&A of enterprise IT",
    "description": "Je adviseert op directie- en C-level over AI-automatisering, werkkapitaaloptimalisatie en het begeleiden van fusies, overnames en integraties binnen het ecosysteem.",
    "tasks": [
      "Adviseren van middelgrote en grote ondernemingen over AI-executiemotoren, B2B clearing-API's en werkstroomautomatisering",
      "Identificeren, beoordelen (due diligence) en begeleiden van acquisities van tech-startups, softwarebedrijven en licentiepartners",
      "Opstellen van business cases op boardroomniveau"
    ],
    "requirements": [
      "WO-master in business, finance, economie of IT, of gelijkwaardig topniveau door ervaring",
      "Minimaal 7 jaar ervaring als strategy consultant, M&A-adviseur of enterprise transformation manager",
      "Diepgaand financieel inzicht (kasstroommodellen, waarderingen, WCO) en begrip van AI- en cloudarchitecturen"
    ],
    "skills": [
      "Strategy Consulting",
      "M&A Advisory",
      "Due Diligence",
      "Werkkapitaaloptimalisatie",
      "AI Transformatie"
    ]
  },
  {
    "id": "vac_sub_11",
    "code": "11/13",
    "title": "Subsidieconsultant (R&D & Vastgoed)",
    "subtitle": "R&D, AI, duurzaamheid • Administratief",
    "sector": "Administratief",
    "domain": "R&D, AI, duurzaamheid",
    "type": "ZZP / INTERIM GIG",
    "contractOption": "24–40 uur per week | ZZP/freelance of vast contract",
    "duration": "24–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + succespercentage",
    "compensationDetail": "Salaris in overleg + succespercentage over elk daadwerkelijk toegekend subsidiebedrag",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "3+ jaar als subsidieadviseur of grant writer",
    "description": "Binnen het ecosysteem wordt geïnvesteerd in eigen R&D en duurzame fysieke infrastructuur. Je haalt nationale, Britse en Europese innovatiesubsidies, tech-grants en fiscale regelingen binnen.",
    "tasks": [
      "In kaart brengen van relevante regelingen (WBSO, MIT, Horizon Europe, UK Innovate, duurzaamheidsfondsen)",
      "Opstellen en indienen van technisch en financieel onderbouwde aanvragen in samenwerking met developers, AI-architecten en vastgoedmanagers",
      "Benutten van fiscale voordelen rond kennismigranten en Europese innovatiehubs",
      "Verzorgen van projectadministratie en eindverantwoording conform UK GAAP en IFRS"
    ],
    "requirements": [
      "HBO/WO, of vergelijkbare ervaring",
      "Aantoonbare ervaring als subsidieconsultant met sterk slagingspercentage, bij voorkeur op het snijvlak van IT, AI, innovatie en duurzaamheid",
      "Sterk in het vertalen van technische projecten naar beoordelingscriteria"
    ],
    "skills": [
      "WBSO Subsidies",
      "Horizon Europe",
      "MIT Regeling",
      "Innovatiefinanciering",
      "Grant Writing"
    ]
  },
  {
    "id": "vac_rel_12",
    "code": "12/13",
    "title": "Recruitment Consultant (Relocatie & Talent)",
    "subtitle": "Internationaal talent • Sociaal Werk",
    "sector": "Sociaal Werk",
    "domain": "Internationaal talent",
    "type": "VAST / HYBRIDE",
    "contractOption": "24–40 uur per week | ZZP/freelance of vast contract",
    "duration": "24–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + plaatsingsfee",
    "compensationDetail": "Salaris in overleg + plaatsingsfee per succesvolle gecontracteerde B2B-plaatsing",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "1+ jaar recruitment of HR",
    "description": "Je bent verantwoordelijk voor de kandidaatkant: je begeleidt gekwalificeerde kennismigranten door het verificatieproces en matcht hen aan openstaande B2B-vacatures op het platform.",
    "tasks": [
      "Voeren van diepte-interviews en begeleiden van kandidaten door screening en verificatie",
      "Matchen van gevalideerde IT-, engineering- en tech-specialisten aan openstaande vacatures via het ATS",
      "Coördineren van de digitale overdracht na plaatsing, zodat zusterentiteiten visum, huisvesting en financiële onboarding in gang zetten"
    ],
    "requirements": [
      "HBO/WO, of vergelijkbare praktijkervaring",
      "Mensgericht en organisatorisch sterk",
      "Gestructureerd, vaardig met moderne HR-software",
      "Vloeiend Nederlands en Engels"
    ],
    "skills": [
      "Relocatie Support",
      "Kandidaat Screening",
      "Kennismigranten",
      "Expat Onboarding",
      "ATS / CRMos"
    ]
  },
  {
    "id": "vac_cfb_13",
    "code": "13/13",
    "title": "Corporate Funding Broker",
    "subtitle": "Hardware & vastgoed • Financieel",
    "sector": "Financieel",
    "domain": "Hardware & vastgoed",
    "type": "ZZP / INTERIM GIG",
    "contractOption": "24–40 uur per week | ZZP/freelance of vast contract",
    "duration": "24–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + bemiddelingsfee",
    "compensationDetail": "Salaris in overleg + bemiddelingscourtage per afgesloten financieringslijn, lease of hypotheek",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "5+ jaar debt advisory, corporate finance of leasing",
    "description": "Je structureert en bemiddelt zakelijke financieringen voor de uitbreiding van GPU-serverclusters, de vastgoedportefeuille en de interne factoring- en werkkapitaalfaciliteiten.",
    "tasks": [
      "Ophalen en structureren van kredietlijnen, equipment lease-constructies en zakelijke vastgoedhypotheken",
      "Bemiddelen bij banken, private debt-fondsen en BaaS/EMI-partners voor factoring- en liquiditeitslijnen",
      "Presenteren van geconsolideerde cijfers (UK GAAP, IFRS) en onderpandstructuren aan kredietcomités"
    ],
    "requirements": [
      "HBO/WO, of gelijkwaardig vakmanschap",
      "Ervaring als zakelijk financieringsadviseur, debt broker, accountmanager grootzakelijk bij een bank of leasing-specialist",
      "Netwerk van kapitaalverstrekkers, leasemaatschappijen, private debt-fondsen en vastgoedfinanciers"
    ],
    "skills": [
      "Debt Advisory",
      "Equipment Lease",
      "Vastgoedfinanciering",
      "Kredietstructurering",
      "IFRS"
    ]
  }
];
