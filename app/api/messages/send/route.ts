import { NextResponse } from "next/server";
import { readRuntimeIntegrationConfigByTenantSlug } from "@/lib/server/integration-config-store";

type MessageRequest = {
  to?: string;
  body?: string;
};

export async function POST(request: Request) {
  const settings = await loadTwilioSettings();
  const accountSid = settings.accountSid;
  const authToken = settings.authToken;
  const messagingServiceSid = settings.messagingServiceSid;
  const expectedToken = settings.internalToken;
  const suppliedToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!accountSid || !authToken || !messagingServiceSid) {
    return NextResponse.json({ success: false, message: "Twilio is not configured yet." }, { status: 503 });
  }

  if (!expectedToken || suppliedToken !== expectedToken) {
    return NextResponse.json({ success: false, message: "Messaging requires MESSAGING_API_TOKEN." }, { status: 401 });
  }

  let payload: MessageRequest;

  try {
    payload = (await request.json()) as MessageRequest;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid message payload." }, { status: 400 });
  }

  if (!payload.to || !payload.body) {
    return NextResponse.json({ success: false, message: "to and body are required." }, { status: 400 });
  }

  const form = new URLSearchParams({
    To: payload.to,
    Body: payload.body,
    MessagingServiceSid: messagingServiceSid
  });

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form
  });

  if (!response.ok) {
    return NextResponse.json({ success: false, message: `Twilio returned ${response.status}.` }, { status: 502 });
  }

  const data = (await response.json()) as { sid: string; status: string };

  return NextResponse.json({ success: true, sid: data.sid, status: data.status });
}

async function loadTwilioSettings() {
  try {
    const config = await readRuntimeIntegrationConfigByTenantSlug("twilio");
    return {
      accountSid: config?.all.TWILIO_ACCOUNT_SID || process.env.TWILIO_ACCOUNT_SID,
      authToken: config?.all.TWILIO_AUTH_TOKEN || process.env.TWILIO_AUTH_TOKEN,
      messagingServiceSid: config?.all.TWILIO_MESSAGING_SERVICE_SID || process.env.TWILIO_MESSAGING_SERVICE_SID,
      internalToken: config?.all.MESSAGING_API_TOKEN || process.env.MESSAGING_API_TOKEN
    };
  } catch {
    return {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      internalToken: process.env.MESSAGING_API_TOKEN
    };
  }
}
