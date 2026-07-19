"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Phase B motion controller (returns null). Lenis smooth scroll on its own rAF
 * loop (decoupled from the GSAP ticker), GSAP reveals for [data-reveal], the
 * timeline "draw" for [data-draw] bars, and Lenis-powered anchor scrolling.
 * Gated on prefers-reduced-motion, where CSS already renders everything final.
 *
 * Elements already near the viewport on load animate immediately; the rest
 * animate via ScrollTrigger as they scroll in. Cleanup kills triggers and Lenis
 * but never reverts the reveal tweens, so content is never left hidden (e.g.
 * across React StrictMode's dev double-invoke).
 */
export default function Motion() {
  useEffect(() => {
    // Safety net: if anything below throws, never leave content behind an
    // un-fired reveal — snap every animated element to its final state.
    const revealAll = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      document
        .querySelectorAll<HTMLElement>("[data-draw]")
        .forEach((el) => (el.style.transform = "none"));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    try {
      return setup();
    } catch {
      revealAll();
    }

    function setup() {
    gsap.registerPlugin(ScrollTrigger);

    // Lenis on its own rAF so the GSAP ticker drives tweens independently.
    const lenis = new Lenis({ duration: 1.05 });
    lenis.on("scroll", () => ScrollTrigger.update());
    let rafId = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    });

    const triggers: ScrollTrigger[] = [];
    const near = (el: HTMLElement) =>
      el.getBoundingClientRect().top < window.innerHeight * 0.9;

    const reveal = (el: HTMLElement) =>
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        overwrite: "auto",
      });

    const draw = (el: HTMLElement, i: number) =>
      gsap.to(el, {
        scaleX: 1,
        duration: 1,
        ease: "power3.out",
        delay: i * 0.07,
        overwrite: "auto",
      });

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (near(el)) reveal(el);
      else
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: () => reveal(el),
          }),
        );
    });

    document.querySelectorAll<HTMLElement>("[data-draw]").forEach((el, i) => {
      if (near(el)) draw(el, i);
      else
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 92%",
            once: true,
            onEnter: () => draw(el, i),
          }),
        );
    });

    ScrollTrigger.refresh();

    // In-page anchor links → Lenis smooth scroll with a sticky-nav offset.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.1 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      triggers.forEach((t) => t.kill());
      lenis.destroy();
    };
    }
  }, []);

  return null;
}
