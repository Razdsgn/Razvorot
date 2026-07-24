"use client";

// app/page.tsx
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Вращающиеся роли для hero
const roles = [
  "Développeur Web Full-Stack Symfony",
  "Architecte de bases de données MySQL",
  "UI/UX-driven developer",
  "Coordinateur de projets internationaux",
];

// Твои ключевые проекты (карточки портфолио)
const projects = [
  {
    slug: "kvas-et-cidre",
    title: "Kvas & Cidre — Plateforme associative full-stack",
    description:
      "Application Symfony 7 pour une association culturelle : gestion des membres, événements, paiements, calendrier, cartographie Leaflet et règles de récurrence RRule. Focalisation sur l’architecture (22 entités Doctrine), la lisibilité du code et l’UX des écrans métier.",
    images: [
      "/projects/kvas-1.webp",
      "/projects/kvas-2.webp",
      "/projects/kvas-3.webp",
    ],
    liveUrl: "",
    behanceUrl: "",
    awards: [
      {
        name: "Architecture",
        awards: [
          "22 entités Doctrine",
          "Services clairs pour la logique métier",
        ],
        href: "",
      },
      {
        name: "UX / UI",
        awards: ["Interfaces Twig lisibles", "Formulaires métier structurés"],
        href: "",
      },
    ],
  },
  {
    slug: "enchere",
    title: "Enchere — Plateforme d’enchères en ligne",
    description:
      "Application d’enchères développée avec Symfony : création de lots, gestion des enchères, sécurisation des accès et interface utilisateur fluide. Travail sur la logique métier, la robustesse et la clarté du front Twig.",
    images: [
      "/projects/enchere-1.webp",
      "/projects/enchere-2.webp",
      "/projects/enchere-3.webp",
    ],
    liveUrl: "",
    behanceUrl: "",
    awards: [
      {
        name: "Logique métier",
        awards: ["Cycle complet de vie du lot", "Gestion des enchères"],
        href: "",
      },
      {
        name: "Performance",
        awards: ["Requêtes optimisées", "UX réactive"],
        href: "",
      },
    ],
  },
  {
    slug: "symphony-peshpe",
    title: "Symphony Peshpe — Projet orienté TDD",
    description:
      "Projet Symfony centré sur le Test-Driven Development (PHPUnit) : écriture des tests avant le code, architecture en services, refactoring progressif et documentation. Mise en avant de la qualité, de la robustesse et de la maintenance du code.",
    images: [
      "/projects/peshpe-1.webp",
      "/projects/peshpe-2.webp",
      "/projects/peshpe-3.webp",
    ],
    liveUrl: "",
    behanceUrl: "",
    awards: [
      {
        name: "Qualité",
        awards: ["Tests PHPUnit systématiques", "Architecture modulaire"],
        href: "",
      },
    ],
  },
];

// Навыки — твой реальный стек
const skills = {
  soft: [
    "Coordination de projets internationaux",
    "Communication multi-langue",
    "UX / UI thinking",
    "Rigueur de débogage",
    "Architecture orientée services",
    "Vision produit",
  ],
  hard: [
    "Symfony 7",
    "PHP 8.4",
    "Doctrine ORM",
    "MySQL 8",
    "Leaflet / OpenStreetMap",
    "FullCalendar / iCalendar / RRule",
    "Twig",
    "Stimulus",
    "JavaScript / TypeScript",
    "Angular",
    "Git / GitHub",
    "Docker",
    "PHPUnit",
    "HTML / CSS / Tailwind",
  ],
};

function SectionWrapper({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-4 py-16"
    >
      {children}
    </motion.section>
  );
}

