"use client";

import { usePathname } from "next/navigation";
import { Bell, Command, LogOut, Search } from "lucide-react";
import { navItems } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DesktopWorkspaceSidebar, MobileWorkspaceMenu } from "@/components/app/workspace-navigation";
import type { AppSession } from "@/lib/auth/session";
import { canAccessAdmin, canAccessBilling, clientRoles } from "@/lib/auth/roles";

const adminOnlyRoutes = new Set(["/agency", "/white-label", "/launch", "/settings/config"]);
const billingRoutes = new Set(["/payments", "/billing"]);
const clientPreferredRoutes = new Set(["/dashboard", "/conversations", "/portal", "/reporting", "/help"]);

function filterNavItems(role: AppSession["profile"]["role"], tenantSlug: string) {
  if (clientRoles.includes(role)) {
    return navItems.filter((item) => clientPreferredRoutes.has(item.href));
  }

  return navItems.filter((item) => {
    if (item.href === "/crm/inquiries") {
      return canAccessAdmin(role) && tenantSlug === "brunerdigital";
    }
    if (adminOnlyRoutes.has(item.href)) {
      return canAccessAdmin(role);
    }

    if (billingRoutes.has(item.href)) {
      return canAccessBilling(role);
    }

    return true;
  });
}

export function AppShellClient({ children, session }: { children: React.ReactNode; session: AppSession }) {
  const pathname = usePathname();
  const navigation = { items: filterNavItems(session.profile.role, session.tenant.slug), pathname, session };

  return (
    <div className="d360-workspace min-h-screen">
      <div className="flex min-h-screen">
        <DesktopWorkspaceSidebar {...navigation} />
        <main className="min-w-0 flex-1 lg:pl-72">
          <header className="d360-toolbar sticky top-0 z-10 border-b">
            <div className="mx-auto flex min-h-[4.5rem] max-w-[100rem] items-center gap-2 px-panel md:h-20 md:gap-3">
              <MobileWorkspaceMenu {...navigation} />
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" aria-label="Search workspace" placeholder="Search" />
              </div>
              <Button variant="outline" className="hidden md:inline-flex">
                <Command data-icon="inline-start" />
                Command
              </Button>
              <Button variant="outline" size="icon" aria-label="Notifications">
                <Bell />
              </Button>
              <form action="/auth/sign-out" method="post">
                <Button variant="outline" size="icon" aria-label="Sign out" title="Sign out" type="submit">
                  <LogOut />
                </Button>
              </form>
              <Badge variant="success" className="hidden md:inline-flex">
                {session.tenant.plan} plan
              </Badge>
            </div>
          </header>
          <div className={cn("d360-workspace-content mx-auto max-w-[100rem] px-panel py-layout", pathname === "/dashboard" && "d360-dashboard-content")}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
