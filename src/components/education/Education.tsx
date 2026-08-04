"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import education from "@/data/education.json";

export function Education() {
  return (
    <section id="education" className="relative px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Education"
          title="Academic Foundation"
          description="Building the technical and analytical foundation for a career in data science."
        />

        <div className="relative border-l border-white/10 pl-8">
          {/* Animated line */}
          <motion.div
            className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent via-white/40 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          {education.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.15}>
              <div className="relative mb-12 last:mb-0">
                {/* Node */}
                <div className="absolute -left-[41px] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-card">
                  <GraduationCap className="h-4 w-4 text-accent" />
                </div>

                <div className="group rounded-2xl border border-white/8 bg-card/60 p-6 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-card md:p-8">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                      {item.degree}
                    </h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-accent">
                      {item.percentage}
                    </span>
                  </div>

                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      {item.institution}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {item.period}
                    </span>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-secondary">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-secondary transition-colors group-hover:border-white/15"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
