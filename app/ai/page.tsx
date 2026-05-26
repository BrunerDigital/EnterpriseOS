import { AppShell } from "@/components/app/app-shell";
import { IntegrationStatusPanel } from "@/components/app/integration-status-panel";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { modules } from "@/lib/demo-data";
import { getIntegrationStatuses } from "@/lib/integrations";

export default function Page() {
  const openAiStatus = getIntegrationStatuses().filter((status) => status.key === "openai");
  const capabilities = [
    "AI contact summary",
    "AI lead scoring",
    "AI reply suggestions",
    "AI email and campaign copy",
    "AI workflow recommendations",
    "AI sales coach notes",
    "AI opportunity next steps",
    "AI review response generator",
    "AI dashboard insights",
    "AI page copy helper",
    "AI task prioritization"
  ];

  return (
    <AppShell>
      <PageHeader title={modules.ai.title} description={modules.ai.description} action="Run AI audit" />
      <section className="mb-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>AI execution layer</CardTitle>
            <CardDescription>Live model calls are protected by an internal bearer token and fall back safely until credentials are added.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-sky-400/20 bg-sky-400/10 p-4 text-sm leading-6 text-sky-100">
              Endpoint: <span className="font-semibold">POST /api/ai/assist</span>. Add <span className="font-semibold">OPENAI_API_KEY</span>, <span className="font-semibold">OPENAI_MODEL</span>, and <span className="font-semibold">AI_ASSISTANT_API_TOKEN</span> for live responses.
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <div key={capability} className="rounded-lg border border-white/10 bg-white/[0.025] p-3 text-sm text-slate-300">
                  {capability}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended operating queue</CardTitle>
            <CardDescription>Demo intelligence until production tenant context is connected</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {modules.ai.items.map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.025] p-4">
                <span className="text-sm font-medium text-white">{item}</span>
                <Badge variant={index < 3 ? "success" : "secondary"}>{index < 3 ? "Ready" : "Queued"}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      <IntegrationStatusPanel statuses={openAiStatus} />
    </AppShell>
  );
}
