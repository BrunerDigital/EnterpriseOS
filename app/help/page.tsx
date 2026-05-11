import { MarketingPageView } from "@/components/marketing/page-renderers";
import { allPages } from "@/lib/marketing";

export default function Page() {
  return <MarketingPageView page={allPages["/help"]} />;
}
