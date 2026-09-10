"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, Download, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function Navbar({ onCommand }: { onCommand?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(NAV_ITEMS.map((i) => i.id));

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-200",
          scrolled
            ? "border-b border-white/8 bg-[#0a0a0c]/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNav(e, "home")}
            className="group relative z-50 flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg p-1"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 font-display text-xs font-semibold text-white transition-all duration-200 group-hover:border-white/30 group-hover:bg-white/10">
              SD
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-white transition-colors">
              Samyak Deshar
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex rounded-full border border-white/8 bg-white/[0.02] p-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNav(e, item.id)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200",
                    active === item.id
                      ? "text-white"
                      : "text-secondary hover:text-white"
                  )}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-white/12 bg-white/8"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onCommand}
              className="hidden h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 text-xs text-secondary transition-all hover:border-white/20 hover:text-white sm:flex"
              aria-label="Open command palette"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                ⌘K
              </kbd>
            </button>

            <a
              href="/samyakdeshar.pdf"
              download="Samyak-Deshar-Resume.pdf"
              className="hidden h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3.5 text-xs font-medium text-white transition-all hover:bg-white/10 hover:border-white/30 sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5 text-zinc-400" />
              <span>Resume</span>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="absolute right-0 top-0 flex h-full w-[80%] max-w-xs flex-col overflow-y-auto border-l border-white/10 bg-[#111216] p-6 pt-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                  Navigation
                </span>
              </div>

              <ul className="space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNav(e, item.id)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all",
                        active === item.id
                          ? "bg-white/10 text-white font-semibold"
                          : "text-secondary hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-xs text-zinc-600">
                        0{i + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-2 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onCommand?.();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
                >
                  <Command className="h-3.5 w-3.5" />
                  <span>Search (⌘K)</span>
                </button>

                <a
                  href="/samyakdeshar.pdf"
                  download="Samyak-Deshar-Resume.pdf"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 text-xs font-semibold text-black transition-colors hover:bg-zinc-200"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Resume</span>
                </a>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10">
                <div className="flex items-center justify-around text-secondary">
                  <a
                    href="https://github.com/Sleepyhead46"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/samyak-deshar-081917279/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:sdeshar9803@gmail.com"
                    className="p-2 hover:text-white transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
