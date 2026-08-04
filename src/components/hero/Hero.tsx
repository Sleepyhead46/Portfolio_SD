"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, ChevronDown, Phone } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { ParticleField } from "@/components/particles/ParticleField";
import { GridPattern } from "@/components/shared/GridPattern";
import { MagneticButton } from "@/components/shared/MagneticButton";

const Hero3D = dynamic(() => import("./Hero3D").then((m) => m.Hero3D), {
  ssr: false,
  loading: () => null,
});

const ROLES = [
  "DATA SCIENTIST",
  "MACHINE LEARNING ENGINEER",
  "DATA ANALYST",
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

const counter = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export function Hero() {
  const typed = useTypewriter(ROLES);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-radial opacity-60" />
      <GridPattern />
      <ParticleField count={60} />
      <div className="pointer-events-none absolute inset-0">
        <Hero3D />
      </div>

      {/* Mouse glow */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <motion.div
          className="absolute h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-3xl"
          animate={{ x: ["-20%", "20%", "-20%"], y: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 2.2 } } }}
          className="space-y-6"
        >
          <motion.div
            variants={counter}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-secondary backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Available for opportunities
          </motion.div>

          <motion.h1
            variants={counter}
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            SAMYAK
            <br />
            <span className="bg-gradient-to-b from-white to-highlight bg-clip-text text-transparent">
              DESHAR
            </span>
          </motion.h1>

          <motion.div
            variants={counter}
            className="flex items-center justify-center gap-3 font-mono text-lg text-secondary sm:text-2xl"
          >
<span className="text-white/40">{"\u003E"}</span>
            <span className="h-8 text-accent sm:h-10">{typed}</span>
            <span className="h-8 w-[2px] animate-pulse bg-white sm:h-10" />
          </motion.div>

          <motion.p
            variants={counter}
            className="mx-auto max-w-2xl text-base leading-relaxed text-secondary sm:text-lg"
          >
            Transforming data into intelligent solutions through analytics,
            machine learning, and automation.
          </motion.p>

          <motion.div
            variants={counter}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <MagneticButton>
              <button
                onClick={() => scrollTo("projects")}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-elevated px-7 text-sm font-medium text-white ring-1 ring-white/15 transition-all duration-300 hover:ring-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </MagneticButton>

            <MagneticButton>
              <a
                href="/samyakdeshar.pdf"
                download="Samyak-Deshar-Resume.pdf"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-7 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-7 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </button>
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={counter}
            className="flex items-center justify-center gap-3 pt-6"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-secondary transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/10"
              >
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-secondary transition-colors hover:text-white"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
