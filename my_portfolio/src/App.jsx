import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Menu, X, Code, Mail, Linkedin, ChevronDown } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'about', 'projects', 'contact'];
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

  const projects = [
    {
      title: "Social Media Republic",
      description: "A responsive photography booking website with Stripe payment integration. Displays studio works and services with date booking functionality for shooting sessions.",
      technologies: ["React", "Node.js", "Tailwind", "Stripe"],
      githubUrl: "https://github.com/Lin18210/SRM_Front",
      liveUrl: "https://srm-front.vercel.app/",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      title: "Travel-Agency Website",
      description: "A full-featured Travel platform built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      githubUrl: "https://github.com/Lin18210/travel-web",
      liveUrl: "https://frontend-travel-tau.vercel.app/",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      title: "Hotel Reservation",
      description: "A responsive hotel booking website that displays available rooms and places for multiple cities with beautiful interface.",
      technologies: ["React", "Node.js", "Tailwind"],
      githubUrl: "https://github.com/Lin18210/travel-web",
      liveUrl: "https://hotel-dr7s.vercel.app/",
      gradient: "from-teal-400 to-cyan-500"
    },
    {
      title: "Cafe Menu Order App",
      description: "A collaborative order management application with real-time updates, check-out functionality, and filtering features.",
      technologies: ["React", "TailwindCss"],
      githubUrl: "https://github.com/Lin18210/My-Cafe",
      liveUrl: "https://my-cafe-zeta.vercel.app/",
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      title: "Bakery Portfolio",
      description: "A responsive Bakery Portfolio website for the client that displays the works and services of the hers.",
      technologies: ["React", "Tailwind "],
      githubUrl: "https://github.com/Lin18210/Bakery-",
      liveUrl: "https://bakery-gules-ten.vercel.app/",
      gradient: "from-sky-400 to-blue-500"
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
      gradient: "from-violet-400 to-indigo-500"
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: `${mousePosition.y / 10}px`,
            left: `${mousePosition.x / 10}px`,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            bottom: `${mousePosition.y / 15}px`,
            right: `${mousePosition.x / 15}px`,
            transition: 'all 0.3s ease-out',
            animationDelay: '1s'
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/70 backdrop-blur-xl z-50 border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
              
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:text-cyan-400 transition-all duration-300 relative group ${
                    activeSection === item ? 'text-cyan-400' : ''
                  }`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform transition-transform duration-300 ${
                    activeSection === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-xl border-t border-cyan-500/20 animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 capitalize hover:bg-cyan-500/10 rounded transition-all duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-blue-600/10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className={`max-w-4xl mx-auto px-4 text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6 relative">
            <Code className="w-20 h-20 mx-auto text-cyan-400 animate-bounce" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl animate-pulse"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
            Lin Thit Thwe
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-cyan-400">
            Full Stack Web Developer
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-fadeIn">
            Crafting beautiful, responsive web experiences with modern technologies
          </p>
          <p className="text-lg text-gray-400 mb-8 animate-fadeIn">
            📍 Bangkok, Thailand
          </p>
          <div className="flex justify-center gap-4 animate-fadeIn" style={{animationDelay: '0.3s'}}>
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold hover:scale-105 transform transition-all shadow-lg hover:shadow-cyan-500/50 relative overflow-hidden group"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border-2 border-cyan-400 rounded-full font-semibold hover:bg-cyan-400/10 transition-all hover:scale-105 transform"
            >
              Get In Touch
            </button>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="transform hover:scale-105 transition-transform duration-300 p-6 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">👨‍💻 Who I Am</h3>
                <p className="text-gray-300 leading-relaxed">
                  Experienced full-stack developer with strong proficiency in JavaScript and Python. 
                  I specialize in building modern, scalable web applications using React, Node.js, and creating 
                  seamless user experiences with beautiful, responsive designs.
                </p>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300 p-6 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">🎯 What I Do</h3>
                <p className="text-gray-300 leading-relaxed">
                  From e-commerce platforms to booking systems and real-time chat applications, 
                  I bring ideas to life with clean code and attention to detail. Passionate about contributing 
                  to the IT industry and committed to continuous learning.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="transform hover:scale-105 transition-transform duration-300 p-6 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">🎓 Education</h3>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <p className="font-semibold">Bachelor of Computer Science</p>
                    <p className="text-sm text-gray-400">Coventry University UK (Singapore)</p>
                    <p className="text-xs text-cyan-400">2023 - 2025</p>
                  </div>
                  <div>
                    <p className="font-semibold">Diploma in Infocomm Technology</p>
                    <p className="text-sm text-gray-400">PSB Academy (Singapore)</p>
                    <p className="text-xs text-cyan-400">2022 - 2023</p>
                  </div>
                </div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300 p-6 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">🏆 Certifications</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span className="text-sm">Professional Scrum Master I (PSM I)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span className="text-sm">JavaScript Foundations - Mozilla</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span className="text-sm">Responsive Web Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-slate-800/30 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-lg group-hover:text-cyan-400 transition-colors">{skill.name}</span>
                  <span className="text-cyan-400 font-bold">{skill.level}%</span>
                </div>
                <div className="h-4 bg-slate-900/50 rounded-full overflow-hidden border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000 relative overflow-hidden"
                    style={{ width: `${skill.level}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 group"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className={`h-2 bg-gradient-to-r ${project.gradient} group-hover:h-3 transition-all duration-300`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-800/50 text-cyan-400 rounded-full text-xs border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-all hover:scale-110 transform"
                    >
                      <Github className="w-5 h-5" />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-cyan-400 hover:text-blue-400 transition-all hover:scale-110 transform"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-slate-800/30 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Have a project in mind? Let's create something amazing together!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:thitlin906@gmail.com"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:scale-110 transform transition-all shadow-lg hover:shadow-cyan-500/50 group"
            >
              <Mail className="w-5 h-5 group-hover:animate-bounce" />
              <span>thitlin906@gmail.com</span>
            </a>
            <a
              href="https://github.com/Lin18210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 border-2 border-cyan-400 rounded-full hover:bg-cyan-400/10 transition-all hover:scale-110 transform group"
            >
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/lin-thit-thwe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 border-2 border-cyan-400 rounded-full hover:bg-cyan-400/10 transition-all hover:scale-110 transform group"
            >
              <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>LinkedIn</span>
            </a>
          </div>
          <div className="mt-8 text-gray-400">
            <p>📱 +66 95 020 2284</p>
            <p className="mt-2">📍 Bangkok, Thailand</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-cyan-500/20 text-center text-gray-400 bg-slate-900/50 backdrop-blur-sm relative z-10">
        <p>&copy; 2025 Developer Portfolio. Built with React & TailwindCSS</p>
        <p className="text-sm mt-2 text-cyan-400/60">Crafted with 💙 and lots of coffee</p>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}