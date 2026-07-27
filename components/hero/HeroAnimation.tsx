"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

export default function HeroAnimation() {
  useLayoutEffect(() => {
    const lines = document.querySelectorAll(".hero-line");

    gsap.fromTo(
      lines,
      {
        y: 160,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.3,
        stagger: 0.12,
        ease: "power4.out",
      }
    );
  }, []);

  return null;
}
