import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import uxhubLogo from '../assets/Group 1 (1).svg';

// ─── UX Hub Custom Wordmark & Brand Logo ────────────────────────────────────
export const UXHubLogo = ({ onClick, dark = false, color = 'currentColor', className = '' }) => (
  <a 
    href="#/" 
    className={`brand-logo${dark ? ' brand-logo--dark' : ''} ${className}`} 
    aria-label="UXHUB Homepage" 
    onClick={(e) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <svg 
      width="111" 
      height="44" 
      viewBox="0 0 111 44" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="brand-logo-img brand-logo-svg"
      aria-hidden="true"
    >
      <path d="M59.5943 17.7432C59.5009 17.8363 59.3843 17.9293 59.2909 18.0223C58.4976 18.813 57.2142 18.7897 56.4442 17.999L41.9073 3.51142C41.1139 2.74402 41.1139 1.48827 41.884 0.697616L41.9073 0.674362C42.7006 -0.0930402 43.9607 -0.0930402 44.754 0.697616L59.6876 15.5806C60.2709 16.1619 60.2476 17.1154 59.6643 17.6967C59.6409 17.6967 59.6176 17.72 59.5943 17.7432Z" fill={color}/>
      <path d="M84.6314 43.0443C84.5614 43.114 84.4914 43.1838 84.4214 43.2536C83.6747 43.9745 82.5081 43.9512 81.7614 43.2303L67.0378 28.5567C66.2911 27.8125 66.2911 26.6265 67.0378 25.8824C67.0611 25.8591 67.0845 25.8359 67.1078 25.8126L67.1778 25.7428C67.9245 24.9987 69.1145 24.9754 69.8612 25.7196L84.5848 40.3932C85.3548 41.1374 85.3548 42.3001 84.6314 43.0443Z" fill={color}/>
      <path d="M59.571 28.5567L44.8241 43.2536C44.1007 43.9745 42.9107 43.9978 42.1874 43.2769C42.1174 43.2071 42.0474 43.1374 41.9774 43.0676C41.254 42.3234 41.254 41.1375 42.0007 40.4166L56.7243 25.7429C57.471 24.9988 58.6843 25.022 59.4077 25.7662L59.4777 25.8359C60.2477 26.5336 60.3177 27.7195 59.641 28.5102C59.6177 28.487 59.5943 28.5102 59.571 28.5567Z" fill={color}/>
      <path d="M84.7714 3.41838L70.0478 18.092C69.3011 18.8362 68.1111 18.8362 67.3644 18.092C67.3411 18.0688 67.3177 18.0455 67.2944 18.0223L67.2244 17.9525C66.4777 17.2316 66.4544 16.0224 67.2011 15.2782L81.948 0.581316C82.6713 -0.162832 83.8614 -0.162832 84.608 0.558061C84.678 0.627825 84.748 0.697589 84.818 0.767353C85.518 1.5115 85.518 2.69749 84.7714 3.41838Z" fill={color}/>
      <path d="M61.8811 20.5803C62.6745 19.7896 63.9345 19.7896 64.7279 20.5803C65.5212 21.371 65.5212 22.6267 64.7279 23.4174C63.9345 24.208 62.6745 24.208 61.8811 23.4174C61.0878 22.6267 61.0878 21.3477 61.8811 20.5803Z" fill="#FF7723"/>
      <path d="M15.5636 43.7884C6.69678 43.7884 0 37.719 0 29.6729V1.9999C0 0.90693 0.910016 0 2.0067 0C3.12672 0 4.0134 0.90693 4.0134 1.9999V29.6729C4.0134 35.6028 8.86682 39.8816 15.5636 39.8816C22.2604 39.8816 27.1138 35.5795 27.1138 29.6729V1.9999C27.1138 0.883675 28.0238 0 29.1205 0C30.2405 0 31.1272 0.90693 31.1272 1.9999V29.6729C31.1505 37.719 24.4538 43.7884 15.5636 43.7884Z" fill={color}/>
      <path d="M110.765 33.7424H95.4817V31.6727H110.765V33.7424ZM110.765 43.5791H95.4817V41.5094H110.765V43.5791ZM103.812 42.1838H101.922V33.254H103.812V42.1838Z" fill={color}/>
      <path d="M110.999 21.3709C111.022 22.4174 110.765 23.4638 110.229 24.394C109.738 25.2777 109.015 25.9986 108.128 26.4869C107.195 26.9985 106.168 27.2776 105.095 27.2543H95.4583V25.1847H105.048C105.772 25.2079 106.495 25.0219 107.148 24.6731C107.732 24.3475 108.198 23.8824 108.525 23.301C109.178 22.0685 109.178 20.6268 108.525 19.3943C108.198 18.8362 107.732 18.3711 107.148 18.0455C106.518 17.6967 105.795 17.5339 105.072 17.5572H95.4583V15.4642H105.118C106.168 15.441 107.218 15.72 108.128 16.2316C108.992 16.72 109.715 17.4409 110.205 18.3246C110.742 19.2547 111.022 20.3012 110.999 21.3709Z" fill={color}/>
      <path d="M110.765 9.67397H108.969V5.06956C109.015 4.30216 108.735 3.55801 108.175 2.9999C107.662 2.51156 106.985 2.2325 106.285 2.25576C105.819 2.25576 105.352 2.37203 104.932 2.58132C104.535 2.79061 104.185 3.13943 103.975 3.53476C103.742 3.9766 103.602 4.4882 103.625 4.9998V9.67397H101.828V5.30211C101.852 4.67423 101.642 4.04636 101.245 3.55801C100.802 3.11618 100.195 2.86038 99.5651 2.90689C98.9351 2.86038 98.3051 3.11618 97.8851 3.58127C97.4884 4.09287 97.2784 4.72074 97.3017 5.37187V9.65072H95.505V5.34862C95.4817 4.4882 95.6684 3.62778 96.0417 2.86038C96.3684 2.2325 96.8584 1.69765 97.4651 1.34883C98.0484 1.00001 98.7251 0.837225 99.4018 0.837225C100.172 0.813971 100.942 1.04652 101.548 1.51161C102.202 2.02321 102.715 2.69759 102.995 3.465L102.342 3.27896C102.645 2.37203 103.205 1.58137 103.928 0.976753C104.652 0.418643 105.539 0.139587 106.449 0.162842C107.219 0.162842 107.965 0.348879 108.642 0.767462C109.295 1.18604 109.832 1.76741 110.205 2.46505C110.625 3.30221 110.812 4.2324 110.789 5.18584L110.765 9.67397ZM110.765 11.0693H95.4817V8.99959H110.765V11.0693Z" fill={color}/>
    </svg>
  </a>
);

// ─── Brand Cross Icon (from assets/Group 53.svg) ─────────────────────────
export const BrandCross = ({ size = 36, color = 'currentColor', accentColor = '#FF7723', className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 97 96" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`brand-cross ${className}`}
    aria-hidden="true"
  >
    <path d="M40.0896 38.8575C39.885 39.0615 39.6292 39.2654 39.4246 39.4693C37.6852 41.2029 34.8714 41.1519 33.1832 39.4184L1.31103 7.65431C-0.428384 5.97178 -0.428388 3.21856 1.25986 1.48505L1.31103 1.43406C3.05044 -0.248466 5.81303 -0.248467 7.55244 1.48505L40.2943 34.1158C41.5733 35.3905 41.5221 37.4809 40.2431 38.7555C40.192 38.7555 40.1408 38.8065 40.0896 38.8575Z" fill={color}/>
    <path d="M94.9832 94.33C94.8297 94.4829 94.6762 94.6359 94.5228 94.7888C92.8857 96.3694 90.3277 96.3184 88.6906 94.7379L56.4092 62.5659C54.7721 60.9344 54.7721 58.3341 56.4092 56.7026C56.4604 56.6516 56.5115 56.6006 56.5627 56.5496L56.7162 56.3967C58.3533 54.7651 60.9624 54.7141 62.5995 56.3457L94.8809 88.5176C96.5691 90.1492 96.5691 92.6984 94.9832 94.33Z" fill={color}/>
    <path d="M40.0384 62.566L7.7058 94.7889C6.11987 96.3694 3.51075 96.4204 1.92482 94.8399C1.77134 94.6869 1.61786 94.534 1.46438 94.381C-0.121553 92.7495 -0.12155 90.1492 1.51554 88.5686L33.7969 56.3967C35.434 54.7652 38.0943 54.8162 39.6802 56.4477L39.8337 56.6006C41.522 58.1302 41.6755 60.7305 40.1918 62.464C40.1407 62.413 40.0895 62.464 40.0384 62.566Z" fill={color}/>
    <path d="M95.2905 7.45035L63.0091 39.6223C61.3721 41.2538 58.7629 41.2538 57.1258 39.6223C57.0747 39.5713 57.0235 39.5203 56.9724 39.4693L56.8189 39.3164C55.1818 37.7358 55.1306 35.0846 56.7677 33.453L89.1003 1.2301C90.6862 -0.401436 93.2953 -0.401436 94.9324 1.17912C95.0859 1.33208 95.2394 1.48503 95.3929 1.63799C96.9276 3.26953 96.9276 5.8698 95.2905 7.45035Z" fill={color}/>
    <path d="M45.1031 45.0777C46.8426 43.3442 49.6051 43.3442 51.3445 45.0777C53.084 46.8112 53.084 49.5645 51.3445 51.298C49.6051 53.0315 46.8426 53.0315 45.1031 51.298C43.3637 49.5645 43.3637 46.7602 45.1031 45.0777Z" fill={accentColor}/>
  </svg>
);

// ─── Brutalist Arrow Nav Icons (from assets/Vector.svg and Vector (1).svg) ────
export const VectorArrowLeft = ({ width = 16, height = 14, className = '', color = 'currentColor' }) => (
  <svg width={width} height={height} viewBox="0 0 32 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9967 0V3.99249H8.00656V7.98499H3.99016V12.0038H0V15.9962H3.99016V20.015H8.00656V24.0075H11.9967V28H15.9869V15.9962H32V12.0038H15.9869V0H11.9967Z" fill={color}/>
  </svg>
);

export const VectorArrowRight = ({ width = 16, height = 14, className = '', color = 'currentColor' }) => (
  <svg width={width} height={height} viewBox="0 0 32 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.0033 0V3.99249H23.9934V7.98499H28.0098V12.0038H32V15.9962H28.0098V20.015H23.9934V24.0075H20.0033V28H16.0131V15.9962H1.90735e-06V12.0038H16.0131V0H20.0033Z" fill={color}/>
  </svg>
);

// ─── Arrow 6 Icon (from assets/Arrow 6.svg) ──────────────────────────────────
export const Arrow6Icon = ({ width = 28, height = 14, color = 'currentColor', className = '' }) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 30 15" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path 
      d="M0 7.36377L1.74846e-07 8.36377L28.2843 8.36376L28.2843 7.36376L28.2843 6.36376L-1.74846e-07 6.36377L0 7.36377ZM28.9914 8.07087C29.3819 7.68035 29.3819 7.04718 28.9914 6.65666L22.6274 0.292698C22.2369 -0.0978266 21.6037 -0.0978264 21.2132 0.292698C20.8227 0.683222 20.8227 1.31639 21.2132 1.70691L26.8701 7.36376L21.2132 13.0206C20.8227 13.4111 20.8227 14.0443 21.2132 14.4348C21.6037 14.8254 22.2369 14.8254 22.6274 14.4348L28.9914 8.07087Z" 
      fill={color}
    />
  </svg>
);

// ─── Service Icons (from assets/Brutalist 33, 13, 27, Shape 199) ─────────────
export const ArchIcon = ({ size = 76, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 117 117" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0V116.966H36.5795V48.7613C36.5795 36.6473 46.386 26.8408 58.5 26.8408C70.614 26.8408 80.4205 36.6473 80.4205 48.7613V117H117V0H0Z" fill={color}/>
    <circle cx="58.5" cy="13.5" r="6.5" fill="#FF7723"/>
  </svg>
);

export const WedgeIcon = ({ size = 76, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 117 117" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M117 117H0V88.0486C48.6234 88.0486 88.0213 48.6384 88.0213 0H116.964V117H117Z" fill={color}/>
    <circle cx="96.5" cy="97.5" r="6.5" fill="#FF7723"/>
  </svg>
);

export const HourglassIcon = ({ size = 76, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 117 117" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M79.4833 58.5171C79.4833 37.8016 96.2563 21.0237 116.966 21.0237V0H0V23.4205C20.7095 23.4205 37.4824 40.1984 37.4824 60.914C37.4824 81.6295 20.7095 98.4074 0 98.4074V117H117V96.0105C96.2905 96.0105 79.4833 79.2327 79.4833 58.5171Z" fill={color}/>
    <circle cx="58.5" cy="58.5" r="6.5" fill="#FF7723"/>
  </svg>
);

export const PillarShapeIcon = ({ size = 76, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M43 0C19.2426 0 0 19.2667 0 43V86H21.3189C21.3189 74.0247 31.0247 64.3189 43 64.3189C54.9753 64.3189 64.6811 74.0247 64.6811 86H86V43C86 19.2426 66.7574 0 43 0Z" fill={color}/>
    <circle cx="43" cy="24" r="6" fill="#FF7723"/>
  </svg>
);

// Backward-compatible alias for ArchIcon
export const DiamondIcon = ArchIcon;

export const KareonHexIcon = ({ size = 68, color = 'currentColor' }) => (
  <svg width={size} height={size * (210 / 183)} viewBox="0 0 183 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M128.902 180.749H63.3926L30.9556 124.31L63.3926 67.8721H128.426L128.577 68.1336L161.339 124.3L161.187 124.565L128.902 180.745V180.749ZM64.0064 179.688H128.291L160.118 124.303L127.819 68.9289H64.0064L32.1795 124.307L64.0064 179.685V179.688ZM96.1472 152.911C80.4083 152.911 67.6007 140.081 67.6007 124.307C67.6007 108.533 80.4048 95.7024 96.1472 95.7024C111.89 95.7024 124.694 108.533 124.694 124.307C124.694 140.081 111.89 152.911 96.1472 152.911ZM96.1472 96.7628C80.9903 96.7628 68.6589 109.119 68.6589 124.307C68.6589 139.494 80.9903 151.851 96.1472 151.851C111.304 151.851 123.635 139.494 123.635 124.307C123.635 109.119 111.304 96.7628 96.1472 96.7628Z" fill={color}/>
    <path d="M97.2055 61.3689L96.7963 61.0331C88.7858 54.5015 87.5689 42.6539 94.0873 34.6272C97.2443 30.7393 101.724 28.3146 106.701 27.8021C111.678 27.2896 116.556 28.7494 120.436 31.9127L120.845 32.2485L97.2019 61.3689H97.2055ZM108.648 28.7635C108.038 28.7635 107.424 28.7953 106.807 28.8589C102.112 29.3432 97.8827 31.63 94.9057 35.2987C91.9251 38.9675 90.553 43.58 91.0327 48.2843C91.4983 52.812 93.6288 56.9084 97.0538 59.8703L119.353 32.4075C116.253 30.0253 112.521 28.7635 108.648 28.7635Z" fill={color}/>
  </svg>
);

// ─── Minimalist Vector Icons (replacing generic icons & emojis) ──────────────
export const MailIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const PhoneIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const ClockIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const CodeSparkIcon = ({ size = 18, color = '#FF7723' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m13 2-2 2.5h3L11 8" />
    <path d="m7 12-5 5 5 5" />
    <path d="m17 12 5 5-5 5" />
  </svg>
);

export const DiagonalArrowIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export const CheckmarkIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Capability / Tech Grid Icons (from assets/Frame.svg through Frame (7).svg) ───
export const techItems = [
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



// ─── Featured Stories Data ──────────────────────────────────────────────────
export const featuredStories = [
  {
    id: 'brand-swamy',
    title: 'Brand Swamy',
    tagline: 'From 0→1 to scalable growth',
    desc: 'From 0→1 to scalable growth. Identify opportunities, validate ideas and take digital products from concept to market and beyond.',
    client: 'Consumer Brand & Retail',
    market: 'India ↔ UAE',
    metrics: [
      { label: 'GMV Growth', value: '+320%' },
      { label: 'Time to MVP', value: '45 Days' },
      { label: 'Monthly Sessions', value: '2.8M' }
    ],
    tags: ['Product Strategy', 'Next.js', 'Go-To-Market', 'Analytics']
  },
  {
    id: 'kareon-repairs',
    title: 'Kareon Repairs',
    tagline: 'Multi-Channel Commerce Engine',
    desc: 'Build, optimize and scale e-commerce businesses across D2C and marketplace channels.',
    client: 'Automotive & Hardware D2C',
    market: 'Saudi Arabia (KSA)',
    metrics: [
      { label: 'Checkout Conversion', value: '4.8x' },
      { label: 'Cart Abandonment Drop', value: '-65%' },
      { label: 'Avg Page Load', value: '780ms' }
    ],
    tags: ['Shopify Plus', 'Arabic RTL', 'Dynamic Repricing', 'Inventory Sync']
  },
  {
    id: 'digital-experience',
    title: 'Digital Experience',
    tagline: 'Enterprise Custom Software Platform',
    desc: 'Custom software and premium digital experiences that combine brand, technology, usability and conversion.',
    client: 'Cross-Border Fintech & SaaS',
    market: 'GCC & India',
    metrics: [
      { label: 'Platform Uptime', value: '99.99%' },
      { label: 'Median Latency', value: '42ms' },
      { label: 'Security Standard', value: 'ISO-27001' }
    ],
    tags: ['Custom Cloud', 'Design System', 'GraphQL', 'Micro-services']
  }
];

// ─── Contact Modal ──────────────────────────────────────────────────────────
export function ContactModal({ isOpen, onClose }) {
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
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="modal-close-btn" onClick={onClose} aria-label="Close contact modal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {submitted ? (
              <div className="modal-success">
                <BrandCross size={48} color="#ffffff" strokeWidth={2.5} />
                <h3>Thank you.</h3>
                <p>We've received your inquiry and our team will get in touch shortly.</p>
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
                    rows={4} 
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

// ─── Partner Logo Sets ───────────────────────────────────────────────────────
export const partnerSets = [
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

// ─── Cross Navigation Banner (Interconnecting All Pages) ────────────────────
export const CrossNavBanner = ({ current, onNavigate, theme = "auto" }) => {
  const allDestinations = [
    { 
      id: 'home', 
      title: 'Home', 
      tagline: 'Digital Growth Agency', 
      desc: 'Overview of our philosophy, enterprise partners, and full-stack growth systems.',
      badge: 'Overview'
    },
    { 
      id: 'services', 
      title: 'Services', 
      tagline: 'Pillars & Engagement Models', 
      desc: 'Product growth, D2C e-commerce scaling, custom software, and dynamic price intelligence.',
      badge: '4 Pillars'
    },
    { 
      id: 'capabilities', 
      title: 'Capabilities', 
      tagline: 'Architecture & Tech Matrix', 
      desc: 'Edge-rendered frontends, sub-650ms SLAs, zero-trust cloud, and high-concurrency commerce.',
      badge: 'Tech Spec'
    },
    { 
      id: 'stories', 
      title: 'Featured Stories', 
      tagline: 'Verified Growth Outcomes', 
      desc: 'Real case studies: +320% GMV, 4.8x conversion rates, and 99.99% edge uptime.',
      badge: 'Outcomes'
    },
    { 
      id: 'contact', 
      title: 'Contact', 
      tagline: 'Regional Studios & Inquiries', 
      desc: 'Direct consultation booking and regional offices across Bangalore, Riyadh, and Dubai.',
      badge: '24h SLA'
    }
  ];

  const destinations = allDestinations.filter(d => d.id !== current);

  return (
    <section className={`cross-nav-section cross-nav--${theme}`}>
      <div className="container">
        <div className="cross-nav-header">
          <div className="cross-nav-pre">
            <BrandCross size={20} color="#FF7723" strokeWidth={2.5} />
            <span className="cross-nav-eyebrow">EXPLORE UXHUB ECOSYSTEM</span>
          </div>
          <h3 className="cross-nav-title">Connect with other divisions</h3>
          <p className="cross-nav-subtitle">Navigate seamlessly between strategy, technical capabilities, case studies, and advisory.</p>
        </div>

        <div className="cross-nav-grid">
          {destinations.map((dest) => (
            <a
              key={dest.id}
              href={`#/${dest.id === 'home' ? '' : dest.id}`}
              className="cross-nav-card"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(dest.id);
              }}
            >
              <div className="cross-nav-card-top">
                <span className="cross-nav-badge">{dest.badge}</span>
                <span className="cross-nav-arrow-icon">
                  <DiagonalArrowIcon size={16} />
                </span>
              </div>
              <h4 className="cross-nav-card-title">{dest.title}</h4>
              <p className="cross-nav-card-tagline">{dest.tagline}</p>
              <p className="cross-nav-card-desc">{dest.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
