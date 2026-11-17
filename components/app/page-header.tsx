import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageHeader({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="d360-workspace-banner mb-layout flex flex-col gap-layout xl:flex-row xl:items-center xl:justify-between">
      <div className="min-w-0 max-w-[66ch]">
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.025em] text-foreground md:text-4xl">{title}</h1>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 xl:shrink-0">
        <Button variant="outline">
          <Sparkles data-icon="inline-start" />
          Ask AI
        </Button>
        <Button>{action}</Button>
      </div>
    </div>
  );
}
