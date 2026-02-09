"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { PYRAMID_TIERS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Absolute positions for each food image within the 1:1 pyramid container
// Mapped by image path → { top, left, width, height, zIndex }
const FOOD_POSITIONS: Record<string, { top: string; left: string; width: string; height: string; zIndex?: number }> = {
  // Protein tier (top-left region)
  "/images/pyramid/chicken.webp":       { top: "10.73%", left: "34.55%", width: "17.82%", height: "14.73%" },
  "/images/pyramid/cheese.webp":        { top: "16%",    left: "28%",    width: "9.45%",  height: "7.09%" },
  "/images/pyramid/milk.webp":          { top: "19.64%", left: "39.09%", width: "7.09%",  height: "14.73%", zIndex: 2 },
  "/images/pyramid/olive-oil.webp":     { top: "20%",    left: "45.82%", width: "6.73%",  height: "17.09%", zIndex: 1 },
  "/images/pyramid/ground-beef.webp":   { top: "20%",    left: "30%",    width: "11.82%", height: "9.45%",  zIndex: 1 },
  "/images/pyramid/steak.webp":         { top: "20.73%", left: "14.18%", width: "19.45%", height: "8.73%" },
  "/images/pyramid/yogurt.webp":        { top: "25.45%", left: "33.64%", width: "8%",     height: "13.45%", zIndex: 2 },
  "/images/pyramid/salmon.webp":        { top: "26.18%", left: "20.73%", width: "16.36%", height: "9.45%",  zIndex: 2 },
  "/images/pyramid/avocado.webp":       { top: "31.82%", left: "42%",    width: "9.82%",  height: "9.27%",  zIndex: 3 },
  "/images/pyramid/canned-tuna.webp":   { top: "33.64%", left: "36%",    width: "6.91%",  height: "8.55%",  zIndex: 3 },
  "/images/pyramid/eggs.webp":          { top: "34.55%", left: "22.73%", width: "12.18%", height: "6.18%",  zIndex: 0 },
  "/images/pyramid/shrimp.webp":        { top: "38.55%", left: "27.27%", width: "10.55%", height: "7.64%",  zIndex: 1 },
  "/images/pyramid/butter.webp":        { top: "40.18%", left: "39.64%", width: "12.36%", height: "9.64%",  zIndex: 4 },
  "/images/pyramid/walnut-shelled.webp":{ top: "42.91%", left: "30%",    width: "4.73%",  height: "6.18%",  zIndex: 1 },
  "/images/pyramid/almond.webp":        { top: "42.55%", left: "36%",    width: "5.27%",  height: "4.55%",  zIndex: 1 },
  "/images/pyramid/walnut-kernel.webp": { top: "44.36%", left: "34.73%", width: "4%",     height: "4.55%",  zIndex: 1 },
  "/images/pyramid/bowl-rice-beans.webp":{ top: "47.82%", left: "32.55%", width: "12.73%", height: "11.82%", zIndex: 0 },
  "/images/pyramid/peanuts.webp":       { top: "49.82%", left: "45.27%", width: "6.36%",  height: "6%" },

  // Vegetables & Fruits tier (top-right region)
  "/images/pyramid/broccoli.webp":      { top: "10.91%", left: "50.73%", width: "17.82%", height: "14.18%", zIndex: 0 },
  "/images/pyramid/frozen-peas.webp":   { top: "12%",    left: "62.55%", width: "10%",    height: "11.45%", zIndex: 0 },
  "/images/pyramid/carrots.webp":       { top: "17.27%", left: "62.91%", width: "24.36%", height: "10%",    zIndex: 1 },
  "/images/pyramid/tomatoes.webp":      { top: "18.55%", left: "62%",    width: "9.27%",  height: "11.09%", zIndex: 3 },
  "/images/pyramid/green-beans.webp":   { top: "21.27%", left: "52.73%", width: "7.09%",  height: "11.64%", zIndex: 0 },
  "/images/pyramid/butternut.webp":     { top: "21.82%", left: "58.18%", width: "9.09%",  height: "12.73%", zIndex: 3 },
  "/images/pyramid/lettuce.webp":       { top: "24.55%", left: "67.82%", width: "13.27%", height: "11.45%", zIndex: 2 },
  "/images/pyramid/apples.webp":        { top: "28.18%", left: "50.18%", width: "8.36%",  height: "9.64%",  zIndex: 4 },
  "/images/pyramid/blueberries.webp":   { top: "33.64%", left: "65.64%", width: "8.73%",  height: "4%",     zIndex: 2 },
  "/images/pyramid/strawberry.webp":    { top: "34.55%", left: "61.82%", width: "5.82%",  height: "4.73%",  zIndex: 6 },
  "/images/pyramid/potato.webp":        { top: "36.18%", left: "52.36%", width: "9.45%",  height: "9.09%",  zIndex: 6 },
  "/images/pyramid/oranges.webp":       { top: "38%",    left: "61.82%", width: "12.36%", height: "8.55%",  zIndex: 6 },
  "/images/pyramid/grapes.webp":        { top: "40.91%", left: "50.18%", width: "14.18%", height: "10.18%", zIndex: 8 },
  "/images/pyramid/bananas.webp":       { top: "44.73%", left: "52.55%", width: "16.18%", height: "15.27%", zIndex: 12 },

  // Whole Grains tier (bottom-center)
  "/images/pyramid/bread.webp":         { top: "56%",    left: "45.27%", width: "16.55%", height: "12.55%" },
  "/images/pyramid/bowl-oats.webp":     { top: "64.18%", left: "43.64%", width: "10.55%", height: "8.55%" },
  "/images/pyramid/oats.webp":          { top: "70.55%", left: "42%",    width: "10.91%", height: "9.27%" },
};

