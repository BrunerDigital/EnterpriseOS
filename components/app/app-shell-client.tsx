"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Command, LogOut, Menu, Search } from "lucide-react";
import { navItems } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BrunerLogo } from "@/components/app/bruner-logo";
import type { AppSession } from "@/lib/auth/session";
import { canAccessAdmin, canAccessBilling, clientRoles, formatRole } from "@/lib/auth/roles";

const adminOnlyRoutes = new Set(["/agency", "/white-label", "/launch"]);
const billingRoutes = new Set(["/payments", "/billing"]);
const clientPreferredRoutes = new Set(["/dashboard", "/conversations", "/portal", "/reporting", "/help"]);

function filterNavItems(role: AppSession["profile"]["role"]) {
  if (clientRoles.includes(role)) {
    return navItems.filter((item) => clientPreferredRoutes.has(item.href));
  }

  return navItems.filter((item) => {
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
  const visibleNavItems = filterNavItems(session.profile.role);

  return (
    <div className="min-h-screen grid-fade">
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-white/10 bg-slate-950/78 backdrop-blur-xl lg:flex">
          <div className="flex h-20 items-center gap-3 px-5">
            <BrunerLogo subtitle="by BrunerDigital" />
          </div>
          <div className="mx-4 mb-4 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium">{session.workspace?.name ?? session.tenant.name}</div>
                <div className="text-xs text-muted-foreground">
                  {session.workspace?.type === "client" ? "Client workspace" : "Agency workspace"}
                </div>
              </div>
              <ChevronDown />
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 pb-5">
            <div className="flex flex-col gap-1">
              {visibleNavItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex h-10 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground",
                      active && "bg-primary/12 text-sky-100 ring-1 ring-primary/20"
                    )}
                  >
                    <Icon />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
          <div className="border-t border-white/10 p-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="truncate text-sm font-medium">{session.profile.fullName}</div>
              <div className="truncate text-xs text-muted-foreground">{session.user.email}</div>
              <Badge className="mt-3" variant="secondary">
                {formatRole(session.profile.role)}
              </Badge>
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 lg:pl-72">
          <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/58 backdrop-blur-xl">
            <div className="flex h-20 items-center gap-3 px-4 md:px-7">
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                <Menu />
              </Button>
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input className="h-11 pl-10" placeholder="Search contacts, workflows, campaigns, invoices..." />
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
          <div className="px-4 py-6 md:px-7">{children}</div>
        </main>
      </div>
    </div>
  );
}
