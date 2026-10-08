import Link from "next/link";
import type { GameData } from "@/lib/games";
import type { LegalDocument } from "@/lib/legal/types";
import PrivacySection from "@/components/ui/PrivacySection";
import { STUDIO_EMAIL } from "@/lib/studio";
import type { Locale } from "@/i18n/messages";

export type LegalKind = "privacy" | "terms" | "support";

interface LegalDocumentPageProps {
  game: GameData;
  kind: LegalKind;
  document: LegalDocument | undefined;
  locale: Locale;
}

const LABELS = {
  fr: {
    privacy: "Confidentialité",
    terms: "Conditions d'utilisation",
    support: "Support",
    back: "Retour au jeu",
    updated: "Dernière mise à jour :",
    missing: "Cette page n'est pas encore publiée.",
    contact: "Contact",
  },
  en: {
    privacy: "Privacy",
    terms: "Terms of use",
    support: "Support",
    back: "Back to the game",
    updated: "Last updated:",
    missing: "This page is not published yet.",
    contact: "Contact",
  },
} as const;

const KINDS: readonly LegalKind[] = ["privacy", "terms", "support"];

/** Chemin d'une page légale du jeu, ou null si le jeu ne la publie pas. */
export function legalPath(game: GameData, kind: LegalKind): string | null {
  if (kind === "privacy") return game.privacyPath;
  if (kind === "terms") return game.terms ? `/terms/${game.slug}` : null;
  return game.support ? `/support/${game.slug}` : null;
}

export default function LegalDocumentPage({
  game,
  kind,
  document,
  locale,
}: LegalDocumentPageProps) {
  const prefix = locale === "en" ? "/en" : "";
  const label = LABELS[locale];
  const siblings = KINDS.filter((other) => legalPath(game, other) !== null);

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-32">
      <Link
        href={`${prefix}${game.gamePath}`}
        className="mb-10 inline-flex items-center gap-2 text-xs font-medium text-zinc-700 transition-colors duration-200 hover:text-zinc-950"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {label.back}
      </Link>

      <header className="mb-12">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-950/10 bg-[var(--color-accent-dim)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-ink)]">
          {label[kind]}
        </p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
          {game.name}
        </h1>
        {document ? (
          <p className="text-sm text-zinc-700">
            {label.updated} {document.lastUpdated}
          </p>
        ) : null}
        {siblings.length > 1 ? (
          <nav aria-label={game.name} className="mt-6 flex flex-wrap gap-2">
            {siblings.map((other) => (
              <Link
                key={other}
                href={`${prefix}${legalPath(game, other)}`}
                aria-current={other === kind ? "page" : undefined}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                  other === kind
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-950/15 text-zinc-700 hover:border-zinc-950/40 hover:text-zinc-950"
                }`}
              >
                {label[other]}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>

      {!document ? (
        <PrivacySection title={label[kind]}>
          <p>{label.missing}</p>
        </PrivacySection>
      ) : (
        <>
          {document.intro ? (
            <p className="mb-10 rounded-xl border border-zinc-950/10 bg-[var(--color-accent-dim)] p-5 text-sm leading-relaxed text-zinc-800">
              {document.intro}
            </p>
          ) : null}
          {document.sections.map((section) => (
            <PrivacySection key={section.title} title={section.title}>
              {section.blocks.map((block, idx) => {
                if (block.type === "paragraph") {
                  return <p key={`${section.title}-p-${idx}`}>{block.text}</p>;
                }
                return (
                  <ul key={`${section.title}-l-${idx}`} className="space-y-2 pl-1">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              })}
            </PrivacySection>
          ))}
          <PrivacySection title={label.contact}>
            <p>
              <a
                href={`mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(game.name)}`}
                className="font-medium text-zinc-950 underline decoration-[var(--color-accent)] decoration-2 underline-offset-4"
              >
                {STUDIO_EMAIL}
              </a>
            </p>
          </PrivacySection>
        </>
      )}
    </div>
  );
}
