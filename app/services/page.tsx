import type {Metadata} from "next";
import Image from "next/image";
import {ArrowDown, ArrowUpRight} from "lucide-react";
import {services} from "@/lib/services";
import {serviceVisualAlts, serviceImages} from "@/lib/service-visuals";
import {ServiceDirectoryNav} from "@/components/service-directory-nav";
import {ContactCTA} from "@/components/site-shell";
import {ScannerBackground} from "@/components/scanner-background";
import {ServicesRotatingBanner} from "@/components/services-rotating-banner";
import BlurText from "@/components/BlurText";
import {ServiceDirectoryGroups} from "@/components/service-directory-groups";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pivilis.com";

export const metadata: Metadata = {
  title: "Services Directory — Seven Digital Disciplines",
  description:
    "Explore all seven Pivilis service areas: AI & automation, social media, video editing, marketing & ads, websites, custom software, and product design.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services Directory — Seven Digital Disciplines",
    description:
      "Explore all seven Pivilis service areas: AI & automation, social media, video editing, marketing & ads, websites, custom software, and product design.",
    url: "/services",
    siteName: "Pivilis",
    images: [
      {
        url: "/images/hero-about.png",
        width: 1200,
        height: 630,
        alt: "Pivilis Services Directory",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services Directory — Seven Digital Disciplines",
    description:
      "Explore all seven Pivilis service areas: AI & automation, social media, video editing, marketing & ads, websites, custom software, and product design.",
    images: ["/images/hero-about.png"],
  },
};

const servicesDirectorySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteUrl}/services#webpage`,
  url: `${siteUrl}/services`,
  name: "Services Directory — Seven Digital Disciplines",
  description:
    "Explore all seven Pivilis service areas, from social media and advertising to automation, websites, custom software and design.",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${siteUrl}/services/${service.slug}`,
      description: service.short,
    })),
  },
};

export default function Services() {
  return <main>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(servicesDirectorySchema),
      }}
    />
    <section className="directory-hero" data-nav-theme="dark">
      <ScannerBackground
        color1="#FF4A32"
        color2="#FFA090"
        color3="#FFFFFF"
        speed={0.5}
        sweepSpeed={0.25}
        sweepWidth={1.6}
        sweepFalloff={6}
        scale={1.5}
        frequency={2}
        ripple={0.22}
        bandDensity={11}
        lineSharpness={5.5}
        glow={0.22}
        scanDirection="vertical"
        colorSpread={0.7}
        brightness={1.0}
        contrast={1.15}
        softness={1.4}
        vignette={0.45}
        scanline={true}
        grain={true}
        grainIntensity={0.05}
        opacity={1.0}
        mouseInteraction={true}
        mouseRadius={0.5}
        mouseStrength={0.5}
      />

      <div className="container directory-hero-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="directory-hero-grid">
          <BlurText
            text="Where better begins"
            delay={150}
            animateBy="words"
            direction="top"
            className="display"
            as="h1"
          />
          <div>
            <p>From reaching new customers to making daily work easier, we bring the digital pieces together around your business.</p>
            <a href="#service-directory" className="directory-down">Explore the services <ArrowDown aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>

    <section id="service-directory" className="services-directory-section" data-nav-theme="light">
      <ServicesRotatingBanner />

      <div className="directory-shell container">
      <ServiceDirectoryNav />
      <div className="directory-content">
        {services.map((service, i) => {
          const count = service.groups.reduce((total, group) => total + group.items.length, 0);
          return <section className="directory-feature" id={service.slug} key={service.slug}>
            <div className="directory-feature-head">
              <span className="eyebrow">{String(i + 1).padStart(2, "0")} / 07</span>
              <div className="directory-feature-title-row">
                <h2>
                  <a href={`/services/${service.slug}`} className="directory-title-link">
                    {service.title}
                  </a>
                </h2>
              </div>
              <p>{service.benefit}</p>
            </div>
            <div className="directory-feature-body">
              <a
                href={`/services/${service.slug}`}
                className="directory-image directory-image-link"
                aria-label={`View ${service.title} service details`}
              >
                <Image
                  src={serviceImages[service.slug] || `/images/${service.slug}.webp`}
                  alt={serviceVisualAlts[service.slug]}
                  width={1200}
                  height={800}
                  sizes="(max-width: 760px) 100vw, 52vw"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <span className="directory-image-label">PIVILIS / {String(i + 1).padStart(2, "0")}</span>
              </a>
              <div className="directory-examples">
                <span className="eyebrow">A useful starting point</span>
                <h3>What this can help you do</h3>
                {service.featured.slice(0, 3).map((item, k) => (
                  <div className="directory-example" key={item.name}>
                    <span>0{k + 1}</span>
                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.plain}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="directory-all">
              <div className="directory-all-heading">
                <h3>All {count} capabilities</h3>
                <div className="directory-all-actions">
                  <a
                    href={`/services/${service.slug}`}
                    className="btn-animated-icon btn-animated-link"
                  >
                    <span className="btn-icon-text">All services</span>
                    <div className="btn-icon-badge" aria-hidden="true">
                      <ArrowUpRight size={14} />
                    </div>
                  </a>
                </div>
              </div>
              <ServiceDirectoryGroups
                groups={service.groups}
                serviceSlug={service.slug}
              />
            </div>
          </section>;
        })}
      </div>
    </div>
    </section>
    <ContactCTA title="Tell us what you want to change." description="You can come with one clear task or a problem you have not solved yet." />
  </main>;
}
