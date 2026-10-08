import Link from "next/link";
import type { GameData } from "@/lib/games";
import { withBasePath } from "@/lib/basePath";
import { STUDIO_EMAIL } from "@/lib/studio";
import { legalPath } from "@/components/legal/LegalDocumentPage";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import {
  ADVENTURE,
  BASE,
  CASES,
  CASINO,
  COPY,
  INK,
  RARITY,
  SCREENS,
  WEAPONS,
  WORKBENCH,
} from "./pixel-arsenal/content";
import {
  Kicker,
  Lede,
  Plate,
  Section,
  SectionTitle,
  Sprite,
  StoreButtons,
} from "./pixel-arsenal/ui";

interface PixelArsenalPageProps {
  game: GameData;
  locale: "fr" | "en";
}

type Copy = (typeof COPY)[keyof typeof COPY];

export default function PixelArsenalPage({ game, locale }: PixelArsenalPageProps) {
  const prefix = locale === "en" ? "/en" : "";
  const c = COPY[locale];

  return (
    <div
      style={{
        background: `radial-gradient(120% 60% at 50% 0%, ${INK.spot} 0%, ${INK.bgTop} 40%, ${INK.bgBottom} 100%)`,
        color: INK.text,
      }}
    >
      <Hero game={game} locale={locale} c={c} prefix={prefix} />
      <ScreenRail locale={locale} c={c} />
      <CasesSection c={c} />
      <CasinoSection locale={locale} c={c} />
      <CollectionSection locale={locale} c={c} />
      <FeatureSection
        kicker={c.inventoryKicker}
        title={c.inventoryTitle}
        lede={c.inventoryLede}
        features={WORKBENCH}
        locale={locale}
      />
      <AdventureSection locale={locale} c={c} />
      <SupportSection game={game} c={c} prefix={prefix} />
      <ClosingCta game={game} c={c} />
    </div>
  );
}

