type TechName =
  | "docker"
  | "react"
  | "javascript"
  | "html"
  | "css"
  | "express"
  | "mongodb"
  | "nodejs";

type TechLogoIconProps = {
  tech: TechName;
  className?: string;
};

function DockerLogo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#E8F6FF" />
      <rect x="12" y="26" width="8" height="8" fill="#2396ED" />
      <rect x="22" y="26" width="8" height="8" fill="#2396ED" />
      <rect x="32" y="26" width="8" height="8" fill="#2396ED" />
      <rect x="42" y="26" width="8" height="8" fill="#2396ED" />
      <rect x="22" y="16" width="8" height="8" fill="#2396ED" />
      <rect x="32" y="16" width="8" height="8" fill="#2396ED" />
      <path
        d="M13 36h39c-1 8-8 14-17 14H13z"
        fill="#1D78C1"
        stroke="#16639D"
        strokeWidth="1.2"
      />
      <circle cx="50" cy="15" r="3" fill="#8FCFFF" />
    </svg>
  );
}

function ReactLogo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#091621" />
      <circle cx="32" cy="32" r="4.2" fill="#61DAFB" />
      <ellipse
        cx="32"
        cy="32"
        rx="22"
        ry="8"
        fill="none"
        stroke="#61DAFB"
        strokeWidth="2.2"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="22"
        ry="8"
        fill="none"
        stroke="#61DAFB"
        strokeWidth="2.2"
        transform="rotate(60 32 32)"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="22"
        ry="8"
        fill="none"
        stroke="#61DAFB"
        strokeWidth="2.2"
        transform="rotate(120 32 32)"
      />
    </svg>
  );
}

function JavaScriptLogo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#F7DF1E" />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="21"
        fill="#1F1F1F"
      >
        JS
      </text>
    </svg>
  );
}

function HtmlLogo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#FFF0EC" />
      <path d="M12 10h40l-4 40-16 5-16-5z" fill="#E34F26" />
      <path d="M32 10h20l-4 40-16 5z" fill="#F06529" />
      <path d="M23 23h18l-.5 5H28l.4 4h12l-1 10-7 2-7-2-.5-6h4.8l.2 2.5 2.5.8 2.6-.8.2-3.5h-11z" fill="#fff" />
    </svg>
  );
}

function CssLogo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#EAF4FF" />
      <path d="M12 10h40l-4 40-16 5-16-5z" fill="#1572B6" />
      <path d="M32 10h20l-4 40-16 5z" fill="#33A9DC" />
      <path d="M23 23h18l-.5 5H28l.4 4h12l-1 10-7 2-7-2-.5-6h4.8l.2 2.5 2.5.8 2.6-.8.2-3.5h-11z" fill="#fff" />
    </svg>
  );
}

function ExpressLogo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="express-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#101114" />
          <stop offset="100%" stopColor="#30343A" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#express-bg)" />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="14"
        letterSpacing="1"
        fill="#FFFFFF"
      >
        EX
      </text>
    </svg>
  );
}

function MongoDbLogo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#EDF8F1" />
      <path
        d="M32 12c6 8 9 16 9 25 0 8-3 14-9 17-6-3-9-9-9-17 0-9 3-17 9-25z"
        fill="#13AA52"
      />
      <path d="M32 12v42" stroke="#0E7E3D" strokeWidth="2" />
    </svg>
  );
}

function NodeJsLogo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#EEF7EA" />
      <path
        d="M32 10l18 10v24L32 54 14 44V20z"
        fill="#539E43"
        stroke="#417E35"
        strokeWidth="1.5"
      />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="16"
        fill="#FFFFFF"
      >
        N
      </text>
    </svg>
  );
}

export function TechLogoIcon({ tech, className }: TechLogoIconProps) {
  const Logo = {
    docker: DockerLogo,
    react: ReactLogo,
    javascript: JavaScriptLogo,
    html: HtmlLogo,
    css: CssLogo,
    express: ExpressLogo,
    mongodb: MongoDbLogo,
    nodejs: NodeJsLogo,
  }[tech];

  return (
    <span className={className} role="img" aria-label={tech}>
      <Logo />
    </span>
  );
}
