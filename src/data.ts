export const IMAGES = {
  portrait:
    "https://image.qwenlm.ai/generated-images/0279ef8d-3ca8-42b9-b0ae-063f12a91440/_result.png",
  kalinga:
    "https://image.qwenlm.ai/generated-images/277dba85-2f1a-4453-8d25-edd97095d1f9/_result.png",
  map: "https://image.qwenlm.ai/generated-images/369ae481-9871-458b-9611-687f103a42c2/_result.png",
};

export const NAV_LINKS = [
  { id: "dossier", label: "Dossier" },
  { id: "reign", label: "The Reign" },
  { id: "leadership", label: "Leadership" },
  { id: "edicts", label: "Edicts" },
  { id: "skills", label: "Skills" },
  { id: "trials", label: "Trials" },
  { id: "board", label: "Board Review" },
];

export const MARQUEE_EDICTS = [
  "“All men are my children.” — Pillar Edict I",
  "“Conquest by Dhamma is the foremost conquest.” — Rock Edict XIII",
  "“No living being shall here be slaughtered.” — Rock Edict I",
  "“Everywhere I have provided medical care, for men and for beasts.” — Rock Edict II",
  "“He who honours his own sect while disparaging another's, injures his own.” — Rock Edict XII",
  "“Whatever good deeds I have done, those the people follow.” — Pillar Edict VII",
];

export interface Era {
  year: string;
  tag: string;
  title: string;
  body: string;
  tone: "gold" | "ember" | "patina";
  image?: string;
}

export const ERAS: Era[] = [
  {
    year: "304 BCE",
    tag: "Origin",
    title: "Born inside the machine of empire",
    body: "Grandson of Chandragupta Maurya, founder of the Mauryan dynasty, and son of Bindusara. Raised at Pataliputra — the largest city on earth — schooled in the Arthashastra tradition of statecraft, logistics and espionage.",
    tone: "gold",
  },
  {
    year: "c. 285 BCE",
    tag: "Apprenticeship",
    title: "Viceroy of Ujjain & Taxila",
    body: "Posted to the empire's western frontier as a teenager. Put down the Taxila revolt not with a massacre but by removing the corrupt officials who caused it — his first recorded act of root-cause leadership.",
    tone: "gold",
  },
  {
    year: "269 BCE",
    tag: "Hostile Takeover",
    title: "The succession war",
    body: "After four years of contested succession following Bindusara's death, Ashoka secures the throne. The sources call this era “Candashoka” — Ashoka the Fierce. He inherits a subcontinent-sized organisation with rivals in every province.",
    tone: "ember",
  },
  {
    year: "261 BCE",
    tag: "The Turning Point",
    title: "Kalinga — the crisis that rewrote him",
    body: "The conquest of Kalinga costs ~100,000 lives with 150,000 deported. Walking the battlefield, the emperor breaks. His own Rock Edict XIII records the remorse — possibly the first CEO in history to publicly apologise for a 'successful' quarter.",
    tone: "ember",
    image: IMAGES.kalinga,
  },
  {
    year: "260–240 BCE",
    tag: "The Great Pivot",
    title: "Dhamma-vijaya: conquest by righteousness",
    body: "Converts to Buddhism and redefines victory itself. Replaces dig-vijaya (military conquest) with dhamma-vijaya (moral conquest). Carves his new constitution — 33 rock and pillar edicts — in local Prakrit dialects so every citizen can read company policy.",
    tone: "patina",
  },
  {
    year: "232 BCE",
    tag: "Legacy",
    title: "Mahaparinirvana — a brand that outlived the empire",
    body: "Dies after ~37 years on the throne. The empire fragments within five decades — but the Lion Capital becomes India's national emblem, his wheel flies on its flag, and his name still anchors 2,300 years of soft power.",
    tone: "patina",
    image: IMAGES.map,
  },
];

export interface LeadershipCard {
  no: string;
  title: string;
  ancient: string;
  modern: string;
  icon: string;
}

