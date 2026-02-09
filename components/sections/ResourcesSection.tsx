"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PDF_RESOURCES } from "@/lib/constants";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ResourcesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resources" className="section-container" style={{ backgroundColor: "var(--sand)" }}>
      <div className="content-width">
        <ScrollReveal>
          <h2 style={{ marginBottom: "16px" }}>Resources</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="content-width-lg">
            <p style={{ marginBottom: "var(--gap-v)" }}>
              Explore the research, recommendations, and implementation guidance
              that shape the Dietary Guidelines, including the science, the
              policy guidance, and the everyday serving framework.
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
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "var(--gap-h)",
            marginBottom: "var(--gap-v)",
          }}
        >
          {PDF_RESOURCES.map((resource, i) => (
            <motion.a
              key={i}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: resource.bgColor,
                textDecoration: "none",
                transition: "transform 0.3s ease",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                <Image
                  src={resource.coverImage}
                  alt={resource.title}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                />
              </div>
              <div style={{ padding: "16px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-grotesk-bold)",
                    fontWeight: 700,
                    fontSize: "var(--s-text-size)",
                    lineHeight: "var(--s-line-height)",
                    color:
                      resource.bgColor === "#153F15"
                        ? "var(--off-white)"
                        : "var(--off-black)",
                  }}
                >
                  {resource.title}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <ScrollReveal>
          <div
            style={{
              backgroundColor: "rgba(253, 251, 238, 0.5)",
              borderRadius: "16px",
              padding: "24px",
              fontSize: "var(--s-text-size)",
              lineHeight: "var(--s-line-height)",
              color: "rgba(17, 0, 0, 0.5)",
              maxWidth: "var(--container-lg)",
            }}
          >
            <p>
              This content is undergoing a Section 508 review. If you need
              immediate assistance accessing this content, please submit a
              request to{" "}
              <a
                href="mailto:DietaryGuidelines@usda.gov"
                style={{ textDecoration: "underline", color: "inherit" }}
              >
                DietaryGuidelines@usda.gov
              </a>
              . Content will be updated pending the outcome of the Section 508
              review.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
