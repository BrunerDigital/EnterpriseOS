import Link from "next/link";
import { AppShell } from "@/components/app/app-shell";
import { IntegrationStatusPanel } from "@/components/app/integration-status-panel";
import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
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
        action="Review systems"
      />
      <div className="mb-6 rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-foreground">Admin platform configuration</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Add account IDs, API keys, webhooks, analytics pixels, routing emails, and enabled datapoints in one secure admin area.
            </p>
          </div>
          <Button asChild>
            <Link href="/settings/config">Open config</Link>
          </Button>
        </div>
      </div>
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
