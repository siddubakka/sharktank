import { NextRequest, NextResponse } from "next/server";
import { getAgent } from "@/lib/agents";
import { executeRun } from "@/lib/sandbox";
import { appendRun, listRuns } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ runs: listRuns().slice(0, 50) });
}

/** POST — execute an audited run (sandbox or paid). */
export async function POST(request: NextRequest) {
  let body: { slug?: string; taskId?: string; mode?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { slug, taskId, mode } = body;
  if (!slug || !taskId) return NextResponse.json({ error: "slug and taskId are required" }, { status: 400 });
  if (mode !== "sandbox" && mode !== "paid") {
    return NextResponse.json({ error: "mode must be 'sandbox' or 'paid'" }, { status: 400 });
  }

  const agent = getAgent(slug);
  if (!agent) return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  if (!agent.sampleTasks.some((t) => t.id === taskId)) {
    return NextResponse.json({ error: "Unknown taskId for this agent" }, { status: 400 });
  }

  const run = executeRun(agent, taskId, mode);
  appendRun(run);
  return NextResponse.json({ run }, { status: mode === "sandbox" ? 200 : 201 });
}
