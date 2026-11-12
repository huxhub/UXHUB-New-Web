import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  DiagonalArrowIcon 
} from '../components/SharedUI';
import ScrollTypographyReveal from '../components/ScrollTypographyReveal';

const springEase = [0.16, 1, 0.3, 1];

// ─── Minimalist Animated Counter ──────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', prefix = '', duration = 1600 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const numericTarget = parseFloat(target.toString().replace(/[^0-9.]/g, ''));
    if (isNaN(numericTarget)) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    let frameId;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * numericTarget);

      setCount(currentVal);

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCounter);
      } else {
        setCount(numericTarget);
      }
    };

    frameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frameId);
  }, [started, target, duration]);

  return (
    <span ref={ref} className="minimal-counter-number">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function AboutPage({ onOpenContact, onNavigate }) {
  const heroRef = useRef(null);

  // Hero section parallax & smooth fade out
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);
  const smoothHeroY = useSpring(heroY, { stiffness: 90, damping: 22 });
  const smoothHeroOpacity = useSpring(heroOpacity, { stiffness: 90, damping: 22 });

  const stats = [
    {
      id: 'projects',
      value: '150',
      suffix: '+',
      label: 'Digital Platforms',
      desc: 'High-conversion storefronts, SaaS applications, and enterprise software launched.'
    },
    {
      id: 'retention',
      value: '98',
      suffix: '%',
      label: 'Client Retention',
      desc: 'Long-term partners who rely on UXHUB for continuous technical execution.'
    },
    {
      id: 'markets',
      value: '3',
      suffix: ' Markets',
      label: 'Cross-Border Reach',
      desc: 'Active digital commerce operations across India, Saudi Arabia, and UAE.'
    },
    {
      id: 'velocity',
      value: '10',
      suffix: 'x',
      label: 'Scale Velocity',
      desc: 'Average improvement in transaction throughput, load speed, and market launch time.'
    }
  ];

  const standards = [
    {
      num: '01',
      tag: 'PURPOSE',
      title: 'Delivering experiences that transform how customers feel about your business.',
      desc: 'We believe digital transformation is meaningless without commercial impact. Every line of code, millisecond of load time, and micro-interaction is engineered to elevate brand prestige and drive conversions.'
    },
    {
      num: '02',
      tag: 'CROSS-BORDER DEPTH',
      title: 'Regional cultural fluency paired with international engineering rigor.',
      desc: 'From our base in Kerala to rapid-growth enterprises in Riyadh, Jeddah, and Dubai, we bridge technical execution with deep Middle East commerce know-how — including Arabic RTL typography, regional payment rails (Mada, Tamara, Tabby), and localized compliance.'
    },
    {
      num: '03',
      tag: 'MODULAR ARCHITECTURE',
      title: 'Zero bloat. Resilient systems engineered for 100x traffic peaks.',
      desc: 'We discard rigid monoliths in favor of modern headless stacks, microservices, and event-driven cloud topologies. Our architectures run with sub-second latencies and gracefully scale during peak flash sales and seasonal surges.'
    },
    {
      num: '04',
      tag: 'RADICAL OWNERSHIP',
      title: 'Technical co-founders and growth architects, not ticket-takers.',
      desc: 'We embed deeply within your executive and product teams. We don’t just deliver handoffs; we own end-to-end performance, conversion metrics, and revenue growth. When our partners win, we win.'
    }
  ];

  const disciplines = [
    {
      index: '01',
      title: 'Design & Experience',
      desc: 'Crafting intuitive, conversion-first interfaces that combine beauty, speed, and behavioral science.',
      items: [
        'UX Research & Strategy',
        'Enterprise Design Systems',
        'Bilingual Arabic RTL & Latin Typography',
        'Conversion Rate Optimization (CRO)',
        'Mobile & Web Application Design'
      ]
    },
    {
      index: '02',
      title: 'Technology & Cloud',
      desc: 'Modern, modular software engineering designed for extreme durability and frictionless scale.',
      items: [
        'Headless Shopify & Next.js Platforms',
        'Custom Web & Enterprise SaaS',
        'Microservices & API Architecture',
        'Cloud-Native Infra (AWS, GCP, Vercel)',
        'ERP, CRM & Payment Rail Integrations'
      ]
    },
    {
      index: '03',
      title: 'Growth & Intelligence',
      desc: 'Compounding digital business growth with data telemetry, AI automation, and marketplace dominance.',
      items: [
        'Amazon & Noon Marketplace Scale',
        'Algorithmic Buy-Box Optimization',
        'AI Agents & Workflow Automation',
        'Retention & Lifecycle Infrastructure',
        'Full-Funnel Analytics (Mixpanel, GA4)'
      ]
    }
  ];

  return (
    <div className="inner-page about-page minimal-about">
      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO (LIGHT / WHITE) — Minimalist Editorial Typography with Spring Parallax
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="about-hero-minimal light-section">
        <div className="container about-hero-container">
          <motion.div 
            className="about-hero-content"
            style={{ y: smoothHeroY, opacity: smoothHeroOpacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: springEase }}
          >
            <h1 className="about-hero-title">
              Engineering digital growth.
            </h1>

            <p className="about-hero-sub">
              Kerala's global digital business consultancy — architecting scalable software, high-conversion commerce, and resilient enterprise systems since 2018.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. STATEMENT (DARK / SOLID BLACK) — Pure Kinetic Scrollytelling
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="about-statement-minimal dark-section">
        <div className="container about-statement-container">
          <ScrollTypographyReveal 
            theme="dark"
            tag="h2"
            className="about-statement-headline"
            lines={[
              "We don't just build websites.",
              "We architect competitive advantages."
            ]}
          />

          <div className="about-statement-body">
            <ScrollTypographyReveal 
              theme="dark"
              tag="p"
              className="statement-lead"
              fromColor="#4A4A4A"
              toColor="rgba(255, 255, 255, 0.9)"
              fromOpacity={0.35}
              toOpacity={1}
              stagger={0.025}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
              text="Founded on the belief that digital business models must be engineered for speed, durability, and exponential scale, UXHUB partners with ambitious enterprises and modern founders across India and the GCC."
            />
            <ScrollTypographyReveal 
              theme="dark"
              tag="p"
              className="statement-secondary"
              fromColor="#3A3A3A"
              toColor="#9ca3af"
              fromOpacity={0.35}
              toOpacity={1}
              stagger={0.02}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
              text="Most agencies focus on deliverables. We focus on growth outcomes. From validating digital product concepts and architecting scalable cloud platforms to scaling e-commerce businesses and automating operations, we help businesses build the capabilities they need to compete and lead in digital-first markets."
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. STATS (LIGHT / WHITE) — Clean Borderless Columns
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="about-stats-minimal light-section">
        <div className="container">
          <div className="about-section-header-minimal">
            <ScrollTypographyReveal 
              theme="light"
              tag="h2"
              className="minimal-title"
              fromColor="#D1D5DB"
              toColor="#000000"
              fromOpacity={0.35}
              toOpacity={1}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
              text="Big Dreams, Bigger Numbers."
            />
            <ScrollTypographyReveal 
              theme="light"
              tag="p"
              className="minimal-desc"
              fromColor="#D1D5DB"
              toColor="#666666"
              fromOpacity={0.35}
              toOpacity={1}
              stagger={0.025}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
              text="We are moving ahead with relentless energy to achieve results that speak volumes."
            />
          </div>

          <div className="about-stats-columns">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.id}
                className="about-stat-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: springEase, delay: idx * 0.08 }}
              >
                <div className="minimal-stat-num-wrap">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="minimal-stat-label">{stat.label}</h3>
                <p className="minimal-stat-desc">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. THE UXHUB STANDARD (DARK / SOLID BLACK) — Minimalist Editorial Sequence
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="about-standards-minimal dark-section">
        <div className="container">
          <div className="about-section-header-minimal dark-header">
            <ScrollTypographyReveal 
              theme="dark"
              tag="h2"
              className="minimal-title"
              fromColor="#4A4A4A"
              toColor="#FFFFFF"
              fromOpacity={0.35}
              toOpacity={1}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
              text="How we create exponential value."
            />
          </div>

          <div className="about-standards-list">
            {standards.map((item, idx) => (
              <motion.div 
                key={item.num}
                className="about-standard-row"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: springEase, delay: idx * 0.08 }}
              >
                <div className="standard-meta">
                  <span className="standard-num">{item.num}</span>
                  <span className="standard-tag">{item.tag}</span>
                </div>
                <div className="standard-content">
                  <h3 className="standard-title">{item.title}</h3>
                  <p className="standard-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. DISCIPLINES (LIGHT / WHITE) — 3 Clean Architectural Columns
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="about-disciplines-minimal light-section">
        <div className="container">
          <div className="about-section-header-minimal">
            <ScrollTypographyReveal 
              theme="light"
              tag="h2"
              className="minimal-title"
              fromColor="#D1D5DB"
              toColor="#000000"
              fromOpacity={0.35}
              toOpacity={1}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
              text="Three pillars of digital dominance."
            />
            <ScrollTypographyReveal 
              theme="light"
              tag="p"
              className="minimal-desc"
              fromColor="#D1D5DB"
              toColor="#666666"
              fromOpacity={0.35}
              toOpacity={1}
              stagger={0.025}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
              text="Integrated end-to-end capabilities designed to take your brand from validation to compound market leadership."
            />
          </div>

          <div className="about-disciplines-grid">
            {disciplines.map((col, idx) => (
              <motion.div 
                key={col.index}
                className="about-discipline-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: springEase, delay: idx * 0.1 }}
              >
                <span className="discipline-num">{col.index}</span>
                <h3 className="discipline-title">{col.title}</h3>
                <p className="discipline-desc">{col.desc}</p>

                <ul className="discipline-list">
                  {col.items.map((item, iIdx) => (
                    <li key={iIdx} className="discipline-item">
                      <span className="discipline-bullet">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. READY TO BUILD WHAT'S NEXT (LIGHT / WHITE)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="services-ready-section light-section">
        <div className="container">
          <div className="services-ready-content">
            <ScrollTypographyReveal
              text="Ready to build what's next?"
              tag="h2"
              className="services-ready-heading"
              theme="light"
              fromColor="#D1D5DB"
              toColor="#000000"
              fromOpacity={0.35}
              toOpacity={1}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
            />

            <ScrollTypographyReveal
              text="Tell us what you're trying to build, launch or grow."
              tag="p"
              className="services-ready-subhead"
              theme="light"
              fromColor="#D1D5DB"
              toColor="#71717a"
              fromOpacity={0.35}
              toOpacity={1}
              stagger={0.03}
              start="top 80%"
              end="bottom 45%"
              scrub={0.8}
            />

            <button 
              type="button"
              className="services-conversation-btn"
              onClick={() => onNavigate ? onNavigate('contact') : onOpenContact?.()}
              aria-label="Start a Conversation"
            >
              <span className="conversation-arrow">
                <DiagonalArrowIcon size={20} color="currentColor" />
              </span>
              <span>Start a Conversation</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
