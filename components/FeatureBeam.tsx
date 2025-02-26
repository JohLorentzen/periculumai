"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image";

// Define the Icons component before using it in the FeatureBeam component
const Icons = {
  notion: () => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 99 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.7 77.2L28.9 82.5C29.1 82.7 29.3 82.8 29.6 82.8C29.9 82.8 30.1 82.7 30.3 82.5L98.2 14.6C98.4 14.4 98.5 14.2 98.5 13.9C98.5 13.6 98.4 13.4 98.2 13.2L93.9 8.9C93.7 8.7 93.5 8.6 93.2 8.6C92.9 8.6 92.7 8.7 92.5 8.9L24.7 76.8C24.5 77 24.4 77.2 24.4 77.5C24.4 77.8 24.5 78 24.7 77.2Z"
        fill="black"
      />
      <path
        d="M45.6 63.9L41.4 58.6C41.2 58.4 41 58.3 40.7 58.3C40.4 58.3 40.2 58.4 40 58.6L0.3 98.3C0.1 98.5 0 98.7 0 99C0 99.3 0.1 99.5 0.3 99.7L4.6 104C4.8 104.2 5 104.3 5.3 104.3C5.6 104.3 5.8 104.2 6 104L45.6 64.3C45.8 64.1 45.9 63.9 45.9 63.6C45.9 63.3 45.8 63.1 45.6 63.9Z"
        fill="black"
      />
      <path
        d="M98.2 99.7L56.5 58C56.3 57.8 56.1 57.7 55.8 57.7C55.5 57.7 55.3 57.8 55.1 58L24.7 88.4C24.5 88.6 24.4 88.8 24.4 89.1C24.4 89.4 24.5 89.6 24.7 89.8L29 94.1C29.2 94.3 29.4 94.4 29.7 94.4C30 94.4 30.2 94.3 30.4 94.1L55.8 68.7L92.5 105.4C92.7 105.6 92.9 105.7 93.2 105.7C93.5 105.7 93.7 105.6 93.9 105.4L98.2 101.1C98.4 100.9 98.5 100.7 98.5 100.4C98.5 100.1 98.4 99.9 98.2 99.7Z"
        fill="black"
      />
      <path
        d="M17.7 64.3L48.1 33.9C48.3 33.7 48.4 33.5 48.4 33.2C48.4 32.9 48.3 32.7 48.1 32.5L43.8 28.2C43.6 28 43.4 27.9 43.1 27.9C42.8 27.9 42.6 28 42.4 28.2L12 58.6C11.8 58.8 11.7 59 11.7 59.3C11.7 59.6 11.8 59.8 12 60L16.3 64.3C16.5 64.5 16.7 64.6 17 64.6C17.3 64.6 17.5 64.5 17.7 64.3Z"
        fill="black"
      />
      <path
        d="M61.8 47.9L92.2 17.5C92.4 17.3 92.5 17.1 92.5 16.8C92.5 16.5 92.4 16.3 92.2 16.1L87.9 11.8C87.7 11.6 87.5 11.5 87.2 11.5C86.9 11.5 86.7 11.6 86.5 11.8L56.1 42.2C55.9 42.4 55.8 42.6 55.8 42.9C55.8 43.2 55.9 43.4 56.1 43.6L60.4 47.9C60.6 48.1 60.8 48.2 61.1 48.2C61.4 48.2 61.6 48.1 61.8 47.9Z"
        fill="black"
      />
    </svg>
  ),
  openai: () => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  googleDrive: () => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 87.3 78"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
        fill="#0066da"
      />
      <path
        d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
        fill="#00ac47"
      />
      <path
        d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
        fill="#ea4335"
      />
      <path
        d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
        fill="#00832d"
      />
      <path
        d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
        fill="#2684fc"
      />
      <path
        d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
        fill="#ffba00"
      />
    </svg>
  ),
  whatsapp: () => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
        fill="#25D366"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.7911 37.5H24.7852C22.3519 37.4989 19.9551 36.9214 17.8223 35.8306L10.5 37.5L12.2148 30.3795C11.0113 28.1667 10.3798 25.6565 10.3809 23.0881C10.3839 14.6867 16.8059 7.9 24.7911 7.9C28.6055 7.9 32.1913 9.3808 34.8783 12.1066C37.5652 14.8325 39.0002 18.4775 39 22.3476C38.997 30.7495 32.7741 37.5 24.7911 37.5ZM18.2304 33.1693L18.7335 33.4768C20.5577 34.5092 22.6558 35.0532 24.7863 35.0542H24.7911C31.3942 35.0542 36.5723 29.6504 36.5747 22.3465C36.5747 19.1337 35.3899 16.1368 33.2073 13.9185C31.0247 11.7001 28.0827 10.4969 24.7911 10.4969C18.1845 10.4969 13.0075 15.9017 13.0051 23.2056C13.0051 25.4726 13.6321 27.6644 14.8127 29.5379L15.1445 30.0641L14.1172 34.2051L18.2304 33.1693ZM31.8045 26.5446C32.0942 26.6864 32.2926 26.7807 32.3848 26.9226C32.4991 27.0998 32.4991 27.9819 32.1001 29.0075C31.7011 30.0331 30.0625 30.9617 29.1808 31.0995C28.3921 31.2221 27.4099 31.2707 26.3134 30.9153C25.6483 30.7035 24.8144 30.4211 23.7632 29.9664C19.9086 28.2154 17.3347 24.4 16.9357 23.8489C16.9006 23.8003 16.8741 23.7644 16.8564 23.7414L16.8528 23.7367C16.6111 23.4277 15.3857 21.8278 15.3857 20.1815C15.3857 18.6316 16.2 17.7495 16.6 17.3232C16.6349 17.2851 16.6682 17.2489 16.7 17.2144C17.0334 16.8591 17.4324 16.7678 17.6889 16.7678C17.9454 16.7678 18.2019 16.7713 18.4241 16.7819C18.4586 16.7832 18.4939 16.7819 18.5298 16.7806C18.7234 16.7736 18.9568 16.7649 19.1894 17.2739C19.3472 17.6223 19.6089 18.2199 19.8649 18.8033C20.3789 20.0168 20.4584 20.1815 20.4584 20.1815C20.5727 20.4044 20.6413 20.6729 20.5271 20.9869C20.5127 21.0221 20.4996 21.0555 20.4872 21.0875C20.3704 21.3608 20.2883 21.5552 20.1055 21.7781C20.0326 21.8651 19.9568 21.9592 19.881 22.0533C19.7293 22.2415 19.5776 22.4297 19.4519 22.5559C19.2234 22.7788 18.9883 23.0199 19.2448 23.4918C19.5013 23.9637 20.3294 25.3249 21.5547 26.4206C22.9666 27.6945 24.1919 28.2154 24.7627 28.4383C24.9439 28.5085 25.0897 28.5651 25.1984 28.6112C25.6659 28.8341 25.9224 28.7884 26.1789 28.4744C26.4354 28.1605 27.2192 27.2327 27.5214 26.7608C27.8235 26.2889 28.1257 26.3803 28.5247 26.5103C28.9237 26.6403 30.9296 27.6137 31.3286 27.8366C31.4882 27.9166 31.6339 27.9879 31.8045 26.5446Z"
        fill="white"
      />
    </svg>
  ),
  googleDocs: () => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 47 65"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          x1="50.0053945%"
          y1="8.58610612%"
          x2="50.0053945%"
          y2="100.013939%"
          id="linearGradient-docs"
        >
          <stop stopColor="#1A237E" stopOpacity="0.2" offset="0%" />
          <stop stopColor="#1A237E" stopOpacity="0.02" offset="100%" />
        </linearGradient>
        <radialGradient
          cx="3.16804688%"
          cy="2.71744318%"
          fx="3.16804688%"
          fy="2.71744318%"
          r="161.248516%"
          gradientTransform="translate(0.031680,0.027174),scale(1.000000,0.723077),translate(-0.031680,-0.027174)"
          id="radialGradient-docs"
        >
          <stop stopColor="#FFFFFF" stopOpacity="0.1" offset="0%" />
          <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%" />
        </radialGradient>
      </defs>
      <path
        d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L36.71875,10.3409091 L29.375,0 Z"
        id="Path"
        fill="#4285F4"
      />
      <polygon
        id="Path"
        fill="url(#linearGradient-docs)"
        points="30.6638281 16.4309659 47 32.8582386 47 17.7272727"
      ></polygon>
      <path
        d="M11.75,47.2727273 L35.25,47.2727273 L35.25,44.3181818 L11.75,44.3181818 L11.75,47.2727273 Z M11.75,53.1818182 L29.375,53.1818182 L29.375,50.2272727 L11.75,50.2272727 L11.75,53.1818182 Z M11.75,32.5 L11.75,35.4545455 L35.25,35.4545455 L35.25,32.5 L11.75,32.5 Z M11.75,41.3636364 L35.25,41.3636364 L35.25,38.4090909 L11.75,38.4090909 L11.75,41.3636364 Z"
        id="Shape"
        fill="#F1F1F1"
      />
      <path
        d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z"
        id="Path"
        fill="url(#radialGradient-docs)"
      />
    </svg>
  ),
  zapier: () => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 244 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M57.1877 45.2253L57.1534 45.1166L78.809 25.2914V15.7391H44.0663V25.2914H64.8181L64.8524 25.3829L43.4084 45.2253V54.7775H79.1579V45.2253H57.1877Z"
        fill="#201515"
      />
      <path
        d="M39.0441 45.2253H0V54.789H39.0441V45.2253Z"
        fill="#FF4F00"
      />
    </svg>
  ),
  messenger: () => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="messengerGradient"
          cx="11.087"
          cy="7.022"
          r="47.612"
          gradientTransform="matrix(1 0 0 -1 0 50)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1292ff"></stop>
          <stop offset=".079" stopColor="#2982ff"></stop>
          <stop offset=".23" stopColor="#4e69ff"></stop>
          <stop offset=".351" stopColor="#6559ff"></stop>
          <stop offset=".428" stopColor="#6d53ff"></stop>
          <stop offset=".754" stopColor="#df47aa"></stop>
          <stop offset=".946" stopColor="#ff6257"></stop>
        </radialGradient>
      </defs>
      <path
        fill="url(#messengerGradient)"
        d="M44,23.5C44,34.27,35.05,43,24,43c-1.651,0-3.25-0.194-4.784-0.564	c-0.465-0.112-0.951-0.069-1.379,0.145L13.46,44.77C12.33,45.335,11,44.513,11,43.249v-4.025c0-0.575-0.257-1.111-0.681-1.499	C6.425,34.165,4,29.11,4,23.5C4,12.73,12.95,4,24,4S44,12.73,44,23.5z"
      />
      <path
        fill="#ffffff"
        d="M34.394,18.501l-5.7,4.22c-0.61,0.46-1.44,0.46-2.04,0.01L22.68,19.74	c-1.68-1.25-4.06-0.82-5.19,0.94l-1.21,1.89l-4.11,6.68c-0.6,0.94,0.55,2.01,1.44,1.34l5.7-4.22c0.61-0.46,1.44-0.46,2.04-0.01	l3.974,2.991c1.68,1.25,4.06,0.82,5.19-0.94l1.21-1.89l4.11-6.68C36.434,18.901,35.284,17.831,34.394,18.501z"
      />
    </svg>
  ),
};

