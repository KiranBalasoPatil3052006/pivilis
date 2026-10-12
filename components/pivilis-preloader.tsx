"use client";

import { useEffect, useRef } from "react";
import "./preloader.css";

const HOLD_AT = 5.0;
const END_AT = 6.0;

/* dot keyframes: [time, centreX, centreY, width, height] in units of logo width */
const KEYS: [number, number, number, number, number][] = [
  [2.767, 1.372, 0.1491, 0.1055, 0.1055],
  [2.8, 1.3257, 0.1491, 0.1055, 0.1055],
  [2.833, 1.2791, 0.1491, 0.1055, 0.1055],
  [2.867, 1.2325, 0.1479, 0.1055, 0.108],
  [2.9, 1.1834, 0.1479, 0.1055, 0.108],
  [2.933, 1.1834, 0.1479, 0.1055, 0.108],
  [2.967, 1.1368, 0.1479, 0.1055, 0.108],
  [3.0, 1.0877, 0.1485, 0.1055, 0.1067],
  [3.033, 1.046, 0.1074, 0.1055, 0.1055],
  [3.067, 1.0031, 0.0706, 0.1031, 0.1055],
  [3.1, 1.0031, 0.0706, 0.1031, 0.1055],
  [3.133, 0.9581, 0.038, 0.1031, 0.1018],
  [3.167, 0.913, 0.0129, 0.1031, 0.1031],
  [3.2, 0.8667, -0.0067, 0.1006, 0.1031],
  [3.233, 0.8667, -0.0067, 0.1006, 0.1031],
  [3.267, 0.8192, -0.0227, 0.1006, 0.1006],
  [3.3, 0.7754, -0.0325, 0.0982, 0.1006],
  [3.333, 0.7278, -0.0368, 0.0982, 0.0994],
  [3.367, 0.6815, -0.0362, 0.0957, 0.0982],
  [3.4, 0.6395, -0.0264, 0.0871, 0.0883],
  [3.467, 0.612, 0.012, 0.075, 0.075],
  [3.5, 0.5953, 0.055, 0.0646, 0.0646],
  [3.567, 0.5953, 0.04, 0.0646, 0.0646],
  [3.633, 0.5953, 0.026, 0.0646, 0.0646],
  [3.7, 0.5953, 0.018, 0.0646, 0.0646],
  [3.8, 0.5953, 0.02, 0.0646, 0.0646],
  [3.9, 0.5953, 0.034, 0.0646, 0.0646],
  [4.0, 0.5953, 0.052, 0.0646, 0.0646],
  [4.07, 0.5953, 0.06, 0.0646, 0.0646],
  [4.13, 0.5953, 0.0555, 0.0646, 0.0646],
  [4.2, 0.5953, 0.056, 0.0646, 0.0646],
  [5.0, 0.5953, 0.056, 0.0646, 0.0646],
];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

declare global {
  interface Window {
    PivilisPreloader?: {
      replay: () => void;
      seek: (s: number) => void;
    };
  }
}

