"use client";

import { siteConfig } from "@/data/siteConfig";
import { useQuote } from "@/lib/quote-context";

export default function ServiceAreas() {
  const { setOpen } = useQuote();
  const { serviceAreas, city } = siteConfig;

  return (
    <section id="areas" className="bg-bg-elevated px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-[1120px] items-center gap-12 lg:grid-cols-2">
        <div data-reveal>
          <p className="eyebrow">Service areas</p>
          <h2 className="font-display mb-4 text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] font-bold tracking-tight">
            {serviceAreas.heading}
          </h2>
          <p className="max-w-lg text-white/55">{serviceAreas.text}</p>
          <ul className="mt-7 mb-7 flex flex-wrap gap-2.5">
            {serviceAreas.areas.map((area) => (
              <li
                key={area.name}
                className="rounded-full border border-white/10 bg-card px-3.5 py-2 text-sm text-white/75"
              >
                {area.name}
              </li>
            ))}
          </ul>
          <button className="btn btn-accent" type="button" onClick={() => setOpen(true)}>
            Check If We Serve Your Area
          </button>
        </div>

        <div
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d0d] shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          data-reveal
        >
          {/* Live Google Maps of Sydney — not an illustration */}
          <iframe
            title={`Google Map of ${city} service area`}
            src={serviceAreas.mapEmbed}
            className="aspect-[4/3] min-h-[320px] w-full border-0 grayscale-[15%] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          <p className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
            {city} & surrounds · Google Maps
          </p>
        </div>
      </div>
    </section>
  );
}
