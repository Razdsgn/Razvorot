"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface AccordionEntry {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionEntry[];
  defaultOpen?: number | null;
}

export default function Accordion({ items, defaultOpen = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-ink/10 border-t border-ink/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              data-cursor=""
              className="flex w-full items-center justify-between gap-6 py-7 text-left font-heading text-lg font-semibold text-ink transition-colors duration-300 hover:text-ink/70 md:text-2xl"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className="flex-shrink-0 text-ink">
                {isOpen ? <Minus size={22} /> : <Plus size={22} />}
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
                  <p className="max-w-2xl pb-8 font-sans text-base leading-relaxed text-muted">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
