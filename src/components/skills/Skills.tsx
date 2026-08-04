"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Brain,
  BarChart3,
  Database,
  Plus,
  X,
  Check,
} from "lucide-react";
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
  const [customSkills, setCustomSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const activeSkills = [...skillsData[active].skills, ...customSkills];

  const addSkill = () => {
    const name = newSkill.trim();
    if (!name) return;
    setCustomSkills((prev) => [...prev, { name, level: 75 }]);
    setNewSkill("");
    setShowAdd(false);
  };

  const removeSkill = (name: string) => {
    setCustomSkills((prev) => prev.filter((s) => s.name !== name));
  };

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
                    <span className="flex items-center gap-2">
                      {customSkills.some((s) => s.name === skill.name) && (
                        <button
                          onClick={() => removeSkill(skill.name)}
                          className="rounded-full p-1 text-secondary transition-colors hover:text-red-400"
                          aria-label={`Remove ${skill.name}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <span className="font-mono text-xs text-accent">
                        {skill.level}%
                      </span>
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

        {/* Add skill */}
        <div className="mt-10 flex justify-center">
          {showAdd ? (
            <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-card/60 p-2 backdrop-blur-md">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                placeholder="Add a skill…"
                className="w-52 bg-transparent px-3 py-2 text-sm text-white placeholder:text-highlight focus:outline-none"
                autoFocus
              />
              <button
                onClick={addSkill}
                className="rounded-xl bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                aria-label="Add skill"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="rounded-xl bg-white/10 p-2 text-secondary transition-colors hover:bg-white/20"
                aria-label="Cancel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-secondary transition-all duration-300 hover:border-white/30 hover:text-white"
            >
              <Plus className="h-4 w-4" />
              Add Skill
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

