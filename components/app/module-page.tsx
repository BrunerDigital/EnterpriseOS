import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/app/page-header";
import type { ModuleConfig } from "@/lib/demo-data";

export function ModulePage({ module }: { module: ModuleConfig }) {
  return (
    <div>
      <PageHeader title={module.title} description={module.description} action={module.primaryAction} />
      <section className="grid gap-4 md:grid-cols-3">
        {module.stats.map((stat) => (
          <Card key={stat}>
            <CardHeader>
              <CardDescription>Live metric</CardDescription>
              <CardTitle className="text-2xl">{stat}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>{module.title} workspace</CardTitle>
            <CardDescription>Seeded demo records with production-ready extension points</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {module.items.map((item, index) => (
              <div key={item} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.025] p-4">
                <div>
                  <div className="font-medium">{item}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Owner {index % 2 === 0 ? "Ari Lane" : "Mira Cole"} · Workspace Northfield
                  </div>
                </div>
                <Badge variant={index % 3 === 0 ? "success" : "secondary"}>{index % 3 === 0 ? "Ready" : "Draft"}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI assistant</CardTitle>
            <CardDescription>Context-aware helper for this module</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-primary/20 bg-primary/10 p-4 text-sm leading-6 text-sky-100">{module.ai}</div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <p>Production connection point: replace demo recommendations with OpenAI-backed tools and tenant-scoped context retrieval.</p>
              <p>Audit trail: every generated suggestion should write an event with user, workspace, prompt type, and accepted action.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
