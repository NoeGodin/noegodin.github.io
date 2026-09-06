import Link from "next/link";
import type { GameData } from "@/lib/games";
import { withBasePath } from "@/lib/basePath";
import {
  ArrowLeft,
  Bomb,
  Boxes,
  Coins,
  Flame,
  Layers,
  Rocket,
  Shield,
  Sparkles,
  Swords,
  Target,
  TrendingUp,
} from "lucide-react";
import type { ComponentType } from "react";

interface PixelArsenalPageProps {
  game: GameData;
  locale: "fr" | "en";
}

/* ── Données RÉELLES du jeu ──────────────────────────────────────────────
   Couleurs, poids de tirage, prix et libellés recopiés depuis le projet
   Godot (data/rarity.gd, data/wear.gd, data/cases/*.tres, ui_tokens.gd).
   Une valeur inventée ici mentirait sur le produit qu'elle vend.        */

const RARITIES: ReadonlyArray<{
  id: string;
  fr: string;
  en: string;
  color: string;
  /** Poids de tirage global, ou null pour un palier réservé aux caisses. */
  weight: number | null;
}> = [
  { id: "common", fr: "Commun", en: "Common", color: "#9ba6b4", weight: 45 },
  { id: "uncommon", fr: "Peu commun", en: "Uncommon", color: "#35e06a", weight: 30 },
  { id: "rare", fr: "Rare", en: "Rare", color: "#1f63e0", weight: 15 },
  { id: "epic", fr: "Épique", en: "Epic", color: "#b65cff", weight: 7 },
  { id: "legendary", fr: "Légendaire", en: "Legendary", color: "#ffc81e", weight: 3 },
  { id: "mythic", fr: "Mythique", en: "Mythic", color: "#ff7a1a", weight: null },
  { id: "godlike", fr: "Divin", en: "Godlike", color: "#00e8ff", weight: null },
  { id: "forbidden", fr: "Interdit", en: "Forbidden", color: "#ff2d3f", weight: null },
];

const WEARS: ReadonlyArray<{
  fr: string;
  en: string;
  multiplier: number;
}> = [
  { fr: "Délabrée", en: "Wrecked", multiplier: 0.7 },
  { fr: "Très usée", en: "Heavily used", multiplier: 0.85 },
  { fr: "Éprouvée", en: "Service worn", multiplier: 1.0 },
  { fr: "Peu usée", en: "Lightly used", multiplier: 1.3 },
  { fr: "Neuve", en: "Pristine", multiplier: 1.7 },
];

const CASES: ReadonlyArray<{
  name: string;
  price: number;
  gift?: boolean;
}> = [
  { name: "Standard", price: 0 },
  { name: "Welcome", price: 0, gift: true },
  { name: "Red", price: 250 },
  { name: "Military", price: 1_500 },
  { name: "Confidential", price: 4_000 },
  { name: "Mysterious", price: 6_000 },
  { name: "Top Secret", price: 22_000 },
  { name: "Premium", price: 40_000 },
  { name: "Toxic", price: 55_000 },
  { name: "Sahur", price: 70_000 },
  { name: "Diamond", price: 90_000 },
  { name: "Marble", price: 140_000 },
];

/** Les treize métaux de fusion, dans l'ordre des paliers. */
const FUSION_METALS: readonly string[] = [
  "#c87f34", "#cdd6e3", "#ffd75e", "#7fe8ff", "#2ecc71", "#ff5a2e", "#22d3ee",
  "#ff2ecf", "#8a4fff", "#2255cc", "#ffd24a", "#c9b8ff", "#fff6d8",
];

const DIVISIONS: ReadonlyArray<{ fr: string; en: string; color: string }> = [
  { fr: "Bronze", en: "Bronze", color: "#c87f34" },
  { fr: "Argent", en: "Silver", color: "#cdd6e3" },
  { fr: "Or", en: "Gold", color: "#ffd75e" },
  { fr: "Diamant", en: "Diamond", color: "#7fe8ff" },
  { fr: "Légende", en: "Legend", color: "#ff2d3f" },
];

interface Mode {
  id: string;
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  color: string;
  fr: { title: string; desc: string };
  en: { title: string; desc: string };
}

