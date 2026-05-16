import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import SectionHeading from '../components/SectionHeading';
import FloatingOrbs from '../components/FloatingOrbs';
import { EXPERIENCE } from '../constants';
import { FiBriefcase, FiArrowRight } from 'react-icons/fi';

function ExperienceCard({ exp, index }) {
  const [ref, inView] = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative pl-10 md:pl-16"
    >
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 to-purple-500 opacity-30" />
      <div className="absolute left-[11px] top-6 w-4 h-4 rounded-full border-2 border-white shadow-md"
        style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
      />

      <div className="glass border border-white/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <FiBriefcase size={15} />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">{exp.role}</h3>
            </div>
            <div className="font-body text-slate-700 font-medium ml-10">{exp.company}</div>
            <div className="text-xs text-slate-500 font-body ml-10 mt-0.5">{exp.fullName}</div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="tag">{exp.type}</span>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{exp.period}</span>
          </div>
        </div>

        <p className="text-slate-500 text-sm font-body leading-relaxed mb-5 italic border-l-2 border-cyan-200 pl-4">
          {exp.description}
        </p>

        <div className="mb-5">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Key Contributions</div>
          <ul className="space-y-2">
            {exp.responsibilities.map((r, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-3 text-sm text-slate-600 font-body"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                {r}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {exp.tech.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 bg-white overflow-hidden">
      <FloatingOrbs variant="subtle" />
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          label="Work Experience"
          title="Professional"
          highlight="Timeline"
          subtitle="Where I've worked and what I've built in professional settings."
        />

        <div className="relative">
          {EXPERIENCE.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} />
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative pl-10 md:pl-16"
          >
            <div className="absolute left-4 top-0 h-8 w-px bg-gradient-to-b from-purple-400 to-transparent opacity-30" />
            <div className="absolute left-[10px] top-3 w-5 h-5 rounded-full border-2 border-dashed border-cyan-300 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div className="glass border border-dashed border-cyan-200 rounded-2xl p-5 flex items-center gap-4">
              <FiArrowRight size={22} className="text-cyan-400 flex-shrink-0" />
              <div>
                <div className="font-display font-semibold text-slate-700">Next Chapter</div>
                <div className="text-sm text-slate-500 font-body">Open to internships and collaborations in Backend, AI, or Full-Stack roles.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}