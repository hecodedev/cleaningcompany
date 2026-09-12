"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/data/siteConfig";
import { useQuote } from "@/lib/quote-context";
import "@/app/hero.css";

/**
 * Mobile scrub notes:
 * - Source must be H.264 + faststart (moov at front) or iOS/Android can't seek while buffering.
 * - First touch/scroll must unlock the video with a muted play() → pause().
 * - Prefer blob URL when possible so seeking works even before full CDN buffer.
 */
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
    if (!pin || !media || !video) return;

    let hasVideo = false;
    let unlocked = false;
    let seeking = false;
    let seekUnlock: number | undefined;
    let targetTime = 0;
    let displayTime = 0;
    let targetProgress = 0;
    let displayProgress = 0;
    let rafId = 0;
    let blobUrl: string | null = null;
    const hero = siteConfig.hero;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse =
      window.matchMedia("(pointer: coarse)").matches ||
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (hero.poster && fallback) {
      fallback.classList.add("has-poster");
      fallback.style.backgroundColor = "#050505";
      fallback.style.backgroundImage = `url("${hero.poster}")`;
      fallback.style.backgroundSize = "cover";
      fallback.style.backgroundPosition = "center 72%";
      fallback.style.backgroundRepeat = "no-repeat";
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
      media.style.transform = "none";
      if (sheenRef.current) {
        sheenRef.current.style.transform = `translate3d(${progress * 8}%, 0, 0)`;
      }

      const introOut = smoothstep(clamp01(scrolled / 380));
      const endIn = smoothstep(clamp01((scrolled - (total - 180)) / 180));

      if (introRef.current) {
        introRef.current.style.opacity = String(1 - introOut);
        introRef.current.style.transform = `translate3d(0, ${introOut * -24}px, 0)`;
        introRef.current.style.pointerEvents = introOut > 0.8 ? "none" : "auto";
      }
      if (endRef.current) {
        endRef.current.style.opacity = String(endIn);
        endRef.current.style.transform = `translate3d(0, ${(1 - endIn) * 12}px, 0)`;
        endRef.current.style.pointerEvents = endIn > 0.55 ? "auto" : "none";
      }
      if (hintRef.current) hintRef.current.style.opacity = String(1 - endIn);

      document.documentElement.classList.toggle(
        "hero-scrolling",
        scrolled > 1 && scrolled < total - 1
      );
    };

    const unlockSeekFlag = () => {
      seeking = false;
      if (seekUnlock) window.clearTimeout(seekUnlock);
      seekUnlock = undefined;
    };

    const unlockPlayback = async () => {
      if (unlocked || !video) return;
      unlocked = true;
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        await video.play();
        video.pause();
      } catch {
        unlocked = false;
      }
    };

    const canSeek = () => {
      if (!video) return false;
      if (video.readyState < 1) return false;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return false;
      // Seekable range grows as bytes arrive — blob URL usually has full range immediately
      if (video.seekable.length > 0 && video.seekable.end(0) > 0.2) return true;
      return video.readyState >= 3;
    };

    const syncVideo = () => {
      if (!hasVideo || !video || !canSeek()) return;
      const duration = video.duration;
      targetTime = Math.min(displayProgress * duration * 0.985, Math.max(duration - 0.04, 0));
      const timeEase = reduceMotion ? 1 : coarse ? 0.35 : 0.08;
      displayTime = lerp(displayTime, targetTime, timeEase);

      const delta = Math.abs(video.currentTime - displayTime);
      const threshold = coarse ? 0.016 : 0.035;
      if (!seeking && delta > threshold) {
        seeking = true;
        if (seekUnlock) window.clearTimeout(seekUnlock);
        seekUnlock = window.setTimeout(unlockSeekFlag, coarse ? 70 : 140);
        try {
          video.currentTime = displayTime;
        } catch {
          unlockSeekFlag();
        }
      }
    };

    const tick = () => {
      const { scrolled, total, progress } = readProgress();
      targetProgress = progress;
      const ease = reduceMotion ? 1 : coarse ? 0.32 : 0.075;
      displayProgress = lerp(displayProgress, targetProgress, ease);
      applyVisuals(displayProgress, scrolled, total);
      syncVideo();
      rafId = requestAnimationFrame(tick);
    };

    const arm = () => {
      const duration = video.duration;
      hasVideo = Number.isFinite(duration) && duration > 0;
      if (!hasVideo) return;
      media.classList.add("has-video");
      const vh = coarse ? 260 + duration * 24 : 120 + duration * 18;
      pin.style.height = `${Math.max(coarse ? 280 : 190, vh)}vh`;
      void unlockPlayback();
      const { progress } = readProgress();
      targetProgress = progress;
      displayProgress = progress;
      displayTime = video.currentTime || 0;
    };

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("x5-playsinline", "");
    video.setAttribute("muted", "");
    video.preload = "auto";
    if (hero.poster) video.poster = hero.poster;

    video.addEventListener("loadedmetadata", arm);
    video.addEventListener("loadeddata", arm);
    video.addEventListener("canplay", arm);
    video.addEventListener("seeked", unlockSeekFlag);
    video.addEventListener("error", () => {
      hasVideo = false;
      media.classList.remove("has-video");
    });

    const attach = (url: string) => {
      if (video.getAttribute("src") === url) return;
      video.src = url;
      video.load();
    };

    // Direct H.264+faststart first (works on Vercel CDN with range requests)
    attach(hero.video);

    // Blob backup: full file in memory = reliable scrub on flaky mobile networks
    const controller = new AbortController();
    fetch(hero.video, { signal: controller.signal, cache: "force-cache" })
      .then((res) => {
        if (!res.ok) throw new Error("hero video missing");
        return res.blob();
      })
      .then((blob) => {
        if (!blob.type.includes("mp4") && blob.size < 1000) return;
        blobUrl = URL.createObjectURL(blob);
        const keepTime = video.currentTime || 0;
        attach(blobUrl);
        const restore = () => {
          if (keepTime > 0.05) {
            try {
              video.currentTime = keepTime;
            } catch {
              /* ignore */
            }
          }
          arm();
        };
        video.addEventListener("loadedmetadata", restore, { once: true });
      })
      .catch(() => {
        /* direct src remains */
      });

    const bump = () => {
      const { progress } = readProgress();
      targetProgress = progress;
      void unlockPlayback();
    };

    window.addEventListener("scroll", bump, { passive: true });
    window.addEventListener("touchstart", bump, { passive: true });
    window.addEventListener("touchmove", bump, { passive: true });
    window.addEventListener("wheel", bump, { passive: true });
    window.visualViewport?.addEventListener("scroll", bump, {
      passive: true,
    } as AddEventListenerOptions);
    window.addEventListener("resize", bump);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") void unlockPlayback();
    });

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      controller.abort();
      if (seekUnlock) window.clearTimeout(seekUnlock);
      document.documentElement.classList.remove("hero-scrolling");
      window.removeEventListener("scroll", bump);
      window.removeEventListener("touchstart", bump);
      window.removeEventListener("touchmove", bump);
      window.removeEventListener("wheel", bump);
      window.visualViewport?.removeEventListener("scroll", bump);
      window.removeEventListener("resize", bump);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  const { hero, phone, phoneHref } = siteConfig;

  return (
    <section className="hero-pin" id="top" ref={pinRef}>
      <div className="hero-sticky">
        <div className="hero-media" ref={mediaRef}>
          <video
            className="hero-video"
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster={hero.poster || undefined}
          />
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
