import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  ArrowRight, 
  X, 
  CheckCircle 
} from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Effects from './components/Effects';
import ScrollTypographyReveal from './components/ScrollTypographyReveal';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// ─── UXHUB Logo ─────────────────────────────────────────────────────────────
const UXHubLogo = ({ dark = false }) => (
  <a href="/" className={`brand-logo${dark ? ' brand-logo--dark' : ''}`} aria-label="UXHUB Homepage">
    <span className="logo-ux">UX</span>
    <span className="logo-hub-vertical">HUB</span>
  </a>
);

// ─── Brand Cross Icon (from assets/Group 53.svg) ─────────────────────────
const BrandCross = ({ size = 36, color = 'currentColor', className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 97 96" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`brand-cross ${className}`}
  >
    <path d="M40.0896 38.8575C39.885 39.0615 39.6292 39.2654 39.4246 39.4693C37.6852 41.2029 34.8714 41.1519 33.1832 39.4184L1.31103 7.65431C-0.428384 5.97178 -0.428388 3.21856 1.25986 1.48505L1.31103 1.43406C3.05044 -0.248466 5.81303 -0.248467 7.55244 1.48505L40.2943 34.1158C41.5733 35.3905 41.5221 37.4809 40.2431 38.7555C40.192 38.7555 40.1408 38.8065 40.0896 38.8575Z" fill={color}/>
    <path d="M94.9832 94.33C94.8297 94.4829 94.6762 94.6359 94.5228 94.7888C92.8857 96.3694 90.3277 96.3184 88.6906 94.7379L56.4092 62.5659C54.7721 60.9344 54.7721 58.3341 56.4092 56.7026C56.4604 56.6516 56.5115 56.6006 56.5627 56.5496L56.7162 56.3967C58.3533 54.7651 60.9624 54.7141 62.5995 56.3457L94.8809 88.5176C96.5691 90.1492 96.5691 92.6984 94.9832 94.33Z" fill={color}/>
    <path d="M40.0384 62.566L7.7058 94.7889C6.11987 96.3694 3.51075 96.4204 1.92482 94.8399C1.77134 94.6869 1.61786 94.534 1.46438 94.381C-0.121553 92.7495 -0.12155 90.1492 1.51554 88.5686L33.7969 56.3967C35.434 54.7652 38.0943 54.8162 39.6802 56.4477L39.8337 56.6006C41.522 58.1302 41.6755 60.7305 40.1918 62.464C40.1407 62.413 40.0895 62.464 40.0384 62.566Z" fill={color}/>
    <path d="M95.2905 7.45035L63.0091 39.6223C61.3721 41.2538 58.7629 41.2538 57.1258 39.6223C57.0747 39.5713 57.0235 39.5203 56.9724 39.4693L56.8189 39.3164C55.1818 37.7358 55.1306 35.0846 56.7677 33.453L89.1003 1.2301C90.6862 -0.401436 93.2953 -0.401436 94.9324 1.17912C95.0859 1.33208 95.2394 1.48503 95.3929 1.63799C96.9276 3.26953 96.9276 5.8698 95.2905 7.45035Z" fill={color}/>
    <path d="M45.1031 45.0777C46.8426 43.3442 49.6051 43.3442 51.3445 45.0777C53.084 46.8112 53.084 49.5645 51.3445 51.298C49.6051 53.0315 46.8426 53.0315 45.1031 51.298C43.3637 49.5645 43.3637 46.7602 45.1031 45.0777Z" fill="#FF7723"/>
  </svg>
);

// ─── Brutalist Arrow Nav Icons (from assets/Vector.svg and Vector (1).svg) ────
const VectorArrowLeft = ({ width = 16, height = 14, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 32 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9967 0V3.99249H8.00656V7.98499H3.99016V12.0038H0V15.9962H3.99016V20.015H8.00656V24.0075H11.9967V28H15.9869V15.9962H32V12.0038H15.9869V0H11.9967Z" fill="currentColor"/>
  </svg>
);

const VectorArrowRight = ({ width = 16, height = 14, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 32 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.0033 0V3.99249H23.9934V7.98499H28.0098V12.0038H32V15.9962H28.0098V20.015H23.9934V24.0075H20.0033V28H16.0131V15.9962H1.90735e-06V12.0038H16.0131V0H20.0033Z" fill="currentColor"/>
  </svg>
);

// ─── Service Icons (from assets/Brutalist 33, 13, 27) ────────────────────────
const ArchIcon = ({ size = 76 }) => (
  <svg width={size} height={size} viewBox="0 0 117 117" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0V116.966H36.5795V48.7613C36.5795 36.6473 46.386 26.8408 58.5 26.8408C70.614 26.8408 80.4205 36.6473 80.4205 48.7613V117H117V0H0Z" fill="white"/>
    <circle cx="58.5" cy="13.5" r="6.5" fill="#FF7723"/>
  </svg>
);

const WedgeIcon = ({ size = 76 }) => (
  <svg width={size} height={size} viewBox="0 0 117 117" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M117 117H0V88.0486C48.6234 88.0486 88.0213 48.6384 88.0213 0H116.964V117H117Z" fill="white"/>
    <circle cx="96.5" cy="97.5" r="6.5" fill="#FF7723"/>
  </svg>
);

const HourglassIcon = ({ size = 76 }) => (
  <svg width={size} height={size} viewBox="0 0 117 117" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M79.4833 58.5171C79.4833 37.8016 96.2563 21.0237 116.966 21.0237V0H0V23.4205C20.7095 23.4205 37.4824 40.1984 37.4824 60.914C37.4824 81.6295 20.7095 98.4074 0 98.4074V117H117V96.0105C96.2905 96.0105 79.4833 79.2327 79.4833 58.5171Z" fill="white"/>
    <circle cx="58.5" cy="58.5" r="6.5" fill="#FF7723"/>
  </svg>
);

// ─── Partner Brands Carousel Data ───────────────────────────────────────────
const partnerSets = [
  [
    {
      name: 'Enterprises',
      icon: (
        <svg width="64" height="54" viewBox="0 0 104 87" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M95.062 27.5244C82.6496 6.04576 61.9452 -5.21465 48.7951 2.36007C44.8527 4.62233 42.0548 8.33344 40.376 12.985C29.9984 4.82568 18.6034 2.02963 10.2606 6.85916C-2.88946 14.4339 -3.47448 37.9969 8.93797 59.4756C21.3504 80.9542 42.0548 92.2147 55.2049 84.6399C59.1473 82.3777 61.9452 78.6666 63.624 74.015C74.0016 82.1743 85.3966 84.9704 93.7394 80.1408C106.889 72.5661 107.474 49.0031 95.062 27.5244Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: 'D2C Brands',
      icon: (
        <svg width="54" height="54" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M87 0H61.6973C61.6973 10.0601 53.5367 18.1973 43.5 18.1973C33.4399 18.1973 25.3027 10.0367 25.3027 0H0C0 24.0364 19.4871 43.5 43.5 43.5C67.5129 43.5 87 24.0364 87 0Z" fill="currentColor"/>
          <path d="M43.5 43.5C19.4871 43.5 0 62.9636 0 87H25.2792C25.2792 76.9399 33.4399 68.8027 43.4765 68.8027C53.5367 68.8027 61.6739 76.9633 61.6739 87H86.9531C87 62.9636 67.5129 43.5 43.5 43.5Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: 'SAAS Platforms',
      icon: (
        <svg width="56" height="56" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5 45C10.0736 45 0 55.0737 0 67.5C0 79.9263 10.0736 90 22.5 90C34.9264 90 45 79.9263 45 67.5C45 79.9263 55.0737 90 67.5 90C79.9263 90 90 79.9263 90 67.5C90 55.0737 79.9263 45 67.5 45C79.9263 45 90 34.9264 90 22.5C90 10.0736 79.9263 0 67.5 0C55.0737 0 45 10.0736 45 22.5C45 10.0736 34.9264 0 22.5 0C10.0736 0 0 10.0736 0 22.5C0 34.9264 10.0736 45 22.5 45Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: 'Commerce Hub',
      icon: (
        <svg width="54" height="54" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43 0C19.2426 0 0 19.2667 0 43V86H21.3189C21.3189 74.0247 31.0247 64.3189 43 64.3189C54.9753 64.3189 64.6811 74.0247 64.6811 86H86V43C86 19.2426 66.7574 0 43 0Z" fill="currentColor"/>
        </svg>
      )
    }
  ],
  [
    {
      name: 'Global Ventures',
      icon: (
        <svg width="54" height="54" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5 0H0V45C0 69.8526 20.1472 90 45 90C69.8526 90 90 69.8526 90 45V0H67.5C55.0737 0 45 10.0736 45 22.5C45 10.0736 34.9264 0 22.5 0Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: 'Fintech Scale',
      icon: (
        <svg width="54" height="54" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.9892 45C20.1413 45.0059 2.17238e-06 65.1508 0 90L90 90C90 65.1508 69.8589 45.0059 45.0108 45C69.8589 44.9942 90 24.849 90 0H3.93402e-06C3.93402e-06 24.849 20.1413 44.9942 44.9892 45Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: 'Tech Ecosystems',
      icon: (
        <svg width="54" height="54" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45 9.9C45 4.43238 40.5676 0 35.1 0H9.9C4.43238 0 0 4.43237 0 9.9V35.4237C0 40.8914 4.43238 45.3236 9.9 45.3236H35.1C40.5676 45.3236 45 49.7561 45 55.2235V80.1C45 85.5675 49.4325 90 54.9 90H80.1C85.5675 90 90 85.5675 90 80.1V54.576C90 49.1085 85.5675 44.6762 80.1 44.6762H54.9C49.4325 44.6762 45 40.2439 45 34.7762V9.9Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: 'Omni Growth',
      icon: (
        <svg width="54" height="54" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.8 0H0V67.5C0 79.9263 10.0736 90 22.5 90H42.3V22.5C42.3 10.0736 32.2264 0 19.8 0ZM70.2 0C57.7737 0 47.7 10.0736 47.7 22.5V90H67.5C79.9263 90 90 79.9263 90 67.5V0H70.2Z" fill="currentColor"/>
        </svg>
      )
    }
  ]
];

// ─── Capability / Tech Grid Icons (from assets/Frame.svg through Frame (7).svg) ───
const techItems = [
  {
    name: 'Real Estate',
    icon: (
      <svg width="54" height="54" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M90 1.18021e-06V27V90H63V58.5149C62.9919 75.9051 48.892 90 31.5 90C14.103 90 0 75.897 0 58.5C0 41.103 14.103 27 31.5 27C48.892 27 62.9919 41.095 63 58.4851V27H31.5H0V1.18021e-06L63 0L90 1.18021e-06Z" fill="white" fillRule="evenodd" clipRule="evenodd" />
        <circle cx="30.5" cy="58.5" r="6.5" fill="#FF7723" />
      </svg>
    )
  },
  {
    name: 'Beauty & Lifestyle',
    icon: (
      <svg width="54" height="54" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5 0H0V45C0 69.8526 20.1472 90 45 90C69.8526 90 90 69.8526 90 45V0H67.5C55.0737 0 45 10.0736 45 22.5C45 10.0736 34.9264 0 22.5 0Z" fill="white" fillRule="evenodd" clipRule="evenodd" />
        <circle cx="44.5" cy="58.5" r="6.5" fill="#FF7723" />
      </svg>
    )
  },
  {
    name: 'Travel & Hospitality',
    icon: (
      <svg width="54" height="54" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M44.9892 45C20.1413 45.0059 2.17238e-06 65.1508 0 90L90 90C90 65.1508 69.8589 45.0059 45.0108 45C69.8589 44.9942 90 24.849 90 0H3.93402e-06C3.93402e-06 24.849 20.1413 44.9942 44.9892 45Z" fill="white" fillRule="evenodd" clipRule="evenodd" />
        <circle cx="44.5" cy="18.5" r="6.5" fill="#FF7723" />
      </svg>
    )
  },
  {
    name: 'Technology & SaaS',
    icon: (
      <svg width="54" height="54" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M45 9.9C45 4.43238 40.5676 0 35.1 0H9.9C4.43238 0 0 4.43237 0 9.9V35.4237C0 40.8914 4.43238 45.3236 9.9 45.3236H35.1C40.5676 45.3236 45 49.7561 45 55.2235V80.1C45 85.5675 49.4325 90 54.9 90H80.1C85.5675 90 90 85.5675 90 80.1V54.576C90 49.1085 85.5675 44.6762 80.1 44.6762H54.9C49.4325 44.6762 45 40.2439 45 34.7762V9.9Z" fill="white" fillRule="evenodd" clipRule="evenodd" />
        <circle cx="67.5" cy="67.5" r="6.5" fill="#FF7723" />
      </svg>
    )
  },
  {
    name: 'Venture Startups',
    icon: (
      <svg width="54" height="54" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M65.867 15.565C66.4331 14.2003 66.7224 12.7371 66.7192 11.2598C66.7201 9.03739 66.0627 6.86452 64.8297 5.01547C63.5967 3.16642 61.8439 1.72411 59.792 0.870615C57.7399 0.0171239 55.4809 -0.209284 53.3002 0.219974C51.12 0.649233 49.1152 1.71491 47.5398 3.28248L45.0018 5.64619L42.4809 3.29023C40.3699 1.18172 37.5076 -0.00181616 34.5239 2.09192e-06C31.5402 0.00182034 28.6794 1.18884 26.5709 3.29993C24.4624 5.41102 23.2789 8.27325 23.2807 11.257C23.2825 14.2407 24.4695 17.1014 26.5806 19.21L43.8965 36.7818C44.0408 36.9284 44.2129 37.0448 44.4026 37.1242C44.5923 37.2037 44.796 37.2446 45.0018 37.2446C45.2074 37.2446 45.4113 37.2037 45.6007 37.1242C45.7906 37.0448 45.9625 36.9284 46.107 36.7818L63.423 19.21C64.4706 18.1685 65.3013 16.9296 65.867 15.565ZM24.1329 74.4349C23.567 75.7998 23.2774 77.2627 23.2807 78.7401C23.2797 80.9626 23.9372 83.1357 25.1701 84.9847C26.4031 86.8338 28.1562 88.276 30.2082 89.1292C32.2601 89.9829 34.519 90.2093 36.6996 89.7799C38.8801 89.3506 40.8846 88.285 42.46 86.7177L44.9982 84.3539L47.5191 86.7096C49.63 88.8183 52.4925 90.0018 55.476 90C58.4599 89.9982 61.3206 88.8111 63.4293 86.7001C65.5375 84.5892 66.721 81.7267 66.7192 78.7432C66.7174 75.7593 65.5303 72.8987 63.4194 70.7899L46.1034 53.2183C45.9594 53.0716 45.7871 52.9551 45.5971 52.8759C45.4077 52.7962 45.2038 52.7553 44.9982 52.7553C44.7925 52.7553 44.5889 52.7962 44.3991 52.8759C44.2094 52.9551 44.0373 53.0716 43.893 53.2183L26.5771 70.7899C25.5294 71.8317 24.6987 73.0705 24.1329 74.4349ZM78.7401 66.7197C77.2627 66.7229 75.7998 66.433 74.4349 65.8674C73.0705 65.3017 71.8317 64.4706 70.7899 63.423L53.2183 46.1074C53.0716 45.963 52.9551 45.7906 52.8759 45.6012C52.7962 45.4113 52.7553 45.2079 52.7553 45.0018C52.7553 44.7963 52.7962 44.5926 52.8759 44.4029C52.9551 44.2131 53.0716 44.041 53.2183 43.8967L70.7899 26.5809C72.8987 24.4698 75.7593 23.2827 78.7432 23.2809C81.7267 23.2791 84.5892 24.4626 86.7001 26.5711C88.8111 28.6797 89.9982 31.5405 90 34.5242C90.0018 37.5079 88.8183 40.3701 86.7096 42.4812L84.3539 45.0018L86.7177 47.5402C88.285 49.1157 89.3506 51.12 89.7799 53.3007C90.2093 55.4814 89.9829 57.7399 89.1292 59.792C88.276 61.8439 86.8338 63.5971 84.9847 64.8301C83.1357 66.0631 80.9626 66.7206 78.7401 66.7197ZM15.565 24.1326C14.2003 23.5668 12.7371 23.2771 11.2598 23.2804C9.03739 23.2794 6.86448 23.9369 5.01547 25.1698C3.16641 26.4028 1.7241 28.1559 0.870615 30.2079C0.0171236 32.2599 -0.209284 34.5187 0.219974 36.6993C0.649233 38.8799 1.71491 40.8844 3.28248 42.4598L5.64619 44.998L3.29023 47.5187C1.18171 49.63 -0.0018162 52.492 2.09202e-06 55.476C0.00182038 58.4595 1.18884 61.3201 3.29993 63.4288C5.41102 65.5376 8.27325 66.721 11.257 66.7192C14.2407 66.7174 17.1014 65.5303 19.21 63.4189L36.7818 46.1034C36.9283 45.959 37.0448 45.7871 37.1242 45.5971C37.2037 45.4072 37.2446 45.2038 37.2446 44.998C37.2446 44.7923 37.2037 44.5886 37.1242 44.3989C37.0448 44.2091 36.9283 44.0371 36.7818 43.8927L19.21 26.5769C18.1685 25.5292 16.9296 24.6984 15.565 24.1326Z" fill="white" fillRule="evenodd" clipRule="evenodd" />
        <circle cx="44.5" cy="18.5" r="6.5" fill="#FF7723" />
      </svg>
    )
  },
  {
    name: 'Consumer Brands',
    icon: (
      <svg width="54" height="54" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.8 0H0V67.5C0 79.9263 10.0736 90 22.5 90H42.3V22.5C42.3 10.0736 32.2264 0 19.8 0ZM70.2 0C57.7737 0 47.7 10.0736 47.7 22.5V90H67.5C79.9263 90 90 79.9263 90 67.5V0H70.2Z" fill="white" fillRule="evenodd" clipRule="evenodd" />
        <circle cx="70.5" cy="22.5" r="6.5" fill="#FF7723" />
      </svg>
    )
  },
  {
    name: 'Retail & E-commerce',
    icon: (
      <svg width="54" height="54" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5 45C34.9264 45 45 34.9264 45 22.5C45 34.9264 55.0737 45 67.5 45C55.0737 45 45 55.0737 45 67.5C45 55.0737 34.9264 45 22.5 45ZM22.5 45C10.0736 45 0 55.0737 0 67.5C0 79.9263 10.0736 90 22.5 90C34.9264 90 45 79.9263 45 67.5C45 79.9263 55.0737 90 67.5 90C79.9263 90 90 79.9263 90 67.5C90 55.0737 79.9263 45 67.5 45C79.9263 45 90 34.9264 90 22.5C90 10.0736 79.9263 0 67.5 0C55.0737 0 45 10.0736 45 22.5C45 10.0736 34.9264 0 22.5 0C10.0736 0 0 10.0736 0 22.5C0 34.9264 10.0736 45 22.5 45Z" fill="white" fillRule="evenodd" clipRule="evenodd" />
        <circle cx="67.5" cy="22.5" r="6.5" fill="#FF7723" />
      </svg>
    )
  },
  {
    name: 'B2B Enterprise',
    icon: (
      <svg width="54" height="54" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H45C69.8526 0 90 20.1472 90 45V90H45C20.1472 90 0 69.8526 0 45V0Z" fill="white" fillRule="evenodd" clipRule="evenodd" />
        <circle cx="44.5" cy="44.5" r="6.5" fill="#FF7723" />
      </svg>
    )
  }
];

// ─── Kareon Hexagon SVG Icon (from assets/about_icon_kareon 3.svg) ─────────
const KareonHexIcon = ({ size = 68 }) => (
  <svg width={size} height={size * (210 / 183)} viewBox="0 0 183 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M128.902 180.749H63.3926L30.9556 124.31L63.3926 67.8721H128.426L128.577 68.1336L161.339 124.3L161.187 124.565L128.902 180.745V180.749ZM64.0064 179.688H128.291L160.118 124.303L127.819 68.9289H64.0064L32.1795 124.307L64.0064 179.685V179.688ZM96.1472 152.911C80.4083 152.911 67.6007 140.081 67.6007 124.307C67.6007 108.533 80.4048 95.7024 96.1472 95.7024C111.89 95.7024 124.694 108.533 124.694 124.307C124.694 140.081 111.89 152.911 96.1472 152.911ZM96.1472 96.7628C80.9903 96.7628 68.6589 109.119 68.6589 124.307C68.6589 139.494 80.9903 151.851 96.1472 151.851C111.304 151.851 123.635 139.494 123.635 124.307C123.635 109.119 111.304 96.7628 96.1472 96.7628Z" fill="currentColor"/>
    <path d="M97.2055 61.3689L96.7963 61.0331C88.7858 54.5015 87.5689 42.6539 94.0873 34.6272C97.2443 30.7393 101.724 28.3146 106.701 27.8021C111.678 27.2896 116.556 28.7494 120.436 31.9127L120.845 32.2485L97.2019 61.3689H97.2055ZM108.648 28.7635C108.038 28.7635 107.424 28.7953 106.807 28.8589C102.112 29.3432 97.8827 31.63 94.9057 35.2987C91.9251 38.9675 90.553 43.58 91.0327 48.2843C91.4983 52.812 93.6288 56.9084 97.0538 59.8703L119.353 32.4075C116.253 30.0253 112.521 28.7635 108.648 28.7635Z" fill="currentColor"/>
  </svg>
);

// ─── Featured Stories Data ──────────────────────────────────────────────────
const featuredStories = [
  {
    title: 'Brand Swamy',
    desc: 'From 0→1 to scalable growth. Identify opportunities, validate ideas and take digital products from concept to market and beyond.'
  },
  {
    title: 'Kareon Repairs',
    desc: 'Build, optimize and scale e-commerce businesses across D2C and marketplace channels.'
  },
  {
    title: 'Digital Experience',
    desc: 'Custom software and premium digital experiences that combine brand, technology, usability and conversion.'
  }
];

// ─── Contact Modal ──────────────────────────────────────────────────────────
function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div 
            className="modal-card"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.32 }}
          >
            <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
              <X size={20} />
            </button>
            {submitted ? (
              <div className="modal-success">
                <CheckCircle size={48} color="#ff5200" />
                <h3>Message Sent</h3>
                <p>Thank you for reaching out. A growth partner from UXHUB will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="modal-header">
                  <span className="modal-eyebrow">START A CONVERSATION</span>
                  <h3 className="modal-title">Ready to build what's next?</h3>
                  <p className="modal-desc">Tell us about your digital growth ambitions in India or KSA.</p>
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Jane Doe" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label>Work Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="jane@company.com" 
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label>Company / Organization</label>
                  <input 
                    type="text" 
                    placeholder="Company Name" 
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label>How can we help?</label>
                  <textarea 
                    rows="3" 
                    placeholder="Digital products, E-commerce, Experience design..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })} 
                  />
                </div>
                <button type="submit" className="modal-submit-btn">
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Menu Drawer ────────────────────────────────────────────────────────────
function MenuDrawer({ isOpen, onClose, onOpenContact }) {
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
            <button className="menu-close" onClick={onClose}>Close</button>
            <nav>
              <ul className="menu-primary">
                <li><a href="#hero" onClick={onClose}>Home</a></li>
                <li><a href="#services" onClick={onClose}>Services</a></li>
                <li><a href="#capabilities" onClick={onClose}>Capabilities</a></li>
                <li><a href="#stories" onClick={onClose}>Featured Stories</a></li>
                <li>
                  <a 
                    href="#contact" 
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      onOpenContact();
                    }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
              <div className="menu-secondary">
                <span className="menu-sec-label">DIGITAL BUSINESS GROWTH CONSULTANCY</span>
                <p className="menu-sec-meta">India ↔ KSA · Strategy, technology and growth connected.</p>
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
  const [partnerIndex, setPartnerIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);

  const { scrollYProgress } = useScroll();

  // Initialize Lenis smooth scroll with luxurious inertia physics
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.25,
      infinite: false,
    });

    window.__lenis = lenis;

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis RAF via GSAP ticker for frame-locked synchronization
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger calculations once DOM layout stabilizes
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // Global interception for buttery smooth gliding to anchor targets
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.length > 1 && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: 0, duration: 1.35 });
        }
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

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(updateTicker);
      document.removeEventListener('click', handleAnchorClick);
      observer.disconnect();
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

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
    <div className="app-root">
      {/* ─── Premium Scroll Progress Indicator ───────────────────────────── */}
      <motion.div 
        className="scroll-progress-bar" 
        style={{ scaleX: scrollYProgress }} 
      />

      {/* ─── Overlays ────────────────────────────────────────────────────── */}
      <MenuDrawer 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        onOpenContact={() => setContactOpen(true)} 
      />
      <ContactModal 
        isOpen={contactOpen} 
        onClose={() => setContactOpen(false)} 
      />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1: HERO (LIGHT)
          With Liquid Chrome Ribbon Parallax Animation on scroll
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="hero" className="hero-section">
        {/* ─── Header (Sticky within Hero section, completely transparent, no blur) ─ */}
        <header className="site-header">
          <div className="header-inner">
            <UXHubLogo />
            <button 
              className="menu-button" 
              onClick={() => setMenuOpen(true)}
              aria-label="Toggle navigation menu"
            >
              Menu
            </button>
          </div>
        </header>

        <div className="hero-liquid-container" aria-hidden="true">
          <Effects kind="hero" className="hero-liquid-canvas" />
        </div>

        <div className="hero-foreground-content">
          <div className="hero-main-copy">
            <h1 className="hero-display-title">
              {['Build.', 'Launch.', 'Grow.'].map((word, i) => (
                <motion.span 
                  key={word}
                  className="hero-word-reveal" 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.h2 
              className="hero-subhead"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              Turning digital opportunities into scalable businesses.
            </motion.h2>
            <motion.p 
              className="hero-desc"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              We help businesses across India and KSA build digital products, launch e-commerce businesses, create high-performing digital experiences and develop the growth engines needed to scale.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SCROLLING SWIRL BAND
          Wraps "We build growth engines" and "Built for businesses" (& Philosophy)
          Morphs in real time on scroll via swirlAt(current) physics loop
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="swirl-band" data-swirl-band="true">
        {/* Pinned WebGL Swirl Layer that stays in the viewport across scrolling */}
        <div className="swirl-layer" aria-hidden="true">
          <Effects kind="swirl" className="metallic-swirl-canvas" />
        </div>

        {/* ─── SECTION 2: STATEMENT 1 (WE BUILD GROWTH ENGINES) ────────────── */}
        <section id="statement-1" className="statement-section swirl-section">
          <div className="container relative-z observe-reveal">
            <div className="statement-icon-wrap">
              <BrandCross size={52} color="#ffffff" strokeWidth={2.5} />
            </div>
            <ScrollTypographyReveal
              lines={[
                "We build growth engines,",
                "not just digital assets."
              ]}
              tag="h2"
              className="statement-heading"
              theme="dark"
              start="top 85%"
              end="bottom 45%"
              scrub={0.8}
            />
            <ScrollTypographyReveal
              text="From strategy to execution, we combine deep expertise with hands-on delivery to create digital products and businesses that are built to scale."
              tag="p"
              className="statement-desc"
              theme="dark"
              fromColor="#3A3A3A"
              toColor="#A1A1AA"
              fromOpacity={0.3}
              toOpacity={0.95}
              stagger={0.035}
              start="top 80%"
              end="bottom 40%"
              scrub={0.8}
            />
          </div>
        </section>

        {/* ─── SECTION 3: PARTNERS (WHITE BACKGROUND WITH ACTIVE SCROLLING ANIMATION) ─ */}
        <section id="partners" className="partners-section">
          <div className="partners-animation-layer" aria-hidden="true">
            <Effects kind="swirl" className="metallic-swirl-canvas partners-swirl-canvas" />
          </div>
          <div className="container relative-z observe-reveal">
            <div className="partners-header">
              <ScrollTypographyReveal
                lines={[
                  "Built for businesses that want",
                  "to scale digitally"
                ]}
                tag="h2"
                className="section-title"
                theme="light"
                start="top 85%"
                end="bottom 50%"
                scrub={0.8}
              />
            </div>

            <div className="carousel-container">
              <button 
                className="nav-arrow-btn" 
                onClick={() => setPartnerIndex(p => Math.max(0, p - 1))}
                disabled={partnerIndex === 0}
                aria-label="Previous partner logos"
              >
                <VectorArrowLeft width={20} height={18} />
              </button>

              <div className="partners-track">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={partnerIndex}
                    className="partners-slide-row"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {partnerSets[partnerIndex].map((item, idx) => (
                      <div key={idx} className="partner-logo-item">
                        <div className="partner-logo-symbol">
                          {item.icon}
                        </div>
                        <span className="partner-logo-name">{item.name}</span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <button 
                className="nav-arrow-btn" 
                onClick={() => setPartnerIndex(p => Math.min(partnerSets.length - 1, p + 1))}
                disabled={partnerIndex === partnerSets.length - 1}
                aria-label="Next partner logos"
              >
                <VectorArrowRight width={20} height={18} />
              </button>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: PHILOSOPHY (WE BUILD GROWTH ENGINES) ─────────────── */}
        <section id="philosophy" className="philosophy-section swirl-section">
          <div className="container relative-z observe-reveal">
            <div className="philosophy-content">
              <div className="section-tag-small">WHAT WE DO</div>
              <ScrollTypographyReveal
                lines={[
                  "We build growth engines,",
                  "not just digital assets."
                ]}
                tag="h2"
                className="philosophy-title"
                start="top 85%"
                end="bottom 45%"
                scrub={0.8}
              />
              <ScrollTypographyReveal
                text="Digital growth doesn't come from a website, campaign or product in isolation. It comes from connecting strategy, technology, customer experience and growth."
                tag="p"
                className="philosophy-subtitle"
                start="top 80%"
                end="bottom 40%"
                fromColor="#3A3A3A"
                toColor="#A1A1AA"
                fromOpacity={0.3}
                toOpacity={0.95}
                stagger={0.035}
                scrub={0.8}
              />
            </div>
          </div>
        </section>
      </div>

        {/* ─── SECTION 5: 3 DARK SERVICE CARDS (LIGHT BACKGROUND) ────────── */}
        <section id="services" className="light-section services-section">
          <div className="container observe-reveal">
            <div className="services-header">
              <BrandCross size={40} color="#000000" strokeWidth={2.5} />
              <div className="services-eyebrow">Services</div>
              <ScrollTypographyReveal
                text="Digital Business Growth"
                tag="h2"
                className="services-main-title"
                theme="light"
                start="top 85%"
                end="bottom 50%"
                scrub={0.8}
              />
              <ScrollTypographyReveal
                text="We help businesses across India and KSA build custom software and digital products, launch e-commerce businesses, create high-performing digital experiences and develop the growth engines needed to scale."
                tag="p"
                className="services-subhead"
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
            </div>

            <div className="services-cards-grid">
              <motion.div 
                className="service-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                onClick={() => setContactOpen(true)}
              >
                <div className="service-icon-box">
                  <ArchIcon size={84} />
                </div>
                <h3 className="service-title">Product Growth</h3>
                <p className="service-desc">
                  From 0→1 to scalable growth. Identify opportunities, validate ideas and take digital products from concept to market and beyond.
                </p>
                <div className="service-arrow-wrap">
                  <VectorArrowRight width={18} height={16} />
                </div>
              </motion.div>

              <motion.div 
                className="service-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                onClick={() => setContactOpen(true)}
              >
                <div className="service-icon-box">
                  <WedgeIcon size={84} />
                </div>
                <h3 className="service-title">E-commerce Growth D2C</h3>
                <p className="service-desc">
                  Build, optimize and scale e-commerce businesses across D2C and marketplace channels.
                </p>
                <div className="service-arrow-wrap">
                  <VectorArrowRight width={18} height={16} />
                </div>
              </motion.div>

              <motion.div 
                className="service-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                onClick={() => setContactOpen(true)}
              >
                <div className="service-icon-box">
                  <HourglassIcon size={84} />
                </div>
                <h3 className="service-title">Digital Experience</h3>
                <p className="service-desc">
                  Custom software and premium digital experiences that combine brand, technology, usability and conversion.
                </p>
                <div className="service-arrow-wrap">
                  <VectorArrowRight width={18} height={16} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: REGIONS BANNER (LIGHT) ─────────────────────────── */}
        <section className="light-section global-banner-section">
          <div className="container observe-reveal">
            <ScrollTypographyReveal
              text="India – KSA – UAE"
              tag="h2"
              className="global-title"
              theme="light"
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
            />
          </div>
        </section>

      {/* ─── SECTION 7: TECH STACK & CAPABILITIES (SOLID PLAIN BLACK) ────── */}
      <section id="capabilities" className="tech-grid-section solid-black-section">
          <div className="container relative-z observe-reveal">
            <div className="tech-grid-header">
              <span className="tech-eyebrow">INDUSTRIES</span>
              <ScrollTypographyReveal
                text="Built across industries."
                tag="h2"
                className="tech-heading"
                theme="dark"
                start="top 85%"
                end="bottom 50%"
                scrub={0.8}
              />
            </div>

            <div className="tech-grid">
              {techItems.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="tech-item"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.45, delay: (idx % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="tech-symbol-wrapper">
                    {item.icon}
                  </div>
                  <span className="tech-name">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: FEATURED STORIES (LIGHT) ───────────────────────── */}
        <section id="stories" className="light-section stories-section">
          <div className="container observe-reveal">
            <div className="stories-header">
              <ScrollTypographyReveal
                text="Featured Stories"
                tag="h2"
                className="stories-main-title"
                theme="light"
                start="top 85%"
                end="bottom 50%"
                scrub={0.8}
              />
              <ScrollTypographyReveal
                text="Discover authentic experiences, straight from those we serve."
                tag="p"
                className="stories-subhead"
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
            </div>

            <div className="stories-carousel-wrapper">
              <button 
                className="nav-arrow-btn" 
                onClick={() => setStoryIndex(s => Math.max(0, s - 1))}
                disabled={storyIndex === 0}
                aria-label="Previous stories"
              >
                <VectorArrowLeft width={20} height={18} />
              </button>

              <div className="stories-grid">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={storyIndex}
                    className="stories-slide-row"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {featuredStories.map((story, idx) => (
                      <div key={idx} className="story-card" onClick={() => setContactOpen(true)}>
                        <div className="story-icon-wrapper">
                          <KareonHexIcon size={66} />
                        </div>
                        <h3 className="story-title">{story.title}</h3>
                        <p className="story-desc">{story.desc}</p>
                        <div className="story-arrow-wrap">
                          <VectorArrowRight width={18} height={16} />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <button 
                className="nav-arrow-btn" 
                onClick={() => setStoryIndex(s => Math.min(featuredStories.length - 1, s + 1))}
                disabled={storyIndex === featuredStories.length - 1}
                aria-label="Next stories"
              >
                <VectorArrowRight width={20} height={18} />
              </button>
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: CALL TO ACTION (LIGHT) ─────────────────────────── */}
        <section id="contact" className="light-section cta-section">
          <div className="container observe-reveal">
            <ScrollTypographyReveal
              text="Ready to build what's next?"
              tag="h2"
              className="cta-title"
              theme="light"
              start="top 85%"
              end="bottom 50%"
              scrub={0.8}
            />
            <ScrollTypographyReveal
              text="Tell us what you're trying to build, launch or grow."
              tag="p"
              className="cta-subtitle"
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
              className="cta-conversation-btn"
              onClick={() => setContactOpen(true)}
              aria-label="Start a Conversation"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="cta-diagonal-arrow">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
              <span className="cta-link-text">Start a Conversation</span>
            </button>
          </div>
        </section>

      {/* ─── SECTION 10: FOOTER (PLAIN SOLID BLACK) ─────────────────────── */}
      <footer id="footer" className="footer">
        <div className="container">
          <div className="footer-brand-wrap">
            <BrandCross size={46} color="#ffffff" strokeWidth={2.5} className="footer-cross" />
            <p className="footer-studio-name">Digital Business Growth Consultancy</p>
            <p className="footer-regions">India - KSA - UAE</p>
          </div>

          <nav className="footer-nav-wrap" aria-label="Footer Navigation">
            <ul className="footer-nav">
              <li><a href="#hero" className="footer-link">About</a></li>
              <li><a href="#services" className="footer-link">Services</a></li>
              <li><a href="#capabilities" className="footer-link">Industries</a></li>
              <li><a href="#stories" className="footer-link">Works</a></li>
              <li><a href="#careers" className="footer-link" onClick={(e) => { e.preventDefault(); setContactOpen(true); }}>Careers</a></li>
              <li><a href="#products" className="footer-link" onClick={(e) => { e.preventDefault(); setContactOpen(true); }}>Products</a></li>
              <li>
                <button 
                  className="footer-link-btn"
                  onClick={() => setContactOpen(true)}
                >
                  Contact
                </button>
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
