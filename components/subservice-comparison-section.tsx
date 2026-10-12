"use client";

import React, { useState } from "react";
import {
  X,
  Check,
  XCircle,
  CheckCircle2,
  Clock,
  Zap,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  FileX,
  Moon,
  Layers,
} from "lucide-react";



interface SubserviceComparisonSectionProps {
  before: { problem: string; detail: string }[];
  after: { solution: string; detail: string }[];
}

function getProblemIcon(text: string, index: number) {
  const lower = text.toLowerCase();
  if (lower.includes("slow") || lower.includes("wait") || lower.includes("delay") || lower.includes("hour")) {
    return <Clock size={15} aria-hidden="true" />;
  }
  if (lower.includes("miss") || lower.includes("night") || lower.includes("late") || lower.includes("lost")) {
    return <Moon size={15} aria-hidden="true" />;
  }
  if (lower.includes("type") || lower.includes("repeat") || lower.includes("manual") || lower.includes("entry")) {
    return <FileX size={15} aria-hidden="true" />;
  }
  if (lower.includes("scatter") || lower.includes("tool") || lower.includes("stack")) {
    return <Layers size={15} aria-hidden="true" />;
  }
  if (index === 0) return <Clock size={15} aria-hidden="true" />;
  if (index === 1) return <AlertCircle size={15} aria-hidden="true" />;
  return <XCircle size={15} aria-hidden="true" />;
}

function getSolutionIcon(text: string, index: number) {
  const lower = text.toLowerCase();
  if (lower.includes("instant") || lower.includes("fast") || lower.includes("speed") || lower.includes("live") || lower.includes("quick")) {
    return <Zap size={15} aria-hidden="true" />;
  }
  if (lower.includes("convert") || lower.includes("lead") || lower.includes("sales") || lower.includes("grow") || lower.includes("more")) {
    return <TrendingUp size={15} aria-hidden="true" />;
  }
  if (lower.includes("save") || lower.includes("time") || lower.includes("routin") || lower.includes("auto")) {
    return <Sparkles size={15} aria-hidden="true" />;
  }
  if (lower.includes("clear") || lower.includes("track") || lower.includes("reliab") || lower.includes("protect") || lower.includes("safe")) {
    return <ShieldCheck size={15} aria-hidden="true" />;
  }
  if (index === 0) return <Zap size={15} aria-hidden="true" />;
  if (index === 1) return <Sparkles size={15} aria-hidden="true" />;
  return <CheckCircle2 size={15} aria-hidden="true" />;
}

export function SubserviceComparisonSection({
  before,
  after,
}: SubserviceComparisonSectionProps) {
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");
  const [animKey, setAnimKey] = useState<number>(0);

  const handleTabChange = (tab: "before" | "after") => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setAnimKey((prev) => prev + 1);
    }
  };

  return (
    <>
      {/* DESKTOP & TABLET VIEW: Unchanged 2-column comparison grid */}
      <div className="comparison-grid comparison-desktop-only">
        {/* The Old Way */}
        <div className="comparison-col comparison-before">
          <div className="comparison-head">
            <span className="comparison-pill before-pill">
              <XCircle size={16} aria-hidden="true" /> Without this service
            </span>
            <h3>The daily friction</h3>
          </div>
          <ul className="comparison-list">
            {before.map((b) => (
              <li key={b.problem}>
                <strong>{b.problem}</strong>
                <p>{b.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* With Pivilis */}
        <div className="comparison-col comparison-after">
          <div className="comparison-head">
            <span className="comparison-pill after-pill">
              <CheckCircle2 size={16} aria-hidden="true" /> With this service
            </span>
            <h3>How your day changes</h3>
          </div>
          <ul className="comparison-list">
            {after.map((a) => (
              <li key={a.solution}>
                <strong>{a.solution}</strong>
                <p>{a.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* MOBILE ONLY VIEW: Compact interactive single card with smooth segmented toggle */}
      <div className="comparison-mobile-only">
        <div className="mobile-cmp-card">
          {/* Segmented Control Header */}
          <div
            className="mobile-cmp-toggle-track"
            role="tablist"
            aria-label="Comparison toggle"
          >
            <div
              className={`mobile-cmp-slider ${
                activeTab === "after" ? "is-after" : "is-before"
              }`}
              aria-hidden="true"
            />
            <button
              type="button"
              role="tab"
              id="tab-without-service"
              aria-selected={activeTab === "before"}
              aria-controls="panel-comparison-content"
              className={`mobile-cmp-tab-btn ${
                activeTab === "before" ? "is-active is-before" : ""
              }`}
              onClick={() => handleTabChange("before")}
            >
              <span className="mobile-cmp-tab-icon" aria-hidden="true">
                <X size={13} strokeWidth={2.6} />
              </span>
              <span className="mobile-cmp-tab-label">Without this service</span>
            </button>
            <button
              type="button"
              role="tab"
              id="tab-with-service"
              aria-selected={activeTab === "after"}
              aria-controls="panel-comparison-content"
              className={`mobile-cmp-tab-btn ${
                activeTab === "after" ? "is-active is-after" : ""
              }`}
              onClick={() => handleTabChange("after")}
            >
              <span className="mobile-cmp-tab-icon" aria-hidden="true">
                <Check size={13} strokeWidth={2.6} />
              </span>
              <span className="mobile-cmp-tab-label">With this service</span>
            </button>
          </div>

          {/* Card Content with Smooth Fade and Shift Animation */}
          <div
            id="panel-comparison-content"
            role="tabpanel"
            aria-labelledby={
              activeTab === "before"
                ? "tab-without-service"
                : "tab-with-service"
            }
            key={animKey}
            className="mobile-cmp-body-anim"
          >
            <div className="mobile-cmp-heading-wrap">
              <h3 className="mobile-cmp-heading">
                {activeTab === "before"
                  ? "The daily friction"
                  : "How your day changes"}
              </h3>
            </div>

            <ul className="mobile-cmp-items-list">
              {activeTab === "before"
                ? before.map((item, idx) => (
                    <li key={item.problem} className="mobile-cmp-item-row">
                      <div
                        className="mobile-cmp-icon-badge problem-tint"
                        aria-hidden="true"
                      >
                        {getProblemIcon(item.problem, idx)}
                      </div>
                      <div className="mobile-cmp-item-text">
                        <strong className="mobile-cmp-item-title">
                          {item.problem}
                        </strong>
                        <p className="mobile-cmp-item-desc">{item.detail}</p>
                      </div>
                    </li>
                  ))
                : after.map((item, idx) => (
                    <li key={item.solution} className="mobile-cmp-item-row">
                      <div
                        className="mobile-cmp-icon-badge benefit-tint"
                        aria-hidden="true"
                      >
                        {getSolutionIcon(item.solution, idx)}
                      </div>
                      <div className="mobile-cmp-item-text">
                        <strong className="mobile-cmp-item-title">
                          {item.solution}
                        </strong>
                        <p className="mobile-cmp-item-desc">{item.detail}</p>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
