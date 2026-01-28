import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Trophy, Flag, Target, Clock, Users, Star,
  Terminal, Cpu, Globe, Lock, FileCode, Binary,
  ChevronRight, ExternalLink, Medal, Zap
} from 'lucide-react';

const CTF = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState('pwn');

  const categories = {
    pwn: {
      name: 'Pwn',
      icon: Terminal,
      color: 'cyber-neon',
      description: 'Binary exploitation challenges requiring memory corruption, ROP chains, and shellcode development',
      challenges: [
        {
          name: 'Heap Arena',
          difficulty: 'Hard',
          points: 500,
          solved: true,
          description: 'Complex heap exploitation challenge involving tcache poisoning and unsafe unlink',
          techniques: ['Heap Feng Shui', 'tcache poisoning', 'unsorted bin attack']
        },
        {
          name: 'ROP Emporium',
          difficulty: 'Medium',
          points: 300,
          solved: true,
          description: 'Return-oriented programming challenge with limited gadgets and NX enabled',
          techniques: ['ROP chains', 'ret2libc', 'gadget hunting']
        },
        {
          name: 'Stack Overflow Pro',
          difficulty: 'Medium',
          points: 250,
          solved: true,
          description: 'Classic stack buffer overflow with modern mitigations',
          techniques: ['Stack canary bypass', 'ASLR defeat', 'shellcode injection']
        }
      ]
    },
    rev: {
      name: 'Reverse Engineering',
      icon: Binary,
      color: 'cyber-cyan',
      description: 'Static and dynamic analysis of compiled binaries to understand hidden logic',
      challenges: [
        {
          name: 'VM Protect',
          difficulty: 'Hard',
          points: 450,
          solved: true,
          description: 'Custom virtual machine implementation requiring VM analysis',
          techniques: ['VM analysis', 'instruction decoding', 'trace analysis']
        },
        {
          name: 'Anti-Debug Master',
          difficulty: 'Hard',
          points: 400,
          solved: false,
          description: 'Binary with multiple anti-debugging and anti-analysis techniques',
          techniques: ['Anti-debug bypass', 'patching', 'dynamic analysis']
        }
      ]
    },
    web: {
      name: 'Web',
      icon: Globe,
      color: 'cyber-purple',
      description: 'Web application security challenges covering modern attack vectors',
      challenges: [
        {
          name: 'JWT Madness',
          difficulty: 'Medium',
          points: 300,
          solved: true,
          description: 'JWT token manipulation and algorithm confusion attack',
          techniques: ['JWT manipulation', 'alg:none', 'key confusion']
        },
        {
          name: 'GraphQL Injection',
          difficulty: 'Medium',
          points: 250,
          solved: true,
          description: 'Advanced GraphQL introspection and injection attacks',
          techniques: ['GraphQL introspection', 'batch attacks', 'field duplication']
        }
      ]
    },
    crypto: {
      name: 'Cryptography',
      icon: Lock,
      color: 'cyber-pink',
      description: 'Cryptographic challenges requiring mathematical analysis and implementation attacks',
      challenges: [
        {
          name: 'RSA Oracle',
          difficulty: 'Hard',
          points: 400,
          solved: false,
          description: 'Bleichenbacher PKCS#1 v1.5 padding oracle attack',
          techniques: ['Padding oracle', 'RSA', 'chosen ciphertext']
        }
      ]
    }
  };

  const achievements = [
    { icon: Trophy, label: 'Challenges Solved', value: '50+', color: 'cyber-neon' },
    { icon: Star, label: 'Total Points', value: '8,500', color: 'cyber-cyan' },
    { icon: Target, label: 'Categories Mastered', value: '4', color: 'cyber-purple' },
    { icon: Clock, label: 'Hours Invested', value: '500+', color: 'cyber-pink' }
  ];

  const platforms = [
    { name: 'Hack The Box', handle: 'M3thy1', rank: 'Hacker', focus: 'Machines & Challenges' },
    { name: 'TryHackMe', handle: 'M3thy1', rank: '0x8 [Guru]', focus: 'Learning Paths' },
    { name: 'picoCTF', handle: 'M3thy1', rank: 'Competitor', focus: 'Educational' },
    { name: 'CTFtime', handle: 'M3thy1', rating: 'Active', focus: 'Team Competitions' }
  ];

  const writeups = [
    {
      title: 'Heap Arena: tcache poisoning deep dive',
      category: 'Pwn',
      date: '2024-12',
      preview: 'A comprehensive analysis of a complex heap exploitation challenge, covering tcache poisoning techniques and modern glibc heap internals...'
    },
    {
      title: 'VM Protect: Custom VM reversing methodology',
      category: 'Reverse',
      date: '2024-11',
      preview: 'Step-by-step guide to analyzing custom virtual machines in CTF challenges, including instruction set reconstruction and devirtualization...'
    },
    {
      title: 'GraphQL security testing techniques',
      category: 'Web',
      date: '2024-10',
      preview: 'Collection of advanced GraphQL attack techniques including batch queries, field duplication, and introspection abuse...'
    }
  ];

  const currentCategory = categories[activeCategory];

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
          <span className="inline-block px-4 py-2 rounded-full bg-cyber-pink/10 border border-cyber-pink/30 text-cyber-pink text-sm font-mono mb-4">
            &lt;CTF /&gt;
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Capture The </span>
            <span className="text-cyber-pink">Flag</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Competitive security challenges that sharpen offensive skills and foster creative problem-solving
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {achievements.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="cyber-card p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <stat.icon className={`w-8 h-8 text-${stat.color} mx-auto mb-3`} />
              <p className={`text-3xl font-bold text-${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Challenge Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Challenge Categories</h3>
          
          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {Object.entries(categories).map(([key, category]) => (
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
                {category.name}
              </button>
            ))}
          </div>

          {/* Category Content */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="cyber-card p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl bg-${currentCategory.color}/10 border border-${currentCategory.color}/30 flex items-center justify-center`}>
                <currentCategory.icon className={`w-7 h-7 text-${currentCategory.color}`} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">{currentCategory.name}</h4>
                <p className="text-gray-400">{currentCategory.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCategory.challenges.map((challenge, index) => (
                <motion.div 
                  key={challenge.name}
                  className={`p-4 rounded-lg border ${challenge.solved ? 'border-cyber-neon/30 bg-cyber-neon/5' : 'border-gray-700 bg-gray-800/30'}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="text-white font-bold text-sm">{challenge.name}</h5>
                    {challenge.solved && <Flag className="w-4 h-4 text-cyber-neon" />}
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      challenge.difficulty === 'Hard' ? 'bg-red-500/20 text-red-500' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-green-500/20 text-green-500'
                    }`}>
                      {challenge.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-gray-700 text-gray-400">
                      {challenge.points} pts
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mb-2">{challenge.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {challenge.techniques.map(tech => (
                      <span key={tech} className="text-xs text-gray-600 font-mono">
                        #{tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Platforms */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Globe className="text-cyber-cyan" />
              Platforms
            </h3>
            <div className="space-y-4">
              {platforms.map((platform, index) => (
                <motion.div 
                  key={platform.name}
                  className="cyber-card p-5 flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div>
                    <h4 className="text-white font-bold">{platform.name}</h4>
                    <p className="text-cyber-cyan text-sm font-mono">@{platform.handle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">{platform.rank}</p>
                    <p className="text-gray-500 text-xs">{platform.focus}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Writeups */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <FileCode className="text-cyber-purple" />
              Recent Writeups
            </h3>
            <div className="space-y-4">
              {writeups.map((writeup, index) => (
                <motion.div 
                  key={writeup.title}
                  className="cyber-card p-5 cursor-pointer group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-bold text-sm group-hover:text-cyber-purple transition-colors">
                      {writeup.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      writeup.category === 'Pwn' ? 'bg-cyber-neon/20 text-cyber-neon' :
                      writeup.category === 'Reverse' ? 'bg-cyber-cyan/20 text-cyber-cyan' :
                      'bg-cyber-purple/20 text-cyber-purple'
                    }`}>
                      {writeup.category}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mb-2">{writeup.date}</p>
                  <p className="text-gray-400 text-sm line-clamp-2">{writeup.preview}</p>
                  <div className="flex items-center gap-1 text-cyber-purple text-xs mt-3 group-hover:gap-2 transition-all">
                    Read more <ChevronRight size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTF Philosophy */}
        <motion.div 
          className="cyber-card p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-cyber-pink/10 flex items-center justify-center flex-shrink-0">
              <Medal className="w-8 h-8 text-cyber-pink" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Why CTF Matters</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Capture The Flag competitions are more than just games—they are intensive training grounds that simulate 
                real-world security scenarios. Through CTFs, I develop practical skills in vulnerability discovery, 
                exploit development, and creative problem-solving under pressure. Each challenge is an opportunity 
                to learn new techniques, understand complex systems, and push the boundaries of my knowledge.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Zap className="w-4 h-4 text-cyber-neon" />
                  <span>Fast-paced learning</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Users className="w-4 h-4 text-cyber-cyan" />
                  <span>Community engagement</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Target className="w-4 h-4 text-cyber-purple" />
                  <span>Practical skills</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyber-pink/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyber-neon/5 rounded-full blur-3xl" />
    </div>
  );
};

export default CTF;
