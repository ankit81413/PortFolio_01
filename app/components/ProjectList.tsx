"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  skills: string[];
  links: Array<{ label: string; href: string }>;
};

const SKILL_ICON_MAP: Record<string, string> = {
  Branding: "/logos/html.png",
  "UI Design": "/logos/css.png",
  "UX Research": "/logos/js.png",
  Webflow: "/logos/react.png",
  "Art Direction": "/logos/docker.jpg",
  "Design System": "/logos/git.png",
  Website: "/logos/node.png",
  "Creative Direction": "/logos/express.png",
  "Interaction": "/logos/mongodb.png",
  Prototype: "/logos/react.png",
  "Product Design": "/logos/html.png",
  "Information Architecture": "/logos/css.png",
  UI: "/logos/js.png",
  Web: "/logos/node.png",
};

const PROJECTS: ProjectItem[] = [
  {
    id: "barrett",
    title: "Barrett Plastic Surgery",
    subtitle: "Branding, Website",
    description:
      "A clean, premium desktop-first experience focused on trust, service clarity, and conversion-friendly page flow.",
    image: "/BannerBackgroundl.png",
    skills: ["Branding", "UI Design", "UX Research", "Webflow"],
    links: [
      { label: "Github", href: "#" },
      { label: "Live", href: "#" },
    ],
  },
  {
    id: "mystudio",
    title: "MyStudio",
    subtitle: "Branding, Website, Art Direction",
    description:
      "Built a strong visual language and content structure with scalable components for marketing and product storytelling.",
    image: "/BannerBackgroundl.png",
    skills: ["Branding", "Art Direction", "Design System", "Website"],
    links: [
      { label: "Github", href: "#" },
      { label: "Live", href: "#" },
    ],
  },
  {
    id: "instead",
    title: "Instead",
    subtitle: "Creative Direction, UI/UX",
    description:
      "Designed the interface system and desktop interactions to improve readability, engagement, and feature discoverability.",
    image: "/BannerBackgroundl.png",
    skills: ["Creative Direction", "UI/UX", "Interaction", "Prototype"],
    links: [
      { label: "Github", href: "#" },
      { label: "Live", href: "#" },
    ],
  },
  {
    id: "jsforwebflow",
    title: "Js for Webflow",
    subtitle: "Product Design",
    description:
      "Created a focused desktop product presentation with modular sections for tutorials, examples, and conversion touchpoints.",
    image: "/BannerBackgroundl.png",
    skills: ["Product Design", "Information Architecture", "UI", "Web"],
    links: [
      { label: "Github", href: "#" },
      { label: "Live", href: "#" },
    ],
  },
];

