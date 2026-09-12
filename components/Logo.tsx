import { siteConfig } from "@/data/siteConfig";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`inline-flex items-center gap-2.5 font-display text-[15px] font-bold tracking-[-0.03em] ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-ink">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 10.5 12 4l8 6.5" strokeLinejoin="round" />
          <path d="M7 10.5V19h10v-8.5" strokeLinejoin="round" />
          <circle cx="16.5" cy="6" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <span className="capitalize">{siteConfig.companyName}</span>
    </a>
  );
}
