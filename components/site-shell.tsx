"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {ArrowUpRight, ArrowRight, ArrowUp, Mail} from "lucide-react";

const Orb = dynamic(() => import("./Orb"), { ssr: false });
const Aurora = dynamic(() => import("./Aurora"), { ssr: false });

export { Navbar as Header } from "./navbar";

function DeferredVisual({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setIsNearViewport(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      {isNearViewport ? children : null}
    </div>
  );
}


export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="site-footer" data-nav-theme="dark">
      {/* Background Watermark Logo with light glow */}
      <div className="footer-watermark-wrapper" aria-hidden="true">
        <Image
          src="/images/pivilis-icon.webp"
          alt=""
          className="footer-watermark-icon"
          width={1304}
          height={1206}
          sizes="50vw"
        />
      </div>

      <div className="container footer-container">
        {/* Top 4-Column Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Status */}
          <div className="footer-col footer-col-brand">
            {/* Social Media Links in Orange Color in place of the logo */}
            <div className="footer-social-row">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="X (formerly Twitter)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.3-.019-.462.132-.612.135-.135.301-.351.451-.527.15-.175.2-.3.301-.501.101-.2.05-.376-.025-.526-.075-.15-.677-1.633-.928-2.235-.244-.587-.492-.507-.677-.517-.175-.01-.376-.01-.576-.01-.2 0-.527.075-.803.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.278.496 1.716.635.722.23 1.38.197 1.9.12.58-.087 1.78-.727 2.03-1.43.25-.703.25-1.305.176-1.43-.075-.126-.276-.201-.577-.351zM12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.96.568 3.79 1.554 5.34L2 22l4.82-1.52c1.49.88 3.22 1.39 5.22 1.39 5.53 0 10.02-4.49 10.02-10.02C22.06 6.49 17.57 2 12.04 2zm0 18.25c-1.75 0-3.37-.5-4.75-1.37l-.34-.21-2.87.91.93-2.79-.23-.37A8.204 8.204 0 0 1 3.84 12.02c0-4.52 3.68-8.2 8.2-8.2 4.52 0 8.2 3.68 8.2 8.2 0 4.52-3.68 8.25-8.2 8.25z"/>
                </svg>
              </a>
            </div>

            <p className="footer-description">
              One practical partner for the digital side of your business. We design, build, and automate around how your team actually works.
            </p>

            <a href="mailto:Pivilisofficial@gmail.com" className="footer-contact-pill">
              <Mail size={15} aria-hidden="true" />
              <span>Pivilisofficial@gmail.com</span>
              <ArrowUpRight size={13} className="footer-pill-arrow" aria-hidden="true" />
            </a>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col footer-col-links">
            <h2 className="footer-heading">Navigation</h2>
            <ul className="footer-nav-list">
              <li>
                <Link href="/">
                  <span>Home</span>
                  <ArrowRight size={13} className="footer-link-arrow" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span>Services</span>
                  <ArrowRight size={13} className="footer-link-arrow" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span>About</span>
                  <ArrowRight size={13} className="footer-link-arrow" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span>Contact</span>
                  <ArrowRight size={13} className="footer-link-arrow" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div className="footer-col footer-col-services">
            <h2 className="footer-heading">Service Areas</h2>
            <ul className="footer-nav-list">
              <li>
                <Link href="/services/ai-automation">
                  <span>AI & Automation</span>
                  <ArrowRight size={13} className="footer-link-arrow" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/services/video-editing-production">
                  <span>Video & Content</span>
                  <ArrowRight size={13} className="footer-link-arrow" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/services/custom-software-development">
                  <span>Custom Software</span>
                  <ArrowRight size={13} className="footer-link-arrow" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/services/marketing-advertising">
                  <span>Marketing & Growth</span>
                  <ArrowRight size={13} className="footer-link-arrow" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/services/website-development">
                  <span>Website Development</span>
                  <ArrowRight size={13} className="footer-link-arrow" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/services/ui-ux-product-design">
                  <span>UI/UX & Product Design</span>
                  <ArrowRight size={13} className="footer-link-arrow" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Action & Connect */}
          <div className="footer-col footer-col-action">
            <h2 className="footer-heading">Start a Project</h2>
            <p className="footer-action-text">
              Have an upcoming build, content idea, or automation need? Let&apos;s talk through your goals.
            </p>
            <Link
              className="btn-animated-icon btn-animated-coral footer-action-btn"
              href="/contact"
            >
              <span className="btn-icon-text">Start a conversation</span>
              <div className="btn-icon-badge" aria-hidden="true">
                <ArrowUpRight size={16} />
              </div>
            </Link>
          </div>
        </div>

        {/* Big Stylized Wordmark Backdrop Graphic */}
        <div className="footer-massive-brand" aria-hidden="true">
          <Image
            src="/images/pivilis-wordmark-light.webp"
            alt=""
            className="footer-massive-logo"
            width={511}
            height={178}
            sizes="(max-width: 760px) 100vw, 760px"
          />
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            <span>© {new Date().getFullYear()} Pivilis. All rights reserved.</span>
            <span className="footer-motto">Built around better business experiences.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-scroll-top"
            aria-label="Back to top"
          >
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Moving Aurora Wave Gradient at the end of the footer */}
      <DeferredVisual className="footer-aurora-wrapper">
        <Aurora
          colorStops={["#FF4A32", "#FFA090", "#f26950"]}
          blend={0.5}
          amplitude={1.1}
          speed={0.5}
          direction="bottom"
        />
      </DeferredVisual>
    </footer>
  );
}

export function ContactCTA({
  title = "Let’s make the next step simpler.",
  description = "Tell us where your business is now and what you need help with."
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="cta-section" data-nav-theme="light">
      <DeferredVisual className="cta-orb-corner">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
          whiteOnly={true}
        />
      </DeferredVisual>
      <div className="container cta-inner">
        <div>
          <span className="eyebrow">Let&apos;s talk</span>
          <h2 className="heading">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <Link className="btn-animated-icon btn-animated-dark" href="/contact">
          <span className="btn-icon-text">Start a conversation</span>
          <div className="btn-icon-badge" aria-hidden="true">
            <ArrowUpRight size={16} />
          </div>
        </Link>
      </div>
    </section>
  );
}
