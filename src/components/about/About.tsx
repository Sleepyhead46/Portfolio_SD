"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

export function About() {
  return (
    <section id="about" className="relative px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Who I Am"
          title="About Me"
          description="A data professional at the intersection of analytics, machine learning, and automation."
        />

        <Reveal>
          <div className="space-y-6 text-center text-base leading-relaxed text-secondary md:text-lg">
            <p>
              Data professional with hands-on experience in machine learning,
              data analysis, dashboard development, and workflow automation.
              Skilled in building end-to-end data solutions using Python, SQL,
              Power BI, and Streamlit.
            </p>
            <p>
              Passionate about transforming raw data into meaningful insights
              and intelligent systems that drive better decision-making.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
