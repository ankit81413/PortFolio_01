type SocialCard = {
  label: string;
  handle: string;
  href: string;
  iconClass: string;
  boxClass: string;
  iconWrapClass: string;
  titleClass: string;
};

type ContactPoint = {
  label: string;
  value: string;
  href?: string;
};

const SOCIAL_CARDS: SocialCard[] = [
  {
    label: "GitHub",
    handle: "@ankit-dev",
    href: "#",
    iconClass: "fa-brands fa-github",
    boxClass: "border-lime-300 bg-lime-300/90 hover:bg-lime-300",
    iconWrapClass: "border-slate-300 bg-slate-900 text-white",
    titleClass: "text-black",
  },
  {
    label: "LinkedIn",
    handle: "Ankit Kumar",
    href: "#",
    iconClass: "fa-brands fa-linkedin-in",
    boxClass: "border-rose-300 bg-rose-500 hover:bg-rose-500/95",
    iconWrapClass: "border-sky-300 bg-sky-600 text-white",
    titleClass: "text-white",
  },
  {
    label: "LeetCode",
    handle: "ankit_codes",
    href: "#",
    iconClass: "fa-solid fa-code",
    boxClass: "border-violet-300 bg-violet-300/80 hover:bg-violet-300",
    iconWrapClass: "border-amber-300 bg-amber-500 text-white",
    titleClass: "text-black",
  },
  {
    label: "Dribbble",
    handle: "@ankit_ui",
    href: "#",
    iconClass: "fa-brands fa-dribbble",
    boxClass: "border-blue-400 bg-blue-500 hover:bg-blue-500/95",
    iconWrapClass: "border-pink-300 bg-pink-500 text-white",
    titleClass: "text-white",
  },
];

const CONTACT_POINTS: ContactPoint[] = [
  {
    label: "Email",
    value: "ankit@example.com",
    href: "mailto:ankit@example.com",
  },
  {
    label: "Phone",
    value: "+91 90000 00000",
    href: "tel:+919000000000",
  },
  {
    label: "Location",
    value: "Delhi, India",
  },
  {
    label: "Availability",
    value: "Open for freelance + full-time roles",
  },
];

export function ContactSection() {
  return (
    <section
      id="contact-section"
      className="relative z-40 bg-[#f7f7f5] px-6 py-16 text-black md:px-10 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-10 border-b border-black/15 pb-6 md:mb-14 md:pb-8">
          <h2 className="text-5xl font-semibold leading-none tracking-tight md:text-8xl">
            Contact
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <div className="grid gap-4 sm:grid-cols-2">
            {SOCIAL_CARDS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 md:min-h-[260px] ${item.boxClass}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border text-lg ${item.iconWrapClass}`}
                  >
                    <i className={item.iconClass} aria-hidden="true" />
                  </div>
                  <span className={`text-sm font-semibold uppercase tracking-[0.06em] ${item.titleClass}`}>
                    {item.label} <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                  </span>
                </div>

                <div className="pb-1">
                  <p
                    className={`max-w-full break-words text-[36px] font-semibold leading-[0.94] tracking-[-0.02em] ${item.titleClass} md:text-[45px]`}
                    style={{ overflowWrap: "anywhere" }}
                  >
                    {item.handle}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="rounded-2xl border border-black/15 bg-white p-6 md:p-8">
            <div className="mb-4 border-b border-black/15 pb-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-black/65">
                Direct links
              </h3>
            </div>

            <ul className="space-y-3">
              {CONTACT_POINTS.map((item) => {
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="group relative flex items-center justify-between overflow-hidden rounded-lg border border-black/20 px-4 py-3"
                      >
                        <span className="pointer-events-none absolute inset-x-0 -top-full h-full bg-black transition-[top] duration-300 ease-out group-hover:top-0" />
                        <span className="relative z-10">
                          <span className="block text-xs uppercase tracking-[0.09em] text-black/50 transition-colors duration-200 group-hover:text-white/70">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-lg font-medium text-black/90 transition-colors duration-200 group-hover:text-white md:text-xl">
                            {item.value}
                          </span>
                        </span>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          className="relative z-10 h-4 w-4 text-black/70 transition-colors duration-200 group-hover:text-white"
                          fill="none"
                        >
                          <path
                            d="M5 15L15 5"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                          />
                          <path
                            d="M8 5H15V12"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    ) : (
                      <div className="group relative flex items-center justify-between overflow-hidden rounded-lg border border-black/20 px-4 py-3">
                        <span className="pointer-events-none absolute inset-x-0 -top-full h-full bg-black transition-[top] duration-300 ease-out group-hover:top-0" />
                        <span className="relative z-10">
                          <span className="block text-xs uppercase tracking-[0.09em] text-black/50 transition-colors duration-200 group-hover:text-white/70">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-lg font-medium text-black/90 transition-colors duration-200 group-hover:text-white md:text-xl">
                            {item.value}
                          </span>
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
