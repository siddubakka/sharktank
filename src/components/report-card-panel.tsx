import { cn } from "cn";
import type { ReportCard } from "@/lib/types";

interface ReportCardPanelProps {
  agentName: string;
  report: ReportCard;
  className?: string;
}

/**
 * The public report card from deck slide 04 — VERIFIED BENCHMARK,
 * four big figures, hairline dividers. Used on the landing page as a
 * static sample and on agent pages with live data.
 */
export function ReportCardPanel({ agentName, report, className }: ReportCardPanelProps) {
  const stats: { label: string; value: string; accent?: boolean }[] = [
    { label: "Accuracy", value: `${report.accuracy}%` },
    { label: "Reliability", value: `${report.reliability}%` },
    { label: "Speed", value: `${report.avgSpeedSec.toFixed(1)}s` },
    { label: "Cost", value: `₹${report.costPerRun.toFixed(2)}`, accent: true },
  ];

  return (
    <div
      className={cn(
        "grain relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-7",
        className,
      )}
    >
      <div className="relative z-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[0.7rem] font-bold tracking-[0.16em] text-pine uppercase">
            Verified benchmark
          </p>
          <p className="text-[0.75rem] font-medium text-muted-foreground">Illustrative sample</p>
        </div>

        <h3 className="mt-2 text-xl font-semibold text-ink sm:text-[1.35rem]">{agentName}</h3>

        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-border pt-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[0.72rem] font-medium tracking-wider text-muted-foreground uppercase">
                {stat.label}
              </p>
              <p
                className={cn(
                  "mt-1.5 font-display text-[1.9rem] leading-none font-medium tracking-tight sm:text-[2.1rem]",
                  stat.accent ? "text-maroon" : "text-ink",
                )}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 border-t border-border pt-4 text-[0.75rem] text-muted-foreground">
          <span className="font-mono">
            {report.testsPassed}/{report.testsTotal} test suites passed
          </span>
          <span aria-hidden className="opacity-40">
            ·
          </span>
          <span className="font-mono">{report.runs.toLocaleString("en-IN")} runs</span>
          <span aria-hidden className="opacity-40">
            ·
          </span>
          <span>re-verified {new Date(report.lastVerified).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
        </div>
      </div>
    </div>
  );
}
