import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SITE_URL, createPageMetadata, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Tell us about your business and goals. We help you plan the right digital solutions across marketing, automation, websites, and software.",
  path: "/contact",
});

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#webpage`,
  url: `${SITE_URL}/contact`,
  name: "Contact Pivilis",
  description: "Tell Pivilis about your business and what you need help with.",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
  },
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
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
          __html: serializeJsonLd(contactPageSchema),
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
