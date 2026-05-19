import { motion } from "framer-motion";
import { EXPERIENCE } from "@/constants/data";
import { SectionHeading } from "./About";

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Experience" title={<>Where I've <span className="text-gradient">shipped</span></>} />

        <div className="relative mt-12 pl-6 md:pl-10">
          <div className="absolute left-2 top-2 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-primary/60 via-primary/20 to-transparent md:left-4" />
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={e.role + e.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative mb-8 last:mb-0"
            >
              <div className="absolute -left-[18px] top-3 h-3 w-3 rounded-full bg-gradient-aurora shadow-glow md:-left-[26px]" />
              <div className="rounded-2xl glass p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">
                    {e.role} <span className="text-muted-foreground">· {e.company}</span>
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{e.period}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-foreground/85">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.tech.map((t) => (
                    <span key={t} className="rounded-full border border-border/70 bg-background/60 px-2.5 py-0.5 text-[11px] text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
