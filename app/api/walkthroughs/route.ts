import { NextResponse } from "next/server";
import { inquiryWorkspaceId, readInquiryBody, saveWalkthroughInquiry, walkthroughInquiry } from "@/lib/server/project-inquiries";

const unavailable = "Walkthrough requests are temporarily unavailable. Please try again or contact BrunerDigital.";

function errorResponse(message: string, status: number) {
  return NextResponse.json({ accepted: false, message }, { status });
}

export async function POST(request: Request) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl || !URL.canParse(appUrl)) return errorResponse(unavailable, 503);
  if (request.headers.get("origin") !== new URL(appUrl).origin) {
    return errorResponse("Please submit from the Digital360 walkthrough page.", 403);
  }
  if (request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "application/json") {
    return errorResponse("Use the walkthrough form to send your request.", 415);
  }

  let payload: unknown;
  try {
    const body = await readInquiryBody(request);
    if (!body) return errorResponse("The request is too large.", 413);
    payload = JSON.parse(body.toString("utf8"));
  } catch {
    return errorResponse("The walkthrough request could not be read.", 400);
  }

  const inquiry = walkthroughInquiry.safeParse(payload);
  if (!inquiry.success) {
    return errorResponse("Check your name, company, work email and contact permission.", 422);
  }

  const workspaceId = inquiryWorkspaceId();
  if (!workspaceId) return errorResponse(unavailable, 503);

  try {
    const result = await saveWalkthroughInquiry(workspaceId, inquiry.data);
    if (result.status === "conflict") {
      return errorResponse("The request changed during a retry. Refresh the form and try again.", 409);
    }
    if (result.status !== "accepted") return errorResponse(unavailable, 503);
    return NextResponse.json({
      accepted: true,
      receipt_id: result.receipt,
      replayed: result.replayed,
      message: "Your Digital360 walkthrough request was received."
    }, { status: result.replayed ? 200 : 201 });
  } catch {
    console.error("Digital360 walkthrough intake is unavailable");
    return errorResponse(unavailable, 503);
  }
}
