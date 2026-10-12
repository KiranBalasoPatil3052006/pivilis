"use client";

import RotatingText from "@/components/RotatingText";
import BlurText from "@/components/BlurText";

interface ServicesHeroHeaderProps {
  title?: string;
  prefix?: string;
  services?: string[];
}

export function ServicesHeroHeader({
  title = "Where better begins",
  prefix = "We create",
  services = [
    "websites",
    "AI automations",
    "social content",
    "video production",
    "ad campaigns",
    "custom software",
    "UI/UX design"
  ]
}: ServicesHeroHeaderProps) {
  return (
    <div className="directory-hero-heading-group">
      <BlurText
        text={title}
        delay={150}
        animateBy="words"
        direction="top"
        className="display directory-hero-title"
        as="h1"
      />
      <div className="directory-rotating-line">
        <span className="directory-rotating-prefix">{prefix}</span>
        <RotatingText
          texts={services}
          mainClassName="directory-rotating-pill px-3 sm:px-4 py-0.5 sm:py-1 rounded-lg overflow-hidden justify-center items-center inline-flex"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2200}
        />
      </div>
    </div>
  );
}
