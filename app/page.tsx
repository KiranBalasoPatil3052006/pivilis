import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { HeroQAAnimation } from "@/components/hero-qa-animation";
import { ParticleWave } from "@/components/particle-wave";
import { ServiceAccordion } from "@/components/service-accordion";
import { ContactCTA } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Digital Services for Growing Businesses",
  description:
    "Practical digital support for growing businesses. We design, build, and manage content, advertising, automation, websites, and custom software.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pivilis — Digital Services for Growing Businesses",
    description:
      "Practical digital support for growing businesses. We design, build, and manage content, advertising, automation, websites, and custom software.",
    url: "/",
    siteName: "Pivilis",
    images: [
      {
        url: "/images/hero-about.webp",
        width: 1200,
        height: 630,
        alt: "Pivilis — Digital services for growing businesses",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pivilis — Digital Services for Growing Businesses",
    description:
      "Practical digital support for growing businesses. We design, build, and manage content, advertising, automation, websites, and custom software.",
    images: ["/images/hero-about.webp"],
  },
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What if I do not know which service I need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tell us what you are trying to change. We can help identify whether content, ads, a website, software or a combination is the right starting point.",
      },
    },
    {
      "@type": "Question",
      name: "Can we work together on just one thing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Bring us one focused project or talk through several connected needs.",
      },
    },
    {
      "@type": "Question",
      name: "Can you make a website or system for my exact business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We discuss how your business works and plan a solution around your requirements.",
      },
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeFaqSchema),
        }}
      />
      <section className="hero" data-nav-theme="light">
        <Image
          className="hero-background"
          src="/images/hero-about.webp"
          alt="Pivilis fluid warm curves visual"
          width={1916}
          height={821}
          sizes="100vw"
          preload
        />
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1 className="display">
              Your business
              <br />
              has more to show.
            </h1>
            <p className="lead">
              You know your business. We help more people discover it, choose it
              and stay connected—through content, ads, websites and smarter ways
              of working.
            </p>
            <div className="hero-actions">
              <a
                className="btn-animated-icon btn-animated-coral"
                href="/contact"
              >
                <span className="btn-icon-text">Tell us your goal</span>
                <div className="btn-icon-badge" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </div>
              </a>
              <a className="button button-hero-outline" href="#services">
                See how we help <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
          <HeroQAAnimation />
        </div>
      </section>

      <section className="home-intro" data-nav-theme="light">
        <div className="container home-intro-grid">
          <span className="eyebrow">One partner, many needs.</span>
          <p>
            One partner for every digital need.
            <br />
            <em>Bring us the whole picture.</em>
            <br />
            We’ll help you move forward.
          </p>
        </div>
      </section>

      <section
        className="section services-home"
        id="services"
        data-nav-theme="light"
      >
        <div className="container">
          <div className="section-top">
            <div>
              <span className="eyebrow">What we do / 01—07</span>
              <h2 className="heading">
                A clearer path
                <br />
                from idea to impact.
              </h2>
              <p className="lead">
                Choose an area to see what it can do for your business.
              </p>
            </div>
            <Link className="text-link" href="/services">
              Explore all services <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ServiceAccordion />
        </div>
      </section>

      <section className="section process-section" data-nav-theme="dark">
        <ParticleWave />
        <div className="container process-layout">
          <div className="process-intro">
            <span className="eyebrow">How it works</span>
            <h2 className="heading">
              Start with a conversation. Make a real plan.
            </h2>
            <p className="lead">
              No technical brief required. We work out the next step together.
            </p>
            <Link href="/contact" className="text-link">
              Let&apos;s talk <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="process-stack">
            <div className="process-step">
              <span className="number">01</span>
              <div>
                <h3>Tell us about your business</h3>
                <p>
                  What you sell, who you want to reach and what feels difficult
                  right now.
                </p>
              </div>
            </div>
            <div className="process-step">
              <span className="number">02</span>
              <div>
                <h3>Get a focused plan</h3>
                <p>
                  We suggest the content, campaign, website or system that
                  solves the actual problem.
                </p>
              </div>
            </div>
            <div className="process-step">
              <span className="number">03</span>
              <div>
                <h3>Build, learn and improve</h3>
                <p>
                  We create the work, look at what is helping and adjust with
                  you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section why-section" data-nav-theme="light">
        <div className="container why-layout">
          <div>
            <span className="eyebrow">Why Pivilis exists</span>
            <h2 className="heading">
              Good products deserve a fair chance to grow.
            </h2>
          </div>
          <div className="why-copy">
            <p>
              We built Pivilis for owners doing the hard work of running a
              business, especially people who have a great product but not a
              whole digital team behind them.
            </p>
            <p>
              From a first website to regular content, a better ad or a useful
              automation, we bring the pieces together around what your
              business needs.
            </p>
            <a className="text-link" href="/about">
              Our story <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="section faq-section" data-nav-theme="light">
        <div className="container faq-layout">
          <div>
            <span className="eyebrow">Good to know</span>
            <h2 className="heading">Simple answers.</h2>
          </div>
          <div>
            <details className="faq-item">
              <summary>
                What if I do not know which service I need?
                <Plus aria-hidden="true" />
              </summary>
              <p>
                Tell us what you are trying to change. We can help identify
                whether content, ads, a website, software or a combination is
                the right starting point.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                Can we work together on just one thing?
                <Plus aria-hidden="true" />
              </summary>
              <p>
                Yes. Bring us one focused project or talk through several
                connected needs.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                Can you make a website or system for my exact business?
                <Plus aria-hidden="true" />
              </summary>
              <p>
                Yes. We discuss how your business works and plan a solution
                around your requirements.
              </p>
            </details>
          </div>
        </div>
      </section>
      <ContactCTA
        title="Let's make your next move count."
        description="Tell us what you want to improve. We will start there."
      />
    </main>
  );
}
