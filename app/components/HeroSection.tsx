import Image from "next/image";

export function HeroSection() {
  const sharedImageLayerClass =
    "pointer-events-none absolute inset-x-0 top-0 mx-auto h-[100%] md:top-auto md:bottom-0";

  return (
    <section className="relative mx-auto mt-24 h-[640px] w-full max-w-[1880px] overflow-hidden rounded-xl bg-white md:mt-28 md:h-[720px] lg:h-[780px]">
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-start pt-12 md:justify-center md:pt-0">
        <h1
          className="text-center text-[22vw] font-normal uppercase leading-[0.78] text-black/90 md:text-[15vw]"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          ANKIT
        </h1>
        <p
          className="mt-2 text-center text-[4.2vw] uppercase tracking-[0.25em] text-black/80 md:mt-3 md:text-[2.1vw]"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          MERN STACK DEVELOPER
        </p>
      </div>

      <div className={`${sharedImageLayerClass} z-30`}>
        <Image
          src="/BannerMe.png"
          alt="Ankit portrait"
          fill
          className="object-contain object-top md:object-bottom"
        />
      </div>
    </section>
  );
}
