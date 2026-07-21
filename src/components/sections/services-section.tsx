import { ArrowUpRight } from "lucide-react";
import { CONTACT_HREF } from "@/lib/projects";
import { Reveal } from "@/components/ui/reveal";

/**
 * @ployComponent
 * @ployComponentId services-section
 * @ployComponentType section
 * @ployComponentPattern capability-cards
 * @ployComponentDescription Compact two-column capability cards on a soft neutral field, pairing concise service copy with restrained links and rounded 12px surfaces.
 * @ployComponentTags services studio light cards
 * @ployComponentStatus stable
 */
interface Service { name: string; description: string; }
interface ServicesSectionProps { heading?: string; services?: Service[]; href?: string; }

const DEFAULT_SERVICES: Service[] = [
  { name: "Product Strategy", description: "Defining direction, opportunity, and roadmaps aligned to real user and business goals." },
  { name: "Product & UX Design", description: "End-to-end UX and interface design for web, mobile, and emerging AI products." },
  { name: "Brand & Visual Systems", description: "Cohesive identity and design systems that scale across every touchpoint." },
  { name: "AI Product Development", description: "Translating applied AI into clear, usable products people understand and trust." },
];

export default function ServicesSection({ heading = "From idea to working product.", services = DEFAULT_SERVICES, href = CONTACT_HREF }: ServicesSectionProps) {
  return (
    <section id="services" className="services scroll-mt-20 bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
      <div className="services__inner mx-auto max-w-[92rem]">
        <Reveal className="services__head mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="services__eyebrow mb-3 text-sm text-ploy-text-secondary">Capabilities / 02</p>
            <h2 className="services__title max-w-[14ch] font-heading text-4xl font-semibold leading-[1] tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">{heading}</h2>
          </div>
          <p className="services__intro max-w-lg text-base leading-relaxed text-ploy-text-secondary lg:justify-self-end">MSDO aligns product, design, and brand into cohesive systems that simplify complexity and perform in the real world.</p>
        </Reveal>
        <div className="services__grid grid gap-3 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.name} delay={index * 0.04}>
              <a href={href} className="services__card group flex min-h-64 flex-col justify-between rounded-xl bg-ploy-background-secondary p-6 sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <span className="text-sm text-ploy-text-secondary">0{index + 1}</span>
                  <ArrowUpRight className="h-5 w-5 text-ploy-text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="services__name font-heading text-2xl font-semibold tracking-[-0.03em] text-ploy-text-primary sm:text-3xl">{service.name}</h3>
                  <p className="services__desc mt-3 max-w-md text-base leading-relaxed text-ploy-text-secondary">{service.description}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
