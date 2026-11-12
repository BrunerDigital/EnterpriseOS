import Script from "next/script";
import { FlowPageView } from "@/components/marketing/page-renderers";
import { flowSteps } from "@/lib/marketing";

export default function Page() {
  return <>
    <FlowPageView flow={flowSteps.find((flow) => flow.slug === "/demo")!} />
    <Script src="/walkthrough.js" strategy="afterInteractive" />
  </>;
}
