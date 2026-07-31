"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface AccordionItem {
  title: string;
  subtitle?: string;
  price?: string;
  included: string[];
}

interface SkillsAccordionProps {
  items: AccordionItem[];
}

export default function SkillsAccordion({ items }: SkillsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-foreground/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title} className="accordion-item">
            <button
              type="button"
              className="accordion-trigger group"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <div>
                {item.subtitle && (
                  <span className="mb-1 block font-sans text-sm font-semibold text-muted">
                    {item.subtitle}
                  </span>
                )}
                <span>{item.title}</span>
              </div>
              <span className="ml-4 flex-shrink-0 text-foreground transition-transform duration-300">
                {isOpen ? <Minus size={24} /> : <Plus size={24} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="accordion-content pb-8">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div>
                        <h4 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-foreground">
                          Compétences
                        </h4>
                        <ul className="space-y-2">
                          {item.included.map((skill) => (
                            <li key={skill} className="flex items-center gap-2 text-sm">
                              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {item.price && (
                        <div>
                          <h4 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-foreground">
                            Niveau
                          </h4>
                          <p className="font-heading text-3xl">{item.price}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
