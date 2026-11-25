export type Permission =
  | "reads-files"
  | "calls-internet"
  | "accesses-email"
  | "stores-data"
  | "sends-messages"
  | "views-payments";

export interface SampleTask {
  id: string;
  label: string;
  input: string;
  output: string;
}

export interface ReportCard {
  accuracy: number;
  reliability: number;
  avgSpeedSec: number;
  costPerRun: number;
  testsPassed: number;
  testsTotal: number;
  runs: number;
  lastVerified: string;
}

export interface Agent {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: "Compliance" | "Operations" | "Support" | "Finance";
  languages: string[];
  seller: { name: string; location: string; since: string };
  permissions: Permission[];
  pricePerRun: number;
  verified: boolean;
  reportCard: ReportCard;
  sampleTasks: SampleTask[];
  tags: string[];
  featured?: boolean;
}

export type AuditKind = "permission" | "network" | "compute" | "output" | "billing";

export interface AuditEvent {
  /** ms offset from run start */
  t: number;
  kind: AuditKind;
  status: "granted" | "denied" | "ok" | "info";
  message: string;
}

export interface RunRecord {
  id: string;
  agentSlug: string;
  agentName: string;
  mode: "sandbox" | "paid";
  status: "completed" | "failed";
  taskLabel: string;
  cost: number;
  startedAt: string;
  durationMs: number;
  events: AuditEvent[];
  output: string;
  paymentId?: string;
}

export interface Payment {
  id: string;
  agentSlug: string;
  amount: number;
  method: "upi";
  vpa: string;
  status: "succeeded";
  createdAt: string;
}

export interface Listing {
  id: string;
  name: string;
  tagline: string;
  category: Agent["category"];
  pricePerRun: number;
  permissions: Permission[];
  contact: string;
  submittedAt: string;
  status: "test-bench" | "in-review" | "approved";
}
