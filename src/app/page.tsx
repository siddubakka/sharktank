import Link from "next/link";
import { ArrowRightIcon, ShieldCheckIcon, FlaskConicalIcon, WalletIcon, LanguagesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { AgentCard } from "@/components/agent-card";
import { ReportCardPanel } from "@/components/report-card-panel";
import { PermissionList, PermissionChip, VerifiedBadge } from "@/components/agent-card";
import { AGENTS } from "@/lib/agents";

const TICKER = AGENTS.map((a) => ({ name: a.name, accuracy: a.reportCard.accuracy }));

const FRICTIONS = [
  {
    kicker: "01 / Unverified performance",
    title: "Can’t tell what works",
    body: "Stars and reviews hide real task failures.",
  },
  {
    kicker: "02 / Data exposure",
    title: "Data goes into a black box",
    body: "Zero visibility into business file access.",
  },
  {
    kicker: "03 / Upfront commitment",
    title: "Pay first, hope later",
    body: "No way to test before spending money.",
  },
] as const;

const STEPS = [
  {
    num: "01.",
    title: "List",
    body: "Seller uploads an agent with sample tasks.",
  },
  {
    num: "02.",
    title: "Test",
    body: "Automated test cases benchmark accuracy.",
  },
  {
    num: "03.",
    title: "Try",
    body: "Buyer runs it safely on sample data.",
  },
  {
    num: "04.",
    title: "Pay per run",
    body: "Pay strictly for verified execution runs.",
  },
] as const;

const COMPARISON = [
  { dimension: "Quality proof", others: "Ratings and reviews", us: "Automated test score" },
  { dimension: "Testing before listing", others: "Rarely enforced", us: "On every agent" },
  { dimension: "Sample-data trials", others: "Not a focus", us: "Built-in sandbox" },
  { dimension: "Permission labels", others: "Not a focus", us: "On every agent" },
  { dimension: "India payments & language", others: "Not a focus", us: "UPI, GST & regional languages" },
] as const;

const PHASES = [
  {
    kicker: "Phase 1 — MVP",
    title: "Core Marketplace",
    body: "Marketplace, sandbox, and 5 tested agents.",
    active: true,
  },
  {
    kicker: "Phase 2 — Pilot",
    title: "Real SMB Rollout",
    body: "Onboard sellers with 20 real small businesses.",
    active: false,
  },
  {
    kicker: "Phase 3 — Scale",
    title: "Ecosystem Expansion",
    body: "Agent chaining, more niches, seller analytics.",
    active: false,
  },
] as const;

const featured = AGENTS.filter((a) => a.featured);

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO — deck slide 1 ═══ */}
      <section className="grain relative overflow-hidden bg-pine-deep text-bone">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_18%_0%,rgba(109,26,46,0.5),transparent_65%)]"
        />
        <div className="relative z-10 mx-auto max-w-6xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-20">
          <p className="flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.24em] text-bone/60 uppercase">
            <span aria-hidden className="size-2 rounded-full bg-gold-bright" />
            AgentKart
          </p>

          <h1 className="mt-8 max-w-4xl font-display text-[2.75rem] leading-[1.02] font-medium tracking-tight sm:text-6xl lg:text-[5.25rem]">
            Verified AI agents.
            <br />
            <em className="text-gold-bright italic">Try before you buy.</em>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-bone/70 sm:text-lg">
            The trusted marketplace for Indian small businesses—sandbox-tested,
            permission-audited, and priced strictly per run.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full bg-maroon px-7 text-sm font-semibold hover:bg-maroon-deep"
            >
              <Link href="/marketplace">
                Browse the marketplace
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 rounded-full border-bone/30 bg-transparent px-7 text-sm font-semibold text-bone hover:border-bone/60 hover:bg-bone/10 hover:text-bone"
            >
              <Link href="/sell">List your agent</Link>
            </Button>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-6 border-t border-bone/20 pt-8 sm:grid-cols-4">
            {[
              ["10", "verified agents"],
              ["94%", "median accuracy"],
              ["₹0", "to get started"],
              ["12", "languages"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-3xl font-medium text-bone">{value}</dd>
                <dd className="mt-1 text-[0.78rem] text-bone/55">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-y bg-maroon py-3.5 text-bone" aria-hidden>
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={`${item.name}-${i}`}
              className="flex items-center gap-3 px-6 text-[0.78rem] font-medium whitespace-nowrap"
            >
              <ShieldCheckIcon className="size-3.5 text-gold-bright" />
              {item.name}
              <span className="font-mono text-bone/60">{item.accuracy}%</span>
              <span className="text-bone/30">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ 01 — TRUST DEFICIT ═══ */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeader
            index="01"
            label="The trust deficit"
            title={
              <>
                Anyone can build an agent.
                <br />
                <em className="font-normal text-muted-foreground italic">Nobody can trust one.</em>
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div aria-hidden className="h-px w-16 bg-maroon" />
              <p className="mt-6 max-w-sm text-lg leading-relaxed font-medium text-ink">
                Result: Buyers stay away, and good builders stay invisible.
              </p>
              <p className="mt-4 max-w-sm text-[0.92rem] leading-relaxed text-muted-foreground">
                AgentKart replaces guesswork with evidence — every listing carries a
                benchmark score, an audit trail, and a free trial on sample data.
              </p>
              <Button
                asChild
                variant="link"
                className="mt-6 h-auto p-0 text-maroon hover:text-maroon-deep"
              >
                <Link href="/#how-it-works">
                  See how it works <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <div className="divide-y border-t">
            {FRICTIONS.map((f, i) => (
              <Reveal key={f.kicker} delay={i * 90}>
                <article className="group grid gap-3 py-7 sm:grid-cols-[auto_1fr] sm:gap-8">
                  <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-maroon uppercase sm:w-44">
                    {f.kicker}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-maroon">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted-foreground">
                      {f.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 02 — MARKETPLACE ═══ */}
      <section className="border-y bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeader
              index="02"
              label="The marketplace"
              title="Verified catalog for Indian SMBs."
              aside="Every agent passes an automated test bench before it lists. Stars don’t decide — benchmark runs do."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((agent, i) => (
              <Reveal key={agent.slug} delay={i * 100}>
                <AgentCard
                  slug={agent.slug}
                  name={agent.name}
                  tagline={agent.tagline}
                  category={agent.category}
                  accuracy={agent.reportCard.accuracy}
                  reliability={agent.reportCard.reliability}
                  price={agent.pricePerRun}
                  languages={agent.languages}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
              <p className="text-sm text-muted-foreground">
                <span className="font-mono font-semibold text-ink">{AGENTS.length}</span> verified
                agents live · 6 more in the test bench
              </p>
              <Button asChild className="rounded-full">
                <Link href="/marketplace">
                  View full catalog <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 03 — HOW IT WORKS ═══ */}
      <section id="how-it-works" className="grain relative overflow-hidden bg-pine-deep text-bone">
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeader
              dark
              index="03"
              label="Execution flow"
              title="How AgentKart works."
            />
          </Reveal>

          {/* Timeline */}
          <div className="relative mt-16">
            <div
              aria-hidden
              className="absolute top-2 right-2 left-2 hidden h-px bg-bone/25 md:block"
            >
              <span className="absolute top-1/2 right-0 size-2.5 -translate-y-1/2 rounded-full bg-gold-bright" />
            </div>

            <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
              {STEPS.map((step, i) => (
                <Reveal key={step.num} delay={i * 110}>
                  <li className="relative">
                    <span
                      aria-hidden
                      className={`absolute -top-[3.15rem] left-0 hidden size-2.5 translate-y-1/2 rounded-full md:block ${
                        i === STEPS.length - 1 ? "bg-gold-bright" : "bg-bone"
                      }`}
                    />
                    <p className="font-display text-xl font-medium text-gold-bright italic">
                      {step.num}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-bone">{step.title}</h3>
                    <p className="mt-2 max-w-[15rem] text-[0.9rem] leading-relaxed text-bone/60">
                      {step.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={200}>
            <div className="mt-16 flex flex-col gap-4 border-t border-bone/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-lg text-[0.95rem] font-medium text-bone/90">
                Sellers earn per run. Buyers never pay for an agent they haven’t seen work.
              </p>
              <span className="text-[0.7rem] font-bold tracking-[0.18em] text-pine-soft uppercase">
                <span className="rounded-full bg-pine-soft/95 px-3.5 py-1.5 text-pine">
                  Zero upfront risk
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 04 — AUDIT & TRUST ═══ */}
      <section id="trust" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeader
            index="04"
            label="Audit & trust"
            title="Every agent gets a public report card."
            aside="Buyers inspect exact data access and verified benchmarks before a single rupee moves."
          />
        </Reveal>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <Reveal>
            <ReportCardPanel
              agentName="GST Invoice Agent"
              report={AGENTS[0].reportCard}
            />
          </Reveal>

          <Reveal delay={120}>
            <div>
              <p className="text-[0.7rem] font-bold tracking-[0.18em] text-ink uppercase">
                Permission labels
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                Buyers inspect exact data access before running. Sandboxed trials
                enforce the labels — an agent physically cannot exceed them.
              </p>
              <div className="mt-5">
                <PermissionList permissions={AGENTS[0].permissions} />
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t pt-5">
                <PermissionChip permission="reads-files" size="sm" />
                <PermissionChip permission="calls-internet" size="sm" />
                <PermissionChip permission="stores-data" size="sm" />
              </div>

              <div className="mt-6 rounded-xl border border-pine/25 bg-pine-soft p-4">
                <VerifiedBadge accuracy={94} />
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-pine">
                  Re-benchmarked nightly. Scores below 85% accuracy delist the agent automatically.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 05 — DIFFERENTIATION ═══ */}
      <section className="border-y bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeader
              index="05"
              label="Differentiation"
              title="Why we win where big platforms don’t bother."
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th className="pb-3.5 text-[0.7rem] font-bold tracking-[0.16em] text-ink uppercase">
                      Dimension
                    </th>
                    <th className="pb-3.5 text-[0.7rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                      Today’s marketplaces
                    </th>
                    <th className="pb-3.5 text-[0.7rem] font-bold tracking-[0.16em] text-maroon uppercase">
                      AgentKart
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.dimension} className="border-b border-border">
                      <td className="py-4 pr-4 text-[0.92rem] font-semibold text-ink">
                        {row.dimension}
                      </td>
                      <td className="py-4 pr-4 text-[0.92rem] text-muted-foreground">
                        {row.others}
                      </td>
                      <td className="py-4 text-[0.92rem] font-medium text-maroon">{row.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="text-[0.95rem] font-medium text-ink">
                The moat: Verified performance data that compounds with every run.
              </p>
              <p className="text-[0.7rem] font-bold tracking-[0.16em] text-pine uppercase">
                Compounding data flywheel
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 06 — UNIT ECONOMICS ═══ */}
      <section id="unit-economics" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeader index="06" label="Unit economics" title="How we make money." />
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-0">
          {[
            {
              value: "10%",
              accent: "text-maroon",
              title: "Transaction Commission",
              body: "Take rate on every sale or run.",
            },
            {
              value: "₹0",
              accent: "text-ink",
              title: "Listing Fee",
              body: "Zero upfront cost to list an agent.",
            },
            {
              value: "Pro",
              accent: "text-pine italic",
              title: "Seller Analytics",
              body: "Recurring subscription for insights.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div
                className={`h-full sm:px-8 ${i > 0 ? "sm:border-l sm:border-border" : "sm:pl-0"} ${
                  i === 0 ? "sm:pl-0" : ""
                }`}
              >
                <p
                  className={`font-display text-6xl leading-none font-medium tracking-tight ${item.accent}`}
                >
                  {item.value}
                </p>
                <h3 className="mt-5 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 flex flex-col gap-5 rounded-2xl border bg-card px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-[0.7rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
              6-month targets
            </p>
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
              {[
                ["10", "verified agents in one niche"],
                ["50", "sellers"],
                ["500", "buyers"],
              ].map(([value, label]) => (
                <p key={label} className="text-[0.95rem] font-medium text-ink">
                  <span className="font-display text-2xl font-semibold text-maroon">{value}</span>{" "}
                  <span className="text-muted-foreground">{label}</span>
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ 07 — ROADMAP & ASK ═══ */}
      <section className="grain relative overflow-hidden bg-pine-deep text-bone">
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <SectionHeader dark index="07" label="Execution & ask" title="Roadmap and what we need." />
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {PHASES.map((phase, i) => (
              <Reveal key={phase.kicker} delay={i * 110}>
                <div
                  className={`border-t-2 pt-5 ${
                    phase.active ? "border-gold-bright" : "border-bone/25"
                  }`}
                >
                  <p
                    className={`text-[0.7rem] font-bold tracking-[0.16em] uppercase ${
                      phase.active ? "text-gold-bright" : "text-bone/50"
                    }`}
                  >
                    {phase.kicker}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-bone">{phase.title}</h3>
                  <p className="mt-2.5 text-[0.92rem] leading-relaxed text-bone/60">
                    {phase.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={250}>
            <div className="mt-16 flex flex-col gap-4 rounded-2xl bg-maroon px-7 py-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.7rem] font-bold tracking-[0.2em] text-bone/70 uppercase">
                We’re asking for
              </p>
              <p className="font-display text-2xl leading-tight font-medium text-bone sm:text-3xl">
                Mentors, pilot customers, and seed support.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full bg-bone px-7 text-sm font-semibold text-pine-deep hover:bg-bone/90"
              >
                <Link href="/marketplace">
                  Try an agent free <FlaskConicalIcon className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-full border-bone/30 bg-transparent px-7 text-sm font-semibold text-bone hover:border-bone/60 hover:bg-bone/10 hover:text-bone"
              >
                <Link href="/sell">
                  <WalletIcon className="size-4" /> Start earning per run
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-full border-bone/30 bg-transparent px-7 text-sm font-semibold text-bone hover:border-bone/60 hover:bg-bone/10 hover:text-bone"
              >
                <Link href="/#trust">
                  <LanguagesIcon className="size-4" /> Read a report card
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
