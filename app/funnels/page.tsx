import { AppShell } from "@/components/app/app-shell";
import { ModulePage } from "@/components/app/module-page";
import { modules } from "@/lib/demo-data";

export default function Page() {
  return (
    <AppShell>
      <ModulePage module={modules.funnels} />
    </AppShell>
  );
}
