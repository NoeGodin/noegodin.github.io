import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Press_Start_2P } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// La police du jeu Pixel Arsenal, utilisee par sa seule page. Chargee ici
// parce que next/font veut une portee de module.
const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NODIN Studio | Mobile Games",
  description:
    "NODIN Studio is an independent mobile game studio crafting thoughtful, rewarding experiences. Play GlobeTrot and Pixel Arsenal on Android.",
  openGraph: {
    title: "NODIN Studio",
    description:
      "Independent mobile game studio. Crafting worlds, one level at a time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexMono.variable} ${pressStart.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-950">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
