import { motion } from "framer-motion";

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* soft dotted grid */}
      <div className="absolute inset-0 dots-bg" />
      {/* subtle conic aurora */}
      <div className="absolute left-1/2 top-1/3 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.35] blur-3xl
        bg-[conic-gradient(from_120deg_at_50%_50%,_oklch(0.78_0.16_210/0.35),_oklch(0.62_0.24_295/0.30),_oklch(0.62_0.24_260/0.35),_oklch(0.78_0.16_210/0.35))]" />

      <motion.div
        className="absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,_oklch(0.78_0.16_210/0.30),_transparent_60%)] blur-2xl"
        animate={{ x: [0, 40, -20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_oklch(0.62_0.24_295/0.25),_transparent_60%)] blur-2xl"
        animate={{ x: [0, -30, 20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_oklch(0.62_0.24_260/0.22),_transparent_60%)] blur-2xl"
        animate={{ x: [0, 20, -30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* grain */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay
        [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
    </div>
  );
}
