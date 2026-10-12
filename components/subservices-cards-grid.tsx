import Image from "next/image";
import Link from "next/link";
import { getSubservicesCards, SubserviceCardItem } from "@/lib/subservices-cards";

function CoralRightArrow({ className = "w-4 h-4 sm:w-5 sm:h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function SubservicesCardsGrid({
  serviceSlug,
  title,
  cards: customCards,
}: {
  serviceSlug: string;
  title?: string;
  cards?: SubserviceCardItem[];
}) {
  const cards = customCards || getSubservicesCards(serviceSlug);

  if (!cards || cards.length === 0) {
    return null;
  }

  // Choose responsive column layout based on number of items for balanced alignment
  const gridColsClass =
    cards.length === 8
      ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4"
      : cards.length === 9
      ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <section
      className="subservices-grid-section relative w-full py-8 sm:py-12 md:py-14 bg-[#fbf9f5]"
      data-nav-theme="light"
      aria-label={`${title || "Subservices"} capabilities`}
    >
      <div className="container">
        <div className={`grid ${gridColsClass} gap-3 sm:gap-4 md:gap-4.5 lg:gap-5 w-full`}>
          {cards.map((card) => (
            <Link
              key={card.id}
              href={`/services/${serviceSlug}/${card.slug}`}
              className="group relative flex flex-col justify-between bg-[#fdfbf7] hover:bg-white border border-[#eae5de] hover:border-[#dfd7cc] rounded-2xl sm:rounded-[20px] lg:rounded-[22px] p-3 sm:p-4 md:p-4.5 transition-all duration-300 hover:shadow-[0_14px_32px_-8px_rgba(0,0,0,0.06)] hover:-translate-y-1 overflow-hidden"
            >
              {/* Top 3D Claymorphic Artwork Area */}
              <div className="relative w-full aspect-[4/3] flex items-center justify-center mb-2 sm:mb-3 overflow-hidden rounded-xl bg-transparent">
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={1254}
                  height={1254}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                />
              </div>

              {/* Bottom Title and Coral Arrow */}
              <div className="mt-auto flex items-end justify-between gap-2 pt-2 border-t border-[#f0ebe3]/70">
                <h3 className="text-[13px] sm:text-[14px] lg:text-[15px] font-semibold text-[#181818] tracking-tight leading-[1.25] group-hover:text-black transition-colors">
                  {card.title}
                </h3>
                <span className="text-[#fa3822] shrink-0 mb-0.5" aria-hidden="true">
                  <CoralRightArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
