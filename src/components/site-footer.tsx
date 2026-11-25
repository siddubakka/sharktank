import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const COLUMNS = [
  {
    title: "Marketplace",
    links: [
      { href: "/marketplace", label: "Browse all agents" },
      { href: "/marketplace?category=Compliance", label: "Compliance" },
      { href: "/marketplace?category=Finance", label: "Finance" },
      { href: "/marketplace?category=Operations", label: "Operations" },
      { href: "/marketplace?category=Support", label: "Support" },
    ],
  },
  {
    title: "For builders",
    links: [
      { href: "/sell", label: "List an agent" },
      { href: "/sell#test-bench", label: "Test bench specs" },
      { href: "/sell#pricing", label: "Payout & pricing" },
      { href: "/#unit-economics", label: "Unit economics" },
    ],
  },
  {
    title: "Trust",
    links: [
      { href: "/#trust", label: "Report cards" },
      { href: "/#trust", label: "Permission labels" },
      { href: "/#how-it-works", label: "Sandbox trials" },
      { href: "/runs", label: "Public run ledger" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative grain overflow-hidden bg-pine-deep text-bone/80">
      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-2.5 text-bone">
              <span aria-hidden className="size-2.5 rounded-full bg-gold-bright" />
              <span className="text-[0.8rem] font-semibold tracking-[0.22em] uppercase">
                AgentKart
              </span>
            </div>
            <p className="mt-4 max-w-xs font-display text-lg leading-snug text-bone/90 italic">
              Verified AI agents. Try before you buy.
            </p>
            <p className="mt-4 max-w-xs text-[0.82rem] leading-relaxed text-bone/55">
              The trusted marketplace for Indian small businesses — sandbox-tested,
              permission-audited, and priced strictly per run.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[0.68rem] font-semibold tracking-[0.2em] text-gold-bright uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.85rem] text-bone/65 transition-colors hover:text-bone"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Separator className="mt-14 bg-bone/15" />

        <div className="flex flex-col gap-3 pt-6 text-[0.75rem] text-bone/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 AgentKart Technologies Pvt. Ltd. · Bengaluru</p>
          <p className="font-mono">
            UPI · GST invoicing · 12 languages · pay per run
          </p>
        </div>
      </div>
    </footer>
  );
}
