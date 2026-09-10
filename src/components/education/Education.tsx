"use client";

import { GraduationCap, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import education from "@/data/education.json";

export function Education() {
  return (
    <section id="education" className="relative px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Education"
          title="Academic Background"
          description="Rigorous computer engineering fundamentals underpinning my specialization in machine learning and data systems."
        />

        <div className="relative border-l border-white/10 pl-6 sm:pl-8 mt-12">
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-zinc-400 via-zinc-600 to-transparent" />

          {education.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.15}>
              <div className="relative mb-8 last:mb-0">
                <div className="absolute -left-[37px] sm:-left-[45px] top-1 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/15 bg-[#111216] text-zinc-300">
                  <GraduationCap className="h-4 w-4" />
                </div>

                <div className="group rounded-xl border border-white/8 bg-card p-6 sm:p-7 transition-all duration-200 hover:border-white/18">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                      {item.degree}
                    </h3>
                    <span className="inline-flex w-fit items-center rounded border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                      Engineering
                    </span>
                  </div>

                  <div className="mb-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                      {item.institution}
                    </span>
                  </div>

                  <p className="mb-4 text-xs sm:text-sm leading-relaxed text-zinc-300">
                    {item.description}
                  </p>

                  <div>
                    <h4 className="mb-2 text-xs font-mono uppercase tracking-wider text-secondary">
                      Core Subjects
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {item.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded border border-white/6 bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-300"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
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
