"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "cn";

const NAV = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#trust", label: "Trust & audit" },
  { href: "/sell", label: "Sell your agent" },
] as const;

function Logo() {
  return (
    <Link href="/" className="group flex items-baseline gap-2.5" aria-label="AgentKart home">
      <span
        aria-hidden
        className="size-2.5 shrink-0 rounded-full bg-maroon transition-transform duration-300 group-hover:scale-125"
      />
      <span className="text-[0.8rem] font-semibold tracking-[0.22em] uppercase">
        AgentKart
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-bone/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = item.href.startsWith("/#")
              ? false
              : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[0.82rem] font-medium text-ink/70 transition-colors hover:text-maroon",
                  active && "text-maroon",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-maroon" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" className="h-8 rounded-full px-4 text-[0.8rem]">
            <Link href="/marketplace">Browse agents</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              aria-label="Open menu"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-72 flex-col gap-0 bg-bone p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-16 items-center border-b px-5">
              <Logo />
            </div>
            <nav className="flex flex-col px-5 py-2" aria-label="Mobile">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b py-4 text-sm font-medium text-ink/80 transition-colors hover:text-maroon"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto p-5">
              <Button asChild className="w-full rounded-full">
                <Link href="/marketplace" onClick={() => setOpen(false)}>
                  Browse agents
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
