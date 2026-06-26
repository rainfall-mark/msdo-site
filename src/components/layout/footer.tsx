import {
  ABOUT_HREF,
  CONTACT_HREF,
  LINKEDIN_HREF,
  TWITTER_HREF,
} from "@/lib/projects";

/**
 * @ployComponent
 * @ployComponentId footer
 * @ployComponentType component
 * @ployComponentPattern footer
 * @ployComponentDescription MSDO site footer. Large MSDO wordmark, short studio line, columns of navigation and social links (preserving original msdo.us destinations and Mark Strehlow's Twitter/LinkedIn), and a copyright row. Dark theme. Replaced the original Cargo hidden-state footer during the 2026 redesign.
 * @ployComponentTags footer studio dark
 * @ployComponentStatus stable
 */
interface FooterProps {
  contactHref?: string;
  aboutHref?: string;
  twitterHref?: string;
  linkedinHref?: string;
}

export default function Footer({
  contactHref = CONTACT_HREF,
  aboutHref = ABOUT_HREF,
  twitterHref = TWITTER_HREF,
  linkedinHref = LINKEDIN_HREF,
}: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer border-t border-ploy-border-primary bg-ploy-background-primary px-5 py-16 sm:px-8">
      <div className="footer__inner mx-auto max-w-[90rem]">
        <div className="footer__top grid gap-10 sm:grid-cols-2">
          <div className="footer__brand">
            <p className="footer__logo font-heading text-4xl font-extrabold tracking-tight text-ploy-text-primary">
              MSDO
            </p>
            <p className="footer__tagline mt-3 max-w-sm text-base text-ploy-text-secondary">
              A strategic product and design studio building applied AI products
              for the real world.
            </p>
          </div>
          <div className="footer__links grid grid-cols-2 gap-8">
            <nav className="footer__col flex flex-col gap-3">
              <span className="footer__col-label text-sm font-semibold uppercase tracking-widest text-ploy-text-secondary">
                Studio
              </span>
              <a href="#work" className="footer__link text-ploy-text-primary hover:text-ploy-accent-primary">
                Work
              </a>
              <a href="#services" className="footer__link text-ploy-text-primary hover:text-ploy-accent-primary">
                Services
              </a>
              <a href={aboutHref} className="footer__link text-ploy-text-primary hover:text-ploy-accent-primary">
                About
              </a>
              <a href={contactHref} className="footer__link text-ploy-text-primary hover:text-ploy-accent-primary">
                Contact
              </a>
            </nav>
            <nav className="footer__col flex flex-col gap-3">
              <span className="footer__col-label text-sm font-semibold uppercase tracking-widest text-ploy-text-secondary">
                Connect
              </span>
              <a href={twitterHref} target="_blank" rel="noreferrer" className="footer__link text-ploy-text-primary hover:text-ploy-accent-primary">
                Twitter / X
              </a>
              <a href={linkedinHref} target="_blank" rel="noreferrer" className="footer__link text-ploy-text-primary hover:text-ploy-accent-primary">
                LinkedIn
              </a>
            </nav>
          </div>
        </div>
        <div className="footer__bottom mt-14 flex flex-col gap-2 border-t border-ploy-border-primary pt-6 text-sm text-ploy-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <span className="footer__copy">© {year} MSDO. All rights reserved.</span>
          <span className="footer__credit">San Francisco</span>
        </div>
      </div>
    </footer>
  );
}
