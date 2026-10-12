"use client";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {ArrowUpRight, Plus} from "lucide-react";
import {services} from "@/lib/services";
import {toItemSlug} from "@/lib/capabilities";

const homeServiceIcons: Record<string, string> = {
  "ai-automation": "/images/home-icon/icon-ai.png",
  "social-media-content": "/images/home-icon/icon-social.png",
  "video-editing-production": "/images/home-icon/icon-video.png",
  "marketing-advertising": "/images/home-icon/icon-marketing.png",
  "website-development": "/images/home-icon/icon-website.png",
  "custom-software-development": "/images/home-icon/icon-software.png",
  "ui-ux-product-design": "/images/home-icon/icon-design.png",
};

export function ServiceAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="service-list">
      {services.map((service, i) => {
        const iconSrc = homeServiceIcons[service.slug] || `/images/${service.slug}.webp`;
        return (
          <div
            className="service-row"
            key={service.slug}
            onMouseEnter={() => {
              if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) setOpen(i);
            }}
          >
            <div
              className="service-trigger"
              data-open={open === i}
            >
              <Link
                href={`/services/${service.slug}`}
                id={`service-${i}`}
                className="service-trigger-link"
              >
                <span className="service-thumb">
                  <Image
                    src={iconSrc}
                    alt=""
                    width={52}
                    height={52}
                    sizes="52px"
                    loading="lazy"
                  />
                </span>
                <span className="service-title-stack">
                  <span className="service-name">{service.title}</span>
                  <span className="service-hint">{service.short}</span>
                </span>
              </Link>
              <button
                type="button"
                className="service-toggle-btn"
                aria-label={`Toggle ${service.title} preview`}
                aria-expanded={open === i}
                aria-controls={`service-panel-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <Plus aria-hidden="true" />
              </button>
            </div>
            <div
              id={`service-panel-${i}`}
              role="region"
              aria-labelledby={`service-${i}`}
              aria-hidden={open !== i}
              className="service-panel-wrap"
              data-open={open === i}
              inert={open !== i ? true : undefined}
            >
              <div className="service-panel-inner">
                <div className="service-panel">
                  <a
                    href={`/services/${service.slug}`}
                    className="accordion-image"
                    aria-label={`View ${service.title} service overview`}
                  >
                    <Image
                      src={`/images/${service.slug}.webp`}
                      alt=""
                      width={1200}
                      height={800}
                      sizes="(max-width: 760px) 100vw, 45vw"
                      loading="lazy"
                    />
                    <span className="image-index">P / {String(i + 1).padStart(2, "0")}</span>
                  </a>
                  <div className="accordion-copy">
                    <p className="accordion-benefit">{service.benefit}</p>
                    <div className="preview-grid">
                      {service.featured.map((item, k) => {
                        const subSlug = item.slug || toItemSlug(item.name);
                        return (
                          <a
                            href={`/services/${service.slug}/${subSlug}`}
                            className="preview-card"
                            key={item.name}
                            aria-label={`Explore ${item.name} details`}
                          >
                            <div className="preview-card-top">
                              <span className="preview-number">0{k + 1}</span>
                              <span className="preview-card-arrow" aria-hidden="true">
                                <ArrowUpRight size={14} />
                              </span>
                            </div>
                            <h3>{item.name}</h3>
                            <p>{item.plain}</p>
                          </a>
                        );
                      })}
                    </div>
                    <a
                      href={`/services/${service.slug}`}
                      className="panel-link panel-explore-btn"
                    >
                      <span>Explore {service.title}</span>
                      <ArrowUpRight aria-hidden="true" size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
