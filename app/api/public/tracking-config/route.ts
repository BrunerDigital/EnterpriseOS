import { NextResponse } from "next/server";
import { readPublicIntegrationValuesByTenantSlug } from "@/lib/server/integration-config-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const values = await loadValues();

  return NextResponse.json(
    {
      gaMeasurementId: values.NEXT_PUBLIC_GA_MEASUREMENT_ID || readEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
      googleAdsId: values.NEXT_PUBLIC_GOOGLE_ADS_ID || readEnv("NEXT_PUBLIC_GOOGLE_ADS_ID"),
      googleAdsConversionLabel: values.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || readEnv("NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL"),
      metaPixelId: values.NEXT_PUBLIC_META_PIXEL_ID || readEnv("NEXT_PUBLIC_META_PIXEL_ID"),
      linkedInPartnerId: values.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || readEnv("NEXT_PUBLIC_LINKEDIN_PARTNER_ID"),
      linkedInConversionId: values.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID || readEnv("NEXT_PUBLIC_LINKEDIN_CONVERSION_ID")
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}

async function loadValues() {
  try {
    return await readPublicIntegrationValuesByTenantSlug(["google_analytics", "google_ads", "meta", "linkedin"]);
  } catch {
    return {};
  }
}

function readEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}
