"use client";

import { useRef, useState, useEffect, memo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import Marquee from "@/components/Marquee";
import SkillsAccordion from "@/components/SkillsAccordion";

function RotatingText({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative h-[1.4em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 font-heading italic text-lg text-muted md:text-xl"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function AnimatedStat({ end, label, suffix = "", prefix = "" }: { end: number; label: string; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.4 }
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
    <div ref={ref} className="stat-card">
      <div className="font-heading text-stat-lg tabular-nums">
        {prefix}{count}{suffix}
      </div>
      <p className="max-w-[200px] font-sans text-sm text-muted">{label}</p>
    </div>
  );
}

const techStack = [
  "Symfony 7",
  "PHP 8.4",
  "Doctrine ORM",
  "TypeScript",
  "JavaScript",
  "Docker",
  "PHPUnit",
  "Figma",
  "Twig",
  "MySQL",
  "Git / GitHub",
  "Stimulus",
];

const projects = [
  {
    title: "Kvas & Cidre",
    subtitle: "Gestion associative full-stack",
    description:
      "Application Symfony 7 / PHP 8.4 avec système multi-rôles, agendas récurrents RRule, calendrier interactif Stimulus/Hotwire, carte Leaflet/OSM, paiements, export CSV et emails automatisés.",
    tags: ["Symfony 7", "PHP 8.4", "Doctrine ORM", "RRule", "Leaflet"],
    gradient: "from-[#14130e] via-[#2a2620] to-[#4a4136]",
  },
  {
    title: "Enchere",
    subtitle: "Système d'enchères en ligne",
    description:
      "Plateforme d'enchères full-stack avec logique métier Symfony, sécurité des accès, base MySQL optimisée et interface Twig moderne.",
    tags: ["Symfony", "PHP", "MySQL", "Twig"],
    gradient: "from-[#2a2620] via-[#5c5346] to-[#8f8574]",
  },
  {
    title: "Symphony Peshpe",
    subtitle: "Projet en cours de développement",
    description:
      "Nouveau projet web en cours avec attention portée à la structure applicative, la qualité du code, les tests PHPUnit et une base solide.",
    tags: ["Symfony", "PHP", "PHPUnit", "TDD"],
    gradient: "from-[#c9542c] via-[#a8431f] to-[#14130e]",
  },
];

const skillCategories = [
  {
    title: "Back-end & Architecture",
    subtitle: "Engineering",
    price: "Avancé",
    included: ["PHP 8.4", "Symfony 7", "Java", "Python", "SQL", "Doctrine ORM", "Architecture Services", "MVC"],
  },
  {
    title: "Front-end & Interfaces",
    subtitle: "Development",
    price: "Intermédiaire",
    included: ["JavaScript", "TypeScript", "HTML / CSS", "Twig", "Stimulus", "Angular", "Responsive Design"],
  },
  {
    title: "Outils & DevOps",
    subtitle: "Workflow",
    price: "Intermédiaire",
    included: ["Git / GitHub", "Docker", "PHPUnit", "Leaflet / OSM", "RRule", "iCalendar"],
  },
  {
    title: "Design & UX",
    subtitle: "Creative Direction",
    price: "Expert",
    included: ["Figma", "UX / UI", "Direction créative", "Coordination de projets", "Multi-rôles"],
  },
];

const experiences = [
  {
    step: "01",
    period: "2025 — présent",
    title: "Développeur Web en formation",
    company: "ENI École Informatique",
    description:
      "Développement full-stack Symfony, architecture orientée services, formulaires avancés, calendrier interactif, cartes géolocalisées et tests PHPUnit.",
  },
  {
    step: "02",
    period: "05/2024",
    title: "Testeur Logiciel — Stage",
    company: "Harmonic France",
    description:
      "Conception de plans de test, exécution de tests manuels et rédaction de rapports structurés.",
  },
  {
    step: "03",
    period: "11/2018 — 05/2022",
    title: "Chef de Projet International",
    company: "Astra Construction",
    description:
      "Coordination d'équipes, suivi de budgets, respect des délais et pilotage global des étapes projet.",
  },
  {
    step: "04",
    period: "02/2013 — 10/2018",
    title: "Coordinateur de Projets",
    company: "Razvorot Design",
    description:
      "Coordination des campagnes publicitaires, relation clients et gestion de commandes designers.",
  },
];

const educations = [
  { period: "2025 — présent", title: "Développeur Web et Web Mobile (BAC+3)", school: "ENI École Informatique" },
  { period: "11/2024 — 05/2025", title: "Formation Tremplin Numérique", school: "Les petits débrouillards / IMT Atlantique" },
  { period: "2008 — 2013", title: "Études techniques", school: "Université Technique de Biélorussie" },
];

const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.a
      href="https://github.com/Razdsgn"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="project-card group block"
    >
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${project.gradient}`}>
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <div className="flex items-start justify-between">
            <span className="font-heading italic text-lg text-white/50">
              {String(index + 1).padStart(2, "0")}
            </span>
            <ArrowRight
              size={20}
              className="-translate-x-2 text-white opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </div>
          <div>
            <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">{project.title}</h3>
            <p className="mt-1 font-sans text-sm text-white/70">{project.subtitle}</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
      </div>
    </motion.a>
  );
});

const contactEmail = "rkhonyakov@gmail.com";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const roles = [
    "Développeur Web Full-Stack",
    "Développeur Symfony / PHP",
    "Ingénieur Back-end",
    "Ex-designer & chef de projet",
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center px-[2%] pt-[100px]">
        <div className="hero-gradient pointer-events-none absolute inset-0" aria-hidden />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-[1400px]">
          <div className="relative flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12 hidden md:block"
              aria-hidden
            >
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 rotate-12 rounded-2xl bg-gradient-to-br from-white/60 via-white/20 to-transparent backdrop-blur-md" />
                <div className="absolute inset-2 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 2L18.5 13.5L30 16L18.5 18.5L16 30L13.5 18.5L2 16L13.5 13.5L16 2Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Ouvert à l&apos;alternance — dès octobre 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-heading text-hero leading-[0.95] tracking-tight"
            >
              Raman
              <br />
              <span className="italic text-accent">Khaniakou</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <RotatingText items={roles} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-4"
            >
              <a href="#work" className="btn-primary">
                Voir les projets
              </a>
              <a href={`mailto:${contactEmail}`} className="btn-outline">
                Me contacter
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="font-sans text-sm font-semibold text-muted">Scroll down</span>
          <ChevronDown size={20} className="scroll-indicator text-muted" />
        </motion.div>
      </section>

      {/* TECH MARQUEE */}
      <section aria-label="Stack technique">
        <p className="px-[2%] py-8 font-sans text-base font-semibold">Stack technique</p>
        <Marquee items={techStack} />
      </section>

      {/* PROJECTS */}
      <section id="work" className="px-[2%] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <p className="section-label">Mes Réalisations</p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-8"
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 max-w-2xl font-sans text-base text-muted"
          >
            De la coordination de projets et du design à l&apos;architecture Symfony full-stack.
            Voici une sélection de mes projets récents.
          </motion.p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={`detail-${project.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-t border-foreground/10 py-8"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <h3 className="font-heading text-2xl font-semibold">{project.title}</h3>
                    <p className="mt-1 font-sans text-sm font-semibold text-muted">{project.subtitle}</p>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-muted">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-foreground/10 px-4 py-1.5 font-sans text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://github.com/Razdsgn"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2"
            >
              Voir GitHub <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-[2%] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="section-label mb-4">Pourquoi me choisir</p>
          <h2 className="section-title mb-16 max-w-4xl">
            Projets orientés résultats, avec un focus sur le design et la fonctionnalité.
          </h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatedStat end={22} label="Entités Doctrine dans le projet principal" />
            <AnimatedStat end={3} label="Projets full-stack réalisés" suffix="+" />
            <AnimatedStat end={4} label="Langues maîtrisées" />
            <AnimatedStat end={10} label="Années d'expérience professionnelle" suffix="+" />
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="bg-card px-[2%] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="section-label mb-4">Ce que je propose</p>
          <h2 className="section-title mb-16">Compétences</h2>
          <SkillsAccordion items={skillCategories} />
        </div>
      </section>

      {/* PARCOURS / PROCESS */}
      <section id="about" className="px-[2%] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="section-label mb-4">Mon parcours</p>
          <h2 className="section-title mb-8">Experiences</h2>
          <p className="mb-16 max-w-2xl font-sans text-base text-muted">
            De la coordination de projets internationaux au développement web full-stack,
            un parcours unique entre design et code.
          </p>

          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h3 className="mb-8 font-sans text-base font-semibold">Expérience professionnelle</h3>
              <div className="space-y-0">
                {experiences.map((exp, idx) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-t border-foreground/10 py-8"
                  >
                    <div className="flex items-start gap-6">
                      <span className="font-heading italic text-4xl font-semibold text-accent/30">{exp.step}</span>
                      <div>
                        <p className="font-sans text-sm text-muted">{exp.period}</p>
                        <h4 className="mt-1 font-heading text-xl font-semibold">{exp.title}</h4>
                        <p className="mt-1 font-sans text-sm font-semibold text-foreground">{exp.company}</p>
                        <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{exp.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-8 font-sans text-base font-semibold">Formation</h3>
              <div className="space-y-0">
                {educations.map((edu, idx) => (
                  <motion.div
                    key={edu.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-t border-foreground/10 py-8"
                  >
                    <p className="font-sans text-sm text-muted">{edu.period}</p>
                    <h4 className="mt-1 font-heading text-xl font-semibold">{edu.title}</h4>
                    <p className="mt-1 font-sans text-sm text-muted">{edu.school}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 border-t border-foreground/10 pt-8">
                <h3 className="mb-6 font-sans text-base font-semibold">Langues</h3>
                <div className="space-y-4">
                  {[
                    { lang: "Russe", level: "Natif", pct: 100 },
                    { lang: "Biélorusse", level: "Natif", pct: 100 },
                    { lang: "Anglais", level: "Avancé", pct: 80 },
                    { lang: "Français", level: "Intermédiaire", pct: 60 },
                  ].map(({ lang, level, pct }) => (
                    <div key={lang}>
                      <div className="mb-2 flex justify-between font-sans text-sm">
                        <span className="font-semibold">{lang}</span>
                        <span className="text-muted">{level}</span>
                      </div>
                      <div className="h-1 overflow-hidden bg-foreground/10">
                        <motion.div
                          className="h-full bg-secondary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-card px-[2%] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="section-label mb-4">Prochaine étape</p>
              <h2 className="section-title mb-6">Have a project in mind?</h2>
              <p className="max-w-md font-sans text-lg text-muted">
                Je recherche une alternance en développement web à partir d&apos;octobre 2026.
                Construisons quelque chose ensemble.
              </p>

              <div className="mt-12 space-y-6">
                {[
                  { icon: <Mail size={20} />, label: "Email", value: contactEmail, href: `mailto:${contactEmail}` },
                  { icon: <Phone size={20} />, label: "Téléphone", value: "07 63 24 37 44", href: "tel:+33763243744" },
                  { icon: <MapPin size={20} />, label: "Localisation", value: "Rennes, France", href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-sans text-sm font-semibold">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-sans text-sm text-muted transition-colors hover:text-foreground">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-sans text-sm text-muted">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-6">
                <a
                  href="https://github.com/Razdsgn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-sm font-semibold transition-opacity hover:opacity-60"
                >
                  <Github size={16} /> GitHub
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 font-sans text-sm font-semibold transition-opacity hover:opacity-60"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                window.location.href = `mailto:${contactEmail}?subject=Contact depuis portfolio — ${name}&body=${encodeURIComponent(message)}\n\nDe: ${email}`;
              }}
            >
              <div>
                <label htmlFor="name" className="form-label">Name</label>
                <input id="name" name="name" type="text" placeholder="..." className="form-input" />
              </div>
              <div>
                <label htmlFor="email" className="form-label">Email</label>
                <input id="email" name="email" type="email" placeholder="Email" required className="form-input" />
              </div>
              <div>
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Message"
                  className="form-input resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full md:w-auto">
                Send <ArrowRight size={16} className="ml-2 inline" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-foreground/10 px-[2%] py-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden>
                  <path
                    d="M16 2L18.5 13.5L30 16L18.5 18.5L16 30L13.5 18.5L2 16L13.5 13.5L16 2Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-heading text-lg font-semibold">Raman Khaniakou</span>
              </div>
              <p className="font-sans text-sm text-muted">
                Développeur Web Full-Stack · Rennes, France
              </p>
            </div>

            <div>
              <h6 className="mb-4 font-sans text-sm font-semibold">Quick Links</h6>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="font-sans text-sm text-muted transition-colors hover:text-foreground">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h6 className="mb-4 font-sans text-sm font-semibold">Contact</h6>
              <p className="font-sans text-sm text-muted">
                {contactEmail}
                <br />
                Rennes, France
              </p>
              <h6 className="mb-4 mt-6 font-sans text-sm font-semibold">Follow</h6>
              <div className="flex gap-4">
                <a href="https://github.com/Razdsgn" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-muted hover:text-foreground">
                  GitHub
                </a>
                <a href="#" className="font-sans text-sm text-muted hover:text-foreground">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-foreground/10 pt-8">
            <p className="font-sans text-sm text-muted">
              © 2026 Raman Khaniakou. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

const navItems = [
  { label: "Parcours", href: "#about" },
  { label: "Projets", href: "#work" },
  { label: "Compétences", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
