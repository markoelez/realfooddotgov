"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import ScrollReveal from "@/components/ui/ScrollReveal";

const FOODS_TO_AVOID = [
  "Packaged, prepared, ready-to-eat, or other foods that are salty or sweet, such as chips, cookies, and candy that have added sugars and salt.",
  "Foods and beverages that include artificial flavors, petroleum-based dyes, artificial preservatives, and low-calorie non-nutritive sweeteners.",
  "Sugar-sweetened beverages, such as sodas, fruit drinks, and energy drinks.",
];

export default function FoodsToAvoidSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-container" style={{ backgroundColor: "var(--off-white)" }}>
      <div className="content-width">
        <ScrollReveal>
          <h2 style={{ marginBottom: "var(--gap-v)" }}>
            Highly Processed Foods{" "}
            <span style={{ color: "var(--red-bright)" }}>Include</span>
          </h2>
        </ScrollReveal>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "var(--container-lg)",
            marginBottom: "var(--gap-v)",
          }}
        >
          {FOODS_TO_AVOID.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(213, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--red-bright)",
                  fontWeight: 700,
                  fontSize: "var(--s-text-size)",
                  marginTop: "2px",
                }}
              >
                {i + 1}
              </span>
              <p>{item}</p>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal>
          <div className="content-width-lg">
            <p style={{ marginBottom: "var(--gap-h)" }}>
              Diets dominated by these foods &ndash; engineered for shelf life,
              speed, and addictiveness rather than nourishment &ndash; are
              strongly linked to obesity, Type 2 diabetes, depression, heart
              disease, certain cancers, and shortened life expectancy. The
              consumption of these foods is contributing to trillions of dollars
              per year in healthcare costs.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            style={{
              backgroundColor: "rgba(213, 0, 0, 0.05)",
              borderLeft: "4px solid var(--red-bright)",
              borderRadius: "0 16px 16px 0",
              padding: "32px",
              maxWidth: "var(--container-lg)",
              marginBottom: "var(--gap-h)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-grotesk-bold)",
                fontWeight: 700,
                fontSize: "var(--h4-text-size)",
                lineHeight: 1.1,
                color: "var(--red)",
              }}
            >
              Today, nearly 70% of an American child&apos;s diet is defined as
              ultra-processed &ndash; in other countries, this is below 20%.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="content-width-lg">
            <p>
              Real food &ndash; in its natural or minimally processed form,
              supports human health. Highly processed food, consumed at scale
              and over time, destroys it.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
