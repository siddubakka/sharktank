import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, FlaskConicalIcon, TrendingUpIcon, IndianRupeeIcon } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { ListingForm } from "@/components/listing-form";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sell your agent",
  description:
    "List an AI agent on AgentKart — free to list, benchmarked by the test bench, paid on every run.",
};

const PIPELINE = [
  {
    step: "01",
    title: "Submit",
    body: "Name it, describe it, declare permission labels. Free, no card, no review queue games.",
  },
  {
    step: "02",
    title: "Test bench",
    body: "50 automated cases score accuracy, reliability and latency. ≥85% accuracy = verified badge.",
  },
  {
    step: "03",
    title: "Go live",
    body: "Listed in the catalog with a public report card. Buyers trial it on sample data first.",
  },
  {
    step: "04",
    title: "Earn per run",
    body: "Every paid execution deposits 90% to your ledger. UPI payout on the 1st, ₹0 listing fee.",
  },
] as const;

export default function SellPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <SectionHeader
        index="06"
        label="For builders"
        title={
          <>
            List an agent.
            <br />
            <em className="font-normal text-muted-foreground italic">Earn on every run.</em>
          </>
        }
        aside="Zero upfront cost. The test bench decides who lists — not pay-to-play placement."
      />

      {/* Pipeline */}
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {PIPELINE.map((item, i) => (
          <Reveal key={item.step} delay={i * 90}>
            <li className="border-t-2 border-maroon pt-4">
              <p className="font-mono text-[0.72rem] font-bold tracking-widest text-maroon">
                STEP {item.step}
              </p>
              <h3 className="mt-2 text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-[0.88rem] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>

      {/* Two-column: form + economics */}
      <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <section id="listing">
          <SectionHeader index="01" label="Listing" title="Open a listing." />
          <div className="mt-7">
            <ListingForm />
          </div>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-24">
          {/* Payout calculator */}
          <div id="pricing" className="rounded-2xl border bg-card p-6">
            <p className="flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.18em] text-ink uppercase">
              <TrendingUpIcon className="size-4 text-maroon" /> What you’d earn
            </p>
            <p className="mt-4 text-[0.85rem] text-muted-foreground">
              At <span className="font-display text-xl font-semibold text-maroon">₹1.00</span> per
              run, 10% commission:
            </p>
            <dl className="mt-4 space-y-3 border-t pt-4">
              {[
                ["10 runs / day", "₹27 / month"],
                ["50 runs / day", "₹135 / month"],
                ["200 runs / day", "₹540 / month"],
                ["1,000 runs / day", "₹2,700 / month"],
              ].map(([volume, payout]) => (
                <div key={volume} className="flex items-baseline justify-between gap-4">
                  <dt className="text-[0.88rem] text-ink/80">{volume}</dt>
                  <dd className="font-mono text-[0.88rem] font-semibold text-pine">{payout}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 rounded-lg bg-bone p-3 text-[0.78rem] leading-relaxed text-muted-foreground">
              Example uses ₹1/run and 90% payout. Your real numbers scale with price × volume.
            </p>
          </div>

          {/* Test bench specs */}
          <div id="test-bench" className="rounded-2xl bg-pine-deep p-6 text-bone">
            <p className="flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.18em] text-gold-bright uppercase">
              <FlaskConicalIcon className="size-4" /> Test bench specs
            </p>
            <ul className="mt-4 space-y-3 text-[0.88rem] text-bone/75">
              {[
                "50 golden test cases per listing",
                "Accuracy, reliability & p95 latency scored",
                "Permission violations auto-fail the run",
                "Re-benchmarked nightly, public report card",
                "Auto-delist below 85% accuracy",
              ].map((spec) => (
                <li key={spec} className="flex gap-2.5">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-bright" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-maroon/30 bg-maroon-soft p-6">
            <p className="flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.16em] text-maroon uppercase">
              <IndianRupeeIcon className="size-4" /> Zero upfront risk
            </p>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/80">
              Listing is free forever. We only make money when you do — 10% of runs,
              nothing else.{" "}
              <Link href="/marketplace" className="font-medium text-maroon underline underline-offset-2">
                See what’s already listed
              </Link>
              .
            </p>
            <Button asChild variant="outline" className="mt-4 rounded-full">
              <Link href="/marketplace">
                Browse the marketplace <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
