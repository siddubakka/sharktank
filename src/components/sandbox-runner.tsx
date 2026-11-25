"use client";

import { useState, useTransition } from "react";
import { PlayIcon, ShieldCheckIcon, CheckCircle2Icon, InfoIcon, XCircleIcon, ZapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "cn";
import type { Agent, AuditEvent, RunRecord } from "@/lib/types";
import { CheckoutDialog } from "./checkout-dialog";

const STATUS_ICON = {
  granted: CheckCircle2Icon,
  ok: CheckCircle2Icon,
  info: InfoIcon,
  denied: XCircleIcon,
} as const;

const STATUS_COLOR = {
  granted: "text-pine",
  ok: "text-pine",
  info: "text-muted-foreground",
  denied: "text-destructive",
} as const;

const KIND_LABEL: Record<AuditEvent["kind"], string> = {
  permission: "policy",
  network: "net",
  compute: "core",
  output: "out",
  billing: "bill",
};

interface SandboxRunnerProps {
  agent: Agent;
}

/**
 * The sandbox: buyers run sample tasks for free and watch the audit
 * trail scroll live. After a taste, they can pay for a run on their
 * own data — the whole "try before you buy" loop in one panel.
 */
export function SandboxRunner({ agent }: SandboxRunnerProps) {
  const [taskId, setTaskId] = useState(agent.sampleTasks[0]?.id ?? "");
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [run, setRun] = useState<RunRecord | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const selectedTask = agent.sampleTasks.find((t) => t.id === taskId) ?? agent.sampleTasks[0];

  function runSandbox() {
    if (!selectedTask) return;
    setPhase("running");
    setEvents([]);
    setRun(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/runs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: agent.slug, taskId: selectedTask.id, mode: "sandbox" }),
        });
        if (!res.ok) throw new Error("run failed");
        const data = (await res.json()) as { run: RunRecord };
        await streamEvents(data.run);
        setRun(data.run);
        setPhase("done");
      } catch {
        setPhase("idle");
      }
    });
  }

  /** Reveal the audit trail on a timer so the run reads as live work. */
  async function streamEvents(record: RunRecord) {
    for (let i = 0; i < record.events.length; i++) {
      const prevT = i === 0 ? 0 : record.events[i - 1].t;
      const gap = Math.min(record.events[i].t - prevT, 420);
      await new Promise((r) => setTimeout(r, Math.max(gap, 90)));
      setEvents((prev) => [...prev, record.events[i]]);
    }
  }

  function reset() {
    setPhase("idle");
    setEvents([]);
    setRun(null);
  }

  return (
    <div className="flex flex-col rounded-2xl border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2.5">
            <span
              className={cn(
                "absolute inline-flex size-full rounded-full",
                phase === "running" ? "animate-ping bg-pine/60" : "bg-pine/30",
              )}
            />
            <span className="relative inline-flex size-2.5 rounded-full bg-pine" />
          </span>
          <p className="text-[0.72rem] font-bold tracking-[0.16em] text-ink uppercase">
            Sandbox — sample data
          </p>
        </div>
        <Badge
          variant="outline"
          className="rounded-full font-mono text-[0.7rem]"
        >
          ₹0.00 charged
        </Badge>
      </div>

      {/* Task picker */}
      <div className="px-5 pt-4">
        <p className="text-[0.72rem] font-medium tracking-wider text-muted-foreground uppercase">
          Pick a sample task
        </p>
        <div className="mt-2.5 flex flex-col gap-2">
          {agent.sampleTasks.map((task) => (
            <button
              key={task.id}
              type="button"
              disabled={phase === "running"}
              onClick={() => {
                setTaskId(task.id);
                if (phase === "done") reset();
              }}
              className={cn(
                "rounded-lg border px-3.5 py-2.5 text-left text-[0.85rem] transition-colors disabled:opacity-60",
                taskId === task.id
                  ? "border-maroon/50 bg-maroon-soft font-medium text-maroon"
                  : "border-border bg-background text-ink/75 hover:border-maroon/30 hover:text-ink",
              )}
            >
              {task.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input echo */}
      {selectedTask && (
        <div className="mx-5 mt-4 rounded-lg border border-dashed bg-bone/60 p-3.5">
          <p className="text-[0.68rem] font-bold tracking-wider text-muted-foreground uppercase">
            Input
          </p>
          <p className="mt-1.5 font-mono text-[0.78rem] leading-relaxed text-ink/80 break-words">
            {selectedTask.input}
          </p>
        </div>
      )}

      {/* Run button */}
      <div className="px-5 pt-4">
        <Button
          onClick={runSandbox}
          disabled={phase === "running" || isPending}
          className="h-10 w-full rounded-full text-sm font-semibold"
        >
          {phase === "running" ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              Running in sandbox…
            </>
          ) : (
            <>
              <PlayIcon className="size-4" /> Run free sandbox trial
            </>
          )}
        </Button>
      </div>

      {/* Audit trail */}
      {(events.length > 0 || phase === "running") && (
        <div className="mx-5 mt-4 rounded-xl bg-pine-deep p-4">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-[0.68rem] font-bold tracking-[0.16em] text-gold-bright uppercase">
              <ShieldCheckIcon className="size-3.5" /> Audit trail
            </p>
            <p className="font-mono text-[0.68rem] text-bone/40">
              {events.length}/{run?.events.length ?? "…"} events
            </p>
          </div>

          <ul className="mt-3 space-y-2">
            {events.map((ev, i) => {
              const Icon = STATUS_ICON[ev.status];
              return (
                <li
                  key={`${ev.t}-${i}`}
                  className="flex items-start gap-2.5 font-mono text-[0.74rem] leading-relaxed"
                  style={{ animation: "fade-in 0.3s ease-out" }}
                >
                  <span className="mt-0.5 w-11 shrink-0 text-bone/35 tabular-nums">
                    +{(ev.t / 1000).toFixed(2)}s
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 w-9 shrink-0 rounded-sm bg-bone/10 px-1 text-center text-[0.62rem] font-bold tracking-wide uppercase",
                      ev.status === "denied" ? "text-destructive" : "text-gold-bright",
                    )}
                  >
                    {KIND_LABEL[ev.kind]}
                  </span>
                  <Icon
                    className={cn(
                      "mt-0.5 size-3.5 shrink-0",
                      ev.status === "denied" ? "text-destructive" : "text-pine-soft",
                    )}
                  />
                  <span className="text-bone/80 break-words">{ev.message}</span>
                </li>
              );
            })}
            {phase === "running" && (
              <li className="flex items-center gap-2.5 font-mono text-[0.74rem] text-bone/50">
                <span className="w-11 shrink-0 tabular-nums">···</span>
                <span className="inline-flex gap-1">
                  <span className="size-1.5 animate-bounce rounded-full bg-gold-bright [animation-delay:0ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-gold-bright [animation-delay:150ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-gold-bright [animation-delay:300ms]" />
                </span>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Result */}
      {phase === "done" && run && (
        <div className="mx-5 mt-4 rounded-xl border border-pine/30 bg-pine-soft p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-1.5 text-[0.68rem] font-bold tracking-[0.16em] text-pine uppercase">
              <CheckCircle2Icon className="size-3.5" /> Output
            </p>
            <span className="font-mono text-[0.68rem] text-pine/70">{run.id}</span>
          </div>
          <p className="mt-2 text-[0.88rem] leading-relaxed text-ink">{run.output}</p>

          <Separator className="my-4 bg-pine/20" />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.82rem] text-muted-foreground">
              Free trial used up? Run it on <em className="text-ink not-italic font-medium">your</em>{" "}
              data for{" "}
              <span className="font-display text-base font-semibold text-maroon">
                ₹{agent.pricePerRun.toFixed(2)}
              </span>{" "}
              per run.
            </p>
            <Button
              onClick={() => setCheckoutOpen(true)}
              className="shrink-0 rounded-full text-sm font-semibold"
              size="sm"
            >
              <ZapIcon className="size-4" /> Pay & run on my data
            </Button>
          </div>
        </div>
      )}

      {/* Footer note */}
      <div className="mt-4 flex items-center gap-2 border-t px-5 py-3.5 text-[0.75rem] text-muted-foreground">
        <ShieldCheckIcon className="size-3.5 text-pine" />
        Sandbox enforces the permission labels above — sample files only, nothing leaves the box.
      </div>

      <CheckoutDialog
        agent={agent}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        onPaid={() => {
          setCheckoutOpen(false);
          reset();
        }}
      />
    </div>
  );
}
