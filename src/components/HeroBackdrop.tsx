"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's animated data composition: a radial-glow gradient with a
 * slow-drifting particle network on a <canvas>, plus the live FPS chip.
 * requestAnimationFrame, IO-gated (pauses off-screen), DPR-capped at 2,
 * reduced-motion aware. The FPS number is written straight to the DOM so the
 * loop never triggers a React re-render.
 */
export default function HeroBackdrop({
  liveLabel,
  fpsUnit,
}: {
  liveLabel: string;
  fpsUnit: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fpsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const wrap = wrapRef.current;
    if (!cv || !wrap) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const N = 46;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00018,
      vy: (Math.random() - 0.5) * 0.00018,
    }));

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let running = true;
    const visIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => (running = e.isIntersecting)),
      { threshold: 0 },
    );
    visIO.observe(wrap);

    // Draw one frame of the network (lines fade with distance, then dots).
    const paint = () => {
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = (a.x - b.x) * W;
          const dy = (a.y - b.y) * H;
          const d = Math.hypot(dx, dy);
          if (d < 150) {
            ctx.strokeStyle = `rgba(120,160,255,${(0.14 * (1 - d / 150)).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * W, a.y * H);
            ctx.lineTo(b.x * W, b.y * H);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = "rgba(180,205,255,.55)";
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, 1.6, 0, 6.283);
        ctx.fill();
      }
    };

    let heroFps = 60;
    let last = performance.now();
    let raf = 0;

    const draw = (now: number) => {
      const dt = now - last;
      last = now;

      // Cosmetic "live" easing around 57–61 with slight jitter.
      heroFps += (60 - heroFps) * 0.08 + (Math.random() - 0.5);
      const shown = Math.round(Math.min(61, Math.max(57, heroFps)));
      if (fpsRef.current) fpsRef.current.textContent = String(shown);

      if (running) {
        for (const p of pts) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.x < 0 || p.x > 1) p.vx *= -1;
          if (p.y < 0 || p.y > 1) p.vy *= -1;
          p.x = Math.max(0, Math.min(1, p.x));
          p.y = Math.max(0, Math.min(1, p.y));
        }
        paint();
      }
      raf = requestAnimationFrame(draw);
    };

    if (reduce) {
      // One static frame; no loop, no jitter — the chip stays at 60.
      paint();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      visIO.disconnect();
    };
  }, []);

  return (
    <>
      {/* z1 — designed data composition */}
      <div
        ref={wrapRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 12%,rgba(11,92,255,.28),transparent 55%),radial-gradient(90% 80% at 8% 95%,rgba(0,230,138,.12),transparent 50%),linear-gradient(160deg,#0A0B0D 0%,#0E1117 55%,#0A0B0D 100%)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-90"
        />
      </div>

      {/* z4 — live FPS chip */}
      <div className="absolute end-[clamp(20px,3vw,28px)] top-[clamp(20px,3vw,28px)] z-[4] flex items-center gap-[9px] rounded-full border border-white/[0.16] bg-[rgba(10,11,13,0.5)] px-[15px] py-2 text-[12.5px] text-[#E8E9EB] backdrop-blur-[10px]">
        <span className="h-[6px] w-[6px] rounded-full bg-[#00E68A] [animation:ud-pulse_2s_ease-in-out_infinite]" />
        <span>
          {liveLabel} · <b ref={fpsRef} className="tnum">60</b> {fpsUnit}
        </span>
      </div>
    </>
  );
}
