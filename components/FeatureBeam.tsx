"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image";

export const FeatureBeam = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);
  const icon3Ref = useRef<HTMLDivElement>(null);
  const icon4Ref = useRef<HTMLDivElement>(null);
  const icon5Ref = useRef<HTMLDivElement>(null);
  const icon6Ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative h-[400px] w-full">
      {/* Center Logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
        <div
          ref={logoRef}
          className="mx-auto h-24 w-24 rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
        >
          <Image src="/logo.svg" alt="Logo" width={80} height={80} />
        </div>
        <p className="mt-2 text-sm font-medium">Your Product</p>
      </div>

      {/* Left Side Icons */}
      <div className="absolute left-[15%] top-[25%] text-center z-20">
        <div
          ref={icon1Ref}
          className="mx-auto h-14 w-14 rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
        >
          <Icons.nordnet />
        </div>
        <p className="mt-2 text-sm font-medium">Google Drive</p>
      </div>

      <div className="absolute left-[10%] top-1/2 -translate-y-1/2 text-center z-20">
        <div
          ref={icon2Ref}
          className="mx-auto h-14 w-14 rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
        >
          <Icons.firi />
        </div>
        <p className="mt-2 text-sm font-medium">Notion</p>
      </div>


      {/* Right Side Icons */}
      <div className="absolute right-[15%] top-[25%] text-center z-20">
        <div
          ref={icon4Ref}
          className="mx-auto h-14 w-14 rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
        >
          <Icons.kron />
        </div>
        <p className="mt-2 text-sm font-medium">Google Docs</p>
      </div>

      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 text-center z-20">
        <div
          ref={icon5Ref}
          className="mx-auto h-14 w-14 rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
        >
          <Icons.dnb />
        </div>
        <p className="mt-2 text-sm font-medium">Zapier</p>
      </div>


      {/* Place all AnimatedBeam components in a wrapper with lower z-index */}
      <div className="z-10">
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={icon1Ref}
          toRef={logoRef}
          gradientStartColor="#4285F4"
          gradientStopColor="#0F9D58"
          curvature={-75}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={icon2Ref}
          toRef={logoRef}
          gradientStartColor="#000000"
          gradientStopColor="#333333"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={icon3Ref}
          toRef={logoRef}
          gradientStartColor="#25D366"
          gradientStopColor="#128C7E"
          curvature={75}
        />

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={logoRef}
          toRef={icon4Ref}
          gradientStartColor="#4285F4"
          gradientStopColor="#DB4437"
          curvature={-75}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={logoRef}
          toRef={icon5Ref}
          gradientStartColor="#FF4F00"
          gradientStopColor="#FF8000"
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={logoRef}
          toRef={icon6Ref}
          gradientStartColor="#0084FF"
          gradientStopColor="#1292FF"
          curvature={75}
          reverse
        />
      </div>
    </div>
  );
};

const Icons = {
  nordnet: () => (
    <div className="w-8 h-8 flex items-center justify-center">
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="100%" height="100%" viewBox="0 0 1200.000000 630.000000"
        preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,630.000000) scale(0.100000,-0.100000)"
          fill="#00416B" stroke="none">
          <path d="M0 3150 l0 -3150 6000 0 6000 0 0 3150 0 3150 -6000 0 -6000 0 0
          -3150z m6560 640 c0 -649 2 -1180 5 -1180 2 0 646 531 1431 1180 l1426 1180
          696 0 c688 0 696 0 677 -19 -11 -11 -654 -544 -1430 -1185 l-1409 -1166 -1253
          0 -1253 0 0 1180 c0 649 -2 1180 -5 1180 -3 0 -648 -531 -1432 -1180 l-1427
          -1180 -695 0 -696 0 25 24 c14 13 657 547 1429 1185 l1404 1161 1254 0 1253 0
          0 -1180z" />
        </g>
      </svg>
    </div>
  ),
  firi: () => (
    <div className="w-8 h-8 flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#FF3750"/>
        <path d="M7.89551 15.7909H16.1045V7.58197H7.89551V15.7909Z" fill="white"/>
      </svg>
    </div>
  ),
  dnb: () => (
    <div className="w-8 h-8 flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="12" fill="#007582"/>
        <path d="M6 12H18" stroke="white" strokeWidth="2"/>
        <path d="M12 6L12 18" stroke="white" strokeWidth="2"/>
      </svg>
    </div>
  ),
  kron: () => (
    <div className="w-8 h-8 flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#1A1A1A"/>
        <path d="M8 8L16 16M16 8L8 16" stroke="white" strokeWidth="2"/>
      </svg>
    </div>
  )
};
