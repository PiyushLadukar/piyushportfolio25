import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  target?: string;
  download?: boolean | string;
  type?: "button" | "submit" | "reset";
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  target,
  download,
  type = "button",
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-gradient-aurora text-primary-foreground shadow-glow hover:brightness-110"
      : variant === "outline"
      ? "border border-border bg-background/60 backdrop-blur hover:bg-background"
      : "text-foreground hover:text-primary";

  const inner = (
    <motion.span style={{ x: sx, y: sy }} className="flex items-center gap-2">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as any}
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
        download={download}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`${base} ${styles} ${className}`}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as any}
      type={type}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {inner}
    </motion.button>
  );
}
