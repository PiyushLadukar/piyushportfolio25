import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiFileText, FiCode, FiGlobe, FiDatabase, FiCpu, FiZap, FiBarChart2, FiShield, FiCamera, FiBrain } from 'react-icons/fi';
import { useInView, useTilt } from '../hooks';
import SectionHeading from '../components/SectionHeading';
import FloatingOrbs from '../components/FloatingOrbs';
import { PROJECTS } from '../constants';

// Map project id to an icon
const PROJECT_ICONS = {
  1: FiGlobe,      // LokDrishti — civic/globe
  2: FiBarChart2,  // Farmers — analytics
  3: FiShield,     // AatankDrishti — security
  4: FiZap,        // Anomax — anomaly detection
  5: FiCamera,     // QR Scanner
  6: FiCpu,        // SecondBrain — AI
};

function ProjectModal({ project, onClose }) {
  const Icon = PROJECT_ICONS[project.id] || FiCode;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Banner */}
          <div className={`h-32 rounded-t-3xl bg-gradient-to-br ${project.color} flex items-center justify-between px-8 relative`}>
            <Icon size={48} className="text-white/80" />
            {project.badge && (
              <span className="text-xs font-mono text-white bg-black/30 px-3 py-1 rounded-full">
                {project.badge}
              </span>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
            >
              <FiX size={16} />
            </button>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-2xl text-slate-900">{project.title}</h3>
                <p className="text-slate-500 text-sm font-body">{project.tagline}</p>
              </div>
              <span className="tag text-xs">{project.status}</span>
            </div>

            <p className="text-slate-600 font-body leading-relaxed mb-6">
              {project.longDescription || project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="btn-outline flex items-center gap-2 text-sm" style={{ padding: '0.6rem 1.2rem' }}>
                  <FiGithub size={15} /> GitHub
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2 text-sm" style={{ padding: '0.6rem 1.2rem' }}>
                  <FiExternalLink size={15} /> Live Preview
                </a>
              )}
              {project.paper && (
                <a href={project.paper} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-full border border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors font-display font-semibold">
                  <FiFileText size={15} /> Research Paper
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  const tiltRef = useTilt();
  const [showModal, setShowModal] = useState(false);
  const Icon = PROJECT_ICONS[project.id] || FiCode;

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: (index % 3) * 0.12 }}
      >
        <div
          ref={tiltRef}
          onClick={() => setShowModal(true)}
          className="group glass border border-white/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
          style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
        >
          {/* Banner */}
          <div className={`h-32 bg-gradient-to-br ${project.color} flex items-center justify-between px-6 relative overflow-hidden`}>
            <Icon size={40} className="text-white/75" />
            {project.badge && (
              <span className="text-xs font-mono text-white bg-black/25 px-3 py-1.5 rounded-full">
                {project.badge}
              </span>
            )}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 transition-all duration-300">
                {project.title}
              </h3>
              <span className="text-xs tag shrink-0 ml-2">{project.status}</span>
            </div>
            <p className="text-slate-500 text-sm font-body mb-1">{project.tagline}</p>
            <p className="text-slate-600 text-sm font-body leading-relaxed mb-4 line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.slice(0, 4).map(t => (
                <span key={t} className="tag text-xs">{t}</span>
              ))}
              {project.tech.length > 4 && (
                <span className="tag text-xs">+{project.tech.length - 4} more</span>
              )}
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors font-mono">
                  <FiGithub size={13} /> Code
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 transition-colors font-mono">
                  <FiExternalLink size={13} /> Live
                </a>
              )}
              <span className="ml-auto text-xs text-slate-400 font-mono group-hover:text-cyan-500 transition-colors">
                Click to view details
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {showModal && <ProjectModal project={project} onClose={() => setShowModal(false)} />}
    </>
  );
}

export default function Projects() {
  const featured = PROJECTS.filter(p => p.featured);
  const others = PROJECTS.filter(p => !p.featured);

  return (
    <section id="projects" className="relative py-28 px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <FloatingOrbs />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          label="Selected Work"
          title="Projects &"
          highlight="Builds"
          subtitle="Things I've built — from civic AI to terrorism analytics to anomaly detection."
        />

        <div className="mb-10">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">Featured Projects</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">Other Projects</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-500 font-body text-sm mb-4">Want to see all my work?</p>
          <a
            href="https://github.com/piyushladukar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 text-sm"
          >
            <FiGithub size={16} /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}