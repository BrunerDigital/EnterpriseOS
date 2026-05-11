import { FunnelPageView } from "@/components/marketing/page-renderers";
import { funnelTemplates } from "@/lib/marketing";
export default function Page() { return <FunnelPageView funnel={funnelTemplates.find((f) => f.slug === "/funnels/free-audit")!} />; }
