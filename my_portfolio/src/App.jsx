import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Github, ExternalLink, Menu, X, Code, Mail, Linkedin, ChevronDown, Sparkles, Zap, Globe } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

// ─── Custom Cursor Component ───
function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      // Update main cursor instantly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;
      }
    };

    // Lerp-based trail animation for smooth following
    const animateTrail = () => {
      const speed = 0.15;
      trail.current.x += (mouse.current.x - trail.current.x) * speed;
      trail.current.y += (mouse.current.y - trail.current.y) * speed;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trail.current.x - 18}px, ${trail.current.y - 18}px, 0)`;
      }
      rafId.current = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', move, { passive: true });
    rafId.current = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', move);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Bind hover listeners and re-bind on DOM changes
  useEffect(() => {
    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    const bindAll = () => {
      document.querySelectorAll('a, button, [role="button"], .magnetic-hover').forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };

    bindAll();
    const observer = new MutationObserver(bindAll);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor ${hovering ? 'hovering' : ''}`} />
      <div ref={trailRef} className={`cursor-trail ${hovering ? 'hovering' : ''}`} />
    </>
  );
}

// ─── Typewriter Hook ───
function useTypewriter(words, typingSpeed = 100, deletingSpeed = 60, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return text;
}

// ─── Tilt Card Component ───
function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set((y - centerY) / 12 * -1);
    rotateY.set((x - centerX) / 12);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className={`${className} magnetic-hover`}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Counter ───
function AnimatedCounter({ target, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black text-cyan-400 font-mono-accent">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-400 mt-2 uppercase tracking-widest">{label}</div>
    </div>
  );
}

// ─── Radial Skill Gauge ───
function RadialGauge({ name, level, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center gap-3 group"
    >
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <motion.circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={visible ? { strokeDashoffset: circumference * (1 - level / 100) } : {}}
            transition={{ duration: 1.8, ease: 'easeOut', delay: delay + 0.2 }}
          />
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white font-mono-accent group-hover:text-cyan-400 transition-colors">
            {level}%
          </span>
        </div>
      </div>
      <span className="text-sm font-semibold text-gray-300 group-hover:text-cyan-400 transition-colors text-center">
        {name}
      </span>
    </motion.div>
  );
}

// ─── Spotlight Project Card ───
function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  );
}

