"use client";

import Image from "next/image";
import { CalendarDays, Code2, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolio } from "@/config/portfolio";

export function About() {
  const reduceMotion = useReducedMotion();
  const { about } = portfolio;
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .2 },
    transition: { duration: reduceMotion ? 0 : .65, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return <section id="about" className="about-shell">
    <div className="noise" aria-hidden="true" />
    <div className="about-layout" aria-labelledby="about-title">
      <motion.div className="about-portrait-frame" {...reveal()}>
        <div className="about-portrait-shape">
          <div className="about-portrait-clip">
            <Image className="about-portrait" src={`${about.profileImage}?v=${about.profileImageVersion}`} alt={`Portrait of ${portfolio.name} ${portfolio.suffix}`} fill sizes="(max-width: 760px) 88vw, (max-width: 1180px) 42vw, 28vw" loading="eager" unoptimized draggable={false} />
          </div>
          <Image className="about-profile-frame-art" src={about.profileFrameImage} alt="" fill sizes="(max-width: 760px) 88vw, (max-width: 1180px) 42vw, 28vw" loading="eager" aria-hidden="true" draggable={false} />
          <span className="about-profile-index">PROFILE.PNG</span>
        </div>
      </motion.div>

      <motion.div className="about-statement" {...reveal(.1)}>
        <div className="about-kicker"><span>{about.kicker}</span><i /></div>
        <h1 id="about-title">{about.heading.line1}<br />{about.heading.line2}<br />{about.heading.line3Prefix} <em>{about.heading.highlight1}</em> {about.heading.line3Suffix}<br /><em>{about.heading.highlight2}</em> {about.heading.line4Suffix}</h1>
        <Image className="about-signature" src={`${about.signatureImage}?v=${about.signatureImageVersion}`} alt={`${portfolio.name} ${portfolio.suffix} signature`} width={580} height={150} unoptimized draggable={false} />
      </motion.div>

      <motion.div className="about-details" {...reveal(.2)}>
        <div className="about-details-heading"><i /><span>{about.detailsHeading}</span></div>
        {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="about-facts">
          <article><Code2 /><strong>{about.facts.role.label}</strong><span>{about.facts.role.value}</span></article>
          <article><MapPin /><strong>{about.facts.location.label}</strong><span>{about.facts.location.value}</span></article>
          <article><CalendarDays /><strong>{about.facts.experience.label}</strong><span>{about.facts.experience.value}</span></article>
        </div>
      </motion.div>
    </div>
    <motion.section className="about-technologies" aria-label="Core technologies" {...reveal(.15)}>
      <div className="technology-marquee">
        <div className="technology-track">s
          {[0, 1].map((copy) => <ul key={copy} aria-hidden={copy === 1}>{about.technologies.map((technology) =>
            <li key={`${copy}-${technology.name}`}><Image className="technology-logo" src={technology.logo} alt="" width={21} height={21} aria-hidden="true" draggable={false} /><span>{technology.name}</span></li>
          )}</ul>)}
        </div>
      </div>
    </motion.section>
  </section>;
}
