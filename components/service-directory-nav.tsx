"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {services} from "@/lib/services";

export function ServiceDirectoryNav() {
  const router = useRouter();
  const [active, setActive] = useState(services[0].slug);
  useEffect(() => {
    const sections = services.map(service => document.getElementById(service.slug)).filter((el): el is HTMLElement => Boolean(el));
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, {rootMargin: "-12% 0px -68% 0px"});
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const handleScrollToService = (slug: string) => {
    if (active === slug) {
      router.push(`/services/${slug}`);
      return;
    }
    setActive(slug);
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return <nav className="directory-nav" aria-label="Jump to a service">
    <span className="directory-nav-label">Explore / 07 areas</span>
    <ol>{services.map((service, i) => <li key={service.slug}>
      <a
        href={`#${service.slug}`}
        className={active === service.slug ? "active" : ""}
        aria-current={active === service.slug ? "location" : undefined}
        onClick={(e) => {
          e.preventDefault();
          handleScrollToService(service.slug);
        }}
      >
        <span>{String(i + 1).padStart(2, "0")}</span>{service.title}
      </a>
    </li>)}</ol>
  </nav>;
}
