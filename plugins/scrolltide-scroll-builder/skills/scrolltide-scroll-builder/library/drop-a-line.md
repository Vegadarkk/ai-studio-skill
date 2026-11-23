# Drop a Line — Footer Section Rebuild Prompt

> Build this exactly as described. Every measurement, colour and piece of copy below is deliberate — reproduce it rather than improving on it.

## What this section is

A one-viewport contact footer for a small interface studio, **Small Machines**, split into a light column and a dark panel of moving light. **The left column**, on cool white (`#edf1f7`), carries a pill with a pulsing blue dot ("Two commissions open this winter"), the headline **"Give every click / a little *theatre*."** in Satoshi with "theatre" in italic blue IM Fell English, a lede, three overlapping gradient avatars with "4.9 from 80+ product teams", and a dark **magnetic "Commission a button ↗" pill** that leans toward the pointer while a blue fill blooms from wherever the pointer entered and the arrow swaps out through its corner. At its foot: the Small Machines mark and tagline ("Interfaces you can almost touch."), three link columns (Cabinet, Studio, Small print) whose underlines draw in on hover, and "© 2026 Small Machines · Hand-made in Edinburgh". **The right panel** is a large rounded card filled with **a slow, dark mesh gradient** — glowing pools of peach and orange up top, a cream hot spot, violet and lilac below, a near-black navy corner, all drifting on their own paths and blended with no edges — under film grain. On it sit a frosted chip ("( Write to the workshop )", a live "Replying today · usually within a few hours" line that reads the studio's own clock in Edinburgh, the address `hello@smallmachines.studio` and a Copy button), a **frosted postcard** newsletter sign-up ("Workbench notes", a perforated stamp that lifts on hover, a wavy postmark stamped with the studio's live time, an email field whose arrow turns to a spinner and then a tick), and a giant two-line **"Drop / a line."** in frosted white Satoshi, filling whatever height is left, anchored bottom-left, with a violet sheen sweeping across it every few seconds. Move the pointer over the word and **it turns into a design tool's inspect mode**: a soft circle swaps the filled glyphs for crawling dotted outlines, measurement frames with panel coordinates trail the pointer and fade, faint guides cross at the cursor, a chip names the glyph underneath, and the mesh gradient's pale pool and the postcard's sheen follow along. The whole word is a `mailto:` link. Along the panel's foot: frosted chips with X, Instagram, GitHub and Dribbble links and a "Back to the cabinet ↑" button that scrolls to the top of the page. On entry the headline lines slide up out of masks, the supporting pieces rise in on a stagger, the panel opens out from slightly inset as it scrolls into view, and the giant word's letters rise one by one.

## Add this to the project I already have

**Do not scaffold a new application.** Do not run `create-react-app`, `npm create vite`, or any generator. Do not create, overwrite or reformat `package.json`, `vite.config.*`, `tsconfig.*`, `index.html`, `src/main.*`, `src/App.*`, or any global stylesheet I already have beyond the one `@import` line described below. Do not reorganise my folders and do not add a router.

Add **only** the files listed under `## File:` below, at those paths, then render the section where I ask for it. If a file already exists at one of those paths, stop and tell me instead of overwriting it.

This is the last band of a page. It renders in normal document flow, spans the full width of its container, and sits under whatever is already above it:

```tsx
import ContactSection from "./sections/SmallMachines/ContactSection";

// ...at the bottom of your page
<ContactSection />
```

If I have no React project at all, then and only then create a minimal Vite + React + TypeScript one first (`npm create vite@latest . -- --template react-ts`), set up Tailwind v4 as below, and add these files to it unchanged.

## Reproduce this exactly

- **Landscape windows (≥ 820 px wide and wider than 23:20) get exactly one viewport**: a grid of a `clamp(320px, 34vw, 600px)` column beside the panel, every size reading off both `vw` and `vh`. Short windows shed copy in order — the lede and postcard note under 620 px tall, the avatars, tagline and copyright under 540 px. **Portrait and narrow windows stack** the column over a `clamp(480px, 78svh, 860px)` panel at natural height. Keep both layouts and their breakpoints.
- **The giant word is an SVG, not text in a box.** It is measured glyph by glyph once Satoshi has loaded, drawn as one `<text>` per glyph, and fitted to its region with `preserveAspectRatio="xMinYMax meet"` — that is what lets it fill whatever height is left at any window size. Do not replace it with a CSS font size or `vw` text.
- **The mesh gradient is WebGL2 on a small buffer under a CSS blur.** `.machines-mist` overhangs the panel by 48 px on every side so the blur never pulls a dark fringe in from the edge. Keep the overhang and the blur. The `.machines-hello-panel` background is a CSS stand-in that shows until (or unless) WebGL paints over it.
- **Keep the outline dots a constant size on screen.** `ContactSection` tracks the SVG's scale (`unit`) and divides the dot size and gap by it; without that the dotted outlines grow and shrink with the window.
- **Every class, theme token, keyframe and SVG id is namespaced `machines-`.** Keep the names — they exist so this section adds to my Tailwind theme and stylesheet instead of overwriting `ink`, `stage`, `font-display`, `.rise` or `#gw-k` if I already have them. The section's colours are custom properties scoped to `.machines-contact`, so they do not leak onto my page.
- Four families: Satoshi for the headline, brand name, postcard title and giant word; IM Fell English italic for "theatre"; Inter for everything else; JetBrains Mono for the workshop chip, address, postmark and inspect chip.
- Keep the markup structure, class names and copy as written. `content.ts` holds every word; the email and links are placeholders for my own.

## Tech stack (required — do not substitute)

- **React 19** with function components and hooks, in **TypeScript** (`.tsx`)
- **Tailwind CSS v4** (CSS-first config with `@theme`). Not Tailwind v3 — there is no `tailwind.config.js` here and the tokens will not register under v3.
- **Raw WebGL2** for the mesh gradient (`mist.ts`), and a plain 2D canvas for the inspect overlay (`inspector.ts`). No other libraries — no Framer Motion, no icon packages, no WebGL wrapper. Every icon is inline SVG.
- `ContactSection.tsx` and `parts.tsx` start with `'use client'` so the section drops into a Next.js App Router page as well as a Vite app. Leave it there; Vite ignores it.

If my project does not have Tailwind v4 yet, add it for Vite with `npm install tailwindcss @tailwindcss/vite`, register `tailwindcss()` in the `plugins` array of my existing Vite config, and make sure my main stylesheet starts with `@import "tailwindcss";`. For Next.js use `@tailwindcss/postcss` instead, per Tailwind's own instructions.

## Fonts

Add these to your document head if they are not already loaded:

```html
<link rel="preconnect" href="https://api.fontshare.com" />
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap" rel="stylesheet" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" />
```

Satoshi is served by Fontshare, which is a public font CDN meant to be linked like Google Fonts.

## Assets

None. The mesh gradient, grain, stamp, postmark, avatars and every icon are drawn in code.

## Steps to build

1. Confirm Tailwind v4 is set up (see Tech stack).
2. Create the six files below under `src/sections/SmallMachines/`.
3. In the stylesheet that already holds `@import "tailwindcss";`, add this line directly beneath it:

   ```css
   @import "./sections/SmallMachines/small-machines.css";
   ```

   Adjust the relative path if your stylesheet does not live in `src/`. The file must be imported from CSS, not from a component — a `@theme` block only registers utilities when Tailwind processes it together with `@import "tailwindcss"`.
4. Add the font links to your document head.
5. Render `<ContactSection />` at the bottom of your page, then scroll down to it, sweep the pointer across "Drop a line.", hover the CTA, copy the address and submit the postcard with a bad and then a good address.

## Files

## File: `src/sections/SmallMachines/ContactSection.tsx`

