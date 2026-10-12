"use client";

import { useEffect, useState, useRef } from "react";
import "./hero-qa-animation.css";

export interface QAItem {
  q: string;
  a: string;
}

export const QA_ITEMS: QAItem[] = [
  // 01 — AI & Automation
  {
    q: "Can you automate the repetitive work in our business?",
    a: "Yes. We can automate repeated tasks, follow-ups, reminders and workflows."
  },
  {
    q: "Can you help us reply to customers faster?",
    a: "Yes. We can set up AI chatbots and automated customer support."
  },

  // 02 — Social Media & Content
  {
    q: "Can you manage our social media regularly?",
    a: "Yes. We can plan, create and manage your social media content."
  },
  {
    q: "We do not know what to post. Can you help?",
    a: "Yes. We can plan content ideas that match your business and audience."
  },

  // 03 — Video Editing & Production
  {
    q: "Can you create videos for our brand?",
    a: "Yes. We can edit and produce videos for your business and campaigns."
  },
  {
    q: "Can you turn our raw clips into reels and ads?",
    a: "Yes. We can turn your footage into clean reels, shorts and ad videos."
  },

  // 04 — Marketing & Advertising
  {
    q: "Can you help us reach more customers online?",
    a: "Yes. We can run targeted campaigns and help your business reach the right audience."
  },
  {
    q: "Can you run Meta and other online ads for us?",
    a: "Yes. We can plan, launch and improve your digital advertising campaigns."
  },

  // 05 — Website Development
  {
    q: "Can you build a website for our business?",
    a: "Yes. We can design and build a fast, clear and responsive website."
  },
  {
    q: "Our current website looks old. Can you improve it?",
    a: "Yes. We can redesign it and make it easier for customers to use."
  },

  // 06 — Custom Software Development
  {
    q: "Can you build an app for our business?",
    a: "Yes. We can design and develop an app around your business needs."
  },
  {
    q: "Can you build a custom system for our daily work?",
    a: "Yes. We can build software that fits the way your business works."
  },

  // 07 — UI/UX & Product Design
  {
    q: "Can you make our app or website easier to use?",
    a: "Yes. We can improve the interface and make the experience simpler for users."
  },
  {
    q: "Can you design our product before development starts?",
    a: "Yes. We can plan the user experience and create clear product designs first."
  }
];

const STEP_DURATION = 4000;

export function HeroQAAnimation() {
  const [index, setIndex] = useState(0);
  const [qClass, setQClass] = useState("fade-in");
  const [aClass, setAClass] = useState("fade-in");
  const [displayItem, setDisplayItem] = useState(QA_ITEMS[0]);

  const pausedRef = useRef(false);
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const subTimer1Ref = useRef<NodeJS.Timeout | null>(null);
  const subTimer2Ref = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const scheduleNextRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Initial entrance staggered answer animation
    queueMicrotask(() => {
      setQClass("fade-in");
    });
    subTimer1Ref.current = setTimeout(() => {
      setAClass("fade-in");
    }, 320);

    const scheduleNext = () => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
      stepTimerRef.current = setTimeout(() => {
        if (pausedRef.current) return;

        // 1. Fade out both
        setQClass("fade-out");
        setAClass("fade-out");

        // 2. Change text after fade-out transition (220ms)
        subTimer1Ref.current = setTimeout(() => {
          const nextIndex = (indexRef.current + 1) % QA_ITEMS.length;
          setIndex(nextIndex);
          setDisplayItem(QA_ITEMS[nextIndex]);

          // 3. Fade in question immediately
          setQClass("fade-in");

          // 4. Stagger answer fade in by 320ms
          subTimer2Ref.current = setTimeout(() => {
            setAClass("fade-in");

            // Schedule subsequent step
            if (!pausedRef.current) {
              scheduleNext();
            }
          }, 320);
        }, 220);
      }, STEP_DURATION);
    };

    scheduleNextRef.current = scheduleNext;
    scheduleNext();

    return () => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
      if (subTimer1Ref.current) clearTimeout(subTimer1Ref.current);
      if (subTimer2Ref.current) clearTimeout(subTimer2Ref.current);
    };
  }, []);

  const handleMouseEnter = () => {
    pausedRef.current = true;
    if (stepTimerRef.current) {
      clearTimeout(stepTimerRef.current);
      stepTimerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    if (scheduleNextRef.current) {
      scheduleNextRef.current();
    }
  };

  return (
    <div
      className="hero-qa-container qa-animation"
      id="qa"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-live="polite"
    >
      <div className="hero-qa-stage stage">
        <div className="hero-qa-question-wrap question-wrap">
          <div
            className={`hero-qa-bubble hero-qa-question question bubble ${qClass}`}
            id="questionBubble"
          >
            <div className="hero-qa-label label">Question</div>
            <p className="hero-qa-text text" id="questionText">
              {displayItem.q}
            </p>
          </div>
        </div>

        <div className="hero-qa-answer-wrap answer-wrap">
          <div
            className={`hero-qa-bubble hero-qa-answer answer bubble ${aClass}`}
            id="answerBubble"
          >
            <div className="hero-qa-label label">Answer</div>
            <p className="hero-qa-text text" id="answerText">
              {displayItem.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
