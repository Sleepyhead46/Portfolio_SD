"use client";

import { ArrowUp, Github, Linkedin, Mail, Phone } from "lucide-react";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Sleepyhead46", icon: Github },
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

export function Footer() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/8 bg-[#0a0a0c] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        {/* Brand */}
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="flex h-7 w-7 items-center justify-center rounded border border-white/15 bg-white/5 font-display text-xs font-semibold text-white">
              SD
            </span>
            <span className="font-display text-sm font-semibold text-white">
              Samyak Deshar
            </span>
            <span className="text-xs text-secondary font-mono">© {new Date().getFullYear()}</span>
          </div>
          <p className="text-xs text-secondary mt-1">
            Data Scientist &amp; Machine Learning Engineer
          </p>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={s.label}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-zinc-400 transition-colors hover:border-white/25 hover:text-white"
            >
              <s.icon className="h-3.5 w-3.5" />
            </a>
          ))}

          {/* Back to top */}
          <button
            onClick={scrollTop}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-zinc-400 transition-colors hover:border-white/25 hover:text-white ml-2"
            aria-label="Back to top"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
