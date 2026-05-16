import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import SectionHeading from '../components/SectionHeading';
import FloatingOrbs from '../components/FloatingOrbs';
import { SKILLS, TECH_MARQUEE } from '../constants';
import { FiCode, FiLayout, FiServer, FiCpu, FiDatabase, FiTool } from 'react-icons/fi';

const categoryIcons = {
  Languages:           FiCode,
  Frontend:            FiLayout,
  Backend:             FiServer,
  'AI / ML':           FiCpu,
  Databases:           FiDatabase,
  'Tools & Platforms': FiTool,
};

function SkillBar({ skill, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-body font-medium text-slate-700">{skill.name}</span>
        <span className="text-xs font-mono text-slate-400">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #00d4ff, #7c3aed)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.3 + index * 0.07, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

function CategoryCard({ category, skills }) {
  const [ref, inView] = useInView();
  const Icon = categoryIcons[category];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="glass border border-white/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-50 to-purple-50 border border-slate-200 flex items-center justify-center">
          {Icon && <Icon size={16} className="text-cyan-600" />}
        </div>
        <h3 className="font-display font-bold text-slate-800">{category}</h3>
      </div>
      <div className="space-y-3">
        {skills.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} index={i} inView={inView} />
        ))}
      </div>
    </motion.div>
  );
}

function TechMarquee() {
  const doubled = [...TECH_MARQUEE, ...TECH_MARQUEE];
  return (
    <div className="marquee-wrapper py-6 mb-16">
      <div className="marquee-track gap-4">
        {doubled.map((tech, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-5 py-2.5 mx-2 rounded-full glass border border-slate-200 text-sm font-mono text-slate-600 whitespace-nowrap hover:border-cyan-300 hover:text-cyan-700 transition-colors cursor-default shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 bg-white overflow-hidden">
      <FloatingOrbs variant="subtle" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          label="Tech Stack"
          title="Skills &"
          highlight="Technologies"
          subtitle="Tools and technologies I use to build products end to end."
        />

        <TechMarquee />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <CategoryCard key={category} category={category} skills={skills} />
          ))}
        </div>
      </div>
    </section>
  );
}