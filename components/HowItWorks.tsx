"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Calendar, Home, Sparkles, Coffee } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { prefersReducedMotion, registerGsap } from "@/lib/animations";

const icons = [Calendar, Home, Sparkles, Coffee];

export default function HowItWorks() {
  const { process } = siteConfig;
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const steps = root.querySelectorAll("[data-step]");
    gsap.fromTo(
      steps,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 75%" },
      }
    );
  }, []);

  return (
    <section id="process" ref={rootRef} className="bg-bg px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[1120px] text-center">
        <div data-reveal>
          <p className="eyebrow justify-center">{process.eyebrow}</p>
          <h2 className="font-display mx-auto max-w-3xl text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] font-bold tracking-tight">
            {process.heading}
          </h2>
        </div>

        <ol className="relative mt-16 grid gap-8 md:grid-cols-4">
          <svg
            className="pointer-events-none absolute top-8 right-[8%] left-[8%] hidden h-10 w-[84%] text-accent/45 md:block"
            viewBox="0 0 800 40"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 20 C 120 0, 200 40, 300 20 S 500 0, 600 20 720 40, 800 20" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {process.steps.map((step, i) => {
            const Icon = icons[i] || Sparkles;
            return (
              <li key={step.step} className="relative px-2" data-step data-reveal>
                <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                  <Icon size={22} />
                </span>
                <p className="mb-2 font-display text-sm font-bold text-accent">{step.step}</p>
                <h3 className="font-display mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-sm text-white/55">{step.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
