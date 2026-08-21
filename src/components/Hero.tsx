import { useRef, useState } from "react";
import { HERO_STATS, IMAGES, MARQUEE_EDICTS } from "../data";
import { usePrefersReducedMotion, useScramble } from "../hooks";
import { ChakraWheel, Embers } from "./Bits";

interface Glyph {
  text: string;
  top: string;
  left?: string;
  right?: string;
  size: string;
  delay: string;
  tilt: string;
}

const GLYPHS: Glyph[] = [
  { text: "धम्म", top: "12%", left: "4%", size: "text-6xl", delay: "0s", tilt: "-8deg" },
  { text: "अशोक", top: "70%", left: "8%", size: "text-5xl", delay: "-3s", tilt: "6deg" },
  { text: "विजय", top: "18%", right: "6%", size: "text-5xl", delay: "-6s", tilt: "10deg" },
  { text: "शान्ति", top: "78%", right: "10%", size: "text-4xl", delay: "-1.5s", tilt: "-5deg" },
];

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const title = useScramble("ASHOKA", true, 30);
  const sectionRef = useRef<HTMLElement>(null);
  const [par, setPar] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 40, o: 0 });

  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 35 });

  const onSectionMove = (e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    setPar({ x: nx, y: ny });
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, o: 1 });
  };

  const onCardMove = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLDivElement;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 10, ry: px * 13, gx: (px + 0.5) * 100, gy: (py + 0.5) * 100 });
  };

  return (
    <section
      id="dossier"
      ref={sectionRef}
      onMouseMove={onSectionMove}
      className="relative min-h-screen flex flex-col overflow-hidden pt-24"
    >
      <Embers count={18} />

      {/* cursor glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: glow.o,
          background: `radial-gradient(560px circle at ${glow.x}% ${glow.y}%, rgba(224,168,63,0.07), transparent 65%)`,
        }}
      />

      {/* floating glyphs */}
      {GLYPHS.map((g, i) => (
        <span
          key={i}
          className="absolute select-none pointer-events-none transition-transform duration-300 ease-out"
          style={{
            top: g.top,
            left: g.left,
            right: g.right,
            transform: reduced ? undefined : `translate(${par.x * -14}px, ${par.y * -10}px)`,
          }}
          aria-hidden="true"
        >
          <span
            className={`glyph-float block font-display text-ivory/[0.05] ${g.size}`}
            style={{ animationDelay: g.delay, ["--tilt" as string]: g.tilt }}
          >
            {g.text}
          </span>
        </span>
      ))}

      <div className="relative flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center py-14">
        {/* ---------------- left: the edict ---------------- */}
        <div className="lg:col-span-7 relative z-10">
          <p className="font-mono text-[11px] sm:text-xs tracking-[0.32em] text-gold uppercase flex items-center gap-3">
            <span className="inline-block w-2 h-2 rotate-45 bg-gold animate-[kf-pulse-glow_2.4s_ease-in-out_infinite]" />
            Imperial Dossier Nº 001 — Pataliputra HQ
          </p>

          <h1 className="mt-6 font-display font-black leading-[0.95] text-ivory text-[clamp(3.4rem,10.5vw,7.6rem)] tracking-[0.04em]">
            {title || "\u00A0"}
            <span className="block text-[clamp(1rem,2.6vw,1.7rem)] font-semibold tracking-[0.5em] text-gold mt-4">
              THE GREAT · महान
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-mist text-sm sm:text-base leading-relaxed">
            <span className="text-ivory font-medium">Devānaṃpiya Piyadasi</span> — “Beloved of the Gods”.
            Chakravartin of five million square kilometres, author of history's first public corporate
            constitution, and the only conqueror who ever apologised for winning.{" "}
            <span className="text-gold">Now interviewing for Chief Executive.</span>
          </p>

          <blockquote className="mt-8 border-l-2 border-gold pl-5 max-w-xl">
            <p className="font-display text-lg sm:text-xl text-ivory/90 italic leading-snug">
              “All men are my children. What I desire for my own children, I desire for all.”
            </p>
            <cite className="block mt-3 font-mono text-[10px] tracking-[0.28em] text-mist not-italic uppercase">
              Pillar Edict I — carved 257 BCE
            </cite>
          </blockquote>

          <dl className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-px bg-seam border border-seam max-w-xl">
            {HERO_STATS.map((s) => (
              <div key={s.k} className="bg-char px-4 py-3 hover:bg-stone transition-colors duration-300 group">
                <dt className="font-mono text-[9px] tracking-[0.22em] uppercase text-mist group-hover:text-gold transition-colors">
                  {s.k}
                </dt>
                <dd className="font-display font-bold text-ivory text-lg mt-1">{s.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#reign"
              className="btn-sweep border border-gold text-gold hover:text-basalt font-mono text-[11px] tracking-[0.28em] uppercase px-7 py-3.5 transition-colors duration-300"
            >
              Trace the Reign ↓
            </a>
            <a
              href="#board"
              className="border border-seam text-mist hover:border-gold/60 hover:text-ivory font-mono text-[11px] tracking-[0.28em] uppercase px-7 py-3.5 transition-all duration-300"
            >
              Board Assessment
            </a>
          </div>
        </div>

        {/* ---------------- right: the portrait ---------------- */}
        <div className="lg:col-span-5 relative">
          {/* 3D chakra behind */}
          <div
            className="absolute -top-16 -right-14 w-[420px] h-[420px] pointer-events-none hidden sm:block"
            style={{ transform: reduced ? undefined : `translate(${par.x * 26}px, ${par.y * 20}px)` }}
            aria-hidden="true"
          >
            <div className="chakra-tilt w-full h-full">
              <div className="chakra-spin w-full h-full text-gold/30">
                <ChakraWheel size={420} className="w-full h-full" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 pointer-events-none hidden sm:block" aria-hidden="true">
            <div className="chakra-spin-rev w-full h-full text-patina/40">
              <ChakraWheel size={160} className="w-full h-full" />
            </div>
          </div>

          <div className="relative z-10 max-w-[430px] mx-auto lg:mr-0">
            <div
              onMouseMove={onCardMove}
              onMouseLeave={() => setTilt({ rx: 0, ry: 0, gx: 50, gy: 35 })}
              className="tablet p-3 sm:p-4 transition-transform duration-200 ease-out will-change-transform"
              style={{
                transform: reduced
                  ? undefined
                  : `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              }}
            >
              {/* corner ornaments */}
              {["top-1 left-1 border-t-2 border-l-2", "top-1 right-1 border-t-2 border-r-2", "bottom-1 left-1 border-b-2 border-l-2", "bottom-1 right-1 border-b-2 border-r-2"].map(
                (c) => (
                  <span key={c} className={`absolute w-5 h-5 border-gold/80 ${c}`} aria-hidden="true" />
                ),
              )}
              <div className="relative overflow-hidden group">
                <img
                  src={IMAGES.portrait}
                  alt="Reconstructed portrait of Emperor Ashoka the Great"
                  className="w-full aspect-[4/5] object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-basalt/70 via-transparent to-transparent" />
                {/* glare */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay"
                  style={{
                    background: `radial-gradient(420px circle at ${tilt.gx}% ${tilt.gy}%, rgba(246,212,137,0.35), transparent 60%)`,
                  }}
                />
                <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between">
                  <div>
                    <p className="font-display font-bold text-ivory text-lg leading-tight">The Emperor</p>
                    <p className="font-mono text-[10px] tracking-[0.24em] text-gold uppercase mt-1">
                      at Pataliputra · reconstructed
                    </p>
                  </div>
                  <span className="text-gold"><ChakraWheel size={26} /></span>
                </div>
              </div>
            </div>

            {/* floating chips */}
            <div className="absolute -left-6 sm:-left-12 top-10 tablet px-4 py-2.5 animate-[kf-float_7s_ease-in-out_infinite] hidden md:block">
              <p className="font-mono text-[10px] tracking-[0.24em] text-gold uppercase">☸ Dhamma-vijaya</p>
              <p className="text-[11px] text-mist mt-0.5">Conquest by righteousness</p>
            </div>
            <div
              className="absolute -right-4 sm:-right-10 bottom-24 tablet px-4 py-2.5 animate-[kf-float_8s_ease-in-out_infinite] hidden md:block"
              style={{ animationDelay: "-3s" }}
            >
              <p className="font-display font-bold text-goldbright text-xl leading-none">37 yrs</p>
              <p className="text-[11px] text-mist mt-1">zero wars after Kalinga</p>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="relative flex justify-center pb-6">
        <a href="#reign" className="flex flex-col items-center gap-2 text-mist hover:text-gold transition-colors">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase">Scroll · the reign begins</span>
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="1.6" className="animate-[kf-cue_1.8s_ease-in-out_infinite]">
            <path d="M9 1v18M2.5 13.5 9 20l6.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* edict marquee */}
      <div className="marquee relative border-y border-seam bg-char/70 py-4 overflow-hidden">
        <div className="marquee-track items-center">
          {[0, 1, 2].map((rep) => (
            <div key={rep} className="flex items-center shrink-0" aria-hidden={rep > 0}>
              {MARQUEE_EDICTS.map((q, i) => (
                <span key={i} className="flex items-center gap-6 pr-6 whitespace-nowrap">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">{q}</span>
                  <span className="text-gold/70"><ChakraWheel size={14} /></span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
