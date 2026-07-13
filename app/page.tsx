"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ExternalLink, Mail, Phone, MapPin, Github, Linkedin, Code2, Database, Server, Palette } from "lucide-react";

function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return [ref, isInView] as const;
}

function RotatingText({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="relative h-[1.2em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function MagneticButton({ children, href, external }: { children: React.ReactNode; href: string; external?: boolean }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
    >
      {children}
    </motion.a>
  );
}

function AnimatedStat({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-bold mb-2">{count}{suffix}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

const skillCategories = [
  {
    icon: <Server size={20} />,
    label: "Back-end",
    items: ["PHP 8.4", "Symfony 7", "Java", "Python", "SQL", "Doctrine ORM", "REST API"],
  },
  {
    icon: <Code2 size={20} />,
    label: "Front-end",
    items: ["JavaScript", "TypeScript", "HTML / CSS", "Twig", "Stimulus", "Hotwire", "Angular"],
  },
  {
    icon: <Database size={20} />,
    label: "Outils & DevOps",
    items: ["Git / GitHub", "Docker", "PHPUnit", "Leaflet / OSM", "FullCalendar", "RRule", "iCalendar"],
  },
  {
    icon: <Palette size={20} />,
    label: "Design & Architecture",
    items: ["Figma", "UX / UI", "MVC", "Services Architecture", "Multi-roles", "Migrations"],
  },
];

const projects = [
  {
    title: "Kvas & Cidre — Gestion associative",
    description:
      "Application web full-stack de gestion associative avec Symfony 7 et PHP 8.4. Système multi-rôles (Admin, Teacher, User, PaymentManager), agendas récurrents avec gestion des jours fériés et vacances scolaires (RRule), calendrier interactif (Stimulus/Hotwire), carte géolocalisée (Leaflet/OSM), gestion des paiements, export CSV et envoi d'emails automatisés. 22 entités Doctrine, architecture orientée services.",
    tags: ["Symfony 7", "PHP 8.4", "Doctrine ORM", "RRule", "Leaflet", "PHPUnit", "Stimulus"],
    gradient: "from-blue-900/30 to-purple-900/30",
    icon: "🗓️",
    githubUrl: "https://github.com/Razdsgn",
  },
  {
    title: "Enchere — Système d'enchères",
    description:
      "Système d'enchères en ligne développé en full-stack. Interface utilisateur moderne avec logique métier Symfony, gestion des offres en temps réel, sécurité des accès et base de données optimisée. Architecture MVC robuste avec Doctrine et formulaires Symfony.",
    tags: ["Symfony", "PHP", "MySQL", "Doctrine", "Twig", "JavaScript"],
    gradient: "from-orange-900/30 to-red-900/30",
    icon: "🔨",
    githubUrl: "https://github.com/Razdsgn",
  },
  {
    title: "Symphony Peshpe — En développement",
    description:
      "Nouveau projet web en cours de développement. Conception de l'architecture applicative avec attention particulière à la qualité du code, structure des formulaires et couverture de tests PHPUnit.",
    tags: ["Symfony", "PHP", "PHPUnit", "Architecture", "TDD"],
    gradient: "from-green-900/30 to-teal-900/30",
    icon: "🚀",
    githubUrl: "https://github.com/Razdsgn",
  },
];

const experiences = [
  {
    period: "2025 — présent",
    title: "Développeur Web en formation",
    company: "ENI École Informatique — Alternance recherchée (oct. 2026)",
    description:
      "Développement full-stack d'applications web Symfony. Conception d'architectures orientées services, système multi-rôles, calendriers interactifs, cartes géolocalisées et intégration d'API. Fort accent sur la qualité du code et les tests PHPUnit.",
  },
  {
    period: "05/2024",
    title: "Testeur Logiciel — Stage",
    company: "Harmonic France",
    description:
      "Conception de plans de test, exécution de tests manuels et rédaction de rapports de test pour des logiciels industriels.",
  },
  {
    period: "11/2018 — 05/2022",
    title: "Chef de Projet International",
    company: "Astra Construction",
    description:
      "Coordination des équipes d'ingénierie, suivi de toutes les étapes projet, rapports financiers et respect des délais sur des projets internationaux.",
  },
  {
    period: "02/2013 — 10/2018",
    title: "Coordinateur de Projets",
    company: "Razvorot Design — Europe de l'Est",
    description:
      "Coordination de campagnes publicitaires, relation clients et gestion des commandes designers à travers l'Europe de l'Est.",
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

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={`relative rounded-2xl bg-gradient-to-br ${project.gradient} border border-zinc-800 p-8 md:p-12 overflow-hidden transition-all duration-500 group-hover:border-zinc-600`}>
        {/* Background glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-white/[0.02] rounded-2xl" />

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="text-5xl md:text-6xl flex-shrink-0">{project.icon}</div>
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-white transition-colors">{project.title}</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs bg-white/10 rounded-full border border-white/10">{tag}</span>
              ))}
            </div>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Github size={16} /> Voir sur GitHub <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  const roles = [
    "Développeur Web Full-Stack",
    "Développeur Symfony / PHP",
    "Ingénieur Back-end",
    "Passionné UI/UX & Architecture",
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ───────────── HERO ───────────── */}
      <motion.section
        style={{ opacity, scale }}
        className="min-h-screen flex items-center justify-center px-6 relative"
      >
        <div className="max-w-5xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-400 mb-6 text-xl tracking-wide"
          >
            <RotatingText items={roles} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight mb-6 leading-none"
          >
            Raman
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              Khaniakou
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-400 mb-4"
          >
            📍 Rennes, France
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="max-w-2xl mx-auto text-gray-300 mb-12 leading-relaxed text-lg"
          >
            Développeur web en formation à l'ENI Informatique. Je conçois des applications Symfony full-stack avec une attention particulière à l'architecture, à la qualité du code et à l'expérience utilisateur. Mon expérience antérieure comme chef de projet m'apporte rigueur, autonomie et sens des priorités.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <MagneticButton href="#work">
              Voir mes projets <ChevronRight size={20} />
            </MagneticButton>
            <MagneticButton href="mailto:rkhonyakov@gmail.com">
              Me contacter <Mail size={20} />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2"
          >
            <motion.div className="w-1 h-3 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ───────────── STATS ───────────── */}
      <section className="py-20 px-6 border-y border-zinc-800">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedStat end={22} label="Entités Doctrine" suffix="" />
          <AnimatedStat end={3} label="Projets full-stack" suffix="+" />
          <AnimatedStat end={4} label="Langues maîtrisées" suffix="" />
          <AnimatedStat end={10} label="Ans d'expérience pro" suffix="+" />
        </div>
      </section>

      {/* ───────────── PROJECTS ───────────── */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3">Projets</h2>
            <p className="text-xl text-gray-400">Réalisations sélectionnées</p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── SKILLS ───────────── */}
      <section id="skills" className="py-24 px-6 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3">Compétences</h2>
            <p className="text-xl text-gray-400">Stack technique</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5 text-white/80">
                  {cat.icon}
                  <span className="font-semibold">{cat.label}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="text-sm text-gray-400">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── ABOUT / EXPERIENCE ───────────── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16"
          >
            Parcours
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-8 text-gray-200">Expérience</h3>
              <div className="relative border-l border-zinc-800 pl-6 space-y-10">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="relative"
                  >
                    <span className="absolute -left-[1.6rem] top-1 w-3 h-3 rounded-full bg-zinc-700 border-2 border-zinc-500" />
                    <div className="text-xs text-gray-500 mb-1">{exp.period}</div>
                    <h4 className="text-lg font-bold mb-1">{exp.title}</h4>
                    <div className="text-sm text-gray-400 mb-2">{exp.company}</div>
                    <p className="text-sm text-gray-500 leading-relaxed">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education + Languages */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-8 text-gray-200">Formation</h3>
              <div className="relative border-l border-zinc-800 pl-6 space-y-8 mb-14">
                {educations.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="relative"
                  >
                    <span className="absolute -left-[1.6rem] top-1 w-3 h-3 rounded-full bg-zinc-700 border-2 border-zinc-500" />
                    <div className="text-xs text-gray-500 mb-1">{edu.period}</div>
                    <h4 className="text-lg font-bold mb-1">{edu.title}</h4>
                    <div className="text-sm text-gray-400">{edu.school}</div>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-2xl font-bold mb-6 text-gray-200">Langues</h3>
              <div className="space-y-4">
                {[
                  { lang: "Russe", level: "Natif", pct: 100 },
                  { lang: "Biélorusse", level: "Natif", pct: 100 },
                  { lang: "Anglais", level: "Avancé", pct: 80 },
                  { lang: "Français", level: "Intermédiaire", pct: 60 },
                ].map(({ lang, level, pct }) => (
                  <div key={lang}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{lang}</span>
                      <span className="text-gray-400">{level}</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── CONTACT ───────────── */}
      <section id="contact" className="py-24 px-6 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Construisons quelque<br />
              chose ensemble.
            </h2>
            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              Je recherche une alternance en développement web (BAC+3) à partir d'octobre 2026. N'hésitez pas à me contacter !
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: <Mail className="w-6 h-6" />, label: "Email", value: "rkhonyakov@gmail.com", href: "mailto:rkhonyakov@gmail.com" },
              { icon: <Phone className="w-6 h-6" />, label: "Téléphone", value: "07 63 24 37 44", href: "tel:+33763243744" },
              { icon: <MapPin className="w-6 h-6" />, label: "Localisation", value: "Rennes, France", href: null },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h4 className="font-bold mb-2">{item.label}</h4>
                {item.href ? (
                  <a href={item.href} className="text-gray-400 hover:text-white transition-colors">{item.value}</a>
                ) : (
                  <p className="text-gray-400">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center gap-8"
          >
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/romankh", icon: <Linkedin size={18} /> },
              { label: "GitHub", href: "https://github.com/romankh", icon: <Github size={18} /> },
            ].map((social, idx) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                {social.icon} {social.label} ↗
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────────── FOOTER ───────────── */}
      <footer className="py-8 px-6 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2026 Raman Khaniakou. Tous droits réservés.</p>
          <p>Développeur Web Full-Stack · Rennes, France</p>
        </div>
      </footer>
    </main>
  );
}
