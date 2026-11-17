import "server-only";
import { z } from "zod";
import type { AppSession } from "@/lib/auth/session";
import { resolveInquiryWorkspace } from "@/lib/server/inquiry-workspace";

const count = z.number().int().nonnegative();
const overviewSchema = z.object({
  total: count,
  website: count,
  walkthroughs: count,
  connected_forms: count,
  recent: z.array(z.object({
    id: z.string().uuid(),
    name: z.string(),
    service: z.string(),
    source: z.enum(["brunerdigital_website", "digital360_walkthrough"]),
    received_at: z.string().datetime({ offset: true }),
    utm_campaign: z.string().nullable(),
    utm_content: z.string().nullable()
  })).max(6)
});

export type InquiryOverviewData = z.infer<typeof overviewSchema>;
export type InquiryRange = 7 | 30;

export async function loadInquiryOverview(session: AppSession, days: InquiryRange) {
  const scope = await resolveInquiryWorkspace(session);
  if (scope.status !== "ready") return scope;

  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const { data, error } = await scope.admin.rpc("brunerdigital_inquiry_overview", {
    p_workspace_id: scope.workspace.id,
    p_since: since
  });
  const overview = overviewSchema.safeParse(data);
  if (error || !overview.success) throw new Error("Unable to load inquiry activity");
  return { status: "ready" as const, workspace: scope.workspace, data: overview.data };
}
