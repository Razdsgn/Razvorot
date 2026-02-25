import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import LenisProvider from "@/components/lenis-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Name - Creative Art Director & Designer",
  description:
    "Award-winning creative art director and designer specializing in UI/UX design, branding, and digital experiences. Winner of prestigious Awwwards and CSS Design Awards.",
  keywords: [
    "art director",
    "ui ux designer",
    "creative designer",
    "web design",
    "branding",
    "digital design",
    "awwwards",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name - Creative Art Director & Designer",
    description:
      "Award-winning creative art director and designer specializing in UI/UX design, branding, and digital experiences.",
    url: "https://yourwebsite.com",
    siteName: "Your Name Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Name Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name - Creative Art Director & Designer",
    description:
      "Award-winning creative art director and designer specializing in UI/UX design.",
    images: ["/og-image.jpg"],
    creator: "@yourusername",
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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
