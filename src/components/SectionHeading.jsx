import { motion } from 'framer-motion';
import { useInView } from '../hooks';

export default function SectionHeading({ label, title, highlight, subtitle }) {
  const [ref, inView] = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="text-center mb-16"
    >
      {label && (
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-mono font-medium text-cyan-600 bg-cyan-50 border border-cyan-100">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          {label}
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
        {title}{' '}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-body">{subtitle}</p>
      )}
    </motion.div>
  );
}