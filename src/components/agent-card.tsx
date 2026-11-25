import Link from "next/link";
import { BadgeCheckIcon, FolderOpenIcon, GlobeIcon, MailIcon, DatabaseIcon, SendIcon, CreditCardIcon } from "lucide-react";
import { cn } from "cn";
import type { Permission } from "@/lib/types";

const PERMISSION_META: Record<Permission, { label: string; icon: React.ElementType }> = {
  "reads-files": { label: "Reads files", icon: FolderOpenIcon },
  "calls-internet": { label: "Calls the internet", icon: GlobeIcon },
  "accesses-email": { label: "Accesses email", icon: MailIcon },
  "stores-data": { label: "Stores data", icon: DatabaseIcon },
  "sends-messages": { label: "Sends messages", icon: SendIcon },
  "views-payments": { label: "Views payments", icon: CreditCardIcon },
};

export function permissionLabel(p: Permission): string {
  return PERMISSION_META[p].label;
}

interface PermissionChipProps {
  permission: Permission;
  dark?: boolean;
  size?: "sm" | "md";
}

export function PermissionChip({ permission, dark, size = "md" }: PermissionChipProps) {
  const { label, icon: Icon } = PERMISSION_META[permission];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border font-medium",
        size === "sm" ? "px-2.5 py-1 text-[0.72rem]" : "px-3 py-1.5 text-[0.8rem]",
        dark
          ? "border-bone/25 bg-bone/5 text-bone/85"
          : "border-border bg-cream text-ink/85",
      )}
    >
      <Icon className={cn("text-maroon", size === "sm" ? "size-3.5" : "size-4")} aria-hidden />
      {label}
    </span>
  );
}

interface PermissionListProps {
  permissions: Permission[];
  dark?: boolean;
}

export function PermissionList({ permissions, dark }: PermissionListProps) {
  return (
    <ul className="divide-y" style={{ borderColor: dark ? "color-mix(in srgb, var(--bone) 15%, transparent)" : "var(--border)" }}>
      {permissions.map((p) => {
        const { label, icon: Icon } = PERMISSION_META[p];
        return (
          <li key={p} className="flex items-center gap-3 py-3.5">
            <Icon className={cn("size-4.5 shrink-0", dark ? "text-gold-bright" : "text-maroon")} aria-hidden />
            <span className={cn("text-[0.9rem] font-medium", dark ? "text-bone/90" : "text-ink")}>
              {label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

interface VerifiedBadgeProps {
  dark?: boolean;
  accuracy?: number;
}

export function VerifiedBadge({ dark, accuracy }: VerifiedBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[0.7rem] font-bold tracking-[0.14em] uppercase",
        dark ? "text-gold-bright" : "text-pine",
      )}
    >
      <BadgeCheckIcon className="size-3.5" aria-hidden />
      Verified
      {accuracy !== undefined && (
        <>
          <span className="opacity-40">·</span>
          <span className="font-mono font-semibold">{accuracy}%</span>
        </>
      )}
    </span>
  );
}

interface AgentCardProps {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  accuracy: number;
  reliability: number;
  price: number;
  languages: string[];
  featured?: boolean;
}

export function AgentCard({ slug, name, tagline, category, accuracy, reliability, price, languages }: AgentCardProps) {
  return (
    <Link
      href={`/agents/${slug}`}
      className="group flex flex-col rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-maroon/40 hover:shadow-[0_12px_32px_-16px_rgba(109,26,46,0.35)] focus-visible:border-maroon focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-3">
        <VerifiedBadge accuracy={accuracy} />
        <span className="rounded-full border border-border bg-bone px-2.5 py-1 text-[0.7rem] font-medium text-muted-foreground">
          {category}
        </span>
      </div>

      <h3 className="mt-4 text-[1.05rem] leading-snug font-semibold text-ink transition-colors group-hover:text-maroon">
        {name}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-[0.85rem] leading-relaxed text-muted-foreground">
        {tagline}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 border-t pt-4">
        <div>
          <dt className="text-[0.68rem] tracking-wider text-muted-foreground uppercase">Reliability</dt>
          <dd className="mt-0.5 font-mono text-sm font-semibold text-pine">{reliability}%</dd>
        </div>
        <div className="text-right">
          <dt className="text-[0.68rem] tracking-wider text-muted-foreground uppercase">Per run</dt>
          <dd className="mt-0.5 font-display text-lg leading-none font-semibold text-maroon">
            ₹{price.toFixed(2)}
          </dd>
        </div>
      </dl>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {languages.slice(0, 3).map((lang) => (
          <span
            key={lang}
            className="rounded-sm bg-pine-soft px-1.5 py-0.5 text-[0.68rem] font-medium text-pine"
          >
            {lang}
          </span>
        ))}
      </div>
    </Link>
  );
}
