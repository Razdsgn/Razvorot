"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  ChevronRight,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Code2,
  Database,
  Server,
  Palette,
  Layers3,
  Sparkles,
} from "lucide-react";

/* ───────────────────────── Custom cursor ───────────────────────── */
function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 140, damping: 20 });
  const ringY = useSpring(dotY, { stiffness: 140, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [dotX, dotY]);

  return (
    <>
      <motion.div className="cursor-dot" style={{ left: dotX, top: dotY }} />
      <motion.div className="cursor-ring" style={{ left: ringX, top: ringY }} />
    </>
  );
}

/* ───────────────────────── Background blobs ───────────────────────── */
function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      <div className="blob blob-1 w-[520px] h-[520px] bg-blue-600 top-[-140px] left-[-140px]" />
      <div className="blob blob-2 w-[440px] h-[440px] bg-purple-700 bottom-[4%] right-[-120px]" />
      <div className="blob blob-3 w-[320px] h-[320px] bg-cyan-500 top-[38%] left-[42%]" />
    </div>
  );
}

/* ───────────────────────── Floating particles ───────────────────────── */
function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        size: (i % 3) + 1,
        left: (i * 17) % 100,
        delay: (i * 0.7) % 8,
        duration: 12 + (i % 6) * 2,
        opacity: 0.12 + (i % 4) * 0.07,
      })),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: "-10px",
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ───────────────────────── Rotating text ───────────────────────── */
function RotatingText({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative h-[1.3em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 22, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -22, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── Magnetic button ───────────────────────── */
function MagneticButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "outline";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setPosition({ x: x * 0.25, y: y * 0.25 });
      }}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={position}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={
        variant === "primary"
          ? "inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition-colors hover:bg-gray-100"
          : "inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
      }
    >
      {children}
    </motion.a>
  );
}

