import { motion } from 'framer-motion';
import { useInView, useCountUp } from '../hooks';
import SectionHeading from '../components/SectionHeading';
import FloatingOrbs from '../components/FloatingOrbs';
import { OPEN_SOURCE } from '../constants';
import { FiGithub, FiAward, FiCalendar, FiPackage, FiStar } from 'react-icons/fi';
import { HiOutlineLightningBolt } from 'react-icons/hi';

const ACHIEVEMENTS = [
  {
    icon: FiCalendar,
    iconColor: 'from-yellow-400 to-orange-400',
    title: '12+ Hackathons',
    subtitle: 'Participated & Built',
    description: 'Competed in 12+ hackathons nationwide, building production-ready prototypes under 24-48 hour constraints.',
    color: 'from-yellow-400 to-orange-400',
    count: 12,
    suffix: '+',
  },
  {
    icon: FiStar,
    iconColor: 'from-blue-400 to-cyan-400',
    title: 'Event Head',
    subtitle: '2 Hackathon Events',
    description: 'Organized and led 2 major hackathon events, coordinating teams, judges, and technical infrastructure.',
    color: 'from-blue-400 to-cyan-400',
    count: 2,
    suffix: '',
  },
  {
    icon: FiPackage,
    iconColor: 'from-purple-400 to-fuchsia-400',
    title: 'Apps Deployed',
    subtitle: 'Full-Stack & AI',
    description: 'Built and deployed multiple full-stack and AI-based applications with real users and public access.',
    color: 'from-purple-400 to-fuchsia-400',
    count: 6,
    suffix: '+',
  },
  {
    icon: FiAward,
    iconColor: 'from-amber-400 to-yellow-300',
    title: 'Gold Medals',
    subtitle: 'National Karate Championship',
    description: 'Won 2 Gold Medals at the National Karate Championship (2019) representing Maharashtra among 250+ athletes.',
    color: 'from-amber-400 to-yellow-300',
    count: 2,
    suffix: 'x',
  },
];

function AchievementCard({ achievement, index }) {
  const [ref, inView] = useInView();
  const count = useCountUp(achievement.count, 1800, inView);
  const Icon = achievement.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass border border-white/80 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      <div className={`h-1 rounded-t-xl mb-5 -mt-6 -mx-6 bg-gradient-to-r ${achievement.color}`} />

      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${achievement.iconColor} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
        <Icon size={20} />
      </div>

      <div className={`font-display font-black text-5xl mb-1 bg-gradient-to-br ${achievement.color} bg-clip-text text-transparent`}>
        {count}{achievement.suffix}
      </div>

      <h3 className="font-display font-bold text-slate-900 text-lg mb-1">{achievement.title}</h3>
      <div className="text-xs font-mono text-slate-400 mb-3">{achievement.subtitle}</div>
      <p className="text-slate-500 text-sm font-body leading-relaxed">{achievement.description}</p>
    </motion.div>
  );
}

function OpenSourceSection() {
  const [ref, inView] = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="mt-20"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-xs font-mono font-medium text-purple-600 bg-purple-50 border border-purple-100">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          Open Source
        </div>
        <h3 className="font-display font-bold text-3xl text-slate-900 mb-2">
          Contributing to the <span className="gradient-text">Community</span>
        </h3>
        <p className="text-slate-500 text-base font-body">Giving back through open-source civic-tech contributions</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {OPEN_SOURCE.map(contrib => (
          <div key={contrib.name} className="glass border border-white/80 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${contrib.color} flex items-center justify-center text-white flex-shrink-0`}>
                <FiGithub size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-display font-bold text-slate-900 text-lg">{contrib.name}</h4>
                  <span className="tag text-xs">{contrib.role}</span>
                </div>
                <p className="text-slate-600 text-sm font-body leading-relaxed mb-4">{contrib.description}</p>
                <a
                  href={contrib.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 text-xs"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  <FiGithub size={13} /> View Repository
                </a>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="text-xs font-mono text-slate-400 mb-3">Contribution activity</div>
              <div className="grid grid-cols-[repeat(26,1fr)] gap-1">
                {Array.from({ length: 182 }).map((_, i) => {
                  const intensity = Math.random();
                  const bg = intensity > 0.85
                    ? 'bg-cyan-500'
                    : intensity > 0.6
                    ? 'bg-cyan-300'
                    : intensity > 0.35
                    ? 'bg-cyan-100'
                    : 'bg-slate-100';
                  return <div key={i} className={`w-full aspect-square rounded-sm ${bg}`} />;
                })}
              </div>
              <div className="flex items-center justify-end gap-2 mt-2">
                <span className="text-xs text-slate-400 font-mono">Less</span>
                {['bg-slate-100', 'bg-cyan-100', 'bg-cyan-300', 'bg-cyan-500'].map(c => (
                  <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />
                ))}
                <span className="text-xs text-slate-400 font-mono">More</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-28 px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <FloatingOrbs variant="subtle" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          label="Achievements"
          title="Beyond"
          highlight="Code"
          subtitle="Hackathons, gold medals, events — life is more than just git commits."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((a, i) => (
            <AchievementCard key={a.title} achievement={a} index={i} />
          ))}
        </div>

        <OpenSourceSection />
      </div>
    </section>
  );
}