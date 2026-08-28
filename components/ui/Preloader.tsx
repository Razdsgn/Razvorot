"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRELOADER_MS } from "@/lib/timing";

const DURATION = PRELOADER_MS;

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(100);
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 200);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden bg-background"
          exit={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="flex h-full flex-col justify-between px-[5%] py-10"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between font-sans text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              <span>Raman Khaniakou</span>
              <span>Développeur Web Full-Stack</span>
            </div>

            <div className="flex items-end justify-between">
              <span className="font-heading text-[18vw] font-bold leading-none tracking-tight text-ink sm:text-[13vw]">
                RK
              </span>
              <span className="font-heading text-[10vw] font-bold leading-none tabular-nums text-ink sm:text-[6vw]">
                {progress}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
