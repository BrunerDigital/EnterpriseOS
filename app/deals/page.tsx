import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { pipeline } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function DealsPage() {
  return (
    <AppShell>
      <PageHeader title="Deals pipeline" description="Kanban-style pipeline foundation with stages, deal values, notes, tasks, and AI next steps." action="New deal" />
      <section className="grid gap-4 xl:grid-cols-4">
        {pipeline.map((stage) => (
          <Card key={stage.stage}>
            <CardContent className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">{stage.stage}</h2>
                <Badge variant="secondary">{stage.deals.length}</Badge>
              </div>
              <div className="flex flex-col gap-3">
                {stage.deals.map((deal) => (
                  <div key={deal.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <div className="font-medium">{deal.name}</div>
                    <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{deal.owner}</span>
                      <span>{formatCurrency(deal.value)}</span>
                    </div>
                    <Progress className="mt-4" value={deal.score} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </AppShell>
  );
}
