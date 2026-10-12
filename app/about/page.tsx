import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactCTA } from "@/components/site-shell";
import { SkewedCarousel } from "@/components/skewed-carousel";
import { ParticleWave } from "@/components/particle-wave";
import BlurText from "@/components/BlurText";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pivilis.com";

const titleAnimationFrom = { opacity: 0, y: 18, filter: "blur(5px)" };
const titleAnimationTo = [{ opacity: 1, y: 0, filter: "blur(0px)" }];

export const metadata: Metadata = {
  title: "About Pivilis — Clear Digital Support for Businesses",
  description:
    "Learn why Pivilis started and how one team helps growing businesses with clear, connected digital services.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Pivilis — Clear Digital Support for Businesses",
    description:
      "Learn why Pivilis started and how one team helps growing businesses with clear, connected digital services.",
    url: "/about",
    siteName: "Pivilis",
    images: [
      {
        url: "/images/about-hero.png",
        width: 1200,
        height: 630,
        alt: "About Pivilis — Practical Digital Support",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pivilis — Clear Digital Support for Businesses",
    description:
      "Learn why Pivilis started and how one team helps growing businesses with clear, connected digital services.",
    images: ["/images/about-hero.png"],
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${siteUrl}/about#webpage`,
  url: `${siteUrl}/about`,
  name: "About Pivilis",
  description:
    "Pivilis helps growing businesses manage content, marketing, websites, software, design and automation with one clear, practical team.",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
  },
  about: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
  },
};

export default function About() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />
      <section className="about-hero" data-nav-theme="light">
        <div className="container about-hero-inner">
          <div className="about-hero-grid">
            <div className="about-hero-copy">
              <span className="eyebrow">01 — About Pivilis</span>
              <BlurText
                text="Everything your business needs. One Pivilis."
                as="h1"
                animateBy="words"
                delay={55}
                stepDuration={0.5}
                animationFrom={titleAnimationFrom}
                animationTo={titleAnimationTo}
                className="display about-animated-title"
              />
              <p className="lead">
                Content, marketing, websites, software, design and automation —
                all in one place.
              </p>
            </div>

            <div className="about-brand-stage" role="img" aria-label="Pivilis, where better begins">
              <div className="about-brand-motion">
                <span className="about-brand-rule about-brand-rule-left" aria-hidden="true" />
                <span className="about-brand-mark">
                  <Image
                    src="/images/pivilis-icon.png"
                    alt=""
                    width={112}
                    height={112}
                    sizes="112px"
                    preload
                  />
                </span>
                <span className="about-brand-rule about-brand-rule-right" aria-hidden="true" />
              </div>
              <span className="about-brand-caption">Where better begins</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-origin-section" data-nav-theme="light">
        <div className="container about-story about-section-grid">
          <div className="about-section-heading">
            <span className="eyebrow">02 — Why we started</span>
            <BlurText
              text="Digital work should be easier to manage."
              as="h2"
              animateBy="words"
              delay={55}
              stepDuration={0.5}
              animationFrom={titleAnimationFrom}
              animationTo={titleAnimationTo}
              className="heading about-section-title about-animated-title"
            />
          </div>
          <div className="about-section-copy">
            <p>
              Many business owners have good products, services and ideas, but
              handling content, ads, websites, software, design and automation
              with different people can become difficult.
            </p>
            <p>
              <strong>Pivilis was started to bring all of that together</strong> —
              one team, one clear direction and less confusion.
            </p>
          </div>
        </div>
      </section>

      <section className="skewed-carousel-section" data-nav-theme="light" aria-label="Our services and capabilities">
        <div className="container">
          <div className="skewed-carousel-head about-section-grid">
            <div className="about-section-heading">
              <span className="eyebrow">03 — What we do</span>
              <BlurText
                text="We help businesses move forward."
                as="h2"
                animateBy="words"
                delay={55}
                stepDuration={0.5}
                animationFrom={titleAnimationFrom}
                animationTo={titleAnimationTo}
                className="heading about-section-title about-animated-title"
              />
            </div>
            <p className="lead about-section-copy about-services-copy">
              From content and ads to websites, software, design and automation —
              we handle the work together.
            </p>
          </div>
        </div>
        <SkewedCarousel />
      </section>

      <section className="section process-section" data-nav-theme="dark">
        <ParticleWave />
        <div className="container process-layout">
          <div className="process-intro">
            <span className="eyebrow">04 — How we work</span>
            <BlurText
              text="You tell us what needs to improve."
              as="h2"
              animateBy="words"
              delay={55}
              stepDuration={0.5}
              animationFrom={titleAnimationFrom}
              animationTo={titleAnimationTo}
              className="heading about-process-title about-animated-title"
            />
            <p className="lead about-process-lead">
              We understand the problem, choose the right solution and take care
              of the work.
            </p>
            <Link className="text-link" href="/services" style={{ marginTop: 24 }}>
              Explore our services <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="process-stack">
            <div className="process-step">
              <span className="number">01</span>
              <div>
                <h3>Understand the problem</h3>
                <p>
                  We listen to what is working, what is difficult and what needs
                  to change.
                </p>
              </div>
            </div>
            <div className="process-step">
              <span className="number">02</span>
              <div>
                <h3>Choose the right solution</h3>
                <p>
                  We select the services that fit the problem and explain the
                  plan clearly.
                </p>
              </div>
            </div>
            <div className="process-step">
              <span className="number">03</span>
              <div>
                <h3>Take care of the work</h3>
                <p>
                  We complete the work, keep the parts connected and improve
                  them when needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft-band about-focus-section" data-nav-theme="light">
        <div className="container about-focus">
          <div>
            <span className="eyebrow">05 — Our focus</span>
            <BlurText
              text="Make business simpler."
              as="h2"
              animateBy="words"
              delay={55}
              stepDuration={0.5}
              animationFrom={titleAnimationFrom}
              animationTo={titleAnimationTo}
              className="heading about-section-title about-animated-title"
            />
          </div>
          <p>
            Clear work, useful solutions and everything connected.
          </p>
        </div>
      </section>

      <ContactCTA
        title="Tell us what your business needs next."
        description="We will listen, explain the options clearly and help you choose a practical next step."
      />
    </main>
  );
}
