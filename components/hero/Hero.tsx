import Container from "@/components/ui/Container";
import HeroHeading from "./HeroHeading";
import HeroMeta from "./HeroMeta";
import HeroBackground from "./HeroBackground";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
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