export default function HomePage() {
  return (
    <main className="bg-[#050507] text-white min-h-screen">
      {/* HERO — const développeur + вращающиеся роли */}
      <SectionWrapper id="hero">
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
                const développeur = {"{"}
              </p>

              <div className="space-y-2 text-sm md:text-base text-zinc-300">
                <p>
                  01 stack: [
                  <span className="text-zinc-100">
                    Symfony 7, PHP 8.4, Doctrine, Leaflet, FullCalendar, PHPUnit
                  </span>
                  ]
                </p>
                <p>
                  02 origine:
                  <span className="text-zinc-100">
                    {" "}
                    design & coordination de projets internationaux
                  </span>
                </p>
                <p>
                  03 localisation:
                  <span className="text-zinc-100"> Rennes, France</span>
                </p>
                <p>
                  04 langues:
                  <span className="text-zinc-100">
                    {" "}
                    russe, biélorusse, anglais, français
                  </span>
                </p>
                <p>
                  05 recherche:
                  <span className="text-zinc-100">
                    {" "}
                    alternance développeur web / full-stack Symfony
                  </span>
                </p>
                <p>{"}"}</p>
              </div>
            </div>

            <div className="space-y-4 md:text-right">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                Raman Khaniakou
              </h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-sm md:text-base text-zinc-300"
              >
                <RotatingRoles />
              </motion.div>

              <p className="text-xs md:text-sm text-zinc-400 mt-4">
                Ancien coordinateur de projets et designer, aujourd&apos;hui
                développeur web full-stack qui pense autant à l&apos;architecture
                qu&apos;à l&apos;expérience utilisateur.
              </p>

              <div className="flex md:justify-end gap-3 mt-6">
                {/* Магнитные кнопки можно доработать позже отдельным компонентом */}
                <button className="group relative px-4 py-2 border border-zinc-700 rounded-full text-xs md:text-sm overflow-hidden">
                  <span className="relative z-10">voir_projets()</span>
                  <span className="absolute inset-0 bg-zinc-100/10 group-hover:bg-zinc-100/20 transition" />
                </button>
                <button className="group relative px-4 py-2 border border-zinc-700 rounded-full text-xs md:text-sm overflow-hidden">
                  <span className="relative z-10">me_contacter()</span>
                  <span className="absolute inset-0 bg-zinc-100/10 group-hover:bg-zinc-100/20 transition" />
                </button>
              </div>
            </div>
          </div>

          {/* Небольшая "dev-console" строка */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs md:text-sm text-zinc-400 font-mono border-t border-zinc-800 pt-4"
          >
            {"> hire(raman, { from: 'octobre 2026', location: ['Rennes', 'remote'], role: 'Développeur Web Full-Stack Symfony' });"}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* STATISTICS — можно адаптировать под твои цифры */}
      <SectionWrapper id="stats">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border border-zinc-800 rounded-2xl p-6 md:p-8 bg-zinc-900/30">
          <StatCard end={22} label="Entités Doctrine" suffix="+" />
          <StatCard end={3} label="Projets Symfony majeurs" suffix="" />
          <StatCard end={5} label="Années coordination" suffix="+" />
          <StatCard end={4} label="Langues de travail" suffix="" />
        </div>
      </SectionWrapper>

      {/* ABOUT / PARCOURS */}
      <SectionWrapper id="about">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">Parcours</h2>
            <div className="space-y-3 text-sm md:text-base text-zinc-300">
              <TimelineItem
                year="2025 — présent"
                title="Développeur Web en formation"
                place="ENI École Informatique, Rennes"
                desc="Formation Développeur Web & Web Mobile (BAC+3), projets Symfony full-stack, base de données, front et tests."
              />
              <TimelineItem
                year="2024 — 2025"
                title="Testeur Logiciel — Stage"
                place="Harmonic France"
                desc="Tests de qualité sur solutions broadcast, documentation et remontée structurée des anomalies."
              />
              <TimelineItem
                year="2018 — 2022"
                title="Chef de Projet International"
                place="Astra Construction"
                desc="Coordination de projets de construction, gestion d’équipes et communication avec des clients internationaux."
              />
              <TimelineItem
                year="2013 — 2018"
                title="Coordinateur de Projets"
                place="Razvorot Design"
                desc="Suivi de projets de design, relation clients, organisation du travail créatif."
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">Formation & Langues</h2>
            <div className="space-y-3 text-sm md:text-base text-zinc-300">
              <TimelineItem
                year="2025 — présent"
                title="Développeur Web & Web Mobile"
                place="ENI École Informatique"
                desc="Approche full-stack avec Symfony, bases de données, JavaScript et bonnes pratiques de développement."
              />
              <TimelineItem
                year="2024 — 2025"
                title="Tremplin Numérique"
                place="Formation intensive"
                desc="Immersion dans les métiers du numérique, bases solides en développement et outils modernes."
              />
              <TimelineItem
                year="2008 — 2013"
                title="Études techniques"
                place="Université Technique de Biélorussie"
                desc="Fondations techniques, logique, maths appliquées et gestion de projets."
              />
              <div className="border-t border-zinc-800 pt-3">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-2">
                  langues
                </p>
                <p>russe, biélorusse (natif), anglais (avancé), français (intermédiaire)</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* PROJETS — Work Portfolio */}
      <SectionWrapper id="projects">
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold">Projets Symfony</h2>
          <p className="text-sm md:text-base text-zinc-300">
            Quelques projets qui montrent comment je pense architecture, base de données,
            UX et logique métier dans des applications réelles.
          </p>

          <div className="space-y-10">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* COMPÉTENCES — Skills */}
      <SectionWrapper id="skills">
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold">Compétences</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-3">
                soft skills
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((s) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-3 py-1 rounded-full bg-zinc-900/40 border border-zinc-700 text-xs text-zinc-200"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-3">
                hard skills & outils
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.hard.map((s) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-3 py-1 rounded-full bg-zinc-900/40 border border-zinc-700 text-xs text-zinc-200"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CONTACT */}
      <SectionWrapper id="contact">
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold">Contact</h2>
          <p className="text-sm md:text-base text-zinc-300">
            Disponible pour une alternance en développement web / full-stack Symfony à partir d&apos;octobre 2026,
            à Rennes ou en télétravail.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-sm md:text-base text-zinc-300">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                email
              </p>
              <p>rkhonyakov@gmail.com</p>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mt-4">
                localisation
              </p>
              <p>Rennes, France</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                réseaux
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/Razdsgn"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-200 hover:text-white underline-offset-4 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-200 hover:text-white underline-offset-4 hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto px-4 py-8 text-xs text-zinc-500 border-t border-zinc-900 mt-8">
        <p>© {new Date().getFullYear()} Raman Khaniakou — Développeur Web Full-Stack Symfony.</p>
      </footer>
    </main>
  );
}

