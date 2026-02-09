"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const REVEAL_TEXT =
  "The government's message is simple: what we eat shapes how long and how well we live – and choosing real food is one of the most powerful health decisions a person, a family, and a nation can make.";
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
  const wordStart = (index / total) * 0.9;
  const wordEnd = ((index + 1) / total) * 0.9;
  const progress = useTransform(scrollYProgress, [wordStart, wordEnd], [0, 1]);
  const opacity = useTransform(progress, (v: number) =>
    Math.max(0.15, Math.min(1, v))
  );
  return (
    <motion.span style={{ opacity }}>
      {word}{" "}
    </motion.span>
  );
}

export default function ClosingStatement() {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.4"],
  });

  return (
    <section
      style={{
        backgroundColor: "var(--sand)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "calc(var(--padding-v) * 2) var(--padding-h)",
      }}
    >
      <p
        ref={containerRef}
        style={{
          fontFamily: "var(--font-grotesk-display)",
          fontWeight: 700,
          fontSize: "clamp(40px, 8vw, 96px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          textAlign: "center",
          maxWidth: "1076px",
          color: "var(--off-black)",
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
