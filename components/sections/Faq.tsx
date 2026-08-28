"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import Accordion from "@/components/ui/Accordion";
import { faqItems } from "@/lib/content";

export default function Faq() {
  return (
    <section id="faq" className="px-[5%] py-24 md:py-32">
      <div className="mx-auto max-w-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">FAQ</p>
            <h2 className="font-heading text-display text-ink">
              <RevealText as="span" className="block">
                Questions
              </RevealText>
              <RevealText as="span" className="block" delay={0.1}>
                fréquentes.
              </RevealText>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-6 max-w-sm font-sans text-lg leading-relaxed text-muted"
            >
              Ce qu&apos;on me demande le plus souvent lors d&apos;un premier échange.
            </motion.p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Accordion items={faqItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
