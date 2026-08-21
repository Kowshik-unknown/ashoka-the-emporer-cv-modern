import { useState } from "react";
import { SKILLS } from "../data";
import { useInView } from "../hooks";
import { Reveal, SectionHead } from "./Bits";

const CX = 170;
const CY = 170;
const R = 118;

function pt(i: number, r: number) {
  const rad = ((-90 + i * 60) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

export default function Skills() {
  const [hi, setHi] = useState(-1);
  const [radarRef, radarIn] = useInView<HTMLDivElement>();
  const [barsRef, barsIn] = useInView<HTMLDivElement>();

  const points = SKILLS.map((s, i) => pt(i, (s.level / 100) * R));
  const poly = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHead
            kicker="Chapter IV — Skill Matrix"
            title="Competencies, Quantified by History"
            sub="Hover any bar — the wheel answers. Each axis is scored against the evidence left in stone."
          />
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-14 items-center">
          {/* radar */}
          <div ref={radarRef} className={`in-view-trigger ${radarIn ? "in-view" : ""} flex justify-center`}>
            <svg viewBox="0 0 340 340" className="w-full max-w-[440px]" role="img" aria-label="Radar chart of Ashoka's competencies">
              {/* rings */}
              {[0.25, 0.5, 0.75, 1].map((f) => (
                <polygon
                  key={f}
                  points={SKILLS.map((_, i) => {
                    const p = pt(i, R * f);
                    return `${p.x},${p.y}`;
                  }).join(" ")}
                  fill={f === 1 ? "rgba(224,168,63,0.03)" : "none"}
                  stroke="#3b2f1e"
                  strokeWidth="1"
                />
              ))}
              {/* axes */}
              {SKILLS.map((_, i) => {
                const p = pt(i, R);
                return <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#3b2f1e" strokeWidth="1" />;
              })}
              {/* value polygon */}
              <polygon className="radar-path" points={poly} fill="rgba(224,168,63,0.14)" stroke="#e0a83f" strokeWidth="2" strokeLinejoin="round" />
              {/* vertices */}
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={hi === i ? 7 : 4}
                  fill={hi === i ? "#f6d489" : "#e0a83f"}
                  stroke="#0d0b08"
                  strokeWidth="2"
                  style={{ transition: "r .3s, fill .3s" }}
                />
              ))}
              {/* labels */}
              {SKILLS.map((s, i) => {
                const p = pt(i, R + 30);
                return (
                  <text
                    key={s.name}
                    x={p.x}
                    y={p.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-mono"
                    fontSize="9.5"
                    letterSpacing="1.2"
                    fill={hi === i ? "#f6d489" : "#a99c82"}
                    style={{ transition: "fill .3s", textTransform: "uppercase" }}
                  >
                    {s.name.split(" ")[0].replace("&", "").trim().toUpperCase()}
                  </text>
                );
              })}
              <circle cx={CX} cy={CY} r="3" fill="#e0a83f" />
            </svg>
          </div>

          {/* bars */}
          <div ref={barsRef} className="space-y-6">
            {SKILLS.map((s, i) => (
              <div
                key={s.name}
                onMouseEnter={() => setHi(i)}
                onMouseLeave={() => setHi(-1)}
                className={`group cursor-default p-4 border transition-all duration-300 ${
                  hi === i ? "border-gold/60 bg-stone translate-x-1" : "border-transparent"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display font-semibold text-ivory text-[15px] sm:text-base">{s.name}</p>
                  <p className="font-mono text-sm text-gold tabular-nums">{s.level}%</p>
                </div>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-patina mt-1">{s.ancient}</p>
                <div className="mt-3 h-1.5 bg-char border border-seam/60 overflow-hidden">
                  <div
                    className="skill-fill h-full bg-gradient-to-r from-saffron via-gold to-goldbright"
                    style={{ width: barsIn ? `${s.level}%` : "0%", transitionDelay: `${i * 120}ms` }}
                  />
                </div>
                <p className="text-mist text-xs leading-relaxed mt-2.5">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
