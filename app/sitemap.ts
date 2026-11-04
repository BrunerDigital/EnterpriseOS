import type { MetadataRoute } from "next";
import { allPages, flowSteps, funnelTemplates } from "@/lib/marketing";
import { gtmLanes } from "@/lib/gtm-lanes";
import { articles } from "@/lib/editorial";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://digital360.brunerdigital.com";
  const routes = [
    "/",
    "/launch-status",
    "/brunerdigital",
    ...articles.map(article => `/resources/${article.slug}`),
    ...Object.keys(allPages),
    ...funnelTemplates.map((funnel) => funnel.slug),
    "/gtm",
    ...gtmLanes.map((lane) => lane.slug),
    ...flowSteps.map((flow) => flow.slug),
    "/dashboard",
    "/legal/privacy",
    "/legal/terms"
  ];

  return [...new Set(routes)].map((route) => ({
    url: `${base}${route === "/" ? "" : route}`,
    lastModified: new Date("2026-11-04"),
    changeFrequency: route.includes("legal") ? "yearly" : "weekly",
    priority: route === "/" ? 1 : 0.7
  }));
}
