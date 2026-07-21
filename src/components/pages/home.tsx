import { MotionConfig } from "motion/react";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import HeroSection from "../sections/hero-section";
import WorkIndexSection from "../sections/work-index-section";
import ServicesSection from "../sections/services-section";
import StudioSection from "../sections/studio-section";
import ContactCtaSection from "../sections/contact-cta-section";

/**
 * @ployComponent
 * @ployComponentId home-page
 * @ployComponentType page
 * @ployComponentPattern landing
 * @ployComponentDescription MSDO homepage with a light editorial portfolio system: concise split hero, large rounded project stories, compact capability cards, studio proof, and a quiet contact close. Uses restrained load and scroll reveals while preserving real work, copy, and destinations.
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
          <StudioSection />
          <ContactCtaSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
