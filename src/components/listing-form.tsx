"use client";

import { useState } from "react";
import { CheckCircle2Icon, Loader2Icon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { PermissionChip } from "@/components/agent-card";
import type { Listing, Permission } from "@/lib/types";

const PERMISSIONS: Permission[] = [
  "reads-files",
  "calls-internet",
  "accesses-email",
  "stores-data",
  "sends-messages",
  "views-payments",
];

const CATEGORIES = ["Compliance", "Finance", "Operations", "Support"] as const;

export function ListingForm() {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Compliance");
  const [price, setPrice] = useState("1.00");
  const [permissions, setPermissions] = useState<Permission[]>(["reads-files"]);
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);

  function togglePermission(p: Permission) {
    setPermissions((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, tagline, category, pricePerRun: price, permissions, contact }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed");
      setListing(data.listing as Listing);
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  }

  if (status === "done" && listing) {
    return (
      <div className="rounded-2xl border border-pine/30 bg-pine-soft p-8 text-center">
        <CheckCircle2Icon className="mx-auto size-10 text-pine" />
        <h3 className="mt-4 font-display text-2xl font-medium text-ink">
          Entered the test bench
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[0.92rem] leading-relaxed text-muted-foreground">
          <span className="font-mono font-semibold text-ink">{listing.id}</span> —
          “{listing.name}” is queued for 50 automated test cases. Scores ≥ 85%
          accuracy publish it to the marketplace with a verified badge.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {listing.permissions.map((p) => (
            <PermissionChip key={p} permission={p} size="sm" />
          ))}
        </div>
        <Button
          variant="outline"
          className="mt-6 rounded-full"
          onClick={() => {
            setStatus("idle");
            setName("");
            setTagline("");
            setContact("");
          }}
        >
          List another agent
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border bg-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Agent name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. GST Reconcile Agent"
            required
            minLength={3}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="tagline">One-line description</Label>
          <Input
            id="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="What does it do, in one sentence?"
            required
            minLength={10}
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <RadioGroup
            value={category}
            onValueChange={(v) => setCategory(v as (typeof CATEGORIES)[number])}
            className="flex flex-wrap gap-4 pt-1"
          >
            {CATEGORIES.map((cat) => (
              <label key={cat} className="flex cursor-pointer items-center gap-2 text-sm">
                <RadioGroupItem value={cat} id={`cat-${cat}`} />
                {cat}
              </label>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price per run (₹)</Label>
          <Input
            id="price"
            type="number"
            step="0.10"
            min="0.1"
            max="100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="font-mono"
          />
          <p className="text-[0.75rem] text-muted-foreground">
            AgentKart keeps 10% · you keep 90% of every run
          </p>
        </div>

        <div className="space-y-2.5 sm:col-span-2">
          <Label>Permission labels (what buyers will see)</Label>
          <div className="flex flex-wrap gap-2 pt-1">
            {PERMISSIONS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => togglePermission(p)}
                aria-pressed={permissions.includes(p)}
                className={`rounded-full border px-3.5 py-1.5 text-[0.8rem] font-medium transition-colors ${
                  permissions.includes(p)
                    ? "border-maroon bg-maroon-soft text-maroon"
                    : "border-border text-muted-foreground hover:border-maroon/40"
                }`}
              >
                {p.replace("-", " ")}
              </button>
            ))}
          </div>
          <p className="text-[0.75rem] text-muted-foreground">
            Be honest — the sandbox enforces these labels at runtime.
          </p>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="contact">Email or phone</Label>
          <Input
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="you@company.in or +91…"
            required
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-[0.85rem] text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 h-11 w-full rounded-full text-sm font-semibold sm:w-auto sm:px-8"
      >
        {status === "submitting" ? (
          <>
            <Loader2Icon className="size-4 animate-spin" /> Submitting to test bench…
          </>
        ) : (
          <>
            <UploadIcon className="size-4" /> Submit to test bench
          </>
        )}
      </Button>

      <p className="mt-4 flex items-center gap-2 text-[0.78rem] text-muted-foreground">
        <Switch checked disabled className="opacity-60" />
        Free to list · zero upfront cost · payout via UPI on the 1st of each month
      </p>
    </form>
  );
}