const FORGE_MODES: readonly Mode[] = [
  {
    id: "fusion",
    Icon: Layers,
    color: "#ffd75e",
    fr: {
      title: "Fusion",
      desc: "Absorbe tes doublons pour étoiler une arme. Treize métaux, du bronze au blanc singulier — et la valeur ne se crée jamais du néant : N armes absorbées, l'arme en vaut N + 1.",
    },
    en: {
      title: "Fusion",
      desc: "Absorb duplicates to star up a weapon. Thirteen metals, from bronze to singularity white — and value never appears from nowhere: absorb N weapons, the survivor is worth N + 1.",
    },
  },
  {
    id: "upgrader",
    Icon: Target,
    color: "#b65cff",
    fr: {
      title: "Upgrader",
      desc: "Mise une arme contre cinq offres de valeur supérieure. La roue tourne, la chance est exactement l'inverse du multiplicateur. Aucun avantage maison, dans un sens comme dans l'autre.",
    },
    en: {
      title: "Upgrader",
      desc: "Stake one weapon against five higher-value offers. The wheel spins, and the odds are exactly the inverse of the multiplier. No house edge, either way.",
    },
  },
  {
    id: "contract",
    Icon: Swords,
    color: "#35e06a",
    fr: {
      title: "Contrat",
      desc: "Offre des armes d'un palier, reçois-en une du palier au-dessus. Le nombre exigé se dérive du rapport de valeur réel entre les deux paliers — pas d'un forfait qui rendrait un saut gratuit et le suivant confiscatoire.",
    },
    en: {
      title: "Contract",
      desc: "Trade weapons of one tier for a single one from the tier above. The number required is derived from the real value ratio between the two tiers — not a flat ten that would make one jump free and the next punitive.",
    },
  },
];

const CASINO_MODES: readonly Mode[] = [
  {
    id: "mines",
    Icon: Bomb,
    color: "#ff2d3f",
    fr: { title: "Mines", desc: "Retourne les cases, arrête-toi avant la bombe." },
    en: { title: "Mines", desc: "Flip tiles, cash out before the bomb." },
  },
  {
    id: "plinko",
    Icon: Coins,
    color: "#ffc81e",
    fr: { title: "Plinko", desc: "Vingt billes, seize rangées de chevilles." },
    en: { title: "Plinko", desc: "Twenty balls, sixteen rows of pegs." },
  },
  {
    id: "crash",
    Icon: Rocket,
    color: "#00e8ff",
    fr: { title: "Crash", desc: "La courbe monte. Encaisse avant qu'elle casse." },
    en: { title: "Crash", desc: "The curve climbs. Cash out before it breaks." },
  },
  {
    id: "jackpot",
    Icon: Flame,
    color: "#ff7a1a",
    fr: { title: "Jackpot", desc: "Dépose des armes, la mise décide de tes chances." },
    en: { title: "Jackpot", desc: "Deposit weapons; your stake sets your odds." },
  },
];

