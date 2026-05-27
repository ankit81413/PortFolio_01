export function Navbar() {
  return (
    <nav className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-[1880px] -translate-x-1/2 items-center justify-between rounded-xl border border-black/10 bg-white/95 px-0 py-3 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)] backdrop-blur md:top-7 md:w-[calc(100%-3.5rem)] md:px-5 md:py-3">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black text-sm font-semibold tracking-wide text-white">
          MØ
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
          {/* <span className="h-1.5 w-1.5 rounded-full bg-white" /> */}
          {/* <i className="fa-solid fa-arrow-down"></i> */}
          <i className="fa-solid fa-download"></i>
          Download Resume
        </a>
      </div>
    </nav>
  );
}
