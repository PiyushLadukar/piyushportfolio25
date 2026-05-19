import { PROFILE } from "@/constants/data";
import { FiGithub, FiLinkedin, FiMail, FiGlobe } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-aurora text-sm font-bold text-white shadow-glow">
            P
          </span>
          <p className="text-sm text-muted-foreground">
            Designed &amp; Built by{" "}
            <span className="font-medium text-foreground">{PROFILE.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:text-primary"><FiGithub /></a>
          <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:text-primary"><FiLinkedin /></a>
          <a href={PROFILE.socials.portfolio} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:text-primary"><FiGlobe /></a>
          <a href={PROFILE.socials.email} className="grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:text-primary"><FiMail /></a>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {PROFILE.name}. Crafted with React, Framer Motion, GSAP &amp; Lenis.
      </div>
    </footer>
  );
}
