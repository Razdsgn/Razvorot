"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import Magnetic from "@/components/ui/Magnetic";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="px-[5%] py-24 md:py-32">
      <div className="mx-auto max-w-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-6">Ce que je fais</p>
            <h2 className="font-heading text-display text-ink">
              <RevealText as="span" className="block">
                Du concept à la
              </RevealText>
              <RevealText as="span" className="block" delay={0.1}>
                mise en production.
              </RevealText>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl font-sans text-lg leading-relaxed text-muted"
            >
              Formé à l&apos;ingénierie logicielle après plusieurs années en coordination de
              projets et en design, j&apos;allie rigueur technique et sens du produit pour livrer
              des applications web complètes — de l&apos;architecture back-end à l&apos;interface.
            </motion.p>
          </div>
        </div>

        <div className="mt-16 border-t border-ink/10">
          {services.map((service, index) => {
            const arrowBadge = (
              <Magnetic>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-background">
                  <ArrowUpRight size={18} />
                </span>
              </Magnetic>
            );

            return (
              <motion.a
                key={service.title}
                href={service.href}
                data-cursor="Explorer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group flex flex-col gap-5 border-b border-ink/10 py-8 transition-colors duration-300 hover:bg-surface md:grid md:grid-cols-12 md:items-center md:gap-8 md:px-4"
              >
                <div className="flex items-center justify-between md:hidden">
                  <h3 className="font-heading text-xl font-semibold text-ink">{service.title}</h3>
                  {arrowBadge}
                </div>

                <span className="hidden font-heading text-sm text-muted md:col-span-1 md:block">
                  {service.index}
                </span>

                <h3 className="hidden font-heading text-2xl font-semibold text-ink transition-transform duration-300 group-hover:translate-x-2 md:col-span-4 md:block">
                  {service.title}
                </h3>

                <div className="md:col-span-6">
                  <p className="max-w-md font-sans text-sm leading-relaxed text-muted md:text-base">
                    {service.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="hidden md:col-span-1 md:flex md:justify-end">{arrowBadge}</span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
