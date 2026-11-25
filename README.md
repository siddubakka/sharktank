# AgentKart

> **Verified AI agents. Try before you buy.**
> The trusted marketplace for Indian small businesses — sandbox-tested, permission-audited, and priced strictly per run.

AgentKart is a marketplace where small businesses discover, trial, and pay-per-run AI agents with full transparency. Every listing carries a public **report card**, explicit **permission labels**, and a free **sandbox** so buyers see an agent work before a single rupee moves.

Built from the AgentKart investor deck (trust deficit → marketplace → execution flow → audit → differentiation → unit economics → roadmap/ask).

---

## Why it exists

Indian SMBs can't trust AI agents:

| Friction | The problem |
|---|---|
| **Unverified performance** | Stars and reviews hide real task failures |
| **Data exposure** | Zero visibility into what business files an agent touches |
| **Upfront commitment** | No way to test before spending money |

AgentKart replaces guesswork with evidence — every listing ships with a benchmark score, an audit trail, and a free trial on sample data.

## How it works

1. **List** — seller uploads an agent with sample tasks and declares permission labels.
2. **Test** — an automated test bench scores accuracy, reliability, and latency (≥ 85% accuracy = verified badge).
3. **Try** — buyers run it safely in the sandbox on sample data, watching a live audit trail.
4. **Pay per run** — pay strictly for verified execution runs via UPI. No subscription.

## Features

- **Landing page** — the full deck narrative: trust deficit, marketplace, execution flow, public report card, differentiation table, unit economics, roadmap & ask.
- **Marketplace** — 10 verified agents in the GST/compliance niche, with live search, category filter, and sort (accuracy / price / runs).
- **Agent detail** — public report card (accuracy, reliability, speed, cost), permission labels, benchmark suites, and sample tasks.
- **Sandbox runner** — free, audited trial runs. Every permission grant/denial streams into a live audit trail, then the output.
- **Pay-per-run checkout** — simulated UPI flow: VPA → payment intent → paid execution → receipt, with a full ledger entry.
- **Public run ledger** — every sandbox and paid run recorded with audit metadata (the compounding data flywheel).
- **Seller flow** — submit an agent to the test bench, payout calculator, and test-bench specs.

## Design language

**Paper & Ink** — warm bone paper, editorial serif display, grotesque body.

- **Maroon `#6d1a2e`** — primary action & emphasis
- **Pine dark green `#17392e`** — trust, verification, audit surfaces
- **Brass gold `#b48a3c`** — highlight on dark (used sparingly)
- **Bone `#f7f3ec` / cream `#fffdf8`** — paper background
- Fraunces (display serif) · Geist (sans + mono) · Noto Sans Devanagari
- Paper grain texture, scroll-reveal, verified-agents ticker

## Tech stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS 4** · **shadcn/ui** (radix-nova style) · **lucide-react**
- **JSON-file store** (`.data/db.json`) for runs, payments, and listings — zero setup, survives restarts
- Simulated sandbox engine + simulated UPI checkout (no gateway key needed for the demo)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

> **Note:** `scripts/check-natives.js` and `scripts/preload-oxide.js` are local helpers that guard against corrupted native bindings during the Tailwind/Turbopack build on slow-synced (e.g. OneDrive) filesystems. They are not required on a clean install.

## Project structure

```
src/
├── app/
│   ├── page.tsx                 # Landing page (deck narrative, sections 01–07)
│   ├── marketplace/page.tsx     # Catalog with search / filter / sort
│   ├── agents/[slug]/page.tsx   # Agent detail + sandbox (SSG per agent)
│   ├── sell/page.tsx            # Seller listing flow
│   ├── runs/page.tsx            # Public run ledger
│   └── api/                     # agents, runs, checkout, listings
├── components/                  # header, footer, agent-card, sandbox-runner, checkout-dialog, …
└── lib/
    ├── agents.ts                # 10-agent seed catalog
    ├── sandbox.ts               # audited execution engine
    ├── store.ts                 # JSON-file persistence
    └── types.ts                 # shared domain types
```

## Roadmap (from the deck)

- **Phase 1 — MVP:** marketplace, sandbox, tested agents ✅
- **Phase 2 — Pilot:** real SMB rollout with 20 small businesses
- **Phase 3 — Scale:** agent chaining, more niches, seller analytics

---

*Demo project. All runs, payments, and listings are simulated and stored locally.*
