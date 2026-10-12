"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { toItemSlug } from "@/lib/capabilities";
import "./services-mega-menu.css";

interface ServicesMegaMenuProps {
  isOpen: boolean;
  theme: "light" | "dark";
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onClose: () => void;
}

export function ServicesMegaMenu({
  isOpen,
  theme,
  onPointerEnter,
  onPointerLeave,
  onClose,
}: ServicesMegaMenuProps) {
  const router = useRouter();
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Reset to first service ("AI & Automation") whenever drawer opens
  useEffect(() => {
    if (isOpen) {
      queueMicrotask(() => {
        setActiveServiceIndex(0);
      });
    }
  }, [isOpen]);

  const activeService = services[activeServiceIndex] || services[0];
  const allSubservices = activeService.groups.flatMap((g) => g.items);

  // Balance into 2 or 3 columns based on item count
  const numColumns = allSubservices.length >= 18 ? 3 : 2;
  const itemsPerCol = Math.ceil(allSubservices.length / numColumns);
  const columns: string[][] = [];
  for (let c = 0; c < numColumns; c++) {
    const colItems = allSubservices.slice(c * itemsPerCol, (c + 1) * itemsPerCol);
    if (colItems.length > 0) {
      columns.push(colItems);
    }
  }

  const handleServiceHover = (index: number) => {
    if (index === activeServiceIndex) return;
    setIsTransitioning(true);
    setActiveServiceIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 60);
  };

  return (
    <div
      id="services-mega-drawer"
      role="region"
      aria-label="Services navigation menu"
      className={`pivilis-mega-drawer-wrapper ${isOpen ? "is-open" : ""}`}
      data-theme={theme}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className="pivilis-mega-drawer">
        {/* LEFT COLUMN: 7 Services List */}
        <div className="mega-left-col">
          <div className="mega-left-header">
            <span className="mega-left-header-dash" aria-hidden="true" />
            <span>SERVICES</span>
          </div>
          <ul className="mega-services-list">
            {services.map((service, index) => {
              const isActive = activeServiceIndex === index;
              const numStr = String(index + 1).padStart(2, "0");
              return (
                <li key={service.slug}>
                  <button
                    type="button"
                    className={`mega-service-item ${isActive ? "is-active" : ""}`}
                    onPointerEnter={() => handleServiceHover(index)}
                    onFocus={() => handleServiceHover(index)}
                    onClick={() => {
                      router.push(`/services/${service.slug}`);
                      onClose();
                    }}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="mega-service-left">
                      <span className="mega-service-num">{numStr}</span>
                      <span className="mega-service-title">{service.title}</span>
                    </span>
                    <ArrowRight
                      size={15}
                      className="mega-service-arrow"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT CONTENT AREA: Active Service Subservices & CTA */}
        <div className="mega-right-area">
          <div>
            {/* Top Active Service Header */}
            <div className="mega-right-header">
              <div className="mega-right-header-left">
                <div className="mega-active-title-stack">
                  <span className="mega-active-number">
                    {String(activeServiceIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mega-active-title">{activeService.title}</h3>
                </div>
                <p className="mega-active-desc">{activeService.short}</p>
              </div>
              <div className="mega-right-header-right">
                <span className="mega-explore-caps-label">
                  EXPLORE OUR CAPABILITIES
                </span>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="mega-header-divider" />

            {/* Subservices Columns */}
            <div
              className={`mega-subservices-container ${
                isTransitioning ? "is-transitioning" : ""
              }`}
            >
              <div className={`mega-subservices-grid cols-${columns.length}`}>
                {columns.map((col, colIdx) => (
                  <div key={colIdx} className="mega-subservice-col">
                    {col.map((item) => (
                      <Link
                        key={item}
                        href={`/services/${activeService.slug}/${toItemSlug(item)}`}
                        className="mega-subservice-row"
                        onClick={onClose}
                      >
                        <span className="mega-subservice-name">{item}</span>
                        <ArrowRight
                          size={13}
                          className="mega-subservice-arrow"
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Active Service CTA */}
          <Link
            href={`/services/${activeService.slug}`}
            className="mega-bottom-cta"
            onClick={onClose}
          >
            <span className="mega-bottom-cta-text">
              Explore {activeService.title}
            </span>
            <ArrowRight
              size={15}
              className="mega-bottom-cta-arrow"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
