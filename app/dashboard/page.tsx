import { AppShellClient } from "@/components/app/app-shell-client";
import { InquiryOverview } from "@/components/app/inquiry-overview";
import { SampleDashboard, SampleDashboardPreview } from "@/components/app/sample-dashboard-preview";
import { getAppSession } from "@/lib/auth/session";
import { loadInquiryOverview } from "@/lib/server/inquiry-overview";
import { canViewInquiryWorkspace } from "@/lib/server/inquiry-workspace";

export const dynamic = "force-dynamic";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ inquiryDays?: string }> }) {
  const [session, filters] = await Promise.all([getAppSession(), searchParams]);
  if (!canViewInquiryWorkspace(session)) return <AppShellClient session={session}><SampleDashboard /></AppShellClient>;

  const days = filters.inquiryDays === "7" ? 7 : 30;
  const overview = await loadInquiryOverview(session, days).catch(() => ({ status: "failed" as const }));

  return (
    <AppShellClient session={overview.status === "ready" ? { ...session, workspace: overview.workspace } : session}>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">Review new inquiries and see what brought them in.</p>
        </header>
        <InquiryOverview days={days} overview={overview} />
        <SampleDashboardPreview />
      </div>
    </AppShellClient>
  );
}
