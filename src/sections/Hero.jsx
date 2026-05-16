import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import { SiReact, SiPython, SiDocker, SiPostgresql, SiTensorflow, SiNodedotjs } from 'react-icons/si';
import { PERSONAL, FLOATING_CODE_SNIPPETS } from '../constants';
import FloatingOrbs from '../components/FloatingOrbs';

const socialLinks = [
  { icon: FiGithub, href: PERSONAL.github, label: 'GitHub' },
  { icon: FiLinkedin, href: PERSONAL.linkedin, label: 'LinkedIn' },
  { icon: FiMail, href: `mailto:${PERSONAL.email}`, label: 'Email' },
];

const typeStrings = [
  'AI Engineer', 2000,
  'Backend Developer', 2000,
  'Full Stack Builder', 2000,
  'Open Source Contributor', 2000,
  'Hackathon Builder', 2000,
  'Civic Tech Enthusiast', 2000,
];

export default function Hero() {
  const gridRef = useRef(null);

  const handleNav = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Animated grid bg */}
      <div ref={gridRef} className="absolute inset-0 grid-bg opacity-60" />

      {/* Floating orbs */}
      <FloatingOrbs variant="hero" />

      {/* Floating code snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FLOATING_CODE_SNIPPETS.map((snippet, i) => (
          <motion.div
            key={i}
            className="code-float absolute text-xs md:text-sm text-slate-800"
            style={{
              left: `${(i * 17 + 5) % 85}%`,
              top: `${(i * 13 + 8) % 80}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.04, 0.09, 0.04],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

        {/* Left — Text */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium text-cyan-700 bg-cyan-50 border border-cyan-200 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Available for Internships & Collaborations
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-slate-900 mb-4"
          >
            Hi, I'm{' '}
            <span className="block gradient-text">Piyush</span>
            Ladukar
          </motion.h1>

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-slate-500 font-body text-lg">I build as a</span>
            <span className="font-display font-bold text-xl text-slate-800">
              <TypeAnimation
                sequence={typeStrings}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ display: 'inline-block' }}
              />
            </span>
          </motion.div>

          {/* Sub-title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-slate-500 text-base md:text-lg font-body leading-relaxed mb-8 max-w-lg"
          >
            B.Tech CSE @ Jhulelal Institute of Technology · CGPA 8.4<br />
            Building civic-tech, AI systems, and full-stack apps that actually matter.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <button
              onClick={() => handleNav('#projects')}
              className="btn-primary flex items-center gap-2 text-sm relative z-10"
            >
              <span className="relative z-10">View Projects</span>
              <FiArrowRight size={16} className="relative z-10" />
            </button>
            <a
              href={PERSONAL.resumeUrl}
              download
              className="btn-outline flex items-center gap-2 text-sm"
            >
              <FiDownload size={16} />
              Resume
            </a>
            <button
              onClick={() => handleNav('#contact')}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-display font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Contact Me →
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-4"
          >
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Find me on</span>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass border border-slate-200 flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:border-cyan-300 hover:shadow-md transition-all duration-300 group"
                title={label}
              >
                <Icon size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — Photo + orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex items-center justify-center relative"
        >
          {/* Outer rotating ring */}
          <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-dashed border-cyan-300/40 animate-spin-slow" />
          <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-dashed border-purple-300/40 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />

          {/* Tech orbit dots */}
          {[
            { icon: SiReact, color: '#00d4ff' },
            { icon: SiPython, color: '#3b82f6' },
            { icon: SiDocker, color: '#0ea5e9' },
            { icon: SiPostgresql, color: '#7c3aed' },
            { icon: SiTensorflow, color: '#f97316' },
            { icon: SiNodedotjs, color: '#22c55e' },
          ].map(({ icon: Icon, color }, i) => {
            const angle = (i / 6) * 360;
            const rad = (angle * Math.PI) / 180;
            const r = 160;
            const x = Math.cos(rad) * r;
            const y = Math.sin(rad) * r;
            return (
              <motion.div
                key={i}
                className="absolute w-10 h-10 rounded-full glass border border-white/60 flex items-center justify-center shadow-sm"
                style={{ left: `calc(50% + ${x}px - 20px)`, top: `calc(50% + ${y}px - 20px)` }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <Icon size={18} style={{ color }} />
              </motion.div>
            );
          })}

          {/* Profile photo */}
          <motion.div
            className="relative z-10 w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden animated-border p-1 shadow-2xl"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 40px rgba(0,212,255,0.2), 0 0 80px rgba(124,58,237,0.1)' }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-cyan-100 to-purple-100 flex items-center justify-center">
              {/* ← Replace with your actual photo: <img src={PERSONAL.photo} alt="Piyush" className="w-full h-full object-cover" /> */}
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <span className="text-5xl">👨‍💻</span>
                <span className="text-xs font-mono">Add photo.jpg<br/>to /public/</span>
              </div>
            </div>
          </motion.div>

          {/* Floating badge */}
          <motion.div
            className="absolute -bottom-2 -left-4 glass border border-white/60 rounded-2xl px-4 py-2 shadow-lg"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            <div className="text-xs text-slate-500 font-mono">cgpa</div>
            <div className="font-display font-bold text-slate-800">8.4 / 10</div>
          </motion.div>

          <motion.div
            className="absolute -top-2 -right-4 glass border border-white/60 rounded-2xl px-4 py-2 shadow-lg"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          >
            <div className="text-xs text-slate-500 font-mono">hackathons</div>
            <div className="font-display font-bold text-slate-800">12+</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center pt-1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-cyan-500"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}