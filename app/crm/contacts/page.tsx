import Link from "next/link";
import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { contacts } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function ContactsPage() {
  return (
    <AppShell>
      <PageHeader
        title="CRM contacts"
        description="Contacts, notes, tasks, tags, custom fields, AI summaries, and lead scoring."
        action="New contact"
      />
      <Card>
        <CardHeader>
          <CardTitle>High-intent contacts</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {contacts.map((contact, index) => (
            <Link
              key={contact.email}
              href={index === 0 ? "/crm/contacts/northfield-dental" : "/crm/contacts"}
              className="glass-inset grid gap-x-4 gap-y-2 p-inset transition-colors sm:grid-cols-2 sm:items-center xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.7fr)_minmax(0,0.55fr)]"
            >
              <div>
                <div className="font-medium">{contact.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{contact.company}</div>
              </div>
              <div className="min-w-0 text-sm leading-relaxed text-muted-foreground">
                <div>{contact.email}</div>
                <div>{contact.phone}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {contact.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm tabular-nums">
                  <span>{formatCurrency(contact.value)}</span>
                  <Badge variant="success">{contact.score}</Badge>
                </div>
                <Progress value={contact.score} />
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
