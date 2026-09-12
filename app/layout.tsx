import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/data/siteConfig";
import { QuoteProvider } from "@/lib/quote-context";
import Navbar from "@/components/Navbar";
import QuoteModal from "@/components/QuoteModal";
import MobileBar from "@/components/MobileBar";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${siteConfig.companyName} — Premium cleaning in ${siteConfig.city}`,
  description: `${siteConfig.hero.sub} Serving ${siteConfig.city}. Call ${siteConfig.phone}.`,
  icons: { icon: siteConfig.logo },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { colors } = siteConfig;

  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable}`}>
      <body
        style={
          {
            "--accent": colors.accent,
            "--accent-ink": colors.accentInk,
            "--bg": colors.bg,
            "--bg-elevated": colors.bgElevated,
            "--card": colors.card,
            "--text": colors.text,
            "--muted": colors.muted,
            "--border": colors.border,
            "--font-display": "var(--font-outfit), system-ui, sans-serif",
            "--font-body": "var(--font-jakarta), system-ui, sans-serif",
          } as React.CSSProperties
        }
      >
        <QuoteProvider>
          <div className="grain" aria-hidden="true" />
          <Navbar />
          {children}
          <QuoteModal />
          <MobileBar />
        </QuoteProvider>
      </body>
    </html>
  );
}
