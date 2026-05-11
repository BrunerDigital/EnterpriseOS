"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Command, Menu, Search } from "lucide-react";
import { navItems } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BrunerLogo } from "@/components/app/bruner-logo";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen grid-fade">
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-white/10 bg-slate-950/78 backdrop-blur-xl lg:flex">
          <div className="flex h-20 items-center gap-3 px-5">
            <BrunerLogo subtitle="Business growth suite" />
          </div>
          <div className="mx-4 mb-4 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium">Northfield Dental</div>
                <div className="text-xs text-muted-foreground">Client workspace</div>
              </div>
              <ChevronDown />
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 pb-5">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
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
              <Badge variant="success" className="hidden md:inline-flex">
                Demo mode
              </Badge>
            </div>
          </header>
          <div className="px-4 py-6 md:px-7">{children}</div>
        </main>
      </div>
    </div>
  );
}
