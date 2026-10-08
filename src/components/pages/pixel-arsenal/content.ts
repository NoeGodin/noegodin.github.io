/* Donnees et textes de la page Pixel Arsenal. Les sprites sont copies tels
   quels depuis assets/ du jeu, les captures depuis build/store/screens/play
   (tools/gen_store_screens.py), converties en WebP 540x960. */

/** Palette du jeu (ui/theme/ui_tokens.gd), recopiee telle quelle. */
export const INK = {
  bgTop: "#1a1c21",
  bgBottom: "#14161b",
  spot: "#262a33",
  surface: "#1d2027",
  well: "#14161b",
  border: "#3a3f4d",
  text: "#e8e6f0",
  muted: "#9aa0ad",
  gold: "#ffd75e",
  glow: "#e8b866",
} as const;

export const BASE = "/games/pixel-arsenal";

/** Couleurs de rarete du jeu (data/rarity.gd), pour les liseres. */
export const RARITY = {
  common: { color: "#9ba6b4", fr: "Commun", en: "Common" },
  uncommon: { color: "#35e06a", fr: "Peu commun", en: "Uncommon" },
} as const;

/* Armes de la caisse Standard, la premiere du jeu, sans sa relique : la
   page ne doit rien devoiler qui se merite. */
export const WEAPONS: ReadonlyArray<{
  file: string;
  name: string;
  rarity: keyof typeof RARITY;
}> = [
  { file: "uzi", name: "UZ-9", rarity: "common" },
  { file: "sten", name: "Sten Mk II", rarity: "common" },
  { file: "grease_gun", name: "M3 Grease Gun", rarity: "common" },
  { file: "mosin", name: "Mosin-Nagant 91/30", rarity: "common" },
  { file: "double_barrel", name: "Double Barrel", rarity: "common" },
  { file: "beretta_680", name: "M680", rarity: "common" },
  { file: "m1917", name: "M1917 Browning", rarity: "common" },
  { file: "pmm", name: "PMM", rarity: "common" },
  { file: "derringer", name: "Derringer", rarity: "common" },
  { file: "meche", name: "Pistolet à Mèche", rarity: "common" },
  { file: "plastic_gun", name: "Plastic Gun", rarity: "common" },
  { file: "mp40", name: "MP 40", rarity: "uncommon" },
  { file: "stg_44", name: "StG 44", rarity: "uncommon" },
  { file: "m1911", name: "M1911", rarity: "uncommon" },
  { file: "remington_1100", name: "Model 1105", rarity: "uncommon" },
  { file: "sub2010", name: "Sub-2010", rarity: "uncommon" },
  { file: "webley", name: "Webber 1910", rarity: "uncommon" },
];

/** Caisses du jeu, de la moins chere a la plus chere (data/cases/*.tres). */
export const CASES: ReadonlyArray<{ file: string; name: string }> = [
  { file: "case_standard", name: "Standard" },
  { file: "case_red", name: "Red" },
  { file: "case_military", name: "Military" },
  { file: "case_confidential", name: "Confidential" },
  { file: "case_mysterious", name: "Mysterious" },
  { file: "case_top-secret", name: "Top Secret" },
  { file: "case_premium", name: "Premium" },
  { file: "case_bio_hasard", name: "Toxic" },
  { file: "case_sahur", name: "Sahur" },
  { file: "case_diamond", name: "Diamond" },
  { file: "case_marble", name: "Marble" },
  { file: "case_eclipse", name: "Eclipse" },
  { file: "case_obsidian", name: "Obsidian" },
  { file: "case_nebula", name: "Nebula" },
  { file: "case_singularity", name: "Singularity" },
  { file: "case_supernova", name: "Supernova" },
];

export const CASINO = [
  { icon: "mode_mines", fr: "Mines", en: "Mines" },
  { icon: "mode_plinko", fr: "Plinko", en: "Plinko" },
  { icon: "mode_crash", fr: "Crash", en: "Crash" },
  { icon: "mode_jackpot", fr: "Jackpot", en: "Jackpot" },
  { icon: "mode_roulette", fr: "Roulette", en: "Roulette" },
  { icon: "mode_blackjack", fr: "Blackjack", en: "Blackjack" },
  { icon: "mode_poker", fr: "Poker", en: "Poker" },
  { icon: "mode_slots", fr: "Machine", en: "Slots" },
] as const;

interface Feature {
  readonly icon: string;
  readonly fr: { readonly title: string; readonly desc: string };
  readonly en: { readonly title: string; readonly desc: string };
}

export const WORKBENCH: readonly Feature[] = [
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
    icon: "mode_lapidary",
    fr: { title: "Lapidaire", desc: "Taille tes pierres brutes, sertis les gemmes sur tes armes." },
    en: { title: "Lapidary", desc: "Cut your raw stones, set the gems into your weapons." },
  },
  {
    icon: "mode_afk_farm",
    fr: { title: "Farm AFK", desc: "Tes cinq meilleures armes rapportent, même hors ligne." },
    en: { title: "AFK farm", desc: "Your five best weapons earn, even while you are away." },
  },
];

