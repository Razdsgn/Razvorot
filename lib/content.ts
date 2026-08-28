/**
 * All editable site copy lives here — one file to update name, bio,
 * projects, experience and contact details without touching component
 * code. See README-CONTENT.md for a guided tour.
 */

export const contactEmail = "rkhonyakov@gmail.com";
export const contactPhone = "07 63 24 37 44";
export const contactPhoneHref = "tel:+33763243744";
export const contactLocation = "Rennes, France";
export const githubUrl = "https://github.com/Razdsgn";
export const linkedinUrl = "https://www.linkedin.com/in/romankh/";

export const navItems = [
  { label: "Expertise", href: "#services" },
  { label: "Projets", href: "#work" },
  { label: "Parcours", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const roles = [
  "Développeur Web Full-Stack",
  "Développeur Symfony / PHP",
  "Ingénieur Back-end",
  "Ex-designer & chef de projet",
];

export const techStack = [
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

export interface Service {
  index: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export const services: Service[] = [
  {
    index: "01",
    title: "Développement Back-End",
    description:
      "Je construis des architectures Symfony orientées services, sécurisées et testées, avec Doctrine ORM et une base de données pensée pour durer.",
    tags: ["PHP 8.4", "Symfony 7", "Doctrine ORM", "MySQL"],
    href: "#work",
  },
  {
    index: "02",
    title: "Développement Front-End",
    description:
      "J'implémente des interfaces réactives et accessibles avec Twig, Stimulus et TypeScript, connectées à des API robustes.",
    tags: ["TypeScript", "JavaScript", "Twig", "Stimulus"],
    href: "#work",
  },
  {
    index: "03",
    title: "Architecture & Qualité",
    description:
      "Je structure le code en couches claires, j'écris des tests PHPUnit et je documente les choix techniques pour un projet maintenable.",
    tags: ["PHPUnit", "MVC", "Architecture", "Git"],
    href: "#work",
  },
  {
    index: "04",
    title: "Design & Direction Créative",
    description:
      "Mon passé de designer et chef de projet m'aide à cadrer les besoins, prototyper sur Figma et garder une UX cohérente du premier croquis au code.",
    tags: ["Figma", "UX / UI", "Prototypage"],
    href: "#about",
  },
  {
    index: "05",
    title: "Outils & DevOps",
    description:
      "Je conteneurise, versionne et automatise pour livrer un environnement de développement fiable, reproductible et facile à reprendre en équipe.",
    tags: ["Docker", "Git / GitHub", "CI"],
    href: "#work",
  },
];

export interface Project {
  title: string;
  caption: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string | null;
  href: string;
  size: "lg" | "md" | "sm";
}

export const projects: Project[] = [
  {
    title: "Kvas & Cidre",
    caption:
      "Une plateforme associative où planification, cartographie et paiements deviennent simples.",
    subtitle: "Gestion associative full-stack",
    description:
      "Application Symfony 7 / PHP 8.4 avec système multi-rôles, agendas récurrents RRule, calendrier interactif Stimulus/Hotwire, carte Leaflet/OSM, paiements, export CSV et emails automatisés.",
    tags: ["Symfony 7", "PHP 8.4", "Doctrine ORM", "RRule", "Leaflet"],
    image: "/screenshots/hiking-club.png",
    href: githubUrl,
    size: "lg",
  },
  {
    title: "Enchère",
    caption:
      "Moderniser la façon dont les vendeurs locaux gèrent leurs ventes aux enchères en ligne.",
    subtitle: "Système d'enchères en ligne",
    description:
      "Plateforme d'enchères full-stack avec logique métier Symfony, sécurité des accès, base MySQL optimisée et interface Twig moderne.",
    tags: ["Symfony", "PHP", "MySQL", "Twig"],
    image: null,
    href: githubUrl,
    size: "md",
  },
  {
    title: "Symphony Peshpe",
    caption: "Poser des bases Symfony solides, testées et prêtes à évoluer.",
    subtitle: "Projet en cours de développement",
    description:
      "Nouveau projet web en cours avec attention portée à la structure applicative, la qualité du code, les tests PHPUnit et une base solide.",
    tags: ["Symfony", "PHP", "PHPUnit", "TDD"],
    image: null,
    href: githubUrl,
    size: "sm",
  },
];

export const stats = [
  { end: 10, suffix: "+", label: "Années d'expérience professionnelle" },
  { end: 3, suffix: "+", label: "Projets full-stack livrés" },
  { end: 22, suffix: "", label: "Entités Doctrine modélisées" },
  { end: 4, suffix: "", label: "Langues parlées" },
];

export const whyPoints = [
  "Formation Développeur Web et Web Mobile (BAC+3) à l'ENI",
  "Double compétence rare : gestion de projet + développement",
  "Autonome sur tout le cycle — conception, code, tests",
  "Disponible pour une alternance dès octobre 2026",
  "Basé à Rennes, ouvert à la mobilité",
];

export interface Experience {
  step: string;
  period: string;
  title: string;
  company: string;
  description: string;
}

export const experiences: Experience[] = [
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

export const educations = [
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

export const languages = [
  { lang: "Russe", level: "Natif", pct: 100 },
  { lang: "Biélorusse", level: "Natif", pct: 100 },
  { lang: "Anglais", level: "Avancé", pct: 80 },
  { lang: "Français", level: "Intermédiaire", pct: 60 },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Es-tu disponible pour une alternance ?",
    answer:
      "Oui. Je termine ma formation de Développeur Web et Web Mobile à l'ENI et je recherche une alternance à partir d'octobre 2026, idéalement en développement Symfony / PHP.",
  },
  {
    question: "Quelles technologies maîtrises-tu ?",
    answer:
      "Je travaille principalement avec PHP 8.4, Symfony 7 et Doctrine ORM côté back-end, et TypeScript, Twig et Stimulus côté front-end. J'utilise aussi Docker, Git et PHPUnit au quotidien.",
  },
  {
    question: "Peux-tu travailler en équipe et gérer un projet ?",
    answer:
      "Oui — j'ai coordonné des équipes et des campagnes pendant plus de dix ans avant de me reconvertir. Je sais cadrer un besoin, suivre un planning et communiquer avec des clients comme avec des développeurs.",
  },
  {
    question: "Es-tu mobile géographiquement ?",
    answer:
      "Je suis basé à Rennes et ouvert à une mobilité raisonnable en Bretagne, ainsi qu'au remote partiel selon les missions.",
  },
  {
    question: "As-tu déjà livré des projets réels ?",
    answer:
      "Oui, plusieurs projets full-stack sont présentés dans la section Projets, dont une plateforme associative complète avec paiements, calendrier interactif et cartographie.",
  },
  {
    question: "Comment te contacter ?",
    answer:
      "Le plus simple est par email à rkhonyakov@gmail.com ou via le formulaire de contact ci-dessous — je réponds rapidement.",
  },
];
