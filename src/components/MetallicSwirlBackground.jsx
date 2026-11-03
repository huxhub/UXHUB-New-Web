import React, { useEffect, useRef } from 'react';
import { createSwirl, swirlAt } from '../effects/uxhubEffects';

export default function MetallicSwirlBackground({ preset = 'default', className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer = null;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Presets from uxhub-web.vercel.app
    const presets = {
      default: {
        speed: 0.1,
        zoom: 2.2,
        iterations: 4,
        sampleGap: 0.08,
        tangentForce: 1.2,
        gradientForce: 0.35,
        centerX: 0.5,
        centerY: 0.5,
        radialMix: 1,
        beams: 3,
        beamWidth: 0.45,
        radialStretch: -0.1,
        radialFlow: 1.5,
        radialSpin: 0.4,
        twist: 0.8,
        vortex: 0.1,
        hole: 0.2,
        colorMode: 'stripes',
        colorA: '#ffffff',
        colorB: '#00000000',
        colorC: '#8b93a655',
        tintColor: '#ffffff00',
        softness: 0.5,
        shiftRed: 0.4,
        shiftBlue: 0.3,
        repetition: 1.4,
        stripeFlow: 0.8,
        spread: 0.04,
        bandWidth: 0.12,
        threshold: 0.72,
        brightness: 1,
        contrast: 1,
        vignette: 0,
        backgroundColor: '#00000000',
        opacity: 0.85,
        fadeTop: 0.15,
        fadeBottom: 0.2
      },
      dark: {
        speed: 0.08,
        zoom: 2.5,
        iterations: 5,
        sampleGap: 0.14,
        tangentForce: 1.4,
        gradientForce: 0.4,
        centerX: 0.5,
        centerY: 0.5,
        radialMix: 1,
        beams: 4,
        beamWidth: 0.35,
        radialStretch: 0,
        radialFlow: 1.2,
        radialSpin: 0.5,
        twist: 1.1,
        vortex: 0.5,
        hole: 0.5,
        colorMode: 'stripes',
        colorA: '#fafaff',
        colorB: '#000000',
        colorC: '#8b93a6',
        tintColor: '#ffffff00',
        softness: 0.45,
        repetition: 1.8,
        stripeFlow: -1.2,
        backgroundColor: '#000000',
        opacity: 0.9
      }
    };

    const config = presets[preset] || presets.default;

    try {
      renderer = createSwirl(canvas, config, {
        animated: !isReducedMotion,
        onReady: () => {
          canvas.dataset.ready = 'true';
        },
        onError: () => {
          if (canvas) canvas.hidden = true;
        }
      });
    } catch (err) {
      console.warn('Metallic swirl WebGL unavailable:', err);
      if (canvas) canvas.hidden = true;
    }

    return () => {
      renderer?.dispose?.();
    };
  }, [preset]);

  return (
    <div className={`metallic-swirl-wrapper ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="metallic-swirl-canvas" data-ready="false" />
    </div>
  );
}

