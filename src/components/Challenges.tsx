import { useState } from "react";
import { CHALLENGES } from "../data";
import { Icon, Reveal, SectionHead } from "./Bits";

function Severity({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Severity ${level} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rotate-45 ${i < level ? "bg-ember shadow-[0_0_8px_rgba(194,84,47,0.7)]" : "bg-seam"}`}
        />
      ))}
    </div>
  );
}

export default function Challenges() {
  const [open, setOpen] = useState(1);

  return (
    <section id="trials" className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHead
            kicker="Chapter V — Challenges & Crisis Log"
            title="Four Crises. One Was Fatal to the Firm."
            sub="No honest dossier hides the red pages. Open each case: the problem, the response, the outcome — and the lesson a board would actually care about."
          />
        </Reveal>

        <div className="mt-14 space-y-4">
          {CHALLENGES.map((c, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={c.title} delay={i * 80}>
                <article className={`tablet transition-colors duration-300 ${isOpen ? "border-ember/50" : ""}`}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full text-left p-6 sm:p-7 flex items-center gap-5 group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-black text-ember/30 text-3xl sm:text-4xl w-12 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="font-display font-bold text-ivory text-lg sm:text-xl block leading-tight">
                        {c.title}
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-mist mt-1.5 flex items-center gap-3 flex-wrap">
                        <span>{c.era}</span>
                        <Severity level={c.severity} />
                        <span className="text-ember/80">severity {c.severity}/5</span>
                      </span>
                    </span>
                    <span
                      className={`text-gold transition-transform duration-500 shrink-0 ${isOpen ? "rotate-45" : "group-hover:rotate-90"}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                        <path d="M10 3v14M3 10h14" />
                      </svg>
                    </span>
                  </button>

                  <div className={`acc-grid ${isOpen ? "open" : ""}`}>
                    <div>
                      <div className="px-6 sm:px-7 pb-7 pl-[4.5rem] sm:pl-[5rem] grid sm:grid-cols-3 gap-5">
                        <div>
                          <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-ember flex items-center gap-2">
                            <Icon name="flame" size={14} /> The problem
                          </p>
                          <p className="text-mist text-xs sm:text-[13px] leading-relaxed mt-2">{c.problem}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-gold flex items-center gap-2">
                            <Icon name="shield" size={14} /> The response
                          </p>
                          <p className="text-mist text-xs sm:text-[13px] leading-relaxed mt-2">{c.response}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-patina flex items-center gap-2">
                            <Icon name="compass" size={14} /> Outcome & lesson
                          </p>
                          <p className="text-mist text-xs sm:text-[13px] leading-relaxed mt-2">{c.outcome}</p>
                          <p className="font-display italic text-goldbright/90 text-[13px] leading-snug mt-3 border-l-2 border-gold/50 pl-3">
                            {c.lesson}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
