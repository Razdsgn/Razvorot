"use client";

import { createElement, type ElementType, type ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** Animate as soon as mounted instead of waiting for scroll into view. */
  onLoad?: boolean;
}

/**
 * Splits text into words, each masked inside an overflow-hidden span, and
 * slides them up into place — the line-by-line kinetic-type reveal used
 * for the hero headline and every section title.
 */
export default function RevealText({
  children,
  as = "span",
  className,
  delay = 0,
  stagger = 0.045,
  once = true,
  onLoad = false,
}: RevealTextProps) {
  const words = children.split(" ");

  const wordSpans = words.map((word, i) => {
    const transition = {
      duration: 0.75,
      delay: delay + i * stagger,
      ease: [0.16, 1, 0.3, 1] as const,
    };
    const motionProps = onLoad
      ? { initial: { y: "115%" }, animate: { y: "0%" }, transition }
      : {
          initial: { y: "115%" },
          whileInView: { y: "0%" },
          viewport: { once },
          transition,
        };

    return (
      <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <motion.span {...motionProps} className="inline-block will-change-transform">
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      </span>
    );
  });

  return createElement(as, { className }, wordSpans);
}

export function RevealBlock({
  children,
  className,
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
