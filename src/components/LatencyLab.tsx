"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { LabContent, LabToggleId } from "@/content/types";
import { makeInstruments, INSTRUMENT_COUNT } from "@/lib/lab-data";

const ROW_H = 34; // px — fixed so virtualization math is exact
const VIEWPORT_H = 440;
const OVERSCAN = 8;
const VISIBLE = Math.ceil(VIEWPORT_H / ROW_H) + OVERSCAN * 2;
const CHANGES_PER_TICK = 160; // instruments that move each update
const GRID_COLS =
  "grid-cols-[64px_1fr_96px_92px] max-[820px]:grid-cols-[64px_96px_92px]";

/**
 * The Latency Lab — always dark, theme-independent. Genuinely toggleable:
 *
 *  - Virtualization OFF renders all 11,000 rows; ON renders only a scroll window.
 *  - Memoization OFF re-renders every visible row each tick; ON (React.memo)
 *    skips rows whose price didn't change.
 *  - Naïve rendering ON forces a synchronous re-render (flushSync) every frame;
 *    OFF batches price updates on a throttle.
 *
 * FPS/Dropped are measured from real requestAnimationFrame timing, so the
 * stutter is real. IO-gated; naïve mode auto-disarms after 15s. Prices live in
 * an immutable Float64Array in state; `open` is the constant base price.
 */
