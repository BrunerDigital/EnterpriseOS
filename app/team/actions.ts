"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAppSession } from "@/lib/auth/session";
import { canInviteUsers, type AppRole } from "@/lib/auth/roles";

const allowedInviteRoles: AppRole[] = [
  "agency_admin",
  "workspace_admin",
  "sales_manager",
  "sales_rep",
  "client_admin",
  "client_viewer",
  "billing_viewer"
];

function teamRedirect(message: string, key: "error" | "invited" = "error"): never {
  redirect(`/team?${key}=${encodeURIComponent(message)}`);
}

export async function inviteUser(formData: FormData) {
  const session = await getAppSession();

  if (!canInviteUsers(session.profile.role)) {
    teamRedirect("You do not have permission to invite users.");
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const role = String(formData.get("role") ?? "") as AppRole;

  if (!email || !fullName || !allowedInviteRoles.includes(role)) {
    teamRedirect("Enter a name, email, and supported role.");
  }

  const headerStore = await headers();
  const origin = headerStore.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${origin}/reset-password`,
    data: {
      full_name: fullName,
      tenant_slug: session.tenant.slug,
      role
    }
  });

  if (error || !data.user) {
    teamRedirect("Unable to send invite. The email may already exist or SMTP may need configuration.");
  }
  const invitedUser = data.user;

  const { error: profileError } = await admin.from("profiles").upsert(
    {
      id: invitedUser.id,
      tenant_id: session.profile.tenantId,
      email,
      full_name: fullName,
      role
    },
    { onConflict: "id" }
  );

  if (profileError) {
    teamRedirect("Invite was created, but the profile could not be assigned.");
  }

  await admin.from("audit_logs").insert({
    tenant_id: session.profile.tenantId,
    actor_id: session.user.id,
    action: "team.invite_sent",
    target: invitedUser.id,
    metadata: { email, role }
  });

  teamRedirect(`${email} invited as ${role.replaceAll("_", " ")}.`, "invited");
}
