"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import Magnetic from "@/components/ui/Magnetic";
import { githubUrl, projects, type Project } from "@/lib/content";

const COVER_GRADIENTS = [
  "linear-gradient(135deg, #141414 0%, #3a3a3a 60%, #d7ff3f 130%)",
  "linear-gradient(135deg, #1c1c1c 0%, #4b4b4b 100%)",
  "linear-gradient(135deg, #d7ff3f 0%, #141414 90%)",
];

const SIZE_SPAN: Record<Project["size"], string> = {
  lg: "md:col-span-12",
  md: "md:col-span-7",
  sm: "md:col-span-5",
};

const SIZE_ASPECT: Record<Project["size"], string> = {
  lg: "aspect-[16/9] md:aspect-[21/9]",
  md: "aspect-[4/3]",
  sm: "aspect-[4/3]",
};

function ProjectCover({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      style={{ background: COVER_GRADIENTS[index % COVER_GRADIENTS.length] }}
    >
      <span className="font-heading text-[22vw] font-bold leading-none text-background/10 md:text-[9vw]">
        {project.title.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Voir"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
      className={`group relative col-span-1 block ${SIZE_SPAN[project.size]}`}
    >
      <div
        className={`relative overflow-hidden rounded-[28px] bg-surface ${SIZE_ASPECT[project.size]}`}
      >
        <ProjectCover project={project} index={index} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
          <div className="flex items-start justify-between">
            <span className="font-heading text-sm text-white/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex h-11 w-11 -translate-y-2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={18} />
            </span>
          </div>
          <div>
            <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1 font-sans text-sm text-white/75">{project.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <p className="max-w-lg font-sans text-lg leading-snug text-ink">{project.caption}</p>
        <div className="flex flex-wrap gap-2 md:justify-end md:max-w-xs">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="work" className="bg-surface px-[5%] py-24 md:py-32">
      <div className="mx-auto max-w-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Projets</p>
            <h2 className="font-heading text-display text-ink">
              <RevealText as="span" className="block">
                Réalisations
              </RevealText>
              <RevealText as="span" className="block" delay={0.1}>
                sélectionnées.
              </RevealText>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl font-sans text-lg leading-relaxed text-muted"
            >
              De la coordination de projets et du design à l&apos;architecture Symfony
              full-stack — voici une sélection de mes réalisations récentes.
            </motion.p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Magnetic>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor=""
              className="btn-outline inline-flex items-center gap-2"
            >
              Voir tout sur GitHub <Github size={16} />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
