import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS } from "@/constants/data";
import { SectionHeading } from "./About";
import { FiAward, FiCpu, FiUsers, FiZap } from "react-icons/fi";

const ICONS = [FiCpu, FiUsers, FiZap, FiAward];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{Math.round(n)}{suffix}</span>;
}

export function Achievements() {
  return (
    <section id="achievements" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Achievements" title={<>A few <span className="text-gradient">milestones</span></>} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map((a, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl glass p-6"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-aurora opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-50" />
                <div className="relative mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-aurora text-white shadow-glow">
                  <Icon />
                </div>
                <div className="font-display text-4xl font-bold text-gradient">
                  <Counter value={a.value} suffix={a.suffix} />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{a.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
