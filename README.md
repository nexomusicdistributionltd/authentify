# Authentify

Identity verification platform built for **Nigeria first** and available worldwide — inspired by Smile ID, Veriff, Sumsub, and Stripe Identity.

## Features

- **Marketing site** with scroll-reveal sections, Nigeria-first product story, coverage map, and commercial pricing
- **Hosted verification flow** — country → document → capture → selfie/liveness → result (demo)
- **Commercial dashboard** — analytics, sessions, API keys, webhooks, org settings
- **Admin panel** — tenants, team, risk flags, system health
- **API docs** — REST endpoints for verifications, NIN/BVN lookups, AML

### Nigeria coverage

NIN, BVN, National ID, Driver's License (FRSC), International Passport, Voter's Card (PVC)

### Global

150+ countries on the same API (Ghana, Kenya, South Africa, US, UK, India, and more)

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- React Router
- Recharts
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Routes

| Path | Description |
|------|-------------|
| `/` | Marketing homepage |
| `/verify` | Live verification demo |
| `/dashboard` | Commercial / business panel |
| `/admin` | Platform admin panel |
| `/docs` | API reference |

## License

Demo / portfolio project. Not affiliated with Smile ID, Veriff, Sumsub, or Stripe.
