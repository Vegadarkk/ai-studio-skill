# Visor — VR Product Header Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, v0, Bolt, etc.). Paste this entire file as a single prompt into an empty directory. It contains the exact, complete source of every file in the project — follow it literally and the result is pixel-for-pixel the original.

## What this project is

"Visor" is a light, near-white header for a VR hardware product, and the one page in this set that is not dark. It sits on `#eaf1f7`, with the navbar in its own dedicated row rather than floating over the artwork — a small square mark and wordmark on the left, four centred links (`Explore`, `Experiences`, `Technology`, `About Us`) with the active one underlined, and a near-black `Get Started` pill on the right. Below it, a rounded 16:9 frame holds a looping video of a woman wearing a pale VR headset, with the words `FUTURE VISION` set enormous in Montserrat across the lower third — the type is split so the character's head occludes the middle, and a small black `Buy Now $600` pill sits centred beneath it. Under the frame, three cards fan out at slight opposing angles: a features card, a centred `Discover Advanced VR Innovation` card, and a `4.9` rating card with an avatar stack. Four modals (buy, get started, learn more, reviews) hang off the CTAs.

## Reproduce this exactly

The goal is a **byte-identical rebuild**, not an interpretation. Every file below is the real, final source of a shipped project. Write each one out verbatim.

- **Do not "improve" anything.** Not the copy, not the colour values, not the spacing, not the class names, not the markup structure, not the ids on elements. Odd-looking values are deliberate.
- **Do not substitute libraries or approaches.** No `tailwind.config.js`, no CSS-in-JS, no other icon package, no other animation library, no router, no state library. The dependency list below is complete and exact.
- **Use the pinned versions in `package.json` as written** — do not run `npm install <pkg>@latest`, and do not let a scaffolder overwrite them with newer ones. A different React, Vite or Tailwind version is a different build.
- **Do not add files.** The complete file list is exactly what appears under **File:** below, plus the downloaded assets.
- **Keep every accessibility attribute** — `aria-label`, `aria-hidden`, `alt` text. They are load-bearing, not decoration.
- **Keep the comments.** They record why specific values were chosen and are part of the source.
- If a scaffolding tool generates boilerplate (`App.css`, the Vite SVG logos, a starter `App.tsx`, a `README.md`), **delete it** rather than merging it in.

## Tech stack (required — do not substitute)

- Vite 6 + React 19 + TypeScript
- `@vitejs/plugin-react` — the React plugin
- Tailwind CSS v4 via the **`@tailwindcss/vite`** plugin — there is **no** `tailwind.config.js`. Everything the design system declares lives in `src/index.css`, imported once with `@import "tailwindcss"`. Do not convert this to a config file, CSS modules, or styled-components.
- `lucide-react` for off-the-shelf icons.
- `motion` — the Motion One / `motion/react` package (`import { motion } from 'motion/react'`). This is **not** `framer-motion`; do not install or import that package.
- Fonts are loaded in `index.html` via Google Fonts `<link>` tags, not self-hosted and not through a bundler font plugin: **Montserrat** (800, 900) for the oversized display type, **Outfit** (600–900), **Plus Jakarta Sans** (400–800) and **Syne** (700, 800).
- The dependency list in `package.json` below is complete and exact — do not add, remove, or substitute a package.


### package.json

```json
{
  "name": "visor",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.14",
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^5.0.4",
    "tailwindcss": "^4.1.14",
    "typescript": "~5.8.2",
    "vite": "^6.2.3"
  }
}
```

## Assets — download them, do not hotlink

This project needs 1 file that is not in the code. Download it as the **first build step**, then reference it by its **local path** everywhere in the project:

- `public/hero.mp4` ← https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/visor/hero.mp4

```bash
mkdir -p public
curl -L -o public/hero.mp4 "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/visor/hero.mp4"
```

**The download URL above must not appear anywhere in the project you generate** — not in `index.html`, not in a component, not in CSS, not in a config file. It is the template library's own storage, not a CDN licensed to serve your site's traffic. A page that hotlinks it breaks the moment the asset is moved, and it bills your visitors' bandwidth to someone else. Download it once, commit it with your project, and serve it from your own hosting like any other asset you own.

The Unsplash photographs referenced in the components are a different case and are **not** covered by the rule above: those are hotlinked deliberately, from a CDN built to be linked to. Leave them exactly as written.

