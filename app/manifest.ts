import type { MetadataRoute } from "next";
import { BRAND_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: BRAND_DESCRIPTION,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "browser",
    background_color: "#f7f4ee",
    theme_color: "#f7f4ee",
    icons: [
      {
        src: "/icons/pivilis-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/pivilis-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
