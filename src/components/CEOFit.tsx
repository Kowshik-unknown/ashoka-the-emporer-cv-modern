import { useEffect, useState } from "react";
import { CEO_MAP, TESTIMONIALS } from "../data";
import { useCount, useInView } from "../hooks";
import { ChakraWheel, Reveal, SectionHead } from "./Bits";

function FitRing({ start }: { start: boolean }) {
  const n = useCount(973, start, 2100) / 10;
  const r = 84;
  const circ = 2 * Math.PI * r;
  const filled = start ? circ * (1 - n / 100) : circ;
  return (
    <div className="relative w-56 h-56">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        <circle cx="100" cy="100" r={r} fill="none" stroke="#2b2317" strokeWidth="7" />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="url(#fitGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={filled}
          style={{ transition: "stroke-dashoffset 2.1s cubic-bezier(0.4,0,0.2,1)" }}
        />
        <defs>
          <linearGradient id="fitGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d96f2e" />
            <stop offset="60%" stopColor="#e0a83f" />
            <stop offset="100%" stopColor="#f6d489" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-display font-black text-ivory text-4xl tabular-nums">{n.toFixed(1)}%</p>
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold mt-1.5">C-Suite Fit</p>
      </div>
    </div>
  );
}

function Stamp({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="stamp-in absolute -top-10 -right-4 sm:-right-10 w-40 h-40 pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 160 160" className="w-full h-full text-gold">
        <circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="80" cy="80" r="58" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" />
        <defs>
          <path id="stampArc" d="M80,80 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0" />
        </defs>
        <text fontSize="12.5" letterSpacing="3.5" fill="currentColor" className="font-mono">
          <textPath href="#stampArc">MAURYAN BOARD • UNANIMOUSLY RECOMMENDED •</textPath>
        </text>
        <text x="80" y="76" textAnchor="middle" fontSize="15" fill="currentColor" className="font-display" fontWeight="700" letterSpacing="2">
          ENDORSED
        </text>
        <text x="80" y="95" textAnchor="middle" fontSize="10" fill="currentColor" className="font-mono" letterSpacing="2">
          269 BCE
        </text>
      </svg>
    </div>
  );
}

export default function CEOFit() {
  const [ringRef, ringIn] = useInView<HTMLDivElement>();
  const [endorsed, setEndorsed] = useState(false);
  const [count, setCount] = useState(12486);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3400);
    return () => clearTimeout(t);
  }, [toast]);

  const endorse = () => {
    if (!endorsed) {
      setEndorsed(true);
      setCount((c) => c + 1);
    }
    setToast(true);
  };

  return (
    <section id="board" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHead
            kicker="Chapter VI — Potential as a Modern CEO"
            title="Verdict: Built for the Corner Office"
            sub="The board translated twenty-three centuries of evidence into a hiring decision."
          />
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-12 gap-12">
          {/* verdict */}
          <div ref={ringRef} className="lg:col-span-5">
            <div className="tablet card-lift p-8 sm:p-10 relative overflow-visible">
              <Stamp show={endorsed} />
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold">Board assessment</p>
              <div className="mt-6 flex justify-center"><FitRing start={ringIn} /></div>
              <ul className="mt-8 space-y-3">
                {[
                  ["Mission orientation", "Rebuilt an entire strategy around purpose after a catastrophic win."],
                  ["Communication", "First-person, localised, public reporting — 33 editions."],
                  ["Ethics infrastructure", "Independent officers with empire-wide jurisdiction."],
                  ["Risk flag", "Succession architecture under-designed. Mitigate with a strong board."],
                ].map(([k, v], i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className={`mt-0.5 shrink-0 ${i === 3 ? "text-ember" : "text-patina"}`}><ChakraWheel size={14} /></span>
                    <span>
                      <span className="text-ivory font-medium">{k} — </span>
                      <span className="text-mist">{v}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={endorse}
                  className={`btn-sweep border font-mono text-[11px] tracking-[0.26em] uppercase px-6 py-3.5 transition-colors duration-300 ${
                    endorsed ? "border-gold bg-gold text-basalt" : "border-gold text-gold hover:text-basalt"
                  }`}
                >
                  {endorsed ? "Seal Recorded ✓" : "Endorse the Emperor"}
                </button>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-mist">
                  <span className="text-gold tabular-nums">{count.toLocaleString("en-US")}</span> endorsements
                </p>
              </div>
            </div>
          </div>

          {/* role mapping */}
          <div className="lg:col-span-7">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-mist mb-5">
              Ancient operating model <span className="text-gold">→</span> modern org chart
            </p>
            <div className="space-y-2.5">
              {CEO_MAP.map((row, i) => (
                <Reveal key={row.ancient} delay={i * 60}>
                  <div className="group grid sm:grid-cols-[1fr_auto_1fr] items-center gap-3 tablet card-lift px-5 py-4">
                    <p className="font-display text-ivory/90 text-[15px] leading-tight">{row.ancient}</p>
                    <span className="text-gold font-mono text-lg hidden sm:block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-gold">{row.modern}</p>
                      <p className="text-mist text-xs mt-0.5">{row.note}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* testimonials */}
        <div className="mt-20">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.32em] text-gold uppercase flex items-center gap-3">
              <span className="inline-block w-2 h-2 rotate-45 bg-gold" />
              References — 2,200 years of them
            </p>
          </Reveal>
          <div className="mt-7 grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.author} delay={i * 100} className={t.large ? "md:col-span-2" : ""}>
                <figure className="tablet card-lift p-7 sm:p-8 h-full flex flex-col">
                  <svg width="26" height="20" viewBox="0 0 26 20" className="text-gold/60 mb-4" fill="currentColor" aria-hidden="true">
                    <path d="M0 20V10.4C0 4.7 3.4 1 9.6 0l1.2 3.1C7.2 4 5.6 6 5.4 8.6H10V20H0zm16 0V10.4C16 4.7 19.4 1 25.6 0l.4 3.1c-3.6.9-5.2 2.9-5.4 5.5H26V20H16z" />
                  </svg>
                  <blockquote className={`font-display italic text-ivory/90 leading-relaxed flex-1 ${t.large ? "text-lg sm:text-2xl" : "text-[15px]"}`}>
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold">{t.author}</p>
                    <p className="font-mono text-[10px] text-mist mt-1">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* toast */}
      <div
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] transition-all duration-500 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <div className="tablet border-gold/60 px-6 py-3.5 flex items-center gap-3">
          <span className="text-gold"><ChakraWheel size={18} /></span>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ivory">
            Your seal has been recorded in the royal archives
          </p>
        </div>
      </div>
    </section>
  );
}
