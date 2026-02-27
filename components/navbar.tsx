"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "Award", href: "#awards" },
    { label: "Education", href: "#education" },
    { label: "Skill", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-xl shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          {/* Logo - Simple Text */}
          <Link
            href="/"
            className="text-base font-bold tracking-wide hover:opacity-70 transition-opacity duration-300"
          >
            YOUR NAME
          </Link>

          {/* Desktop Navigation - Center */}
          <ul className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[13px] text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Email Link - Right Side Desktop */}
          <a
            href="mailto:your@email.com"
            className="hidden lg:block text-[13px] text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide"
          >
            Get in Touch
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-6 h-6 flex flex-col justify-center items-center group"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[1px]" : "mb-1"
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[1px]" : ""
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            {/* Menu Content */}
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
                        className="text-3xl md:text-4xl font-light text-white/70 hover:text-white transition-colors duration-300 tracking-wide block"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Email Link Mobile */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-16"
                >
                  <a
                    href="mailto:your@email.com"
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
                  >
                    your@email.com
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
