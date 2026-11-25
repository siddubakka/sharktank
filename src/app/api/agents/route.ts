import { NextRequest, NextResponse } from "next/server";
import { AGENTS } from "@/lib/agents";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const category = searchParams.get("category");

  let agents = AGENTS;
  if (category && category !== "All") {
    agents = agents.filter((a) => a.category === category);
  }
  if (q) {
    agents = agents.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.tagline.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({ agents, total: agents.length });
}
