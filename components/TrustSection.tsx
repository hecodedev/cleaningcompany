"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { siteConfig } from "@/data/siteConfig";
import { prefersReducedMotion, registerGsap } from "@/lib/animations";

export default function TrustSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const counters = root.querySelectorAll<HTMLElement>("[data-count]");
    counters.forEach((el) => {
      const target = Number(el.dataset.count);
      const decimals = Number(el.dataset.decimals || 0);
      const suffix = el.dataset.suffix || "";
      if (prefersReducedMotion()) {
        el.textContent = `${target.toFixed(decimals)}${suffix}`;
        return;
      }
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: () => {
          el.textContent = `${obj.val.toFixed(decimals)}${suffix}`;
        },
      });
    });

    return () => {
      gsap.killTweensOf(counters);
    };
  }, []);

  const { trust } = siteConfig;

  return (
    <section id="about" ref={rootRef} className="bg-[#F6F6F4] px-5 py-20 text-[#121212] md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-[28px]" data-reveal>
          <img src={trust.image} alt="A freshly cleaned living room" className="h-full min-h-[320px] w-full object-cover" />
        </div>
        <div data-reveal>
          <p className="eyebrow !text-emerald-700">{trust.eyebrow}</p>
          <h2 className="font-display mb-4 text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] font-bold tracking-tight">
            {trust.heading}
          </h2>
          <p className="max-w-lg text-[#4a4a4a]">{trust.text}</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {trust.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-black/8 bg-white px-3 py-5 text-center shadow-sm">
                <strong className="font-display block text-[clamp(1.6rem,3vw,2.4rem)] tracking-tight" data-count={stat.value} data-suffix={stat.suffix} data-decimals={stat.decimals || 0}>
                  0{stat.suffix}
                </strong>
                <span className="text-sm text-[#666]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
