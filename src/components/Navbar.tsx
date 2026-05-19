import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { NAV, PROFILE } from "@/constants/data";
import { MagneticButton } from "./MagneticButton";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[80] h-[2px] origin-left bg-gradient-aurora"
      />
      <header
        className={`fixed inset-x-0 top-2 z-[70] mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2 transition-all duration-300 ${
          scrolled ? "glass-strong shadow-soft" : "bg-transparent"
        }`}
      >
        <a href="#home" className="group flex items-center gap-2 pl-2">
          <span className="relative grid h-8 w-8 place-items-center rounded-full bg-gradient-aurora text-sm font-bold text-white shadow-glow">
            P
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
            {PROFILE.shortName}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <MagneticButton href={PROFILE.resume} target="_blank" variant="primary" className="!py-2 !px-5 !text-xs">
            Resume
          </MagneticButton>
        </div>

        <button
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-full glass md:hidden"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-3 top-[68px] z-[69] rounded-2xl glass-strong p-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm hover:bg-secondary"
              >
                {n.label}
              </a>
            ))}
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-xl bg-gradient-aurora px-4 py-3 text-center text-sm font-medium text-white shadow-glow"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}
