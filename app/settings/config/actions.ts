"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getIntegrationDefinition } from "@/lib/integration-config/catalog";
import { requireAdmin } from "@/lib/auth/guards";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/lib/supabase/database.types";
import { computeIntegrationConfigStatus, readStoredIntegrationConfig, type StoredIntegrationConfig } from "@/lib/server/integration-config-store";
import { encryptSecret, hasSecretEncryptionKey, maskSecretPreview } from "@/lib/server/secret-crypto";

export async function saveIntegrationConfig(formData: FormData) {
  const session = await requireAdmin();
  const provider = readField(formData, "provider");
  const definition = getIntegrationDefinition(provider);

  if (!definition) {
    redirect("/settings/config?error=Unknown%20integration%20provider.");
  }

  const existing = await readStoredIntegrationConfig(session.profile.tenantId, definition.provider);
  const now = new Date().toISOString();
  const values = { ...(existing?.values ?? {}) };
  const secrets = { ...(existing?.secrets ?? {}) };
  const secretMeta = { ...(existing?.secretMeta ?? {}) };

  const hasNewSecret = definition.fields.some((field) => field.secret && readField(formData, `field:${field.name}`).length > 0);

  if (hasNewSecret && !hasSecretEncryptionKey()) {
    redirect(`/settings/config?error=${encodeURIComponent("CONFIG_ENCRYPTION_KEY is required before saving sensitive integration fields.")}`);
  }

  for (const field of definition.fields) {
    const value = readField(formData, `field:${field.name}`);

    if (field.secret) {
      if (formData.get(`clear:${field.name}`) === "on") {
        delete secrets[field.name];
        delete secretMeta[field.name];
      }

      if (value) {
        secrets[field.name] = encryptSecret(value);
        secretMeta[field.name] = {
          configured: true,
          updatedAt: now,
          preview: maskSecretPreview(value)
        };
      }

      continue;
    }

    if (value) {
      values[field.name] = value;
    } else {
      delete values[field.name];
    }
  }

  const enabledDataPoints = formData
    .getAll("dataPoint")
    .map((value) => String(value))
    .filter((value) => definition.dataPoints.includes(value));

  const config: StoredIntegrationConfig = {
    values,
    secrets,
    secretMeta,
    enabledDataPoints,
    notes: readField(formData, "notes")
  };
  const status = computeIntegrationConfigStatus(definition, config);
  const admin = createAdminClient();
  const serializedConfig = JSON.parse(JSON.stringify(config)) as Json;

  const { error } = await admin.from("integrations").upsert(
    {
      tenant_id: session.profile.tenantId,
      provider: definition.provider,
      status,
      config: serializedConfig
    },
    { onConflict: "tenant_id,provider" }
  );

  if (error) {
    redirect(`/settings/config?error=${encodeURIComponent(error.message)}`);
  }

  await admin.from("audit_logs").insert({
    tenant_id: session.profile.tenantId,
    actor_id: session.user.id,
    action: "integration.config.updated",
    target: definition.provider,
    metadata: {
      provider: definition.provider,
      status,
      enabled_data_points: enabledDataPoints
    } as Json
  });

  revalidatePath("/settings/config");
  revalidatePath("/integrations");
  redirect(`/settings/config?updated=${definition.provider}`);
}

function readField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}
