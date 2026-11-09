import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrandCross, 
  VectorArrowRight, 
  CrossNavBanner,
  KareonHexIcon,
  ArchIcon,
  PillarShapeIcon
} from '../components/SharedUI';
import ScrollTypographyReveal from '../components/ScrollTypographyReveal';

export default function StoriesPage({ onOpenContact, onNavigate }) {
  const [selectedStory, setSelectedStory] = useState('brand-swamy');

  const detailedStories = [
    {
      id: 'brand-swamy',
      title: 'Brand Swamy',
      icon: <BrandCross size={32} color="currentColor" />,
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
      icon: <KareonHexIcon size={32} color="currentColor" />,
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
      title: 'Digital Experience',
      icon: <ArchIcon size={32} color="currentColor" />,
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
      icon: <PillarShapeIcon size={32} color="currentColor" />,
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
      techStack: ['Python FastApi', 'Puppeteer Cluster', 'BigQuery', 'Redis Queue', 'Amazon SP-API', 'Slack Webhooks'],
      quote: {
        text: "We gained complete visibility over GCC pricing dynamics within our first week of deployment. It immediately protected millions of SAR in retail gross margin.",
        author: "Tariq Mansoor",
        role: "Head of Commercial E-commerce"
      }
    }
  ];

  const currentStory = detailedStories.find(s => s.id === selectedStory) || detailedStories[0];

  return (
    <div className="inner-page stories-page">
      {/* ─── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="inner-hero-section">
        <div className="container">
          <div className="inner-hero-header observe-reveal">
            <span className="inner-eyebrow">
              <BrandCross size={18} color="#FF7723" strokeWidth={3} className="inline-cross" />
              CASE STUDIES & PROVEN IMPACT
            </span>
            <h1 className="inner-hero-title">
              Real results for ambitious brands across India and Saudi Arabia.
            </h1>
            <p className="inner-hero-desc">
              Explore how we partner with enterprise leaders, direct-to-consumer innovators, and venture-backed founders to deliver quantifiable business growth and technical excellence.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Interactive Case Studies Browser ──────────────────────────────── */}
      <section className="inner-section stories-browser-section">
        <div className="container">
          {/* Story Selector Bar */}
          <div className="story-selector-tabs">
            {detailedStories.map(story => (
              <button
                key={story.id}
                className={`story-tab-card ${selectedStory === story.id ? 'active' : ''}`}
                onClick={() => setSelectedStory(story.id)}
              >
                <div className="story-tab-icon-row">
                  <span className="story-tab-icon">{story.icon}</span>
                  <span className="story-tab-category">{story.category}</span>
                </div>
                <h3 className="story-tab-title">{story.title}</h3>
                <span className="story-tab-market">{story.market}</span>
              </button>
            ))}
          </div>

          {/* Active Story Case Study Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="case-study-showcase-box"
            >
              <div className="case-study-header">
                <div className="case-study-top-row">
                  <div className="case-study-mark-badge">{currentStory.icon}</div>
                  <div className="case-study-tag-wrap">
                    <span className="case-study-badge">{currentStory.category}</span>
                    <span className="case-study-region">{currentStory.market}</span>
                  </div>
                </div>
                <h2 className="case-study-headline">{currentStory.title}</h2>
                <p className="case-study-tagline">{currentStory.tagline}</p>
              </div>

              {/* Verified Metrics Row */}
              <div className="case-study-metrics-grid">
                {currentStory.metrics.map((metric, idx) => (
                  <div key={idx} className="metric-highlight-card">
                    <span className="metric-val">{metric.value}</span>
                    <span className="metric-lbl">{metric.label}</span>
                  </div>
                ))}
              </div>

              {/* Challenge & Solution Grid */}
              <div className="case-study-body-grid">
                <div className="body-block challenge-block">
                  <span className="block-label">THE CHALLENGE</span>
                  <p>{currentStory.challenge}</p>
                </div>
                <div className="body-block solution-block">
                  <span className="block-label">THE UXHUB SOLUTION</span>
                  <p>{currentStory.solution}</p>
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="case-study-tech-wrap">
                <span className="tech-stack-title">TECHNOLOGY STACK & INTEGRATIONS:</span>
                <div className="tech-tags-list">
                  {currentStory.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-pill">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Client Testimonial Quote */}
              <div className="case-study-quote-card">
                <div className="quote-icon">“</div>
                <p className="quote-text">{currentStory.quote.text}</p>
                <div className="quote-author-info">
                  <span className="author-name">{currentStory.quote.author}</span>
                  <span className="author-role">{currentStory.quote.role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="inner-cta-banner">
        <div className="container text-center">
          <ScrollTypographyReveal
            text="Ready to write your growth story?"
            tag="h2"
            className="inner-cta-title"
            theme="light"
            start="top 90%"
            end="top 60%"
            scrub={0.4}
          />
          <p className="inner-cta-subtext">
            Let's discuss how UXHub can help you validate ideas, optimize conversion rates, and engineer scalable systems.
          </p>
          <div className="inner-cta-actions">
            <button className="cta-primary-pill" onClick={() => onNavigate('contact')}>
              Start a Conversation
            </button>
            <button className="cta-secondary-pill" onClick={() => onNavigate('services')}>
              Explore Services & Engagement Models →
            </button>
          </div>
        </div>
      </section>

      {/* ─── Cross Navigation Banner (Connecting to Other Divisions) ─────── */}
      <CrossNavBanner current="stories" onNavigate={onNavigate} theme="light" />
    </div>
  );
}

