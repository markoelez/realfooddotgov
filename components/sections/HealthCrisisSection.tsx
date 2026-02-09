"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import ScrollReveal from "@/components/ui/ScrollReveal";

const STATS = [
  {
    value: "50%",
    barHeight: "40%",
    before: "50% of Americans have ",
    highlight: "prediabetes or diabetes",
    after: "",
  },
  {
    value: "75%",
    barHeight: "60%",
    before: "75% of adults report having at least one ",
    highlight: "chronic condition",
    after: "",
  },
  {
    value: "90%",
    barHeight: "78%",
    before: "90% of U.S. healthcare spending goes to treating ",
    highlight: "chronic disease",
    after: "\u2014much of which is linked to diet and lifestyle",
  },
];

const REVEAL_TEXT = "For decades we\u2019ve been misled by guidance that prioritized highly processed food, and are now facing rates of unprecedented chronic disease.";
const REVEAL_WORDS = REVEAL_TEXT.split(" ");

function WordReveal({
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
  const wordStart = (index / total) * 0.6;
  const wordEnd = ((index + 1) / total) * 0.6;
  const progress = useTransform(scrollYProgress, [wordStart, wordEnd], [0, 1]);
  const opacity = useTransform(progress, (v: number) => Math.max(0.25, Math.min(1, v)));
  return (
    <motion.span style={{ opacity, color: "var(--off-white)" }}>
      {word}{" "}
    </motion.span>
  );
}

function RevealParagraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Word reveal happens over 0–0.6, fade out over 0.7–1.0
  const exitOpacity = useTransform(scrollYProgress, [0.65, 0.95], [1, 0]);
  const exitY = useTransform(scrollYProgress, [0.65, 0.95], [0, -80]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "250vh",
        position: "relative",
        width: "100%",
      }}
    >
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          opacity: exitOpacity,
          y: exitY,
        }}
      >
        {/* Pyramid image */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ borderRadius: "16px", overflow: "hidden", maxWidth: "420px" }}>
            <Image
              src="/images/broken-system/food-pyramid.webp"
              alt="The old food pyramid that misguided Americans for decades"
              width={800}
              height={600}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <p
            style={{
              fontSize: "14px",
              opacity: 0.4,
              marginTop: "12px",
              color: "var(--off-white)",
              textAlign: "left",
            }}
          >
            1992 Food Pyramid
          </p>
        </div>

        {/* Progressive word reveal */}
        <p
          style={{
            fontFamily: "var(--font-grotesk-bold)",
            fontWeight: 700,
            fontSize: "clamp(20px, 3vw, 28px)",
            lineHeight: 1.1,
            textAlign: "center",
            maxWidth: "700px",
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
      </motion.div>
    </div>
  );
}

export default function HealthCrisisSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="health"
      className="section-container"
      style={{
        backgroundColor: "var(--off-black)",
        color: "var(--off-white)",
      }}
    >
      <div className="content-width" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Small subdued label */}
        <ScrollReveal>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.02em",
              opacity: 0.8,
              marginBottom: "16px",
              textAlign: "center",
              color: "var(--off-white)",
            }}
          >
            The State of Our Health
          </p>
        </ScrollReveal>

        {/* Large display title */}
        <ScrollReveal delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--font-grotesk-display)",
              fontWeight: 700,
              fontSize: "clamp(40px, 12vw, 96px)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              textAlign: "center",
              whiteSpace: "pre-line",
              marginBottom: "var(--gap-v)",
              color: "var(--off-white)",
            }}
          >
            America is sick.{"\n"}The data is clear.
          </h2>
        </ScrollReveal>

        {/* Stats - bar chart style */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            columnGap: "48px",
            rowGap: "var(--gap-h)",
            marginBottom: "calc(var(--padding-v) * 3)",
            width: "100%",
            alignItems: "end",
          }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.value}
              variants={fadeInUp}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              {/* Red bar */}
              <div
                style={{
                  backgroundColor: "#b50000",
                  borderRadius: "0",
                  padding: "20px",
                  paddingBottom: stat.barHeight,
                  marginBottom: "16px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-grotesk-display)",
                    fontWeight: 700,
                    fontSize: "clamp(28px, 4vw, 48px)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "var(--off-black)",
                    display: "block",
                  }}
                >
                  {stat.value}
                </span>
              </div>
              {/* Description below bar */}
              <p
                style={{
                  fontSize: "calc(24 / 16 * 1rem)",
                  lineHeight: 0.9,
                  fontWeight: 700,
                  fontFamily: "var(--font-grotesk-bold)",
                  color: "var(--off-white)",
                }}
              >
                {stat.before}
                <span style={{ color: "var(--red-bright)" }}>{stat.highlight}</span>
                {stat.after}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Image + progressive text reveal pinned together */}
        <RevealParagraph />
      </div>
    </section>
  );
}
