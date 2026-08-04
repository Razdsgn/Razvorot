"use client";

interface MarqueeProps {
  items: string[];
  speed?: number;
}

export default function Marquee({ items, speed = 35 }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-foreground/10 py-6">
      <div
        className="marquee-track gap-16"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap font-heading font-semibold text-2xl text-foreground/80 md:text-3xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
