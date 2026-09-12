import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060606] px-5 pt-16 pb-8 md:px-8">
      <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-4">
        <div>
          <a href="#top" className="font-display mb-3 inline-flex items-center gap-2.5 font-bold">
            <img src={siteConfig.logo} alt="" className="h-9 w-9" />
            {siteConfig.companyName}
          </a>
          <p className="mt-3 max-w-xs text-sm text-white/50">
            Professional residential and commercial cleaning across {siteConfig.city}.
          </p>
        </div>
        <div>
          <p className="mb-3 font-semibold">Quick Links</p>
          <div className="flex flex-col gap-2 text-sm text-white/50">
            {siteConfig.nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 font-semibold">Services</p>
          <div className="flex flex-col gap-2 text-sm text-white/50">
            {siteConfig.services.map((s) => (
              <a key={s.id} href="#services" className="hover:text-white">
                {s.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 font-semibold">Contact</p>
          <div className="flex flex-col gap-2 text-sm text-white/50">
            <a href={siteConfig.phoneHref} className="hover:text-white">
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
              {siteConfig.email}
            </a>
            <p>{siteConfig.hours}</p>
            <p>{siteConfig.address}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1120px] flex-col justify-between gap-3 border-t border-white/10 pt-5 text-sm text-white/40 md:flex-row">
        <p>© {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.</p>
        <p className="flex gap-4">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </p>
      </div>
    </footer>
  );
}
