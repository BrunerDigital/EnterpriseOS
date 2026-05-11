import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { MarketingShell, SectionHeader } from "@/components/marketing/marketing-shell";
import { Button } from "@/components/ui/button";
import { gtmLanes } from "@/lib/gtm-lanes";

export default function Page() {
  return (
    <MarketingShell>
      <main>
        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              title="Three GTM lanes ready for launch"
              body="Each lane now has a dedicated landing page, funnel offer, qualification path, nurture sequence, ad hooks, and sales call path."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {gtmLanes.map((lane) => (
                <article key={lane.slug} className="glass-panel rounded-lg p-6">
                  <div className="text-sm font-semibold text-sky-300">{lane.audience}</div>
                  <h2 className="mt-4 text-2xl font-semibold text-white">{lane.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{lane.subheadline}</p>
                  <div className="mt-6 grid gap-3">
                    {lane.funnel.qualification.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                        <Check className="mt-1 size-4 shrink-0 text-emerald-300" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <Button asChild className="mt-8 w-full bg-sky-400 text-slate-950 hover:bg-sky-300">
                    <Link href={lane.slug}>
                      Open lane
                      <ArrowRight data-icon="inline-end" className="size-4" />
                    </Link>
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