## Steps to build

1. Scaffold a new Vite React + TypeScript project named `visor`, then delete every file the scaffolder generated under `src/` and `public/` — none of it survives into the final project.
2. Write `package.json` exactly as given above and install with it, so the pinned versions are what actually land in `node_modules`.
3. Download the assets as described in **Assets** above — do this before the first run, so the page has real footage immediately.
4. Write `index.html`, `tsconfig.json`, `vite.config.ts`, `.gitignore`, `src/main.tsx`, `src/App.tsx` and `src/index.css` with the exact contents below.
5. Write `src/types.ts`, `src/components/CinematicHeroVideo.tsx`, `src/components/HeroCardsBanner.tsx`, `src/components/InteractiveModals.tsx` and `src/components/Navbar.tsx` with the exact contents below.
6. There is **no** `tailwind.config.js` and no stylesheet beyond `src/index.css` — every visual rule outside that one file is a Tailwind utility class written directly in the JSX.
7. Run `npm run dev` and confirm the video fills the rounded 16:9 frame, the FUTURE VISION type sits correctly around the headset, and all four modals open. Run `npm run lint` (`tsc --noEmit`) and `npm run build`; both must be clean.

## File: `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Visor - Advanced VR Innovation</title>
    <meta name="description" content="Discover advanced VR innovation with Visor. Empowering businesses with next-generation VR technology." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Outfit:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-slate-900 text-slate-900 antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## File: `package.json`

```json
{
  "name": "visor",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.14",
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^5.0.4",
    "tailwindcss": "^4.1.14",
    "typescript": "~5.8.2",
    "vite": "^6.2.3"
  }
}
```

## File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

## File: `vite.config.ts`

```ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

## File: `.gitignore`

```
node_modules
dist
.DS_Store
```

## File: `src/main.tsx`

```tsx
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

## File: `src/App.tsx`

```tsx
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CinematicHeroVideo } from './components/CinematicHeroVideo';
import { HeroCardsBanner } from './components/HeroCardsBanner';
import { InteractiveModals } from './components/InteractiveModals';

const VIDEO_BG_URL =
  '/hero.mp4';

export default function App() {
  const [activeNav, setActiveNav] = useState('Explore');
  const [activeModal, setActiveModal] = useState<
    'buy' | 'get-started' | 'learn-more' | 'reviews' | null
  >(null);

  return (
    <div className="min-h-screen bg-[#eaf1f7] flex flex-col items-center justify-start selection:bg-cyan-500 selection:text-white pb-16">
      
      {/* ============================================================ */}
      {/* HEADER SECTION (NAVBAR AT TOP, VIDEO CLEANLY BELOW) */}
      {/* ============================================================ */}
      <header className="w-full max-w-[1440px] px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 flex flex-col gap-3 sm:gap-4">
        {/* Navigation Bar at Top - Dedicated space, no overlap with video */}
        <Navbar
          activeNav={activeNav}
          onNavClick={(nav) => setActiveNav(nav)}
          onGetStartedClick={() => setActiveModal('get-started')}
        />

        {/* 16:9 Aspect Ratio Cinematic Video Frame */}
        <div
          id="header-16-9-frame"
          className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[580px] max-h-[720px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black"
        >
          {/* 
            Layer 1: Background Video (100% Opacity)
            Layer 2: Oversized "FUTURE VISION" Typography flanking the character
          */}
          <CinematicHeroVideo videoUrl={VIDEO_BG_URL} />
        </div>
      </header>

      {/* ============================================================ */}
      {/* 3 HORIZONTAL ANGLED BOXES EXACTLY BELOW THE VIDEO (Image 2) */}
      {/* ============================================================ */}
      <section className="w-full">
        <HeroCardsBanner
          onBuyNowClick={() => setActiveModal('buy')}
          onLearnMoreClick={() => setActiveModal('learn-more')}
          onReviewsClick={() => setActiveModal('reviews')}
        />
      </section>

      {/* Interactive Feature Modals */}
      <InteractiveModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
```

## File: `src/index.css`

