import type { Metadata } from "next";
import { MotionAccents } from "@/components/motion-accents";
import { Header, Footer } from "@/components/site-shell";
import { PivilisPreloader } from "@/components/pivilis-preloader";
import {
  BRAND_DESCRIPTION,
  BRAND_TITLE,
  DEFAULT_SOCIAL_IMAGE,
  SITE_NAME,
  SITE_URL,
  serializeJsonLd,
} from "@/lib/seo";
import "./globals.css";

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: BRAND_TITLE,
    template: "%s | Pivilis",
  },
  description: BRAND_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: BRAND_TITLE,
    description: BRAND_DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_TITLE,
    description: BRAND_DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/icons/pivilis-48.png",
        type: "image/png",
        sizes: "48x48",
      },
      {
        url: "/icons/pivilis-192.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    shortcut: "/icons/pivilis-48.png",
    apple: {
      url: "/icons/pivilis-180.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification
      ? { other: { "msvalidate.01": bingVerification } }
      : {}),
  },
};

const orgWebsiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/images/pivilis-icon.webp`,
        width: 1304,
        height: 1206,
        caption: SITE_NAME,
      },
      email: "Pivilisofficial@gmail.com",
      description: BRAND_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      description: BRAND_DESCRIPTION,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{localStorage.removeItem("pivilis-theme");document.documentElement.dataset.theme="light";document.documentElement.classList.add("pv-lock");}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(orgWebsiteSchema),
          }}
        />
      </head>
      <body>
        <PivilisPreloader />
        <Header />
        <MotionAccents />
        {children}
        <Footer />
      </body>
    </html>
  );
}
