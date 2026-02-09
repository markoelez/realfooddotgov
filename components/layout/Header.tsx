"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

const SECTIONS = NAV_LINKS.map((link) => ({
  id: link.href.replace("#", ""),
  label: link.label,
}));

const DARK_SECTIONS = new Set(["real-food", "solution"]);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [isOverVideo, setIsOverVideo] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(false);

  const { scrollY } = useScroll();

  // Nav entrance: stays hidden until 50px scroll, then slides in by 150px
  const rawY = useTransform(scrollY, [0, 50, 150], [-100, -100, 0]);
  const springY = useSpring(rawY, { stiffness: 200, damping: 30 });

  // Top position: starts at 56px (below gov banner), settles to 20px
  const rawTop = useTransform(scrollY, [0, 100], [56, 20]);
  const springTop = useSpring(rawTop, { stiffness: 200, damping: 30 });

  // Detect active section and video overlap
  const updateState = useCallback(() => {
    // Check if over hero video
    const videoEl = document.getElementById("hero-video");
    if (videoEl) {
      setIsOverVideo(videoEl.getBoundingClientRect().bottom > 0);
    } else {
      setIsOverVideo(false);
    }

    // Check if near page bottom
    setIsNearBottom(
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 200
    );

    // Find active section
    const threshold = 0.2 * window.innerHeight;
    let current = SECTIONS[0].id;
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el && el.getBoundingClientRect().top <= threshold) {
        current = section.id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateState, { passive: true });
    updateState();
    return () => window.removeEventListener("scroll", updateState);
  }, [updateState]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isDark = DARK_SECTIONS.has(activeSection) || isOverVideo;
  const shouldHide = isOverVideo || isNearBottom;

  // Color values
  const pillBg = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(17, 0, 0, 0.1)";
  const dotColor = isDark
    ? "rgba(255, 255, 255, 0.5)"
    : "rgba(17, 0, 0, 0.65)";
  const dotHoverColor = isDark
    ? "rgba(255, 255, 255, 0.4)"
    : "rgba(17, 0, 0, 0.4)";
  const labelColor = isDark ? "#fff" : "rgba(17, 0, 0, 0.75)";
  const logoColor = isDark
    ? "rgba(255, 255, 255, 0.75)"
    : "rgba(17, 0, 0, 0.75)";

  return (
    <>
      <style>{`
        .nav-desktop { display: none; }
        .nav-mobile-btn { display: flex; }
        @media (min-width: 901px) {
          .nav-desktop { display: flex; }
          .nav-mobile-btn { display: none; }
        }
      `}</style>

      {/* Desktop nav */}
      <motion.nav
        className="nav-desktop"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: springTop,
          y: shouldHide ? -100 : springY,
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          zIndex: 99999,
          pointerEvents: shouldHide ? "none" : "auto",
          transition: "opacity 0.3s ease",
          opacity: shouldHide ? 0 : 1,
        }}
      >
        {/* Nav pill with dots */}
        <motion.div
          layout
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: pillBg,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "999px",
            gap: 0,
            height: "42px",
            padding: "0 20px",
            transition: "background-color 0.15s ease",
          }}
        >
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(`#${section.id}`);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                  padding: "0 6px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                {/* Dot - shrinks to 0 when active */}
                <motion.span
                  animate={{
                    width: isActive ? 0 : 8,
                    height: isActive ? 0 : 8,
                    opacity: isActive ? 0 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                  }}
                  style={{
                    borderRadius: "50%",
                    backgroundColor: dotColor,
                    flexShrink: 0,
                    transition: "background-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        dotHoverColor;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        dotColor;
                  }}
                />

                {/* Label - springs open when active */}
                <motion.span
                  layout
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? "auto" : 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                  }}
                  style={{
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{
                      duration: 0.3,
                      delay: isActive ? 0.2 : 0,
                    }}
                    style={{
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "120%",
                      letterSpacing: 0,
                      color: labelColor,
                      whiteSpace: "nowrap",
                      marginTop: "-0.5px",
                      transition: "color 0.15s ease",
                    }}
                  >
                    {section.label}
                  </motion.span>
                </motion.span>
              </a>
            );
          })}
        </motion.div>
      </motion.nav>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="nav-mobile-btn"
        aria-label="Toggle menu"
        style={{
          position: "fixed",
          top: "64px",
          right: "var(--padding-h)",
          zIndex: 99999,
          flexDirection: "column",
          gap: "5px",
          padding: "12px",
          background: pillBg,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "none",
          borderRadius: "999px",
          cursor: "pointer",
          width: "var(--nav-height)",
          height: "var(--nav-height)",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.15s ease",
        }}
      >
        <span
          style={{
            display: "block",
            height: "2px",
            width: "18px",
            backgroundColor: logoColor,
            transition: "all 0.3s ease",
            transform: menuOpen
              ? "rotate(45deg) translate(3.5px, 3.5px)"
              : "none",
          }}
        />
        <span
          style={{
            display: "block",
            height: "2px",
            width: "18px",
            backgroundColor: logoColor,
            transition: "all 0.3s ease",
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            display: "block",
            height: "2px",
            width: "18px",
            backgroundColor: logoColor,
            transition: "all 0.3s ease",
            transform: menuOpen
              ? "rotate(-45deg) translate(3.5px, -3.5px)"
              : "none",
          }}
        />
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99998,
            backgroundColor: "var(--off-black)",
            display: "flex",
            flexDirection: "column",
            padding: "80px 20px 20px 16px",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                fontFamily: "var(--font-grotesk-bold)",
                fontSize: "var(--h3-text-size)",
                color: "var(--off-white)",
                textDecoration: "none",
                padding: "12px 0",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
