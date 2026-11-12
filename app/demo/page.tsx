import type { Metadata } from "next";
import Script from "next/script";
import { FlowPageView } from "@/components/marketing/page-renderers";
import { flowSteps } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Request a Digital360 walkthrough",
  description: "Choose one CRM workflow to explore with sample data during a guided Digital360 private-launch walkthrough.",
  alternates: { canonical: "/demo" },
};

export default function Page() {
  return <>
    <FlowPageView flow={flowSteps.find((flow) => flow.slug === "/demo")!} />
    <Script src="/walkthrough.js" strategy="afterInteractive" />
  </>;
}
