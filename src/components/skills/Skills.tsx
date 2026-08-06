"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Brain, BarChart3, Database } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import rawSkillsData from "@/data/skills.json";

const ICONS: Record<string, typeof Code> = {
  code: Code,
  brain: Brain,
  chart: BarChart3,
  database: Database,
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
  | "dataScience";

const skillsData = rawSkillsData as unknown as Record<CategoryKey, SkillCategory>;
const CATEGORY_KEYS: CategoryKey[] = [
  "programming",
  "machineLearning",
  "visualization",
  "dataScience",
];

export function Skills() {
  const [active, setActive] = useState<CategoryKey>("programming");

  const activeSkills = skillsData[active].skills;

  return (
    <section id="skills" className="relative px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical Skills"
          description="A curated toolkit for building intelligent, end-to-end data solutions."
        />

        {/* Category tabs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {CATEGORY_KEYS.map((key) => {
            const Icon = ICONS[skillsData[key].icon] ?? Code;
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive ? "text-white" : "text-secondary hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-pill"
                    className="absolute inset-0 rounded-full border border-white/15 bg-white/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{skillsData[key].label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {activeSkills.map((skill, i) => (
              <Reveal key={skill.name} delay={i * 0.05}>
                <div className="group relative rounded-2xl border border-white/8 bg-card/60 p-6 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-card">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">
                      {skill.name}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-highlight to-white"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
