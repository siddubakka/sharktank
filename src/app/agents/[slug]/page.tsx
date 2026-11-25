import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, MapPinIcon, CalendarIcon } from "lucide-react";
import { AGENTS, getAgent } from "@/lib/agents";
import { SectionHeader } from "@/components/section-header";
import { ReportCardPanel } from "@/components/report-card-panel";
import { PermissionList, VerifiedBadge, AgentCard } from "@/components/agent-card";
import { SandboxRunner } from "@/components/sandbox-runner";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";

interface AgentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AgentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return { title: "Agent not found" };
  return {
    title: `${agent.name} — ${agent.reportCard.accuracy}% verified`,
    description: agent.tagline,
  };
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();

  const related = AGENTS.filter(
    (a) => a.slug !== agent.slug && a.category === agent.category,
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      {/* Breadcrumb */}
      <Link
        href="/marketplace"
        className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-muted-foreground transition-colors hover:text-maroon"
      >
        <ArrowLeftIcon className="size-3.5" /> Marketplace
      </Link>

      {/* Title block */}
      <header className="mt-6 border-b pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <VerifiedBadge accuracy={agent.reportCard.accuracy} />
          <Badge variant="outline" className="rounded-full">
            {agent.category}
          </Badge>
          <span className="flex flex-wrap gap-1.5">
            {agent.languages.map((lang) => (
              <Badge
                key={lang}
                className="rounded-full bg-pine-soft font-medium text-pine"
                variant="secondary"
              >
                {lang}
              </Badge>
            ))}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-4xl leading-tight font-medium tracking-tight text-ink sm:text-5xl">
              {agent.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {agent.tagline}
            </p>
          </div>

          <div className="shrink-0 text-left sm:text-right">
            <p className="text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
              Price per run
            </p>
            <p className="font-display text-5xl leading-none font-medium text-maroon">
              ₹{agent.pricePerRun.toFixed(2)}
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-[0.78rem] text-muted-foreground sm:justify-end">
              <MapPinIcon className="size-3.5" /> {agent.seller.location}
              <span aria-hidden>·</span>
              <CalendarIcon className="size-3.5" /> since {agent.seller.since}
            </p>
          </div>
        </div>

        <p className="mt-5 text-[0.88rem] text-muted-foreground">
          Built by <span className="font-semibold text-ink">{agent.seller.name}</span>
          {" · "}
          <span className="font-mono">{agent.reportCard.runs.toLocaleString("en-IN")}</span> verified
          runs
        </p>
      </header>

      {/* Main grid: content + sticky sandbox */}
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div className="space-y-12">
          {/* Report card */}
          <section>
            <SectionHeader index="04" label="Audit & trust" title="Public report card." />
            <div className="mt-7">
              <ReportCardPanel agentName={agent.name} report={agent.reportCard} />
            </div>
          </section>

          {/* About + permissions */}
          <section>
            <SectionHeader index="01" label="About this agent" title="What it actually does." />
            <p className="mt-7 text-[0.98rem] leading-relaxed text-ink/85">{agent.description}</p>

            <div className="mt-7 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-[0.7rem] font-bold tracking-[0.18em] text-ink uppercase">
                  Permission labels
                </p>
                <div className="mt-3">
                  <PermissionList permissions={agent.permissions} />
                </div>
              </div>
              <div>
                <p className="text-[0.7rem] font-bold tracking-[0.18em] text-ink uppercase">
                  Benchmark suites
                </p>
                <ul className="mt-3 space-y-3">
                  {agent.tags.map((tag) => (
                    <li key={tag} className="flex items-center justify-between border-b pb-2.5 text-[0.88rem]">
                      <span className="text-ink/85">{tag}</span>
                      <span className="font-mono text-[0.78rem] font-semibold text-pine">
                        passed
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 rounded-lg border border-pine/25 bg-pine-soft p-3.5 text-[0.82rem] leading-relaxed text-pine">
                  {agent.reportCard.testsPassed}/{agent.reportCard.testsTotal} suites green ·
                  re-verified nightly · auto-delist below 85% accuracy.
                </p>
              </div>
            </div>
          </section>

          {/* Sample tasks */}
          <section>
            <SectionHeader
              index="02"
              label="Sample tasks"
              title="Try it on sample data."
              aside="Each task runs in the sandbox with sample files — the same tasks the test bench scores."
            />
            <ol className="mt-7 divide-y border-t">
              {agent.sampleTasks.map((task, i) => (
                <li key={task.id} className="flex gap-5 py-5">
                  <span className="font-display text-lg font-medium text-maroon tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.95rem] font-semibold text-ink">{task.label}</p>
                    <p className="mt-1.5 font-mono text-[0.8rem] leading-relaxed text-muted-foreground break-words">
                      {task.input}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Sticky sandbox */}
        <div className="lg:sticky lg:top-24">
          <SandboxRunner agent={agent} />
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20 border-t pt-12">
          <Reveal>
            <SectionHeader
              index="03"
              label="More in this niche"
              title={`Other ${agent.category.toLowerCase()} agents.`}
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <AgentCard
                  key={a.slug}
                  slug={a.slug}
                  name={a.name}
                  tagline={a.tagline}
                  category={a.category}
                  accuracy={a.reportCard.accuracy}
                  reliability={a.reportCard.reliability}
                  price={a.pricePerRun}
                  languages={a.languages}
                />
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </div>
  );
}