export default function LatencyLab({ lab }: { lab: LabContent }) {
  const instruments = useMemo(() => makeInstruments(INSTRUMENT_COUNT), []);

  const [naive, setNaive] = useState(false);
  const [noVirtual, setNoVirtual] = useState(false);
  const [noMemo, setNoMemo] = useState(false);
  const [naiveLeft, setNaiveLeft] = useState(15);
  const [scrollTop, setScrollTop] = useState(0);

  const [prices, setPrices] = useState<Float64Array>(() => {
    const p = new Float64Array(instruments.length);
    for (let i = 0; i < instruments.length; i++) p[i] = instruments[i].base;
    return p;
  });

  // Meters — displayed from state (updated ~4×/s), measured every frame in refs.
  const [fps, setFps] = useState(60);
  const [dropped, setDropped] = useState(0);

  const naiveRef = useRef(false);
  useEffect(() => {
    naiveRef.current = naive;
  }, [naive]);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const naiveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fpsSmoothRef = useRef(60);
  const droppedRef = useRef(0);

  // ---- naïve mode: 15s auto-disarm countdown ----
  function toggleNaive() {
    setNaive((on) => {
      const next = !on;
      if (naiveTimerRef.current) {
        clearInterval(naiveTimerRef.current);
        naiveTimerRef.current = null;
      }
      if (next) {
        setNaiveLeft(15);
        naiveTimerRef.current = setInterval(() => {
          setNaiveLeft((left) => {
            if (left <= 1) {
              if (naiveTimerRef.current) clearInterval(naiveTimerRef.current);
              naiveTimerRef.current = null;
              setNaive(false);
              return 15;
            }
            return left - 1;
          });
        }, 1000);
      } else {
        setNaiveLeft(15);
      }
      return next;
    });
  }

  function onToggle(id: LabToggleId) {
    if (id === "naive") toggleNaive();
    else if (id === "noVirtual") setNoVirtual((v) => !v);
    else setNoMemo((v) => !v);
  }

  useEffect(() => {
    return () => {
      if (naiveTimerRef.current) clearInterval(naiveTimerRef.current);
    };
  }, []);

  // ---- RAF loop: measure real FPS, walk prices, drive re-renders (IO-gated) ----
  useEffect(() => {
    const section = sectionRef.current;
    let raf = 0;
    let last = 0;
    let fpsSmooth = 60;
    let droppedCount = 0;
    let priceAcc = 0;

    // Immutable price walk: copy, move a subset, return the new array.
    const walk = (prev: Float64Array) => {
      const next = prev.slice();
      const n = next.length;
      for (let k = 0; k < CHANGES_PER_TICK; k++) {
        const idx = (Math.random() * n) | 0;
        const drift = (Math.random() - 0.5) * (next[idx] * 0.004 + 0.02);
        next[idx] = Math.max(0.5, next[idx] + drift);
      }
      return next;
    };

    const tick = (now: number) => {
      const dt = last ? now - last : 16.7;
      last = now;

      // Real FPS from frame delta; a slow render delays the next frame → low fps.
      const inst = 1000 / Math.max(dt, 0.001);
      fpsSmooth += (inst - fpsSmooth) * 0.15;
      if (dt > 20) droppedCount += 1; // slower than ~50fps → a dropped frame
      fpsSmoothRef.current = fpsSmooth;
      droppedRef.current = droppedCount;

      priceAcc += dt;
      const naiveOn = naiveRef.current;
      if (naiveOn || priceAcc >= 50) {
        priceAcc = 0;
        if (naiveOn) flushSync(() => setPrices(walk));
        else setPrices(walk);
      }

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    let io: IntersectionObserver | null = null;
    if (section && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => (e.isIntersecting ? start() : stop())),
        { threshold: 0.12 },
      );
      io.observe(section);
    } else {
      start();
    }

    // Copy measured values into display state a few times a second.
    const meterTimer = setInterval(() => {
      setFps(Math.round(Math.min(60, Math.max(1, fpsSmoothRef.current))));
      setDropped(droppedRef.current);
    }, 250);

    return () => {
      stop();
      io?.disconnect();
      clearInterval(meterTimer);
    };
  }, []);

  // ---- virtualization window ----
  const total = instruments.length;
  const start = noVirtual
    ? 0
    : Math.max(0, Math.floor(scrollTop / ROW_H) - OVERSCAN);
  const end = noVirtual ? total : Math.min(total, start + VISIBLE);

  const rows = [];
  for (let i = start; i < end; i++) {
    const ins = instruments[i];
    const props = { sym: ins.sym, name: ins.name, price: prices[i], open: ins.base };
    rows.push(
      noMemo ? (
        <LabRow key={ins.sym} {...props} />
      ) : (
        <LabRowMemo key={ins.sym} {...props} />
      ),
    );
  }

  const fpsColor =
    fps < 30 ? "var(--lab-down)" : fps < 52 ? "var(--lab-amber)" : "var(--lab-text)";

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="border-y border-lab-line bg-lab-bg py-[clamp(70px,11vh,120px)] text-lab-text"
    >
      <div className="mx-auto max-w-[1160px] px-[clamp(20px,5vw,48px)]">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="mb-[14px] text-[12.5px] uppercase tracking-[0.08em] text-lab-up">
              {lab.kicker}
            </div>
            <h2 className="m-0 text-[clamp(30px,5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em] text-lab-text">
              {lab.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-lab-line px-[14px] py-[7px] text-[12px] text-lab-muted">
            <span className="inline-block h-[6px] w-[6px] rounded-full bg-lab-up [animation:ud-pulse_2s_ease-in-out_infinite]" />
            {lab.syntheticChip}
          </div>
        </div>

        <p className="my-[26px] mb-10 max-w-[64ch] text-[clamp(16px,1.9vw,19px)] leading-[1.65] text-lab-muted">
          {lab.intro}
        </p>

        {/* Body — controls + grid */}
        <div className="flex items-stretch gap-[22px] max-[820px]:flex-col">
          {/* Left column: toggles + meters + warning */}
          <div className="flex flex-[0_0_clamp(240px,26%,300px)] flex-col gap-4">
            <div className="flex flex-col gap-[10px]">
              {lab.toggles.map((t) => (
                <LabToggle
                  key={t.id}
                  label={t.label}
                  on={
                    t.id === "naive"
                      ? naive
                      : t.id === "noVirtual"
                        ? noVirtual
                        : noMemo
                  }
                  offLabel={t.off}
                  onLabel={t.on}
                  onToggle={() => onToggle(t.id)}
                />
              ))}
            </div>

            <div className="mt-[2px] grid grid-cols-2 gap-3">
              <Meter label={lab.meterFps} value={String(fps)} color={fpsColor} />
              <Meter label={lab.meterDropped} value={dropped.toLocaleString()} />
            </div>

            {naive && (
              <div className="flex items-center gap-[10px] rounded-[10px] border border-lab-down/30 bg-lab-down/10 px-[14px] py-[11px] text-[12px] text-lab-down">
                <span className="inline-block h-[6px] w-[6px] rounded-full bg-lab-down [animation:ud-pulse_1s_ease-in-out_infinite]" />
                {lab.naiveWarning.replace("{s}", String(naiveLeft))}
              </div>
            )}
          </div>

          {/* Right column: the grid */}
          <div className="min-w-0 flex-1 overflow-hidden rounded-[14px] border border-lab-line bg-lab-surface">
            <div
              className={`grid ${GRID_COLS} gap-2 border-b border-lab-line px-[18px] py-3 text-[11px] uppercase tracking-[0.06em] text-lab-muted`}
            >
              <span>{lab.colSym}</span>
              <span className="max-[820px]:hidden">{lab.colInstrument}</span>
              <span className="text-end">{lab.colLast}</span>
              <span className="text-end">{lab.colChg}</span>
            </div>
            <div
              ref={scrollRef}
              data-lenis-prevent
              onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
              className="relative overflow-y-auto"
              style={{ maxHeight: VIEWPORT_H }}
            >
              {noVirtual ? (
                <div>{rows}</div>
              ) : (
                <div style={{ height: total * ROW_H, position: "relative" }}>
                  <div style={{ transform: `translateY(${start * ROW_H}px)` }}>
                    {rows}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-[18px] text-[11.5px] text-lab-faint">{lab.footnote}</div>
      </div>
    </section>
  );
}

// ---- Row ----
interface RowProps {
  sym: string;
  name: string;
  price: number;
  open: number;
}

function LabRow({ sym, name, price, open }: RowProps) {
  const pct = ((price - open) / open) * 100;
  const color =
    pct >= 0.001
      ? "var(--lab-up)"
      : pct <= -0.001
        ? "var(--lab-down)"
        : "var(--lab-muted)";
  return (
    <div
      className={`grid ${GRID_COLS} items-center gap-2 border-b border-white/[0.04] px-[18px] text-[13.5px]`}
      style={{ height: ROW_H }}
    >
      <span className="font-semibold text-lab-text">{sym}</span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] text-lab-muted max-[820px]:hidden">
        {name}
      </span>
      <span className="tnum text-end text-lab-text">{price.toFixed(2)}</span>
      <span className="tnum text-end" style={{ color }}>
        {(pct >= 0 ? "+" : "") + pct.toFixed(2)}%
      </span>
    </div>
  );
}

