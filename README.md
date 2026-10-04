# VVC Platform

Eén schaalbare React-applicatie die de twee oorspronkelijke prototypes
(`app1` = Onboarding Portal, `app2` = Elite Platform) samenbrengt rond de
flow **Login → Onboarding → Dashboard**.

## Quick start

```powershell
npm install
npm run dev
```

De app draait standaard op [http://localhost:3000](http://localhost:3000).

Optionele scripts:

```powershell
npm run build      # type-check + productiebuild
npm run preview    # preview van productiebuild
npm run lint       # ESLint
npm run typecheck  # TypeScript zonder emit
```

## Demo-login

Zonder backend draait de app in mock-modus (zie `.env.example`).
Beschikbare accounts:

- **`sanne@vvc.nl`** / `executie` — Senior Partner
- **`ceo@vvc.nl`** / `ceo` — CEO

## Architectuur

```
vvc-platform/
├── index.html
├── package.json              eenvoudige, deduplicated dependency-set
├── tailwind.config.js        gemerged: bevat brutalist theme + alle animaties
├── vite.config.ts            @ alias → ./src
├── tsconfig.{json,app,node}
├── eslint.config.js
├── postcss.config.js
├── components.json           shadcn-config (config voor toekomstige `npx shadcn add`)
├── .env.example              API-, mock- en Firebase Auth-configuratie
└── src/
    ├── main.tsx              entry: <BrowserRouter> → <AuthProvider> → <App />
    ├── App.tsx               route-tree (login + protected app shell)
    │
    ├── routes/
    │   └── ProtectedRoute.tsx       guard + PublicOnlyRoute (bewaart "from")
    │
    ├── context/
    │   └── AuthContext.tsx          centrale auth state + localStorage hydratatie
    │
    ├── hooks/
    │   ├── useAuth.ts               typed accessor met fail-fast guard
    │   └── use-mobile.ts            breakpoint helper (uit shadcn)
    │
    ├── lib/
    │   ├── config.ts                runtime env-flags (API, auth-provider, Firebase)
    │   ├── firebase.client.ts      Firebase Web SDK-auth initialisatie
    │   ├── utils.ts                 cn() helper
    │   └── api/
    │       ├── client.ts            fetch-wrapper met Authorization-injectie
    │       ├── auth.api.ts          login/me/logout (mock + real)
    │       └── companies.api.ts     companies list/get (mock + real)
    │
    ├── data/
    │   └── companies.ts             "De 126 Bedrijven" dataset (mock fallback)
    │
    ├── types/
    │   └── index.ts                 AuthUser, Company, RouteId, ...
    │
    ├── styles/
    │   └── index.css                @tailwind + brutalist CSS-variabelen + scrollbars + slider
    │
    ├── components/
    │   ├── ui/                      shadcn primitives (53 componenten — niet bewerken)
    │   ├── layout/
    │   │   ├── AppShell.tsx         sidebar + header + outlet (protected)
    │   │   ├── AuthLayout.tsx       login/registreer wrapper
    │   │   ├── Sidebar.tsx          gemerged uit beide apps; gebruikt <NavLink>
    │   │   └── Header.tsx           page-titel afgeleid uit pathname
    │   └── common/
    │       ├── DataCard.tsx         KPI-tegel (dashboard)
    │       ├── SliderControl.tsx    range slider (calculator)
    │       ├── FeedItem.tsx         live executie feed regel
    │       ├── CulturePillar.tsx    "De Brandstof van de Club"
    │       ├── PillarCard.tsx       VVC Groeipad pijler (onboarding)
    │       ├── CompanyCard.tsx      bedrijf in 126-matrix
    │       └── CompanyModal.tsx     case-detail modal
    │
    └── pages/
        ├── auth/
        │   └── Login.tsx
        ├── dashboard/
        │   └── Dashboard.tsx
        ├── onboarding/
        │   ├── Onboarding.tsx       welcome / hero
        │   ├── Companies.tsx        126 bedrijven matrix
        │   └── Academy.tsx          kwaliteitsmethodologie
        ├── analytics/Analytics.tsx
        ├── community/Community.tsx
        ├── prospects/Prospects.tsx
        ├── talenten/Talenten.tsx
        ├── apps/AppDetail.tsx       /apps/:appId
        ├── _shared/PlaceholderPage.tsx
        └── NotFound.tsx
```

## Routes

| Pad                       | Layout      | Bron       |
| ------------------------- | ----------- | ---------- |
| `/login`                  | AuthLayout  | nieuw      |
| `/dashboard`              | AppShell    | app2       |
| `/onboarding`             | AppShell    | app1 hero  |
| `/onboarding/companies`   | AppShell    | app1       |
| `/onboarding/academy`     | AppShell    | app1       |
| `/analytics`              | AppShell    | app2 stub  |
| `/community`              | AppShell    | app2 stub  |
| `/prospects`              | AppShell    | app2 stub  |
| `/talenten`               | AppShell    | app2 stub  |
| `/apps/:appId`            | AppShell    | app2       |
| `*`                       | —           | nieuw      |

Alle protected routes zitten achter `<ProtectedRoute />` en delen
`<AppShell />` (sidebar + header + scroll container). `<PublicOnlyRoute />`
stuurt al-ingelogde users weg van `/login`.

## Auth flow

1. Met `VITE_AUTH_PROVIDER=firebase` herstelt Firebase Auth de sessie; de app
   schrijft het ID-token niet naar `localStorage["vvc.session"]`.
2. Bij mock/API-auth leest `AuthProvider` `localStorage["vvc.session"]`.
   Een ingestelde backend wordt via `GET /auth/me` gevalideerd.
3. `<ProtectedRoute />` redirect ongeauthenticeerden naar `/login` en bewaart
   de gewenste pagina als `state.from`.
4. `LoginPage` roept `login(credentials)` aan; bij succes navigeert het naar
   `state.from?.pathname ?? "/dashboard"`.
5. Sidebar logout-knop roept `logout()` aan en navigeert naar `/login`.

## Firebase development-auth

Gebruik `VITE_AUTH_PROVIDER=firebase` met de publieke Web App-waarden uit
Firebase-project `vvc-dev` in `.env.local` of `.env.development.local`. Schakel
in Firebase Authentication de provider **E-mail/wachtwoord** in voordat
Firebase-accounts kunnen inloggen. Laat `VITE_USE_MOCK=true` staan om tijdens
deze eerste auth-stap de bestaande lokale appdata te behouden. Firebase-rollen
worden gelezen uit de tokenclaim `role`; accounts zonder geldige claim krijgen
de laagste bestaande rol (`talent`). Rollen moeten door een vertrouwde
serveromgeving worden toegekend. Deze auth-koppeling migreert geen bestaande
databasegegevens; dat vereist eerst een uitleesbare bron en een afgesproken
datamodel en beveiligingsregels.

## API integraties

`src/lib/api/client.ts` is een lichte fetch-wrapper met:

- automatische `Authorization: Bearer …` injectie
- Firebase ID-token-injectie wanneer `VITE_AUTH_PROVIDER=firebase`
- centrale `ApiError` met status + body
- relatieve URL als er geen base is gezet (handig voor dev-proxy)

Endpoints zijn georganiseerd per resource in `src/lib/api/*.api.ts`. Elk
endpoint controleert `config.useMock` en valt daar terug op lokale data; zet
`VITE_API_BASE_URL` in `.env` om over te schakelen op een backend zonder
verdere code-aanpassingen.

## Theme

De brutalist black/magenta theme uit app2 is canoniek:

- CSS-variabelen → `src/styles/index.css`
- Tailwind extensies (kleuren, animaties) → `tailwind.config.js`
- Magenta accent: `bg-magenta`, `text-magenta`, `shadow-magenta`

Alle shadcn primitives renderen automatisch in deze stijl via de standaard
`hsl(var(--*))` tokens.

## Wat is er gemerged?

| Aspect              | Resultaat                                                                           |
| ------------------- | ----------------------------------------------------------------------------------- |
| Dependencies        | `react-router` en `react-hook-form` volgorde gestabiliseerd; verder identiek.       |
| Theme variabelen    | Brutalist (app2) gekozen. `--radius: 0rem`, magenta primary.                        |
| Tailwind keyframes  | Alle animaties uit app2 + originele uit app1 (`fade-in`).                           |
| UI components       | 53 shadcn primitives bytewise gededupliceerd (waren identiek).                      |
| `Home.tsx`, `App.css` | Verwijderd — was ongebruikte Vite boilerplate.                                    |
| Routing             | Tabs-via-`useState` vervangen door echte `react-router` routes met code-splitting-ready imports. |
| Auth                | Nieuw: centrale `AuthContext` + `<ProtectedRoute />` + login-pagina.                |
| Sidebar             | Gemerged: app2's brutalist look + app1's onboarding-secties (Companies + Academy).  |
| Companies data      | Verplaatst naar `src/data/companies.ts` met `Company` type uit `src/types`.         |
| Toast feedback      | Native `alert()` in CompanyModal vervangen door `sonner` toast.                     |
| Vite plugin         | Niet-essentiële `kimi-plugin-inspect-react` verwijderd uit deps & config.           |

## Development tips

- Voeg een nieuw shadcn-component toe via `npx shadcn@latest add <name>` — de
  `components.json` is al ingesteld op `src/components/ui` met `@/` alias.
- Een nieuwe pagina? Plaats `src/pages/<feature>/<Page>.tsx` en wire 'm in
  `src/App.tsx`. De `AppShell`-layout wordt automatisch toegepast.
- Een nieuwe API resource? Plaats `<resource>.api.ts` in `src/lib/api/` en
  hergebruik `api.get/post/...`.
