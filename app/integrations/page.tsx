import { AppShell } from "@/components/app/app-shell";
import { IntegrationStatusPanel } from "@/components/app/integration-status-panel";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIntegrationStatuses, summarizeReadiness } from "@/lib/integrations";

export default function Page() {
  const statuses = getIntegrationStatuses();
  const summary = summarizeReadiness(statuses);

  return (
    <AppShell>
      <PageHeader
        title="Integrations"
        description="Production readiness for payments, messaging, email, calendar, ads, AI, analytics, and lead routing."
        action="Connect app"
      />
      <section className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{summary.connected}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-400">Connected</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{summary.ready}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-400">Partially ready</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{summary.needsCredentials}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-400">Need credentials</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{summary.total}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-400">Tracked systems</CardContent>
        </Card>
      </section>
      <IntegrationStatusPanel statuses={statuses} />
    </AppShell>
  );
}
