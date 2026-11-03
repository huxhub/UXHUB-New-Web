"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// The reference uses independent entering/leaving wipe layers. Keeping each
// layer alive through its exit also handles quick pointer reversals smoothly.
const buttonSelector =
  '[class*="wipe-button-module"][class$="__root"], a[class*="wipe-button-module__-tlSna__root"]';
const linkSelector = '[class*="wipe-link-module__rlo5oW__root"]';
const rowSelector = '[class*="action-row-module__cLECvq__fill"]';
const selector = [
  buttonSelector,
  linkSelector,
  rowSelector,
  ".menu-primary a",
  ".menu-secondary a",
  ".menu-contacts a",
  'button[class*="disclosure-list-module__SPVnsG__trigger"]',
  'button[class*="places-module__5EbJ9W__trigger"]',
].join(",");
const barClass = "wipe-bar-module____67Iq__bar";
const fillClass = "wipe-bar-module____67Iq__fill";
const exitClass = "wipe-bar-module____67Iq__exiting";

export default function HoverEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const records = new Map();
    const timers = new Set();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const later = (fn, delay) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        fn();
      }, delay);
      timers.add(timer);
    };
    const createBar = (host, { content, position } = {}) => {
      const bar = document.createElement("span");
      bar.className = `${barClass} wipe-bar-module____67Iq__${position || "center"}`;
      bar.setAttribute("aria-hidden", "true");
      bar.dataset.hoverWipe = "";
      if (reduced.matches)
        bar.classList.add("wipe-bar-module____67Iq__instant");
      const fill = document.createElement("span");
      fill.className = fillClass;
      if (content) fill.append(content);
      bar.append(fill);
      host.append(bar);
      return bar;
    };
    const newHost = (element, className) => {
      const host = document.createElement("span");
      host.className = className;
      host.setAttribute("aria-hidden", "true");
      host.dataset.hoverHost = "";
      element.append(host);
      return host;
    };
    const start = (element) => {
      const layers = [];
      if (element.matches(buttonSelector)) {
        const host = element.querySelector(
          '[class*="wipe-button-module__-tlSna__sweep"]',
        );
        const content = element.querySelector(
          '[class*="wipe-button-module__-tlSna__content"]',
        );
        if (host && content) {
          const ghost = content.cloneNode(true);
          ghost.classList.add("wipe-button-module__-tlSna__ghost");
          ghost.removeAttribute("id");
          ghost
            .querySelectorAll("[id]")
            .forEach((el) => el.removeAttribute("id"));
          layers.push(createBar(host, { content: ghost }));
        }
      } else if (element.matches(linkSelector + "," + rowSelector)) {
        const host = element.querySelector('[class$="__sweep"]');
        if (host) layers.push(createBar(host));
      } else if (element.matches(".menu-primary a, .menu-contacts a")) {
        for (const edge of ["top", "bottom"]) {
          const host = newHost(element, `hover-rule hover-rule-${edge}`);
          layers.push(createBar(host));
        }
      } else if (element.matches(".menu-secondary a")) {
        const label = element.querySelector(".menu-secondary-label");
        if (label) layers.push(createBar(newHost(label, "hover-underline")));
      } else {
        const row = element.closest("li");
        if (row) {
          const rules = row.querySelectorAll(
            '[class*="wipe-rule-module__xCEeMq__rule"]',
          );
          if (rules.length)
            rules.forEach((rule) => layers.push(createBar(rule)));
          else
            layers.push(createBar(newHost(row, "hover-rule hover-rule-top")));
        }
      }
      return layers;
    };
    const discard = (bar) => {
      const host = bar.parentElement;
      bar.remove();
      if (host?.hasAttribute("data-hover-host") && !host.childElementCount)
        host.remove();
    };
    const transition = (element, source, active) => {
      let record = records.get(element);
      if (!record) {
        if (!active) return;
        record = { pointer: false, focus: false, layers: [] };
        records.set(element, record);
      }
      const wasActive = record.pointer || record.focus;
      record[source] = active;
      const isActive = record.pointer || record.focus;
      if (wasActive === isActive) return;
      if (isActive) record.layers = start(element);
      else {
        const leaving = record.layers;
        record.layers = [];
        leaving.forEach((bar) => {
          if (reduced.matches) discard(bar);
          else {
            bar.classList.add(exitClass);
            // Matches --duration-slower; exit moves off the right edge.
            later(() => discard(bar), 520);
          }
        });
        if (!record.pointer && !record.focus) records.delete(element);
      }
    };
    const handler = (event) => {
      if (event.pointerType === "touch") return;
      const target =
        event.target instanceof Element ? event.target.closest(selector) : null;
      if (
        !target ||
        (event.relatedTarget instanceof Node &&
          target.contains(event.relatedTarget))
      )
        return;
      const focusEvent = event.type.startsWith("focus");
      const entering = event.type === "pointerover" || event.type === "focusin";
      if (focusEvent && entering && !target.matches(":focus-visible")) return;
      transition(target, focusEvent ? "focus" : "pointer", entering);
    };
    for (const event of ["pointerover", "pointerout", "focusin", "focusout"])
      document.addEventListener(event, handler);
    return () => {
      for (const event of ["pointerover", "pointerout", "focusin", "focusout"])
        document.removeEventListener(event, handler);
      timers.forEach(clearTimeout);
      document.querySelectorAll("[data-hover-wipe]").forEach(discard);
      records.clear();
    };
  }, [pathname]);
  return null;
}
