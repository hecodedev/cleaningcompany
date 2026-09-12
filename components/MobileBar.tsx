"use client";

import { siteConfig } from "@/data/siteConfig";
import { useQuote } from "@/lib/quote-context";

export default function MobileBar() {
  const { setOpen } = useQuote();

  return (
    <div className="fixed right-3 bottom-3 left-3 z-[18] grid grid-cols-[1fr_1.2fr] gap-2 rounded-[18px] border border-white/10 bg-[#0a0a0a]/88 p-2 backdrop-blur-xl md:hidden">
      <a className="btn btn-ghost" href={siteConfig.phoneHref}>
        Call
      </a>
      <button className="btn btn-accent" type="button" onClick={() => setOpen(true)}>
        Get a quote
      </button>
    </div>
  );
}
