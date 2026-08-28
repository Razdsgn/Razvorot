"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Wraps interactive elements (buttons, the contact badge, nav CTAs) so
 * they gently follow the cursor within their own bounds — the "magnetic
 * button" micro-interaction seen across award-winning agency sites.
 * No-ops gracefully on touch devices since there's no hover to react to.
 */
export default function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 14, mass: 0.15 });
  const springY = useSpring(y, { stiffness: 150, damping: 14, mass: 0.15 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className ?? "inline-block"}
    >
      {children}
    </motion.div>
  );
}
