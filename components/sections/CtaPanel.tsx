"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, MapPin, Phone } from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import Magnetic from "@/components/ui/Magnetic";
import {
  contactEmail,
  contactLocation,
  contactPhone,
  contactPhoneHref,
  githubUrl,
  linkedinUrl,
  navItems,
} from "@/lib/content";

export default function CtaPanel() {
  return (
    <section
      id="contact"
      className="relative bg-panel px-[5%] pb-10 pt-20 text-panel-ink md:pt-28"
      style={{ borderRadius: "var(--radius-panel) var(--radius-panel) 0 0" }}
    >
      <div className="mx-auto max-w-container">
        <p className="eyebrow eyebrow-invert mb-8">Prochaine étape</p>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 className="font-heading text-display text-panel-ink">
              <RevealText as="span" className="block">
                Un projet ou une
              </RevealText>
              <RevealText as="span" className="block" delay={0.1}>
                alternance en tête ?
              </RevealText>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-md font-sans text-lg leading-relaxed text-panel-muted"
            >
              Je recherche une alternance en développement web à partir d&apos;octobre 2026.
              Parlons-en.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <Magnetic strength={0.2}>
                <a
                  href={`mailto:${contactEmail}`}
                  data-cursor="Écrire"
                  className="underline-draw mt-10 inline-block break-all font-heading text-3xl font-semibold text-panel-ink sm:text-5xl"
                >
                  {contactEmail}
                </a>
              </Magnetic>
            </motion.div>

            <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:gap-12">
              <a
                href={contactPhoneHref}
                data-cursor=""
                className="flex items-center gap-3 font-sans text-sm text-panel-muted transition-colors hover:text-panel-ink"
              >
                <Phone size={16} /> {contactPhone}
              </a>
              <span className="flex items-center gap-3 font-sans text-sm text-panel-muted">
                <MapPin size={16} /> {contactLocation}
              </span>
            </div>

            <div className="mt-8 flex gap-6">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor=""
                className="flex items-center gap-2 font-sans text-sm font-semibold text-panel-ink transition-opacity hover:opacity-60"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor=""
                className="flex items-center gap-2 font-sans text-sm font-semibold text-panel-ink transition-opacity hover:opacity-60"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
                  .value;
                window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
                  `Contact depuis portfolio — ${name}`
                )}&body=${encodeURIComponent(`${message}\n\nDe : ${email}`)}`;
              }}
            >
              <div>
                <label htmlFor="name" className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-panel-muted">
                  Nom
                </label>
                <input id="name" name="name" type="text" placeholder="Votre nom" className="form-field-invert" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-panel-muted">
                  Email
                </label>
                <input id="email" name="email" type="email" required placeholder="vous@email.com" className="form-field-invert" />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-panel-muted">
                  Message
                </label>
                <textarea id="message" name="message" rows={4} placeholder="Votre message" className="form-field-invert resize-none" />
              </div>
              <Magnetic>
                <button type="submit" data-cursor="" className="btn-panel w-full">
                  Envoyer <ArrowUpRight size={16} className="ml-1 inline" />
                </button>
              </Magnetic>
            </form>
          </div>
        </div>

        <div className="mt-24 grid gap-12 border-t border-panel-line pt-12 md:grid-cols-3">
          <div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-panel-ink font-heading text-sm font-bold text-panel">
              RK
            </span>
            <p className="mt-4 max-w-[220px] font-sans text-sm text-panel-muted">
              Développeur Web Full-Stack, ex-designer &amp; chef de projet. Basé à Rennes,
              France.
            </p>
          </div>

          <div>
            <h6 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-panel-muted">
              Navigation
            </h6>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-cursor=""
                    className="font-sans text-sm text-panel-ink/80 transition-colors hover:text-panel-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-panel-muted">
              Contact
            </h6>
            <p className="font-sans text-sm text-panel-ink/80">
              {contactEmail}
              <br />
              {contactLocation}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-panel-line pt-8 font-sans text-xs text-panel-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Raman Khaniakou. Tous droits réservés.</p>
          <p>Conçu &amp; développé par Raman Khaniakou</p>
        </div>
      </div>
    </section>
  );
}
