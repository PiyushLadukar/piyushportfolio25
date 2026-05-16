import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiSend, FiMapPin, FiCheck } from 'react-icons/fi';
import { useInView } from '../hooks';
import SectionHeading from '../components/SectionHeading';
import FloatingOrbs from '../components/FloatingOrbs';
import { PERSONAL } from '../constants';

const contactLinks = [
  {
    icon: FiMail,
    label: 'Email',
    value: PERSONAL.email,
    href: `mailto:${PERSONAL.email}`,
    color: 'from-cyan-500 to-blue-500',
    desc: 'Best for project inquiries',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/piyushladukar',
    href: PERSONAL.linkedin,
    color: 'from-blue-500 to-blue-700',
    desc: 'Let\'s connect professionally',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/piyushladukar',
    href: PERSONAL.github,
    color: 'from-slate-600 to-slate-800',
    desc: 'Check out my code',
  },
];

export default function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens mailto with form data — no backend needed
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${PERSONAL.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${body}`;
    setStatus('sent');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="contact" className="relative py-28 px-6 bg-white overflow-hidden">
      <FloatingOrbs />
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <SectionHeading
          label="Get In Touch"
          title="Let's"
          highlight="Connect"
          subtitle="Available for internships, freelance, collaborations, or just a great conversation about AI."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left — contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-8">
              <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">
                Open to Opportunities
              </h3>
              <p className="text-slate-600 font-body leading-relaxed">
                Whether it's a backend role, AI/ML project, civic-tech collaboration, or just hacking something cool together — I'm all ears. Based in Nagpur, available globally.
              </p>

              <div className="flex items-center gap-2 mt-4 text-slate-500 text-sm font-body">
                <FiMapPin size={15} className="text-cyan-500" />
                Nagpur, Maharashtra, India
              </div>
            </div>

            <div className="space-y-4">
              {contactLinks.map(({ icon: Icon, label, value, href, color, desc }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 glass border border-white/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">{label}</div>
                    <div className="font-body font-medium text-slate-800 truncate">{value}</div>
                    <div className="text-xs text-slate-500">{desc}</div>
                  </div>
                  <span className="text-slate-300 group-hover:text-cyan-500 transition-colors text-lg">→</span>
                </motion.a>
              ))}
            </div>

            {/* Availability tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 flex items-center gap-3 glass border border-green-200 rounded-2xl px-5 py-3 shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-body text-slate-700">
                <strong>Currently available</strong> for internships & part-time projects
              </span>
            </motion.div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="glass border border-white/80 rounded-2xl p-7 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                  { name: 'name', label: 'Your Name', placeholder: 'Piyush Ladukar', type: 'text' },
                  { name: 'email', label: 'Email Address', placeholder: 'you@example.com', type: 'email' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 text-slate-800 font-body text-sm placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
                    />
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Internship Opportunity / Project Collaboration"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 text-slate-800 font-body text-sm placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Hi Piyush, I'd love to discuss..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 text-slate-800 font-body text-sm placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm relative z-10"
              >
                <FiSend size={15} />
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'sent'
                    ? <><FiCheck size={15} /> Opening Mail Client...</>
                    : 'Send Message'}
                </span>
              </button>

              <p className="text-center text-xs text-slate-400 font-mono mt-3">
                Opens your mail client · No backend required
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}