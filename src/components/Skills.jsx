import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Cpu, Globe, Lock, Terminal, Database, Shield, 
  Code, Bug, FileSearch, Server, Layers, Zap,
  Brain, GitBranch, Container, Workflow
} from 'lucide-react';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState('offensive');

  const skillCategories = {
    offensive: {
      title: 'Offensive Security',
      icon: Bug,
      color: 'cyber-neon',
      description: 'Expertise in identifying and exploiting security vulnerabilities',
      skills: [
        { name: 'Binary Exploitation', level: 85, details: 'Buffer overflows, ROP chains, heap exploitation, format string attacks' },
        { name: 'Reverse Engineering', level: 80, details: 'Static/dynamic analysis, malware analysis, protocol reverse engineering' },
        { name: 'Web Application Security', level: 75, details: 'SQL injection, XSS, CSRF, authentication bypasses, business logic flaws' },
        { name: 'Network Security', level: 70, details: 'Protocol analysis, man-in-the-middle, traffic manipulation' },
        { name: 'Social Engineering', level: 65, details: 'Phishing campaigns, pretexting, physical security assessment' }
      ]
    },
    defensive: {
      title: 'Defensive Security',
      icon: Shield,
      color: 'cyber-cyan',
      description: 'Building and maintaining secure systems and detection capabilities',
      skills: [
        { name: 'Vulnerability Management', level: 80, details: 'Scanning, triage, prioritization, remediation coordination' },
        { name: 'Incident Response', level: 70, details: 'Forensics, containment, eradication, recovery procedures' },
        { name: 'Security Architecture', level: 75, details: 'Secure design patterns, threat modeling, defense in depth' },
        { name: 'SIEM/SOAR', level: 65, details: 'Log analysis, correlation rules, automated response workflows' },
        { name: 'Threat Intelligence', level: 70, details: 'IOC analysis, attribution, strategic intelligence assessment' }
      ]
    },
    technical: {
      title: 'Technical Skills',
      icon: Code,
      color: 'cyber-purple',
      description: 'Programming languages and technical tool proficiencies',
      skills: [
        { name: 'Python', level: 90, details: 'Automation, exploit development, data analysis, web frameworks' },
        { name: 'C/C++', level: 75, details: 'Low-level programming, memory management, kernel modules' },
        { name: 'Assembly (x86/x64/ARM)', level: 70, details: 'Shellcode development, debugging, reverse engineering' },
        { name: 'JavaScript/TypeScript', level: 80, details: 'Web security tools, browser extensions, Node.js applications' },
        { name: 'Rust', level: 60, details: 'Systems programming, safe memory management, performance-critical tools' }
      ]
    },
    tools: {
      title: 'Tools & Platforms',
      icon: Terminal,
      color: 'cyber-pink',
      description: 'Specialized security tools and platforms',
      skills: [
        { name: 'GDB/pwndbg', level: 90, details: 'Advanced debugging, heap analysis, exploit development' },
        { name: 'IDA Pro/Ghidra', level: 80, details: 'Disassembly, decompilation, binary analysis' },
        { name: 'Docker/Kubernetes', level: 75, details: 'Containerization, orchestration, isolated environments' },
        { name: 'Burp Suite', level: 85, details: 'Web proxy, scanner, intruder, extension development' },
        { name: 'Wireshark/tcpdump', level: 80, details: 'Packet analysis, protocol debugging, traffic inspection' }
      ]
    }
  };

  const certifications = [
    { name: 'OSCP (In Progress)', issuer: 'Offensive Security', status: 'preparing', description: 'Offensive Security Certified Professional - Gold standard for penetration testing' },
    { name: 'eJPT', issuer: 'INE/eLearnSecurity', status: 'planned', description: 'eLearnSecurity Junior Penetration Tester - Foundational certification' },
    { name: 'Burp Suite Certified', issuer: 'PortSwigger', status: 'planned', description: 'Advanced web application security testing certification' }
  ];

  const currentCategory = skillCategories[activeCategory];

  return (
    <div ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple text-sm font-mono mb-4">
            &lt;Skills /&gt;
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Technical </span>
            <span className="gradient-text-purple">Expertise</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            A comprehensive skill set spanning offensive and defensive security disciplines
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div 
          className="flex justify-center gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {Object.entries(skillCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                activeCategory === key
                  ? `bg-${category.color}/20 border-${category.color} text-${category.color} border`
                  : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              <category.icon size={16} />
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* Skills Display */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="cyber-card p-8 lg:p-12 mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-14 h-14 rounded-xl bg-${currentCategory.color}/10 border border-${currentCategory.color}/30 flex items-center justify-center`}>
              <currentCategory.icon className={`w-7 h-7 text-${currentCategory.color}`} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{currentCategory.title}</h3>
              <p className="text-gray-400">{currentCategory.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            {currentCategory.skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className={`text-${currentCategory.color} font-mono`}>{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    className={`h-full bg-${currentCategory.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                <p className="text-gray-500 text-sm">{skill.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: Terminal, name: 'Linux', color: 'cyber-neon' },
              { icon: Server, name: 'Windows', color: 'cyber-cyan' },
              { icon: Database, name: 'PostgreSQL', color: 'cyber-purple' },
              { icon: Globe, name: 'Web', color: 'cyber-pink' },
              { icon: Lock, name: 'Crypto', color: 'cyber-neon' },
              { icon: Cpu, name: 'Hardware', color: 'cyber-cyan' },
              { icon: Layers, name: 'Cloud', color: 'cyber-purple' },
              { icon: Zap, name: 'Performance', color: 'cyber-pink' },
              { icon: Brain, name: 'AI/ML', color: 'cyber-neon' },
              { icon: GitBranch, name: 'Git', color: 'cyber-cyan' },
              { icon: Container, name: 'Docker', color: 'cyber-purple' },
              { icon: Workflow, name: 'CI/CD', color: 'cyber-pink' },
            ].map((tech, index) => (
              <motion.div 
                key={tech.name}
                className="cyber-card p-4 text-center group hover:scale-105 transition-transform"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <tech.icon className={`w-8 h-8 text-${tech.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                <span className="text-gray-400 text-sm">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Certifications & Learning</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div 
                key={cert.name}
                className="cyber-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <FileSearch className="text-cyber-cyan" size={24} />
                  <span className={`px-2 py-1 rounded text-xs font-mono ${
                    cert.status === 'preparing' ? 'bg-yellow-500/20 text-yellow-500' :
                    cert.status === 'planned' ? 'bg-gray-700 text-gray-400' :
                    'bg-cyber-neon/20 text-cyber-neon'
                  }`}>
                    {cert.status}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{cert.name}</h4>
                <p className="text-cyber-cyan text-sm font-mono mb-3">{cert.issuer}</p>
                <p className="text-gray-400 text-sm">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Path */}
        <motion.div 
          className="mt-16 cyber-card p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Current Learning Focus</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-cyber-neon font-mono mb-3">Short Term (3-6 months)</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-cyber-neon">→</span>
                  Advanced heap exploitation techniques (tcache, fastbin dup)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-neon">→</span>
                  Windows kernel driver exploitation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-neon">→</span>
                  Fuzzing framework development with custom mutators
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyber-cyan font-mono mb-3">Long Term (6-12 months)</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-cyber-cyan">→</span>
                  iOS/macOS security research and jailbreak development
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-cyan">→</span>
                  Hardware security (fault injection, side-channel analysis)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-cyan">→</span>
                  Automated vulnerability discovery using ML
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyber-pink/5 rounded-full blur-3xl" />
    </div>
  );
};

export default Skills;
