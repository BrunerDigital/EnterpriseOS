"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

export const SampleDashboard = dynamic(() => import("@/components/app/dashboard").then(module => module.Dashboard), {
  loading: () => <p className="mt-4 text-sm text-muted-foreground" role="status">Loading the sample dashboard…</p>
});

export function SampleDashboardPreview() {
  const [expanded, setExpanded] = useState(false);

  return <details className="rounded-xl border border-white/10 bg-white/[0.025] p-4" onToggle={event => setExpanded(event.currentTarget.open)}>
    <summary className="cursor-pointer rounded-sm text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300">Sample dashboard</summary>
    {expanded ? <div className="mt-5"><SampleDashboard showHeader={false} /></div> : null}
  </details>;
}
