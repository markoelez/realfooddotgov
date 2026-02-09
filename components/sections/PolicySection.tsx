"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { POLICY_ITEMS } from "@/lib/constants";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function PolicySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="winning" className="section-container" style={{ backgroundColor: "var(--off-white)" }}>
      <div className="content-width">
        <ScrollReveal>
          <h2 style={{ marginBottom: "16px" }}>America Returns to Real Food</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="content-width-lg">
            <p style={{ marginBottom: "var(--gap-v)" }}>
              Under President Trump, the results speak for themselves. Federal
              nutrition policy has been reset with strength and conviction. Real,
              whole, nutrient-dense food is once again the foundation of American
              health.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--gap-h)",
          }}
        >
          {POLICY_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              style={{
                backgroundColor: "var(--sand)",
                borderRadius: "16px",
                padding: "32px",
              }}
            >
              <h4
                style={{
                  fontFamily: "var(--font-grotesk-bold)",
                  fontWeight: 700,
                  fontSize: "var(--m-text-size)",
                  marginBottom: "12px",
                }}
              >
                {item.title}
              </h4>
              <p style={{ color: "rgba(17, 0, 0, 0.7)" }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
