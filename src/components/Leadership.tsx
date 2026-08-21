import { LEADERSHIP } from "../data";
import { Icon, Reveal, SectionHead } from "./Bits";

const MODERN_TAGS: Record<string, string> = {
  lotus: "Servant Leadership",
  scale: "Values-Led Governance",
  leaf: "Stakeholder Capitalism",
  eye: "Inclusion by Policy",
  scroll: "Radical Transparency",
};

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHead
            kicker="Chapter II — Leadership Style & Strengths"
            title="How a Conqueror Learned to Serve"
            sub="Five operating principles, carved in stone and enforced by a dedicated ethics corps. The cards stack as you read — the way his policies layered onto the empire."
          />
        </Reveal>

        <div className="mt-14 flex flex-col gap-6">
          {LEADERSHIP.map((card, i) => (
            <article
              key={card.no}
              className="tablet card-lift sticky p-6 sm:p-10"
              style={{ top: `${104 + i * 18}px`, zIndex: i + 1 }}
            >
              <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
                <div className="md:col-span-3 flex md:flex-col items-center md:items-start gap-4">
                  <span className="font-display font-black text-gold/25 text-7xl sm:text-8xl leading-none select-none">
                    {card.no}
                  </span>
                  <span className="text-gold border border-seam p-3">
                    <Icon name={card.icon} size={26} />
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h3 className="font-display font-bold text-ivory text-2xl sm:text-[1.7rem] leading-tight">
                    {card.title}
                  </h3>
                  <p className="mt-4 font-display italic text-goldbright/90 text-[15px] sm:text-base leading-relaxed">
                    {card.ancient}
                  </p>
                </div>

                <div className="md:col-span-4 md:border-l md:border-seam md:pl-8">
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-patina">Modern translation</p>
                  <p className="text-mist text-sm leading-relaxed mt-3">{card.modern}</p>
                  <span className="inline-block mt-5 font-mono text-[10px] tracking-[0.22em] uppercase border border-patina/50 text-patina px-3 py-1.5">
                    {MODERN_TAGS[card.icon] ?? "Leadership"}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
