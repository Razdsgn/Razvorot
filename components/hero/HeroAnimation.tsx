"use client";

import { RefObject } from "react";

import { useGSAP } from "@gsap/react";

import gsap from "gsap";

type Props = {
  root: RefObject<HTMLElement | null>;
};

export default function HeroAnimation({ root }: Props) {
  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>(".hero-line");

      gsap.from(lines, {
        yPercent: 110,
        opacity: 0,
        duration: 1.3,
        stagger: 0.12,
        ease: "power4.out",
      });
    },
    {
      scope: root,
    }
  );

  return null;
}
