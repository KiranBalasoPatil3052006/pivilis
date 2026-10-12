"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  ComponentPropsWithoutRef
} from "react";
import { motion, Transition, TargetAndTransition } from "motion/react";
import "./RotatingText.css";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps
  extends Omit<ComponentPropsWithoutRef<typeof motion.span>, "children" | "transition" | "initial" | "animate" | "exit"> {
  texts: string[];
  transition?: Transition;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  exit?: TargetAndTransition;
  animatePresenceMode?: "sync" | "popLayout" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>((props, ref) => {
  const {
    texts,
    transition = { type: "spring", damping: 26, stiffness: 320 },
    initial = { y: "115%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-115%", opacity: 0 },
    animatePresenceMode: _animatePresenceMode = "wait",
    animatePresenceInitial: _animatePresenceInitial = false,
    rotationInterval = 2400,
    staggerDuration = 0.02,
    staggerFrom = "last",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [widthIndex, setWidthIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [textWidths, setTextWidths] = useState<number[]>([]);
  const measureContainerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Measure natural rendered text widths in the browser layout
  useEffect(() => {
    const measure = () => {
      if (measureContainerRef.current) {
        const spans = measureContainerRef.current.querySelectorAll("span");
        const widths = Array.from(spans).map(s => Math.ceil(s.getBoundingClientRect().width) + 2);
        if (widths.some(w => w > 2)) {
          setTextWidths(widths);
        }
      }
    };
    measure();
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(measure);
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [texts]);

  const splitIntoCharacters = (text: string) => {
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), segment => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[displayedIndex] || "";
    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1
      }));
    }
    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1
      }));
    }
    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1
      }));
    }

    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1
    }));
  }, [texts, displayedIndex, splitBy]);

  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      const total = totalChars;
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs((staggerFrom as number) - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  // Clear pending timers on unmount
  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  // Sequential transition:
  // Step 1: Animate current text out (width stays fixed at old word).
  // Step 2: Once text is completely gone, smoothly resize box width.
  // Step 3: Once box has resized, animate new text in.
  const triggerTransition = useCallback(
    (targetIndex: number) => {
      if (isTransitioningRef.current) return;
      if (targetIndex === displayedIndex) return;
      isTransitioningRef.current = true;

      // Phase 1: Exit old text
      setIsExiting(true);

      // Phase 2: When exit animation finishes (~300ms), text is completely gone -> animate width
      const t1 = setTimeout(() => {
        setWidthIndex(targetIndex);
        if (onNext) onNext(targetIndex);

        // Phase 3: When width transition finishes (~420ms) -> reveal new text
        const t2 = setTimeout(() => {
          setDisplayedIndex(targetIndex);
          setIsExiting(false);
          isTransitioningRef.current = false;
        }, 420);
        timersRef.current.push(t2);
      }, 300);
      timersRef.current.push(t1);
    },
    [displayedIndex, onNext]
  );

  const next = useCallback(() => {
    const nextIndex =
      displayedIndex === texts.length - 1 ? (loop ? 0 : displayedIndex) : displayedIndex + 1;
    triggerTransition(nextIndex);
  }, [displayedIndex, texts.length, loop, triggerTransition]);

  const previous = useCallback(() => {
    const prevIndex =
      displayedIndex === 0 ? (loop ? texts.length - 1 : displayedIndex) : displayedIndex - 1;
    triggerTransition(prevIndex);
  }, [displayedIndex, texts.length, loop, triggerTransition]);

  const jumpTo = useCallback(
    (index: number) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      triggerTransition(validIndex);
    },
    [texts.length, triggerTransition]
  );

  const reset = useCallback(() => {
    triggerTransition(0);
  }, [triggerTransition]);

  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset
    }),
    [next, previous, jumpTo, reset]
  );

  // Auto rotation interval
  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  const currentWidth = textWidths[widthIndex];

  return (
    <>
      {/* Offscreen measurement elements */}
      <div
        ref={measureContainerRef}
        aria-hidden="true"
        className={mainClassName}
        style={{
          position: "fixed",
          visibility: "hidden",
          pointerEvents: "none",
          top: -9999,
          left: -9999,
          zIndex: -9999,
          opacity: 0,
          whiteSpace: "nowrap"
        }}
      >
        {texts.map((text, i) => (
          <span key={i} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {text}
          </span>
        ))}
      </div>

      <motion.span
        className={cn("text-rotate", mainClassName)}
        {...rest}
        style={{
          ...rest.style,
          width: currentWidth ? `${currentWidth}px` : "auto",
          boxSizing: "content-box",
          whiteSpace: "nowrap"
        }}
      >
        <span className="text-rotate-sr-only">{texts[displayedIndex]}</span>

        <span
          key={displayedIndex}
          className={cn(splitBy === "lines" ? "text-rotate-lines" : "text-rotate")}
          aria-hidden="true"
          style={{ whiteSpace: "nowrap" }}
        >
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, word) => sum + word.characters.length, 0);
            const totalChars = array.reduce((sum, word) => sum + word.characters.length, 0);

            return (
              <span
                key={wordIndex}
                className={cn("text-rotate-word", splitLevelClassName)}
                style={{ whiteSpace: "nowrap" }}
              >
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={hasMounted ? (initial as TargetAndTransition) : false}
                    animate={
                      isExiting
                        ? (exit as TargetAndTransition)
                        : (animate as TargetAndTransition)
                    }
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(previousCharsCount + charIndex, totalChars)
                    }}
                    className={cn("text-rotate-element", elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
              </span>
            );
          })}
        </span>
      </motion.span>
    </>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText;
