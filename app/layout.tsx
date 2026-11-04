import type { Metadata } from "next";
import Script from "next/script";
import { TrackingScripts } from "@/components/app/tracking-scripts";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://digital360.brunerdigital.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: "/brand/digital-360-logo.jpg" },
  title: {
    default: "Digital360 by BrunerDigital | White-label AI Business Operating System",
    template: "%s | Digital360 by BrunerDigital"
  },
  alternates: {
    canonical: siteUrl
  },
  description: "White-label AI-powered business suite for agencies, service businesses, franchises, and multi-location growth teams.",
  keywords: ["Digital360", "BrunerDigital", "white-label CRM", "AI business operating system", "agency CRM", "marketing automation", "client portal"],
  openGraph: {
    title: "Digital360 by BrunerDigital",
    description: "Run CRM, AI automation, funnels, conversations, calendars, reputation, reporting, billing, portals, and white-label controls from one place.",
    url: siteUrl,
    siteName: "Digital360 by BrunerDigital",
    images: [{ url: "/og/brunerdigital-og.png", width: 1200, height: 630, alt: "Digital360 product preview" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital360 by BrunerDigital",
    description: "The white-label AI business operating system for modern growth teams.",
    images: ["/og/brunerdigital-og.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <TrackingScripts />
        <Script src="/lead-capture.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
