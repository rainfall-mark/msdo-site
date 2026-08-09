import { MotionConfig } from "motion/react";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import CaseStudyHeroSection from "../sections/case-study-hero-section";
import AboutProfileSection from "../sections/about-profile-section";
import WorkIndexSection from "../sections/work-index-section";
import ContactCtaSection from "../sections/contact-cta-section";
import { ABOUT_LINKEDIN, ABOUT_PARAGRAPHS, ABOUT_PORTRAIT } from "@/lib/about-content";

/**
 * @ployComponent
 * @ployComponentId about-page
 * @ployComponentType page
 * @ployComponentPattern about
 * @ployComponentDescription Complete MSDO About page in the light editorial system. Reuses the inner-page hero, presents the original portrait and biography verbatim, includes the complete selected-work index, and closes with the shared contact CTA and footer.
 * @ployComponentTags about studio founder portfolio light editorial
 * @ployComponentStatus stable
 */
export default function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="msdo-home light min-h-screen bg-ploy-background-primary text-ploy-text-primary">
        <Navbar aboutHref="/about" />
        <main>
          <CaseStudyHeroSection eyebrow="About / MSDO" title="Design leadership for technology in transition." summary="MSDO is led by Mark Strehlow, a product and design leader working across product strategy, UX, brand, and emerging technology." variant="editorial" />
          <AboutProfileSection portrait={ABOUT_PORTRAIT} paragraphs={ABOUT_PARAGRAPHS} linkedInHref={ABOUT_LINKEDIN} />
          <WorkIndexSection heading="Selected work" />
          <ContactCtaSection />
        </main>
        <Footer aboutHref="/about" />
      </div>
    </MotionConfig>
  );
}
