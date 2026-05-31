"use client";

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  BsArrowsFullscreen,
  BsDash,
  BsTerminalFill,
  BsXLg,
} from "react-icons/bs";

type TerminalLine = {
  id: string;
  kind: "input" | "output" | "error" | "link" | "help";
  text: string;
  href?: string;
};

type CommandConfig = {
  description: string;
  run: () => TerminalLine[];
};

type FuturisticTerminalProps = {
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
};

const SOCIAL_LINKS = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  leetcode: "https://leetcode.com/",
  resume: "/Ankit_(Mern_Stack_Developer).pdf",
};

const PAGE_TARGETS = {
  about: "#about-section",
  projects: "#projects-section",
  experience: "#experience-section",
  contact: "#contact-section",
};

const createLine = (
  kind: TerminalLine["kind"],
  text: string,
  href?: string
): TerminalLine => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  kind,
  text,
  href,
});

const scrollToSection = (href: string) => {
  const node = document.querySelector(href);
  if (!node) return false;
  node.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
};

export function FuturisticTerminal({
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
}: FuturisticTerminalProps) {
  const [input, setInput] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: "boot-1", kind: "output", text: "booting ankit.portfolio terminal..." },
    { id: "boot-2", kind: "output", text: "type /help to list available commands." },
  ]);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const commandConfigs = useMemo<Record<string, CommandConfig>>(
    () => ({
      "/help": {
        description: "show available commands",
        run: () => [createLine("help", "available commands")],
      },
      "/about": {
        description: "scroll to about section",
        run: () => [
          createLine(
            scrollToSection(PAGE_TARGETS.about) ? "output" : "error",
            "navigating to about"
          ),
        ],
      },
      "/projects": {
        description: "scroll to projects section",
        run: () => [
          createLine(
            scrollToSection(PAGE_TARGETS.projects) ? "output" : "error",
            "navigating to projects"
          ),
        ],
      },
      "/experience": {
        description: "scroll to experience section",
        run: () => [
          createLine(
            scrollToSection(PAGE_TARGETS.experience) ? "output" : "error",
            "navigating to experience"
          ),
        ],
      },
      "/contact": {
        description: "scroll to contact section",
        run: () => [
          createLine(
            scrollToSection(PAGE_TARGETS.contact) ? "output" : "error",
            "navigating to contact"
          ),
        ],
      },
      "/github": {
        description: "print github profile link",
        run: () => [createLine("link", "open github", SOCIAL_LINKS.github)],
      },
      "/linkedin": {
        description: "print linkedin profile link",
        run: () => [createLine("link", "open linkedin", SOCIAL_LINKS.linkedin)],
      },
      "/leetcode": {
        description: "print leetcode profile link",
        run: () => [createLine("link", "open leetcode", SOCIAL_LINKS.leetcode)],
      },
      "/resume": {
        description: "open resume",
        run: () => [createLine("link", "open resume", SOCIAL_LINKS.resume)],
      },
      "/skills": {
        description: "print technical stack",
        run: () => [
          createLine("output", "frontend: React, Next.js, TypeScript, Tailwind"),
          createLine("output", "backend: Node.js, Express, REST APIs"),
          createLine("output", "database: MongoDB, Mongoose"),
          createLine("output", "tools: Git, Figma, Postman"),
        ],
      },
      "/whoami": {
        description: "print identity",
        run: () => [createLine("output", "Ankit - MERN Stack Developer")],
      },
      "/clear": {
        description: "clear terminal",
        run: () => [],
      },
      "/clr": {
        description: "clear terminal alias",
        run: () => [],
      },
    }),
    []
  );

  const commands = Object.keys(commandConfigs);

  useEffect(() => {
    if (!isOpen || isMinimized) return;
    inputRef.current?.focus();
  }, [isOpen, isMinimized]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, isOpen, isMinimized]);

  if (!isOpen || isMinimized) return null;

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();
    const typedLine = createLine("input", command || "(empty)");

    if (!command) {
      setLines((prev) => [...prev, typedLine]);
      return;
    }

    setHistory((prev) => [command, ...prev.filter((item) => item !== command)].slice(0, 20));
    setHistoryIndex(null);

    if (command === "/clear" || command === "/clr") {
      setLines([]);
      return;
    }

    const config = commandConfigs[command];
    if (!config) {
      setLines((prev) => [
        ...prev,
        typedLine,
        createLine("error", `command not found: ${command}. try /help`),
      ]);
      return;
    }

    setLines((prev) => [...prev, typedLine, ...config.run()]);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(input);
    setInput("");
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      runCommand(input);
      setInput("");
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = historyIndex === null ? 0 : Math.min(historyIndex + 1, history.length - 1);
      if (history[nextIndex]) {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex >= 0 ? nextIndex : null);
      setInput(nextIndex >= 0 ? history[nextIndex] : "");
    }
  };

  const commandButtonClass =
    "rounded border border-cyan-300/20 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-cyan-100/80 transition-colors hover:border-cyan-200/50 hover:bg-cyan-200/10 hover:text-cyan-50";

  return (
    <div className="fixed inset-x-0 bottom-24 z-[95] flex justify-center px-4 md:bottom-28">
      <section
        className={`overflow-hidden border border-white/15 bg-[#050608]/94 text-white shadow-[0_30px_80px_-34px_rgba(0,0,0,0.9)] backdrop-blur-2xl ${
          isFullscreen
            ? "h-[calc(100vh-9rem)] w-[calc(100vw-2rem)] rounded-2xl md:w-[calc(100vw-4rem)]"
            : "h-[440px] w-full max-w-[780px] rounded-2xl"
        }`}
        aria-label="Portfolio command terminal"
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Close terminal"
              onClick={onClose}
              className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#ff5f57] text-[8px] text-black/70"
            >
              <BsXLg />
            </button>
            <button
              type="button"
              aria-label="Minimize terminal"
              onClick={onMinimize}
              className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#ffbd2e] text-[9px] text-black/70"
            >
              <BsDash />
            </button>
            <button
              type="button"
              aria-label="Toggle fullscreen terminal"
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#28c840] text-[8px] text-black/70"
            >
              <BsArrowsFullscreen />
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
            <BsTerminalFill className="text-cyan-200" />
            ankit-os / terminal
          </div>

          <div className="h-3.5 w-[42px]" aria-hidden="true" />
        </div>

        <div className="relative h-[calc(100%-48px)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(45, 212, 191, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 212, 191, 0.06) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex h-full flex-col">
            <div
              ref={scrollRef}
              onMouseDown={() => inputRef.current?.focus()}
              className="flex flex-1 cursor-text flex-col overflow-y-auto px-4 py-4 font-mono text-xs leading-relaxed md:text-sm"
            >
              {lines.map((line) => {
                if (line.kind === "help") {
                  return (
                    <div key={line.id} className="mb-3">
                      <p className="mb-2 text-emerald-300">$SYS: {line.text}</p>
                      <div className="grid gap-1.5 sm:grid-cols-2">
                        {commands.map((command) => (
                          <button
                            key={command}
                            type="button"
                            onClick={() => {
                              runCommand(command);
                              setInput("");
                            }}
                            className="flex items-center justify-between rounded border border-white/10 bg-white/[0.03] px-2 py-1.5 text-left transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10"
                          >
                            <span className="text-cyan-200">{command}</span>
                            <span className="ml-3 truncate text-[10px] text-white/45">
                              {commandConfigs[command].description}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (line.kind === "link" && line.href) {
                  return (
                    <p key={line.id} className="text-white/78">
                      <span className="mr-2 text-emerald-300">$OUT</span>
                      <a
                        href={line.href}
                        target={line.href.startsWith("#") || line.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={line.href.startsWith("#") || line.href.startsWith("mailto:") ? undefined : "noreferrer"}
                        className="border-b border-dashed border-cyan-200/70 text-cyan-200 transition-colors hover:text-cyan-50"
                      >
                        {line.text}
                      </a>
                    </p>
                  );
                }

                return (
                  <p
                    key={line.id}
                    className={
                      line.kind === "input"
                        ? "text-white"
                        : line.kind === "error"
                          ? "text-rose-300"
                          : "text-white/72"
                    }
                  >
                    <span className="mr-2 text-emerald-300">
                      {line.kind === "input" ? "$" : line.kind === "error" ? "$ERR" : "$OUT"}
                    </span>
                    {line.text}
                  </p>
                );
              })}

              <form onSubmit={onSubmit} className="mt-1 flex min-h-[180px] flex-1 items-start gap-2 font-mono text-sm">
                <span className="pt-[1px] text-emerald-300">$</span>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={onInputKeyDown}
                  rows={1}
                  className="min-h-full min-w-0 flex-1 resize-none bg-transparent text-white outline-none placeholder:text-white/30"
                  placeholder="type /help"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>

            <div className="border-t border-white/10 bg-black/25 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {["/help", "/about", "/projects", "/github", "/linkedin", "/clr"].map((command) => (
                  <button
                    key={command}
                    type="button"
                    className={commandButtonClass}
                    onClick={() => {
                      runCommand(command);
                      setInput("");
                      inputRef.current?.focus();
                    }}
                  >
                    {command}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
