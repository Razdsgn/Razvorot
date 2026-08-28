"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import { stats, whyPoints } from "@/lib/content";

function AnimatedStat({
  end,
  label,
  suffix = "",
}: {
  end: number;
  label: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return;
    let start = 0;
    const duration = 1200;
    const increment = end / (duration / 24);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 24);
    return () => clearInterval(timer);
  }, [seen, end]);

  return (
    <div ref={ref} className="flex flex-col gap-4 border-t border-ink/10 pt-8">
      <div className="font-heading text-stat-lg tabular-nums text-ink">
        {count}
        {suffix}
      </div>
      <p className="max-w-[220px] font-sans text-sm text-muted">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-surface px-[5%] py-24 md:py-32">
      <div className="mx-auto max-w-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Pourquoi moi</p>
            <h2 className="font-heading text-display text-ink">
              <RevealText as="span" className="block">
                De la gestion de
              </RevealText>
              <RevealText as="span" className="block" delay={0.1}>
                projet au code.
              </RevealText>
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl font-sans text-lg leading-relaxed text-muted"
            >
              Coordinateur de projets et designer pendant plus de dix ans, j&apos;ai rejoint une
              formation intensive de développeur web full-stack pour transformer cette
              expérience terrain en compétences techniques concrètes.
            </motion.p>

            <ul className="mt-10 flex flex-col gap-4">
              {whyPoints.map((point, index) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="flex items-start gap-3 font-sans text-base text-ink"
                >
                  <Check size={18} className="mt-0.5 flex-shrink-0 text-ink" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} end={stat.end} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
