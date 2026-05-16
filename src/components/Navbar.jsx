import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, PERSONAL } from '../constants';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className={`mx-4 md:mx-8 rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg shadow-slate-200/50 px-6 py-3'
            : 'px-6 py-3'
        }`}>
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleNav('#hero'); }}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-display font-bold transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                  boxShadow: '0 0 20px rgba(0,212,255,0.3)',
                }}
              >
                PL
              </div>
              <span className="font-display font-semibold text-slate-800 hidden sm:block">
                Piyush<span className="gradient-text"> Ladukar</span>
              </span>
            </motion.a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="relative px-4 py-2 text-sm font-body font-medium text-slate-600 hover:text-slate-900 transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-4 transition-all duration-300 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #00d4ff, #7c3aed)' }}
                  />
                </button>
              ))}
            </div>

            {/* CTA + menu */}
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL.resumeUrl}
                download
                className="hidden md:flex btn-primary text-sm items-center gap-2 z-10"
                style={{ padding: '0.5rem 1.25rem' }}
              >
                Resume ↗
              </a>
              <button
                className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-24 z-40 glass rounded-2xl shadow-xl shadow-slate-200/50 p-6"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={PERSONAL.resumeUrl}
                download
                className="mt-2 btn-primary text-center text-sm"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}