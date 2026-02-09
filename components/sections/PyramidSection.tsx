"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { PYRAMID_TIERS } from "@/lib/constants";
import { staggerContainer, springBounce } from "@/lib/animations";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { PyramidTier } from "@/lib/types";

function FoodItem({
  name,
  image,
  alt,
}: {
  name: string;
  image: string;
  alt: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      style={{ position: "relative", cursor: "pointer" }}
      variants={springBounce}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <Image
        src={image}
        alt={alt}
        width={120}
        height={120}
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
      />
      {hovered && (
        <motion.div
          style={{
            position: "absolute",
            top: "-36px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "var(--off-black)",
            color: "var(--off-white)",
            fontSize: "var(--xs-text-size)",
            padding: "4px 12px",
            borderRadius: "8px",
            whiteSpace: "nowrap",
            zIndex: 10,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {name}
        </motion.div>
      )}
    </motion.div>
  );
}

function TierRow({ tier, index }: { tier: PyramidTier; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      style={{
        backgroundColor: tier.bgColor,
        borderRadius: "24px",
        overflow: "hidden",
      }}
    >
      <div
        className="section-container"
        style={{
          flexDirection: undefined,
          alignItems: undefined,
        }}
      >
        <div
          className="content-width"
          style={{
            display: "flex",
            flexDirection: index % 2 === 0 ? "row" : "row-reverse",
            gap: "var(--gap-h)",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Text side */}
          <div style={{ flex: "1 1 300px", maxWidth: "var(--container-lg)" }}>
            <ScrollReveal>
              <h3 style={{ marginBottom: "16px" }}>{tier.title}</h3>
              <p style={{ marginBottom: "24px" }}>{tier.description}</p>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(17, 0, 0, 0.08)",
                  borderRadius: "999px",
                  padding: "8px 20px",
                  fontSize: "var(--s-text-size)",
                  fontWeight: 500,
                }}
              >
                {tier.servingTarget}
              </div>
            </ScrollReveal>
          </div>

          {/* Food grid side */}
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              flex: "1 1 400px",
              display: "grid",
              gridTemplateColumns:
                tier.foods.length <= 6
                  ? "repeat(3, 1fr)"
                  : "repeat(auto-fill, minmax(80px, 1fr))",
              gap: "16px",
            }}
          >
            {tier.foods.map((food) => (
              <FoodItem
                key={food.name}
                name={food.name}
                image={food.image}
                alt={food.alt}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function PyramidSection() {
  return (
    <section id="pyramid" className="section-container">
      <div className="content-width" style={{ textAlign: "center" }}>
        <ScrollReveal>
          <h2 style={{ marginBottom: "var(--gap-v)" }}>Eat Real Food</h2>
        </ScrollReveal>
      </div>

      <div className="content-width" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {PYRAMID_TIERS.map((tier, i) => (
          <TierRow key={tier.id} tier={tier} index={i} />
        ))}
      </div>
    </section>
  );
}
