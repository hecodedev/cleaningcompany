import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustSection from "@/components/TrustSection";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";
import ServiceAreas from "@/components/ServiceAreas";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AnimationRoot from "@/components/AnimationRoot";

export default function Page() {
  return (
    <AnimationRoot>
      <main>
        <Hero />
        <Services />
        <TrustSection />
        <HowItWorks />
        <BeforeAfter />
        <Testimonials />
        <ServiceAreas />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </AnimationRoot>
  );
}