export const LEADERSHIP: LeadershipCard[] = [
  {
    no: "I",
    title: "Servant Leadership",
    ancient:
      "“All men are my children. As for my own children I desire that they may be provided with all welfare and happiness, so do I desire the same for all men.”",
    modern:
      "Reframed the throne as stewardship. The state exists to serve the citizen — not the reverse. Two millennia before servant-leadership entered the management canon, he carved it in stone.",
    icon: "lotus",
  },
  {
    no: "II",
    title: "Values as Constitution",
    ancient:
      "Codified Dhamma — compassion, truthfulness, non-violence, generosity — as binding public law, and created the Dhamma-mahamattas: officers whose only job was ethics.",
    modern:
      "Mission-driven governance with an independent ethics function that reported above regional managers. Culture wasn't a poster; it was an enforced operating system.",
    icon: "scale",
  },
  {
    no: "III",
    title: "Stakeholder Welfare",
    ancient:
      "Built hospitals for humans and animals, dug wells, planted shade trees along roads, erected rest-houses, and ran irrigation works — audited and reported in the edicts.",
    modern:
      "Full-stack stakeholder capitalism: employees, customers, communities and even the environment on the balance sheet. ESG, practiced in the 3rd century BCE.",
    icon: "leaf",
  },
  {
    no: "IV",
    title: "Radical Tolerance",
    ancient:
      "Rock Edict XII forbids disparaging other sects and orders respect for all faiths — in an empire of Buddhists, Brahmins, Jains and Greeks.",
    modern:
      "Pluralism as policy. Psychological safety for dissenting belief systems inside one organisation — the ancient analogue of inclusion engineered from the top.",
    icon: "eye",
  },
  {
    no: "V",
    title: "Communication as Statecraft",
    ancient:
      "33 inscriptions from Afghanistan to Karnataka, written in the readers' own dialects — Prakrit, Greek, Aramaic — with the king's personal voice throughout.",
    modern:
      "Transparent, localised, first-person corporate communication at continental scale. The original annual letter to shareholders — published where the shareholders actually lived.",
    icon: "scroll",
  },
];

export interface EdictFace {
  num: string;
  text: string;
  source: string;
}

export const EDICTS: EdictFace[] = [
  { num: "I", text: "Here no living being shall be slaughtered or sacrificed.", source: "Rock Edict I" },
  { num: "II", text: "Everywhere, medical care is provided for men and for beasts.", source: "Rock Edict II" },
  { num: "VII", text: "All sects and creeds deserve reverence and protection.", source: "Rock Edict VII" },
  { num: "XII", text: "He who disparages another's faith injures his own.", source: "Rock Edict XII" },
  { num: "XIII", text: "The foremost conquest is conquest by Dhamma.", source: "Rock Edict XIII" },
  { num: "P·I", text: "All men are my children.", source: "Pillar Edict I" },
];

export interface Counter {
  value: number;
  suffix: string;
  label: string;
  note: string;
}

export const COUNTERS: Counter[] = [
  { value: 37, suffix: "yrs", label: "On the throne", note: "269 – 232 BCE, one of antiquity's longest reigns" },
  { value: 84000, suffix: "", label: "Stupas commissioned", note: "Per Buddhist tradition — a continental build programme" },
  { value: 33, suffix: "", label: "Edicts carved in stone", note: "From Kandahar to Karnataka, in local dialects" },
  { value: 5, suffix: "M km²", label: "Empire under command", note: "Largest political entity the subcontinent ever knew" },
  { value: 50, suffix: "M+", label: "Citizens served", note: "Perhaps a fifth of humanity at the time" },
  { value: 0, suffix: "", label: "Wars after Kalinga", note: "36 years of peace enforced by soft power" },
];

export interface Skill {
  name: string;
  ancient: string;
  level: number;
  note: string;
}

export const SKILLS: Skill[] = [
  { name: "Crisis Transformation", ancient: "Kalinga remorse → Dhamma pivot", level: 96, note: "Turned catastrophic brand damage into a 2,000-year moral franchise." },
  { name: "Strategic Communication", ancient: "33 edicts, multi-dialect", level: 98, note: "First-person, localised, public — the ancient investor letter." },
  { name: "ESG & Public Welfare", ancient: "Hospitals, wells, shade trees", level: 97, note: "Stakeholder capitalism before the term existed." },
  { name: "Diplomacy & Soft Power", ancient: "Missions to Sri Lanka & the Greek West", level: 94, note: "Exported culture instead of legions." },
  { name: "Continental Operations", ancient: "5M km², 50M citizens, 3rd-c. tech", level: 92, note: "Decentralised provinces bound by a shared values layer." },
  { name: "Brand & Legacy Building", ancient: "Lion Capital, the Wheel, Piyadasi", level: 99, note: "Still flying on a national flag in the 21st century." },
];

export interface Challenge {
  title: string;
  era: string;
  severity: number;
  problem: string;
  response: string;
  outcome: string;
  lesson: string;
}

