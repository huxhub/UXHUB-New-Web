import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DiagonalArrowIcon 
} from '../components/SharedUI';
import ScrollTypographyReveal from '../components/ScrollTypographyReveal';
import Effects from '../components/Effects';

const springEase = [0.16, 1, 0.3, 1];

const sampleEngineAnswers = {
  chatgpt: {
    name: 'ChatGPT',
    score: '78%',
    query: 'Best e-commerce brands in Saudi Arabia...',
    answer: 'For quality, range and a smooth shopping experience, Your Brand is worth considering alongside Competitor A and Competitor B.',
    badges: ['Brand mention', 'Citation · source example', 'Competitor recommendation']
  },
  gemini: {
    name: 'Gemini',
    score: '71%',
    query: 'Top rated fashion & retail stores in Riyadh...',
    answer: 'According to regional market feedback, Your Brand ranks high for fast delivery and customer satisfaction, frequently compared with Competitor B.',
    badges: ['Brand mention', 'Citation · Google ecosystem', 'Verified merchant']
  },
  perplexity: {
    name: 'Perplexity',
    score: '68%',
    query: 'Which GCC online platforms have the highest customer trust?',
    answer: 'Verified sources highlight Your Brand for transparent return policies, with Competitor A maintaining higher catalog volume.',
    badges: ['Source citation [1][2]', 'Comparative synthesis', 'Entity recognition']
  },
  googleai: {
    name: 'Google AI',
    score: '65%',
    query: 'Where to buy premium lifestyle products in KSA...',
    answer: 'AI Overview recommends Your Brand based on recent regional reviews and structured merchant data, alongside Competitor A.',
    badges: ['AI Overview placement', 'Knowledge graph match', 'Direct store citation']
  }
};

const faqsData = [
  {
    q: 'Is this another SEO tool?',
    a: 'No. Traditional SEO focuses on search results and rankings. AI Visibility Intelligence focuses on how your brand appears in AI-generated answers: mentions, citations and recommendations. It complements SEO rather than replacing it.'
  },
  {
    q: 'What does AI visibility measure?',
    a: 'AI visibility measures how frequently and prominently a brand appears across tracked questions and supported AI answer engines. The dashboard examples on this website are illustrative, not a live assessment of your brand.'
  },
  {
    q: 'Which AI engines can I track?',
    a: 'The product tracks supported AI answer engines including ChatGPT, Gemini, Perplexity, and Google AI Overviews. Platform availability and monitoring options depend on the underlying product and your configuration.'
  },
  {
    q: 'Can I compare my brand with competitors?',
    a: 'Yes. Competitive intelligence helps you understand which brands appear for relevant questions, how often they are mentioned, and the exact sources that support those recommendations.'
  },
  {
    q: 'What is citation intelligence?',
    a: 'Citation intelligence reveals which websites and sources are referenced in AI answers. It helps you understand where AI obtains information and where your brand may have content or information gaps.'
  },
  {
    q: 'Does checking my AI visibility give me an instant score?',
    a: 'Share your brand, website and market through our contact page so UXHub Global can discuss the right visibility assessment for you. This is a personalized commercial enquiry, not an automated scan or instant score.'
  },
  {
    q: 'Can you guarantee AI recommendations?',
    a: 'No. AI answers can vary across engines, questions, markets and time. Intelligence supports informed optimization decisions; it cannot guarantee a ranking, mention or recommendation.'
  }
];

