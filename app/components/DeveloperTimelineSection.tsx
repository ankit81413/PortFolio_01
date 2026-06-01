type ExperienceEvent = {
  id: string;
  range: string;
  duration: string;
  branch: string;
  type: "feat" | "learn" | "merge" | "release";
  title: string;
  details: string;
  stack: string[];
  links: Array<{ label: string; href: string }>;
};

const TIMELINE_EVENTS: ExperienceEvent[] = [
  {
    id: "t1",
    range: "Apr, 2022 - Jul, 2022",
    duration: "1 year 4 months",
    branch: "bootcamp/start",
    type: "learn",
    title: "Started Full-Stack Journey",
    details: "Began structured learning of JavaScript fundamentals and web architecture.",
    stack: ["JavaScript", "HTML", "CSS"],
    links: [
      { label: "Github", href: "#" },
      { label: "Live", href: "#" },
    ],
  },
  {
    id: "t2",
    range: "Aug, 2022 - Dec, 2022",
    duration: "5 months",
    branch: "feature/ui-systems",
    type: "feat",
    title: "Built First Reusable Component System",
    details: "Created reusable UI patterns and shifted from page-by-page styling to system thinking.",
    stack: ["React", "Tailwind"],
    links: [
      { label: "Github", href: "#" },
      { label: "Live", href: "#" },
    ],
  },
  {
    id: "t3",
    range: "Jan, 2023 - May, 2023",
    duration: "5 months",
    branch: "feature/api-integration",
    type: "feat",
    title: "Connected Frontend with Real APIs",
    details: "Implemented API-driven flows and moved from static mocks to data-first interfaces.",
    stack: ["Node.js", "Express", "REST"],
    links: [
      { label: "Github", href: "#" },
      { label: "Live", href: "#" },
    ],
  },
  {
    id: "t4",
    range: "Jun, 2023 - Jan, 2024",
    duration: "8 months",
    branch: "feature/auth-security",
    type: "feat",
    title: "Shipped Authentication + Protected Routes",
    details: "Added login/session flow and role-based access patterns for production-style behavior.",
    stack: ["JWT", "MongoDB", "Express"],
    links: [
      { label: "Github", href: "#" },
      { label: "Live", href: "#" },
    ],
  },
  {
    id: "t5",
    range: "Feb, 2024 - Dec, 2024",
    duration: "11 months",
    branch: "merge/freelance",
    type: "merge",
    title: "Moved Into Client Work",
    details: "Started delivering projects for real users with focus on UX clarity and velocity.",
    stack: ["MERN", "Git"],
    links: [
      { label: "Github", href: "#" },
      { label: "Live", href: "#" },
    ],
  },
  {
    id: "t6",
    range: "Mar, 2025 - Feb, 2026",
    duration: "1 year",
    branch: "release/portfolio-v2",
    type: "release",
    title: "Portfolio Rebuild With Motion + Narrative",
    details: "Designed a stronger brand voice and transformed portfolio into story-driven product case flow.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    links: [
      { label: "Github", href: "#" },
      { label: "Live", href: "#" },
    ],
  },
];

const TYPE_LABEL: Record<ExperienceEvent["type"], string> = {
  feat: "feat",
  learn: "learn",
  merge: "merge",
  release: "release",
};

const TYPE_COLOR: Record<ExperienceEvent["type"], string> = {
  feat: "bg-cyan-400",
  learn: "bg-amber-300",
  merge: "bg-violet-400",
  release: "bg-emerald-400",
};

export function DeveloperTimelineSection() {
  return (
    <section
      id="experience-section"
      className="relative z-40 bg-black px-4 py-14 text-white sm:px-6 md:px-10 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-10 border-b border-white/20 pb-6 md:mb-14 md:pb-8">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 sm:text-xs sm:tracking-[0.18em]">
            git log --graph --oneline --decorate
          </p>
          <h2 className="text-4xl font-semibold leading-none tracking-tight sm:text-5xl md:text-8xl">
            Experience
          </h2>
        </div>

        <div className="space-y-5 md:space-y-10">
          {TIMELINE_EVENTS.map((event, index) => (
            <article
              key={event.id}
              className="grid min-w-0 grid-cols-[22px_minmax(0,1fr)] gap-3 rounded-xl border border-white/15 bg-[#0c0c0c] p-3 sm:grid-cols-[30px_minmax(0,1fr)] sm:gap-4 sm:p-4 md:grid-cols-[72px_1fr] md:gap-8 md:p-7"
            >
              <div className="relative flex justify-center">
                {index < TIMELINE_EVENTS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-7 h-[calc(100%+0.7rem)] w-px bg-white/20 sm:top-8 sm:h-[calc(100%+1rem)] md:top-10 md:h-[calc(100%+3.2rem)]"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className={`mt-1 h-3 w-3 shrink-0 rounded-full ring-[3px] ring-black sm:h-3.5 sm:w-3.5 sm:ring-4 md:mt-2 md:h-4 md:w-4 ${TYPE_COLOR[event.type]}`}
                />
              </div>

              <div className="grid min-w-0 gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8">
                <div className="min-w-0 space-y-3 sm:space-y-4">
                  <div className="flex min-w-0 flex-wrap items-center gap-1.5 text-[10px] sm:gap-2 sm:text-xs md:text-sm">
                    <span className="max-w-full truncate rounded border border-white/25 bg-white/5 px-2 py-1 font-mono text-cyan-200">
                      {event.branch}
                    </span>
                    <span className="rounded border border-white/25 bg-white/5 px-2 py-1 font-mono text-emerald-200">
                      {TYPE_LABEL[event.type]}
                    </span>
                  </div>

                  <h3 className="break-words text-xl font-semibold leading-tight sm:text-2xl md:text-4xl">{event.title}</h3>
                  <p className="max-w-4xl text-sm leading-relaxed text-white/75 md:text-lg">
                    {event.details}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {event.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded border border-white/25 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/85 sm:px-2.5 sm:text-[11px] md:text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="min-w-0 text-left md:min-w-[230px] md:text-right">
                  <span className="inline-flex max-w-full rounded border border-white/25 bg-white/5 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-white/75 sm:text-[11px] md:text-xs">
                    {event.range}
                  </span>
                  <p className="my-3 text-[10px] font-mono uppercase tracking-[0.08em] text-white/50 md:text-[11px]">
                    {event.duration}
                  </p>
                  <div className="flex flex-row flex-wrap items-start gap-3 md:flex-col md:items-end">
                    {event.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="group inline-flex min-w-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/90 md:gap-2 md:text-[11px]"
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
                        <span className="border-b border-dashed border-transparent pb-[1px] transition-colors group-hover:border-white">
                          {link.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

