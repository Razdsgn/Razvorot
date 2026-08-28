"use client";

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  variant?: "light" | "dark";
}

export default function Marquee({ items, speed = 32, reverse = false, variant = "light" }: MarqueeProps) {
  const doubled = [...items, ...items];
  const textClass = variant === "dark" ? "text-panel-ink/70" : "text-ink/70";
  const dotClass = variant === "dark" ? "bg-accent" : "bg-ink/30";

  return (
    <div className="overflow-hidden py-5">
      <div
        className={`marquee-track gap-10 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className={`whitespace-nowrap font-heading text-2xl font-semibold tracking-tight md:text-3xl ${textClass}`}>
              {item}
            </span>
            <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${dotClass}`} aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
