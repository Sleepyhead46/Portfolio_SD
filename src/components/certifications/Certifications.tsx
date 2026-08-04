"use client";

import { Award, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import certifications from "@/data/certifications.json";

const ICONS: Record<string, typeof Award> = {
  certificate: ShieldCheck,
  award: Award,
};

export function Certifications() {
  return (
    <section id="certifications" className="relative px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          description="Professional credentials validating expertise in data science and analytics."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((cert, i) => {
            const Icon = ICONS[cert.icon] ?? Award;
            return (
              <Reveal key={cert.id} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card/60 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-card hover:shadow-glow">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-start gap-5">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                      style={{ color: cert.color }}
                    >
                      <Icon className="h-7 w-7" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-accent">
                          {cert.year}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold leading-snug text-white">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-accent">{cert.issuer}</p>
                      <p className="text-sm leading-relaxed text-secondary">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
