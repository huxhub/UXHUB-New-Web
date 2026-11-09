import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './App.css';

import { 
  UXHubLogo, 
  BrandCross, 
  ContactModal 
} from './components/SharedUI';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import StoriesPage from './pages/StoriesPage';
import ContactPage from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

// ─── Global Nav Destinations ────────────────────────────────────────────────
export const NAV_LINKS = [
  { id: 'home', label: 'Home', path: '#/' },
  { id: 'services', label: 'Services', path: '#/services' },
  { id: 'stories', label: 'Featured Stories', path: '#/stories' },
  { id: 'contact', label: 'Contact', path: '#/contact' }
];

export const resolvePageFromHash = (hash) => {
  const clean = (hash || '').replace(/^#\/?/, '').toLowerCase().trim();
  if (['services', 'stories', 'contact'].includes(clean)) {
    return clean;
  }
  if (clean === 'capabilities') {
    return 'services';
  }
  if (clean === 'featured-stories' || clean === 'featuredstories') {
    return 'stories';
  }
  return 'home';
};

// ─── Menu Drawer ────────────────────────────────────────────────────────────
function MenuDrawer({ isOpen, onClose, onNavigate, currentPage }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="menu-layer" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div 
            className="menu-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.45 }}
          >
            <button className="menu-close" onClick={onClose} aria-label="Close navigation menu">
              Close
            </button>
            <nav>
              <ul className="menu-primary">
                {NAV_LINKS.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={item.path}
                      className={currentPage === item.id ? 'active-menu-link' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.id);
                        onClose();
                      }}
                    >
                      <span>{item.label}</span>
                      {currentPage === item.id && <span className="menu-active-pill">Current</span>}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="menu-secondary">
                <span className="menu-sec-label">DIGITAL BUSINESS GROWTH CONSULTANCY</span>
                <p className="menu-sec-meta">India ↔ KSA · Strategy, technology and growth connected.</p>
                <div className="menu-quick-contact">
                  <a href="#/contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); onClose(); }} className="menu-contact-pill">
                    Book Consultation →
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Application Component ─────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // Router state synchronized with hash: home, services, capabilities, stories, contact
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      return resolvePageFromHash(window.location.hash);
    }
    return 'home';
  });

  const navigate = (pageId) => {
    setCurrentPage(pageId);
    if (typeof window !== 'undefined') {
      window.location.hash = pageId === 'home' ? '' : `#/${pageId}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const resolved = resolvePageFromHash(window.location.hash);
      setCurrentPage(resolved);
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize Lenis smooth scroll once on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false,
    });

    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Per-page change updates: anchor clicks, scroll reveal observer & ScrollTrigger sync
  useEffect(() => {
    // Scroll to top immediately on page change
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Global interception for smooth gliding or cross-page anchor routing
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href === '#/') return;

      if (href.startsWith('#/')) {
        const dest = resolvePageFromHash(href);
        e.preventDefault();
        navigate(dest);
        return;
      }

      // Local hash like #services, #stories, #contact
      const clean = href.replace(/^#/, '').toLowerCase();
      if (['services', 'stories', 'contact', 'home'].includes(clean)) {
        e.preventDefault();
        navigate(clean);
        return;
      }
      if (clean === 'capabilities') {
        e.preventDefault();
        navigate('services');
        return;
      }

      // Intra-page section anchors like #partners, #philosophy, #hero
      if (currentPage !== 'home') {
        e.preventDefault();
        navigate('home');
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target && window.__lenis) {
            window.__lenis.scrollTo(target, { offset: 0, duration: 1.25 });
          }
        }, 150);
        return;
      }

      const target = document.querySelector(href);
      if (target && window.__lenis) {
        e.preventDefault();
        window.__lenis.scrollTo(target, { offset: 0, duration: 1.25 });
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    const revealElements = document.querySelectorAll('.observe-reveal');
    revealElements.forEach((el) => observer.observe(el));

    // Refresh ScrollTrigger to synchronize triggers with page layout & Lenis
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 80);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.removeEventListener('click', handleAnchorClick);
      observer.disconnect();
    };
  }, [currentPage]);

  // Lock background scroll when drawer or contact modal is active
  useEffect(() => {
    if (window.__lenis) {
      if (menuOpen || contactOpen) {
        window.__lenis.stop();
      } else {
        window.__lenis.start();
      }
    }
  }, [menuOpen, contactOpen]);

  return (
    <div className={`app-root page-${currentPage}`}>
      {/* ─── Overlays ──────────────────────────────────────────────────────── */}
      <MenuDrawer 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        onNavigate={navigate} 
        currentPage={currentPage}
      />

      <ContactModal 
        isOpen={contactOpen} 
        onClose={() => setContactOpen(false)} 
      />

      {/* ─── Global Header ─────────────────────────────────────────────────── */}
      <header className={`site-header ${currentPage !== 'home' ? 'site-header--inner' : ''}`}>
        <div className="header-inner">
          <UXHubLogo onClick={() => navigate('home')} />

          <button 
            className="menu-button" 
            onClick={() => setMenuOpen(true)}
            aria-label="Toggle navigation menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* ─── Active Page Content ───────────────────────────────────────────── */}
      <main className="main-content-flow">
        {currentPage === 'home' && (
          <HomePage 
            onOpenContact={() => setContactOpen(true)} 
            onNavigate={navigate} 
          />
        )}
        {currentPage === 'services' && (
          <ServicesPage 
            onOpenContact={() => setContactOpen(true)} 
            onNavigate={navigate} 
          />
        )}
        {currentPage === 'stories' && (
          <StoriesPage 
            onOpenContact={() => setContactOpen(true)} 
            onNavigate={navigate} 
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage 
            onNavigate={navigate} 
          />
        )}
      </main>

      {/* ─── Global Footer (Plain Solid Black) ─────────────────────────────── */}
      <footer id="footer" className="footer">
        <div className="container">
          <div className="footer-brand-wrap">
            <BrandCross size={46} color="#ffffff" strokeWidth={2.5} className="footer-cross" />
            <p className="footer-studio-name">Digital Business Growth Consultancy</p>
            <p className="footer-regions">India - KSA - UAE</p>
          </div>

          <nav className="footer-nav-wrap" aria-label="Footer Navigation">
            <ul className="footer-nav">
              <li>
                <a 
                  href="#/" 
                  className={`footer-nav-item-btn ${currentPage === 'home' ? 'active-footer-link' : ''}`} 
                  onClick={(e) => { e.preventDefault(); navigate('home'); }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#/services" 
                  className={`footer-nav-item-btn ${currentPage === 'services' ? 'active-footer-link' : ''}`} 
                  onClick={(e) => { e.preventDefault(); navigate('services'); }}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#/stories" 
                  className={`footer-nav-item-btn ${currentPage === 'stories' ? 'active-footer-link' : ''}`} 
                  onClick={(e) => { e.preventDefault(); navigate('stories'); }}
                >
                  Featured Stories
                </a>
              </li>
              <li>
                <a 
                  href="#/contact" 
                  className={`footer-nav-item-btn footer-nav-item-btn--contact ${currentPage === 'contact' ? 'active-footer-link' : ''}`} 
                  onClick={(e) => { e.preventDefault(); navigate('contact'); }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="footer-contact-details">
            <p className="footer-address">
              UXHUB, ADM 07, First Floor, Administrative building KINFRA Defence Park, Palakkad, Ottapalam 679 301
            </p>
            <p className="footer-meta-links">
              <a href="mailto:hello@uxhub.in" className="footer-contact-link">hello@uxhub.in</a>
              <span className="footer-meta-divider">&nbsp;&nbsp;&nbsp;</span>
              <a href="tel:+919745580881" className="footer-contact-link">+91 9745580881</a>
            </p>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2026 uxhubglobal.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
