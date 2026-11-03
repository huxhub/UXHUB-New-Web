import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollTypographyReveal
 * A premium, minimalist kinetic typography reveal animation using GSAP ScrollTrigger.
 * Progressively illuminates words from left to right synchronized with scroll progress.
 *
 * Themes:
 * - 'dark' (for black/dark sections): #3A3A3A -> #FFFFFF
 * - 'light' (for white/light sections): #D1D5DB -> #000000
 */
export default function ScrollTypographyReveal({
  text,
  lines,
  tag: Tag = 'h2',
  className = '',
  theme = 'dark',
  start = 'top 85%',
  end = 'bottom 45%',
  scrub = 0.8,
  fromColor,
  toColor,
  fromOpacity = 0.35,
  toOpacity = 1,
  stagger = 0.08,
}) {
  const containerRef = useRef(null);

  const defaultFromColor = theme === 'light' ? '#D1D5DB' : '#3A3A3A';
  const defaultToColor = theme === 'light' ? '#000000' : '#FFFFFF';

  const resolvedFromColor = fromColor ?? defaultFromColor;
  const resolvedToColor = toColor ?? defaultToColor;

  // Normalize content into an array of lines
  const resolvedLines = React.useMemo(() => {
    if (lines && Array.isArray(lines)) {
      return lines;
    }
    if (typeof text === 'string') {
      return text.split('\n');
    }
    return [];
  }, [text, lines]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.typography-reveal-word');
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          color: resolvedFromColor,
          opacity: fromOpacity,
        },
        {
          color: resolvedToColor,
          opacity: toOpacity,
          stagger: stagger,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: start,
            end: end,
            scrub: scrub,
            invalidateOnRefresh: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [resolvedFromColor, resolvedToColor, fromOpacity, toOpacity, stagger, start, end, scrub]);

  return (
    <Tag ref={containerRef} className={`typography-reveal-container theme-${theme} ${className}`}>
      {resolvedLines.map((line, lIdx) => (
        <span key={lIdx} className="typography-reveal-line">
          {line.split(' ').map((word, wIdx, arr) => (
            <React.Fragment key={wIdx}>
              <span className="typography-reveal-word">
                {word}
              </span>
              {wIdx < arr.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
