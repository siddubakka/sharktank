import { NextRequest, NextResponse } from "next/server";
import { getAgent } from "@/lib/agents";
import { appendPayment } from "@/lib/store";
import { shortId } from "@/lib/format";

/**
 * POST — simulated UPI pay-per-run checkout.
 * In production this hands off to Razorpay/UPI intent; here it mints a
 * payment record so the buyer gets a real ledger entry.
 */
export async function POST(request: NextRequest) {
  let body: { slug?: string; vpa?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const agent = body.slug ? getAgent(body.slug) : undefined;
  if (!agent) return NextResponse.json({ error: "Agent not found" }, { status: 404 });

  const vpa = (body.vpa ?? "").trim();
  if (!/^[\w.\-]{2,}@[a-z]{2,}$/i.test(vpa)) {
    return NextResponse.json({ error: "Enter a valid UPI ID, e.g. yourname@okhdfc" }, { status: 400 });
  }

  const payment = {
    id: shortId("pay"),
    agentSlug: agent.slug,
    amount: agent.pricePerRun,
    method: "upi" as const,
    vpa,
    status: "succeeded" as const,
    createdAt: new Date().toISOString(),
  };
  appendPayment(payment);

  return NextResponse.json({ payment }, { status: 201 });
}
