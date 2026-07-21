import { ABOUT_HREF, CONTACT_HREF } from "@/lib/projects";

/**
 * @ployComponent
 * @ployComponentId navbar
 * @ployComponentType component
 * @ployComponentPattern navbar
 * @ployComponentDescription Minimal fixed studio navigation with compact text links and a black pill contact action. Adapts through inherited semantic theme tokens so existing dark case-study routes remain intact.
 * @ployComponentTags navbar header studio adaptive
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
    <header className="nav fixed inset-x-0 top-0 z-50 bg-ploy-background-primary/88 backdrop-blur-xl">
      <nav className="nav__inner mx-auto flex h-20 max-w-[92rem] items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="/" className="nav__logo font-heading text-base font-semibold tracking-[-0.03em] text-ploy-text-primary">
          MSDO<span className="text-ploy-text-secondary">®</span>
        </a>
        <div className="nav__links flex items-center gap-5 sm:gap-7">
          <a href="#work" className="nav__link hidden text-sm text-ploy-text-secondary transition-colors hover:text-ploy-text-primary sm:inline">Work</a>
          <a href="#services" className="nav__link hidden text-sm text-ploy-text-secondary transition-colors hover:text-ploy-text-primary sm:inline">Services</a>
          <a href={aboutHref} className="nav__link hidden text-sm text-ploy-text-secondary transition-colors hover:text-ploy-text-primary md:inline">About</a>
          <a href={contactHref} className="nav__cta inline-flex min-h-9 items-center rounded-full bg-ploy-button-primary-background px-4 text-sm font-medium text-ploy-button-primary-text transition-transform duration-300 hover:scale-[1.03]">
            Start a project
          </a>
        </div>
      </nav>
    </header>
  );
}
