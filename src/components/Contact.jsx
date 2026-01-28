import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Mail, Send, Github, MessageCircle, Shield, 
  Terminal, Copy, Check, ExternalLink, MapPin,
  Clock, AlertTriangle
} from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: Github,
      title: 'GitHub',
      value: '@M3thy1',
      link: 'https://github.com/M3thy1',
      description: 'Open source projects and contributions',
      color: 'cyber-neon'
    },
    {
      icon: MessageCircle,
      title: 'Telegram',
      value: '@m3thy1',
      link: 'https://t.me/m3thy1',
      description: 'Direct messaging for quick questions',
      color: 'cyber-cyan'
    },
    {
      icon: Shield,
      title: 'HackerOne',
      value: 'M3thy1',
      link: 'https://hackerone.com/m3thy1',
      description: 'Responsible vulnerability disclosure',
      color: 'cyber-pink'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'research', label: 'Research Collaboration' },
    { value: 'vulnerability', label: 'Vulnerability Report' },
    { value: 'speaking', label: 'Speaking Opportunity' },
    { value: 'consulting', label: 'Security Consulting' }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '', type: 'general' });
    }, 3000);
  };

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
            &lt;Contact /&gt;
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Get In </span>
            <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Open for research collaboration, vulnerability reports, and security consulting opportunities
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Contact Methods</h3>
            
            <div className="space-y-4 mb-12">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-card p-6 flex items-center gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className={`w-14 h-14 rounded-xl bg-${method.color}/10 border border-${method.color}/30 flex items-center justify-center group-hover:bg-${method.color}/20 transition-colors`}>
                    <method.icon className={`w-7 h-7 text-${method.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold">{method.title}</h4>
                    <p className="text-cyber-cyan font-mono text-sm">{method.value}</p>
                    <p className="text-gray-500 text-sm">{method.description}</p>
                  </div>
                  <ExternalLink className="text-gray-600 group-hover:text-cyber-neon transition-colors" size={20} />
                </motion.a>
              ))}
            </div>

            {/* PGP Key */}
            <motion.div 
              className="cyber-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-cyber-neon" size={24} />
                <h4 className="text-white font-bold">PGP Public Key</h4>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                For sensitive communications, please encrypt messages using my PGP key.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-400 mb-4">
                <p className="text-cyber-neon mb-2"># Fingerprint</p>
                <p className="break-all">A1B2 C3D4 E5F6 7890 1234 5678 9ABC DEF0 1234 5678</p>
              </div>
              <button 
                onClick={() => handleCopy('A1B2 C3D4 E5F6 7890 1234 5678 9ABC DEF0 1234 5678')}
                className="flex items-center gap-2 text-cyber-neon text-sm hover:text-cyber-cyan transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Fingerprint'}
              </button>
            </motion.div>

            {/* Response Time */}
            <motion.div 
              className="mt-6 cyber-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="text-cyber-cyan" size={20} />
                <h4 className="text-white font-bold">Response Time</h4>
              </div>
              <p className="text-gray-400 text-sm">
                I typically respond to inquiries within 24-48 hours. For urgent security matters, 
                please use Telegram for faster response.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
            
            <div className="cyber-card p-8">
              {submitted ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-cyber-neon/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-cyber-neon" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Inquiry Type</label>
                    <select 
                      value={formState.type}
                      onChange={(e) => setFormState({...formState, type: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-neon transition-colors"
                    >
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Name</label>
                      <input 
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-neon transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Email</label>
                      <input 
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-neon transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subject</label>
                    <input 
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({...formState, subject: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-neon transition-colors"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-neon transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-yellow-500/80 text-xs">
                      For sensitive security matters, please consider using my PGP key or reaching 
                      out via secure channels. Do not include sensitive credentials in this form.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full cyber-button flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Alternative Contact */}
            <motion.div 
              className="mt-6 p-6 border border-dashed border-gray-700 rounded-lg text-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              <Terminal className="w-8 h-8 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">
                Prefer command line? Reach out via any of the social links above, 
                or check my GitHub for project-specific issues and discussions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyber-neon/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl" />
    </div>
  );
};

export default Contact;
