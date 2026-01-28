import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Terminal, Code2, Cpu, Shield, ArrowRight, Star, GitFork, Eye } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 'pwndbg-mcp',
      title: 'Pwndbg-MCP',
      tagline: 'AI-Powered GDB Debugging Interface',
      description: 'A Model Context Protocol (MCP) server that revolutionizes binary debugging by enabling seamless integration between Large Language Models and GDB. This tool bridges the gap between classical debugging workflows and modern AI assistance, allowing researchers to leverage natural language for complex debugging operations.',
      longDescription: `Pwndbg-MCP represents a paradigm shift in how security researchers interact with debugging tools. By implementing the Model Context Protocol, this server transforms GDB from a traditional command-line debugger into an intelligent, conversational debugging assistant.

The architecture leverages Python's asyncio for high-performance concurrent session management, allowing multiple debugging contexts to operate simultaneously. Each GDB session is encapsulated with full state preservation, enabling researchers to switch between different analysis contexts seamlessly.

Key technical innovations include:

1. **MCP Protocol Implementation**: Full compliance with Anthropic's Model Context Protocol specification, enabling integration with Claude Desktop, VSCode Copilot, and other MCP-compatible AI clients.

2. **Session Management**: Sophisticated session lifecycle management with unique identifiers, automatic cleanup, and resource tracking to prevent memory leaks during extended debugging sessions.

3. **Command Abstraction Layer**: A comprehensive API that maps natural language intent to precise GDB commands, handling the complexity of debugger syntax while exposing high-level semantic operations.

4. **Memory Analysis Integration**: Deep integration with pwndbg's advanced memory analysis capabilities, including heap visualization, stack frame inspection, and register state tracking.

5. **Real-time Output Streaming**: WebSocket-inspired streaming architecture for real-time debugger output, enabling interactive debugging workflows with AI assistants.`,
      tech: ['Python', 'GDB', 'MCP', 'AsyncIO', 'pwndbg'],
      github: 'https://github.com/M3thy1/Pwndbg-MCP',
      demo: null,
      stats: { stars: 12, forks: 3 },
      features: [
        'Multi-session GDB management with persistent state',
        'Natural language debugging command translation',
        'Integration with Claude Desktop and VSCode Copilot',
        'Advanced memory analysis and disassembly',
        'Breakpoint and watchpoint management',
        'Core dump analysis capabilities',
        'Thread and process inspection',
        'Automated stack trace generation'
      ],
      icon: Cpu,
      color: 'cyber-neon'
    },
    {
      id: 'security-research-framework',
      title: 'Security Research Framework',
      tagline: 'Modular Toolkit for Vulnerability Analysis',
      description: 'A comprehensive Python framework for systematic vulnerability research, providing standardized interfaces for fuzzing, instrumentation, and crash analysis. Designed to accelerate the vulnerability discovery lifecycle.',
      longDescription: `The Security Research Framework (SRF) is an evolving collection of modular tools designed to standardize and accelerate common vulnerability research workflows. Born from the necessity to stop reinventing the wheel for each research project, SRF provides battle-tested components that can be composed into powerful analysis pipelines.

At its core, SRF implements a plugin-based architecture where each component follows strict interface contracts, ensuring interoperability while allowing for deep customization. The framework draws inspiration from industry-standard tools while providing modern Python 3.10+ features like pattern matching and improved type hints.

The fuzzing module wraps AFL++ and libFuzzer with a unified configuration interface, automatically handling corpus management, crash deduplication, and coverage reporting. Instrumentation components leverage Intel Pin and DynamoRIO for dynamic binary analysis, with Python bindings for rapid prototyping of analysis tools.

The crash analysis subsystem integrates with various debugging backends to automatically triage crashes, perform root cause analysis, and generate exploit primitives. This dramatically reduces the time from crash discovery to understanding the underlying vulnerability.

Future development roadmap includes:
- Integration with symbolic execution engines (Angr, Triton)
- Machine learning-based crash classification
- Automated exploit generation for common vulnerability classes
- Distributed fuzzing coordination`,
      tech: ['Python', 'AFL++', 'Pin', 'DynamoRIO', 'Docker'],
      github: 'https://github.com/M3thy1',
      demo: null,
      stats: { stars: 8, forks: 2 },
      features: [
        'Modular plugin architecture',
        'Unified fuzzing interface (AFL++, libFuzzer)',
        'Dynamic binary instrumentation',
        'Automated crash triage and analysis',
        'Coverage visualization and reporting',
        'Docker-based reproducible environments',
        'CI/CD integration for continuous testing',
        'Extensible exploit primitive generation'
      ],
      icon: Shield,
      color: 'cyber-cyan'
    },
    {
      id: 'binary-analysis-platform',
      title: 'Binary Analysis Platform',
      tagline: 'Web-Based Reverse Engineering Environment',
      description: 'A modern web interface for collaborative reverse engineering, providing browser-based disassembly, decompilation, and annotation sharing. Enables distributed teams to analyze binaries together in real-time.',
      longDescription: `The Binary Analysis Platform addresses a critical gap in modern reverse engineering workflows: the difficulty of collaboration. Traditional tools like IDA Pro and Ghidra are fundamentally single-user experiences, making team-based analysis cumbersome and error-prone.

This platform reimagines reverse engineering for the web era, providing a collaborative environment where multiple researchers can simultaneously analyze the same binary, share annotations, and build collective understanding. The architecture separates the heavy lifting of binary analysis into containerized backend services while providing a responsive React-based frontend.

The disassembly view is built on a custom virtualized scrolling engine capable of handling multi-million instruction binaries with smooth performance. Each instruction can be annotated with comments, cross-references are automatically generated and visualized, and function boundaries are detected using multiple heuristics.

Integration with Ghidra's decompiler provides pseudo-C output with synchronization between assembly and decompiled views. Clicking an instruction in disassembly highlights the corresponding line in decompilation, and vice versa.

The collaborative layer uses operational transforms to ensure consistency across concurrent edits, similar to Google Docs. Researchers can see each other's cursors, follow colleagues to specific addresses, and engage in contextual discussions anchored to specific code locations.

Security considerations are paramount: all binary processing happens in isolated containers, network communication is encrypted, and fine-grained access controls ensure sensitive analysis remains restricted to authorized team members.`,
      tech: ['React', 'WebAssembly', 'Python', 'Ghidra', 'WebSockets'],
      github: 'https://github.com/M3thy1',
      demo: null,
      stats: { stars: 15, forks: 5 },
      features: [
        'Real-time collaborative disassembly',
        'Synchronized decompilation view',
        'Contextual annotation and commenting',
        'Cross-reference visualization',
        'Function and data structure recovery',
        'Role-based access control',
        'Containerized analysis environment',
        'Plugin system for custom analyzers'
      ],
      icon: Code2,
      color: 'cyber-purple'
    }
  ];

  const currentProject = projects[activeProject];

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
          <span className="inline-block px-4 py-2 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-sm font-mono mb-4">
            &lt;Projects /&gt;
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Featured </span>
            <span className="gradient-text-purple">Research Tools</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Open-source tools and frameworks developed to advance the state of security research
          </p>
        </motion.div>

        {/* Project Navigation */}
        <motion.div 
          className="flex justify-center gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={`px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                activeProject === index
                  ? `bg-${project.color}/20 border-${project.color} text-${project.color} border`
                  : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              {project.title}
            </button>
          ))}
        </motion.div>

        {/* Project Detail View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Main Project Card */}
            <div className="cyber-card p-8 lg:p-12 mb-8">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Left Column - Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-${currentProject.color}/10 border border-${currentProject.color}/30 flex items-center justify-center`}>
                      <currentProject.icon className={`w-8 h-8 text-${currentProject.color}`} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{currentProject.title}</h3>
                      <p className={`text-${currentProject.color} font-mono`}>{currentProject.tagline}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {currentProject.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {currentProject.tech.map(tech => (
                      <span key={tech} className={`px-3 py-1 rounded-full bg-${currentProject.color}/10 text-${currentProject.color} text-sm font-mono border border-${currentProject.color}/20`}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <a 
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-white"
                    >
                      <Github size={18} />
                      View Source
                    </a>
                    {currentProject.demo && (
                      <a 
                        href={currentProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-cyber-neon/20 rounded-lg hover:bg-cyber-neon/30 transition-colors text-cyber-neon border border-cyber-neon/30"
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column - Stats & Features */}
                <div>
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                      <p className="text-xl font-bold text-white">{currentProject.stats.stars}</p>
                      <p className="text-gray-500 text-xs">Stars</p>
                    </div>
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <GitFork className="w-5 h-5 text-cyber-cyan mx-auto mb-1" />
                      <p className="text-xl font-bold text-white">{currentProject.stats.forks}</p>
                      <p className="text-gray-500 text-xs">Forks</p>
                    </div>
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <Eye className="w-5 h-5 text-cyber-purple mx-auto mb-1" />
                      <p className="text-xl font-bold text-white">100+</p>
                      <p className="text-gray-500 text-xs">Views</p>
                    </div>
                  </div>

                  {/* Features List */}
                  <h4 className="text-white font-bold mb-4">Key Features</h4>
                  <ul className="space-y-2">
                    {currentProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-400 text-sm">
                        <ArrowRight className={`w-4 h-4 text-${currentProject.color} mt-0.5 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Deep Dive */}
              <div className="mt-12 pt-8 border-t border-gray-800">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Terminal className="text-cyber-neon" />
                  Technical Deep Dive
                </h4>
                <div className="prose prose-invert prose-gray max-w-none">
                  {currentProject.longDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-400 leading-relaxed mb-4">
                      {paragraph.startsWith('**') ? (
                        <span className="text-white font-semibold">
                          {paragraph.replace(/\*\*/g, '')}
                        </span>
                      ) : paragraph.startsWith('- ') ? (
                        <ul className="list-disc list-inside space-y-1">
                          {paragraph.split('\n').map((item, i) => (
                            <li key={i} className="text-gray-400">{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Other Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">Additional Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Exploit Development Kit',
                description: 'Collection of shellcode templates, ROP chain generators, and exploit primitives for common vulnerability classes.',
                tech: ['Python', 'Assembly', 'C'],
                status: 'In Development'
              },
              {
                title: 'CTF Automation Suite',
                description: 'Automated flag submission, challenge categorization, and team coordination tools for CTF competitions.',
                tech: ['Go', 'React', 'Redis'],
                status: 'Beta'
              },
              {
                title: 'Vulnerability Scanner',
                description: 'Lightweight static analysis tool for identifying common security issues in C/C++ source code.',
                tech: ['Rust', 'LLVM', 'Tree-sitter'],
                status: 'Planning'
              }
            ].map((project, index) => (
              <motion.div 
                key={project.title}
                className="cyber-card p-6 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <Code2 className="text-cyber-cyan group-hover:text-cyber-neon transition-colors" size={24} />
                  <span className={`px-2 py-1 rounded text-xs font-mono ${
                    project.status === 'In Development' ? 'bg-yellow-500/20 text-yellow-500' :
                    project.status === 'Beta' ? 'bg-cyber-cyan/20 text-cyber-cyan' :
                    'bg-gray-700 text-gray-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-neon transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span key={tech} className="text-xs text-gray-500 font-mono">#{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl" />
    </div>
  );
};

export default Projects;
