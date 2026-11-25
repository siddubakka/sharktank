import { NextRequest, NextResponse } from "next/server";
import { appendListing, listListings } from "@/lib/store";
import { shortId } from "@/lib/format";
import type { Listing, Permission } from "@/lib/types";

const VALID_PERMISSIONS: Permission[] = [
  "reads-files",
  "calls-internet",
  "accesses-email",
  "stores-data",
  "sends-messages",
  "views-payments",
];
const VALID_CATEGORIES = ["Compliance", "Operations", "Support", "Finance"] as const;

export async function GET() {
  return NextResponse.json({ listings: listListings() });
}

/** POST — seller submits an agent to the test bench. */
export async function POST(request: NextRequest) {
  let body: Partial<Listing>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const tagline = (body.tagline ?? "").trim();
  const contact = (body.contact ?? "").trim();
  const price = Number(body.pricePerRun);

  if (name.length < 3) return NextResponse.json({ error: "Agent name is too short" }, { status: 400 });
  if (tagline.length < 10) return NextResponse.json({ error: "Describe the agent in one line" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$|^[+\d][\d\s-]{7,}$/.test(contact)) {
    return NextResponse.json({ error: "Enter a valid email or phone" }, { status: 400 });
  }
  if (!Number.isFinite(price) || price <= 0 || price > 100) {
    return NextResponse.json({ error: "Price must be between ₹0.01 and ₹100 per run" }, { status: 400 });
  }
  const permissions = (body.permissions ?? []).filter((p): p is Permission =>
    VALID_PERMISSIONS.includes(p as Permission)
  );
  if (permissions.length === 0) {
    return NextResponse.json({ error: "Select at least one permission label" }, { status: 400 });
  }

  const listing: Listing = {
    id: shortId("lst"),
    name,
    tagline,
    category: (VALID_CATEGORIES as readonly string[]).includes(body.category ?? "")
      ? (body.category as Listing["category"])
      : "Operations",
    pricePerRun: Math.round(price * 100) / 100,
    permissions,
    contact,
    submittedAt: new Date().toISOString(),
    status: "test-bench",
  };
  appendListing(listing);

  return NextResponse.json({ listing }, { status: 201 });
}
