"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-bg px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[820px]">
        <div className="mb-10" data-reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <div data-reveal>
          {siteConfig.faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-white/10">
                <button
                  type="button"
                  className="font-display flex w-full items-center justify-between gap-5 py-5 text-left text-lg font-semibold"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {item.q}
                  <span className="text-accent">{isOpen ? "–" : "+"}</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="pb-5 text-white/55">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