// ===== Дополнительные компоненты =====

function RotatingRoles() {
  // Простая версия: можно позже заменить на реальную анимацию фраз
  return (
    <span className="inline-flex flex-wrap gap-x-2">
      {roles.map((role, index) => (
        <span key={role} className="text-zinc-100">
          {role}
          {index < roles.length - 1 ? " /" : ""}
        </span>
      ))}
    </span>
  );
}

function StatCard({
  end,
  label,
  suffix,
}: {
  end: number;
  label: string;
  suffix: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-2xl md:text-3xl font-semibold">
        {end}
        {suffix}
      </p>
      <p className="text-xs md:text-sm text-zinc-400">{label}</p>
    </div>
  );
}

function TimelineItem({
  year,
  title,
  place,
  desc,
}: {
  year: string;
  title: string;
  place: string;
  desc: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-zinc-400">{year}</p>
      <p className="text-sm md:text-base font-medium">{title}</p>
      <p className="text-xs md:text-sm text-zinc-500">{place}</p>
      <p className="text-xs md:text-sm text-zinc-300">{desc}</p>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="border border-zinc-800 rounded-2xl p-5 md:p-6 bg-zinc-900/30"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="md:w-2/5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-900">
            {/* Здесь можно подключить Image с каруселью; пока просто первый скрин */}
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:w-3/5 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-semibold">{project.title}</h3>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              {project.slug}
            </p>
            <p className="text-sm md:text-base text-zinc-300">
              {project.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm text-zinc-300">
            {project.awards.map((award) => (
              <div key={award.name} className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                  {award.name}
                </p>
                <ul className="space-y-1">
                  {award.awards.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs md:text-sm text-zinc-200 hover:text-white underline-offset-4 hover:underline"
              >
                Voir le projet
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
