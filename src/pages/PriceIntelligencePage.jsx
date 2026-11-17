import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  DiagonalArrowIcon
} from '../components/SharedUI';
import ScrollTypographyReveal from '../components/ScrollTypographyReveal';
import Effects from '../components/Effects';

const springEase = [0.16, 1, 0.3, 1];

// ─── Scraped Multi-SKU Interactive Telemetry Data ───────────────────────────
const telemetryProducts = [
  {
    id: 'sku-01',
    tabLabel: '01 / TRAVEL LUGGAGE 28"',
    name: 'Premium Travel Luggage 28"',
    category: 'Travel & Luggage',
    yourPrice: 'SAR 299',
    marketAvg: 'SAR 287',
    lowest: 'SAR 269',
    highest: 'SAR 329',
    position: '+4.2%',
    changesCount: '18',
    competitorsCount: '24',
    status: 'BUY-BOX AT RISK',
    statusType: 'danger',
    alertMessage: 'Competitor A reduced the price.',
    alertShift: 'SAR 299 → SAR 279',
    alertDelta: '- SAR 20 (-6.7%)',
    competitors: [
      { rank: '#1', name: 'Brand X', channel: 'Noon', price: 'SAR 269', change30d: '- 10.0%', dir: 'down' },
      { rank: '#2', name: 'Competitor A', channel: 'Amazon', price: 'SAR 279', change30d: '- 6.7%', dir: 'down' },
      { rank: '#3', name: 'Competitor C', channel: 'Website', price: 'SAR 289', change30d: '- 3.3%', dir: 'down' },
      { rank: '#4', name: 'Marketplace Seller', channel: 'Amazon', price: 'SAR 299', change30d: '0.0%', dir: 'neutral' },
      { rank: '#5', name: 'Competitor B', channel: 'Noon', price: 'SAR 319', change30d: '+3.2%', dir: 'up' },
      { rank: '#6', name: 'Premium Store', channel: 'Website', price: 'SAR 329', change30d: '+1.9%', dir: 'up' }
    ],
    chartPoints: [
      { label: 'Day 1', you: 299, avg: 295, comp: 299 },
      { label: 'Day 15', you: 299, avg: 292, comp: 289 },
      { label: 'Day 30', you: 299, avg: 290, comp: 285 },
      { label: 'Day 45', you: 299, avg: 288, comp: 279 },
      { label: 'Day 60', you: 299, avg: 289, comp: 279 },
      { label: 'Day 75', you: 299, avg: 287, comp: 275 },
      { label: 'Day 90', you: 299, avg: 287, comp: 269 }
    ]
  },
  {
    id: 'sku-02',
    tabLabel: '02 / ANC HEADPHONES',
    name: 'Wireless Over-Ear ANC Headphones',
    category: 'Consumer Electronics',
    yourPrice: 'SAR 449',
    marketAvg: 'SAR 424',
    lowest: 'SAR 399',
    highest: 'SAR 479',
    position: '+5.9%',
    changesCount: '27',
    competitorsCount: '19',
    status: 'UNDER-CUT ON NOON',
    statusType: 'danger',
    alertMessage: 'Competitor Alpha launched flash promotion.',
    alertShift: 'SAR 449 → SAR 399',
    alertDelta: '- SAR 50 (-11.1%)',
    competitors: [
      { rank: '#1', name: 'Competitor Alpha', channel: 'Noon', price: 'SAR 399', change30d: '- 11.1%', dir: 'down' },
      { rank: '#2', name: 'Competitor Beta', channel: 'Amazon', price: 'SAR 429', change30d: '- 4.5%', dir: 'down' },
      { rank: '#3', name: 'Official Store', channel: 'Jarir', price: 'SAR 449', change30d: '0.0%', dir: 'neutral' },
      { rank: '#4', name: 'TechHub Online', channel: 'Website', price: 'SAR 459', change30d: '+2.2%', dir: 'up' },
      { rank: '#5', name: 'Audio Mart', channel: 'Amazon', price: 'SAR 479', change30d: '+6.6%', dir: 'up' }
    ],
    chartPoints: [
      { label: 'Day 1', you: 449, avg: 449, comp: 449 },
      { label: 'Day 15', you: 449, avg: 442, comp: 439 },
      { label: 'Day 30', you: 449, avg: 438, comp: 429 },
      { label: 'Day 45', you: 449, avg: 430, comp: 425 },
      { label: 'Day 60', you: 449, avg: 428, comp: 419 },
      { label: 'Day 75', you: 449, avg: 425, comp: 409 },
      { label: 'Day 90', you: 449, avg: 424, comp: 399 }
    ]
  },
  {
    id: 'sku-03',
    tabLabel: '03 / ESPRESSO MACHINE',
    name: 'Precision 15-Bar Italian Espresso Machine',
    category: 'Home & Kitchen',
    yourPrice: 'SAR 1,299',
    marketAvg: 'SAR 1,319',
    lowest: 'SAR 1,249',
    highest: 'SAR 1,399',
    position: '-1.5%',
    changesCount: '12',
    competitorsCount: '15',
    status: 'BUY-BOX CAPTURED',
    statusType: 'success',
    alertMessage: 'Competitor stock out on Amazon. Opportunity to lift price.',
    alertShift: 'SAR 1,299 → SAR 1,349',
    alertDelta: '+ SAR 50 (+3.8%)',
    competitors: [
      { rank: '#1', name: 'Kitchen Masters', channel: 'Website', price: 'SAR 1,249', change30d: '- 3.8%', dir: 'down' },
      { rank: '#2', name: 'Your Brand', channel: 'Noon', price: 'SAR 1,299', change30d: '0.0%', dir: 'neutral' },
      { rank: '#3', name: 'Home Essentials', channel: 'Amazon', price: 'SAR 1,329', change30d: '+2.3%', dir: 'up' },
      { rank: '#4', name: 'Competitor Prime', channel: 'Amazon', price: 'SAR 1,349', change30d: '+3.8%', dir: 'up' },
      { rank: '#5', name: 'Carrefour GCC', channel: 'Website', price: 'SAR 1,399', change30d: '+7.6%', dir: 'up' }
    ],
    chartPoints: [
      { label: 'Day 1', you: 1299, avg: 1289, comp: 1249 },
      { label: 'Day 15', you: 1299, avg: 1295, comp: 1269 },
      { label: 'Day 30', you: 1299, avg: 1300, comp: 1289 },
      { label: 'Day 45', you: 1299, avg: 1305, comp: 1299 },
      { label: 'Day 60', you: 1299, avg: 1310, comp: 1320 },
      { label: 'Day 75', you: 1299, avg: 1315, comp: 1335 },
      { label: 'Day 90', you: 1299, avg: 1319, comp: 1349 }
    ]
  }
];

