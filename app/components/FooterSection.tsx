 "use client";

import { useEffect, useState } from "react";

const FOOTER_LINKS = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "LeetCode", href: "#" },
  { label: "Dribbble", href: "#" },
];

const QUICK_LINKS = [
  { label: "About", href: "#about-section" },
  { label: "Projects", href: "#projects-section" },
  { label: "Experience", href: "#experience-section" },
  { label: "Contact", href: "#contact-section" },
];

export function FooterSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const root = document.documentElement;
      const totalScrollable = root.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) {
        setIsVisible(false);
        return;
      }
      setIsVisible(window.scrollY >= totalScrollable * 0.5);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <footer
      className={`relative z-40 block overflow-hidden bg-black px-6 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-14 text-white md:fixed md:inset-x-0 md:bottom-0 md:z-0 md:min-h-[520px] md:px-10 md:pb-10 md:pt-18 ${
        isVisible ? "md:block" : "md:hidden"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 15% 15%, rgba(255,255,255,0.12), transparent 35%), radial-gradient(circle at 85% 0%, rgba(0,128,255,0.2), transparent 40%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <div className="mb-10 grid gap-10 border-b border-white/20 pb-10 md:grid-cols-[1.3fr_1fr_1fr] md:gap-12 md:pb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-white/60">Let&apos;s Build</p>
            <p className="mt-4 max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
              Designing meaningful digital products with speed, clarity, and character.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm uppercase tracking-[0.1em] text-white/60">Connect</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-lg text-white/90 transition-colors hover:text-white"
                  >
                    {item.label}
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs text-white/70 transition-colors group-hover:text-white" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm uppercase tracking-[0.1em] text-white/60">Quick Nav</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-lg text-white/85 transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Ankit Portfolio. All rights reserved.</p>
          <p>Crafted in Next.js + Tailwind with a lot of caffeine.</p>
        </div>
      </div>
    </footer>
  );
}

