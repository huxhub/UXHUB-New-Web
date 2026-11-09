import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrandCross, 
  VectorArrowRight, 
  DiagonalArrowIcon,
  ArchIcon,
  WedgeIcon,
  PillarShapeIcon,
  KareonHexIcon,
  Arrow6Icon
} from '../components/SharedUI';
import Effects from '../components/Effects';
import ScrollTypographyReveal from '../components/ScrollTypographyReveal';

const springEase = [0.16, 1, 0.3, 1];

export default function StoriesPage({ onOpenContact, onNavigate }) {
  const [selectedStory, setSelectedStory] = useState('brand-swamy');

  const detailedStories = [
    {
      id: 'brand-swamy',
      title: 'Brand Swamy',
      iconComponent: ArchIcon,
      category: '0 → 1 Product Incubation',
      market: 'India ↔ UAE',
      tagline: 'From unvalidated concept to a multi-million GMV consumer platform in 9 months.',
      metrics: [
        { label: 'GMV Growth', value: '+320%' },
        { label: 'Time to MVP Launch', value: '45 Days' },
        { label: 'Active Monthly Sessions', value: '2.8M' },
        { label: 'Customer Retention Rate', value: '68%' }
      ],
      challenge: 'The founders needed to prove market demand and validate a cross-border consumer brand across tier-1 cities in India and expatriate communities in Dubai, without burning capital on speculative software development.',
      solution: 'UXHub designed and deployed a high-velocity 0→1 growth sprint. We conducted user research, built a streamlined Next.js storefront with dynamic inventory allocation, instrumented comprehensive PostHog telemetry, and orchestrated targeted acquisition funnels.',
      techStack: ['Next.js 15', 'TypeScript', 'Node.js', 'PostgreSQL', 'Mixpanel', 'Stripe & Razorpay'],
      quote: {
        text: "UXHub did not just design a website; they structured our entire digital business model. Their speed of execution and understanding of cross-border consumer behavior was unmatched.",
        author: "Aditya S.",
        role: "Co-Founder & CEO, Brand Swamy"
      }
    },
    {
      id: 'kareon-repairs',
      title: 'Kareon Repairs',
      iconComponent: KareonHexIcon,
      category: 'D2C Commerce & Marketplace Scale',
      market: 'Saudi Arabia (Riyadh & Jeddah)',
      tagline: 'Modernizing aftermarket hardware and repairs commerce with native Arabic RTL UX.',
      metrics: [
        { label: 'Checkout Conversion Lift', value: '4.8x' },
        { label: 'Cart Abandonment Drop', value: '-65%' },
        { label: 'Average Page Load Time', value: '780ms' },
        { label: 'Marketplace Sync Accuracy', value: '99.98%' }
      ],
      challenge: 'Operating in Saudi Arabia, Kareon faced high cart abandonment, slow legacy Magento page speeds, and disjointed inventory sync across their physical retail outlets, custom storefront, and Noon seller accounts.',
      solution: 'We engineered a headless Shopify Plus storefront with custom Arabic RTL typography, frictionless 1-click checkout integrating local payment gateways (Mada, Tabby, Tamara), and built automated webhook synchronization to their warehouse ERP.',
      techStack: ['Shopify Plus Headless', 'Tailwind CSS', 'Mada API', 'Tabby & Tamara', 'AWS Lambda', 'Algolia Search'],
      quote: {
        text: "The transition to the new platform resulted in an immediate 4.8x surge in completed orders. The attention to Saudi-specific payment habits made all the difference.",
        author: "Fahad Al-Otaibi",
        role: "Managing Director, Kareon Group"
      }
    },
    {
      id: 'digital-experience',
      title: 'Digital Experience Platform',
      iconComponent: WedgeIcon,
      category: 'Enterprise SaaS Platform',
      market: 'India ↔ KSA ↔ Global',
      tagline: 'Engineering an ISO-27001 compliant enterprise platform with sub-50ms latency.',
      metrics: [
        { label: 'System Uptime SLA', value: '99.99%' },
        { label: 'Median API Response', value: '42ms' },
        { label: 'Enterprise Security Rating', value: 'SOC-2 Type II' },
        { label: 'User Onboarding Velocity', value: '+210%' }
      ],
      challenge: 'An enterprise corporate client needed a unified digital operations platform to connect their business units across India and Saudi Arabia. Previous software suffered from database locking, slow reporting, and poor international latency.',
      solution: 'UXHub architected a modular cloud-native microservices backend deployed on AWS multi-region infrastructure with Cloudflare edge caching, backed by an intuitive React design system tailored for enterprise analysts.',
      techStack: ['React 19', 'Go (Golang)', 'PostgreSQL Partitioned', 'Redis Cluster', 'Docker & Kubernetes', 'Cloudflare Edge'],
      quote: {
        text: "UXHub delivered an enterprise software platform that our global operations team actually loves using every day. The performance and reliability are exceptional.",
        author: "Rajesh Nambiar",
        role: "VP of Enterprise Technology"
      }
    },
    {
      id: 'pricing-super-intelligence',
      title: 'GCC Pricing Intelligence Engine',
      iconComponent: PillarShapeIcon,
      category: 'Algorithmic Commerce Software',
      market: 'Saudi Arabia & UAE',
      tagline: 'Defending brand margins with real-time automated competitor price scraping and dynamic repricing.',
      metrics: [
        { label: 'Monitored Product SKUs', value: '50,000+' },
        { label: 'Gross Margin Expansion', value: '+14%' },
        { label: 'Buy Box Win Rate', value: '84%' },
        { label: 'Price Scraping Interval', value: '15 Minutes' }
      ],
      challenge: 'Rapidly shifting price wars on Amazon Saudi and Noon were causing severe margin erosion and stockouts for premium retail distributors without dedicated competitive intelligence.',
      solution: 'UXHub engineered an automated scraping cluster monitoring 50,000+ SKUs every 15 minutes, coupled with algorithmic margin-floor protection and dynamic repricing webhooks directly into seller central APIs.',
      techStack: ['Python FastAPI', 'Puppeteer Cluster', 'BigQuery', 'Redis Queue', 'Amazon SP-API', 'Slack Webhooks'],
      quote: {
        text: "We gained complete visibility over GCC pricing dynamics within our first week of deployment. It immediately protected millions of SAR in retail gross margin.",
        author: "Tariq Mansoor",
        role: "Head of Commercial E-commerce"
      }
    }
  ];

  const currentStory = detailedStories.find(s => s.id === selectedStory) || detailedStories[0];
  const CurrentIcon = currentStory.iconComponent;

  const scrollToSpotlight = (storyId) => {
    setSelectedStory(storyId);
    const target = document.getElementById('story-spotlight');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="inner-page stories-page stories-page--home-style">
      {/* ─── 1. HERO SECTION (SOLID BLACK, 100VH FULL SCREEN) ───────────── */}
      <section className="stories-hero-black">
        <div className="stories-hero-swirl-layer" aria-hidden="true">
          <Effects kind="swirl" className="metallic-swirl-canvas" />
        </div>
        <div className="container stories-hero-container">
          <motion.div 
            className="stories-hero-black-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: springEase }}
          >
            <div className="stories-hero-kicker">
              <BrandCross size={16} color="#FF7723" strokeWidth={3} className="hero-kicker-cross" />
              <span>PROVEN GROWTH OUTCOMES</span>
            </div>
            <h1 className="stories-hero-black-title">
              {"Real results for ambitious brands.".split(' ').map((word, wIdx, arr) => (
                <span key={wIdx} className="hero-word">
                  <span className="hero-char">{word}</span>
                  {wIdx < arr.length - 1 ? <span className="hero-char-space">&nbsp;</span> : null}
                </span>
              ))}
            </h1>
            <p className="stories-hero-black-sub">
              {"Case studies and verified digital performance across India, KSA and the UAE.".split(' ').map((word, wIdx, arr) => (
                <span key={wIdx} className="hero-word">
                  <span className="hero-char">{word}</span>
                  {wIdx < arr.length - 1 ? <span className="hero-char-space">&nbsp;</span> : null}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. STATEMENT & IMPACT STATS SECTION (WHITE) ─────────────────── */}
      <section className="stories-showcase-section">
        <div className="container">
          <div className="stories-editorial-statements">
            <ScrollTypographyReveal
              text="We measure success not by deliverables, but by quantifiable growth outcomes."
              tag="p"
              className="statement-p1"
              theme="light"
              fromColor="#D1D5DB"
              toColor="#000000"
              fromOpacity={0.35}
              toOpacity={1}
              stagger={0.03}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
            />
            <ScrollTypographyReveal
              text="From validating 0→1 digital product concepts to scaling cross-border e-commerce platforms and engineering algorithmic intelligence, we build systems that drive real market leadership."
              tag="p"
              className="statement-p2"
              theme="light"
              fromColor="#E4E4E7"
              toColor="#52525B"
              fromOpacity={0.35}
              toOpacity={1}
              stagger={0.025}
              start="top 85%"
              end="bottom 45%"
              scrub={0.8}
            />
          </div>

          {/* Verified Cumulative Impact Strip */}
          <div className="stories-stats-strip">
            <div className="stories-stat-box">
              <span className="stat-number">+320%</span>
              <span className="stat-label">Peak GMV Growth</span>
            </div>
            <div className="stories-stat-box">
              <span className="stat-number">4.8x</span>
              <span className="stat-label">Checkout Conversion Lift</span>
            </div>
            <div className="stories-stat-box">
              <span className="stat-number">99.99%</span>
              <span className="stat-label">System Uptime SLA</span>
            </div>
            <div className="stories-stat-box">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Monitored Product SKUs</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. INTERACTIVE SPOTLIGHT DEEP DIVE (BLACK) ──────────────────── */}
      <section id="story-spotlight" className="stories-spotlight-section">
        <div className="container">
          <div className="stories-spotlight-header">
            <div className="section-badge-pill">
              <span className="badge-dot" />
              <span>VERIFIED CASE STUDIES</span>
            </div>
            <ScrollTypographyReveal
              lines={[
                "Engineered for growth.",
                "Proven in production."
              ]}
              tag="h2"
              className="stories-spotlight-title"
              theme="dark"
              fromColor="#3A3A3A"
              toColor="#FFFFFF"
              fromOpacity={0.35}
              toOpacity={1}
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
            />
          </div>

          {/* Story Selector Tabs */}
          <div className="stories-selector-grid">
            {detailedStories.map(story => {
              const TabIcon = story.iconComponent;
              const isActive = selectedStory === story.id;
              return (
                <button
                  key={story.id}
                  className={`stories-select-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => setSelectedStory(story.id)}
                >
                  <div className="stories-tab-top">
                    <span className="stories-tab-icon">
                      <TabIcon size={28} color="currentColor" />
                    </span>
                  </div>
                  <h3 className="stories-tab-name">{story.title}</h3>
                  <span className="stories-tab-region">{story.market}</span>
                </button>
              );
            })}
          </div>

          {/* Active Story Case Study Detail Box (Pure White for crisp brutalist contrast) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: springEase }}
              className="stories-showcase-box"
            >
              <div className="showcase-top-row">
                <div className="showcase-mark-badge">
                  <CurrentIcon size={34} color="#000000" />
                </div>
                <div className="showcase-tag-wrap">
                  <span className="showcase-badge">{currentStory.category}</span>
                  <span className="showcase-region">{currentStory.market}</span>
                </div>
              </div>

              <h2 className="showcase-headline">{currentStory.title}</h2>
              <p className="showcase-tagline">{currentStory.tagline}</p>

              {/* Verified Metrics Row */}
              <div className="showcase-metrics-grid">
                {currentStory.metrics.map((metric, idx) => (
                  <div key={idx} className="showcase-metric-card">
                    <span className="metric-val">{metric.value}</span>
                    <span className="metric-lbl">{metric.label}</span>
                  </div>
                ))}
              </div>

              {/* Challenge & Solution Grid */}
              <div className="showcase-body-grid">
                <div className="showcase-body-block challenge-block">
                  <span className="block-label">THE CHALLENGE</span>
                  <p>{currentStory.challenge}</p>
                </div>
                <div className="showcase-body-block solution-block">
                  <span className="block-label">THE UXHUB SOLUTION</span>
                  <p>{currentStory.solution}</p>
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="showcase-tech-wrap">
                <span className="tech-stack-title">TECHNOLOGY STACK & INTEGRATIONS:</span>
                <div className="tech-tags-list">
                  {currentStory.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-pill">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── 4. ALL FEATURED STORIES 4-CARD MATRIX (WHITE) ───────────────── */}
      <section className="stories-matrix-section">
        <div className="container">
          <div className="stories-matrix-header">
            <ScrollTypographyReveal
              text="All Featured Stories"
              tag="h2"
              className="stories-matrix-title"
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
              text="Verified growth case studies across 0→1 incubation, D2C scale, enterprise platforms, and pricing intelligence."
              tag="p"
              className="stories-matrix-sub"
              theme="light"
              fromColor="#D1D5DB"
              toColor="#6B7280"
              fromOpacity={0.35}
              toOpacity={1}
              stagger={0.025}
              start="top 80%"
              end="bottom 45%"
              scrub={0.8}
            />
          </div>

          <div className="stories-matrix-grid">
            {detailedStories.map((story, idx) => {
              const CardIcon = story.iconComponent;
              const isCurrent = selectedStory === story.id;
              return (
                <motion.div
                  key={story.id}
                  className={`story-box-card ${isCurrent ? 'is-selected' : ''}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: springEase }}
                  whileHover={{ y: -6 }}
                  onClick={() => scrollToSpotlight(story.id)}
                >
                  <div className="story-box-icon-box">
                    <CardIcon size={34} color="#000000" />
                  </div>
                  <h3 className="story-box-title">{story.title}</h3>
                  <p className="story-box-desc">{story.tagline}</p>
                  <div className="story-box-footer">
                    <span className="story-box-market">{story.market}</span>
                    <div className="story-box-arrow">
                      <VectorArrowRight width={16} height={14} color="currentColor" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. READY TO BUILD WHAT'S NEXT SECTION (WHITE, CENTERED) ─────── */}
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
              onClick={() => (onOpenContact ? onOpenContact() : onNavigate('contact'))}
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
