"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Bot, CalendarClock, Lightbulb, MessageSquareText, MoveUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { chartData, conversations, contacts, kpis, pipeline } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";
import { AnalyticsShowcase, FunnelVelocity } from "@/components/app/analytics-visuals";

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-lg border border-white/10 bg-slate-950/62 shadow-panel">
        <div className="grid gap-0 lg:grid-cols-[1.45fr_0.9fr]">
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Command center</Badge>
              <Badge variant="success">AI recommendations live</Badge>
            </div>
            <h1 className="mt-5 max-w-4xl text-3xl font-semibold tracking-normal md:text-5xl">
              White-label growth operations for every client workspace.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Manage CRM, messaging, calendars, funnels, automation, reputation, billing, reporting, and AI assistance from one premium agency operating system.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button>
                <Sparkles data-icon="inline-start" />
                Run AI audit
              </Button>
              <Button variant="outline">Create workflow</Button>
            </div>
          </div>
          <div className="border-t border-white/10 bg-white/[0.025] p-6 lg:border-l lg:border-t-0">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-lg bg-primary/15 text-sky-200">
                <Bot />
              </div>
              <div>
                <div className="font-semibold">AI dashboard insights</div>
                <div className="text-sm text-muted-foreground">Generated 4 minutes ago</div>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3 text-sm leading-6 text-slate-300">
              <p>17 leads are hot and untouched for more than 30 minutes. Prioritize Maya, Priya, and Summit Roofing first.</p>
              <p>Revenue is up 18.4% week over week, driven by faster SMS replies and review-request automation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-300" />
            <div className="absolute -right-8 -top-8 size-24 rounded-full bg-sky-400/10 blur-2xl" />
            <CardHeader>
              <CardDescription>{kpi.label}</CardDescription>
              <div className="flex items-end justify-between gap-3">
                <CardTitle className="text-3xl">{kpi.value}</CardTitle>
                <Badge variant={kpi.tone}>{kpi.change}</Badge>
              </div>
              <div className="mt-5 h-10 overflow-hidden rounded-md bg-slate-950/70">
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

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.85fr]">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
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
                  <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(148,163,184,.18)", borderRadius: 8 }} />
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
              <div key={contact.email} className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
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

      <section className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
        <FunnelVelocity />
        <Card>
          <CardHeader>
            <CardTitle>Deals pipeline</CardTitle>
            <CardDescription>Stage-based CRM foundation with scoring and owners</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {pipeline.map((stage) => (
              <div key={stage.stage} className="rounded-lg border border-white/10 bg-slate-950/48 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium">{stage.stage}</span>
                  <Badge variant="secondary">{stage.deals.length}</Badge>
                </div>
                <div className="flex flex-col gap-3">
                  {stage.deals.map((deal) => (
                    <div key={deal.name} className="rounded-md bg-white/[0.035] p-3">
                      <div className="text-sm font-medium">{deal.name}</div>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
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
              <div key={conversation.name} className="flex gap-3">
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
