import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://enterpriseos.example"),
  title: {
    default: "EnterpriseOS | White-label AI Business Operating System",
    template: "%s | EnterpriseOS"
  },
  description: "White-label AI-powered business suite for agencies, service businesses, franchises, and multi-location growth teams.",
  openGraph: {
    title: "EnterpriseOS",
    description: "Run CRM, AI automation, funnels, conversations, calendars, reputation, reporting, billing, portals, and white-label controls from one place.",
    url: "https://enterpriseos.example",
    siteName: "EnterpriseOS",
    images: [{ url: "/og/enterpriseos-og.png", width: 1200, height: 630, alt: "EnterpriseOS product preview" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "EnterpriseOS",
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
