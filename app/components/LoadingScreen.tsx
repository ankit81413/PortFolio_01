"use client";

import { useEffect, useMemo, useState } from "react";

export function LoadingScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(8);

  const statusLabel = useMemo(() => {
    if (progress < 35) return "Booting interface";
    if (progress < 70) return "Rendering modules";
    if (progress < 95) return "Finalizing";
    return "Ready";
  }, [progress]);

  useEffect(() => {
    if (window.location.hash) return;
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const startedAt = Date.now();
    let settled = false;

    const complete = () => {
      if (settled) return;
      settled = true;
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, 1400 - elapsed);
      window.setTimeout(() => {
        setProgress(100);
        window.setTimeout(() => setIsLoaded(true), 260);
      }, wait);
    };

    const tick = window.setInterval(() => {
      setProgress((prev) => (prev >= 94 ? prev : prev + Math.max(1, Math.floor((96 - prev) / 8))));
    }, 110);

    if (document.readyState === "complete") {
      complete();
    } else {
      window.addEventListener("load", complete, { once: true });
    }

    const safetyTimeout = window.setTimeout(complete, 3600);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(safetyTimeout);
      window.removeEventListener("load", complete);
    };
  }, []);

  useEffect(() => {
    if (isLoaded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoaded]);

  if (isLoaded) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black text-white transition-opacity duration-300"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:34px_34px]" />
      </div>

      <div className="relative w-[min(92vw,520px)] rounded-2xl border border-white/20 bg-black/80 p-5 backdrop-blur-sm sm:p-7">
        <div className="mb-5 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/70 sm:text-xs">
          <span>Ankit OS</span>
          <span>{progress}%</span>
        </div>

        <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-cyan-300 transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-white/85 sm:text-sm">
          <span className="text-cyan-300">$</span>
          <span>{statusLabel}</span>
          <span className="inline-block h-4 w-[1px] animate-pulse bg-white/70" />
        </div>
      </div>
    </div>
  );
}
