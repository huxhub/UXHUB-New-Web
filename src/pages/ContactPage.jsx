import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrandCross, 
  DiagonalArrowIcon,
  MailIcon,
  PhoneIcon
} from '../components/SharedUI';
import Effects from '../components/Effects';
import ScrollTypographyReveal from '../components/ScrollTypographyReveal';

const springEase = [0.16, 1, 0.3, 1];

export default function ContactPage({ onNavigate }) {
  const [selectedServices, setSelectedServices] = useState(['Product Growth']);
  const [selectedMarket, setSelectedMarket] = useState('India ↔ KSA');
  const [submitted, setSubmitted] = useState(false);

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
      city: 'Bangalore & Kerala',
      role: 'Global Engineering & Product Incubation HQ',
      address: 'ADM 07, Administrative Building, KINFRA Defence Park, Palakkad 679 301',
      email: 'hello@uxhub.in',
      phone: '+91 9745580881'
    },
    {
      country: 'Saudi Arabia',
      city: 'Riyadh',
      role: 'Commercial Advisory & GCC Expansion Hub',
      address: 'King Fahd Road, Al Olaya District, Riyadh 12214',
      email: 'ksa@uxhub.in',
      phone: '+966 (011) 489-2210'
    },
    {
      country: 'United Arab Emirates',
      city: 'Dubai',
      role: 'Cross-Border Operations & Venture Scale',
      address: 'DIFC Gate Precinct 4, Dubai, UAE',
      email: 'dubai@uxhub.in',
      phone: '+971 (04) 388-7712'
    }
  ];

  return (
    <div className="inner-page contact-page contact-page--premium">
      {/* ─── 1. HERO SECTION (SOLID BLACK, 100VH FULL SCREEN WITH SWIRL) ─ */}
      <section className="contact-hero-black">
        <div className="contact-hero-swirl-layer" aria-hidden="true">
          <Effects kind="swirl" className="metallic-swirl-canvas" />
        </div>
        <div className="container contact-hero-container">
          <motion.div 
            className="contact-hero-black-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: springEase }}
          >
            <div className="contact-hero-kicker">
              <BrandCross size={16} color="#FF7723" strokeWidth={3} className="hero-kicker-cross" />
              <span>START A CONVERSATION</span>
            </div>
            <h1 className="contact-hero-black-title">
              {"Let's build what's next.".split(' ').map((word, wIdx, arr) => (
                <span key={wIdx} className="hero-word">
                  <span className="hero-char">{word}</span>
                  {wIdx < arr.length - 1 ? <span className="hero-char-space">&nbsp;</span> : null}
                </span>
              ))}
            </h1>
            <p className="contact-hero-black-sub">
              {"Direct principal partner consultation for ambitious brands across India, Saudi Arabia and the UAE.".split(' ').map((word, wIdx, arr) => (
                <span key={wIdx} className="hero-word">
                  <span className="hero-char">{word}</span>
                  {wIdx < arr.length - 1 ? <span className="hero-char-space">&nbsp;</span> : null}
                </span>
              ))}
            </p>

            <div className="contact-hero-meta-bar">
              <a href="mailto:hello@uxhub.in" className="hero-meta-chip">
                <MailIcon size={14} color="#FF7723" />
                <span>hello@uxhub.in</span>
              </a>
              <a href="tel:+919745580881" className="hero-meta-chip">
                <PhoneIcon size={14} color="#FF7723" />
                <span>+91 9745580881</span>
              </a>
              <span className="hero-meta-chip hero-meta-chip--pill">
                24h Response SLA
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. MINIMALIST INQUIRY & STUDIOS SECTION (PURE WHITE) ───────── */}
      <section className="contact-workspace-section">
        <div className="container">
          <div className="contact-workspace-grid">
            
            {/* Left Column: Direct Consultation & Studios Directory */}
            <motion.div 
              className="contact-studios-column"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: springEase }}
            >
              <div className="studios-directory-header">
                <ScrollTypographyReveal
                  text="REGIONAL PRESENCE & ADVISORY"
                  tag="span"
                  className="directory-eyebrow"
                  theme="light"
                  fromColor="#9CA3AF"
                  toColor="#71717A"
                  fromOpacity={0.4}
                  toOpacity={1}
                  stagger={0.04}
                  start="top 85%"
                  end="bottom 60%"
                  scrub={0.8}
                />
                <ScrollTypographyReveal
                  text="Direct principal access."
                  tag="h2"
                  className="directory-title"
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
                  text="Every inquiry is personally reviewed by a founding principal in Bangalore, Riyadh, or Dubai. No junior account gatekeepers."
                  tag="p"
                  className="directory-desc"
                  theme="light"
                  fromColor="#D1D5DB"
                  toColor="#52525B"
                  fromOpacity={0.35}
                  toOpacity={1}
                  stagger={0.025}
                  start="top 80%"
                  end="bottom 45%"
                  scrub={0.8}
                />
              </div>

              {/* Studios List */}
              <div className="minimal-studios-list">
                {studios.map((studio, idx) => (
                  <div key={idx} className="minimal-studio-card">
                    <div className="minimal-studio-top">
                      <h3 className="minimal-studio-city">{studio.city}</h3>
                      <span className="minimal-studio-country">{studio.country}</span>
                    </div>
                    <p className="minimal-studio-role">{studio.role}</p>
                    <p className="minimal-studio-address">{studio.address}</p>
                    <div className="minimal-studio-links">
                      <a href={`mailto:${studio.email}`} className="studio-contact-link">
                        <MailIcon size={13} color="currentColor" />
                        <span>{studio.email}</span>
                      </a>
                      <a href={`tel:${studio.phone.replace(/[^0-9+]/g, '')}`} className="studio-contact-link">
                        <PhoneIcon size={13} color="currentColor" />
                        <span>{studio.phone}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Premium Minimalist Form */}
            <motion.div 
              className="contact-form-column"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
            >
              <div className="minimal-form-box">
                {submitted ? (
                  <div className="form-success-box text-center">
                    <div className="success-brand-mark">
                      <BrandCross size={48} color="#FF7723" strokeWidth={2.5} />
                    </div>
                    <h3 className="success-title">Message Received.</h3>
                    <p className="success-copy">
                      Thank you, <strong>{formData.name || 'there'}</strong>. Our principals have received your project details and will follow up directly at <strong>{formData.email}</strong> within 24 business hours.
                    </p>
                    <button 
                      type="button"
                      className="success-reset-btn"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
                      }}
                    >
                      <span>Send Another Inquiry</span>
                      <DiagonalArrowIcon size={14} color="currentColor" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="minimal-inquiry-form">
                    
                    {/* Capability Selector */}
                    <div className="form-group-block">
                      <label className="minimal-field-label">
                        Capabilities of interest
                      </label>
                      <div className="minimal-chips-grid">
                        {[
                          'Product Growth (0→1)',
                          'E-commerce & D2C Scale',
                          'Digital Experience Platform',
                          'Pricing Intelligence Software'
                        ].map(svc => {
                          const isSelected = selectedServices.includes(svc);
                          return (
                            <button
                              type="button"
                              key={svc}
                              className={`minimal-chip ${isSelected ? 'is-selected' : ''}`}
                              onClick={() => toggleService(svc)}
                            >
                              <span>{svc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Target Market Selector */}
                    <div className="form-group-block">
                      <label className="minimal-field-label">
                        Primary Target Market
                      </label>
                      <div className="minimal-chips-grid minimal-chips-grid--market">
                        {[
                          'India',
                          'Saudi Arabia (KSA)',
                          'India ↔ KSA',
                          'UAE & GCC'
                        ].map(market => {
                          const isSelected = selectedMarket === market;
                          return (
                            <button
                              type="button"
                              key={market}
                              className={`minimal-chip ${isSelected ? 'is-selected' : ''}`}
                              onClick={() => setSelectedMarket(market)}
                            >
                              <span>{market}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Form Inputs Grid */}
                    <div className="minimal-fields-grid">
                      <div className="minimal-input-wrap">
                        <label className="minimal-field-label">Your Name *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Rahul Sharma" 
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="minimal-input-wrap">
                        <label className="minimal-field-label">Work Email *</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="rahul@brand.com" 
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="minimal-input-wrap">
                        <label className="minimal-field-label">Phone / WhatsApp</label>
                        <input 
                          type="tel" 
                          placeholder="+91 / +966 / +971 ..." 
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className="minimal-input-wrap">
                        <label className="minimal-field-label">Company / Brand</label>
                        <input 
                          type="text" 
                          placeholder="Acme Retail & Tech Ltd" 
                          value={formData.company}
                          onChange={e => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="minimal-input-wrap mt-field">
                      <label className="minimal-field-label">Project Scope & Objectives</label>
                      <textarea 
                        rows={4}
                        placeholder="Share your timeline, current software architecture, or growth milestones..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    {/* Submit Action */}
                    <button type="submit" className="minimal-submit-btn">
                      <span>Submit Project Inquiry</span>
                      <span className="submit-arrow-circle">
                        <DiagonalArrowIcon size={15} color="currentColor" />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
