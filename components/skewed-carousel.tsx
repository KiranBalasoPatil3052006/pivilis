"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export interface CarouselCardItem {
  id: string;
  number: string;
  title: string;
  slug: string;
  image: string;
  alt: string;
}

export const defaultServiceCards: CarouselCardItem[] = [
  {
    id: "ai-automation",
    number: "01",
    title: "AI & Automation",
    slug: "ai-automation",
    image: "/images/cardmoving/ai.png",
    alt: "01 — AI & Automation service"
  },
  {
    id: "social-media",
    number: "02",
    title: "Social Media & Content",
    slug: "social-media-content",
    image: "/images/cardmoving/social.png",
    alt: "02 — Social Media & Content service"
  },
  {
    id: "video-production",
    number: "03",
    title: "Video Editing & Production",
    slug: "video-editing-production",
    image: "/images/cardmoving/video.png",
    alt: "03 — Video Editing & Production service"
  },
  {
    id: "marketing-advertising",
    number: "04",
    title: "Marketing & Advertising",
    slug: "marketing-advertising",
    image: "/images/cardmoving/marketing.png",
    alt: "04 — Marketing & Advertising service"
  },
  {
    id: "website-development",
    number: "05",
    title: "Website Development",
    slug: "website-development",
    image: "/images/cardmoving/webdev.png",
    alt: "05 — Website Development service"
  },
  {
    id: "custom-software",
    number: "06",
    title: "Custom Software Development",
    slug: "custom-software-development",
    image: "/images/cardmoving/software.png",
    alt: "06 — Custom Software Development service"
  },
  {
    id: "product-design",
    number: "07",
    title: "UI/UX & Product Design",
    slug: "ui-ux-product-design",
    image: "/images/cardmoving/design.png",
    alt: "07 — UI/UX & Product Design service"
  }
];

const SETTINGS = {
  transitionMs: 750,
  autoplayDelay: 2800,
  autoplayDirection: -1,
  copies: 5,
  visibleRadius: 4.4,
  dragThreshold: 0.16
};

