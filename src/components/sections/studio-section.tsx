/**
 * @ployComponent
 * @ployComponentId studio-section
 * @ployComponentType section
 * @ployComponentPattern studio-proof
 * @ployComponentDescription Studio statement + credibility proof for MSDO. A short founder-led narrative paired with a track-record line (acquisitions, prior work) and a plain-text selected-clients band. No fabricated metrics — facts sourced from the founder's public bio. Dark theme. Built for the 2026 redesign.
 * @ployComponentTags about studio proof dark
 * @ployComponentStatus stable
 */
interface StudioSectionProps {
  statement?: string;
  proof?: string;
  clients?: string[];
}

const DEFAULT_CLIENTS = [
  "Rainfall",
  "Truvalue Labs",
  "Flip Video",
  "Lytro",
  "Wickr",
  "RedBubble",
  "LaterPay",
  "Yahoo!",
];

export default function StudioSection({
  statement = "Two decades turning emerging technology into products people understand, trust, and enjoy using. MSDO is led by Mark Strehlow — a product and design leader who has shipped products used by millions and contributed to two acquisitions.",
  proof = "Previously design leadership at Flip Video (acquired by Cisco), Truvalue Labs (acquired by FactSet), and Yahoo!. Harvard GSD · UC Berkeley.",
  clients = DEFAULT_CLIENTS,
}: StudioSectionProps) {
  return (
    <section className="studio border-t border-ploy-border-primary bg-ploy-background-primary px-5 py-24 sm:px-8 sm:py-32">
      <div className="studio__inner mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="studio__main">
          <p className="studio__statement max-w-3xl font-heading text-2xl font-semibold leading-snug tracking-tight text-ploy-text-primary sm:text-4xl">
            {statement}
          </p>
          <p className="studio__proof mt-8 max-w-2xl text-base leading-relaxed text-ploy-text-secondary">
            {proof}
          </p>
        </div>
        <div className="studio__clients">
          <p className="studio__clients-label text-sm font-semibold uppercase tracking-widest text-ploy-text-secondary">
            Selected clients
          </p>
          <ul className="studio__clients-list mt-5 space-y-2">
            {clients.map((client) => (
              <li
                key={client}
                className="studio__client text-lg font-medium text-ploy-text-primary"
              >
                {client}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