/* ── Hero : texte a gauche, deux telephones qui se chevauchent a droite ── */
function Hero({
  game,
  locale,
  c,
  prefix,
}: {
  game: GameData;
  locale: "fr" | "en";
  c: Copy;
  prefix: string;
}) {
  return (
    <section aria-labelledby="game-heading" className="relative overflow-hidden px-4 pb-10 pt-24 sm:px-6 sm:pt-28">
      {/* La lampe du jeu : un halo chaud, tres bas en opacite. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{ background: `radial-gradient(55% 100% at 50% 0%, ${INK.glow}26 0%, transparent 70%)` }}
      />
      <div className="relative mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="text-center lg:text-left">
          <Link
            href={prefix || "/"}
            className="pa-link mb-10 inline-flex items-center gap-2 text-xs transition-colors duration-200 hover:text-white"
            style={{ color: INK.muted }}
          >
            <ArrowLeft size={14} />
            {c.back}
          </Link>

          <div className="mb-7 flex items-center justify-center gap-4 lg:justify-start">
            {game.iconImage ? (
              <img
                src={withBasePath(game.iconImage)}
                alt=""
                width={512}
                height={512}
                className="h-20 w-20 rounded-2xl border sm:h-24 sm:w-24"
                style={{ borderColor: INK.border, boxShadow: `0 0 0 6px ${INK.surface}, 0 18px 40px rgba(0,0,0,0.5)` }}
              />
            ) : null}
          </div>

          <h1
            id="game-heading"
            className="mb-6 text-[28px] leading-[1.5] sm:text-[44px]"
            style={{ fontFamily: "var(--font-pixel)", color: INK.gold, textShadow: `0 4px 0 ${INK.bgBottom}` }}
          >
            {game.name}
          </h1>

          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed sm:text-base lg:mx-0" style={{ color: INK.muted }}>
            {c.lede}
          </p>

          <StoreButtons platforms={game.platforms} soon={c.soon} />

          <p className="mt-6 text-[11px]" style={{ color: INK.muted }}>
            {c.rating}
          </p>
        </div>

        <div className="relative mx-auto hidden h-[480px] w-[340px] lg:block" aria-hidden>
          <Phone
            src={`${BASE}/screens/02_revelation_${locale}.webp`}
            className="absolute right-0 top-6 w-[58%] opacity-80"
            tilt={6}
          />
          <Phone
            src={`${BASE}/screens/01_ouverture_${locale}.webp`}
            className="absolute left-0 top-0 w-[64%]"
            tilt={-4}
            eager
          />
        </div>
      </div>
    </section>
  );
}

/** Une capture store, dans le cadre arrondi d'un telephone. */
function Phone({
  src,
  className,
  tilt,
  eager = false,
}: {
  src: string;
  className: string;
  tilt: number;
  eager?: boolean;
}) {
  return (
    <div className={`pa-float ${className}`} style={{ ["--pa-tilt" as string]: `${tilt}deg` }}>
      <img
        src={withBasePath(src)}
        alt=""
        width={540}
        height={960}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className="w-full rounded-[22px] border-4"
        style={{ borderColor: INK.surface, boxShadow: "0 30px 60px rgba(0,0,0,0.55)" }}
      />
    </div>
  );
}

/* ── Les six captures de la fiche store, en rail horizontal ─────────── */
function ScreenRail({ locale, c }: { locale: "fr" | "en"; c: Copy }) {
  return (
    <section aria-label={c.screensAlt} className="py-8">
      <ul className="pa-rail mx-auto flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:justify-center">
        {SCREENS.map((screen) => (
          <li key={screen} className="w-[180px] shrink-0 snap-center sm:w-[200px] lg:w-[166px]">
            <img
              src={withBasePath(`${BASE}/screens/${screen}_${locale}.webp`)}
              alt={c.screensAlt}
              width={540}
              height={960}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border"
              style={{ borderColor: INK.border }}
            />
          </li>
        ))}
      </ul>
      <p className="mt-2 text-center text-[10px] lg:hidden" style={{ color: INK.muted }}>
        {c.screensHint} →
      </p>
    </section>
  );
}

/* ── 01 Caisses : la progression entiere, sous une rampe chaude ─────── */
function CasesSection({ c }: { c: Copy }) {
  return (
    <Section>
      <Kicker>{c.casesKicker}</Kicker>
      <SectionTitle>{c.casesTitle}</SectionTitle>
      <Lede>{c.casesLede}</Lede>

      <Plate well className="mt-10 p-3 sm:p-4">
        <ol className="grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-3">
          {CASES.map((box) => (
            <li key={box.file}>
              <div
                className="pa-lift flex flex-col items-center gap-1 rounded-md border p-2"
                style={{ background: INK.surface, borderColor: INK.border }}
              >
                <div className="aspect-square w-full">
                  <Sprite src={`${BASE}/cases/${box.file}.png`} alt="" size={128} fill />
                </div>
                <span className="w-full truncate text-center text-[9px] leading-tight" style={{ color: INK.muted }}>
                  {box.name}
                </span>
              </div>
            </li>
          ))}
        </ol>
        {/* Rampe de progression : de l'acier a l'ambre, comme la lampe du jeu. */}
        <div
          aria-hidden
          className="mt-4 h-[3px] rounded-full"
          style={{ background: `linear-gradient(90deg, ${INK.border}, ${INK.glow}, ${INK.gold})` }}
        />
      </Plate>

      <ul className="mt-6 flex flex-wrap gap-2">
        {c.casesChips.map((line) => (
          <li
            key={line}
            className="rounded-md border px-3 py-2 text-xs"
            style={{ borderColor: INK.border, color: INK.text, background: INK.surface }}
          >
            {line}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ── 02 Casino ─────────────────────────────────────────────────────── */
function CasinoSection({ locale, c }: { locale: "fr" | "en"; c: Copy }) {
  return (
    <Section>
      <Kicker>{c.casinoKicker}</Kicker>
      <SectionTitle>{c.casinoTitle}</SectionTitle>
      <Lede>{c.casinoLede}</Lede>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CASINO.map((mode) => (
          <li key={mode.icon}>
            <Plate className="pa-lift flex flex-col items-center gap-3 p-4 sm:p-6">
              <Sprite src={`${BASE}/modes/${mode.icon}.png`} alt="" size={56} />
              <span className="text-[10px] leading-none" style={{ fontFamily: "var(--font-pixel)", color: INK.text }}>
                {mode[locale]}
              </span>
            </Plate>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ── 03 Collection : la caisse Standard, liseree de sa rarete ───────── */
function CollectionSection({ locale, c }: { locale: "fr" | "en"; c: Copy }) {
  return (
    <Section>
      <Kicker>{c.collectionKicker}</Kicker>
      <SectionTitle>{c.collectionTitle}</SectionTitle>
      <Lede>{c.collectionLede}</Lede>

      <div className="mt-8 flex flex-wrap gap-4">
        {Object.values(RARITY).map((rarity) => (
          <span key={rarity.color} className="inline-flex items-center gap-2 text-[11px]" style={{ color: INK.muted }}>
            <span className="inline-block h-2 w-2 rounded-sm" style={{ background: rarity.color }} />
            {rarity[locale]}
          </span>
        ))}
      </div>

      <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {WEAPONS.map((weapon) => {
          const rarity = RARITY[weapon.rarity];
          return (
            <li key={weapon.file}>
              <div
                className="pa-lift relative flex flex-col overflow-hidden rounded-lg border p-2 pb-3"
                style={{
                  borderColor: INK.border,
                  background: `linear-gradient(180deg, ${INK.surface} 55%, ${rarity.color}1f 100%)`,
                }}
              >
                <div className="flex aspect-[4/3] items-center justify-center">
                  <Sprite src={`${BASE}/weapons/${weapon.file}.png`} alt={weapon.name} size={128} fill />
                </div>
                <span className="truncate px-1 text-center text-[10px]" style={{ color: INK.text }}>
                  {weapon.name}
                </span>
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px]" style={{ background: rarity.color }} />
              </div>
            </li>
          );
        })}
        <li>
          <div
            aria-hidden
            className="flex h-full min-h-[96px] flex-col items-center justify-center rounded-lg border border-dashed p-2 text-center"
            style={{ borderColor: INK.border }}
          >
            <span className="text-[18px] leading-none" style={{ fontFamily: "var(--font-pixel)", color: INK.glow }}>
              ?
            </span>
          </div>
        </li>
      </ul>
    </Section>
  );
}

/* ── 04 Arsenal : etabli, une plaque par atelier ───────────────────── */
function FeatureSection({
  kicker,
  title,
  lede,
  features,
  locale,
}: {
  kicker: string;
  title: string;
  lede: string;
  features: typeof WORKBENCH;
  locale: "fr" | "en";
}) {
  return (
    <Section>
      <Kicker>{kicker}</Kicker>
      <SectionTitle>{title}</SectionTitle>
      <Lede>{lede}</Lede>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((entry) => (
          <li key={entry.icon}>
            <Plate className="pa-lift flex h-full items-center gap-5 p-5 sm:flex-col sm:items-start sm:gap-4 sm:p-6">
              <div className="shrink-0">
                <Sprite src={`${BASE}/modes/${entry.icon}.png`} alt="" size={56} />
              </div>
              <div>
                <span className="mb-2 block text-[10px] leading-none sm:mb-4" style={{ fontFamily: "var(--font-pixel)", color: INK.gold }}>
                  {entry[locale].title}
                </span>
                <p className="text-xs leading-relaxed" style={{ color: INK.muted }}>
                  {entry[locale].desc}
                </p>
              </div>
            </Plate>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ── 05 Aventure : bento, la campagne en grand ─────────────────────── */
function AdventureSection({ locale, c }: { locale: "fr" | "en"; c: Copy }) {
  const [lead, ...rest] = ADVENTURE;
  return (
    <Section>
      <Kicker>{c.adventureKicker}</Kicker>
      <SectionTitle>{c.adventureTitle}</SectionTitle>
      <Lede>{c.adventureLede}</Lede>

      <div className="mt-10 grid gap-3 md:grid-cols-[1.4fr_1fr]">
        <Plate className="pa-lift relative flex flex-col justify-end gap-4 overflow-hidden p-6 md:row-span-2 md:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(70% 80% at 80% 10%, ${INK.glow}22 0%, transparent 70%)` }}
          />
          <div className="relative">
            <Sprite src={`${BASE}/modes/${lead.icon}.png`} alt="" size={96} />
          </div>
          <span className="relative text-[13px] leading-none" style={{ fontFamily: "var(--font-pixel)", color: INK.gold }}>
            {lead[locale].title}
          </span>
          <p className="relative max-w-sm text-sm leading-relaxed" style={{ color: INK.muted }}>
            {lead[locale].desc}
          </p>
        </Plate>
        {rest.map((entry) => (
          <Plate key={entry.icon} className="pa-lift flex items-center gap-5 p-5">
            <Sprite src={`${BASE}/modes/${entry.icon}.png`} alt="" size={56} />
            <div>
              <span className="mb-2 block text-[10px] leading-none" style={{ fontFamily: "var(--font-pixel)", color: INK.gold }}>
                {entry[locale].title}
              </span>
              <p className="text-xs leading-relaxed" style={{ color: INK.muted }}>
                {entry[locale].desc}
              </p>
            </div>
          </Plate>
        ))}
      </div>
    </Section>
  );
}

/* ── Support : ou trouver l'ID joueur, et les pages qui engagent ───── */
function SupportSection({ game, c, prefix }: { game: GameData; c: Copy; prefix: string }) {
  const links = (["support", "terms", "privacy"] as const)
    .map((kind) => ({ kind, path: legalPath(game, kind) }))
    .filter((link): link is { kind: "support" | "terms" | "privacy"; path: string } => link.path !== null);

  return (
    <Section id="support">
      <Plate well className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <Kicker>{c.supportKicker}</Kicker>
          <SectionTitle>{c.supportTitle}</SectionTitle>
          <Lede>{c.supportLede}</Lede>
          <a
            href={`mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(game.name)}`}
            className="pa-link mt-5 inline-flex items-center gap-2 text-sm underline decoration-2 underline-offset-4"
            style={{ color: INK.text, textDecorationColor: INK.glow }}
          >
            <Mail size={14} />
            {STUDIO_EMAIL}
          </a>
        </div>
        <ul className="flex flex-col gap-2 md:min-w-[240px]">
          {links.map((link) => (
            <li key={link.kind}>
              <Link
                href={`${prefix}${link.path}`}
                className="pa-lift flex items-center justify-between gap-4 rounded-md border px-4 py-3 text-xs"
                style={{ borderColor: INK.border, background: INK.surface, color: INK.text }}
              >
                {c.supportLinks[link.kind]}
                <ArrowRight size={14} style={{ color: INK.glow }} />
              </Link>
            </li>
          ))}
        </ul>
      </Plate>
    </Section>
  );
}

function ClosingCta({ game, c }: { game: GameData; c: Copy }) {
  return (
    <section className="px-4 pb-24 pt-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Plate className="relative overflow-hidden px-6 py-14 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(70% 130% at 50% 0%, ${INK.glow}1f 0%, transparent 70%)` }}
          />
          <div className="relative flex flex-col items-center">
            <h2
              className="mb-4 text-[13px] leading-[1.8] sm:text-[17px]"
              style={{ fontFamily: "var(--font-pixel)", color: INK.text }}
            >
              {c.ctaTitle}
            </h2>
            <p className="mb-8 text-sm" style={{ color: INK.muted }}>
              {c.ctaLede}
            </p>
            <StoreButtons platforms={game.platforms} soon={c.soon} centered />
          </div>
        </Plate>
      </div>
    </section>
  );
}
