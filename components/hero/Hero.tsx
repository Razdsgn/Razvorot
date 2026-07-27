"use client";

import { useRef } from "react";

import Container from "@/components/ui/Container";

import HeroHeading from "./HeroHeading";
import HeroMeta from "./HeroMeta";
import HeroBackground from "./HeroBackground";
import HeroAnimation from "./HeroAnimation";

import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
    >
      <HeroAnimation root={heroRef} />

      <HeroBackground />

      <Container>
        <div className={styles.inner}>
          <HeroMeta />
          <HeroHeading />
        </div>
      </Container>
    </section>
  );
}
