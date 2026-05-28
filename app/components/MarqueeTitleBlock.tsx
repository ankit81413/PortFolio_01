import type { HTMLAttributes } from "react";

type MarqueeTitleBlockProps = {
  ariaHidden?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function MarqueeTitleBlock({
  ariaHidden = false,
  className,
  ...rest
}: MarqueeTitleBlockProps) {
  return (
    <div
      className={["marquee-block", className].filter(Boolean).join(" ")}
      aria-hidden={ariaHidden}
      {...rest}
    >
      <h1
        className="whitespace-nowrap text-[22vw] font-normal uppercase leading-[0.78] text-black/90 md:text-[15vw]"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        ANKIT
      </h1>
      <p
        className="mt-2 whitespace-nowrap text-[4.2vw] uppercase tracking-[0.25em] text-black/80 md:mt-3 md:text-[2.1vw] text-center"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        MERN STACK DEVELOPER
      </p>
    </div>
  );
}
