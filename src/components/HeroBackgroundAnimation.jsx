import React, { useEffect, useRef } from 'react';
import { createHero } from '../effects/uxhubEffects';

export default function HeroBackgroundAnimation() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer = null;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    try {
      renderer = createHero(canvas, {
        intro: !isReducedMotion,
        onActive: () => {
          canvas.dataset.active = 'true';
          canvas.dataset.ready = 'true';
          if (containerRef.current) {
            const svg = containerRef.current.querySelector('svg');
            if (svg) svg.classList.add('effect-fallback-hidden');
          }
        },
        onError: () => {
          if (canvas) canvas.hidden = true;
        }
      });
    } catch (err) {
      console.warn('Hero liquid WebGL unavailable, using fallback:', err);
      if (canvas) canvas.hidden = true;
    }

    return () => {
      renderer?.dispose?.();
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-liquid-container" aria-hidden="true">
      {/* Exact SVG paths from https://uxhub-web.vercel.app/ */}
      <svg 
        viewBox="-223.057 -52.4742 1891.06 976.965" 
        preserveAspectRatio="none" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="hero-liquid-fallback"
      >
        <path 
          d="M-222.724 504.473C-222.724 504.473 304.862 504.473 749.059 504.473C1193.25 504.473 1176.74 692.755 1668 692.755" 
          stroke="#202020" 
          strokeWidth="151.074" 
        />
        <path 
          d="M-222.724 504.473C-222.724 504.473 60.4716 504.473 504.668 504.473C948.864 504.473 1176.74 -52.4742 1668 -52.4742" 
          stroke="#868383" 
          strokeWidth="151.074" 
        />
        <path 
          d="M-222.724 504.473C-222.724 504.473 304.862 504.473 749.059 504.473C1193.25 504.473 1176.74 259.574 1668 259.574" 
          stroke="#383838" 
          strokeWidth="151.074" 
        />
        <path 
          d="M-223.057 504.476C-223.057 504.476 -299.029 504.476 145.246 504.476C912.887 504.476 657.455 924.491 1668 924.491" 
          stroke="#000000" 
          strokeWidth="151.074" 
        />
      </svg>

      {/* WebGL2 Liquid Chrome Animated Canvas */}
      <canvas 
        ref={canvasRef} 
        className="hero-liquid-canvas" 
        data-active="false" 
        data-ready="false" 
      />
    </div>
  );
}

