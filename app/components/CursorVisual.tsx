'use client';

import { useEffect } from "react";

type CursorVisualProps = {
  isHovering: boolean;
};

export function CursorVisual({ isHovering }: CursorVisualProps) {
  useEffect(() => {
    console.log(isHovering);
  }, [isHovering]);

  return (
    <div className={`cursor-visual${isHovering ? " is-hovering" : ""}`}>
      <span className="cursor-gemini-outer" aria-hidden="true">
        <span className="cursor-gemini-shape" />
      </span>
      <span className={`invert-cursor-lobe ${isHovering ? " hidden" : ""}`} />
    </div>
  );
}
 
