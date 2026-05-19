import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, type MouseEvent } from "react";
import { FiExternalLink, FiGithub, FiX, FiFileText, FiArrowUpRight } from "react-icons/fi";
import { PROJECTS, type Project } from "@/constants/data";
import { SectionHeading } from "./About";
import { getTechIcon } from "@/constants/techIcons";

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Projects"
          title={<>Selected <span className="text-gradient">work &amp; experiments</span></>}
        />
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A mix of civic-tech, AI systems and full-stack products — shipped, deployed, and in active development.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && <ProjectModal p={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: (i % 3) * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-2"
    >
      {/* spotlight */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(500px_circle_at_var(--mx,50%)_var(--my,50%),_oklch(0.62_0.24_265/0.18),_transparent_55%)]" />
      {/* aurora border on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100
        bg-[conic-gradient(from_140deg,_oklch(0.78_0.16_210/0.5),_oklch(0.62_0.24_295/0.5),_oklch(0.62_0.24_260/0.5),_oklch(0.78_0.16_210/0.5))]" style={{ WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor" as never, maskComposite: "exclude", padding: 1 }} />

      <button
        onClick={onOpen}
        className="relative block w-full overflow-hidden rounded-2xl text-left"
        aria-label={`View ${p.name} case study`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover object-top"
            initial={{ scale: 1.05 }}
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
          {p.status && (
            <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary backdrop-blur">
              {p.status}
            </span>
          )}
          {/* hover arrow */}
          <div className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-background/90 text-primary opacity-0 shadow-glow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <FiArrowUpRight />
          </div>
        </div>
      </button>

      <div className="relative z-[2] flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold sm:text-xl">{p.name}</h3>
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{p.tagline}</p>
          </div>
          <div className="flex shrink-0 gap-1.5">
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" aria-label="Live" onClick={(e) => e.stopPropagation()}
                className="grid h-8 w-8 place-items-center rounded-full glass transition-all hover:-translate-y-0.5 hover:text-primary">
                <FiExternalLink className="text-sm" />
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" aria-label="GitHub" onClick={(e) => e.stopPropagation()}
                className="grid h-8 w-8 place-items-center rounded-full glass transition-all hover:-translate-y-0.5 hover:text-primary">
                <FiGithub className="text-sm" />
              </a>
            )}
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-foreground/80">{p.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.slice(0, 5).map((t) => {
            const { Icon, color } = getTechIcon(t);
            return (
              <span key={t} className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/60 px-2 py-0.5 text-[11px] text-foreground/75">
                <Icon style={{ color }} className="text-[11px]" />
                {t}
              </span>
            );
          })}
          {p.tech.length > 5 && (
            <span className="rounded-full border border-border/70 bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground">+{p.tech.length - 5}</span>
          )}
        </div>

        <button onClick={onOpen} className="mt-auto pt-5 text-left text-xs font-medium text-primary underline-offset-4 hover:underline">
          View case study →
        </button>
      </div>
    </motion.div>
  );
}

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", damping: 22, stiffness: 220 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl glass-strong shadow-glow"
      >
        <button onClick={onClose} aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/80 backdrop-blur">
          <FiX />
        </button>
        <div className="aspect-[16/9] overflow-hidden">
          <img src={p.image} alt={p.name} className="h-full w-full object-cover object-top" />
        </div>
        <div className="p-7">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">{p.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
          <p className="mt-5 leading-relaxed text-foreground/90">{p.long}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tech.map((t) => {
              const { Icon, color } = getTechIcon(t);
              return (
                <span key={t} className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-[11px] text-foreground/80">
                  <Icon style={{ color }} /> {t}
                </span>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-aurora px-4 py-2 text-xs font-medium text-white shadow-glow">
                <FiExternalLink /> Live Preview
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-xs font-medium">
                <FiGithub /> GitHub
              </a>
            )}
            {p.extra && (
              <a href={p.extra.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-xs font-medium">
                <FiFileText /> {p.extra.label}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
