"use client";

import { Brain, BarChart3, Zap, MapPin, Cpu } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

const FOCUS_AREAS = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Building predictive models, NLP classifiers, and computer vision architectures with Python, Scikit-Learn, and TensorFlow.",
    tags: ["TensorFlow", "Scikit-Learn", "NLP", "CNNs", "Time Series"],
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Power BI",
    description: "Transforming complex datasets into executive dashboards with clean DAX modeling, automated ETL, and visual storytelling.",
    tags: ["Power BI", "DAX", "SQL", "ETL Pipelines", "Tableau"],
  },
  {
    icon: Zap,
    title: "Automation & AI Systems",
    description: "Architecting multi-agent systems and RPA web scrapers that streamline complex data collection and business workflows.",
    tags: ["Python", "Groq LLM", "Streamlit", "Selenium RPA", "APIs"],
  },
];

const METRICS = [
  { label: "ML Classification Accuracy", value: "96.0%", detail: "Crop & Misinformation Models" },
  { label: "Securities Tracked", value: "300+", detail: "Real-Time NEPSE AI System" },
  { label: "Reporting Efficiency Gain", value: "+40%", detail: "Automated ETL & RPA Pipelines" },
];

export function About() {
  return (
    <section id="about" className="relative px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Turning Data Into Practical Intelligence"
          description="A Data Scientist & Machine Learning Engineer focused on reliable models, actionable insights, and clean automation."
        />

        {/* Bio Card */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-xl border border-white/8 bg-card p-6 sm:p-8 md:p-9 transition-all duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3.5 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300">
                  <MapPin className="h-3 w-3 text-zinc-400" />
                  <span>Kathmandu, Nepal · Available for Remote Work</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  Bridging statistical analysis, machine learning algorithms, and practical software engineering.
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  My approach combines solid analytical foundations with clean, maintainable software craftsmanship. Whether developing neural networks, structuring multi-table DAX data models, or orchestrating automated data pipelines, my goal is always clarity, accuracy, and tangible business impact.
                </p>
              </div>

              {/* Principle card */}
              <div className="shrink-0 flex flex-col gap-3 sm:w-60">
                <div className="rounded-lg border border-white/8 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-secondary uppercase tracking-wider mb-1">
                    <Cpu className="h-3.5 w-3.5 text-zinc-400" />
                    Guiding Principle
                  </div>
                  <div className="text-sm font-semibold text-white">Pragmatic, High-Quality AI</div>
                  <p className="text-xs text-secondary mt-1">Impactful solutions over artificial complexity.</p>
                </div>
              </div>
            </div>

            {/* Impact Metric Strip */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t border-white/8 pt-6">
              {METRICS.map((m) => (
                <div key={m.label} className="rounded-lg border border-white/6 bg-white/[0.02] p-3.5 text-center sm:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {m.value}
                  </div>
                  <div className="text-xs font-semibold text-zinc-200 mt-0.5">
                    {m.label}
                  </div>
                  <div className="text-[11px] text-secondary mt-0.5">
                    {m.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 3 Core Focus Pillars */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {FOCUS_AREAS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="group h-full rounded-xl border border-white/8 bg-card p-6 transition-all duration-200 hover:border-white/18 hover:bg-[#16181f]">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-base sm:text-lg font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-white/6">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-white/6 bg-white/[0.02] px-2 py-0.5 text-[11px] text-zinc-400"
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
