import React, { useState } from 'react';
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

export default function ProductPage({ onOpenContact, onNavigate }) {
  const [activeMatrixItem, setActiveMatrixItem] = useState('02');

  // Core Product Accelerators & Engines
  const productCards = [
    {
      id: 'price-intelligence',
      title: 'Pulse Intelligence',
      badge: 'PROPRIETARY SAAS',
      desc: 'Algorithmic pricing telemetry and Buy-Box automation for Amazon, Noon, and high-volume D2C storefronts.',
      icon: ArchIcon,
      metrics: '50k+ Monitored SKUs'
    },
    {
      id: 'commerce-os',
      title: 'HyperCommerce Core',
      badge: 'HEADLESS ENGINE',
      desc: 'Next.js 15 & Hydrogen headless commerce stack engineered for sub-second page loads, Arabic RTL, and regional payment rails.',
      icon: HourglassIcon,
      metrics: '<400ms TTFB'
    },
    {
      id: 'enterprise-dxp',
      title: 'Enterprise DXP',
      badge: 'CUSTOM SOFTWARE',
      desc: 'Modular, event-driven enterprise application core with multi-region AWS/GCP failover and zero-downtime deployment.',
      icon: WedgeIcon,
      metrics: '99.99% Edge SLA'
    },
    {
      id: 'omniflow-ai',
      title: 'OmniFlow Automation',
      badge: 'AI ORCHESTRATION',
      desc: 'Autonomous AI workflow agents that eliminate operational drag, sync bi-directional ERP/CRM state, and predict inventory churn.',
      icon: PillarShapeIcon,
      metrics: '10x Faster Sync'
    },
    {
      id: 'growth-telemetry',
      title: 'Telemetry Hub',
      badge: 'DATA PLATFORM',
      desc: 'Full-funnel attribution and real-time customer cohort modeling built directly on BigQuery and edge analytics.',
      icon: CrescentBrutalistIcon,
      metrics: 'Real-Time Telemetry'
    }
  ];

  // Technical Architecture Capabilities Matrix
  const matrixRows = [
    [
      { id: '01', title: 'Edge-Native Compute (Cloudflare Workers & AWS)' },
      { id: '02', title: 'Real-Time Buy-Box Optimization (Amazon & Noon)' }
    ],
    [
      { id: '03', title: 'GCC Regional Payment Rails (Mada, Tamara, Tabby)' },
      { id: '04', title: 'Headless Storefront Architecture (Next.js & Hydrogen)' }
    ],
    [
      { id: '05', title: 'Sub-Second Arabic RTL Typography & Localization' },
      { id: '06', title: 'ISO-27001 & CITC Regulatory Compliance' }
    ],
    [
      { id: '07', title: 'Event-Driven Microservices & Webhook Routing' },
      { id: '08', title: 'Bi-Directional ERP Sync (SAP, Oracle, Zoho)' }
    ],
    [
      { id: '09', title: 'Predictive Inventory Telemetry & Stock Alerts' },
      { id: '10', title: 'Full-Funnel Commerce Analytics & Mixpanel GA4' }
    ]
  ];

  return (
    <div className="inner-page product-page services-page--mockup">
      {/* ─── 1. HERO SECTION (SOLID BLACK, 100VH FULL SCREEN) ───────────── */}
      <section className="services-hero-black">
        <div className="services-hero-swirl-layer" aria-hidden="true">
          <Effects kind="swirl" className="metallic-swirl-canvas" />
        </div>
        <div className="container services-hero-container">
          <motion.div 
            className="services-hero-black-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: springEase }}
          >
            <h1 className="services-hero-black-title">
              Software engines built for scale.
            </h1>
            <p className="services-hero-black-sub">
              Proprietary digital products and accelerators engineered for high-throughput commerce and cross-border resilience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. STATEMENT & SHOWCASE SECTION (WHITE) ─────────────────────── */}
      <section className="services-showcase-section">
        <div className="container">
          <div className="services-editorial-statements">
            <ScrollTypographyReveal
              text="We don't just deliver custom software. We architect proprietary product platforms that turn complex operational bottlenecks into compounding commercial advantages."
              tag="p"
              className="statement-p1"
              theme="light"
              fromColor="#9CA3AF"
              toColor="#18181B"
              fromOpacity={0.5}
              toOpacity={1}
              stagger={0.03}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
            />
            <ScrollTypographyReveal
              text="From real-time algorithmic marketplace pricing to headless commerce storefronts operating across India and Saudi Arabia, our platforms power mission-critical revenue streams."
              tag="p"
              className="statement-p2"
              theme="light"
              fromColor="#9CA3AF"
              toColor="#3F3F46"
              fromOpacity={0.5}
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
              <span className="media-placeholder-tag">UXHUB · PROPRIETARY SOFTWARE PLATFORMS</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 3. PRODUCT SUITE (SOLID BLACK, 5 PREMIUM CARDS) ─────────────── */}
      <section className="services-markets-section">
        <div className="container">
          <div className="services-markets-header">
            <ScrollTypographyReveal
              lines={[
                "Engineered for speed.",
                "Proven in production."
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

          <div className="services-cards-grid-5">
            {productCards.map((card, idx) => {
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
                  onClick={() => onNavigate ? onNavigate('contact') : onOpenContact?.()}
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

      {/* ─── 4. TECHNICAL ARCHITECTURE MATRIX (WHITE, 100VH FIT-TO-SCREEN) ─── */}
      <section className="services-practice-section">
        <div className="container services-practice-container">
          <div className="services-practice-grid">
            {/* Left Column: Heading, Description & Action */}
            <motion.div 
              className="services-practice-left"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: springEase }}
            >
              <ScrollTypographyReveal
                lines={[
                  "Built with zero",
                  "technical compromise."
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
                text="Every product in the UXHUB stack is designed for cloud-native elasticity, sub-second latency, and regional payment compliance."
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
                type="button"
                className="services-practice-cta"
                onClick={() => onNavigate ? onNavigate('contact') : onOpenContact?.()}
              >
                <span>EXPLORE TECHNICAL SPECS</span>
                <span className="practice-cta-circle" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </button>
            </motion.div>

            {/* Right Column: Numbered Matrix */}
            <motion.div 
              className="services-practice-right"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
            >
              <div className="practice-matrix">
                {matrixRows.map((row, rowIdx) => (
                  <div key={rowIdx} className="practice-matrix-row">
                    {row.map((item) => {
                      const isActive = activeMatrixItem === item.id;
                      return (
                        <div 
                          key={item.id} 
                          className={`practice-matrix-item ${isActive ? 'is-active' : ''}`}
                          onMouseEnter={() => setActiveMatrixItem(item.id)}
                        >
                          <span className="practice-item-num">{item.id}</span>
                          <span className="practice-item-title">{item.title}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 5. READY TO BUILD WHAT'S NEXT (WHITE, 100VH FIT-TO-SCREEN) ───── */}
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

