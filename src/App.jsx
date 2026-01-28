import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Research from './components/Research';
import Blog from './components/Blog';
import CTF from './components/CTF';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import MatrixRain from './components/MatrixRain';
import ParticleField from './components/ParticleField';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'research', 'ctf', 'blog', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-cyber-dark flex items-center justify-center z-50">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-24 h-24 border-4 border-cyber-neon border-t-transparent rounded-full animate-spin mx-auto" 
                 style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)' }} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-mono font-bold text-cyber-neon tracking-widest"
          >
            M3THY1
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-cyber-cyan mt-4 font-mono text-sm"
          >
            Initializing secure connection...
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-cyber-neon to-cyber-cyan mt-4 mx-auto rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-cyber-dark overflow-x-hidden">
      {/* Background Effects */}
      <MatrixRain />
      <ParticleField />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyber-neon via-cyber-cyan to-cyber-purple z-50"
        style={{ width: progressWidth }}
      />

      {/* Navigation */}
      <Navigation activeSection={activeSection} />

      {/* Main Content */}
      <main className="relative z-10">
        <section id="hero" className="snap-section">
          <Hero />
        </section>
        
        <section id="about" className="snap-section">
          <About />
        </section>
        
        <section id="projects" className="snap-section">
          <Projects />
        </section>
        
        <section id="skills" className="snap-section">
          <Skills />
        </section>
        
        <section id="research" className="snap-section">
          <Research />
        </section>
        
        <section id="ctf" className="snap-section">
          <CTF />
        </section>
        
        <section id="blog" className="snap-section">
          <Blog />
        </section>
        
        <section id="contact" className="snap-section">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-cyber-darker border-t border-cyber-neon/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 font-mono text-sm">
            <span className="text-cyber-neon">&lt;</span>
            M3THY1
            <span className="text-cyber-neon">/&gt;</span>
            {' '}© {new Date().getFullYear()} — Built with React + Framer Motion
          </p>
          <p className="text-gray-600 text-xs mt-2">
            generated by Kimi Code CLI K2.5, just for fun.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
