"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, ChevronDown, Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import experience from "@/data/experience.json";

export function Experience() {
  const [expanded, setExpanded] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <section id="experience" className="relative px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Career"
          title="Professional Experience"
          description="Real-world impact delivered through data automation, analytics, and intelligent dashboards."
        />

        <div className="relative border-l border-white/10 pl-8">
          <motion.div
            className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent via-white/40 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          {experience.map((job, i) => (
            <Reveal key={job.id} delay={i * 0.15}>
              <div className="relative mb-12 last:mb-0">
                <div className="absolute -left-[41px] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-card">
                  <Briefcase className="h-4 w-4 text-accent" />
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/8 bg-card/60 backdrop-blur-md transition-all duration-500 hover:border-white/20">
                  {/* Header */}
                  <button
                    onClick={() => setExpanded(expanded === job.id ? null : job.id)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left md:p-8"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                          {job.role}
                        </h3>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-accent">
                          {job.type}
                        </span>
                      </div>
                      <p className="text-sm text-secondary">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-secondary/80">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                        <span>{job.duration}</span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expanded === job.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-secondary"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </button>

                  {/* Expandable content */}
                  <AnimatePresence initial={false}>
                    {expanded === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="border-t border-white/8 p-6 md:p-8">
                          <p className="mb-6 text-sm leading-relaxed text-secondary">
                            {job.summary}
                          </p>

                          {/* Highlights */}
                          <div className="mb-6 grid grid-cols-3 gap-4">
                            {job.highlights.map((h) => (
                              <div
                                key={h.label}
                                className="rounded-xl border border-white/8 bg-white/[0.03] p-4 text-center"
                              >
                                <div className="font-display text-2xl font-bold text-white md:text-3xl">
                                  <AnimatedCounter value={parseInt(h.value)} suffix={h.value.replace(/[0-9-+]/g, "")} />
                                </div>
                                <p className="mt-1 text-xs text-secondary">{h.label}</p>
                              </div>
                            ))}
                          </div>

                          {/* Responsibilities */}
                          <ul className="space-y-2.5">
                            {job.responsibilities.map((r) => (
                              <li key={r} className="flex items-start gap-3 text-sm text-secondary">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                                  <Check className="h-3 w-3 text-accent" />
                                </span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
