import Link from "next/link";
import type { GameData } from "@/lib/games";
import { t, type Locale } from "@/i18n/messages";
import { withBasePath } from "@/lib/basePath";
import GameVisual from "@/components/ui/GameVisual";
import { ArrowLeft, CheckCircle2, Shield, Sparkles } from "lucide-react";

interface GamePageProps {
  game: GameData;
  locale: Locale;
}

export default function GamePage({ game, locale }: GamePageProps) {
  const prefix = locale === "en" ? "/en" : "";

  const themeStyle = game.theme
    ? ({
        "--color-accent": game.theme.accent,
        "--color-accent-dim": game.theme.accentDim,
        "--color-accent-ink": game.theme.accentInk,
      } as React.CSSProperties)
    : {};

  return (
    <div style={themeStyle}>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        aria-labelledby="game-heading"
        className="soft-noise relative isolate overflow-hidden bg-white px-6 pt-28 pb-16"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src={withBasePath("/hero.svg")}
            alt=""
            className="h-full w-full object-cover opacity-[0.6]"
          />
        </div>

        <div className="mx-auto max-w-5xl">
          <Link
            href={prefix || "/"}
            className="mb-10 inline-flex items-center gap-2 text-xs font-medium text-zinc-700 transition-colors duration-200 hover:text-zinc-950"
          >
            <ArrowLeft size={14} />
            {t(locale, "game.back")}
          </Link>

          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <span className="sticker mb-5 inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-accent-ink)]">
                <Sparkles size={12} className="text-[var(--color-accent)]" />
                {game.status === "released"
                  ? t(locale, "game.available")
                  : t(locale, "game.comingSoon")}
              </span>

              <h1
                id="game-heading"
                className="mb-3 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-6xl"
              >
                {game.name}
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
                {game.tagline}
              </p>
            </div>

            <div className="h-40 w-40 shrink-0 overflow-hidden rounded-2xl border border-zinc-950/10 bg-[var(--color-accent-dim)] shadow-[0_22px_70px_rgba(9,9,11,0.12)] sm:h-48 sm:w-48">
              <GameVisual game={game} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Presentation image ─────────────────────────────── */}
      {game.presentationImage ? (
        <section className="mx-auto max-w-5xl px-6">
          <div className="overflow-hidden rounded-2xl border border-zinc-950/10 shadow-[0_22px_70px_rgba(9,9,11,0.12)]">
            <img
              src={withBasePath(game.presentationImage)}
              alt={`${game.name} screenshot`}
              className="w-full object-cover"
              loading="eager"
            />
          </div>
        </section>
      ) : null}

      {/* ── Content ────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
          {/* Description + platforms */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950">
              {t(locale, "game.overviewKicker")}
            </p>
            <p className="mb-10 max-w-2xl text-base leading-relaxed text-zinc-700">
              {game.description}
            </p>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950">
              {t(locale, "game.platformsKicker")}
            </p>
            <div className="mb-10 flex flex-wrap gap-2.5">
              {game.platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-950/15 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 shadow-[0_1px_0_rgba(9,9,11,0.04)] transition-all duration-200 hover:bg-zinc-950 hover:text-white"
                >
                  {platform.name === "ios" ? <AppleIcon /> : <PlayIcon />}
                  {platform.label}
                </a>
              ))}
            </div>

            <Link
              href={`${prefix}${game.privacyPath}`}
              className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-950"
            >
              <Shield size={13} />
              {t(locale, "game.privacy")}
            </Link>
          </div>

          {/* Features */}
          <aside className="rounded-2xl border border-zinc-950/10 bg-[var(--color-accent-dim)] p-7">
            <p className="mb-4 text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-accent-ink)] opacity-70">
              {t(locale, "game.featuresKicker")}
            </p>
            <ul className="space-y-3">
              {game.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--color-accent-ink)]"
                >
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 opacity-60"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.19 0 .38.04.56.12l16 8c.54.27.87.82.87 1.38s-.34 1.11-.87 1.38l-16 8c-.18.08-.37.12-.56.12-.83 0-1.5-.67-1.5-1.5z" />
    </svg>
  );
}
