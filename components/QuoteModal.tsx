"use client";

import { FormEvent, useEffect, useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { useQuote } from "@/lib/quote-context";

export default function QuoteModal() {
  const { open, setOpen } = useQuote();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    if (!open) setSent(false);
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  if (!open) return null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (siteConfig.form.endpoint) {
      try {
        await fetch(siteConfig.form.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
      } catch {
        /* demo */
      }
    }
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-40">
      <button className="absolute inset-0 bg-black/72" aria-label="Close" onClick={() => setOpen(false)} />
      <div className="relative mx-auto mt-4 max-h-[calc(100vh-32px)] w-[min(640px,calc(100%-24px))] overflow-auto rounded-[28px] border border-white/10 bg-[#101010] p-8 shadow-2xl">
        <button className="absolute top-4 right-5 text-2xl text-white/50" type="button" onClick={() => setOpen(false)} aria-label="Close">
          ×
        </button>
        <p className="eyebrow">Free quote</p>
        <h2 className="font-display mb-2 text-3xl font-bold tracking-tight">Tell us what you need</h2>
        <p className="text-muted mb-6">We’ll get back to you quickly with a clear price.</p>
        {sent ? (
          <div>
            <h3 className="font-display mb-2 text-xl">Request received</h3>
            <p className="text-muted mb-5">Thanks — we’ll be in touch shortly.</p>
            <button className="btn btn-accent" type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        ) : (
          <form className="grid grid-cols-1 gap-3.5 sm:grid-cols-2" onSubmit={onSubmit}>
            <label className="flex flex-col gap-2 text-sm text-white/55">
              Full name
              <input required name="name" autoComplete="name" className="rounded-2xl border border-white/10 bg-[#0b0b0b] px-3.5 py-3 text-white outline-none focus:border-accent/50" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/55">
              Phone
              <input required name="phone" type="tel" autoComplete="tel" className="rounded-2xl border border-white/10 bg-[#0b0b0b] px-3.5 py-3 text-white outline-none focus:border-accent/50" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/55">
              Email
              <input name="email" type="email" autoComplete="email" className="rounded-2xl border border-white/10 bg-[#0b0b0b] px-3.5 py-3 text-white outline-none focus:border-accent/50" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/55">
              Service
              <select required name="service" defaultValue="" className="rounded-2xl border border-white/10 bg-[#0b0b0b] px-3.5 py-3 text-white outline-none focus:border-accent/50">
                <option value="" disabled>
                  Select a service
                </option>
                {siteConfig.services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/55 sm:col-span-2">
              Suburb
              <input name="suburb" placeholder="e.g. Bondi" className="rounded-2xl border border-white/10 bg-[#0b0b0b] px-3.5 py-3 text-white outline-none focus:border-accent/50" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/55 sm:col-span-2">
              Message
              <textarea name="message" rows={4} placeholder="Property size, timing, anything we should know" className="rounded-2xl border border-white/10 bg-[#0b0b0b] px-3.5 py-3 text-white outline-none focus:border-accent/50" />
            </label>
            <button className="btn btn-accent btn-lg sm:col-span-2" type="submit">
              Request a quote
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
