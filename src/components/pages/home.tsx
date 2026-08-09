import { MotionConfig } from "motion/react";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import HeroSection from "../sections/hero-section";
import WorkIndexSection from "../sections/work-index-section";
import ServicesSection from "../sections/services-section";
import AboutProfileSection from "../sections/about-profile-section";
import ContactCtaSection from "../sections/contact-cta-section";
import { ABOUT_LINKEDIN, ABOUT_PARAGRAPHS, ABOUT_PORTRAIT } from "@/lib/about-content";

/**
 * @ployComponent
 * @ployComponentId home-page
 * @ployComponentType page
 * @ployComponentPattern landing
 * @ployComponentDescription MSDO homepage with three core editorial sections: selected work, services, and the complete founder About profile. Uses restrained reveals, large rounded imagery, and a quiet contact close while preserving real content and destinations.
 * @ployComponentTags homepage studio light editorial portfolio
 * @ployComponentStatus stable
 */
export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="msdo-home light min-h-screen bg-ploy-background-primary text-ploy-text-primary">
        <Navbar />
        <main>
          <HeroSection />
          <WorkIndexSection />
          <ServicesSection />
          <AboutProfileSection id="about" heading="About" portrait={ABOUT_PORTRAIT} paragraphs={ABOUT_PARAGRAPHS} linkedInHref={ABOUT_LINKEDIN} />
          <ContactCtaSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
