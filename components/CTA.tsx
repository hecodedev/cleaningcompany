"use client";

import { siteConfig } from "@/data/siteConfig";
import { useQuote } from "@/lib/quote-context";

export default function CTA() {
  const { setOpen } = useQuote();
  const { cta, phone, phoneHref } = siteConfig;

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 px-5 py-28 md:px-8">
      <img src={cta.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#070b08]/78" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,rgba(61,220,132,0.28),transparent_60%)]" />
      <div className="relative mx-auto max-w-[800px] text-center" data-reveal>
        <p className="eyebrow justify-center">Ready to get started?</p>
        <h2 className="font-display mb-4 text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] font-bold tracking-tight">
          {cta.heading}
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-white/65">{cta.text}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button className="btn btn-accent btn-lg" type="button" onClick={() => setOpen(true)}>
            Get a Free Quote
          </button>
          <a className="btn btn-ghost btn-lg" href={phoneHref}>
            Call Us · {phone}
          </a>
        </div>
      </div>
    </section>
  );
}
