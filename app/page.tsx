import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { DeveloperTimelineSection } from "./components/DeveloperTimelineSection";
import { ContactSection } from "./components/ContactSection";
import { FooterSection } from "./components/FooterSection";
import { ProjectList } from "./components/ProjectList";
import { ProjectsStickyHeader } from "./components/ProjectsStickyHeader";
import { SectionDock } from "./components/SectionDock";

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen bg-white">
      <Navbar />
      <SectionDock />

      <div className="relative">
        <div className="sticky top-0 h-screen">
          <HeroSection />
        </div>

        <section
          id="about-section"
          className="relative z-30 mt-6 rounded-t-2xl bg-black px-6 py-16 text-white md:mt-8 md:px-10 md:py-24"
        >
          <div className="mx-auto grid w-full max-w-[1600px] gap-12 md:grid-cols-[minmax(180px,280px)_1fr] md:gap-16">
            <h2 className="text-6xl font-medium leading-none tracking-tight md:text-8xl">
              About
            </h2>

            <div className="max-w-5xl space-y-10">
              <p className="text-3xl font-medium leading-[1.3] text-white/90 md:text-6xl">
                I build modern web products with a strong focus on clean UI,
                meaningful motion, and fast, scalable full-stack development.
              </p>

              <p className="max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
                I am Ankit, a MERN stack developer. I enjoy turning ideas into
                polished digital experiences that are practical, performant, and
                visually memorable.
              </p>

              <div className="max-w-4xl border-l border-white/20 pl-4 md:pl-6">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/55">
                  Skills
                </p>
                <ul className="space-y-1.5 text-sm leading-relaxed text-white/80 md:text-base">
                  <li>
                    <span className="font-semibold text-white">Frontend</span> — React, Next.js, TypeScript, Tailwind
                  </li>
                  <li>
                    <span className="font-semibold text-white">Backend</span> — Node.js, Express, REST APIs
                  </li>
                  <li>
                    <span className="font-semibold text-white">Database</span> — MongoDB, Mongoose
                  </li>
                  <li>
                    <span className="font-semibold text-white">Tools</span> — Git, Figma, Postman
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        <section
          id="projects-section"
          className="relative z-40 min-h-screen bg-[#f3f3f3] px-6 pb-14 pt-16 text-black md:px-10 md:pb-20 md:pt-14"
        >
          <div className="mx-auto w-full max-w-[1600px]">
            <ProjectsStickyHeader />

            <div className="mt-10 pt-10 md:mt-12 md:pt-12">
              <div className="grid gap-10 md:grid-cols-4 md:gap-8">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-black/70">
                    Timeframe
                  </p>
                  <p className="text-3xl font-semibold leading-tight md:text-4xl">
                    YEAR 2022-23
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-black/70">
                    Discipline
                  </p>
                  <ul className="space-y-1 text-xl leading-tight md:text-3xl">
                    <li>No code development</li>
                    <li>UI design</li>
                    <li>UX research</li>
                    <li>Art Direction</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-black/70">
                    Tools
                  </p>
                  <ul className="space-y-1 text-xl leading-tight md:text-3xl">
                    <li>Webflow</li>
                    <li>After Effects</li>
                    <li>Wized</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-black/70">
                    Industry
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "#TECH",
                      "#CONSUMER",
                      "#FINTECH",
                      "#CRYPTO",
                      "#NOCODE",
                      "#SAAS",
                      "#WEBAPP",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="cursor-pointer rounded-md border border-black/70 px-4 py-2 text-sm font-semibold tracking-[0.04em] transition-colors hover:bg-black hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ProjectList />
          </div>
        </section>

        <DeveloperTimelineSection />
        <ContactSection />
        <div aria-hidden="true" className="h-[460px] md:h-[520px]" />
      </div>
      <FooterSection />
    </main>
  );
}
