import Link from "next/link";
import type { GameData } from "@/lib/games";
import { withBasePath } from "@/lib/basePath";
import EarthLottie from "@/components/ui/EarthLottie";
import type { ComponentType } from "react";
import {
  ArrowLeft,
  Building2,
  ChevronRight,
  Coins,
  Compass,
  Flag,
  Flame,
  MapPin,
  Plane,
  Shield,
  Sparkles,
} from "lucide-react";

interface QuizMode {
  id: string;
  title: string;
  desc: string;
  color: string;
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  prompt: string;
}

interface GlobeTrotPageProps {
  game: GameData;
  locale: "fr" | "en";
}

/* ── Bespoke per-game palette pulled from the real app ───────── */
const PALETTE = {
  blue: "#2563EB",
  orange: "#EA580C",
  purple: "#7C3AED",
  amber: "#F59E0B",
  cyan: "#0891B2",
  green: "#16A34A",
  red: "#DC2626",
} as const;

const QUIZ_MODES_FR: QuizMode[] = [
  {
    id: "placeCountry",
    title: "Placer le pays",
    desc: "Touche le pays demandé sur la carte du monde.",
    color: PALETTE.blue,
    Icon: MapPin,
    prompt: "🇰🇿  Kazakhstan",
  },
  {
    id: "placeByFlag",
    title: "Drapeau",
    desc: "Trouve le pays qui porte ce drapeau.",
    color: PALETTE.orange,
    Icon: Flag,
    prompt: "🇲🇼",
  },
  {
    id: "placeByCapital",
    title: "Capitale",
    desc: "Trouve le pays dont c'est la capitale.",
    color: PALETTE.purple,
    Icon: Building2,
    prompt: "Reykjavík",
  },
  {
    id: "placeByCurrency",
    title: "Devise",
    desc: "Trouve le pays qui utilise cette devise.",
    color: PALETTE.amber,
    Icon: Coins,
    prompt: "Pataca · MOP$",
  },
];

const QUIZ_MODES_EN: QuizMode[] = [
  {
    id: "placeCountry",
    title: "Place the country",
    desc: "Tap the requested country on the world map.",
    color: PALETTE.blue,
    Icon: MapPin,
    prompt: "🇰🇿  Kazakhstan",
  },
  {
    id: "placeByFlag",
    title: "Flag",
    desc: "Find the country flying this flag.",
    color: PALETTE.orange,
    Icon: Flag,
    prompt: "🇲🇼",
  },
  {
    id: "placeByCapital",
    title: "Capital",
    desc: "Find the country whose capital this is.",
    color: PALETTE.purple,
    Icon: Building2,
    prompt: "Reykjavík",
  },
  {
    id: "placeByCurrency",
    title: "Currency",
    desc: "Find the country using this currency.",
    color: PALETTE.amber,
    Icon: Coins,
    prompt: "Pataca · MOP$",
  },
];

const WONDERS: ReadonlyArray<{
  id: string;
  name_fr: string;
  name_en: string;
  bonus_fr: string;
  bonus_en: string;
  cost: number;
}> = [
  { id: "china_wall", name_fr: "Grande Muraille", name_en: "Great Wall", bonus_fr: "+1 gel de série, puis 1 toutes les 2 semaines", bonus_en: "+1 streak freeze, then 1 every 2 weeks", cost: 3000 },
  { id: "petra", name_fr: "Petra", name_en: "Petra", bonus_fr: "×1.1 sur toutes les pièces", bonus_en: "×1.1 on all coins earned", cost: 10000 },
  { id: "redeemer", name_fr: "Christ Rédempteur", name_en: "Christ the Redeemer", bonus_fr: "+1 vie permanente", bonus_en: "+1 permanent life", cost: 15000 },
  { id: "machu_picchu", name_fr: "Machu Picchu", name_en: "Machu Picchu", bonus_fr: "Continent révélé avant la partie", bonus_en: "Continent revealed before play", cost: 25000 },
  { id: "chichen_itza", name_fr: "Chichen Itza", name_en: "Chichen Itza", bonus_fr: "Population révélée avant la partie", bonus_en: "Population revealed before play", cost: 50000 },
  { id: "colosseum", name_fr: "Colisée", name_en: "Colosseum", bonus_fr: "Jusqu'à 4 défis par jour", bonus_en: "Up to 4 daily challenges", cost: 100000 },
  { id: "taj_mahal", name_fr: "Taj Mahal", name_en: "Taj Mahal", bonus_fr: "Vies illimitées pour toujours", bonus_en: "Unlimited lives forever", cost: 200000 },
];

