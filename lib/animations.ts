"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function revealBatch(root: HTMLElement) {
  registerGsap();
  if (prefersReducedMotion()) {
    gsap.set(root.querySelectorAll("[data-reveal]"), { opacity: 1, y: 0 });
    return;
  }

  const items = root.querySelectorAll<HTMLElement>("[data-reveal]");
  items.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
        },
      }
    );
  });
}
