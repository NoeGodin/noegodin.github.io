import type { LegalDocument } from "./legal/types";
import { PIXEL_ARSENAL_TERMS } from "./legal/pixelArsenalTerms";
import { PIXEL_ARSENAL_SUPPORT } from "./legal/pixelArsenalSupport";
import { STUDIO_EMAIL } from "./studio";

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
  /**
   * Cadrage de `presentationImage`. « cover » recadre pour remplir la tuile
   * (capture d'écran, dont on peut couper les bords) ; « contain » montre
   * l'image ENTIÈRE sur `presentationBackground` (bannière composée, dont
   * couper un bord détruirait le titre).
   */
  readonly presentationFit?: "cover" | "contain";
  /** Fond posé derrière une image « contain ». Prolonge son propre fond. */
  readonly presentationBackground?: string;
  /** Icône carrée, utilisée comme visuel quand le jeu n'a pas d'animation dédiée. */
  readonly iconImage?: string;
  readonly theme?: GameTheme;
  readonly privacyPolicy?: LegalDocument;
  /** Conditions d'utilisation, servies sous /terms/<slug>. */
  readonly terms?: LocalizedDocuments;
  /** Page support (URL de support des fiches store), sous /support/<slug>. */
  readonly support?: LocalizedDocuments;
}

interface Platform {
  readonly name: string;
  readonly label: string;
  /** Vide tant que la fiche n'est pas en ligne : affiché « bientôt ». */
  readonly url: string;
}

interface LocalizedDocuments {
  readonly fr: LegalDocument;
  readonly en: LegalDocument;
}

