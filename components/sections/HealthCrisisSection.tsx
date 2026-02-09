"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import ScrollReveal from "@/components/ui/ScrollReveal";

const STATS = [
  {
    value: "50%",
    barHeight: "55%",
    before: "50% of Americans have ",
    highlight: "prediabetes or diabetes",
    after: "",
  },
  {
    value: "75%",
    barHeight: "75%",
    before: "75% of adults report having at least one ",
    highlight: "chronic condition",
    after: "",
  },
  {
    value: "90%",
    barHeight: "92%",
    before: "90% of U.S. healthcare spending goes to treating ",
    highlight: "chronic disease",
    after: "\u2014much of which is linked to diet and lifestyle",
  },
];

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
              fontSize: "16px",
              fontWeight: 500,
              opacity: 0.5,
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
              lineHeight: 0.84,
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
            gap: "var(--gap-h)",
            marginBottom: "var(--gap-v)",
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
                  backgroundColor: "#c0392b",
                  borderRadius: "8px",
                  padding: "24px",
                  paddingBottom: stat.barHeight,
                  marginBottom: "16px",
                  position: "relative",
                }}
              >
                <span
                  className="stat-value"
                  style={{
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
                  fontSize: "calc(20 / 16 * 1rem)",
                  lineHeight: 1.1,
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

        <ScrollReveal>
          <div style={{ width: "100%", maxWidth: "var(--container-md)" }}>
            <p style={{ marginBottom: "var(--gap-h)", color: "var(--off-white)" }}>
              For decades we&apos;ve been misled by guidance that prioritized
              highly processed food, and are now facing rates of unprecedented
              chronic disease.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h3 style={{ color: "var(--off-white)", marginBottom: "var(--gap-h)", textAlign: "center" }}>
            Real Food can solve this crisis.
          </h3>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div style={{ width: "100%", maxWidth: "var(--container-md)" }}>
            <p style={{ marginBottom: "var(--gap-v)", color: "var(--off-white)" }}>
              For the first time, official U.S. guidance calls on Americans to
              avoid highly processed food. This is not an attack on industry or a
              legal definition. It reflects a public health reality families live
              with every day.
            </p>
          </div>
        </ScrollReveal>

        {/* Old food pyramid image */}
        <ScrollReveal>
          <div style={{ borderRadius: "16px", overflow: "hidden", maxWidth: "var(--container-lg)" }}>
            <Image
              src="/images/broken-system/food-pyramid.webp"
              alt="The old food pyramid that misguided Americans for decades"
              width={800}
              height={600}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
