# VVC Ecosystem Security Model & Architecture

Dit document beschrijft de architectuur, vertrouwensgrenzen, gegevensstromen en het beveiligingsmodel voor het Verdienende Vrienden Club (VVC) ecosysteem:
- **vvc.works** (Partner Dashboard & Management Portaal)
- **verdienende-vrienden-club-pitchtool** (Pitch Tool & Lead Capture SPA)
- **vvc-webapp** (Platform Portaal)
- **CRMos Bridge** (API & Database Integraties)

---

## 1. Vertrouwensgrenzen & Systeemcomponenten

```
[ Publieke Bezoeker / Pitch Lead ]
             │
             ▼ (HTTPS / Web)
┌──────────────────────────────────────────────────────────┐
│ Client-Side SPA (Vite / React)                           │
│ - verdienende-vrienden-club-pitchtool                    │
│ - vvc.works Dashboard                                    │
│ - vvc-webapp Platform                                    │
└────────────────────────────┬─────────────────────────────┘
                             │ (JWT / Firebase ID Token)
        ┌────────────────────┴────────────────────┐
        ▼                                         ▼
┌────────────────────────┐              ┌────────────────────────┐
│ Google Firebase Auth   │              │ Cloudflare Worker /    │
│ & Cloud Firestore      │              │ Backend API Proxy      │
│ (vvc-dev)              │              │ (crmos.one / API)      │
└────────────────────────┘              └───────────┬────────────┘
                                                    │ (Master Secret / Server-only)
                                                    ▼
                                        ┌────────────────────────┐
                                        │ CRMos Core Database    │
                                        │ & Multi-tenant Storage │
                                        └────────────────────────┘
```

---

## 2. Attacker-profielen & Threat Modeling

| Profiel | Omschrijving | Vertrouwensniveau | Primaire Aanvalsvectoren |
| :--- | :--- | :--- | :--- |
| **Profiel 1: Anonieme Buitenstaander** | Niet-geauthenticeerde bezoeker van de pitchtool of openbare website. | Geen (Untrusted) | Inzage broncode, bundle-extractie, form injection, API quota uitputting, misbruik van publieke endpoints. |
| **Profiel 2: Reguliere Partner** | Geauthenticeerde VVC partner ingelogd via Google SSO of email/wachtwoord. | Beperkt (Scoped) | IDOR/BOLA: Pogingen om kandidaten, omzetten of gegevens van andere partners te inspecteren of overschrijven. |
| **Profiel 3: Scoped Tenant / Partner API** | Externe API-integratie (bijv. HubSpot, Spontiva, Boostplug). | Scoped Tenant | Cross-tenant datalekken, privilege escalation voorbij eigen `tenant_id` of bedrijfstags. |
| **Profiel 4: Code & Bundle Lezer** | Iemand die de client JavaScript bundels, sourcemaps of repositories analyseert. | Geen (Adversary) | Zoeken naar hardcoded secrets, Firebase API keys, master tokens, verborgen backdoors en mock-accounts. |

---

## 3. Gevoelige Gegevens (PII & GDPR)

De volgende data-elementen vallen onder strikte vertrouwelijkheid en de AVG / GDPR:
- **Kandidaten:** Voornaam, achternaam, e-mailadres, telefoonnummer, adres/huisnummer, geboortedatum/leeftijd, KVK-nummer, CV-documenten, financiële maand-/jaardoelen en intake-notities.
- **Partners:** Commissiestructuren, bankgegevens, plaatsingsstatistieken, Google UID's en e-mailadressen.
- **Systeemgeheimen:** Master API-tokens, Firebase service-account private keys, Gemini LLM API-keys en webhook handoff secrets.

---

## 4. Kernprincipes & Zero-Trust Secrets Hygiene

1. **Geen Master Secrets in de Frontend:**
   - Geheime API-keys (`crm_live_master_*`, `GEMINI_API_KEY`) mogen **nooit** via `vite.config.ts` of client-side code in browser-bundels terechtkomen.
   - Alle bevoorrechte CRMos API-aanroepen moeten verlopen via een beveiligde serverless proxy (Cloudflare Worker of Firebase Function) die autorisatie controleert alvorens een bevoorrechte sleutel te gebruiken.
2. **Server-Side Multi-Tenancy Isolatie:**
   - Filteren op partner/organisatie (`partnerEmail`, `partnerCode`) moet **altijd** server-side of in Firestore Security Rules gebeuren.
   - De API mag nooit een ongefilterde array teruggeven die client-side in het geheugen wordt gefilterd.
3. **Geen Hardcoded Backdoors of Plaintext Credentials:**
   - Mock-gebruikers en statische inlogcodes mogen uitsluitend in lokale development tests bestaan (niet in productie-builds).
4. **Encryptie & Veilige Opslag:**
   - Persoonsgegevens van kandidaten mogen niet onbeveiligd in de browser `localStorage` worden opgeslagen op gedeelde werkstations.
