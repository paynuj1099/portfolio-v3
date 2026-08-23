"use client";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Header } from "@/components/Header";
import { portfolio } from "@/config/portfolio";
import { HeroMetadata } from "./HeroMetadata";
import { HeroSocials } from "./HeroSocials";
import { JrSignature } from "./JrSignature";

const fadeUp = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 } };
export function Hero() {
  const reduceMotion = useReducedMotion();
  const [activeProgress, setActiveProgress] = useState(0);
  const [showSignatureIntro, setShowSignatureIntro] = useState(true);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      const headerBottom = document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect().bottom ?? 0;
      const referenceY = headerBottom + (window.innerHeight - headerBottom) * .42;
      const sectionAtReference = document.elementFromPoint(window.innerWidth / 2, referenceY)?.closest<HTMLElement>("section[id],main[id]");
      const referenceIndex = sectionAtReference
        ? portfolio.navigation.findIndex((item) => item.toLowerCase() === sectionAtReference.id)
        : -1;
      if (referenceIndex >= 0) {
        setActiveProgress(referenceIndex);
        return;
      }
      const current = portfolio.navigation.reduce<{ index: number; visible: number }>((active, item, index) => {
        const section = document.getElementById(item.toLowerCase());
        if (!section) return active;
        const rect = section.getBoundingClientRect();
        const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, headerBottom));
        return visible > active.visible ? { index, visible } : active;
      }, { index: 0, visible: -1 });
      setActiveProgress(current.index);
    };
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowSignatureIntro(false), reduceMotion ? 100 : 2500);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  useEffect(() => {
    if (!showSignatureIntro) return;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
    };
  }, [showSignatureIntro]);

  return <LayoutGroup id="signature-intro">
  <AnimatePresence>
    {showSignatureIntro && <motion.div className="signature-loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }} aria-label="Loading portfolio">
      <motion.div className="signature-loader-mark" layoutId="hero-signature" transition={{ layout: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }}><JrSignature animated /></motion.div>
    </motion.div>}
  </AnimatePresence>
  <Header />
  <main id="home" className="hero-shell">
  <div className="noise" aria-hidden="true" />
  <motion.div className="technical-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35, duration: .8 }}><HeroMetadata /></motion.div>
  <section className="hero-content" aria-labelledby="hero-title">
    <motion.div className="eyebrow" {...fadeUp} transition={{ delay: .45, duration: .45 }}>{portfolio.hero.eyebrow} <i /></motion.div>
    <h1 id="hero-title" className="hero-name" aria-label={portfolio.name}>
      <span className="name-mask"><motion.span {...fadeUp} transition={{ delay: .58, duration: .55 }}>{portfolio.firstName}</motion.span></span>
      <span className="name-mask surname"><motion.span {...fadeUp} transition={{ delay: .7, duration: .55 }}>{portfolio.lastName}</motion.span></span>
      {!showSignatureIntro && <motion.span className="signature" layoutId="hero-signature" initial={{ rotate: 0 }} animate={{ rotate: -2 }} transition={{ layout: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }, rotate: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }}><JrSignature animated={false} /></motion.span>}
    </h1>
    <motion.div className="role" {...fadeUp} transition={{ delay: 1.08, duration: .45 }}><i /><span>{portfolio.role}</span><i /></motion.div>
    <motion.p className="description" {...fadeUp} transition={{ delay: 1.2, duration: .45 }}>{portfolio.hero.description.map((line) => <span key={line}>{line}<br /> </span>)}</motion.p>
    <motion.div className="cta-row" {...fadeUp} transition={{ delay: 1.32, duration: .45 }}><a className="button button-primary" href={portfolio.hero.primaryCta.href}>{portfolio.hero.primaryCta.label} <ArrowUpRight size={19} /></a><a className="button button-secondary" href={portfolio.cvPath} download>{portfolio.hero.secondaryCta.label} <Download size={18} /></a></motion.div>
  </section>
  <motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: .5 }}><HeroSocials /><div className="scroll-indicator">{portfolio.hero.scrollLabel} <ArrowDown size={17} /></div></motion.div>
  <span className="corner corner-bl" aria-hidden="true" /><span className="corner corner-br" aria-hidden="true" />
</main>
  <div className="progress" aria-hidden="true">
    <div className="progress-track"><motion.i className="progress-fill" animate={{ scaleX: activeProgress / Math.max(1, portfolio.navigation.length - 1) }} transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }} /></div>
    {portfolio.navigation.map((_, index) => <span className={index === activeProgress ? "active" : ""} key={index}>{String(index + 1).padStart(2, "0")}</span>)}
  </div>
</LayoutGroup>; }