export function SkewedCarousel({
  cards = defaultServiceCards,
  className = ""
}: {
  cards?: CarouselCardItem[];
  className?: string;
}) {
  const n = cards.length;
  const middleCopy = Math.floor(SETTINGS.copies / 2);

  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const positionRef = useRef<number>(middleCopy * n + 3);
  const displayPositionRef = useRef<number>(middleCopy * n + 3);
  const animatingRef = useRef<boolean>(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartPositionRef = useRef<number>(0);
  const dragPositionRef = useRef<number>(0);
  const hasMovedSignificantlyRef = useRef<boolean>(false);

  const [activeItemIndex, setActiveItemIndex] = useState<number>(() => ((middleCopy * n + 3) % n + n) % n);
  const [isPaused] = useState<boolean>(false);

  // Flattened virtual array of slides: 5 copies * n items
  const virtualSlides = React.useMemo(() => {
    const list: { virtualIndex: number; itemIndex: number; card: CarouselCardItem }[] = [];
    for (let copy = 0; copy < SETTINGS.copies; copy++) {
      cards.forEach((card, i) => {
        list.push({
          virtualIndex: copy * n + i,
          itemIndex: i,
          card
        });
      });
    }
    return list;
  }, [cards, n]);

  const mod = useCallback((v: number, m: number) => ((v % m) + m) % m, []);

  const measure = useCallback(() => {
    if (!carouselRef.current) {
      return { cardW: 250, step: 256, tilt: 64 };
    }
    const root = getComputedStyle(carouselRef.current);
    const cardW = parseFloat(root.getPropertyValue("--card-w")) || 250;
    const step = parseFloat(root.getPropertyValue("--step")) || 256;
    const tilt = parseFloat(root.getPropertyValue("--tilt")) || 64;
    return { cardW, step, tilt };
  }, []);

  const renderSlides = useCallback((pos: number) => {
    displayPositionRef.current = pos;
    const { step, tilt } = measure();

    virtualSlides.forEach(({ virtualIndex }, idx) => {
      const el = slideRefs.current[idx];
      if (!el) return;

      const d = virtualIndex - pos;
      const abs = Math.abs(d);

      if (abs > SETTINGS.visibleRadius) {
        el.style.opacity = "0";
        el.style.visibility = "hidden";
        el.dataset.active = "false";
        el.setAttribute("aria-hidden", "true");
        return;
      }

      el.style.visibility = "visible";

      // 3D rotation, scale, depth
      const rotation = abs < 1 ? -d * tilt : -Math.sign(d) * tilt;
      const scale = Math.max(0.79, 1 - abs * 0.058);
      const x = d * step;
      const z = -Math.min(abs, 4) * 34;
      const opacity = abs > 4 ? 0.28 : Math.max(0.58, 1 - abs * 0.075);
      const active = abs < 0.48;

      el.style.opacity = String(opacity);
      el.style.zIndex = String(200 - Math.round(abs * 12));
      el.style.filter = abs > 3 ? "brightness(.86) saturate(.88)" : abs > 1.5 ? "brightness(.93)" : "none";
      el.style.transform = `translate(-50%,-50%) translate3d(${x}px,0,${z}px) rotateY(${rotation}deg) scale(${scale})`;
      el.dataset.active = active ? "true" : "false";
      el.setAttribute("aria-hidden", active ? "false" : "true");
    });

    const active = mod(Math.round(pos), n);
    setActiveItemIndex(active);
  }, [virtualSlides, measure, mod, n]);

  const setNoTransition = useCallback((on: boolean) => {
    if (trackRef.current) {
      trackRef.current.classList.toggle("no-transition", on);
    }
  }, []);

  const canonicalizeIfNeeded = useCallback(() => {
    const low = n * 1.25;
    const high = n * (SETTINGS.copies - 1.25);
    let shifted = false;
    let next = positionRef.current;

    while (next < low) {
      next += n;
      shifted = true;
    }
    while (next > high) {
      next -= n;
      shifted = true;
    }

    if (!shifted) return;

    setNoTransition(true);
    positionRef.current = next;
    displayPositionRef.current = next;
    renderSlides(next);

    if (trackRef.current) {
      void trackRef.current.offsetWidth;
    }
    setNoTransition(false);
  }, [n, renderSlides, setNoTransition]);

  const restartAutoplayRef = useRef<() => void>(() => {});

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const moveTo = useCallback((target: number, userInitiated = false) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    positionRef.current = target;
    renderSlides(target);

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      animatingRef.current = false;
      canonicalizeIfNeeded();
      if (userInitiated && !isPaused) {
        restartAutoplayRef.current();
      }
    }, SETTINGS.transitionMs + 30);
  }, [canonicalizeIfNeeded, renderSlides, isPaused]);

  const step = useCallback((dir: number, userInitiated = false) => {
    moveTo(positionRef.current + dir, userInitiated);
  }, [moveTo]);

  const restartAutoplay = useCallback(() => {
    stopAutoplay();
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    autoplayTimerRef.current = setInterval(() => {
      if (!isDraggingRef.current && !animatingRef.current) {
        step(SETTINGS.autoplayDirection, false);
      }
    }, SETTINGS.autoplayDelay);
  }, [step, stopAutoplay]);

  useEffect(() => {
    restartAutoplayRef.current = restartAutoplay;
  }, [restartAutoplay]);

  const goToItem = useCallback((itemIndex: number) => {
    if (animatingRef.current) return;
    const current = mod(Math.round(displayPositionRef.current), n);
    let delta = itemIndex - current;
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;
    moveTo(positionRef.current + delta, true);
  }, [displayPositionRef, mod, moveTo, n]);

  // Pointer drag
  const handlePointerDown = (e: React.PointerEvent) => {
    if (animatingRef.current) return;
    isDraggingRef.current = true;
    hasMovedSignificantlyRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartPositionRef.current = positionRef.current;
    dragPositionRef.current = positionRef.current;

    trackRef.current?.classList.add("dragging");
    setNoTransition(true);
    stopAutoplay();

    try {
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 6) {
      hasMovedSignificantlyRef.current = true;
    }
    const { step: stepSize } = measure();
    dragPositionRef.current = dragStartPositionRef.current - dx / stepSize;
    renderSlides(dragPositionRef.current);
  };

  const finishDrag = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    trackRef.current?.classList.remove("dragging");
    setNoTransition(false);

    const delta = dragPositionRef.current - dragStartPositionRef.current;
    let target: number;
    if (Math.abs(delta) < SETTINGS.dragThreshold) {
      target = dragStartPositionRef.current;
    } else {
      target = Math.round(dragPositionRef.current);
      if (target === dragStartPositionRef.current) {
        target += Math.sign(delta);
      }
    }

    positionRef.current = dragStartPositionRef.current;
    displayPositionRef.current = dragPositionRef.current;
    requestAnimationFrame(() => moveTo(target, true));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1, true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1, true);
    }
  };

  // Wheel horizontal swipe
  const wheelLockedRef = useRef(false);
  const handleWheel = (e: React.WheelEvent) => {
    const dominant = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(dominant) < 12 || wheelLockedRef.current || isDraggingRef.current || animatingRef.current) {
      return;
    }
    wheelLockedRef.current = true;
    step(dominant > 0 ? 1 : -1, true);
    setTimeout(() => {
      wheelLockedRef.current = false;
    }, 480);
  };

  // Initial render and lifecycle
  useEffect(() => {
    renderSlides(positionRef.current);
    restartAutoplay();

    const handleResize = () => renderSlides(displayPositionRef.current);
    const handleVisibility = () => {
      if (document.hidden) stopAutoplay();
      else restartAutoplay();
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopAutoplay();
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [renderSlides, restartAutoplay, stopAutoplay]);

  const handleCardClick = (e: React.MouseEvent, itemIndex: number) => {
    if (hasMovedSignificantlyRef.current) {
      e.preventDefault();
      return;
    }
    const current = mod(Math.round(displayPositionRef.current), n);
    if (itemIndex !== current) {
      e.preventDefault();
      goToItem(itemIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`pivilis-skewed-carousel-frame ${className}`}
      onMouseEnter={stopAutoplay}
      onMouseLeave={() => !isPaused && restartAutoplay()}
      onFocusCapture={stopAutoplay}
      onBlurCapture={() => !isPaused && restartAutoplay()}
    >
      <div
        ref={carouselRef}
        className="pivilis-skewed-carousel"
        tabIndex={0}
        aria-label="Pivilis services 3D skewed carousel"
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
      >
        <div className="pivilis-viewport">
          <div
            ref={trackRef}
            className="pivilis-track"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
          >
            {virtualSlides.map(({ virtualIndex, itemIndex, card }, idx) => (
              <article
                key={`${card.id}-${virtualIndex}`}
                ref={(el) => {
                  slideRefs.current[idx] = el;
                }}
                className="pivilis-slide"
                data-virtual={virtualIndex}
                data-item={itemIndex}
                aria-hidden="true"
              >
                <Link
                  href={`/services/${card.slug}`}
                  className="pivilis-card"
                  onClick={(e) => handleCardClick(e, itemIndex)}
                  draggable={false}
                  aria-label={`${card.number} — ${card.title}`}
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={1086}
                    height={1448}
                    sizes="(max-width: 760px) 72vw, 360px"
                    draggable={false}
                    loading={idx < 14 ? "eager" : "lazy"}
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="pivilis-controls-wrapper">
          <div className="pivilis-meta-bar" aria-hidden="true">
            <span className="pivilis-meta-title">
              {cards[activeItemIndex]?.number} — {cards[activeItemIndex]?.title}
            </span>
          </div>

          <div className="pivilis-controls" aria-label="Carousel controls">
            <button
              type="button"
              className="pivilis-arrow"
              onClick={() => step(-1, true)}
              aria-label="Previous service"
            >
              ‹
            </button>

            <div className="pivilis-dots">
              {cards.map((card, i) => (
                <button
                  key={card.id}
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  type="button"
                  className="pivilis-dot"
                  aria-label={`Show ${card.title}`}
                  aria-current={i === activeItemIndex ? "true" : "false"}
                  onClick={() => goToItem(i)}
                />
              ))}
            </div>

            <button
              type="button"
              className="pivilis-arrow"
              onClick={() => step(1, true)}
              aria-label="Next service"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
