(() => {
  const site = window.SITE;
  if (!site) return;

  const icons = {
    spark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6.2 6.2l2.1 2.1M15.7 15.7l2.1 2.1M17.8 6.2l-2.1 2.1M8.3 15.7l-2.1 2.1"/><circle cx="12" cy="12" r="3.2"/></svg>`,
    wrench: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.7 6.3a4.5 4.5 0 0 0-6.3 6.1L4 16.8 7.2 20l4.4-4.4a4.5 4.5 0 0 0 6.1-6.3l-3 3-2.8-2.8 3-3z"/></svg>`,
    leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 19s1-9 14-14c0 0-1 13-8 16-4 1.7-6-2-6-2z"/><path d="M9 13c3-3 6-5 10-7"/></svg>`,
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    return {
      r: parseInt(n.slice(0, 2), 16),
      g: parseInt(n.slice(2, 4), 16),
      b: parseInt(n.slice(4, 6), 16),
    };
  }

  function contrastInk(hex) {
    const { r, g, b } = hexToRgb(hex);
    const y = (r * 299 + g * 587 + b * 114) / 1000;
    return y > 160 ? "#0b1a12" : "#f4fff8";
  }

  function applyBrand() {
    const root = document.documentElement;
    const c = site.colors;
    root.style.setProperty("--accent", c.accentHex);
    root.style.setProperty("--accent-ink", contrastInk(c.accentHex));
    root.style.setProperty("--bg", c.bg);
    root.style.setProperty("--bg-elevated", c.bgElevated);
    root.style.setProperty("--card", c.card);
    root.style.setProperty("--text", c.text);
    root.style.setProperty("--muted", c.muted);
    root.style.setProperty("--border", c.border);

    document.title = `${site.brand.name} — Premium home services in ${site.contact.city}`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        `${site.hero.sub} Serving ${site.contact.city}. Call ${site.contact.phone}.`
      );
    }

    $$("[data-brand-name]").forEach((el) => {
      el.textContent = site.brand.name;
    });
    $$("[data-logo]").forEach((img) => {
      img.src = site.brand.logo;
      img.alt = site.brand.name;
    });
    $$("[data-phone]").forEach((el) => {
      el.textContent = site.contact.phone;
    });
    $$("[data-phone-link]").forEach((el) => {
      el.href = site.contact.phoneHref;
    });
    $$("[data-email]").forEach((el) => {
      el.textContent = site.contact.email;
    });
    $$("[data-email-link]").forEach((el) => {
      el.href = `mailto:${site.contact.email}`;
    });
    $$("[data-city]").forEach((el) => {
      el.textContent = site.contact.city;
    });
    $$("[data-hours]").forEach((el) => {
      el.textContent = site.contact.hours;
    });
    $$("[data-address]").forEach((el) => {
      el.textContent = site.contact.address;
    });
    $$("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });

    $("[data-hero-eyebrow]").textContent = site.hero.eyebrow;
    $("[data-hero-line1]").textContent = site.hero.line1;
    $("[data-hero-line2]").textContent = site.hero.line2;
    $("[data-hero-sub]").textContent = site.hero.sub;

    const fav = document.querySelector('link[rel="icon"]');
    if (fav) fav.href = site.brand.favicon || site.brand.logo;
  }

  function renderServices() {
    const grid = $("[data-services]");
    const footer = $("[data-footer-services]");
    const select = $("[data-service-select]");
    if (!grid) return;

    grid.innerHTML = site.services
      .map((service, i) => {
        const icon = icons[service.icon] || icons.spark;
        const delay = `${i * 90}ms`;
        const media = service.image
          ? `<img src="${service.image}" alt="${service.name}" />`
          : `<div class="service-icon">${icon}</div>`;
        return `
          <article class="service-card" style="transition-delay:${delay}">
            <em>0${i + 1}</em>
            <div class="service-media">${media}</div>
            <div class="service-body">
              ${service.image ? `<div class="service-icon">${icon}</div>` : ""}
              <h3>${service.name}</h3>
              <p>${service.short}</p>
            </div>
          </article>
        `;
      })
      .join("");

    if (footer) {
      footer.innerHTML = site.services
        .map((s) => `<a href="#services">${s.name}</a>`)
        .join("");
    }

    if (select) {
      select.innerHTML =
        `<option value="" disabled selected>Select a service</option>` +
        site.services.map((s) => `<option value="${s.name}">${s.name}</option>`).join("");
    }
  }

  function renderStats() {
    const row = $("[data-stats]");
    if (!row) return;
    row.innerHTML = site.stats
      .map(
        (s) => `<div class="stat reveal"><strong>${s.value}</strong><span>${s.label}</span></div>`
      )
      .join("");
  }

  function renderProcess() {
    const row = $("[data-process]");
    if (!row) return;
    row.innerHTML = site.process
      .map(
        (step) => `
        <li class="process-step reveal">
          <span class="process-num">${step.step}</span>
          <h3>${step.title}</h3>
          <p>${step.text}</p>
        </li>`
      )
      .join("");
  }

  function renderReviews() {
    const grid = $("[data-reviews]");
    if (!grid) return;
    grid.innerHTML = site.testimonials
      .map(
        (t) => `
        <article class="review-card reveal">
          <div class="stars" aria-label="5 stars">★★★★★</div>
          <q>${t.quote}</q>
          <footer>
            <strong>${t.name}</strong>
            ${t.place}
          </footer>
        </article>`
      )
      .join("");
  }

  function renderAreas() {
    const list = $("[data-areas]");
    const pins = $("[data-map-pins]");
    if (list) {
      list.innerHTML = site.areas.map((area) => `<li>${area}</li>`).join("");
    }
    if (pins) {
      const spots = [
        [210, 150],
        [250, 120],
        [180, 110],
        [270, 180],
        [160, 190],
        [230, 210],
        [140, 140],
        [300, 150],
        [200, 80],
        [190, 230],
      ];
      pins.innerHTML = site.areas
        .slice(0, spots.length)
        .map((area, i) => {
          const [x, y] = spots[i];
          return `<circle class="map-pin" cx="${x}" cy="${y}" r="${i === 0 ? 5.5 : 3.6}"><title>${area}</title></circle>`;
        })
        .join("");
    }
  }

  function renderFaqs() {
    const list = $("[data-faqs]");
    if (!list) return;
    list.innerHTML = site.faqs
      .map(
        (item, i) => `
        <div class="faq-item${i === 0 ? " is-open" : ""}">
          <button type="button" aria-expanded="${i === 0}">${item.q}</button>
          <p>${item.a}</p>
        </div>`
      )
      .join("");

    list.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const item = btn.parentElement;
      const open = item.classList.contains("is-open");
      $$(".faq-item", list).forEach((el) => {
        el.classList.remove("is-open");
        $("button", el).setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  }

  function observeReveals() {
    const nodes = $$(".reveal, .service-card");
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((el) => io.observe(el));
  }

  function setupNav() {
    const nav = $("[data-nav]");
    const burger = $("[data-menu-toggle]");
    const menu = $("[data-mobile-menu]");

    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const closeMenu = () => {
      menu.hidden = true;
      burger.classList.remove("is-open");
      document.body.classList.remove("is-locked");
    };

    burger.addEventListener("click", () => {
      const open = menu.hidden;
      menu.hidden = !open;
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("is-locked", open);
    });

    menu.addEventListener("click", (e) => {
      if (e.target.closest("a, button")) closeMenu();
    });

    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });
  }

  function setupQuote() {
    const modal = $("[data-modal]");
    const form = $("[data-quote-form]");
    const success = $("[data-quote-success]");

    const open = () => {
      modal.hidden = false;
      document.body.classList.add("is-locked");
      $("[data-mobile-menu]").hidden = true;
      $("[data-menu-toggle]").classList.remove("is-open");
      const first = $('input[name="name"]', form);
      if (first) first.focus();
    };

    const close = () => {
      modal.hidden = true;
      document.body.classList.remove("is-locked");
    };

    $$("[data-open-quote]").forEach((btn) => btn.addEventListener("click", open));
    $$("[data-close-quote]").forEach((btn) => btn.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) close();
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const endpoint = site.form?.endpoint;

      if (endpoint) {
        try {
          await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(data),
          });
        } catch (err) {
          console.warn("Quote form endpoint failed", err);
        }
      }

      form.hidden = true;
      success.hidden = false;
    });
  }

  function setupHeroScroll() {
    const pin = $("[data-hero-pin]");
    const media = $("[data-hero-media]");
    const video = $("[data-hero-video]");
    const fallback = $("[data-hero-fallback]");
    const sheen = $("[data-hero-sheen]");
    const intro = $("[data-hero-intro]");
    const endCopy = $("[data-hero-end]");
    const hint = $(".scroll-hint");
    if (!pin || !media) return;

    let hasVideo = false;
    let seeking = false;
    let targetTime = 0;
    let ticking = false;

    if (site.hero.poster && fallback) {
      fallback.classList.add("has-poster");
      fallback.style.backgroundImage = `linear-gradient(180deg, rgba(8,8,8,.18), rgba(8,8,8,.42)), url("${site.hero.poster}")`;
      fallback.style.backgroundSize = "cover";
      fallback.style.backgroundPosition = "center";
    }

    const src = site.hero.video;
    if (src && video) {
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      if (site.hero.poster) video.poster = site.hero.poster;

      const arm = () => {
        const duration = video.duration;
        hasVideo = Number.isFinite(duration) && duration > 0;
        if (!hasVideo) return;
        media.classList.add("has-video");
        pin.style.height = `${Math.max(185, 110 + duration * 16)}vh`;
        video.pause();
        update();
      };

      video.addEventListener("loadedmetadata", arm);
      video.addEventListener("canplay", arm, { once: true });
      video.addEventListener("seeking", () => {
        seeking = true;
        window.setTimeout(() => {
          seeking = false;
        }, 160);
      });
      video.addEventListener("seeked", () => {
        seeking = false;
        if (Math.abs(video.currentTime - targetTime) > 0.05) {
          video.currentTime = targetTime;
        }
      });
      video.addEventListener("error", () => {
        hasVideo = false;
        media.classList.remove("has-video");
      });

      const attach = (url) => {
        video.src = url;
        video.load();
      };

      fetch(src)
        .then((res) => {
          if (!res.ok) throw new Error("hero video missing");
          return res.blob();
        })
        .then((blob) => attach(URL.createObjectURL(blob)))
        .catch(() => attach(src));
    }

    const update = () => {
      ticking = false;
      const rect = pin.getBoundingClientRect();
      const total = Math.max(pin.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;

      media.style.transform = `scale(${1 + progress * 0.12}) translate3d(0, ${progress * 2}%, 0)`;
      if (sheen) sheen.style.transform = `translate3d(${progress * 18}%, 0, 0)`;

      const clamp01 = (n) => Math.min(1, Math.max(0, n));
      const smooth = (t) => t * t * (3 - 2 * t);
      const introOut = smooth(clamp01(scrolled / 360));
      const endIn = smooth(clamp01((scrolled - (total - 160)) / 160));

      if (intro) {
        intro.style.opacity = String(1 - introOut);
        intro.style.transform = `translate3d(0, ${introOut * -36}px, 0)`;
        intro.style.pointerEvents = introOut > 0.8 ? "none" : "auto";
      }

      if (endCopy) {
        endCopy.style.opacity = String(endIn);
        endCopy.style.transform = `translate3d(0, ${(1 - endIn) * 18}px, 0)`;
        endCopy.style.pointerEvents = endIn > 0.55 ? "auto" : "none";
      }

      if (hint) {
        hint.style.opacity = String(1 - endIn);
      }

      if (hasVideo && video.readyState >= 2) {
        targetTime = Math.min(progress * video.duration * 0.985, Math.max(video.duration - 0.05, 0));
        if (Math.abs(video.currentTime - targetTime) > 0.04) {
          if (!seeking) {
            try {
              video.currentTime = targetTime;
            } catch (_) {
              /* some browsers reject seek before ready */
            }
          }
        }
      }
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
  }

  applyBrand();
  renderServices();
  renderStats();
  renderProcess();
  renderReviews();
  renderAreas();
  renderFaqs();
  observeReveals();
  setupNav();
  setupQuote();
  setupHeroScroll();
})();
