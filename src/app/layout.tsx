import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-deva",
  subsets: ["devanagari", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AgentKart — Verified AI agents. Try before you buy.",
    template: "%s · AgentKart",
  },
  description:
    "The trusted marketplace for Indian small businesses — sandbox-tested, permission-audited, and priced strictly per run.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} ${notoDevanagari.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
