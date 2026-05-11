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
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-normal text-foreground md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <Sparkles data-icon="inline-start" />
          Ask AI
        </Button>
        <Button>{action}</Button>
      </div>
    </div>
  );
}
