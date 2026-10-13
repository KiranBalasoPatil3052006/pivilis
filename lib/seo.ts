import type { Metadata } from "next";

export const SITE_NAME = "Pivilis";
export const SITE_URL = "https://pivilis.com";
export const BRAND_TITLE = "Pivilis \u2014 Where Better Begins";
export const BRAND_DESCRIPTION =
  "Pivilis brings creative, marketing, technology and automation services together to help businesses build, grow and operate better.";

export const DEFAULT_SOCIAL_IMAGE = {
  url: "/images/about-hero.webp",
  width: 1672,
  height: 941,
  alt: "Pivilis brand mark in a warm architectural setting",
};

type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  image?: SocialImage;
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image = DEFAULT_SOCIAL_IMAGE,
}: PageMetadataOptions): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const pageUrl = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
  };
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
