import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './App.css';

import { 
  UXHubLogo, 
  BrandCross, 
  ContactModal,
  DiagonalArrowIcon 
} from './components/SharedUI';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PriceIntelligencePage from './pages/PriceIntelligencePage';
import AiVisibilityPage from './pages/AiVisibilityPage';
import AboutPage from './pages/AboutPage';
import StoriesPage from './pages/StoriesPage';
import ContactPage from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

// ─── Global Nav Destinations with Dropdown ──────────────────────────────────
export const NAV_LINKS = [
  { id: 'home', label: 'Home', path: '#/' },
  { id: 'services', label: 'Services', path: '#/services' },
  { 
    id: 'product', 
    label: 'Products', 
    path: '#/price-intelligence',
    hasDropdown: true,
    children: [
      { 
        id: 'price-intelligence', 
        label: 'Price Intelligence', 
        tagline: 'Real-Time Competitor Price Tracking & Dynamic Repricing',
        path: '#/price-intelligence' 
      },
      { 
        id: 'ai-visibility', 
        label: 'AI Visibility Intelligence', 
        tagline: 'Track & Improve Visibility in ChatGPT, Gemini & Perplexity',
        path: '#/ai-visibility' 
      }
    ]
  },
  { id: 'about', label: 'About', path: '#/about' },
  { id: 'contact', label: 'Contact', path: '#/contact' }
];

