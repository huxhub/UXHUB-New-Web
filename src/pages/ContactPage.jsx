import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrandCross, 
  VectorArrowRight, 
  CrossNavBanner,
  MailIcon,
  PhoneIcon,
  ClockIcon
} from '../components/SharedUI';

export default function ContactPage({ onNavigate }) {
  const [selectedServices, setSelectedServices] = useState(['Product Growth']);
  const [selectedTimeline, setSelectedTimeline] = useState('1–3 Months');
  const [selectedMarket, setSelectedMarket] = useState('India ↔ KSA');
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const toggleService = (svc) => {
    if (selectedServices.includes(svc)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== svc));
      }
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const studios = [
    {
      country: 'India',
      city: 'Bangalore & Mumbai',
      role: 'Global Engineering & Product Incubation',
      address: 'Indiranagar 100ft Road, Bengaluru, Karnataka 560038',
      email: 'india@uxhub.agency',
      phone: '+91 (080) 4123-8890',
      hours: 'Mon – Fri: 09:30 – 18:30 IST'
    },
    {
      country: 'Saudi Arabia',
      city: 'Riyadh',
      role: 'Commercial Advisory & GCC Expansion',
      address: 'King Fahd Road, Al Olaya District, Riyadh 12214',
      email: 'ksa@uxhub.agency',
      phone: '+966 (011) 489-2210',
      hours: 'Sun – Thu: 09:00 – 17:30 AST'
    },
    {
      country: 'United Arab Emirates',
      city: 'Dubai',
      role: 'Cross-Border Operations & Ventures',
      address: 'DIFC Gate Precinct 4, Dubai, UAE',
      email: 'dubai@uxhub.agency',
      phone: '+971 (04) 388-7712',
      hours: 'Mon – Fri: 09:00 – 18:00 GST'
    }
  ];

  const faqs = [
    {
      q: 'How fast can our project begin?',
      a: 'We typically initiate engagements within 7 to 10 business days following proposal sign-off and discovery kick-off. Fixed sprints can mobilize even faster for critical initiatives.'
    },
    {
      q: 'Do we own 100% of the code, IP, and designs?',
      a: 'Yes. All source code, Figma design files, architectural documentation, and database schemas are transferred to you with zero vendor lock-in and complete intellectual property ownership.'
    },
    {
      q: 'How do you handle cross-border contracts and billing?',
      a: 'We operate registered legal and commercial entities in India, Saudi Arabia, and the UAE, allowing seamless local invoicing in INR, SAR, or AED with full regulatory and tax compliance (ZATCA, GST, VAT).'
    },
    {
      q: 'Can we engage for a short fixed-scope sprint instead of a retainer?',
      a: 'Absolutely. Our 8-Week Fixed Sprint is specifically designed for 0→1 MVP builds, critical conversion audits, or isolated feature developments with guaranteed delivery dates and fixed budgets.'
    },
    {
      q: 'What is your security and NDA protocol?',
      a: 'We execute bilateral Non-Disclosure Agreements (NDAs) prior to detailed discovery. All client codebases and data pipelines strictly comply with SOC-2 Type II, ISO-27001, and local data sovereignty laws.'
    }
  ];

  return (
    <div className="inner-page contact-page">
      {/* ─── Hero Banner (Dark) ───────────────────────────────────────────── */}
      <section className="inner-hero-section dark-inner-section">
        <div className="container">
          <div className="inner-hero-header observe-reveal">
            <span className="inner-eyebrow text-accent">
              <BrandCross size={18} color="#FF7723" strokeWidth={3} className="inline-cross" />
              START A CONVERSATION
            </span>
            <h1 className="inner-hero-title text-white">
              Ready to build what's next? Let's discuss your growth ambitions.
            </h1>
            <p className="inner-hero-desc text-muted">
              Connect directly with our senior partners across India, Saudi Arabia, and the UAE. We respond to all qualified enterprise and venture inquiries within 24 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Inquiry Builder & Studios Bento ───────────────────────────────── */}
      <section className="inner-section contact-main-section">
        <div className="container">
          <div className="contact-bento-grid">
            {/* Form Column */}
            <div className="contact-form-panel">
              {submitted ? (
                <div className="contact-success-state text-center">
                  <div className="success-icon-wrap">
                    <BrandCross size={54} color="#000000" strokeWidth={3} />
                  </div>
                  <h3 className="success-heading">Message received.</h3>
                  <p className="success-text">
                    Thank you, <strong>{formData.name || 'there'}</strong>. Our senior partners have received your project details and will reply directly to <strong>{formData.email}</strong> within 24 business hours.
                  </p>
                  <button 
                    className="cta-primary-pill"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="project-inquiry-form">
                  <div className="form-section-title">
                    <span className="step-badge">1</span>
                    <span>What capabilities are you looking for?</span>
                  </div>
                  <div className="pill-selector-wrap">
                    {[
                      'Product Growth (0→1)',
                      'E-commerce & D2C',
                      'Custom Software',
                      'Price Intelligence',
                      'Executive Advisory'
                    ].map(svc => (
                      <button
                        type="button"
                        key={svc}
                        className={`choice-pill ${selectedServices.includes(svc) ? 'selected' : ''}`}
                        onClick={() => toggleService(svc)}
                      >
                        {selectedServices.includes(svc) ? '✓ ' : '+ '}{svc}
                      </button>
                    ))}
                  </div>

                  <div className="form-section-title mt-4">
                    <span className="step-badge">2</span>
                    <span>Target Market & Timeline</span>
                  </div>
                  <div className="dual-selector-row">
                    <div className="mini-selector-group">
                      <label className="sub-field-label">Target Market</label>
                      <div className="pill-selector-wrap">
                        {['India', 'Saudi Arabia (KSA)', 'India ↔ KSA', 'UAE / GCC'].map(market => (
                          <button
                            type="button"
                            key={market}
                            className={`choice-pill-small ${selectedMarket === market ? 'selected' : ''}`}
                            onClick={() => setSelectedMarket(market)}
                          >
                            {market}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mini-selector-group">
                      <label className="sub-field-label">Expected Timeline</label>
                      <div className="pill-selector-wrap">
                        {['< 1 Month', '1–3 Months', '3–6 Months', 'Ongoing'].map(tl => (
                          <button
                            type="button"
                            key={tl}
                            className={`choice-pill-small ${selectedTimeline === tl ? 'selected' : ''}`}
                            onClick={() => setSelectedTimeline(tl)}
                          >
                            {tl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-section-title mt-4">
                    <span className="step-badge">3</span>
                    <span>Contact Details</span>
                  </div>
                  <div className="form-inputs-grid">
                    <div className="input-field-group">
                      <label>Your Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Jane Doe" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="input-field-group">
                      <label>Work Email *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="jane@company.com" 
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="input-field-group">
                      <label>Phone / WhatsApp</label>
                      <input 
                        type="tel" 
                        placeholder="+966 / +91 ..." 
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="input-field-group">
                      <label>Company / Organization</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Acme Retail Ltd" 
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="input-field-group mt-3">
                    <label>Tell us about your digital goals & challenges</label>
                    <textarea 
                      rows={4}
                      placeholder="Share details regarding your current technology stack, target audience, or desired launch date..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="submit-inquiry-btn">
                    <span>Submit Project Inquiry</span>
                    <VectorArrowRight width={18} height={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Studios & Info Column */}
            <div className="studios-info-panel">
              <div className="guarantee-card">
                <span className="guarantee-badge">EXECUTIVE RESPONSE GUARANTEE</span>
                <h4>Direct Partner Access</h4>
                <p>Every inquiry is personally reviewed by a principal partner in Bangalore, Riyadh, or Dubai. No junior SDR gatekeepers.</p>
              </div>

              <div className="studios-list">
                {studios.map((studio, idx) => (
                  <div key={idx} className="studio-location-card">
                    <div className="studio-flag-row">
                      <span className="studio-city">{studio.city}</span>
                      <span className="studio-country-pill">{studio.country}</span>
                    </div>
                    <p className="studio-role">{studio.role}</p>
                    <p className="studio-address">{studio.address}</p>
                    <div className="studio-contact-links">
                      <a href={`mailto:${studio.email}`} className="studio-link">
                        <MailIcon size={14} color="currentColor" />
                        <span>{studio.email}</span>
                      </a>
                      <a href={`tel:${studio.phone.replace(/[^0-9+]/g, '')}`} className="studio-link">
                        <PhoneIcon size={14} color="currentColor" />
                        <span>{studio.phone}</span>
                      </a>
                    </div>
                    <span className="studio-hours">
                      <ClockIcon size={14} color="currentColor" />
                      <span>{studio.hours}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Frequently Asked Questions Accordion ─────────────────────────── */}
      <section className="inner-section faq-section">
        <div className="container">
          <div className="section-intro-center text-center">
            <span className="inner-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="light-section-title">Common questions about working with UXHub</h2>
          </div>

          <div className="faq-accordion-wrap">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-accordion-item ${activeFaq === idx ? 'expanded' : ''}`}
                onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
              >
                <div className="faq-question-header">
                  <h3 className="faq-question-title">{faq.q}</h3>
                  <span className="faq-toggle-icon">{activeFaq === idx ? '−' : '+'}</span>
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Cross Navigation Banner (Connecting to Other Divisions) ─────── */}
      <CrossNavBanner current="contact" onNavigate={onNavigate} theme="dark" />
    </div>
  );
}

