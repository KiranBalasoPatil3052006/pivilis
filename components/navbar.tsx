"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowUpRight, ArrowRight, ChevronDown, Menu, Plus, X } from "lucide-react";
import { ServicesMegaMenu } from "./services-mega-menu";
import { services } from "@/lib/services";
import { toItemSlug } from "@/lib/capabilities";
import "./navbar.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileExpandedService, setMobileExpandedService] = useState<string | null>(null);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileOpenRef = useRef(mobileOpen);
  const megaTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Keep mobileOpenRef synced for non-reactive scroll callbacks
  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const openMega = useCallback(() => {
    if (megaTimerRef.current) {
      clearTimeout(megaTimerRef.current);
      megaTimerRef.current = null;
    }
    setIsMegaOpen(true);
  }, []);

  const closeMega = useCallback(() => {
    if (megaTimerRef.current) {
      clearTimeout(megaTimerRef.current);
    }
    // 190ms forgiving delay before closing drawer to prevent flickering
    megaTimerRef.current = setTimeout(() => {
      setIsMegaOpen(false);
    }, 190);
  }, []);

  const immediateCloseMega = useCallback(() => {
    if (megaTimerRef.current) {
      clearTimeout(megaTimerRef.current);
      megaTimerRef.current = null;
    }
    setIsMegaOpen(false);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (megaTimerRef.current) {
        clearTimeout(megaTimerRef.current);
      }
    };
  }, []);

  // Close menus on page route changes
  useEffect(() => {
    queueMicrotask(() => {
      setIsMegaOpen(false);
      setMobileOpen(false);
    });
  }, [pathname]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    const pageContent = document.querySelectorAll<HTMLElement>(
      "body > main, body > footer"
    );
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      pageContent.forEach(element => {
        element.inert = true;
      });
    } else {
      document.body.style.overflow = "";
      pageContent.forEach(element => {
        element.inert = false;
      });
    }
    return () => {
      document.body.style.overflow = "";
      pageContent.forEach(element => {
        element.inert = false;
      });
    };
  }, [mobileOpen]);

  // Close menus on Escape key press
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        immediateCloseMega();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [immediateCloseMega]);

  // Section-aware color theme detection & scroll state handling
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const evaluateNavbarState = () => {
      // 1. FREEZE theme if mobile menu is currently open
      if (mobileOpenRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrolled = scrollY > 16;
      const scrolledStr = scrolled ? "true" : "false";

      if (header.dataset.scrolled !== scrolledStr) {
        header.dataset.scrolled = scrolledStr;
      }
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

      // Navbar test point (middle of the navbar floating bar)
      const navRect = header.getBoundingClientRect();
      const testY = Math.max(38, Math.min(navRect.bottom, 50));
      const testX = window.innerWidth / 2;

      let detectedTheme: string | null = null;

      // Method A: Check element physically located under navbar test point
      if (typeof document.elementsFromPoint === "function") {
        try {
          const elements = document.elementsFromPoint(testX, testY);
          for (const el of elements) {
            // Ignore the navbar itself and any backdrops
            if (header.contains(el) || el.classList.contains("pivilis-mobile-backdrop")) {
              continue;
            }
            const themedEl = el.closest<HTMLElement>("[data-nav-theme]");
            if (themedEl) {
              detectedTheme = themedEl.getAttribute("data-nav-theme");
              break;
            }
          }
        } catch {
          // Ignore any hit test error
        }
      }

      // Method B: Coordinate bounding check against all declared sections
      if (!detectedTheme) {
        const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"));
        for (const sec of sections) {
          const r = sec.getBoundingClientRect();
          if (r.top <= testY && r.bottom > testY) {
            detectedTheme = sec.getAttribute("data-nav-theme");
            break;
          }
        }
      }

      // Check if user is scrolled near the bottom of the document and footer is dominant
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      if (winHeight + scrollY >= docHeight - 80) {
        const footer = document.querySelector<HTMLElement>("footer.site-footer[data-nav-theme]");
        if (footer) {
          const fRect = footer.getBoundingClientRect();
          if (fRect.top < winHeight * 0.55) {
            detectedTheme = footer.getAttribute("data-nav-theme");
          }
        }
      }

      // Fallback: If at very top of page and nothing matched yet, check the first section
      if (!detectedTheme && scrollY < 80) {
        const firstSec = document.querySelector<HTMLElement>("[data-nav-theme]");
        if (firstSec) {
          detectedTheme = firstSec.getAttribute("data-nav-theme");
        }
      }

      // Final theme fallback is 'light'
      const targetTheme: "light" | "dark" = detectedTheme === "dark" ? "dark" : "light";
      if (header.dataset.theme !== targetTheme) {
        header.dataset.theme = targetTheme;
      }
      setTheme((prev) => (prev !== targetTheme ? targetTheme : prev));
    };

    let ticking = false;
    const onScrollOrResize = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          evaluateNavbarState();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    // Initial check and slight delayed re-checks for late-rendering components
    evaluateNavbarState();
    const t1 = setTimeout(evaluateNavbarState, 60);
    const t2 = setTimeout(evaluateNavbarState, 250);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      ref={headerRef}
      className="site-header pivilis-nav-container"
      data-theme={theme}
      data-scrolled={isScrolled ? "true" : "false"}
    >
      <div className="pivilis-navbar">
        {/* LEFT: Pivilis Brand Logo */}
        <Link
          href="/"
          className="nav-brand-wrap"
          aria-label="Pivilis home"
          onClick={closeMobile}
        >
          <div className="brand-logo-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pivilis-wordmark-transparent.png"
              alt="Pivilis"
              className="brand-logo-img logo-light-state"
              width={135}
              height={47}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pivilis-wordmark-light.png"
              alt="Pivilis"
              className="brand-logo-img logo-dark-state"
              width={135}
              height={47}
            />
          </div>
        </Link>

        {/* CENTER: Desktop Primary Navigation */}
        <nav
          id="desktop-primary-nav"
          aria-label="Primary navigation"
          className="nav-center-desktop"
        >
          <ul className="nav-links-row">
            {navLinks.map((item) => {
              const active = isLinkActive(item.href);
              const isServices = item.label === "Services";
              const isMegaActive = isServices && isMegaOpen;

              return (
                <li
                  key={item.href}
                  onPointerEnter={isServices ? openMega : closeMega}
                >
                  <Link
                    href={item.href}
                    className={`nav-link-item ${active || isMegaActive ? "is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={isServices ? isMegaOpen : undefined}
                    aria-controls={isServices ? "services-mega-drawer" : undefined}
                    onPointerEnter={isServices ? openMega : undefined}
                    onPointerLeave={isServices ? closeMega : undefined}
                    onFocus={isServices ? openMega : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* RIGHT: Desktop CTA Button */}
        <div className="nav-right-desktop" onPointerEnter={closeMega}>
          <Link href="/contact" className="pivilis-cta-button">
            <span>Start a project</span>
            <ArrowUpRight size={15} className="cta-arrow-icon" aria-hidden="true" />
          </Link>
        </div>

        {/* MOBILE MENU TRIGGER BUTTON */}
        <button
          type="button"
          className="pivilis-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-dropdown"
        >
          <span className="toggle-icon-box">
            {mobileOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </span>
        </button>

        {/* MOBILE MENU DROPDOWN PANEL */}
        <div
          id="mobile-nav-dropdown"
          className={`pivilis-mobile-dropdown ${mobileOpen ? "is-open" : ""}`}
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal="true"
          aria-hidden={!mobileOpen}
        >
          <div className="mobile-dropdown-inner">
            <ul className="mobile-nav-items">
              {navLinks.map((item) => {
                const active = isLinkActive(item.href);
                const isServices = item.label === "Services";

                if (isServices) {
                  return (
                    <li key={item.href} className="mobile-nav-item-services">
                      <div className={`mobile-services-row-wrap ${active ? "is-active" : ""}`}>
                        {/* Direct Clickable Link to /services */}
                        <Link
                          href="/services"
                          className={`mobile-nav-link-item mobile-services-direct-link ${active ? "is-active" : ""}`}
                          onClick={closeMobile}
                          aria-current={active ? "page" : undefined}
                        >
                          <span className="mobile-services-toggle-label">
                            <span>{item.label}</span>
                            <span className="mobile-services-badge">07</span>
                          </span>
                        </Link>

                        {/* Chevron button to toggle subservices */}
                        <button
                          type="button"
                          className={`mobile-services-chevron-btn ${mobileServicesOpen ? "is-open" : ""}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setMobileServicesOpen(!mobileServicesOpen);
                          }}
                          aria-label={mobileServicesOpen ? "Collapse services list" : "Expand services list"}
                          aria-expanded={mobileServicesOpen}
                          aria-controls="mobile-services-accordion"
                        >
                          <ChevronDown
                            size={18}
                            className={`mobile-services-chevron ${mobileServicesOpen ? "is-open" : ""}`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      {/* SERVICES OPTIONS ACCORDION PANEL */}
                      <div
                        id="mobile-services-accordion"
                        className={`mobile-subservices-drawer ${mobileServicesOpen ? "is-open" : ""}`}
                        aria-hidden={!mobileServicesOpen}
                      >
                        <div className="mobile-subservices-inner">
                          <div className="mobile-subservices-eyebrow">
                            <span className="eyebrow-dash" />
                            <span>SERVICES / 01—07</span>
                          </div>

                          <ul className="mobile-subservices-list">
                            {services.map((service, idx) => {
                              const numStr = String(idx + 1).padStart(2, "0");
                              const isServiceActive =
                                pathname === `/services/${service.slug}` ||
                                pathname.startsWith(`/services/${service.slug}/`);
                              const isSubExpanded = mobileExpandedService === service.slug;

                              return (
                                <li
                                  key={service.slug}
                                  className={`mobile-subservice-row ${isServiceActive ? "is-active" : ""}`}
                                >
                                  <div className="mobile-subservice-main">
                                    <Link
                                      href={`/services/${service.slug}`}
                                      className="mobile-subservice-link"
                                      onClick={closeMobile}
                                    >
                                      <span className="mobile-subservice-num">{numStr}</span>
                                      <span className="mobile-subservice-title">{service.title}</span>
                                    </Link>

                                    <div className="mobile-subservice-actions">
                                      {service.featured && service.featured.length > 0 && (
                                        <button
                                          type="button"
                                          className={`mobile-subservice-expand-btn ${isSubExpanded ? "is-expanded" : ""}`}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setMobileExpandedService(isSubExpanded ? null : service.slug);
                                          }}
                                          aria-label={`Toggle ${service.title} options`}
                                          aria-expanded={isSubExpanded}
                                        >
                                          <Plus
                                            size={13}
                                            className="subservice-expand-icon"
                                            aria-hidden="true"
                                          />
                                        </button>
                                      )}
                                      <Link
                                        href={`/services/${service.slug}`}
                                        className="mobile-subservice-arrow-btn"
                                        aria-label={`Go to ${service.title}`}
                                        onClick={closeMobile}
                                      >
                                        <ArrowUpRight size={14} aria-hidden="true" />
                                      </Link>
                                    </div>
                                  </div>

                                  {/* NESTED CAPABILITY OPTIONS */}
                                  {isSubExpanded && service.featured && (
                                    <ul className="mobile-nested-options-list">
                                      {service.featured.map((feat) => {
                                        const subSlug = feat.slug || toItemSlug(feat.name);
                                        const featHref = `/services/${service.slug}/${subSlug}`;
                                        const isFeatActive = pathname === featHref;

                                        return (
                                          <li key={feat.name}>
                                            <Link
                                              href={featHref}
                                              className={`mobile-nested-option-item ${isFeatActive ? "is-active" : ""}`}
                                              onClick={closeMobile}
                                            >
                                              <span className="nested-bullet" />
                                              <span className="nested-name">{feat.name}</span>
                                              <ArrowRight
                                                size={12}
                                                className="nested-arrow"
                                                aria-hidden="true"
                                              />
                                            </Link>
                                          </li>
                                        );
                                      })}
                                      <li>
                                        <Link
                                          href={`/services/${service.slug}`}
                                          className="mobile-nested-all-link"
                                          onClick={closeMobile}
                                        >
                                          <span>Explore {service.title} overview</span>
                                          <ArrowUpRight size={13} aria-hidden="true" />
                                        </Link>
                                      </li>
                                    </ul>
                                  )}
                                </li>
                              );
                            })}
                          </ul>

                          <div className="mobile-subservices-footer">
                            <Link
                              href="/services"
                              className="mobile-all-services-link"
                              onClick={closeMobile}
                            >
                              <span>Explore all 07 disciplines</span>
                              <ArrowRight size={14} aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`mobile-nav-link-item ${active ? "is-active" : ""}`}
                      aria-current={active ? "page" : undefined}
                      onClick={closeMobile}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight
                        size={16}
                        className="mobile-nav-arrow"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mobile-cta-container">
              <Link
                href="/contact"
                className="pivilis-cta-button pivilis-mobile-cta"
                onClick={closeMobile}
              >
                <span>Start a project</span>
                <ArrowUpRight size={16} className="cta-arrow-icon" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP MEGA-MENU DRAWER */}
      <ServicesMegaMenu
        isOpen={isMegaOpen}
        theme={theme}
        onPointerEnter={openMega}
        onPointerLeave={closeMega}
        onClose={immediateCloseMega}
      />

      {/* MOBILE BACKDROP OVERLAY */}
      {mobileOpen && (
        <div
          className="pivilis-mobile-backdrop"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
