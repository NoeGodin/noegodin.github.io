import type { LegalDocument } from "./types";
import { STUDIO_EMAIL } from "../studio";

/* Conditions d'utilisation de Pixel Arsenal. Le francais fait foi : c'est la
   langue du contrat pour un joueur francais (loi Toubon), l'anglais est une
   traduction. Toute modification se reporte dans les deux. */

const fr: LegalDocument = {
  lastUpdated: "8 octobre 2026",
  intro:
    "Ces conditions encadrent l'utilisation du jeu Pixel Arsenal et de sa boutique. En installant ou en utilisant le jeu, tu les acceptes.",
  sections: [
    {
      title: "Éditeur",
      blocks: [
        {
          type: "paragraph",
          text: `Pixel Arsenal est édité par NODIN Studio. Contact : ${STUDIO_EMAIL}.`,
        },
      ],
    },
    {
      title: "Public",
      blocks: [
        {
          type: "paragraph",
          text: "Pixel Arsenal contient des jeux de hasard simulés (ouverture de caisses, casino) et des achats intégrés. Il est destiné aux personnes majeures (18 ans et plus). Si tu es mineur, n'utilise pas le jeu ni sa boutique.",
        },
      ],
    },
    {
      title: "Hasard simulé, aucun gain réel",
      blocks: [
        {
          type: "list",
          items: [
            "Les caisses et les tables du casino se jouent uniquement avec la monnaie du jeu.",
            "Rien de ce qui se gagne dans le jeu ne peut être encaissé, revendu, échangé entre joueurs ou converti en argent ou en bien réel.",
            "Les probabilités de chaque caisse sont affichées dans le jeu avant l'ouverture.",
            "Aucun achat ne donne la possibilité de gagner de l'argent ou un lot réel.",
          ],
        },
      ],
    },
    {
      title: "Monnaies et objets virtuels",
      blocks: [
        {
          type: "paragraph",
          text: "Les dollars, diamants, armes, camos, pierres et autres objets du jeu sont des contenus numériques sur lesquels tu reçois un droit d'utilisation personnel, non transférable et révocable. Ils n'ont aucune valeur monétaire et ne sont pas ta propriété. Leur équilibrage (prix, probabilités, effets) peut évoluer avec les mises à jour.",
        },
      ],
    },
    {
      title: "Achats intégrés",
      blocks: [
        {
          type: "paragraph",
          text: "Les achats sont réalisés et encaissés par Google Play ou l'App Store d'Apple, selon leurs propres conditions. NODIN Studio ne voit jamais tes moyens de paiement. La boutique propose :",
        },
        {
          type: "list",
          items: [
            "des lots de diamants : produits CONSOMMABLES, crédités une fois sur la partie en cours de l'appareil ;",
            "un produit permanent (boosters illimités, sans publicité) : rattaché à ton compte Google Play ou Apple, il se récupère avec le bouton « Restaurer mes achats » de la boutique.",
          ],
        },
        {
          type: "paragraph",
          text: "Le contenu acheté est livré immédiatement. En validant un achat, tu demandes cette exécution immédiate et tu reconnais perdre ton droit de rétractation, conformément à l'article L221-28, 13° du Code de la consommation. Les demandes de remboursement se font auprès de Google Play ou d'Apple, qui en décident.",
        },
      ],
    },
    {
      title: "Diamants perdus",
      blocks: [
        {
          type: "paragraph",
          text: "Ta partie est enregistrée sur ton appareil, et dans ton espace Google Play Jeux ou Game Center si tu actives la sauvegarde cloud. Un lot de diamants étant consommable, aucun magasin ne le restaure. Les diamants sont donc perdus si tu désinstalles le jeu sans sauvegarde cloud, si tu réinitialises ta partie, ou si tu choisis de reprendre une autre sauvegarde que celle où ils ont été crédités. L'écran de choix de sauvegarde affiche les diamants de chaque partie avant que tu décides.",
        },
        {
          type: "paragraph",
          text: "NODIN Studio n'a aucune obligation de recréditer des diamants perdus dans ces cas. Le support peut, à sa seule discrétion et après vérification de l'achat, envoyer un code de support à usage unique, lié à ta partie. Ce geste commercial ne crée aucun droit pour une demande ultérieure.",
        },
      ],
    },
    {
      title: "Publicité",
      blocks: [
        {
          type: "paragraph",
          text: "Le jeu affiche des publicités (Google AdMob). Tout achat dans la boutique les retire définitivement. Le détail des données traitées figure dans la politique de confidentialité.",
        },
      ],
    },
    {
      title: "Usage loyal",
      blocks: [
        {
          type: "paragraph",
          text: "Il est interdit de modifier le jeu ou sa sauvegarde, d'utiliser un outil de triche, ou d'exploiter un bug pour obtenir un avantage. Un code de support obtenu par fraude ou pour une partie qui n'est pas la tienne est nul.",
        },
      ],
    },
    {
      title: "Disponibilité et évolution",
      blocks: [
        {
          type: "paragraph",
          text: "Le jeu est fourni en l'état. NODIN Studio peut le modifier, le mettre à jour ou en arrêter la distribution. Les fonctions qui dépendent d'un service tiers (boutique, publicité, sauvegarde cloud) peuvent être indisponibles de façon temporaire.",
        },
      ],
    },
    {
      title: "Responsabilité",
      blocks: [
        {
          type: "paragraph",
          text: "Dans les limites permises par la loi, NODIN Studio n'est pas responsable de la perte de données de jeu, des pannes des services tiers ou de l'usage fait du jeu. Rien dans ces conditions ne limite tes droits de consommateur, notamment la garantie légale de conformité des contenus numériques.",
        },
      ],
    },
    {
      title: "Propriété intellectuelle",
      blocks: [
        {
          type: "paragraph",
          text: "Le jeu, ses graphismes, ses sons et ses textes appartiennent à NODIN Studio ou à leurs auteurs, crédités dans le jeu. Les armes sont des représentations en pixel art de modèles historiques ou fictifs ; les noms de marques actives sont modifiés. Aucun fabricant n'est associé au jeu ni ne l'approuve.",
        },
      ],
    },
    {
      title: "Droit applicable et contact",
      blocks: [
        {
          type: "paragraph",
          text: `Ces conditions sont soumises au droit français. Pour toute question ou réclamation, écris à ${STUDIO_EMAIL} : on cherche toujours une solution amiable d'abord. Ces conditions peuvent évoluer, la date en haut de page indique la dernière version.`,
        },
      ],
    },
  ],
};