export const resolvePageFromHash = (hash) => {
  const clean = (hash || '').replace(/^#\/?/, '').toLowerCase().trim();
  if (clean === 'ai-visibility' || clean === 'aivisibility' || clean === 'ai-visibility.html') {
    return 'ai-visibility';
  }
  if (['price-intelligence', 'pricing-intelligence', 'pricing_intelligence', 'pricing', 'product'].includes(clean)) {
    return 'price-intelligence';
  }
  if (['services', 'about', 'contact', 'stories'].includes(clean)) {
    return clean;
  }
  if (clean === 'about-us' || clean === 'aboutus') {
    return 'about';
  }
  if (clean === 'capabilities') {
    return 'services';
  }
  return 'home';
};

// ─── Menu Drawer with Dropdown Accordion ────────────────────────────────────
function MenuDrawer({ isOpen, onClose, onNavigate, currentPage }) {
  const [productExpanded, setProductExpanded] = useState(true);

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
                {NAV_LINKS.map((item) => {
                  if (item.hasDropdown) {
                    const isAnyChildActive = item.children.some(c => c.id === currentPage) || currentPage === 'product';
                    return (
                      <li key={item.id} className="menu-item-with-dropdown">
                        <div className="menu-dropdown-trigger-row">
                          <a 
                            href={item.path}
                            className={isAnyChildActive ? 'active-menu-link' : ''}
                            onClick={(e) => {
                              e.preventDefault();
                              setProductExpanded(!productExpanded);
                            }}
                          >
                            <span>{item.label}</span>
                          </a>
                          <button 
                            type="button" 
                            className={`menu-dropdown-toggle ${productExpanded ? 'open' : ''}`}
                            onClick={() => setProductExpanded(!productExpanded)}
                            aria-label="Toggle products menu"
                          >
                            ▾
                          </button>
                        </div>

                        {/* Dropdown Items List - Only item names */}
                        <AnimatePresence initial={false}>
                          {productExpanded && (
                            <motion.ul 
                              className="menu-submenu"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            >
                              {item.children.map((child) => (
                                <li key={child.id} className="menu-submenu-item">
                                  <a 
                                    href={child.path}
                                    className={currentPage === child.id ? 'active-sub-link' : ''}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      onNavigate(child.id);
                                      onClose();
                                    }}
                                  >
                                    <span>{child.label}</span>
                                  </a>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  return (
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
                      </a>
                    </li>
                  );
                })}
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
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Sticky scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.__lenis ? window.__lenis.scroll : window.scrollY;
      setIsScrolled(scrollPos > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Initialize Lenis smooth scroll
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

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      setIsScrolled(e.scroll > 15);
    });

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

  // Per-page change updates & anchor interception
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });

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

      const clean = href.replace(/^#/, '').toLowerCase();
      if (clean === 'ai-visibility' || clean === 'aivisibility' || clean === 'ai-visibility.html') {
        e.preventDefault();
        navigate('ai-visibility');
        return;
      }
      if (['price-intelligence', 'pricing-intelligence', 'pricing', 'product'].includes(clean)) {
        e.preventDefault();
        navigate('price-intelligence');
        return;
      }
      if (['services', 'about', 'contact', 'home'].includes(clean)) {
        e.preventDefault();
        navigate(clean);
        return;
      }
      if (clean === 'about-us' || clean === 'aboutus') {
        e.preventDefault();
        navigate('about');
        return;
      }
      if (clean === 'capabilities') {
        e.preventDefault();
        navigate('services');
        return;
      }

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

  const isDarkThemePage = ['price-intelligence', 'ai-visibility', 'product', 'services', 'stories', 'contact'].includes(currentPage);

  return (
    <div className={`app-root page-${currentPage} ${isScrolled ? 'has-scrolled' : ''}`}>
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

      {/* ─── Sticky Global Header Bar (Logo & Menu Trigger Only) ─────────────── */}
      <header 
        className={`site-header ${isScrolled ? 'site-header--scrolled' : ''} ${isDarkThemePage ? 'site-header--dark' : ''}`}
      >
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

      {/* ─── Active Page Content Flow ──────────────────────────────────────── */}
      <main className="main-content-flow">
        {currentPage === 'home' && (
          <HomePage 
            onOpenContact={() => navigate('contact')} 
            onNavigate={navigate} 
          />
        )}
        {currentPage === 'services' && (
          <ServicesPage 
            onOpenContact={() => navigate('contact')} 
            onNavigate={navigate} 
          />
        )}
        {(currentPage === 'price-intelligence' || currentPage === 'product') && (
          <PriceIntelligencePage 
            onOpenContact={() => navigate('contact')} 
            onNavigate={navigate} 
          />
        )}
        {currentPage === 'ai-visibility' && (
          <AiVisibilityPage 
            onOpenContact={() => navigate('contact')} 
            onNavigate={navigate} 
          />
        )}
        {currentPage === 'about' && (
          <AboutPage 
            onOpenContact={() => navigate('contact')} 
            onNavigate={navigate} 
          />
        )}
        {currentPage === 'stories' && (
          <StoriesPage 
            onOpenContact={() => navigate('contact')} 
            onNavigate={navigate} 
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage 
            onNavigate={navigate} 
          />
        )}
      </main>

      {/* ─── Global Footer ─────────────────────────────────────────────────── */}
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
                  href="#/price-intelligence" 
                  className={`footer-nav-item-btn ${currentPage === 'price-intelligence' || currentPage === 'product' ? 'active-footer-link' : ''}`} 
                  onClick={(e) => { e.preventDefault(); navigate('price-intelligence'); }}
                >
                  Price Intelligence
                </a>
              </li>
              <li>
                <a 
                  href="#/ai-visibility" 
                  className={`footer-nav-item-btn ${currentPage === 'ai-visibility' ? 'active-footer-link' : ''}`} 
                  onClick={(e) => { e.preventDefault(); navigate('ai-visibility'); }}
                >
                  AI Visibility
                </a>
              </li>
              <li>
                <a 
                  href="#/about" 
                  className={`footer-nav-item-btn ${currentPage === 'about' ? 'active-footer-link' : ''}`} 
                  onClick={(e) => { e.preventDefault(); navigate('about'); }}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#/contact" 
                  className={`footer-nav-item-btn ${currentPage === 'contact' ? 'active-footer-link' : ''}`} 
                  onClick={(e) => { e.preventDefault(); navigate('contact'); }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="footer-bottom-grid">
            <div className="footer-col footer-col-office">
              <span className="footer-col-title">OFFICES</span>
              <p className="footer-address">
                Bangalore, India<br />
                Riyadh, Saudi Arabia
              </p>
            </div>
            <div className="footer-col footer-col-legal">
              <span className="footer-col-title">UX HUB GLOBAL</span>
              <p className="footer-copyright">
                © {new Date().getFullYear()} UX HUB. ALL RIGHTS RESERVED.
              </p>
            </div>
            <div className="footer-col footer-col-action">
              <a 
                href="#/contact"
                className="footer-consult-btn"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('contact');
                }}
              >
                <span>Book Consultation</span>
                <span className="footer-btn-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
