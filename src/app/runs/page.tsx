import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { ShieldCheckIcon } from "lucide-react";
import { listRuns } from "@/lib/store";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { relativeTime } from "@/lib/format";

export const metadata: Metadata = {
  title: "Public run ledger",
  description:
    "Every verified execution on AgentKart — sandbox trials and paid runs, with full audit metadata.",
};

export default async function RunsPage() {
  await connection();
  const runs = listRuns();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <SectionHeader
        index="08"
        label="Transparency"
        title="Public run ledger."
        aside="The flywheel in the open: every execution compounds the verified performance data that buyers, sellers and benchmarks all read from."
      />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Badge variant="outline" className="gap-1.5 rounded-full font-mono">
          <ShieldCheckIcon className="size-3.5 text-pine" />
          {runs.length} recorded runs
        </Badge>
        <Badge variant="outline" className="rounded-full font-mono">
          {runs.filter((r) => r.mode === "paid").length} paid ·{" "}
          {runs.filter((r) => r.mode === "sandbox").length} sandbox
        </Badge>
      </div>

      {runs.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-20 text-center">
          <p className="max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
            No runs recorded yet on this instance. Run any agent in the sandbox —
            trials and paid runs both land here with full audit metadata.
          </p>
          <Link
            href="/marketplace"
            className="mt-5 rounded-full bg-maroon px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-maroon-deep"
          >
            Run the first one →
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-ink">
                {["Run ID", "Agent", "Task", "Mode", "Audit events", "Cost", "When"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3.5 text-[0.68rem] font-bold tracking-[0.16em] text-ink uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {runs.map((run) => (
                <tr key={run.id} className="border-b border-border last:border-0 hover:bg-bone/60">
                  <td className="px-4 py-3.5 font-mono text-[0.78rem] text-muted-foreground">
                    {run.id}
                  </td>
                  <td className="px-4 py-3.5">
                    <Link
                      href={`/agents/${run.agentSlug}`}
                      className="text-[0.88rem] font-medium text-ink transition-colors hover:text-maroon"
                    >
                      {run.agentName}
                    </Link>
                  </td>
                  <td className="max-w-52 px-4 py-3.5 text-[0.82rem] text-muted-foreground">
                    <span className="line-clamp-1">{run.taskLabel}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[0.7rem] font-bold tracking-wide uppercase ${
                        run.mode === "paid"
                          ? "bg-maroon-soft text-maroon"
                          : "bg-pine-soft text-pine"
                      }`}
                    >
                      {run.mode}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[0.8rem] text-ink/75">
                    {run.events.length}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[0.82rem] font-semibold">
                    {run.cost > 0 ? (
                      <span className="text-maroon">₹{run.cost.toFixed(2)}</span>
                    ) : (
                      <span className="text-pine">free</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-[0.8rem] text-muted-foreground">
                    {relativeTime(run.startedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 max-w-2xl text-[0.82rem] leading-relaxed text-muted-foreground">
        Ledger data is stored per-instance for this demo. In production every row
        is hash-chained and mirrored to the benchmark index — the compounding
        data flywheel from deck slide 05.
      </p>
    </div>
  );
}
