"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { usePathname } from "next/navigation";
const primary = [
  ["UX Hub", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Product", "/product"],
  ["Contact", "/contact"],
];
const secondary = [
  ["Product Growth", "/product-growth"],
  ["E-commerce Growth", "/e-commerce-growth"],
  ["Digital Experience", "/digital-experience"],
];

const footerNavigation = [
  ["Insights", "/insights"],
  ["India ↔ KSA", "/markets"],
];

const productChildren = [["Price Intelligence", "/product/price-intelligence"]];
export default function Header() {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [closing, setClosing] = useState(false);
  const closingRef = useRef(false);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const pathname = usePathname();

  const close = useCallback(() => {
    if (closingRef.current || !open) return;
    closingRef.current = true;
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
      closingRef.current = false;
      trigger.current?.focus();
    }, 400);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector("button")?.focus();
    const key = (e) => {
      if (e.key === "Escape") {
        close();
      }
      if (e.key === "Tab") {
        const all = dialog.current?.querySelectorAll("a,button");
        const first = all[0],
          last = all[all.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", key);
    };
  }, [open, close]);
  return (
    <>
      <header className={`site-header${pathname === "/" ? " home-header" : ""}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Link href="/" className="site-brand" aria-label="UX Hub home" onClick={close}>
          <BrandLogo />
        </Link>
        <button
          ref={trigger}
          className="menu-trigger"
          aria-haspopup="dialog"
          aria-expanded={open && !closing}
          aria-controls="site-menu"
          onClick={() => {
            if (closingRef.current) return;
            setOpen(true);
          }}
        >
          Menu
        </button>
      </header>
      {open && (
        <div
          className={`menu-layer${closing ? " menu-layer-closing" : ""}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={dialog}
            className={`menu-panel${closing ? " menu-panel-closing" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            id="site-menu"
          >
            <button className="menu-close" onClick={close}>
              Close
            </button>
            <nav>
              <ul className="menu-primary">
                {primary.map(([label, href]) => (
                  <li key={href}>
                    {href === "/services" || href === "/product" ? (
                      <button
                        className="menu-parent-trigger"
                        type="button"
                        aria-expanded={submenuOpen === href}
                        onClick={() => setSubmenuOpen(submenuOpen === href ? null : href)}
                      >
                        <span>{label}</span>
                        <span className="menu-parent-chevron" aria-hidden="true">⌄</span>
                      </button>
                    ) : (
                      <Link
                        href={href}
                        onClick={close}
                        aria-current={pathname === href ? "page" : undefined}
                      >
                        {label}
                      </Link>
                    )}
                    {href === "/services" && (
                      <ul className={`menu-submenu${submenuOpen === href ? " menu-submenu-open" : ""}`} aria-label="Services submenu">
                        {secondary.map(([childLabel, childHref]) => (
                          <li key={childHref}>
                            <Link href={childHref} onClick={close} aria-current={pathname === childHref ? "page" : undefined}>
                              {childLabel}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {href === "/product" && (
                      <ul className={`menu-submenu${submenuOpen === href ? " menu-submenu-open" : ""}`} aria-label="Product submenu">
                        {productChildren.map(([childLabel, childHref]) => (
                          <li key={childHref}>
                            <Link href={childHref} onClick={close} aria-current={pathname === childHref ? "page" : undefined}>
                              {childLabel}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <ul className="menu-secondary">
                {footerNavigation.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} onClick={close}>
                      <span className="menu-secondary-label">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
