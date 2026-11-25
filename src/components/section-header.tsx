import { cn } from "cn";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
  dark?: boolean;
}

/**
 * Editorial section header — oversized serif title on the left,
 * numbered kicker on the right, hairline rule beneath. Mirrors the
 * deck's slide furniture so the site reads as one system.
 */
export function SectionHeader({ index, label, title, aside, className, dark }: SectionHeaderProps) {
  return (
    <header className={cn("border-b pb-6", dark ? "border-bone/20" : "border-border", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2
          className={cn(
            "max-w-2xl font-display text-3xl leading-[1.08] font-medium tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
            dark ? "text-bone" : "text-ink",
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "shrink-0 text-[0.7rem] font-semibold tracking-[0.18em] whitespace-nowrap uppercase",
            dark ? "text-gold-bright" : "text-maroon",
          )}
        >
          <span className="font-mono">{index}</span>
          <span className="mx-1.5 opacity-50">—</span>
          {label}
        </p>
      </div>
      {aside ? (
        <div className={cn("mt-5 text-sm", dark ? "text-bone/60" : "text-muted-foreground")}>
          {aside}
        </div>
      ) : null}
    </header>
  );
}
