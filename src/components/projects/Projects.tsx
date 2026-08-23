"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/config/portfolio";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(min-width: 1101px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ scrollTrigger: { trigger: section, start: "top 72%", once: true } })
          .from(".projects-kicker", { autoAlpha: 0, y: 14, duration: .42, ease: "power2.out" })
          .from(".projects-intro h2 span", { autoAlpha: 0, y: 28, duration: .58, stagger: .08, ease: "power3.out" }, "-=.2")
          .from(".projects-all", { autoAlpha: 0, y: 14, duration: .42, ease: "power2.out" }, "-=.25")
          .from(".projects-scroll-hint", { autoAlpha: 0, y: 10, duration: .38, ease: "power2.out" }, "-=.2")
          .from(".projects-intro-detail", { autoAlpha: 0, duration: .5, ease: "power2.out" }, "-=.3");

        const track = section.querySelector<HTMLElement>(".projects-grid");
        const viewport = section;
        if (!track || !viewport) return;
        const getDistance = () => {
          return Math.max(0, track.scrollWidth - viewport.clientWidth);
        };
        const horizontalTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: .8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
          gsap.from(card, {
            autoAlpha: 0,
            x: index === 0 ? 0 : 36,
            y: index === 0 ? 24 : 0,
            duration: .62,
            ease: "power3.out",
            scrollTrigger: index === 0
              ? { trigger: section, start: "top 72%", once: true }
              : { trigger: card, containerAnimation: horizontalTween, start: "left 88%", once: true },
          });
        });
      });

      media.add("(max-width: 1100px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
          gsap.from(card, { autoAlpha: 0, y: 24, duration: .62, delay: index * .06, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%", once: true } });
        });
      });
    }, section);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 3200);
    const refreshOnLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", refreshOnLoad);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refreshOnLoad);
      media.revert();
      context.revert();
    };
  }, []);

  return <section ref={sectionRef} id="projects" className="projects-shell" aria-labelledby="projects-title">
    <div className="noise" aria-hidden="true" />
    <div className="projects-grid">
      <header className="projects-intro">
        <div className="projects-kicker"><span>04. / Featured Work</span><i /></div>
        <h2 id="projects-title"><span>SELECTED</span><span>PROJECTS</span></h2>
        <a className="projects-all" href={portfolio.projectsArchiveUrl} target="_blank" rel="noopener noreferrer">VIEW ALL PROJECTS <ArrowUpRight size={17} /></a>
        <div className="projects-scroll-hint"><span>SCROLL TO EXPLORE</span><i><b /></i><ArrowRight size={16} /></div>
        <div className="projects-intro-detail" aria-hidden="true"><i /><b /><span>＋</span></div>
      </header>

      <div className="projects-cards-viewport">
        <div className="projects-cards-track">
      {portfolio.featuredProjects.map((project, index) => <article
        className="project-card"
        key={project.number}
      >
        <div className={`project-preview project-preview-${index + 1}`}>
          <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 760px) 92vw, (max-width: 1180px) 44vw, 65vw" onLoad={() => ScrollTrigger.refresh()} draggable={false} />
        </div>
        <div className="project-content">
          <span className="project-category">{project.category}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <footer className="project-footer">
            <ul aria-label={`${project.title} technologies`}>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
            <a className="project-link" href={project.liveUrl} target={project.liveUrl.startsWith("http") ? "_blank" : undefined} rel={project.liveUrl.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={`Open ${project.title}`}><ArrowUpRight size={19} /></a>
          </footer>
        </div>
      </article>)}
        </div>
      </div>
    </div>
  </section>;
}
