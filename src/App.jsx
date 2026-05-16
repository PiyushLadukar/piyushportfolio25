import { useState, useEffect } from 'react';
import Lenis from 'lenis';

// Components
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Footer from './components/Footer';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Init Lenis smooth scroll
  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loaded]);

  // Keyboard shortcut easter egg: press 'g' to jump to GitHub
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'g') window.open('https://github.com/piyushladukar', '_blank');
      if (e.key === 'l') window.open('https://linkedin.com/in/piyushladukar', '_blank');
      if (e.key === 'h') {
        const el = document.querySelector('#hero');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="noise-bg">
      {/* Loading screen */}
      <Loader onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          {/* Custom cursor — hidden on mobile via CSS */}
          <Cursor />

          {/* Scroll progress bar */}
          <ScrollProgress />

          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Achievements />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Keyboard shortcuts hint */}
          <div className="fixed bottom-6 right-6 z-40 hidden lg:flex flex-col gap-1 text-right pointer-events-none">
            <span className="text-xs font-mono text-slate-300 bg-white/80 px-2 py-1 rounded-lg backdrop-blur-sm border border-slate-200/50 shadow-sm">
              Press <kbd className="font-bold">G</kbd> → GitHub
            </span>
            <span className="text-xs font-mono text-slate-300 bg-white/80 px-2 py-1 rounded-lg backdrop-blur-sm border border-slate-200/50 shadow-sm">
              Press <kbd className="font-bold">L</kbd> → LinkedIn
            </span>
            <span className="text-xs font-mono text-slate-300 bg-white/80 px-2 py-1 rounded-lg backdrop-blur-sm border border-slate-200/50 shadow-sm">
              Press <kbd className="font-bold">H</kbd> → Home
            </span>
          </div>
        </>
      )}
    </div>
  );
}