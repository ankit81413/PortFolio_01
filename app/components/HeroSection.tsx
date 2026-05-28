"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { MarqueeTitleBlock } from "./MarqueeTitleBlock";

export function HeroSection() {
  const marqueeSequenceCount = 5;
  const floatingLogos = [
    { id: "docker", src: "/logos/docker.jpg" },
    { id: "react", src: "/logos/react.png" },
    { id: "javascript", src: "/logos/js.png" },
    { id: "html", src: "/logos/html.png" },
    { id: "css", src: "/logos/css.png" },
    { id: "express", src: "/logos/express.png" },
    { id: "mongodb", src: "/logos/mongodb.png" },
    { id: "nodejs", src: "/logos/node.png" },
  ] as const;

  const sharedImageLayerClass =
    "pointer-events-none absolute inset-x-0 top-0 mx-auto h-[87%] md:top-auto md:bottom-0";
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstSequenceRef = useRef<HTMLDivElement | null>(null);
  const secondSequenceRef = useRef<HTMLDivElement | null>(null);
  const mouseCoreRef = useRef<HTMLDivElement | null>(null);
  const logoRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const track = trackRef.current;
    const firstSequence = firstSequenceRef.current;
    const secondSequence = secondSequenceRef.current;
    if (!track || !firstSequence || !secondSequence) return;

    const pxPerSecond = 120;

    const syncMarquee = () => {
      const firstRect = firstSequence.getBoundingClientRect();
      const secondRect = secondSequence.getBoundingClientRect();
      const sequenceStep = secondRect.left - firstRect.left;
      if (!sequenceStep) return;

      const snappedStep = Math.round(sequenceStep);
      track.style.setProperty("--marquee-shift", `${snappedStep}px`);
      track.style.setProperty(
        "--marquee-duration",
        `${(snappedStep / pxPerSecond).toFixed(2)}s`
      );
    };

    syncMarquee();

    const resizeObserver = new ResizeObserver(syncMarquee);
    resizeObserver.observe(firstSequence);
    resizeObserver.observe(secondSequence);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("resize", syncMarquee);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncMarquee);
    };
  }, []);

  useEffect(() => {
    const container = sectionRef.current;
    const mouseCore = mouseCoreRef.current;
    if (!container || !mouseCore) return;

    const logoElements = logoRefs.current;
    if (logoElements.some((node) => !node)) return;

    const mouse = { x: -1000, y: -1000, active: false };
    const drag = 0.997;
    const restitution = 0.92;
    const stepsPerFrame = 2;
    let animationId = 0;

    const rect = () => container.getBoundingClientRect();
    let bounds = rect();

    const bodies = logoElements.map((node, index) => {
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

    const onMouseMove = (event: MouseEvent) => {
      bounds = rect();
      mouse.active = true;
      mouse.x = event.clientX - bounds.left;
      mouse.y = event.clientY - bounds.top;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const onResize = () => {
      bounds = rect();
    };

    const resolveLogoCollisions = () => {
      for (let i = 0; i < bodies.length; i += 1) {
        for (let j = i + 1; j < bodies.length; j += 1) {
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
      if (mouse.active) {
        mouseCore.style.transform = `translate3d(${mouse.x - mouseRadius}px, ${mouse.y - mouseRadius}px, 0)`;
      } else {
        mouseCore.style.transform = "translate3d(-120px, -120px, 0)";
      }

      for (let i = 0; i < stepsPerFrame; i += 1) {
        stepPhysics();
      }

      for (let i = 0; i < bodies.length; i += 1) {
        const b = bodies[i];
        b.node.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
      }

      animationId = window.requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);
    animate();

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(animationId);
    };
  }, [floatingLogos]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[520px] w-full overflow-hidden bg-white pt-20 md:h-screen"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="floating-tech-layer absolute inset-0 z-10" aria-hidden="true">
        {floatingLogos.map((item, index) => (
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

      <div className="pointer-events-none absolute inset-x-0 top-12 z-20 overflow-hidden md:top-1/2 md:-translate-y-1/2">
        <div ref={trackRef} className="marquee-track marquee-right">
          {Array.from({ length: marqueeSequenceCount }).map((_, index) => (
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
          className="object-contain object-top md:object-bottom"
        />
      </div>
    </section>
  );
}
