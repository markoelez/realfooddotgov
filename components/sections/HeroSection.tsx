"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import VideoModal from "@/components/ui/VideoModal";

function useIsMobile(threshold = 580) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => {
      setIsMobile(Math.min(window.innerWidth, window.innerHeight) <= threshold);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [threshold]);
  return isMobile;
}

export default function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rawWidth = useTransform(scrollYProgress, [0, 0.3], [80, 100]);
  const springWidth = useSpring(rawWidth, { stiffness: 900, damping: 60 });
  const videoWidth = useTransform(springWidth, (v) => `${v}vw`);

  return (
    <div ref={containerRef}>
    <section
      id="real-food"
      style={{
        backgroundColor: "var(--off-black)",
        color: "var(--off-white)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Hero text content */}
      <div
        style={{
          paddingTop: "140px",
          paddingLeft: "var(--padding-h)",
          paddingRight: "var(--padding-h)",
          paddingBottom: "calc(var(--gap-v) * 0.95)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            width: "100%",
          }}
        >
          <motion.h1
            style={{
              fontFamily: "var(--font-grotesk-display)",
              fontWeight: 700,
              fontSize: "min(170px, 16.5vw)",
              maxWidth: "800px",
              lineHeight: 0.86,
              letterSpacing: 0,
              textAlign: "center",
              whiteSpace: "pre-line",
              marginBottom: "12px",
              color: "var(--off-white)",
            }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            Real Food Wins
          </motion.h1>

          <motion.div
            style={{
              marginBottom: "32px",
              maxWidth: "600px",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <p
              style={{
                fontFamily: "var(--font-grotesk-bold)",
                fontWeight: 700,
                fontSize: "21px",
                lineHeight: 1.1,
                letterSpacing: 0,
                textAlign: "center",
                color: "color-mix(in srgb, var(--off-white) 75%, transparent)",
                maxWidth: "760px",
              }}
            >
              America is the greatest country on Earth. And the sickest. Highly
              processed food has hollowed out our health, driving obesity, diabetes,
              heart disease, and early death. The truth is simple: real food restores
              health.
            </p>
          </motion.div>

          <motion.a
            href="#pyramid"
            className="cta-pulse"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#pyramid")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              backgroundColor: "#F4FFAE",
              padding: "18px 28px",
              fontSize: "var(--m-text-size)",
              fontWeight: 500,
              textDecoration: "none",
              color: "var(--off-black)",
              width: "fit-content",
              borderRadius: "40px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "background-color 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
              marginBottom: "32px",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#F0FF93";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#F4FFAE";
            }}
          >
            What is real food?
          </motion.a>
        </div>
      </div>

      {/* Video preview */}
      <motion.div
        id="hero-video"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "20px",
          overflow: "visible",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          width: isMobile ? "100%" : videoWidth,
        }}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            inset: "-15px",
            zIndex: -1,
            pointerEvents: "none",
            filter: "blur(50px)",
            opacity: 0.5,
            overflow: "hidden",
            borderRadius: "100px",
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          <Image
            src="/images/video-placeholder.webp"
            alt=""
            fill
            style={{ objectFit: "cover" }}
            aria-hidden="true"
          />
        </div>

        {/* Video preview card */}
        <div
          onClick={() => setVideoOpen(true)}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            cursor: "pointer",
            overflow: "hidden",
            borderRadius: "24px",
          }}
        >
          <Image
            src="/images/video-placeholder.webp"
            alt="Video preview"
            fill
            style={{
              objectFit: "cover",
              borderRadius: "24px",
              transition: "opacity 0.5s ease",
            }}
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              minWidth: "100%",
              minHeight: "100%",
              pointerEvents: "none",
              transition: "opacity 0.5s ease",
              transform: "scale(1.1)",
              objectFit: "cover",
            }}
          >
            <source src="/video/bgv.mp4" type="video/mp4" />
          </video>

          {/* Play overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                padding: "8px 8px 8px 24px",
                borderRadius: "48px",
                border: "1px solid rgba(250, 250, 250, 0.2)",
                background: "rgba(0, 0, 0, 0.25)",
                backdropFilter: "blur(17.5px)",
                WebkitBackdropFilter: "blur(17.5px)",
                cursor: "pointer",
                transition: "transform 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                (e.currentTarget as HTMLElement).style.background = "rgba(0, 0, 0, 0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.background = "rgba(0, 0, 0, 0.25)";
              }}
            >
              <span style={{ fontSize: "16px", fontWeight: 500, color: "white", whiteSpace: "nowrap" }}>
                Watch Super Bowl LX Spot
              </span>
              <span
                style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "white",
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="var(--off-black)"
                  style={{ marginLeft: "2px" }}
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        src="/video/Real_Food_by_Mike_Tyson.mp4"
      />
    </section>
    </div>
  );
}
