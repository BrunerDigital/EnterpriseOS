import { AppShell } from "@/components/app/app-shell";
import { ModulePage } from "@/components/app/module-page";
import { modules } from "@/lib/demo-data";
import { requireAdmin } from "@/lib/auth/guards";

export default async function Page() {
  await requireAdmin();

  return (
    <AppShell>
      <ModulePage module={modules.agency} />
    </AppShell>
  );
}
