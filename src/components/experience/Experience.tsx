"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, ChevronDown, Check, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import experience from "@/data/experience.json";

export function Experience() {
  const [expanded, setExpanded] = useState<string | null>(experience[0]?.id ?? null);

  const parseHighlight = (rawVal: string) => {
    const hasPlus = rawVal.startsWith("+");
    const hasMinus = rawVal.startsWith("-");
    const num = Math.abs(parseInt(rawVal) || 0);
    const suffix = rawVal.replace(/[0-9-+]/g, "") + (rawVal.endsWith("+") ? "+" : "");
    const prefix = hasPlus ? "+" : hasMinus ? "-" : "";
    return { num, prefix, suffix };
  };

  return (
    <section id="experience" className="relative px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Career"
          title="Professional Experience"
          description="Track record of turning data into automated scrapers, production ETL pipelines, and executive dashboards."
        />

        <div className="relative border-l border-white/10 pl-6 sm:pl-8 mt-12">
          {/* Subtle timeline line */}
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-zinc-400 via-zinc-600 to-transparent" />

          {experience.map((job, i) => (
            <Reveal key={job.id} delay={i * 0.15}>
              <div className="relative mb-10 last:mb-0">
                {/* Node icon */}
                <div className="absolute -left-[37px] sm:-left-[45px] top-1 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/15 bg-[#111216] text-zinc-300">
                  <Briefcase className="h-4 w-4" />
                </div>

                <div className="overflow-hidden rounded-xl border border-white/8 bg-card transition-all duration-200 hover:border-white/18">
                  {/* Header Button */}
                  <button
                    onClick={() => setExpanded(expanded === job.id ? null : job.id)}
                    className="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left"
                    aria-expanded={expanded === job.id}
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                          {job.role}
                        </h3>
                        {job.type && (
                          <span className="rounded border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                            {job.type}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-zinc-300">
                        {job.company}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-secondary">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                          {job.duration}
                        </span>
                      </div>
                    </div>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-zinc-400">
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          expanded === job.id ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expandable Content */}
                  <AnimatePresence initial={false}>
                    {expanded === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="border-t border-white/8 p-5 sm:p-6 pt-4">
                          <p className="mb-5 text-xs sm:text-sm leading-relaxed text-zinc-300">
                            {job.summary}
                          </p>

                          {/* Highlights Grid */}
                          <div className="mb-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {job.highlights.map((h) => {
                              const { num, prefix, suffix } = parseHighlight(h.value);
                              return (
                                <div
                                  key={h.label}
                                  className="rounded-lg border border-white/6 bg-white/[0.02] p-3.5 text-center"
                                >
                                  <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                                    <AnimatedCounter
                                      value={num}
                                      prefix={prefix}
                                      suffix={suffix}
                                    />
                                  </div>
                                  <p className="mt-1 text-xs text-secondary">{h.label}</p>
                                </div>
                              );
                            })}
                          </div>

                          {/* Responsibilities list */}
                          <div className="space-y-1">
                            <h4 className="mb-2 text-xs font-mono uppercase tracking-wider text-secondary">
                              Key Contributions
                            </h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((r) => (
                                <li key={r} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                                  <span className="mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                                    <Check className="h-2.5 w-2.5" />
                                  </span>
                                  <span>{r}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
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
