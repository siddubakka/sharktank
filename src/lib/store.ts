import fs from "node:fs";
import path from "node:path";
import type { Listing, Payment, RunRecord } from "./types";

/**
 * Tiny JSON-file store. Good enough for a demo marketplace, zero setup,
 * survives restarts. Lives in .data/ (gitignored).
 */
interface DB {
  runs: RunRecord[];
  payments: Payment[];
  listings: Listing[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_PATH = path.join(DATA_DIR, "db.json");

const EMPTY: DB = { runs: [], payments: [], listings: [] };

function load(): DB {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<DB>;
    return { runs: parsed.runs ?? [], payments: parsed.payments ?? [], listings: parsed.listings ?? [] };
  } catch {
    return { ...EMPTY, runs: [], payments: [], listings: [] };
  }
}

function save(db: DB): void {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
  } catch {
    // Non-fatal: demo continues in-memory for this process.
  }
}

export function appendRun(run: RunRecord): void {
  const db = load();
  db.runs.unshift(run);
  db.runs = db.runs.slice(0, 200);
  save(db);
}

export function listRuns(): RunRecord[] {
  return load().runs;
}

export function appendPayment(payment: Payment): void {
  const db = load();
  db.payments.unshift(payment);
  db.payments = db.payments.slice(0, 100);
  save(db);
}

export function appendListing(listing: Listing): void {
  const db = load();
  db.listings.unshift(listing);
  db.listings = db.listings.slice(0, 50);
  save(db);
}

export function listListings(): Listing[] {
  return load().listings;
}