function PyramidFoodItem({
  image,
  alt,
  pos,
  scrollYProgress,
  topPercent,
}: {
  image: string;
  alt: string;
  pos: { top: string; left: string; width: string; height: string; zIndex?: number };
  scrollYProgress: MotionValue<number>;
  topPercent: number;
}) {
  // Each food pops in based on its vertical position in the pyramid
  // Items higher up (lower topPercent) appear earlier in the scroll
  // Map topPercent (10–75) into scroll range (0.05–0.75)
  const entryStart = 0.05 + (topPercent / 100) * 0.65;
  const entryEnd = Math.min(entryStart + 0.08, 0.95);

  const rawProgress = useTransform(scrollYProgress, [entryStart, entryEnd], [0, 1]);
  const progress = useTransform(rawProgress, (v) => Math.max(0, Math.min(1, v)));
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const scale = useTransform(progress, [0, 1], [0, 1]);
  const translateY = useTransform(progress, [0, 1], [30 - topPercent * 0.3, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        height: pos.height,
        zIndex: pos.zIndex ?? "auto",
        opacity,
        scale,
        y: translateY,
        pointerEvents: "none",
      }}
    >
      <Image
        src={image}
        alt={alt}
        width={200}
        height={200}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </motion.div>
  );
}

function DividerLine({
  x1, y1, x2, y2, dashLen, scrollYProgress, entryAt,
}: {
  x1: string; y1: string; x2: string; y2: string;
  dashLen: number; scrollYProgress: MotionValue<number>; entryAt: number;
}) {
  const offset = useTransform(scrollYProgress, [entryAt, entryAt + 0.12], [dashLen, 0]);
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="#110000" strokeWidth="0.25"
      strokeDasharray={dashLen}
      style={{ strokeDashoffset: offset }}
    />
  );
}

function PyramidDividers({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <svg
      viewBox="-10 -5 120 96.6"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {/* Top divider — full width at y=0, appears early */}
      <DividerLine x1="50" y1="0" x2="0" y2="0" dashLen={50} scrollYProgress={scrollYProgress} entryAt={0.08} />
      <DividerLine x1="50" y1="0" x2="100" y2="0" dashLen={50} scrollYProgress={scrollYProgress} entryAt={0.08} />
      {/* Middle divider — shorter at y=54.75, appears later */}
      <DividerLine x1="50" y1="54.75" x2="31.61" y2="54.75" dashLen={18.389} scrollYProgress={scrollYProgress} entryAt={0.45} />
      <DividerLine x1="50" y1="54.75" x2="68.389" y2="54.75" dashLen={18.389} scrollYProgress={scrollYProgress} entryAt={0.45} />
    </svg>
  );
}

function PyramidLabel({
  text, left, top, scrollYProgress, entryAt,
}: {
  text: string; left: string; top: string;
  scrollYProgress: MotionValue<number>; entryAt: number;
}) {
  const opacity = useTransform(scrollYProgress, [entryAt, entryAt + 0.1], [0, 1]);
  return (
    <motion.div
      style={{
        position: "absolute",
        left,
        top,
        transform: "translateX(-50%)",
        fontFamily: "var(--font-grotesk-bold)",
        fontWeight: 700,
        fontSize: "min(1.8vw, 40px)",
        lineHeight: 0.96,
        letterSpacing: "-0.5px",
        whiteSpace: "pre-line",
        color: "var(--off-black)",
        pointerEvents: "auto",
        opacity,
      }}
    >
      {text}
    </motion.div>
  );
}

