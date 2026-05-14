import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { AppRole } from "@/lib/auth/roles";

export type AppSession = {
  user: {
    id: string;
    email: string;
  };
  profile: {
    fullName: string;
    role: AppRole;
    tenantId: string;
  };
  tenant: {
    name: string;
    slug: string;
    plan: string;
  };
  workspace: {
    id: string;
    name: string;
    type: string;
  } | null;
};

type ProfileWithTenant = {
  tenant_id: string;
  full_name: string;
  role: AppRole;
  tenants:
    | {
        name: string;
        slug: string;
        plan: string;
      }
    | {
        name: string;
        slug: string;
        plan: string;
      }[]
    | null;
};

type WorkspaceRow = {
  id: string;
  name: string;
  type: string;
};

export async function getAppSession(): Promise<AppSession> {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const { data: profileResult, error: profileError } = await supabase
    .from("profiles")
    .select("tenant_id, full_name, role, tenants(name, slug, plan)")
    .eq("id", user.id)
    .single();
  const profile = profileResult as unknown as ProfileWithTenant | null;

  if (profileError || !profile) {
    redirect("/login?error=Your account is not assigned to a BrunerDigital workspace yet.");
  }

  const { data: workspaceResult } = await supabase
    .from("workspaces")
    .select("id, name, type")
    .eq("tenant_id", profile.tenant_id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  const workspace = workspaceResult as unknown as WorkspaceRow | null;

  const tenant = Array.isArray(profile.tenants) ? profile.tenants[0] : profile.tenants;

  return {
    user: {
      id: user.id,
      email: user.email
    },
    profile: {
      fullName: profile.full_name,
      role: profile.role,
      tenantId: profile.tenant_id
    },
    tenant: {
      name: tenant?.name ?? "BrunerDigital",
      slug: tenant?.slug ?? "brunerdigital",
      plan: tenant?.plan ?? "scale"
    },
    workspace: workspace
      ? {
          id: workspace.id,
          name: workspace.name,
          type: workspace.type
        }
      : null
  };
}