```css
@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;
  }
}

/* Glassmorphism and Custom Hero Card Shapes */
.glass-panel {
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.glass-nav {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* Clip paths for the three sections shown in image 2 */
@media (min-width: 1024px) {
  /* Left panel: angled right edge (slants right to left downwards or left to right) */
  .polygon-left-card {
    clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%);
  }

  /* Center panel: inverted trapezoid (wider at top, narrower at bottom) */
  .polygon-center-card {
    clip-path: polygon(7% 0, 93% 0, 100% 100%, 0% 100%);
  }

  /* Right panel: angled left edge */
  .polygon-right-card {
    clip-path: polygon(12% 0, 100% 0, 100% 100%, 0% 100%);
  }
}
```

## File: `src/components/CinematicHeroVideo.tsx`

```tsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RefreshCw, Eye, Cpu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CinematicHeroVideoProps {
  videoUrl: string;
}

export const CinematicHeroVideo: React.FC<CinematicHeroVideoProps> = ({ videoUrl }) => {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOculusHovered, setIsOculusHovered] = useState(false);

  // Synchronize playback between background and foreground video
  const syncVideos = useCallback(() => {
    if (bgVideoRef.current && fgVideoRef.current) {
      const diff = Math.abs(bgVideoRef.current.currentTime - fgVideoRef.current.currentTime);
      if (diff > 0.04) {
        fgVideoRef.current.currentTime = bgVideoRef.current.currentTime;
      }
    }
  }, []);

  useEffect(() => {
    const bg = bgVideoRef.current;
    const fg = fgVideoRef.current;

    if (bg && fg) {
      const handlePlay = () => {
        setIsPlaying(true);
        fg.play().catch(() => {});
      };
      const handlePause = () => {
        setIsPlaying(false);
        fg.pause();
      };
      const handleTimeUpdate = () => {
        syncVideos();
      };

      bg.addEventListener('play', handlePlay);
      bg.addEventListener('pause', handlePause);
      bg.addEventListener('timeupdate', handleTimeUpdate);

      // Frame-locked continuous synchronization loop
      let animId: number;
      const loopSync = () => {
        if (bg && fg && !bg.paused) {
          const diff = Math.abs(bg.currentTime - fg.currentTime);
          if (diff > 0.04) {
            fg.currentTime = bg.currentTime;
          }
        }
        animId = requestAnimationFrame(loopSync);
      };
      animId = requestAnimationFrame(loopSync);

      bg.play().catch(() => {
        setIsPlaying(false);
      });

      return () => {
        cancelAnimationFrame(animId);
        bg.removeEventListener('play', handlePlay);
        bg.removeEventListener('pause', handlePause);
        bg.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [syncVideos]);

  const togglePlay = () => {
    if (!bgVideoRef.current || !fgVideoRef.current) return;
    if (isPlaying) {
      bgVideoRef.current.pause();
      fgVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      bgVideoRef.current.play();
      fgVideoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    if (!bgVideoRef.current || !fgVideoRef.current) return;
    bgVideoRef.current.currentTime = 0;
    fgVideoRef.current.currentTime = 0;
    bgVideoRef.current.play();
    fgVideoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-black">
      
      {/* ============================================================ */}
      {/* LAYER 1: BASE BACKGROUND VIDEO (100% OPACITY, ZERO OVERLAYS) */}
      {/* ============================================================ */}
      <video
        ref={bgVideoRef}
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center opacity-100 z-0"
      />

      {/* ============================================================ */}
      {/* LAYER 2: HUGE & BOLD "FUTURE VISION" TYPOGRAPHY (BELOW CHARACTER) */}
      {/* ============================================================ */}
      <div
        id="typography-future-vision"
        className="absolute inset-x-0 bottom-[5%] sm:bottom-[6%] md:bottom-[7%] z-25 flex flex-col items-center justify-center pointer-events-none select-none px-4 text-center"
      >
        <h1
          id="hero-main-title"
          className="font-['Montserrat','Outfit',sans-serif] font-black uppercase tracking-[-0.035em] text-white leading-none text-[13vw] sm:text-[12vw] md:text-[11vw] lg:text-[9.5vw] xl:text-[130px] whitespace-nowrap drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)]"
        >
          FUTURE VISION
        </h1>
      </div>

      {/* ============================================================ */}
      {/* LAYER 3: FOREGROUND CHARACTER VIDEO (OCCLUSION & MASKING) */}
      {/* ============================================================ */}
      <video
        ref={fgVideoRef}
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-20 pointer-events-none opacity-100"
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse 34% 88% at 50% 50%, black 50%, rgba(0,0,0,0.8) 65%, transparent 85%)',
          maskImage:
            'radial-gradient(ellipse 34% 88% at 50% 50%, black 50%, rgba(0,0,0,0.8) 65%, transparent 85%)',
        }}
      />

      {/* ============================================================ */}
      {/* LAYER 4: INTERACTIVE OCULUS HOVER HOTSPOT & GLASS BOX */}
      {/* ============================================================ */}
      {/*
        Invisible interactive trigger area covering the Oculus headset on the character.
        When hovered, displays the small circular dot marker directly on the Oculus,
        a thin directional arrow/line, and a compact frosted glassmorphism info card beside it.
      */}
      <div
        id="oculus-interactive-hotspot"
        onMouseEnter={() => setIsOculusHovered(true)}
        onMouseLeave={() => setIsOculusHovered(false)}
        className="absolute top-[28%] sm:top-[30%] md:top-[32%] left-[44%] sm:left-[46%] md:left-[47%] w-[26%] sm:w-[22%] md:w-[19%] h-[24%] sm:h-[22%] md:h-[20%] z-40 cursor-pointer rounded-full"
        title="Hover to view Oculus details"
      />

      {/* Hover Elements: Circular Dot Marker, Directional Line, and Glass Box Card */}
      <AnimatePresence>
        {isOculusHovered && (
          <div
            className="absolute inset-0 z-40 pointer-events-none select-none overflow-visible"
            aria-live="polite"
          >
            {/* 1. Small Circular Dot Marker directly on the Oculus */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute top-[42.5%] left-[58.5%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
            >
              {/* Outer pulsing ring */}
              <div className="w-5 h-5 rounded-full border border-white/70 animate-ping opacity-60 absolute" />
              {/* Hotspot circular ring */}
              <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-white bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                {/* Center solid core dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </motion.div>

            {/* 2. Thin Directional Line / Arrow extending toward the info card */}
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="absolute top-[35%] left-[58.5%] w-[18vw] max-w-[140px] h-[70px] pointer-events-none hidden sm:block overflow-visible"
            >
              {/* Directional angled line */}
              <path
                d="M 0 45 L 30 12 L 100 12"
                fill="none"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="1.25"
                strokeDasharray="2 2"
              />
              <circle cx="100" cy="12" r="2.5" fill="white" />
            </motion.svg>

            {/* 3. Compact Glassmorphism Information Card beside the Oculus */}
            <motion.div
              initial={{ opacity: 0, x: 14, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.94 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[28%] sm:top-[30%] md:top-[31%] left-[64%] sm:left-[66%] md:left-[68%] pointer-events-none"
            >
              <div
                id="oculus-glass-card"
                className="w-[200px] sm:w-[220px] md:w-[230px] p-3 sm:p-3.5 rounded-xl bg-white/[0.16] backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-200"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest">
                      Oculus Vision Pro
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-white/20 text-[9px] font-semibold text-white/80 tracking-wide">
                    8K Micro-OLED
                  </span>
                </div>

                {/* Sub-headline */}
                <h4 className="text-xs sm:text-[13px] font-bold text-white leading-snug tracking-tight mb-1">
                  Spatial Neural Display
                </h4>

                {/* Specs List */}
                <div className="grid grid-cols-2 gap-1 pt-1.5 mt-1 border-t border-white/20">
                  <div className="flex items-center gap-1 text-[10px] text-white/90">
                    <Eye className="w-3 h-3 text-cyan-300 shrink-0" />
                    <span>Foveated Optic</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-white/90">
                    <Cpu className="w-3 h-3 text-cyan-300 shrink-0" />
                    <span>12ms Latency</span>
                  </div>
                </div>

                {/* Micro Footer Accent */}
                <div className="flex items-center justify-between text-[9px] text-white/70 pt-1.5 mt-1.5 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-white/80" />
                    LiDAR Eye-Tracking
                  </span>
                  <span className="font-semibold text-white/90">Active</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* LAYER 5: PLAYBACK CONTROLS (Bottom-Right) */}
      {/* ============================================================ */}
      <div className="absolute bottom-4 right-4 z-30 pointer-events-auto flex items-center gap-2">
        <button
          id="btn-toggle-video-playback"
          onClick={togglePlay}
          title={isPlaying ? 'Pause Video' : 'Play Video'}
          className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-lg transition-all active:scale-90 cursor-pointer"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          id="btn-restart-video"
          onClick={handleRestart}
          title="Restart Video"
          className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-lg transition-all active:scale-90 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
```

