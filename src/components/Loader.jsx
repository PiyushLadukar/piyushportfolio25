import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  const lines = [
    '> Initializing portfolio...',
    '> Loading AI systems...',
    '> Compiling projects...',
    '> Deploying UI...',
    '> Ready.',
  ];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#03050d]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-500 opacity-10 blur-[80px] animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-600 opacity-10 blur-[80px] animate-blob" style={{ animationDelay: '2s' }} />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
            className="relative mb-10"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-display font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                boxShadow: '0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(124,58,237,0.2)',
              }}
            >
              PL
            </div>
            <div className="absolute inset-0 rounded-2xl animate-ping opacity-20"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
            />
          </motion.div>

          {/* Terminal lines */}
          <div className="mb-8 w-80 font-mono text-sm">
            {lines.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: progress > (i * 20) ? 1 : 0, x: progress > (i * 20) ? 0 : -20 }}
                transition={{ duration: 0.3 }}
                className="mb-1"
                style={{ color: i === lines.length - 1 ? '#00d4ff' : 'rgba(148,163,184,0.8)' }}
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-80 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
                width: `${Math.min(progress, 100)}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Percentage */}
          <div className="mt-3 font-mono text-xs text-slate-500">
            {Math.min(Math.floor(progress), 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}