import { ArrowUpRight } from "lucide-react";
import { CONTACT_HREF } from "@/lib/projects";

/**
 * @ployComponent
 * @ployComponentId services-section
 * @ployComponentType section
 * @ployComponentPattern services-rail
 * @ployComponentDescription Services rail rendered as a calm spec sheet: hairline-ruled rows, each with a service name, a graphite description, and a right arrow. No icon tiles. Dark theme, grotesk headings. Built for the 2026 MSDO dark redesign.
 * @ployComponentTags services studio dark
 * @ployComponentStatus stable
 */
interface Service {
  name: string;
  description: string;
}

interface ServicesSectionProps {
  heading?: string;
  services?: Service[];
  href?: string;
}

const DEFAULT_SERVICES: Service[] = [
  {
    name: "Product Strategy",
    description: "Defining direction, opportunity, and roadmap aligned to real user and business goals.",
  },
  {
    name: "Product & UX Design",
    description: "End-to-end UX and interface design for web, mobile, and emerging AI products.",
  },
  {
    name: "Brand & Visual Systems",
    description: "Cohesive identity and design systems that scale across every touchpoint.",
  },
  {
    name: "AI Product Development",
    description: "Translating applied AI into clear, usable products people understand and trust.",
  },
];

export default function ServicesSection({
  heading = "Services",
  services = DEFAULT_SERVICES,
  href = CONTACT_HREF,
}: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="services scroll-mt-16 bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="services__inner mx-auto max-w-[90rem]">
        <h2 className="services__title mb-12 font-heading text-4xl font-extrabold tracking-tight text-ploy-text-primary sm:text-6xl">
          {heading}
          <span className="services__title-muted text-ploy-neutral-inverse-700"> we offer</span>
        </h2>
        <div className="services__list border-t border-ploy-border-primary">
          {services.map((service) => (
            <a
              key={service.name}
              href={href}
              className="services__row group grid grid-cols-1 items-center gap-2 border-b border-ploy-border-primary py-7 sm:grid-cols-[1fr_2fr_auto] sm:gap-8"
            >
              <h3 className="services__name font-heading text-2xl font-bold tracking-tight text-ploy-text-primary sm:text-3xl">
                {service.name}
              </h3>
              <p className="services__desc max-w-md text-base leading-relaxed text-ploy-text-secondary">
                {service.description}
              </p>
              <ArrowUpRight className="services__arrow hidden h-6 w-6 text-ploy-text-secondary transition-all duration-200 group-hover:translate-x-1 group-hover:text-ploy-accent-primary sm:block" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
