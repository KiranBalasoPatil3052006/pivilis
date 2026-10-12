import type { Metadata } from "next";
import { MotionAccents } from "@/components/motion-accents";
import { Header, Footer } from "@/components/site-shell";
import { PivilisPreloader } from "@/components/pivilis-preloader";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pivilis.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pivilis — Digital Services for Growing Businesses",
    template: "%s | Pivilis",
  },
  description:
    "Practical support for content, marketing, automation, websites, software and design. One partner for the digital side of your business.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Pivilis",
    title: "Pivilis — Digital Services for Growing Businesses",
    description:
      "Practical support for content, marketing, automation, websites, software and design. One partner for the digital side of your business.",
    images: [
      {
        url: "/images/hero-about.webp",
        width: 1200,
        height: 630,
        alt: "Pivilis — Digital services for growing businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pivilis — Digital Services for Growing Businesses",
    description:
      "Practical support for content, marketing, automation, websites, software and design.",
    images: ["/images/hero-about.webp"],
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
  icons: {
    icon: "/images/pivilis-icon.webp",
    apple: "/images/pivilis-icon.webp",
  },
};

const orgWebsiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Pivilis",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        url: `${siteUrl}/images/pivilis-icon.webp`,
        caption: "Pivilis",
      },
      email: "Pivilisofficial@gmail.com",
      description:
        "Practical support for content, marketing, automation, websites, software and design. One partner for the digital side of your business.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Pivilis",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      description: "Digital services for growing businesses.",
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
        <link
          rel="preload"
          as="image"
          href="/images/preloader/logo.webp"
          fetchPriority="high"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{localStorage.removeItem("pivilis-theme");document.documentElement.dataset.theme="light";document.documentElement.classList.add("pv-lock");}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgWebsiteSchema),
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
