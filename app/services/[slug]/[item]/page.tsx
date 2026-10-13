import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight
} from "lucide-react";
import {
  getCapabilityDetails,
  getAllCapabilityParams
} from "@/lib/capabilities";
import { getSubserviceCard } from "@/lib/subservices-cards";
import { ContactCTA } from "@/components/site-shell";
import { SubserviceComparisonSection } from "@/components/subservice-comparison-section";
import { SITE_URL, createPageMetadata, serializeJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getAllCapabilityParams();
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; item: string }>;
}): Promise<Metadata> {
  const { slug, item } = await params;
  const detail = getCapabilityDetails(slug, item);
  if (!detail) {
    return {
      title: "Not found",
      robots: { index: false, follow: false },
    };
  }

  const subserviceCard = getSubserviceCard(detail.serviceSlug, detail.slug);
  const subserviceImage =
    subserviceCard?.image ||
    `/images/service-details/${detail.serviceSlug}-removebg-preview.webp`;

  const pageUrl = `/services/${slug}/${item}`;
  const pageDesc = `${detail.tagline} A ${detail.serviceTitle} capability from Pivilis.`;

  return createPageMetadata({
    title: detail.name,
    description: pageDesc,
    path: pageUrl,
    image: {
      url: subserviceImage,
      width: 1254,
      height: 1254,
      alt: `${detail.name} — ${detail.serviceTitle}`,
    },
  });
}

export default async function CapabilityPage({
  params
}: {
  params: Promise<{ slug: string; item: string }>;
}) {
  const { slug, item } = await params;
  const detail = getCapabilityDetails(slug, item);

  if (!detail) {
    notFound();
  }

  const subserviceCard = getSubserviceCard(detail.serviceSlug, detail.slug);
  const subserviceImage =
    subserviceCard?.image ||
    `/images/service-details/${detail.serviceSlug}-removebg-preview.webp`;
  const subserviceAlt =
    subserviceCard?.alt || `${detail.name} — ${detail.serviceTitle}`;

  const capabilitySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/services/${detail.serviceSlug}/${detail.slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: detail.serviceTitle,
            item: `${SITE_URL}/services/${detail.serviceSlug}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: detail.name,
            item: `${SITE_URL}/services/${detail.serviceSlug}/${detail.slug}`,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/services/${detail.serviceSlug}/${detail.slug}#service`,
        name: detail.name,
        description: detail.simpleSummary,
        url: `${SITE_URL}/services/${detail.serviceSlug}/${detail.slug}`,
        serviceType: detail.serviceTitle,
        provider: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
        },
      },
    ],
  };

  return (
    <main className="capability-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(capabilitySchema),
        }}
      />
      {/* Hero Section */}
      <section className="capability-hero" data-nav-theme="light">
        <div className="container">
          {/* 1. Breadcrumbs */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/services">Services</Link>
            <span>/</span>
            <Link href={`/services/${detail.serviceSlug}`}>{detail.serviceTitle}</Link>
            <span>/</span>
            <span className="current">{detail.name}</span>
          </nav>

          <div className="capability-hero-layout">
            {/* Left Content Column */}
            <div className="capability-hero-content">
              {/* 1. Automation Title */}
              <div className="capability-title-block">
                <span className="eyebrow">
                  {detail.serviceTitle} • {detail.groupTitle}
                </span>
                <h1 className="display capability-title">{detail.name}</h1>
              </div>

              {/* 2. Content Tagline */}
              <p className="lead capability-tagline">{detail.tagline}</p>

              {/* 3. Action Buttons Row */}
              <div className="capability-hero-actions-row">
                <a
                  className="btn-animated-icon btn-animated-coral capability-cta-btn"
                  href={`/contact?service=${encodeURIComponent(
                    `${detail.serviceTitle} - ${detail.name}`
                  )}`}
                >
                  <span className="btn-icon-text">Talk about this service</span>
                  <div className="btn-icon-badge" aria-hidden="true">
                    <ArrowUpRight size={16} />
                  </div>
                </a>
                <Link
                  className="button button-ghost capability-back-btn"
                  href={`/services/${detail.serviceSlug}`}
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  <span>Back</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Card (Floating 3D Artwork) */}
            <div className="capability-hero-visual-card">
              <div className="capability-visual-frame">
                <Image
                  src={subserviceImage}
                  alt={subserviceAlt}
                  className="capability-visual-img"
                  width={1254}
                  height={1254}
                  sizes="(max-width: 760px) 100vw, 45vw"
                  preload
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Before vs After Section */}
      <section className="section soft-band" data-nav-theme="light">
        <div className="container">
          <div className="section-top">
            <div>
              <span className="eyebrow">Real impact</span>
              <h2 className="heading">The difference it makes.</h2>
              <p className="lead">
                Compare the manual way with having this system in place.
              </p>
            </div>
          </div>

          <SubserviceComparisonSection
            before={detail.before}
            after={detail.after}
          />
        </div>
      </section>

      {/* How It Works In 3 Steps */}
      <section className="section" data-nav-theme="light">
        <div className="container">
          <div className="section-top">
            <div>
              <span className="eyebrow">Simple roadmap</span>
              <h2 className="heading">How we set this up with you.</h2>
              <p className="lead">
                No technical headaches. We handle the heavy lifting from day one.
              </p>
            </div>
          </div>

          <div className="steps-grid">
            {detail.howItWorks.map((step) => (
              <div className="step-card" key={step.step}>
                <span className="step-badge">Step {step.step}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services in the Same Group (Clickable Buttons!) */}
      {detail.relatedItems.length > 0 && (
        <section className="section soft-band" data-nav-theme="light">
          <div className="container">
            <div className="section-top">
              <div>
                <span className="eyebrow">Explore more in {detail.groupTitle}</span>
                <h2 className="heading">Related capabilities you can add.</h2>
                <p className="lead">
                  Every capability works independently or combines easily.
                </p>
              </div>
            </div>

            <div className="related-capabilities-grid">
              {detail.relatedItems.map((rel) => (
                <a
                  href={`/services/${detail.serviceSlug}/${rel.slug}`}
                  key={rel.slug}
                  className="related-cap-btn"
                >
                  <span className="related-cap-name">{rel.name}</span>
                  <span className="related-cap-arrow">
                    <span>Explore</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <ContactCTA
        title={`Ready to set up ${detail.name.toLowerCase()}?`}
        description="Tell us about your business or current challenge. We will share a simple plan and clear pricing."
      />
    </main>
  );
}
