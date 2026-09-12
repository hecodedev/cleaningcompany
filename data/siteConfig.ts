export const siteConfig = {
  companyName: "your logo here",
  logo: "/assets/logo.svg",
  tagline: "Premium residential and commercial cleaning",
  phone: "+61 2 0000 0000",
  phoneHref: "tel:+61200000000",
  email: "hello@yourlogo.com",
  address: "Sydney, NSW",
  city: "Sydney",
  hours: "Mon–Sat, 7:00am – 6:00pm",

  colors: {
    accent: "#3DDC84",
    accentInk: "#062113",
    bg: "#080808",
    bgElevated: "#101010",
    card: "#141414",
    light: "#F6F6F4",
    text: "#F4F4F4",
    muted: "#8D8D8D",
    darkText: "#121212",
    border: "rgba(255,255,255,0.08)",
  },

  socialLinks: [
    { name: "Instagram", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "LinkedIn", href: "#" },
  ],

  hero: {
    eyebrow: "Premium home services",
    line1: "Your home.",
    line2: "Our expertise.",
    sub: "Professional, reliable care for a cleaner, safer, more comfortable home.",
    video: "/assets/hero.mp4",
    poster: "/assets/hero.jpg",
  },

  nav: [
    { label: "Home", href: "#top" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ],

  servicesIntro: {
    eyebrow: "Our services",
    heading: "Professional Cleaning Services",
    text: "From routine home cleaning to deep cleans and move-out services, we make your space feel fresh, clean and ready for what comes next.",
  },

  serviceCategories: ["All", "Residential", "Commercial", "Specialty"] as const,

  services: [
    {
      id: "house-cleaning",
      name: "House Cleaning",
      description: "Reliable cleaning for a fresh, comfortable home.",
      price: "From $89",
      category: "Residential",
      image: "/images/house-cleaning.png",
    },
    {
      id: "deep-cleaning",
      name: "Deep Cleaning",
      description: "A detailed top-to-bottom clean for every corner.",
      price: "From $149",
      category: "Residential",
      image: "/images/deep-cleaning.png",
    },
    {
      id: "end-of-lease",
      name: "End of Lease Cleaning",
      description: "Move-out cleaning designed to leave your property spotless.",
      price: "From $199",
      category: "Residential",
      image: "/images/end-of-lease.png",
    },
    {
      id: "office-cleaning",
      name: "Office Cleaning",
      description: "Professional cleaning for productive, welcoming workspaces.",
      price: "From $129",
      category: "Commercial",
      image: "/images/office-cleaning.png",
    },
    {
      id: "carpet-cleaning",
      name: "Carpet Cleaning",
      description: "Deep carpet cleaning that removes dirt and refreshes your floors.",
      price: "From $99",
      category: "Specialty",
      image: "/images/carpet-cleaning.png",
    },
    {
      id: "window-cleaning",
      name: "Window Cleaning",
      description: "Crystal-clear windows for a brighter, cleaner space.",
      price: "From $89",
      category: "Specialty",
      image: "/images/window-cleaning.png",
    },
  ],

  trust: {
    eyebrow: "Why choose us",
    heading: "Trusted. Local. Professional.",
    text: "We are a team of experienced cleaning professionals committed to delivering high-quality service, attention to detail and complete customer satisfaction.",
    image: "/images/trust-living-room.png",
    stats: [
      { value: 10, suffix: "+", label: "Years Experience" },
      { value: 500, suffix: "+", label: "Happy Customers" },
      { value: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
    ],
  },

  process: {
    eyebrow: "How it works",
    heading: "Getting your cleaning service is simple",
    steps: [
      { step: "01", title: "Book Online", text: "Fill out our quick form and get a free quote." },
      { step: "02", title: "We Visit", text: "We'll arrive at your scheduled time, ready to clean." },
      { step: "03", title: "We Do the Work", text: "Our team gets it done with care and attention to detail." },
      { step: "04", title: "You Relax", text: "Enjoy your fresh, clean and comfortable space." },
    ],
  },

  beforeAfter: {
    heading: "See The Difference",
    sub: "Professional cleaning can transform your space.",
    before: "/images/before.png",
    after: "/images/after.png",
  },

  testimonials: [
    {
      quote: "Absolutely amazing service! The team was professional, punctual and incredibly thorough. Highly recommend.",
      name: "Sarah L.",
      place: "Sydney, NSW",
    },
    {
      quote: "Great experience from start to finish. They transformed our home and we couldn't be happier.",
      name: "James T.",
      place: "Sydney, NSW",
    },
    {
      quote: "Reliable, friendly and efficient. The best home cleaning company I've used.",
      name: "Emily R.",
      place: "Sydney, NSW",
    },
  ],

  serviceAreas: {
    heading: "Proudly Serving Your Area",
    text: "We proudly serve homes and businesses throughout the local area, bringing professional cleaning services to your doorstep.",
    /** Google Maps embed centered on Sydney — swap this URL when rebranding city */
    mapEmbed:
      "https://www.google.com/maps?q=Sydney+NSW+Australia&hl=en&z=11&output=embed",
    areas: [
      { name: "Sydney" },
      { name: "Bondi" },
      { name: "Manly" },
      { name: "Parramatta" },
      { name: "Randwick" },
      { name: "Coogee" },
      { name: "Newtown" },
      { name: "Surry Hills" },
      { name: "Mosman" },
    ],
  },

  faqs: [
    {
      q: "How much do your cleaning services cost?",
      a: "Pricing depends on the service, property size and condition. Share a few details and we’ll send a clear, no-obligation quote the same day in most cases.",
    },
    {
      q: "Do I need to be home during the service?",
      a: "Not necessarily. Many clients give access instructions and head out. We’ll confirm the plan when we book.",
    },
    {
      q: "What areas do you cover?",
      a: "We serve greater Sydney and the surrounding suburbs listed on this page. If you don’t see your suburb, ask — we often travel further.",
    },
    {
      q: "Are your staff insured?",
      a: "Yes. Our team is trained, background-checked and fully insured for your peace of mind.",
    },
    {
      q: "Do you bring your own cleaning supplies?",
      a: "Yes. We arrive with professional equipment and products. If you prefer specific products, let us know when you book.",
    },
    {
      q: "How do I book a service?",
      a: "Request a free quote online or call us. We’ll confirm scope, timing and price before we arrive.",
    },
  ],

  cta: {
    heading: "Ready for a Cleaner Home?",
    text: "Get a free quote today and let our professional team take care of the cleaning.",
    image: "/images/cta-foliage.png",
  },

  form: {
    endpoint: "",
  },
};

export type SiteConfig = typeof siteConfig;
export type ServiceItem = (typeof siteConfig.services)[number];
