"use client";

import { Github, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TiltCard } from "@/components/shared/TiltCard";
import { Reveal } from "@/components/shared/Reveal";
import projects from "@/data/projects.json";

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  features: string[];
  featured: boolean;
}

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          description="End-to-end data and machine learning solutions built with real-world impact."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project: Project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <TiltCard className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-card/60 backdrop-blur-md">
                  {/* Animated border */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl border border-white/20" />
                  </div>

                  {/* Image */}
                  <div className="relative h-52 overflow-hidden border-b border-white/8">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-elevated to-card">
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <Sparkles className="h-10 w-10 text-accent" />
                      </div>
                    </div>
                    {project.featured && (
                      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-accent">{project.tagline}</p>
                      </div>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-secondary">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.features.map((f) => (
                        <span
                          key={f}
                          className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-secondary"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Tech */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-accent"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex items-center gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