const en: LegalDocument = {
  lastUpdated: "October 8, 2026",
  intro:
    "These terms govern the use of Pixel Arsenal and its store. By installing or using the game, you accept them. The French version prevails.",
  sections: [
    {
      title: "Publisher",
      blocks: [
        {
          type: "paragraph",
          text: `Pixel Arsenal is published by NODIN Studio. Contact: ${STUDIO_EMAIL}.`,
        },
      ],
    },
    {
      title: "Audience",
      blocks: [
        {
          type: "paragraph",
          text: "Pixel Arsenal contains simulated gambling (case opening, casino) and in-app purchases. It is intended for adults (18 and over). If you are a minor, do not use the game or its store.",
        },
      ],
    },
    {
      title: "Simulated chance, no real winnings",
      blocks: [
        {
          type: "list",
          items: [
            "Cases and casino tables are played with in-game currency only.",
            "Nothing earned in the game can be cashed out, resold, traded between players or converted into money or real goods.",
            "The odds of every case are shown in the game before opening.",
            "No purchase gives a chance to win money or a real prize.",
          ],
        },
      ],
    },
    {
      title: "Virtual currencies and items",
      blocks: [
        {
          type: "paragraph",
          text: "Dollars, diamonds, weapons, camos, stones and other in-game items are digital content over which you receive a personal, non-transferable and revocable right of use. They have no monetary value and are not your property. Their balance (prices, odds, effects) may change with updates.",
        },
      ],
    },
    {
      title: "In-app purchases",
      blocks: [
        {
          type: "paragraph",
          text: "Purchases are processed and charged by Google Play or Apple's App Store, under their own terms. NODIN Studio never sees your payment details. The store offers:",
        },
        {
          type: "list",
          items: [
            "diamond packs: CONSUMABLE products, credited once to the current game on the device;",
            "one permanent product (unlimited boosters, no ads): tied to your Google Play or Apple account, recovered with the store's \"Restore purchases\" button.",
          ],
        },
        {
          type: "paragraph",
          text: "Purchased content is delivered immediately. By confirming a purchase, you request this immediate delivery and acknowledge that you lose your right of withdrawal, as provided by EU consumer law. Refund requests go to Google Play or Apple, who decide on them.",
        },
      ],
    },
    {
      title: "Lost diamonds",
      blocks: [
        {
          type: "paragraph",
          text: "Your game is saved on your device, and in your Google Play Games or Game Center space if you turn cloud save on. Since a diamond pack is consumable, no store restores it. Diamonds are therefore lost if you uninstall without cloud save, reset your game, or choose to resume a save other than the one they were credited to. The save picker shows the diamonds of each game before you decide.",
        },
        {
          type: "paragraph",
          text: "NODIN Studio has no obligation to re-credit diamonds lost in these cases. Support may, at its sole discretion and after checking the purchase, send a single-use support code bound to your game. This goodwill gesture creates no right for any later request.",
        },
      ],
    },
    {
      title: "Advertising",
      blocks: [
        {
          type: "paragraph",
          text: "The game shows ads (Google AdMob). Any purchase in the store removes them for good. The data involved is described in the privacy policy.",
        },
      ],
    },
    {
      title: "Fair use",
      blocks: [
        {
          type: "paragraph",
          text: "Modifying the game or its save, using cheat tools, or exploiting a bug to gain an advantage is forbidden. A support code obtained by fraud or for a game that is not yours is void.",
        },
      ],
    },
    {
      title: "Availability and changes",
      blocks: [
        {
          type: "paragraph",
          text: "The game is provided as is. NODIN Studio may change it, update it or stop distributing it. Features that rely on a third-party service (store, ads, cloud save) may be temporarily unavailable.",
        },
      ],
    },
    {
      title: "Liability",
      blocks: [
        {
          type: "paragraph",
          text: "To the extent permitted by law, NODIN Studio is not liable for loss of game data, outages of third-party services or the use made of the game. Nothing in these terms limits your statutory consumer rights, including the legal guarantee of conformity for digital content.",
        },
      ],
    },
    {
      title: "Intellectual property",
      blocks: [
        {
          type: "paragraph",
          text: "The game, its art, sounds and texts belong to NODIN Studio or to their authors, credited in the game. Weapons are pixel-art depictions of historical or fictional models; names of active brands are altered. No manufacturer is affiliated with or endorses the game.",
        },
      ],
    },
    {
      title: "Governing law and contact",
      blocks: [
        {
          type: "paragraph",
          text: `These terms are governed by French law. For any question or complaint, write to ${STUDIO_EMAIL}: we always look for an amicable solution first. These terms may change; the date at the top shows the latest version.`,
        },
      ],
    },
  ],
};

export const PIXEL_ARSENAL_TERMS = { fr, en } as const;
