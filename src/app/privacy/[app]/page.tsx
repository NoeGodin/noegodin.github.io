import type { Metadata } from "next";
import { getAllGames, getGameBySlug } from "../../../lib/games";
import { notFound } from "next/navigation";
import PrivacyPolicyPage from "../../../components/privacy/PrivacyPolicyPage";

interface PrivacyPageParams {
  params: Promise<{ app: string }>;
}

export async function generateStaticParams() {
  return getAllGames().map((game) => ({ app: game.slug }));
}

export async function generateMetadata({
  params,
}: PrivacyPageParams): Promise<Metadata> {
  const { app } = await params;
  const game = getGameBySlug(app);

  if (!game) {
    return {
      title: "Privacy Policy | NODIN Studio",
    };
  }

  return {
    title: `${game.name} Privacy Policy | NODIN Studio`,
    description: `Privacy policy for ${game.name} by NODIN Studio.`,
  };
}

export default async function GenericPrivacy({ params }: PrivacyPageParams) {
  const { app } = await params;
  const game = getGameBySlug(app);

  if (!game) {
    notFound();
  }

  return <PrivacyPolicyPage game={game} locale="fr" />;
}
