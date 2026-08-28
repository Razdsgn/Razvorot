"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import { educations, experiences, languages } from "@/lib/content";

export default function Experience() {
  return (
    <section id="about" className="bg-surface px-[5%] py-24 md:py-32">
      <div className="mx-auto max-w-container">
        <p className="eyebrow mb-6">Mon parcours</p>
        <h2 className="font-heading text-display text-ink">
          <RevealText as="span" className="block">
            Un parcours entre
          </RevealText>
          <RevealText as="span" className="block" delay={0.1}>
            design et code.
          </RevealText>
        </h2>
        <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-muted">
          De la coordination de projets internationaux au développement web full-stack, un
          parcours unique entre design, gestion et code.
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted">
              Expérience professionnelle
            </h3>
            <div className="border-t border-ink/10">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="border-b border-ink/10 py-8"
                >
                  <div className="flex items-start gap-6">
                    <span className="font-heading text-4xl text-ink/15">{exp.step}</span>
                    <div>
                      <p className="font-sans text-sm text-muted">{exp.period}</p>
                      <h4 className="mt-1 font-heading text-xl font-semibold text-ink">
                        {exp.title}
                      </h4>
                      <p className="mt-1 font-sans text-sm font-semibold text-ink">
                        {exp.company}
                      </p>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted">
              Formation
            </h3>
            <div className="border-t border-ink/10">
              {educations.map((edu, idx) => (
                <motion.div
                  key={edu.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="border-b border-ink/10 py-8"
                >
                  <p className="font-sans text-sm text-muted">{edu.period}</p>
                  <h4 className="mt-1 font-heading text-xl font-semibold text-ink">{edu.title}</h4>
                  <p className="mt-1 font-sans text-sm text-muted">{edu.school}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="mb-6 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                Langues
              </h3>
              <div className="space-y-5">
                {languages.map(({ lang, level, pct }) => (
                  <div key={lang}>
                    <div className="mb-2 flex justify-between font-sans text-sm">
                      <span className="font-semibold text-ink">{lang}</span>
                      <span className="text-muted">{level}</span>
                    </div>
                    <div className="h-1 overflow-hidden bg-ink/10">
                      <motion.div
                        className="h-full bg-ink"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
