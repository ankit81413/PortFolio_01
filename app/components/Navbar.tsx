"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  BsChevronDown,
  BsChevronRight,
  BsDownload,
  BsList,
  BsTreeFill,
} from "react-icons/bs";

const LINKTREE_ITEMS = [
  { label: "GitHub", href: "https://github.com/", branch: "origin/github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    branch: "origin/linkedin",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/",
    branch: "origin/leetcode",
  },
  {
    label: "Portfolio Email",
    href: "mailto:hello@example.com",
    branch: "origin/contact",
  },
] as const;
const PAGE_ITEMS = [
  { label: "About", href: "#about-section" },
  { label: "Projects", href: "#projects-section" },
  { label: "Experience", href: "#experience-section" },
  { label: "Contact", href: "#contact-section" },
] as const;
const BRANCH_NODE_COLORS = [
  "#ff8a00",
  "#39d0d0",
  "#ffc62a",
  "#ff8a00",
] as const;

export function Navbar() {
  const [offsetY, setOffsetY] = useState(0);
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(true);
  const [showLinktreeHint, setShowLinktreeHint] = useState(false);
  const [suppressLinktreeHint, setSuppressLinktreeHint] = useState(false);
  const treeWrapRef = useRef<HTMLDivElement | null>(null);
  const treeOpenedAtRef = useRef(0);
  const treeOpenedScrollYRef = useRef(0);

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

  useEffect(() => {
    if (suppressLinktreeHint || isTreeOpen) return;

    let hideTimer: number | null = null;
    const showTimer = window.setTimeout(() => {
      if (window.scrollY > 20 || isTreeOpen) return;
      setShowLinktreeHint(true);
      hideTimer = window.setTimeout(() => {
        setShowLinktreeHint(false);
      }, 4000);
    }, 3000);

    return () => {
      window.clearTimeout(showTimer);
      if (hideTimer !== null) window.clearTimeout(hideTimer);
    };
  }, [suppressLinktreeHint, isTreeOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) {
        setShowLinktreeHint(false);
        setSuppressLinktreeHint(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isTreeOpen) return;

    const onScrollClose = () => {
      const openAge = Date.now() - treeOpenedAtRef.current;
      const scrollDelta = Math.abs(
        window.scrollY - treeOpenedScrollYRef.current
      );
      if (openAge < 350 || scrollDelta < 16) return;
      setIsTreeOpen(false);
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (treeWrapRef.current && !treeWrapRef.current.contains(target)) {
        setIsTreeOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsTreeOpen(false);
    };

    window.addEventListener("scroll", onScrollClose, { passive: true });
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScrollClose);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isTreeOpen]);

  const toggleLinktree = () => {
    setIsTreeOpen((current) => {
      const willOpen = !current;

      if (willOpen) {
        setShowLinktreeHint(false);
        setSuppressLinktreeHint(true);
        treeOpenedAtRef.current = Date.now();
        treeOpenedScrollYRef.current = window.scrollY;
      }

      return willOpen;
    });
  };

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
        className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-[1880px] items-center justify-between rounded-xl border border-black/10 bg-white/82 px-3 py-3 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-200 md:top-7 md:w-[calc(100%-3.5rem)] md:px-5 md:py-3"
        style={{
          transform: `translate3d(0, ${-offsetY}px, 0)`,
          willChange: "transform",
        }}
      >
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-black/10  bg-transparent">
            <div className="flex items-end justify-end h-full" id="Navlogo">
              <Image
                src="/BannerMe.png"
                alt="Ankit"
                fill
                sizes="100px"
                className="object-cover object-top "
                priority
              />
            </div>
          </span>
          <span className="truncate text-base font-semibold text-black md:text-lg">
            Ankit
          </span>
        </a>

        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.11em] text-black">
          <div ref={treeWrapRef} className="relative">
            {showLinktreeHint ? (
              <div className="pointer-events-none absolute top-[calc(100%+10px)] right-0 z-[75]">
                <span className="terminal-link-hint-notch absolute -top-[6px] right-5 h-3 w-3 rotate-45 border-t border-l border-white/20 bg-black/92" />
                <div className="rounded-md border border-white/20 bg-black/92 px-3 py-2 font-mono text-[11px] tracking-[0.04em] text-white shadow-[0_10px_26px_-16px_rgba(0,0,0,0.9)] whitespace-nowrap">
                  <span className="mr-1 text-emerald-300">$SYS</span>
                  <span className="terminal-link-hint-text">
                    : click Linktree for links
                  </span>
                </div>
              </div>
            ) : null}

            <button
              type="button"
              onClick={toggleLinktree}
              className={`inline-flex touch-manipulation items-center gap-1 rounded-full border px-3 py-2 transition-all duration-200 ${
                isTreeOpen
                  ? "border-black/25 bg-black/[0.08]"
                  : "border-transparent hover:border-black/10 hover:bg-black/[0.03]"
              }`}
              aria-expanded={isTreeOpen}
              aria-haspopup="menu"
              aria-label="Open links menu"
            >
              <span className="inline-flex items-center md:hidden">
                <BsList className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="hidden items-center gap-1 md:inline-flex">
                <BsTreeFill aria-hidden="true" />
                Linktree
              </span>
            </button>

            {isTreeOpen ? (
              <div className="absolute right-0 top-[calc(100%+10px)] z-[70] w-[calc(100vw-2rem)] max-w-[330px] overflow-hidden rounded-xl border border-white/15 bg-black/95 p-3 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl md:w-[300px]">
                <p className="mb-2 border-b border-white/15 pb-2 text-[10px] font-semibold tracking-[0.12em] text-white/55">
                  SOURCE CONTROL / REMOTES
                </p>
                <div className="relative pl-4">
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-1 h-[calc(100%-12px)] w-px bg-[#ff8a00]"
                  />
                  <ul className="space-y-1">
                    {LINKTREE_ITEMS.map((item, index) => {
                      const isMailLink = item.href.startsWith("mailto:");

                      return (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            target={isMailLink ? undefined : "_blank"}
                            rel={isMailLink ? undefined : "noreferrer"}
                            onClick={() => setIsTreeOpen(false)}
                            className="group grid grid-cols-[18px_1fr_auto] items-center gap-2 rounded-md border border-transparent px-1.5 py-1.5 text-[11px] tracking-[0.08em] text-white/85 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                          >
                            <span className="relative flex h-4 items-center">
                              <span
                                aria-hidden="true"
                                className="absolute left-[7px] top-1/2 h-px w-[10px] -translate-y-1/2 rounded-full"
                                style={{
                                  backgroundColor:
                                    BRANCH_NODE_COLORS[
                                      index % BRANCH_NODE_COLORS.length
                                    ],
                                }}
                              />
                              <span
                                className="relative z-[1] h-2.5 w-2.5 rounded-full border border-black"
                                style={{
                                  backgroundColor:
                                    BRANCH_NODE_COLORS[
                                      index % BRANCH_NODE_COLORS.length
                                    ],
                                }}
                              />
                            </span>
                            <span className="truncate font-semibold uppercase">
                              {item.label}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-white/50 transition-colors group-hover:text-white/75">
                              {item.branch}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <a
                  href="/Ankit_(Mern_Stack_Developer).pdf"
                  download="Ankit_(Mern_Stack_Developer).pdf"
                  onClick={() => setIsTreeOpen(false)}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.11em] text-black transition-colors hover:bg-white/90 md:hidden"
                >
                  <BsDownload aria-hidden="true" />
                  Download Resume
                </a>

                <div className="mt-3 border-t border-white/10 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsPagesOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-md border border-transparent px-1.5 py-1.5 text-left text-[10px] font-semibold tracking-[0.12em] text-white/70 transition-colors hover:border-white/15 hover:bg-white/8"
                    aria-expanded={isPagesOpen}
                  >
                    <span className="inline-flex items-center gap-2">
                      {isPagesOpen ? (
                        <BsChevronDown
                          className="h-3 w-3 text-white/75"
                          aria-hidden="true"
                        />
                      ) : (
                        <BsChevronRight
                          className="h-3 w-3 text-white/75"
                          aria-hidden="true"
                        />
                      )}
                      <span>PAGES</span>
                    </span>
                    <span className="font-mono text-[10px] text-white/45">
                      {PAGE_ITEMS.length}
                    </span>
                  </button>

                  {isPagesOpen ? (
                    <ul className="mt-1.5 space-y-1 pl-6">
                      {PAGE_ITEMS.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            onClick={() => setIsTreeOpen(false)}
                            className="group flex items-center justify-between rounded-md border border-transparent px-2 py-1.5 text-[11px] tracking-[0.08em] text-white/80 transition-colors hover:border-white/15 hover:bg-white/10 hover:text-white"
                          >
                            <span className="font-semibold uppercase">
                              {item.label}
                            </span>
                            <span className="font-mono text-[10px] text-white/40 transition-colors group-hover:text-white/65">
                              {item.href.replace("#", "")}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <a
            href="/Ankit_(Mern_Stack_Developer).pdf"
            download="Ankit_(Mern_Stack_Developer).pdf"
            className="hidden items-center gap-1 rounded-full border border-black/10 bg-black px-4 py-2 font-bold text-white transition-all duration-200 hover:bg-black/85 md:inline-flex"
          >
            <BsDownload aria-hidden="true" />
            Download Resume
          </a>
        </div>
      </nav>
    </>
  );
}
