import type { Platform } from "@/lib/games";
import { withBasePath } from "@/lib/basePath";
import { INK } from "./content";

/** Titre de section, police du jeu. */
export function Kicker({ children }: { children: string }) {
  return (
    <p
      className="mb-4 flex items-center gap-3 text-[10px] leading-none tracking-[0.12em]"
      style={{ fontFamily: "var(--font-pixel)", color: INK.gold }}
    >
      {/* La coche des titres de section du jeu (SettingsDialog._section). */}
      <span aria-hidden className="inline-block h-[11px] w-[3px]" style={{ background: INK.gold }} />
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: string }) {
  return (
    <h2
      className="mb-4 text-[15px] leading-[1.7] sm:text-[20px]"
      style={{ fontFamily: "var(--font-pixel)", color: INK.text }}
    >
      {children}
    </h2>
  );
}

export function Lede({ children }: { children: string }) {
  return (
    <p className="max-w-2xl text-sm leading-relaxed sm:text-[15px]" style={{ color: INK.muted }}>
      {children}
    </p>
  );
}

export function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

/** Plaque du jeu : surface sombre, bordure franche, reflet d'un pixel en haut. */
export function Plate({
  children,
  className = "",
  well = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Puits enfoncé (fond plus sombre), comme les cartes des Réglages. */
  well?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border ${className}`}
      style={{
        background: well ? INK.well : INK.surface,
        borderColor: INK.border,
        boxShadow: well
          ? "inset 0 2px 0 rgba(0,0,0,0.35)"
          : "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 0 rgba(0,0,0,0.35)",
      }}
    >
      {children}
    </div>
  );
}

export function Sprite({
  src,
  alt,
  size,
  fill = false,
}: {
  src: string;
  alt: string;
  size: number;
  /** Remplit la tuile plutot que de tenir une taille fixe. */
  fill?: boolean;
}) {
  return (
    <img
      src={withBasePath(src)}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`[image-rendering:pixelated] ${fill ? "h-full w-full object-contain" : ""}`}
      style={fill ? undefined : { width: size, height: size }}
    />
  );
}

/** Boutons store : lien plein, ou plaque en pointillés tant que la fiche n'existe pas. */
export function StoreButtons({
  platforms,
  soon,
  centered = false,
}: {
  platforms: readonly Platform[];
  soon: string;
  /** Toujours centré ; sinon aligné à gauche à partir de lg (hero). */
  centered?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-3 ${centered ? "" : "lg:justify-start"}`}
    >
      {platforms.map((platform) =>
        platform.url ? (
          <a
            key={platform.name}
            href={platform.url}
            className="pa-press inline-flex items-center gap-3 rounded-lg px-6 py-4 text-[11px] leading-none"
            style={{
              fontFamily: "var(--font-pixel)",
              background: INK.gold,
              color: INK.bgBottom,
              boxShadow: `0 5px 0 ${INK.glow}`,
            }}
          >
            {platform.name === "ios" ? <AppleIcon /> : <PlayIcon />}
            {platform.label}
          </a>
        ) : (
          <span
            key={platform.name}
            className="inline-flex items-center gap-3 rounded-lg border border-dashed px-6 py-4 text-[11px] leading-none"
            style={{ fontFamily: "var(--font-pixel)", borderColor: INK.border, color: INK.muted }}
          >
            {platform.name === "ios" ? <AppleIcon /> : <PlayIcon />}
            {platform.label}
            <span className="text-[8px]" style={{ color: INK.glow }}>
              {soon}
            </span>
          </span>
        ),
      )}
    </div>
  );
}

export function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.19 0 .38.04.56.12l16 8c.54.27.87.82.87 1.38s-.34 1.11-.87 1.38l-16 8c-.18.08-.37.12-.56.12-.83 0-1.5-.67-1.5-1.5z" />
    </svg>
  );
}

export function AppleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.77-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.66zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.58.67-1.1 1.76-.96 2.8 1.01.08 2.05-.52 2.68-1.28z" />
    </svg>
  );
}
