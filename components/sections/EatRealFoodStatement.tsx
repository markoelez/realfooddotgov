"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function EatRealFoodStatement() {
  return (
    <section
      style={{
        backgroundColor: "var(--off-white)",
        position: "relative",
        zIndex: 2,
        paddingTop: "0",
        marginTop: "calc(var(--padding-v) * -2)",
        marginBottom: "calc(var(--padding-v) * -1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 var(--padding-h)",
        }}
      >
        <ScrollReveal>
          <p
            style={{
              fontFamily: "var(--font-grotesk-bold)",
              fontWeight: 700,
              fontSize: "clamp(20px, 2.5vw, 30px)",
              lineHeight: 1.05,
              color: "rgba(17, 0, 0, 0.72)",
              textWrap: "balance",
              maxWidth: "760px",
              textAlign: "center",
              marginBottom: "0",
            }}
          >
            Better health begins on your plate—not in your medicine cabinet. The
            Dietary Guidelines for Americans, 2025-2030 put real, whole,
            nutrient-dense foods back where they belong: at the center of health.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
