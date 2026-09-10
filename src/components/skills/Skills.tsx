"use client";

import { useState } from "react";
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
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const displayedCategories =
    selectedFilter === "all"
      ? CATEGORY_KEYS
      : CATEGORY_KEYS.filter((k) => k === selectedFilter);

  return (
    <section id="skills" className="relative px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical Skills"
          description="Technologies, algorithmic libraries, and analytics frameworks I use to engineer robust data solutions."
        />

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-1.5">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              selectedFilter === "all"
                ? "bg-white/10 text-white font-semibold"
                : "text-secondary hover:text-white hover:bg-white/5"
            }`}
          >
            All
          </button>
          {CATEGORY_KEYS.map((key) => {
            const cat = skillsData[key];
            return (
              <button
                key={key}
                onClick={() => setSelectedFilter(key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedFilter === key
                    ? "bg-white/10 text-white font-semibold"
                    : "text-secondary hover:text-white hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Category Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayedCategories.map((key, catIdx) => {
            const category = skillsData[key];
            const Icon = ICONS[category.icon] ?? Code;
            const isFullWidth =
              selectedFilter === "all" && catIdx === CATEGORY_KEYS.length - 1;

            return (
              <Reveal
                key={key}
                delay={catIdx * 0.05}
                className={isFullWidth ? "md:col-span-2" : ""}
              >
                <div className="group h-full rounded-xl border border-white/8 bg-card p-6 transition-all duration-200 hover:border-white/18 hover:bg-[#16181f]">
                  {/* Top Header */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-semibold text-white">
                          {category.label}
                        </h3>
                        <p className="text-[11px] text-secondary font-mono">
                          {category.skills.length} skills
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center rounded border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/8 hover:text-white"
                      >
                        {skill.name}
                      </span>
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
