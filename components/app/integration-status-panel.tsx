import { CheckCircle2, CircleDot, PlugZap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IntegrationStatus } from "@/lib/integrations";

const tone: Record<IntegrationStatus["readiness"], { label: string; variant: "success" | "secondary" | "warning" }> = {
  connected: { label: "Connected", variant: "success" },
  ready: { label: "Partially ready", variant: "warning" },
  needs_credentials: { label: "Needs credentials", variant: "secondary" }
};

export function IntegrationStatusPanel({ statuses }: { statuses: IntegrationStatus[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {statuses.map((item) => {
        const statusTone = tone[item.readiness];
        return (
          <Card key={item.key}>
            <CardHeader className="flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <PlugZap className="size-5 text-sky-300" />
                  {item.name}
                </CardTitle>
                <CardDescription>{item.category}</CardDescription>
              </div>
              <Badge variant={statusTone.variant}>{statusTone.label}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-slate-400">{item.nextStep}</p>
              <div className="mt-5 grid gap-3">
                {item.configured.length > 0 ? (
                  <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-100">
                      <CheckCircle2 className="size-4" />
                      Configured
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.configured.map((name) => (
                        <span key={name} className="rounded-md bg-slate-950/60 px-2 py-1 text-xs text-emerald-100">{name}</span>
                      ))}
                    </div>
                  </div>
                ) : null}
                {item.missing.length > 0 ? (
                  <div className="rounded-lg border border-white/10 bg-white/[0.025] p-3">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
                      <CircleDot className="size-4 text-slate-500" />
                      Required next
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.missing.map((name) => (
                        <span key={name} className="rounded-md bg-slate-950/60 px-2 py-1 text-xs text-slate-400">{name}</span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