/* ───────────────────────── Animated stat counter ───────────────────────── */
function AnimatedStat({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.45 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return;
    let start = 0;
    const duration = 1600;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [seen, end]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-2 text-4xl font-bold md:text-5xl tabular-nums"
      >
        {count}
        {suffix}
      </motion.div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

/* ───────────────────────── Data ───────────────────────── */
const skillCategories = [
  {
    icon: <Server size={18} />,
    label: "Back-end",
    items: ["PHP 8.4", "Symfony 7", "Java", "Python", "SQL", "Doctrine ORM"],
  },
  {
    icon: <Code2 size={18} />,
    label: "Front-end",
    items: ["JavaScript", "TypeScript", "HTML / CSS", "Twig", "Stimulus", "Angular"],
  },
  {
    icon: <Database size={18} />,
    label: "Outils & DevOps",
    items: ["Git / GitHub", "Docker", "PHPUnit", "Leaflet / OSM", "RRule", "iCalendar"],
  },
  {
    icon: <Palette size={18} />,
    label: "Design & UX",
    items: ["Figma", "UX / UI", "MVC", "Architecture Services", "Multi-rôles"],
  },
];

const projects = [
  {
    title: "Kvas & Cidre",
    subtitle: "Gestion associative full-stack",
    description:
      "Application Symfony 7 / PHP 8.4 avec système multi-rôles, agendas récurrents RRule, calendrier interactif Stimulus/Hotwire, carte Leaflet/OSM, paiements, export CSV et emails automatisés. 22 entités Doctrine et architecture orientée services.",
    tags: ["Symfony 7", "PHP 8.4", "Doctrine ORM", "RRule", "Leaflet", "PHPUnit", "Stimulus"],
    color: "#3b82f6",
    gradient: "from-blue-900/40 to-purple-900/30",
    icon: "🗓️",
    number: "01",
  },
  {
    title: "Enchere",
    subtitle: "Système d'enchères en ligne",
    description:
      "Plateforme d'enchères full-stack avec logique métier Symfony, sécurité des accès, base MySQL optimisée et interface Twig moderne pensée pour la lisibilité et la rapidité d'usage.",
    tags: ["Symfony", "PHP", "MySQL", "Doctrine", "Twig", "JavaScript"],
    color: "#f97316",
    gradient: "from-orange-900/40 to-red-900/30",
    icon: "🔨",
    number: "02",
  },
  {
    title: "Symphony Peshpe",
    subtitle: "Projet en cours de développement",
    description:
      "Nouveau projet web en cours avec attention portée à la structure applicative, la qualité du code, les tests PHPUnit et une base solide pour l'évolution du produit.",
    tags: ["Symfony", "PHP", "PHPUnit", "TDD", "Architecture"],
    color: "#22c55e",
    gradient: "from-green-900/40 to-teal-900/30",
    icon: "🚀",
    number: "03",
  },
];

const experiences = [
  {
    period: "2025 — présent",
    title: "Développeur Web en formation",
    company: "ENI École Informatique",
    description:
      "Développement full-stack Symfony, architecture orientée services, formulaires avancés, calendrier interactif, cartes géolocalisées et tests PHPUnit.",
  },
  {
    period: "05/2024",
    title: "Testeur Logiciel — Stage",
    company: "Harmonic France",
    description:
      "Conception de plans de test, exécution de tests manuels et rédaction de rapports structurés.",
  },
  {
    period: "11/2018 — 05/2022",
    title: "Chef de Projet International",
    company: "Astra Construction",
    description:
      "Coordination d'équipes, suivi de budgets, respect des délais et pilotage global des étapes projet.",
  },
  {
    period: "02/2013 — 10/2018",
    title: "Coordinateur de Projets",
    company: "Razvorot Design",
    description:
      "Coordination des campagnes publicitaires, relation clients et gestion de commandes designers.",
  },
];

const educations = [
  {
    period: "2025 — présent",
    title: "Développeur Web et Web Mobile (BAC+3)",
    school: "ENI École Informatique",
  },
  {
    period: "11/2024 — 05/2025",
    title: "Formation Tremplin Numérique",
    school: "Les petits débrouillards / IMT Atlantique",
  },
  {
    period: "2008 — 2013",
    title: "Études techniques",
    school: "Université Technique de Biélorussie",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ───────────────────────── Project card ───────────────────────── */
function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [32, -32]);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <motion.div
        whileHover={{ scale: 1.01, borderColor: "rgba(255,255,255,0.18)" }}
        transition={{ duration: 0.3 }}
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${project.gradient} p-8 md:p-10`}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(360px circle at 20% 20%, ${project.color}22, transparent 60%)`,
              }}
            />
          )}
        </AnimatePresence>

        <motion.div style={{ y }} className="absolute right-6 top-4 select-none text-7xl font-black text-white/5 md:text-8xl">
          {project.number}
        </motion.div>

        <div className="relative flex flex-col gap-6 md:flex-row md:items-start">
          <motion.div
            animate={hovered ? { rotate: [0, -6, 6, 0], scale: 1.08 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="text-5xl"
          >
            {project.icon}
          </motion.div>

          <div className="flex-1">
            <div className="mb-2 text-xs uppercase tracking-[0.24em] text-gray-500">{project.subtitle}</div>
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">{project.title}</h3>
            <p className="mb-6 max-w-3xl text-gray-400 leading-relaxed">{project.description}</p>
            <div className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.12)" }}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <motion.a
              href="https://github.com/Razdsgn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <Github size={15} /> Voir GitHub <ExternalLink size={12} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────── Currently building panel ───────────────────────── */
function FloatingPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass rounded-3xl p-6 md:p-8"
    >
      <div className="mb-4 flex items-center gap-3 text-white/80">
        <Layers3 size={18} />
        <span className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-400">Currently building</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Symfony Architecture
          </div>
          <p className="text-sm text-gray-400">Service-oriented structure, clean form flows and reusable business logic.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
            Modern Interfaces
          </div>
          <p className="text-sm text-gray-400">Responsive portfolio layout with smooth transitions and interactive sections.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
            <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
            Test & Quality
          </div>
          <p className="text-sm text-gray-400">PHPUnit-oriented workflow, debugging discipline and strong attention to detail.</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.18]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.965]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -32]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 320, damping: 36, mass: 0.2 });

  const roles = [
    "Développeur Web Full-Stack",
    "Développeur Symfony / PHP",
    "Ingénieur Back-end",
    "Passionné UI/UX & Architecture",
  ];

  return (
    <>
      <CustomCursor />
      <BackgroundBlobs />
      <Particles />

      {/* Scroll progress bar */}
      <motion.div className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-white" style={{ scaleX }} />

      <main className="relative z-10 min-h-screen overflow-x-hidden bg-[#0a0a0a]/90 text-white">
        {/* ── HERO ── */}
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative flex min-h-screen items-center justify-center px-6"
        >
          <div className="w-full max-w-6xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-xl tracking-wide text-gray-400"
            >
              <RotatingText items={roles} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-6xl font-bold leading-none tracking-tight md:text-8xl lg:text-[8.5rem]"
            >
              Raman
              <br />
              <span className="bg-gradient-to-r from-white via-blue-200 to-zinc-500 bg-clip-text text-transparent">
                Khaniakou
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mb-4 text-lg text-gray-400"
            >
              📍 Rennes, France
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-300"
            >
              Développeur web en formation à l&apos;ENI Informatique. Je conçois des applications
              Symfony full-stack avec une attention particulière à l&apos;architecture, à la
              qualité du code et à l&apos;expérience utilisateur.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <MagneticButton href="#work">
                Voir mes projets <ChevronRight size={18} />
              </MagneticButton>
              <MagneticButton href="mailto:rkhonyakov@gmail.com" variant="outline">
                Me contacter <Mail size={18} />
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 1 }}
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="flex h-9 w-5 justify-center rounded-full border-2 border-white/20 pt-2"
            >
              <motion.div className="h-2 w-1 rounded-full bg-white/60" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ── STATS ── */}
        <section className="border-y border-white/8 px-6 py-20">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
            <AnimatedStat end={22} label="Entités Doctrine" />
            <AnimatedStat end={3} label="Projets full-stack" suffix="+" />
            <AnimatedStat end={4} label="Langues maîtrisées" />
            <AnimatedStat end={10} label="Ans d'expérience" suffix="+" />
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="work" className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="mb-3 text-4xl font-bold md:text-5xl">Projets</h2>
              <p className="text-xl text-gray-400">Réalisations sélectionnées</p>
            </motion.div>

            <div className="flex flex-col gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CURRENTLY BUILDING ── */}
        <section className="px-6 pb-8">
          <div className="mx-auto max-w-5xl">
            <FloatingPanel />
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="bg-black/30 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="mb-3 text-4xl font-bold md:text-5xl">Compétences</h2>
              <p className="text-xl text-gray-400">Stack technique & outils</p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {skillCategories.map((category) => (
                <motion.div
                  key={category.label}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="glass rounded-3xl p-6"
                >
                  <div className="mb-5 flex items-center gap-3 text-white/80">
                    {category.icon}
                    <span className="text-sm font-semibold">{category.label}</span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {category.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── PARCOURS ── */}
        <section id="about" className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-4xl font-bold md:text-5xl"
            >
              Parcours
            </motion.h2>

            <div className="grid gap-16 md:grid-cols-2">
              <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <h3 className="mb-8 text-2xl font-bold text-gray-200">Expérience</h3>
                <div className="relative space-y-10 border-l border-white/10 pl-6">
                  {experiences.map((exp, index) => (
                    <motion.div key={exp.title} variants={fadeUp} className="relative">
                      <motion.span
                        className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-white/40 bg-[#0a0a0a]"
                        whileInView={{ scale: [0, 1.3, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: index * 0.08 }}
                      />
                      <div className="mb-1 text-xs tracking-wide text-gray-500">{exp.period}</div>
                      <h4 className="mb-1 text-lg font-bold">{exp.title}</h4>
                      <div className="mb-2 text-sm text-blue-400/80">{exp.company}</div>
                      <p className="text-sm leading-relaxed text-gray-500">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div>
                <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
                  <h3 className="mb-8 text-2xl font-bold text-gray-200">Formation</h3>
                  <div className="relative space-y-8 border-l border-white/10 pl-6">
                    {educations.map((edu, index) => (
                      <motion.div key={edu.title} variants={fadeUp} className="relative">
                        <motion.span
                          className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-white/40 bg-[#0a0a0a]"
                          whileInView={{ scale: [0, 1.3, 1] }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.45, delay: index * 0.08 }}
                        />
                        <div className="mb-1 text-xs text-gray-500">{edu.period}</div>
                        <h4 className="mb-1 text-lg font-bold">{edu.title}</h4>
                        <div className="text-sm text-gray-400">{edu.school}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h3 className="mb-6 text-2xl font-bold text-gray-200">Langues</h3>
                  <div className="space-y-4">
                    {[
                      { lang: "Russe", level: "Natif", pct: 100 },
                      { lang: "Biélorusse", level: "Natif", pct: 100 },
                      { lang: "Anglais", level: "Avancé", pct: 80 },
                      { lang: "Français", level: "Intermédiaire", pct: 60 },
                    ].map(({ lang, level, pct }) => (
                      <div key={lang}>
                        <div className="mb-1.5 flex justify-between text-sm">
                          <span>{lang}</span>
                          <span className="text-gray-400">{level}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-white"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="bg-black/30 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-6 text-4xl font-bold md:text-6xl">
                Construisons quelque<br />
                chose ensemble.
              </h2>
              <p className="mx-auto max-w-xl text-xl text-gray-400">
                Je recherche une alternance en développement web à partir d&apos;octobre 2026.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mb-16 grid gap-8 md:grid-cols-3"
            >
              {[
                {
                  icon: <Mail className="h-5 w-5" />,
                  label: "Email",
                  value: "rkhonyakov@gmail.com",
                  href: "mailto:rkhonyakov@gmail.com",
                },
                {
                  icon: <Phone className="h-5 w-5" />,
                  label: "Téléphone",
                  value: "07 63 24 37 44",
                  href: "tel:+33763243744",
                },
                {
                  icon: <MapPin className="h-5 w-5" />,
                  label: "Localisation",
                  value: "Rennes, France",
                  href: null,
                },
              ].map((item) => (
                <motion.div key={item.label} variants={fadeUp} className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    className="glass mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                  >
                    {item.icon}
                  </motion.div>
                  <h4 className="mb-2 font-bold">{item.label}</h4>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-gray-400 transition-colors hover:text-white">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-400">{item.value}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center gap-8"
            >
              {[
                { label: "LinkedIn", href: "https://linkedin.com/in/romankh", icon: <Linkedin size={16} /> },
                { label: "GitHub", href: "https://github.com/romankh", icon: <Github size={16} /> },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {social.icon} {social.label} ↗
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/8 px-6 py-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
            <p>© 2026 Raman Khaniakou. Tous droits réservés.</p>
            <p className="flex items-center gap-2">
              <Sparkles size={14} /> Développeur Web Full-Stack · Rennes, France
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
