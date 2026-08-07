"use client";

import { motion } from "framer-motion";
import { Code, Brain, BarChart3, Database, Bot } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import rawSkillsData from "@/data/skills.json";

const ICONS: Record<string, typeof Code> = {
  code: Code,
  brain: Brain,
  chart: BarChart3,
  database: Database,
  bot: Bot,
};

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  label: string;
  icon: string;
  skills: Skill[];
}

type CategoryKey =
  | "programming"
  | "machineLearning"
  | "visualization"
  | "dataScience"
  | "aiAutomation";

const skillsData = rawSkillsData as unknown as Record<CategoryKey, SkillCategory>;
const CATEGORY_KEYS: CategoryKey[] = [
  "programming",
  "machineLearning",
  "visualization",
  "dataScience",
  "aiAutomation",
];

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical Skills"
          description="All technologies and tools I work with — from data wrangling to production-ready AI systems."
        />

        {/* All Technologies at a Glance */}
        <Reveal delay={0.05}>
          <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            All Technologies at a Glance
          </p>
        </Reveal>

        <div className="flex flex-wrap gap-8">
          {CATEGORY_KEYS.map((key, catIdx) => {
            const category = skillsData[key];
            const Icon = ICONS[category.icon] ?? Code;
            // Make the last card (aiAutomation) span full width on sm+
            const isLast = catIdx === CATEGORY_KEYS.length - 1;
            return (
              <Reveal
                key={key}
                delay={catIdx * 0.08}
                className={isLast ? "w-full" : "w-full sm:w-[calc(50%-1rem)]"}
              >
                <div className="group relative rounded-2xl border border-white/8 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/16 hover:bg-white/[0.04]">
                  {/* Subtle top edge glow */}
                  <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                      <Icon className="h-4 w-4 text-white/60" />
                    </div>
                    <h3 className="text-sm font-semibold tracking-wide text-white/80">
                      {category.label}
                    </h3>
                  </div>

                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.88 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.35,
                          delay: catIdx * 0.06 + i * 0.04,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{ scale: 1.06 }}
                        className="cursor-default rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-xs font-medium text-white/60 transition-all duration-200 hover:border-white/20 hover:bg-white/8 hover:text-white/90"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
