"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function RealFoodDefinition() {
  return (
    <section
      id="solution"
      className="section-container"
      style={{
        backgroundColor: "var(--dark-green)",
        color: "var(--off-white)",
        textAlign: "center",
      }}
    >
      <div className="content-width" style={{ maxWidth: "var(--container-lg)" }}>
        <ScrollReveal>
          <h2 style={{ marginBottom: "var(--gap-h)" }}>
            Better health begins on your plate&mdash;not in your medicine
            cabinet.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p style={{ opacity: 0.85 }}>
            The Dietary Guidelines for Americans, 2025-2030 put real, whole,
            nutrient-dense foods back where they belong: at the center of
            health.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
