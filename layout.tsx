import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import LenisProvider from "@/components/lenis-provider";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://razdsgn.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Raman Khaniakou — Développeur Web Full-Stack Symfony",
  description:
    "Développeur web full-stack en formation (Symfony, PHP, Doctrine), ancien coordinateur de projets et designer. Basé à Rennes, à la recherche d'une alternance à partir d'octobre 2026.",
  keywords: [
    "développeur web",
    "Symfony",
    "PHP",
    "full-stack",
    "Rennes",
    "alternance développeur web",
    "Doctrine ORM",
  ],
  authors: [{ name: "Raman Khaniakou" }],
  openGraph: {
    title: "Raman Khaniakou — Développeur Web Full-Stack Symfony",
    description:
      "De la coordination de projets et du design à l'architecture Symfony full-stack. Portfolio et projets.",
    url: siteUrl,
    siteName: "Raman Khaniakou — Portfolio",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raman Khaniakou — Développeur Web Full-Stack Symfony",
    description:
      "De la coordination de projets et du design à l'architecture Symfony full-stack.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`scroll-smooth ${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <LenisProvider>
          <Navbar />
          {children}
          <CustomCursor />
        </LenisProvider>
      </body>
    </html>
  );
}
