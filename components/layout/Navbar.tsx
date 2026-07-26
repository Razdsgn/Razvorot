"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Пункты меню привязаны к реальным id секций в app/page.tsx.
// Префикс — это не декоративная нумерация, а адрес перехода,
// как номер строки в файле: реальная смысловая связь с код-регистром.
const navItems = [
  { index: "01", label: "Parcours", href: "#about" },
  { index: "02", label: "Projets", href: "#work" },
  { index: "03", label: "Compétences", href: "#skills" },
  { index: "04", label: "Contact", href: "#contact" },
];

const CONTACT_EMAIL = "rkhonyakov@gmail.com";

const Navbar = memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink/95 backdrop-blur-xl border-b border-ink-line shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-baseline gap-1 text-lg tracking-tight hover:opacity-70 transition-opacity duration-300"
          >
            <span className="font-display italic">Raman</span>
            <span className="font-mono text-sm text-cobalt-soft">.dev</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group flex items-baseline gap-2 text-[13px] text-paper/70 hover:text-paper transition-colors duration-300 font-light tracking-wide"
                >
                  <span className="font-mono text-[11px] text-mist group-hover:text-cobalt-soft transition-colors">
                    {item.index}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hidden lg:block font-mono text-[13px] text-paper/70 hover:text-cobalt-soft transition-colors duration-300 tracking-wide"
          >
            dispo_oct_2026
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-6 h-6 flex flex-col justify-center items-center group"
            aria-label="Ouvrir le menu"
            aria-expanded={isOpen}
          >
            <span
              className={`w-6 h-[2px] bg-paper transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[1px]" : "mb-1"
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-paper transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[1px]" : ""
              }`}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-ink/95 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <nav className="text-center">
                <ul className="space-y-8">
                  {navItems.map((item, idx) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-baseline justify-center gap-3 text-3xl md:text-4xl font-light text-paper/70 hover:text-paper transition-colors duration-300 tracking-wide"
                      >
                        <span className="font-mono text-base text-mist">{item.index}</span>
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-16"
                >
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    onClick={() => setIsOpen(false)}
                    className="font-mono text-sm text-mist hover:text-cobalt-soft transition-colors duration-300 tracking-wide"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
