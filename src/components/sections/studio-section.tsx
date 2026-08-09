import { Reveal } from "@/components/ui/reveal";

/**
 * @ployComponent
 * @ployComponentId studio-section
 * @ployComponentType section
 * @ployComponentPattern studio-proof
 * @ployComponentDescription Editorial studio statement and factual founder proof with a simple ruled client index. Uses the light homepage system while keeping all sourced credentials unchanged.
 * @ployComponentTags about studio proof light editorial
 * @ployComponentStatus stable
 */
interface StudioSectionProps { statement?: string; proof?: string; clients?: string[]; }
const DEFAULT_CLIENTS = ["Rainfall", "Truvalue Labs", "Flip Video", "Lytro", "Wickr", "RedBubble", "LaterPay", "Yahoo!"];

export default function StudioSection({
  statement = "Two decades turning emerging technology into products people understand, trust, and enjoy using.",
  proof = "MSDO is led by Mark Strehlow — a product and design leader who has shipped products used by millions and contributed to two acquisitions. Previously design leadership at Flip Video (acquired by Cisco), Truvalue Labs (acquired by FactSet), and Yahoo!. Harvard GSD · UC Berkeley.",
  clients = DEFAULT_CLIENTS,
}: StudioSectionProps) {
  return (
    <section className="studio bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
      <div className="studio__inner mx-auto max-w-[92rem]">
        <Reveal className="grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:gap-20">
          <div>
            <p className="studio__eyebrow mb-5 text-sm text-ploy-text-secondary">Studio / 03</p>
            <h2 className="studio__statement max-w-[16ch] font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">{statement}</h2>
            <p className="studio__proof mt-8 max-w-2xl text-base leading-relaxed text-ploy-text-secondary">{proof}</p>
          </div>
          <div className="studio__clients lg:pt-8">
            <p className="studio__clients-label mb-5 text-sm text-ploy-text-secondary">Selected clients & companies</p>
            <ul className="studio__clients-list border-t border-ploy-border-primary">
              {clients.map((client) => <li key={client} className="studio__client border-b border-ploy-border-primary py-3 text-base text-ploy-text-primary">{client}</li>)}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
