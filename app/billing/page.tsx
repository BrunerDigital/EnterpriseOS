import { AppShell } from "@/components/app/app-shell";
import { ModulePage } from "@/components/app/module-page";
import { modules } from "@/lib/demo-data";
import { requireBillingAccess } from "@/lib/auth/guards";

export default async function Page() {
  await requireBillingAccess();

  return <AppShell><ModulePage module={modules.billing} /></AppShell>;
}
