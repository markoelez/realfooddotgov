# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A single-page Next.js site promoting real food nutrition — a clone of realfood.gov. Entirely static with no backend or API calls. All content is driven by TypeScript constants in `/lib/constants.ts`.

## Commands

```bash
bun dev          # Start dev server
bun run build    # Production build
bun run lint     # ESLint
```

No test suite is configured.

## Tech Stack

- **Next.js 16** (App Router) with **React 19**, single route at `app/page.tsx`
- **Tailwind CSS 4** via PostCSS, combined with CSS variables defined in `app/globals.css`
- **Framer Motion** for scroll-triggered animations, parallax, and layout transitions
- **Lenis** for smooth scrolling (wrapped in `components/providers/LenisProvider.tsx`)
- **Bun** as the package manager (uses `bun.lock`)

## Architecture

The app is a single page (`app/page.tsx`) that renders ~14 section components in sequence. Navigation uses anchor links with smooth scrolling.

**Key directories:**
- `components/sections/` — Major page sections (Hero, Pyramid, FAQ, etc.)
- `components/layout/` — Header, Footer, GovBanner
- `components/ui/` — Reusable UI (ScrollReveal, VideoModal)
- `lib/constants.ts` — All content data: `PYRAMID_TIERS`, `FAQ_DATA`, `NAV_LINKS`, `POLICY_ITEMS`, `PDF_RESOURCES`, `GROK_PROMPTS`
- `lib/types.ts` — TypeScript interfaces for all data structures
- `lib/animations.ts` — Shared Framer Motion animation variants

**Styling approach:** Inline styles referencing CSS variables are the primary pattern. CSS variables control colors (`--off-white`, `--off-black`, `--green`, `--highlight`, etc.), typography sizes (`--h1-text-size` through `--xs-text-size`), and layout (`--container`, `--padding-h`, `--padding-v`). Tailwind is used for utility classes but not as the primary styling method.

**Fonts:** Custom Die Grotesk variants (medium, bold, black, display) loaded as WOFF2 via `@font-face` in `globals.css`. Referenced through CSS variables: `--font-grotesk-medium`, `--font-grotesk-bold`, `--font-grotesk-display`.

## Key Patterns

- All components use `"use client"` — this is a fully client-rendered app
- Animation-heavy: most sections use `useScroll`/`useTransform` from Framer Motion for parallax and scroll-based reveals
- `ScrollReveal` component wraps content for intersection-based fade-in animations
- `PyramidSection` uses absolute percentage-based positioning for ~45 food images with per-item scroll-triggered pop-in animations and configurable parallax per tier
- Image optimization is disabled in `next.config.ts` (`unoptimized: true`)
- No environment variables needed — all content is static