## File: `src/components/HeroCardsBanner.tsx`

```tsx
import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, Lightbulb } from 'lucide-react';

interface HeroCardsBannerProps {
  onBuyNowClick: () => void;
  onLearnMoreClick: () => void;
  onReviewsClick: () => void;
}

export const HeroCardsBanner: React.FC<HeroCardsBannerProps> = ({
  onBuyNowClick,
  onLearnMoreClick,
  onReviewsClick,
}) => {
  return (
    <section
      id="floating-cards-section"
      className="relative z-30 w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 -mt-12 sm:-mt-14 lg:-mt-16"
    >
      {/* Floating "Buy Now $600" Badge Centered Over the Middle Card */}
      <div className="relative flex justify-center z-40 mb-[-18px] sm:mb-[-20px]">
        <motion.button
          id="btn-buy-now-pill"
          onClick={onBuyNowClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#0a0c10] text-white font-medium text-xs sm:text-sm tracking-wide shadow-[0_10px_25px_rgba(0,0,0,0.45)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.6)] transition-all cursor-pointer border border-slate-700/80 flex items-center justify-center gap-2"
        >
          <span className="font-semibold text-white tracking-normal">Buy Now $600</span>
        </motion.button>
      </div>

      {/* 
        Horizontal 3-Card Row:
        Single horizontal row with equal height (items-stretch), 
        smooth rectangular shape with subtle gaps or connected geometry,
        floating directly above the header boundary.
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 items-stretch w-full">
        
        {/* ============================================================ */}
        {/* CARD 1 (LEFT): Empowering Businesses */}
        {/* ============================================================ */}
        <motion.div
          id="card-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 shadow-[0_12px_36px_rgba(15,23,42,0.12)] border border-white/80 hover:shadow-[0_16px_44px_rgba(15,23,42,0.18)] transition-all duration-300 flex flex-col justify-between group min-h-[220px] lg:min-h-[250px]"
        >
          {/* Top Icons */}
          <div className="flex items-center gap-3">
            {/* VR Headset pill shape */}
            <div className="w-10 h-6 rounded-full border-[1.5px] border-slate-800 bg-slate-50 flex items-center justify-center gap-1.5 px-2 shadow-2xs group-hover:scale-105 transition-transform">
              <div className="w-2 h-2 rounded-full bg-slate-900" />
              <div className="w-2 h-2 rounded-full bg-slate-900" />
            </div>
            
            {/* Lightbulb glyph */}
            <div className="w-6 h-6 flex items-center justify-center text-slate-800 group-hover:text-amber-500 transition-colors">
              <Lightbulb className="w-5 h-5 stroke-[1.8]" />
            </div>
          </div>

          {/* Body Text */}
          <div className="my-3">
            <h3 className="text-lg sm:text-[19px] lg:text-[20px] font-medium leading-[1.32] text-slate-900 tracking-tight font-sans">
              Empowering Businesses With{' '}
              <span className="font-semibold">
                Next-Generation VR Technology.
              </span>
            </h3>
          </div>

          {/* Bottom Action */}
          <div className="pt-1">
            <button
              id="btn-learn-more"
              onClick={onLearnMoreClick}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-slate-900 underline underline-offset-4 decoration-slate-900/80 hover:text-cyan-800 hover:decoration-cyan-800 transition-colors cursor-pointer group/link"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
            </button>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* CARD 2 (CENTER): Discover Advanced VR Innovation */}
        {/* ============================================================ */}
        <motion.div
          id="card-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 shadow-[0_14px_40px_rgba(15,23,42,0.15)] border border-slate-100 hover:shadow-[0_18px_48px_rgba(15,23,42,0.2)] transition-all duration-300 flex flex-col items-center justify-center text-center group min-h-[220px] lg:min-h-[250px]"
        >
          <div className="space-y-3 max-w-sm mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-slate-900 tracking-tight leading-[1.2] font-sans">
              Discover Advanced VR
              <br />
              Innovation
            </h2>
            
            <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed max-w-[320px] mx-auto">
              Step Into Immersive Virtual Worlds And Experience Next-Generation Innovation Through Cutting-Edge VR
            </p>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* CARD 3 (RIGHT): 4.9 Rating & 750+ Reviews */}
        {/* ============================================================ */}
        <motion.div
          id="card-right"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 shadow-[0_12px_36px_rgba(15,23,42,0.12)] border border-white/80 hover:shadow-[0_16px_44px_rgba(15,23,42,0.18)] transition-all duration-300 flex flex-col justify-between group min-h-[220px] lg:min-h-[250px]"
        >
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
              4.9
            </span>
          </div>

          {/* User Avatars & 750+ Reviews */}
          <div
            id="hero-reviews-cluster"
            onClick={onReviewsClick}
            className="flex items-center gap-3 py-1 cursor-pointer group/rev"
          >
            {/* 3 Overlapping Avatar Images */}
            <div className="flex -space-x-2.5 items-center">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Customer Reviewer 1"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white ring-1 ring-slate-200 shadow-2xs"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Customer Reviewer 2"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white ring-1 ring-slate-200 shadow-2xs"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                alt="Customer Reviewer 3"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white ring-1 ring-slate-200 shadow-2xs"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Reviews Count */}
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                750+
              </span>
              <span className="text-xs font-normal text-slate-500">
                Reviews
              </span>
            </div>
          </div>

          {/* Caption Subtext */}
          <div className="pt-1">
            <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed">
              The perfect VR team to build immersive worlds you can truly experience.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
```

