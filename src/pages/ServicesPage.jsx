import React from 'react';
import { motion } from 'framer-motion';
import { 
  VectorArrowRight,
  DiagonalArrowIcon,
  ArchIcon,
  WedgeIcon,
  HourglassIcon,
  PillarShapeIcon,
  CrescentBrutalistIcon
} from '../components/SharedUI';
import ScrollTypographyReveal from '../components/ScrollTypographyReveal';
import Effects from '../components/Effects';

const springEase = [0.16, 1, 0.3, 1];

export default function ServicesPage({ onOpenContact, onNavigate }) {
  const [activePracticeItem, setActivePracticeItem] = React.useState('05');

  // 5 Core Growth Services matching the user's reference mockup
  const serviceCards = [
    {
      id: 'product-growth',
      title: 'Product Growth',
      desc: 'From 0→1 to scalable growth. Identify opportunities, validate ideas and take digital products from concept to market and beyond.',
      icon: ArchIcon
    },
    {
      id: 'ecommerce-d2c',
      title: 'E-commerce Growth D2C',
      desc: 'Build, optimize and scale e-commerce businesses across D2C and marketplace channels.',
      icon: HourglassIcon
    },
    {
      id: 'digital-experience',
      title: 'Digital Experience',
      desc: 'Custom software and premium digital experiences that combine brand, technology, usability and conversion.',
      icon: WedgeIcon
    },
    {
      id: 'marketplace-growth',
      title: 'Marketplace Growth',
      desc: 'Scale across Amazon, Noon and regional channels with catalog syndication, algorithmic buy-box protection and inventory operations.',
      icon: PillarShapeIcon
    },
    {
      id: 'technology-architecture',
      title: 'Technology & Architecture',
      desc: 'Enterprise distributed systems, fault-tolerant cloud architecture and predictive AI agents engineered for cross-border resilience.',
      icon: CrescentBrutalistIcon
    }
  ];

  // Practice 03 – Digital Experience Capabilities Matrix
  const practiceRows = [
    [
      { id: '01', title: 'Premium Website Development' },
      { id: '02', title: 'E-commerce Development' }
    ],
    [
      { id: '03', title: 'Shopify Development' },
      { id: '04', title: 'Custom E-commerce' }
    ],
    [
      { id: '05', title: 'UX/UI Design' },
      { id: '06', title: 'Conversion-focused Design' }
    ],
    [
      { id: '07', title: 'Digital Product Development' },
      { id: '08', title: 'Platform Development' }
    ],
    [
      { id: '09', title: 'CRM Integrations' },
      { id: '10', title: 'ERP Integrations' }
    ],
    [
      { id: '11', title: 'Analytics & Tracking' }
    ]
  ];

  return (
    <div className="inner-page services-page services-page--mockup">
      {/* ─── 1. HERO SECTION (SOLID BLACK, 100VH FULL SCREEN) ───────────── */}
      <section className="services-hero-black">
        <div className="services-hero-swirl-layer" aria-hidden="true">
          <Effects kind="swirl" className="metallic-swirl-canvas" />
        </div>
        <div className="container services-hero-container">
          <motion.div 
            className="services-hero-black-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: springEase }}
          >
            <h1 className="services-hero-black-title">
              {"We build businesses for the digital economy.".split(' ').map((word, wIdx, arr) => (
                <span key={wIdx} className="hero-word">
                  <span className="hero-char">{word}</span>
                  {wIdx < arr.length - 1 ? <span className="hero-char-space">&nbsp;</span> : null}
                </span>
              ))}
            </h1>
            <p className="services-hero-black-sub">
              {"From 0→1 to scalable digital growth.".split(' ').map((word, wIdx, arr) => (
                <span key={wIdx} className="hero-word">
                  <span className="hero-char">{word}</span>
                  {wIdx < arr.length - 1 ? <span className="hero-char-space">&nbsp;</span> : null}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. STATEMENT & SHOWCASE SECTION (WHITE) ─────────────────────── */}
      <section className="services-showcase-section">
        <div className="container">
          <div className="services-editorial-statements">
            <ScrollTypographyReveal
              text="We operate at the intersection of digital products, e-commerce and brand strategy, helping businesses across India and KSA build the capabilities needed to scale."
              tag="p"
              className="statement-p1"
              theme="light"
              fromColor="#D1D5DB"
              toColor="#18181B"
              fromOpacity={0.35}
              toOpacity={1}
              stagger={0.03}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
            />
            <ScrollTypographyReveal
              text="Our focus is on creating measurable business impact through design excellence, technology innovation and performance-driven growth."
              tag="p"
              className="statement-p2"
              theme="light"
              fromColor="#E4E4E7"
              toColor="#52525B"
              fromOpacity={0.35}
              toOpacity={1}
              stagger={0.03}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
            />
          </div>

          <motion.div 
            className="services-media-placeholder"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: springEase }}
          >
            <div className="media-placeholder-inner">
              <span className="media-placeholder-tag">UXHUB · DIGITAL BUSINESS GROWTH</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 3. 3 MARKETS. ONE GROWTH MINDSET & 5 BLACK CARDS ───────────── */}
      <section className="services-markets-section">
        <div className="container">
          <div className="services-markets-header">
            <ScrollTypographyReveal
              lines={[
                "3 markets.",
                "One growth mindset"
              ]}
              tag="h2"
              className="services-markets-title"
              theme="dark"
              fromColor="#4A4A4A"
              toColor="#FFFFFF"
              fromOpacity={0.35}
              toOpacity={1}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
            />
          </div>

          {/* 5 Box Cards Grid: 3 top row, 2 bottom row */}
          <div className="services-cards-grid-5">
            {serviceCards.map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <motion.div 
                  key={card.id}
                  className="service-black-card"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: idx * 0.1, ease: springEase }}
                  whileHover={{ y: -8 }}
                  onClick={() => onNavigate('contact')}
                >
                  <div className="service-black-card-icon-box">
                    <CardIcon size={46} color="currentColor" />
                  </div>
                  <h3 className="service-black-card-title">{card.title}</h3>
                  <p className="service-black-card-desc">{card.desc}</p>
                  <div className="service-black-card-arrow">
                    <VectorArrowRight width={16} height={14} color="currentColor" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4. PRACTICE SPOTLIGHT: DIGITAL EXPERIENCE ─────────────────── */}
      <section className="services-practice-section">
        <div className="container">
          <div className="services-practice-grid">
            {/* Left Column: Heading, Description & Action */}
            <motion.div 
              className="services-practice-left"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: springEase }}
            >
              <div className="services-practice-badge">
                <span className="practice-badge-dot" aria-hidden="true" />
                <span className="practice-badge-text">PRACTICE 03 — DIGITAL EXPERIENCE</span>
              </div>

              <ScrollTypographyReveal
                lines={[
                  "Digital experiences",
                  "built for growth."
                ]}
                tag="h2"
                className="services-practice-title"
                theme="light"
                fromColor="#D1D5DB"
                toColor="#0a111a"
                fromOpacity={0.35}
                toOpacity={1}
                start="top 85%"
                end="bottom 50%"
                scrub={0.8}
              />

              <ScrollTypographyReveal
                text="Create websites, commerce platforms and digital products that move customers and businesses forward."
                tag="p"
                className="services-practice-desc"
                theme="light"
                fromColor="#D1D5DB"
                toColor="#5a687c"
                fromOpacity={0.35}
                toOpacity={1}
                stagger={0.035}
                start="top 90%"
                end="bottom 55%"
                scrub={0.8}
              />

              <button 
                className="services-practice-cta"
                onClick={() => onNavigate('contact')}
              >
                <span>BUILD DIGITAL EXPERIENCE</span>
                <span className="practice-cta-circle" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </button>
            </motion.div>

            {/* Right Column: Numbered Matrix & Process Card */}
            <motion.div 
              className="services-practice-right"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
            >
              <div className="practice-matrix">
                {practiceRows.map((row, rowIdx) => (
                  <div key={rowIdx} className="practice-matrix-row">
                    {row.map((item) => {
                      const isActive = activePracticeItem === item.id;
                      return (
                        <div 
                          key={item.id} 
                          className={`practice-matrix-item ${isActive ? 'is-active' : ''}`}
                          onMouseEnter={() => setActivePracticeItem(item.id)}
                        >
                          <span className="practice-item-num">{item.id}</span>
                          <span className="practice-item-title">{item.title}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Bottom Process Card: BRAND ───●─── EXPERIENCE ───●─── GROWTH */}
              <div className="practice-process-card">
                <span className="process-node">BRAND</span>
                <div className="process-connector">
                  <span className="process-dot" />
                </div>
                <span className="process-node">EXPERIENCE</span>
                <div className="process-connector">
                  <span className="process-dot" />
                </div>
                <span className="process-node">GROWTH</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 5. READY TO BUILD WHAT'S NEXT SECTION ──────────────────────── */}
      <section className="services-ready-section">
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
              toColor="#6B7280"
              fromOpacity={0.35}
              toOpacity={1}
              stagger={0.03}
              start="top 80%"
              end="bottom 45%"
              scrub={0.8}
            />

            <button 
              className="services-conversation-btn"
              onClick={() => onNavigate('contact')}
            >
              <span className="conversation-arrow">
                <DiagonalArrowIcon size={16} color="currentColor" />
              </span>
              <span>Start a Conversation</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
