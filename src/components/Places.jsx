"use client";
import { useEffect, useRef } from "react";
export default function Places({ className }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current,
      ctx = canvas.getContext("2d");
    if (!ctx) return;
    let city = "India",
      frame,
      disposed = false;
    const image = new Image();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = () => {
      if (!image.complete || !image.naturalWidth) return;
      const rect = canvas.getBoundingClientRect(),
        dpr = Math.min(devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = Math.max(
        rect.width / image.naturalWidth,
        rect.height / image.naturalHeight,
      );
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(
        image,
        (rect.width - image.naturalWidth * scale) / 2,
        (rect.height - image.naturalHeight * scale) / 2,
        image.naturalWidth * scale,
        image.naturalHeight * scale,
      );
      canvas.dataset.ready = "true";
    };
    image.onload = () => {
      if (disposed) return;
      draw();
      if (!reduced) {
        canvas.animate(
          [
            { opacity: 0, filter: "blur(8px)" },
            { opacity: 1, filter: "blur(0px)" },
          ],
          { duration: 700, easing: "ease-out" },
        );
      }
    };
    const choose = (event) => {
      const button = event.target.closest(
        '[class*="places-module"][class*="trigger"]',
      );
      if (!button) return;
      city = button.textContent.trim();
      document
        .querySelectorAll('[class*="places-module"][class*="trigger"]')
        .forEach((el) =>
          el.setAttribute("aria-pressed", String(el === button)),
        );
      image.src = "/uxhub/markets.png";
      canvas.setAttribute("aria-label", "UX Hub markets: " + city);
    };
    image.src = "/uxhub/markets.png";
    document.addEventListener("click", choose);
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    });
    observer.observe(canvas);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("click", choose);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className={className}
      aria-label="UX Hub markets: India and KSA"
      role="img"
    />
  );
}
