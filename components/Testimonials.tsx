"use client";

import { siteConfig } from "@/data/siteConfig";

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-bg px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-12 text-center" data-reveal>
          <p className="eyebrow justify-center">Testimonials</p>
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] font-bold tracking-tight">
            What Our Customers Say
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {siteConfig.testimonials.map((t) => (
            <article
              key={t.name}
              className="flex flex-col rounded-[22px] border border-white/10 bg-card p-7 transition hover:-translate-y-0.5 hover:border-white/16"
              data-reveal
            >
              <div className="mb-4 tracking-[2px] text-accent" aria-label="5 stars">
                ★★★★★
              </div>
              <q className="mb-8 flex-1 text-[1.05rem]">{t.quote}</q>
              <footer className="text-sm text-white/50">
                <strong className="block text-white">{t.name}</strong>
                {t.place}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
