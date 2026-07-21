import { ABOUT_HREF, CONTACT_HREF, LINKEDIN_HREF, TWITTER_HREF } from "@/lib/projects";

/**
 * @ployComponent
 * @ployComponentId footer
 * @ployComponentType component
 * @ployComponentPattern footer
 * @ployComponentDescription Minimal adaptive MSDO footer with preserved studio, contact, and social destinations. Uses compact editorial type and inherited semantic tokens across light homepage and dark case-study contexts.
 * @ployComponentTags footer studio adaptive editorial
 * @ployComponentStatus stable
 */
interface FooterProps { contactHref?: string; aboutHref?: string; twitterHref?: string; linkedinHref?: string; }

export default function Footer({ contactHref = CONTACT_HREF, aboutHref = ABOUT_HREF, twitterHref = TWITTER_HREF, linkedinHref = LINKEDIN_HREF }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer bg-ploy-background-primary px-5 pb-8 pt-24 sm:px-8 lg:px-10">
      <div className="footer__inner mx-auto max-w-[92rem] border-t border-ploy-border-primary pt-8">
        <div className="footer__top grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="footer__logo font-heading text-3xl font-semibold tracking-[-0.04em] text-ploy-text-primary">MSDO®</p>
            <p className="footer__tagline mt-3 max-w-sm text-sm leading-relaxed text-ploy-text-secondary">Strategic product and design for applied AI, web, mobile, and emerging platforms.</p>
          </div>
          <nav className="footer__col flex flex-col gap-2 text-sm">
            <span className="mb-2 text-ploy-text-secondary">Studio</span>
            <a href="#work" className="text-ploy-text-primary hover:text-ploy-text-secondary">Work</a>
            <a href="#services" className="text-ploy-text-primary hover:text-ploy-text-secondary">Services</a>
            <a href={aboutHref} className="text-ploy-text-primary hover:text-ploy-text-secondary">About</a>
            <a href={contactHref} className="text-ploy-text-primary hover:text-ploy-text-secondary">Contact</a>
          </nav>
          <nav className="footer__col flex flex-col gap-2 text-sm">
            <span className="mb-2 text-ploy-text-secondary">Connect</span>
            <a href={twitterHref} target="_blank" rel="noreferrer" className="text-ploy-text-primary hover:text-ploy-text-secondary">Twitter / X</a>
            <a href={linkedinHref} target="_blank" rel="noreferrer" className="text-ploy-text-primary hover:text-ploy-text-secondary">LinkedIn</a>
          </nav>
        </div>
        <div className="footer__bottom mt-20 flex flex-col gap-2 border-t border-ploy-border-primary pt-5 text-xs text-ploy-text-secondary sm:flex-row sm:justify-between">
          <span>© {year} MSDO. All rights reserved.</span><span>San Francisco · Working globally</span>
        </div>
      </div>
    </footer>
  );
}
