"use client";

import { motion, useReducedMotion } from "framer-motion";

const drawTransition = (delay: number, duration: number) => ({
  delay,
  duration,
  ease: [0.4, 0, 0.2, 1] as const,
});

export function JrSignature({ animated = true }: { animated?: boolean }) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animated && !reduceMotion;
  const initialStroke = shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 };

  return (
    <svg viewBox="0 0 1280 1280" aria-hidden="true">
      <defs>
        <mask id="jr-stroke-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1280" height="1280">
          <rect width="1280" height="1280" fill="black" />
          <motion.path
            d="M355 445 C438 389 558 344 686 311 C745 296 798 283 830 276 C841 274 847 280 841 288 C772 305 704 319 635 340"
            fill="none"
            stroke="white"
            strokeWidth="78"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={initialStroke}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={shouldAnimate ? drawTransition(.1, .4) : { duration: 0 }}
          />
          <motion.path
            d="M735 301 C701 420 656 548 599 682 C544 812 480 924 399 1003 C337 1060 266 1084 210 1063"
            fill="none"
            stroke="white"
            strokeWidth="62"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={initialStroke}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={shouldAnimate ? drawTransition(.42, .66) : { duration: 0 }}
          />
          <motion.path
            d="M210 1063 C158 1044 145 987 164 923 C190 830 300 730 440 650 C548 588 662 566 773 568"
            fill="none"
            stroke="white"
            strokeWidth="96"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={initialStroke}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={shouldAnimate ? drawTransition(.96, .58) : { duration: 0 }}
          />
          <motion.path
            d="M650 821 C696 738 744 651 790 585"
            fill="none"
            stroke="white"
            strokeWidth="70"
            strokeLinecap="round"
            initial={initialStroke}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={shouldAnimate ? drawTransition(1.42, .3) : { duration: 0 }}
          />
          <motion.path
            d="M738 708 C773 668 807 642 837 641 C868 640 880 663 891 691 C903 720 929 728 960 717 C1008 701 1052 666 1102 631"
            fill="none"
            stroke="white"
            strokeWidth="68"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={initialStroke}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={shouldAnimate ? drawTransition(1.64, .46) : { duration: 0 }}
          />
          <motion.path
            d="M1114 714 L1116 714"
            fill="none"
            stroke="white"
            strokeWidth="72"
            strokeLinecap="round"
            initial={initialStroke}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={shouldAnimate ? drawTransition(2.04, .1) : { duration: 0 }}
          />
        </mask>
      </defs>
      <image
        href="/assets/branding/jr-signature.png"
        width="1280"
        height="1280"
        preserveAspectRatio="xMidYMid meet"
        mask="url(#jr-stroke-reveal)"
      />
    </svg>
  );
}
