import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GamePage from "@/components/pages/GamePage";
import GlobeTrotPage from "@/components/pages/GlobeTrotPage";
import PixelArsenalPage from "@/components/pages/PixelArsenalPage";
import { getAllGames, getGameBySlug } from "@/lib/games";

interface GamePageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGames().map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: GamePageParams): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    return { title: "NODIN Studio" };
  }

  return {
    title: `${game.name} -- NODIN Studio`,
    description: game.tagline,
  };
}

export default async function GameRoute({ params }: GamePageParams) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  if (game.slug === "globetrot") {
    return <GlobeTrotPage game={game} locale="fr" />;
  }

  if (game.slug === "pixel-arsenal") {
    return <PixelArsenalPage game={game} locale="fr" />;
  }

  return <GamePage game={game} locale="fr" />;
}
