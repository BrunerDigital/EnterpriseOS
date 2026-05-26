export type TrackingEvent =
  | "demo_requested"
  | "trial_started"
  | "agency_application_submitted"
  | "funnel_lead_captured"
  | "pricing_plan_selected"
  | "upgrade_clicked"
  | "onboarding_step_completed";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    digital360Tracking?: {
      googleAdsId?: string;
      googleAdsConversionLabel?: string;
      linkedInConversionId?: string;
    };
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    lintrk?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: TrackingEvent, properties: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent("brunerdigital:track", { detail: { event, properties } }));
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...properties });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, properties);
  }

  if (event === "demo_requested" || event === "funnel_lead_captured") {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", properties);
    }

    const config = window.digital360Tracking;

    if (typeof window.gtag === "function" && config?.googleAdsId && config.googleAdsConversionLabel) {
      window.gtag("event", "conversion", {
        send_to: `${config.googleAdsId}/${config.googleAdsConversionLabel}`,
        ...properties
      });
    }

    if (typeof window.lintrk === "function" && config?.linkedInConversionId) {
      window.lintrk("track", { conversion_id: config.linkedInConversionId });
    }
  }
}
