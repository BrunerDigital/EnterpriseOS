import { NextResponse } from "next/server";

type MessageRequest = {
  to?: string;
  body?: string;
};

export async function POST(request: Request) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
  const expectedToken = process.env.MESSAGING_API_TOKEN;
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
