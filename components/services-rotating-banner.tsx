"use client";

import RotatingText from "@/components/RotatingText";

export function ServicesRotatingBanner() {
  return (
    <div className="services-statement-banner" aria-label="What we create">
      <div className="container services-statement-inner">
        <span className="services-statement-prefix">We create</span>
        <RotatingText
          texts={[
            "websites",
            "AI automations",
            "social content",
            "video production",
            "marketing ads",
            "custom software",
            "UI/UX design"
          ]}
          mainClassName="services-rotating-pill"
          staggerFrom="last"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-120%", opacity: 0 }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5"
          transition={{ type: "spring", damping: 28, stiffness: 350 }}
          rotationInterval={2400}
        />
      </div>
    </div>
  );
}
