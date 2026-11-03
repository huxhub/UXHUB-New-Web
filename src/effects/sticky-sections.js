// Native sticky positioning follows scrolling in both directions. Measure only
// when content or the viewport changes, including when an accordion opens.
export function setupStickySections() {
  const sections = [...document.querySelectorAll('[data-scroll-split]')];
  const desktop = window.matchMedia('(min-width: 1024px)');
  let frame;
  const measure = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      for (const section of sections) {
        const sticky = section.querySelector('[data-scroll-sticky]');
        if (!sticky) continue;
        if (!desktop.matches) {
          sticky.style.removeProperty('--sticky-top');
          continue;
        }
        // Keep the left introduction visible while the longer right list moves.
        sticky.style.setProperty('--sticky-top', `${Math.min(96, innerHeight - sticky.offsetHeight - 32)}px`);
      }
    });
  };
  const observer = new ResizeObserver(measure);
  for (const section of sections) {
    for (const child of section.children) observer.observe(child);
  }
  desktop.addEventListener('change', measure);
  window.addEventListener('resize', measure);
  measure();
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    desktop.removeEventListener('change', measure);
    window.removeEventListener('resize', measure);
    for (const section of sections) {
      section.querySelector('[data-scroll-sticky]')?.style.removeProperty('--sticky-top');
    }
  };
}
