"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";


function useIsMobile(threshold = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= threshold);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [threshold]);
  return isMobile;
}
import ScrollReveal from "@/components/ui/ScrollReveal";

const STATS = [
  {
    numValue: 50,
    barHeight: "40%",
    before: "50% of Americans have ",
    highlight: "prediabetes or diabetes",
    after: "",
  },
  {
    numValue: 75,
    barHeight: "60%",
    before: "75% of adults report having at least one ",
    highlight: "chronic condition",
    after: "",
  },
  {
    numValue: 90,
    barHeight: "78%",
    before: "90% of U.S. healthcare spending goes to treating ",
    highlight: "chronic disease",
    after: "\u2014much of which is linked to diet and lifestyle",
  },
];

function AnimatedCounter({ target, isInView }: { target: number; isInView: boolean }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 50, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      setDisplay(Math.round(v));
    });
    return unsubscribe;
  }, [spring]);

  return <>{display}%</>;
}

function StatBar({
  stat,
  isInView,
  delay,
}: {
  stat: (typeof STATS)[number];
  isInView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      {/* Red bar — grows upward */}
      <div
        style={{
          position: "relative",
          marginBottom: "16px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ paddingBottom: "0%" }}
          animate={isInView ? { paddingBottom: stat.barHeight } : { paddingBottom: "0%" }}
          transition={{ duration: 1.2, delay, ease: [0.25, 1, 0.5, 1] }}
          style={{
            backgroundColor: "#b50000",
            padding: "20px",
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
            <AnimatedCounter target={stat.numValue} isInView={isInView} />
          </span>
        </motion.div>
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
  );
}

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
  const isMobile = useIsMobile();

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
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            columnGap: isMobile ? "0" : "48px",
            rowGap: isMobile ? "40px" : "var(--gap-h)",
            marginBottom: "calc(var(--padding-v) * 3)",
            width: "100%",
            alignItems: "end",
          }}
        >
          {STATS.map((stat, i) => (
            <StatBar
              key={stat.numValue}
              stat={stat}
              isInView={isInView}
              delay={i * 0.15}
            />
          ))}
        </div>

        {/* Image + progressive text reveal pinned together */}
        <RevealParagraph />
      </div>
    </section>
  );
}
