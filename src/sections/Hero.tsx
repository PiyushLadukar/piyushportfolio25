import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiDownload, FiAward, FiCode, FiCpu, FiZap } from "react-icons/fi";
import { PROFILE, ABOUT } from "@/constants/data";
import { MagneticButton } from "@/components/MagneticButton";

export function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-6 pt-28">
      {/* Hero-specific cinematic background */}
      <HeroBackdrop />

      {/* Floating glass stat cards (replaces vertical skill rails) */}
      <FloatingCard className="left-3 top-[20%] hidden lg:flex" delay={0.4} icon={<FiAward />} label="CGPA" value="8.4" tint="from-cyan-glow/30" />
      <FloatingCard className="left-6 bottom-[18%] hidden lg:flex" delay={0.6} icon={<FiCode />} label="Projects" value="7+" tint="from-violet-glow/30" />
      <FloatingCard className="right-4 top-[18%] hidden lg:flex" delay={0.5} icon={<FiZap />} label="Hackathons" value="12+" tint="from-primary/30" />
      <FloatingCard className="right-3 bottom-[22%] hidden lg:flex" delay={0.7} icon={<FiCpu />} label="Stack" value="Full" tint="from-cyan-glow/30" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-muted-foreground">Available for opportunities · Remote / India</span>
          </motion.div>

          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <Reveal>Hi, I'm</Reveal>{" "}
            <Reveal delay={0.1}>
              <span className="text-gradient">Piyush</span>
            </Reveal>
            <br />
            <Reveal delay={0.2}>Rajendra</Reveal>{" "}
            <Reveal delay={0.3}>Ladukar.</Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-5 text-base text-muted-foreground sm:text-lg"
          >
            Full-Stack Engineer · Backend · AI · Data Science
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-3 flex items-center gap-2 font-mono text-sm sm:text-base"
          >
            <span className="text-muted-foreground">{">"}</span>
            <TypeAnimation
              sequence={PROFILE.roles as (string | number)[]}
              wrapper="span"
              speed={45}
              className="text-gradient font-medium"
              repeat={Infinity}
            />
            <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#projects" variant="primary">
              View Projects <FiArrowDown />
            </MagneticButton>
            <MagneticButton href={PROFILE.resume} target="_blank" variant="outline">
              <FiDownload /> Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Contact Me
            </MagneticButton>
          </motion.div>

          {/* Quick stat strip — replaces vertical rails for mobile/visual interest */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
            className="mt-8 grid max-w-md grid-cols-4 gap-3"
          >
            {ABOUT.stats.map((s) => (
              <div key={s.label} className="rounded-xl glass px-2 py-3 text-center">
                <div className="font-display text-lg font-bold text-gradient">
                  {s.value}{s.suffix}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05 }}
            className="mt-6 flex items-center gap-3 text-muted-foreground"
          >
            <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full glass transition-all hover:-translate-y-0.5 hover:text-primary"><FiGithub /></a>
            <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full glass transition-all hover:-translate-y-0.5 hover:text-primary"><FiLinkedin /></a>
            <a href={PROFILE.socials.email} className="grid h-10 w-10 place-items-center rounded-full glass transition-all hover:-translate-y-0.5 hover:text-primary"><FiMail /></a>
          </motion.div>
        </div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto aspect-square w-[260px] sm:w-[340px] md:w-[400px]"
        >
          <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,_oklch(0.62_0.24_265/0.35),_transparent_60%)] blur-2xl animate-pulse-glow" />
          <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,_oklch(0.78_0.16_210),_oklch(0.62_0.24_260),_oklch(0.62_0.24_295),_oklch(0.78_0.16_210))] opacity-80" />
          <div className="absolute inset-[6px] rounded-full bg-background" />
          <motion.div
            aria-hidden
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-14px] rounded-full border border-dashed border-primary/30"
          />
          <div className="absolute inset-[10px] overflow-hidden rounded-full glass-strong animate-float shadow-glow">
            <img
              src={PROFILE.avatar}
              alt={PROFILE.name}
              className="h-full w-full object-cover"
              width={400}
              height={400}
            />
          </div>
          <div className="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-cyan-glow shadow-glow animate-pulse" />
          <div className="absolute -bottom-1 -left-3 h-2 w-2 rounded-full bg-violet-glow shadow-glow animate-pulse" />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted-foreground md:flex"
      >
        <span>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <FiArrowDown />
        </motion.div>
      </motion.a>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* perspective grid floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[60%] opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.62 0.24 265 / 0.18) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.62 0.24 265 / 0.18) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(700px) rotateX(60deg)",
          transformOrigin: "center bottom",
          maskImage: "linear-gradient(to top, black 10%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 80%)",
        }}
      />
      {/* aurora orbs */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_oklch(0.78_0.16_210/0.45),_transparent_65%)] blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -40, 20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 top-32 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,_oklch(0.62_0.24_295/0.40),_transparent_65%)] blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl
          bg-[conic-gradient(from_0deg_at_50%_50%,_oklch(0.78_0.16_210/0.25),_oklch(0.62_0.24_295/0.30),_oklch(0.62_0.24_260/0.25),_oklch(0.78_0.16_210/0.25))] opacity-60"
      />
      {/* soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,_transparent_40%,_oklch(0.99_0.005_250/0.6)_100%)]" />
    </div>
  );
}


function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function FloatingCard({
  className = "",
  delay = 0,
  icon,
  label,
  value,
  tint = "from-primary/30",
}: {
  className?: string;
  delay?: number;
  icon: React.ReactNode;
  label: string;
  value: string;
  tint?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute z-0 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex items-center gap-3 rounded-2xl glass px-4 py-3 shadow-glow"
      >
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tint} to-transparent opacity-60`} />
        <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-background/70 text-primary">
          {icon}
        </span>
        <div className="relative">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="font-display text-base font-bold">{value}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
