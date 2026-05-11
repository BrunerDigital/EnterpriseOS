import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://brunerdigital.example"),
  title: {
    default: "BrunerDigital | White-label AI Business Operating System",
    template: "%s | BrunerDigital"
  },
  description: "White-label AI-powered business suite for agencies, service businesses, franchises, and multi-location growth teams.",
  openGraph: {
    title: "BrunerDigital",
    description: "Run CRM, AI automation, funnels, conversations, calendars, reputation, reporting, billing, portals, and white-label controls from one place.",
    url: "https://brunerdigital.example",
    siteName: "BrunerDigital",
    images: [{ url: "/og/brunerdigital-og.png", width: 1200, height: 630, alt: "BrunerDigital product preview" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BrunerDigital",
    description: "The white-label AI business operating system for modern growth teams."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