## File: `src/components/InteractiveModals.tsx`

```tsx
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Star, Shield, Cpu, Glasses, Zap, ArrowRight } from 'lucide-react';

interface InteractiveModalsProps {
  activeModal: 'buy' | 'get-started' | 'learn-more' | 'reviews' | null;
  onClose: () => void;
}

export const InteractiveModals: React.FC<InteractiveModalsProps> = ({
  activeModal,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content: BUY NOW $600 */}
            {activeModal === 'buy' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
                    VR
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">
                      Next-Gen System
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">
                      Visor Vision X1
                    </h3>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Spatial Optics</span>
                    <span className="font-semibold text-slate-900">4K Micro-OLED / Eye</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Tracking Engine</span>
                    <span className="font-semibold text-slate-900">6DoF Sub-Millimeter</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Battery Life</span>
                    <span className="font-semibold text-slate-900">Up to 4.5 Hours</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between items-center">
                    <span className="font-medium text-slate-700">Special Launch Price</span>
                    <span className="text-2xl font-extrabold text-slate-900">$600 <span className="text-xs text-slate-400 line-through">$899</span></span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      alert('Thank you for ordering Visor VR! Order confirmed.');
                      onClose();
                    }}
                    className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-center transition-all shadow-md active:scale-98"
                  >
                    Complete Pre-Order ($600)
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    Includes 2-year warranty & free worldwide expedited shipping.
                  </p>
                </div>
              </div>
            )}

            {/* Modal Content: GET STARTED */}
            {activeModal === 'get-started' && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">
                    Welcome to Visor
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 pt-2">
                    Get Started With Visor VR
                  </h3>
                  <p className="text-sm text-slate-600">
                    Experience the future of enterprise spatial computing and collaboration.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Request received! A Visor specialist will contact you shortly.');
                    onClose();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Interest Area
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-white">
                      <option>Enterprise Simulation & Training</option>
                      <option>Industrial 3D Design & CAD</option>
                      <option>Medical & Healthcare VR</option>
                      <option>Visor Hardware Purchase</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
                  >
                    Request Guided Demo
                  </button>
                </form>
              </div>
            )}

            {/* Modal Content: LEARN MORE */}
            {activeModal === 'learn-more' && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">
                    Technology Overview
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    Empowering Businesses With Next-Gen VR
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Visor blends neural optics, zero-latency spatial audio, and haptic feedback.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Neural Co-Processor</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Real-time eye-tracking & foveated rendering</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Enterprise Security</h4>
                      <p className="text-xs text-slate-500 mt-0.5">SOC2 & end-to-end encrypted spatial streams</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <Zap className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Ultra-low Latency</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Sub-5ms photon-to-motion latency response</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <Glasses className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Ultralight Chassis</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Only 290g balanced ergonomic fit</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
                >
                  Close Overview
                </button>
              </div>
            )}

            {/* Modal Content: REVIEWS */}
            {activeModal === 'reviews' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Customer Reviews</h3>
                    <p className="text-sm text-slate-500">Over 750+ verified enterprise teams</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-200">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-lg text-slate-900">4.9 / 5</span>
                  </div>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900">Elena Rostova</span>
                      <span className="text-xs text-slate-400">CTO, HoloDesign</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      "Visor reduced our collaborative prototyping cycle by 70%. The clarity and tracking precision are completely unmatched."
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900">Marcus Chen</span>
                      <span className="text-xs text-slate-400">Head of VR, AeroSim</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      "The lightweight form factor allows our engineers to work in virtual spaces for hours with zero fatigue."
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
                >
                  Close Reviews
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
```

