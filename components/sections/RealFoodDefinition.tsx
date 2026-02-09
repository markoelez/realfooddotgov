"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WORDS = "Real Food can solve this crisis.".split(" ");

function FadeOutWord({
  word,
  scrollYProgress,
  index,
  total,
}: {
  word: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}) {
  // Fade out words sequentially over scroll progress 0.5–0.9
  const wordStart = 0.5 + (index / total) * 0.4;
  const wordEnd = 0.5 + ((index + 1) / total) * 0.4;
  const opacity = useTransform(scrollYProgress, [wordStart, wordEnd], [1, 0]);
  return (
    <motion.span style={{ opacity }}>
      {word}{" "}
    </motion.span>
  );
}

export default function RealFoodDefinition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text scrolls up during 0–0.5
  const y = useTransform(scrollYProgress, [0, 0.4], [200, 0]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "300vh",
        position: "relative",
        width: "100%",
        backgroundColor: "var(--off-black)",
      }}
    >
      <section
        id="solution"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--padding-v) var(--padding-h)",
          overflow: "hidden",
        }}
      >
        <motion.h2
          style={{
            fontFamily: "var(--font-grotesk-display)",
            fontWeight: 700,
            fontSize: "clamp(48px, 10vw, 96px)",
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            textAlign: "center",
            color: "var(--off-white)",
            maxWidth: "900px",
            y,
          }}
        >
          {WORDS.map((word, i) => (
            <FadeOutWord
              key={i}
              word={word}
              scrollYProgress={scrollYProgress}
              index={i}
              total={WORDS.length}
            />
          ))}
        </motion.h2>
      </section>
    </div>
  );
}
