"use client";

import Container from "@/components/ui/Container";
import HeroHeading from "./HeroHeading";
import HeroMeta from "./HeroMeta";
import HeroBackground from "./HeroBackground";
import HeroAnimation from "./HeroAnimation";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HeroAnimation />

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
