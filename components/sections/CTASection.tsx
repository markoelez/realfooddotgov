"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTASection() {
  return (
    <section
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
            Begin Your Real Food Journey Today
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <a
            href="https://cdn.realfood.gov/DGA.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "18px 28px",
              borderRadius: "40px",
              backgroundColor: "var(--highlight)",
              color: "var(--off-black)",
              fontWeight: 500,
              fontSize: "var(--m-text-size)",
              textDecoration: "none",
              transition: "background-color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "var(--lime)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "var(--highlight)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            Download the New Guidelines
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
