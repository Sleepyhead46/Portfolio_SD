"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Phone, MapPin } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { ParticleField } from "@/components/particles/ParticleField";
import { GridPattern } from "@/components/shared/GridPattern";
import { MagneticButton } from "@/components/shared/MagneticButton";

const Hero3D = dynamic(() => import("./Hero3D").then((m) => m.Hero3D), {
  ssr: false,
  loading: () => null,
});

const ROLES = [
  "Data Scientist",
  "Machine Learning Engineer",
  "Data Analyst",
  "AI Systems Developer",
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samyak-deshar-081917279/",
    icon: Lik,
  },
  { label: "Email", href: "mailto:sdeshar9803@gmail.com", icon: Mail },
  { label: "Phone", href: "tel:+9779847903839", icon: Phone },
];

function Lik({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const typed = useTypewriter(ROLES);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 lg:px-8"
    >
      {/* Clean subtle grid background */}
      <GridPattern />
      <ParticleField count={30} />
      
      {/* 3D Wireframe Scene */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <Hero3D />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.05 },
            },
          }}
          className="space-y-6"
        >
          {/* Top Status Badges */}
          <motion.div variants={itemAnim} className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for Opportunities
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400 backdrop-blur-sm">
              <MapPin className="h-3 w-3 text-zinc-400" />
              <span>Kathmandu, Nepal</span>
            </div>
          </motion.div>

          {/* Name Heading */}
          <motion.div variants={itemAnim} className="space-y-2">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Samyak Deshar
            </h1>
          </motion.div>

          {/* Typewriter Role */}
          <motion.div
            variants={itemAnim}
            className="mx-auto flex min-h-[2.5rem] items-center justify-center gap-2 font-mono text-base text-zinc-300 sm:text-xl md:text-2xl"
          >
            <span className="text-zinc-500">{"\u003E"}</span>
            <span className="text-white font-medium">{typed}</span>
            <span className="inline-block h-5 w-0.5 animate-pulse bg-white/70" />
          </motion.div>

          {/* Subtitle / Bio */}
          <motion.p
            variants={itemAnim}
            className="mx-auto max-w-2xl text-sm leading-relaxed text-secondary sm:text-base md:text-lg"
          >
            Turning complex data into predictive intelligence, production-ready machine
            learning pipelines, and executive dashboards. Focused on Python, TensorFlow,
            Power BI, and practical AI systems.
          </motion.p>

          {/* Action CTAs: Solid White Primary, Outline Secondary */}
          <motion.div
            variants={itemAnim}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <MagneticButton>
              <button
                onClick={() => scrollTo("projects")}
                className="group inline-flex h-11 items-center gap-2 rounded-lg bg-white px-6 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-zinc-200 active:scale-95 shadow-subtle"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </MagneticButton>

            <MagneticButton>
              <a
                href="/samyakdeshar.pdf"
                download="Samyak-Deshar-Resume.pdf"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.02] px-5 text-xs sm:text-sm font-medium text-white transition-all hover:bg-white/[0.08] hover:border-white/30 active:scale-95"
              >
                <Download className="h-4 w-4 text-zinc-400" />
                <span>Download Resume</span>
              </a>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.02] px-5 text-xs sm:text-sm font-medium text-white transition-all hover:bg-white/[0.08] hover:border-white/30 active:scale-95"
              >
                <Mail className="h-4 w-4 text-zinc-400" />
                <span>Contact Me</span>
              </button>
            </MagneticButton>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={itemAnim}
            className="flex items-center justify-center gap-2.5 pt-3"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-zinc-400 transition-all duration-200 hover:border-white/25 hover:text-white hover:bg-white/5"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
