"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ExternalLink, Award, Mail, Phone, MapPin } from "lucide-react";

// Custom hook for intersection observer
function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isInView] as const;
}

// Rotating text component
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

// Magnetic button component
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
    >
      {children}
    </motion.a>
  );
}

// Project card with expandable gallery
function ProjectCard({ project }: { project: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="group relative"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-900">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-full"
        >
          <Image
            src={project.images[currentImage]}
            alt={project.title}
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Image navigation */}
        {project.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {project.images.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImage ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>

        <div className="flex gap-4 mb-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white hover:text-gray-300 flex items-center gap-1"
            >
              Visit Live <ExternalLink size={14} />
            </a>
          )}
          {project.behanceUrl && (
            <a
              href={project.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white hover:text-gray-300 flex items-center gap-1"
            >
              Learn More <ChevronRight size={14} />
            </a>
          )}
        </div>

        {/* Awards section */}
        {project.awards && project.awards.length > 0 && (
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-gray-400 hover:text-white flex items-center gap-2 mb-2"
            >
              <Award size={16} />
              Awards {isExpanded ? "↑" : "↓"}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  {project.awards.map((award: any, idx: number) => (
                    <div key={idx} className="mb-3 pl-6 border-l-2 border-zinc-800">
                      <a
                        href={award.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-white hover:text-gray-300"
                      >
                        {award.name}
                      </a>
                      <ul className="text-sm text-gray-500 mt-1">
                        {award.awards.map((a: string, i: number) => (
                          <li key={i}>• {a}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Animated statistic
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
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-bold mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Sample data - replace with your actual data
  const roles = [
    "Creative Art Director",
    "Creative Designer",
    "Visual Designer",
    "UI/UX Designer",
  ];

  const projects = [
    {
      slug: "dopegood",
      title: "Dopegood",
      description: "Brand Identity, logo design, E-commerce website & mobile UI/UX, and custom web 3D design for a modern furniture brand.",
      images: [
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
      ],
      liveUrl: "https://dopegood.com",
      behanceUrl: "https://www.behance.net/gallery/164138733/Dopegood",
      awards: [
        {
          name: "Awwwards",
          awards: ["Site of the Day", "Developer Award", "Honorable Mention"],
          href: "https://www.awwwards.com",
        },
        {
          name: "CSS Design Awards",
          awards: ["UI Design", "UX Design", "Innovation"],
          href: "https://www.cssdesignawards.com",
        },
      ],
    },
    {
      slug: "am-arc",
      title: "AM-ARC",
      description: "Brand Identity, logo design, website & mobile UI/UX with custom 3D visualizations for an architectural studio.",
      images: [
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80",
      ],
      liveUrl: "https://am-arc.com",
      behanceUrl: "https://www.behance.net/gallery/149464731/AM-ARC",
      awards: [
        {
          name: "CSS Design Awards",
          awards: ["UI Design", "UX Design", "Innovation"],
          href: "https://www.cssdesignawards.com",
        },
      ],
    },
    {
      slug: "vimcosmo",
      title: "Vimcosmo",
      description: "E-commerce website & mobile app UI/UX and art direction for a modern beauty and cosmetics brand.",
      images: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
      ],
      liveUrl: "https://vimcosmo.com",
      behanceUrl: "https://www.behance.net/gallery/150352223/Vimcosmo",
    },
  ];

  const awards = [
    {
      title: "Awwwards - Site of the Day",
      project: "Dopegood.com",
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "CSS Design Awards - WOTD",
      project: "Deveb.co",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Awwwards - Developer Award",
      project: "Dopegood.com",
      image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const skills = {
    soft: [
      "Art Direction",
      "Leadership",
      "Visual Design",
      "Web UI/UX Design",
      "Product Design",
      "Digital Design",
      "Branding",
      "Web Animation",
      "Mentoring",
      "3D Design",
      "User Interaction",
      "Photography & Edit",
    ],
    hard: [
      "Figma",
      "Framer",
      "Adobe XD",
      "Spline",
      "Lightroom",
      "Photoshop",
      "3Ds Max",
      "Lumion",
      "Illustrator",
      "V-Ray",
    ],
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="min-h-screen flex items-center justify-center px-6 relative"
      >
        <div className="max-w-7xl w-full">
          {/* Rotating roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-400 mb-8 text-center"
          >
            <RotatingText items={roles} />
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-center mb-8"
          >
            YOUR NAME
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-400 text-center mb-4"
          >
            Based in Your Location
          </motion.p>

          {/* Profile images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-4 mb-12"
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden"
              >
                <Image
                  src={`https://images.unsplash.com/photo-150720721716${i}-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80`}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-3xl mx-auto text-center text-gray-300 mb-12 leading-relaxed"
          >
            Winner of the world's most prestigious web design awards in the fields of UI, UX, and
            innovation. With a diverse background in art direction, design leadership, website and app
            UI/UX design, 3D design, and branding, I bring a well-rounded skill set to every project I
            take on.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <MagneticButton href="#work">
              View Selected Work <ChevronRight size={20} />
            </MagneticButton>
            <MagneticButton href="/cv.pdf">
              View CV <ExternalLink size={20} />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
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

      {/* Stats Section */}
      <section className="py-24 px-6 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedStat end={27} label="Awards Won" suffix="+" />
          <AnimatedStat end={40} label="Projects Completed" suffix="+" />
          <AnimatedStat end={5} label="Years Experience" suffix="+" />
          <AnimatedStat end={100} label="Client Satisfaction" suffix="%" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16"
          >
            About
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-8">Experience</h3>

              <div className="space-y-8">
                <div>
                  <div className="text-sm text-gray-400 mb-2">2020 - Present</div>
                  <h4 className="text-xl font-bold mb-2">Creative Art Director</h4>
                  <div className="text-gray-400 mb-4">Deveb Digital Agency</div>
                  <p className="text-gray-300">
                    As the sole creative art director and designer at Deveb for +3 years, I have designed
                    and developed all the visual assets, including website and mobile UI/UX designs, web
                    animations mockups, and brandings. My skills led to Deveb winning +27 international
                    design awards.
                  </p>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-2">2018 - 2020</div>
                  <h4 className="text-xl font-bold mb-2">Freelance Designer</h4>
                  <div className="text-gray-400 mb-4">Upwork</div>
                  <p className="text-gray-300">
                    Maintained 100% job success rate on Upwork, delivering exceptional designs and solutions
                    for 40+ projects. Developed highly effective brand identities and strategies for startups
                    and small businesses based on market research and client feedback.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-8">Education</h3>

              <div className="space-y-8">
                <div>
                  <div className="text-sm text-gray-400 mb-2">2018 - 2020</div>
                  <h4 className="text-xl font-bold mb-2">Master of Design</h4>
                  <div className="text-gray-400">Azad University Of Mashhad</div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-2">2015 - 2018</div>
                  <h4 className="text-xl font-bold mb-2">Bachelor of Design</h4>
                  <div className="text-gray-400">Azad University Of Mashhad</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
            <p className="text-xl text-gray-400">Portfolio</p>
          </motion.div>

          <div className="grid gap-24">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Recognition</h2>
            <p className="text-xl text-gray-400">Honors & Awards</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-bold mb-1">{award.title}</h4>
                <p className="text-gray-400 text-sm">{award.project}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Expertise</h2>
            <p className="text-xl text-gray-400">Skills & Tools</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Soft Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.soft.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-zinc-900 rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Hard Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.hard.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-zinc-900 rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Let's create something <br />
              award‑winning.
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              I collaborate with teams and brands who care deeply about the craft of digital experiences
              — from early-stage concepts to fully-realized products and campaigns.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="font-bold mb-2">Email</h4>
              <a href="mailto:your@email.com" className="text-gray-400 hover:text-white">
                your@email.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h4 className="font-bold mb-2">Phone</h4>
              <a href="tel:+11234567890" className="text-gray-400 hover:text-white">
                +1 (123) 456-7890
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-bold mb-2">Location</h4>
              <p className="text-gray-400">Based in Your City</p>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center gap-6"
          >
            {["LinkedIn", "Behance", "Dribbble", "Instagram", "Twitter"].map((social, idx) => (
              <motion.a
                key={social}
                href={`https://${social.toLowerCase()}.com`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {social} ↗
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2026 Your Name. All rights reserved.</p>
          <p className="mt-2">Designed for a premium, award-level digital presence.</p>
        </div>
      </footer>
    </main>
  );
}
