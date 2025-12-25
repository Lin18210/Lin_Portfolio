import React, { useState, useEffect, useMemo } from 'react';
import { Github, ExternalLink, Menu, X, Code, Mail, Linkedin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Generate stars for background
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5
    }));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const projects = [
    {
      title: "Assistant ChatBot",
      description: "A responsive Ai chatbot that provide information of the Guy Heart Photography website and help clients to book consultion sessions.",
      technologies: ["React", "Node.js", "Tailwind", "Stripe"],
      githubUrl: "https://github.com/Lin18210/Guy_Chatbot",
      liveUrl: "https://guy-chatbot.onrender.com",
      gradient: "from-blue-600 to-violet-600"
    },
    {
      title: "Mochi Desk Sim",
      description: "A small desktop companion web that walk around and do random thing on the screen.",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/Lin18210/Desk_Sim",
      liveUrl: "https://desk-sim.vercel.app//",
      gradient: "from-orange-400 to-pink-500"
    },
    {
      title: "Social Media Republic",
      description: "A responsive photography booking website with Stripe payment integration. Displays studio works and services with date booking functionality for shooting sessions.",
      technologies: ["React", "Node.js", "Tailwind", "Stripe"],
      githubUrl: "https://github.com/Lin18210/SRM_Front",
      liveUrl: "https://srm-front.vercel.app/",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Guy Heart Photography",
      description: "A responsive wedding photography website. Displays studio works and services with date booking functionality for shooting sessions.",
      technologies: ["React", "Node.js", "Tailwind", "Stripe"],
      githubUrl: "https://github.com/Lin18210/Guy_Heart_Photography",
      liveUrl: "https://guy-heart-photography.vercel.app/",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      title: "Travel-Agency Website",
      description: "A full-featured Travel platform built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      githubUrl: "https://github.com/Lin18210/travel-web",
      liveUrl: "https://frontend-travel-tau.vercel.app/",
      gradient: "from-emerald-400 to-cyan-500"
    },
    
    {
      title: "Cafe Menu Order App",
      description: "A collaborative order management application with real-time updates, check-out functionality, and filtering features.",
      technologies: ["React", "TailwindCss"],
      githubUrl: "https://github.com/Lin18210/My-Cafe",
      liveUrl: "https://my-cafe-zeta.vercel.app/",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      title: "Bakery Portfolio",
      description: "A responsive Bakery Portfolio website for the client that displays the works and services of the hers.",
      technologies: ["React", "Tailwind "],
      githubUrl: "https://github.com/Lin18210/Bakery-",
      liveUrl: "https://bakery-gules-ten.vercel.app/",
      gradient: "from-pink-400 to-rose-500"
    },
    {
      title: "Cat Gallery",
      description: "My cat gallery website.",
      technologies: ["React", "Tailwind "],
      githubUrl: "https://github.com/Lin18210/Bone-Bone",
      liveUrl: "https://bone-bone.vercel.app/",
      gradient: "from-indigo-400 to-purple-500"
    },
    {
      title: "Valentine Project",
      description: "A fun valentine day project, for couples.",
      technologies: ["React", "Tailwind "],
      githubUrl: "https://github.com/Lin18210/Valentine_M",
      liveUrl: "https://valentine-m.vercel.app/",
      gradient: "from-red-500 to-pink-600"
    }
  ];

  const skills = [
    { name: "React & JavaScript", level: 90 },
    { name: "Node.js & Python", level: 85 },
    { name: "HTML, CSS & TailwindCSS", level: 95 },
    { name: "PostgreSQL & MongoDB", level: 80 },
    { name: "Firebase & AWS", level: 75 },
    { name: "Git, Docker & Agile", level: 85 }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-cyan-500/30 font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0.2, scale: 1 }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
        
        {/* Mouse Follow Glow */}
        <motion.div 
          className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen"
          animate={{
            x: mousePosition.x - 250,
            y: mousePosition.y - 250
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        />

        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Area (Empty as requested) */}
            <div className="text-xl font-bold tracking-tighter hover:tracking-wide transition-all duration-300 cursor-pointer group">
              
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize text-sm font-medium tracking-wide hover:text-cyan-400 transition-colors duration-300 relative group ${
                    activeSection === item ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                  <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-cyan-400 transform transition-transform duration-300 origin-left ${
                    activeSection === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-cyan-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`block w-full text-left px-4 py-3 capitalize text-lg font-medium rounded-lg transition-all duration-300 ${
                      activeSection === item 
                        ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto px-4 text-center relative z-10"
        >
          <motion.div variants={fadeInUp} className="mb-8 relative inline-block group">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full group-hover:bg-cyan-500/40 transition-all duration-500"></div>
            <Code className="w-24 h-24 mx-auto text-cyan-400 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform duration-500" />
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-8xl font-black mb-6 tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-gray-400 animate-gradient-x">
              Lin Thit Thwe
            </span>
          </motion.h1>

          <motion.div variants={fadeInUp} className="h-0.5 w-24 bg-cyan-500/50 mx-auto mb-8 rounded-full" />

          <motion.h2 
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-light mb-8 text-cyan-400 tracking-widest uppercase"
          >
            Full Stack Web Developer
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Crafting immersive, high-performance web experiences with modern architecture and stunning designs.
            <span className="block mt-2 text-sm text-cyan-500/80">Based in Bangkok, Thailand 📍</span>
          </motion.p>
          
          <motion.div 
            variants={fadeInUp} 
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
              className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] relative overflow-hidden group"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full font-bold text-lg text-white hover:bg-white/10 hover:border-white/50 shadow-lg"
            >
              Contact Me
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer" 
            onClick={() => scrollToSection('about')}
          >
            <ChevronDown className="w-10 h-10 text-white" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</motion.h2>
            <motion.div variants={fadeInUp} className="h-1 w-20 bg-cyan-500 mx-auto rounded-full"></motion.div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="group p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-colors duration-300">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
                  <span className="text-3xl">👨‍💻</span> Who I Am
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Experienced full-stack developer with strong proficiency in JavaScript and Python. 
                  I specialize in building modern, scalable web applications using React, Node.js, and creating 
                  seamless user experiences effectively.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="group p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-colors duration-300">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎯</span> What I Do
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  From e-commerce platforms to booking systems and real-time chat applications, 
                  I bring ideas to life with clean code and high attention to detail.
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="group p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-colors duration-300">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎓</span> Education
                </h3>
                <div className="space-y-6">
                  <div className="border-l-2 border-cyan-500/30 pl-4">
                    <p className="font-bold text-lg text-white">Bachelor of Computer Science</p>
                    <p className="text-gray-400">Coventry University UK (Singapore)</p>
                    <p className="text-sm text-cyan-500 font-mono mt-1">2023 - 2025</p>
                  </div>
                  <div className="border-l-2 border-cyan-500/30 pl-4">
                    <p className="font-bold text-lg text-white">Diploma in Infocomm Technology</p>
                    <p className="text-gray-400">PSB Academy (Singapore)</p>
                    <p className="text-sm text-cyan-500 font-mono mt-1">2022 - 2023</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="group p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-colors duration-300">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🏆</span> Certifications
                </h3>
                <div className="space-y-3">
                  {[
                    "Professional Scrum Master I (PSM I)",
                    "JavaScript Foundations - Mozilla",
                    "Responsive Web Design"
                  ].map((cert, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 bg-neutral-900/30 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-4">Skills & Tech</motion.h2>
            <motion.div variants={fadeInUp} className="h-1 w-20 bg-cyan-500 mx-auto rounded-full"></motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {skills.map((skill, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-lg text-gray-200 group-hover:text-cyan-400 transition-colors">{skill.name}</span>
                  <span className="text-cyan-400 font-mono font-bold">{skill.level}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Work</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg">A collection of my recent projects and experiments</motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-neutral-900 border border-white/5 rounded-xl overflow-hidden hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] group flex flex-col h-full"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`}></div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-1">{project.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/5 text-gray-300 rounded-md text-xs font-medium border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={18} />
                      <span>Source</span>
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-500/10 px-4 py-2 rounded-full hover:bg-cyan-500/20"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10 bg-gradient-to-b from-neutral-900 to-black p-12 rounded-3xl border border-white/10 shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Let's Build Something Amazing</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:thitlin906@gmail.com"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Send Email</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/Lin18210"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 border border-white/20 bg-black rounded-full font-bold text-lg text-white hover:bg-white/10"
            >
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com/in/lin-thit-thwe"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 border border-blue-600/30 bg-blue-600/10 rounded-full font-bold text-lg text-blue-400 hover:bg-blue-600/20"
            >
              <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>LinkedIn</span>
            </motion.a>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 text-gray-500">
            <p className="mb-2">📞 +66 95 020 2284</p>
            <p>📍 Bangkok, Thailand</p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 text-center text-gray-500 bg-black relative z-10 text-sm">
        <p className="mb-2">&copy; 2025 Lin Thit Thwe. All rights reserved.</p>
        <p>Built with React, Tailwind & ❤️</p>
      </footer>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}