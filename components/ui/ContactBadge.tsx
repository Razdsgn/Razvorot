"use client";

import { ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";

const LABEL = "DISPONIBLE POUR ALTERNANCE \u2022 OCT. 2026 \u2022 ";

export default function ContactBadge() {
  return (
    <Magnetic strength={0.3} className="fixed bottom-8 right-8 z-40 hidden md:block">
      <a
        href="#contact"
        data-cursor="Dire bonjour"
        aria-label="Aller à la section contact"
        className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-accent text-accent-ink shadow-none md:h-28 md:w-28"
      >
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
          <defs>
            <path id="badge-circle" d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" />
          </defs>
          <text fontSize="10.2" fontWeight="700" letterSpacing="1.2">
            <textPath href="#badge-circle" fill="currentColor">
              {LABEL}
              {LABEL}
            </textPath>
          </text>
        </svg>
        <ArrowUpRight
          size={26}
          className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </Magnetic>
  );
}
