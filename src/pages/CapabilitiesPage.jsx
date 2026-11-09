import React, { useEffect } from 'react';
import {
  BrandCross,
  VectorArrowRight,
  ArchIcon,
  WedgeIcon,
  HourglassIcon,
  PillarShapeIcon,
  CrossNavBanner,
  Arrow6Icon
} from '../components/SharedUI';

const disciplines = [
  {
    num: '01',
    title: 'Digital experiences',
    desc: 'Fast, thoughtful web and mobile products built around the people who use them.',
    icon: ArchIcon,
    detail: 'Product design · Frontend · Performance'
  },
  {
    num: '02',
    title: 'Platforms & cloud',
    desc: 'Reliable services and infrastructure that stay resilient as your business grows.',
    icon: WedgeIcon,
    detail: 'Architecture · APIs · Cloud engineering'
  },
  {
    num: '03',
    title: 'Commerce systems',
    desc: 'Connected storefronts and checkout journeys designed to make buying feel effortless.',
    icon: HourglassIcon,
    detail: 'Commerce · Payments · Marketplaces'
  },
  {
    num: '04',
    title: 'Data & intelligence',
    desc: 'Clearer signals from your data, with automation that helps teams move with confidence.',
    icon: PillarShapeIcon,
    detail: 'Analytics · Data platforms · AI'
  }
];

const standards = ['Secure by design', 'Built to perform', 'Ready to scale'];

export default function CapabilitiesPage({ onOpenContact, onNavigate }) {
  const openContact = () => (onOpenContact ? onOpenContact() : onNavigate?.('contact'));

  useEffect(() => {
    const page = document.querySelector('.capabilities-page');
    if (!page) return;

    const targets = page.querySelectorAll('.cap-reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="inner-page capabilities-page minimal-capabilities-page">
      <section className="cap-hero">
        <div className="container">
          <div className="cap-hero-copy cap-reveal">
            <span className="cap-eyebrow">
              <BrandCross size={14} color="#FF7723" strokeWidth={3} />
              WHAT WE DO
            </span>
            <h1>Technology, made<br />to move you forward.</h1>
            <p>We design and engineer digital foundations for ambitious businesses — from the first idea to what comes next.</p>
            <button className="cap-link" onClick={openContact}>
              <span>Talk to our team</span><VectorArrowRight width={13} height={11} color="currentColor" />
            </button>
            <a className="cap-explore-link" href="#disciplines">Explore capabilities <span aria-hidden="true">↓</span></a>
          </div>
          <div className="cap-hero-index cap-reveal" aria-hidden="true">
            <span>INDEPENDENT DIGITAL PARTNER</span>
            <span>INDIA · GCC</span>
          </div>
        </div>
      </section>

      <section id="disciplines" className="cap-disciplines">
        <div className="container">
          <div className="cap-section-heading cap-reveal">
            <span className="cap-kicker">OUR CAPABILITIES</span>
            <h2>One partner, across the journey.</h2>
          </div>
          <div className="cap-grid">
            {disciplines.map(({ num, title, desc, icon: Icon }) => (
              <article 
                className="cap-card cap-reveal" 
                key={num} 
                style={{ '--cap-delay': `${(Number(num) - 1) * 90}ms` }}
                onClick={openContact}
              >
                <div className="cap-card-top">
                  <div className="cap-card-icon-box">
                    <Icon size={46} color="currentColor" />
                  </div>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="cap-card-arrow">
                  <VectorArrowRight width={18} height={16} color="currentColor" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cap-standards">
        <div className="container cap-standards-inner">
          <div className="cap-reveal">
            <span className="cap-kicker">THE WAY WE BUILD</span>
            <h2>Good engineering<br />should feel invisible.</h2>
          </div>
          <ul className="cap-reveal">
            {standards.map((item, index) => (
              <li key={item}><span>0{index + 1}</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cap-cta">
        <div className="container cap-cta-inner">
          <div className="cap-reveal">
            <span className="cap-kicker">HAVE A CHALLENGE IN MIND?</span>
            <h2>Let’s make what’s next.</h2>
          </div>
          <button className="cap-cta-button cap-reveal" onClick={openContact}>
            Start a conversation<Arrow6Icon width={22} height={11} color="currentColor" />
          </button>
        </div>
      </section>
      <CrossNavBanner current="capabilities" onNavigate={onNavigate} />
    </div>
  );
}
