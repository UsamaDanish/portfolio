"use client";

import { useEffect, useRef } from "react";

/** Honest, device-specific measurement: times a fixed 350k-op arithmetic loop
 *  with performance.now() on mount. No vanity number. */
export default function CraftMeter({
  cardLabel,
  unit,
  opsLabel,
}: {
  cardLabel: string;
  unit: string;
  opsLabel: string;
}) {
  const msRef = useRef<HTMLSpanElement>(null);
  const opsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const OPS = 350000;
    const t0 = performance.now();
    let acc = 0;
    for (let i = 0; i < OPS; i++) acc += Math.sqrt(i) * 1.0000001;
    const ms = performance.now() - t0;
    // Consume acc so the loop isn't optimized away.
    if (acc < 0) return;
    if (msRef.current) msRef.current.textContent = ms.toFixed(2);
    if (opsRef.current) opsRef.current.textContent = OPS.toLocaleString();
  }, []);

  const [opsBefore, opsAfter] = opsLabel.split("{ops}");

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-[clamp(26px,4vw,40px)] text-center">
      <div className="text-[11.5px] uppercase tracking-[0.06em] text-muted">
        {cardLabel}
      </div>
      <div className="my-[14px] flex items-baseline justify-center gap-2">
        <span
          ref={msRef}
          className="tnum text-[clamp(44px,8vw,72px)] font-semibold tracking-[-0.02em] text-primary"
        >
          0.00
        </span>
        <span className="text-[20px] text-muted">{unit}</span>
      </div>
      <div className="text-[12px] text-faint">
        {opsBefore}
        <span ref={opsRef}>0</span>
        {opsAfter}
      </div>
    </div>
  );
}
