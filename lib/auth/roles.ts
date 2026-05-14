import type { Database } from "@/lib/supabase/database.types";

export type AppRole = Database["public"]["Enums"]["app_role"];

export const adminRoles: AppRole[] = ["agency_owner", "agency_admin"];
export const billingRoles: AppRole[] = ["agency_owner", "agency_admin", "billing_viewer"];
export const clientRoles: AppRole[] = ["client_admin", "client_viewer"];

export function formatRole(role: AppRole) {
  return role
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function canAccessAdmin(role: AppRole) {
  return adminRoles.includes(role);
}

export function canAccessBilling(role: AppRole) {
  return billingRoles.includes(role);
}

export function canInviteUsers(role: AppRole) {
  return adminRoles.includes(role) || role === "workspace_admin";
}
