import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { services, serviceBySlug } from "@/lib/services";
import { serviceVisualAlts, serviceImages } from "@/lib/service-visuals";
import { toItemSlug } from "@/lib/capabilities";
import { ContactCTA } from "@/components/site-shell";
import { ServiceCapabilityGroups } from "@/components/service-directory-groups";
import { SubservicesCardsGrid } from "@/components/subservices-cards-grid";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pivilis.com";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return { title: "Service" };

  const pageUrl = `/services/${slug}`;
  const pageTitle = `${service.title} Services — Digital Support`;
  const fullTitle = `${service.title} Services — Digital Support`;
  const pageDesc = `${service.benefit} ${service.short}`;

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: fullTitle,
      description: pageDesc,
      url: pageUrl,
      siteName: "Pivilis",
      images: [
        {
          url: `/images/${service.slug}.webp`,
          width: 1200,
          height: 630,
          alt: `${service.title} — Pivilis`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: pageDesc,
      images: [`/images/${service.slug}.webp`],
    },
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/services/${service.slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${siteUrl}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `${siteUrl}/services/${service.slug}`,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/services/${service.slug}#service`,
        name: service.title,
        description: service.intro,
        url: `${siteUrl}/services/${service.slug}`,
        provider: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.title} Capabilities`,
          itemListElement: service.featured.map((feat) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: feat.name,
              description: feat.plain,
            },
          })),
        },
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <section className="detail-hero" data-nav-theme="light">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/services">Services</Link>
            <span>/</span>
            <span className="current">{service.title}</span>
          </nav>
          <div className="detail-hero-grid">
            <div className="detail-hero-content">
              <span className="eyebrow">Made for your business</span>
              <h1 className="display detail-hero-title">{service.title}</h1>
              <p className="lead detail-hero-lead">{service.intro}</p>
              <div className="detail-hero-actions">
                <a
                  className="btn-animated-icon btn-animated-coral"
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                >
                  <span className="btn-icon-text">Talk about this service</span>
                  <div className="btn-icon-badge" aria-hidden="true">
                    <ArrowUpRight size={16} />
                  </div>
                </a>
              </div>
            </div>
            <div className="detail-image">
              <Image
                src={serviceImages[service.slug] || `/images/${service.slug}.webp`}
                alt={serviceVisualAlts[service.slug]}
                width={1200}
                height={800}
                sizes="(max-width: 760px) 100vw, 50vw"
                preload
              />
            </div>
          </div>
        </div>
      </section>
      <SubservicesCardsGrid serviceSlug={service.slug} title={service.title} />
      <section className="section soft-band" data-nav-theme="light">
        <div className="container">
          <div className="section-top">
            <div>
              <span className="eyebrow">A useful starting point</span>
              <h2 className="heading">Where this can help.</h2>
              <p className="lead">Four common examples, explained simply.</p>
            </div>
          </div>
          <div className="detail-examples">
            {service.featured.map((item, i) => {
              const subSlug = item.slug || toItemSlug(item.name);
              return (
                <a
                  href={`/services/${service.slug}/${subSlug}`}
                  className="detail-example detail-example-link"
                  key={item.name}
                >
                  <div className="detail-example-top">
                    <span>0{i + 1}</span>
                    <ArrowUpRight
                      size={14}
                      className="detail-example-arrow"
                      aria-hidden="true"
                    />
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.plain}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section" data-nav-theme="light">
        <div className="container detail-layout">
          <div>
            <span className="eyebrow">Full capabilities</span>
            <h2 className="heading" style={{ marginTop: 20 }}>
              What’s possible.
            </h2>
            <p className="side-note">
              Open a group to see its capabilities. You do not need to select
              every item before contacting us.
            </p>
          </div>
          <ServiceCapabilityGroups
            groups={service.groups}
            serviceSlug={service.slug}
          />
        </div>
      </section>
      <ContactCTA
        title={`Let’s talk about ${service.title.toLowerCase()}.`}
        description="Tell us your current challenge. We can plan the right scope together."
      />
    </main>
  );
}
