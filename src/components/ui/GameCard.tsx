import Link from "next/link";
import type { GameData } from "@/lib/games";
import type { Locale } from "@/i18n/messages";
import { t } from "@/i18n/messages";
import { ArrowUpRight, CheckCircle2, Shield, Sparkles } from "lucide-react";
import GameVisual from "@/components/ui/GameVisual";
import { withBasePath } from "../../lib/basePath";

interface GameCardProps {
  game: GameData;
  locale: Locale;
}

export default function GameCard({ game, locale }: GameCardProps) {
  const prefix = locale === "en" ? "/en" : "";

  const themeStyle = game.theme
    ? ({
        "--color-accent": game.theme.accent,
        "--color-accent-dim": game.theme.accentDim,
        "--color-accent-ink": game.theme.accentInk,
      } as React.CSSProperties)
    : {};

  return (
    <article
      className="card-duo group relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_1px_0_rgba(9,9,11,0.03),0_22px_70px_rgba(9,9,11,0.14)]"
      style={themeStyle}
    >
      <Link
        href={`${prefix}${game.gamePath}`}
        aria-label={`${game.name} -- ${t(locale, "game.learnMore")}`}
        className="absolute inset-0 z-10"
      />

      {/* ── Visual header — preserves native aspect ratio ── */}
      {game.presentationImage ? (
        <div className="overflow-hidden rounded-t-[0.9rem]">
          <img
            src={withBasePath(game.presentationImage)}
            alt={`${game.name} screenshot`}
            className="h-52 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-t-[0.9rem] bg-[var(--color-accent-dim)] py-10">
          <div className="h-36 w-36"><GameVisual game={game} /></div>
        </div>
      )}

      {/* ── Content ───────────────────────────────────────── */}
      <div className="p-7 sm:p-9">

        {/* Icon + name + meta row */}
        <div className="mb-6 flex items-start gap-4">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-zinc-950/10 bg-[var(--color-accent-dim)]">
            <GameVisual game={game} />
          </div>

          <div className="flex-1">
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-2xl">
                {game.name}
              </h3>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-950/10 bg-white px-2.5 py-0.5 text-[11px] font-medium tracking-[0.12em] uppercase text-zinc-500">
                  <Sparkles size={11} className="text-[var(--color-accent)]" />
                  {game.status === "released"
                    ? t(locale, "game.available")
                    : t(locale, "game.comingSoon")}
                </span>
                <Link
                  href={`${prefix}${game.privacyPath}`}
                  className="relative z-20 inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 transition-colors duration-200 hover:text-zinc-700"
                >
                  <Shield size={12} />
                  {t(locale, "game.privacy")}
                </Link>
              </div>
            </div>
            <p className="text-sm text-zinc-500">{game.tagline}</p>

            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-ink)] opacity-70 transition-all duration-200 group-hover:gap-1.5 group-hover:opacity-100">
              {t(locale, "game.learnMore")}
              <ArrowUpRight size={12} />
            </span>
          </div>
        </div>

        {/* Description + features + buttons */}
        <div className="grid gap-7 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-6 text-sm leading-relaxed text-zinc-600">
              {game.description}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {game.platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  className="relative z-20 inline-flex items-center gap-2 rounded-full border border-zinc-950/15 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 shadow-[0_1px_0_rgba(9,9,11,0.04)] transition-all duration-200 hover:bg-zinc-950 hover:text-white"
                >
                  {platform.name === "ios" ? <AppleIcon /> : <PlayIcon />}
                  {platform.label}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-950/8 bg-[var(--color-accent-dim)] p-4 md:min-w-[220px]">
            <p className="mb-2.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--color-accent-ink)] opacity-60">
              {t(locale, "game.features")}
            </p>
            <ul className="space-y-2">
              {game.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-xs text-[var(--color-accent-ink)]">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 opacity-50" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

function AppleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.19 0 .38.04.56.12l16 8c.54.27.87.82.87 1.38s-.34 1.11-.87 1.38l-16 8c-.18.08-.37.12-.56.12-.83 0-1.5-.67-1.5-1.5z" />
    </svg>
  );
}
