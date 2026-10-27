"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";

const STATS = [
  ["01", "ONE WORKSPACE", "Server tools, in one calm command center."],
  ["02", "CLOSER TO SYSTEM", "Linux, processes, and terminals within reach."],
  ["03", "BUILT TO EVOLVE", "Extensible tooling for the work ahead."],
];

const SCREENS = [
  { src: "/OpenSource/Opensource1.png", alt: "VesselSSH application workspace", label: "WORKSPACE" },
  { src: "/OpenSource/Opensource2.png", alt: "VesselSSH server overview", label: "SERVERS" },
  { src: "/OpenSource/Opensource3.png", alt: "VesselSSH terminal and process tools", label: "TERMINAL / PROCESSES" },
];

export function OpenSourceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "previous">("next");

  const changeScreen = useCallback((nextDirection: "next" | "previous") => {
    if (incomingIndex !== null) return;

    const nextIndex = nextDirection === "next"
      ? (activeIndex + 1) % SCREENS.length
      : (activeIndex - 1 + SCREENS.length) % SCREENS.length;

    setDirection(nextDirection);
    setIncomingIndex(nextIndex);
    window.setTimeout(() => {
      setActiveIndex(nextIndex);
      setIncomingIndex(null);
    }, 420);
  }, [activeIndex, incomingIndex]);

  useEffect(() => {
    if (incomingIndex !== null) return;

    const autoplayTimer = window.setTimeout(() => {
      changeScreen("next");
    }, 5000);

    return () => window.clearTimeout(autoplayTimer);
  }, [changeScreen, incomingIndex]);

  const activeScreen = SCREENS[activeIndex];
  const incomingScreen = incomingIndex === null ? null : SCREENS[incomingIndex];

  return (
    <section id="opensource" className="relative z-30 overflow-hidden border-t border-dashed border-white/25 bg-[#070a0d] px-5 py-14 text-[#e9f9fa] md:h-[700px] md:px-10 md:py-0">
      <div aria-hidden="true" className="terminal-noise absolute inset-0" />
      <div aria-hidden="true" className="terminal-orb terminal-orb-blue" />
      <div aria-hidden="true" className="terminal-orb terminal-orb-cyan" />
      <div className="relative mx-auto grid h-full max-w-[1600px] gap-10 md:grid-cols-[0.83fr_1.17fr] md:items-center md:gap-14">
        <div className="relative z-10">
          <div className="mb-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-100/55"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />system://open-source/vesselssh</div>
          <h2 className="max-w-xl text-5xl font-medium leading-[0.91] tracking-[-0.055em] text-white md:text-6xl"><span className="text-[#d13409]">VesselSSH</span><br /><span className="text-4xl md:text-6xl">Your servers.<br />Your tools.<br /><span className="text-[#76dce5]">One workspace.</span></span></h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/60 md:text-lg">An open-source DevOps workspace bringing server management and developer tools together.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="https://github.com/ankit81413/VesselSSH" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 border border-cyan-200/35 bg-cyan-200/10 px-4 py-2.5 font-mono text-xs font-medium text-cyan-50 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/70 hover:bg-cyan-200/20"><BsGithub aria-hidden="true" />EXPLORE ON GITHUB<BsArrowUpRight aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
            <a target="_blank" href="https://github.com/ankit81413/VesselDoc/#readme" className="inline-flex items-center border border-white/15 bg-white/[0.03] px-4 py-2.5 font-mono text-xs text-white/65 transition-colors hover:border-white/40 hover:bg-white/[0.07] hover:text-white">KNOW MORE</a>
          </div>
          <div id="opensource-features" className="mt-10 grid border-t border-white/12 pt-5 sm:grid-cols-3">{STATS.map(([number, title, description]) => <div key={number} className="border-l border-white/12 px-3 first:border-l-0 first:pl-0"><p className="font-mono text-[10px] text-cyan-300/80">{number}</p><p className="mt-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/75">{title}</p><p className="mt-2 text-xs leading-relaxed text-white/45">{description}</p></div>)}</div>
          <p className="mt-7 font-mono text-[10px] tracking-[0.07em] text-cyan-100/35">Next.js · Node.js · WebSockets · Linux · Node PTY · Coffee</p>
        </div>

        <div className="relative mx-auto w-full max-w-[680px] border border-cyan-100/15 bg-[#0a1116]/80 p-2 shadow-[0_28px_80px_-36px_rgba(0,0,0,1)]">
          <div className="mb-2 flex h-7 items-center justify-between border-b border-white/10 px-2 font-mono text-[9px] tracking-[0.12em] text-white/45"><span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 bg-[#f87171]" /><i className="h-1.5 w-1.5 bg-[#fbbf24]" /><i className="h-1.5 w-1.5 bg-[#67e8f9]" />VESSELSSH</span><span className="text-cyan-200/65 uppercase">...IN Development</span></div>
          <div className="relative aspect-video overflow-hidden border border-dashed border-cyan-100/25 bg-[#0b151c]">
            <CarouselScreen screen={activeScreen} state={incomingScreen ? (direction === "next" ? "exit-left" : "exit-right") : "active"} priority />
            {incomingScreen && <CarouselScreen screen={incomingScreen} state={direction === "next" ? "enter-right" : "enter-left"} />}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between bg-gradient-to-t from-[#03080c]/85 to-transparent px-3 pb-2 pt-8 font-mono text-[9px] tracking-[0.13em] text-cyan-50/80"><span>{activeScreen.label}</span><span>{String(activeIndex + 1).padStart(2, "0")} / 03</span></div>
            <div className="absolute right-2 top-2 z-30 flex gap-1.5"><button type="button" onClick={() => changeScreen("previous")} disabled={incomingIndex !== null} aria-label="Previous VesselSSH screen" className="terminal-carousel-button cursor-pointer">PREV</button><button type="button" onClick={() => changeScreen("next")} disabled={incomingIndex !== null} aria-label="Next VesselSSH screen" className="terminal-carousel-button cursor-pointer">NEXT</button></div>
          </div>
        </div>
      </div>
    </section>
  );
}

type CarouselScreenProps = { screen: (typeof SCREENS)[number]; state: "active" | "exit-left" | "exit-right" | "enter-left" | "enter-right"; priority?: boolean };

function CarouselScreen({ screen, state, priority = false }: CarouselScreenProps) {
  return <div className={`absolute inset-0 terminal-carousel-screen terminal-carousel-${state}`}><Image src={screen.src} alt={screen.alt} fill priority={priority} sizes="(max-width: 767px) calc(100vw - 3rem), 660px" className="object-cover object-top" /><div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-[#041519]/40 via-transparent to-cyan-200/10" /></div>;
}
