import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { PERSONAL, NAV_LINKS } from '../constants';
import { useInView } from '../hooks';

export default function Footer() {
  const [ref, inView] = useInView();

  const handleNav = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden py-16 px-6">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-display font-bold"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}>
                PL
              </div>
              <span className="font-display font-bold text-xl">Piyush Ladukar</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-body">
              Building intelligent systems and impactful products. Available for internships and collaborations.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: FiGithub, href: PERSONAL.github, label: 'GitHub' },
                { icon: FiLinkedin, href: PERSONAL.linkedin, label: 'LinkedIn' },
                { icon: FiMail, href: `mailto:${PERSONAL.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all duration-300 border border-white/10 hover:border-cyan-500/30">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-widest text-slate-300">Navigate</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors font-body"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-widest text-slate-300">Status</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to Internships
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                B.Tech CSE — 8.4 CGPA
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                Nagpur, India
              </div>
              <a href={`mailto:${PERSONAL.email}`}
                className="inline-block mt-4 px-4 py-2 rounded-lg text-xs font-mono text-cyan-400 border border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/5 transition-all">
                {PERSONAL.email}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-500 text-sm font-body flex items-center gap-2"
          >
            Designed & Built by{' '}
            <span className="gradient-text font-semibold">Piyush Rajendra Ladukar</span>
            {' '}with{' '}
            <FiHeart className="text-red-400 inline" size={13} />
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-slate-600 text-xs font-mono"
          >
            React · Framer Motion · GSAP · Tailwind · Vite
          </motion.p>
        </div>
      </div>
    </footer>
  );
}