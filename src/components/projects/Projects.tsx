"use client";

import { useRef } from "react";
import { Github, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TiltCard } from "@/components/shared/TiltCard";
import { Reveal } from "@/components/shared/Reveal";
import projects from "@/data/projects.json";

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
  image: string;
  tech: string[];
  github: string;
  demo: string;
  features: string[];
  featured: boolean;
  grouped?: boolean;
  subProjects?: SubProject[];
}

export function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="projects" className="relative px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          description="Real projects I've built to solve actual problems — using machine learning, data visualization, and smart automation."
        />

        {/* Relative wrapper for side navigation buttons */}
        <div className="relative mt-12">
          {/* Left floating side button */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute -left-3 sm:-left-6 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md shadow-xl transition-all duration-300 hover:border-white/50 hover:bg-black/90 hover:scale-110 active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right floating side button */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute -right-3 sm:-right-6 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md shadow-xl transition-all duration-300 hover:border-white/50 hover:bg-black/90 hover:scale-110 active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Horizontal scroll container - all projects in one row */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {(projects as Project[]).map((project, i) =>
              project.grouped && project.subProjects ? (
                /* ── Grouped card ── */
                <div
                  key={project.id}
                  className="w-[85vw] sm:w-[380px] md:w-[420px] shrink-0 snap-start flex flex-col"
                >
                  <Reveal delay={i * 0.1} className="h-full flex flex-col flex-1">
                    <TiltCard className="h-full flex flex-col flex-1">
                      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-card/60 backdrop-blur-md">
                        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <div className="absolute inset-0 rounded-2xl border border-white/20" />
                        </div>

                        <div className="relative h-52 overflow-hidden border-b border-white/8 shrink-0">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                          <div>
                            <div className="mb-5">
                              <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                                {project.title}
                              </h3>
                              <p className="mt-1 text-sm text-accent">{project.tagline}</p>
                            </div>

                            <div className="flex flex-col gap-5">
                              {project.subProjects.map((sub, si) => (
                                <div
                                  key={sub.id}
                                  className={
                                    si < project.subProjects!.length - 1
                                      ? "border-b border-white/8 pb-5"
                                      : ""
                                  }
                                >
                                  <h4 className="mb-1.5 text-sm font-semibold text-white">
                                    {sub.title}
                                  </h4>
                                  <p className="mb-3 text-xs leading-relaxed text-secondary">
                                    {sub.description}
                                  </p>

                                  <div className="mb-3 flex flex-wrap gap-2">
                                    {sub.tech.map((t) => (
                                      <span
                                        key={t}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-accent"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>

                                  <a
                                    href={sub.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 px-4 text-xs text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                                  >
                                    <Github className="h-3.5 w-3.5" />
                                    GitHub
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </article>
                    </TiltCard>
                  </Reveal>
                </div>
              ) : (
                /* ── Standard project card ── */
                <div
                  key={project.id}
                  className="w-[85vw] sm:w-[380px] md:w-[420px] shrink-0 snap-start flex flex-col"
                >
                  <Reveal delay={i * 0.1} className="h-full flex flex-col flex-1">
                    <TiltCard className="h-full flex flex-col flex-1">
                      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-card/60 backdrop-blur-md">
                        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <div className="absolute inset-0 rounded-2xl border border-white/20" />
                        </div>

                        <div className="relative h-52 overflow-hidden border-b border-white/8 shrink-0">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                          {project.featured && (
                            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                              Featured
                            </span>
                          )}
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                          <div>
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
                          </div>

                          <div className="mt-auto pt-4 flex items-center gap-3">
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
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
