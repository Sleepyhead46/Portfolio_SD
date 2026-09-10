"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  ExternalLink,
  MoveHorizontal,
  Layers,
  CheckCircle2,
} from "lucide-react";
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

  // Carousel scroll & drag state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Drag tracking refs to distinguish dragging vs clicking
  const isPointerDownRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0, scrollLeft: 0 });
  const hasDraggedRef = useRef(false);

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  // Update carousel scroll state
  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = carouselRef.current;
    if (!el) return;

    const handleResize = () => updateScrollState();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateScrollState, filteredProjects]);

  // Reset scroll on category change
  const handleTabChange = (catId: string) => {
    setActiveTab(catId);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Button navigation
  const scrollCarousel = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const cardEl = el.querySelector("article");
    const scrollAmount = cardEl ? cardEl.clientWidth + 24 : 420;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Mouse Drag to Scroll Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !carouselRef.current) return;
    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    startPosRef.current = {
      x: e.pageX,
      y: e.pageY,
      scrollLeft: carouselRef.current.scrollLeft,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || !carouselRef.current) return;
    const dx = e.pageX - startPosRef.current.x;
    const dy = e.pageY - startPosRef.current.y;

    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      hasDraggedRef.current = true;
      if (!isDragging) setIsDragging(true);
    }

    if (hasDraggedRef.current) {
      carouselRef.current.scrollLeft = startPosRef.current.scrollLeft - dx;
    }
  };

  const handleMouseUp = () => {
    isPointerDownRef.current = false;
    setIsDragging(false);
    // Keep hasDragged true briefly so the click event on card is discarded
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 80);
  };

  // Open modal if genuinely clicked (not dragged)
  const handleCardClick = (project: Project) => {
    if (hasDraggedRef.current) return;
    setSelectedProject(project);
  };

  // Body scroll lock & Escape key handling for modal
  useEffect(() => {
    if (selectedProject) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedProject(null);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="relative px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Work"
          description="A selection of machine learning architectures, predictive systems, and executive business analytics dashboards."
        />

        {/* Top Control Bar: Category Filter Tabs & Carousel Navigation */}
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white/15 text-white font-semibold shadow-sm border border-white/20"
                    : "text-secondary hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Carousel Controls & Drag hint */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-[11px] text-zinc-500 font-mono hidden md:inline-flex items-center gap-1.5">
              <MoveHorizontal className="h-3.5 w-3.5 text-zinc-400" />
              Drag or scroll horizontally
            </span>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                disabled={!canScrollLeft}
                aria-label="Previous project"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition-all hover:bg-white/15 hover:border-white/25 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/[0.04] disabled:active:scale-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                disabled={!canScrollRight}
                aria-label="Next project"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition-all hover:bg-white/15 hover:border-white/25 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/[0.04] disabled:active:scale-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Progress Bar */}
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-white/30 to-white transition-all duration-150 ease-out"
            style={{ width: `${Math.max(12, scrollProgress)}%` }}
          />
        </div>

        {/* Horizontal Scrollable Carousel Container */}
        <div
          ref={carouselRef}
          onScroll={updateScrollState}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`mt-8 flex gap-6 overflow-x-auto pb-6 pt-2 select-none no-scrollbar ${
            isDragging
              ? "cursor-grabbing scroll-auto"
              : "cursor-grab snap-x snap-mandatory scroll-smooth"
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="w-[86vw] sm:w-[390px] md:w-[430px] lg:w-[450px] shrink-0 snap-start flex flex-col"
            >
              <TiltCard className="flex flex-1 flex-col" maxTilt={6}>
                <article
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCardClick(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  className="group relative flex flex-1 flex-col overflow-hidden rounded-xl border border-white/8 bg-card transition-all duration-300 hover:border-white/25 hover:bg-[#16181f] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(255,255,255,0.04)] active:scale-[0.99] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {/* Image Banner */}
                  <div className="relative h-52 w-full overflow-hidden border-b border-white/8 bg-black/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />

                    {/* Category & Featured Badge */}
                    <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5">
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-black/75 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm shadow-sm">
                          <Sparkles className="h-3 w-3 text-zinc-300" />
                          Featured
                        </span>
                      )}
                      <span className="rounded-md border border-white/10 bg-black/65 px-2 py-0.5 text-[11px] font-medium text-zinc-300 backdrop-blur-sm">
                        {project.categoryLabel}
                      </span>
                    </div>

                    {/* Hover Click Hint Pill */}
                    <div className="absolute right-3.5 bottom-3.5 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
                      <span className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-black/80 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                        Click for details
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-white">
                        {project.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-secondary line-clamp-1">
                        {project.tagline}
                      </p>

                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-300 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Highlight metrics / features */}
                      {project.features.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.features.slice(0, 3).map((f) => (
                            <span
                              key={f}
                              className="rounded border border-white/6 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-400"
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
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 text-xs font-medium text-zinc-300 transition-all hover:border-white/25 hover:text-white hover:bg-white/5 active:scale-95"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>Code</span>
                        </a>
                      ) : (
                        <div />
                      )}

                      <span className="inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-3 text-xs font-medium text-white transition-all group-hover:bg-white/15 group-hover:border-white/30">
                        <span>
                          {project.grouped ? "View Dashboards" : "Full Details"}
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal (Smoothly scrollable with mouse wheel & trackpad) */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[160] flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md overflow-hidden"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative flex flex-col max-h-[92vh] sm:max-h-[88vh] w-full max-w-2xl rounded-2xl border border-white/15 bg-[#121419] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-white/8 bg-[#121419]/90 px-6 py-4 backdrop-blur-md z-10 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                    {selectedProject.categoryLabel}
                  </span>
                  {selectedProject.featured && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white">
                      <Sparkles className="h-3 w-3 text-zinc-300" />
                      Featured
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-all hover:bg-white/15 hover:border-white/25 hover:text-white active:scale-95"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable Modal Content Container with Lenis prevented */}
              <div
                data-lenis-prevent="true"
                className="overflow-y-auto overscroll-contain p-6 sm:p-7 space-y-6 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-white/30"
              >
                {/* Header Title & Tagline */}
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="mt-1 text-sm text-secondary">
                    {selectedProject.tagline}
                  </p>
                </div>

                {/* Hero Banner Image */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-inner">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-52 w-full object-cover sm:h-64"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121419]/60 via-transparent to-transparent" />
                </div>

                {/* Comprehensive Description */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-secondary">
                    About Project
                  </h4>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-300">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Key Features & Highlights */}
                {selectedProject.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-secondary">
                      Key Highlights & Architecture
                    </h4>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {selectedProject.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-2.5 rounded-lg border border-white/6 bg-white/[0.02] p-2.5 text-xs sm:text-sm text-zinc-300"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-zinc-400 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subprojects / Grouped Dashboards (e.g. Power BI Suite) */}
                {selectedProject.grouped && selectedProject.subProjects && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-zinc-400" />
                      <h4 className="text-xs font-mono uppercase tracking-wider text-secondary">
                        Included Dashboards ({selectedProject.subProjects.length})
                      </h4>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {selectedProject.subProjects.map((sub) => (
                        <div
                          key={sub.id}
                          className="group/sub flex flex-col justify-between rounded-xl border border-white/8 bg-white/[0.02] p-3.5 transition-all hover:border-white/20 hover:bg-white/[0.04]"
                        >
                          <div>
                            <div className="mb-2.5 h-28 overflow-hidden rounded-lg border border-white/6 bg-black/40">
                              <img
                                src={sub.image}
                                alt={sub.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover/sub:scale-105"
                              />
                            </div>
                            <h5 className="font-semibold text-white text-sm">
                              {sub.title}
                            </h5>
                            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                              {sub.description}
                            </p>
                          </div>
                          <div className="mt-3 flex items-center justify-between border-t border-white/6 pt-2.5">
                            <span className="text-[10px] text-zinc-400 font-mono">
                              {sub.tech.join(" · ")}
                            </span>
                            <a
                              href={sub.github}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-white hover:bg-white/10 transition-colors"
                            >
                              <Github className="h-3 w-3" />
                              <span>Code</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-secondary">
                    Technologies & Libraries
                  </h4>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky Modal Bottom Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-white/8 bg-[#121419]/90 px-6 py-4 backdrop-blur-md shrink-0">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-4 text-xs font-medium text-white transition-all hover:bg-white/20 active:scale-95"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>View Repository</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex h-9 items-center rounded-lg border border-white/10 bg-white/[0.03] px-4 text-xs font-medium text-zinc-300 transition-all hover:bg-white/10 hover:text-white active:scale-95"
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
