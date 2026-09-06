import Link from "next/link";
import type { GameData } from "@/lib/games";
import { withBasePath } from "@/lib/basePath";
import { ArrowLeft, Shield } from "lucide-react";

interface PixelArsenalPageProps {
  game: GameData;
  locale: "fr" | "en";
}

/* ── Palette du jeu (ui/theme/ui_tokens.gd) ─────────────────────────────
   Recopiee telle quelle : la page doit ressembler a l'application, pas a
   une interpretation de l'application.                                  */
const INK = {
  bgTop: "#1a1c21",
  bgBottom: "#14161b",
  spot: "#262a33",
  surface: "#1d2027",
  border: "#3a3f4d",
  text: "#e8e6f0",
  muted: "#9aa0ad",
  gold: "#ffd75e",
  glow: "#e8b866",
} as const;

/* Armes de la caisse Standard, la premiere du jeu. Volontairement aucune
   piece rare : la page ne doit rien devoiler qui se merite. */
const WEAPONS: ReadonlyArray<{ file: string; name: string }> = [
  { file: "uzi", name: "UZ-9" },
  { file: "mp40", name: "MP 40" },
  { file: "m1911", name: "M1911" },
  { file: "sten", name: "Sten Mk II" },
  { file: "stg_44", name: "StG 44" },
  { file: "mosin", name: "Mosin-Nagant" },
  { file: "double_barrel", name: "Double Barrel" },
  { file: "webley", name: "Webber 1910" },
  { file: "remington_1100", name: "Model 1105" },
  { file: "grease_gun", name: "M3 Grease Gun" },
  { file: "derringer", name: "Derringer" },
  { file: "nambu", name: "Type 14 Nambu" },
];

const CASES: readonly string[] = [
  "case_standard",
  "case_red",
  "case_military",
  "case_confidential",
  "case_mysterious",
  "case_top-secret",
];

const CASINO = [
  { icon: "mode_mines", fr: "Mines", en: "Mines" },
  { icon: "mode_plinko", fr: "Plinko", en: "Plinko" },
  { icon: "mode_crash", fr: "Crash", en: "Crash" },
  { icon: "mode_jackpot", fr: "Jackpot", en: "Jackpot" },
] as const;

const WORKBENCH = [
  {
    icon: "mode_upgrade",
    fr: { title: "Upgrader", desc: "Mise une arme, tente d'en sortir une meilleure." },
    en: { title: "Upgrader", desc: "Stake a weapon, try to walk away with a better one." },
  },
  {
    icon: "mode_contract",
    fr: { title: "Contrat", desc: "Échange plusieurs armes contre une du palier au-dessus." },
    en: { title: "Contract", desc: "Trade several weapons for one from the tier above." },
  },
  {
    icon: "mode_afk_farm",
    fr: { title: "Farm AFK", desc: "Tes cinq meilleures armes rapportent, même hors ligne." },
    en: { title: "AFK farm", desc: "Your five best weapons earn, even while you are away." },
  },
] as const;

const COPY = {
  fr: {
    back: "Retour à l'accueil",
    badge: "Android",
    lede: "Ouvre des caisses, garde ce qui te plaît, revends le reste. Monte ton arsenal, tente le casino, remplis ta collection.",
    cta: "Jouer",
    privacy: "Confidentialité",

    casesKicker: "01 / Caisses",
    casesTitle: "Ouvre, et vois ce qui tombe",
    casesLede:
      "Choisis une caisse, lance la roulette, découvre ton arme. Plus tu montes, plus les caisses sont belles.",
    casesA: "Douze caisses à débloquer",
    casesB: "Une caisse gratuite chaque jour",

    casinoKicker: "02 / Casino",
    casinoTitle: "Tente ta chance",
    casinoLede:
      "Quatre tables pour faire grossir ton magot, ou tout perdre. Aucun avantage maison, monnaie du jeu uniquement.",

    collectionKicker: "03 / Collection",
    collectionTitle: "Attrape les toutes",
    collectionLede:
      "Chaque arme trouvée rejoint ta collection pour de bon. Complète un lot, réclame ta récompense, découvre les camos.",

    inventoryKicker: "04 / Arsenal",
    inventoryTitle: "Fais monter tes armes",
    inventoryLede:
      "Améliore tes préférées, fusionne tes doublons pour les étoiler, habille-les d'un camo. Ton arsenal fixe ton niveau.",

    ctaTitle: "Ouvre. Fusionne. Recommence.",
    ctaLede: "Gratuit sur Android.",
  },
  en: {
    back: "Back to home",
    badge: "Android",
    lede: "Open cases, keep what you like, sell the rest. Build your arsenal, take on the casino, fill your collection.",
    cta: "Download",
    privacy: "Privacy",

    casesKicker: "01 / Cases",
    casesTitle: "Open one, see what drops",
    casesLede:
      "Pick a case, spin the reel, find out what you got. The higher you climb, the better the cases.",
    casesA: "Twelve cases to unlock",
    casesB: "A free case every day",

    casinoKicker: "02 / Casino",
    casinoTitle: "Push your luck",
    casinoLede:
      "Four tables to grow your stack, or lose it all. No house edge, in game currency only.",

    collectionKicker: "03 / Collection",
    collectionTitle: "Catch them all",
    collectionLede:
      "Every weapon you find joins your collection for good. Complete a set, claim the reward, uncover the camos.",

    inventoryKicker: "04 / Arsenal",
    inventoryTitle: "Level your weapons up",
    inventoryLede:
      "Upgrade your favourites, fuse duplicates to star them, dress them in a camo. Your arsenal sets your rank.",

    ctaTitle: "Open. Fuse. Repeat.",
    ctaLede: "Free on Android.",
  },
} as const;

