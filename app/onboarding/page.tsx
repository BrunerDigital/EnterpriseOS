import { FlowPageView } from "@/components/marketing/page-renderers";
import { flowSteps } from "@/lib/marketing";

export default function Page() {
  return <FlowPageView flow={flowSteps.find((f) => f.slug === "/onboarding")!} />;
}
