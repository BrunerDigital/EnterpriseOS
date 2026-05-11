export type TrackingEvent =
  | "demo_requested"
  | "trial_started"
  | "agency_application_submitted"
  | "funnel_lead_captured"
  | "pricing_plan_selected"
  | "upgrade_clicked"
  | "onboarding_step_completed";

export function trackEvent(event: TrackingEvent, properties: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent("brunerdigital:track", { detail: { event, properties } }));
}
