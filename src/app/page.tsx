import { CtaBanner } from "@/components/organisms/cta-banner";
import { HeroSection } from "@/components/organisms/hero-section";
import { HowItWorksSection } from "@/components/organisms/how-it-works-section";
import { PartnersWaitlistSection } from "@/components/organisms/partners-waitlist-section";
import { PrecedentesSection } from "@/components/organisms/precedentes-section";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import { TrustSection } from "@/components/organisms/trust-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <TrustSection />
        <PrecedentesSection />
        <PartnersWaitlistSection />
        <CtaBanner />
      </main>
      <SiteFooter />
    </>
  );
}
