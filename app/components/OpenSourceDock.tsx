"use client";

import { useEffect, useState, type RefObject } from "react";
import { BsCodeSlash } from "react-icons/bs";

type OpenSourceDockProps = {
  dockVisible: boolean;
  dockAnchorRef: RefObject<HTMLDivElement | null>;
};

type Position = {
  left: number;
  top: number;
};

const BADGE_WIDTH = 142;
const CIRCLE_SIZE = 44;
const VIEWPORT_EDGE = 50;
const DOCK_GAP = 8;

export default function OpenSourceDock({
  dockAnchorRef,
  dockVisible,
}: OpenSourceDockProps) {
  const [position, setPosition] = useState<Position | null>(null);
  const [hasJoinedDock, setHasJoinedDock] = useState(false);

  useEffect(() => {
    const getStartingPosition = (): Position => ({
      left: window.innerWidth - BADGE_WIDTH - VIEWPORT_EDGE,
      top: 120,
    });

    const updatePosition = () => {
      if (!dockVisible || !dockAnchorRef.current) {
        setPosition(getStartingPosition());
        return;
      }

      const dockBounds = dockAnchorRef.current.getBoundingClientRect();
      setPosition({
        left: Math.min(
          dockBounds.right + DOCK_GAP,
          window.innerWidth - CIRCLE_SIZE - 12,
        ),
        top: dockBounds.bottom - CIRCLE_SIZE - 41,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    const joinTimer = dockVisible
      ? window.setTimeout(() => setHasJoinedDock(true), 850)
      : undefined;
    const resetFrame = !dockVisible
      ? requestAnimationFrame(() => setHasJoinedDock(false))
      : undefined;

    return () => {
      window.removeEventListener("resize", updatePosition);
      if (joinTimer) window.clearTimeout(joinTimer);
      if (resetFrame) cancelAnimationFrame(resetFrame);
    };
  }, [dockAnchorRef, dockVisible]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetSection = document.getElementById("opensource");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`opensourcebadge fixed z-[90] transition-[left,top,opacity] duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        position ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={position ?? undefined}
    >
      <div className="relative inline-flex items-center justify-center">
        {/* Blurry Circles / Energy Auras */}
        <div className="absolute -inset-x-4 -inset-y-5 rounded-full overflow-hidden pointer-events-none opacity-90 energy-blur-container">
          {/* <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, #fb6704 0%, transparent 65%)",
              transformOrigin: "52% 48%",
              animation: "rotateEnergy 3.5s linear infinite",
            }}
          /> */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, #0316d9 0%, transparent 65%)",
              transformOrigin: "100% 52%",
              animation: "rotateEnergy 5.5s linear infinite reverse",
            }}
          />
          {/* <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, #f70399 0%, transparent 65%)",
              transformOrigin: "54% 46%",
              animation: "rotateEnergy 7.5s linear infinite",
            }}
          /> */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, #06b6d4 0%, transparent 65%)",
              transformOrigin: "46% 54%",
              animation: "rotateEnergy 9.5s linear infinite reverse",
            }}
          />
        </div>

        {/* Main Capsule Badge */}
        <a
          href="#opensource"
          onClick={handleScroll}
          aria-label="Open source"
          title="Open source"
          className={`group relative z-10 inline-flex h-11 items-center justify-center overflow-hidden border border-white/10 bg-[#09090b] text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] transition-[width,border-radius,padding,gap,transform,box-shadow] duration-500 ease-out hover:-translate-y-0.5 hover:border-purple-500/40 hover:shadow-[0_14px_35px_-5px_rgba(168,85,247,0.3)] active:translate-y-0 active:scale-95 ${
            hasJoinedDock
              ? "w-11 gap-0 rounded-full px-0"
              : "w-[142px] gap-2.5 rounded-full px-5"
          }`}
        >
          <span
            className={`whitespace-nowrap transition-[max-width,opacity,transform] duration-300 ${
              hasJoinedDock
                ? "max-w-0 -translate-x-2 opacity-0"
                : "max-w-28 translate-x-0 opacity-100"
            }`}
          >
            Open Source
          </span>
          <svg
            className={`h-3.5 fill-none stroke-zinc-400 stroke-[2.2] transition-[width,opacity,transform] duration-300 group-hover:stroke-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              hasJoinedDock ? "w-0 translate-x-2 opacity-0" : "w-3.5 opacity-100"
            }`}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
          <BsCodeSlash
            aria-hidden="true"
            className={`absolute text-lg transition-[transform,opacity] duration-300 ${
              hasJoinedDock
                ? "scale-100 opacity-100"
                : "scale-50 opacity-0"
            }`}
          />
        </a>
      </div>
    </div>
  );
}
