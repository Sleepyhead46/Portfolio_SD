"use client";

import { Brain, BarChart3, Zap, MapPin, Heart, Code2, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

const FOCUS_AREAS = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Building predictive models, NLP classifiers, and computer vision algorithms with Python and TensorFlow.",
    tags: ["Scikit-Learn", "TensorFlow", "NLP", "CNNs"],
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Power BI",
    description: "Transforming complex datasets into executive dashboards with clean DAX modeling and visual storytelling.",
    tags: ["Power BI", "DAX", "SQL", "ETL Pipelines"],
  },
  {
    icon: Zap,
    title: "Automation & AI Agents",
    description: "Designing intelligent multi-agent systems and web applications that streamline complex workflows.",
    tags: ["Python", "Streamlit", "Multi-Agent AI", "APIs"],
  },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Who I Am"
          title="Turning Data Into Clear Solutions"
          description="A Data Scientist & Machine Learning Engineer passionate about intelligence, clarity, and automation."
        />

        {/* Concise Personal Bio */}
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-2xl border border-white/10 bg-card/60 p-6 md:p-8 backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-accent">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Kathmandu, Nepal</span>
                </div>
                <p className="text-base sm:text-lg text-white font-normal leading-relaxed">
                  I&apos;m a Data Scientist and Machine Learning Engineer focused on turning raw numbers into reliable models, actionable insights, and intuitive tools.
                </p>
                <p className="text-sm text-secondary leading-relaxed">
                  My approach combines strong analytical fundamentals with practical software engineering — crafting end-to-end data pipelines, predictive algorithms, and interactive business dashboards.
                </p>
              </div>

              <div className="shrink-0 flex flex-col gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <Heart className="h-5 w-5 text-accent shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white">Focus &amp; Vision</div>
                    <div className="text-xs text-secondary">Clean Data, Practical AI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3 Core Capabilities Grid - Compact */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {FOCUS_AREAS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="group h-full rounded-2xl border border-white/8 bg-card/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-card">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent transition-all group-hover:bg-white/10">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-secondary leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/8 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-accent"
                      >
                        {t}
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
