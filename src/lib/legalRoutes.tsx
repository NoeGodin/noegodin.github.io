import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalDocumentPage, {
  legalPath,
  type LegalKind,
} from "@/components/legal/LegalDocumentPage";
import { getAllGames, getGameBySlug, type GameData } from "@/lib/games";
import type { Locale } from "@/i18n/messages";

interface LegalParams {
  params: Promise<{ app: string }>;
}

const TITLES: Record<LegalKind, Record<Locale, string>> = {
  privacy: { fr: "Politique de confidentialité", en: "Privacy Policy" },
  terms: { fr: "Conditions d'utilisation", en: "Terms of Use" },
  support: { fr: "Support", en: "Support" },
};

function documentFor(game: GameData, kind: LegalKind, locale: Locale) {
  if (kind === "privacy") return game.privacyPolicy;
  return game[kind]?.[locale];
}

/** Les quatre fonctions d'une route légale (/[en/]<kind>/[app]). */
export function makeLegalRoute(kind: LegalKind, locale: Locale) {
  async function generateStaticParams() {
    return getAllGames()
      .filter((game) => legalPath(game, kind) !== null)
      .map((game) => ({ app: game.slug }));
  }

  async function generateMetadata({ params }: LegalParams): Promise<Metadata> {
    const { app } = await params;
    const game = getGameBySlug(app);
    const title = TITLES[kind][locale];
    if (!game) return { title: `${title} | NODIN Studio` };
    return {
      title: `${game.name} ${title} | NODIN Studio`,
      description: `${title}, ${game.name}, NODIN Studio.`,
    };
  }

  async function Page({ params }: LegalParams) {
    const { app } = await params;
    const game = getGameBySlug(app);
    if (!game || legalPath(game, kind) === null) notFound();
    return (
      <LegalDocumentPage
        game={game}
        kind={kind}
        document={documentFor(game, kind, locale)}
        locale={locale}
      />
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