const GAMES: readonly GameData[] = [
  {
    slug: "globetrot",
    name: "GlobeTrot",
    tagline: "Testez vos connaissances en géographie mondiale",
    description:
      "GlobeTrot transforme la géographie en jeu de découverte. Place les pays sur une vraie carte du monde, reconnais les drapeaux, les capitales et les devises, et explore les régions et villes de chaque pays. Un Défi Quotidien, un mode Voyage par frontières terrestres, des thèmes de carte à débloquer en jouant en Expert, pour les curieux du globe.",
    features: [
      "Placer le pays sur la carte du monde",
      "Trouver par drapeau, capitale ou devise",
      "Mode Voyage : traverse les frontières d'un pays à l'autre",
      "Carte Interactive : explore régions et villes par pays",
      "Défi Quotidien : une nouvelle partie chaque jour",
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
      lastUpdated: "October 2026",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: "GlobeTrot is a geography quiz game developed by NODIN Studio for players of all ages, including children. This policy describes what data the app collects, how it is used, and your choices regarding that data.",
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
                "Game progress: your campaign advancement, scores, unlocked regions, and completed challenges.",
                "Coins and Wonders: in-game currency and collectible items earned through gameplay.",
                "Device language: used to display the app in your preferred language.",
              ],
            },
          ],
        },
        {
          title: "Cloud Save",
          blocks: [
            {
              type: "paragraph",
              text: "Game progress may be synced using Apple Game Center on iOS and Google Play Games on Android (depending on your device and settings). These services are managed by Apple and Google respectively. No separate account is required to use GlobeTrot. Your platform account handles authentication and cloud saves.",
            },
          ],
        },
        {
          title: "Advertising (Google AdMob)",
          blocks: [
            {
              type: "paragraph",
              text: "The free version of GlobeTrot shows ads served by Google AdMob. Because the game is intended for all ages, every ad request is tagged as child-directed: ads are never personalised, are limited to content suitable for all audiences (rating G), and the app does not access the device's advertising ID.",
            },
            {
              type: "paragraph",
              text: "To deliver ads, measure them and prevent fraud, AdMob receives the following from your device:",
            },
            {
              type: "list",
              items: [
                "Your IP address, from which an approximate location may be derived (never your precise location).",
                "Device or app identifiers other than the advertising ID.",
                "Interactions with ads (views and taps).",
                "Diagnostic data such as crash logs and performance information.",
              ],
            },
            {
              type: "paragraph",
              text: "This data is processed by Google under its own policy: https://policies.google.com/technologies/ads. Buying \"No Ads\" or Premium removes banner and interstitial ads.",
            },
          ],
        },
        {
          title: "In-App Purchases (RevenueCat)",
          blocks: [
            {
              type: "paragraph",
              text: "Purchases are made through Google Play or the App Store; we never see your payment details. To unlock and restore what you bought, the app uses RevenueCat, which receives an anonymous app user ID generated on your device and your purchase history for GlobeTrot. RevenueCat acts as our service provider: https://www.revenuecat.com/privacy.",
            },
          ],
        },
        {
          title: "Third-Party Data Sharing",
          blocks: [
            {
              type: "paragraph",
              text: "We do not sell your personal data. Data is shared only with the services listed above (Google AdMob, RevenueCat, and Apple or Google for cloud saves), for the purposes described. All data leaving your device is encrypted in transit.",
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
              text: "GlobeTrot is designed for all ages, including children, and complies with the Google Play Families Policy. We never ask for a name, email address, photo or precise location. Ads are child-directed and non-personalised as described above, and the advertising ID is not accessed.",
            },
            {
              type: "paragraph",
              text: "Because the app has no account, we hold no personal data that could be deleted on request. A parent or guardian with any question can contact us at nodinstudio@gmail.com.",
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
    slug: "pixel-arsenal",
    name: "Pixel Arsenal",
    tagline: "Ouvre des caisses, monte ton arsenal, relève les défis",
    description:
      "Pixel Arsenal est un jeu d'ouverture de caisses en pixel art. Ouvre, garde ce qui te plaît, revends le reste. Améliore tes armes préférées, fusionne tes doublons, remplis ta collection et relève sept mini-jeux. Monnaie du jeu uniquement : rien ne s'encaisse.",
    features: [
      "Seize caisses, de la Standard à la Supernova",
      "Une caisse gratuite chaque jour",
      "Collection d'armes à compléter",
      "Autel, contrat, fusion et lapidaire",
      "Sept mini-jeux : defuse, tour, pont, missile...",
      "Campagne, arène et farm hors ligne",
    ],
    platforms: [
      {
        name: "android",
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.nodinstudio.pixelarsenal",
      },
      {
        name: "ios",
        label: "App Store",
        url: "",
      },
    ],
    status: "released",
    privacyPath: "/privacy/pixel-arsenal",
    gamePath: "/games/pixel-arsenal",
    presentationImage: "/games/pixel_arsenal_presentation.png",
    presentationFit: "contain",
    presentationBackground: "#1A1C21",
    iconImage: "/games/pixel-arsenal/icon.png",
    theme: {
      accent: "#D69A1E",
      accentDim: "#FCF3DC",
      accentInk: "#4A3505",
    },
    terms: PIXEL_ARSENAL_TERMS,
    support: PIXEL_ARSENAL_SUPPORT,
    privacyPolicy: {
      lastUpdated: "November 9, 2026",
      sections: [
        {
          title: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: "Pixel Arsenal is a pixel-art case-opening game developed by NODIN Studio. The game was released under the name Pixel Gun Gambler until August 2026. This policy explains what data the app handles, who it is shared with, and the choices you have.",
            },
          ],
        },
        {
          title: "No Account, No Personal Data Collected By Us",
          blocks: [
            {
              type: "paragraph",
              text: "Pixel Arsenal does not require you to create an account or sign in to play. NODIN Studio operates no server and no database: we never receive your name, email address, postal address, phone number or location, and we hold no profile about you. The third-party services described below are the only parties that process data, each under its own policy.",
            },
          ],
        },
        {
          title: "Data Stored on Your Device",
          blocks: [
            {
              type: "paragraph",
              text: "Your progress is saved in a local file on your device. It contains only gameplay state:",
            },
            {
              type: "list",
              items: [
                "Virtual balance, diamonds, player power and prestige level.",
                "Weapon inventory: rarity, wear, upgrade level, fusion stars and equipped skin of each item.",
                "Progression: cases opened, collection milestones claimed, AFK farm state, purchases made.",
                "A random game identifier, also shown in the settings as your player ID. It identifies your save, never you, and is only sent to us if you choose to email support.",
              ],
            },
            {
              type: "paragraph",
              text: "Uninstalling the app deletes this file. If you enabled cloud save, a copy remains in your own Google Play Games or Game Center storage until you delete it there.",
            },
          ],
        },
        {
          title: "Advertising (Google AdMob)",
          blocks: [
            {
              type: "paragraph",
              text: "Pixel Arsenal shows ads served by Google AdMob: full-screen ads between case openings, and optional rewarded ads that you choose to watch in exchange for an in-game bonus. Watching a rewarded ad is always your decision, and nothing in the game is locked behind one.",
            },
            {
              type: "paragraph",
              text: "To serve those ads, Google may access your device's advertising identifier, approximate location derived from your IP address, and information about your device and ad interactions. Google acts as an independent controller for this processing; see the Google Privacy Policy and 'How Google uses information from sites or apps that use our services'.",
            },
            {
              type: "paragraph",
              text: "In the European Economic Area, the United Kingdom and Switzerland, a consent form is shown before any personalised ad is requested, through Google's User Messaging Platform. You can reopen it at any time from the in-game settings to change or withdraw your choice. You can also reset or delete your advertising identifier in your device settings. On iPhone, the game does not ask for tracking permission (App Tracking Transparency), so the advertising identifier is not shared and ads are not personalised across apps.",
            },
            {
              type: "paragraph",
              text: "Buying anything in the in-game store permanently removes all advertising from the app.",
            },
          ],
        },
        {
          title: "In-App Purchases (RevenueCat, Google Play, App Store)",
          blocks: [
            {
              type: "paragraph",
              text: "The store sells diamond packs and a one-time unlimited-boosters product. Payment is handled entirely by Google Play or the Apple App Store; NODIN Studio never sees or stores your payment details.",
            },
            {
              type: "paragraph",
              text: "Purchase validation goes through RevenueCat, which receives an anonymous app-user identifier, your purchase receipts and basic device and country information in order to tell the game what you own. It is not linked to your name or email address. See the RevenueCat Privacy Policy.",
            },
          ],
        },
        {
          title: "Cloud Save (Google Play Games, Game Center)",
          blocks: [
            {
              type: "paragraph",
              text: "Cloud save is optional and off until you sign in. When enabled, the encrypted save file is stored in your own saved-games space: Google Play Games on Android, under your Google account, or Game Center on iPhone, under your Apple Account. Each is subject to its provider's privacy policy. NODIN Studio has no access to it. Signing out or playing offline changes nothing about the game itself.",
            },
          ],
        },
        {
          title: "No Analytics, No Tracking Beyond Ads",
          blocks: [
            {
              type: "paragraph",
              text: "Pixel Arsenal embeds no analytics SDK, no crash reporting and no social network SDK. Apart from the advertising, purchase and cloud-save services listed above, no data leaves your device, and nothing is ever sold to data brokers.",
            },
          ],
        },
        {
          title: "Loot Boxes, Virtual Currency Only",
          blocks: [
            {
              type: "paragraph",
              text: "Case openings (loot boxes) and mini-games are played with in-game currency that has no monetary value. In-game currency and items cannot be cashed out, traded or exchanged for anything of real-world value, and no purchase gives an opportunity to win real money or prizes. The odds of every case are shown in the game before opening.",
            },
          ],
        },
        {
          title: "Children's Privacy",
          blocks: [
            {
              type: "paragraph",
              text: "Pixel Arsenal contains loot boxes, in-app purchases and advertising. It is intended for players aged 13 and over and is not directed at children under 13. We do not knowingly collect personal information from children under 13.",
            },
          ],
        },
        {
          title: "Your Rights and Contact",
          blocks: [
            {
              type: "paragraph",
              text: `Because we hold no personal data about you, there is nothing on our side to access, correct or delete. To act on data held by the services above, use their own controls: Google Play Games saved games for your cloud save, your device's Android ad settings and the in-game consent form for advertising, and your Google Play or App Store account for purchases. For anything else, contact NODIN Studio at ${STUDIO_EMAIL}. If you email us, we use your address and message only to answer you, and delete the thread once the request is closed.`,
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
      "Un jeu de cartes de questions profondes pour mieux se connaître. Chaque thème t'emmène dans un territoire différent, de l'introspection à la connexion, du deuil amoureux à la première rencontre.",
    features: [
      "Thème Date : briser la glace autrement",
      "Thème Couple : aller plus loin ensemble",
      "Thème Famille : ce qu'on n'ose pas dire",
      "Thème Breakup : faire le point",
      "Thème Self-réflexion : se connaître soi-même",
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
              text: "WBY collects no personal information whatsoever. No account is required. No name, email address, location, or device identifier is collected or sent to any server. Questions and answers exchanged during gameplay exist only between the players in the room, and they are never recorded or transmitted.",
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