export function FeatureBeam() {
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
      {/* Animated Beams Layer - explicitly placed first in DOM so they render behind icons */}
      <div className="absolute inset-0">
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={icon1Ref}
          toRef={logoRef}
          gradientStartColor="#4285F4"
          gradientStopColor="#0F9D58"
          curvature={40}
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
          curvature={40}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={logoRef}
          toRef={icon4Ref}
          gradientStartColor="#4285F4"
          gradientStopColor="#0F9D58"
          curvature={40}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={logoRef}
          toRef={icon5Ref}
          gradientStartColor="#FF4F00"
          gradientStopColor="#FF8A00"
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={logoRef}
          toRef={icon6Ref}
          gradientStartColor="#0084FF"
          gradientStopColor="#00B2FF"
          curvature={40}
          reverse
        />
      </div>

      {/* Center Logo */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        <div
          ref={logoRef}
          className="mx-auto h-24 w-24 rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
        >
          <Image src="/logo.svg" alt="Logo" width={80} height={80} />
        </div>
        <p className="mt-2 text-sm font-medium">Your Product</p>
      </div>

      {/* Left Side Icons */}
      <div className="absolute left-[15%] top-[25%] z-10 text-center">
        <div
          ref={icon1Ref}
          className="mx-auto h-14 w-14 rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
        >
          <Icons.googleDrive />
        </div>
        <p className="mt-2 text-sm font-medium">Google Drive</p>
      </div>

      <div className="absolute left-[10%] top-1/2 z-10 -translate-y-1/2 text-center">
        <div
          ref={icon2Ref}
          className="mx-auto h-14 w-14 rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
        >
          <Icons.notion />
        </div>
        <p className="mt-2 text-sm font-medium">Notion</p>
      </div>

      <div className="absolute bottom-[25%] left-[15%] z-10 text-center">
        <div
          ref={icon3Ref}
          className="mx-auto h-14 w-14 rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
        >
          <Icons.whatsapp />
        </div>
        <p className="mt-2 text-sm font-medium">WhatsApp</p>
      </div>

      {/* Right Side Icons */}
      <div className="absolute right-[15%] top-[25%] z-10 text-center">
        <div
          ref={icon4Ref}
          className="mx-auto h-14 w-14 rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
        >
          <Icons.googleDocs />
        </div>
        <p className="mt-2 text-sm font-medium">Google Docs</p>
      </div>

      <div className="absolute right-[10%] top-1/2 z-10 -translate-y-1/2 text-center">
        <div
          ref={icon5Ref}
          className="mx-auto h-14 w-14 rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
        >
          <Icons.zapier />
        </div>
        <p className="mt-2 text-sm font-medium">Zapier</p>
      </div>

      <div className="absolute bottom-[25%] right-[15%] z-10 text-center">
        <div
          ref={icon6Ref}
          className="mx-auto h-14 w-14 rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
        >
          <Icons.messenger />
        </div>
        <p className="mt-2 text-sm font-medium">Messenger</p>
      </div>
    </div>
  );
}
