import { motion } from "framer-motion";
import { SKILLS, MARQUEE } from "@/constants/data";
import { SectionHeading } from "./About";
import { getTechIcon } from "@/constants/techIcons";

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Skills" title={<>The <span className="text-gradient">toolkit</span> I build with</>} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -6 }}
              onMouseMove={(e) => {
                const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
              className="group relative overflow-hidden rounded-2xl glass p-6"
            >
              {/* gradient border on hover */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100
                bg-[conic-gradient(from_var(--a,0deg)_at_var(--mx,50%)_var(--my,50%),_oklch(0.78_0.16_210/0.35),_oklch(0.62_0.24_295/0.35),_transparent_40%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),_oklch(0.62_0.24_265/0.14),_transparent_60%)]" />

              <div className="relative mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">{cat.category}</h3>
                <span className="rounded-full bg-background/60 px-2 py-0.5 text-[10px] text-muted-foreground">{cat.items.length}</span>
              </div>
              <div className="relative flex flex-wrap gap-2">
                {cat.items.map((s, idx) => {
                  const { Icon, color } = getTechIcon(s);
                  return (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * idx, type: "spring", stiffness: 220 }}
                      whileHover={{ y: -3, scale: 1.06 }}
                      className="group/chip inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur transition-all hover:border-primary/40 hover:text-foreground hover:shadow-glow"
                    >
                      <Icon style={{ color }} className="text-[14px] transition-transform duration-300 group-hover/chip:rotate-[-8deg] group-hover/chip:scale-110" />
                      {s}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Single horizontal running skill rail */}
        <div className="mt-16">
          <RunningRow direction="left" />
        </div>
      </div>
    </section>
  );
}

function RunningRow({ direction }: { direction: "left" | "right" }) {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee overflow-hidden">
      <div
        className="flex w-max animate-marquee gap-4 pr-4"
        style={{ animationDirection: direction === "left" ? "normal" : "reverse" }}
      >
        {items.map((t, i) => {
          const { Icon, color } = getTechIcon(t);
          return (
            <span
              key={`${t}-${i}`}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border/70 bg-background/70 px-5 py-2.5 font-display text-base font-semibold text-foreground/80 backdrop-blur transition-colors hover:border-primary/40 sm:text-lg"
            >
              <Icon style={{ color }} className="text-lg sm:text-xl" />
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
}
