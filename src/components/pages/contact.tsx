import { MotionConfig } from "motion/react";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import CaseStudyHeroSection from "../sections/case-study-hero-section";
import ContactFormSection from "../sections/contact-form-section";

/**
 * @ployComponent
 * @ployComponentId contact-page
 * @ployComponentType page
 * @ployComponentPattern contact
 * @ployComponentDescription Light editorial MSDO contact page with the shared inner-page hero and a focused built-in project inquiry form.
 * @ployComponentTags contact lead-capture studio light editorial
 * @ployComponentStatus stable
 */
export default function ContactPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="msdo-home light min-h-screen bg-ploy-background-primary text-ploy-text-primary">
        <Navbar aboutHref="/about" contactHref="/contact" />
        <main>
          <CaseStudyHeroSection eyebrow="Let's talk / MSDO" title="Let’s make something real." summary="Tell me a little about what you’re building, where you are in the process, and how MSDO might help." variant="editorial" />
          <ContactFormSection />
        </main>
        <Footer aboutHref="/about" contactHref="/contact" />
      </div>
    </MotionConfig>
  );
}
