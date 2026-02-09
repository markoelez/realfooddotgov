"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTASection() {
  return (
    <section
      style={{
        backgroundColor: "var(--sand)",
        color: "var(--off-black)",
        textAlign: "center",
        padding: "calc(var(--padding-v) * 3) var(--padding-h)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <ScrollReveal>
        <h2
          style={{
            fontFamily: "var(--font-grotesk-display)",
            fontWeight: 700,
            fontSize: "clamp(48px, 10vw, 112px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            marginBottom: "48px",
            whiteSpace: "pre-line",
          }}
        >
          {"Begin Your Real\nFood Journey Today"}
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <a
          href="https://cdn.realfood.gov/DGA.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "16px 32px",
            borderRadius: "40px",
            backgroundColor: "var(--off-black)",
            color: "var(--off-white)",
            fontWeight: 500,
            fontSize: "var(--s-text-size)",
            textDecoration: "none",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "0.85";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
          }}
        >
          Download the New Guidelines
        </a>
      </ScrollReveal>
    </section>
  );
}
