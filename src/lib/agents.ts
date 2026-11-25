import type { Agent } from "./types";

/**
 * Phase-1 catalog — 10 verified agents in a single niche:
 * GST, invoicing & compliance for Indian small businesses.
 * Numbers mirror the investor deck where quoted (GST Invoice 94% / ₹0.80,
 * Hindi Support 91% / ₹1.20, Stock Reorder 96% / ₹0.50).
 */
export const AGENTS: Agent[] = [
  {
    slug: "gst-invoice-agent",
    name: "GST Invoice Agent",
    tagline: "Turns scanned bills into compliant, GST-ready invoices in seconds.",
    description:
      "Reads purchase bills and WhatsApp photos, extracts line items, applies the right HSN codes and GST slabs, and drafts a compliant tax invoice your accountant will actually accept. Built on 4,200+ real SMB invoices from Maharashtra and Gujarat.",
    category: "Compliance",
    languages: ["English", "हिन्दी", "ગુજરાતી"],
    seller: { name: "Tarun Mehta", location: "Pune, MH", since: "Mar 2025" },
    permissions: ["reads-files", "calls-internet", "stores-data"],
    pricePerRun: 0.8,
    verified: true,
    featured: true,
    reportCard: {
      accuracy: 94,
      reliability: 97,
      avgSpeedSec: 2.1,
      costPerRun: 0.8,
      testsPassed: 47,
      testsTotal: 50,
      runs: 18420,
      lastVerified: "2026-11-22",
    },
    tags: ["GST", "Invoicing", "HSN codes", "Tally export"],
    sampleTasks: [
      {
        id: "inv-1",
        label: "Photo of a purchase bill → tax invoice",
        input: "bill_scan_0421.jpg — Kirana purchase, 14 items, mixed 5% & 12% slabs",
        output:
          "INV-2026-0421 drafted · 14 line items · HSN auto-matched (13/14) · CGST+SGST ₹412.60 · 5% slab: 9 items, 12% slab: 5 items · exported to Tally XML ✓",
      },
      {
        id: "inv-2",
        label: "WhatsApp voice note → line items",
        input: "voice_note_2.m4a — 'do bag cement aur ek paint, char so ka'",
        output:
          "3 line items extracted · Cement 50kg × 2 @ ₹400 (HSN 2523, 28%) · Paint 10L × 1 @ ₹400 (HSN 3209, 18%) · invoice draft ready for review",
      },
      {
        id: "inv-3",
        label: "Mismatched bill → audit flags",
        input: "vendor_inv_883.pdf — supplier GSTIN checksum invalid, amount ≠ line sum",
        output:
          "2 red flags · GSTIN 27ABCDE1234F1Z5 checksum failed validation · line-sum ₹12,400 ≠ stated ₹12,900 (Δ ₹500) · held for human review, nothing posted to books",
      },
    ],
  },
  {
    slug: "hindi-support-agent",
    name: "Hindi Support Agent",
    tagline: "Answers customer questions in natural Hindi, 24×7, on WhatsApp.",
    description:
      "Handles order status, returns and refund queries in Devanagari Hindi with the tone of a shopkeeper who actually cares. Knows your catalogue, your pincode delays, and when to hand over to a human.",
    category: "Support",
    languages: ["हिन्दी", "English", "Hinglish"],
    seller: { name: "Priya Nair", location: "Jaipur, RJ", since: "Apr 2025" },
    permissions: ["accesses-email", "calls-internet", "sends-messages"],
    pricePerRun: 1.2,
    verified: true,
    featured: true,
    reportCard: {
      accuracy: 91,
      reliability: 95,
      avgSpeedSec: 1.8,
      costPerRun: 1.2,
      testsPassed: 46,
      testsTotal: 50,
      runs: 24103,
      lastVerified: "2026-11-21",
    },
    tags: ["WhatsApp", "Hindi", "Customer support", "Returns"],
    sampleTasks: [
      {
        id: "hin-1",
        label: "Return request in Hindi → policy-correct reply",
        input: "WhatsApp: 'bhaiya mera order abhi aaya hai, size chhota hai, wapas bhejna hai'",
        output:
          "Reply drafted: 'नमस्ते! चिंता न करें — 7 दिन के अंदर फ्री पिकअप हो जाएगा। पैकेट तैयार रखें, कल सुबह कूरियर आएगा।' · RMA created · pickup slot booked for tomorrow 10am–1pm",
      },
      {
        id: "hin-2",
        label: "Delay complaint → proactive status",
        input: "WhatsApp: 'order kab tak aayega? 4 din ho gaye'",
        output:
          "Looked up AWB 33829104 · stuck at Jaipur hub due to Diwali rush · replied with new ETA (tomorrow EOD) + ₹50 coupon for the delay · escalated to human only if customer still unhappy",
      },
      {
        id: "hin-3",
        label: "Ambiguous query → safe handoff",
        input: "WhatsApp: 'mere paise kat gaye par order nahi aaya'",
        output:
          "Payment ₹1,299 debited, no order found in system · refused to guess · handed to human with full transcript + UTR reference attached · auto-ack sent: 'एक मिनट, देख रहा हूँ'",
      },
    ],
  },
  {
    slug: "stock-reorder-agent",
    name: "Stock Reorder Agent",
    tagline: "Watches your shelves and places reorder lists before you run dry.",
    description:
      "Ingests daily sales from your billing app, models festival and weekday demand curves for your exact pincode, and prints a purchase list every evening — with the supplier phone numbers already on it.",
    category: "Operations",
    languages: ["English", "हिन्दी"],
    seller: { name: "Rahul Iyer", location: "Coimbatore, TN", since: "Feb 2025" },
    permissions: ["reads-files", "calls-internet", "stores-data"],
    pricePerRun: 0.5,
    verified: true,
    featured: true,
    reportCard: {
      accuracy: 96,
      reliability: 98,
      avgSpeedSec: 1.2,
      costPerRun: 0.5,
      testsPassed: 48,
      testsTotal: 50,
      runs: 31877,
      lastVerified: "2026-11-23",
    },
    tags: ["Inventory", "Demand forecast", "Purchase list"],
    sampleTasks: [
      {
        id: "stk-1",
        label: "Weekly sales CSV → reorder list",
        input: "sales_week_46.csv — 214 SKUs, Diwali week spike in sweets & dry fruits",
        output:
          "17 SKUs below reorder point · 4 fast-movers flagged for 1.8× order · supplier list attached (Rao Traders, Krishna Agencies) · total PO value ₹41,200 · sent to owner on WhatsApp",
      },
      {
        id: "stk-2",
        label: "Festival-aware demand shift",
        input: "Same SKU set, week-47 comparison with last year's Diwali week",
        output:
          "Demand model refreshed · milk +38%, ghee +52%, namkeen +21% vs normal week · safety stock raised on 6 SKUs · stockout risk dropped 22% → 3%",
      },
      {
        id: "stk-3",
        label: "Supplier late → re-plan",
        input: "Event: Rao Traders delivery delayed 2 days (call transcript attached)",
        output:
          "Re-planned: 3 SKUs re-sourced to Krishna Agencies (₹12 higher/unit, in stock) · owner notified · no shelf gaps projected this week",
      },
    ],
  },
  {
    slug: "eway-bill-agent",
    name: "e-Way Bill Agent",
    tagline: "Generates and reconciles e-way bills before the truck leaves.",
    description:
      "Matches invoices to consignments, validates part-A/part-B entries, and flags bills that will die at a checkpoint — so your goods move instead of sitting at a tax barrier.",
    category: "Compliance",
    languages: ["English", "हिन्दी"],
    seller: { name: "Amit Chowdhury", location: "Kolkata, WB", since: "May 2025" },
    permissions: ["reads-files", "calls-internet", "stores-data"],
    pricePerRun: 0.9,
    verified: true,
    reportCard: {
      accuracy: 93,
      reliability: 96,
      avgSpeedSec: 2.4,
      costPerRun: 0.9,
      testsPassed: 46,
      testsTotal: 50,
      runs: 9640,
      lastVerified: "2026-11-20",
    },
    tags: ["e-Way bill", "Logistics", "GST transport"],
    sampleTasks: [
      {
        id: "ewb-1",
        label: "Invoice batch → 8 e-way bills",
        input: "8 invoices, 3 states (WB/JH/OR), one consignment split across 2 vehicles",
        output:
          "8/8 part-A generated · part-B attached to correct vehicle IDs · validity dates aligned to dispatch plan · 1 bill held: invoice value ≠ e-way value (₹400 rounding)",
      },
      {
        id: "ewb-2",
        label: "Checkpoint risk scan",
        input: "Tonight's dispatch list — 5 vehicles, 2 crossing state border at night",
        output:
          "5 bills scanned · 2 high-risk: one missing part-B, one expiring in 40 km · both fixed in 11s · convoy cleared to move",
      },
      {
        id: "ewb-3",
        label: "Monthly reconciliation",
        input: "nov_eway_export.csv vs sales register",
        output:
          "312 bills reconciled · 3 mismatches found (2 value, 1 vehicle) · GSTR-1 impact: nil · report emailed to accountant",
      },
    ],
  },
  {
    slug: "gstr3b-filing-agent",
    name: "GSTR-3B Summary Agent",
    tagline: "Drafts your monthly GSTR-3B from the books, with every number traced.",
    description:
      "Reconciles input credit against outward supply, catches the entries that get notices, and hands your accountant a draft where every figure links back to a voucher.",
    category: "Compliance",
    languages: ["English"],
    seller: { name: "CA Sneha Kulkarni", location: "Nagpur, MH", since: "Jan 2025" },
    permissions: ["reads-files", "calls-internet"],
    pricePerRun: 2.5,
    verified: true,
    reportCard: {
      accuracy: 97,
      reliability: 98,
      avgSpeedSec: 4.6,
      costPerRun: 2.5,
      testsPassed: 49,
      testsTotal: 50,
      runs: 5128,
      lastVerified: "2026-11-19",
    },
    tags: ["GSTR-3B", "ITC", "CA tool", "Reconciliation"],
    sampleTasks: [
      {
        id: "g3b-1",
        label: "Tally export → GSTR-3B draft",
        input: "nov_2026_books.zip — 1,204 vouchers, 3 GSTINs",
        output:
          "Table 3.1 outward ₹18,42,000 · ITC claimed ₹2,11,400 (2 entries flagged: E-invoice mismatch ₹4,200) · draft ready, every cell hyperlinked to source voucher",
      },
      {
        id: "g3b-2",
        label: "Notice-risk scan",
        input: "Quarter's books — vendor GSTINs with filing gaps",
        output:
          "2 vendors filed late (ITC at risk: ₹18,900) · 1 GSTIN inactive since Aug · suggested: hold those credits this month · draft adjusted",
      },
      {
        id: "g3b-3",
        label: "Amendment catch",
        input: "Last month's filed return vs this month's books",
        output:
          "1 outward supply was booked in wrong period (₹62,000) · recommended next-month addition · note added for the accountant",
      },
    ],
  },
  {
    slug: "tally-reconcile-agent",
    name: "Tally Reconcile Agent",
    tagline: "Matches bank statements to vouchers while you sleep.",
    description:
      "Upload the day's bank statement; wake up to reconciled vouchers, UTR-level matches, and a short list of the four entries that genuinely need your brain.",
    category: "Finance",
    languages: ["English", "हिन्दी"],
    seller: { name: "Vikram Desai", location: "Surat, GJ", since: "Mar 2025" },
    permissions: ["reads-files", "stores-data"],
    pricePerRun: 0.7,
    verified: true,
    reportCard: {
      accuracy: 95,
      reliability: 97,
      avgSpeedSec: 3.1,
      costPerRun: 0.7,
      testsPassed: 47,
      testsTotal: 50,
      runs: 14205,
      lastVerified: "2026-11-22",
    },
    tags: ["Bank reconciliation", "Tally", "UTR matching"],
    sampleTasks: [
      {
        id: "rec-1",
        label: "Bank statement → matched vouchers",
        input: "hdfc_nov_1-15.pdf — 186 transactions",
        output:
          "182/186 auto-matched (UTR + amount + narration) · 4 pending: 2 split payments, 1 TDS deduction, 1 unknown UTR · reconciled file ready for Tally import",
      },
      {
        id: "rec-2",
        label: "Duplicate payment catch",
        input: "Same vendor paid twice in 3 minutes, different references",
        output:
          "Duplicate flagged: ₹24,000 to Sharma Enterprises, 2 min apart, same invoice #SE-881 · blocked from auto-match · owner alerted before day-end close",
      },
      {
        id: "rec-3",
        label: "Cash-heavy day reconciliation",
        input: "Mixed statement — 60% cash deposits, no UTRs",
        output:
          "Matched by date+amount clusters · 9 deposits mapped to 9 day-end cash vouchers · 1 unmatched (₹3,500) left for human · confidence 91%",
      },
    ],
  },
  {
    slug: "msme-reminder-agent",
    name: "MSME Payment Reminder Agent",
    tagline: "Chases late payers politely — and keeps the 45-day rule in view.",
    description:
      "Tracks receivables against MSME payment terms, sends graduated reminders in the client's own language, and escalates only when courtesy stops working.",
    category: "Finance",
    languages: ["English", "हिन्दी", "தமிழ்"],
    seller: { name: "Lakshmi Raman", location: "Chennai, TN", since: "Jun 2025" },
    permissions: ["accesses-email", "sends-messages", "stores-data"],
    pricePerRun: 0.6,
    verified: true,
    reportCard: {
      accuracy: 92,
      reliability: 96,
      avgSpeedSec: 1.5,
      costPerRun: 0.6,
      testsPassed: 46,
      testsTotal: 50,
      runs: 7732,
      lastVerified: "2026-11-18",
    },
    tags: ["Receivables", "MSME act", "Reminders"],
    sampleTasks: [
      {
        id: "msm-1",
        label: "Ageing report → reminder sequence",
        input: "receivables_ageing.xlsx — 22 parties, 6 past 45 days",
        output:
          "Gentle nudge sent to 6 · firm-but-polite notice drafted for 2 (day 52, day 61) · 1 marked 'known slow, call instead' · no reminders to parties with open disputes",
      },
      {
        id: "msm-2",
        label: "45-day rule check",
        input: "PO dated 1 Sep, goods received 9 Sep, still unpaid",
        output:
          "Statutory due date passed (45 days from acceptance) · interest at 3× bank rate accrues from day 46 · reminder upgraded to formal notice with clause reference",
      },
      {
        id: "msm-3",
        label: "Payment promise tracking",
        input: "Client replied: 'money by Friday'",
        output:
          "Promise logged (₹82,000, Friday) · auto-follow-up scheduled Saturday 11am · if broken, escalate to owner with full history",
      },
    ],
  },
  {
    slug: "petty-cash-agent",
    name: "Petty Cash Agent",
    tagline: "Snap a receipt, and the expense is already in the books.",
    description:
      "OCR that actually understands Indian receipts — GSTIN, split payments, the tea-shop chit — and posts them to the right head with the photo attached as evidence.",
    category: "Finance",
    languages: ["English", "हिन्दी"],
    seller: { name: "Deepak Verma", location: "Indore, MP", since: "Apr 2025" },
    permissions: ["reads-files", "stores-data"],
    pricePerRun: 0.3,
    verified: true,
    reportCard: {
      accuracy: 96,
      reliability: 98,
      avgSpeedSec: 0.9,
      costPerRun: 0.3,
      testsPassed: 48,
      testsTotal: 50,
      runs: 41220,
      lastVerified: "2026-11-23",
    },
    tags: ["Petty cash", "OCR", "Receipts"],
    sampleTasks: [
      {
        id: "pc-1",
        label: "Crumpled receipt → ledger entry",
        input: "IMG_2871.jpg — chai shop chit, ₹240, faded, folded twice",
        output:
          "OCR confidence 97% · ₹240 → Head: Staff Welfare · vendor: Shree Tea Stall · receipt image archived · voucher PC-1182 created",
      },
      {
        id: "pc-2",
        label: "Split-payment receipt",
        input: "Hardware bill ₹4,850 — paid ₹3,000 UPI + ₹1,850 cash",
        output:
          "2-way split posted · UPI ref + cash slip both attached · balance ₹0 · no duplicate entry",
      },
      {
        id: "pc-3",
        label: "Illegible total → human queue",
        input: "IMG_2903.jpg — total smudged, items readable",
        output:
          "Items sum ₹1,120 (readable) but printed total unreadable · posted as provisional ₹1,120 · flagged for owner confirmation · confidence below threshold, not finalised",
      },
    ],
  },
  {
    slug: "vendor-catalog-agent",
    name: "Vendor Catalog Agent",
    tagline: "Builds a clean product catalog from your supplier's messy price lists.",
    description:
      "PDF price lists in, structured catalogue out — with HSN, MRP, margin and a storefront-ready photo brief for every SKU.",
    category: "Operations",
    languages: ["English", "हिन्दी", "मराठी"],
    seller: { name: "Sneha Joshi", location: "Nashik, MH", since: "Jul 2025" },
    permissions: ["reads-files", "calls-internet", "stores-data"],
    pricePerRun: 1.0,
    verified: true,
    reportCard: {
      accuracy: 93,
      reliability: 95,
      avgSpeedSec: 3.8,
      costPerRun: 1.0,
      testsPassed: 46,
      testsTotal: 50,
      runs: 4891,
      lastVerified: "2026-11-17",
    },
    tags: ["Catalog", "Price lists", "HSN", "Storefront"],
    sampleTasks: [
      {
        id: "cat-1",
        label: "Supplier PDF → 60-SKU catalogue",
        input: "deo_price_list_dec.pdf — 60 items, inconsistent columns, 3 pages of footnotes",
        output:
          "60/60 SKUs parsed · MRP & trade price separated · footnotes converted to discount rules · 4 duplicate SKUs merged · CSV + storefront JSON exported",
      },
      {
        id: "cat-2",
        label: "Margin check across list",
        input: "Parsed catalogue vs your last purchase prices",
        output:
          "9 SKUs below 12% margin flagged · 2 better substituted with alternate pack sizes · suggested retail repriced on 5",
      },
      {
        id: "cat-3",
        label: "Photo brief generation",
        input: "Top 10 SKUs for this week's flyer",
        output:
          "10 shot briefs generated (angle, background, size reference) · HSN + price card text included · ready for the intern with a phone camera",
      },
    ],
  },
  {
    slug: "udyam-certificate-agent",
    name: "Udyam Registration Agent",
    tagline: "Gets your MSME Udyam certificate right the first time.",
    description:
      "Fills the Udyam form from your ITR and GST data, catches the classification mistakes that get applications rejected, and tracks the certificate to your inbox.",
    category: "Compliance",
    languages: ["English", "हिन्दी"],
    seller: { name: "Ravi Prakash", location: "Patna, BR", since: "Aug 2025" },
    permissions: ["reads-files", "calls-internet", "accesses-email"],
    pricePerRun: 1.5,
    verified: true,
    reportCard: {
      accuracy: 95,
      reliability: 96,
      avgSpeedSec: 2.9,
      costPerRun: 1.5,
      testsPassed: 47,
      testsTotal: 50,
      runs: 3104,
      lastVerified: "2026-11-16",
    },
    tags: ["Udyam", "MSME", "Registration"],
    sampleTasks: [
      {
        id: "udy-1",
        label: "Existing trade licence → Udyam draft",
        input: "Trade licence + last ITR + GST returns (2 years)",
        output:
          "Form pre-filled · activity classified as Manufacturing (NIC 2599) not Trading · investment ₹42L vs turnover ₹1.2Cr → Micro classification confirmed · ready to submit",
      },
      {
        id: "udy-2",
        label: "Rejection autopsy",
        input: "Previous rejection: 'NIC code mismatch'",
        output:
          "Root cause: primary activity chosen as 'Trading' while ITR shows manufacturing income · corrected NIC 25-99 · reapplication drafted with note explaining the change",
      },
      {
        id: "udy-3",
        label: "Certificate delivery watch",
        input: "Application submitted, reference no. attached",
        output:
          "Tracking via reference no. · certificate PDF received via email · saved to Drive folder 'MSME' · renewal reminder set for 5 years",
      },
    ],
  },
];

export function getAgent(slug: string): Agent | undefined {
  return AGENTS.find((a) => a.slug === slug);
}
