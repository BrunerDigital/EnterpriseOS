import { NextResponse } from "next/server";
import { getIntegrationStatuses, summarizeReadiness } from "@/lib/integrations";

export async function GET() {
  const statuses = getIntegrationStatuses();

  return NextResponse.json({
    success: true,
    summary: summarizeReadiness(statuses),
    integrations: statuses.map((status) => ({
      key: status.key,
      name: status.name,
      category: status.category,
      readiness: status.readiness,
      configured: status.configured,
      missing: status.missing,
      nextStep: status.nextStep
    }))
  });
}