export function ProjectList() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [panelHeights, setPanelHeights] = useState<Record<string, number>>({});
  const rowRefs = useRef<Record<string, HTMLElement | null>>({});
  const panelInnerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const measureHeights = () => {
      const nextHeights: Record<string, number> = {};
      for (const project of PROJECTS) {
        const panel = panelInnerRefs.current[project.id];
        nextHeights[project.id] = panel ? panel.scrollHeight : 0;
      }
      setPanelHeights(nextHeights);
    };

    measureHeights();
    window.addEventListener("resize", measureHeights);
    return () => window.removeEventListener("resize", measureHeights);
  }, []);

  const maybeCenterExpandedRow = (projectId: string) => {
    const row = rowRefs.current[projectId];
    if (!row) return;

    const rect = row.getBoundingClientRect();
    const stickyHeader = document.getElementById("projects-sticky-header");
    const stickyBottom = stickyHeader
      ? stickyHeader.getBoundingClientRect().bottom
      : 0;

    const touchesTopZone = rect.top <= stickyBottom + 1;
    const touchesBottomZone = rect.bottom >= window.innerHeight - 1;
    if (!touchesTopZone && !touchesBottomZone) return;

    const targetY =
      window.scrollY + rect.top - (window.innerHeight / 2 - rect.height / 2);
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });
  };

  const onToggleProject = (projectId: string) => {
    const willOpen = expandedProject !== projectId;
    setExpandedProject(willOpen ? projectId : null);

    if (willOpen) {
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          maybeCenterExpandedRow(projectId);
        }, 180);
      });
    }
  };

  return (
    <div className="mt-8 w-full border-t border-black/50 md:mt-20">
      {PROJECTS.map((project) => {
        const isExpanded = expandedProject === project.id;

        return (
          <article
            key={project.id}
            ref={(node) => {
              rowRefs.current[project.id] = node;
            }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject((current) => (current === project.id ? null : current))}
            className={`group relative border-b border-black/50 transition-colors duration-200 ${
              isExpanded ? "" : "hover:bg-black"
            }`}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-y-1/2 md:block transition-all duration-250 ${
                hoveredProject === project.id && !isExpanded
                  ? "translate-x-[-4%] opacity-100"
                  : "translate-x-[-2%] opacity-0"
              }`}
            >
              <Image
                src={project.image}
                alt=""
                width={360}
                height={210}
                className="h-[260px] w-auto rounded-sm border border-black/20 bg-white object-cover object-top shadow-[0_16px_44px_rgba(0,0,0,0.24)]"
              />
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-5 md:flex md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-0">
              <div className="grid min-w-0 grid-cols-[28px_42px_1px_1fr] items-center gap-3 md:flex md:items-center md:gap-6">
                <span className={`text-2xl leading-none transition-colors duration-200 md:text-4xl ${isExpanded ? "" : "group-hover:text-white"}`}>⌘</span>
                <div className="relative h-12 w-10 overflow-hidden bg-white md:h-20 md:w-35">
                  <Image
                    src={project.image}
                    alt={`${project.title} thumbnail`}
                    fill
                    sizes="(max-width: 768px) 40px, 80px"
                    className="object-cover object-center"
                  />
                </div>
                <span className={`h-12 w-px bg-black/70 transition-colors duration-200 md:h-12 ${isExpanded ? "" : "group-hover:bg-white/70"}`} aria-hidden="true" />
                <p className={`min-w-0 text-xl leading-tight transition-colors duration-200 md:py-8 md:text-3xl ${isExpanded ? "" : "group-hover:text-white"}`}>
                  {project.title} - {project.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onToggleProject(project.id)}
                className={`project-expand-hint w-fit cursor-pointer rounded-lg border border-black/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors md:px-5 md:py-3 md:text-xs ${
                  isExpanded
                    ? "is-expanded bg-black text-white"
                    : `bg-transparent text-black hover:bg-white hover:text-black ${isExpanded ? "" : "group-hover:border-white/80 group-hover:text-white"}`
                }`}
              >
                {isExpanded ? "Collapse" : "Expand"}
              </button>
            </div>

            <div
              className="overflow-hidden transition-all duration-400 ease-out"
              style={{
                maxHeight: isExpanded ? `${panelHeights[project.id] ?? 0}px` : "0px",
                opacity: isExpanded ? 1 : 0,
                marginTop: isExpanded ? "1.5rem" : "0rem",
              }}
            >
              <div
                ref={(node) => {
                  panelInnerRefs.current[project.id] = node;
                }}
                className=" bg-white/50 p-4 md:p-6"
              >
                <div className="grid gap-6 md:grid-cols-[320px_1fr_auto] md:gap-8">
                  <div className="relative h-[220px] overflow-hidden bg-white md:h-[200px] md:w-[320px]">
                    <Image
                      src={project.image}
                      alt={`${project.title} desktop preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl leading-tight md:text-3xl font-semibold">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium uppercase tracking-[0.12em] text-black/70">
                      {project.subtitle}
                    </p>
                    <p className="max-w-2xl text-base leading-relaxed text-black/80">
                      {project.description}
                    </p>

                    <div className="mt-1 flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-black/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-black hover:text-white"
                        >
                          <span className="relative h-4 w-4 overflow-hidden rounded-[2px]">
                            <Image
                              src={SKILL_ICON_MAP[skill] ?? "/logos/react.png"}
                              alt=""
                              fill
                              sizes="16px"
                              className="object-cover"
                            />
                          </span>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row flex-wrap items-start gap-4 md:flex-col md:items-end md:justify-start">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em]"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          className="h-4 w-4"
                          fill="none"
                        >
                          <path
                            d="M4 16L16 4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M8 4H16V12"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="border-b border-dashed border-transparent pb-[1px] transition-colors group-hover:border-black">
                          {link.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}