```tsx
'use client';

import {useEffect, useRef, useState, type CSSProperties, type RefObject} from 'react';
import {CONTACT, EMAIL} from './content';
import {HelloInspector, type Glyph, type WordLayout} from './inspector';
import {Mist} from './mist';
import {ArrowUpRight, Avatars, BrandMark, IndexLink, MagneticButton, Postcard, WriteToUs, delay, toTop} from './parts';

const FS = 200; // giant word font size in SVG user units; the SVG scales itself into its region
const LEAD = 0.92; // line advance of the giant word, in em

function useInView(ref: RefObject<Element | null>, threshold: number) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      {threshold},
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

/**
 * The page's closing section. Landscape: exactly one viewport, a light column (pitch + studio index)
 * beside a dark panel of drifting light holding a postcard sign-up and a giant two-line "Drop a line." that
 * opens up under the pointer. Portrait / narrow: the two stack. Layout lives in small-machines.css (.machines-contact*).
 */
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, 0.12);
  const h = CONTACT.headline;

  return (
    <section ref={sectionRef} id="contact" aria-label="Contact" data-in={inView || undefined} className="machines-contact relative bg-machines-stage">
      <div className="machines-contact-left">
        <div>
          <p
            className="machines-rise inline-flex items-center gap-2 rounded-full border border-machines-line bg-white/45 py-1.5 pr-3.5 pl-2.5 text-[12px] text-machines-ink/75 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset]"
            style={delay(0)}
          >
            <span className="machines-pulse-dot size-1.5 rounded-full bg-machines-ember" />
            {CONTACT.tag}
          </p>
          <h2 className="machines-c-headline font-machines-display font-medium text-machines-ink">
            <span className="machines-line-mask">
              <span className="machines-reveal-line" style={delay(80)}>
                {h.first}
              </span>
            </span>
            <span className="machines-line-mask">
              <span className="machines-reveal-line" style={delay(170)}>
                {h.lead}
                <em className="machines-accent font-machines-fell font-normal tracking-[-0.01em] text-machines-rubric italic">{h.accent}</em>
                {h.tail}
              </span>
            </span>
          </h2>
          <p className="machines-c-lede machines-c-space machines-rise text-machines-ink/70" style={delay(240)}>
            {CONTACT.lede}
          </p>
          <div className="machines-c-avatars machines-c-space machines-rise flex items-center gap-3" style={delay(320)}>
            <Avatars />
            <p className="text-[13px] text-machines-ink/60">
              <span className="font-semibold text-machines-ink">{CONTACT.rating.score}</span> {CONTACT.rating.note}
            </p>
          </div>
          <div className="machines-c-cta machines-c-space machines-rise" style={delay(400)}>
            <MagneticButton href={CONTACT.cta.href}>{CONTACT.cta.label}</MagneticButton>
          </div>
        </div>

        <div className="machines-c-bottom machines-rise" style={delay(480)}>
          <div className="flex items-center gap-3">
            <BrandMark />
            <div className="min-w-0">
              <p className="font-machines-display text-[17px] leading-tight font-bold tracking-[-0.02em] text-machines-ink">{CONTACT.brand.name}</p>
              <p className="machines-c-brand-tagline text-[12.5px] text-machines-ink/55">{CONTACT.brand.tagline}</p>
            </div>
          </div>
          <div className="machines-c-index grid grid-cols-3 gap-x-[clamp(12px,1.6vw,28px)]">
            {CONTACT.columns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="min-w-0">
                <p className="text-machines-tag font-medium text-machines-mute uppercase">{col.title}</p>
                <ul className="mt-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <IndexLink link={l} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <p className="machines-c-copy text-[11.5px] text-machines-mute">{CONTACT.copyright}</p>
        </div>
      </div>

      <HelloPanel />
    </section>
  );
}

function HelloPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const wordWrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const measureRefs = useRef<(SVGTextElement | null)[]>([]);
  const hideRef = useRef<SVGCircleElement>(null);
  const showRef = useRef<SVGCircleElement>(null);
  const [layout, setLayout] = useState<WordLayout | null>(null);
  const [unit, setUnit] = useState(1); // CSS px per SVG unit, for screen-constant dots
  const layoutRef = useRef(layout);
  layoutRef.current = layout;
  const panelIn = useInView(panelRef, 0.35);

  // Measure the word once the display face is in, so every glyph can be placed (and animated) alone.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        await document.fonts.load(`700 ${FS}px Satoshi`);
        await document.fonts.ready;
      } catch {
        /* fall back to whatever face resolved */
      }
      if (!alive) return;
      const glyphs: Glyph[] = [];
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      CONTACT.word.forEach((line, li) => {
        const el = measureRefs.current[li];
        if (!el) return;
        const y = li * LEAD * FS;
        for (let i = 0; i < line.length; i++) {
          if (line[i] === ' ') continue;
          glyphs.push({ch: line[i], i: glyphs.length, line: li, x: el.getStartPositionOfChar(i).x, x1: el.getEndPositionOfChar(i).x, y});
        }
        const b = el.getBBox();
        x0 = Math.min(x0, b.x);
        y0 = Math.min(y0, b.y);
        x1 = Math.max(x1, b.x + b.width);
        y1 = Math.max(y1, b.y + b.height);
      });
      if (!glyphs.length) return;
      const pad = FS * 0.03;
      setLayout({glyphs, box: {x: x0 - pad, y: y0 - pad, w: x1 - x0 + pad * 2, h: y1 - y0 + pad * 2}, fontSize: FS});
    })();
    return () => {
      alive = false;
    };
  }, []);

  // The SVG fits ("meet") its region; track the resulting scale so outline dots stay a constant size.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !layout) return;
    const ro = new ResizeObserver(() => {
      const s = Math.min(svg.clientWidth / layout.box.w, svg.clientHeight / layout.box.h);
      setUnit(s > 0 ? s : 1);
    });
    ro.observe(svg);
    return () => ro.disconnect();
  }, [layout]);

  useEffect(() => {
    const panel = panelRef.current!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mist = new Mist(mistRef.current!, reduced);
    if (mist.ok) panel.dataset.mist = '';
    const inspector = new HelloInspector({
      panel,
      overlay: overlayRef.current!,
      svg: svgRef.current!,
      hideDot: hideRef.current!,
      showDot: showRef.current!,
      chip: chipRef.current!,
      card: cardRef.current!,
      mist,
      layout: () => layoutRef.current,
    });

    // Scroll-linked entrance: the panel opens out to full size and the word rises into place.
    let raf = 0;
    const apply = () => {
      raf = 0;
      const r = panel.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.85)));
      const e = reduced ? 1 : 1 - (1 - p) ** 3;
      const radius = parseFloat(getComputedStyle(panel).borderTopLeftRadius) || 24;
      panel.style.clipPath = `inset(${((1 - e) * 5).toFixed(2)}% ${((1 - e) * 4).toFixed(2)}% 0% ${((1 - e) * 4).toFixed(2)}% round ${radius}px)`;
      wordWrapRef.current!.style.transform = `translate3d(0, ${((1 - e) * 14).toFixed(2)}%, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      inspector.dispose();
      mist.dispose();
    };
  }, []);

  const box = layout?.box;
  const big = 4000;
  const viewBox = box ? `${box.x} ${box.y} ${box.w} ${box.h}` : `0 ${-FS} ${FS * 2.6} ${FS * 2}`;
  const glyphs = layout?.glyphs ?? [];
  const dot = 1.7 / unit;
  const gap = 5.6 / unit;
  const maskRect = box ? {x: box.x - big, y: box.y - big, width: box.w + big * 2, height: box.h + big * 2} : {x: 0, y: 0, width: 0, height: 0};
  const word = CONTACT.word.join(' ');

  return (
    <div
      ref={panelRef}
      data-in={panelIn || undefined}
      className="machines-hello-panel machines-contact-panel relative isolate flex min-w-0 flex-col overflow-hidden rounded-[clamp(18px,1.8vw,28px)] text-[#eef0ff]"
    >
      {/* Overhangs the panel on every side so its CSS blur never pulls in a dark fringe. */}
      <canvas ref={mistRef} aria-hidden className="machines-mist absolute -z-10 block" />
      <div aria-hidden className="machines-panel-grain pointer-events-none absolute inset-0 -z-10" />
      <canvas ref={overlayRef} aria-hidden className="pointer-events-none absolute inset-0 z-10 block h-full w-full" />

      <div className="machines-panel-top relative z-20">
        <WriteToUs />
        <div className="machines-postcard-slot">
          <Postcard cardRef={cardRef} />
        </div>
      </div>

      {/* Giant word: fits whatever height is left, anchored bottom-left. */}
      <div ref={wordWrapRef} className="machines-word-region relative z-0 will-change-transform">
        <svg
          ref={svgRef}
          viewBox={viewBox}
          preserveAspectRatio="xMinYMax meet"
          data-in={panelIn && layout ? '' : undefined}
          className="machines-gw absolute inset-0 block h-full w-full overflow-visible font-machines-display"
          fontSize={FS}
          fontWeight={700}
        >
          <defs>
            {CONTACT.word.map((_, li) => (
              <linearGradient key={li} id={`machines-gw-fill-${li}`} gradientUnits="userSpaceOnUse" x1="0" y1={li * LEAD * FS - FS * 0.74} x2="0" y2={li * LEAD * FS + FS * 0.24}>
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.97" />
                <stop offset="0.5" stopColor="#fbf6ff" stopOpacity="0.9" />
                <stop offset="1" stopColor="#efe4ff" stopOpacity="0.8" />
              </linearGradient>
            ))}
            <linearGradient id="machines-gw-sheen" gradientUnits="userSpaceOnUse" x1="-260" y1={-FS} x2="0" y2={FS * 0.3}>
              <stop offset="0" stopColor="#8b4cf5" stopOpacity="0" />
              <stop offset="0.5" stopColor="#8b4cf5" stopOpacity="0.26" />
              <stop offset="1" stopColor="#8b4cf5" stopOpacity="0" />
              <animateTransform attributeName="gradientTransform" type="translate" values="-700 0; 1500 0; 1500 0" keyTimes="0; 0.42; 1" dur="7.5s" repeatCount="indefinite" />
            </linearGradient>
            <radialGradient id="machines-gw-k">
              <stop offset="0" stopColor="#000" />
              <stop offset="0.5" stopColor="#000" />
              <stop offset="1" stopColor="#000" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="machines-gw-w">
              <stop offset="0" stopColor="#fff" />
              <stop offset="0.5" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="machines-gw-hide" maskUnits="userSpaceOnUse" {...maskRect}>
              <rect {...maskRect} fill="#fff" />
              <circle ref={hideRef} cx={-9999} cy={-9999} r={0} fill="url(#machines-gw-k)" />
            </mask>
            <mask id="machines-gw-show" maskUnits="userSpaceOnUse" {...maskRect}>
              <circle ref={showRef} cx={-9999} cy={-9999} r={0} fill="url(#machines-gw-w)" />
            </mask>
          </defs>

          {CONTACT.word.map((line, li) => (
            <text
              key={li}
              ref={(el) => {
                measureRefs.current[li] = el;
              }}
              x={0}
              y={li * LEAD * FS}
              letterSpacing="-0.035em"
              visibility="hidden"
            >
              {line}
            </text>
          ))}

          <a href={`mailto:${EMAIL}`} aria-label={`${word} Email ${EMAIL}`} className="machines-gw-link cursor-crosshair">
            <g mask="url(#machines-gw-hide)">
              {glyphs.map((g) => (
                <text key={`f${g.i}`} x={g.x} y={g.y} className="machines-gw-letter" style={delay(g.i * 55)} fill={`url(#machines-gw-fill-${g.line})`}>
                  {g.ch}
                </text>
              ))}
              {glyphs.map((g) => (
                <text key={`s${g.i}`} x={g.x} y={g.y} className="machines-gw-letter" style={delay(g.i * 55)} fill="url(#machines-gw-sheen)">
                  {g.ch}
                </text>
              ))}
            </g>
            <g mask="url(#machines-gw-show)">
              {glyphs.map((g) => (
                <text
                  key={`o${g.i}`}
                  x={g.x}
                  y={g.y}
                  className="machines-gw-letter machines-gw-ants"
                  style={{...delay(g.i * 55), '--dash': `${gap.toFixed(2)}px`} as CSSProperties}
                  fill="rgba(255, 255, 255, 0.06)"
                  stroke="#e8e4ff"
                  strokeOpacity={0.9}
                  strokeWidth={dot}
                  strokeDasharray={`0 ${gap.toFixed(2)}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {g.ch}
                </text>
              ))}
            </g>
          </a>
        </svg>
      </div>

      <div className="machines-panel-bottom relative z-20 text-white/70">
        <ul className="machines-glass-chip flex flex-wrap gap-x-[clamp(12px,1.4vw,22px)] gap-y-1 rounded-full px-4 py-2" aria-label="Elsewhere">
          {CONTACT.socials.map((s) => (
            <li key={s}>
              <a href="#" onClick={(e) => e.preventDefault()} className="machines-social group inline-flex items-center gap-1 transition-colors hover:text-white">
                <span className="machines-link-u">{s}</span>
                <ArrowUpRight className="size-3 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={toTop}
          className="machines-glass-chip group inline-flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          Back to the cabinet
          <svg viewBox="0 0 12 12" fill="none" aria-hidden className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5">
            <path d="M6 10V2.5M2.5 5.5 6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div
        ref={chipRef}
        aria-hidden
        className="machines-inspect-chip pointer-events-none absolute top-0 left-0 z-30 rounded-md border border-white/[0.12] bg-[#0d0b24]/70 px-2 py-1 font-machines-mono text-[10.5px] whitespace-pre text-[#ece9ff] opacity-0 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md"
      />
    </div>
  );
}
```

## File: `src/sections/SmallMachines/content.ts`

```ts
/** Every word in the section. Small Machines is a fictional studio; the address and links are placeholders. */
export const EMAIL = 'hello@smallmachines.studio';

export const CONTACT = {
  tag: 'Two commissions open this winter',
  headline: {first: 'Give every click', lead: 'a little ', accent: 'theatre', tail: '.'},
  lede: 'We design and build tactile interface moments (buttons, toggles, reveals) for product teams who care how things feel.',
  rating: {score: '4.9', note: 'from 80+ product teams'},
  avatars: [
    {initials: 'AK', from: '#a9dcff', to: '#2f6bff'},
    {initials: 'MR', from: '#9fb4ff', to: '#2b2f8f'},
    {initials: 'JS', from: '#b8f0ec', to: '#127a8f'},
  ],
  cta: {label: 'Commission a button', href: `mailto:${EMAIL}?subject=A%20button%20commission`},

  brand: {name: 'Small Machines', tagline: 'Interfaces you can almost touch.', city: 'Edinburgh', timeZone: 'Europe/London'},
  columns: [
    {
      title: 'Cabinet',
      links: [
        {label: 'No. 01 Unfurl', href: '#/unfurl', top: true},
        {label: 'Next piece', href: '#', soon: true},
        {label: 'Requests', href: `mailto:${EMAIL}?subject=Button%20request`},
      ],
    },
    {
      title: 'Studio',
      links: [
        {label: 'About', href: '#'},
        {label: 'Process', href: '#'},
        {label: 'Journal', href: '#'},
        {label: 'Careers', href: '#'},
      ],
    },
    {
      title: 'Small print',
      links: [
        {label: 'Privacy', href: '#'},
        {label: 'Terms', href: '#'},
        {label: 'Licence', href: '#'},
      ],
    },
  ],
  copyright: '© 2026 Small Machines · Hand-made in Edinburgh',

  panel: {kicker: 'Write to the workshop', reply: 'usually within a few hours'},
  postcard: {
    title: 'Workbench notes',
    note: 'Once a month: new machines, and what broke along the way.',
    placeholder: 'you@studio.com',
    done: 'You’re on the list. First notes in December.',
    invalid: 'That address looks a little off.',
  },
  socials: ['X', 'Instagram', 'GitHub', 'Dribbble'],

  /** The giant word, one entry per line. */
  word: ['Drop', 'a line.'],
};

export type ContactLink = {label: string; href: string; soon?: boolean; top?: boolean};
```

## File: `src/sections/SmallMachines/inspector.ts`

```ts
import type {Mist} from './mist';

/** One placed glyph of the giant word, in SVG user units (kerning and tracking included). */
export type Glyph = {ch: string; i: number; line: number; x: number; x1: number; y: number};

export type WordLayout = {
  glyphs: Glyph[];
  box: {x: number; y: number; w: number; h: number};
  fontSize: number;
};

type Frame = {x: number; y: number; w: number; h: number; born: number; label: string};

const LIFE = 1.5; // seconds a measurement frame lingers
const MAX_FRAMES = 9;
// Where successive frames land around the pointer, in frame sizes; cycling reads as a loose trail.
const OFFSETS: [number, number][] = [
  [-1.1, -1.25],
  [0.35, -0.5],
  [-0.75, 0.35],
  [0.55, 0.6],
  [-0.15, -1.05],
  [0.2, 0.15],
];

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * Design-tool "inspect" mode over the contact panel:
 *  - a soft circle follows the pointer inside the giant word's SVG masks, swapping filled glyphs
 *    for crawling dotted outlines,
 *  - measurement frames with panel coordinates trail the pointer and fade,
 *  - faint guides cross at the pointer, a chip names the glyph underneath,
 *  - the postcard's sheen and the mist's warm pool both follow along.
 */
export class HelloInspector {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly frames: Frame[] = [];
  private readonly client = {x: 0, y: 0};
  private readonly local = {x: 0, y: 0};
  private readonly dot = {x: 0, y: 0, r: 0, init: false};
  private lastSpawn = {x: -1e9, y: -1e9};
  private spawnN = 0;
  private inside = false;
  private raf = 0;
  private w = 1;
  private h = 1;
  private dpr = 1;
  private chipText = '';
  private chipShown = false;
  private readonly ro: ResizeObserver;

  constructor(
    private readonly o: {
      panel: HTMLElement;
      overlay: HTMLCanvasElement;
      svg: SVGSVGElement;
      hideDot: SVGCircleElement;
      showDot: SVGCircleElement;
      chip: HTMLElement;
      card: HTMLElement;
      mist: Mist;
      layout: () => WordLayout | null;
    },
  ) {
    this.ctx = o.overlay.getContext('2d')!;
    o.panel.addEventListener('pointerenter', this.onMove);
    o.panel.addEventListener('pointermove', this.onMove);
    o.panel.addEventListener('pointerleave', this.onLeave);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(o.panel);
    this.resize();
  }

  private resize() {
    const r = this.o.panel.getBoundingClientRect();
    this.w = Math.max(1, r.width);
    this.h = Math.max(1, r.height);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.o.overlay.width = Math.round(this.w * this.dpr);
    this.o.overlay.height = Math.round(this.h * this.dpr);
    this.kick();
  }

  private onMove = (e: PointerEvent) => {
    this.client.x = e.clientX;
    this.client.y = e.clientY;
    this.inside = true;
    this.updateLocal();
    const step = Math.max(38, this.w * 0.034);
    const dx = this.local.x - this.lastSpawn.x;
    const dy = this.local.y - this.lastSpawn.y;
    if (dx * dx + dy * dy > step * step) {
      this.spawn();
      this.lastSpawn = {x: this.local.x, y: this.local.y};
    }
    this.kick();
  };

  private onLeave = () => {
    this.inside = false;
    this.lastSpawn = {x: -1e9, y: -1e9};
    this.kick();
  };

  private updateLocal() {
    const r = this.o.panel.getBoundingClientRect();
    this.local.x = this.client.x - r.left;
    this.local.y = this.client.y - r.top;
  }

  private spawn() {
    const size = clamp(this.w * 0.06, 54, 96);
    const [ox, oy] = OFFSETS[this.spawnN % OFFSETS.length];
    const tall = this.spawnN % 3 === 2;
    this.spawnN++;
    const snap = 8;
    const x = Math.round((this.local.x + ox * size) / snap) * snap;
    const y = Math.round((this.local.y + oy * size) / snap) * snap;
    const label = `${Math.round((x / this.w) * 100)}, ${Math.round((y / this.h) * 100)}`;
    this.frames.push({x, y, w: size, h: tall ? size * 1.25 : size, born: performance.now(), label});
    if (this.frames.length > MAX_FRAMES) this.frames.shift();
  }

  private kick() {
    if (!this.raf) this.raf = requestAnimationFrame(this.tick);
  }

  private tick = (now: number) => {
    this.raf = 0;
    const o = this.o;
    this.updateLocal(); // the page can scroll under a resting pointer

    // Pointer in the word's SVG user space.
    const L = o.layout();
    let sx = -1e5;
    let sy = -1e5;
    const ctm = o.svg.getScreenCTM();
    if (ctm) {
      const p = new DOMPoint(this.client.x, this.client.y).matrixTransform(ctm.inverse());
      sx = p.x;
      sy = p.y;
    }
    const d = this.dot;
    if (!d.init || d.r < 0.5) {
      d.x = sx;
      d.y = sy;
      d.init = true;
    }
    d.x += (sx - d.x) * 0.32;
    d.y += (sy - d.y) * 0.32;
    d.r += ((this.inside && L ? L.fontSize * 0.56 : 0) - d.r) * 0.14;
    for (const c of [o.hideDot, o.showDot]) {
      c.setAttribute('cx', d.x.toFixed(1));
      c.setAttribute('cy', d.y.toFixed(1));
      c.setAttribute('r', Math.max(0, d.r).toFixed(1));
    }

    this.updateChip(L, sx, sy);

    if (this.inside) {
      const cr = o.card.getBoundingClientRect();
      o.card.style.setProperty('--mx', `${(this.client.x - cr.left).toFixed(0)}px`);
      o.card.style.setProperty('--my', `${(this.client.y - cr.top).toFixed(0)}px`);
    }
    o.mist.setPointer(this.client.x, this.client.y, this.inside);

    const framesAlive = this.draw(now);
    if (this.inside || d.r > 0.5 || framesAlive) this.kick();
  };

  /** Names the glyph under the pointer, like a type specimen inspector. */
  private updateChip(L: WordLayout | null, sx: number, sy: number) {
    const chip = this.o.chip;
    let text = '';
    if (L && this.inside) {
      const fs = L.fontSize;
      const g = L.glyphs.find((gl) => sx >= gl.x && sx < gl.x1 && sy >= gl.y - fs * 0.8 && sy <= gl.y + fs * 0.26);
      if (g) {
        const code = g.ch.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0');
        text = `${g.ch}  U+${code}  ·  ${Math.round(sx - g.x)}, ${Math.round(g.y - sy)}`;
      }
    }
    if (text && text !== this.chipText) {
      chip.textContent = text;
      this.chipText = text;
    }
    const show = !!text;
    if (show !== this.chipShown) {
      chip.style.opacity = show ? '1' : '0';
      this.chipShown = show;
    }
    if (show) {
      const cw = chip.offsetWidth;
      const x = clamp(this.local.x + 18, 8, this.w - cw - 8);
      const y = clamp(this.local.y + 22, 8, this.h - 34);
      chip.style.transform = `translate3d(${x.toFixed(0)}px, ${y.toFixed(0)}px, 0)`;
    }
  }

  private draw(now: number) {
    const {ctx, w, h} = this;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    while (this.frames.length && (now - this.frames[0].born) / 1000 > LIFE) this.frames.shift();
    const lx = Math.round(this.local.x) + 0.5;
    const ly = Math.round(this.local.y) + 0.5;

    if (this.inside) {
      // Hairline guides through the pointer, with a short ruler either side.
      ctx.setLineDash([]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(232, 228, 255, 0.07)';
      ctx.beginPath();
      ctx.moveTo(0, ly);
      ctx.lineTo(w, ly);
      ctx.moveTo(lx, 0);
      ctx.lineTo(lx, h);
      ctx.stroke();
      for (let k = -8; k <= 8; k++) {
        if (!k) continue;
        const len = k % 4 === 0 ? 5 : 2.5;
        const fade = 1 - Math.abs(k) / 9;
        ctx.strokeStyle = `rgba(232, 228, 255, ${(0.3 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(lx + k * 10, ly - len);
        ctx.lineTo(lx + k * 10, ly + len);
        ctx.moveTo(lx - len, ly + k * 10);
        ctx.lineTo(lx + len, ly + k * 10);
        ctx.stroke();
      }
    }

    ctx.font = '500 10px "JetBrains Mono", ui-monospace, monospace';
    ctx.textBaseline = 'alphabetic';
    for (const f of this.frames) {
      const age = (now - f.born) / 1000;
      const a = Math.min(1, age / 0.14) * (1 - smoothstep(LIFE - 0.5, LIFE, age));
      if (a <= 0.002) continue;
      const g = 1 - (1 - Math.min(1, age / 0.3)) ** 3; // frames unfold from their top-left corner
      const fw = f.w * g;
      const fh = f.h * g;
      const x = f.x + 0.5;
      const y = f.y + 0.5;

      if (this.inside) {
        ctx.setLineDash([2, 4]);
        ctx.strokeStyle = `rgba(232, 228, 255, ${(0.22 * a).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(x + fw / 2, y + fh / 2);
        ctx.lineTo(lx, ly);
        ctx.stroke();
      }
      ctx.setLineDash([1, 3]);
      ctx.strokeStyle = `rgba(232, 228, 255, ${(0.14 * a).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + fw, y + fh);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(232, 228, 255, ${(0.4 * a).toFixed(3)})`;
      ctx.strokeRect(x, y, fw, fh);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(232, 228, 255, ${(0.9 * a).toFixed(3)})`;
      const t = 6;
      ctx.beginPath();
      for (const [cx, cy, sx, sy] of [
        [x, y, 1, 1],
        [x + fw, y, -1, 1],
        [x, y + fh, 1, -1],
        [x + fw, y + fh, -1, -1],
      ]) {
        ctx.moveTo(cx + sx * t, cy);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx, cy + sy * t);
      }
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.fillStyle = `rgba(232, 228, 255, ${(0.78 * a).toFixed(3)})`;
      ctx.fillText(f.label, x + 5, y + 13);
    }
    return this.frames.length > 0;
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    const p = this.o.panel;
    p.removeEventListener('pointerenter', this.onMove);
    p.removeEventListener('pointermove', this.onMove);
    p.removeEventListener('pointerleave', this.onLeave);
  }
}
```

## File: `src/sections/SmallMachines/mist.ts`

```ts
/**
 * Soft moving mesh gradient for the contact panel, kept dark: glowing pools of peach and orange up top, a
 * cream glow, violet and lilac below, a near-black navy corner, all over a deep indigo ground. Each colour is a Gaussian pool drifting on
 * a slow Lissajous path; colours blend by weight, so there are no edges anywhere. One low-frequency warp
 * keeps the shapes organic. The pointer brings its own pool of pale light and gently smears the field.
 * The buffer is small and softened with a CSS blur (`.machines-mist` in small-machines.css); runs only while on screen.
 */

const VERT = /* glsl */ `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uDrag;
uniform float uHover;
uniform float uIntro;
out vec4 outColor;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

vec2 toP(vec2 q, float asp) { return (q - 0.5) * vec2(asp, 1.0); }

// One pool of colour: its centre wanders round c (uv, y up) with amplitude a and rates f.
void pool(vec2 p, float asp, float t, vec2 c, vec2 a, vec2 f, float ph, float r, vec3 col, float gain, inout vec3 acc, inout float wsum) {
  vec2 ctr = toP(c + a * vec2(sin(t * f.x + ph), cos(t * f.y + ph * 1.3)), asp);
  vec2 d = p - ctr;
  float w = exp(-dot(d, d) / (r * r)) * gain;
  acc += col * w;
  wsum += w;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = toP(uv, asp);
  vec2 m = toP(uMouse, asp);
  float t = uTime * 0.16;

  // One slow, low-frequency warp, and a gentle smear behind the moving pointer.
  vec2 warp = vec2(noise(p * 0.9 + vec2(t * 0.3, 0.0)), noise(p * 0.9 + vec2(4.3, -t * 0.25))) - 0.5;
  vec2 dm = p - m;
  p += warp * 0.5;
  p -= uDrag * vec2(asp, 1.0) * exp(-dot(dm, dm) * 3.0) * 0.6;

  // Deep indigo ground, then the pools.
  vec3 acc = vec3(0.045, 0.035, 0.10) * 0.9;
  float wsum = 0.9;
  pool(p, asp, t, vec2(0.30, 0.80), vec2(0.10, 0.06), vec2(0.50, 0.70), 0.0, 0.40, vec3(0.78, 0.52, 0.38), 1.0, acc, wsum); // peach
  pool(p, asp, t, vec2(0.88, 0.82), vec2(0.06, 0.08), vec2(0.60, 0.40), 2.1, 0.30, vec3(0.85, 0.36, 0.16), 1.0, acc, wsum); // orange
  pool(p, asp, t, vec2(0.82, 0.22), vec2(0.08, 0.07), vec2(0.45, 0.65), 4.0, 0.32, vec3(0.42, 0.18, 0.88), 1.3, acc, wsum); // violet
  pool(p, asp, t, vec2(0.55, 0.18), vec2(0.12, 0.06), vec2(0.35, 0.50), 1.2, 0.38, vec3(0.45, 0.30, 0.58), 0.6, acc, wsum); // lilac
  pool(p, asp, t, vec2(0.08, 0.10), vec2(0.06, 0.06), vec2(0.40, 0.30), 3.3, 0.40, vec3(0.02, 0.02, 0.08), 2.5, acc, wsum); // navy
  pool(p, asp, t, vec2(0.04, 0.60), vec2(0.03, 0.08), vec2(0.30, 0.40), 5.0, 0.30, vec3(0.30, 0.22, 0.32), 0.5, acc, wsum); // mauve
  pool(p, asp, t, vec2(0.50, 0.50), vec2(0.08, 0.06), vec2(0.55, 0.45), 2.7, 0.33, vec3(0.55, 0.30, 0.42), 0.45, acc, wsum); // rose
  vec3 col = acc / wsum;

  // A cream glow, stretched sideways, drifting a little.
  vec2 hs = toP(vec2(0.72, 0.47) + 0.06 * vec2(sin(t * 0.8), cos(t * 0.6)), asp);
  vec2 dh = (p - hs) * vec2(0.75, 1.5);
  col = mix(col, vec3(0.95, 0.82, 0.72), exp(-dot(dh, dh) / 0.018) * 0.45);
  // The pointer's own pool of pale light.
  vec2 dp = p - m;
  col = mix(col, vec3(0.95, 0.86, 0.82), exp(-dot(dp, dp) / 0.04) * uHover * 0.35);
  // Edges settle further into the dark.
  col *= mix(0.62, 1.0, 1.0 - smoothstep(0.3, 1.05, length((uv - vec2(0.55, 0.5)) * vec2(1.0, 1.2))));

  // Lights come up out of the dark on first view.
  col = mix(vec3(0.02, 0.015, 0.05), col, uIntro);
  // Dither so the long gradients never band (the crisp grain is a CSS layer above the blur).
  col += (hash(gl_FragCoord.xy + floor(uTime * 24.0) * 7.0) - 0.5) * (3.0 / 255.0);
  outColor = vec4(col, 1.0);
}
`;

export class Mist {
  private readonly gl: WebGL2RenderingContext | null;
  private program: WebGLProgram | null = null;
  private uniforms: Record<string, WebGLUniformLocation | null> = {};
  private raf = 0;
  private visible = false;
  private started = -1;
  private last = 0;
  private time = Math.random() * 60;
  private readonly mouse = {x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, hover: 0, thover: 0, tracking: false};
  private readonly drag = {x: 0, y: 0, tx: 0, ty: 0};
  private readonly io: IntersectionObserver;
  private readonly ro: ResizeObserver;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly reduced: boolean,
  ) {
    this.gl = canvas.getContext('webgl2', {antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'low-power'});
    if (this.gl) this.setup(this.gl);
    this.io = new IntersectionObserver(([e]) => {
      this.visible = e.isIntersecting;
      if (this.visible && !this.raf) this.loop();
    });
    this.io.observe(canvas);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);
  }

  /** Whether the mist is actually drawing (otherwise the panel's CSS gradient shows). */
  get ok() {
    return !!this.program;
  }

  /** Pointer in client px. The canvas overhangs the panel (for the blur), so map through its own rect. */
  setPointer(clientX: number, clientY: number, inside: boolean) {
    const r = this.canvas.getBoundingClientRect();
    const x = r.width ? (clientX - r.left) / r.width : 0.5;
    const y = r.height ? 1 - (clientY - r.top) / r.height : 0.5;
    const m = this.mouse;
    if (inside && m.tracking) {
      this.drag.tx += (x - m.tx) * 1.6;
      this.drag.ty += (y - m.ty) * 1.6;
      const len = Math.hypot(this.drag.tx, this.drag.ty);
      if (len > 0.25) {
        this.drag.tx *= 0.25 / len;
        this.drag.ty *= 0.25 / len;
      }
    }
    m.tracking = inside;
    m.tx = x;
    m.ty = y;
    m.thover = inside ? 1 : 0;
    if (this.visible && !this.raf) this.loop();
  }

  private setup(gl: WebGL2RenderingContext) {
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('[mist]', gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, 'aPos');
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('[mist]', gl.getProgramInfoLog(prog));
      return;
    }
    this.program = prog;
    for (const n of ['uRes', 'uTime', 'uMouse', 'uDrag', 'uHover', 'uIntro']) this.uniforms[n] = gl.getUniformLocation(prog, n);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  }

  private resize() {
    // It is all soft light under a blur: a small buffer is plenty.
    const scale = Math.min(window.devicePixelRatio || 1, 2) * 0.4;
    const w = Math.max(1, Math.round(this.canvas.clientWidth * scale));
    const h = Math.max(1, Math.round(this.canvas.clientHeight * scale));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    if (this.visible && !this.raf) this.loop();
  }

  private loop = () => {
    this.raf = 0;
    if (!this.visible || !this.program) return;
    this.draw();
    const settling = this.mouse.hover > 0.001 || Math.abs(this.drag.x) + Math.abs(this.drag.y) > 1e-4;
    if (!this.reduced || settling || this.intro() < 1) this.raf = requestAnimationFrame(this.loop);
  };

  private intro() {
    if (this.started < 0) return 0;
    const k = Math.min(1, (performance.now() - this.started) / 1800);
    return 1 - (1 - k) ** 3;
  }

  private draw() {
    const gl = this.gl;
    if (!gl || !this.program) return;
    const now = performance.now();
    if (this.started < 0) this.started = now;
    const dt = this.last ? Math.min(0.05, (now - this.last) / 1000) : 0.016;
    this.last = now;
    if (!this.reduced) this.time += dt;
    const m = this.mouse;
    const ease = 1 - Math.exp(-dt * 4);
    m.x += (m.tx - m.x) * ease;
    m.y += (m.ty - m.y) * ease;
    m.hover += (m.thover - m.hover) * (1 - Math.exp(-dt * 2.5));
    const g = this.drag;
    const follow = 1 - Math.exp(-dt * 6);
    g.x += (g.tx - g.x) * follow;
    g.y += (g.ty - g.y) * follow;
    const decay = Math.exp(-dt * 1.8);
    g.tx *= decay;
    g.ty *= decay;

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.useProgram(this.program);
    const u = this.uniforms;
    gl.uniform2f(u.uRes, this.canvas.width, this.canvas.height);
    gl.uniform1f(u.uTime, this.time);
    gl.uniform2f(u.uMouse, m.x, m.y);
    gl.uniform2f(u.uDrag, g.x, g.y);
    gl.uniform1f(u.uHover, m.hover);
    gl.uniform1f(u.uIntro, this.intro());
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.io.disconnect();
    this.ro.disconnect();
    this.gl?.getExtension('WEBGL_lose_context')?.loseContext();
  }
}
```

## File: `src/sections/SmallMachines/parts.tsx`

```tsx
'use client';

import {useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent, type ReactNode, type Ref} from 'react';
import {CONTACT, EMAIL, type ContactLink} from './content';

/** Stagger delay for `.machines-rise` / `.machines-rise-panel` / `.machines-reveal-line` / `.machines-gw-letter` transitions. */
export const delay = (ms: number) => ({'--d': `${ms}ms`}) as CSSProperties;

export const toTop = () => window.scrollTo({top: 0, behavior: 'smooth'});

export function ArrowUpRight({className = ''}: {className?: string}) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The studio's clock, ticking in its own time zone. */
function useStudioTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 10_000);
    return () => window.clearInterval(id);
  }, []);
  return useMemo(() => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: CONTACT.brand.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
      year: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(now);
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
    const hh = get('hour');
    return {hh, mm: get('minute'), day: get('day'), month: get('month').toUpperCase(), year: get('year'), open: +hh >= 8 && +hh < 18};
  }, [now]);
}

