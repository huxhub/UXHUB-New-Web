import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  VectorArrowRight,
  DiagonalArrowIcon,
  BrandCross
} from '../components/SharedUI';
import ScrollTypographyReveal from '../components/ScrollTypographyReveal';
import Effects from '../components/Effects';

const springEase = [0.16, 1, 0.3, 1];

// Interactive Telemetry Sample Data
const sampleProducts = [
  {
    id: 'sku-01',
    tabLabel: '01 / TRAVEL LUGGAGE 28"',
    title: 'Premium Hard-Shell Travel Luggage 28"',
    category: 'Travel & Luggage',
    yourPrice: 'SAR 299',
    rawYourPrice: 299,
    status: 'BUY-BOX AT RISK',
    statusType: 'danger',
    alertText: 'Competitor A reduced price by SAR 30 on Amazon KSA',
    priceShift: 'SAR 299 → SAR 269',
    diff: '- SAR 30 (-10%)',
    recommended: 'SAR 268 to reclaim Buy-Box (Floor margin: +24%)',
    competitors: [
      { name: 'Amazon KSA', seller: 'Competitor A', price: 'SAR 269', shift: 'down', diff: '-30', badge: 'Lowest' },
      { name: 'Noon KSA', seller: 'Competitor B', price: 'SAR 289', shift: 'down', diff: '-10', badge: 'Active' },
      { name: 'eXtra Stores', seller: 'Competitor C', price: 'SAR 319', shift: 'up', diff: '+20', badge: 'Higher' }
    ],
    chartPoints: [
      { day: 'Day 1', you: 299, comp: 299 },
      { day: 'Day 8', you: 299, comp: 295 },
      { day: 'Day 15', you: 299, comp: 289 },
      { day: 'Day 22', you: 299, comp: 289 },
      { day: 'Day 28', you: 299, comp: 279 },
      { day: 'Today', you: 299, comp: 269 }
    ]
  },
  {
    id: 'sku-02',
    tabLabel: '02 / ANC HEADPHONES',
    title: 'Ultra Active Noise Cancelling Headphones',
    category: 'Consumer Electronics',
    yourPrice: 'SAR 449',
    rawYourPrice: 449,
    status: 'UNDER-CUT ON NOON',
    statusType: 'danger',
    alertText: 'Flash promotion detected on Noon UAE (-SAR 50)',
    priceShift: 'SAR 449 → SAR 399',
    diff: '- SAR 50 (-11%)',
    recommended: 'Match SAR 419 with instant bundle coupon',
    competitors: [
      { name: 'Noon UAE', seller: 'Competitor Alpha', price: 'SAR 399', shift: 'down', diff: '-50', badge: 'Lowest' },
      { name: 'Amazon UAE', seller: 'Competitor Beta', price: 'SAR 429', shift: 'down', diff: '-20', badge: 'Active' },
      { name: 'Jarir Bookstore', seller: 'Official Store', price: 'SAR 469', shift: 'up', diff: '+20', badge: 'Higher' }
    ],
    chartPoints: [
      { day: 'Day 1', you: 449, comp: 449 },
      { day: 'Day 8', you: 449, comp: 440 },
      { day: 'Day 15', you: 449, comp: 435 },
      { day: 'Day 22', you: 449, comp: 420 },
      { day: 'Day 28', you: 449, comp: 410 },
      { day: 'Today', you: 449, comp: 399 }
    ]
  },
  {
    id: 'sku-03',
    tabLabel: '03 / ESPRESSO MACHINE',
    title: 'Precision 15-Bar Italian Espresso Machine',
    category: 'Home & Kitchen',
    yourPrice: 'SAR 1,299',
    rawYourPrice: 1299,
    status: 'BUY-BOX CAPTURED',
    statusType: 'success',
    alertText: 'Competitor stock out on Amazon. Room to lift price.',
    priceShift: 'SAR 1,299 → SAR 1,349',
    diff: '+ SAR 50 (+3.8%)',
    recommended: 'Opportunity to increase to SAR 1,329 (+SAR 30 margin)',
    competitors: [
      { name: 'Amazon KSA', seller: 'Competitor Prime', price: 'SAR 1,349', shift: 'up', diff: '+50', badge: 'Higher' },
      { name: 'Noon KSA', seller: 'Competitor Retail', price: 'SAR 1,299', shift: 'same', diff: '0', badge: 'Parity' },
      { name: 'Carrefour GCC', seller: 'Hypermarket', price: 'SAR 1,399', shift: 'up', diff: '+100', badge: 'Higher' }
    ],
    chartPoints: [
      { day: 'Day 1', you: 1299, comp: 1249 },
      { day: 'Day 8', you: 1299, comp: 1269 },
      { day: 'Day 15', you: 1299, comp: 1289 },
      { day: 'Day 22', you: 1299, comp: 1299 },
      { day: 'Day 28', you: 1299, comp: 1320 },
      { day: 'Today', you: 1299, comp: 1349 }
    ]
  }
];

