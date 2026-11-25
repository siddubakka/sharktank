"use client";

import { useState } from "react";
import { CheckCircle2Icon, Loader2Icon, SmartphoneIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Agent, Payment, RunRecord } from "@/lib/types";

interface CheckoutDialogProps {
  agent: Agent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaid?: () => void;
}

type Stage = "form" | "processing" | "done";

/**
 * Simulated UPI checkout — enter a VPA, "approve" the intent, and the
 * run executes. Mirrors the real flow (intent → confirmation → run)
 * without needing a payment gateway key for the demo.
 */
export function CheckoutDialog({ agent, open, onOpenChange, onPaid }: CheckoutDialogProps) {
  const [vpa, setVpa] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("form");
  const [payment, setPayment] = useState<Payment | null>(null);
  const [run, setRun] = useState<RunRecord | null>(null);

  function reset() {
    setStage("form");
    setPayment(null);
    setRun(null);
    setError(null);
    setVpa("");
  }

  function handleClose(next: boolean) {
    if (!next && stage === "processing") return;
    onOpenChange(next);
    if (!next) setTimeout(reset, 200);
  }

  async function pay() {
    const trimmed = vpa.trim();
    if (!/^[\w.\-]{2,}@[a-z]{2,}$/i.test(trimmed)) {
      setError("Enter a valid UPI ID, e.g. yourname@okhdfc");
      return;
    }
    setError(null);
    setStage("processing");

    try {
      const payRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: agent.slug, vpa: trimmed }),
      });
      if (!payRes.ok) throw new Error("payment failed");
      const payData = (await payRes.json()) as { payment: Payment };

      // Simulate the UPI intent round-trip before the run executes.
      await new Promise((r) => setTimeout(r, 1100));

      const runRes = await fetch("/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: agent.slug,
          taskId: agent.sampleTasks[0]?.id,
          mode: "paid",
        }),
      });
      if (!runRes.ok) throw new Error("run failed");
      const runData = (await runRes.json()) as { run: RunRecord };

      setPayment(payData.payment);
      setRun(runData.run);
      setStage("done");
    } catch {
      setStage("form");
      setError("Payment couldn’t be completed. Try another UPI ID.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {stage !== "done" ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-xl font-medium">
                Pay per run
              </DialogTitle>
              <DialogDescription>
                No subscription. One UPI payment = one execution on your data.
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-xl border bg-bone/60 p-4">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] font-medium tracking-wider text-muted-foreground uppercase">
                    Agent
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">{agent.name}</p>
                </div>
                <p className="font-display text-3xl leading-none font-medium text-maroon">
                  ₹{agent.pricePerRun.toFixed(2)}
                </p>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between text-[0.8rem] text-muted-foreground">
                <span>1 execution · full audit trail</span>
                <span className="font-mono">incl. 18% GST</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vpa" className="text-[0.8rem] font-medium">
                UPI ID
              </Label>
              <div className="relative">
                <SmartphoneIcon
                  className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  id="vpa"
                  value={vpa}
                  onChange={(e) => setVpa(e.target.value)}
                  placeholder="yourname@okhdfc"
                  className="h-10 pl-9 font-mono text-sm"
                  autoComplete="off"
                  disabled={stage === "processing"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") pay();
                  }}
                />
              </div>
              {error && <p className="text-[0.78rem] text-destructive">{error}</p>}
              <p className="text-[0.75rem] text-muted-foreground">
                Demo checkout — no real money moves. Try{" "}
                <button
                  type="button"
                  className="font-mono text-maroon underline underline-offset-2"
                  onClick={() => setVpa("siddu@okhdfc")}
                >
                  siddu@okhdfc
                </button>
                .
              </p>
            </div>

            <DialogFooter className="gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => handleClose(false)}
                disabled={stage === "processing"}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                onClick={pay}
                disabled={stage === "processing"}
                className="rounded-full font-semibold"
              >
                {stage === "processing" ? (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    Approve in your UPI app…
                  </>
                ) : (
                  <>Pay ₹{agent.pricePerRun.toFixed(2)} & run</>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2.5 font-display text-xl font-medium">
                <CheckCircle2Icon className="size-6 text-pine" />
                Payment successful
              </DialogTitle>
              <DialogDescription>
                {payment && (
                  <>
                    <span className="font-mono">{payment.id}</span> · paid via{" "}
                    <span className="font-mono">{payment.vpa}</span>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-xl border border-pine/30 bg-pine-soft p-4">
              <p className="text-[0.68rem] font-bold tracking-[0.16em] text-pine uppercase">
                Run output
              </p>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ink">
                {run?.output ?? "Executing…"}
              </p>
              {run && (
                <p className="mt-3 font-mono text-[0.72rem] text-pine/70">
                  {run.id} · {run.durationMs}ms · {run.events.length} audit events · ₹
                  {run.cost.toFixed(2)} debited
                </p>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-2">
              <Button
                className="w-full rounded-full font-semibold sm:w-auto"
                onClick={() => {
                  handleClose(false);
                  onPaid?.();
                }}
              >
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
