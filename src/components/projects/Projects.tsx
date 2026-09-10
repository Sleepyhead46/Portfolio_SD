"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ChevronRight, X, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TiltCard } from "@/components/shared/TiltCard";
import rawProjects from "@/data/projects.json";

interface SubProject {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
}

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  categoryLabel: string;
  image: string;
  tech: string[];
  github: string;
  demo?: string;
  features: string[];
  featured: boolean;
  grouped?: boolean;
  subProjects?: SubProject[];
}

const projects = rawProjects as Project[];

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "machine-learning", label: "Machine Learning & AI" },
  { id: "ai-agents", label: "AI Agents" },
  { id: "business-intelligence", label: "Power BI & Analytics" },
];

export function Projects() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="relative px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Work"
          description="A selection of machine learning architectures, predictive systems, and executive business analytics dashboards."
        />

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-1.5">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white/10 text-white font-semibold"
                  : "text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Responsive Grid of Project Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredProjects.map((project, i) => (
            <div key={project.id} className="flex flex-col">
              <TiltCard className="flex flex-1 flex-col">
                <article className="group relative flex flex-1 flex-col overflow-hidden rounded-xl border border-white/8 bg-card transition-all duration-200 hover:border-white/20 hover:bg-[#16181f]">
                  {/* Image Banner */}
                  <div className="relative h-52 w-full overflow-hidden border-b border-white/8 bg-black/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />

                    {/* Category & Featured Badge */}
                    <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5">
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                          <Sparkles className="h-3 w-3 text-zinc-300" />
                          Featured
                        </span>
                      )}
                      <span className="rounded-md border border-white/10 bg-black/60 px-2 py-0.5 text-[11px] font-medium text-zinc-300 backdrop-blur-sm">
                        {project.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-secondary">
                        {project.tagline}
                      </p>

                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-300">
                        {project.description}
                      </p>

                      {/* Highlight metrics */}
                      {project.features.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.features.slice(0, 3).map((f) => (
                            <span
                              key={f}
                              className="rounded border border-white/6 bg-white/[0.02] px-2 py-0.5 text-[11px] text-zinc-400"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Tech stack */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-white/8 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 text-xs font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white hover:bg-white/5"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>Code</span>
                        </a>
                      ) : <div />}

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-3 text-xs font-medium text-white transition-all hover:bg-white/10 hover:border-white/30"
                      >
                        <span>{project.grouped ? "View Dashboards" : "Details"}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[160] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-white/12 bg-[#121419] p-6 sm:p-7 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-secondary">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-secondary">{selectedProject.tagline}</p>
              </div>

              {/* Image */}
              <div className="mt-4 overflow-hidden rounded-lg border border-white/8 bg-black/40">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-48 w-full object-cover sm:h-56"
                />
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300">
                {selectedProject.description}
              </p>

              {/* Subprojects */}
              {selectedProject.grouped && selectedProject.subProjects && (
                <div className="mt-5 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-secondary">
                    Included Dashboards
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {selectedProject.subProjects.map((sub) => (
                      <div
                        key={sub.id}
                        className="rounded-lg border border-white/8 bg-white/[0.02] p-3 flex flex-col justify-between"
                      >
                        <div>
                          <div className="mb-2 h-20 overflow-hidden rounded border border-white/6 bg-black/40">
                            <img
                              src={sub.image}
                              alt={sub.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <h5 className="font-semibold text-white text-xs sm:text-sm">
                            {sub.title}
                          </h5>
                          <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
                            {sub.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-white/6 flex items-center justify-between">
                          <span className="text-[10px] text-zinc-400 font-mono">
                            {sub.tech.join(" · ")}
                          </span>
                          <a
                            href={sub.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-white hover:underline font-medium"
                          >
                            <Github className="h-3 w-3" />
                            GitHub
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features list */}
              {selectedProject.features.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-secondary">
                    Key Features
                  </h4>
                  <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                    {selectedProject.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs text-zinc-300"
                      >
                        <span className="h-1 w-1 rounded-full bg-zinc-400 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mt-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-secondary">
                  Tech Stack
                </h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-white/8 bg-white/5 px-2 py-0.5 text-xs text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-white/8 pt-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-4 text-xs font-medium text-white transition-colors hover:bg-white/10"
                  >
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex h-9 items-center rounded-lg border border-white/10 px-4 text-xs font-medium text-zinc-300 hover:bg-white/5 hover:text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