const COPY = {
  fr: {
    back: "Retour à l'accueil",
    badge: "Ouverture de caisses · Android",
    formerly: "Anciennement Pixel Gun Gambler",
    lede: "Une roulette, huit raretés, cinq états d'usure. Ouvre, fusionne, mise, échange — et regarde ton arsenal grimper les divisions. Monnaie 100 % virtuelle : rien ne s'encaisse.",
    cta: "Télécharger sur Google Play",

    reelKicker: "L'ouverture",
    reelTitle: "La roulette s'arrête sur une seule.",
    reelDesc:
      "Chaque caisse fait défiler son pool devant un curseur. Le palier tombe d'abord, l'arme ensuite, l'usure en dernier — et aucune arme ne pèse plus de 15 % des tirages de sa caisse, pour qu'une ouverture sur deux ne rende pas le même sprite.",

    raritiesKicker: "Huit raretés",
    raritiesTitle: "Du gris terne au rouge interdit",
    raritiesDesc:
      "L'échelle part froide et terne, puis passe volontairement au chaud et saturé : un palier haut se reconnaît d'un coup d'œil, sans lire son nom. Les trois derniers ne se tirent que dans les caisses de fin de partie — ni l'upgrader, ni le jackpot, ni la collection ne les fabriquent.",
    globalDraw: "tirage global",
    caseOnly: "caisse uniquement",

    wearKicker: "Cinq usures",
    wearTitle: "La même arme, deux fois et demie sa valeur",
    wearDesc:
      "L'usure nuance, elle n'écrase pas : une Neuve vaut deux Délabrées et demie. C'est la rareté qui porte la valeur.",

    casesKicker: "Douze caisses",
    casesTitle: "De la gratuite à la Marble",
    casesDesc:
      "Chaque caisse rend 0,80 de son prix en valeur revendable — le même rapport partout, du Standard gratuit à la Marble à 140 000 $. Les caisses ne sont pas un investissement, elles sont une loterie honnête.",
    free: "Gratuite",
    gift: "Cadeau",

    forgeKicker: "Ce qu'on fait des doublons",
    forgeTitle: "Trois façons de transformer un stock en une pièce",

    casinoKicker: "Le casino",
    casinoTitle: "Quatre tables, aucun avantage maison",
    casinoDesc:
      "Mines, plinko, crash et jackpot rendent exactement 1 sur la durée. Ce n'est pas une source de revenu déguisée : c'est de la variance, et c'est tout ce que ça prétend être.",

    endKicker: "Le long terme",
    endTitle: "Le farm tourne pendant que tu dors",
    endDesc:
      "Tes cinq meilleures armes rapportent hors ligne, en continu. Ta puissance — le DPS de ces cinq-là — te fait monter les divisions, qui débloquent caisses et modes. Et quand tu as tout vu, le prestige remet tout à zéro contre une monnaie qui, elle, ne repart jamais.",
    divisionsLabel: "Treize divisions",

    ctaKicker: "Disponible maintenant",
    ctaTitle: "Ouvre ta première caisse.",
    ctaDesc: "Android · Gratuit, avec pubs et achats intégrés.",
    privacy: "Politique de confidentialité",
  },
  en: {
    back: "Back to home",
    badge: "Case opening · Android",
    formerly: "Formerly Pixel Gun Gambler",
    lede: "One reel, eight rarities, five wear states. Open, fuse, stake, trade — and watch your arsenal climb the divisions. 100% virtual currency: nothing cashes out.",
    cta: "Get it on Google Play",

    reelKicker: "The opening",
    reelTitle: "The reel stops on exactly one.",
    reelDesc:
      "Every case scrolls its pool past a marker. The tier lands first, then the weapon, then the wear — and no single weapon takes more than 15% of a case's draws, so every other opening doesn't hand you the same sprite.",

    raritiesKicker: "Eight rarities",
    raritiesTitle: "From dull grey to forbidden red",
    raritiesDesc:
      "The scale starts cold and washed out, then deliberately turns warm and saturated: a high tier reads at a glance, without reading its name. The last three only drop from late-game cases — the upgrader, the jackpot and the collection never make them.",
    globalDraw: "global draw",
    caseOnly: "case only",

    wearKicker: "Five wear states",
    wearTitle: "The same weapon, two and a half times the value",
    wearDesc:
      "Wear shades the value, it doesn't drown it: a Pristine is worth two and a half Wrecked. Rarity carries the value.",

    casesKicker: "Twelve cases",
    casesTitle: "From free to Marble",
    casesDesc:
      "Every case returns 0.80 of its price in resellable value — the same ratio everywhere, from the free Standard to the $140,000 Marble. Cases aren't an investment, they're an honest lottery.",
    free: "Free",
    gift: "Gift",

    forgeKicker: "What duplicates are for",
    forgeTitle: "Three ways to turn a pile into a piece",

    casinoKicker: "The casino",
    casinoTitle: "Four tables, zero house edge",
    casinoDesc:
      "Mines, plinko, crash and jackpot return exactly 1 over time. It is not a disguised revenue stream: it is variance, and that is all it claims to be.",

    endKicker: "The long game",
    endTitle: "The farm runs while you sleep",
    endDesc:
      "Your five best weapons earn offline, continuously. Your power — the DPS of those five — climbs the divisions, which unlock cases and modes. And once you've seen it all, prestige wipes the board for a currency that never resets.",
    divisionsLabel: "Thirteen divisions",

    ctaKicker: "Out now",
    ctaTitle: "Open your first case.",
    ctaDesc: "Android · Free, with ads and in-app purchases.",
    privacy: "Privacy policy",
  },
} as const;

