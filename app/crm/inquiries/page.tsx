import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShellClient } from "@/components/app/app-shell-client";
import { Badge } from "@/components/ui/badge";
import { getAppSession, type AppSession } from "@/lib/auth/session";
import { connectedFormsCampaign, digital360WalkthroughCampaign } from "@/lib/campaign-attribution";
import { canViewInquiryWorkspace, resolveInquiryWorkspace } from "@/lib/server/inquiry-workspace";

export const dynamic = "force-dynamic";

async function loadInquiries(session: AppSession, campaign: string | undefined) {
  const scope = await resolveInquiryWorkspace(session);
  if (scope.status !== "ready") return scope;

  let query = scope.admin.from("project_inquiries")
    .select("id, request_id, name, email, phone, company, service, message, website_url, budget, timeline, source, received_at, contact_id, contact_consent, utm_source, utm_medium, utm_campaign, utm_content, utm_term")
    .eq("workspace_id", scope.workspace.id);
  if (campaign) query = query.eq("utm_campaign", campaign);
  const { data: inquiries, error } = await query.order("received_at", { ascending: false }).order("id", { ascending: false }).limit(50);
  if (error) throw new Error("Unable to load inquiries");
  return { status: "ready" as const, workspace: scope.workspace, inquiries };
}

const timeFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<{ campaign?: string }> }) {
  const session = await getAppSession();
  if (!canViewInquiryWorkspace(session)) notFound();

  const requestedCampaign = (await searchParams).campaign;
  const campaign = requestedCampaign === digital360WalkthroughCampaign || requestedCampaign === connectedFormsCampaign
    ? requestedCampaign : undefined;
  const outcome = await loadInquiries(session, campaign).catch(() => ({ status: "failed" as const }));
  if (outcome.status === "forbidden") notFound();
  const result = outcome.status === "ready" ? outcome : null;

  return (
    <AppShellClient session={{ ...session, workspace: result?.workspace ?? null }}>
      <header className="mb-6">
        <h1 className="text-3xl font-semibold md:text-4xl">Inquiries</h1>
        <p className="mt-2 text-sm text-muted-foreground">Review walkthrough requests and website inquiries with campaign attribution.</p>
      </header>
      <nav aria-label="Filter inquiries" className="mb-5 flex flex-wrap gap-3 text-sm">
        <Link href="/crm/inquiries" aria-current={campaign ? undefined : "page"} className="rounded-md border border-white/15 px-3 py-2 aria-[current=page]:border-emerald-300">All inquiries</Link>
        <Link href={`/crm/inquiries?campaign=${digital360WalkthroughCampaign}`} aria-current={campaign === digital360WalkthroughCampaign ? "page" : undefined} className="rounded-md border border-white/15 px-3 py-2 aria-[current=page]:border-emerald-300">Digital360 campaign</Link>
        <Link href={`/crm/inquiries?campaign=${connectedFormsCampaign}`} aria-current={campaign === connectedFormsCampaign ? "page" : undefined} className="rounded-md border border-white/15 px-3 py-2 aria-[current=page]:border-emerald-300">Connected Forms</Link>
      </nav>
      {outcome.status === "failed" ? <p role="alert" className="rounded-lg border border-white/15 p-5">Inquiries are temporarily unavailable. Try again shortly.</p> : null}
      {outcome.status === "unconfigured" ? <p className="rounded-lg border border-white/15 p-5">This inbox is awaiting a workspace connection.</p> : null}
      {result && !result.inquiries.length ? <p className="rounded-lg border border-white/15 p-5">No inquiries match this view.</p> : null}
      {result?.inquiries.length ? <section aria-label="Latest inquiries" className="space-y-3">
        {result.inquiries.map(inquiry => (
          <details key={inquiry.id} className="rounded-xl border border-white/15 bg-white/[0.025] p-4">
            <summary className="cursor-pointer rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300">
              <span className="ml-2 font-semibold">{inquiry.name}</span>
              <span className="ml-2 text-sm text-muted-foreground">{inquiry.service}</span>
              {inquiry.utm_campaign === digital360WalkthroughCampaign ? <Badge className="ml-2" variant="secondary">Digital360 campaign</Badge> : null}
              {inquiry.utm_campaign === connectedFormsCampaign ? <Badge className="ml-2" variant="secondary">Connected Forms</Badge> : null}
              <time className="mt-1 block text-xs text-muted-foreground sm:ml-2 sm:inline" dateTime={inquiry.received_at}>{timeFormat.format(new Date(inquiry.received_at))} UTC</time>
            </summary>
            <dl className="mt-4 grid min-w-0 gap-x-6 gap-y-3 break-words text-sm sm:grid-cols-2 lg:grid-cols-3">
              <div><dt className="font-semibold">Email</dt><dd className="text-muted-foreground">{inquiry.email}</dd></div>
              {inquiry.phone ? <div><dt className="font-semibold">Phone</dt><dd className="text-muted-foreground">{inquiry.phone}</dd></div> : null}
              {inquiry.company ? <div><dt className="font-semibold">Company</dt><dd className="text-muted-foreground">{inquiry.company}</dd></div> : null}
              <div><dt className="font-semibold">Intake</dt><dd className="text-muted-foreground">{inquiry.source === "brunerdigital_website" ? "BrunerDigital website" : "Digital360 walkthrough"}</dd></div>
              <div><dt className="font-semibold">CRM contact</dt><dd className="text-muted-foreground">{inquiry.contact_id ? "Linked" : "Needs contact review"}</dd></div>
              <div><dt className="font-semibold">Request receipt</dt><dd className="text-muted-foreground">{inquiry.request_id}</dd></div>
              {inquiry.contact_consent ? <div><dt className="font-semibold">Contact permission</dt><dd className="text-muted-foreground">Confirmed for this request</dd></div> : null}
              {inquiry.budget ? <div><dt className="font-semibold">Budget</dt><dd className="text-muted-foreground">{inquiry.budget}</dd></div> : null}
              {inquiry.timeline ? <div><dt className="font-semibold">Timeline</dt><dd className="text-muted-foreground">{inquiry.timeline}</dd></div> : null}
              {inquiry.website_url ? <div><dt className="font-semibold">Website</dt><dd className="text-muted-foreground">{inquiry.website_url}</dd></div> : null}
              {inquiry.utm_source ? <div><dt className="font-semibold">Campaign source</dt><dd className="text-muted-foreground">{inquiry.utm_source}</dd></div> : null}
              {inquiry.utm_medium ? <div><dt className="font-semibold">Medium</dt><dd className="text-muted-foreground">{inquiry.utm_medium}</dd></div> : null}
              {inquiry.utm_campaign ? <div><dt className="font-semibold">Campaign</dt><dd className="text-muted-foreground">{inquiry.utm_campaign}</dd></div> : null}
              {inquiry.utm_content ? <div><dt className="font-semibold">Creative</dt><dd className="text-muted-foreground">{inquiry.utm_content}</dd></div> : null}
              {inquiry.utm_term ? <div><dt className="font-semibold">Keyword tag</dt><dd className="text-muted-foreground">{inquiry.utm_term}</dd></div> : null}
            </dl>
            {inquiry.message ? <p className="mt-4 whitespace-pre-wrap break-words border-t border-white/10 pt-4 text-sm leading-6">{inquiry.message}</p> : null}
          </details>
        ))}
      </section> : null}
    </AppShellClient>
  );
}
