"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LabContent, LabToggleId } from "@/content/types";
import { makeInstruments } from "@/lib/lab-data";

interface RowRefs {
  lastEl: HTMLElement;
  chgEl: HTMLElement;
  open: number;
  cur: number;
}

/**
 * The Latency Lab — always dark, theme-independent. A seeded random-walk over
 * ~50 fictional instruments drives live prices; the three toggles change a
 * MOCKED FPS target (Phase A) that Phase D replaces with genuinely-toggleable
 * rendering. IO-gated; naïve mode auto-disarms after 15s. Prices/meters are
 * written straight to the DOM so the RAF loop never re-renders React.
 */
export default function LatencyLab({ lab }: { lab: LabContent }) {
  const instruments = useMemo(() => makeInstruments(), []);

  const [naive, setNaive] = useState(false);
  const [noVirtual, setNoVirtual] = useState(false);
  const [noMemo, setNoMemo] = useState(false);
  const [naiveLeft, setNaiveLeft] = useState(15);

  // Mirror toggle state into refs so the RAF loop reads the latest values.
  const naiveRef = useRef(false);
  const noVirtualRef = useRef(false);
  const noMemoRef = useRef(false);
  useEffect(() => {
    naiveRef.current = naive;
    noVirtualRef.current = noVirtual;
    noMemoRef.current = noMemo;
  }, [naive, noVirtual, noMemo]);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const fpsElRef = useRef<HTMLDivElement>(null);
  const droppedElRef = useRef<HTMLDivElement>(null);
  const naiveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  useEffect(() => {
    return () => {
      if (naiveTimerRef.current) clearInterval(naiveTimerRef.current);
    };
  }, []);

  // ---- live price walk + FPS meter (RAF, IO-gated) ----
  useEffect(() => {
    const grid = gridRef.current;
    const section = sectionRef.current;
    if (!grid) return;

    const rows: RowRefs[] = [];
    grid.querySelectorAll<HTMLElement>("[data-row]").forEach((el) => {
      const base = parseFloat(el.dataset.base || "0");
      const lastEl = el.querySelector<HTMLElement>("[data-last]");
      const chgEl = el.querySelector<HTMLElement>("[data-chg]");
      if (lastEl && chgEl) rows.push({ lastEl, chgEl, open: base, cur: base });
    });

    let raf = 0;
    let fpsDisp = 60;
    let dropped = 0;
    let lastFrame = 0;
    let priceAcc = 0;

    const tick = (now: number) => {
      const dt = now - (lastFrame || now);
      lastFrame = now;

      // Price random-walk — throttled; naïve mode updates in slower bursts.
      priceAcc += dt;
      const stride = naiveRef.current ? 90 : 55;
      if (priceAcc >= stride) {
        priceAcc = 0;
        for (const r of rows) {
          const drift = (Math.random() - 0.5) * (r.cur * 0.004 + 0.02);
          r.cur = Math.max(0.5, r.cur + drift);
          const pct = ((r.cur - r.open) / r.open) * 100;
          r.lastEl.textContent = r.cur.toFixed(2);
          r.chgEl.textContent = (pct >= 0 ? "+" : "") + pct.toFixed(2) + "%";
          r.chgEl.style.color =
            pct >= 0.001
              ? "var(--lab-up)"
              : pct <= -0.001
                ? "var(--lab-down)"
                : "var(--lab-muted)";
        }
      }

      // FPS meter — mocked target reflecting which optimizations are disabled.
      let target = 60;
      if (naiveRef.current) {
        target = 11 + Math.random() * 4;
      } else {
        if (noVirtualRef.current) target -= 22;
        if (noMemoRef.current) target -= 9;
      }
      const jitter = naiveRef.current
        ? (Math.random() - 0.5) * 6
        : (Math.random() - 0.5) * 1.4;
      fpsDisp += (target - fpsDisp) * 0.12 + jitter;
      fpsDisp = Math.max(6, Math.min(61, fpsDisp));
      const shown = Math.round(fpsDisp);
      if (fpsElRef.current) {
        fpsElRef.current.textContent = String(shown);
        fpsElRef.current.style.color =
          shown < 30
            ? "var(--lab-down)"
            : shown < 52
              ? "var(--lab-amber)"
              : "var(--lab-text)";
      }
      if (fpsDisp < 55) {
        dropped += naiveRef.current ? 2 : 1;
        if (droppedElRef.current)
          droppedElRef.current.textContent = dropped.toLocaleString();
      }

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      lastFrame = performance.now();
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
        (entries) =>
          entries.forEach((e) => (e.isIntersecting ? start() : stop())),
        { threshold: 0.12 },
      );
      io.observe(section);
    } else {
      start();
    }

    return () => {
      stop();
      io?.disconnect();
    };
  }, []);

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
              <Meter label={lab.meterFps} valueRef={fpsElRef} initial="60" />
              <Meter label={lab.meterDropped} valueRef={droppedElRef} initial="0" />
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
            <div className="grid grid-cols-[64px_1fr_96px_92px] gap-2 border-b border-lab-line px-[18px] py-3 text-[11px] uppercase tracking-[0.06em] text-lab-muted max-[820px]:grid-cols-[64px_96px_92px]">
              <span>{lab.colSym}</span>
              <span className="max-[820px]:hidden">{lab.colInstrument}</span>
              <span className="text-end">{lab.colLast}</span>
              <span className="text-end">{lab.colChg}</span>
            </div>
            <div
              ref={gridRef}
              data-lenis-prevent
              className="max-h-[440px] overflow-y-auto"
            >
              {instruments.map((ins) => (
                <div
                  key={ins.sym}
                  data-row
                  data-base={ins.base}
                  className="grid grid-cols-[64px_1fr_96px_92px] items-center gap-2 border-b border-white/[0.04] px-[18px] py-[9px] text-[13.5px] max-[820px]:grid-cols-[64px_96px_92px]"
                >
                  <span className="font-semibold text-lab-text">{ins.sym}</span>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] text-lab-muted max-[820px]:hidden">
                    {ins.name}
                  </span>
                  <span data-last className="tnum text-end text-lab-text">
                    {ins.base}
                  </span>
                  <span data-chg className="tnum text-end text-lab-muted">
                    0.00%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[18px] text-[11.5px] text-lab-faint">{lab.footnote}</div>
      </div>
    </section>
  );

  function onToggle(id: LabToggleId) {
    if (id === "naive") toggleNaive();
    else if (id === "noVirtual") setNoVirtual((v) => !v);
    else setNoMemo((v) => !v);
  }
}

/** Custom switch control. Turns red when ON (the harmful state is engaged). */
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
          className="absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white transition-[left] duration-200 ease-[cubic-bezier(.2,.7,.2,1)]"
          style={{ left: on ? "18px" : "2px" }}
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
  valueRef,
  initial,
}: {
  label: string;
  valueRef: React.RefObject<HTMLDivElement | null>;
  initial: string;
}) {
  return (
    <div className="rounded-[12px] border border-lab-line bg-lab-surface p-4">
      <div className="text-[11px] uppercase tracking-[0.06em] text-lab-muted">
        {label}
      </div>
      <div
        ref={valueRef}
        className="tnum mt-1 text-[34px] font-semibold leading-[1.1] text-lab-text"
      >
        {initial}
      </div>
    </div>
  );
}
