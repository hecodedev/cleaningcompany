import Logo from "@/components/Logo";
import { siteConfig } from "@/data/siteConfig";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-28">
      <Logo />
      <h1 className="mt-8 font-display text-4xl">Terms & Conditions</h1>
      <p className="mt-4 text-white/60">
        These terms are a placeholder for {siteConfig.companyName}. Replace this copy with your
        booking, cancellation and liability terms before going live.
      </p>
      <a href="/" className="btn btn-accent mt-8 inline-flex">
        Back home
      </a>
    </main>
  );
}
