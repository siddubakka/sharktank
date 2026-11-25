import type { Metadata } from "next";
import { AGENTS } from "@/lib/agents";
import { MarketplaceBrowser } from "@/components/marketplace-browser";
import { SectionHeader } from "@/components/section-header";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Browse verified AI agents for Indian small businesses — every listing sandbox-tested and benchmarked before it goes live.",
};

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <SectionHeader
        index="02"
        label="The marketplace"
        title="Verified catalog for Indian SMBs."
        aside="Every agent passes an automated test bench before it lists. Filter by the work you actually do."
      />

      <div className="mt-10">
        <MarketplaceBrowser agents={AGENTS} initialCategory={category} />
      </div>

      <section className="mt-16 rounded-2xl bg-pine-deep px-7 py-8 text-bone sm:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.18em] text-gold-bright uppercase">
              Can’t find your use case?
            </p>
            <p className="mt-2 max-w-md font-display text-xl leading-snug font-medium">
              Request an agent — if 10 businesses ask, it jumps the test bench queue.
            </p>
          </div>
          <a
            href="/sell"
            className="shrink-0 rounded-full bg-bone px-6 py-3 text-center text-sm font-semibold text-pine-deep transition-colors hover:bg-bone/90"
          >
            List or request →
          </a>
        </div>
      </section>
    </div>
  );
}
