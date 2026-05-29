import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { FeaturedMoments } from "@/components/featured-moments";
import { HeroSection } from "@/components/hero-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SocialProofBento } from "@/components/social-proof-bento";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <SocialProofBento />
        <FeaturedMoments />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
