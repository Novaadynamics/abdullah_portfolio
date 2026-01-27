"use client"
import Image from 'next/image';
import bg from '../../public/background/home-bg.png';
import laptop from '../../public/background/laptop.png';
import Navigation from '@/components/navigation';
import { useState } from 'react';

export default function Home() {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      {/* full-screen, semi-opaque bg image */}
      <Image
        priority
        src={bg}
        alt="background"
        fill
        sizes="100vw"
        className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-80 blur-[0.2px] bg-black"
      />
      <main className="relative flex max-h-[66vh] min-h-screen overflow-x-hidden flex-col items-center">

        {/* HEADLINE */}
        <div className="z-50 pt-14 text-center">
          <h1
            className="text-transparent text-center text-[5rem] font-[500] uppercase leading-none md:text-[6rem] lg:text-[7rem] text-glow-stroke-neon"
          >
            Muhammad<br /> Abdullah
          </h1>

          <h2 className="text-amethyst-neon text-glow-stroke-purple mt-1 text-[1.8rem] font-light uppercase leading-snug md:text-[2rem] lg:text-[2.2rem]">
            Software Engineer
          </h2>

        </div>
        <div className="relative z-10 flex w-full flex-1 items-center justify-center bg-gradient-to-t from-black via-black/30 to-transparent">
          {/* Wrapper for laptop + rings */}
          <div className="relative flex items-center justify-center ">
            {/* Laptop */}
            <Image
              priority
              src={laptop}
              alt="laptop"
              // laptop
              className={`relative z-20 object-contain animate-float-laptop laptop w-[70%] sm:w-[80%] md:w-[24rem] lg:w-[35rem] mb-6 md:mb-24
                ${hovered ? "active" : ""}`}
            />
            {/* glowing borderline under laptop */}
            <div
              className="absolute mt-16 h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] md:h-[420px] md:w-[420px] lg:h-[500px] lg:w-[500px]
                          rounded-full -neon borderline animate-ripple-neon"
              style={{ transform: "perspective(600px) rotateX(80deg)" }}
            />

            <div
              className="absolute mt-16 h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] md:h-[560px] md:w-[560px] lg:h-[640px] lg:w-[640px]
                          rounded-full -neon borderline2 animate-ripple-neon"
              style={{ transform: "perspective(600px) rotateX(80deg)" }}
            />

            <div
              className="absolute mt-16 h-[440px] w-[440px] sm:h-[660px] sm:w-[660px] md:h-[840px] md:w-[840px] lg:h-[800px] lg:w-[800px]
                          rounded-full -neon borderline3 animate-ripple-neon"
              style={{ transform: "perspective(600px) rotateX(80deg)" }}
            />
          </div>
          {/* navigation buttons */}
          <Navigation setHovered={setHovered} hovered={hovered} />
        </div>

      </main>
    </>
  );
}
