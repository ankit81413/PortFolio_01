'use client';

import { useEffect, useRef, useState } from "react";
import { CursorVisual } from "./CursorVisual";

export function CursorInvert() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const hoveredElementRef = useRef<Element | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const HOVER_SCALE = 2.5;

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) {
      return;
    }

    const setCursorPosition = (x: number, y: number, scale = 1) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
    };
    const applyHoverState = (hovered: boolean) => {
      cursor.classList.toggle("is-hovered", hovered);
      setIsHovering((prev) => (prev === hovered ? prev : hovered));
    };

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onPointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      const target = event.target;
      if (!(target instanceof Element)) {
        const hovered = Boolean(hoveredElementRef.current);
        setCursorPosition(mouseX, mouseY, hovered ? HOVER_SCALE : 1);
        applyHoverState(hovered);
        return;
      }

      const interactiveElement = target.closest(
        "a, button, input, select, textarea, label, summary, [role='button'], [tabindex]"
      );

      if (interactiveElement !== hoveredElementRef.current) {
        if (hoveredElementRef.current) {
          console.log("unhovered");
        }

        if (interactiveElement) {
          console.log("hovered");
        }

        hoveredElementRef.current = interactiveElement;
      }

      const hovered = Boolean(interactiveElement);
      setCursorPosition(mouseX, mouseY, hovered ? HOVER_SCALE : 1);
      applyHoverState(hovered);
    };

    setCursorPosition(mouseX, mouseY, 1);
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      hoveredElementRef.current = null;
    };
  }, []);

  return (
    <div ref={cursorRef} aria-hidden="true" className="invert-cursor-eight">
      <CursorVisual isHovering={isHovering} />
    </div>
  );
}
