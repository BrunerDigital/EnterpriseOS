import { CheckCircle2, Clock3, KeyRound, PlugZap, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { saveIntegrationConfig } from "@/app/settings/config/actions";
import { requireAdmin } from "@/lib/auth/guards";
import { integrationConfigCatalog, type ConfigField, type IntegrationConfigDefinition } from "@/lib/integration-config/catalog";
import {
  computeIntegrationConfigStatus,
  readTenantIntegrationConfigs,
  type IntegrationConfigStatus,
  type StoredIntegrationConfig
} from "@/lib/server/integration-config-store";
import { cn } from "@/lib/utils";

type ConfigPageProps = {
  searchParams?: Promise<{ error?: string; updated?: string }>;
};

const statusTone: Record<IntegrationConfigStatus, { label: string; variant: "success" | "warning" | "secondary"; icon: typeof CheckCircle2 }> = {
  connected: { label: "Configured", variant: "success", icon: CheckCircle2 },
  ready: { label: "Partial", variant: "warning", icon: Clock3 },
  needs_credentials: { label: "Needs setup", variant: "secondary", icon: KeyRound }
};

export default async function Page({ searchParams }: ConfigPageProps) {
  const [params, session] = await Promise.all([searchParams, requireAdmin()]);
  const savedConfigs = await readTenantIntegrationConfigs(session.profile.tenantId);
  const configs = integrationConfigCatalog.map((definition) => {
    const saved = savedConfigs.get(definition.provider);
    const config = saved?.config ?? {};
    const status = saved?.status ?? computeIntegrationConfigStatus(definition, config);
    return { definition, config, status, updatedAt: saved?.updatedAt };
  });
  const counts = {
    configured: configs.filter((item) => item.status === "connected").length,
    partial: configs.filter((item) => item.status === "ready").length,
    missing: configs.filter((item) => item.status === "needs_credentials").length,
    total: configs.length
  };
  const categories = Array.from(new Set(integrationConfigCatalog.map((item) => item.category)));

  return (
    <AppShell>
      <PageHeader
        title="Platform Config"
        description="Admin-only configuration for API keys, account IDs, webhooks, tracking IDs, and enabled platform datapoints."
        action="Save securely"
      />

      {params?.error ? (
        <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-red-100">{params.error}</div>
      ) : null}
      {params?.updated ? (
        <div className="mb-6 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
          Saved {params.updated}. Sensitive values remain encrypted and hidden after save.
        </div>
      ) : null}

      <section className="mb-6 grid gap-4 md:grid-cols-4">
        <MetricCard label="Configured" value={counts.configured} icon={CheckCircle2} tone="text-emerald-200" />
        <MetricCard label="Partial" value={counts.partial} icon={Clock3} tone="text-amber-200" />
        <MetricCard label="Need setup" value={counts.missing} icon={KeyRound} tone="text-sky-200" />
        <MetricCard label="Tracked systems" value={counts.total} icon={PlugZap} tone="text-violet-200" />
      </section>

      <section className="mb-6 rounded-lg border border-white/10 bg-slate-950/50 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ShieldCheck className="size-4 text-emerald-300" />
              Security model
            </div>
            <p className="mt-1 max-w-4xl text-sm leading-6 text-muted-foreground">
              Public IDs are stored as tenant config. Secrets are encrypted with CONFIG_ENCRYPTION_KEY, masked in the UI, and only decrypted inside server-side integration code.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {configs.map((item) => (
          <IntegrationConfigCard
            key={item.definition.provider}
            definition={item.definition}
            config={item.config}
            status={item.status}
            updatedAt={item.updatedAt}
          />
        ))}
      </section>
    </AppShell>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
  tone
}: {
  label: string;
  value: number;
  icon: typeof CheckCircle2;
  tone: string;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-3xl">{value}</CardTitle>
        <Icon className={cn("size-5", tone)} />
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{label}</CardContent>
    </Card>
  );
}

function IntegrationConfigCard({
  definition,
  config,
  status,
  updatedAt
}: {
  definition: IntegrationConfigDefinition;
  config: StoredIntegrationConfig;
  status: IntegrationConfigStatus;
  updatedAt?: string;
}) {
  const tone = statusTone[status];
  const StatusIcon = tone.icon;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-white/[0.025]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <SlidersHorizontal className="size-5 text-sky-300" />
              {definition.name}
            </CardTitle>
            <CardDescription className="mt-2 leading-6">{definition.description}</CardDescription>
          </div>
          <Badge variant={tone.variant} className="shrink-0">
            <StatusIcon className="mr-1 size-3" />
            {tone.label}
          </Badge>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-1">{definition.category}</span>
          <span className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-1">{definition.fields.length} fields</span>
          <span className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-1">{definition.dataPoints.length} datapoints</span>
          {updatedAt ? <span className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-1">Updated {formatDate(updatedAt)}</span> : null}
        </div>
      </CardHeader>
      <CardContent className="pt-5">
        <form action={saveIntegrationConfig} className="grid gap-5">
          <input type="hidden" name="provider" value={definition.provider} />
          <div className="grid gap-4 md:grid-cols-2">
            {definition.fields.map((field) => (
              <ConfigFieldControl key={field.name} field={field} config={config} />
            ))}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground" htmlFor={`${definition.provider}-notes`}>
              Internal notes
            </label>
            <textarea
              id={`${definition.provider}-notes`}
              name="notes"
              defaultValue={config.notes ?? ""}
              rows={3}
              className="mt-2 w-full rounded-md border border-input bg-background/45 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Owner, setup status, account URL, domain notes, or implementation detail."
            />
          </div>

          <div>
            <div className="mb-3 text-sm font-medium text-foreground">Enabled datapoints</div>
            <div className="grid gap-2 md:grid-cols-2">
              {definition.dataPoints.map((point) => (
                <label key={point} className="flex min-h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.025] px-3 py-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    name="dataPoint"
                    value={point}
                    defaultChecked={config.enabledDataPoints?.includes(point)}
                    className="size-4 rounded border-white/20 bg-slate-950 accent-primary"
                  />
                  <span>{point}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Button type="submit">
              <KeyRound data-icon="inline-start" />
              Save {definition.name}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function ConfigFieldControl({ field, config }: { field: ConfigField; config: StoredIntegrationConfig }) {
  const value = config.values?.[field.name] ?? "";
  const secret = config.secretMeta?.[field.name];
  const fieldId = `field-${field.name}`;
  const placeholder = field.secret && secret?.configured ? `Configured ${secret.preview ?? "****"}. Leave blank to keep.` : field.placeholder;
  const required = Boolean(field.required && (!field.secret || !secret?.configured));

  return (
    <div className={field.type === "textarea" ? "md:col-span-2" : undefined}>
      <label className="flex items-center justify-between gap-2 text-sm font-medium text-foreground" htmlFor={fieldId}>
        <span>{field.label}</span>
        {field.required ? <span className="text-xs text-sky-300">Required</span> : null}
      </label>
      {renderInput(field, fieldId, value, placeholder, required)}
      {field.secret && secret?.configured ? (
        <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <input type="checkbox" name={`clear:${field.name}`} className="size-3 rounded border-white/20 bg-slate-950 accent-destructive" />
          Clear saved secret
        </label>
      ) : null}
      {field.help ? <p className="mt-2 text-xs leading-5 text-muted-foreground">{field.help}</p> : null}
    </div>
  );
}

function renderInput(field: ConfigField, fieldId: string, value: string, placeholder: string | undefined, required: boolean) {
  const commonClass =
    "mt-2 w-full rounded-md border border-input bg-background/45 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  if (field.type === "textarea") {
    return (
      <textarea
        id={fieldId}
        name={`field:${field.name}`}
        defaultValue={value}
        required={required}
        rows={4}
        className={commonClass}
        placeholder={placeholder}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select id={fieldId} name={`field:${field.name}`} defaultValue={value} required={required} className={commonClass}>
        <option value="">Select an option</option>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <Input
      id={fieldId}
      name={`field:${field.name}`}
      type={field.secret ? "password" : field.type}
      defaultValue={field.secret ? "" : value}
      required={required}
      placeholder={placeholder}
      autoComplete="off"
      className="mt-2"
    />
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