export default function AiVisibilityPage({ onOpenContact, onNavigate }) {
  const [activeEngine, setActiveEngine] = useState('chatgpt');
  const [openFaq, setOpenFaq] = useState(0);

  const handleCheckVisibility = () => {
    if (onOpenContact) {
      onOpenContact('AI Visibility Assessment Enquiry');
    } else if (onNavigate) {
      onNavigate('contact');
    }
  };

  const handleTalkExpert = () => {
    if (onOpenContact) {
      onOpenContact('AI Visibility - Expert Consultation');
    } else if (onNavigate) {
      onNavigate('contact');
    }
  };

  const currentAnswer = sampleEngineAnswers[activeEngine];

  return (
    <div className="inner-page ai-visibility-page">
      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO (LUXURY DARK / TELEMETRY PREVIEW / ZERO SHADOW)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="aiv-hero">
        <div className="aiv-hero-swirl" aria-hidden="true">
          <Effects kind="swirl" className="aiv-swirl-canvas" />
        </div>

        <div className="container aiv-hero-container">
          <div className="aiv-hero-grid">
            {/* Left: Copy */}
            <motion.div 
              className="aiv-hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: springEase }}
            >
              <h1 className="aiv-hero-title">
                Is AI Recommending Your Competitors Instead of You?
              </h1>

              <p className="aiv-hero-lead">
                Customers are asking AI what to buy, where to go and which brands to trust. Know where you appear, who gets recommended instead, and how to improve.
              </p>

              <div className="aiv-hero-ctas">
                <button 
                  type="button" 
                  className="aiv-btn-primary"
                  onClick={handleCheckVisibility}
                >
                  <span>CHECK YOUR AI VISIBILITY</span>
                  <DiagonalArrowIcon size={15} />
                </button>

                <button 
                  type="button" 
                  className="aiv-btn-secondary"
                  onClick={handleTalkExpert}
                >
                  <span>TALK TO AN AI VISIBILITY EXPERT</span>
                  <DiagonalArrowIcon size={15} />
                </button>
              </div>

              <div className="aiv-hero-trust-row">
                <span className="aiv-trust-tag">Powered by <strong>Tasadr ↗</strong></span>
                <span className="aiv-bullet">•</span>
                <span>Built for modern search</span>
                <span className="aiv-bullet">•</span>
                <span>GCC & Global Coverage</span>
              </div>
            </motion.div>

            {/* Right: Dashboard Preview Mock */}
            <motion.div 
              className="aiv-hero-preview"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: springEase }}
            >
              <div className="aiv-preview-box">
                {/* Window Topbar */}
                <div className="aiv-preview-topbar">
                  <div className="aiv-topbar-title">
                    <span className="aiv-pulse" />
                    <span>YOUR BRAND. THROUGH THE LENS OF AI.</span>
                  </div>
                  <span className="aiv-topbar-tag">PRODUCT PREVIEW</span>
                </div>

                <div className="aiv-preview-body">
                  {/* Brand Profile Row */}
                  <div className="aiv-profile-row">
                    <div className="aiv-brand-badge">YB</div>
                    <div>
                      <strong className="aiv-brand-name">Your Brand</strong>
                      <span className="aiv-brand-region">Saudi Arabia & GCC Market</span>
                    </div>
                    <span className="aiv-period-pill">Last 30 Days</span>
                  </div>

                  {/* 4 KPI Metrics */}
                  <div className="aiv-kpis-grid">
                    <div className="aiv-kpi-item">
                      <span className="aiv-kpi-lbl">AI visibility score</span>
                      <strong className="aiv-kpi-val highlight">72%</strong>
                      <span className="aiv-kpi-sub">+8.2% vs. previous period</span>
                    </div>
                    <div className="aiv-kpi-item">
                      <span className="aiv-kpi-lbl">Brand mentions</span>
                      <strong className="aiv-kpi-val">148</strong>
                      <span className="aiv-kpi-sub">+24 vs. previous period</span>
                    </div>
                    <div className="aiv-kpi-item">
                      <span className="aiv-kpi-lbl">Citations</span>
                      <strong className="aiv-kpi-val">86</strong>
                      <span className="aiv-kpi-sub">+12 vs. previous period</span>
                    </div>
                    <div className="aiv-kpi-item">
                      <span className="aiv-kpi-lbl">Competitor visibility</span>
                      <strong className="aiv-kpi-val">+18%</strong>
                      <span className="aiv-kpi-sub">Market benchmark</span>
                    </div>
                  </div>

                  {/* Interactive Engine Tabs */}
                  <div className="aiv-engine-inspect-box">
                    <div className="aiv-inspect-head">
                      <span className="aiv-inspect-title">INSIDE THE AI ANSWER</span>
                      <div className="aiv-engine-tab-list">
                        {['chatgpt', 'gemini', 'perplexity', 'googleai'].map((key) => (
                          <button
                            key={key}
                            type="button"
                            className={`aiv-eng-tab ${activeEngine === key ? 'active' : ''}`}
                            onClick={() => setActiveEngine(key)}
                          >
                            {sampleEngineAnswers[key].name} ({sampleEngineAnswers[key].score})
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="aiv-query-bar">
                      <span className="aiv-query-label">PROMPT:</span>
                      <span className="aiv-query-text">"{currentAnswer.query}"</span>
                    </div>

                    <div className="aiv-answer-card">
                      <p className="aiv-answer-text">{currentAnswer.answer}</p>
                      <div className="aiv-answer-badges">
                        {currentAnswer.badges.map((b, i) => (
                          <span key={i} className="aiv-badge-pill">{b}</span>
                        ))}
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
          2. SUPPORTED AI ENGINES TICKER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="aiv-engines-ribbon">
        <div className="container">
          <p className="aiv-ribbon-label">Understand your presence in the new search landscape</p>
          <div className="aiv-ribbon-badges">
            {['ChatGPT', 'Gemini', 'Perplexity', 'Google AI', 'Claude & Beyond'].map((name, i) => (
              <div key={i} className="aiv-engine-chip">
                <span className="aiv-chip-dot" />
                <span className="aiv-chip-name">{name}</span>
              </div>
            ))}
          </div>
          <p className="aiv-ribbon-disclaimer">
            Track supported AI answer engines. Availability depends on product configuration.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. THE SEARCH SHIFT (CLEAN LIGHT THEME / ZERO SHADOW)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="aiv-shift-section">
        <div className="container">
          <div className="aiv-shift-header">
            <span className="aiv-tag-light">THE SEARCH SHIFT</span>
            <ScrollTypographyReveal
              text="Search has changed. Has your visibility?"
              tag="h2"
              className="aiv-shift-h2"
              theme="light"
              fromColor="#9CA3AF"
              toColor="#09090B"
              start="top 85%"
              end="bottom 50%"
            />
            <div className="aiv-shift-leads">
              <p className="aiv-lead-bold">
                Traditional search rankings tell you where your website appears. AI search tells a different story.
              </p>
              <p className="aiv-lead-desc">
                Customers are no longer searching only on Google. They are asking ChatGPT, Gemini, Perplexity and other AI engines what to buy, where to go and which brands to trust.
              </p>
            </div>
          </div>

          {/* Funnel Comparison (Traditional vs AI Search) */}
          <div className="aiv-funnel-grid">
            {/* Traditional */}
            <div className="aiv-funnel-card traditional">
              <div className="aiv-funnel-title-row">
                <span className="aiv-funnel-tag">TRADITIONAL SEARCH</span>
                <span className="aiv-funnel-sub">Linear Clickthrough</span>
              </div>
              <div className="aiv-funnel-steps">
                <div className="aiv-step-node">Google search</div>
                <div className="aiv-arrow-down">↓</div>
                <div className="aiv-step-node">10 Blue Links / Ranking</div>
                <div className="aiv-arrow-down">↓</div>
                <div className="aiv-step-node">Website Visit</div>
                <div className="aiv-arrow-down">↓</div>
                <div className="aiv-step-node final">Click & Browse</div>
              </div>
            </div>

            {/* AI Search */}
            <div className="aiv-funnel-card ai-search">
              <div className="aiv-funnel-title-row">
                <span className="aiv-funnel-tag-ai">AI SEARCH ENGINE</span>
                <span className="aiv-funnel-sub">Direct Synthesis</span>
              </div>
              <div className="aiv-funnel-steps">
                <div className="aiv-step-node">Conversational Question</div>
                <div className="aiv-arrow-down">↓</div>
                <div className="aiv-step-node">Synthesized AI Answer</div>
                <div className="aiv-arrow-down">↓</div>
                <div className="aiv-step-node highlight">Brand Recommendation</div>
                <div className="aiv-arrow-down">↓</div>
                <div className="aiv-step-node final-ai">Immediate Buying Decision</div>
              </div>
            </div>
          </div>

          <div className="aiv-callout-banner">
            <span className="aiv-callout-quote">"</span>
            <p>Your next customer may discover your competitor without ever visiting Google.</p>
          </div>
        </div>
      </section>



      {/* ══════════════════════════════════════════════════════════════════════
          6. COMPETITIVE INTELLIGENCE & CITATIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="aiv-competitive-section">
        <div className="container">
          <div className="aiv-comp-split">
            {/* Left: Copy */}
            <div className="aiv-comp-copy">
              <span className="aiv-tag-dark">COMPETITIVE INTELLIGENCE</span>
              <h2 className="aiv-comp-h2">Who is AI recommending instead of you?</h2>
              <p className="aiv-comp-lead">
                Your competitors may be winning AI recommendations even when you rank well in traditional search.
              </p>
              <p className="aiv-comp-desc">
                Identify who appears in AI answers, how often they appear and which sources are helping them get recommended.
              </p>

              <div className="aiv-comp-actions">
                <button 
                  type="button" 
                  className="aiv-btn-primary"
                  onClick={handleCheckVisibility}
                >
                  <span>DISCOVER YOUR AI COMPETITORS</span>
                  <DiagonalArrowIcon size={15} />
                </button>
              </div>
            </div>

            {/* Right: Comparative Benchmark Card */}
            <div className="aiv-comp-benchmark-card">
              <div className="aiv-bm-head">
                <span className="aiv-bm-title">COMPETITIVE VISIBILITY SHARE</span>
                <span className="aiv-bm-sub">Illustrative Data</span>
              </div>

              <div className="aiv-bm-bars">
                {[
                  { name: 'Your Brand', pct: 64, isYou: true },
                  { name: 'Competitor A', pct: 82, isComp: true },
                  { name: 'Competitor B', pct: 74, isComp: true },
                  { name: 'Competitor C', pct: 58, isComp: true }
                ].map((item, idx) => (
                  <div key={idx} className="aiv-bm-item">
                    <div className="aiv-bm-labels">
                      <strong className={item.isYou ? 'you-label' : ''}>{item.name}</strong>
                      <span>{item.pct}%</span>
                    </div>
                    <div className="aiv-bm-track">
                      <div 
                        className={`aiv-bm-fill ${item.isYou ? 'you' : item.pct >= 80 ? 'top' : ''}`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="aiv-bm-insight-banner">
                <strong>Competitive Insight:</strong>
                <p>Competitor A appears 28% more frequently than your brand across tracked commercial queries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. CITATION INTELLIGENCE (INSPECT SOURCES)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="aiv-citations-section">
        <div className="container">
          <div className="aiv-citations-grid">
            {/* Visual: Citation Graph */}
            <div className="aiv-citation-mock">
              <div className="aiv-quote-bubble">
                <span className="aiv-bubble-label">AI-GENERATED ANSWER</span>
                <p className="aiv-bubble-text">
                  “Your Brand is a strong option for customers looking for quality, choice and reliable service.”
                  <span className="aiv-cite-sup">[1] [2] [3]</span>
                </p>
              </div>

              <div className="aiv-sources-list">
                {[
                  { num: '01', title: 'Your website', desc: 'Product & category pages', status: 'Primary Source' },
                  { num: '02', title: 'Industry publication', desc: 'Expert reviews & comparisons', status: 'Influencing' },
                  { num: '03', title: 'Independent reviews', desc: 'Customer perspectives & sentiment', status: 'Social Proof' }
                ].map((s) => (
                  <div key={s.num} className="aiv-source-item">
                    <span className="aiv-source-num">{s.num}</span>
                    <div className="aiv-source-info">
                      <strong>{s.title}</strong>
                      <span>{s.desc}</span>
                    </div>
                    <span className="aiv-source-tag">{s.status}</span>
                  </div>
                ))}
              </div>
              <p className="aiv-source-footnote">Illustrative sources, showing how AI verifies claims.</p>
            </div>

            {/* Copy */}
            <div className="aiv-citation-copy">
              <span className="aiv-tag-light">CITATION INTELLIGENCE</span>
              <ScrollTypographyReveal
                text="Know which sources influence AI answers."
                tag="h2"
                className="aiv-cite-h2"
                theme="light"
                fromColor="#9CA3AF"
                toColor="#09090B"
                start="top 85%"
                end="bottom 50%"
              />
              <p className="aiv-cite-lead">
                AI answers can draw on websites, publications and independent reviews. Citation intelligence helps you understand which sources support an answer — and where your brand’s story is being shaped.
              </p>

              <ul className="aiv-check-list">
                <li>
                  <span className="aiv-check-icon">✓</span>
                  <span>Understand the sources AI references for your category</span>
                </li>
                <li>
                  <span className="aiv-check-icon">✓</span>
                  <span>Find critical gaps in your brand's digital footprint</span>
                </li>
                <li>
                  <span className="aiv-check-icon">✓</span>
                  <span>Prioritize content that supports generative discovery (GEO)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          9. FAQ ACCORDION (7 QUESTIONS)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="aiv-faq-section">
        <div className="container">
          <div className="aiv-faq-header text-center">
            <span className="aiv-tag-light">A LITTLE MORE CLARITY</span>
            <ScrollTypographyReveal
              text="Good questions. Clear answers."
              tag="h2"
              className="aiv-faq-h2"
              theme="light"
              fromColor="#9CA3AF"
              toColor="#09090B"
              start="top 85%"
              end="bottom 50%"
            />
          </div>

          <div className="aiv-faq-list">
            {faqsData.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`aiv-faq-item ${isOpen ? 'open' : ''}`}>
                  <button 
                    type="button" 
                    className="aiv-faq-question-btn"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="aiv-faq-q-text">{faq.q}</span>
                    <span className="aiv-faq-icon">{isOpen ? '−' : '+'}</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        className="aiv-faq-answer-panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: springEase }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          12. FINAL CALL TO ACTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="aiv-cta-section">
        <div className="container">
          <div className="aiv-cta-box">
            <span className="aiv-cta-tag">YOUR NEXT COMPETITIVE ADVANTAGE</span>
            <ScrollTypographyReveal
              text="Know how AI sees your brand."
              tag="h2"
              className="aiv-cta-title"
              theme="dark"
              fromColor="#52525B"
              toColor="#FFFFFF"
              start="top 90%"
              end="bottom 60%"
            />
            <p className="aiv-cta-sub">
              Turn invisible opportunities into informed decisions. Request your personalized AI visibility assessment today.
            </p>

            <div className="aiv-cta-actions">
              <button 
                type="button" 
                className="aiv-btn-primary"
                onClick={handleCheckVisibility}
              >
                <span>CHECK YOUR AI VISIBILITY</span>
                <DiagonalArrowIcon size={15} />
              </button>

              <button 
                type="button" 
                className="aiv-btn-secondary"
                onClick={handleTalkExpert}
              >
                <span>TALK TO AN AI VISIBILITY EXPERT</span>
                <DiagonalArrowIcon size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

