"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

const FOODS = [
  { image: "/images/pyramid/avocado.webp", name: "Avocados" },
  { image: "/images/pyramid/eggs.webp", name: "Eggs" },
  { image: "/images/pyramid/salmon.webp", name: "Salmon" },
  { image: "/images/pyramid/tomatoes.webp", name: "Tomatoes" },
  { image: "/images/pyramid/steak.webp", name: "Steak" },
  { image: "/images/pyramid/blueberries.webp", name: "Blueberries" },
  { image: "/images/pyramid/broccoli.webp", name: "Broccoli" },
  { image: "/images/pyramid/chicken.webp", name: "Chicken" },
  { image: "/images/pyramid/apples.webp", name: "Apples" },
  { image: "/images/pyramid/butter.webp", name: "Butter" },
  { image: "/images/pyramid/oranges.webp", name: "Oranges" },
  { image: "/images/pyramid/cheese.webp", name: "Cheese" },
];

const INTERVAL = 3500;
const CENTER_SIZE = 340;
const SIDE_SIZE = 220;
const SIDE_OFFSET = 160;

export default function EatRealCarousel() {
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();

  const centerSize = isMobile ? 200 : CENTER_SIZE;
  const sideSize = isMobile ? 130 : SIDE_SIZE;
  const sideOffset = isMobile ? 90 : SIDE_OFFSET;

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % FOODS.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, INTERVAL);
    return () => clearInterval(id);
  }, [advance]);

  const getIndex = (offset: number) =>
    (current + offset + FOODS.length) % FOODS.length;

  const prev = getIndex(-1);
  const next = getIndex(1);

  return (
    <section
      style={{
        backgroundColor: "var(--off-black)",
        color: "var(--off-white)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "calc(var(--padding-v) * 3) var(--padding-h) calc(var(--padding-v) * 1)",
        minHeight: "80vh",
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-grotesk-display)",
          fontWeight: 700,
          fontSize: "clamp(72px, 14vw, 180px)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          textAlign: "center",
          marginBottom: "48px",
        }}
      >
        Eat Real
      </h2>

      {/* Carousel */}
      <div
        style={{
          position: "relative",
          width: `${centerSize + sideOffset * 2}px`,
          height: `${centerSize}px`,
          marginBottom: "48px",
        }}
      >
        {/* Previous card */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: `${sideSize}px`,
            height: `${sideSize}px`,
            transform: `translate(calc(-50% - ${centerSize * 0.65}px), -50%)`,
            zIndex: 1,
          }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={prev}
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 0.9 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Image
                src={FOODS[prev].image}
                alt={FOODS[prev].name}
                width={150}
                height={150}
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center card */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: `${centerSize}px`,
            height: `${centerSize}px`,
            transform: "translate(-50%, -50%)",
            zIndex: 3,
          }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current}
              initial={{ scale: 0.65, opacity: 0.7, x: sideOffset }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.65, opacity: 0, x: -sideOffset }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "28px",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <Image
                src={FOODS[current].image}
                alt={FOODS[current].name}
                width={260}
                height={260}
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next card */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: `${sideSize}px`,
            height: `${sideSize}px`,
            transform: `translate(calc(-50% + ${centerSize * 0.65}px), -50%)`,
            zIndex: 1,
          }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={next}
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 0.9 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Image
                src={FOODS[next].image}
                alt={FOODS[next].name}
                width={150}
                height={150}
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Food name */}
      <div style={{ height: "190px", position: "relative", overflow: "hidden", width: "100%" }}>
        <AnimatePresence mode="popLayout">
          <motion.p
            key={current}
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: "var(--font-grotesk-display)",
              fontWeight: 700,
              fontSize: "clamp(72px, 14vw, 180px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {FOODS[current].name}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
