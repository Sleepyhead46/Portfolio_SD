"use client";

import { Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import certifications from "@/data/certifications.json";

const ICONS: Record<string, typeof Award> = {
  certificate: ShieldCheck,
  award: Award,
};

export function Certifications() {
  return (
    <section id="certifications" className="relative px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          description="Industry credentials validating practical skills in data analytics, machine learning, and business intelligence."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {certifications.map((cert, i) => {
            const Icon = ICONS[cert.icon] ?? Award;
            return (
              <Reveal key={cert.id} delay={i * 0.1}>
                <div className="group relative h-full rounded-xl border border-white/8 bg-card p-6 sm:p-7 transition-all duration-200 hover:border-white/18 hover:bg-[#16181f]">
                  <div className="flex flex-col justify-between h-full space-y-4">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-secondary">
                            {cert.year}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400">
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                            Verified
                          </span>
                        </div>

                        <h3 className="font-display text-base sm:text-lg font-bold leading-snug text-white">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-secondary mt-0.5">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 pt-2 border-t border-white/6">
                      {cert.description}
                    </p>
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
