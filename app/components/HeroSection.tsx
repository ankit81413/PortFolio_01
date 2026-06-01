"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsFillHexagonFill } from "react-icons/bs";
import { MarqueeTitleBlock } from "./MarqueeTitleBlock";

const MARQUEE_SEQUENCE_COUNT = 5;
const FLOATING_LOGOS = [
  { id: "docker", src: "/logos/docker.jpg" },
  { id: "react", src: "/logos/react.png" },
  { id: "javascript", src: "/logos/js.png" },
  { id: "html", src: "/logos/html.png" },
  { id: "css", src: "/logos/css.png" },
  { id: "express", src: "/logos/express.png" },
  { id: "mongodb", src: "/logos/mongodb.png" },
  { id: "nodejs", src: "/logos/node.png" },
] as const;
const ENABLE_SPACE_LOGOS = process.env.NEXT_PUBLIC_ENABLE_SPACE_LOGOS === "true";

export function HeroSection() {
  const [showShoulderLinks, setShowShoulderLinks] = useState(false);
  const [countdownMs, setCountdownMs] = useState(3000);
  const sharedImageLayerClass =
    "pointer-events-none absolute inset-x-[-26%] bottom-0 mx-auto h-[94%] md:inset-x-0 md:h-[87%]";
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstSequenceRef = useRef<HTMLDivElement | null>(null);
  const secondSequenceRef = useRef<HTMLDivElement | null>(null);
  const mouseCoreRef = useRef<HTMLDivElement | null>(null);
  const logoRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const revealDelayMs = 3000;
    const startedAt = Date.now();

    const countdownTimer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, revealDelayMs - elapsed);
      setCountdownMs(remaining);
      if (remaining <= 0) {
        window.clearInterval(countdownTimer);
      }
    }, 80);

    const revealTimer = window.setTimeout(() => {
      setShowShoulderLinks(true);
      setCountdownMs(0);
    }, revealDelayMs);

    return () => {
      window.clearInterval(countdownTimer);
      window.clearTimeout(revealTimer);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const firstSequence = firstSequenceRef.current;
    const secondSequence = secondSequenceRef.current;
    if (!track || !firstSequence || !secondSequence) return;

    const getMarqueeSpeed = () => (window.innerWidth < 768 ? 240 : 120);

    const syncMarquee = () => {
      const firstRect = firstSequence.getBoundingClientRect();
      const secondRect = secondSequence.getBoundingClientRect();
      const sequenceStep = Math.abs(secondRect.left - firstRect.left);
      if (!Number.isFinite(sequenceStep) || sequenceStep < 1) return;

      const snappedStep = Math.max(1, Math.round(sequenceStep));
      const pxPerSecond = getMarqueeSpeed();
      track.style.setProperty("--marquee-shift", `${snappedStep}px`);
      track.style.setProperty(
        "--marquee-duration",
        `${(snappedStep / pxPerSecond).toFixed(2)}s`
      );
    };

    const syncOnNextFrame = () => {
      window.requestAnimationFrame(syncMarquee);
    };

    syncOnNextFrame();
    const delayedSync = window.setTimeout(syncMarquee, 300);
    document.fonts?.ready.then(syncMarquee).catch(() => undefined);

    const resizeObserver = new ResizeObserver(syncMarquee);
    resizeObserver.observe(firstSequence);
    resizeObserver.observe(secondSequence);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("resize", syncOnNextFrame);

    return () => {
      window.clearTimeout(delayedSync);
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncOnNextFrame);
    };
  }, []);

  useEffect(() => {
    if (!ENABLE_SPACE_LOGOS) return;

    const container = sectionRef.current;
    const mouseCore = mouseCoreRef.current;
    if (!container || !mouseCore) return;

    const logoElements = logoRefs.current;
    if (logoElements.some((node) => !node)) return;

    const mouse = { x: -1000, y: -1000, active: false };
    const drag = 0.997;
    const restitution = 0.92;
    const stepsPerFrame = 2;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationId = 0;
    let running = true;

    const rect = () => container.getBoundingClientRect();
    let bounds = rect();

    const bodies = logoElements.map((node) => {
      const size = Math.round(26 + Math.random() * 14);
      const padding = 30;
      const initialX = padding + Math.random() * Math.max(1, bounds.width - size - padding * 2);
      const initialY = padding + Math.random() * Math.max(1, bounds.height - size - padding * 2);
      const initialVx = (Math.random() - 0.5) * 0.7;
      const initialVy = (Math.random() - 0.5) * 0.7;
      return {
        node: node as HTMLDivElement,
        size,
        x: initialX,
        y: initialY,
        vx: initialVx,
        vy: initialVy,
      };
    });
    for (let i = 0; i < bodies.length; i += 1) {
      const b = bodies[i];
      b.node.style.width = `${b.size}px`;
      b.node.style.height = `${b.size}px`;
    }
    const avgLogoSize =
      bodies.reduce((sum, body) => sum + body.size, 0) / Math.max(1, bodies.length);
    const mouseDiameter = Math.round(avgLogoSize * 0.5);
    const mouseRadius = mouseDiameter / 2;
    mouseCore.style.width = `${mouseDiameter}px`;
    mouseCore.style.height = `${mouseDiameter}px`;

    const logoPairs: Array<[number, number]> = [];
    for (let i = 0; i < bodies.length; i += 1) {
      for (let j = i + 1; j < bodies.length; j += 1) {
        logoPairs.push([i, j]);
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      mouse.active = true;
      mouse.x = event.clientX - bounds.left;
      mouse.y = event.clientY - bounds.top;
    };

    const onPointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const onResize = () => {
      bounds = rect();
    };

    const resolveLogoCollisions = () => {
      for (let p = 0; p < logoPairs.length; p += 1) {
          const [i, j] = logoPairs[p];
          const a = bodies[i];
          const b = bodies[j];
          const ar = a.size / 2;
          const br = b.size / 2;
          const acx = a.x + ar;
          const acy = a.y + ar;
          const bcx = b.x + br;
          const bcy = b.y + br;
          const dx = bcx - acx;
          const dy = bcy - acy;
          const dist = Math.hypot(dx, dy) || 0.001;
          const minDist = ar + br;
          if (dist >= minDist) continue;

          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = minDist - dist;

          a.x -= nx * (overlap * 0.5);
          a.y -= ny * (overlap * 0.5);
          b.x += nx * (overlap * 0.5);
          b.y += ny * (overlap * 0.5);

          const rvx = b.vx - a.vx;
          const rvy = b.vy - a.vy;
          const velAlongNormal = rvx * nx + rvy * ny;
          if (velAlongNormal > 0) continue;

          const impulse = (-(1 + restitution) * velAlongNormal) / 2;
          const ix = impulse * nx;
          const iy = impulse * ny;
          a.vx -= ix;
          a.vy -= iy;
          b.vx += ix;
          b.vy += iy;
        }
    };

    const stepPhysics = () => {
      const w = bounds.width;
      const h = bounds.height;

      for (let i = 0; i < bodies.length; i += 1) {
        const b = bodies[i];
        b.vx += (Math.random() - 0.5) * 0.014;
        b.vy += (Math.random() - 0.5) * 0.014;
        b.vx *= drag;
        b.vy *= drag;

        if (mouse.active) {
          const cx = b.x + b.size / 2;
          const cy = b.y + b.size / 2;
          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const minDist = mouseRadius + b.size / 2;
          if (dist < minDist) {
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;
            b.x += nx * overlap;
            b.y += ny * overlap;
            const impulse = 0.24 + overlap * 0.02;
            b.vx += nx * impulse;
            b.vy += ny * impulse;
          }
        }

        b.x += b.vx;
        b.y += b.vy;

        if (b.x <= 0) {
          b.x = 0;
          b.vx = Math.abs(b.vx) * restitution;
        } else if (b.x + b.size >= w) {
          b.x = Math.max(0, w - b.size);
          b.vx = -Math.abs(b.vx) * restitution;
        }

        if (b.y <= 0) {
          b.y = 0;
          b.vy = Math.abs(b.vy) * restitution;
        } else if (b.y + b.size >= h) {
          b.y = Math.max(0, h - b.size);
          b.vy = -Math.abs(b.vy) * restitution;
        }
      }
      resolveLogoCollisions();
    };

    const animate = () => {
      animationId = 0;
      if (!running) return;
      if (mouse.active) {
        mouseCore.style.transform = `translate3d(${mouse.x - mouseRadius}px, ${mouse.y - mouseRadius}px, 0)`;
      } else {
        mouseCore.style.transform = "translate3d(-120px, -120px, 0)";
      }

      const activeSteps = prefersReducedMotion ? 1 : stepsPerFrame;
      for (let i = 0; i < activeSteps; i += 1) {
        stepPhysics();
      }

      for (let i = 0; i < bodies.length; i += 1) {
        const b = bodies[i];
        b.node.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
      }

      animationId = window.requestAnimationFrame(animate);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !document.hidden;
        if (running && !animationId) {
          animationId = window.requestAnimationFrame(animate);
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      running = !document.hidden;
      if (running && !animationId) {
        animationId = window.requestAnimationFrame(animate);
      }
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    animationId = window.requestAnimationFrame(animate);

    return () => {
      running = false;
      intersectionObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-full w-full overflow-hidden bg-white pt-20"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {ENABLE_SPACE_LOGOS ? (
        <div className="floating-tech-layer absolute inset-0 z-10" aria-hidden="true">
          {FLOATING_LOGOS.map((item, index) => (
            <div
              key={item.id}
              ref={(node) => {
                logoRefs.current[index] = node;
              }}
              className="floating-tech-item"
              style={{ width: "32px", height: "32px" }}
            >
              <Image
                src={item.src}
                alt={`${item.id} logo`}
                fill
                sizes="(max-width: 768px) 48px, 72px"
                className="floating-tech-logo"
              />
            </div>
          ))}
          <div ref={mouseCoreRef} className="space-mouse-core" />
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 top-[34%] z-20 overflow-hidden md:top-1/2 md:-translate-y-1/2">
        <div ref={trackRef} className="marquee-track marquee-right">
          {Array.from({ length: MARQUEE_SEQUENCE_COUNT }).map((_, index) => (
            <div
              key={index}
              ref={
                index === 0
                  ? firstSequenceRef
                  : index === 1
                    ? secondSequenceRef
                    : null
              }
              className="marquee-sequence"
              aria-hidden={index > 0 ? "true" : undefined}
            >
              <MarqueeTitleBlock ariaHidden={index > 0} />
            </div>
          ))}
        </div>
      </div>

      <div className={`${sharedImageLayerClass} z-30`}>
        <Image
          src="/BannerMe.png"
          alt="Ankit portrait"
          fill
          sizes="(max-width: 768px) 90vw, 46vw"
          loading="eager"
          className="scale-125 object-contain object-bottom md:scale-100"
        />
      </div>

      {!showShoulderLinks ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-9 z-40 hidden md:block">
          <div className="flex justify-end px-6 md:px-10">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <BsFillHexagonFill className="h-full w-full text-black drop-shadow-[0_8px_20px_rgba(0,0,0,0.28)]" />
              <span className="absolute text-xs font-semibold leading-none text-white">
                {Math.max(1, Math.ceil(countdownMs / 1000))}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-8 z-40 hidden transition-opacity duration-400 md:bottom-10 md:block ${
          showShoulderLinks ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-15 ">
          <a
            href="#about-section"
            className="pointer-events-auto group inline-flex items-end gap-2 text-black transition-opacity hover:opacity-80 md:gap-3"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 120 120"
              className="h-10 w-10 transition-transform duration-200 group-hover:-translate-y-1 md:h-12 md:w-12"
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
            <span
              className={`hero-type-text text-4xl font-semibold leading-none tracking-tight md:text-6xl ${
                showShoulderLinks ? "is-visible" : ""
              }`}
            >About</span>
          </a>

          <a
            href="#projects-section"
            className="pointer-events-auto group inline-flex items-end gap-2 text-black transition-opacity hover:opacity-80 md:gap-3"
          >
            <span
              className={`hero-type-text text-4xl font-semibold leading-none tracking-tight md:text-6xl ${
                showShoulderLinks ? "is-visible" : ""
              }`}
              style={{ animationDelay: "220ms" }}
            >Projects</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 120 120"
              className="h-10 w-10 transition-transform duration-200 group-hover:-translate-y-1 md:h-12 md:w-12"
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
          </a>
        </div>
      </div>
    </section>
  );
}
