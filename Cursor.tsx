"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest?.('a, button, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest?.('a, button, [role="button"]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className={`cursor-ring ${isHovering ? "hover" : ""}`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