export const CHALLENGES: Challenge[] = [
  {
    title: "The Succession War",
    era: "272–269 BCE",
    severity: 4,
    problem:
      "Four years of open conflict with his brothers for the throne. Buddhist texts speak of 99 rivals; the Greek sources speak of a usurper seized by force.",
    response:
      "Consolidated through loyalty networks built as viceroy, then legitimised through a coronation delayed four full years — winning the court before wearing the crown.",
    outcome:
      "Seized power, but carried a reputation as 'Candashoka the Fierce' for years — a trust deficit he spent the rest of his reign repaying.",
    lesson:
      "How you take power sets the interest rate on everything you do with it.",
  },
  {
    title: "The Kalinga Catastrophe",
    era: "261 BCE",
    severity: 5,
    problem:
      "A 'victory' that killed ~100,000 and displaced 150,000. Total moral collapse of the conqueror paradigm at the peak of his military power.",
    response:
      "Public confession — carved permanently in Rock Edict XIII. Personal conversion. Complete strategic reversal from dig-vijaya to dhamma-vijaya.",
    outcome:
      "The single most famous act of imperial contrition in history; it became the founding myth of Buddhist Asia and his eternal brand.",
    lesson:
      "Radical accountability, in writing, in public, is the most durable repositioning strategy ever recorded.",
  },
  {
    title: "Governing 5M km² with Iron-Age Tech",
    era: "260–240 BCE",
    severity: 4,
    problem:
      "A subcontinent of deserts, jungles and mountains, dozens of languages, no printing press, roads barely existing — and every province one rebellion away from secession.",
    response:
      "Federal structure with autonomous provinces, a royal road spine with rest-houses every 8 miles, a courier-and-espionage network, and values-based alignment instead of micromanagement.",
    outcome:
      "Held the largest empire India would see until the Mughals — for over three decades — largely without major internal revolt after Kalinga.",
    lesson:
      "Scale runs on shared values and infrastructure, not on the founder's personal bandwidth.",
  },
  {
    title: "The Succession Blind Spot",
    era: "232 BCE →",
    severity: 5,
    problem:
      "Despite everything, he left no durable succession architecture. Within ~50 years of his death, the Mauryan Empire had effectively dissolved.",
    response:
      "Late-reign inscriptions show anxiety — Pillar Edict VI admits officers sometimes ignore even direct royal orders. He saw the rot but could not systemise against it.",
    outcome:
      "The enterprise outlived its founder by barely one generation; the brand, however, proved immortal.",
    lesson:
      "A mission survives only if the machinery of succession is designed as deliberately as the mission itself.",
  },
];

export const CEO_MAP = [
  { ancient: "Chakravartin — universal sovereign", modern: "Chief Executive Officer", note: "Full P&L of a subcontinent" },
  { ancient: "Dhamma-mahamattas", modern: "Chief Ethics & Compliance Officer", note: "Independent, empire-wide" },
  { ancient: "Rock & Pillar Edicts", modern: "Public shareholder reporting", note: "Annual, localised, first-person" },
  { ancient: "Espionage & courier network", modern: "Business intelligence & analytics", note: "Real-time provincial telemetry" },
  { ancient: "Missions to Lanka & the Greek West", modern: "International expansion desk", note: "Soft power as market entry" },
  { ancient: "Welfare works programme", modern: "ESG & CSR division", note: "Capex for citizens and ecosystems" },
  { ancient: "“Piyadasi” — the pseudonym", modern: "Brand architecture", note: "Separated the person from the institution" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Amid the tens of thousands of names of monarchs that crowd the columns of history, their majesties and graciousnesses and serenities and royal highnesses, the name of Ashoka shines, and shines almost alone, a star.",
    author: "H. G. Wells",
    role: "The Outline of History, 1920",
    large: true,
  },
  {
    quote:
      "His edicts still speak to us across the centuries — a king's voice, humane and tired of blood, addressing his own people as his children.",
    author: "Jawaharlal Nehru",
    role: "The Discovery of India",
    large: false,
  },
  {
    quote:
      "★★★★★ Would carve again. Visionary leadership, clear comms, excellent dental plan for war elephants. Only con: the boss makes you meditate now.",
    author: "Anonymous Royal Scribe",
    role: "Glassdoor · Pataliputra HQ",
    large: false,
  },
];

export const HERO_STATS = [
  { k: "Reign", v: "269–232 BCE" },
  { k: "Domain", v: "5M km²" },
  { k: "Edicts", v: "33" },
  { k: "Wars after Kalinga", v: "0" },
];
