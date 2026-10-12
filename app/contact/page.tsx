import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pivilis.com";

export const metadata: Metadata = {
  title: "Contact — Start a Project or Conversation",
  description:
    "Tell us about your business and goals. We help you plan the right digital solutions across marketing, automation, websites, and software.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Start a Project or Conversation",
    description:
      "Tell us about your business and goals. We help you plan the right digital solutions across marketing, automation, websites, and software.",
    url: "/contact",
    siteName: "Pivilis",
    images: [
      {
        url: "/images/hero-about.png",
        width: 1200,
        height: 630,
        alt: "Contact Pivilis",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Start a Project or Conversation",
    description:
      "Tell us about your business and goals. We help you plan the right digital solutions across marketing, automation, websites, and software.",
    images: ["/images/hero-about.png"],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${siteUrl}/contact#webpage`,
  url: `${siteUrl}/contact`,
  name: "Contact Pivilis",
  description: "Tell Pivilis about your business and what you need help with.",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
  },
  mainEntity: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "Pivilisofficial@gmail.com",
      contactType: "customer support",
    },
  },
};

export default function Contact() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />
      <section className="page-intro" data-nav-theme="light">
        <div className="container contact-layout">
          <div>
            <span className="eyebrow">Contact</span>
            <h1 className="display" style={{ marginTop: 24 }}>
              Tell us what you’re working on.
            </h1>
            <p className="lead">
              A brief note is enough. Explain your business and what you would
              like to improve in your own words.
            </p>
            <div
              style={{
                borderTop: "1px solid var(--line)",
                marginTop: 45,
                paddingTop: 25,
                maxWidth: 410,
              }}
            >
              <strong style={{ fontSize: "1.05rem" }}>
                You can start without a technical plan.
              </strong>
              <p className="muted" style={{ lineHeight: 1.6 }}>
                We can talk through the options after understanding your goal.
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
