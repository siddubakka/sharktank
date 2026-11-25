"use client";

import { useMemo, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AgentCard } from "@/components/agent-card";
import { cn } from "cn";
import type { Agent } from "@/lib/types";

const CATEGORIES = ["All", "Compliance", "Finance", "Operations", "Support"] as const;
const SORTS = [
  { id: "accuracy", label: "Accuracy" },
  { id: "price-asc", label: "Price ↑" },
  { id: "price-desc", label: "Price ↓" },
  { id: "runs", label: "Most run" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

interface MarketplaceBrowserProps {
  agents: Agent[];
  initialCategory?: string;
}

export function MarketplaceBrowser({ agents, initialCategory }: MarketplaceBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(
    CATEGORIES.includes(initialCategory as (typeof CATEGORIES)[number]) ? initialCategory! : "All"
  );
  const [sort, setSort] = useState<SortId>("accuracy");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = agents.filter((a) => {
      const inCategory = category === "All" || a.category === category;
      if (!inCategory) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.tagline.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.languages.some((l) => l.toLowerCase().includes(q))
      );
    });

    out = [...out].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.pricePerRun - b.pricePerRun;
        case "price-desc":
          return b.pricePerRun - a.pricePerRun;
        case "runs":
          return b.reportCard.runs - a.reportCard.runs;
        default:
          return b.reportCard.accuracy - a.reportCard.accuracy;
      }
    });
    return out;
  }, [agents, query, category, sort]);

  const hasFilters = query.trim() !== "" || category !== "All";

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col gap-5 border-b pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <SearchIcon
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search GST, Hindi, inventory…"
            className="h-10 rounded-full border-border bg-card pl-9 pr-9 text-sm"
            aria-label="Search agents"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-ink"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[0.8rem] font-medium transition-colors",
                category === cat
                  ? "border-maroon bg-maroon text-primary-foreground"
                  : "border-border bg-card text-ink/70 hover:border-maroon/40 hover:text-maroon",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort + count */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-5">
        <p className="text-[0.85rem] text-muted-foreground">
          <span className="font-mono font-semibold text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "agent" : "agents"}
          {category !== "All" && <> in {category}</>}
          {query.trim() && <> matching “{query.trim()}”</>}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-[0.72rem] font-medium tracking-wider text-muted-foreground uppercase">
            Sort
          </span>
          {SORTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSort(s.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[0.78rem] font-medium transition-colors",
                sort === s.id
                  ? "bg-pine text-secondary-foreground"
                  : "text-muted-foreground hover:text-ink",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((agent) => (
            <AgentCard
              key={agent.slug}
              slug={agent.slug}
              name={agent.name}
              tagline={agent.tagline}
              category={agent.category}
              accuracy={agent.reportCard.accuracy}
              reliability={agent.reportCard.reliability}
              price={agent.pricePerRun}
              languages={agent.languages}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-20 text-center">
          <Badge variant="outline" className="mb-4">
            No matches
          </Badge>
          <p className="max-w-sm text-[0.95rem] text-muted-foreground">
            Nothing in the catalog matches those filters yet. The test bench has 6
            more agents pending verification.
          </p>
          <Button
            variant="outline"
            className="mt-5 rounded-full"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Reset filters
          </Button>
        </div>
      )}
    </div>
  );
}
