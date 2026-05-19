import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative h-24 w-24"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-aurora blur-2xl opacity-60" />
              <div className="relative flex h-full w-full items-center justify-center rounded-full glass-strong">
                <span className="font-display text-3xl font-bold text-gradient">P</span>
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: "oklch(0.62 0.24 265)",
                  borderRightColor: "oklch(0.78 0.16 210)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-[3px] rounded-full bg-gradient-aurora shadow-glow"
            />
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Booting cinematic mode
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
