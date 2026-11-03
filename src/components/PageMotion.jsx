"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { setupStickySections } from "@/lib/sticky-sections";
export default function PageMotion({ home }) {
  const pathname = usePathname();
  useEffect(() => {
    const cleanupStickySections = setupStickySections();
    const groups = document.querySelectorAll(
      '[class*="group-module"], [class*="infrastructure-module"][class*="root"]',
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in-view", "");
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.06 },
    );
    groups.forEach((el) => observer.observe(el));
    document.querySelectorAll("main").forEach((el) => {
      el.id = "main";
    });
    const setDisclosure = (trigger, expanded) => {
      trigger.setAttribute("aria-expanded", String(expanded));
      trigger.parentElement.dataset.open = String(expanded);
      const panel = document.getElementById(trigger.getAttribute("aria-controls"));
      if (panel) panel.inert = !expanded;
    };
    const disclose = (event) => {
      const market = event.target.closest('[class*="places-module"][class*="trigger"]');
      const marketSection = market?.closest('section');
      if (marketSection?.querySelector('.markets-brand')) {
        marketSection.querySelectorAll('[class*="places-module"][class*="trigger"]').forEach((button) => {
          button.setAttribute('aria-pressed', String(button === market));
        });
      }
      const button = event.target.closest(
        'button[class*="disclosure-list"][aria-controls]',
      );
      if (!button) return;
      const expanded = button.getAttribute("aria-expanded") !== "true";
      const list = button.closest('[class*="disclosure-list-module__SPVnsG__root"]');
      if (expanded && list) {
        list
          .querySelectorAll('button[class*="disclosure-list"][aria-expanded="true"]')
          .forEach((trigger) => {
            if (trigger !== button) setDisclosure(trigger, false);
          });
      }
      setDisclosure(button, expanded);
    };
    document.addEventListener("click", disclose);
    const updateTheme = () => {
      const infrastructure = document.getElementById("infrastructure");
      const dark =
        home &&
        infrastructure &&
        infrastructure.getBoundingClientRect().top < innerHeight * 0.55;
      document.documentElement.dataset.theme = dark ? "dark" : "light";
      document.documentElement.dataset.headerTone =
        document.querySelector("main")?.dataset.headerTone || "light";
    };
    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    return () => {
      cleanupStickySections();
      observer.disconnect();
      document.removeEventListener("click", disclose);
      window.removeEventListener("scroll", updateTheme);
    };
  }, [pathname, home]);
  return null;
}
