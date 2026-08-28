import Hero from "@/components/sections/Hero";
import TechMarquee from "@/components/sections/TechMarquee";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Stats from "@/components/sections/Stats";
import Experience from "@/components/sections/Experience";
import Faq from "@/components/sections/Faq";
import CtaPanel from "@/components/sections/CtaPanel";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-ink">
      <Hero />
      <TechMarquee />
      <Services />
      <Projects />
      <Stats />
      <Experience />
      <Faq />
      <CtaPanel />
    </main>
  );
}