/** Titre de section, police du jeu. */
function Kicker({ children }: { children: string }) {
  return (
    <p
      className="mb-4 text-[10px] leading-none tracking-[0.12em]"
      style={{ fontFamily: "var(--font-pixel)", color: INK.gold }}
    >
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2
      className="mb-4 text-[15px] leading-[1.7] sm:text-[19px]"
      style={{ fontFamily: "var(--font-pixel)", color: INK.text }}
    >
      {children}
    </h2>
  );
}

/** Plaque du jeu : surface sombre, bordure franche, angles nets. */
function Plate({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border ${className}`}
      style={{ background: INK.surface, borderColor: INK.border }}
    >
      {children}
    </div>
  );
}

function Sprite({
  src,
  alt,
  size,
  fill = false,
}: {
  src: string;
  alt: string;
  size: number;
  /** Remplit la tuile plutot que de tenir une taille fixe. */
  fill?: boolean;
}) {
  return (
    <img
      src={withBasePath(src)}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className={`[image-rendering:pixelated] ${
        fill ? "h-full w-full object-contain" : ""
      }`}
      style={fill ? undefined : { width: size, height: size }}
    />
  );
}

export default function PixelArsenalPage({ game, locale }: PixelArsenalPageProps) {
  const prefix = locale === "en" ? "/en" : "";
  const c = COPY[locale];
  const store = game.platforms[0];
  const base = "/games/pixel-arsenal";

  return (
    <div
      style={{
        background: `radial-gradient(120% 70% at 50% 0%, ${INK.spot} 0%, ${INK.bgTop} 45%, ${INK.bgBottom} 100%)`,
        color: INK.text,
      }}
    >
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="game-heading"
        className="relative overflow-hidden px-6 pt-28 pb-20"
      >
        {/* La lampe du jeu : un halo chaud, tres bas en opacite. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            background: `radial-gradient(60% 100% at 50% 0%, ${INK.glow}22 0%, transparent 70%)`,
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <Link
            href={prefix || "/"}
            className="mb-12 inline-flex items-center gap-2 text-xs transition-colors duration-200"
            style={{ color: INK.muted }}
          >
            <ArrowLeft size={14} />
            {c.back}
          </Link>

          {game.iconImage ? (
            <div className="mb-8 flex justify-center">
              <div
                className="rounded-2xl border p-2"
                style={{ background: INK.surface, borderColor: INK.border }}
              >
                <img
                  src={withBasePath(game.iconImage)}
                  alt=""
                  width={512}
                  height={512}
                  className="h-28 w-28 rounded-xl [image-rendering:pixelated] sm:h-32 sm:w-32"
                />
              </div>
            </div>
          ) : null}

          <h1
            id="game-heading"
            className="mb-6 text-[26px] leading-[1.6] sm:text-[42px]"
            style={{ fontFamily: "var(--font-pixel)", color: INK.gold }}
          >
            {game.name}
          </h1>

          <p
            className="mx-auto mb-10 max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: INK.muted }}
          >
            {c.lede}
          </p>

          <div className="flex flex-col items-center gap-5">
            <a
              href={store.url}
              className="inline-flex items-center gap-3 rounded-lg px-8 py-4 text-[11px] leading-none transition-transform duration-150 hover:-translate-y-0.5"
              style={{
                fontFamily: "var(--font-pixel)",
                background: INK.gold,
                color: INK.bgBottom,
                boxShadow: `0 5px 0 ${INK.glow}`,
              }}
            >
              <PlayIcon />
              {c.cta}
            </a>
            <Link
              href={`${prefix}${game.privacyPath}`}
              className="inline-flex items-center gap-1.5 text-[11px]"
              style={{ color: INK.muted }}
            >
              <Shield size={12} />
              {c.privacy}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 01 Caisses ───────────────────────────────────────────────── */}
      <Section>
        <Kicker>{c.casesKicker}</Kicker>
        <SectionTitle>{c.casesTitle}</SectionTitle>
        <Lede>{c.casesLede}</Lede>

        <ul className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {CASES.map((file) => (
            <li key={file}>
              <div
                className="flex aspect-square items-center justify-center rounded-lg border p-3 transition-transform duration-200 hover:-translate-y-1"
                style={{ background: INK.spot, borderColor: INK.border }}
              >
                <Sprite src={`${base}/cases/${file}.png`} alt="" size={96} fill />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          {[c.casesA, c.casesB].map((line) => (
            <span
              key={line}
              className="rounded-md border px-3 py-2 text-xs"
              style={{ borderColor: INK.border, color: INK.muted }}
            >
              {line}
            </span>
          ))}
        </div>
      </Section>

      {/* ── 02 Casino ────────────────────────────────────────────────── */}
      <Section>
        <Kicker>{c.casinoKicker}</Kicker>
        <SectionTitle>{c.casinoTitle}</SectionTitle>
        <Lede>{c.casinoLede}</Lede>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CASINO.map((mode) => (
            <li key={mode.icon}>
              <Plate className="flex flex-col items-center gap-4 p-6 transition-transform duration-200 hover:-translate-y-1">
                <Sprite src={`${base}/modes/${mode.icon}.png`} alt="" size={64} />
                <span
                  className="text-[10px] leading-none"
                  style={{ fontFamily: "var(--font-pixel)", color: INK.text }}
                >
                  {locale === "fr" ? mode.fr : mode.en}
                </span>
              </Plate>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── 03 Collection ────────────────────────────────────────────── */}
      <Section>
        <Kicker>{c.collectionKicker}</Kicker>
        <SectionTitle>{c.collectionTitle}</SectionTitle>
        <Lede>{c.collectionLede}</Lede>

        <ul className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {WEAPONS.map((weapon) => (
            <li key={weapon.file}>
              <Plate className="flex flex-col p-2 transition-transform duration-200 hover:-translate-y-1">
                <div className="flex aspect-[4/3] items-center justify-center">
                  <Sprite
                    src={`${base}/weapons/${weapon.file}.png`}
                    alt={weapon.name}
                    size={128}
                    fill
                  />
                </div>
                <span
                  className="truncate px-1 pb-0.5 text-center text-[10px]"
                  style={{ color: INK.muted }}
                >
                  {weapon.name}
                </span>
              </Plate>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── 04 Arsenal ───────────────────────────────────────────────── */}
      <Section>
        <Kicker>{c.inventoryKicker}</Kicker>
        <SectionTitle>{c.inventoryTitle}</SectionTitle>
        <Lede>{c.inventoryLede}</Lede>

        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {WORKBENCH.map((entry) => {
            const copy = entry[locale];
            return (
              <li key={entry.icon}>
                <Plate className="flex h-full flex-col gap-4 p-6 transition-transform duration-200 hover:-translate-y-1">
                  <Sprite src={`${base}/modes/${entry.icon}.png`} alt="" size={56} />
                  <span
                    className="text-[10px] leading-none"
                    style={{ fontFamily: "var(--font-pixel)", color: INK.gold }}
                  >
                    {copy.title}
                  </span>
                  <p className="text-xs leading-relaxed" style={{ color: INK.muted }}>
                    {copy.desc}
                  </p>
                </Plate>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto max-w-5xl">
          <Plate className="relative overflow-hidden px-6 py-14 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(70% 130% at 50% 0%, ${INK.glow}1f 0%, transparent 70%)`,
              }}
            />
            <div className="relative">
              <h2
                className="mb-4 text-[13px] leading-[1.8] sm:text-[17px]"
                style={{ fontFamily: "var(--font-pixel)", color: INK.text }}
              >
                {c.ctaTitle}
              </h2>
              <p className="mb-8 text-sm" style={{ color: INK.muted }}>
                {c.ctaLede}
              </p>
              <a
                href={store.url}
                className="inline-flex items-center gap-3 rounded-lg px-8 py-4 text-[11px] leading-none transition-transform duration-150 hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-pixel)",
                  background: INK.gold,
                  color: INK.bgBottom,
                  boxShadow: `0 5px 0 ${INK.glow}`,
                }}
              >
                <PlayIcon />
                {store.label}
              </a>
            </div>
          </Plate>
        </div>
      </section>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

function Lede({ children }: { children: string }) {
  return (
    <p className="max-w-2xl text-sm leading-relaxed" style={{ color: INK.muted }}>
      {children}
    </p>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.19 0 .38.04.56.12l16 8c.54.27.87.82.87 1.38s-.34 1.11-.87 1.38l-16 8c-.18.08-.37.12-.56.12-.83 0-1.5-.67-1.5-1.5z" />
    </svg>
  );
}
