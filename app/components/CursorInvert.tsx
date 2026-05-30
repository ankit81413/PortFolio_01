'use client';

import { useEffect, useRef } from "react";

export function CursorInvert() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const hoveredElementRef = useRef<Element | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) {
      return;
    }

    const setCursorPosition = (x: number, y: number, scale = 1) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onPointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      const target = event.target;
      if (!(target instanceof Element)) {
        setCursorPosition(mouseX, mouseY, hoveredElementRef.current ? 2 : 1);
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

      setCursorPosition(mouseX, mouseY, interactiveElement ? 2 : 1);
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
      <span className="invert-cursor-lobe" />
      <span className="invert-cursor-lobe" />
    </div>
  );
}
