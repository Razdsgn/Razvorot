"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import RevealText from "@/components/ui/RevealText";
import { roles } from "@/lib/content";
import { usePreloaderClearDelay } from "@/lib/timing";

function RotatingRole({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative h-[1.5em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -22, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 font-sans text-lg font-semibold text-muted md:text-xl"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const start = usePreloaderClearDelay();

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-center px-[5%] pt-32 pb-20"
    >
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto w-full max-w-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: start }}
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Ouvert à l&apos;alternance — dès octobre 2026
        </motion.div>

        <h1 className="font-heading text-hero text-ink">
          <RevealText as="span" className="block" onLoad delay={start + 0.15}>
            Raman Khaniakou
          </RevealText>
        </h1>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RotatingRole items={roles} />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: start + 0.45 }}
            className="max-w-md font-sans text-base leading-relaxed text-muted md:text-right"
          >
            Ancien coordinateur de projets et designer, aujourd&apos;hui développeur web
            full-stack. Je conçois des applications Symfony robustes, de l&apos;architecture
            back-end aux interfaces les plus soignées.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: start + 0.55 }}
          className="mt-14 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a href="#work" data-cursor="Voir" className="btn-primary">
              Voir mes projets
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" data-cursor="" className="btn-outline inline-flex items-center gap-2">
              Me contacter <ArrowUpRight size={16} />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: start + 0.7 }}
        className="mx-auto mt-16 flex w-full max-w-container items-center justify-between px-0 sm:mt-24"
      >
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Rennes, France
        </span>
        <span className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Scroll
          <ArrowDown size={14} className="scroll-indicator" />
        </span>
      </motion.div>
    </section>
  );
}
