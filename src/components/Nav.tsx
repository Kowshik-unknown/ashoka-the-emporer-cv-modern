import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data";
import { useScrollProgress, useScrollSpy } from "../hooks";
import { ChakraWheel } from "./Bits";

export default function Nav() {
  const progress = useScrollProgress();
  const active = useScrollSpy(NAV_LINKS.map((l) => l.id));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-basalt/85 backdrop-blur-md border-b border-seam/70" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <a href="#dossier" className="flex items-center gap-3 group" aria-label="Back to top">
          <span className="text-gold transition-transform duration-700 group-hover:rotate-180">
            <ChakraWheel size={30} />
          </span>
          <span className="leading-none">
            <span className="block font-display font-bold tracking-[0.22em] text-ivory text-sm">ASHOKA</span>
            <span className="block font-mono text-[9px] tracking-[0.3em] text-mist mt-1">MAURYAN DOSSIER</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Sections">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav-link font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ${
                active === l.id ? "text-gold active" : "text-mist hover:text-ivory"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.25em] text-mist border border-seam px-3 py-1.5">
            EST. 304 BCE
          </span>
          <a
            href="#board"
            className="btn-sweep font-mono text-[10px] tracking-[0.25em] uppercase border border-gold/60 text-gold px-4 py-1.5 hover:text-basalt transition-colors duration-300"
          >
            Hire the King
          </a>
        </div>
      </div>

      <div className="h-[2px] bg-char">
        <div
          className="h-full bg-gradient-to-r from-saffron via-gold to-goldbright transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  );
}
