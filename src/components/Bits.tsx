import React, { useMemo } from "react";
import { useInView } from "../hooks";

/* ---------------- Chakra wheel ---------------- */

export function ChakraWheel({ size = 40, className = "" }: { size?: number; className?: string }) {
  const spokes = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const rad = ((i * 15) * Math.PI) / 180;
        return {
          x1: 24 + 5 * Math.cos(rad),
          y1: 24 + 5 * Math.sin(rad),
          x2: 24 + 21.5 * Math.cos(rad),
          y2: 24 + 21.5 * Math.sin(rad),
        };
      }),
    [],
  );
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="24" cy="24" r="4.6" stroke="currentColor" strokeWidth="1.8" />
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="currentColor" strokeWidth="1.1" />
      ))}
    </svg>
  );
}

/* ---------------- Reveal wrapper ---------------- */

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in-view" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- Section heading with line-mask reveal ---------------- */

export function SectionHead({
  kicker,
  title,
  sub,
  align = "left",
}: {
  kicker: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const words = title.split(" ");
  return (
    <div
      ref={ref}
      className={`in-view-trigger ${inView ? "in-view" : ""} ${
        align === "center" ? "text-center" : ""
      }`}
    >
      <p
        className={`font-mono text-[11px] sm:text-xs tracking-[0.32em] text-gold uppercase flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="inline-block w-2 h-2 rotate-45 bg-gold" aria-hidden="true" />
        {kicker}
      </p>
      <h2 className="font-display font-bold text-ivory mt-4 text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1.06] tracking-wide">
        {words.map((w, i) => (
          <span key={i} className="line-reveal inline-block mr-[0.28em]">
            <span className="line-reveal-inner" style={{ transitionDelay: `${i * 90}ms` }}>
              {w}
            </span>
          </span>
        ))}
      </h2>
      {sub && (
        <p
          className={`mt-5 max-w-2xl text-mist leading-relaxed text-sm sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* ---------------- Custom icon set ---------------- */

const PATHS: Record<string, React.ReactNode> = {
  chakra: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 3v6.6M12 14.4V21M3 12h6.6M14.4 12H21M5.64 5.64l4.66 4.66M13.7 13.7l4.66 4.66M18.36 5.64l-4.66 4.66M10.3 13.7l-4.66 4.66" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 4c-2 3-2 6 0 9 2-3 2-6 0-9z" />
      <path d="M5.5 8.5c.5 3.5 2.5 6 6.5 6.5M18.5 8.5c-.5 3.5-2.5 6-6.5 6.5" />
      <path d="M4 15.5c2.5 3 5 4.5 8 4.5s5.5-1.5 8-4.5" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M8 20h8M5 7.5h14" />
      <path d="M5 7.5 2.8 13a2.8 2.8 0 0 0 4.4 0L5 7.5zM19 7.5 16.8 13a2.8 2.8 0 0 0 4.4 0L19 7.5z" />
    </>
  ),
  leaf: (
    <>
      <path d="M19.5 4.5c-8.5 0-13.5 4-13.5 12.5 8.5 0 13.5-4 13.5-12.5z" />
      <path d="M6 17C9 12.5 13 9 19.5 4.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  scroll: (
    <>
      <path d="M7 3.5h10a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" />
      <path d="M9 8.5h6M9 12h6M9 15.5h4" />
    </>
  ),
  pillar: (
    <>
      <path d="M9 3.5h6M10 3.5v17M14 3.5v17M7 20.5h10M6 6.5h12" />
    </>
  ),
  flame: (
    <>
      <path d="M12 3c2 3.2 6 5.6 6 10a6 6 0 0 1-12 0c0-2.4 1.1-4.4 2.6-6.2C10 8.6 12 7.2 12 3z" />
      <path d="M12 21a3.2 3.2 0 0 0 3.2-3.2c0-1.9-1.6-3.1-3.2-4.8-1.6 1.7-3.2 2.9-3.2 4.8A3.2 3.2 0 0 0 12 21z" />
    </>
  ),
  star: (
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5z" />
  ),
  shield: (
    <>
      <path d="M12 3l7 2.8v6c0 4.6-3 7.6-7 9.2-4-1.6-7-4.6-7-9.2v-6L12 3z" />
      <path d="M12 8v5M9.8 10.5h4.4" />
    </>
  ),
  road: (
    <>
      <path d="M4 20.5 9 3.5M20 20.5 15 3.5M12 6v2.2M12 11.5v2.2M12 17v2.2" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13.4 13.4 8.5 15.5l2.1-4.9 4.9-2.1z" />
    </>
  ),
};

export function Icon({ name, size = 22, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.star}
    </svg>
  );
}

/* ---------------- Floating embers ---------------- */

export function Embers({ count = 16 }: { count?: number }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const hues = ["224,168,63", "217,111,46", "111,156,138"];
        const h = hues[i % 3];
        const size = 2.5 + Math.random() * 3.5;
        return {
          id: i,
          left: 2 + Math.random() * 96,
          size,
          duration: 9 + Math.random() * 9,
          delay: -Math.random() * 14,
          drift: (Math.random() - 0.5) * 120,
          color: `rgba(${h},0.9)`,
          glow: `0 0 ${size * 3}px ${size}px rgba(${h},0.35)`,
        };
      }),
    [count],
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {embers.map((e) => (
        <span
          key={e.id}
          className="ember"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            background: e.color,
            boxShadow: e.glow,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            ["--drift" as string]: `${e.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