function formatPrice(value: number, locale: "fr" | "en"): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US").format(value);
}

export default function PixelArsenalPage({ game, locale }: PixelArsenalPageProps) {
  const prefix = locale === "en" ? "/en" : "";
  const c = COPY[locale];
  const store = game.platforms[0];

  /* La bande de la roulette : le pool répété deux fois, pour que la
     translation de -50 % reboucle sans saut visible. */
  const reel = [...RARITIES, ...RARITIES, ...RARITIES, ...RARITIES];

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="game-heading"
        className="soft-noise relative isolate overflow-hidden bg-white px-6 pt-28 pb-16"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src={withBasePath("/hero.svg")}
            alt=""
            className="h-full w-full object-cover opacity-[0.6]"
          />
        </div>

        <div className="mx-auto max-w-5xl">
          <Link
            href={prefix || "/"}
            className="mb-10 inline-flex items-center gap-2 text-xs font-medium text-zinc-700 transition-colors duration-200 hover:text-zinc-950"
          >
            <ArrowLeft size={14} />
            {c.back}
          </Link>

          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <span className="sticker mb-5 inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#4A3505]">
                <Sparkles size={12} className="text-[#D69A1E]" />
                {c.badge}
              </span>

              <h1
                id="game-heading"
                className="mb-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-6xl"
              >
                {game.name}
              </h1>

              <p className="mb-3 text-base text-zinc-700 sm:text-lg">{game.tagline}</p>
              <p className="mb-8 max-w-xl text-sm leading-relaxed text-zinc-600">
                {c.lede}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={store.url}
                  className="btn-duo inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold"
                  style={{ background: "#D69A1E", color: "#2A1D02" }}
                >
                  <PlayIcon />
                  {c.cta}
                </a>
                <Link
                  href={`${prefix}${game.privacyPath}`}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 transition-colors duration-200 hover:text-zinc-700"
                >
                  <Shield size={12} />
                  {c.privacy}
                </Link>
              </div>

              <p className="mt-6 text-[11px] tracking-[0.14em] uppercase text-zinc-400">
                {c.formerly}
              </p>
            </div>

            {game.iconImage ? (
              <div className="justify-self-center">
                <div
                  className="rounded-[1.4rem] border border-zinc-950/10 p-3"
                  style={{ background: "#FCF3DC" }}
                >
                  <img
                    src={withBasePath(game.iconImage)}
                    alt=""
                    width={512}
                    height={512}
                    className="h-40 w-40 rounded-[1rem] object-cover [image-rendering:pixelated] sm:h-52 sm:w-52"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── La roulette : bande sombre, contraste franc avec le reste ─── */}
      <section
        aria-labelledby="reel-heading"
        className="relative isolate overflow-hidden bg-[#14161B] px-6 py-[var(--padding-vertical)]"
      >
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#D69A1E]">
            {c.reelKicker}
          </p>
          <h2
            id="reel-heading"
            className="mb-4 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl"
          >
            {c.reelTitle}
          </h2>
          <p className="mb-10 max-w-2xl text-sm leading-relaxed text-zinc-400">
            {c.reelDesc}
          </p>
        </div>

        {/* Bande pleine largeur, volontairement débordante du conteneur */}
        <div className="relative -mx-6">
          <div className="pa-reel-mask relative h-28 overflow-hidden border-y border-white/10">
            <div className="pa-reel flex h-full items-stretch gap-2 px-2">
              {reel.map((rarity, index) => (
                <div
                  key={`${rarity.id}-${index}`}
                  aria-hidden={index >= RARITIES.length * 2}
                  className="flex h-full w-24 shrink-0 flex-col justify-end rounded-md border-b-4 bg-white/[0.04] p-2 sm:w-28"
                  style={{ borderBottomColor: rarity.color }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: rarity.color, boxShadow: `0 0 12px ${rarity.color}` }}
                  />
                  <span className="mt-2 text-[10px] font-semibold tracking-[0.12em] uppercase text-zinc-400">
                    {locale === "fr" ? rarity.fr : rarity.en}
                  </span>
                </div>
              ))}
            </div>

            {/* Le curseur : c'est lui qui décide */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-[#D69A1E]"
              style={{ boxShadow: "0 0 18px rgba(214,154,30,0.9)" }}
            />
          </div>
        </div>
      </section>

      {/* ── Huit raretés ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="rarities-heading"
        className="mx-auto max-w-5xl px-6 py-[var(--padding-vertical)]"
      >
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-zinc-950">
          {c.raritiesKicker}
        </p>
        <h2
          id="rarities-heading"
          className="mb-4 text-2xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-3xl"
        >
          {c.raritiesTitle}
        </h2>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-zinc-600">
          {c.raritiesDesc}
        </p>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RARITIES.map((rarity) => (
            <li
              key={rarity.id}
              className="card-duo relative overflow-hidden p-4 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: rarity.color }}
              />
              <div className="mb-3 flex items-center gap-2.5">
                <span
                  className="h-3.5 w-3.5 rounded-sm"
                  style={{ background: rarity.color }}
                />
                <span className="text-sm font-semibold text-zinc-950">
                  {locale === "fr" ? rarity.fr : rarity.en}
                </span>
              </div>
              {rarity.weight === null ? (
                <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-zinc-400">
                  {c.caseOnly}
                </p>
              ) : (
                <>
                  <div className="mb-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-950/8">
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${rarity.weight}%`, background: rarity.color }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    {rarity.weight}%{" "}
                    <span className="text-zinc-400">{c.globalDraw}</span>
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Usure ────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="wear-heading"
        className="border-y border-zinc-950/8 bg-[var(--color-surface-raised)] px-6 py-[var(--padding-vertical)]"
      >
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-zinc-950">
            {c.wearKicker}
          </p>
          <h2
            id="wear-heading"
            className="mb-4 text-2xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-3xl"
          >
            {c.wearTitle}
          </h2>
          <p className="mb-10 max-w-2xl text-sm leading-relaxed text-zinc-600">
            {c.wearDesc}
          </p>

          <ol className="grid gap-3 sm:grid-cols-5">
            {WEARS.map((wear) => (
              <li
                key={wear.fr}
                className="rounded-xl border border-zinc-950/10 bg-white p-4 text-center"
              >
                <p className="mb-1 font-mono text-lg font-semibold text-[#4A3505]">
                  ×{wear.multiplier.toLocaleString(locale === "fr" ? "fr-FR" : "en-US")}
                </p>
                <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-zinc-500">
                  {locale === "fr" ? wear.fr : wear.en}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Caisses ──────────────────────────────────────────────────── */}
      <section
        aria-labelledby="cases-heading"
        className="mx-auto max-w-5xl px-6 py-[var(--padding-vertical)]"
      >
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-zinc-950">
          {c.casesKicker}
        </p>
        <h2
          id="cases-heading"
          className="mb-4 text-2xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-3xl"
        >
          {c.casesTitle}
        </h2>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-zinc-600">
          {c.casesDesc}
        </p>

        <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((item, index) => (
            <li
              key={item.name}
              className="flex items-center justify-between gap-4 rounded-xl border border-zinc-950/10 bg-white px-4 py-3 transition-colors duration-200 hover:border-[#D69A1E]"
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-zinc-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-zinc-950">
                  <Boxes size={14} className="text-[#D69A1E]" />
                  {item.name}
                </span>
              </span>
              <span className="font-mono text-xs text-zinc-500">
                {item.gift
                  ? c.gift
                  : item.price === 0
                    ? c.free
                    : `$${formatPrice(item.price, locale)}`}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── La forge ─────────────────────────────────────────────────── */}
      <section
        aria-labelledby="forge-heading"
        className="border-y border-zinc-950/8 bg-[var(--color-surface-raised)] px-6 py-[var(--padding-vertical)]"
      >
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-zinc-950">
            {c.forgeKicker}
          </p>
          <h2
            id="forge-heading"
            className="mb-10 text-2xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-3xl"
          >
            {c.forgeTitle}
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {FORGE_MODES.map((mode) => {
              const copy = mode[locale];
              return (
                <article
                  key={mode.id}
                  className="card-duo flex flex-col p-6 transition-transform duration-200 hover:-translate-y-1"
                >
                  <span
                    className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: `${mode.color}22`, color: mode.color }}
                  >
                    <mode.Icon size={18} strokeWidth={2.2} />
                  </span>
                  <h3 className="mb-2 text-lg font-semibold tracking-[-0.02em] text-zinc-950">
                    {copy.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600">{copy.desc}</p>

                  {mode.id === "fusion" ? (
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-hidden>
                      {FUSION_METALS.map((metal, index) => (
                        <li
                          key={metal + index}
                          className="h-4 w-4 rounded-[3px] border border-zinc-950/10"
                          style={{ background: metal }}
                        />
                      ))}
                    </ul>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Casino ───────────────────────────────────────────────────── */}
      <section
        aria-labelledby="casino-heading"
        className="relative isolate overflow-hidden bg-[#14161B] px-6 py-[var(--padding-vertical)]"
      >
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#D69A1E]">
            {c.casinoKicker}
          </p>
          <h2
            id="casino-heading"
            className="mb-4 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl"
          >
            {c.casinoTitle}
          </h2>
          <p className="mb-10 max-w-2xl text-sm leading-relaxed text-zinc-400">
            {c.casinoDesc}
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CASINO_MODES.map((mode) => {
              const copy = mode[locale];
              return (
                <article
                  key={mode.id}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-200 hover:border-white/25"
                >
                  <span
                    className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: `${mode.color}1f`, color: mode.color }}
                  >
                    <mode.Icon size={17} strokeWidth={2.2} />
                  </span>
                  <h3 className="mb-1.5 text-base font-semibold text-white">
                    {copy.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-400">{copy.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Long terme ───────────────────────────────────────────────── */}
      <section
        aria-labelledby="end-heading"
        className="mx-auto max-w-5xl px-6 py-[var(--padding-vertical)]"
      >
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-zinc-950">
              {c.endKicker}
            </p>
            <h2
              id="end-heading"
              className="mb-4 text-2xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-3xl"
            >
              {c.endTitle}
            </h2>
            <p className="text-sm leading-relaxed text-zinc-600">{c.endDesc}</p>
          </div>

          <div className="rounded-2xl border border-zinc-950/10 bg-white p-6">
            <p className="mb-5 flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-zinc-400">
              <TrendingUp size={13} className="text-[#D69A1E]" />
              {c.divisionsLabel}
            </p>
            <ol className="space-y-3">
              {DIVISIONS.map((division, index) => (
                <li key={division.fr} className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 shrink-0 rounded-sm border border-zinc-950/10"
                    style={{ background: division.color }}
                  />
                  <span className="flex-1 text-sm font-medium text-zinc-800">
                    {locale === "fr" ? division.fr : division.en}
                  </span>
                  <span
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${28 + index * 16}px`,
                      background: division.color,
                      opacity: 0.55,
                    }}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="cta-heading"
        className="border-t border-zinc-950/8 px-6 py-[var(--padding-vertical)]"
        style={{ background: "#FCF3DC" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#4A3505] opacity-70">
            {c.ctaKicker}
          </p>
          <h2
            id="cta-heading"
            className="mb-3 text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl"
          >
            {c.ctaTitle}
          </h2>
          <p className="mb-8 text-sm text-zinc-600">{c.ctaDesc}</p>
          <a
            href={store.url}
            className="btn-duo inline-flex items-center gap-2 px-7 py-3.5 text-xs font-semibold"
            style={{ background: "#D69A1E", color: "#2A1D02" }}
          >
            <PlayIcon />
            {store.label}
          </a>
        </div>
      </section>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.19 0 .38.04.56.12l16 8c.54.27.87.82.87 1.38s-.34 1.11-.87 1.38l-16 8c-.18.08-.37.12-.56.12-.83 0-1.5-.67-1.5-1.5z" />
    </svg>
  );
}
