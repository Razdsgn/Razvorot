"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
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
  PenTool,
  GitCommit,
} from "lucide-react";
import { useState, useEffect, memo } from "react";
import { AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   AMBIENT — fine dot-grid instead of generic gradient blobs.
   Nod to a design-tool canvas background, used site-wide (quiet).
   ═══════════════════════════════════════════════════════════════ */
function AmbientGrid() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none dot-grid opacity-40"
      aria-hidden
    />
  );
}

/* ── Texte défilant (rôles), réutilisé comme commentaire de code ── */
function RotatingText({ items, className = "" }: { items: string[]; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative h-[1.4em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 ${className}`}
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ── Bouton CTA ── */
function CTAButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "outline";
}) {
  return (
    <a
      href={href}
      className={
        variant === "primary"
          ? "inline-flex items-center gap-2 rounded bg-cobalt px-7 py-3.5 font-mono text-sm font-medium text-paper transition-colors hover:bg-cobalt-soft"
          : "inline-flex items-center gap-2 rounded border border-paper/20 px-7 py-3.5 font-mono text-sm font-medium text-paper transition-colors hover:border-paper/50 hover:bg-paper/5"
      }
    >
      {children}
    </a>
  );
}

/* ── Ligne de code numérotée (panneau "ink") ── */
function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[2rem_1fr] gap-4 md:grid-cols-[2.5rem_1fr]">
      <span className="text-right text-mist/50 select-none">{n}</span>
      <span className="whitespace-pre-wrap break-words">{children}</span>
    </div>
  );
}

/* ── Repère de section, cohérent avec la numérotation de la navbar ── */
function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-mist">
      <span className="text-cobalt-soft">{index}</span>
      <span className="h-px w-8 bg-ink-line" />
      {label}
    </div>
  );
}

/* ── Statistique animée (déclenchée au scroll) ── */
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
    const duration = 1200;
    const increment = end / (duration / 24);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 24);
    return () => clearInterval(timer);
  }, [seen, end]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-1.5 px-6 first:pl-0 last:pr-0 md:border-l md:border-ink-line md:first:border-l-0"
    >
      <div className="font-mono text-3xl font-medium tabular-nums text-paper md:text-4xl">
        {count}
        {suffix}
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">{label}</div>
    </div>
  );
}

/* ── Données ── */
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

// Colonne "papier" (design & direction) vs colonne "ink" (engineering) —
// partition faite par label, pas par duplication de données.
const designSkillCategory = skillCategories.find((c) => c.label === "Design & UX")!;
const engineeringSkillCategories = skillCategories.filter((c) => c.label !== "Design & UX");

const projects = [
  {
    title: "Kvas & Cidre",
    filename: "kvas-et-cidre.php",
    subtitle: "Gestion associative full-stack",
    description:
      "Application Symfony 7 / PHP 8.4 avec système multi-rôles, agendas récurrents RRule, calendrier interactif Stimulus/Hotwire, carte Leaflet/OSM, paiements, export CSV et emails automatisés. 22 entités Doctrine et architecture orientée services.",
    tags: ["Symfony 7", "PHP 8.4", "Doctrine ORM", "RRule", "Leaflet", "PHPUnit", "Stimulus"],
    icon: "🗓️",
    number: "01",
  },
  {
    title: "Enchere",
    filename: "enchere.php",
    subtitle: "Système d'enchères en ligne",
    description:
      "Plateforme d'enchères full-stack avec logique métier Symfony, sécurité des accès, base MySQL optimisée et interface Twig moderne pensée pour la lisibilité et la rapidité d'usage.",
    tags: ["Symfony", "PHP", "MySQL", "Doctrine", "Twig", "JavaScript"],
    icon: "🔨",
    number: "02",
  },
  {
    title: "Symphony Peshpe",
    filename: "symphony-peshpe.php",
    subtitle: "Projet en cours de développement",
    description:
      "Nouveau projet web en cours avec attention portée à la structure applicative, la qualité du code, les tests PHPUnit et une base solide pour l'évolution du produit.",
    tags: ["Symfony", "PHP", "PHPUnit", "TDD", "Architecture"],
    icon: "🚀",
    number: "03",
  },
];

// `track` pilote l'icône/couleur du nœud de la timeline : design (clay, PenTool)
// ou engineering (cobalt, GitCommit). Lu chronologiquement (le plus récent en haut),
// la timeline visualise littéralement le virage design → développement.
const experiences: {
  period: string;
  title: string;
  company: string;
  description: string;
  track: "design" | "code";
}[] = [
  {
    period: "2025 — présent",
    title: "Développeur Web en formation",
    company: "ENI École Informatique",
    description:
      "Développement full-stack Symfony, architecture orientée services, formulaires avancés, calendrier interactif, cartes géolocalisées et tests PHPUnit.",
    track: "code",
  },
  {
    period: "05/2024",
    title: "Testeur Logiciel — Stage",
    company: "Harmonic France",
    description:
      "Conception de plans de test, exécution de tests manuels et rédaction de rapports structurés.",
    track: "code",
  },
  {
    period: "11/2018 — 05/2022",
    title: "Chef de Projet International",
    company: "Astra Construction",
    description:
      "Coordination d'équipes, suivi de budgets, respect des délais et pilotage global des étapes projet.",
    track: "design",
  },
  {
    period: "02/2013 — 10/2018",
    title: "Coordinateur de Projets",
    company: "Razvorot Design",
    description:
      "Coordination des campagnes publicitaires, relation clients et gestion de commandes designers.",
    track: "design",
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

/* ── Carte de projet, présentée comme un onglet d'éditeur de code ── */
const ProjectCard = memo(function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="relative overflow-hidden rounded-lg border border-ink-line bg-ink-soft"
    >
      {/* Barre d'onglet façon éditeur */}
      <div className="flex items-center gap-2 border-b border-ink-line px-5 py-3">
        <div className="editor-dots flex gap-1.5" aria-hidden>
          <span className="bg-clay/70" />
          <span className="bg-cobalt/70" />
          <span className="bg-mist/40" />
        </div>
        <span className="ml-3 font-mono text-xs text-mist">{project.filename}</span>
      </div>

      <div className="relative p-8 md:p-10">
        <div className="absolute right-6 top-2 select-none font-mono text-7xl font-black text-paper/5 md:text-8xl">
          {project.number}
        </div>

        <div className="relative flex flex-col gap-6 md:flex-row md:items-start">
          <div className="text-5xl">{project.icon}</div>

          <div className="flex-1">
            <div className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-clay-soft">
              {project.subtitle}
            </div>
            <h3 className="mb-4 font-display text-2xl italic md:text-3xl">{project.title}</h3>
            <p className="mb-6 max-w-3xl leading-relaxed text-paper/70">{project.description}</p>
            <div className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-cobalt/25 bg-cobalt/10 px-3 py-1 font-mono text-xs text-cobalt-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="https://github.com/Razdsgn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-paper"
            >
              <Github size={15} /> Voir GitHub <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/* ── Panneau "en ce moment" ── */
function FloatingPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-ink-line bg-ink-soft p-6 md:p-8"
    >
      <div className="mb-4 flex items-center gap-3 text-paper/80">
        <Layers3 size={18} />
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-mist">En ce moment</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded border border-ink-line bg-ink p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-paper">
            <span className="h-2.5 w-2.5 rounded-full bg-cobalt-soft" />
            Architecture Symfony
          </div>
          <p className="text-sm text-mist">Structure orientée services, formulaires propres et logique métier réutilisable.</p>
        </div>
        <div className="rounded border border-ink-line bg-ink p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-paper">
            <span className="h-2.5 w-2.5 rounded-full bg-clay-soft" />
            Interfaces soignées
          </div>
          <p className="text-sm text-mist">Mise en page responsive héritée d&apos;un vrai passé de designer.</p>
        </div>
        <div className="rounded border border-ink-line bg-ink p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-paper">
            <span className="h-2.5 w-2.5 rounded-full bg-paper/50" />
            Tests & qualité
          </div>
          <p className="text-sm text-mist">Workflow PHPUnit, rigueur de débogage et attention au détail.</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── PAGE PRINCIPALE ── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Le panneau "papier" (design) s'efface pendant que le panneau
  // "ink" (code) apparaît — la transformation littérale designer → développeur.
  const paperOpacity = useTransform(heroProgress, [0, 0.55], [1, 0]);
  const paperY = useTransform(heroProgress, [0, 0.55], [0, -50]);
  const inkOpacity = useTransform(heroProgress, [0.3, 1], [0, 1]);
  const inkY = useTransform(heroProgress, [0.3, 1], [50, 0]);
  const cueOpacity = useTransform(heroProgress, [0, 0.12], [1, 0]);

  const roles = [
    "// Développeur Web Full-Stack",
    "// Développeur Symfony / PHP",
    "// Ingénieur Back-end",
    "// Ex-designer & chef de projet",
  ];

  const contactEmail = "rkhonyakov@gmail.com";

  return (
    <>
      <AmbientGrid />

      <main className="relative z-10 min-h-screen overflow-x-hidden bg-ink text-paper">
        {/* ── HERO — panneau bureau de création → éditeur de code ── */}
        <section ref={heroRef} className="relative h-[155vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Panneau "papier" — Coordination & Design */}
            <motion.div
              style={{ opacity: paperOpacity, y: paperY }}
              className="absolute inset-0 flex items-center justify-center bg-paper px-6 text-graphite"
            >
              <span className="crop-mark tl" />
              <span className="crop-mark tr" />
              <span className="crop-mark bl" />
              <span className="crop-mark br" />
              <div className="ruler-x absolute inset-x-0 bottom-0 h-4" aria-hidden />

              <div className="w-full max-w-4xl text-center">
                <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-clay">
                  Coordination & Design — 2013 – 2022
                </p>
                <h1 className="mb-8 font-display text-6xl italic leading-none tracking-tight md:text-8xl">
                  Raman
                  <br />
                  <span className="not-italic font-medium">Khaniakou</span>
                </h1>
                <div className="flex items-center justify-center gap-4" aria-hidden>
                  {[
                    { name: "clay", cls: "bg-clay" },
                    { name: "graphite", cls: "bg-graphite" },
                    { name: "cobalt", cls: "bg-cobalt" },
                    { name: "paper", cls: "bg-paper-soft border border-graphite/30" },
                  ].map((swatch) => (
                    <div key={swatch.name} className="flex flex-col items-center gap-2">
                      <div className={`h-8 w-8 rounded-sm ${swatch.cls}`} />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-graphite/60">
                        {swatch.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Panneau "ink" — Développement Symfony */}
            <motion.div
              style={{ opacity: inkOpacity, y: inkY }}
              className="absolute inset-0 flex items-center justify-center bg-ink px-6"
            >
              <div className="editor-gutter w-full max-w-3xl rounded-lg border border-ink-line bg-ink-soft p-6 font-mono text-sm md:p-10 md:text-base">
                <CodeLine n={1}>
                  <span className="text-cobalt-soft">const</span> développeur = {"{"}
                </CodeLine>
                <CodeLine n={2}>
                  {"  "}nom: <span className="text-clay-soft">&quot;Raman Khaniakou&quot;</span>,
                </CodeLine>
                <CodeLine n={3}>
                  {"  "}stack: [
                  <span className="text-clay-soft">&quot;Symfony 7&quot;</span>,{" "}
                  <span className="text-clay-soft">&quot;PHP 8.4&quot;</span>,{" "}
                  <span className="text-clay-soft">&quot;Doctrine&quot;</span>],
                </CodeLine>
                <CodeLine n={4}>
                  {"  "}origine: <span className="text-clay-soft">&quot;design &amp; coordination de projets&quot;</span>,
                </CodeLine>
                <CodeLine n={5}>
                  {"  "}localisation: <span className="text-clay-soft">&quot;Rennes, France&quot;</span>,
                </CodeLine>
                <CodeLine n={6}>
                  {"}"};
                  <span className="ml-1 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-caret bg-cobalt-soft align-middle" />
                </CodeLine>
                <div className="mt-4 grid grid-cols-[2rem_1fr] gap-4 text-mist md:grid-cols-[2.5rem_1fr]">
                  <span />
                  <RotatingText items={roles} className="italic" />
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <CTAButton href="#work">
                    voir_projets() <ChevronRight size={16} />
                  </CTAButton>
                  <CTAButton href={`mailto:${contactEmail}`} variant="outline">
                    me_contacter() <Mail size={16} />
                  </CTAButton>
                </div>
              </div>
            </motion.div>

            {/* Repère de scroll */}
            <motion.div
              style={{ opacity: cueOpacity }}
              className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-widest text-graphite/60"
            >
              scroll ↓
            </motion.div>
          </div>
        </section>

        {/* ── STATS — barre de statut ── */}
        <section className="border-y border-ink-line px-6 py-14">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-y-8 md:justify-between">
            <AnimatedStat end={22} label="Entités Doctrine" />
            <AnimatedStat end={3} label="Projets full-stack" suffix="+" />
            <AnimatedStat end={4} label="Langues maîtrisées" />
            <AnimatedStat end={10} label="Ans d'expérience" suffix="+" />
          </div>
        </section>

        {/* ── PROJETS ── */}
        <section id="work" className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <SectionEyebrow index="02" label="Réalisations" />
              <h2 className="font-display text-4xl italic md:text-5xl">Projets</h2>
            </motion.div>

            <div className="flex flex-col gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ── EN CE MOMENT ── */}
        <section className="px-6 pb-8">
          <div className="mx-auto max-w-5xl">
            <FloatingPanel />
          </div>
        </section>

        {/* ── COMPÉTENCES — deux colonnes, deux registres ── */}
        <section id="skills" className="bg-ink-soft px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <SectionEyebrow index="03" label="Stack & direction" />
              <h2 className="font-display text-4xl italic md:text-5xl">Compétences</h2>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
              {/* Design & Direction — registre "papier" */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-lg bg-paper p-7 text-graphite"
              >
                <div className="mb-6 flex items-center gap-3">
                  <PenTool size={18} className="text-clay" />
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-clay">
                    Design &amp; Direction
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {designSkillCategory.items.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Engineering — registre "ink" */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="rounded-lg border border-ink-line bg-ink p-7"
              >
                <div className="mb-6 flex items-center gap-3">
                  <GitCommit size={18} className="text-cobalt-soft" />
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-cobalt-soft">
                    Engineering
                  </span>
                </div>
                <div className="grid gap-6 sm:grid-cols-3">
                  {engineeringSkillCategories.map((category) => (
                    <div key={category.label}>
                      <div className="mb-3 flex items-center gap-2 text-paper/80">
                        {category.icon}
                        <span className="font-mono text-xs">{category.label}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {category.items.map((item) => (
                          <span key={item} className="font-mono text-xs text-mist">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PARCOURS ── */}
        <section id="about" className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <SectionEyebrow index="01" label="De la coordination au code" />
              <h2 className="font-display text-4xl italic md:text-5xl">Parcours</h2>
            </motion.div>

            <div className="grid gap-16 md:grid-cols-2">
              <div>
                <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-mist">Expérience</h3>
                <div className="relative space-y-10 border-l border-ink-line pl-8">
                  {experiences.map((exp, idx) => {
                    const isCode = exp.track === "code";
                    return (
                      <motion.div
                        key={exp.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="relative"
                      >
                        <span
                          className={`absolute -left-[2.15rem] top-0.5 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-ink ${
                            isCode ? "border-cobalt-soft text-cobalt-soft" : "border-clay text-clay"
                          }`}
                        >
                          {isCode ? <GitCommit size={13} /> : <PenTool size={13} />}
                        </span>
                        <div className="mb-1 font-mono text-xs tracking-wide text-mist">{exp.period}</div>
                        <h4 className="mb-1 text-lg font-bold">{exp.title}</h4>
                        <div className={`mb-2 text-sm ${isCode ? "text-cobalt-soft" : "text-clay-soft"}`}>
                          {exp.company}
                        </div>
                        <p className="text-sm leading-relaxed text-paper/60">{exp.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="mb-12">
                  <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-mist">Formation</h3>
                  <div className="relative space-y-8 border-l border-ink-line pl-6">
                    {educations.map((edu, idx) => (
                      <motion.div
                        key={edu.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="relative"
                      >
                        <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-paper/30 bg-ink" />
                        <div className="mb-1 font-mono text-xs text-mist">{edu.period}</div>
                        <h4 className="mb-1 text-lg font-bold">{edu.title}</h4>
                        <div className="text-sm text-paper/60">{edu.school}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-mist">Langues</h3>
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
                          <span className="text-mist">{level}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-ink-line">
                          {/* Le dégradé va de l'accent design (clay) à l'accent code (cobalt) —
                              même logique que la timeline, appliquée à une jauge. */}
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-clay to-cobalt-soft"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
        <section id="contact" className="bg-ink-soft px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16 text-center"
            >
              <SectionEyebrow index="04" label="Prochaine étape" />
              <h2 className="mb-6 font-display text-4xl italic leading-tight md:text-6xl">
                Construisons quelque
                <br />
                chose ensemble.
              </h2>
              <p className="mx-auto max-w-xl text-xl text-paper/60">
                Je recherche une alternance en développement web à partir d&apos;octobre 2026.
              </p>
            </motion.div>

            <div className="mb-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: <Mail className="h-5 w-5" />,
                  label: "Email",
                  value: contactEmail,
                  href: `mailto:${contactEmail}`,
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
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-ink-line bg-ink">
                    {item.icon}
                  </div>
                  <h4 className="mb-2 font-bold">{item.label}</h4>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-paper/60 transition-colors hover:text-cobalt-soft">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-paper/60">{item.value}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center gap-8"
            >
              {[
                // TODO(Raman): remplace par ton URL LinkedIn réelle avant mise en ligne.
                { label: "LinkedIn", href: "#", icon: <Linkedin size={16} /> },
                { label: "GitHub", href: "https://github.com/Razdsgn", icon: <Github size={16} /> },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-paper/60 transition-colors hover:text-paper"
                >
                  {social.icon} {social.label} ↗
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-ink-line px-6 py-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 font-mono text-xs text-mist md:flex-row">
            <p>© 2026 Raman Khaniakou. Tous droits réservés.</p>
            <p className="flex items-center gap-2">
              <Sparkles size={13} /> Développeur Web Full-Stack · Rennes, France
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
