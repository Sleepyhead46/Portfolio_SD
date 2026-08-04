"use client";

import { ArrowUp, Github, Linkedin, Mail, Phone } from "lucide-react";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Sleepyhead46", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samyak-deshar-081917279/",
    icon: Linkedin,
  },
  { label: "Email", href: "mailto:sdeshar9803@gmail.com", icon: Mail },
  { label: "Phone", href: "tel:+9779847903839", icon: Phone },
];

export function Footer() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/8 px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        {/* Brand */}
        <div className="text-center md:text-left">
          <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 font-display text-xs font-bold text-white">
              SD
            </span>
            <span className="font-display text-sm font-semibold text-white">
              © 2026 Samyak Deshar
            </span>
          </div>
          <p className="text-sm text-secondary">
            Built with Next.js, TypeScript, Tailwind CSS, and passion for data.
          </p>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-secondary transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/10"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* Back to top */}
        <button
          onClick={scrollTop}
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-secondary transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/10"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
