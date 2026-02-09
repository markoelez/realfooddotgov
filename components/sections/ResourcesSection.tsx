"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function useIsMobile(threshold = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= threshold);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [threshold]);
  return isMobile;
}
import { PDF_RESOURCES } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Alternating rotations — skewed to either side
const CARD_ROTATIONS = [-8, 6, -5, 8];

function DocCard({
  resource,
  index,
  total,
  scrollYProgress,
}: {
  resource: (typeof PDF_RESOURCES)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Each card has its own scroll range — they arrive one after another
  // Cards fill 0–0.85 of scroll, leaving 0.85–1.0 as "hold" with all stacked
  const segmentSize = 0.85 / total;
  const entryStart = index * segmentSize;
  const entryEnd = entryStart + segmentSize;

  // Card slides up from below and lands in its cascading stacked position
  const y = useTransform(
    scrollYProgress,
    [entryStart, entryEnd],
    [800, index * 80]
  );
  // Rotation stays consistent (skewed to side)
  const rotate = useTransform(
    scrollYProgress,
    [entryStart, entryEnd],
    [CARD_ROTATIONS[index] * 2, CARD_ROTATIONS[index]]
  );
  const opacity = useTransform(
    scrollYProgress,
    [entryStart, entryStart + segmentSize * 0.3],
    [0, 1]
  );

  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 16px 40px rgba(0,0,0,.12)",
        cursor: "pointer",
        backgroundColor: resource.bgColor,
        y,
        rotate,
        opacity,
        zIndex: index + 1,
      }}
    >
      <Image
        src={resource.coverImage}
        alt={resource.title}
        fill
        style={{ objectFit: "cover" }}
      />
    </motion.a>
  );
}

function DocStack({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "8 / 10",
      }}
    >
      {PDF_RESOURCES.map((resource, i) => (
        <DocCard
          key={i}
          resource={resource}
          index={i}
          total={PDF_RESOURCES.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

export default function ResourcesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  if (isMobile) {
    return (
      <section
        id="resources"
        style={{
          backgroundColor: "var(--off-white)",
          padding: "var(--padding-v) var(--padding-h)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-grotesk-display)",
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
          }}
        >
          Resources
        </h2>
        <p
          style={{
            fontSize: "var(--s-text-size)",
            lineHeight: 1.4,
            marginBottom: "28px",
          }}
        >
          Explore the research, recommendations, and implementation
          guidance that shape the Dietary Guidelines, including the
          science, the policy guidance, and the everyday serving framework.
        </p>
        <a
          href="https://www.whitehouse.gov/videos/press-secretary-karoline-leavitt-briefs-members-of-the-media-jan-7-2026/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 24px",
            borderRadius: "999px",
            border: "none",
            backgroundColor: "var(--sand)",
            color: "var(--off-black)",
            fontFamily: "var(--font-grotesk-medium)",
            fontWeight: 500,
            fontSize: "var(--s-text-size)",
            textDecoration: "none",
            marginBottom: "40px",
          }}
        >
          Watch the press release
          <span style={{ fontSize: "16px" }}>&rarr;</span>
        </a>

        {/* Card stack — static on mobile */}
        <div style={{ width: "100%", maxWidth: "320px", margin: "0 auto 40px", aspectRatio: "8 / 10", position: "relative" }}>
          {PDF_RESOURCES.map((resource, i) => (
            <a
              key={i}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "absolute",
                top: i * 20,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 16px 40px rgba(0,0,0,.12)",
                backgroundColor: resource.bgColor,
                zIndex: i + 1,
                transform: `rotate(${CARD_ROTATIONS[i]}deg)`,
              }}
            >
              <Image
                src={resource.coverImage}
                alt={resource.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </a>
          ))}
        </div>

        {/* Download links */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {PDF_RESOURCES.map((resource, i) => (
            <a
              key={i}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                padding: "16px 0",
                textDecoration: "none",
                color: "var(--off-black)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--s-text-size)",
                  lineHeight: 1.3,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Download {resource.title}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(17, 0, 0, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                &rarr;
              </span>
            </a>
          ))}

          <div
            style={{
              marginTop: "24px",
              fontSize: "12px",
              lineHeight: 1.4,
              color: "rgba(17, 0, 0, 0.4)",
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
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="resources"
      style={{
        backgroundColor: "var(--off-white)",
        padding: "calc(var(--padding-v) * 2) 0",
        minHeight: "350vh",
        position: "relative",
        overflow: "clip",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "flex-start",
          paddingTop: "1vh",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Left column — text & links */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "clamp(50px, 10vw, 160px)",
              width: "25%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0",
              paddingLeft: "0",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-grotesk-display)",
                fontWeight: 700,
                fontSize: "clamp(32px, 5vw, 48px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              Resources
            </h2>
            <p
              style={{
                fontSize: "var(--s-text-size)",
                lineHeight: 1.4,
                maxWidth: "420px",
                marginBottom: "28px",
              }}
            >
              Explore the research, recommendations, and implementation
              guidance that shape the Dietary Guidelines, including the
              science, the policy guidance, and the everyday serving framework.
            </p>
            <a
              href="https://www.whitehouse.gov/videos/press-secretary-karoline-leavitt-briefs-members-of-the-media-jan-7-2026/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 24px",
                borderRadius: "999px",
                border: "none",
                backgroundColor: "var(--sand)",
                color: "var(--off-black)",
                fontFamily: "var(--font-grotesk-medium)",
                fontWeight: 500,
                fontSize: "var(--s-text-size)",
                textDecoration: "none",
                alignSelf: "flex-start",
                marginBottom: "120px",
              }}
            >
              Watch the press release
              <span style={{ fontSize: "16px" }}>&rarr;</span>
            </a>

            {/* Download links */}
            <div style={{ display: "flex", flexDirection: "column", maxWidth: "460px" }}>
              {PDF_RESOURCES.map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "16px 0",
                    borderBottom: "none",
                    textDecoration: "none",
                    color: "var(--off-black)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--s-text-size)",
                      lineHeight: 1.3,
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    Download {resource.title}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "none",
                      backgroundColor: "rgba(17, 0, 0, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    &rarr;
                  </span>
                </a>
              ))}

              {/* Accessibility notice */}
              <div
                style={{
                  marginTop: "24px",
                  fontSize: "12px",
                  lineHeight: 1.4,
                  color: "rgba(17, 0, 0, 0.4)",
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
            </div>
          </div>

          {/* Right column — card stack, absolutely positioned */}
          <div
            style={{
              position: "absolute",
              top: "38%",
              right: "15%",
              transform: "translateY(-50%)",
              width: "min(30vw, 400px)",
              aspectRatio: "8 / 10",
            }}
          >
            <DocStack scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}
