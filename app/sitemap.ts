import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { getAllCapabilityParams } from "@/lib/capabilities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pivilis.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const capabilityRoutes: MetadataRoute.Sitemap = getAllCapabilityParams().map(
    ({ slug, item }) => ({
      url: `${baseUrl}/services/${slug}/${item}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    })
  );

  return [...staticRoutes, ...categoryRoutes, ...capabilityRoutes];
}
