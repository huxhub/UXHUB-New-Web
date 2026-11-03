"use client";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "./BrandLogo";
export default function BrandIntro() {
  const root = useRef(null),
    mark = useRef(null);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    const release = () => {
      document.documentElement.removeAttribute("data-entry");
      document.documentElement.removeAttribute("data-intro-playing");
      window.dispatchEvent(new Event("uxhub:intro-finished"));
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.current.style.display = "none";
      release();
      return;
    }
    document.documentElement.setAttribute("data-entry", "");
    document.documentElement.setAttribute("data-intro-playing", "");
    let docking;
    const complete = () => {
      release();
      setFinished(true);
    };
    const start = setTimeout(() => {
      document.documentElement.removeAttribute("data-entry");
      root.current?.classList.add("docking");
      const target = document
        .querySelector(".site-brand svg")
        ?.getBoundingClientRect();
      const current = mark.current?.getBoundingClientRect();
      if (target && current) {
        docking = mark.current.animate(
          [
            { transform: "translate(0,0) scale(1)" },
            {
              transform: `translate(${target.x + target.width / 2 - current.x - current.width / 2}px,${target.y + target.height / 2 - current.y - current.height / 2}px) scale(${target.width / current.width})`,
            },
          ],
          { duration: 800, easing: "cubic-bezier(.5,0,0,1)", fill: "forwards" },
        );
        docking.onfinish = complete;
      } else {
        complete();
      }
    }, 2100);
    return () => {
      clearTimeout(start);
      if (docking) {
        docking.onfinish = null;
        docking.cancel();
      }
      release();
    };
  }, []);
  if (finished) return null;
  return (
    <div ref={root} className="chrome-intro uxhub-intro" aria-hidden="true">
      <div ref={mark} className="uxhub-intro-mark">
        <BrandLogo className="uxhub-intro-logo" />
        <div className="uxhub-intro-sheen" />
      </div>
    </div>
  );
}
