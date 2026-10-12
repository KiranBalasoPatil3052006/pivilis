"use client";

import { useEffect, useRef } from "react";

export function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Grid resolution for detailed, flowing wave net
    const NUM_RAYS = 25; // angular rays
    const NUM_RINGS = 44; // concentric rings

    type Point = {
      px: number;
      py: number;
      alpha: number;
      radius: number;
      valid: boolean;
    };

    const mesh: Point[][] = Array.from({ length: NUM_RINGS }, () =>
      Array.from({ length: NUM_RAYS }, () => ({
        px: 0,
        py: 0,
        alpha: 0,
        radius: 0,
        valid: false,
      }))
    );

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    let lastTime = performance.now();
    let animTime = 0;

    function render(currentTime: number) {
      if (!ctx || !canvas) return;

      if (!isVisible) {
        lastTime = currentTime;
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth delta time tracking
      const dt = Math.min((currentTime - lastTime) * 0.001, 0.06);
      lastTime = currentTime;
      if (!prefersReducedMotion) {
        animTime += dt * 0.88; // active, fluid wave progression
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Origin point: anchored at bottom-left corner
      const originX = -width * 0.05;
      const originY = height * 1.05;

      // Soft, atmospheric ambient underglow
      const ambientRadius = Math.max(width * 0.45, 360);
      const ambientGlow = ctx.createRadialGradient(
        originX,
        originY,
        30,
        originX,
        originY,
        ambientRadius
      );
      ambientGlow.addColorStop(0, "rgba(235, 80, 35, 0.055)");
      ambientGlow.addColorStop(0.4, "rgba(220, 65, 28, 0.02)");
      ambientGlow.addColorStop(1, "rgba(23, 25, 23, 0)");
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(originX, originY, ambientRadius, 0, Math.PI * 2);
      ctx.fill();

      // Angular span: from nearly straight up along left edge to out across bottom
      const minAngle = -1.54; // ~ -88 degrees
      const maxAngle = 0.08; // ~ +4 degrees

      const isMobile = width < 768;
      const minR = Math.max(width * 0.08, 65);
      const maxR = Math.max(width * 0.9, height * 1.25);

      const fadeEndX = isMobile ? width * 0.92 : width * 0.58;
      const fadeStartX = isMobile ? width * 0.55 : width * 0.32;
      const fadeSpanX = fadeEndX - fadeStartX;

      // 2. Compute radiating mesh points with defined, rolling wave net displacement
      for (let ring = 0; ring < NUM_RINGS; ring++) {
        const rNorm = ring / (NUM_RINGS - 1);
        const r = minR + rNorm * (maxR - minR);
        const distFactor = 1 - rNorm;

        for (let ray = 0; ray < NUM_RAYS; ray++) {
          const aNorm = ray / (NUM_RAYS - 1);
          const angle = minAngle + aNorm * (maxAngle - minAngle);

          // Flowing multi-harmonic wave net (radiating outwards with visible undulation)
          const travelPhase = r * 0.0062 - animTime * 1.15 + angle * 1.8;
          const crossPhase = angle * 2.6 - animTime * 0.55 + r * 0.003;
          const ripplePhase = r * 0.012 - animTime * 0.8 + angle * 2.2;

          const wave =
            Math.sin(travelPhase) +
            Math.cos(crossPhase) * 0.45 +
            Math.sin(ripplePhase) * 0.25;

          // Noticeable 3D wave amplitude
          const disp = wave * 30 * (0.42 + 0.58 * distFactor);

          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);

          // Normal direction to ray
          const nx = -sinA;
          const ny = cosA;

          // Displace both along wave normal and vertically for visible rolling crests
          const px = originX + r * cosA + nx * disp * 0.72;
          const py = originY + r * sinA + ny * disp * 0.72 - disp * 0.65;

          // Edge falloffs
          const fadeRight = Math.max(0, Math.min(1, 1 - (px - fadeStartX) / fadeSpanX));
          const fadeTop = Math.max(0, Math.min(1, (py + height * 0.04) / (height * 0.14)));
          const fadeRadial = Math.max(0, Math.min(1, (1 - rNorm) / 0.12));
          const softenCorner = Math.min(1, Math.max(0.4, (r - minR) / 120 + 0.4));

          const spatialAlpha = fadeRight * fadeTop * Math.min(1, fadeRadial * 1.2) * softenCorner;

          // Dynamic wave luminance: dots brighten and breathe on crests
          const waveGlow = 1 + wave * 0.26;
          const alpha = spatialAlpha * (0.12 + 0.36 * distFactor) * waveGlow;

          // Delicate dot radius that breathes slightly with wave height
          const radius = Math.max(0.58, (0.66 + distFactor * 0.72) * (1 + wave * 0.1));

          const pt = mesh[ring][ray];
          pt.px = px;
          pt.py = py;
          pt.alpha = alpha;
          pt.radius = radius;
          pt.valid = spatialAlpha > 0.005 && px > -width * 0.1 && py < height * 1.15;
        }
      }

      // 3. Render connecting mesh lines (flowing wave net lattice)
      ctx.lineWidth = 0.62;

      // Concentric wave arcs
      for (let ring = 0; ring < NUM_RINGS; ring++) {
        for (let ray = 0; ray < NUM_RAYS - 1; ray++) {
          const p1 = mesh[ring][ray];
          const p2 = mesh[ring][ray + 1];
          if (!p1.valid || !p2.valid) continue;

          const lineAlpha = Math.min(p1.alpha, p2.alpha) * 0.19;
          if (lineAlpha > 0.004) {
            ctx.strokeStyle = `rgba(235, 85, 42, ${lineAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Radial rays
      for (let ring = 0; ring < NUM_RINGS - 1; ring++) {
        for (let ray = 0; ray < NUM_RAYS; ray++) {
          const p1 = mesh[ring][ray];
          const p2 = mesh[ring + 1][ray];
          if (!p1.valid || !p2.valid) continue;

          const lineAlpha = Math.min(p1.alpha, p2.alpha) * 0.1;
          if (lineAlpha > 0.004) {
            ctx.strokeStyle = `rgba(235, 85, 42, ${lineAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // 4. Render particle dots
      for (let ring = 0; ring < NUM_RINGS; ring++) {
        for (let ray = 0; ray < NUM_RAYS; ray++) {
          const pt = mesh[ring][ray];
          if (!pt.valid || pt.alpha <= 0.01) continue;

          // Soft foreground bokeh near corner
          if (ring < 10 && pt.px < width * 0.2 && pt.py > height * 0.74) {
            const bokehRadius = pt.radius * 2.6;
            const bokehAlpha = pt.alpha * 0.15;
            ctx.fillStyle = `rgba(245, 95, 45, ${bokehAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(pt.px, pt.py, bokehRadius, 0, Math.PI * 2);
            ctx.fill();
          }

          // Subtle glow halo on brighter wave crest points
          if (pt.alpha > 0.24) {
            ctx.fillStyle = `rgba(240, 85, 40, ${(pt.alpha * 0.17).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(pt.px, pt.py, pt.radius * 1.6, 0, Math.PI * 2);
            ctx.fill();
          }

          // Main light dot: warm, delicate orange-coral
          ctx.fillStyle = `rgba(240, 92, 45, ${pt.alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(pt.px, pt.py, pt.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="process-wave-wrap" aria-hidden="true">
      <canvas ref={canvasRef} className="process-wave-canvas" />
    </div>
  );
}