export default function PriceIntelligencePage({ onOpenContact, onNavigate }) {
  const [activeSkuIdx, setActiveSkuIdx] = useState(0);
  const [activeEngineStep, setActiveEngineStep] = useState(0);
  const stepRefs = useRef([]);

  const activeSku = telemetryProducts[activeSkuIdx];

  useEffect(() => {
    const handleScroll = () => {
      stepRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
          setActiveEngineStep(idx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (window.__lenis) {
      window.__lenis.on('scroll', handleScroll);
    }
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.__lenis) {
        window.__lenis.off('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToStep = (idx) => {
    const target = stepRefs.current[idx];
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const targetY = (window.scrollY || window.pageYOffset) + rect.top - 100;
    if (window.__lenis) {
      window.__lenis.scrollTo(targetY, { duration: 0.8 });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
  };

  const handleStartTrial = () => {
    if (onOpenContact) {
      onOpenContact('Price Intelligence - 14-Day Free Trial');
    } else if (onNavigate) {
      onNavigate('contact');
    }
  };

  const handleTalkExpert = () => {
    if (onOpenContact) {
      onOpenContact('Price Intelligence - Talk to a Pricing Expert');
    } else if (onNavigate) {
      onNavigate('contact');
    }
  };

  return (
    <div className="inner-page price-intelligence-page">
      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO SECTION (SOLID BLACK / CLEAN CONTRAST / ZERO SHADOW)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="pi-hero">
        <div className="pi-hero-swirl" aria-hidden="true">
          <Effects kind="swirl" className="pi-swirl-canvas" />
        </div>

        <div className="container pi-hero-container">
          <div className="pi-hero-grid">
            {/* Left Column: Editorial Copy */}
            <motion.div 
              className="pi-hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: springEase }}
            >
              <h1 className="pi-hero-heading">
                Are You Losing Sales Because Your Competitors Change Prices Before You Know It?
              </h1>

              <p className="pi-hero-lead">
                Monitor competitor prices across the GCC. Get alerted when prices change. Make faster, data-driven pricing decisions.
              </p>

              <div className="pi-hero-ctas">
                <a 
                  href="https://spy.price2spy.com/registration?ref=124076"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pi-btn-primary"
                >
                  <span>START YOUR FREE 14-DAY TRIAL</span>
                  <DiagonalArrowIcon size={15} />
                </a>

                <button 
                  type="button"
                  className="pi-btn-secondary"
                  onClick={handleTalkExpert}
                >
                  <span>TALK TO A PRICING EXPERT</span>
                  <DiagonalArrowIcon size={15} />
                </button>
              </div>

              <div className="pi-hero-notice">
                <span className="pi-notice-icon">✓</span>
                <span>14-day free trial</span>
                <span className="pi-bullet">•</span>
                <span>No credit card required</span>
                <span className="pi-bullet">•</span>
                <span>Instant GCC activation</span>
              </div>
            </motion.div>

            {/* Right Column: Live Illustrative Market View */}
            <motion.div 
              className="pi-hero-telemetry"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: springEase }}
            >
              <div className="pi-telemetry-box">
                {/* Window Topbar */}
                <div className="pi-telemetry-header">
                  <div className="pi-telemetry-title">
                    <span className="pi-pulse-dot" />
                    <span>ILLUSTRATIVE MARKET VIEW</span>
                  </div>
                  <div className="pi-telemetry-meta">
                    <span>LIVE GCC FEED</span>
                  </div>
                </div>

                {/* SKU Selector Tabs */}
                <div className="pi-sku-tabs">
                  {telemetryProducts.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`pi-sku-tab-btn ${idx === activeSkuIdx ? 'active' : ''}`}
                      onClick={() => setActiveSkuIdx(idx)}
                    >
                      {p.tabLabel}
                    </button>
                  ))}
                </div>

                {/* Card Main Body */}
                <div className="pi-telemetry-body">
                  <div className="pi-telemetry-row">
                    <div>
                      <span className="pi-mono-label">PRODUCT</span>
                      <h4 className="pi-product-title">{activeSku.name}</h4>
                    </div>
                    <div className="pi-price-cell">
                      <span className="pi-mono-label">YOUR PRICE</span>
                      <div className="pi-price-large">{activeSku.yourPrice}</div>
                    </div>
                  </div>

                  {/* Competitor Price Chips */}
                  <div className="pi-comp-chips-grid">
                    {activeSku.competitors.slice(0, 3).map((comp, i) => (
                      <div key={i} className="pi-comp-chip">
                        <span className="pi-comp-name">{comp.name}</span>
                        <div className="pi-comp-val">
                          <span>{comp.price}</span>
                          <span className={`pi-dir-arrow ${comp.dir}`}>
                            {comp.dir === 'down' ? '↓' : comp.dir === 'up' ? '↑' : '—'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Competitor Price History Sparkline (30 Days) */}
                  <div className="pi-sparkline-wrap">
                    <div className="pi-sparkline-head">
                      <span className="pi-mono-label">Competitor price history • 30 days</span>
                      <div className="pi-sparkline-legend">
                        <span className="legend-item legend-you">— You ({activeSku.yourPrice})</span>
                        <span className="legend-item legend-comp">— Comp. A</span>
                      </div>
                    </div>
                    <svg className="pi-sparkline-svg" viewBox="0 0 460 70" preserveAspectRatio="none">
                      <line x1="0" y1="25" x2="460" y2="25" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 4" opacity="0.65" />
                      <path 
                        d="M0 25 L80 27 L160 35 L240 38 L320 48 L400 52 L460 58" 
                        fill="none" 
                        stroke="#FF7723" 
                        strokeWidth="2.5" 
                      />
                      <circle cx="460" cy="58" r="4" fill="#FF7723" />
                      <circle cx="460" cy="25" r="4" fill="#FFFFFF" />
                    </svg>
                  </div>

                  {/* Live Price Change Alert Banner */}
                  <div className="pi-alert-card">
                    <div className="pi-alert-badge">
                      <span>PRICE CHANGE DETECTED</span>
                    </div>
                    <div className="pi-alert-content">
                      <p className="pi-alert-text">{activeSku.alertMessage}</p>
                      <div className="pi-alert-diff">
                        <span className="pi-shift">{activeSku.alertShift}</span>
                        <span className="pi-delta">{activeSku.alertDelta}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. MARKETPLACES TICKER (CLEAN RECTILINEAR / ZERO SHADOW)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="pi-marketplaces-section">
        <div className="container">
          <div className="pi-marketplaces-header">
            <h2 className="pi-marketplaces-title">
              Your competitors are watching the market. You should be too.
            </h2>
          </div>

          <div className="pi-marketplaces-grid">
            {[
              'Amazon',
              'Noon',
              'Trendyol',
              'Jarir',
              'Centrepoint',
              'E-commerce Websites',
              'Other Marketplaces'
            ].map((name, i) => (
              <div key={i} className="pi-marketplace-card">
                <span className="pi-m-indicator" />
                <span className="pi-m-name">{name}</span>
              </div>
            ))}
          </div>

          <p className="pi-marketplaces-disclaimer">
            Monitor leading marketplaces and e-commerce websites across the GCC, subject to platform availability and monitoring configuration.
          </p>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          3. THE ENGINE (MAP. MONITOR. REACT. WIN. // SCROLL-SPY LAYOUT)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="engine" className="pi-engine-section">
        <div className="container">
          {/* Top Centered Section Header */}
          <div className="pi-engine-center-header">
            <span className="pi-section-tag-dark">THE ENGINE</span>
            <h2 className="pi-engine-center-title">
              MAP. MONITOR. REACT. WIN.
            </h2>
            <p className="pi-engine-center-lead">
              The continuous 4-stage intelligence loop engineered for GCC e-commerce pricing dominance.
            </p>
          </div>

          <div className="pi-engine-split-layout">
            {/* Left Column: Natural scrolling stream of all 4 steps */}
            <div className="pi-engine-steps-stream">
              {/* 01 MAP */}
              <div 
                id="engine-step-0" 
                ref={el => (stepRefs.current[0] = el)} 
                className="pi-stream-step-card"
              >
                <div className="pi-step-card-grid">
                  <div className="pi-step-info">
                    <span className="pi-step-index">01 — MAP</span>
                    <h3 className="pi-step-title">Map your products against competitors.</h3>
                    <p className="pi-step-desc">
                      Match your products with comparable competitor products and understand exactly where you stand.
                    </p>
                    <div className="pi-step-badge">
                      <span>Know exactly who you're competing against.</span>
                    </div>
                  </div>

                  <div className="pi-step-visual">
                    <div className="pi-map-compare-table">
                      <div className="pi-compare-head-row">
                        <div className="pi-compare-col-your">
                          <span className="pi-table-tag">YOUR PRODUCT</span>
                          <strong>Premium Travel Luggage 28"</strong>
                        </div>
                        <div className="pi-compare-vs">VS</div>
                        <div className="pi-compare-col-comp">
                          <span className="pi-table-tag">COMPETITOR PRODUCT</span>
                          <strong>Premium Luggage 28"</strong>
                        </div>
                      </div>

                      <div className="pi-compare-spec-list">
                        {[
                          { attr: 'Brand', your: 'Voyager', comp: 'Voyager' },
                          { attr: 'Model', your: 'VX-28', comp: 'VX-28' },
                          { attr: 'SKU', your: 'UXL-2801', comp: 'VG-28-BLK' },
                          { attr: 'Price', your: 'SAR 299', comp: 'SAR 289' },
                          { attr: 'Availability', your: 'In stock', comp: 'In stock' }
                        ].map((row, i) => (
                          <div key={i} className="pi-spec-row">
                            <span className="pi-spec-attr">{row.attr}</span>
                            <span className="pi-spec-val">{row.your}</span>
                            <span className="pi-spec-val comp-val">{row.comp}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pi-compare-foot">
                        <span className="pi-status-dot green" />
                        <span>Match confirmed · 99.4% SKU Identity Match</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 02 MONITOR */}
              <div 
                id="engine-step-1" 
                ref={el => (stepRefs.current[1] = el)} 
                className="pi-stream-step-card"
              >
                <div className="pi-step-card-grid">
                  <div className="pi-step-info">
                    <span className="pi-step-index">02 — MONITOR</span>
                    <h3 className="pi-step-title">Automatically monitor competitor prices.</h3>
                    <p className="pi-step-desc">
                      Stop manually checking marketplaces and competitor websites. Continuous price discovery across leading GCC channels.
                    </p>
                    <div className="pi-step-badge">
                      <span>Turn manual price checking into automated monitoring.</span>
                    </div>
                  </div>

                  <div className="pi-step-visual">
                    <div className="pi-monitor-channels-grid">
                      {[
                        { channel: 'Amazon', price: 'SAR 299', status: 'Monitored', rate: 'Checked 12m ago' },
                        { channel: 'Noon', price: 'SAR 289', status: 'Monitored', rate: 'Checked 4m ago' },
                        { channel: 'Competitor Website', price: 'SAR 309', status: 'Monitored', rate: 'Checked 18m ago' },
                        { channel: 'Marketplace Seller', price: 'SAR 279', status: 'Monitored', rate: 'Checked 2m ago' }
                      ].map((ch, idx) => (
                        <div key={idx} className="pi-monitor-card">
                          <div className="pi-monitor-card-top">
                            <span className="pi-monitor-channel">{ch.channel}</span>
                            <span className="pi-monitor-badge">{ch.status}</span>
                          </div>
                          <div className="pi-monitor-price">{ch.price}</div>
                          <span className="pi-monitor-rate">{ch.rate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 03 REACT */}
              <div 
                id="engine-step-2" 
                ref={el => (stepRefs.current[2] = el)} 
                className="pi-stream-step-card"
              >
                <div className="pi-step-card-grid">
                  <div className="pi-step-info">
                    <span className="pi-step-index">03 — REACT</span>
                    <h3 className="pi-step-title">Get alerted when prices change.</h3>
                    <p className="pi-step-desc">
                      Know when a competitor changes their price so your team can investigate and respond faster before losing sales.
                    </p>
                    <div className="pi-step-badge">
                      <span>Know what changed before it becomes a bigger problem.</span>
                    </div>
                  </div>

                  <div className="pi-step-visual">
                    <div className="pi-react-alert-box">
                      <div className="pi-react-alert-top">
                        <span className="pi-react-tag">PRICE CHANGE ALERT</span>
                        <span className="pi-react-time">Under 120s dispatch</span>
                      </div>
                      <div className="pi-react-grid">
                        <div className="pi-react-field">
                          <span className="pi-mono-label">COMPETITOR</span>
                          <strong>Brand X</strong>
                        </div>
                        <div className="pi-react-field">
                          <span className="pi-mono-label">PRODUCT</span>
                          <strong>Premium Travel Luggage</strong>
                        </div>
                        <div className="pi-react-field">
                          <span className="pi-mono-label">PREVIOUS</span>
                          <span>SAR 299</span>
                        </div>
                        <div className="pi-react-field">
                          <span className="pi-mono-label">NEW PRICE</span>
                          <strong className="pi-highlight-down">SAR 269</strong>
                        </div>
                        <div className="pi-react-field full-width">
                          <span className="pi-mono-label">PERCENTAGE CHANGE</span>
                          <div className="pi-change-pill">-10.0% (- SAR 30)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 04 WIN */}
              <div 
                id="engine-step-3" 
                ref={el => (stepRefs.current[3] = el)} 
                className="pi-stream-step-card"
              >
                <div className="pi-step-card-grid">
                  <div className="pi-step-info">
                    <span className="pi-step-index">04 — WIN</span>
                    <h3 className="pi-step-title">Make faster, data-driven pricing decisions.</h3>
                    <p className="pi-step-desc">
                      Use competitive market visibility to understand pricing movements, protect competitiveness and make better commercial decisions.
                    </p>
                    <div className="pi-step-badge">
                      <span>Better visibility. Faster decisions.</span>
                    </div>
                  </div>

                  <div className="pi-step-visual">
                    <div className="pi-win-card">
                      <div className="pi-win-header">
                        <span className="pi-mono-label">PRICE POSITION VS MARKET</span>
                        <span className="pi-win-tag">Illustrative</span>
                      </div>
                      <div className="pi-win-metric">+4.2%</div>
                      <p className="pi-win-desc">
                        Optimal position above competitor floor while protecting high conversion velocity.
                      </p>
                      <div className="pi-win-bars">
                        <div className="pi-win-bar-item">
                          <span>Floor Margin Protected</span>
                          <strong>+24.5%</strong>
                        </div>
                        <div className="pi-win-bar-item">
                          <span>Buy-Box Win Probability</span>
                          <strong>94.8%</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Navigation Sidebar (matching screenshot) */}
            <aside className="pi-engine-sticky-sidebar">
              <div className="pi-engine-spy-nav">
                <span className="pi-spy-label">ON THIS SECTION</span>
                <nav className="pi-spy-links" role="tablist">
                  {[
                    { num: '01', name: 'Map products' },
                    { num: '02', name: 'Monitor prices' },
                    { num: '03', name: 'React to alerts' },
                    { num: '04', name: 'Win buy-box' }
                  ].map((s, idx) => (
                    <button
                      key={s.num}
                      type="button"
                      role="tab"
                      aria-selected={activeEngineStep === idx}
                      className={`pi-spy-link ${activeEngineStep === idx ? 'active' : ''}`}
                      onClick={() => scrollToStep(idx)}
                    >
                      <span className="pi-spy-indicator" />
                      <span className="pi-spy-num">{s.num}</span>
                      <span className="pi-spy-name">{s.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. ANALYTICS DASHBOARD SECTION (LIGHT THEME / ZERO SHADOW / TABLE)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="analytics" className="pi-analytics-section">
        <div className="container">
          <div className="pi-analytics-header">
            <span className="pi-section-tag-light">ANALYTICS</span>
            <ScrollTypographyReveal
              text="See the market. Not just your own store."
              tag="h2"
              className="pi-analytics-h2"
              theme="light"
              fromColor="#9CA3AF"
              toColor="#09090B"
              start="top 85%"
              end="bottom 50%"
            />
            <div className="pi-analytics-scope-bar">
              <span className="pi-scope-title">Market overview • {activeSku.name}</span>
              <span className="pi-scope-badge">ILLUSTRATIVE EXAMPLE</span>
            </div>
          </div>

          {/* 7 KPI Metric Cards */}
          <div className="pi-kpi-grid">
            <div className="pi-kpi-card">
              <span className="pi-kpi-label">Your Average Price</span>
              <strong className="pi-kpi-value">{activeSku.yourPrice}</strong>
            </div>
            <div className="pi-kpi-card">
              <span className="pi-kpi-label">Market Average</span>
              <strong className="pi-kpi-value">{activeSku.marketAvg}</strong>
            </div>
            <div className="pi-kpi-card">
              <span className="pi-kpi-label">Lowest Competitor</span>
              <strong className="pi-kpi-value highlight-down">{activeSku.lowest}</strong>
            </div>
            <div className="pi-kpi-card">
              <span className="pi-kpi-label">Highest Competitor</span>
              <strong className="pi-kpi-value">{activeSku.highest}</strong>
            </div>
            <div className="pi-kpi-card">
              <span className="pi-kpi-label">Price Position</span>
              <strong className="pi-kpi-value">{activeSku.position}</strong>
            </div>
            <div className="pi-kpi-card">
              <span className="pi-kpi-label">Price Changes (30d)</span>
              <strong className="pi-kpi-value">{activeSku.changesCount}</strong>
            </div>
            <div className="pi-kpi-card">
              <span className="pi-kpi-label">Competitors Monitored</span>
              <strong className="pi-kpi-value">{activeSku.competitorsCount}</strong>
            </div>
          </div>

          {/* Historical Pricing 90 Days & Recent Alerts */}
          <div className="pi-dashboard-split">
            {/* Historical Pricing (90 Days) */}
            <div className="pi-chart-panel">
              <div className="pi-chart-head">
                <span className="pi-mono-label">Historical pricing • 90 days</span>
                <div className="pi-chart-legend">
                  <span className="c-legend c-you">— Your price</span>
                  <span className="c-legend c-avg">— Market avg</span>
                  <span className="c-legend c-low">— Lowest</span>
                </div>
              </div>

              <div className="pi-chart-canvas-mock">
                <svg viewBox="0 0 620 180" className="pi-full-chart-svg" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="45" x2="620" y2="45" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="90" x2="620" y2="90" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="135" x2="620" y2="135" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />

                  {/* You Curve (Static Floor) */}
                  <polyline
                    fill="none"
                    stroke="#18181B"
                    strokeWidth="2.5"
                    points="0,60 100,60 200,60 300,60 400,60 500,60 620,60"
                  />
                  {/* Market Avg Curve */}
                  <polyline
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    points="0,75 100,80 200,85 300,90 400,92 500,96 620,95"
                  />
                  {/* Lowest Competitor Curve */}
                  <polyline
                    fill="none"
                    stroke="#FF7723"
                    strokeWidth="2.5"
                    points="0,75 100,85 200,95 300,105 400,110 500,125 620,135"
                  />
                </svg>
                <div className="pi-chart-x-labels">
                  <span>Day 1</span>
                  <span>Day 15</span>
                  <span>Day 30</span>
                  <span>Day 45</span>
                  <span>Day 60</span>
                  <span>Day 75</span>
                  <span>Day 90</span>
                </div>
              </div>
            </div>

            {/* Recent Alerts Feed */}
            <div className="pi-recent-alerts-panel">
              <span className="pi-mono-label">RECENT TELEMETRY ALERTS</span>
              <div className="pi-recent-alerts-list">
                <div className="pi-stream-alert-item">
                  <div className="pi-alert-brand-meta">
                    <strong>Brand X</strong>
                    <span>SAR 299 → 269</span>
                  </div>
                  <div className="pi-stream-time down">↓ 2h ago</div>
                </div>
                <div className="pi-stream-alert-item">
                  <div className="pi-alert-brand-meta">
                    <strong>Competitor A</strong>
                    <span>SAR 299 → 279</span>
                  </div>
                  <div className="pi-stream-time down">↓ 5h ago</div>
                </div>
                <div className="pi-stream-alert-item">
                  <div className="pi-alert-brand-meta">
                    <strong>Competitor B</strong>
                    <span>SAR 309 → 319</span>
                  </div>
                  <div className="pi-stream-time up">↑ 1d ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Competitor Leaderboard Table */}
          <div className="pi-table-wrap">
            <table className="pi-competitor-table">
              <thead>
                <tr>
                  <th>RANK</th>
                  <th>COMPETITOR</th>
                  <th>CHANNEL</th>
                  <th>PRICE</th>
                  <th>30D CHANGE</th>
                </tr>
              </thead>
              <tbody>
                {activeSku.competitors.map((row) => (
                  <tr key={row.rank}>
                    <td className="pi-td-rank">{row.rank}</td>
                    <td className="pi-td-name">{row.name}</td>
                    <td className="pi-td-channel">
                      <span className="pi-channel-badge">{row.channel}</span>
                    </td>
                    <td className="pi-td-price">{row.price}</td>
                    <td className={`pi-td-change ${row.dir}`}>
                      {row.change30d}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          8. FINAL TRANSITION / CTA SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="pi-cta-section">
        <div className="container">
          <div className="pi-cta-card">
            <div className="pi-cta-content">
              <ScrollTypographyReveal
                text="Start monitoring competitor prices today."
                tag="h2"
                className="pi-cta-title"
                theme="dark"
                fromColor="#52525B"
                toColor="#FFFFFF"
                start="top 90%"
                end="bottom 60%"
              />
              <p className="pi-cta-lead">
                Deploy UXHUB Pricing Super Intelligence across your catalog in under 15 minutes. Start your 14-day free trial today or book a private demonstration with our pricing experts.
              </p>
            </div>

            <div className="pi-cta-actions">
              <a 
                href="https://spy.price2spy.com/registration?ref=124076"
                target="_blank"
                rel="noopener noreferrer"
                className="pi-btn-primary"
              >
                <span>START YOUR FREE 14-DAY TRIAL</span>
                <DiagonalArrowIcon size={15} />
              </a>

              <button 
                type="button"
                className="pi-btn-secondary"
                onClick={handleTalkExpert}
              >
                <span>TALK TO A PRICING EXPERT</span>
                <DiagonalArrowIcon size={15} />
              </button>
            </div>

            <div className="pi-cta-guarantees">
              <span>14-day free trial</span>
              <span className="dot">•</span>
              <span>No credit card required</span>
              <span className="dot">•</span>
              <span>15-minute catalog onboarding</span>
              <span className="dot">•</span>
              <span>Multi-currency GCC support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

