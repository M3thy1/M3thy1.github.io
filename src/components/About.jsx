import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, MapPin, Mail, Terminal, BookOpen, Target, Award, Globe } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    {
      year: '2023',
      title: 'Security Research Journey Begins',
      description: 'Started deep dive into binary exploitation and reverse engineering, focusing on understanding low-level system vulnerabilities and memory corruption techniques.'
    },
    {
      year: '2024',
      title: 'AI-Powered Security Tools',
      description: 'Developed Pwndbg-MCP, integrating Large Language Models with GDB debugging workflows. Pioneering the intersection of AI and binary analysis.'
    },
    {
      year: '2025',
      title: 'Advanced Vulnerability Research',
      description: 'Expanding research into complex vulnerability classes including use-after-free, type confusion, and kernel exploitation techniques.'
    }
  ];

  const philosophies = [
    {
      icon: Target,
      title: 'Si Vis Pacem, Para Bellum',
      description: 'If you want peace, prepare for war. This ancient Roman maxim drives my approach to cybersecurity — understanding offensive techniques is essential for building effective defenses.'
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description: 'The security landscape evolves daily. I dedicate significant time to studying new exploitation techniques, reading research papers, and hands-on practice in controlled environments.'
    },
    {
      icon: Globe,
      title: 'Open Source Contribution',
      description: 'Believing in the power of community-driven security. I share tools, knowledge, and research to elevate the entire cybersecurity ecosystem.'
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
            &lt;About /&gt;
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Behind the </span>
            <span className="gradient-text">Handle</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            A passionate cybersecurity researcher exploring the boundaries of digital security
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Profile Card */}
            <div className="cyber-card p-8 mb-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyber-neon/20 to-cyber-cyan/20 border border-cyber-neon/30 flex items-center justify-center flex-shrink-0">
                  <User className="w-12 h-12 text-cyber-neon" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">M3thy1</h3>
                  <p className="text-cyber-cyan font-mono text-sm mb-2">@Moonshot.ai (Kimi)</p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin size={14} />
                    <span>Global • Remote Research</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I am a dedicated cybersecurity researcher with a specialized focus on binary exploitation, 
                  reverse engineering, and vulnerability research. My journey into security began with a 
                  fascination for understanding how systems work at their most fundamental level — and 
                  consequently, how they can be made to fail.
                </p>
                <p>
                  The handle "M3thy1" represents my digital identity in the security community, embodying 
                  both the analytical precision required in this field and the creative thinking necessary 
                  to discover novel attack vectors. The name draws inspiration from organic chemistry nomenclature, 
                  reflecting the systematic approach I bring to analyzing complex systems.
                </p>
                <p>
                  Currently, I'm deeply engaged in developing AI-powered security tools, specifically exploring 
                  how Large Language Models can augment traditional debugging and reverse engineering workflows. 
                  My flagship project, <span className="text-cyber-neon">Pwndbg-MCP</span>, represents this 
                  convergence of classical security research and cutting-edge artificial intelligence.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Research Focus', value: 'Binary Exploitation', color: 'cyber-neon' },
                { label: 'Experience', value: '2+ Years', color: 'cyber-cyan' },
                { label: 'Tools Built', value: 'Multiple', color: 'cyber-purple' },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="cyber-card p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <p className={`text-lg font-bold text-${stat.color} mb-1`}>{stat.value}</p>
                  <p className="text-gray-500 text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Timeline & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Timeline */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Terminal className="text-cyber-neon" />
                Journey Timeline
              </h3>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div 
                    key={item.year}
                    className="relative pl-8 border-l-2 border-cyber-neon/30"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-cyber-dark border-2 border-cyber-neon" />
                    <span className="text-cyber-neon font-mono text-sm">{item.year}</span>
                    <h4 className="text-white font-bold mt-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Philosophy */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Award className="text-cyber-cyan" />
                Research Philosophy
              </h3>
              <div className="space-y-4">
                {philosophies.map((philosophy, index) => (
                  <motion.div 
                    key={philosophy.title}
                    className="cyber-card p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cyber-neon/10 flex items-center justify-center flex-shrink-0">
                        <philosophy.icon className="text-cyber-neon" size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">{philosophy.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{philosophy.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interests Section */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Core Research Areas</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Binary Exploitation',
                description: 'Memory corruption vulnerabilities, buffer overflows, format string attacks, and modern exploitation techniques on Linux and Windows platforms.',
                tools: ['pwndbg', 'GDB', 'pwntools']
              },
              {
                title: 'Reverse Engineering',
                description: 'Static and dynamic analysis of binaries, malware analysis, understanding proprietary protocols, and unpacking obfuscated code.',
                tools: ['IDA Pro', 'Ghidra', 'x64dbg']
              },
              {
                title: 'Vulnerability Research',
                description: 'Systematic discovery and analysis of security vulnerabilities in software, from initial triage to proof-of-concept development.',
                tools: ['AFL++', 'libFuzzer', 'AddressSanitizer']
              },
              {
                title: 'AI Security Integration',
                description: 'Leveraging Large Language Models to augment debugging workflows, automated vulnerability detection, and intelligent exploit generation.',
                tools: ['MCP', 'Claude API', 'LangChain']
              }
            ].map((area, index) => (
              <motion.div 
                key={area.title}
                className="cyber-card p-6 group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-cyber-neon transition-colors">
                  {area.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{area.description}</p>
                <div className="flex flex-wrap gap-2">
                  {area.tools.map(tool => (
                    <span key={tool} className="px-2 py-1 rounded bg-cyber-neon/10 text-cyber-neon text-xs font-mono">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-cyber-neon/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-cyber-cyan/5 rounded-full blur-3xl" />
    </div>
  );
};

export default About;
