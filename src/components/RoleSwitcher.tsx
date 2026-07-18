"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { RoleSwitcher as RoleSwitcherContent } from "@/content/types";

/** Capability-based rendering demo: switching a role re-renders the synthetic
 *  panel set. Panels animate in/out (Framer Motion). */
export default function RoleSwitcher({ data }: { data: RoleSwitcherContent }) {
  const [role, setRole] = useState(data.roles[0]?.id ?? "");
  const panels = data.panels.filter((p) => p.roles.includes(role));

  return (
    <div
      data-reveal
      className="mt-[clamp(56px,8vh,84px)] rounded-2xl border border-hairline bg-surface p-[clamp(20px,4vw,34px)]"
    >
      <div className="mb-[22px] flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <div className="text-[clamp(19px,2.4vw,24px)] font-semibold tracking-[-0.02em]">
            {data.title}
          </div>
          <p className="mb-0 mt-2 max-w-[56ch] text-[15.5px] text-muted">
            {data.body}
          </p>
        </div>
        <span className="whitespace-nowrap rounded-full border border-hairline px-3 py-[5px] text-[11px] text-faint">
          {data.pill}
        </span>
      </div>

      {/* Role buttons */}
      <div className="mb-[22px] flex gap-[10px] max-[820px]:flex-col">
        {data.roles.map((r) => {
          const active = r.id === role;
          return (
            <button
              key={r.id}
              type="button"
              aria-pressed={active}
              onClick={() => setRole(r.id)}
              className="flex-1 rounded-[10px] border px-4 py-3 text-[14.5px] tracking-[-0.01em] transition-all"
              style={{
                borderColor: active ? "var(--accent)" : "var(--hairline)",
                background: active ? "var(--accent-soft)" : "var(--bg-surface-2)",
                color: active ? "var(--accent)" : "var(--text-muted)",
                fontWeight: active ? 700 : 500,
              }}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      {/* Panels */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[14px]">
        <AnimatePresence mode="popLayout">
          {panels.map((panel) => (
            <motion.div
              key={panel.title}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
              className="rounded-[12px] border border-hairline bg-surface-2 px-[18px] py-4"
            >
              <div className="flex items-center gap-2 text-[14.5px] font-semibold tracking-[-0.01em]">
                <span className="inline-block h-[7px] w-[7px] rounded-[2px] bg-accent" />
                {panel.title}
              </div>
              <div className="mt-2 text-[13px] text-muted">{panel.meta}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
