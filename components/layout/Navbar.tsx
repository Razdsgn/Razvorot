"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import {
  contactEmail,
  contactLocation,
  contactPhone,
  contactPhoneHref,
  navItems,
} from "@/lib/content";
import { usePreloaderClearDelay } from "@/lib/timing";

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-heading text-sm font-bold text-background">
        RK
      </span>
      <span className="hidden font-heading text-sm font-semibold uppercase tracking-[0.08em] text-ink sm:inline">
        Khaniakou
      </span>
    </span>
  );
}

const Navbar = memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const start = usePreloaderClearDelay();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
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
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: start }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-ink/10 bg-background/90 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-container items-center justify-between px-[5%] md:h-24">
          <Link href="/" aria-label="Accueil" data-cursor="" className="text-ink">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor=""
                className="underline-draw font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Magnetic>
              <a href="#contact" data-cursor="" className="btn-primary">
                Me contacter
              </a>
            </Magnetic>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            data-cursor=""
            className="relative z-50 flex h-6 w-7 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={isOpen}
          >
            <span
              className={`h-[2px] w-full bg-ink transition-all duration-300 ${
                isOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full bg-ink transition-all duration-300 ${
                isOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-[6%] py-28 lg:hidden"
          >
            <nav>
              <ul className="space-y-3">
                {navItems.map((item, idx) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.06 }}
                    className="overflow-hidden"
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="font-heading text-5xl font-bold text-background"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-6 border-t border-panel-line pt-8 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <a href={`mailto:${contactEmail}`} className="font-sans text-lg font-semibold text-background">
                  {contactEmail}
                </a>
                <p className="mt-2 font-sans text-sm text-panel-muted">
                  <a href={contactPhoneHref}>{contactPhone}</a> — {contactLocation}
                </p>
              </div>
              <Magnetic>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="btn-panel inline-flex items-center gap-2"
                >
                  Me contacter <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
