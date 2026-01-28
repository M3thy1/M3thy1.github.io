import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Clock, Tag, ChevronRight, Calendar,
  Terminal, Cpu, Shield, Lock, FileText, Eye
} from 'lucide-react';

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: 'Introduction to Binary Exploitation: From Stack Overflows to ROP',
      excerpt: 'A comprehensive guide for beginners looking to understand the fundamentals of binary exploitation. We cover stack-based buffer overflows, modern mitigation techniques, and how to construct your first ROP chain.',
      content: `Binary exploitation is the art of making programs do things they weren't designed to do. At its core, it involves understanding how software works at the machine level and identifying ways to subvert that functionality for unintended purposes.

## The Stack and Its Vulnerabilities

The call stack is fundamental to program execution. It stores local variables, function parameters, and return addresses. When a program writes more data to a stack-allocated buffer than it can hold, the excess data overflows into adjacent memory, potentially overwriting critical values like the return address.

Consider this vulnerable C program:

\`\`\`c
void vulnerable_function() {
    char buffer[64];
    gets(buffer);  // Dangerous: no bounds checking
}
\`\`\`

The \\\`gets\\\` function reads input until a newline, with no limit on how much data it will accept. If we provide more than 64 bytes, we overflow the buffer and can overwrite the saved return address.

## Exploitation Steps

1. **Offset Calculation**: Determine exactly how many bytes we need to write before reaching the return address. This is typically done through pattern generation and analysis.

2. **Shellcode Development**: Write position-independent code that executes our desired payload—typically spawning a shell.

3. **Return Address Overwrite**: Replace the legitimate return address with the address of our shellcode.

## Modern Mitigations

Modern systems employ numerous protections:

- **ASLR (Address Space Layout Randomization)**: Randomizes memory addresses
- **NX (No-Execute)**: Marks stack and heap as non-executable
- **Stack Canaries**: Detects stack buffer overflows before return
- **PIE (Position Independent Executable)**: Randomizes base address of executable

## Return-Oriented Programming (ROP)

When NX prevents direct shellcode execution, we turn to ROP. Instead of injecting code, we chain together existing code snippets called "gadgets" that end with a \\\`ret\\\` instruction. Each gadget performs a small operation, and by carefully sequencing them, we can achieve arbitrary code execution.

A simple ROP chain might:
1. Pop a value into a register
2. Move that value to a function argument register
3. Call a function like \\\`system()\\\`

## Getting Started

For those interested in learning binary exploitation:

1. Start with simple stack overflow challenges on picoCTF or OverTheWire
2. Learn to use GDB with pwndbg or GEF
3. Study x86-64 assembly and calling conventions
4. Practice ROP chain construction with ROPgadget or ROPeer
5. Gradually tackle more complex scenarios with modern mitigations

The journey from your first buffer overflow to reliable exploit development is challenging but immensely rewarding. Each vulnerability class you master opens new possibilities in understanding and securing software.`,
      date: '2025-01-15',
      readTime: '12 min read',
      tags: ['Binary Exploitation', 'ROP', 'Beginner'],
      icon: Terminal,
      color: 'cyber-neon',
      views: 1240
    },
    {
      id: 2,
      title: 'AI-Powered Debugging: Integrating LLMs with GDB through MCP',
      excerpt: 'Exploring how the Model Context Protocol enables natural language interaction with debuggers, revolutionizing the reverse engineering workflow for security researchers.',
      content: `The intersection of artificial intelligence and cybersecurity tooling represents one of the most significant shifts in how security research is conducted. My work on Pwndbg-MCP demonstrates how Large Language Models can be seamlessly integrated into traditional debugging workflows.

## The Model Context Protocol (MCP)

MCP is a standardized protocol that allows AI assistants to interact with external tools and data sources. Think of it as a "USB-C for AI applications"—a universal interface that enables LLMs to connect to various services, databases, and tools.

For debugging, MCP provides:

- **Structured Tool Definitions**: Debuggers expose their capabilities through standardized schemas
- **Context Management**: Conversation history and debugging state persist across interactions
- **Action Execution**: Natural language requests translate to specific debugger commands
- **Response Formatting**: Complex debugger output is structured for AI consumption

## Architecture Overview

The Pwndbg-MCP server implements the protocol specification to bridge Claude (or other MCP-compatible LLMs) with GDB:

\`\`\`python
@mcp.tool()
def gdb_disassemble_function(session_id: str, function_name: str) -> str:
    """Disassemble a function by name"""
    gdb = sessions.get(session_id)
    if not gdb:
        return "Error: Session not found"
    
    result = gdb.execute(f"disassemble {function_name}", to_string=True)
    return result
\`\`\`

## Practical Applications

### Automated Vulnerability Analysis

Researchers can ask natural language questions about binary behavior:
- "What functions handle user input in this program?"
- "Show me all calls to strcpy and check if they're safe"
- "Analyze this crash and suggest the vulnerability type"

### Educational Assistance

For those learning reverse engineering:
- "Explain what this assembly sequence does"
- "Why is this function vulnerable to buffer overflow?"
- "Walk me through the stack layout during this function call"

### Exploit Development

Experienced researchers can accelerate their workflow:
- "Find ROP gadgets that give me control of RDI"
- "Calculate the offset to the return address"
- "Suggest a payload structure for this vulnerability"

## Implementation Challenges

Building effective AI-debugger integration required solving several technical challenges:

**State Management**: GDB sessions must maintain state across multiple interactions while preventing resource leaks.

**Output Parsing**: Debugger output formats vary and require flexible parsing strategies.

**Context Limits**: LLMs have limited context windows, necessitating intelligent summarization of debugging sessions.

**Security**: Executing arbitrary debugger commands carries risks that must be carefully managed.

## The Future of AI-Augmented Security

As LLMs continue improving, we can expect:

- **Automated Root Cause Analysis**: AI systems that triage crashes and identify vulnerability classes
- **Intelligent Fuzzing**: LLM-guided input generation that understands code semantics
- **Natural Language Decompilation**: High-level pseudocode generation from assembly
- **Collaborative Reverse Engineering**: AI assistants that learn from and contribute to team knowledge

The Pwndbg-MCP project is just the beginning. The protocol's open nature encourages community contributions, and I anticipate rapid advancement in AI-security tooling over the coming years.`,
      date: '2025-01-08',
      readTime: '10 min read',
      tags: ['AI', 'MCP', 'GDB', 'Debugging'],
      icon: Cpu,
      color: 'cyber-cyan',
      views: 890
    },
    {
      id: 3,
      title: 'Understanding Modern Heap Exploitation: Tcache and Beyond',
      excerpt: 'Deep dive into the evolution of heap exploitation techniques, from the original dlmalloc to modern ptmalloc2 with tcache, and the techniques used to bypass contemporary protections.',
      content: `Heap exploitation has evolved dramatically since the early days of memory corruption research. Understanding this evolution is crucial for modern vulnerability researchers and exploit developers.

## Historical Context

Early heap implementations like dlmalloc were relatively simple, using explicit linked lists to track free chunks. Exploitation often involved corrupting these linked lists to achieve arbitrary write primitives.

Modern glibc (ptmalloc2) introduced numerous protections:
- Safe unlinking verification
- Double-free detection
- Tcache (per-thread caching)
- Pointer encryption (safe-linking)

## The Tcache Mechanism

Introduced in glibc 2.26, tcache provides per-thread caching of small chunks to improve performance. Each thread maintains its own cache of up to 7 chunks per size class (24-1032 bytes on 64-bit).

The tcache structure:
\`\`\`c
typedef struct tcache_entry {
    struct tcache_entry *next;
    // Contains encrypted pointer (safe-linking)
} tcache_entry;

typedef struct tcache_perthread_struct {
    uint16_t counts[TCACHE_MAX_BINS];
    tcache_entry *entries[TCACHE_MAX_BINS];
} tcache_perthread_struct;
\`\`\`

## Key Exploitation Techniques

### Tcache Poisoning

By corrupting the \\\`next\\\` pointer in a tcache entry, we can control where the next allocation returns memory from:

1. Free a chunk to the tcache
2. Overwrite its \\\`next\\\` pointer with target address
3. Next two allocations return controlled addresses

### House of Spirit

Create fake chunks on the stack or in global data, then free them to corrupt heap metadata. With tcache, this becomes more reliable due to fewer integrity checks.

### Tcache Dup (Double Free)

Modern glibc attempts to prevent double-free by checking if a chunk is already in the tcache. However, techniques exist to bypass these checks by corrupting the counts array or using different threads.

## Modern Protection Bypasses

### Safe-Linking

Glibc 2.32 introduced pointer encryption for single-linked lists:
\`\`\`c
#define PROTECT_PTR(pos, ptr) \
  ((__typeof(ptr))((((size_t) pos) >> 12) ^ ((size_t) ptr)))
\`\`\`

This XORs pointers with the storage location shifted right by 12 bits (ASLR bits). Bypass requires either:
- Heap address leak
- Partial overwrite techniques
- Brute force in specific scenarios

### Tcache Stashing Unlink Attack

A powerful technique combining tcache with unsorted bin operations to achieve arbitrary writes with fewer primitives.

## Defensive Recommendations

For developers:
1. Use memory-safe languages where possible (Rust, Go)
2. Implement hardened allocators (jemalloc, mimalloc)
3. Enable all exploit mitigations (ASLR, NX, stack canaries)
4. Use AddressSanitizer in development
5. Regular security audits and fuzzing

## Future Directions

Research continues into:
- Hardware memory tagging (ARM MTE)
- Software memory tagging (HWASAN)
- Formally verified memory allocators
- AI-assisted vulnerability detection

The cat-and-mouse game between exploit developers and defense mechanisms continues to drive innovation in both offensive and defensive security.`,
      date: '2024-12-20',
      readTime: '15 min read',
      tags: ['Heap', 'Exploitation', 'Advanced'],
      icon: Lock,
      color: 'cyber-purple',
      views: 1560
    },
    {
      id: 4,
      title: 'Web Application Security: Beyond the OWASP Top 10',
      excerpt: 'Modern web applications face sophisticated attacks that go far beyond traditional injection vulnerabilities. This article explores emerging threat vectors and defensive strategies.',
      content: `While the OWASP Top 10 provides an essential foundation for web security, modern applications face a landscape of increasingly sophisticated attacks that require deeper understanding and more nuanced defenses.

## GraphQL Security

GraphQL's flexibility introduces unique security challenges:

### Introspection Abuse
\`\`\`graphql
{
  __schema {
    types {
      name
      fields {
        name
        type {
          name
        }
      }
    }
  }
}
\`\`\`

Attackers use introspection to map the entire API surface. Defense: disable introspection in production.

### Query Depth and Complexity

Nested queries can cause denial of service:
\`\`\`graphql
{
  user {
    friends {
      friends {
        friends {  # Infinite recursion potential
          name
        }
      }
    }
  }
}
\`\`\`

Implement query depth limiting and complexity analysis.

### Batch Attacks

GraphQL's ability to execute multiple operations in a single request enables timing-based attacks and bypasses of rate limiting.

## API Security

### Mass Assignment

Modern frameworks make it easy to inadvertently expose sensitive fields:
\`\`\`javascript
// Vulnerable
app.post('/user', (req, res) => {
    User.create(req.body);  // Attacker can add isAdmin: true
});
\`\`\`

Defense: explicit allowlisting of updatable fields.

### JWT Security

Common JWT vulnerabilities include:
- **Algorithm Confusion**: Switching from RS256 to HS256
- **None Algorithm**: Using "alg": "none"
- **Key Confusion**: Injecting JWK with attacker-controlled key
- **Expired Token Replay**: Insufficient server-side invalidation

### OAuth and OIDC

Authorization code flow implementations frequently contain:
- Missing state parameter validation
- Insufficient PKCE implementation
- Token leakage through referrer headers
- Open redirect vulnerabilities

## Supply Chain Security

### Dependency Confusion

Attackers publish malicious packages with names matching internal dependencies:
\`\`\`json
{
  "dependencies": {
    "@company-internal/utils": "^1.0.0"  // May resolve to public package
  }
}
\`\`\`

### Prototype Pollution

JavaScript's prototype chain can be manipulated through object merging:
\`\`\`javascript
const merge = require('lodash.merge');
merge({}, JSON.parse('{"__proto__": {"isAdmin": true}}'));
// All objects now have isAdmin property!
\`\`\`

## Modern Defense Strategies

### Zero Trust Architecture

- Never trust, always verify
- Principle of least privilege
- Continuous authentication and authorization
- Micro-segmentation

### Security Headers

Essential headers for modern applications:
\`\`\`
Content-Security-Policy: default-src 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=()
\`\`\`

### Runtime Application Self-Protection (RASP)

RASP provides real-time attack detection and prevention by monitoring application behavior from within.

## The Road Ahead

Emerging challenges include:
- **WebAssembly Security**: New attack surface in browser and server environments
- **Edge Computing**: Distributed security enforcement challenges
- **AI-Powered Attacks**: Automated vulnerability discovery and exploitation
- **Post-Quantum Cryptography**: Preparing for quantum computing threats

Staying current requires continuous learning and active participation in the security community.`,
      date: '2024-12-05',
      readTime: '12 min read',
      tags: ['Web Security', 'GraphQL', 'API'],
      icon: Shield,
      color: 'cyber-pink',
      views: 720
    },
    {
      id: 5,
      title: 'Building a Security Research Lab: Tools and Infrastructure',
      excerpt: 'A practical guide to setting up an effective security research environment, from hardware selection to virtualization and tooling configuration.',
      content: `A well-configured research environment is essential for productive security work. This guide covers building a comprehensive lab for vulnerability research, malware analysis, and exploit development.

## Hardware Considerations

### Primary Workstation
- **CPU**: Multi-core processor with virtualization support (Intel VT-x/AMD-V)
- **RAM**: 32GB minimum, 64GB recommended for large-scale fuzzing
- **Storage**: Fast NVMe SSD for host OS, additional SSDs for VM storage
- **GPU**: Optional but useful for password cracking and ML workloads

### Network Infrastructure
- Isolated network segment for malware analysis
- Hardware firewall for traffic monitoring
- Managed switch for VLAN segmentation

## Virtualization Stack

### Hypervisor Selection

**KVM/QEMU**: Best performance for Linux hosts
- Native kernel integration
- Excellent snapshot support
- GPU passthrough capabilities

**VMware Workstation**: User-friendly with advanced features
- Drag-and-drop file sharing
- Unity mode for seamless integration
- Excellent Windows guest support

**VirtualBox**: Free and open source
- Good cross-platform support
- Extensible through VirtualBox API
- Limited advanced features

### VM Organization

Create purpose-specific VMs:
- **Windows 10/11**: Primary reverse engineering target
- **Ubuntu**: Linux exploitation and tool development
- **Kali/Parrot**: Penetration testing toolkit
- **REMnux**: Malware analysis environment
- **Windows Server**: Active Directory attack practice

## Essential Tools

### Binary Analysis
\`\`\`bash
# Disassemblers and decompilers
ida-pro          # Industry standard
ghex             # Free alternative
ghidra           # NSA's open source suite

# Debuggers
gdb + pwndbg     # Linux debugging
x64dbg           # Windows debugging
windbg           # Windows kernel debugging
ollg             # OllyDbg successor

# Static analysis
binwalk          # Firmware extraction
radare2          # Complete framework
rizin            # radare2 fork
\`\`\`

### Dynamic Analysis
\`\`\`bash
# Sandboxes
any.run          # Interactive sandbox
cuckoo           # Automated analysis

# Monitoring
procmon          # Process monitoring
regmon           # Registry monitoring
wireshark        # Network analysis
\`\`\`

### Fuzzing Infrastructure
\`\`\`bash
# Fuzzers
afl++            # Coverage-guided fuzzing
libfuzzer        # In-process fuzzing
honggfuzz        # Multi-process fuzzing

# Support tools
qbd              # QEMU-based instrumentation
dynamoRIO        # Dynamic instrumentation
pin              # Intel's instrumentation tool
\`\`\`

## Containerized Analysis

Docker provides isolated, reproducible analysis environments:

\`\`\`dockerfile
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y \
    gdb \
    python3-pwndbg \
    binutils \
    strace \
    ltrace
WORKDIR /analysis
\`\`\`

Benefits:
- Instant environment reproduction
- Version pinning for consistency
- Easy sharing with colleagues
- Clean state between analyses

## Network Architecture

### Isolated Analysis Network
\`\`\`
[Internet] ←→ [Firewall] ←→ [Host OS]
                              ↓
                    [Virtual Switch - NAT]
                              ↓
              [Isolated VM Network - Host-Only]
                              ↓
              [Analysis VMs - No Internet Access]
\`\`\`

### Traffic Analysis Setup
- **INetSim**: Simulates common internet services
- **FakeNet-NG**: Windows network simulation
- **Burp Suite**: Web traffic interception
- **Mitmproxy**: Programmable proxy

## Automation and Orchestration

### Analysis Pipeline
\`\`\`python
#!/usr/bin/env python3
import subprocess
import json

def analyze_sample(sample_path):
    # Static analysis
    strings_output = subprocess.run(['strings', sample_path], capture_output=True)
    
    # Extract indicators
    indicators = extract_iocs(strings_output.stdout)
    
    # Dynamic analysis in sandbox
    sandbox_result = submit_to_sandbox(sample_path)
    
    # Generate report
    report = {
        'sample': sample_path,
        'indicators': indicators,
        'behavior': sandbox_result,
        'timestamp': datetime.now().isoformat()
    }
    
    return report
\`\`\`

### Continuous Integration

Automate tool testing and environment validation:
- Pre-commit hooks for code quality
- Automated VM snapshot testing
- Regular tool update verification

## Security Considerations

### Host Isolation
- Run analysis VMs on dedicated hardware when possible
- Use separate user accounts with limited privileges
- Disable shared folders and clipboard sharing
- Regular host system imaging for quick recovery

### Data Handling
- Encrypt sensitive research data
- Implement secure deletion procedures
- Maintain chain of custody for evidence
- Follow responsible disclosure practices

## Conclusion

A well-designed research lab accelerates productivity and enables safe analysis of malicious materials. Start with core functionality and iteratively improve based on research needs. The investment in proper tooling pays dividends in research quality and efficiency.`,
      date: '2024-11-18',
      readTime: '14 min read',
      tags: ['Lab', 'Tools', 'Infrastructure'],
      icon: FileText,
      color: 'cyber-neon',
      views: 2100
    }
  ];

  const tags = [...new Set(articles.flatMap(a => a.tags))];

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
            &lt;Blog /&gt;
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Security </span>
            <span className="gradient-text">Writings</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            In-depth articles on binary exploitation, reverse engineering, and cybersecurity research
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div 
          className="flex justify-center gap-3 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-sm font-mono hover:bg-cyber-neon/10 hover:text-cyber-neon cursor-pointer transition-colors">
              #{tag}
            </span>
          ))}
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="cyber-card p-8 lg:p-12 cursor-pointer group"
               onClick={() => setSelectedArticle(articles[0])}>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyber-neon/20 text-cyber-neon text-xs font-mono">
                    Featured
                  </span>
                  {articles[0].tags.map(tag => (
                    <span key={tag} className="text-gray-500 text-xs font-mono">#{tag}</span>
                  ))}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-cyber-neon transition-colors">
                  {articles[0].title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{articles[0].excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} />
                    {articles[0].date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} />
                    {articles[0].readTime}
                  </span>
                  <span className="flex items-center gap-2">
                    <Eye size={14} />
                    {articles[0].views} views
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-32 h-32 rounded-2xl bg-cyber-neon/10 border border-cyber-neon/30 flex items-center justify-center">
                  {(() => {
                    const FeaturedIcon = articles[0].icon;
                    return <FeaturedIcon className="w-16 h-16 text-cyber-neon" />;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {articles.slice(1).map((article, index) => (
            <motion.div 
              key={article.id}
              className="cyber-card p-6 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              onClick={() => setSelectedArticle(article)}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${article.color}/10 flex items-center justify-center`}>
                  <article.icon className={`w-6 h-6 text-${article.color}`} />
                </div>
                <div className="flex gap-2">
                  {article.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-neon transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={12} />
                  {article.views}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div 
          className="cyber-card p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <BookOpen className="w-12 h-12 text-cyber-cyan mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            New articles on security research, exploit development, and reverse engineering published regularly.
          </p>
          <div className="flex gap-3 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan"
            />
            <button className="px-6 py-3 bg-cyber-cyan/20 text-cyber-cyan rounded-lg border border-cyber-cyan/30 hover:bg-cyber-cyan/30 transition-colors font-mono">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedArticle(null)}
            />
            <motion.div 
              className="relative bg-cyber-dark border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-8">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center"
                >
                  ×
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <selectedArticle.icon className={`w-8 h-8 text-${selectedArticle.color}`} />
                  {selectedArticle.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 rounded-full bg-gray-800 text-gray-400 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{selectedArticle.title}</h2>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-800">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} />
                    {selectedArticle.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} />
                    {selectedArticle.readTime}
                  </span>
                  <span className="flex items-center gap-2">
                    <Eye size={14} />
                    {selectedArticle.views} views
                  </span>
                </div>
                <div className="prose prose-invert prose-gray max-w-none">
                  {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-xl font-bold text-white mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                    }
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={index} className="text-lg font-bold text-cyber-cyan mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <ul key={index} className="list-disc list-inside space-y-2 text-gray-400 mb-4">
                          {paragraph.split('\n').map((item, i) => (
                            <li key={i}>{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (paragraph.startsWith('```')) {
                      return (
                        <pre key={index} className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4">
                          <code className="text-cyber-neon text-sm font-mono">
                            {paragraph.replace(/```\w*\n?/g, '')}
                          </code>
                        </pre>
                      );
                    }
                    return <p key={index} className="text-gray-400 leading-relaxed mb-4">{paragraph}</p>;
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-cyber-neon/5 rounded-full blur-3xl" />
    </div>
  );
};

export default Blog;
