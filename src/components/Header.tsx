"use client";
import { useEffect, useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { portfolio } from "@/config/portfolio";
import { DoodleEyes } from "@/components/DoodleEyes";

const nav = portfolio.navigation;
const navHref = (item: string) => item === "Home" ? "/#home" : `/#${item.toLowerCase()}`;
const MotionLink = motion.create(Link);
export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, item: string) => {
    setMenuOpen(false);
    if (pathname !== "/") return;
    const sectionId = item.toLowerCase();
    const section = document.getElementById(sectionId);
    if (!section) return;
    event.preventDefault();
    window.history.pushState(null, "", navHref(item));
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (pathname !== "/") return;
    let frame = 0;
    const updateActiveSection = () => {
      const sections = portfolio.navigation
        .map((item) => item.toLowerCase())
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));
      const headerBottom = document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect().bottom ?? 0;
      const referenceY = headerBottom + (window.innerHeight - headerBottom) * .42;
      const sectionAtReference = document.elementFromPoint(window.innerWidth / 2, referenceY)?.closest<HTMLElement>("section[id],main[id]");
      if (sectionAtReference && sections.includes(sectionAtReference)) {
        setActiveSection(sectionAtReference.id);
        return;
      }
      const current = sections.reduce<{ id: string; visible: number }>((active, section) => {
        const rect = section.getBoundingClientRect();
        const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, headerBottom));
        return visible > active.visible ? { id: section.id, visible } : active;
      }, { id: "home", visible: -1 });
      setActiveSection(current.id);
    };
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [menuOpen]);

  return <motion.header className="site-header" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .55 }}>
    <Link className="logo" href="/" aria-label="Rolando Remolacio Jr. home">JR.</Link>
    <nav className="desktop-nav" aria-label="Main navigation">{nav.map((item, index) => <Link className={pathname === "/" && activeSection === item.toLowerCase() ? "active" : ""} href={navHref(item)} key={item} onClick={(event) => handleSectionClick(event, item)}><span>{String(index + 1).padStart(2, "0")}.</span>{item}</Link>)}</nav>
    <div className="header-actions"><a className="connect-button" href={`mailto:${portfolio.socials.email}`}>{portfolio.connectLabel} <ArrowUpRight size={18} /></a><DoodleEyes /><button className={`menu-button${menuOpen ? " menu-open" : ""}`} type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((open) => !open)}><span className="burger-lines" aria-hidden="true"><i /><i /><i /></span></button></div>
    <AnimatePresence>
      {menuOpen && <>
        <motion.button className="mobile-menu-backdrop" type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        <motion.nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .32, ease: [0.22, 1, 0.36, 1] }}>
          <span className="mobile-menu-label">NAVIGATION</span>
          <div>{nav.map((item, index) => <MotionLink className={pathname === "/" && activeSection === item.toLowerCase() ? "active" : ""} href={navHref(item)} key={item} onClick={(event) => handleSectionClick(event, item)} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .04 * index }}><span>{String(index + 1).padStart(2, "0")}.</span>{item}</MotionLink>)}</div>
          <a className="mobile-connect" href={`mailto:${portfolio.socials.email}`}>{portfolio.connectLabel} <ArrowUpRight size={18} /></a>
        </motion.nav>
      </>}
    </AnimatePresence>
  </motion.header>;
}
