import { NAV_LINKS } from "../data";
import { ChakraWheel } from "./Bits";

export default function Footer() {
  return (
    <footer className="relative border-t border-seam bg-char/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="font-display text-gold text-2xl sm:text-3xl leading-snug">
              धम्मो मंगलमुक्किट्ठं
            </p>
            <p className="font-display italic text-ivory/80 mt-2 text-sm sm:text-base">
              “Dhamma alone is the highest auspiciousness.” — Rock Edict IX
            </p>
            <p className="text-mist text-sm leading-relaxed mt-5 max-w-sm">
              Compiled by the Royal Scribes of Pataliputra, third century BCE; typeset for the modern
              boardroom, {new Date().getFullYear()} CE. No elephants were harmed in the making of this dossier.
            </p>
            <a
              href="#dossier"
              className="inline-flex items-center gap-3 mt-7 font-mono text-[10px] tracking-[0.28em] uppercase text-gold hover:text-goldbright transition-colors"
            >
              <ChakraWheel size={16} /> Return to the first edict ↑
            </a>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-mist">Chapters</p>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-sm text-ivory/75 hover:text-gold transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-mist">Imperial facts</p>
            <ul className="mt-5 space-y-2.5 text-sm text-ivory/75">
              <li>Capital — Pataliputra (modern Patna)</li>
              <li>Dynasty — Mauryan, third emperor</li>
              <li>Primary sources — 33 rock &amp; pillar edicts</li>
              <li>Emblem legacy — Lion Capital of Sarnath</li>
              <li>Flag legacy — the 24-spoke Ashoka Chakra</li>
            </ul>
            <div className="mt-6 tablet px-4 py-3">
              <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-mist leading-relaxed">
                <span className="text-patina">Status:</span> deceased 232 BCE ·{" "}
                <span className="text-gold">relevance:</span> compounding annually
              </p>
            </div>
          </div>
        </div>

        <div className="ruled mt-14" />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-mist">
            © 269 BCE – {new Date().getFullYear()} CE · The Mauryan Estate
          </p>
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-mist flex items-center gap-2">
            Carved in stone <span className="text-gold"><ChakraWheel size={13} /></span> v2.6.9
          </p>
        </div>
      </div>
    </footer>
  );
}
