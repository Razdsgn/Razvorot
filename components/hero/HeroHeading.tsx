import styles from "./Hero.module.css";

export default function HeroHeading() {
  return (
    <h1 className={styles.title}>
      <span className="hero-line">CREATING</span>
      <span className="hero-line">DIGITAL</span>
      <span className="hero-line">EXPERIENCES</span>
    </h1>
  );
}
