"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAllGames } from "../../lib/games";
import { t, type Locale } from "../../i18n/messages";

export default function Footer() {
  const games = getAllGames();
  const pathname = usePathname();
  const locale: Locale = pathname.startsWith("/en") ? "en" : "fr";
  const prefix = locale === "en" ? "/en" : "";
  const tagline = t(locale, "footer.tagline");

  return (
    <footer id="contact" className="border-t border-zinc-950/10 bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950">
            NODIN Studio
          </p>
          {tagline ? (
            <p className="max-w-xs text-sm leading-relaxed text-zinc-600">
              {tagline}
            </p>
          ) : null}
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950">
            {t(locale, "footer.policies")}
          </p>
          <ul className="space-y-2 text-sm text-zinc-600">
            {games.map((game) => (
              <li key={game.slug}>
                <Link
                  href={`${prefix}${game.privacyPath}`}
                  className="transition-colors duration-200 hover:text-zinc-950"
                >
                  {game.name} · {t(locale, "game.privacy")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-950/10 px-6 py-6 text-center text-xs text-zinc-500">
        {new Date().getFullYear()} NODIN Studio. All rights reserved.
      </div>
    </footer>
  );
}
