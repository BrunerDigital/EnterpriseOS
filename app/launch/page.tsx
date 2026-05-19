import { AppShell } from "@/components/app/app-shell";
import { LaunchCenter } from "@/components/app/launch-center";
import { requireAdmin } from "@/lib/auth/guards";
import { getLaunchCenterData } from "@/lib/launch-center";

export default async function Page() {
  const session = await requireAdmin();
  const data = await getLaunchCenterData(session);

  return (
    <AppShell>
      <LaunchCenter data={data} />
    </AppShell>
  );
}
