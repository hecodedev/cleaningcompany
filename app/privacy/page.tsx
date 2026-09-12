import Logo from "@/components/Logo";
import { siteConfig } from "@/data/siteConfig";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-28">
      <Logo />
      <h1 className="mt-8 font-display text-4xl">Privacy Policy</h1>
      <p className="mt-4 text-white/60">
        {siteConfig.companyName} respects your privacy. Contact details you share through our quote
        form are used only to respond to your enquiry. Replace this placeholder with your legal policy
        before launching.
      </p>
      <a href="/" className="btn btn-accent mt-8 inline-flex">
        Back home
      </a>
    </main>
  );
}
