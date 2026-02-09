"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const REVEAL_TEXT =
  "For the first time, official U.S. guidance calls on Americans to avoid highly processed food. This is not an attack on industry or a legal definition. It reflects a public health reality families live with every day.";
const REVEAL_WORDS = REVEAL_TEXT.split(" ");

function WordReveal({
  word,
  scrollYProgress,
  index,
  total,
}: {
  word: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const wordStart = (index / total) * 0.8;
  const wordEnd = ((index + 1) / total) * 0.8;
  const progress = useTransform(scrollYProgress, [wordStart, wordEnd], [0, 1]);
  const opacity = useTransform(progress, (v: number) => Math.max(0.2, Math.min(1, v)));
  return (
    <motion.span style={{ opacity, color: "var(--off-white)" }}>
      {word}{" "}
    </motion.span>
  );
}

export default function GuidanceRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.15"],
  });

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: "var(--off-black)",
        color: "var(--off-white)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "0 var(--padding-h) calc(var(--padding-v) * 4)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-grotesk-display)",
          fontWeight: 700,
          fontSize: "clamp(var(--h-text-size), 12vw, 96px)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          textAlign: "center",
          maxWidth: "1076px",
        }}
      >
        {REVEAL_WORDS.map((word, i) => (
          <WordReveal
            key={i}
            word={word}
            scrollYProgress={scrollYProgress}
            index={i}
            total={REVEAL_WORDS.length}
          />
        ))}
      </p>
    </section>
  );
}