export const ADVENTURE: readonly Feature[] = [
  {
    icon: "mode_campaign",
    fr: {
      title: "Campagne",
      desc: "Tes cinq meilleures armes contre un monstre, étape après étape. Chaque victoire paie, chaque mur dit qu'il est temps de fusionner.",
    },
    en: {
      title: "Campaign",
      desc: "Your five best weapons against a monster, stage after stage. Every win pays, every wall says it is time to fuse.",
    },
  },
  {
    icon: "mode_survivor",
    fr: { title: "Arène", desc: "Tiens face aux vagues, choisis tes bonus, abats le boss." },
    en: { title: "Arena", desc: "Hold against the waves, pick your perks, take the boss down." },
  },
  {
    icon: "mode_garden",
    fr: { title: "Jardin", desc: "Les tables du casino lâchent des œufs. Fais-les éclore." },
    en: { title: "Garden", desc: "Casino tables drop eggs. Hatch them." },
  },
];

/** Captures store, dans l'ordre de la fiche. */
export const SCREENS = [
  "01_ouverture",
  "02_revelation",
  "03_inventaire",
  "04_casino",
  "05_farm",
  "06_accueil",
] as const;

export const COPY = {
  fr: {
    back: "Retour à l'accueil",
    lede: "Ouvre des caisses, décroche des armes rares, monte ton arsenal. Seize caisses, huit tables de casino, une campagne et une arène.",
    rating: "18+ · Hasard simulé, monnaie du jeu uniquement",
    soon: "Bientôt",
    screensAlt: "Capture du jeu",
    screensHint: "Fais défiler",

    casesKicker: "01 / Caisses",
    casesTitle: "Ouvre, et vois ce qui tombe",
    casesLede:
      "Seize caisses, de la Standard gratuite à la Supernova. Chaque palier débloque la suivante, et les probabilités de chacune sont affichées avant d'ouvrir.",
    casesChips: ["Une caisse gratuite chaque jour", "Ouverture multiple", "Probabilités affichées"],

    casinoKicker: "02 / Casino",
    casinoTitle: "Tente ta chance",
    casinoLede:
      "Huit tables pour faire grossir ton magot, ou tout perdre. Monnaie du jeu uniquement : rien ne s'encaisse, rien ne s'échange.",

    collectionKicker: "03 / Collection",
    collectionTitle: "Attrape les toutes",
    collectionLede:
      "Chaque arme trouvée rejoint ta collection pour de bon. Voici la première caisse. Le reste, il faudra l'ouvrir.",

    inventoryKicker: "04 / Arsenal",
    inventoryTitle: "Fais monter tes armes",
    inventoryLede:
      "Améliore tes préférées, fusionne tes doublons pour les étoiler, habille-les d'un camo. Ton arsenal fixe ta division.",

    adventureKicker: "05 / Aventure",
    adventureTitle: "Mets ton arsenal a l'epreuve",
    adventureLede: "Ce que tu as ouvert, il faut maintenant le faire tirer.",

    supportKicker: "Support",
    supportTitle: "Un souci ? On est la",
    supportLede:
      "Ton ID joueur est dans Réglages, section Support. Le bouton Contacter le support l'envoie avec ta question.",
    supportLinks: { support: "Aide et achats", terms: "Conditions d'utilisation", privacy: "Confidentialité" },

    ctaTitle: "Ouvre. Fusionne. Recommence.",
    ctaLede: "Gratuit, avec achats intégrés facultatifs.",
  },
  en: {
    back: "Back to home",
    lede: "Open cases, land rare guns, build your arsenal. Sixteen cases, eight casino tables, a campaign and an arena.",
    rating: "18+ · Simulated chance, in-game currency only",
    soon: "Coming soon",
    screensAlt: "Game screenshot",
    screensHint: "Scroll",

    casesKicker: "01 / Cases",
    casesTitle: "Open one, see what drops",
    casesLede:
      "Sixteen cases, from the free Standard to the Supernova. Each tier unlocks the next, and every case shows its odds before you open it.",
    casesChips: ["A free case every day", "Multi-open", "Odds on display"],

    casinoKicker: "02 / Casino",
    casinoTitle: "Push your luck",
    casinoLede:
      "Eight tables to grow your stack, or lose it all. In-game currency only: nothing cashes out, nothing trades.",

    collectionKicker: "03 / Collection",
    collectionTitle: "Catch them all",
    collectionLede:
      "Every weapon you find joins your collection for good. Here is the first case. The rest, you will have to open.",

    inventoryKicker: "04 / Arsenal",
    inventoryTitle: "Level your weapons up",
    inventoryLede:
      "Upgrade your favourites, fuse duplicates to star them, dress them in a camo. Your arsenal sets your division.",

    adventureKicker: "05 / Adventure",
    adventureTitle: "Put your arsenal to work",
    adventureLede: "What you opened, now make it shoot.",

    supportKicker: "Support",
    supportTitle: "Need help? We are here",
    supportLede:
      "Your player ID is in Settings, Support section. The Contact support button sends it along with your question.",
    supportLinks: { support: "Help and purchases", terms: "Terms of use", privacy: "Privacy" },

    ctaTitle: "Open. Fuse. Repeat.",
    ctaLede: "Free, with optional in-app purchases.",
  },
} as const;
