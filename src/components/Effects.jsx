import { useEffect, useRef } from "react";
import { philosophy, fund, infrastructure } from "../effects/backdrop-presets";

export default function Effects({ kind, className }) {
  const ref = useRef(null);

  useEffect(() => {
    let disposed = false,
      renderer,
      frame;
    const cleanups = [];
    const canvas = ref.current;
    if (!canvas) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    import("../effects/reference-effects").then(
      ({ createHero, createSwirl, swirlAt }) => {
        if (disposed) return;
        try {
          const ready = () => {
            if (!canvas) return;
            canvas.dataset.active = "true";
            canvas.dataset.ready = "true";
            canvas.style.opacity = "1";
            canvas.parentElement
              ?.querySelector("svg")
              ?.classList.add("effect-fallback-hidden");
          };

          if (kind === "hero") {
            renderer = createHero(canvas, {
              intro: !reduced,
              onActive: ready,
              onError: () => {
                if (canvas) canvas.hidden = true;
              },
            });

            if (reduced) {
              const stop = setTimeout(
                () =>
                  renderer?.setParams({
                    repetition: 1.79,
                    softness: 1,
                    shiftRed: 0.61,
                    shiftBlue: 0.33,
                    shadowBlue: 0.075,
                    distortion: 0.07,
                    contour: 0.97,
                    angle: 0,
                    flow: 1,
                    speed: 0,
                  }),
                500
              );
              cleanups.push(() => clearTimeout(stop));
            }

            // Scroll parallax for hero ribbons (fine-tuned position)
            const HERO_TOP_OFFSET = -5;
            canvas.style.transform = `translate3d(0, ${HERO_TOP_OFFSET}px, 0)`;

            const onHeroScroll = () => {
              if (!canvas || disposed) return;
              const y = window.scrollY;
              if (y < window.innerHeight * 1.5) {
                canvas.style.transform = `translate3d(0, ${HERO_TOP_OFFSET + y * 0.18}px, 0)`;
              }
            };
            window.addEventListener("scroll", onHeroScroll, { passive: true });
            cleanups.push(() => window.removeEventListener("scroll", onHeroScroll));

          } else {
            // Swirl background renderer for Philosophy section
            const preset = className?.includes("infrastructure")
              ? infrastructure
              : className?.includes("fund")
              ? fund
              : philosophy;

            renderer = createSwirl(canvas, preset, {
              animated: !reduced,
              onReady: ready,
            });

            const band = canvas.closest("[data-swirl-band]");
            const sec = canvas.closest("section") || canvas.parentElement;
            let target = 0;
            let current = 0;
            let last = 0;
            let frame;

            // Smooth physics interpolation loop
            const animate = (time) => {
              if (disposed) return;
              const delta = Math.min((time - last) / 1000, 0.1);
              last = time;
              current += (target - current) * (1 - Math.exp(-delta * 3));
              
              if (Math.abs(target - current) < 0.0001) current = target;
              
              if (renderer && swirlAt) {
                renderer.setParams(swirlAt(current));
              }
              frame = current !== target ? requestAnimationFrame(animate) : 0;
            };

            // Calculates how far the user has scrolled past this section
            const update = () => {
              if (disposed) return;
              const y = window.scrollY;
              
              if (band && band.querySelectorAll("section").length > 1) {
                const top = band.getBoundingClientRect().top + y;
                const bandSections = Array.from(band.querySelectorAll("section"));
                const stops = [
                  top,
                  ...bandSections.map((el) => el.getBoundingClientRect().top + y + el.offsetHeight / 2),
                  top + band.offsetHeight,
                ];

                const center = y + window.innerHeight / 2;
                let i = 0;
                while (i < stops.length - 2 && center >= stops[i + 1]) i++;
                
                target = Math.max(
                  0,
                  Math.min(4, i + (center - stops[i]) / (stops[i + 1] - stops[i]))
                );
              } else if (sec) {
                const rect = sec.getBoundingClientRect();
                const vh = window.innerHeight;
                const totalTravel = rect.height + vh;
                const currentTravel = vh - rect.top;
                const progress = Math.max(0, Math.min(1, currentTravel / totalTravel));
                target = progress * 4;
              }

              if (!frame) {
                last = performance.now();
                frame = requestAnimationFrame(animate);
              }
            };

            update();
            window.addEventListener("scroll", update, { passive: true });
            window.addEventListener("resize", update);
            cleanups.push(() => {
              if (frame) cancelAnimationFrame(frame);
              window.removeEventListener("scroll", update);
              window.removeEventListener("resize", update);
            });
          }
        } catch (error) {
          console.warn("Visual effect unavailable:", error);
          if (canvas) canvas.hidden = true;
        }
      }
    );

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      cleanups.forEach((fn) => fn());
      renderer?.dispose?.();
    };
  }, [kind, className]);

  return (
    <canvas
      ref={ref}
      className={className}
      data-active="false"
      data-ready="false"
      aria-hidden="true"
    />
  );
}
