"use client";

import { useState } from "react";
import { FAQ_DATA } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const isHighlighted = isOpen || isHovered;

  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-open={isOpen}
      style={{
        width: "100%",
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
        padding: "20px 22px 20px 28px",
        textAlign: "left",
        backgroundColor: isHighlighted ? "var(--highlight)" : "var(--off-white)",
        border: "none",
        borderRadius: "40px",
        cursor: "pointer",
        color: isHighlighted ? "var(--dark-green)" : "var(--off-black)",
        transition: "background-color .2s cubic-bezier(.23,1,.32,1), color .2s cubic-bezier(.23,1,.32,1)",
        userSelect: "none",
      }}
      aria-expanded={isOpen}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-grotesk-bold)",
            fontWeight: 700,
            fontSize: "var(--m-text-size)",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            minHeight: "32px",
          }}
        >
          {question}
        </span>

        {/* Answer area — always in DOM, animated via grid-template-rows */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: isOpen ? "1fr" : "0fr",
            transition: "grid-template-rows .3s cubic-bezier(.23,1,.32,1)",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <p
              style={{
                fontSize: "var(--s-text-size)",
                lineHeight: 1.5,
                paddingTop: "8px",
                paddingBottom: "4px",
                fontWeight: 400,
              }}
            >
              {answer}
            </p>
          </div>
        </div>
      </div>

      {/* Arrow icon */}
      <div
        style={{
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "top .2s cubic-bezier(.68,.05,.265,1.55)",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .2s cubic-bezier(.68,.05,.265,1.55)",
          }}
        >
          <path d="M4 7L9 12L14 7" />
        </svg>
      </div>
    </button>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faqs"
      style={{
        backgroundColor: "var(--sand)",
        padding: "calc(var(--padding-v) * 2) var(--padding-h)",
      }}
    >
      <div style={{ maxWidth: "1076px", margin: "0 auto" }}>
        <ScrollReveal>
          <h2
            style={{
              fontFamily: "var(--font-grotesk-display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 5vw, 48px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "64px",
              whiteSpace: "pre-line",
            }}
          >
            {"Frequently Asked\nQuestions"}
          </h2>
        </ScrollReveal>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {FAQ_DATA.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