export default function ProductPage({ onOpenContact, onNavigate }) {
  const [activeSkuIdx, setActiveSkuIdx] = useState(0);
  const activeProduct = sampleProducts[activeSkuIdx];

  const handleStartTrial = () => {
    if (onOpenContact) {
      onOpenContact('Price Intelligence - 14-Day Free Trial');
    } else if (onNavigate) {
      onNavigate('contact');
    }
  };

  const handleTalkExpert = () => {
    if (onOpenContact) {
      onOpenContact('Price Intelligence - Demo & Expert Consultation');
    } else if (onNavigate) {
      onNavigate('contact');
    }
  };

  return (
    <div className="inner-page product-page">
      {/* ─── 1. HERO SECTION (SOLID BLACK / LUXURY METALLIC) ─────────────── */}
      <section className="product-hero-black">
        <div className="product-hero-swirl-layer" aria-hidden="true">
          <Effects kind="swirl" className="metallic-swirl-canvas" />
        </div>

        <div className="container product-hero-container">
          <div className="product-hero-grid">
            {/* Left Column: Editorial Headline & Value Proposition */}
            <motion.div 
              className="product-hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: springEase }}
            >
              <h1 className="product-hero-title">
                Are you losing sales because competitors change prices before you know it?
              </h1>

              <p className="product-hero-lead">
                Continuous competitor price telemetry across Amazon, Noon, and regional D2C storefronts. Get alerted the instant prices shift, win the Buy-Box, and safeguard your gross margins.
              </p>

              <div className="product-hero-cta-bar">
                <button 
                  type="button"
                  className="product-btn-primary"
                  onClick={handleStartTrial}
                >
                  <span>START 14-DAY TRIAL</span>
                  <DiagonalArrowIcon size={16} />
                </button>

                <button 
                  type="button"
                  className="product-btn-secondary"
                  onClick={handleTalkExpert}
                >
                  <span>BOOK A PRIVATE DEMO</span>
                  <DiagonalArrowIcon size={16} />
                </button>
              </div>

              <div className="product-hero-trust-bar">
                <span className="product-trust-item">✓ 14-day free trial</span>
                <span className="product-trust-divider">•</span>
                <span className="product-trust-item">No credit card required</span>
                <span className="product-trust-divider">•</span>
                <span className="product-trust-item">Active in KSA, UAE, Qatar & Kuwait</span>
              </div>
            </motion.div>

            {/* Right Column: Live Interactive Price Intelligence Terminal */}
            <motion.div 
              className="product-telemetry-panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: springEase }}
            >
              <div className="telemetry-terminal-box">
                {/* Top System Bar */}
                <div className="telemetry-topbar">
                  <div className="telemetry-window-dots">
                    <span className="window-dot" />
                    <span className="window-dot" />
                    <span className="window-dot" />
                  </div>
                  <div className="telemetry-terminal-title">
                    LIVE MARKET TELEMETRY // GCC ENGINE
                  </div>
                  <span className="telemetry-latency">LATENCY: 140ms</span>
                </div>

                {/* SKU Selector Tabs */}
                <div className="telemetry-sku-tabs">
                  {sampleProducts.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`telemetry-tab-btn ${activeSkuIdx === idx ? 'active' : ''}`}
                      onClick={() => setActiveSkuIdx(idx)}
                    >
                      {p.tabLabel}
                    </button>
                  ))}
                </div>

                {/* Main Product Status Row */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeProduct.id}
                    className="telemetry-card-body"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="telemetry-meta-row">
                      <div className="telemetry-product-info">
                        <span className="telemetry-label">MONITORED CATALOG SKU</span>
                        <h2 className="telemetry-product-name">{activeProduct.title}</h2>
                        <span className="telemetry-category">{activeProduct.category}</span>
                      </div>

                      <div className="telemetry-price-info">
                        <span className="telemetry-label">YOUR LISTING PRICE</span>
                        <div className="telemetry-my-price">{activeProduct.yourPrice}</div>
                        <span className={`telemetry-status-pill ${activeProduct.statusType}`}>
                          {activeProduct.status}
                        </span>
                      </div>
                    </div>

                    {/* Competitor Price Comparison Cards */}
                    <div className="telemetry-comp-grid">
                      {activeProduct.competitors.map((comp, cIdx) => (
                        <div 
                          key={cIdx} 
                          className={`telemetry-comp-card ${comp.shift === 'down' ? 'is-undercut' : ''}`}
                        >
                          <div className="comp-card-header">
                            <span className="comp-platform">{comp.name}</span>
                            <span className="comp-badge">{comp.badge}</span>
                          </div>
                          <div className="comp-seller">{comp.seller}</div>
                          <div className="comp-price-row">
                            <span className="comp-price">{comp.price}</span>
                            <span className={`comp-diff ${comp.shift}`}>
                              {comp.shift === 'down' ? '↓' : comp.shift === 'up' ? '↑' : '='} {comp.diff}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Vector History Graph */}
                    <div className="telemetry-chart-container">
                      <div className="chart-header">
                        <span className="chart-title">30-DAY COMPETITOR PRICE CURVE</span>
                        <div className="chart-legend">
                          <span className="legend-tag legend-you">
                            <span className="legend-line line-you" /> You ({activeProduct.yourPrice})
                          </span>
                          <span className="legend-tag legend-comp">
                            <span className="legend-line line-comp" /> Competitor A
                          </span>
                        </div>
                      </div>

                      <div className="chart-svg-wrap">
                        <svg viewBox="0 0 460 110" className="telemetry-svg" preserveAspectRatio="none">
                          <line x1="0" y1="20" x2="460" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                          <line x1="0" y1="55" x2="460" y2="55" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                          <line x1="0" y1="90" x2="460" y2="90" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

                          {/* Your Price Line (Solid White/Subtle) */}
                          <path 
                            d="M 0 45 L 90 45 L 180 45 L 270 45 L 360 45 L 460 45" 
                            stroke="#FFFFFF" 
                            strokeWidth="2" 
                            fill="none" 
                          />

                          {/* Competitor Price Line (Orange Accent / Stepped Curve) */}
                          <path 
                            d={
                              activeSkuIdx === 0 
                                ? "M 0 45 L 90 52 L 180 62 L 270 62 L 360 76 L 460 88" 
                                : activeSkuIdx === 1 
                                ? "M 0 45 L 90 50 L 180 58 L 270 70 L 360 78 L 460 92"
                                : "M 0 75 L 90 65 L 180 55 L 270 45 L 360 35 L 460 22"
                            }
                            stroke="#FF7723" 
                            strokeWidth="2.2" 
                            fill="none"
                            strokeLinecap="square"
                          />
                        </svg>

                        <div className="chart-axis-labels">
                          <span>Day 1</span>
                          <span>Day 10</span>
                          <span>Day 20</span>
                          <span>Day 28</span>
                          <span className="active-now">Live Now</span>
                        </div>
                      </div>
                    </div>

                    {/* Live Detected Trigger Banner */}
                    <div className="telemetry-alert-banner">
                      <div className="alert-badge-wrap">
                        <span className="alert-tag">DISPATCH TRIGGER</span>
                      </div>
                      <div className="alert-content">
                        <div className="alert-msg">{activeProduct.alertText}</div>
                        <div className="alert-details">
                          <span className="alert-shift">{activeProduct.priceShift}</span>
                          <span className="alert-diff">{activeProduct.diff}</span>
                          <span className="alert-action">Recommended: {activeProduct.recommended}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. MARKETPLACES & ECOSYSTEM COVERAGE (WHITE) ────────────────── */}
      <section className="product-marketplaces-section">
        <div className="container">
          <div className="product-market-header">
            <h2 className="product-market-title">
              Your competitors are watching the market. You should be too.
            </h2>
            <p className="product-market-sub">
              Automated high-frequency telemetry across all premier marketplaces and D2C channels across Saudi Arabia, UAE, Qatar, and Kuwait.
            </p>
          </div>

          <div className="product-market-pills-grid">
            {[
              { name: 'Amazon KSA', flag: 'SA', type: 'Marketplace' },
              { name: 'Amazon UAE', flag: 'AE', type: 'Marketplace' },
              { name: 'Noon.com (KSA & UAE)', flag: 'GCC', type: 'Super-App' },
              { name: 'Jarir Bookstore', flag: 'SA', type: 'Omnichannel' },
              { name: 'eXtra Stores', flag: 'SA', type: 'Retail Chain' },
              { name: 'Trendyol GCC', flag: 'GCC', type: 'Fashion & Home' },
              { name: 'Carrefour GCC', flag: 'GCC', type: 'Hypermarket' },
              { name: 'Sharaf DG', flag: 'AE', type: 'Consumer Tech' },
              { name: 'Namshi & Centrepoint', flag: 'GCC', type: 'Apparel' },
              { name: 'Custom Brand D2C Storefronts', flag: 'API', type: 'Shopify / Magento / Headless' }
            ].map((market, mIdx) => (
              <div key={mIdx} className="product-market-pill-card">
                <div className="market-pill-badge">{market.flag}</div>
                <div className="market-pill-body">
                  <span className="market-pill-name">{market.name}</span>
                  <span className="market-pill-type">{market.type}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Key SLA Metric Highlights */}
          <div className="product-metrics-strip">
            <div className="product-metric-col">
              <div className="metric-number">500,000+</div>
              <div className="metric-label">SKUs Monitored Daily</div>
            </div>
            <div className="product-metric-col">
              <div className="metric-number">&lt; 5 Min</div>
              <div className="metric-label">Price Shift Alert Latency</div>
            </div>
            <div className="product-metric-col">
              <div className="metric-number">99.8%</div>
              <div className="metric-label">SKU Match & Precision SLA</div>
            </div>
            <div className="product-metric-col">
              <div className="metric-number">4 GCC Markets</div>
              <div className="metric-label">SAR • AED • QAR • KWD</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. THE MARKET FRICTION & PROBLEM (BLACK) ───────────────────── */}
      <section className="product-problem-section">
        <div className="container">
          <div className="product-section-header-dark">
            <ScrollTypographyReveal
              text="Your competitors don't wait for your weekly pricing review."
              tag="h2"
              className="product-section-h2-dark"
              theme="dark"
              fromColor="#52525B"
              toColor="#FFFFFF"
              start="top 85%"
              end="bottom 50%"
            />
            <p className="product-section-lead-dark">
              In high-velocity GCC e-commerce, prices shift intraday. Marketplace sellers trigger flash promotions, algorithmic repricers undercut listings by 1 SAR, and stock goes out without warning. By the time someone notices manually, margin and sales are already gone.
            </p>
          </div>

          <div className="product-problem-cards-grid">
            <div className="problem-card">
              <div className="problem-card-num">01</div>
              <h3 className="problem-card-title">Intraday Price Velocity</h3>
              <p className="problem-card-desc">
                Competitors reprice up to 8 times daily during peak browsing windows. Static weekly or monthly pricing audits leave your commercial team operating on obsolete market data.
              </p>
              <div className="problem-card-footer">
                <span className="friction-tag">LOST REVENUE OPPORTUNITY</span>
              </div>
            </div>

            <div className="problem-card">
              <div className="problem-card-num">02</div>
              <h3 className="problem-card-title">Manual Monitoring Collapse</h3>
              <p className="problem-card-desc">
                Checking hundreds or thousands of product URLs manually across multiple browser tabs burns hundreds of hours, misses flash discounts, and introduces human copy-paste errors.
              </p>
              <div className="problem-card-footer">
                <span className="friction-tag">OPERATIONAL DRAG</span>
              </div>
            </div>

            <div className="problem-card">
              <div className="problem-card-num">03</div>
              <h3 className="problem-card-title">Silent Buy-Box Erosion</h3>
              <p className="problem-card-desc">
                On Amazon and Noon, losing the Buy-Box means instantly forfeiting 80%+ of listing conversion volume. Competitors steal the top placement without your team receiving any notice.
              </p>
              <div className="problem-card-footer">
                <span className="friction-tag">LOST TRAFFIC & CONVERSION</span>
              </div>
            </div>

            <div className="problem-card">
              <div className="problem-card-num">04</div>
              <h3 className="problem-card-title">Margin Destruction & Blind Discounting</h3>
              <p className="problem-card-desc">
                Reacting to competition by indiscriminately slashing prices destroys bottom-line profitability. You need bounded elasticity safeguards that ensure you never sell below floor margins.
              </p>
              <div className="problem-card-footer">
                <span className="friction-tag">PROFITABILITY DILUTION</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. THE 4-STAGE ARCHITECTURE ENGINE (WHITE) ──────────────────── */}
      <section className="product-engine-section">
        <div className="container">
          <div className="product-section-header-light">
            <ScrollTypographyReveal
              text="MAP. MONITOR. REACT. WIN."
              tag="h2"
              className="product-section-h2-light"
              theme="light"
              fromColor="#9CA3AF"
              toColor="#09090B"
              start="top 85%"
              end="bottom 50%"
            />
            <p className="product-section-lead-light">
              An enterprise-grade pricing intelligence architecture engineered from the ground up for high-volume cross-border GCC commerce.
            </p>
          </div>

          <div className="product-engine-steps-grid">
            {/* Step 01 */}
            <div className="engine-step-card">
              <div className="step-card-top">
                <span className="step-num">STAGE 01</span>
                <span className="step-tag">MAP</span>
              </div>
              <h3 className="step-title">Automated Catalog & SKU Mapping</h3>
              <p className="step-desc">
                Match your products against direct and comparable competitor SKUs. Intelligent matching handles Arabic RTL and English product title variations, model numbers, and bundle variations with sub-second accuracy.
              </p>
              <div className="step-specs-box">
                <span className="spec-item">✓ Bilingual Arabic / English parity</span>
                <span className="spec-item">✓ Barcode & EAN cross-matching</span>
                <span className="spec-item">✓ Variant & pack-size normalization</span>
              </div>
            </div>

            {/* Step 02 */}
            <div className="engine-step-card">
              <div className="step-card-top">
                <span className="step-num">STAGE 02</span>
                <span className="step-tag">MONITOR</span>
              </div>
              <h3 className="step-title">High-Frequency Edge Telemetry</h3>
              <p className="step-desc">
                Distributed edge scraping nodes monitor competitor product pages 24/7. Track listing prices, shipping fees, stock status, seller identity, and Buy-Box rotation without being blocked by anti-bot measures.
              </p>
              <div className="step-specs-box">
                <span className="spec-item">✓ Multi-region GCC residential proxies</span>
                <span className="spec-item">✓ Stock availability & out-of-stock alerts</span>
                <span className="spec-item">✓ Buy-Box owner tracking</span>
              </div>
            </div>

            {/* Step 03 */}
            <div className="engine-step-card">
              <div className="step-card-top">
                <span className="step-num">STAGE 03</span>
                <span className="step-tag">REACT</span>
              </div>
              <h3 className="step-title">Sub-Second Multi-Channel Alerts</h3>
              <p className="step-desc">
                The moment a competitor drops or lifts prices, your team receives structured notifications via WhatsApp, Slack, Email, or Webhooks, complete with recommended response prices and margin impact calculations.
              </p>
              <div className="step-specs-box">
                <span className="spec-item">✓ Direct WhatsApp manager alerts</span>
                <span className="spec-item">✓ Slack & Microsoft Teams webhooks</span>
                <span className="spec-item">✓ Instant margin floor warning</span>
              </div>
            </div>

            {/* Step 04 */}
            <div className="engine-step-card">
              <div className="step-card-top">
                <span className="step-num">STAGE 04</span>
                <span className="step-tag">WIN</span>
              </div>
              <h3 className="step-title">Algorithmic Margin Safeguards</h3>
              <p className="step-desc">
                Turn raw competitor data into automated repricing rules. Maximize revenue during stockouts, capture the Buy-Box during high-demand windows, and enforce strict minimum advertised price (MAP) boundaries.
              </p>
              <div className="step-specs-box">
                <span className="spec-item">✓ Dynamic repricing rule engine</span>
                <span className="spec-item">✓ Elasticity & historical price modeling</span>
                <span className="spec-item">✓ ERP & Marketplace API sync</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. REGIONAL GCC CAPABILITIES (BLACK) ────────────────────────── */}
      <section className="product-gcc-section">
        <div className="container">
          <div className="product-section-header-dark">
            <ScrollTypographyReveal
              text="Engineered specifically for GCC e-commerce dynamics."
              tag="h2"
              className="product-section-h2-dark"
              theme="dark"
              fromColor="#52525B"
              toColor="#FFFFFF"
              start="top 85%"
              end="bottom 50%"
            />
            <p className="product-section-lead-dark">
              Standard Western price monitoring tools fail in the GCC because they lack Arabic catalog understanding, cross-border VAT normalization, and regional marketplace integration.
            </p>
          </div>

          <div className="product-gcc-features-grid">
            <div className="gcc-feature-card">
              <h3 className="gcc-feature-title">Bilingual Arabic & English Natural Processing</h3>
              <p className="gcc-feature-desc">
                Accurately pairs Arabic product titles with English brand catalogs, normalizing transliterated keywords, Arabic numerals, and localized brand spellings.
              </p>
            </div>

            <div className="gcc-feature-card">
              <h3 className="gcc-feature-title">Real-Time Currency & VAT Normalization</h3>
              <p className="gcc-feature-desc">
                Simultaneously benchmarks prices across SAR (15% VAT), AED (5% VAT), QAR, and KWD with live exchange rates, allowing cross-border pricing parity.
              </p>
            </div>

            <div className="gcc-feature-card">
              <h3 className="gcc-feature-title">Marketplace Fulfillment Segmentation</h3>
              <p className="gcc-feature-desc">
                Distinguish between Amazon FBA vs Merchant-Fulfilled, and Noon Express vs Marketplace. Account for fast shipping badges when calculating Buy-Box win rates.
              </p>
            </div>

            <div className="gcc-feature-card">
              <h3 className="gcc-feature-title">Executive WhatsApp Telemetry Threads</h3>
              <p className="gcc-feature-desc">
                Commercial leaders don&apos;t log into clunky dashboards all day. Receive instant price-shift summaries and approve repricing recommendations directly via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. ENTERPRISE USE CASES (WHITE) ────────────────────────────── */}
      <section className="product-usecases-section">
        <div className="container">
          <div className="product-section-header-light">
            <ScrollTypographyReveal
              text="Built for commercial teams that compete on price & velocity."
              tag="h2"
              className="product-section-h2-light"
              theme="light"
              fromColor="#9CA3AF"
              toColor="#09090B"
              start="top 85%"
              end="bottom 50%"
            />
          </div>

          <div className="product-usecases-grid">
            <div className="usecase-card">
              <div className="usecase-tag">D2C BRANDS</div>
              <h3 className="usecase-title">Protect Brand Equity & Minimum Advertised Price</h3>
              <p className="usecase-desc">
                Track unauthorized grey-market sellers and rogue distributors who discount below brand MAP policies on Amazon, Noon, and regional webstores.
              </p>
              <div className="usecase-metric">
                <span className="metric-val">100%</span>
                <span className="metric-txt">MAP compliance enforcement</span>
              </div>
            </div>

            <div className="usecase-card">
              <div className="usecase-tag">MARKETPLACE SELLERS</div>
              <h3 className="usecase-title">Win the Buy-Box 24/7 Without Margin Wars</h3>
              <p className="usecase-desc">
                Outsmart aggressive repricers on Amazon and Noon with precision algorithmic adjustments that preserve profitability rather than triggering a race to zero.
              </p>
              <div className="usecase-metric">
                <span className="metric-val">+34%</span>
                <span className="metric-txt">Average Buy-Box retention lift</span>
              </div>
            </div>

            <div className="usecase-card">
              <div className="usecase-tag">DISTRIBUTORS & WHOLESALE</div>
              <h3 className="usecase-title">Multi-Market Cross-Border Parity</h3>
              <p className="usecase-desc">
                Maintain uniform pricing across Saudi Arabia, UAE, and Qatar. Catch currency arbitrage where buyers purchase from other GCC states due to price discrepancies.
              </p>
              <div className="usecase-metric">
                <span className="metric-val">4 Markets</span>
                <span className="metric-txt">Real-time cross-border audit</span>
              </div>
            </div>

            <div className="usecase-card">
              <div className="usecase-tag">OMNICHANNEL RETAILERS</div>
              <h3 className="usecase-title">Prevent Showrooming Across Physical Stores</h3>
              <p className="usecase-desc">
                Audit online competitors continuously so store managers can defend shelf prices and match verified marketplace promotions with targeted elasticity.
              </p>
              <div className="usecase-metric">
                <span className="metric-val">&lt; 5 Min</span>
                <span className="metric-txt">Omnichannel price sync latency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. FINAL LUXURY CALL TO ACTION (BLACK) ─────────────────────── */}
      <section className="product-cta-section">
        <div className="container">
          <div className="product-cta-box">
            <div className="product-cta-header">
              <ScrollTypographyReveal
                text="Stop losing revenue to unseen competitor price cuts."
                tag="h2"
                className="product-cta-title"
                theme="dark"
                fromColor="#52525B"
                toColor="#FFFFFF"
                start="top 90%"
                end="bottom 60%"
              />
              <p className="product-cta-sub">
                Deploy UXHUB Pricing Super Intelligence across your catalog in under 15 minutes. Start your 14-day free trial today or book a private demonstration with our commerce principals.
              </p>
            </div>

            <div className="product-cta-actions">
              <button 
                type="button"
                className="product-btn-primary"
                onClick={handleStartTrial}
              >
                <span>START 14-DAY TRIAL</span>
                <DiagonalArrowIcon size={16} />
              </button>

              <button 
                type="button"
                className="product-btn-secondary"
                onClick={handleTalkExpert}
              >
                <span>TALK TO A PRICING SPECIALIST</span>
                <DiagonalArrowIcon size={16} />
              </button>
            </div>

            <div className="product-cta-guarantees">
              <span>No credit card required</span>
              <span className="divider">•</span>
              <span>15-minute catalog onboarding</span>
              <span className="divider">•</span>
              <span>Full enterprise API access</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