## File: `src/components/Navbar.tsx`

```tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NavItem } from '../types';

interface NavbarProps {
  onGetStartedClick: () => void;
  onNavClick: (item: string) => void;
  activeNav: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'explore', label: 'Explore', href: '#explore' },
  { id: 'experiences', label: 'Experiences', href: '#experiences' },
  { id: 'technology', label: 'Technology', href: '#technology' },
  { id: 'about-us', label: 'About Us', href: '#about-us' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onGetStartedClick,
  onNavClick,
  activeNav,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-40 w-full px-2 sm:px-4 py-2 sm:py-3 transition-all duration-300">
      <div className="w-full flex items-center justify-between">
        
        {/* Logo in grey-black */}
        <a
          href="#"
          id="nav-logo"
          className="flex items-center gap-2 text-slate-800 hover:text-slate-950 group cursor-pointer transition-colors"
          onClick={(e) => {
            e.preventDefault();
            onNavClick('explore');
          }}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className="w-4.5 h-4.5 border-[1.75px] border-slate-800 rounded-[3px] group-hover:scale-105 transition-transform" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-800 font-sans">
            Visor
          </span>
        </a>

        {/* Center Navigation Links (Grey-Black font) */}
        <div
          id="desktop-nav-links"
          className="hidden md:flex items-center gap-7 lg:gap-10"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav.toLowerCase() === item.label.toLowerCase();
            return (
              <a
                key={item.id}
                id={`nav-link-${item.id}`}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(item.label);
                }}
                className={`relative text-sm font-medium tracking-normal transition-colors duration-200 cursor-pointer py-1 ${
                  isActive
                    ? 'text-slate-950 font-semibold'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-slate-900 rounded-full shadow-xs"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Action: "Get Started" Pop-up Pill Button with Black background & White font */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            id="btn-get-started-nav"
            onClick={onGetStartedClick}
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="group relative px-6 py-2.5 rounded-full bg-slate-950 hover:bg-black text-white text-sm font-semibold tracking-normal shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-200 cursor-pointer flex items-center gap-1.5"
          >
            <span className="relative z-10 flex items-center gap-1">
              Get Started
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg bg-white/60 text-slate-800 backdrop-blur-md border border-slate-300 hover:bg-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="md:hidden mt-3 max-w-7xl mx-auto rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 p-5 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    onNavClick(item.label);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium text-base transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-slate-200">
                <button
                  id="btn-get-started-mobile"
                  onClick={() => {
                    onGetStartedClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-full bg-slate-900 text-white font-semibold text-center text-sm shadow-md hover:bg-black active:scale-95 transition-all"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
```

## File: `src/types.ts`

```ts
export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Reviewer {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

export interface VRFeature {
  id: string;
  title: string;
  description: string;
  badge?: string;
}
```

## Design notes (context, not instructions to change anything)

- The navbar deliberately does **not** overlay the video — it has its own row above the 16:9 frame, and the comment in `App.tsx` says so. This is the structural decision that makes the page read as light and editorial rather than as another dark hero.
- The `FUTURE VISION` wordmark is real text, not an image, and its occlusion by the model's head is done by layering. Keep it as text; replacing it with a PNG loses the responsive scaling.
- The three banner cards are rotated with small opposing `rotate-*` values and overlap by negative margins. The angles are tiny and measured; flattening them to a plain three-column grid is the most likely accidental "improvement" here.
- `InteractiveModals` takes the active modal as a prop from `App.tsx` rather than owning its own state, so all four dialogs share one exit transition. Keep the prop-driven shape.
- The page has no `@theme` block at all — `src/index.css` is effectively just `@import "tailwindcss"` plus base rules, and every colour is an inline arbitrary value or a stock Tailwind shade. Do not invent a palette for it.
- Avatar photographs in the ratings card are hotlinked Unsplash URLs, left as-is on purpose.
