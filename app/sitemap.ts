import type { MetadataRoute } from "next";
import { allPages, flowSteps, funnelTemplates } from "@/lib/marketing";
import { gtmLanes } from "@/lib/gtm-lanes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://brunerdigital.example";
  const routes = [
    "/",
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
    lastModified: new Date("2026-05-09"),
    changeFrequency: route.includes("legal") ? "yearly" : "weekly",
    priority: route === "/" ? 1 : 0.7
  }));
}
