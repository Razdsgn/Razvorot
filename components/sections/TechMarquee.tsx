import Marquee from "@/components/Marquee";
import { techStack } from "@/lib/content";

export default function TechMarquee() {
  const reversed = [...techStack].reverse();

  return (
    <section aria-label="Stack technique" className="border-y border-ink/10">
      <p className="px-[5%] pt-8 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Technologies que j&apos;utilise au quotidien
      </p>
      <div className="py-2">
        <Marquee items={techStack} speed={30} />
        <Marquee items={reversed} speed={34} reverse />
      </div>
    </section>
  );
}
