'use client';

import { useEffect, useState } from "react";
import { BsTerminalFill } from "react-icons/bs";
import { FuturisticTerminal } from "./FuturisticTerminal";

const DOCK_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about-section" },
  { label: "Projects", href: "#projects-section" },
  { label: "Experience", href: "#experience-section" },
  { label: "Contact", href: "#contact-section" },
];

export function SectionDock() {
  const [showDock, setShowDock] = useState(false);
  const [activeHref, setActiveHref] = useState("#top");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [terminalSession, setTerminalSession] = useState(0);

  useEffect(() => {
    const about = document.getElementById("about-section");
    if (!about) return;

    const gapBeforePush = 14;
    const startLineMobile = 86;
    const startLineDesktop = 108;
    const dockRevealOffset = 40;

    const updateVisibility = () => {
      const aboutTop = about.getBoundingClientRect().top;
      const startLine =
        (window.matchMedia("(min-width: 768px)").matches
          ? startLineDesktop
          : startLineMobile) + gapBeforePush;
      const pushAmount = Math.max(0, startLine - aboutTop);
      setShowDock(pushAmount >= dockRevealOffset);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const sectionTargets = DOCK_LINKS.map((link) => {
      if (link.href === "#top") {
        return { href: link.href, node: document.documentElement };
      }
      return { href: link.href, node: document.querySelector(link.href) };
    });

    const updateActiveSection = () => {
      const y = window.scrollY;
      if (y < 80) {
        setActiveHref("#top");
        return;
      }

      let current = "#top";
      for (const target of sectionTargets) {
        if (!target.node || target.href === "#top") continue;
        const rect = (target.node as Element).getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (y + 140 >= top) {
          current = target.href;
        }
      }
      setActiveHref(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <>
      <FuturisticTerminal
        key={terminalSession}
        isOpen={isTerminalOpen}
        isMinimized={isTerminalMinimized}
        onClose={() => {
          setIsTerminalOpen(false);
          setIsTerminalMinimized(false);
        }}
        onMinimize={() => setIsTerminalMinimized(true)}
      />

      <div
        className={`fixed bottom-4 left-1/2 z-[80] -translate-x-1/2 transition-all duration-300 md:bottom-6 ${
          showDock
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-8 opacity-0"
        }`}
      >
        <nav
          aria-label="Section dock"
          className="flex items-center gap-2 rounded-full border border-white/15 bg-black/65 px-3 py-2.5 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.75)] backdrop-blur-2xl md:gap-2.5 md:px-4 md:py-3"
        >
          {DOCK_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${
                link.href === activeHref
                  ? "border border-white/25 bg-black/85 text-white shadow-[0_0_0_0.5px_rgba(255,255,255,0.12)]"
                  : "bg-transparent text-white/85 hover:bg-white/12 hover:text-white"
              } rounded-full px-4 py-2 text-sm font-medium tracking-[0.01em] transition-colors duration-300 ease-out`}
            >
              {link.label}
            </a>
          ))}

          <button
            type="button"
            onClick={() => {
              if (!isTerminalOpen) {
                setTerminalSession((prev) => prev + 1);
              }
              setIsTerminalMinimized(false);
              setIsTerminalOpen(true);
            }}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-[0.01em] transition-colors duration-300 ease-out ${
              isTerminalOpen
                ? "border border-cyan-200/40 bg-cyan-200/15 text-cyan-50"
                : "bg-transparent text-white/85 hover:bg-white/12 hover:text-white"
            }`}
            aria-pressed={isTerminalOpen}
          >
            <BsTerminalFill aria-hidden="true" />
            Terminal
          </button>
        </nav>
      </div>
    </>
  );
}

