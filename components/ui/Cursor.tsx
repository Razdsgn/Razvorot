"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [isTouch, setIsTouch] = useState(true);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    setReady(true);

    // Position is written straight to the DOM on every mousemove — no React
    // state, no spring — so the cursor tracks the pointer with zero lag.
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (el) el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
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
  }, []);

  if (!ready || isTouch) return null;

  const hasLabel = active && label.length > 0;

  return (
    <div ref={wrapRef} className="cursor-wrap">
      <div className={`cursor-blob ${active ? "is-active" : ""} ${hasLabel ? "has-label" : ""}`}>
        {hasLabel && <span className="cursor-label">{label}</span>}
      </div>
    </div>
  );
}
