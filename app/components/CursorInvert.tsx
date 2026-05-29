'use client';

import { useEffect, useRef } from "react";

export function CursorInvert() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) {
      return;
    }

    const setCursorPosition = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      setCursorPosition(mouseX, mouseY);
    };

    setCursorPosition(mouseX, mouseY);
    document.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="invert-cursor-circle"
    >
      <span className="invert-cursor-core" />
    </div>
  );
}
