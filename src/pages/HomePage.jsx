import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Effects from '../components/Effects';
import ScrollTypographyReveal from '../components/ScrollTypographyReveal';
import { 
  BrandCross, 
  VectorArrowRight, 
  VectorArrowLeft, 
  Arrow6Icon,
  ArchIcon, 
  WedgeIcon, 
  HourglassIcon,
  PillarShapeIcon,
  KareonHexIcon,
  DiagonalArrowIcon,
  featuredStories,
  partnerSets,
  techItems
} from '../components/SharedUI';

export default function HomePage({ onOpenContact, onNavigate }) {
  const [partnerIndex, setPartnerIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [storyDirection, setStoryDirection] = useState(1);
  const [isResponsive, setIsResponsive] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 1200 : false
  );

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1200px)');
    const handleMqlChange = (e) => {
      setIsResponsive(e.matches);
    };
    setIsResponsive(mql.matches);
    mql.addEventListener('change', handleMqlChange);
    return () => mql.removeEventListener('change', handleMqlChange);
  }, []);

  const handlePrevStory = () => {
    setStoryDirection(-1);
    setStoryIndex((s) => Math.max(0, s - 1));
  };

  const handleNextStory = () => {
    setStoryDirection(1);
    setStoryIndex((s) => Math.min(featuredStories.length - 1, s + 1));
  };

  return (
    <div className="home-page-wrap">
      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1: HERO (LIGHT)
          With Liquid Chrome Ribbon Parallax Animation on scroll
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="hero" className="hero-section">
        <div className="hero-liquid-container" aria-hidden="true">
          <Effects kind="hero" className="hero-liquid-canvas" />
        </div>

        <div className="hero-foreground-content">
          <motion.div 
            className="hero-top-copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="hero-display-title">
              {['Build.', 'Launch.', 'Grow.'].map((word, wIdx, arr) => (
                <span key={wIdx} className="hero-word">
                  {word.split('').map((char, cIdx) => (
                    <span key={cIdx} className="hero-char hero-title-char">{char}</span>
                  ))}
                  {wIdx < arr.length - 1 ? <span className="hero-char-space">&nbsp;</span> : null}
                </span>
              ))}
            </h1>
            <h2 className="hero-subhead">
              {"Turning digital opportunities into scalable businesses.".split(' ').map((word, wIdx, arr) => (
                <span key={wIdx} className="hero-subhead-word">
                  {word.split('').map((char, cIdx) => (
                    <span key={cIdx} className="hero-char hero-subhead-char">{char}</span>
                  ))}
                  {wIdx < arr.length - 1 ? <span className="hero-char-space">&nbsp;</span> : null}
                </span>
              ))}
            </h2>
          </motion.div>

          <motion.div 
            className="hero-bottom-copy"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="hero-desc">
              {"We help businesses across India and KSA build digital products, launch e-commerce businesses, create high-performing digital experiences and develop the growth engines needed to scale.".split(' ').map((word, wIdx, arr) => (
                <span key={wIdx} className="hero-desc-word">
                  {word.split('').map((char, cIdx) => (
                    <span key={cIdx} className="hero-char hero-desc-char">{char}</span>
                  ))}
                  {wIdx < arr.length - 1 ? <span className="hero-char-space">&nbsp;</span> : null}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SCROLLING SWIRL BAND
          Wraps "We build growth engines" and "Built for businesses" (& Philosophy)
          Morphs in real time on scroll via swirlAt(current) physics loop
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="swirl-band" data-swirl-band="true">
        {/* Pinned WebGL Swirl Layer that stays in the viewport across scrolling */}
        <div className="swirl-layer" aria-hidden="true">
          <Effects kind="swirl" className="metallic-swirl-canvas" />
        </div>

        {/* ─── SECTION 2: STATEMENT 1 (WE BUILD GROWTH ENGINES) ────────────── */}
        <section id="statement-1" className="statement-section swirl-section">
          <div className="container relative-z observe-reveal">
            <div className="statement-icon-wrap">
              <BrandCross size={52} color="#ffffff" strokeWidth={2.5} />
            </div>
            <ScrollTypographyReveal
              lines={[
                "We build growth engines,",
                "not just digital assets."
              ]}
              tag="h2"
              className="statement-heading"
              theme="dark"
              start="top 85%"
              end="bottom 45%"
              scrub={0.8}
            />
            <ScrollTypographyReveal
              text="From strategy to execution, we combine deep expertise with hands-on delivery to create digital products and businesses that are built to scale."
              tag="p"
              className="statement-desc"
              theme="dark"
              fromColor="#71717A"
              toColor="#D4D4D8"
              fromOpacity={0.4}
              toOpacity={1}
              stagger={0.035}
              start="top 90%"
              end="bottom 50%"
              scrub={0.8}
            />
          </div>
        </section>

        {/* ─── SECTION 3: PARTNERS (WHITE BACKGROUND WITH COPIED SWIRL ANIMATION) ─ */}
        <section id="partners" className="partners-section">
          <div className="partners-animation-layer" aria-hidden="true">
            <Effects kind="swirl" className="metallic-swirl-canvas partners-swirl-canvas" />
          </div>
          <div className="container relative-z observe-reveal">
            <div className="partners-header">
              <ScrollTypographyReveal
                lines={[
                  "Built for businesses that want",
                  "to scale digitally"
                ]}
                tag="h2"
                className="section-title"
                theme="light"
                start="top 85%"
                end="bottom 45%"
                scrub={0.8}
              />
            </div>

            <div className="carousel-container">
              <button 
                className="nav-arrow-btn" 
                onClick={() => setPartnerIndex(p => Math.max(0, p - 1))}
                disabled={partnerIndex === 0}
                aria-label="Previous partner logos"
              >
                <VectorArrowLeft width={20} height={18} />
              </button>

              <div className="partners-track">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={partnerIndex}
                    className="partners-slide-row"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {partnerSets[partnerIndex].map((item, idx) => (
                      <div key={idx} className="partner-logo-item">
                        <div className="partner-logo-symbol">
                          {item.icon}
                        </div>
                        <span className="partner-logo-name">{item.name}</span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <button 
                className="nav-arrow-btn" 
                onClick={() => setPartnerIndex(p => Math.min(partnerSets.length - 1, p + 1))}
                disabled={partnerIndex === partnerSets.length - 1}
                aria-label="Next partner logos"
              >
                <VectorArrowRight width={20} height={18} />
              </button>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: PHILOSOPHY (WE BUILD GROWTH ENGINES) ─────────────── */}
        <section id="philosophy" className="philosophy-section swirl-section">
          <div className="container relative-z observe-reveal">
            <div className="philosophy-content">
              <div className="section-tag-small">WHAT WE DO</div>
              <ScrollTypographyReveal
                lines={[
                  "We build growth engines,",
                  "not just digital assets."
                ]}
                tag="h2"
                className="philosophy-title"
                theme="dark"
                start="top 85%"
                end="bottom 50%"
                scrub={0.8}
              />
              <ScrollTypographyReveal
                text="Most agencies focus on deliverables. We focus on growth outcomes. From validating digital product concepts and architecting scalable platforms to scaling e-commerce businesses and automating operations, we help businesses build the capabilities they need to compete and lead in digital-first markets."
                tag="p"
                className="philosophy-subtitle"
                theme="dark"
                fromColor="#71717A"
                toColor="#D4D4D8"
                fromOpacity={0.4}
                toOpacity={1}
                stagger={0.025}
                start="top 90%"
                end="bottom 55%"
                scrub={0.8}
              />
            </div>
          </div>
        </section>
      </div>

      {/* ─── SECTION 5: 3 DARK SERVICE CARDS (LIGHT BACKGROUND) ─────────── */}
      <section id="services" className="light-section services-section">
        <div className="container observe-reveal">
          <div className="services-header">
            <BrandCross size={32} color="#000000" strokeWidth={2} />
            <ScrollTypographyReveal
              text="TURNING DIGITAL OPPORTUNITIES INTO SCALABLE BUSINESSES"
              tag="span"
              className="services-eyebrow"
              theme="light"
              fromColor="#9CA3AF"
              toColor="#4B5563"
              fromOpacity={0.4}
              toOpacity={1}
              stagger={0.05}
              start="top 85%"
              end="bottom 60%"
              scrub={0.8}
            />
            <ScrollTypographyReveal
              text="Our Core Growth Services"
              tag="h2"
              className="services-main-title"
              theme="light"
              start="top 85%"
              end="bottom 55%"
              scrub={0.8}
            />
            <ScrollTypographyReveal
              text="We help businesses across India and KSA build custom software and digital products, launch e-commerce businesses, create high-performing digital experiences and develop the growth engines needed to scale."
              tag="p"
              className="services-subhead"
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
          </div>

          <div className="services-cards-grid">
            <motion.div 
              className="service-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              onClick={() => onNavigate('services')}
            >
              <div className="service-icon-box">
                <ArchIcon size={84} color="currentColor" />
              </div>
              <h3 className="service-title">Product Growth</h3>
              <p className="service-desc">
                From 0→1 to scalable growth. Identify opportunities, validate ideas and take digital products from concept to market and beyond.
              </p>
              <div className="service-arrow-wrap">
                <VectorArrowRight width={18} height={16} color="currentColor" />
              </div>
            </motion.div>

            <motion.div 
              className="service-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              onClick={() => onNavigate('services')}
            >
              <div className="service-icon-box">
                <WedgeIcon size={84} color="currentColor" />
              </div>
              <h3 className="service-title">E-commerce Growth D2C</h3>
              <p className="service-desc">
                Build, optimize and scale e-commerce businesses across D2C and marketplace channels.
              </p>
              <div className="service-arrow-wrap">
                <VectorArrowRight width={18} height={16} color="currentColor" />
              </div>
            </motion.div>

            <motion.div 
              className="service-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              onClick={() => onNavigate('services')}
            >
              <div className="service-icon-box">
                <HourglassIcon size={84} color="currentColor" />
              </div>
              <h3 className="service-title">Digital Experience</h3>
              <p className="service-desc">
                Custom software and premium digital experiences that combine brand, technology, usability and conversion.
              </p>
              <div className="service-arrow-wrap">
                <VectorArrowRight width={18} height={16} color="currentColor" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: REGIONS BANNER (LIGHT) ─────────────────────────── */}
      <section className="light-section global-banner-section">
        <div className="container observe-reveal">
          <ScrollTypographyReveal
            text="India – KSA – UAE"
            tag="h2"
            className="global-title"
            theme="light"
            start="top 85%"
            end="bottom 50%"
            scrub={0.8}
          />
        </div>
      </section>

      {/* ─── SECTION 7: TECH STACK & CAPABILITIES (SOLID PLAIN BLACK) ────── */}
      <section id="capabilities" className="tech-grid-section">
        <div className="container relative-z observe-reveal">
          <div className="tech-grid-header">
            <span className="section-tag-small text-accent">CAPABILITIES</span>
            <ScrollTypographyReveal
              text="Tools & technologies we build with"
              tag="h2"
              className="tech-heading"
              theme="dark"
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
            />
          </div>

          <div className="tech-grid">
            {techItems.map((tech, idx) => (
              <motion.div 
                key={idx} 
                className="tech-item"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => onNavigate('services')}
              >
                <div className="tech-symbol-wrapper">
                  {tech.icon}
                </div>
                <span className="tech-name">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: FEATURED STORIES (LIGHT) ─────────────────────────── */}
      <section id="stories" className="light-section stories-section">
        <div className="container observe-reveal">
          <div className="stories-header">
            <ScrollTypographyReveal
              text="Featured Stories"
              tag="h2"
              className="stories-main-title"
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
              text="Discover authentic experiences, straight from those we serve."
              tag="p"
              className="stories-subhead"
              theme="light"
              fromColor="#D1D5DB"
              toColor="#71717a"
              fromOpacity={0.35}
              toOpacity={1}
              stagger={0.03}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
            />
          </div>

          <div className="stories-carousel-wrapper">
            <button 
              className="nav-arrow-btn stories-arrow-left" 
              onClick={handlePrevStory}
              disabled={storyIndex === 0}
              aria-label="Previous story"
            >
              <VectorArrowLeft width={20} height={18} />
            </button>

            <div className="stories-grid">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={isResponsive ? `responsive-${storyIndex}` : 'desktop-all'}
                  className="stories-slide-row"
                  initial={{ opacity: 0, x: isResponsive ? storyDirection * 35 : 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isResponsive ? storyDirection * -35 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {(isResponsive ? [featuredStories[storyIndex]] : featuredStories).map((story, idx) => (
                    <div 
                      key={isResponsive ? storyIndex : idx} 
                      className="story-card"
                    >
                      <div className="story-icon-wrapper">
                        <KareonHexIcon size={76} color="#000000" />
                      </div>
                      <h3 className="story-title">{story.title}</h3>
                      <p className="story-desc">{story.desc}</p>
                      <div className="story-arrow-wrap">
                        <Arrow6Icon width={28} height={14} color="#000000" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <button 
              className="nav-arrow-btn stories-arrow-right" 
              onClick={handleNextStory}
              disabled={storyIndex === featuredStories.length - 1}
              aria-label="Next story"
            >
              <VectorArrowRight width={20} height={18} />
            </button>
          </div>

          {isResponsive && (
            <div className="carousel-dots-indicator" aria-hidden="true">
              {featuredStories.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  className={`carousel-dot ${storyIndex === dotIdx ? 'active' : ''}`}
                  onClick={() => {
                    setStoryDirection(dotIdx > storyIndex ? 1 : -1);
                    setStoryIndex(dotIdx);
                  }}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── SECTION 9: CALL TO ACTION (LIGHT) ─────────────────────────── */}
      <section id="contact" className="light-section cta-section">
        <div className="container observe-reveal">
          <ScrollTypographyReveal
            text="Ready to build what's next?"
            tag="h2"
            className="cta-title"
            theme="light"
            start="top 85%"
            end="bottom 50%"
            scrub={0.8}
          />
          <ScrollTypographyReveal
            text="Tell us what you're trying to build, launch or grow."
            tag="p"
            className="cta-subtitle"
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
            className="cta-conversation-btn"
            onClick={() => onNavigate('contact')}
            aria-label="Start a Conversation"
          >
            <DiagonalArrowIcon size={20} className="cta-diagonal-arrow" />
            <span className="cta-link-text">Start a Conversation</span>
          </button>
        </div>
      </section>
    </div>
  );
}

