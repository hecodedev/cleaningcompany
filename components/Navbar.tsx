"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { useQuote } from "@/lib/quote-context";

export default function Navbar() {
  const { setOpen } = useQuote();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", menuOpen);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-20 flex h-[76px] items-center justify-between border-b px-4 transition-all duration-300 md:px-7 ${
          scrolled
            ? "border-white/10 bg-[#080808]/78 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="font-display inline-flex items-center gap-2.5 text-[15px] font-bold tracking-tight capitalize md:text-[17px]">
          <img src={siteConfig.logo} alt="" className="h-9 w-9 shrink-0" />
          <span className="max-w-[9.5rem] truncate sm:max-w-none">{siteConfig.companyName}</span>
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-7 text-[15px] text-white/70 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="btn btn-accent" type="button" onClick={() => setOpen(true)}>
            Get a Free Quote
          </button>
          <button
            className="relative h-10 w-10 md:hidden"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`absolute right-2.5 left-2.5 h-px bg-white transition ${menuOpen ? "top-5 rotate-45" : "top-3.5"}`} />
            <span className={`absolute right-2.5 left-2.5 h-px bg-white transition ${menuOpen ? "top-5 -rotate-45" : "top-6"}`} />
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-x-0 top-[76px] z-[19] flex flex-col gap-2 bg-[#080808]/96 px-7 py-6 backdrop-blur-xl md:hidden">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={close} className="font-display py-2 text-2xl font-semibold">
              {item.label}
            </a>
          ))}
          <button
            className="btn btn-accent mt-4"
            type="button"
            onClick={() => {
              close();
              setOpen(true);
            }}
          >
            Get a Free Quote
          </button>
        </div>
      ) : null}
    </>
  );
}
