import React from 'react';
import { motion } from 'framer-motion';
import { 
  VectorArrowRight, 
  DiagonalArrowIcon
} from '../components/SharedUI';
import ScrollTypographyReveal from '../components/ScrollTypographyReveal';

const springEase = [0.16, 1, 0.3, 1];

export default function ServicesPage({ onOpenContact, onNavigate }) {
  // 5 Core Growth Services matching the user's reference mockup
  const serviceCards = [
    {
      id: 'product-growth',
      title: 'Product Growth',
      desc: 'From 0→1 to scalable growth. Identify opportunities, validate ideas and take digital products from concept to market and beyond.'
    },
    {
      id: 'ecommerce-d2c',
      title: 'E-commerce Growth D2C',
      desc: 'Build, optimize and scale e-commerce businesses across D2C and marketplace channels.'
    },
    {
      id: 'digital-experience',
      title: 'Digital Experience',
      desc: 'Custom software and premium digital experiences that combine brand, technology, usability and conversion.'
    },
    {
      id: 'marketplace-growth',
      title: 'Marketplace Growth',
      desc: 'Scale across Amazon, Noon and regional channels with catalog syndication, algorithmic buy-box protection and inventory operations.'
    },
    {
      id: 'technology-architecture',
      title: 'Technology & Architecture',
      desc: 'Enterprise distributed systems, fault-tolerant cloud architecture and predictive AI agents engineered for cross-border resilience.'
    }
  ];

  const divisionCards = [
    {
      tag: '01 · STRATEGY',
      title: 'Product Growth',
      desc: 'Opportunity mapping, validation & roadmap to market.',
      target: 'contact'
    },
    {
      tag: '02 · ENGINEERING',
      title: 'Capabilities',
      desc: 'Microservices, cloud systems & verified performance.',
      target: 'capabilities'
    },
    {
      tag: '03 · STORIES',
      title: 'Featured Stories',
      desc: 'Verified case studies from concept to scale.',
      target: 'stories'
    },
    {
      tag: '04 · ADVISORY',
      title: 'Direct Consultation',
      desc: 'Regional advisory across Bangalore, Riyadh & Dubai.',
      target: 'contact'
    }
  ];

  return (
    <div className="inner-page services-page services-page--mockup">
      {/* ─── 1. HERO SECTION (SOLID BLACK, 100VH FULL SCREEN) ───────────── */}
      <section className="services-hero-black">
        <div className="container services-hero-container">
          <motion.div 
            className="services-hero-black-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: springEase }}
          >
            <h1 className="services-hero-black-title">
              We build businesses for the digital economy.
            </h1>
            <p className="services-hero-black-sub">
              From 0→1 to scalable digital growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. STATEMENT & SHOWCASE SECTION (WHITE) ─────────────────────── */}
      <section className="services-showcase-section">
        <div className="container">
          <motion.div 
            className="services-editorial-statements"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: springEase }}
          >
            <p className="statement-p1">
              We operate at the intersection of digital products, e-commerce and brand strategy,
              helping businesses across India and KSA build the capabilities needed to scale.
            </p>
            <p className="statement-p2">
              Our focus is on creating measurable business impact through design excellence,
              technology innovation and performance-driven growth.
            </p>
          </motion.div>

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
          <motion.div 
            className="services-markets-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: springEase }}
          >
            <h2 className="services-markets-title">
              <span>3 markets.</span>
              <span>One growth mindset</span>
            </h2>
          </motion.div>

          {/* 5 Black Cards Grid: 3 top row, 2 bottom row */}
          <div className="services-cards-grid-5">
            {serviceCards.map((card, idx) => (
              <motion.div 
                key={card.id}
                className="service-black-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: idx * 0.1, ease: springEase }}
                whileHover={{ y: -8 }}
                onClick={() => (onOpenContact ? onOpenContact() : onNavigate('contact'))}
              >
                <div className="service-black-card-dot" />
                <h3 className="service-black-card-title">{card.title}</h3>
                <p className="service-black-card-desc">{card.desc}</p>
                <div className="service-black-card-arrow">
                  <VectorArrowRight width={16} height={14} color="#ffffff" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. READY TO BUILD WHAT'S NEXT & 4 DIVISION CARDS ────────────── */}
      <section className="services-ready-section">
        <div className="container">
          <motion.div 
            className="services-ready-header text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: springEase }}
          >
            <ScrollTypographyReveal
              text="Ready to build what's next?"
              tag="h2"
              className="services-ready-title"
              theme="light"
              start="top 90%"
              end="top 60%"
              scrub={0.4}
            />
            <div className="services-ready-cta-wrap">
              <button 
                className="services-conversation-btn"
                onClick={() => (onOpenContact ? onOpenContact() : onNavigate('contact'))}
              >
                <DiagonalArrowIcon size={16} color="#000000" />
                <span>Start a Conversation</span>
              </button>
            </div>
          </motion.div>

          {/* 4 Black Division Cards at bottom */}
          <div className="services-division-cards-grid">
            {divisionCards.map((div, idx) => (
              <motion.div 
                key={idx}
                className="services-division-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: springEase }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  if (div.target === 'contact' && onOpenContact) {
                    onOpenContact();
                  } else {
                    onNavigate(div.target);
                  }
                }}
              >
                <div className="services-div-top">
                  <span className="services-div-tag">{div.tag}</span>
                  <DiagonalArrowIcon size={14} color="#a1a1aa" className="div-arrow" />
                </div>
                <div>
                  <h4 className="services-div-title">{div.title}</h4>
                  <p className="services-div-desc">{div.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
