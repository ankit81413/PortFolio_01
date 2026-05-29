'use client';

import { useEffect, useRef, useState } from "react";

export function ProjectsStickyHeader() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const latestStickyRef = useRef(false);
  const projectsSectionTopRef = useRef(Number.POSITIVE_INFINITY);
  const isCooldownRef = useRef(false);
  const wasAtTopRef = useRef(false);
  const cooldownTimeoutRef = useRef<number | null>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const projectsSection = document.getElementById("projects-section");
    if (!projectsSection) return;

    const runOneSecondCooldown = () => {
      if (isCooldownRef.current) return;
      isCooldownRef.current = true;

      cooldownTimeoutRef.current = window.setTimeout(() => {
        isCooldownRef.current = false;
        setIsStuck((prev) => {
          const next = latestStickyRef.current;
          return prev === next ? prev : next;
        });
      }, 1000);
    };

    const onScrollOrResize = () => {
      const top = projectsSection.getBoundingClientRect().top;
      projectsSectionTopRef.current = top;

      const nextSticky = top <= 0;
      latestStickyRef.current = nextSticky;

      if (!isCooldownRef.current) {
        setIsStuck((prev) => (prev === nextSticky ? prev : nextSticky));
      }

      if (nextSticky && !wasAtTopRef.current) {
        runOneSecondCooldown();
      }

      wasAtTopRef.current = nextSticky;
    };

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (cooldownTimeoutRef.current !== null) {
        window.clearTimeout(cooldownTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isStuck) return;

    const id = window.requestAnimationFrame(() => {
      const header = headerRef.current;
      if (!header) return;
      const top = header.getBoundingClientRect().top;
      if (Math.abs(top) > 0.5) {
        window.scrollBy({ top, behavior: "auto" });
      }
    });

    return () => window.cancelAnimationFrame(id);
  }, [isStuck]);

  return (
    <>
      <div
        id="projects-sticky-header"
        ref={headerRef}
        className="sticky top-[0px] z-30 border-b border-black/70 bg-[#f3f3f3] py-8 transition-all duration-200 md:py-10"
      >
        <div className="flex items-end gap-4 md:gap-8">
          <svg
            aria-hidden="true"
            viewBox="0 0 120 120"
            className={`${isStuck ? "h-10 w-10 md:h-10 md:w-10" : "h-14 w-14 md:h-20 md:w-20"} transition-all duration-200`}
            fill="none"
          >
            <path
              d="M18 26H54C67.255 26 78 36.7452 78 50V92"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M58 72L78 92L98 72"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2
            className={`${isStuck ? "text-4xl md:text-5xl" : "text-6xl md:text-8xl"} font-semibold leading-none tracking-tight transition-all duration-200`}
          >
            Projects
          </h2>
        </div>
      </div>
    </>
  );
}
