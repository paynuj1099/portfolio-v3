"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Award, BriefcaseBusiness, GraduationCap, MapPin, Maximize2, Minimize2, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { portfolio } from "@/config/portfolio";

export function Experience() {
  const reduceMotion = useReducedMotion();
  const [expandedCertificate, setExpandedCertificate] = useState<number | null>(null);
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .16 },
    transition: { duration: reduceMotion ? 0 : .62, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  useEffect(() => {
    if (expandedCertificate === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpandedCertificate(null);
    };
    const lockDesktopScroll = window.matchMedia("(min-width: 701px)").matches;
    const previousOverflow = document.body.style.overflow;
    if (lockDesktopScroll) document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [expandedCertificate]);

  return <><section id="experience" className="experience-shell" aria-labelledby="experience-title">
    <div className="noise" aria-hidden="true" />
    <div className="experience-layout">
      <motion.header className="experience-intro" {...reveal()}>
        <div className="experience-kicker"><span>03. / Experience</span><i /></div>
        <h2 id="experience-title"><span>WORK</span><span>HISTORY</span></h2>
        <p>Building reliable products across AI, enterprise software, and manufacturing systems.</p>
        <div className="experience-summary">
          <span><b>{portfolio.experience}</b>Professional experience</span>
          <span><b>{String(portfolio.experiences.length).padStart(2, "0")}</b>Roles completed</span>
        </div>
      </motion.header>

      <div className="experience-timeline">
        {portfolio.experiences.map((experience, index) => <motion.article className="experience-card" key={`${experience.company}-${experience.role}`} {...reveal(index * .08)}>
          <div className="experience-card-index"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
          <div className="experience-card-main">
            <span className="experience-company">{experience.company}</span>
            <h3>{experience.role}</h3>
            <p>{experience.description}</p>
          </div>
          <div className="experience-card-meta">
            <span><BriefcaseBusiness size={15} />{experience.period}</span>
            <span><MapPin size={15} />{experience.arrangement}</span>
          </div>
        </motion.article>)}

        <motion.aside className="education-card" {...reveal(.18)}>
          <div className="education-icon"><GraduationCap size={23} /></div>
          <div><span>EDUCATION / {portfolio.education.graduated}</span><h3>{portfolio.education.degree}</h3><p>{portfolio.education.school}</p></div>
          <p>{portfolio.education.description}</p>
        </motion.aside>

        <motion.section className="certifications" aria-labelledby="certifications-title" {...reveal(.22)}>
          <header><div><Award size={18} /><span id="certifications-title">CERTIFICATIONS</span></div><b>{String(portfolio.certifications.length).padStart(2, "0")} CREDENTIALS</b></header>
          <div className="certifications-grid">
            {portfolio.certifications.map((certification, index) => <article className="certification-card" key={certification.title}>
              <span className="certification-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="certification-type">{certification.type}</span>
              <h3>{certification.title}</h3>
              <p>{certification.issuer}</p>
              <footer><span>{certification.detail}</span>{certification.date && <time>{certification.date}</time>}</footer>
              <button className="certification-toggle" type="button" aria-expanded={expandedCertificate === index} aria-controls={`certificate-image-${index}`} onClick={() => setExpandedCertificate((current) => current === index ? null : index)}>
                <span>{expandedCertificate === index ? "Hide Certificate" : "View Certificate"}</span>{expandedCertificate === index ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <div id={`certificate-image-${index}`} className="certificate-image" data-expanded={expandedCertificate === index} aria-hidden={expandedCertificate !== index}>
                <div className="certificate-image-clip"><div className="certificate-image-media"><Image src={certification.image} alt={`${certification.title} certificate`} fill sizes="(max-width: 700px) calc(100vw - 84px), 38vw" draggable={false} /></div></div>
              </div>
            </article>)}
          </div>
        </motion.section>
      </div>
    </div>
  </section>
    <AnimatePresence>
      {expandedCertificate !== null && <motion.div className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-modal-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .2 }}>
        <button className="certificate-modal-backdrop" type="button" aria-label="Close certificate preview" onClick={() => setExpandedCertificate(null)} />
        <motion.div className="certificate-modal-panel" initial={{ opacity: 0, scale: .975, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .985, y: 8 }} transition={{ duration: reduceMotion ? 0 : .28, ease: [0.22, 1, 0.36, 1] }}>
          <header><div><span>0{expandedCertificate + 1} / CERTIFICATE</span><h3 id="certificate-modal-title">{portfolio.certifications[expandedCertificate].title}</h3></div><button type="button" aria-label="Close certificate preview" onClick={() => setExpandedCertificate(null)}><X size={20} /></button></header>
          <div className="certificate-modal-image"><Image src={portfolio.certifications[expandedCertificate].image} alt={`${portfolio.certifications[expandedCertificate].title} certificate`} fill sizes="min(88vw, 1180px)" priority draggable={false} /></div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>;
}
