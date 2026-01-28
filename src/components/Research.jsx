import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FileText, Microscope, BookOpen, ExternalLink, 
  ChevronRight, AlertTriangle, Cpu, Shield, 
  Terminal, Search, Bug, Lock
} from 'lucide-react';

const Research = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePaper, setActivePaper] = useState(null);

  const researchAreas = [
    {
      icon: Bug,
      title: 'Memory Corruption',
      description: 'Studying stack and heap-based vulnerabilities, including buffer overflows, use-after-free, and double-free conditions.',
      techniques: ['ROP/JOP chains', 'Heap Feng Shui', 'Memory tagging', 'ASLR bypasses']
    },
    {
      icon: Lock,
      title: 'Exploit Mitigations',
      description: 'Analyzing modern exploitation mitigations including CFG, CFI, PAC, and hardware-based security features.',
      techniques: ['Control Flow Guard', 'Shadow Stack', 'Pointer Authentication', 'Memory Encryption']
    },
    {
      icon: Cpu,
      title: 'AI-Augmented Analysis',
      description: 'Leveraging Large Language Models to accelerate vulnerability discovery and exploit development workflows.',
      techniques: ['Automated root cause', 'Exploit generation', 'Pattern recognition', 'Natural language queries']
    },
    {
      icon: Terminal,
      title: 'Kernel Security',
      description: 'Researching OS kernel vulnerabilities across Linux, Windows, and macOS platforms.',
      techniques: ['Driver exploitation', 'Syscall fuzzing', 'Kernel ASLR', 'eBPF security']
    }
  ];

  const papers = [
    {
      title: 'MCP Protocol Applications in Security Tooling',
      status: 'Draft',
      date: '2025',
      abstract: 'Exploring the application of Model Context Protocol in bridging AI assistants with traditional security debugging tools. This paper presents a novel approach to natural language interaction with GDB, enabling security researchers to leverage LLM capabilities for complex binary analysis tasks.',
      tags: ['AI Security', 'MCP', 'Debugging', 'LLM Integration'],
      type: 'Technical Analysis'
    },
    {
      title: 'Modern Heap Exploitation on glibc 2.35+',
      status: 'Research',
      date: '2025',
      abstract: 'An analysis of contemporary heap exploitation techniques targeting modern glibc versions. This research examines the evolution of heap metadata corruption attacks and presents novel exploitation primitives for bypassing modern heap hardening mechanisms.',
      tags: ['Binary Exploitation', 'Heap', 'glibc', 'Memory Safety'],
      type: 'Vulnerability Research'
    },
    {
      title: 'Automated Vulnerability Detection Using LLMs',
      status: 'Planning',
      date: '2025-2026',
      abstract: 'Investigating the effectiveness of Large Language Models in identifying security vulnerabilities in source code. This research evaluates various prompting strategies and model architectures for vulnerability detection across multiple programming languages.',
      tags: ['AI/ML', 'Static Analysis', 'Vulnerability Detection', 'Automation'],
      type: 'Research Proposal'
    }
  ];

  const vulnerabilities = [
    {
      severity: 'High',
      type: 'Memory Corruption',
      description: 'Heap buffer overflow in custom allocator',
      status: 'Coordinated Disclosure',
      cve: 'Pending'
    },
    {
      severity: 'Medium',
      type: 'Use-After-Free',
      description: 'UAF in JavaScript engine garbage collector',
      status: 'Vendor Notified',
      cve: 'Pending'
    }
  ];

  const methodologies = [
    {
      title: 'Fuzzing Strategy',
      steps: [
        'Corpus collection and minimization',
        'Coverage-guided mutation',
        'Crash deduplication and triage',
        'Root cause analysis',
        'Exploitability assessment'
      ]
    },
    {
      title: 'Reverse Engineering Workflow',
      steps: [
        'Initial binary reconnaissance',
        'Attack surface identification',
        'Dynamic behavior analysis',
        'Vulnerable code location',
        'Exploitation path development'
      ]
    },
    {
      title: 'Vulnerability Research',
      steps: [
        'Target selection and scoping',
        'Manual code review',
        'Automated static analysis',
        'Proof-of-concept development',
        'Impact assessment and reporting'
      ]
    }
  ];

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
          <span className="inline-block px-4 py-2 rounded-full bg-cyber-neon/10 border border-cyber-neon/30 text-cyber-neon text-sm font-mono mb-4">
            &lt;Research /&gt;
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Security </span>
            <span className="gradient-text">Research</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Independent research into vulnerability discovery, exploitation techniques, and defensive measures
          </p>
        </motion.div>

        {/* Research Areas Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {researchAreas.map((area, index) => (
            <motion.div 
              key={area.title}
              className="cyber-card p-8 group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyber-neon/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyber-neon/20 transition-colors">
                  <area.icon className="w-6 h-6 text-cyber-neon" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-neon transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{area.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {area.techniques.map(tech => (
                  <span key={tech} className="px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Papers Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <FileText className="text-cyber-cyan" />
              Research Papers & Publications
            </h3>
            <span className="text-gray-500 text-sm">Independent Research</span>
          </div>

          <div className="space-y-4">
            {papers.map((paper, index) => (
              <motion.div 
                key={paper.title}
                className="cyber-card p-6 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => setActivePaper(activePaper === index ? null : index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-white">{paper.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                        paper.status === 'Draft' ? 'bg-yellow-500/20 text-yellow-500' :
                        paper.status === 'Research' ? 'bg-cyber-cyan/20 text-cyber-cyan' :
                        'bg-gray-700 text-gray-400'
                      }`}>
                        {paper.status}
                      </span>
                    </div>
                    <p className="text-cyber-cyan text-sm font-mono mb-3">{paper.type} • {paper.date}</p>
                    <p className="text-gray-400 text-sm mb-3">{paper.abstract}</p>
                    <div className="flex flex-wrap gap-2">
                      {paper.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-full bg-cyber-neon/10 text-cyber-neon text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight 
                    className={`text-gray-500 transition-transform ${activePaper === index ? 'rotate-90' : ''}`} 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Vulnerability Disclosures */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="text-cyber-pink" />
              Vulnerability Disclosures
            </h3>
            <div className="cyber-card p-6">
              {vulnerabilities.map((vuln, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg bg-gray-800/50 ${index !== vulnerabilities.length - 1 ? 'mb-4' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                      vuln.severity === 'Critical' ? 'bg-red-500/20 text-red-500' :
                      vuln.severity === 'High' ? 'bg-orange-500/20 text-orange-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {vuln.severity}
                    </span>
                    <span className="text-gray-500 text-xs font-mono">{vuln.cve}</span>
                  </div>
                  <p className="text-cyber-cyan text-sm font-mono mb-1">{vuln.type}</p>
                  <p className="text-gray-300 text-sm mb-2">{vuln.description}</p>
                  <p className="text-gray-500 text-xs">Status: {vuln.status}</p>
                </div>
              ))}
              <div className="mt-4 p-4 rounded-lg border border-dashed border-gray-700 text-center">
                <p className="text-gray-500 text-sm">
                  Additional vulnerabilities under coordinated disclosure
                </p>
              </div>
            </div>
          </motion.div>

          {/* Research Methodologies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Microscope className="text-cyber-purple" />
              Research Methodologies
            </h3>
            <div className="space-y-4">
              {methodologies.map((method, index) => (
                <motion.div 
                  key={method.title}
                  className="cyber-card p-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                    <Search className="w-4 h-4 text-cyber-neon" />
                    {method.title}
                  </h4>
                  <ul className="space-y-2">
                    {method.steps.map((step, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                        <span className="w-6 h-6 rounded-full bg-cyber-neon/10 text-cyber-neon text-xs flex items-center justify-center font-mono">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
        >
          <div className="cyber-card p-8 inline-block">
            <BookOpen className="w-12 h-12 text-cyber-neon mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Research Collaboration</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Interested in collaborating on security research? I'm always open to discussing 
              new ideas and joint research projects.
            </p>
            <a 
              href="#contact"
              className="cyber-button inline-flex items-center gap-2"
            >
              Discuss Research
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyber-neon/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl" />
    </div>
  );
};

export default Research;
