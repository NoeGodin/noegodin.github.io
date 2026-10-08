import type { LegalDocument } from "./types";
import { STUDIO_EMAIL } from "../studio";

/* Page support de Pixel Arsenal : c'est l'URL de support des fiches Play et
   App Store. Les libelles cites ici (REGLAGES, SUPPORT, ID joueur...) sont
   ceux du jeu : un joueur doit retrouver a l'ecran exactement ce qu'il lit. */

const fr: LegalDocument = {
  lastUpdated: "8 octobre 2026",
  intro: `Un souci avec un achat, une sauvegarde ou le jeu ? Écris à ${STUDIO_EMAIL}. Le plus rapide : le bouton CONTACTER LE SUPPORT du jeu, qui prépare le mail avec ton ID joueur.`,
  sections: [
    {
      title: "Trouver ton ID joueur",
      blocks: [
        {
          type: "list",
          items: [
            "Ouvre RÉGLAGES (l'engrenage en haut de l'écran).",
            "Section SUPPORT : ton ID joueur s'affiche au format XXXX-XXXX.",
            "Touche COPIER, ou CONTACTER LE SUPPORT pour l'envoyer directement.",
          ],
        },
        {
          type: "paragraph",
          text: "L'ID désigne ta partie, pas ton appareil. Si tu changes de partie (réinitialisation, autre sauvegarde reprise), envoie le nouvel ID.",
        },
      ],
    },
    {
      title: "Boosters illimités introuvables",
      blocks: [
        {
          type: "paragraph",
          text: "C'est un achat permanent, rattaché à ton compte Google Play ou Apple. Ouvre la BOUTIQUE du jeu et touche « Restaurer mes achats » avec le même compte que celui de l'achat. Rien à demander au support.",
        },
      ],
    },
    {
      title: "Diamants perdus",
      blocks: [
        {
          type: "paragraph",
          text: "Les diamants sont un produit consommable : aucun magasin ne les restaure (voir les conditions d'utilisation). Si tu les as perdus après un achat, envoie-nous :",
        },
        {
          type: "list",
          items: [
            "ton ID joueur actuel ;",
            "le numéro de commande (reçu Google Play, commençant par GPA., ou reçu Apple) ;",
            "ce qui s'est passé, en une phrase.",
          ],
        },
        {
          type: "paragraph",
          text: "Après vérification, on peut t'envoyer un code de support. Saisis-le dans RÉGLAGES, section SUPPORT, puis VALIDER. Il ne fonctionne que sur la partie dont tu nous as donné l'ID, et une seule fois. C'est un geste commercial, pas un dû.",
        },
      ],
    },
    {
      title: "Remboursement",
      blocks: [
        {
          type: "paragraph",
          text: "Le paiement est encaissé par Google Play ou Apple, eux seuls peuvent rembourser. Google Play : play.google.com, rubrique Paiements et abonnements, Budget et historique. Apple : reportaproblem.apple.com.",
        },
      ],
    },
    {
      title: "Sauvegarde cloud",
      blocks: [
        {
          type: "paragraph",
          text: "Connecte Google Play Jeux (Android) ou Game Center (iPhone) dans RÉGLAGES pour retrouver ta partie sur un autre appareil. Au lancement, si deux parties diffèrent, le jeu te montre les deux, diamants compris : lis bien avant de choisir, la partie écartée est remplacée.",
        },
      ],
    },
    {
      title: "Ce que le support ne peut pas faire",
      blocks: [
        {
          type: "list",
          items: [
            "Lire ou modifier ta partie : elle n'existe que sur ton appareil et dans ton espace cloud.",
            "Rendre des dollars, des armes ou des objets perdus au casino ou en jeu.",
            "Transférer une partie ou des objets d'un joueur à un autre.",
          ],
        },
      ],
    },
  ],
};

const en: LegalDocument = {
  lastUpdated: "October 8, 2026",
  intro: `A problem with a purchase, a save or the game? Write to ${STUDIO_EMAIL}. The fastest way: the in-game CONTACT SUPPORT button, which drafts the mail with your player ID.`,
  sections: [
    {
      title: "Find your player ID",
      blocks: [
        {
          type: "list",
          items: [
            "Open SETTINGS (the gear at the top of the screen).",
            "SUPPORT section: your player ID shows as XXXX-XXXX.",
            "Tap COPY, or CONTACT SUPPORT to send it directly.",
          ],
        },
        {
          type: "paragraph",
          text: "The ID names your game, not your device. If you switch games (reset, another save resumed), send the new ID.",
        },
      ],
    },
    {
      title: "Unlimited boosters missing",
      blocks: [
        {
          type: "paragraph",
          text: "It is a permanent purchase, tied to your Google Play or Apple account. Open the in-game SHOP and tap \"Restore purchases\" with the same account you bought it with. No need to contact support.",
        },
      ],
    },
    {
      title: "Lost diamonds",
      blocks: [
        {
          type: "paragraph",
          text: "Diamonds are a consumable product: no store restores them (see the terms of use). If you lost them after a purchase, send us:",
        },
        {
          type: "list",
          items: [
            "your current player ID;",
            "the order number (Google Play receipt starting with GPA., or Apple receipt);",
            "what happened, in one sentence.",
          ],
        },
        {
          type: "paragraph",
          text: "After checking, we may send you a support code. Enter it in SETTINGS, SUPPORT section, then APPLY. It only works on the game whose ID you gave us, and only once. It is a goodwill gesture, not an entitlement.",
        },
      ],
    },
    {
      title: "Refunds",
      blocks: [
        {
          type: "paragraph",
          text: "Payment is charged by Google Play or Apple, and only they can refund it. Google Play: play.google.com, Payments and subscriptions, Budget and history. Apple: reportaproblem.apple.com.",
        },
      ],
    },
    {
      title: "Cloud save",
      blocks: [
        {
          type: "paragraph",
          text: "Connect Google Play Games (Android) or Game Center (iPhone) in SETTINGS to find your game on another device. At launch, if two games differ, the game shows you both, diamonds included: read carefully before choosing, the other one is replaced.",
        },
      ],
    },
    {
      title: "What support cannot do",
      blocks: [
        {
          type: "list",
          items: [
            "Read or edit your game: it only exists on your device and in your cloud space.",
            "Give back dollars, weapons or items lost in the casino or in play.",
            "Move a game or items from one player to another.",
          ],
        },
      ],
    },
  ],
};

export const PIXEL_ARSENAL_SUPPORT = { fr, en } as const;
