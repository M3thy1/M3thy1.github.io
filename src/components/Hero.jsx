import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Shield, Cpu, Lock, ArrowDown, Github, Send } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const codeLines = [
    { text: 'class', color: '#ff79c6' },
    { text: ' CybersecurityResearcher', color: '#8be9fd' },
    { text: ':', color: '#f8f8f2' },
    { text: '', color: '' },
    { text: '    def', color: '#ff79c6' },
    { text: ' __init__', color: '#50fa7b' },
    { text: '(self):', color: '#f8f8f2' },
    { text: '', color: '' },
    { text: '        self.handle', color: '#f8f8f2' },
    { text: ' = ', color: '#ff79c6' },
    { text: '"M3thy1"', color: '#f1fa8c' },
    { text: '', color: '' },
    { text: '        self.focus', color: '#f8f8f2' },
    { text: ' = [', color: '#f8f8f2' },
    { text: '"binary_exploitation"', color: '#f1fa8c' },
    { text: ',', color: '#f8f8f2' },
    { text: '', color: '' },
    { text: '                          ', color: '' },
    { text: '"reverse_engineering"', color: '#f1fa8c' },
    { text: ',', color: '#f8f8f2' },
    { text: '', color: '' },
    { text: '                          ', color: '' },
    { text: '"vulnerability_research"', color: '#f1fa8c' },
    { text: ']', color: '#f8f8f2' },
    { text: '', color: '' },
    { text: '        self.mission', color: '#f8f8f2' },
    { text: ' = ', color: '#ff79c6' },
    { text: '"Secure the digital frontier"', color: '#f1fa8c' },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 hex-pattern" />
      
      {/* Floating Orbs */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{ 
          background: 'radial-gradient(circle, #00ff41 0%, transparent 70%)',
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
          top: '10%',
          left: '10%'
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute w-80 h-80 rounded-full opacity-15"
        style={{ 
          background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
          x: mousePosition.x * -1.5,
          y: mousePosition.y * -1.5,
          bottom: '20%',
          right: '10%'
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div 
        className="absolute w-64 h-64 rounded-full opacity-10"
        style={{ 
          background: 'radial-gradient(circle, #b829dd 0%, transparent 70%)',
          x: mousePosition.x * 1,
          y: mousePosition.y * -2,
          top: '50%',
          left: '60%'
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Grid Lines */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center"
        style={{ opacity }}
      >
        {/* Left Column - Text Content */}
        <motion.div 
          className="text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-neon/10 border border-cyber-neon/30 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 rounded-full bg-cyber-neon animate-pulse" />
            <span className="text-cyber-neon text-sm font-mono">Available for Research Collaboration</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            style={{ 
              x: mousePosition.x * 0.5,
              y: mousePosition.y * 0.5
            }}
          >
            <span className="block text-white mb-2">M3THY1</span>
            <span className="block text-3xl md:text-4xl font-normal">
              <span className="gradient-text">Cybersecurity</span>
            </span>
            <span className="block text-3xl md:text-4xl font-normal text-gray-400">
              Researcher
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl text-gray-400 mb-8 max-w-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Exploring the depths of binary exploitation, reverse engineering, and vulnerability research. 
            Building AI-powered security tools for the next generation of cyber defense.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a 
              href="#projects"
              className="cyber-button flex items-center gap-2 group"
            >
              <Terminal size={18} />
              View Projects
            </a>
            <a 
              href="#contact"
              className="px-8 py-3 border border-gray-600 text-gray-300 rounded hover:border-cyber-cyan hover:text-cyber-cyan transition-all duration-300 flex items-center gap-2"
            >
              <Send size={18} />
              Get in Touch
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <a 
              href="https://github.com/M3thy1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:border-cyber-neon hover:text-cyber-neon transition-all duration-300"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://t.me/m3thy1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:border-cyber-cyan hover:text-cyber-cyan transition-all duration-300"
            >
              <Send size={20} />
            </a>
            <a 
              href="https://hackerone.com/m3thy1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:border-cyber-pink hover:text-cyber-pink transition-all duration-300"
            >
              <Shield size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column - Terminal */}
        <motion.div 
          className="relative"
          style={{ y: y1 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className="terminal overflow-hidden"
            style={{ 
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${mousePosition.y * -0.5}deg)`
            }}
          >
            {/* Terminal Header */}
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span className="ml-4 text-gray-400 text-sm font-mono">researcher_profile.py — M3thy1</span>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm leading-relaxed">
              {codeLines.map((line, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.03 }}
                  className="whitespace-pre"
                >
                  <span style={{ color: line.color }}>{line.text}</span>
                </motion.div>
              ))}
              <motion.span
                className="inline-block w-3 h-5 bg-cyber-neon ml-1 animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              />
            </div>
          </motion.div>

          {/* Floating Stats Cards */}
          <motion.div 
            className="absolute -bottom-8 -left-8 cyber-card p-4"
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyber-neon/20 flex items-center justify-center">
                <Lock className="text-cyber-neon" size={20} />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Security Focus</p>
                <p className="text-white font-bold">Binary Exploitation</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="absolute -top-4 -right-4 cyber-card p-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyber-cyan/20 flex items-center justify-center">
                <Cpu className="text-cyber-cyan" size={20} />
              </div>
              <div>
                <p className="text-gray-400 text-xs">AI Integration</p>
                <p className="text-white font-bold">MCP Protocol</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-gray-500 text-xs font-mono">Scroll to explore</span>
        <ArrowDown className="text-cyber-neon" size={20} />
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyber-neon/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyber-neon/20" />
    </div>
  );
};

export default Hero;
