import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ABOUT } from "@/constants/data";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const isFloat = !Number.isInteger(value);
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(value);
      void isFloat;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  const display = Number.isInteger(value) ? Math.round(n).toString() : n.toFixed(1);
  return <span ref={ref}>{display}{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="About" title={<>Engineer building <span className="text-gradient">at the edge of AI</span></>} />

        <div className="mt-12 grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8"
          >
            <p className="text-lg leading-relaxed text-foreground/90">{ABOUT.intro}</p>
            <ul className="mt-6 space-y-3">
              {ABOUT.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-aurora" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {ABOUT.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl glass p-5"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-aurora opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
                <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  align = "left",
}: {
  kicker: string;
  title: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-aurora" />
        <span className="uppercase tracking-[0.2em] text-muted-foreground">{kicker}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
