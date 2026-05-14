import { AppShell } from "@/components/app/app-shell";
import { ModulePage } from "@/components/app/module-page";
import { modules } from "@/lib/demo-data";
import { inviteUser } from "@/app/team/actions";
import { getAppSession } from "@/lib/auth/session";
import { canInviteUsers } from "@/lib/auth/roles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TeamPageProps = {
  searchParams?: Promise<{ error?: string; invited?: string }>;
};

export default async function Page({ searchParams }: TeamPageProps) {
  const [params, session] = await Promise.all([searchParams, getAppSession()]);
  const canInvite = canInviteUsers(session.profile.role);

  return (
    <AppShell>
      <ModulePage module={modules.team} />
      <section className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Invite user</CardTitle>
            <CardDescription>Create a Supabase Auth invite and assign a tenant role.</CardDescription>
          </CardHeader>
          <CardContent>
            {params?.error ? (
              <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-red-100">
                {params.error}
              </div>
            ) : null}
            {params?.invited ? (
              <div className="mb-4 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100">
                {params.invited}
              </div>
            ) : null}
            <form action={inviteUser} className="flex flex-col gap-4">
              <Input name="fullName" placeholder="Full name" required disabled={!canInvite} />
              <Input name="email" placeholder="teammate@company.com" type="email" required disabled={!canInvite} />
              <select
                name="role"
                required
                disabled={!canInvite}
                className="h-10 rounded-md border border-input bg-background/45 px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="workspace_admin"
              >
                <option value="agency_admin">Agency admin</option>
                <option value="workspace_admin">Workspace admin</option>
                <option value="sales_manager">Sales manager</option>
                <option value="sales_rep">Sales rep</option>
                <option value="client_admin">Client admin</option>
                <option value="client_viewer">Client viewer</option>
                <option value="billing_viewer">Billing viewer</option>
              </select>
              <Button type="submit" disabled={!canInvite}>
                Send invite
              </Button>
              {!canInvite ? (
                <p className="text-sm text-muted-foreground">Your role can view team settings but cannot invite users.</p>
              ) : null}
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Permission model</CardTitle>
            <CardDescription>Current v1 access rules enforced in the app shell and server actions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
              <div className="font-medium text-foreground">Agency owner/admin</div>
              <p className="mt-1">Full tenant, white-label, integrations, billing, team, and workspace access.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
              <div className="font-medium text-foreground">Workspace admin</div>
              <p className="mt-1">Operational access with team invite ability, excluding agency-only controls.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
              <div className="font-medium text-foreground">Sales roles</div>
              <p className="mt-1">CRM, deals, conversations, campaigns, automations, and reporting surfaces.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
              <div className="font-medium text-foreground">Client roles</div>
              <p className="mt-1">Focused portal, conversations, reports, docs, and dashboard access.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
