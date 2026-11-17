import { AppShell } from "@/components/app/app-shell";
import { AnalyticsShowcase, FunnelVelocity } from "@/components/app/analytics-visuals";
import { IntegrationStatusPanel } from "@/components/app/integration-status-panel";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { modules } from "@/lib/demo-data";
import { getIntegrationStatuses } from "@/lib/integrations";

export default function Page() {
  const trackingStatuses = getIntegrationStatuses().filter((status) => ["analytics", "lead-routing", "booking"].includes(status.key));

  return (
    <AppShell>
      <PageHeader title={modules.reporting.title} description={modules.reporting.description} action="Export report" />
      <AnalyticsShowcase />
      <section className="mt-layout grid gap-layout xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <FunnelVelocity />
        <Card>
          <CardHeader>
            <CardTitle>Launch conversion events</CardTitle>
            <CardDescription>Tracked through the lead capture script and optional pixels</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {["Page view", "demo_requested", "funnel_lead_captured", "Google Ads conversion", "Meta Lead", "LinkedIn conversion"].map((event) => (
              <div key={event} className="glass-inset flex flex-wrap items-center justify-between gap-x-4 gap-y-1 p-inset text-sm">
                <span className="font-medium text-white">{event}</span>
                <span className="text-slate-400">Ready when tag is configured</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      <section className="mt-6">
        <IntegrationStatusPanel statuses={trackingStatuses} />
      </section>
    </AppShell>
  );
}
