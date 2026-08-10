interface GameTheme {
  readonly accent: string;
  readonly accentDim: string;
  readonly accentInk: string;
}

interface GameData {
  readonly slug: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly platforms: readonly Platform[];
  readonly status: "released" | "coming-soon";
  readonly privacyPath: string;
  readonly gamePath: string;
  readonly presentationImage?: string;
  /** Icône carrée, utilisée comme visuel quand le jeu n'a pas d'animation dédiée. */
  readonly iconImage?: string;
  readonly theme?: GameTheme;
  readonly privacyPolicy?: PrivacyPolicy;
}

interface Platform {
  readonly name: string;
  readonly label: string;
  readonly url: string;
}

type PrivacyBlock =
  | {
      readonly type: "paragraph";
      readonly text: string;
    }
  | {
      readonly type: "list";
      readonly items: readonly string[];
    };

interface PrivacyPolicySection {
  readonly title: string;
  readonly blocks: readonly PrivacyBlock[];
}

interface PrivacyPolicy {
  readonly lastUpdated: string;
  readonly sections: readonly PrivacyPolicySection[];
}

const GAMES: readonly GameData[] = [
  {
    slug: "globetrot",
    name: "GlobeTrot",
    tagline: "Testez vos connaissances en géographie mondiale",
    description:
      "GlobeTrot transforme la géographie en jeu de découverte. Place les pays sur une vraie carte du monde, reconnais les drapeaux, les capitales et les devises, et explore les régions et villes de chaque pays. Un Défi Quotidien, un mode Voyage par frontières terrestres, des thèmes de carte à débloquer en jouant en Expert -- pour les curieux du globe.",
    features: [
      "Placer le pays -- sur la carte du monde",
      "Trouver par drapeau, capitale ou devise",
      "Mode Voyage -- traverse les frontières d'un pays à l'autre",
      "Carte Interactive -- explore régions et villes par pays",
      "Défi Quotidien -- une nouvelle partie chaque jour",
      "Mode Infini + thèmes de carte à débloquer",
    ],
    platforms: [
      {
        name: "android",
        label: "Google Play",
        url: "#",
      },
    ],
    status: "released",
    privacyPath: "/privacy/globetrot",
    gamePath: "/games/globetrot",
    presentationImage: "/games/globetrot_presentation.png",
    privacyPolicy: {
      lastUpdated: "April 2026",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: "GlobeTrot is a geography quiz game developed by NODIN Studio. This policy describes what data the app collects, how it is used, and your choices regarding that data.",
            },
          ],
        },
        {
          title: "Data We Collect",
          blocks: [
            {
              type: "paragraph",
              text: "GlobeTrot collects the following data:",
            },
            {
              type: "list",
              items: [
                "Game progress — your campaign advancement, scores, unlocked regions, and completed challenges.",
                "Coins and Wonders — in-game currency and collectible items earned through gameplay.",
                "Device language — used to display the app in your preferred language.",
              ],
            },
          ],
        },
        {
          title: "Cloud Save",
          blocks: [
            {
              type: "paragraph",
              text: "Game progress may be synced using Apple Game Center on iOS and Google Play Games on Android (depending on your device and settings). These services are managed by Apple and Google respectively. No separate account is required to use GlobeTrot — your platform account handles authentication and cloud saves.",
            },
          ],
        },
        {
          title: "Third-Party Data Sharing",
          blocks: [
            {
              type: "paragraph",
              text: "We do not sell your personal data. Game data synced through Apple Game Center or Google Play Games is governed by the respective platform policies.",
            },
          ],
        },
        {
          title: "No Account Required",
          blocks: [
            {
              type: "paragraph",
              text: "GlobeTrot does not require you to create an account. You do not need to provide an email address, name, or other personal information to play.",
            },
          ],
        },
        {
          title: "Children's Privacy",
          blocks: [
            {
              type: "paragraph",
              text: "GlobeTrot does not knowingly collect personal information from children under 13. The app does not require personal data to function.",
            },
          ],
        },
        {
          title: "Changes to This Policy",
          blocks: [
            {
              type: "paragraph",
              text: "We may update this policy from time to time. Changes will be reflected on this page with an updated revision date.",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "pixel-gun-gambler",
    name: "Pixel Gun Gambler",
    tagline: "Ouvre des caisses, collectionne les armes, tente ta chance",
    description:
      "Pixel Gun Gambler est un simulateur d'ouverture de caisses en pixel art. Ouvre des caisses pour décrocher des armes de plus en plus rares, améliore tes exemplaires, complète ta collection et fais tourner les jeux du casino — le tout avec une monnaie 100 % virtuelle. Aucun argent réel, aucun compte, aucune connexion : tout se joue hors ligne, sur ton appareil.",
    features: [
      "Ouverture de caisses — roulette, usure et raretés",
      "Arsenal — améliore chaque arme, débloque ses skins",
      "Upgrader — mise une arme contre cinq offres",
      "Farm AFK — tes cinq meilleures armes rapportent",
      "Collection — des lots à compléter, des paliers à réclamer",
      "Casino — mines, plinko, crash et jackpot d'armes",
    ],
    platforms: [
      {
        name: "android",
        label: "Google Play",
        url: "#",
      },
    ],
    status: "released",
    privacyPath: "/privacy/pixel-gun-gambler",
    gamePath: "/games/pixel-gun-gambler",
    iconImage: "/games/pixel-gun-gambler/icon.png",
    theme: {
      accent: "#D69A1E",
      accentDim: "#FCF3DC",
      accentInk: "#4A3505",
    },
    privacyPolicy: {
      lastUpdated: "August 2026",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: "Pixel Gun Gambler is a pixel-art case-opening game developed by NODIN Studio. The app runs entirely offline and collects no personal data. This policy explains what that means in practice.",
            },
          ],
        },
        {
          title: "No Data Collected",
          blocks: [
            {
              type: "paragraph",
              text: "Pixel Gun Gambler collects no personal information whatsoever. The app requests no Android permissions — it has no internet access — so no name, email address, location, contact, advertising identifier, or device identifier is collected, and nothing is ever sent to NODIN Studio or to any server.",
            },
          ],
        },
        {
          title: "Data Stored on Your Device",
          blocks: [
            {
              type: "paragraph",
              text: "Your progress is saved in a local file on your device, and never leaves it. It contains only gameplay state:",
            },
            {
              type: "list",
              items: [
                "Virtual balance and player level.",
                "Weapon inventory — rarity, wear, upgrade level and equipped skin of each item.",
                "Progression — cases opened, collection milestones claimed, AFK farm state.",
              ],
            },
            {
              type: "paragraph",
              text: "Uninstalling the app deletes this file and all of your progress. There is no cloud save and no way to recover it.",
            },
          ],
        },
        {
          title: "No Account Required",
          blocks: [
            {
              type: "paragraph",
              text: "Pixel Gun Gambler does not require you to create an account or sign in. No login, no profile, no registration of any kind.",
            },
          ],
        },
        {
          title: "No Ads, No Analytics, No Purchases",
          blocks: [
            {
              type: "paragraph",
              text: "The app contains no advertising network, no analytics SDK, no crash reporting and no tracking library. It offers no in-app purchases, so no payment information is ever handled. No data is shared or sold to third parties, because no data is collected in the first place.",
            },
          ],
        },
        {
          title: "Simulated Gambling, Virtual Currency Only",
          blocks: [
            {
              type: "paragraph",
              text: "Case openings and casino modes are simulations played with in-game currency that has no monetary value. Nothing can be bought with real money, and in-game currency and items cannot be cashed out, traded or exchanged for anything of real-world value. The game is intended as entertainment and does not offer an opportunity to win real money or prizes.",
            },
          ],
        },
        {
          title: "Children's Privacy",
          blocks: [
            {
              type: "paragraph",
              text: "Pixel Gun Gambler does not knowingly collect personal information from children under 13, and does not collect personal information from anyone. Note that the game features simulated gambling themes and is intended for a mature audience.",
            },
          ],
        },
        {
          title: "Changes to This Policy",
          blocks: [
            {
              type: "paragraph",
              text: "We may update this policy from time to time. Changes will be reflected on this page with an updated revision date.",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "wby",
    name: "WBY",
    tagline: "Des questions qui créent de vraies conversations",
    description:
      "Un jeu de cartes de questions profondes pour mieux se connaître. Chaque thème t'emmène dans un territoire différent — de l'introspection à la connexion, du deuil amoureux à la première rencontre.",
    features: [
      "Thème Date — briser la glace autrement",
      "Thème Couple — aller plus loin ensemble",
      "Thème Famille — ce qu'on n'ose pas dire",
      "Thème Breakup — faire le point",
      "Thème Self-réflexion — se connaître soi-même",
    ],
    platforms: [
      {
        name: "ios",
        label: "App Store",
        url: "#",
      },
      {
        name: "android",
        label: "Google Play",
        url: "#",
      },
    ],
    status: "coming-soon",
    privacyPath: "/privacy/wby",
    gamePath: "/games/wby",
    theme: {
      accent: "#002FA7",
      accentDim: "#E2EAFF",
      accentInk: "#001E6E",
    },
    privacyPolicy: {
      lastUpdated: "April 2026",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: "WBY is a deep-conversation card game developed by NODIN Studio. WBY does not collect, store, or transmit any personal data. This policy explains what that means in practice.",
            },
          ],
        },
        {
          title: "No Data Collected",
          blocks: [
            {
              type: "paragraph",
              text: "WBY collects no personal information whatsoever. No account is required. No name, email address, location, or device identifier is collected or sent to any server. Questions and answers exchanged during gameplay exist only between the players in the room — they are never recorded or transmitted.",
            },
          ],
        },
        {
          title: "In-App Purchases",
          blocks: [
            {
              type: "paragraph",
              text: "Expansion packs are available as in-app purchases processed entirely by Apple App Store or Google Play. NODIN Studio does not collect or store any payment information. All billing is handled by your platform account under Apple's and Google's respective privacy policies.",
            },
          ],
        },
        {
          title: "No Third-Party Analytics",
          blocks: [
            {
              type: "paragraph",
              text: "WBY does not include any analytics SDK, advertising network, or tracking library. No usage data is shared with third parties.",
            },
          ],
        },
        {
          title: "Changes to This Policy",
          blocks: [
            {
              type: "paragraph",
              text: "We may update this policy from time to time. Changes will be reflected on this page with an updated revision date.",
            },
          ],
        },
      ],
    },
  },
] as const;

function getGameBySlug(slug: string): GameData | undefined {
  return GAMES.find((game) => game.slug === slug);
}

const HIDDEN_SLUGS = new Set(["wby"]);

function getAllGames(): readonly GameData[] {
  return GAMES.filter((game) => !HIDDEN_SLUGS.has(game.slug));
}

export type { GameData, GameTheme, Platform };
export { GAMES, getGameBySlug, getAllGames };
