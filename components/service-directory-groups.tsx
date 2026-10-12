"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, ArrowUpRight } from "lucide-react";
import { toItemSlug } from "@/lib/capabilities";

export interface ServiceGroupItemData {
  title: string;
  description: string;
  items: string[];
}

export function ServiceDirectoryGroups({
  groups,
  serviceSlug,
}: {
  groups: ServiceGroupItemData[];
  serviceSlug: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setOpenIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(() => {
        if (pinnedIndex === null) {
          setOpenIndex(null);
        } else {
          setOpenIndex(pinnedIndex);
        }
      }, 180);
    }
  };

  const handleClick = (index: number) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (openIndex === index && pinnedIndex === index) {
      setOpenIndex(null);
      setPinnedIndex(null);
    } else {
      setOpenIndex(index);
      setPinnedIndex(index);
    }
  };

  return (
    <div className="directory-groups" onMouseLeave={handleMouseLeave}>
      {groups.map((group, i) => {
        const isOpen = openIndex === i;
        const panelId = `dir-panel-${serviceSlug}-${i}`;
        const triggerId = `dir-trigger-${serviceSlug}-${i}`;
        return (
          <div
            key={group.title}
            className="directory-group"
            data-open={isOpen ? "true" : "false"}
            onMouseEnter={() => handleMouseEnter(i)}
          >
            <button
              type="button"
              id={triggerId}
              className="directory-group-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => handleClick(i)}
            >
              <span className="directory-group-title">{group.title}</span>
              <span className="group-count">
                {String(group.items.length).padStart(2, "0")}
              </span>
              <Plus size={18} aria-hidden="true" />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="directory-group-panel-wrap"
              data-open={isOpen ? "true" : "false"}
              inert={!isOpen ? true : undefined}
            >
              <div className="directory-group-panel-inner">
                <div className="directory-group-content">
                  <p>{group.description}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>
                        <a
                          href={`/services/${serviceSlug}/${toItemSlug(item)}`}
                          className="directory-item-link"
                        >
                          <span className="directory-item-name">{item}</span>
                          <span
                            className="directory-item-arrow"
                            aria-hidden="true"
                          >
                            <ArrowUpRight size={15} />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ServiceCapabilityGroups({
  groups,
  serviceSlug,
}: {
  groups: ServiceGroupItemData[];
  serviceSlug: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(0);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setOpenIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(() => {
        setOpenIndex(pinnedIndex);
      }, 180);
    }
  };

  const handleClick = (index: number) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (openIndex === index && pinnedIndex === index) {
      setOpenIndex(null);
      setPinnedIndex(null);
    } else {
      setOpenIndex(index);
      setPinnedIndex(index);
    }
  };

  return (
    <div className="capabilities-accordion" onMouseLeave={handleMouseLeave}>
      {groups.map((group, i) => {
        const isOpen = openIndex === i;
        const panelId = `cap-panel-${serviceSlug}-${i}`;
        const triggerId = `cap-trigger-${serviceSlug}-${i}`;
        return (
          <div
            key={group.title}
            className="capability-group"
            data-open={isOpen ? "true" : "false"}
            onMouseEnter={() => handleMouseEnter(i)}
          >
            <button
              type="button"
              id={triggerId}
              className="capability-group-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => handleClick(i)}
            >
              <span>{group.title}</span>
              <Plus size={20} aria-hidden="true" />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="capability-group-panel-wrap"
              data-open={isOpen ? "true" : "false"}
              inert={!isOpen ? true : undefined}
            >
              <div className="capability-group-panel-inner">
                <div className="capability-group-panel-inner-content">
                  <p>{group.description}</p>
                  <div className="chip-list">
                    {group.items.map((item) => (
                      <a
                        href={`/services/${serviceSlug}/${toItemSlug(item)}`}
                        className="chip chip-clickable"
                        key={item}
                      >
                        <span>{item}</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    ))}
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
