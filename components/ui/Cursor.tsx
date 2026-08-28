"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [ready, setReady] = useState(false);
  const [isTouch, setIsTouch] = useState(true);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    setReady(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.<HTMLElement>("[data-cursor]");
      if (target) {
        setActive(true);
        setLabel(target.dataset.cursor ?? "");
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.<HTMLElement>("[data-cursor]");
      if (target) {
        setActive(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready || isTouch) return null;

  return (
    <motion.div className="cursor-wrap" style={{ left: springX, top: springY }}>
      <div className={`cursor-blob ${active ? "is-active" : ""}`}>
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </motion.div>
  );
}
