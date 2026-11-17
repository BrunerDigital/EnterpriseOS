"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Building2, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrunerLogo } from "@/components/app/bruner-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRole } from "@/lib/auth/roles";
import type { AppSession } from "@/lib/auth/session";
import { type navItems, workspaceNavGroups } from "@/lib/demo-data";

type NavigationProps = {
  items: typeof navItems;
  pathname: string;
  session: AppSession;
};

function WorkspaceIdentity({ session }: { session: AppSession }) {
  const name = session.workspace?.name ?? session.tenant.name;
  const type = session.workspace?.type === "client" ? "Client workspace" : "Agency workspace";

  return (
    <div className="glass-inset d360-workspace-identity mx-4 mb-3 flex items-center gap-3 p-inset">
      <div className="d360-workspace-mark flex size-9 shrink-0 items-center justify-center rounded-lg" aria-hidden="true">
        <Building2 className="size-[1.125rem]" />
      </div>
      <div className="min-w-0">
        <div className="line-clamp-2 text-sm font-semibold leading-snug" title={name}>{name}</div>
        <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{type}</div>
      </div>
    </div>
  );
}

function WorkspaceProfile({ session }: { session: AppSession }) {
  return (
    <div className="d360-nav-profile border-t border-white/10 p-4">
      <div className="glass-inset p-inset">
        <div className="truncate text-sm font-medium" title={session.profile.fullName}>{session.profile.fullName}</div>
        <div className="truncate text-xs leading-relaxed text-muted-foreground" title={session.user.email}>{session.user.email}</div>
        <Badge className="mt-2" variant="secondary">{formatRole(session.profile.role)}</Badge>
      </div>
    </div>
  );
}

function WorkspaceLinks({
  items,
  pathname,
  onNavigate
}: Pick<NavigationProps, "items" | "pathname"> & { onNavigate?: () => void }) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    navRef.current?.querySelector("[aria-current]")?.scrollIntoView({ block: "nearest" });
  }, [pathname]);

  return (
    <nav ref={navRef} aria-label="Workspace" className="d360-workspace-links min-h-0 flex-1 overflow-y-auto px-3 pb-4">
      {workspaceNavGroups.map(group => {
        const groupItems = items.filter(item => item.group === group);
        if (!groupItems.length) return null;
        return (
          <div key={group} className="mt-3 first:mt-1">
            <div className="px-3 pb-1.5 text-xs font-semibold tracking-wide text-muted-foreground">{group}</div>
            <ul className="space-y-0.5">
              {groupItems.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? "page" : pathname.startsWith(`${href}/`) ? "location" : undefined}
                    className="d360-workspace-nav flex min-h-10 items-center gap-3 rounded-md px-3 py-1.5 text-sm leading-snug text-muted-foreground"
                    onClick={onNavigate}
                  >
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

export function DesktopWorkspaceSidebar({ session, ...navigation }: NavigationProps) {
  return (
    <aside className="d360-workspace-sidebar fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-white/10 lg:flex">
      <div className="flex h-20 shrink-0 items-center px-5">
        <BrunerLogo subtitle="by BrunerDigital" />
      </div>
      <WorkspaceIdentity session={session} />
      <WorkspaceLinks {...navigation} />
      <WorkspaceProfile session={session} />
    </aside>
  );
}

export function MobileWorkspaceMenu({ session, ...navigation }: NavigationProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="icon" className="size-11 shrink-0 lg:hidden" aria-label="Open workspace navigation">
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="d360-drawer-overlay fixed inset-0 z-40" />
        <Dialog.Content className="d360-workspace-sidebar d360-workspace-drawer fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/15">
          <div className="flex shrink-0 items-center justify-between gap-3 px-4 pb-3 pt-4">
            <Dialog.Title className="min-w-0 text-lg font-semibold leading-snug tracking-tight">Workspace navigation</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="outline" size="icon" className="size-11 shrink-0" aria-label="Close workspace navigation">
                <X className="size-5" aria-hidden="true" />
              </Button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Links available in your workspace.</Dialog.Description>
          <WorkspaceIdentity session={session} />
          <WorkspaceLinks {...navigation} onNavigate={() => setOpen(false)} />
          <WorkspaceProfile session={session} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
