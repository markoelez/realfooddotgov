"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { POLICY_ITEMS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M6 16L13 23L26 9"
        stroke="#4CAF50"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PolicySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="winning"
      style={{
        backgroundColor: "var(--off-white)",
        padding: "calc(var(--padding-v) * 2) var(--padding-h)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <ScrollReveal>
          <h2
            style={{
              fontFamily: "var(--font-grotesk-display)",
              fontWeight: 700,
              fontSize: "clamp(48px, 10vw, 112px)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              marginBottom: "32px",
              maxWidth: "800px",
            }}
          >
            America Returns to Real Food
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 21px)",
              lineHeight: 1.4,
              color: "rgba(17, 0, 0, 0.6)",
              maxWidth: "640px",
              textWrap: "balance",
              marginBottom: "calc(var(--padding-v) * 1.5)",
            }}
          >
            Under President Trump, the results speak for themselves. Federal
            nutrition policy has been reset with strength and conviction. Real,
            whole, nutrient-dense food is once again the foundation of American
            health.
          </p>
        </ScrollReveal>
      </div>

      {/* Policy items card */}
      <motion.div
        ref={ref}
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
          borderRadius: "24px",
          padding: "8px 40px",
        }}
      >
        {POLICY_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.5,
              delay: 0.15 + i * 0.08,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "24px",
              padding: "28px 0",
              borderBottom:
                i < POLICY_ITEMS.length - 1
                  ? "1px solid rgba(17, 0, 0, 0.1)"
                  : "none",
            }}
          >
            <div style={{ flex: 1 }}>
              <h4
                style={{
                  fontFamily: "var(--font-grotesk-bold)",
                  fontWeight: 700,
                  fontSize: "var(--m-text-size)",
                  lineHeight: 1.2,
                  marginBottom: "8px",
                  color: "var(--off-black)",
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontSize: "var(--s-text-size)",
                  lineHeight: 1.4,
                  color: "rgba(17, 0, 0, 0.6)",
                }}
              >
                {item.description}
              </p>
            </div>
            <div
              style={{
                flexShrink: 0,
                marginTop: "8px",
              }}
            >
              <CheckIcon />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
