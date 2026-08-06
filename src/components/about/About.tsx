"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, BarChart3, Zap, CheckCircle2, User, Sparkles, Heart } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { TiltCard } from "@/components/shared/TiltCard";

const HIGHLIGHTS = [
  {
    id: "ai-ml",
    icon: Brain,
    title: "AI & Machine Learning",
    tagline: "Predictive Models",
    description:
      "I build machine learning models that make accurate predictions — from classifying plant diseases in agriculture to filtering out fake news with NLP.",
    badge: "96% Crop Model Accuracy",
    highlights: ["Python & Scikit-Learn", "TensorFlow & CNNs", "NLP & Text Analysis", "Model Evaluation"],
  },
  {
    id: "bi-analytics",
    icon: BarChart3,
    title: "Data Analytics & Power BI",
    tagline: "Clear Visual Insights",
    description:
      "I turn complex data into clean, interactive Power BI dashboards that make financial trends and sales metrics easy for anyone to understand.",
    badge: "Interactive Dashboards",
    highlights: ["Power BI & DAX", "Data Cleaning & ETL", "Financial Reports", "Sales Performance"],
  },
  {
    id: "agents-auto",
    icon: Zap,
    title: "Smart AI & Automation",
    tagline: "Streamlined Workflows",
    description:
      "I design multi-agent AI assistants and web applications that automate tedious research, such as analyzing stock market tickers in real time.",
    badge: "300+ Stocks Tracked",
    highlights: ["Phi Agent Framework", "Streamlit Web Apps", "API Integration", "Workflow Automation"],
  },
];

const METRICS = [
  { value: "96%", label: "Crop Model Accuracy", sub: "Random Forest Classifier" },
  { value: "300+", label: "Stock Tickers", sub: "Tracked by AI Agents" },
  { value: "95%", label: "NLP Precision", sub: "Misinformation Detection" },
  { value: "100%", label: "Hands-on Focus", sub: "Real-World Impact" },
];

export function About() {
  const [activeTab, setActiveTab] = useState(HIGHLIGHTS[0].id);

  const selectedHighlight = HIGHLIGHTS.find((h) => h.id === activeTab) || HIGHLIGHTS[0];

  return (
    <section id="about" className="relative px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Who I Am"
          title="Turning Data Into Clear Answers"
          description="Hi, I'm Samyak! I bridge the gap between complex numbers, smart algorithms, and real business value."
        />

        {/* Personal Intro Banner */}
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-2xl border border-white/10 bg-card/60 p-6 md:p-8 backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-accent">
                  <User className="h-3.5 w-3.5" />
                  <span>Based in Kathmandu, Nepal</span>
                </div>
                <p className="text-base sm:text-lg text-white leading-relaxed font-normal">
                  I&apos;m a Data Scientist and Machine Learning Engineer who loves taking messy datasets and turning them into clear insights, reliable predictive models, and intuitive web apps.
                </p>
                <p className="text-sm text-secondary leading-relaxed">
                  Whether it&apos;s helping farmers identify crop diseases early, building interactive Power BI dashboards, or creating multi-agent AI assistants for stock market analysis, my goal is always the same: make data genuinely useful.
                </p>
              </div>

              <div className="shrink-0 flex flex-col gap-3 justify-center">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <Heart className="h-5 w-5 text-accent shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white">Passionate About</div>
                    <div className="text-xs text-secondary">Clean Code &amp; Clear Visuals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Impact Metrics Row */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {METRICS.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card/60 p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-card">
                <div className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  <span className="bg-gradient-to-r from-white via-highlight to-accent bg-clip-text text-transparent">
                    {metric.value}
                  </span>
                </div>
                <div className="mt-1 text-sm font-semibold text-white">{metric.label}</div>
                <div className="mt-0.5 text-xs text-secondary">{metric.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Interactive Focus Explorer */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Interactive Pillar Selectors */}
          <div className="lg:col-span-5 space-y-4">
            <div className="mb-4 flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-widest">
              <Sparkles className="h-4 w-4" />
              <span>Explore My Work Areas</span>
            </div>

            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`group relative flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-white/30 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                      : "border-white/8 bg-card/40 hover:border-white/20 hover:bg-card/70"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                        isActive
                          ? "border-white/30 bg-white/15 text-white"
                          : "border-white/10 bg-white/5 text-secondary group-hover:text-white"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-semibold text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-secondary">{item.tagline}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all ${
                      isActive
                        ? "border-white/20 bg-accent/20 text-white"
                        : "border-white/5 bg-white/5 text-secondary"
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Interactive Detail Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHighlight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <TiltCard>
                  <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-card/80 p-8 backdrop-blur-xl shadow-2xl">
                    <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <selectedHighlight.icon className="h-5 w-5 text-accent" />
                    </div>

                    <span className="font-mono text-xs uppercase tracking-widest text-accent">
                      {selectedHighlight.tagline}
                    </span>

                    <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                      {selectedHighlight.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-secondary sm:text-base">
                      {selectedHighlight.description}
                    </p>

                    <div className="mt-6 border-t border-white/10 pt-6">
                      <h5 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-white/70">
                        Tools &amp; Techniques
                      </h5>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                        {selectedHighlight.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2 text-xs font-medium text-white">
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
