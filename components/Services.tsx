"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { useQuote } from "@/lib/quote-context";

export default function Services() {
  const { setOpen } = useQuote();
  const [filter, setFilter] = useState<(typeof siteConfig.serviceCategories)[number]>("All");

  const items = useMemo(
    () =>
      filter === "All"
        ? siteConfig.services
        : siteConfig.services.filter((s) => s.category === filter),
    [filter]
  );

  return (
    <section id="services" className="bg-bg px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
          <div className="max-w-xl">
            <p className="eyebrow">{siteConfig.servicesIntro.eyebrow}</p>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] font-bold tracking-tight">
              {siteConfig.servicesIntro.heading}
            </h2>
          </div>
          <p className="max-w-md text-white/55">{siteConfig.servicesIntro.text}</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2" data-reveal>
          {siteConfig.serviceCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === cat
                  ? "bg-accent text-accent-ink"
                  : "border border-white/10 bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setOpen(true)}
              className="group relative aspect-[4/5] overflow-hidden rounded-[22px] border border-white/10 bg-card text-left"
              data-reveal
            >
              <img
                src={service.image}
                alt={service.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <span className="absolute top-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] tracking-wide text-white/80 backdrop-blur-sm">
                {service.category}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{service.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-white/70">{service.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{service.price}</p>
                  <span className="rounded-full border border-white/25 bg-black/30 p-2 text-white transition group-hover:border-accent group-hover:text-accent">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
