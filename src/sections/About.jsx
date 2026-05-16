import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import SectionHeading from '../components/SectionHeading';
import FloatingOrbs from '../components/FloatingOrbs';
import { PERSONAL, EDUCATION } from '../constants';
import { SiFastapi } from 'react-icons/si';
import {
  FiCpu, FiDatabase, FiCode, FiZap, FiGlobe, FiServer, FiBarChart2, FiBookOpen,
} from 'react-icons/fi';

const stats = [
  { label: 'CGPA', value: '8.4', suffix: '/10', color: 'from-cyan-400 to-blue-500' },
  { label: 'Hackathons', value: '12', suffix: '+', color: 'from-purple-400 to-violet-600' },
  { label: 'Projects', value: '6', suffix: '+', color: 'from-pink-400 to-rose-500' },
  { label: 'Gold Medals', value: '2', suffix: '', color: 'from-amber-400 to-yellow-500' },
];

const interests = [
  { icon: FiCpu, label: 'AI Agents & RAG' },
  { icon: FiZap, label: 'LangChain / LangGraph' },
  { icon: FiDatabase, label: 'Vector Databases' },
  { icon: SiFastapi, label: 'FastAPI & Scalable APIs' },
  { icon: FiGlobe, label: 'Civic-Tech Platforms' },
  { icon: FiServer, label: 'Backend Engineering' },
  { icon: FiBarChart2, label: 'Data Analytics' },
  { icon: FiBookOpen, label: 'ML Research' },
];

function StatCard({ stat, index }) {
  const [ref, inView] = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass border border-white/80 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      <div className={`text-3xl font-display font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
        {stat.value}{stat.suffix}
      </div>
      <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-widest">{stat.label}</div>
    </motion.div>
  );
}

export default function About() {
  const [ref, inView] = useInView();
  const [imgRef, imgInView] = useInView();

  return (
    <section id="about" className="relative py-28 px-6 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <FloatingOrbs variant="subtle" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          label="About Me"
          title="Engineer &"
          highlight="Builder"
          subtitle="Passionate about intelligent systems, civic-tech, and impactful full-stack products."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, x: -50 }}
            animate={imgInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-100 to-purple-100 rotate-6 opacity-60" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden glass border border-white/80 shadow-xl flex items-center justify-center">
                {/* Replace with: <img src="/photo.jpg" alt="Piyush" className="w-full h-full object-cover" /> */}
                <div className="flex flex-col items-center gap-2 text-slate-300">
                  <FiCode size={48} />
                  <span className="text-xs font-mono text-center">Add photo.jpg to /public/</span>
                </div>
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 glass border border-white/80 rounded-2xl px-4 py-3 shadow-lg max-w-[180px]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-xs font-mono text-cyan-600 mb-0.5">B.Tech CSE</div>
                <div className="text-xs font-semibold text-slate-800">JIT Nagpur</div>
                <div className="text-xs text-slate-500">{EDUCATION.period}</div>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </motion.div>

          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h3 className="font-display font-bold text-2xl text-slate-900 mb-4">
                Hey there! I'm <span className="gradient-text">Piyush</span>
              </h3>
              <div className="space-y-4 text-slate-600 font-body text-base leading-relaxed mb-8">
                <p>
                  I'm a B.Tech CSE student at Jhulelal Institute of Technology, Nagpur with a CGPA of 8.4. Deeply passionate about backend engineering, AI systems, civic-tech, and full-stack development.
                </p>
                <p>
                  I love building products that solve real problems — from <strong className="text-slate-800">LokDrishti</strong> (AI-powered civic intelligence) to <strong className="text-slate-800">AatankDrishti</strong> (global terrorism analytics) and an anomaly detection system with a published research paper.
                </p>
                <p>
                  Currently exploring <strong className="text-slate-800">AI Agents, RAG pipelines, Vector Databases</strong>, and scalable backend architectures. I also compete in hackathons and contribute to open source.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="glass border border-white/80 rounded-2xl p-5 mb-8 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white flex-shrink-0">
                    <FiBookOpen size={18} />
                  </div>
                  <div>
                    <div className="font-display font-bold text-slate-900">Jhulelal Institute Of Technology</div>
                    <div className="text-sm text-slate-500 font-body">B.Tech — Computer Science Engineering · Nagpur</div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="tag">July 2023 – Present</span>
                      <span className="tag">CGPA: 8.4</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Interests & Focus Areas</div>
                <div className="flex flex-wrap gap-2">
                  {interests.map((item, i) => (
                    <motion.span
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-sm text-slate-700 hover:border-cyan-300 hover:bg-cyan-50 transition-all cursor-default shadow-sm"
                    >
                      <item.icon size={13} className="text-cyan-500" />
                      <span className="font-body">{item.label}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}