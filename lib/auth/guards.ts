import { redirect } from "next/navigation";
import { getAppSession } from "@/lib/auth/session";
import { canAccessAdmin, canAccessBilling, type AppRole } from "@/lib/auth/roles";

export async function requireRole(
  predicate: (role: AppRole) => boolean,
  fallback = "/dashboard?error=insufficient-permissions"
) {
  const session = await getAppSession();

  if (!predicate(session.profile.role)) {
    redirect(fallback);
  }

  return session;
}

export function requireAdmin() {
  return requireRole(canAccessAdmin);
}

export function requireBillingAccess() {
  return requireRole(canAccessBilling);
}
