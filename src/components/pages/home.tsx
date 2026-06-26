import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import HeroSection from "../sections/hero-section";
import MarqueeSection from "../sections/marquee-section";
import WorkIndexSection from "../sections/work-index-section";
import ServicesSection from "../sections/services-section";
import StudioSection from "../sections/studio-section";
import ContactCtaSection from "../sections/contact-cta-section";

/**
 * @ployComponent
 * @ployComponentId home-page
 * @ployComponentType page
 * @ployComponentPattern landing
 * @ployComponentDescription MSDO homepage — 2026 dark redesign. Composes the top navbar, type-led hero, scrolling name marquee, full-screen hover-reveal work index (the signature moment), services rail, studio/proof, closing contact CTA, and footer. Work-first, near-black canvas, cobalt accent, grotesk display type.
 * @ployComponentTags homepage studio dark portfolio
 * @ployComponentStatus stable
 */
export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <WorkIndexSection />
        <ServicesSection />
        <StudioSection />
        <ContactCtaSection />
      </main>
      <Footer />
    </>
  );
}
