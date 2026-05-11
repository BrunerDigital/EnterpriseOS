import { GTMLanePage } from "@/components/marketing/gtm-lane-page";
import { getGtmLane } from "@/lib/gtm-lanes";

export default function Page() {
  return <GTMLanePage lane={getGtmLane("/gtm/franchises")!} />;
}
