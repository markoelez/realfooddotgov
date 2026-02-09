"use client";

import { GROK_PROMPTS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function RealAnswersSection() {
  return (
    <section id="answers" className="section-container" style={{ backgroundColor: "var(--sand)" }}>
      <div className="content-width">
        <ScrollReveal>
          <h2 style={{ marginBottom: "16px" }}>
            Use Grok to get real answers about real food
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="content-width-lg">
            <p style={{ marginBottom: "var(--gap-v)" }}>
              From the guidelines to your kitchen. Ask Grok to help you plan
              meals, shop smarter, cook simply, and replace processed food with
              real food. Not sure where to start? Use one of our example
              prompts.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal carousel - full width */}
      <div
        className="grok-carousel"
        style={{
          display: "flex",
          gap: "24px",
          overflowX: "auto",
          paddingBottom: "16px",
          paddingLeft: "var(--padding-h)",
          paddingRight: "var(--padding-h)",
          width: "100%",
        }}
      >
        {GROK_PROMPTS.map((card, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: "320px",
              backgroundColor: "var(--off-white)",
              borderRadius: "16px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "box-shadow 0.2s ease",
            }}
          >
            <div>
              <h4
                style={{
                  fontFamily: "var(--font-grotesk-bold)",
                  fontWeight: 700,
                  fontSize: "var(--m-text-size)",
                  marginBottom: "16px",
                }}
              >
                {card.title}
              </h4>
              <p
                style={{
                  fontSize: "var(--s-text-size)",
                  lineHeight: "var(--s-line-height)",
                  color: "rgba(17, 0, 0, 0.6)",
                  marginBottom: "24px",
                }}
              >
                &ldquo;{card.prompt}&rdquo;
              </p>
            </div>
            <a
              href={`https://grok.com/?q=${encodeURIComponent(card.prompt)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "var(--s-text-size)",
                fontWeight: 500,
                color: "var(--dark-green)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
            >
              Ask Grok
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
