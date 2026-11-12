import "server-only";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const maxInquiryBytes = 24_000;
const optionalText = (limit: number) => z.string().trim().max(limit).optional();
const campaignTag = z.string().trim().regex(/^[A-Za-z0-9][A-Za-z0-9._-]{0,119}$/).optional();

export const inquiryWorkspaceType = "agency";

export const walkthroughInquiry = z.object({
  request_id: z.string().uuid(),
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(150),
  email: z.string().trim().email().max(200).transform((value) => value.toLowerCase()),
  contact_consent: z.literal("yes"),
  website: z.string().max(0).optional(),
  team_type: optionalText(100),
  current_stack: optionalText(400),
  launch_goal: optionalText(1000),
  utm_source: campaignTag,
  utm_medium: campaignTag,
  utm_campaign: campaignTag,
  utm_content: campaignTag,
  utm_term: z.string().trim().regex(/^[A-Za-z0-9][A-Za-z0-9 ._+/-]{0,119}$/).optional()
});
type WalkthroughInquiry = z.infer<typeof walkthroughInquiry>;

export function inquiryWorkspaceId() {
  const id = z.string().uuid().safeParse(process.env.BRUNERDIGITAL_INQUIRY_WORKSPACE_ID);
  return id.success ? id.data : undefined;
}

export async function readInquiryBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return Buffer.alloc(0);

  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) return Buffer.concat(chunks, length);
      length += value.byteLength;
      if (length > maxInquiryBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
}

export async function saveWalkthroughInquiry(workspaceId: string, inquiry: WalkthroughInquiry) {
  const { request_id, name, email, company, team_type, current_stack, launch_goal,
    utm_source, utm_medium, utm_campaign, utm_content, utm_term } = inquiry;
  const notes = [
    team_type && "Team: " + team_type,
    current_stack && "Current tools: " + current_stack,
    launch_goal && "Workflow: " + launch_goal
  ].filter(Boolean);

  const admin = createAdminClient();
  const { data, error } = await admin.rpc("capture_brunerdigital_inquiry", {
    p_workspace_id: workspaceId,
    p_request_id: request_id,
    p_source: "digital360_walkthrough",
    p_brief: {
      name, email, company, service: "Digital360 walkthrough", message: notes.join("\n\n") || null,
      contact_consent: true, utm_source, utm_medium, utm_campaign, utm_content, utm_term
    }
  }).single();

  if (error?.code === "23505") return { status: "conflict" as const };
  if (error || data?.request_id !== request_id) return { status: "unavailable" as const };
  return { status: "accepted" as const, receipt: data.request_id, replayed: data.replayed };
}