/**
 * Dark pill that leans toward the pointer; an ember fill grows from wherever the pointer entered
 * and drains back out where it leaves, while the arrow swaps out through its corner.
 */
export function MagneticButton({href, children}: {href: string; children: ReactNode}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  const place = (e: PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    fill.current!.style.left = `${e.clientX - r.left}px`;
    fill.current!.style.top = `${e.clientY - r.top}px`;
  };
  const onMove = (e: PointerEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--tx', `${((e.clientX - (r.left + r.width / 2)) * 0.2).toFixed(1)}px`);
    el.style.setProperty('--ty', `${((e.clientY - (r.top + r.height / 2)) * 0.32).toFixed(1)}px`);
  };

  return (
    <a
      ref={ref}
      href={href}
      onPointerEnter={(e) => {
        place(e);
        ref.current!.dataset.hover = '';
      }}
      onPointerMove={onMove}
      onPointerLeave={(e) => {
        place(e);
        delete ref.current!.dataset.hover;
        ref.current!.style.setProperty('--tx', '0px');
        ref.current!.style.setProperty('--ty', '0px');
      }}
      className="machines-mag group relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#0b1326] pr-[18px] pl-6 text-[14.5px] font-medium tracking-[-0.01em] whitespace-nowrap text-[#eef4ff] shadow-[0_18px_34px_-18px_rgba(10,22,56,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] outline-none focus-visible:ring-2 focus-visible:ring-machines-ember/60 focus-visible:ring-offset-4 focus-visible:ring-offset-machines-stage"
    >
      <span ref={fill} aria-hidden className="machines-mag-fill pointer-events-none absolute -z-10 aspect-square w-[280%] rounded-full bg-machines-ember" />
      <span className="machines-mag-label">{children}</span>
      <span aria-hidden className="relative grid size-[18px] place-items-center overflow-hidden">
        <ArrowUpRight className="machines-arrow-a absolute size-[15px]" />
        <ArrowUpRight className="machines-arrow-b absolute size-[15px]" />
      </span>
    </a>
  );
}