// ──────────────────────────────────────────────
// MAIN PORTFOLIO COMPONENT
// ──────────────────────────────────────────────
export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const glowRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const typedText = useTypewriter(
    ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'React Specialist'],
    90, 50, 2200
  );

  // Generate starfield
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5
    }));
  }, []);

  // Orbit dots for hero
  const orbitDots = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      delay: i * 1.2,
      duration: 8 + i * 2,
      size: 4 + Math.random() * 4,
      distance: 55 + i * 12,
      color: i % 2 === 0 ? 'bg-cyan-400' : 'bg-blue-400'
    }));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0);

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

    // Use direct DOM manipulation for glow — no React re-renders
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
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
      transition: { staggerChildren: 0.15 }
    }
  };

  const projects = [
    {
      title: "InsurTech",
      description: "A Full-Stack responsive insurance quotation web application. Users can get insurance quotes based on their inputs and make payments through Stripe integration.",
      technologies: ["React", "Node.js", "Tailwind", "Stripe"],
      githubUrl: "https://github.com/Lin18210/InsurTech",
      liveUrl: "https://insur-tech.vercel.app/",
      gradient: "from-yellow-600 to-blue-600"
    },
    {
      title: "Skincare App",
      description: "A Full-Stack responsive skincare web application. Users can get skincare quotes based on their skin type and skin concerns.",
      technologies: ["React", "Node.js", "Tailwind", "Stripe"],
      githubUrl: "https://github.com/Lin18210/Skincare",
      liveUrl: "https://skincare-ruddy-rho.vercel.app/",
      gradient: "from-red-600 to-pink-600"
    },
    {
      title: "Assistant ChatBot",
      description: "A responsive Ai chatbot that provide information of the Guy Heart Photography website and help clients to book consultion sessions.",
      technologies: ["React", "Node.js", "Tailwind", "Stripe"],
      githubUrl: "https://github.com/Lin18210/Guy_Chatbot",
      liveUrl: "https://guy-chatbot.onrender.com",
      gradient: "from-blue-600 to-violet-600"
    },
    {
      title: "Sans Interior",
      description: "A responsive interior design website. Displays studio works.",
      technologies: ["React", "Tailwind"],
      githubUrl: "https://github.com/Lin18210/Sans_Interior",
      liveUrl: "https://sans-interior.vercel.app/",
      gradient: "from-blue-600 to-gray-600"
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
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-cyan-500/30 font-sans dot-grid">

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 z-[60] origin-left"
        style={{ scaleX: scrollProgress, transformOrigin: '0% 0%' }}
      />

      {/* ── Dynamic Background ── */}
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

        {/* Mouse Follow Glow — ref-based, no re-renders */}
        <div
          ref={glowRef}
          className="absolute rounded-full mix-blend-screen"
          style={{
            width: 500,
            height: 500,
            background: 'rgba(6, 182, 212, 0.08)',
            filter: 'blur(100px)',
            willChange: 'transform',
            transition: 'transform 0.3s ease-out',
          }}
        />

        {/* Aurora blobs */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent blur-3xl" />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]"
          style={{ animation: 'aurora 12s ease-in-out infinite' }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[140px]"
          style={{ animation: 'aurora 16s ease-in-out infinite reverse' }}
        />
      </div>

      {/* ── Navigation ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-black/70 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/50' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold tracking-tighter cursor-pointer group"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 font-mono-accent text-lg group-hover:from-white group-hover:to-cyan-300 transition-all duration-300">
                &lt;&gt;
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex nav-links">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  onClick={() => scrollToSection(item)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`capitalize text-sm font-medium tracking-wide px-4 py-2 rounded-full transition-all duration-300 relative ${
                    activeSection === item
                      ? 'text-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-white hover:text-cyan-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
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
              <div className="mobile-menu-stack">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item, idx) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => scrollToSection(item)}
                    className={`block w-full text-left px-4 py-3 capitalize text-lg font-medium rounded-lg transition-all duration-300 ${
                      activeSection === item
                        ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ════════════════════════════════════════════
           HERO SECTION
         ════════════════════════════════════════════ */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto px-4 text-center relative z-10"
        >
          {/* Code icon with orbit dots */}
          <motion.div variants={fadeInUp} className="mb-8 relative inline-block group">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full group-hover:bg-cyan-500/40 transition-all duration-500" />
            <Code className="w-24 h-24 mx-auto text-cyan-400 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform duration-500" />

            {/* Orbiting dots */}
            {orbitDots.map((dot) => (
              <div
                key={dot.id}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: dot.distance * 2,
                  height: dot.distance * 2,
                  animation: `orbit ${dot.duration}s linear infinite`,
                  animationDelay: `${dot.delay}s`,
                }}
              >
                <div
                  className={`${dot.color} rounded-full absolute top-0 left-1/2 -translate-x-1/2 opacity-60`}
                  style={{ width: dot.size, height: dot.size }}
                />
              </div>
            ))}
          </motion.div>

          {/* Name with hover glitch feel */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-8xl font-black mb-6 tracking-tight group"
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-gray-400 animate-gradient-x inline-block"
              whileHover={{
                textShadow: [
                  '0 0 0px transparent',
                  '3px 0 0px rgba(34,211,238,0.4), -3px 0 0px rgba(168,85,247,0.4)',
                  '-2px 0 0px rgba(34,211,238,0.4), 2px 0 0px rgba(168,85,247,0.4)',
                  '0 0 0px transparent'
                ],
                transition: { duration: 0.4 }
              }}
            >
              Lin Thit Thwe
            </motion.span>
          </motion.h1>

          <motion.div variants={fadeInUp} className="h-0.5 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-8 rounded-full" />

          {/* Typewriter subtitle */}
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-light mb-8 text-cyan-400 tracking-widest uppercase h-[40px] md:h-[44px]"
          >
            {typedText}
            <span className="inline-block w-[3px] h-[1em] bg-cyan-400 ml-1 align-text-bottom" style={{ animation: 'blink 1s step-end infinite' }} />
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
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(34,211,238,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
              className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                View Projects
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30" style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: 'rgba(34,211,238,0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full font-bold text-lg text-white hover:bg-white/10 shadow-lg transition-all duration-300"
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
            <ChevronDown className="w-10 h-10 text-white/60 hover:text-cyan-400 transition-colors" />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
           ABOUT SECTION
         ════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</motion.h2>
            <motion.div variants={fadeInUp} className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          </motion.div>

          {/* Animated Counters */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="counter-grid"
            style={{ marginBottom: '64px' }}
          >
            <motion.div variants={fadeInUp}>
              <AnimatedCounter target={12} suffix="+" label="Projects" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <AnimatedCounter target={3} suffix="+" label="Years Exp" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <AnimatedCounter target={10} suffix="+" label="Clients" />
            </motion.div>
          </motion.div>

          <div className="about-grid">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={staggerContainer}
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            >
              <motion.div variants={fadeInUp}>
                <TiltCard className="group glass-card" style={{ padding: '32px', borderRadius: '16px' }}>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">👨‍💻</span> Who I Am
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Experienced full-stack developer with strong proficiency in JavaScript and Python. 
                    I specialize in building modern, scalable web applications using React, Node.js, and creating 
                    seamless user experiences effectively.
                  </p>
                </TiltCard>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <TiltCard className="group glass-card" style={{ padding: '32px', borderRadius: '16px' }}>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">🎯</span> What I Do
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    From e-commerce platforms to booking systems and real-time chat applications, 
                    I bring ideas to life with clean code and high attention to detail.
                  </p>
                </TiltCard>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={staggerContainer}
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            >
              <motion.div variants={fadeInUp}>
                <TiltCard className="group glass-card" style={{ padding: '32px', borderRadius: '16px' }}>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">🎓</span> Education
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="border-l-2 border-cyan-500/30 pl-4 hover:border-cyan-400 transition-colors duration-300">
                      <p className="font-bold text-lg text-white">Bachelor of Computer Science</p>
                      <p className="text-gray-400">Coventry University UK (Singapore)</p>
                      <p className="text-sm text-cyan-500 font-mono-accent mt-1">2023 - 2025</p>
                    </div>
                    <div className="border-l-2 border-cyan-500/30 pl-4 hover:border-cyan-400 transition-colors duration-300">
                      <p className="font-bold text-lg text-white">Diploma in Infocomm Technology</p>
                      <p className="text-gray-400">PSB Academy (Singapore)</p>
                      <p className="text-sm text-cyan-500 font-mono-accent mt-1">2022 - 2023</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <TiltCard className="group glass-card" style={{ padding: '32px', borderRadius: '16px' }}>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">🏆</span> Certifications
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      "Professional Scrum Master I (PSM I)",
                      "JavaScript Foundations - Mozilla",
                      "Responsive Web Design"
                    ].map((cert, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 6 }}
                        className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors cursor-default"
                      >
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span>{cert}</span>
                      </motion.div>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           SKILLS SECTION
         ════════════════════════════════════════════ */}
      <section id="skills" className="py-24 px-4 bg-neutral-900/30 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-4">Skills & Tech</motion.h2>
            <motion.div variants={fadeInUp} className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          </motion.div>

          {/* Radial Gauges */}
          <div className="skills-grid" style={{ marginBottom: '64px' }}>
            {skills.map((skill, index) => (
              <RadialGauge key={index} name={skill.name} level={skill.level} delay={index * 0.1} />
            ))}
          </div>

          {/* Floating Tech Pills */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="tech-pills"
          >
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Firebase', 'AWS', 'Docker', 'Git', 'TailwindCSS', 'Framer Motion', 'Stripe API', 'REST API', 'GraphQL'].map((tech, i) => (
              <motion.span
                key={tech}
                variants={fadeInUp}
                whileHover={{ scale: 1.12, y: -4, boxShadow: '0 8px 25px rgba(34,211,238,0.2)' }}
                className="px-4 py-2 glass-card rounded-full text-sm font-medium text-gray-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           PROJECTS SECTION
         ════════════════════════════════════════════ */}
      <section id="projects" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Work</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg">A collection of my recent projects and experiments</motion.p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: index % 2 === 0 ? -5 : 5 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <SpotlightCard className="project-card group">
                  {/* Gradient bar with animated width on hover */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient} group-hover:h-2 transition-all duration-300`} />
                  <div className="p-8 flex-1 flex flex-col relative z-10">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2">
                      {project.title}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-50 -translate-y-1 group-hover:translate-y-0 transition-all duration-300" />
                    </h3>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-1">{project.description}</p>

                    <div className="mb-6">
                      <div className="tech-tags">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/5 text-gray-300 rounded-md text-xs font-medium border border-white/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group/link"
                      >
                        <Github size={18} className="group-hover/link:rotate-12 transition-transform" />
                        <span>Source</span>
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-all bg-cyan-500/10 px-4 py-2 rounded-full hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           CONTACT SECTION
         ════════════════════════════════════════════ */}
      <section id="contact" className="py-24 px-4 relative">
        {/* Particle ring behind the contact card */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-cyan-500/10"
              style={{
                width: 300 + i * 80,
                height: 300 + i * 80,
                animation: `orbit ${20 + i * 5}s linear infinite${i % 2 === 0 ? ' reverse' : ''}`,
                opacity: 0.15 - i * 0.012,
              }}
            >
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400/40 rounded-full -translate-x-1/2" />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="contact-card relative z-10"
          style={{ maxWidth: '896px', margin: '0 auto', textAlign: 'center', padding: '48px' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/20"
          >
            <Mail className="w-8 h-8 text-cyan-400" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Let's Build Something Amazing</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="contact-buttons">
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.95 }}
              href="mailto:thitlin906@gmail.com"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] relative overflow-hidden"
            >
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="relative z-10">Send Email</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-15 transition-opacity duration-300" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.4)' }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/Lin18210"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center rounded-full font-bold text-lg text-white transition-all duration-300"
              style={{ gap: '12px', padding: '16px 32px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }}
            >
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(59,130,246,0.3)' }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com/in/lin-thit-thwe"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center rounded-full font-bold text-lg text-blue-400 transition-all duration-300"
              style={{ gap: '12px', padding: '16px 32px', border: '1px solid rgba(37,99,235,0.3)', background: 'rgba(37,99,235,0.1)' }}
            >
              <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>LinkedIn</span>
            </motion.a>
          </div>

          <div className="text-gray-500" style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="mb-2 hover:text-gray-300 transition-colors">📞 +66 95 020 2284</p>
            <p className="hover:text-gray-300 transition-colors">📍 Bangkok, Thailand</p>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 text-gray-500 text-sm" style={{ padding: '32px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', background: '#000' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="mb-2">&copy; 2025 Lin Thit Thwe. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1">
            <span className="text-red-500 animate-pulse">❤️</span>
          </p>
        </motion.div>
      </footer>
    </div>
  );
}