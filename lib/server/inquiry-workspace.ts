import "server-only";
import type { AppSession } from "@/lib/auth/session";
import { canAccessAdmin } from "@/lib/auth/roles";
import { inquiryWorkspaceId, inquiryWorkspaceType } from "@/lib/server/project-inquiries";
import { createAdminClient } from "@/lib/supabase/admin";

export function canViewInquiryWorkspace(session: AppSession) {
  return session.tenant.slug === "brunerdigital" && canAccessAdmin(session.profile.role);
}

export async function resolveInquiryWorkspace(session: AppSession) {
  if (!canViewInquiryWorkspace(session)) return { status: "forbidden" as const };
  const workspaceId = inquiryWorkspaceId();
  if (!workspaceId) return { status: "unconfigured" as const };

  const admin = createAdminClient();
  const [tenantResult, workspaceResult] = await Promise.all([
    admin.from("tenants").select("id").eq("id", session.profile.tenantId).eq("slug", "brunerdigital").maybeSingle(),
    admin.from("workspaces").select("id, name, type").eq("id", workspaceId)
      .eq("tenant_id", session.profile.tenantId).eq("type", inquiryWorkspaceType).eq("agency_admin_only", true).maybeSingle()
  ]);
  if (tenantResult.error || workspaceResult.error) throw new Error("Unable to verify the inquiry workspace");
  if (!tenantResult.data || !workspaceResult.data) return { status: "forbidden" as const };
  return { status: "ready" as const, workspace: workspaceResult.data, admin };
}
