"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  return (
    <div style={{ borderBottom: "1px solid rgba(17, 0, 0, 0.1)" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 0",
          textAlign: "left",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--off-black)",
        }}
        aria-expanded={isOpen}
      >
        <span
          style={{
            fontFamily: "var(--font-grotesk-bold)",
            fontWeight: 700,
            fontSize: "var(--m-text-size)",
            paddingRight: "16px",
          }}
        >
          {question}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ flexShrink: 0, opacity: 0.5 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                paddingBottom: "24px",
                color: "rgba(17, 0, 0, 0.6)",
                maxWidth: "var(--container-lg)",
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="section-container" style={{ backgroundColor: "var(--off-white)" }}>
      <div className="content-width">
        <ScrollReveal>
          <h2 style={{ marginBottom: "var(--gap-v)" }}>FAQs</h2>
        </ScrollReveal>

        <div>
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
