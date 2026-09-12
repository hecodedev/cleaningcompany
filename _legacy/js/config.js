/**
 * ============================================================
 *  TEMPLATE CONFIG — edit this file to rebrand the whole site
 * ============================================================
 *  Swap these later: LOGO, NAME, COLORS, SERVICES, PHONE, CITY
 *  Images / videos can be dropped in /assets and referenced here.
 */
window.SITE = {
  brand: {
    name: "YourLogo",
    shortName: "YL",
    logo: "assets/logo.svg",
    favicon: "assets/logo.svg",
  },

  contact: {
    phone: "+61 2 0000 0000",
    phoneHref: "tel:+61200000000",
    email: "hello@yourlogo.com",
    city: "Sydney",
    address: "Sydney, NSW",
    hours: "Mon–Sat, 7:00am – 6:00pm",
  },

  /**
   * Accent drives buttons, links, glows, and highlights.
   * Change accentHex to recolor the entire template.
   */
  colors: {
    accentHex: "#3DDC84",
    bg: "#080808",
    bgElevated: "#101010",
    card: "#141414",
    text: "#F4F4F4",
    muted: "#8D8D8D",
    border: "rgba(255,255,255,0.08)",
  },

  hero: {
    eyebrow: "Premium home services",
    line1: "Your home.",
    line2: "Our expertise.",
    sub: "Professional, reliable care for a cleaner, safer, more comfortable home.",
    video: "assets/hero.mp4",
    poster: "assets/hero.jpg",
  },

  stats: [
    { value: "10+", label: "Years experience" },
    { value: "500+", label: "Jobs completed" },
    { value: "4.9★", label: "Average rating" },
  ],

  services: [
    {
      id: "cleaning",
      name: "Cleaning",
      short: "Spotless homes and workplaces, every visit.",
      description: "Regular, deep, and end-of-lease cleaning with eco-friendly products and trained teams.",
      icon: "spark",
      image: "",
    },
    {
      id: "repairs",
      name: "Repairs",
      short: "Fast, tidy fixes that last.",
      description: "From leaky taps to furniture assembly — reliable handyman work without the hassle.",
      icon: "wrench",
      image: "",
    },
    {
      id: "garden",
      name: "Garden",
      short: "Outdoor spaces that look looked-after.",
      description: "Lawn, hedges, and garden maintenance that keep your property presentation-ready.",
      icon: "leaf",
      image: "",
    },
  ],

  process: [
    { step: "01", title: "Book", text: "Request a quote online or call. We confirm scope, timing, and price." },
    { step: "02", title: "Visit", text: "We arrive on time, walk the space, and protect floors and furniture." },
    { step: "03", title: "Work", text: "Trained specialists complete the job to a documented checklist." },
    { step: "04", title: "Done", text: "You inspect. We don’t leave until you’re happy." },
  ],

  testimonials: [
    {
      quote: "The team was on time, careful, and the house looked brand new. I’ve already booked them again.",
      name: "Sarah L.",
      place: "Bondi",
    },
    {
      quote: "Great communication from quote to finish. They treated our home like their own.",
      name: "James T.",
      place: "Manly",
    },
    {
      quote: "Reliable, friendly, and genuinely thorough. The best home service company we’ve used.",
      name: "Emily R.",
      place: "Surry Hills",
    },
  ],

  areas: [
    "Sydney",
    "Bondi",
    "Manly",
    "Paddington",
    "Surry Hills",
    "Newtown",
    "Mosman",
    "Coogee",
    "Balmain",
    "Double Bay",
  ],

  faqs: [
    {
      q: "How quickly can you come out?",
      a: "Most quotes are returned the same day. Standard bookings land within a few days; urgent jobs can often be scheduled sooner — call us and we’ll do what we can.",
    },
    {
      q: "Do I need to be home during the service?",
      a: "Not necessarily. Many clients give access instructions and head out. We’ll confirm the plan when we book.",
    },
    {
      q: "Which areas do you cover?",
      a: "We serve the greater city area and surrounding suburbs listed on this page. If you don’t see your suburb, ask — we often travel further.",
    },
    {
      q: "How do you price a job?",
      a: "Pricing depends on the service, property size, and condition. Share a few details and we’ll send a clear, no-obligation quote.",
    },
  ],

  form: {
    endpoint: "",
  },
};
