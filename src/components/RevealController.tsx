"use client";

import { useEffect } from "react";

/**
 * Single IntersectionObserver over every [data-reveal] element on the page
 * (mirrors the prototype: threshold 0.12, bottom rootMargin -8%). Lets the
 * sections stay server components — they just add the `data-reveal` attribute.
 * Phase B swaps this for GSAP ScrollTrigger.
 */
export default function RevealController() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
