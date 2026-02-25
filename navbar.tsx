"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight hover:text-gray-300 transition-colors"
          >
            YOUR NAME
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <a
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            href="mailto:your@email.com"
            className="hidden lg:block px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
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
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-black border-l border-white/10 p-8"
            >
              <div className="flex flex-col h-full">
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="self-end w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors mb-12"
                >
                  <X size={20} />
                </button>

                {/* Navigation Items */}
                <nav className="flex-1">
                  <ul className="space-y-6">
                    {navItems.map((item, idx) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <a
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="text-2xl font-bold hover:text-gray-400 transition-colors block"
                        >
                          {item.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* CTA */}
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  href="mailto:your@email.com"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 bg-white text-black rounded-full text-center font-medium hover:bg-gray-100 transition-colors"
                >
                  Get in Touch
                </motion.a>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-6 mt-8 text-sm text-gray-400"
                >
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Behance
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
