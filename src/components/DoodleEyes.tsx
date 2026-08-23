"use client";

import { useEffect, useRef } from "react";

export function DoodleEyes() {
  const eyesRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const eyes = eyesRef.current;
    if (!eyes || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationFrame = 0;
    const followPointer = (event: PointerEvent) => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        eyes.querySelectorAll<HTMLElement>(".doodle-eye").forEach((eye) => {
          const bounds = eye.getBoundingClientRect();
          const angle = Math.atan2(event.clientY - (bounds.top + bounds.height / 2), event.clientX - (bounds.left + bounds.width / 2));
          eye.style.setProperty("--pupil-x", `${Math.cos(angle) * 3.5}px`);
          eye.style.setProperty("--pupil-y", `${Math.sin(angle) * 4.5}px`);
        });
      });
    };

    window.addEventListener("pointermove", followPointer, { passive: true });
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", followPointer);
    };
  }, []);

  return <span className="doodle-eyes" ref={eyesRef} aria-hidden="true"><span className="doodle-eye"><i /></span><span className="doodle-eye"><i /></span></span>;
}