/* Real palette swatches from the app's MapPresets */
const MAP_THEMES: ReadonlyArray<{
  id: string;
  name: string;
  ocean: string;
  fill: string;
  unlocked: boolean;
}> = [
  { id: "classic", name: "Classique", ocean: "#A8C8DC", fill: "#B4BAC0", unlocked: true },
  { id: "ocean", name: "Océan", ocean: "#1B4F72", fill: "#C8B89A", unlocked: true },
  { id: "night", name: "Nuit", ocean: "#1E293B", fill: "#475569", unlocked: true },
  { id: "forest", name: "Forêt", ocean: "#1F3D2A", fill: "#A8B89C", unlocked: true },
  { id: "dracula", name: "Dracula", ocean: "#282A36", fill: "#BD93F9", unlocked: false },
  { id: "gruvbox", name: "Gruvbox", ocean: "#458588", fill: "#FABD2F", unlocked: false },
  { id: "tokyonight", name: "Tokyo Night", ocean: "#0D0F1C", fill: "#BB9AF7", unlocked: false },
  { id: "monokai", name: "Monokai", ocean: "#272822", fill: "#F92672", unlocked: false },
];

const COPY = {
  fr: {
    back: "Retour à l'accueil",
    badge: "Jeu de géographie · Android",
    tagline: "Testez vos connaissances en géographie mondiale.",
    leadParagraph:
      "Une vraie carte du monde, quatre façons de jouer. Place les pays, devine les drapeaux, les capitales et les devises, puis traverse le globe par frontières terrestres dans le mode Voyage, ou explore les régions et villes de chaque pays sur la Carte Interactive.",
    quizKicker: "Quatre modes de jeu",
    quizTitle: "Quatre angles, une même carte",
    premiumKicker: "Modes Premium",
    premiumTitle: "Quand la géo devient un voyage",
    travelTitle: "Mode Voyage",
    travelDesc:
      "Choisis un pays de départ et une destination lointaine. Traverse les frontières pas à pas et essaie de trouver le chemin le plus court entre les deux.",
    exploreTitle: "Carte Interactive",
    exploreDesc:
      "Tape n'importe quel pays pour zoomer dedans. Devine ses régions, états ou provinces, puis ses plus grandes villes sur la silhouette du pays.",
    dailyKicker: "Défi Quotidien",
    dailyTitle: "Un pays par jour. Quatre indices.",
    dailyDesc:
      "Chaque jour, un pays mystère. À chaque essai, le jeu révèle un nouvel indice : hémisphère, continent, direction et population.",
    clueHemisphere: "Hémisphère",
    clueContinent: "Continent",
    clueDirection: "Direction",
    cluePopulation: "Population",
    wondersKicker: "Sept Merveilles",
    wondersTitle: "Dépense tes pièces dans la collection",
    wondersDesc:
      "Chaque Merveille débloque un bonus permanent dans le Défi Quotidien : gels de série, multiplicateurs de pièces, vies supplémentaires, indices révélés à l'avance.",
    themesKicker: "Thèmes de carte",
    themesTitle: "11 styles. 7 à débloquer.",
    themesDesc:
      "Joue en mode Expert sans faute pour débloquer Dracula, Gruvbox, Tokyo Night, Monokai et plus. Chaque thème repeint toute la carte.",
    ctaKicker: "Disponible maintenant",
    ctaTitle: "Prends ton planisphère dans la poche.",
    ctaDesc: "Android · Gratuit avec achats intégrés.",
    cost: "pièces",
    locked: "Verrouillé",
  },
  en: {
    back: "Back to home",
    badge: "Geography game · Android",
    tagline: "Test your world geography knowledge.",
    leadParagraph:
      "A real world map, four ways to play. Place countries, recognize flags, capitals and currencies, then cross the globe by land borders in Travel mode, or zoom into a country and explore its regions and cities on the Interactive Map.",
    quizKicker: "Four game modes",
    quizTitle: "Four angles, one map",
    premiumKicker: "Premium modes",
    premiumTitle: "When geography becomes a journey",
    travelTitle: "Travel mode",
    travelDesc:
      "Pick a starting country and a far-away destination. Cross land borders step by step and try to find the shortest path between them.",
    exploreTitle: "Interactive Map",
    exploreDesc:
      "Tap any country to zoom in. Guess its regions, states or provinces, then its largest cities, plotted on the country silhouette.",
    dailyKicker: "Daily Challenge",
    dailyTitle: "One country a day. Four clues.",
    dailyDesc:
      "Every day, one mystery country. Each guess reveals a new clue: hemisphere, continent, direction and population.",
    clueHemisphere: "Hemisphere",
    clueContinent: "Continent",
    clueDirection: "Direction",
    cluePopulation: "Population",
    wondersKicker: "Seven Wonders",
    wondersTitle: "Spend your coins on the collection",
    wondersDesc:
      "Each Wonder unlocks a permanent bonus in the Daily Challenge : streak freezes, coin multipliers, extra lives, clues revealed up-front.",
    themesKicker: "Map themes",
    themesTitle: "11 styles. 7 to unlock.",
    themesDesc:
      "Play Expert with zero mistakes to unlock Dracula, Gruvbox, Tokyo Night, Monokai and more. Each theme repaints the entire map.",
    ctaKicker: "Out now",
    ctaTitle: "Pocket a planisphere.",
    ctaDesc: "Android · Free with in-app purchases.",
    cost: "coins",
    locked: "Locked",
  },
} as const;

