import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/lib/supabase/database.types";
import { decryptSecret } from "@/lib/server/secret-crypto";
import { integrationConfigCatalog, type IntegrationConfigDefinition, type IntegrationProvider } from "@/lib/integration-config/catalog";

export type IntegrationConfigStatus = "connected" | "ready" | "needs_credentials";

export type StoredIntegrationConfig = {
  values?: Record<string, string>;
  secrets?: Record<string, string>;
  secretMeta?: Record<string, { configured: boolean; updatedAt: string; preview?: string }>;
  enabledDataPoints?: string[];
  notes?: string;
};

export type RuntimeIntegrationConfig = {
  values: Record<string, string>;
  secrets: Record<string, string>;
  all: Record<string, string>;
};

export type IntegrationConfigView = {
  provider: IntegrationProvider;
  status: IntegrationConfigStatus;
  config: StoredIntegrationConfig;
  updatedAt?: string;
};

type IntegrationRow = {
  provider: IntegrationProvider;
  status: string;
  config: Json;
  updated_at: string;
};

export async function readTenantIntegrationConfigs(tenantId: string): Promise<Map<IntegrationProvider, IntegrationConfigView>> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("integrations")
    .select("provider,status,config,updated_at")
    .eq("tenant_id", tenantId)
    .in(
      "provider",
      integrationConfigCatalog.map((item) => item.provider)
    );

  if (error) {
    throw new Error(`Unable to read integration configs: ${error.message}`);
  }

  return new Map(
    ((data ?? []) as IntegrationRow[]).map((row) => {
      const definition = integrationConfigCatalog.find((item) => item.provider === row.provider);
      const config = normalizeConfig(row.config) ?? {};
      return [
        row.provider,
        {
          provider: row.provider,
          status: definition ? computeIntegrationConfigStatus(definition, config) : normalizeStatus(row.status),
          config,
          updatedAt: row.updated_at
        }
      ];
    })
  );
}

export async function readStoredIntegrationConfig(tenantId: string, provider: IntegrationProvider): Promise<StoredIntegrationConfig | null> {
  const admin = createAdminClient();
  const { data } = await admin.from("integrations").select("config").eq("tenant_id", tenantId).eq("provider", provider).maybeSingle();

  return normalizeConfig(data?.config);
}

export async function readRuntimeIntegrationConfig(tenantId: string, provider: IntegrationProvider): Promise<RuntimeIntegrationConfig> {
  const config = await readStoredIntegrationConfig(tenantId, provider);
  const values = config?.values ?? {};
  const encryptedSecrets = config?.secrets ?? {};
  const secrets = Object.fromEntries(Object.entries(encryptedSecrets).map(([key, value]) => [key, decryptSecret(value)]));

  return {
    values,
    secrets,
    all: { ...values, ...secrets }
  };
}

export async function readRuntimeIntegrationConfigByTenantSlug(provider: IntegrationProvider, tenantSlug = "brunerdigital"): Promise<RuntimeIntegrationConfig | null> {
  const admin = createAdminClient();
  const { data, error } = await admin.from("tenants").select("id").eq("slug", tenantSlug).maybeSingle();

  if (error || !data) return null;

  return readRuntimeIntegrationConfig(data.id, provider);
}

export async function readPublicIntegrationValuesByTenantSlug(providers: IntegrationProvider[], tenantSlug = "brunerdigital") {
  const admin = createAdminClient();
  const { data: tenant, error: tenantError } = await admin.from("tenants").select("id").eq("slug", tenantSlug).maybeSingle();

  if (tenantError || !tenant) return {};

  const { data, error } = await admin.from("integrations").select("config").eq("tenant_id", tenant.id).in("provider", providers);

  if (error) return {};

  return (data ?? []).reduce<Record<string, string>>((acc, row) => {
    const config = normalizeConfig(row.config);
    return { ...acc, ...(config?.values ?? {}) };
  }, {});
}

export function computeIntegrationConfigStatus(definition: IntegrationConfigDefinition, config: StoredIntegrationConfig): IntegrationConfigStatus {
  const requiredFields = definition.fields.filter((field) => field.required);
  const configuredRequired = requiredFields.filter((field) => isFieldConfigured(field.name, config, field.secret));
  const configuredAny =
    definition.fields.some((field) => isFieldConfigured(field.name, config, field.secret)) || Boolean(config.enabledDataPoints?.length) || Boolean(config.notes);

  if (requiredFields.length > 0 && configuredRequired.length === requiredFields.length) return "connected";
  if (requiredFields.length === 0 && configuredAny) return "connected";
  if (configuredAny) return "ready";
  return "needs_credentials";
}

export function normalizeConfig(config: Json | null | undefined): StoredIntegrationConfig | null {
  if (!config || typeof config !== "object" || Array.isArray(config)) return null;

  const record = config as Record<string, unknown>;

  return {
    values: normalizeStringRecord(record.values),
    secrets: normalizeStringRecord(record.secrets),
    secretMeta: normalizeSecretMeta(record.secretMeta),
    enabledDataPoints: Array.isArray(record.enabledDataPoints) ? record.enabledDataPoints.filter((item): item is string => typeof item === "string") : [],
    notes: typeof record.notes === "string" ? record.notes : ""
  };
}

function normalizeStringRecord(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).filter((entry): entry is [string, string] => typeof entry[1] === "string" && entry[1].length > 0)
  );
}

function isFieldConfigured(name: string, config: StoredIntegrationConfig, secret?: boolean) {
  if (secret) {
    return config.secretMeta?.[name]?.configured === true || Boolean(config.secrets?.[name]);
  }

  return Boolean(config.values?.[name]?.trim());
}

function normalizeStatus(status: string): IntegrationConfigStatus {
  if (status === "connected" || status === "ready" || status === "needs_credentials") return status;
  return "needs_credentials";
}

function normalizeSecretMeta(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).flatMap(([key, meta]) => {
      if (!meta || typeof meta !== "object" || Array.isArray(meta)) return [];
      const record = meta as Record<string, unknown>;
      return [
        [
          key,
          {
            configured: record.configured === true,
            updatedAt: typeof record.updatedAt === "string" ? record.updatedAt : "",
            preview: typeof record.preview === "string" ? record.preview : undefined
          }
        ]
      ];
    })
  );
}