// Memoized cell: skips re-render when its price (and identity) is unchanged.
const LabRowMemo = memo(LabRow);

function LabToggle({
  label,
  on,
  offLabel,
  onLabel,
  onToggle,
}: {
  label: string;
  on: boolean;
  offLabel: string;
  onLabel: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className="flex w-full items-center gap-3 rounded-[11px] border bg-lab-surface px-[15px] py-[13px] text-start text-lab-text transition-colors"
      style={{ borderColor: on ? "rgba(255,77,77,.4)" : "var(--lab-line)" }}
    >
      <span
        className="relative h-[22px] w-[38px] flex-none rounded-full transition-colors"
        style={{ background: on ? "var(--lab-down)" : "rgba(255,255,255,.14)" }}
      >
        <span
          className="absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white transition-[inset-inline-start] duration-200 ease-[cubic-bezier(.2,.7,.2,1)]"
          style={{ insetInlineStart: on ? "18px" : "2px" }}
        />
      </span>
      <span className="flex flex-col leading-[1.25]">
        <span className="text-[13px] font-semibold">{label}</span>
        <span className="text-[11px] text-lab-muted">{on ? onLabel : offLabel}</span>
      </span>
    </button>
  );
}

function Meter({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="rounded-[12px] border border-lab-line bg-lab-surface p-4">
      <div className="text-[11px] uppercase tracking-[0.06em] text-lab-muted">
        {label}
      </div>
      <div
        className="tnum mt-1 text-[34px] font-semibold leading-[1.1]"
        style={{ color: color ?? "var(--lab-text)" }}
      >
        {value}
      </div>
    </div>
  );
}
