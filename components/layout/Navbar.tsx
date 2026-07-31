"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Parcours", href: "#about" },
  { label: "Projets", href: "#work" },
  { label: "Compétences", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const CONTACT_EMAIL = "rkhonyakov@gmail.com";

function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 2L18.5 13.5L30 16L18.5 18.5L16 30L13.5 18.5L2 16L13.5 13.5L16 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

const Navbar = memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-header shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[100px] max-w-[1400px] items-center justify-between px-[2%] md:px-[2%]">
          <Link
            href="/"
            className="flex items-center text-foreground transition-opacity hover:opacity-70"
            aria-label="Accueil"
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-foreground transition-opacity hover:opacity-60"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary !py-4 !px-[45px]">
              Me contacter
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-6 w-6 flex-col items-center justify-center lg:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={isOpen}
          >
            <span
              className={`h-[2px] w-6 bg-foreground transition-all duration-300 ${
                isOpen ? "translate-y-[1px] rotate-45" : "mb-1.5"
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-foreground transition-all duration-300 ${
                isOpen ? "-translate-y-[1px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <ul className="space-y-8 text-center">
                {navItems.map((item, idx) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + idx * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="font-heading text-4xl text-foreground"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-8"
                >
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    onClick={() => setIsOpen(false)}
                    className="btn-primary"
                  >
                    Me contacter
                  </a>
                </motion.li>
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
