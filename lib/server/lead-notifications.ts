import "server-only";
import { readRuntimeIntegrationConfig, type RuntimeIntegrationConfig } from "@/lib/server/integration-config-store";

export type LeadNotificationResult = {
  provider: "webhook" | "sendgrid" | "mailgun";
  status: "sent" | "skipped" | "failed";
  reason?: string;
};

type LeadPayload = Record<string, unknown> & {
  email?: string;
  name?: string;
  company?: string;
  phone?: string;
  source?: string;
  page_url?: string;
};

type LeadNotificationSettings = {
  webhookUrl?: string;
  notificationEmail?: string;
  sendgridApiKey?: string;
  sendgridFromEmail?: string;
  sendgridFromName?: string;
  mailgunApiKey?: string;
  mailgunDomain?: string;
  mailgunFromEmail?: string;
};

export async function notifyLead(payload: LeadPayload, tenantId?: string): Promise<LeadNotificationResult[]> {
  const settings = await loadLeadNotificationSettings(tenantId);
  const results = await Promise.allSettled([
    postLeadWebhook(payload, settings),
    sendSendGridLeadEmail(payload, settings),
    sendMailgunLeadEmail(payload, settings)
  ]);

  return results.map((result) => {
    if (result.status === "fulfilled") return result.value;
    return { provider: "webhook", status: "failed", reason: result.reason instanceof Error ? result.reason.message : "Unknown notification error" };
  });
}

async function loadLeadNotificationSettings(tenantId?: string): Promise<LeadNotificationSettings> {
  const fallback: LeadNotificationSettings = {
    webhookUrl: process.env.LEADS_WEBHOOK_URL,
    notificationEmail: process.env.LEADS_NOTIFICATION_EMAIL,
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    sendgridFromEmail: process.env.SENDGRID_FROM_EMAIL,
    sendgridFromName: process.env.SENDGRID_FROM_NAME,
    mailgunApiKey: process.env.MAILGUN_API_KEY,
    mailgunDomain: process.env.MAILGUN_DOMAIN,
    mailgunFromEmail: process.env.MAILGUN_FROM_EMAIL
  };

  if (!tenantId) return fallback;

  const [routing, sendgrid, mailgun] = await Promise.allSettled([
    readRuntimeIntegrationConfig(tenantId, "custom_webhook"),
    readRuntimeIntegrationConfig(tenantId, "sendgrid"),
    readRuntimeIntegrationConfig(tenantId, "mailgun")
  ]);

  return {
    webhookUrl: readConfigValue(routing, "LEADS_WEBHOOK_URL", fallback.webhookUrl),
    notificationEmail: readConfigValue(routing, "LEADS_NOTIFICATION_EMAIL", fallback.notificationEmail),
    sendgridApiKey: readConfigValue(sendgrid, "SENDGRID_API_KEY", fallback.sendgridApiKey),
    sendgridFromEmail: readConfigValue(sendgrid, "SENDGRID_FROM_EMAIL", fallback.sendgridFromEmail),
    sendgridFromName: readConfigValue(sendgrid, "SENDGRID_FROM_NAME", fallback.sendgridFromName),
    mailgunApiKey: readConfigValue(mailgun, "MAILGUN_API_KEY", fallback.mailgunApiKey),
    mailgunDomain: readConfigValue(mailgun, "MAILGUN_DOMAIN", fallback.mailgunDomain),
    mailgunFromEmail: readConfigValue(mailgun, "MAILGUN_FROM_EMAIL", fallback.mailgunFromEmail)
  };
}

function readConfigValue(result: PromiseSettledResult<RuntimeIntegrationConfig>, key: string, fallback?: string) {
  if (result.status !== "fulfilled") return fallback;
  return result.value.all[key] || fallback;
}

async function postLeadWebhook(payload: LeadPayload, settings: LeadNotificationSettings): Promise<LeadNotificationResult> {
  const webhookUrl = settings.webhookUrl;
  if (!webhookUrl) return { provider: "webhook", status: "skipped", reason: "LEADS_WEBHOOK_URL is not configured." };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    return response.ok
      ? { provider: "webhook", status: "sent" }
      : { provider: "webhook", status: "failed", reason: `Webhook returned ${response.status}.` };
  } catch (error) {
    return { provider: "webhook", status: "failed", reason: error instanceof Error ? error.message : "Webhook failed." };
  }
}

async function sendSendGridLeadEmail(payload: LeadPayload, settings: LeadNotificationSettings): Promise<LeadNotificationResult> {
  const apiKey = settings.sendgridApiKey;
  const to = settings.notificationEmail;
  const from = settings.sendgridFromEmail;

  if (!apiKey || !to || !from) {
    return { provider: "sendgrid", status: "skipped", reason: "SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, or LEADS_NOTIFICATION_EMAIL is missing." };
  }

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: from, name: settings.sendgridFromName || "Digital360" },
        subject: `New Digital360 lead: ${payload.company ?? payload.email}`,
        content: [{ type: "text/plain", value: formatLead(payload) }]
      })
    });

    return response.ok
      ? { provider: "sendgrid", status: "sent" }
      : { provider: "sendgrid", status: "failed", reason: `SendGrid returned ${response.status}.` };
  } catch (error) {
    return { provider: "sendgrid", status: "failed", reason: error instanceof Error ? error.message : "SendGrid failed." };
  }
}

async function sendMailgunLeadEmail(payload: LeadPayload, settings: LeadNotificationSettings): Promise<LeadNotificationResult> {
  const apiKey = settings.mailgunApiKey;
  const domain = settings.mailgunDomain;
  const to = settings.notificationEmail;
  const from = settings.mailgunFromEmail;

  if (!apiKey || !domain || !to || !from) {
    return { provider: "mailgun", status: "skipped", reason: "MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM_EMAIL, or LEADS_NOTIFICATION_EMAIL is missing." };
  }

  const body = new URLSearchParams({
    from: `Digital360 <${from}>`,
    to,
    subject: `New Digital360 lead: ${payload.company ?? payload.email}`,
    text: formatLead(payload)
  });

  try {
    const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`
      },
      body
    });

    return response.ok
      ? { provider: "mailgun", status: "sent" }
      : { provider: "mailgun", status: "failed", reason: `Mailgun returned ${response.status}.` };
  } catch (error) {
    return { provider: "mailgun", status: "failed", reason: error instanceof Error ? error.message : "Mailgun failed." };
  }
}

function formatLead(payload: LeadPayload) {
  return [
    "New Digital360 lead",
    "",
    `Name: ${payload.name ?? ""}`,
    `Email: ${payload.email ?? ""}`,
    `Company: ${payload.company ?? ""}`,
    `Phone: ${payload.phone ?? ""}`,
    `Source: ${payload.source ?? ""}`,
    `Page: ${payload.page_url ?? ""}`,
    "",
    "Payload:",
    JSON.stringify(payload, null, 2)
  ].join("\n");
}
