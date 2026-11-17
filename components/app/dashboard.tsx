"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { CalendarClock, Lightbulb, MessageSquareText, MoveUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { chartData, conversations, contacts, pipeline } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";
import { AnalyticsShowcase, FunnelVelocity } from "@/components/app/analytics-visuals";

const dashboardKpis = [
  { label: "Total Revenue", value: "$48,920", change: "+28.4%", tone: "success" },
  { label: "New Leads", value: "1,250", change: "+18.7%", tone: "success" },
  { label: "Appointments", value: "342", change: "+22.1%", tone: "success" },
  { label: "Conversion Rate", value: "27.4%", change: "+6.3%", tone: "success" }
] as const;

export function Dashboard({ showHeader = true }: { showHeader?: boolean } = {}) {
  return (
    <div className="flex flex-col gap-6">
      {showHeader ? <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold leading-tight tracking-[-0.025em] text-white md:text-4xl">Dashboard</h1>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">Welcome back. Here&apos;s what&apos;s happening with your business.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">May 8 - May 15, 2026</Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-500">
            <Sparkles data-icon="inline-start" />
            Customize
          </Button>
        </div>
      </section> : null}

      <section className="d360-kpi-grid grid gap-layout" aria-label="Key metrics">
        {dashboardKpis.map((kpi) => (
          <Card key={kpi.label} className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-[image:var(--d360-spectrum)]" />
            <CardHeader className="d360-kpi-content">
              <CardDescription>{kpi.label}</CardDescription>
              <div className="d360-kpi-values flex flex-col items-start gap-x-3 gap-y-2">
                <CardTitle className="text-[clamp(1.6rem,2.3vw,2rem)] tabular-nums">{kpi.value}</CardTitle>
                <Badge className="tabular-nums" variant={kpi.tone}>{kpi.change}</Badge>
              </div>
              <div className="mt-2 h-8 overflow-hidden rounded-md bg-slate-950/55 sm:mt-3 sm:h-10" aria-hidden="true">
                <div className="flex h-full items-end gap-1 px-2 pb-1">
                  {[42, 58, 51, 74, 69, 88, 81, 96].map((height, index) => (
                    <div key={index} className="flex-1 rounded-t-sm bg-gradient-to-t from-sky-500 to-emerald-300" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </section>

      <AnalyticsShowcase />

      <section className="grid gap-layout xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.85fr)]">
        <Card>
          <CardHeader className="items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <CardTitle>Pipeline health</CardTitle>
              <CardDescription>Leads, revenue, and appointments by day</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View report
              <MoveUpRight data-icon="inline-end" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="leads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.55} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.12)" />
                  <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#161e29", border: "1px solid #9eb6d044", borderRadius: 10 }} />
                  <Area type="monotone" dataKey="leads" stroke="#38bdf8" fillOpacity={1} fill="url(#leads)" />
                  <Area type="monotone" dataKey="revenue" stroke="#34d399" fillOpacity={1} fill="url(#revenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI opportunity next steps</CardTitle>
            <CardDescription>Prioritized by lead score, value, and response urgency</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {contacts.map((contact) => (
              <div key={contact.email} className="glass-inset p-inset">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">{contact.company}</div>
                  </div>
                  <Badge variant="success">{contact.score}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{contact.nextStep}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-layout xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <FunnelVelocity />
        <Card>
          <CardHeader>
            <CardTitle>Deals pipeline</CardTitle>
            <CardDescription>Stage-based CRM foundation with scoring and owners</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {pipeline.map((stage) => (
              <div key={stage.stage} className="glass-inset p-inset">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium">{stage.stage}</span>
                  <Badge variant="secondary">{stage.deals.length}</Badge>
                </div>
                <div className="flex flex-col gap-3">
                  {stage.deals.map((deal) => (
                    <div key={deal.name} className="rounded-md bg-white/[0.035] p-3">
                      <div className="text-sm font-medium">{deal.name}</div>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 text-xs tabular-nums text-muted-foreground">
                        <span>{deal.owner}</span>
                        <span>{formatCurrency(deal.value)}</span>
                      </div>
                      <Progress className="mt-3" value={deal.score} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Two-way email, SMS, and social-style inbox foundation</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {conversations.map((conversation, index) => (
              <div key={conversation.name} className="glass-inset flex gap-3 p-inset">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sky-200">
                  {index === 0 ? <MessageSquareText /> : index === 1 ? <CalendarClock /> : <Lightbulb />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{conversation.name}</span>
                    <Badge variant="secondary">{conversation.channel}</Badge>
                    <Badge variant="success">{conversation.sentiment}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{conversation.message}</p>
                  <Separator className="my-3" />
                  <p className="text-sm leading-6 text-slate-300">AI reply: {conversation.suggestion}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