export function Avatars() {
  return (
    <div className="machines-avatars flex">
      {CONTACT.avatars.map((a, i) => (
        <span
          key={a.initials}
          className="machines-avatar grid size-[30px] place-items-center rounded-full text-[9.5px] font-semibold tracking-[0.04em] text-white/95 ring-2 ring-machines-stage"
          style={{background: `radial-gradient(120% 120% at 30% 20%, ${a.from}, ${a.to})`, zIndex: 3 - i}}
        >
          {a.initials}
        </span>
      ))}
    </div>
  );
}

/** The studio mark: a tiny version of the cabinet's first machine, a pill between two knobs. */
export function BrandMark() {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[linear-gradient(145deg,#8fd0ff,#2f6bff_55%,#2a2f9e)] shadow-[0_6px_16px_-6px_rgba(47,107,255,0.8),inset_0_1px_0_rgba(255,255,255,0.35)]">
      <svg viewBox="0 0 20 20" aria-hidden className="size-5">
        <rect x="4.5" y="7" width="11" height="6" rx="2.2" fill="#f2f7ff" />
        <circle cx="2.6" cy="10" r="1.6" fill="#f2f7ff" opacity="0.9" />
        <circle cx="17.4" cy="10" r="1.6" fill="#f2f7ff" opacity="0.9" />
        <path d="M7 10h6" stroke="#2f6bff" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Footer index link on the light column. */
export function IndexLink({link}: {link: ContactLink}) {
  return (
    <a
      href={link.href}
      onClick={(e) => {
        if (link.top) toTop();
        else if (link.href === '#') e.preventDefault();
      }}
      className="machines-index-link group inline-flex items-center gap-2 text-machines-ink/80 transition-colors hover:text-machines-ink"
    >
      <span className="machines-link-u">{link.label}</span>
      {link.soon && <span className="rounded-full border border-machines-line px-1.5 py-px text-[9px] tracking-[0.1em] text-machines-mute uppercase">soon</span>}
    </a>
  );
}

// ---------------------------------------------------------------- the panel

/** Top-left of the panel: who answers, how fast, and the address with a one-tap copy. */
export function WriteToUs() {
  const t = useStudioTime();
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };
  return (
    <div className="machines-rise-panel machines-glass-chip flex min-w-0 flex-col gap-2 rounded-[16px] px-4 py-3" style={delay(60)}>
      <p className="font-machines-mono text-[10.5px] tracking-[0.14em] text-white/50 uppercase">( {CONTACT.panel.kicker} )</p>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-white/80">
        <span className={`machines-live-dot size-1.5 rounded-full ${t.open ? 'bg-[#6fe3a6]' : 'bg-[#f3b36a]'}`} />
        {t.open ? 'Replying today' : 'Replying tomorrow'}
        {t.open && <span className="text-white/45">· {CONTACT.panel.reply}</span>}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <a href={`mailto:${EMAIL}`} className="machines-email-link font-machines-mono text-[clamp(12px,0.95vw,14px)] text-white/90 transition-colors hover:text-white">
          <span className="machines-link-u">{EMAIL}</span>
        </a>
        <button
          type="button"
          onClick={copy}
          data-copied={copied || undefined}
          className="machines-copy-btn inline-flex h-6 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-2.5 text-[11px] text-white/75 transition-colors hover:border-white/30 hover:text-white"
        >
          <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
          <svg viewBox="0 0 12 12" fill="none" aria-hidden className="size-3">
            {copied ? (
              <path d="M2.5 6.5 5 9l4.5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <>
                <rect x="3.5" y="3.5" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.1" />
                <path d="M2.5 7.5v-4a1 1 0 0 1 1-1h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}

const wave = (x0: number, x1: number, y: number) => {
  let d = `M ${x0} ${y}`;
  for (let x = x0; x < x1; x += 8) d += ' q 2 -2.4 4 0 t 4 0';
  return d;
};

/** A cancellation mark: wavy bars and a dated ring stamped with the studio's live time. */
function Postmark({className}: {className?: string}) {
  const t = useStudioTime();
  return (
    <svg viewBox="0 0 132 80" aria-hidden className={className}>
      <defs>
        <path id="machines-pm-ring" d="M 72.7 40 a 25.3 25.3 0 1 1 50.6 0 a 25.3 25.3 0 1 1 -50.6 0" />
      </defs>
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        {[28, 36, 44, 52].map((y) => (
          <path key={y} d={wave(30, 66, y)} strokeWidth="1.1" />
        ))}
        <circle cx="98" cy="40" r="29" strokeWidth="1.2" />
        <circle cx="98" cy="40" r="21" strokeWidth="0.7" />
      </g>
      <text fill="currentColor" fontSize="5.2" letterSpacing="1.15" className="font-machines-mono">
        <textPath href="#machines-pm-ring">{`${CONTACT.brand.city.toUpperCase()} · SMALL MACHINES · `}</textPath>
      </text>
      <text x="98" y="42" textAnchor="middle" fill="currentColor" fontSize="11.5" fontWeight="500" className="font-machines-mono">
        {t.hh}:{t.mm}
      </text>
      <text x="98" y="50.5" textAnchor="middle" fill="currentColor" fontSize="5.4" letterSpacing="0.7" className="font-machines-mono">
        {t.day} {t.month} {t.year}
      </text>
    </svg>
  );
}

/** A perforated stamp carrying the studio mark. */
function Stamp({className}: {className?: string}) {
  const holes: [number, number][] = [];
  for (let x = 2.8; x < 46; x += 5.6) holes.push([x, 0], [x, 56]);
  for (let y = 2.8; y < 56; y += 5.6) holes.push([0, y], [46, y]);
  return (
    <svg viewBox="0 0 46 56" aria-hidden className={className}>
      <defs>
        <mask id="machines-stamp-perf">
          <rect width="46" height="56" fill="#fff" />
          {holes.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.9" fill="#000" />
          ))}
        </mask>
        <linearGradient id="machines-stamp-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fd0ff" />
          <stop offset="0.55" stopColor="#2f6bff" />
          <stop offset="1" stopColor="#24308f" />
        </linearGradient>
      </defs>
      <g mask="url(#machines-stamp-perf)">
        <rect width="46" height="56" fill="#f4f7ff" />
        <rect x="4.5" y="4.5" width="37" height="47" fill="url(#machines-stamp-g)" />
        <rect x="14" y="20" width="18" height="9" rx="3" fill="#f2f7ff" />
        <circle cx="10.2" cy="24.5" r="2.5" fill="#f2f7ff" opacity="0.92" />
        <circle cx="35.8" cy="24.5" r="2.5" fill="#f2f7ff" opacity="0.92" />
        <path d="M18.5 24.5h9" stroke="#2f6bff" strokeWidth="1.4" strokeLinecap="round" />
        <text x="23" y="44.5" textAnchor="middle" fontSize="6.2" fill="#f2f7ff" letterSpacing="0.6" className="font-machines-mono">
          No.02
        </text>
      </g>
    </svg>
  );
}

type NlState = 'idle' | 'busy' | 'done' | 'error';

/** Newsletter sign-up as a frosted postcard: stamp, live postmark, and an address line that posts itself. */
export function Postcard({cardRef}: {cardRef: Ref<HTMLDivElement>}) {
  const pc = CONTACT.postcard;
  const [state, setState] = useState<NlState>('idle');
  const [value, setValue] = useState('');
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (state === 'busy' || state === 'done') return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
      setState('idle');
      requestAnimationFrame(() => setState('error'));
      return;
    }
    setState('busy');
    timer.current = window.setTimeout(() => setState('done'), 1100);
  };

  return (
    <div
      ref={cardRef}
      data-state={state}
      className="machines-postcard machines-glass-card machines-rise-panel relative rounded-[clamp(14px,1.3vw,20px)] p-[clamp(14px,1.3vw,20px)]"
      style={delay(160)}
    >
      <div className="machines-stamp-wrap pointer-events-none absolute top-[clamp(12px,1.1vw,16px)] right-[clamp(12px,1.1vw,16px)]">
        <Stamp className="machines-stamp relative z-[1] block w-[clamp(36px,3vw,44px)]" />
        <Postmark className="machines-postmark absolute top-[42%] right-[52%] z-[2] w-[clamp(92px,7.4vw,116px)] text-white/45" />
      </div>
      <div className="pr-[clamp(58px,5vw,76px)]">
        <p className="font-machines-display text-[clamp(15px,1.15vw,18px)] font-bold tracking-[-0.02em] text-white">{pc.title}</p>
        <p className="machines-postcard-note mt-1.5 text-[clamp(11.5px,0.85vw,13px)] leading-snug text-white/60">{pc.note}</p>
      </div>

      <form
        onSubmit={submit}
        noValidate
        data-state={state}
        className="machines-nl relative mt-[clamp(12px,1.8vh,18px)] flex h-11 items-center rounded-full border border-white/[0.14] bg-white/[0.07] pr-1 pl-4 transition-[border-color,background-color,box-shadow] duration-300 focus-within:border-[#9cc0ff]/50 focus-within:bg-white/[0.11] focus-within:shadow-[0_0_0_4px_rgba(47,107,255,0.22)]"
      >
        <label htmlFor="machines-nl-email" className="sr-only">
          Email address
        </label>
        <input
          id="machines-nl-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={pc.placeholder}
          value={value}
          disabled={state === 'done'}
          aria-invalid={state === 'error'}
          onChange={(e) => {
            setValue(e.target.value);
            if (state === 'error') setState('idle');
          }}
          className="machines-nl-input h-full min-w-0 flex-1 bg-transparent text-[13.5px] text-white placeholder:text-white/40 focus:outline-none"
        />
        <span aria-hidden className="machines-nl-done pointer-events-none absolute inset-y-0 right-12 left-4 flex items-center truncate text-[12.5px] text-white/85">
          {pc.done}
        </span>
        <button
          type="submit"
          aria-label="Subscribe"
          className="machines-nl-btn relative grid size-9 shrink-0 place-items-center rounded-full bg-machines-ember text-white shadow-[0_8px_18px_-8px_rgba(47,107,255,0.8)] transition-transform duration-300 hover:scale-[1.06] active:scale-95"
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden className="machines-nl-ico machines-nl-arrow absolute size-4">
            <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span aria-hidden className="machines-nl-ico machines-nl-spin absolute size-4 rounded-full border-[1.7px] border-white/30 border-t-white" />
          <svg viewBox="0 0 16 16" fill="none" aria-hidden className="machines-nl-ico machines-nl-check absolute size-4">
            <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
      <p role="status" className="mt-1.5 h-4 text-[11px] text-[#ff9db0]">
        {state === 'error' ? pc.invalid : ''}
        <span className="sr-only">{state === 'done' ? pc.done : ''}</span>
      </p>
    </div>
  );
}
```

## File: `src/sections/SmallMachines/small-machines.css`

```css
/* Small Machines — contact footer. Every class, token and keyframe is prefixed machines- so this file
   adds to the host's Tailwind theme and stylesheet without overwriting anything already there. */

@theme inline {
  --color-machines-stage: var(--machines-stage);
  --color-machines-ink: var(--machines-ink);
  --color-machines-mute: var(--machines-mute);
  --color-machines-line: var(--machines-line);
  --color-machines-rubric: var(--machines-rubric);
  --color-machines-ember: var(--machines-ember);
}

@theme {
  --font-machines-display: 'Satoshi', 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-machines-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-machines-fell: 'IM Fell English', Georgia, serif;
  --font-machines-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  --text-machines-tag: 10.5px;
  --text-machines-tag--line-height: 1.2;
  --text-machines-tag--letter-spacing: 0.14em;
}

/* The section's own colours. They are custom properties scoped to the section, mapped to the
   machines-* utilities by the @theme inline block above, so nothing here touches the host page. */
.machines-contact {
  --machines-stage: #edf1f7;
  --machines-ink: #0e1830;
  --machines-mute: #0e183085;
  --machines-line: #0e183022;
  --machines-rubric: #2756d6;
  --machines-ember: #2f6bff;
  color-scheme: light;
  background: var(--machines-stage);
  color: var(--machines-ink);
  font-family: var(--font-machines-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Frosted dark glass for the small UI over the panel. */
.machines-glass-chip {
  background: linear-gradient(180deg, rgb(255 255 255 / 0.09), rgb(255 255 255 / 0.04));
  -webkit-backdrop-filter: blur(16px) saturate(1.3);
  backdrop-filter: blur(16px) saturate(1.3);
  border: 1px solid rgb(255 255 255 / 0.1);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.08),
    0 16px 36px -24px rgb(0 0 0 / 0.6);
}

/* Entrance: lines slide up out of a mask, supporting pieces rise in. --d staggers them. */
.machines-line-mask {
  display: block;
  overflow: hidden;
  padding: 0 0.12em 0.1em 0;
  margin-bottom: -0.1em;
}
.machines-reveal-line {
  display: block;
  transform: translate3d(0, 108%, 0);
  transition: transform 1.15s cubic-bezier(0.19, 1, 0.22, 1);
  transition-delay: var(--d, 0ms);
}
[data-in] .machines-reveal-line {
  transform: none;
}
.machines-rise,
.machines-rise-panel {
  opacity: 0;
  transform: translate3d(0, 18px, 0);
  transition:
    opacity 0.9s ease,
    transform 1.1s cubic-bezier(0.19, 1, 0.22, 1);
  transition-delay: var(--d, 0ms);
}
[data-in] .machines-rise,
.machines-hello-panel[data-in] .machines-rise-panel {
  opacity: 1;
  transform: none;
}
.machines-accent {
  font-size: 1.07em;
  padding-right: 0.03em;
}

.machines-pulse-dot {
  animation: machines-pulse-dot 2.2s cubic-bezier(0.2, 0.7, 0.3, 1) infinite;
}
@keyframes machines-pulse-dot {
  0% {
    box-shadow: 0 0 0 0 rgb(47 107 255 / 0.5);
  }
  70%,
  100% {
    box-shadow: 0 0 0 7px rgb(47 107 255 / 0);
  }
}
.machines-live-dot {
  animation: machines-live-dot 2.4s ease-in-out infinite;
}
@keyframes machines-live-dot {
  50% {
    opacity: 0.4;
  }
}
.machines-colon-blink {
  animation: machines-colon-blink 2s steps(1, end) infinite;
}
@keyframes machines-colon-blink {
  50% {
    opacity: 0.2;
  }
}

/* Avatars fan out a little on hover. */
.machines-avatar + .machines-avatar {
  margin-left: -9px;
  transition: margin 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.machines-avatars:hover .machines-avatar + .machines-avatar {
  margin-left: -3px;
}

/* Magnetic CTA: leans toward the pointer, ember fill grows from the entry point, arrow swaps through its corner. */
.machines-mag {
  height: 52px;
  transform: translate3d(var(--tx, 0px), var(--ty, 0px), 0);
  transition:
    transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.4s ease;
}
.machines-mag[data-hover] {
  box-shadow:
    0 22px 40px -18px rgb(47 107 255 / 0.55),
    inset 0 1px 0 rgb(255 255 255 / 0.15);
}
.machines-mag-fill {
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.machines-mag[data-hover] .machines-mag-fill {
  transform: translate(-50%, -50%) scale(1);
}
.machines-mag-label {
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.machines-mag[data-hover] .machines-mag-label {
  transform: translateX(-2px);
}
.machines-arrow-a,
.machines-arrow-b {
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.machines-arrow-b {
  transform: translate(-130%, 130%);
}
.machines-mag[data-hover] .machines-arrow-a {
  transform: translate(130%, -130%);
}
.machines-mag[data-hover] .machines-arrow-b {
  transform: none;
}

/* The dark panel: a CSS stand-in for the silk until (or unless) WebGL paints over it. */
.machines-hello-panel {
  background:
    radial-gradient(45% 50% at 30% 20%, #6e4632 0%, transparent 70%),
    radial-gradient(35% 45% at 88% 18%, #7a3416 0%, transparent 70%),
    radial-gradient(35% 45% at 82% 80%, #4a1f9a 0%, transparent 70%),
    radial-gradient(40% 50% at 6% 92%, #05040f 0%, transparent 72%),
    #120e24;
}
.machines-mist {
  top: -48px;
  left: -48px;
  width: calc(100% + 96px);
  height: calc(100% + 96px);
  filter: blur(14px) saturate(1.08);
}
.machines-hello-panel[data-mist] .machines-mist {
  background: #0b0918;
}
.machines-panel-grain {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  opacity: 0.16;
  mix-blend-mode: overlay;
}

/* Frosted card with a sheen and a rim light that follow the pointer (--mx/--my set by the inspector). */
.machines-glass-card {
  background: linear-gradient(180deg, rgb(255 255 255 / 0.09), rgb(255 255 255 / 0.04));
  -webkit-backdrop-filter: blur(22px) saturate(1.4);
  backdrop-filter: blur(22px) saturate(1.4);
  border: 1px solid rgb(255 255 255 / 0.1);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.09),
    0 30px 60px -36px rgb(0 0 0 / 0.65);
}
.machines-glass-card::before,
.machines-glass-card::after {
  content: '';
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
}
.machines-glass-card::before {
  inset: 0;
  background: radial-gradient(360px circle at var(--mx, -500px) var(--my, -500px), rgb(220 215 255 / 0.1), transparent 65%);
}
.machines-glass-card::after {
  inset: -1px;
  padding: 1px;
  background: radial-gradient(240px circle at var(--mx, -500px) var(--my, -500px), rgb(225 220 255 / 0.5), transparent 70%);
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.machines-link-u {
  background: linear-gradient(currentColor, currentColor) 0 100% / 0% 1px no-repeat;
  padding-bottom: 1px;
  transition: background-size 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
.machines-footer-link:hover .machines-link-u {
  background-size: 100% 1px;
}

/* Newsletter: arrow, then spinner, then check; the field gives way to a thank-you. */
.machines-nl-ico {
  transition:
    opacity 0.3s ease,
    transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.machines-nl-spin,
.machines-nl-check {
  opacity: 0;
  transform: scale(0.6);
}
.machines-nl[data-state='busy'] .machines-nl-arrow,
.machines-nl[data-state='done'] .machines-nl-arrow {
  opacity: 0;
  transform: translateX(8px);
}
.machines-nl[data-state='busy'] .machines-nl-spin {
  opacity: 1;
  transform: none;
  animation: machines-nl-spin 0.8s linear infinite;
}
.machines-nl[data-state='done'] .machines-nl-check {
  opacity: 1;
  transform: none;
}
.machines-nl-input {
  transition: opacity 0.25s ease;
}
.machines-nl[data-state='done'] .machines-nl-input {
  opacity: 0;
}
.machines-nl-done {
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.4s ease 0.1s,
    transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s;
}
.machines-nl[data-state='done'] .machines-nl-done {
  opacity: 1;
  transform: none;
}
.machines-nl[data-state='error'] {
  border-color: rgb(255 140 110 / 0.55);
  animation: machines-nl-shake 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
@keyframes machines-nl-shake {
  20%,
  60% {
    transform: translateX(-5px);
  }
  40%,
  80% {
    transform: translateX(5px);
  }
}
@keyframes machines-nl-spin {
  to {
    transform: rotate(360deg);
  }
}

/* Giant word: glyphs rise one by one; the inspected outline crawls like marching ants. */
.machines-gw-letter {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  transform: translate3d(0, 38%, 0);
  opacity: 0;
  transition:
    transform 1.25s cubic-bezier(0.19, 1, 0.22, 1),
    opacity 0.9s ease;
  transition-delay: var(--d, 0ms);
}
.machines-gw[data-in] .machines-gw-letter {
  transform: none;
  opacity: 1;
}
.machines-gw-ants {
  animation: machines-gw-ants 1.2s linear infinite;
}
@keyframes machines-gw-ants {
  to {
    stroke-dashoffset: calc(var(--dash) * -1);
  }
}
.machines-inspect-chip {
  transition: opacity 0.25s ease;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .machines-reveal-line,
  .machines-rise,
  .machines-rise-panel,
  .machines-gw-letter {
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
  .machines-gw-ants,
  .machines-pulse-dot,
  .machines-live-dot,
  .machines-colon-blink {
    animation: none;
  }
}

/* Postcard: the stamp lifts on hover; subscribing re-stamps the postmark. */
.machines-postcard .machines-stamp {
  filter: drop-shadow(0 4px 6px rgb(0 0 0 / 0.35));
  transform: rotate(4deg);
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.machines-postcard:hover .machines-stamp {
  transform: rotate(-2deg) translateY(-2px) scale(1.04);
}
.machines-postcard .machines-postmark {
  transform: rotate(-12deg);
}
.machines-postcard[data-state='done'] .machines-postmark {
  animation: machines-postmark-thump 0.55s cubic-bezier(0.2, 0.9, 0.3, 1.2);
  color: rgb(232 228 255 / 0.8);
}
@keyframes machines-postmark-thump {
  0% {
    transform: rotate(-12deg) scale(1.5);
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: rotate(-12deg) scale(1);
  }
}

/* ------------------------------------------------------------------ layout
   Default (portrait / narrow windows): the light column stacks over the panel at natural height.
   Landscape from 820px: exactly one viewport. Every size reads off both vw and vh so the column fits
   any window, and the giant word scales itself (SVG "meet") into whatever the panel has left. */
.machines-contact {
  --g: clamp(8px, 1vw, 18px);
  display: flex;
  flex-direction: column;
  gap: var(--g);
  padding: var(--g);
  min-height: 100svh;
}
.machines-contact-left {
  display: flex;
  flex-direction: column;
  gap: clamp(36px, 7vh, 64px);
  min-width: 0;
  padding: clamp(44px, 9vh, 96px) clamp(12px, 4vw, 40px) clamp(4px, 1.5vh, 16px);
}
.machines-c-headline {
  margin-top: clamp(16px, 3vh, 30px);
  font-size: clamp(34px, 7.4vw, 64px);
  line-height: 0.98;
  letter-spacing: -0.045em;
}
.machines-c-lede {
  max-width: 40ch;
  font-size: clamp(14.5px, 3.6vw, 16.5px);
  line-height: 1.5;
  letter-spacing: -0.006em;
}
.machines-c-space {
  margin-top: clamp(14px, 2.4vh, 26px);
}
.machines-c-index {
  margin-top: clamp(16px, 2.6vh, 28px);
}
.machines-c-index .machines-index-link {
  font-size: clamp(13px, 3.4vw, 14.5px);
}
.machines-c-index li + li {
  margin-top: 8px;
}
.machines-c-copy {
  margin-top: clamp(16px, 2.6vh, 28px);
}
.machines-contact-panel {
  height: clamp(480px, 78svh, 860px);
}
.machines-panel-top {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px 24px;
  padding: clamp(14px, 1.6vw, 26px);
}
.machines-postcard-slot {
  width: min(100%, 400px);
}
.machines-word-region {
  flex: 1 1 0%;
  min-height: 120px;
  margin: clamp(4px, 1vh, 12px) clamp(14px, 1.6vw, 26px) 0;
}
.machines-panel-bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 20px;
  padding: clamp(10px, 1.6vh, 18px) clamp(14px, 1.6vw, 26px);
  font-size: 12px;
}

@media (min-width: 820px) and (min-aspect-ratio: 23/20) {
  .machines-contact {
    display: grid;
    grid-template-columns: clamp(320px, 34vw, 600px) minmax(0, 1fr);
    height: 100svh;
    min-height: 500px;
  }
  .machines-contact-left {
    justify-content: space-between;
    gap: 0;
    min-height: 0;
    overflow: hidden;
    padding: clamp(14px, 3.4vh, 44px) clamp(14px, 2vw, 40px);
  }
  .machines-c-headline {
    margin-top: clamp(10px, 2.6vh, 30px);
    font-size: clamp(26px, min(3.4vw, 6.4vh), 68px);
  }
  .machines-c-lede {
    font-size: clamp(12.5px, min(1.02vw, 1.9vh), 16.5px);
  }
  .machines-c-space {
    margin-top: clamp(8px, 2.3vh, 26px);
  }
  .machines-c-cta .machines-mag {
    height: clamp(40px, 5.6vh, 52px);
  }
  .machines-c-index {
    margin-top: clamp(10px, 2.2vh, 26px);
  }
  .machines-c-index .machines-index-link {
    font-size: clamp(12px, min(0.95vw, 1.75vh), 14.5px);
  }
  .machines-c-index li + li {
    margin-top: clamp(2px, 0.8vh, 9px);
  }
  .machines-c-copy {
    margin-top: clamp(8px, 2.2vh, 24px);
  }
  .machines-contact-panel {
    height: auto;
    min-height: 0;
  }
  .machines-postcard-slot {
    width: clamp(270px, 26vw, 400px);
  }
  .machines-word-region {
    min-height: 0;
  }
}
/* Short landscape windows: shed the supporting copy before anything gets cramped. */
@media (min-width: 820px) and (min-aspect-ratio: 23/20) and (max-height: 620px) {
  .machines-c-lede,
  .machines-postcard-note {
    display: none;
  }
}
@media (min-width: 820px) and (min-aspect-ratio: 23/20) and (max-height: 540px) {
  .machines-c-avatars,
  .machines-c-brand-tagline,
  .machines-c-copy {
    display: none;
  }
}
```

## Design notes (context, not instructions to change anything)

- The mesh gradient is a weighted blend of Gaussian colour pools, each drifting on its own slow Lissajous path over a deep indigo ground, with one low-frequency warp to keep the shapes organic — so there are no edges anywhere. The palette is the `pool(...)` lines in `mist.ts`; change a colour or a pool's weight there. It renders to a small buffer and the CSS blur does the softening, which is far cheaper than blurring in the shader, and it runs only while the panel is on screen.
- The inspect mode is two SVG masks over the same glyphs: `machines-gw-hide` punches a soft circle out of the filled word, and `machines-gw-show` reveals the dotted-outline copy through the same circle. `inspector.ts` moves both circles, draws the measurement frames and guides on a 2D canvas above the panel, positions the glyph chip, and sets `--mx` / `--my` on the postcard so its sheen and rim light follow the pointer. Each measurement frame lingers for 1.5 s.
- The panel's entrance is scroll-linked, not a one-shot animation: as the panel rises into view its `clip-path` inset closes from a few percent to zero with rounded corners, and the word slides up the last 14% of its height. Scroll back up and it reverses.
- The "Replying today / tomorrow" line and the postmark read the studio's time zone (`Europe/London`) with `Intl.DateTimeFormat` and update every ten seconds, so the dot turns amber outside 08:00–18:00 in Edinburgh, not the visitor's town.
- The newsletter is a front-end mock: a valid address shows a spinner for 1.1 s and then the thank-you line, and an invalid one shakes the field and shows the red note. Wire `submit` in `parts.tsx` to your own endpoint.
- "No. 01 Unfurl" in the Cabinet column and "Back to the cabinet" both scroll to the top of the page; the studio's site keeps its work at the top. Point them wherever your own page's top lives.
- With `prefers-reduced-motion` the entrance transitions are skipped, the dots stop pulsing and the outline ants stop crawling, and the mesh gradient stops drifting once it has settled.