export default function GlobeTrotPage({ game, locale }: GlobeTrotPageProps) {
  const prefix = locale === "en" ? "/en" : "";
  const copy = COPY[locale];
  const modes = locale === "en" ? QUIZ_MODES_EN : QUIZ_MODES_FR;

  return (
    <div className="bg-white text-zinc-950">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0B1220] px-6 pt-28 pb-24 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(60% 50% at 75% 40%, rgba(37,99,235,0.45) 0%, transparent 70%), radial-gradient(40% 40% at 20% 80%, rgba(124,58,237,0.35) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          <Link
            href={prefix || "/"}
            className="mb-12 inline-flex items-center gap-2 text-xs font-medium text-white/70 transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft size={14} />
            {copy.back}
          </Link>

          <div className="grid items-center gap-16 md:grid-cols-[1.2fr_1fr]">
            <div>
              <span
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: PALETTE.green }}
                />
                {copy.badge}
              </span>

              <h1 className="mb-5 text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">
                GlobeTrot
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {copy.tagline}
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-white/55">
                {copy.leadParagraph}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-zinc-950 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <PlayIcon />
                  Google Play
                </a>
              </div>
            </div>

            <div className="relative mx-auto h-[280px] w-[280px] sm:h-[360px] sm:w-[360px]">
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(56,189,248,0.35) 0%, transparent 65%)",
                }}
                aria-hidden="true"
              />
              <div className="relative h-full w-full">
                <EarthLottie speed={0.45} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUIZ MODES ─────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader kicker={copy.quizKicker} title={copy.quizTitle} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {modes.map(({ id, title, desc, color, Icon, prompt }) => (
            <article
              key={id}
              className="group relative overflow-hidden rounded-2xl border border-zinc-950/8 bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(9,9,11,0.10)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `${color}14`, color }}
                >
                  <Icon size={22} strokeWidth={2.2} />
                </span>
                <ChevronRight
                  size={18}
                  className="text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-zinc-500"
                />
              </div>
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-zinc-950">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                {desc}
              </p>

              {/* Mock in-game prompt, like the app's question card */}
              <div
                className="mt-6 rounded-xl border bg-[#F8FAFC] px-4 py-3 font-mono text-sm tracking-tight"
                style={{ borderColor: `${color}33`, color }}
              >
                {prompt}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── PREMIUM MODES ──────────────────────────────────── */}
      <section className="bg-[#FAFAF7] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader kicker={copy.premiumKicker} title={copy.premiumTitle} />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <PremiumCard
              accent={PALETTE.purple}
              Icon={Plane}
              title={copy.travelTitle}
              desc={copy.travelDesc}
              image={withBasePath("/games/globetrot/screens/travel-1.webp")}
            />
            <PremiumCard
              accent={PALETTE.cyan}
              Icon={Compass}
              title={copy.exploreTitle}
              desc={copy.exploreDesc}
              image={withBasePath("/games/globetrot/screens/explore-1.webp")}
            />
          </div>
        </div>
      </section>

      {/* ── DAILY CHALLENGE ───────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader kicker={copy.dailyKicker} title={copy.dailyTitle} />

        <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
          <p className="text-base leading-relaxed text-zinc-700">
            {copy.dailyDesc}
          </p>

          {/* Streak + clue mockup */}
          <div className="rounded-2xl border border-zinc-950/10 bg-gradient-to-br from-white to-[#FFF7E6] p-7 shadow-[0_22px_70px_rgba(9,9,11,0.08)]">
            <div className="mb-5 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                <Flame size={13} /> 24 {locale === "fr" ? "jours" : "days"}
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700">
                <Coins size={13} color={PALETTE.amber} /> 12 480
              </div>
            </div>

            <div className="space-y-2">
              <Clue label={copy.clueHemisphere} value="N" />
              <Clue label={copy.clueContinent} value={locale === "fr" ? "Afrique" : "Africa"} />
              <Clue label={copy.clueDirection} value={locale === "fr" ? "Sud-Ouest ↙" : "South-West ↙"} />
              <Clue label={copy.cluePopulation} value="~17M" />
            </div>

            <p className="mt-5 text-xs font-medium text-zinc-500">
              {locale === "fr" ? "3 essais restants" : "3 tries left"}
            </p>
          </div>
        </div>
      </section>

      {/* ── WONDERS ───────────────────────────────────────── */}
      <section className="bg-[#0B1220] px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            kicker={copy.wondersKicker}
            title={copy.wondersTitle}
            invert
          />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
            {copy.wondersDesc}
          </p>

          <div className="mt-12 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {WONDERS.slice(0, 4).map((w) => (
                <WonderCard key={w.id} wonder={w} locale={locale} coinLabel={copy.cost} />
              ))}
            </div>
            <div className="mx-auto grid max-w-[75%] gap-4 sm:grid-cols-2 md:grid-cols-3">
              {WONDERS.slice(4).map((w) => (
                <WonderCard key={w.id} wonder={w} locale={locale} coinLabel={copy.cost} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP THEMES ────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader kicker={copy.themesKicker} title={copy.themesTitle} />
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600">
          {copy.themesDesc}
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {MAP_THEMES.map((theme) => (
            <div
              key={theme.id}
              className="group overflow-hidden rounded-2xl border border-zinc-950/8 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(9,9,11,0.08)]"
            >
              <div
                className="relative h-28"
                style={{ background: theme.ocean }}
              >
                <div
                  className="absolute left-4 top-4 h-16 w-20 rounded-md"
                  style={{
                    background: theme.fill,
                    boxShadow: `inset 0 0 0 1.5px rgba(255,255,255,0.5)`,
                  }}
                />
                <div
                  className="absolute bottom-4 right-4 h-10 w-12 rounded-md"
                  style={{
                    background: theme.fill,
                    boxShadow: `inset 0 0 0 1.5px rgba(255,255,255,0.5)`,
                    opacity: 0.85,
                  }}
                />
                {!theme.unlocked && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase text-white backdrop-blur">
                    <Sparkles size={9} />
                    {copy.locked}
                  </span>
                )}
              </div>
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-zinc-900">{theme.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-950/10 bg-gradient-to-br from-[#0B1220] to-[#1E293B] px-8 py-14 text-center text-white sm:px-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
            {copy.ctaKicker}
          </p>
          <h2 className="mx-auto mb-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {copy.ctaTitle}
          </h2>
          <p className="mb-9 text-sm text-white/65">{copy.ctaDesc}</p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold text-zinc-950 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <PlayIcon />
              Google Play
            </a>
            <Link
              href={`${prefix}${game.privacyPath}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-6 py-3 text-xs font-medium text-white/70 transition-colors duration-200 hover:text-white"
            >
              <Shield size={13} />
              {locale === "fr" ? "Confidentialité" : "Privacy"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Subcomponents ──────────────────────────────────────── */

function SectionHeader({
  kicker,
  title,
  invert = false,
}: {
  kicker: string;
  title: string;
  invert?: boolean;
}) {
  return (
    <div>
      <p
        className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${
          invert ? "text-white/55" : "text-zinc-500"
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`max-w-3xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl ${
          invert ? "text-white" : "text-zinc-950"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

function PremiumCard({
  accent,
  Icon,
  title,
  desc,
  image,
}: {
  accent: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  desc: string;
  image: string;
}) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(9,9,11,0.10)]"
      style={{ borderColor: `${accent}33` }}
    >
      <div
        className="relative flex h-72 items-center justify-center overflow-hidden p-6"
        style={{ background: `${accent}10` }}
      >
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="p-7">
        <div className="mb-3 flex items-center gap-3">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `${accent}1A`, color: accent }}
          >
            <Icon size={18} strokeWidth={2.2} />
          </span>
          <h3 className="text-xl font-semibold tracking-[-0.02em] text-zinc-950">
            {title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600">{desc}</p>
      </div>
    </article>
  );
}

function WonderCard({
  wonder,
  locale,
  coinLabel,
}: {
  wonder: {
    id: string;
    name_fr: string;
    name_en: string;
    bonus_fr: string;
    bonus_en: string;
    cost: number;
  };
  locale: "fr" | "en";
  coinLabel: string;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10">
      <div className="mb-4 flex h-24 items-center justify-center">
        <img
          src={withBasePath(`/games/globetrot/wonders/${wonder.id}.png`)}
          alt={locale === "fr" ? wonder.name_fr : wonder.name_en}
          className="max-h-24 max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <h4 className="text-sm font-semibold tracking-tight text-white">
        {locale === "fr" ? wonder.name_fr : wonder.name_en}
      </h4>
      <p className="mt-1 text-xs leading-relaxed text-white/55">
        {locale === "fr" ? wonder.bonus_fr : wonder.bonus_en}
      </p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-300">
        <Coins size={11} />
        {wonder.cost.toLocaleString(locale === "fr" ? "fr-FR" : "en-US")}{" "}
        {coinLabel}
      </div>
    </article>
  );
}

function Clue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-950/8 bg-white px-3.5 py-2.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </span>
      <span className="font-mono text-sm font-medium text-zinc-900">
        {value}
      </span>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.19 0 .38.04.56.12l16 8c.54.27.87.82.87 1.38s-.34 1.11-.87 1.38l-16 8c-.18.08-.37.12-.56.12-.83 0-1.5-.67-1.5-1.5z" />
    </svg>
  );
}
