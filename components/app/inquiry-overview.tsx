import Link from "next/link";
import { ArrowUpRight, ClipboardList, Inbox, Megaphone, MonitorUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { connectedFormsCampaign } from "@/lib/campaign-attribution";
import type { InquiryOverviewData, InquiryRange } from "@/lib/server/inquiry-overview";

type Overview = { status: "ready"; workspace: { name: string }; data: InquiryOverviewData }
  | { status: "unconfigured" | "forbidden" | "failed" };

const campaignInbox = `/crm/inquiries?campaign=${connectedFormsCampaign}`;
const number = new Intl.NumberFormat("en-US");
const received = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

export function InquiryOverview({ days, overview }: { days: InquiryRange; overview: Overview }) {
  if (overview.status !== "ready") return (
    <section aria-labelledby="inquiry-overview-heading" className="glass-panel rounded-xl p-5">
      <h2 id="inquiry-overview-heading" className="text-lg font-semibold">Inquiry overview</h2>
      <p className="mt-2 text-sm text-muted-foreground" role={overview.status === "failed" ? "alert" : undefined}>
        {overview.status === "failed" ? "Inquiry activity is temporarily unavailable. Try again shortly." : "Activity will appear here once the inquiry workspace is connected."}
      </p>
    </section>
  );

  const { workspace, data } = overview;
  const metrics = [
    { label: "All inquiries", value: data.total, icon: Inbox },
    { label: "Website briefs", value: data.website, icon: ClipboardList },
    { label: "Walkthroughs", value: data.walkthroughs, icon: MonitorUp },
    { label: "Connected Forms", value: data.connected_forms, icon: Megaphone }
  ];

  return <section aria-labelledby="inquiry-overview-heading" className="space-y-4">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 id="inquiry-overview-heading" className="text-xl font-semibold">Inquiry overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">{workspace.name} · Last {days} days</p>
      </div>
      <nav aria-label="Inquiry date range" className="flex flex-wrap gap-2">
        {([7, 30] as const).map(range => <Link key={range} href={`/dashboard?inquiryDays=${range}`} scroll={false} aria-current={days === range ? "page" : undefined} className="rounded-md border border-white/15 px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 aria-[current=page]:border-emerald-300 aria-[current=page]:bg-emerald-300/10">Last {range} days</Link>)}
      </nav>
    </div>
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {metrics.map(({ label, value, icon: Icon }) => <div key={label} className="glass-panel rounded-lg border-t border-t-emerald-300/60 p-4">
        <dt className="flex items-start gap-2 text-sm leading-5 text-muted-foreground"><Icon className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden="true" />{label}</dt>
        <dd className="mt-3 text-2xl font-semibold tabular-nums sm:text-3xl">{number.format(value)}</dd>
      </div>)}
    </dl>
    <Card>
      <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold">Recent inquiries</h3>
          <p className="mt-1 text-sm text-muted-foreground">Latest activity in the selected period</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant="outline"><Link href={campaignInbox}>Connected Forms inbox<ArrowUpRight className="size-4" aria-hidden="true" /></Link></Button>
          <Button asChild size="sm"><Link href="/crm/inquiries">Open all inquiries<ArrowUpRight className="size-4" aria-hidden="true" /></Link></Button>
        </div>
      </CardHeader>
      <CardContent>
        {data.recent.length === 0 ? <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm text-muted-foreground">No inquiries in this period.</p> : (
          <ul className="divide-y divide-white/10 rounded-lg border border-white/10">
            {data.recent.map(inquiry => <li key={inquiry.id} className="grid gap-2 px-4 py-3 text-sm sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_auto] sm:items-center">
              <div className="min-w-0"><p className="break-words font-medium">{inquiry.name}</p><p className="mt-0.5 break-words text-muted-foreground">{inquiry.service}</p></div>
              <div className="flex min-w-0 flex-wrap items-center gap-2 text-muted-foreground">
                <span>{inquiry.source === "brunerdigital_website" ? "Website" : "Walkthrough"}</span>
                {inquiry.utm_campaign === connectedFormsCampaign ? <Badge variant="secondary">Connected Forms</Badge> : null}
                {inquiry.utm_content ? <span className="break-all text-xs">{inquiry.utm_content}</span> : null}
              </div>
              <time className="text-xs text-muted-foreground" dateTime={inquiry.received_at}>{received.format(new Date(inquiry.received_at))} UTC</time>
            </li>)}
          </ul>
        )}
      </CardContent>
    </Card>
  </section>;
}
