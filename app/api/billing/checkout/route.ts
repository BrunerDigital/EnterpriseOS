import { NextResponse } from "next/server";

type CheckoutRequest = {
  priceId?: string;
  customerEmail?: string;
  successUrl?: string;
  cancelUrl?: string;
};

export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const expectedToken = process.env.BILLING_API_TOKEN;
  const suppliedToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!stripeKey) {
    return NextResponse.json({ success: false, message: "Stripe is not configured yet." }, { status: 503 });
  }

  if (!expectedToken || suppliedToken !== expectedToken) {
    return NextResponse.json({ success: false, message: "Billing checkout requires BILLING_API_TOKEN." }, { status: 401 });
  }

  let payload: CheckoutRequest;

  try {
    payload = (await request.json()) as CheckoutRequest;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid checkout payload." }, { status: 400 });
  }

  if (!payload.priceId) {
    return NextResponse.json({ success: false, message: "priceId is required." }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digital360.brunerdigital.com";
  const form = new URLSearchParams({
    mode: "subscription",
    success_url: payload.successUrl || `${siteUrl}/billing?checkout=success`,
    cancel_url: payload.cancelUrl || `${siteUrl}/billing?checkout=cancelled`,
    "line_items[0][price]": payload.priceId,
    "line_items[0][quantity]": "1",
    "metadata[product]": "digital360"
  });

  if (payload.customerEmail) {
    form.set("customer_email", payload.customerEmail);
  }

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form
  });

  if (!response.ok) {
    return NextResponse.json({ success: false, message: `Stripe returned ${response.status}.` }, { status: 502 });
  }

  const data = (await response.json()) as { id: string; url: string };

  return NextResponse.json({ success: true, sessionId: data.id, url: data.url });
}