export function PivilisPreloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pre = preloaderRef.current;
    const stage = stageRef.current;
    const logo = logoRef.current;
    const acc = accentRef.current;
    const dot = dotRef.current;

    if (!pre || !stage || !logo || !acc || !dot) return;

    let keys = KEYS;
    let W = logo.offsetWidth || 300;
    let vw = window.innerWidth;
    let left = logo.getBoundingClientRect().left;

    function buildKeys() {
      const R = (vw - left) / (W || 1) + 0.12;
      const k0 = KEYS[0];
      if (R > k0[1]) {
        const dt = (R - k0[1]) / 1.4;
        keys = [[k0[0] - dt, R, k0[2], k0[3], k0[4]], ...KEYS];
      } else {
        keys = KEYS;
      }
    }

    function measure() {
      if (!logo) return;
      W = logo.offsetWidth;
      vw = window.innerWidth;
      left = logo.getBoundingClientRect().left;
      buildKeys();
    }

    measure();
    window.addEventListener("resize", measure);

    const img = logo.querySelector("img");
    if (img && !img.complete) {
      img.addEventListener("load", measure);
    }

    function render(t: number) {
      if (!stage || !acc || !dot) return;

      /* stage opacity + exit zoom */
      let op = clamp((t - 0.07) / 0.78, 0, 1);
      let sc = 1;
      if (t > HOLD_AT) {
        sc = 1 + 0.13 * Math.pow(clamp((t - HOLD_AT) / 0.95, 0, 1), 1.5);
        op *= 1 - clamp((t - 5.1) / 0.9, 0, 1);
      }
      stage.style.opacity = String(op);
      stage.style.transform = `scale(${sc})`;

      /* orange accent wipe (bottom-left -> top-right) */
      const p = clamp((t - 0.95) / 0.62, 0, 1);
      const e = 1 - Math.pow(1 - p, 2.2);
      const clipVal = `ellipse(${(150 * Math.pow(e, 1.3)).toFixed(1)}% ${(150 * e).toFixed(1)}% at 0% 100%)`;
      acc.style.clipPath = clipVal;
      (acc.style as unknown as { webkitClipPath: string }).webkitClipPath = clipVal;

      /* flying dot */
      if (t < keys[0][0]) {
        dot.style.visibility = "hidden";
        return;
      }
      let i = 0;
      const n = keys.length;
      while (i < n - 2 && keys[i + 1][0] <= t) i++;
      const a = keys[i];
      const b = keys[Math.min(i + 1, n - 1)];
      const f = b[0] === a[0] ? 1 : clamp((t - a[0]) / (b[0] - a[0]), 0, 1);
      const x = a[1] + (b[1] - a[1]) * f;
      const y = a[2] + (b[2] - a[2]) * f;
      const w = a[3] + (b[3] - a[3]) * f;
      const h = a[4] + (b[4] - a[4]) * f;
      dot.style.visibility = "visible";
      dot.style.width = `${w * W}px`;
      dot.style.height = `${h * W}px`;
      dot.style.transform = `translate3d(${x * W - (w * W) / 2}px,${y * W - (h * W) / 2}px,0)`;
    }

    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);
    // Safety fallback so it never hangs
    const safetyTimer = setTimeout(() => {
      loaded = true;
    }, 5500);

    let raf: number;
    let last: number;
    let t = 0;

    function finish() {
      if (!pre) return;
      pre.classList.add("pv-out");
      document.documentElement.classList.remove("pv-lock");
      setTimeout(() => {
        pre.style.display = "none";
        document.dispatchEvent(new CustomEvent("pivilis:preloader-done"));
      }, 650);
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      t += dt;
      if (!loaded && t > HOLD_AT) t = HOLD_AT;
      render(t);
      if (t >= END_AT) {
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    }

    function play() {
      cancelAnimationFrame(raf);
      if (!pre || !stage) return;
      pre.style.display = "";
      pre.classList.remove("pv-out");
      document.documentElement.classList.add("pv-lock");
      stage.style.transform = "none";
      measure();
      t = 0;
      render(0);
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      render(4.9);
      setTimeout(finish, 800);
    } else {
      play();
    }

    window.PivilisPreloader = {
      replay: () => {
        loaded = true;
        play();
      },
      seek: (s: number) => {
        cancelAnimationFrame(raf);
        if (!pre || !stage) return;
        pre.style.display = "";
        pre.classList.remove("pv-out");
        stage.style.transform = "none";
        measure();
        render(s);
      },
    };

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safetyTimer);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", onLoad);
      if (img) img.removeEventListener("load", measure);
      document.documentElement.classList.remove("pv-lock");
    };
  }, []);

  return (
    <div
      id="pv-preloader"
      ref={preloaderRef}
      role="status"
      aria-label="Loading Pivilis"
    >
      <div className="pv-stage" ref={stageRef}>
        <div className="pv-logo" ref={logoRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/preloader/logo.webp"
            alt="Pivilis"
            width={1498}
            height={444}
            loading="eager"
            decoding="sync"
          />
          <div className="pv-accent" ref={accentRef} />
          <div className="pv-dot" ref={dotRef} />
        </div>
      </div>
    </div>
  );
}
