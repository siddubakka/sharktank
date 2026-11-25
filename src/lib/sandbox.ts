import type { Agent, AuditEvent, RunRecord } from "./types";
import { shortId } from "./format";

const PERMISSION_COPY: Record<string, string> = {
  "reads-files": "sandbox: mounted sample files (read-only)",
  "calls-internet": "sandbox: outbound network allowed (allowlist)",
  "accesses-email": "sandbox: sample mailbox opened (read-only)",
  "stores-data": "sandbox: scratch store mounted (ephemeral)",
  "sends-messages": "sandbox: message channel dry-run (nothing sent)",
  "views-payments": "sandbox: payment ledger masked (read-only)",
};

/** Deterministic-ish jitter so runs feel live but replayable per task. */
function seedFrom(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296;
}

/**
 * Simulates an audited execution of an agent inside the AgentKart sandbox.
 * Every permission the agent holds is explicitly granted (or refused) on the
 * record — that audit trail IS the product's trust story.
 */
export function executeRun(agent: Agent, taskId: string, mode: "sandbox" | "paid"): RunRecord {
  const task = agent.sampleTasks.find((t) => t.id === taskId) ?? agent.sampleTasks[0];
  const rand = seedFrom(agent.slug + task.id + mode);
  const events: AuditEvent[] = [];
  let cursor = 0;

  const push = (kind: AuditEvent["kind"], status: AuditEvent["status"], message: string, step: number) => {
    cursor += step;
    events.push({ t: cursor, kind, status, message });
  };

  push("permission", "info", `run.start mode=${mode} agent=${agent.slug} task=${task.id}`, 12);

  // Permission grants — the audit trail buyers inspect.
  for (const perm of agent.permissions) {
    const denied = mode === "sandbox" && perm === "sends-messages" && agent.slug.includes("hindi");
    push(
      "permission",
      denied ? "denied" : "granted",
      denied ? `permission refused by policy: ${perm} (sandbox cannot notify real customers)` : PERMISSION_COPY[perm],
      90 + Math.floor(rand * 120)
    );
  }

  push("compute", "ok", `input parsed · ${task.input.slice(0, 72)}${task.input.length > 72 ? "…" : ""}`, 240);

  if (agent.permissions.includes("calls-internet")) {
    push("network", "ok", "external lookup ok · 2 endpoints on allowlist · 0 trackers", 160 + Math.floor(rand * 200));
  }

  push(
    "compute",
    "ok",
    `policy check passed · ${agent.reportCard.testsPassed}/${agent.reportCard.testsTotal} benchmark suites green`,
    180
  );

  const baseMs = agent.reportCard.avgSpeedSec * 1000;
  const jitter = Math.floor((rand - 0.5) * baseMs * 0.24);
  const computeMs = Math.max(400, baseMs + jitter - cursor);
  push("compute", "ok", `reasoning complete in ${(computeMs / 1000).toFixed(1)}s`, computeMs);

  push("output", "ok", task.output, 60);

  if (mode === "paid") {
    push(
      "billing",
      "ok",
      `charged ₹${agent.pricePerRun.toFixed(2)} · pay-per-run · invoice added to ledger`,
      40
    );
  } else {
    push("billing", "info", "sandbox run · ₹0.00 charged · sample data only", 40);
  }

  push("permission", "info", "run.end status=completed · scratch store wiped", 30);

  return {
    id: shortId(mode === "paid" ? "run" : "sbox"),
    agentSlug: agent.slug,
    agentName: agent.name,
    mode,
    status: "completed",
    taskLabel: task.label,
    cost: mode === "paid" ? agent.pricePerRun : 0,
    startedAt: new Date().toISOString(),
    durationMs: cursor,
    events,
    output: task.output,
  };
}
