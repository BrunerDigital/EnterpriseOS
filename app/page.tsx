import { MarketingPageView } from "@/components/marketing/page-renderers";
import { homepage } from "@/lib/marketing";

export default function Home() {
  return <MarketingPageView page={homepage} />;
}
