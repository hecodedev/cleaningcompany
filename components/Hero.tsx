"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/data/siteConfig";
import { useQuote } from "@/lib/quote-context";
import "@/app/hero.css";

export default function Hero() {
  const { setOpen } = useQuote();
  const pinRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const media = mediaRef.current;
    const video = videoRef.current;
    const fallback = fallbackRef.current;
    if (!pin || !media) return;

    let hasVideo = false;
    let seeking = false;
    let targetTime = 0;
    let displayTime = 0;
    let targetProgress = 0;
    let displayProgress = 0;
    let rafId = 0;
    let blobUrl: string | null = null;
    const hero = siteConfig.hero;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hero.poster && fallback) {
      fallback.classList.add("has-poster");
      fallback.style.backgroundImage = `linear-gradient(180deg, rgba(8,8,8,.18), rgba(8,8,8,.42)), url("${hero.poster}")`;
      fallback.style.backgroundSize = "cover";
      fallback.style.backgroundPosition = "center";
    }

    const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
    const smoothstep = (t: number) => t * t * (3 - 2 * t);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const readProgress = () => {
      const rect = pin.getBoundingClientRect();
      const total = Math.max(pin.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      return { scrolled, total, progress: scrolled / total };
    };

    const applyVisuals = (progress: number, scrolled: number, total: number) => {
      media.style.transform = `scale(${1 + progress * 0.1}) translate3d(0, ${progress * 1.5}%, 0)`;
      if (sheenRef.current) sheenRef.current.style.transform = `translate3d(${progress * 14}%, 0, 0)`;

      const introOut = smoothstep(clamp01(scrolled / 360));
      const endIn = smoothstep(clamp01((scrolled - (total - 160)) / 160));

      if (introRef.current) {
        introRef.current.style.opacity = String(1 - introOut);
        introRef.current.style.transform = `translate3d(0, ${introOut * -28}px, 0)`;
        introRef.current.style.pointerEvents = introOut > 0.8 ? "none" : "auto";
      }
      if (endRef.current) {
        endRef.current.style.opacity = String(endIn);
        endRef.current.style.transform = `translate3d(0, ${(1 - endIn) * 14}px, 0)`;
        endRef.current.style.pointerEvents = endIn > 0.55 ? "auto" : "none";
      }
      if (hintRef.current) hintRef.current.style.opacity = String(1 - endIn);

      const inHero = scrolled > 1 && scrolled < total - 1;
      document.documentElement.classList.toggle("hero-scrolling", inHero);
    };

    const tick = () => {
      const { scrolled, total, progress } = readProgress();
      targetProgress = progress;

      const ease = reduceMotion ? 1 : 0.08;
      displayProgress = lerp(displayProgress, targetProgress, ease);
      applyVisuals(displayProgress, scrolled, total);

      if (hasVideo && video && video.readyState >= 2) {
        const duration = video.duration;
        targetTime = Math.min(displayProgress * duration * 0.985, Math.max(duration - 0.04, 0));
        displayTime = lerp(displayTime, targetTime, reduceMotion ? 1 : 0.12);

        const delta = Math.abs(video.currentTime - displayTime);
        if (!seeking && delta > 0.035) {
          seeking = true;
          try {
            video.currentTime = displayTime;
          } catch {
            seeking = false;
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const onSeeked = () => {
      seeking = false;
    };

    const onError = () => {
      hasVideo = false;
      media.classList.remove("has-video");
    };

    const arm = () => {
      if (!video) return;
      const duration = video.duration;
      hasVideo = Number.isFinite(duration) && duration > 0;
      if (!hasVideo) return;
      media.classList.add("has-video");
      pin.style.height = `${Math.max(185, 110 + duration * 16)}vh`;
      video.pause();
      const { progress } = readProgress();
      targetProgress = progress;
      displayProgress = progress;
      targetTime = Math.min(progress * duration * 0.985, 0);
      displayTime = video.currentTime || 0;
    };

    if (video && hero.video) {
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      if (hero.poster) video.poster = hero.poster;

      video.addEventListener("loadedmetadata", arm);
      video.addEventListener("canplay", arm, { once: true });
      video.addEventListener("seeked", onSeeked);
      video.addEventListener("error", onError);

      const attach = (url: string) => {
        video.src = url;
        video.load();
      };

      fetch(hero.video)
        .then((res) => {
          if (!res.ok) throw new Error("hero video missing");
          return res.blob();
        })
        .then((blob) => {
          blobUrl = URL.createObjectURL(blob);
          attach(blobUrl);
        })
        .catch(() => attach(hero.video));
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("hero-scrolling");
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      if (video) {
        video.removeEventListener("loadedmetadata", arm);
        video.removeEventListener("seeked", onSeeked);
        video.removeEventListener("error", onError);
      }
    };
  }, []);

  const { hero, phone, phoneHref } = siteConfig;

  return (
    <section className="hero-pin" id="top" ref={pinRef}>
      <div className="hero-sticky">
        <div className="hero-media" ref={mediaRef}>
          <video className="hero-video" ref={videoRef} muted playsInline preload="auto" />
          <div className="hero-fallback" ref={fallbackRef} aria-hidden="true">
            <div className="hero-orb hero-orb-a" />
            <div className="hero-orb hero-orb-b" />
            <div className="hero-sheen" ref={sheenRef} />
          </div>
          <div className="hero-vignette" />
        </div>

        <div className="hero-copy">
          <div className="hero-intro" ref={introRef}>
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>
              <span>{hero.line1}</span>
              <span className="hero-line-accent">{hero.line2}</span>
            </h1>
          </div>
          <div className="hero-end" ref={endRef}>
            <p className="hero-sub">{hero.sub}</p>
            <div className="hero-cta">
              <button className="btn btn-accent btn-lg" type="button" onClick={() => setOpen(true)}>
                Get a free quote
              </button>
              <a className="btn btn-ghost btn-lg" href={phoneHref}>
                {phone}
              </a>
            </div>
          </div>
        </div>

        <div className="scroll-hint" ref={hintRef} aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  );
}
