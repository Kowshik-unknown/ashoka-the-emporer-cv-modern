import { useEffect, useRef, useState } from "react";
import { ERAS, IMAGES } from "../data";
import { Reveal, SectionHead } from "./Bits";

const TONE: Record<string, { border: string; text: string; dot: string }> = {
  gold: { border: "border-l-gold", text: "text-gold", dot: "bg-gold" },
  ember: { border: "border-l-ember", text: "text-ember", dot: "bg-ember" },
  patina: { border: "border-l-patina", text: "text-patina", dot: "bg-patina" },
};

export default function Timeline() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const era = ERAS[active];
  const img = era.image ?? IMAGES.map;

  return (
    <section id="reign" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHead
            kicker="Chapter I — Career Timeline"
            title="Thirty-Seven Years That Bent History"
            sub="From frontier viceroy to the most famous moral pivot ever executed by a head of state. Scroll — the era on the left tracks you."
          />
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* sticky rail */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-28">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-mist">
                Era <span className="text-gold">{String(active + 1).padStart(2, "0")}</span> / {String(ERAS.length).padStart(2, "0")}
              </p>
              <p className={`font-display font-black text-[clamp(2.6rem,5vw,4.2rem)] leading-none mt-3 ${TONE[era.tone].text} transition-colors duration-500`}>
                {era.year}
              </p>
              <p className="font-display text-ivory text-xl mt-3">{era.title}</p>

              <div className="mt-6 flex items-center gap-2">
                {ERAS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                    aria-label={`Jump to era ${i + 1}`}
                    className={`h-1.5 transition-all duration-500 ${
                      i === active ? "w-10 bg-gold" : "w-4 bg-seam hover:bg-mist/50"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-8 tablet p-3 max-w-sm">
                <div className="relative overflow-hidden">
                  <img
                    key={img}
                    src={img}
                    alt={era.title}
                    className="w-full aspect-[4/3] object-cover animate-[kf-fade-in_0.8s_ease]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-basalt/60 to-transparent" />
                  <p className="absolute bottom-2 left-3 font-mono text-[9px] tracking-[0.26em] uppercase text-goldbright">
                    {era.tag}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* scrolling cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {ERAS.map((e, i) => {
              const tone = TONE[e.tone];
              const isActive = i === active;
              return (
                <div
                  key={e.year + e.title}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  data-idx={i}
                  className={`tablet border-l-2 ${tone.border} p-6 sm:p-8 transition-all duration-500 ${
                    isActive ? "opacity-100 translate-x-0 border-seam" : "opacity-55 lg:translate-x-2"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`font-mono text-[10px] tracking-[0.26em] uppercase ${tone.text}`}>{e.tag}</span>
                    <span className="ruled flex-1" />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-mist">{e.year}</span>
                  </div>
                  <h3 className="font-display font-bold text-ivory text-xl sm:text-2xl mt-4">{e.title}</h3>
                  <p className="text-mist text-sm sm:text-[15px] leading-relaxed mt-3">{e.body}</p>
                  {e.image && (
                    <div className="mt-5 overflow-hidden">
                      <img
                        src={e.image}
                        alt={e.title}
                        className="w-full aspect-[16/8] object-cover lg:hidden hover:scale-[1.03] transition-transform duration-[1200ms]"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
