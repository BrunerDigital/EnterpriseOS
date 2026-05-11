import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { contacts } from "@/lib/demo-data";

export default function ContactDetailPage() {
  const contact = contacts[0];

  return (
    <AppShell>
      <PageHeader
        title={contact.name}
        description={`${contact.company} · ${contact.email} · ${contact.phone}`}
        action="Create task"
      />
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>AI contact summary</CardTitle>
            <CardDescription>Lead score {contact.score} · estimated value ${contact.value.toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm leading-6 text-slate-300">{contact.summary}</p>
            <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
              Next best action: {contact.nextStep}
            </div>
            <div className="flex flex-wrap gap-2">
              {contact.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>Notes, tasks, appointments, messages, and automation events</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {["AI scored lead at 92 after pricing page visit", "SMS reply suggestion accepted by Ari", "Demo booked for Wednesday at 2:00 PM", "Proposal task assigned to Mira"].map((event) => (
              <div key={event} className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
                <div className="font-medium">{event}</div>
                <div className="mt-1 text-sm text-muted-foreground">Tenant Apex Growth · Workspace Northfield Dental · Audit logged</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