function PyramidLabels({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <PyramidLabel text={"Protein, Dairy,\n& Healthy Fats"} left="19.5%" top="14.75%" scrollYProgress={scrollYProgress} entryAt={0.1} />
      <PyramidLabel text={"Vegetables\n& Fruits"} left="82.5%" top="14.75%" scrollYProgress={scrollYProgress} entryAt={0.1} />
      <PyramidLabel text={"Whole\nGrains"} left="39.25%" top="60.5%" scrollYProgress={scrollYProgress} entryAt={0.5} />
    </div>
  );
}

function InvertedPyramid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end 0.6"],
  });

  // Flatten all foods from all tiers with their positions
  const allFoods = PYRAMID_TIERS.flatMap((tier) =>
    tier.foods
      .filter((food) => FOOD_POSITIONS[food.image])
      .map((food) => ({
        ...food,
        pos: FOOD_POSITIONS[food.image],
        topPercent: parseFloat(FOOD_POSITIONS[food.image].top),
      }))
  );

  return (
    <div
      ref={ref}
      style={{
        width: "min(64vw, 1800px)",
        aspectRatio: "1 / 1",
        position: "relative",
        margin: "0 auto",
      }}
    >
      <PyramidDividers scrollYProgress={scrollYProgress} />
      <PyramidLabels scrollYProgress={scrollYProgress} />

      {/* Food images */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 5,
          userSelect: "none",
        }}
      >
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          {allFoods.map((food) => (
            <PyramidFoodItem
              key={food.name}
              image={food.image}
              alt={food.alt}
              pos={food.pos}
              scrollYProgress={scrollYProgress}
              topPercent={food.topPercent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Food positions within the square food container for each tier's detail view
// Percentages are relative to the food container (min(48vw, 550px) square)
const DETAIL_POSITIONS: Record<string, { image: string; top: string; left: string; width: string; zIndex: number }[]> = {
  protein: [
    { image: "/images/pyramid/chicken.webp",       top: "-15%", left: "46%",  width: "80%",  zIndex: 3 },
    { image: "/images/pyramid/milk.webp",          top: "0%",   left: "85%",  width: "42%",  zIndex: 4 },
    { image: "/images/pyramid/cheese.webp",        top: "27%",  left: "38%",  width: "44%",  zIndex: 4 },
    { image: "/images/pyramid/steak.webp",         top: "35%",  left: "-8%",  width: "85%",  zIndex: 5 },
    { image: "/images/pyramid/ground-beef.webp",   top: "53%",  left: "42%",  width: "58%",  zIndex: 6 },
    { image: "/images/pyramid/bowl-rice-beans.webp",top: "45%", left: "106%", width: "50%",  zIndex: 5 },
    { image: "/images/pyramid/yogurt.webp",        top: "59%",  left: "77%",  width: "34%",  zIndex: 7 },
    { image: "/images/pyramid/salmon.webp",        top: "68%",  left: "5%",   width: "80%",  zIndex: 8 },
    { image: "/images/pyramid/eggs.webp",          top: "75%",  left: "-38%", width: "40%",  zIndex: 7 },
    { image: "/images/pyramid/canned-tuna.webp",   top: "80%",  left: "102%", width: "30%",  zIndex: 7 },
    { image: "/images/pyramid/shrimp.webp",        top: "88%",  left: "35%",  width: "28%",  zIndex: 9 },
  ],
  "vegetables-fruits": [
    { image: "/images/pyramid/carrots.webp",       top: "-8%",  left: "50%",  width: "80%",  zIndex: -2 },
    { image: "/images/pyramid/broccoli.webp",      top: "-10%", left: "20%",  width: "68%",  zIndex: -1 },
    { image: "/images/pyramid/frozen-peas.webp",   top: "8%",   left: "-10%", width: "42%",  zIndex: -1 },
    { image: "/images/pyramid/butternut.webp",     top: "18%",  left: "88%",  width: "32%",  zIndex: 0 },
    { image: "/images/pyramid/green-beans.webp",   top: "30%",  left: "98%",  width: "18%",  zIndex: 1 },
    { image: "/images/pyramid/oranges.webp",       top: "52%",  left: "50%",  width: "45%",  zIndex: 4 },
    { image: "/images/pyramid/blueberries.webp",   top: "38%",  left: "72%",  width: "20%",  zIndex: 5 },
    { image: "/images/pyramid/lettuce.webp",       top: "12%",  left: "68%",  width: "48%",  zIndex: 6 },
    { image: "/images/pyramid/strawberry.webp",    top: "58%",  left: "82%",  width: "16%",  zIndex: 6 },
    { image: "/images/pyramid/apples.webp",        top: "30%",  left: "30%",  width: "30%",  zIndex: 10 },
    { image: "/images/pyramid/tomatoes.webp",      top: "20%",  left: "10%",  width: "32%",  zIndex: 11 },
    { image: "/images/pyramid/bananas.webp",       top: "18%",  left: "-20%", width: "62%",  zIndex: 12 },
    { image: "/images/pyramid/grapes.webp",        top: "48%",  left: "-25%", width: "52%",  zIndex: 12 },
    { image: "/images/pyramid/potato.webp",        top: "52%",  left: "15%",  width: "32%",  zIndex: 14 },
  ],
  "whole-grains": [
    { image: "/images/pyramid/bread.webp",         top: "-45%", left: "40%",  width: "120%", zIndex: 2 },
    { image: "/images/pyramid/bowl-oats.webp",     top: "2%",   left: "2%",   width: "78%",  zIndex: 3 },
    { image: "/images/pyramid/oats.webp",          top: "43%",  left: "-48%", width: "52%",  zIndex: 4 },
  ],
};

// Serving target labels per tier
const SERVING_LABELS: Record<string, string> = {
  protein: "Protein target:",
  "vegetables-fruits": "Daily target:",
  "whole-grains": "Daily target:",
};

function TierDetail({
  tier,
}: {
  tier: (typeof PYRAMID_TIERS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const foods = DETAIL_POSITIONS[tier.id] || [];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax: text drifts right, images drift left
  const textX = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const imagesX = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: "#FDFBEE",
        overflow: "visible",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "40px",
          padding: `${tier.id === "whole-grains" ? "0" : "var(--padding-v)"} 0`,
          paddingBottom: "calc(var(--padding-v) * 3)",
          paddingLeft: "clamp(40px, 14vw, 220px)",
          paddingRight: "var(--padding-h)",
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Text content — left side */}
        <motion.div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            maxWidth: "360px",
            x: textX,
          }}
        >
          <ScrollReveal>
            <h3
              style={{
                fontFamily: "var(--font-grotesk-bold)",
                fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 38px)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                whiteSpace: "pre-line",
              }}
            >
              {tier.title}
            </h3>
            <p
              style={{
                fontSize: "var(--s-text-size)",
                lineHeight: 1.4,
                marginTop: "20px",
              }}
            >
              {tier.description}
            </p>
            <div style={{ marginTop: "20px" }}>
              <p style={{ fontSize: "var(--s-text-size)", lineHeight: 1.4 }}>
                <strong style={{ fontFamily: "var(--font-grotesk-bold)", fontWeight: 700 }}>{SERVING_LABELS[tier.id] || "Serving target:"}</strong>{" "}
                {tier.servingTarget}
              </p>
            </div>
          </ScrollReveal>
        </motion.div>

        {/* Food images — right side, square container */}
        <motion.div
          style={{
            flexShrink: 0,
            width: "min(55vw, 700px)",
            aspectRatio: "1 / 1",
            position: "relative",
            x: imagesX,
          }}
        >
          {foods.map((food, i) => (
            <div
              key={food.image}
              style={{
                position: "absolute",
                top: food.top,
                left: food.left,
                width: food.width,
                zIndex: food.zIndex,
                pointerEvents: "none",
              }}
            >
              <Image
                src={food.image}
                alt=""
                width={400}
                height={400}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ExpandingWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 0.85", "start 0.3"],
  });

  const rawInset = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const inset = useSpring(rawInset, { stiffness: 300, damping: 40 });
  const rawRadius = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const borderRadius = useSpring(rawRadius, { stiffness: 300, damping: 40 });

  return (
    <div
      ref={wrapperRef}
      style={{
        backgroundColor: "var(--off-black)",
        width: "100%",
      }}
    >
      <motion.div
        style={{
          marginLeft: inset,
          marginRight: inset,
          borderRadius,
          overflow: "hidden",
          backgroundColor: "var(--off-white)",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function PyramidSection() {
  return (
    <ExpandingWrapper>
      <section id="pyramid" className="section-container" style={{ paddingTop: "calc(var(--padding-v) * 2)" }}>
        <div className="content-width" style={{ textAlign: "center" }}>
          <ScrollReveal>
            <h2
              style={{
                fontFamily: "var(--font-grotesk-display)",
                fontWeight: 700,
                fontSize: "clamp(64px, 16vw, 160px)",
                lineHeight: 0.86,
                letterSpacing: "-0.02em",
                marginBottom: "var(--gap-v)",
              }}
            >
              Eat Real<br />Food
            </h2>
          </ScrollReveal>
        </div>

        {/* Inverted pyramid visual */}
        <InvertedPyramid />

      </section>

      {/* Tier detail sections — full width, outside content-width constraint */}
      {PYRAMID_TIERS.map((tier, i) => (
        <TierDetail key={tier.id} tier={tier} index={i} />
      ))}
    </ExpandingWrapper>
  );
}
