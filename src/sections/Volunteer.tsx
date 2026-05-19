import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiHeart } from "react-icons/fi";
import { VOLUNTEER } from "@/constants/data";
import { SectionHeading } from "./About";

export function Volunteer() {
  return (
    <section id="volunteer" className="relative px-6 py-28">
      {/* soft ambient gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-20 -z-10 mx-auto h-[420px] max-w-5xl rounded-full bg-[radial-gradient(ellipse_at_center,_oklch(0.62_0.24_295/0.18),_transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Volunteering"
          title={<>Beyond <span className="text-gradient">the code</span></>}
        />
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Leadership and community roles I've held — building, organising and serving outside the IDE.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {VOLUNTEER.map((v, i) => (
            <motion.article
              key={`${v.organization}-${v.position}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
              className="group relative overflow-hidden rounded-3xl glass p-5 transition-shadow duration-500 hover:shadow-glow sm:p-6"
            >
              {/* gradient aurora border on hover */}
              <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100
                bg-[conic-gradient(from_140deg,_oklch(0.78_0.16_210/0.55),_oklch(0.62_0.24_295/0.55),_oklch(0.62_0.24_260/0.55),_oklch(0.78_0.16_210/0.55))]"
                style={{ WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor" as never, maskComposite: "exclude", padding: 1 }} />
              {/* cursor spotlight */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100
                bg-[radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),_oklch(0.62_0.24_265/0.12),_transparent_60%)]" />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-stretch">
                {/* image */}
                <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-2xl sm:h-36 sm:w-36">
                  <img
                    src={v.image}
                    alt={v.organization}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/50 via-transparent to-transparent" />
                  <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-medium text-foreground/80 backdrop-blur">
                    <FiHeart className="text-rose-500" /> Volunteer
                  </div>
                </div>

                {/* details */}
                <div className="relative flex min-w-0 flex-1 flex-col justify-center">
                  <h3 className="font-display text-xl font-semibold leading-tight">{v.position}</h3>
                  <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-foreground/85">
                    <FiMapPin className="text-primary" />
                    <span className="truncate">{v.organization}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FiCalendar />
                    <span>{v.duration}</span>
                  </div>

                  <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-aurora" />
                    Community Leadership
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
