"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const LINES = ["Real Food can", "solve this crisis."];

// Build flat array of chars with their line index
const ALL_CHARS: { char: string; lineIndex: number }[] = [];
LINES.forEach((line, lineIndex) => {
  for (const char of line) {
    ALL_CHARS.push({ char, lineIndex });
  }
});

function useIsMobile(threshold = 580) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(Math.min(window.innerWidth, window.innerHeight) <= threshold);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [threshold]);
  return isMobile;
}

// Cubic ease-out: fast start, slow end
function easeOut(e: number) {
  return 1 - Math.pow(1 - e, 3);
}

function DisintegratingChar({
  char,
  index,
  total,
  scrollYProgress,
  isMobile,
}: {
  char: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
}) {
  const staggerStart = 0.15 + (index / total) * 0.25;
  const staggerEnd = staggerStart + 0.5;

  const rawProgress = useTransform(scrollYProgress, [staggerStart, staggerEnd], [0, 1]);
  const progress = useTransform(rawProgress, easeOut);

  const opacity = useTransform(progress, [0, 1], [1, 0]);
  const scale = useTransform(progress, [0, 1], [1, 0.1]);
  const y = useTransform(progress, [0, 1], [0, -50]);
  const filter = useTransform(progress, (v: number) =>
    `blur(${v * 30}px) brightness(${1 + v * 9})`
  );

  return (
    <motion.span
      style={{
        display: "inline-block",
        transformOrigin: "center center",
        willChange: "transform, opacity",
        color: "var(--off-white)",
        opacity,
        scale,
        y,
        filter: isMobile ? "none" : filter,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export default function RealFoodDefinition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  let charIndex = 0;

  return (
    <div
      ref={containerRef}
      id="solution"
      style={{
        minHeight: isMobile ? "130svh" : "180svh",
        position: "relative",
        width: "100%",
        backgroundColor: "var(--off-black)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "var(--font-grotesk-display)",
            fontWeight: 700,
            fontSize: "clamp(var(--h-text-size), 12vw, 96px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          {LINES.map((line, lineIndex) => {
            const words = line.split(" ");
            return (
              <div
                key={lineIndex}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {words.map((word, wordIndex) => {
                  const chars = word.split("");
                  const wordEl = (
                    <span key={wordIndex} style={{ display: "inline-flex" }}>
                      {chars.map((c) => {
                        const ci = charIndex++;
                        return (
                          <DisintegratingChar
                            key={ci}
                            char={c}
                            index={ci}
                            total={ALL_CHARS.length}
                            scrollYProgress={scrollYProgress}
                            isMobile={isMobile}
                          />
                        );
                      })}
                      {/* Space between words */}
                      {wordIndex < words.length - 1 && (
                        (() => {
                          const ci = charIndex++;
                          return (
                            <DisintegratingChar
                              key={`space-${ci}`}
                              char=" "
                              index={ci}
                              total={ALL_CHARS.length}
                              scrollYProgress={scrollYProgress}
                              isMobile={isMobile}
                            />
                          );
                        })()
                      )}
                    </span>
                  );
                  return wordEl;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
