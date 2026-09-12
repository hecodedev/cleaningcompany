"use client";

import { useRef, useState } from "react";
import { siteConfig } from "@/data/siteConfig";

export default function BeforeAfter() {
  const { beforeAfter } = siteConfig;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  };

  return (
    <section className="bg-bg-elevated px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-10 max-w-xl" data-reveal>
          <p className="eyebrow">Results</p>
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] font-bold tracking-tight">
            {beforeAfter.heading}
          </h2>
          <p className="mt-3 text-white/55">{beforeAfter.sub}</p>
        </div>

        <div
          ref={wrapRef}
          className="relative aspect-[16/10] cursor-ew-resize overflow-hidden rounded-[28px] border border-white/10 select-none"
          data-reveal
          onPointerDown={(e) => {
            dragging.current = true;
            (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
            setFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (dragging.current) setFromClientX(e.clientX);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
        >
          <img src={beforeAfter.after} alt="After professional cleaning" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={beforeAfter.before} alt="Before professional cleaning" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-y-0 z-10 w-0.5 bg-white" style={{ left: `${pos}%` }}>
            <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white text-black shadow-lg">
              ⟷
            </span>
          </div>
          <span className="absolute top-4 left-4 rounded-full bg-black/55 px-3 py-1 text-xs tracking-wide uppercase">Before</span>
          <span className="absolute top-4 right-4 rounded-full bg-accent px-3 py-1 text-xs tracking-wide text-accent-ink uppercase">After</span>
        </div>
      </div>
    </section>
  );
}
