import { ABOUT_HREF, CONTACT_HREF } from "@/lib/projects";

/**
 * @ployComponent
 * @ployComponentId navbar
 * @ployComponentType component
 * @ployComponentPattern navbar
 * @ployComponentDescription Fixed top navigation for the MSDO studio site. Slim MSDO wordmark on the left, minimal text links (Work anchors to #work, About/Contact preserve original msdo.us destinations), and a cobalt "Start a project" pill CTA. Dark theme, grotesk type. Replaced the original Cargo vertical project rail during the 2026 dark redesign.
 * @ployComponentTags navbar header studio dark
 * @ployComponentStatus stable
 */
export default function Navbar({
  contactHref = CONTACT_HREF,
  aboutHref = ABOUT_HREF,
}: {
  contactHref?: string;
  aboutHref?: string;
}) {
  return (
    <header className="nav fixed inset-x-0 top-0 z-50 border-b border-ploy-border-primary bg-ploy-background-primary/80 backdrop-blur-md">
      <nav className="nav__inner mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 sm:px-8">
        <a
          href="/"
          className="nav__logo font-heading text-lg font-extrabold tracking-tight text-ploy-text-primary"
        >
          MSDO
        </a>
        <div className="nav__links flex items-center gap-6 sm:gap-8">
          <a
            href="#work"
            className="nav__link hidden text-sm text-ploy-text-secondary transition-colors hover:text-ploy-text-primary sm:inline"
          >
            Work
          </a>
          <a
            href="#services"
            className="nav__link hidden text-sm text-ploy-text-secondary transition-colors hover:text-ploy-text-primary sm:inline"
          >
            Services
          </a>
          <a
            href={aboutHref}
            className="nav__link hidden text-sm text-ploy-text-secondary transition-colors hover:text-ploy-text-primary sm:inline"
          >
            About
          </a>
          <a
            href={contactHref}
            className="nav__cta inline-flex items-center rounded-full bg-ploy-accent-primary px-4 py-2 text-sm font-semibold text-ploy-text-on-accent-primary transition-opacity hover:opacity-90"
          >
            Start a project
          </a>
        </div>
      </nav>
    </header>
  );
}
