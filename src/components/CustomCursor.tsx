"use client";

import { useEffect, useRef } from "react";

type CursorMode = "default" | "link" | "text" | "active";

function getCursorMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) return "default";
  if (target.closest("a,button,[role='button'],.about-facts article,.about-technologies li,.about-statement h1 em:first-of-type")) return "link";
  if (target.closest("input,textarea,[contenteditable='true'],.description,.about-details p")) return "text";
  return "default";
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let pointerX = -100;
    let pointerY = -100;
    let cursorX = pointerX;
    let cursorY = pointerY;
    let mode: CursorMode = "default";
    let modalActive = false;
    let animationFrame = 0;

    const render = () => {
      const easing = modalActive ? 1 : mode === "default" ? .42 : .58;
      cursorX += (pointerX - cursorX) * easing;
      cursorY += (pointerY - cursorY) * easing;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      animationFrame = window.requestAnimationFrame(render);
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      document.documentElement.dataset.customCursor = "true";
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursor.dataset.visible = "true";
      modalActive = event.target instanceof Element && Boolean(event.target.closest(".certificate-modal"));
      mode = getCursorMode(event.target);
      if (cursor.dataset.mode !== "active") cursor.dataset.mode = mode;
    };
    const handleMouseMove = (event: MouseEvent) => {
      document.documentElement.dataset.customCursor = "true";
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursor.dataset.visible = "true";
      modalActive = event.target instanceof Element && Boolean(event.target.closest(".certificate-modal"));
      mode = getCursorMode(event.target);
      if (cursor.dataset.mode !== "active") cursor.dataset.mode = mode;
    };
    const handlePointerDown = () => { cursor.dataset.mode = "active"; };
    const handlePointerUp = (event: PointerEvent) => {
      mode = getCursorMode(event.target);
      cursor.dataset.mode = mode;
    };
    const handlePointerLeave = () => { cursor.dataset.visible = "false"; };

    animationFrame = window.requestAnimationFrame(render);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      delete document.documentElement.dataset.customCursor;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" data-mode="default" aria-hidden="true">
    <span className="cursor-default"><i /></span>
    <span className="cursor-link"><svg viewBox="0 0 28 34"><path d="M4 2v29l9-10h11L4 2Z" /></svg><i /></span>
    <span className="cursor-active"><i /></span>
    <span className="cursor-text" />
  </div>;
}
