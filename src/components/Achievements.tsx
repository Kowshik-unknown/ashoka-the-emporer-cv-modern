import { useEffect, useRef, useState } from "react";
import { COUNTERS, EDICTS } from "../data";
import { useCount, useInView, usePrefersReducedMotion } from "../hooks";
import { ChakraWheel, Reveal, SectionHead } from "./Bits";

/* ---------------- animated counter card ---------------- */

function CounterCard({ value, suffix, label, note, delay }: { value: number; suffix: string; label: string; note: string; delay: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const n = useCount(value, inView);
  return (
    <div ref={ref} className={`reveal ${inView ? "in-view" : ""} tablet card-lift p-6`} style={{ transitionDelay: `${delay}ms` }}>
      <p className="font-display font-black text-gold text-4xl sm:text-[2.6rem] leading-none tabular-nums">
        {n.toLocaleString("en-US")}
        {suffix && <span className="text-xl text-goldbright/80 ml-1">{suffix}</span>}
      </p>
      <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-ivory mt-3">{label}</p>
      <p className="text-mist text-xs leading-relaxed mt-2">{note}</p>
    </div>
  );
}

/* ---------------- draggable 3D edict pillar ---------------- */

function Pillar3D() {
  const reduced = usePrefersReducedMotion();
  const [angle, setAngle] = useState(-18);
  const [smooth, setSmooth] = useState(false);
  const angleRef = useRef(-18);
  const drag = useRef({ active: false, startX: 0, startAngle: 0, lastX: 0, vel: 0 });

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const tick = () => {
      const d = drag.current;
      if (!d.active) {
        angleRef.current += 0.16 + d.vel;
        d.vel *= 0.94;
        if (Math.abs(d.vel) < 0.001) d.vel = 0;
        setAngle(angleRef.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const onDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const d = drag.current;
    d.active = true;
    d.startX = e.clientX;
    d.startAngle = angleRef.current;
    d.lastX = e.clientX;
    d.vel = 0;
    setSmooth(false);
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    angleRef.current = d.startAngle + (e.clientX - d.startX) * 0.4;
    d.vel = (e.clientX - d.lastX) * 0.03;
    d.lastX = e.clientX;
    setAngle(angleRef.current);
  };
  const onUp = () => {
    drag.current.active = false;
  };

  const nudge = (deg: number) => {
    if (!reduced) drag.current.vel = 0;
    angleRef.current += deg;
    setSmooth(true);
    setAngle(angleRef.current);
  };

  return (
    <div className="flex flex-col items-center">
      {/* capital */}
      <div className="relative z-10 flex flex-col items-center mb-[-6px]">
        <span className="text-gold"><ChakraWheel size={34} /></span>
        <div className="w-40 h-3 bg-gradient-to-b from-[#4a3b22] to-[#2d2416] border border-seam [clip-path:polygon(8%_0,92%_0,100%_100%,0_100%)]" />
      </div>

      <div
        className="pillar-scene relative h-[380px] w-[280px] sm:w-[320px] cursor-grab active:cursor-grabbing select-none touch-pan-y"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="img"
        aria-label="Rotating Ashoka pillar with six engraved edicts"
      >
        <div
          className={`pillar-inner absolute inset-0 ${smooth ? "transition-transform duration-700 ease-out" : ""}`}
          style={{ transform: `rotateX(-7deg) rotateY(${angle}deg)` }}
        >
          {EDICTS.map((ed, i) => (
            <div
              key={ed.num}
              className="pillar-face flex flex-col items-center justify-between px-5 py-6 text-center"
              style={{ transform: `rotateY(${i * 60}deg) translateZ(202px)` }}
            >
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-mist">Rock edict</p>
              <div>
                <p className="font-display font-black engraved text-3xl">{ed.num}</p>
                <p className="font-display italic text-ivory/85 text-[15px] leading-snug mt-4 engraved">{ed.text}</p>
              </div>
              <div className="w-full">
                <div className="ruled mb-3" />
                <p className="font-mono text-[9px] tracking-[0.24em] uppercase text-gold/80">{ed.source}</p>
              </div>
            </div>
          ))}
        </div>
        {/* pedestal glow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-10 rounded-[50%] bg-gold/10 blur-xl" aria-hidden="true" />
      </div>

      <div className="flex items-center gap-5 mt-4">
        <button
          onClick={() => nudge(-60)}
          className="border border-seam hover:border-gold text-mist hover:text-gold px-4 py-2 font-mono text-sm transition-colors"
          aria-label="Rotate pillar left"
        >
          ◀
        </button>
        <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-mist">
          {reduced ? "Use arrows to rotate" : "Drag to spin · or use arrows"}
        </p>
        <button
          onClick={() => nudge(60)}
          className="border border-seam hover:border-gold text-mist hover:text-gold px-4 py-2 font-mono text-sm transition-colors"
          aria-label="Rotate pillar right"
        >
          ▶
        </button>
      </div>
    </div>
  );
}

const HIGHLIGHTS = [
  "First recorded public hospitals — for humans and animals",
  "Royal highway with shade trees, wells & rest-houses every 8 miles",
  "Standardised weights, measures and fair-price edicts",
  "Convened the Third Buddhist Council at Pataliputra",
  "Diplomatic missions dispatched to nine foreign courts",
  "Lion Capital of Sarnath → national emblem of modern India",
];

export default function Achievements() {
  return (
    <section id="edicts" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHead
            kicker="Chapter III — Achievements"
            title="The Annual Reports, Carved in Rock"
            sub="Numbers from a reign run like a public trust. The counters roll up as they enter view."
          />
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COUNTERS.map((c, i) => (
            <CounterCard key={c.label} {...c} delay={i * 90} />
          ))}
        </div>

        <div className="mt-24 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div>
              <p className="font-mono text-[11px] tracking-[0.32em] text-gold uppercase flex items-center gap-3">
                <span className="inline-block w-2 h-2 rotate-45 bg-gold" />
                Interactive · the original press releases
              </p>
              <h3 className="font-display font-bold text-ivory text-[clamp(1.7rem,3.6vw,2.6rem)] leading-tight mt-4">
                Spin the Pillar.<br />
                <span className="text-gold">Read the Edicts.</span>
              </h3>
              <p className="text-mist text-sm sm:text-[15px] leading-relaxed mt-5 max-w-md">
                Ashoka erected polished sandstone pillars and engraved boulders from Kandahar to
                Karnataka — thirty-three surviving “reports to shareholders”, written not in the court
                language but in the dialect of whoever stood in front of them. Grab the pillar and turn
                it the way a traveller would have walked around it.
              </p>
              <ul className="mt-7 space-y-3">
                {HIGHLIGHTS.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ivory/85">
                    <span className="text-gold mt-0.5 shrink-0"><ChakraWheel size={15} /></span>
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Pillar3D />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
