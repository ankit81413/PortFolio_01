'use client';

import type { CSSProperties } from "react";
import { useEffect } from "react";
import { BsFillHexagonFill, BsFillOctagonFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { FaDiamond } from "react-icons/fa6";
import { IoMdFlower } from "react-icons/io";
import { TbCapsuleFilled } from "react-icons/tb";

type CursorVisualProps = {
  isHovering: boolean;
};

export function CursorVisual({ isHovering }: CursorVisualProps) {
  const geminiIcons = [
    { key: "hexagon", Icon: BsFillHexagonFill },
    { key: "capsule", Icon: TbCapsuleFilled },
    { key: "star", Icon: FaStar },
    { key: "flower", Icon: IoMdFlower },
    { key: "diamond", Icon: FaDiamond },
    { key: "octagon", Icon: BsFillOctagonFill },
  ];

  useEffect(() => {
    console.log(isHovering);
  }, [isHovering]);

  return (
    <div className={`cursor-visual${isHovering ? " is-hovering" : ""}`}>
      <span className="cursor-gemini-outer" aria-hidden="true">
        <span className="cursor-gemini-spin">
          {geminiIcons.map((icon, index) => (
            <icon.Icon
              key={icon.key}
              className="cursor-gemini-icon"
              style={{ "--icon-delay": `${index}s` } as CSSProperties}
            />
          ))}
        </span>
      </span>
      <span className="invert-cursor-lobe" />
    </div>
  );
}
 
