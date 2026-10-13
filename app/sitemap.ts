import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { getAllCapabilityParams } from "@/lib/capabilities";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const capabilityRoutes: MetadataRoute.Sitemap = getAllCapabilityParams().map(
    ({ slug, item }) => ({
      url: `${SITE_URL}/services/${slug}/${item}`,
      changeFrequency: "monthly",
      priority: 0.75,
    })
  );

  return [...staticRoutes, ...categoryRoutes, ...capabilityRoutes];
}
