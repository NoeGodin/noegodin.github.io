import type { GameData } from "@/lib/games";
import { withBasePath } from "@/lib/basePath";
import EarthLottie from "@/components/ui/EarthLottie";
import WBYAnimation from "@/components/ui/WBYAnimation";

interface GameVisualProps {
  game: GameData;
}

/**
 * Visuel carré d'un jeu, partagé par la carte d'accueil et la page jeu.
 * Animation dédiée si le jeu en a une, sinon son icône (pixel art rendu net).
 */
export default function GameVisual({ game }: GameVisualProps) {
  if (game.slug === "globetrot") return <EarthLottie />;
  if (game.slug === "wby") return <WBYAnimation />;
  if (!game.iconImage) return null;

  return (
    <img
      src={withBasePath(game.iconImage)}
      alt=""
      width={512}
      height={512}
      className="h-full w-full object-cover [image-rendering:pixelated]"
      loading="lazy"
    />
  );
}
