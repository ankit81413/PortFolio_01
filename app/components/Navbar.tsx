"use client";

import { useEffect, useState } from "react";

export function Navbar() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const about = document.getElementById("about-section");
    if (!about) return;

    const gapBeforePush = 14;
    const startLineMobile = 86;
    const startLineDesktop = 108;
    const maxPush = 140;

    const updateOffset = () => {
      const aboutTop = about.getBoundingClientRect().top;
      const startLine =
        (window.matchMedia("(min-width: 768px)").matches
          ? startLineDesktop
          : startLineMobile) + gapBeforePush;
      const pushAmount = Math.max(0, startLine - aboutTop);
      setOffsetY(Math.min(pushAmount, maxPush));
    };

    updateOffset();
    window.addEventListener("scroll", updateOffset, { passive: true });
    window.addEventListener("resize", updateOffset);

    return () => {
      window.removeEventListener("scroll", updateOffset);
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[100px] bg-white/55 backdrop-blur-xl transition-transform duration-200"
        style={{
          transform: `translate3d(0, ${-offsetY}px, 0)`,
          willChange: "transform",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      <nav
        className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-[1880px] items-center justify-between rounded-xl border border-black/10 bg-white/82 px-0 py-3 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-200 md:top-7 md:w-[calc(100%-3.5rem)] md:px-5 md:py-3"
        style={{
          transform: `translate3d(0, ${-offsetY}px, 0)`,
          willChange: "transform",
        }}
      >
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black text-sm font-semibold tracking-wide text-white">
            MO
          </div>
          <p className="truncate text-[10px] uppercase tracking-[0.11em] text-black/85 sm:text-[11px]">
            Creative mind designing badass digital products & brands.
          </p>
        </div>

        <div className="hidden items-center gap-3 text-[11px] uppercase tracking-[0.11em] text-black md:flex">
          <a
            href="#"
            className="rounded-full border border-transparent px-3 py-2 transition-all duration-200 hover:border-black/10 hover:bg-black/[0.03]"
          >
            Linktree
          </a>
          <a
            href="/Ankit_(Mern_Stack_Developer).pdf"
            download="Ankit_(Mern_Stack_Developer).pdf"
            className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-black px-4 py-2 font-bold text-white transition-all duration-200 hover:bg-black/85"
          >
            <i className="fa-solid fa-download"></i>
            Download Resume
          </a>
        </div>
      </nav>
    </>
  );
}
