# Otis — Stretchable-Face Portfolio Hero Rebuild Prompt

> One-shot prompt for an AI code generator (Claude Code, Cursor, v0, Bolt, etc.). Paste this entire file as a single prompt into an empty directory. It contains the exact, complete source of every file in the project — follow it literally and the result is pixel-for-pixel the original.

## What this project is

"Otis Pell — character designer" is a one-screen portfolio hero where **you can grab the designer's cartoon face and pull it like taffy**. A giant one-line headline, "HEY, I'M OTIS", spans the full width in heavy Satoshi with a mustard highlighter stroke across the name, and directly under it a cobalt disc holds a 3D-cartoon bust of Otis — copper quiff, freckles, mustard turtleneck — whose hair breaks out over the top of the disc and over the headline. Grab anywhere on him and the skin stretches out under your pointer into a long tapering tube while his expression changes with where you grabbed (the hair or ears: "OW"; the cheeks: "pinched"; anywhere else: a grimace, "being squeezed"); let go and it snaps back with a rubbery wobble and he pulls a random face — tongue out, cackling, skeptical, whistling innocently, smug, cross-eyed. A quick tap startles him and jiggles his whole head. Up to four fingers can pull at once. The longer you keep stretching him, the more he **flushes** — cheeks and nose first, then the whole face — and a "Patience" bar drains from cobalt to red beside a "Current mood" readout; at the bottom of his patience a release leaves him "seeing stars". Left alone for five seconds he goes back to neutral, his eyes follow your cursor left and right, and hovering his nose makes him cross-eyed. A handwritten "pull my face" note with an arrow points at him until the first pull, and a custom ring cursor appears over his face and tightens while you hold. Around him: a short bio on the left ("I make faces for a living."), the mood meter and an "Every other Sunday · one email" subscribe pill on the right that answers "You're in. He's pulling a face about it.", a header with his avatar, `@otispell`, Work / Notes pills and a light/dark toggle, and an "As seen in" strip of six invented outlets each set in its own wordmark face.

## How the page works — read this before touching any number

- **The face is a raw WebGL2 mesh, not a CSS or canvas-2D trick.** `src/face/engine.ts` draws the portrait as a 128×128 grid in image-UV space. Each grab occupies one of four slots holding an anchor and an offset; the vertex shader moves every vertex by `offset × gaussian(distance from anchor)`, with the gaussian widening as the pull gets longer. That is what turns a pull into a tapering tube instead of a dragged sticker.
- **Releases are a damped spring.** While held, a slot follows the pointer almost rigidly and records its velocity; on release it is integrated as a spring (stiffness 260, damping 11, three sub-steps per frame), so it overshoots and wobbles back. The pull itself is rubber-banded with `tanh` to at most 1.1× the stage size, so it gets heavier the further it goes and never leaves the canvas.
- **Every expression is a separate image registered to the same framing.** `public/faces/` holds fourteen 1024×1024 cut-outs (a 2:3 bust padded to a square), all aligned to each other, so swapping the texture under the mesh changes the expression in place with a 90 ms crossfade. `engine.warm()` uploads the rest one at a time after the first frame so the first swap never hitches.
- **The disc and the face share one coordinate space.** The disc is drawn in the same image-UV space from `rig.disc`; below the disc's centre the bust is clipped by the disc's edge, above it the head is free to break out. `rig` in `src/content.ts` holds the landmarks — disc, nose, cheeks, face oval, hairline, side limits — measured on these exact images, and both the flush shader and the grab-zone logic read them.
- **The canvas covers the whole hero but never takes pointer events.** `FaceCanvas` lays a full-hero canvas over everything (so a stretched face can spill across the copy) with `pointer-events: none`, plus a hit layer over the stage. A grab only starts on an opaque pixel of the base face's alpha, sampled from a low-res copy, so the empty corners of the image and the copy beside it stay clickable.

Checks that must pass before you call it done: the headline fills the width on desktop and the hair overlaps it; grabbing the hair, a cheek and the chin give three different faces; pulling draws out a long tapering tube and letting go wobbles back; a tap jiggles him and shows the startled face; two fingers on a touch screen pull two tubes at once; holding a stretch reddens his cheeks, then his face, and drains the patience bar; at low patience a release shows the dizzy face; five seconds after a release his eyes follow the cursor and the nose makes him cross-eyed; the dark-mode toggle switches the palette and is remembered on reload; and the subscribe form shows its reply.

## Reproduce this exactly

The goal is a **byte-identical rebuild**, not an interpretation. Every file below is the real, final source of a shipped project. Write each one out verbatim.

- **Do not "improve" anything.** Not the copy, not the colours, not the grid size, the gaussian width, the spring constants, the flush rates or a single value in `rig`.
- **Do not substitute libraries or approaches.** The dependency list below is complete and exact. Do not replace the WebGL2 mesh with a CSS transform, an SVG filter, a canvas-2D warp, Three.js or a physics library, and do not add an animation library.
- **Use the pinned versions in `package.json` as written** — do not run `npm install <pkg>@latest`.
- **Do not add files.** The complete file list is exactly what appears under **File:** below, plus the downloaded faces.
- **Keep every accessibility attribute** — `role="img"` and its `aria-label`, `aria-live`, `aria-pressed`, `aria-hidden`, and the reduced-motion block in `index.css`.
- **Keep the comments.** They record why each number has the value it does.
- If a scaffolding tool generates boilerplate (`App.css`, the Vite SVG logos, a starter `App.tsx`, a `README.md`), **delete it** rather than merging it in.

## Tech stack (required — do not substitute)

- Vite 6 + React 19 + **TypeScript** (`npm run lint` is `tsc --noEmit`)
- `@vitejs/plugin-react` — the React plugin
- **Raw WebGL2** for the face and disc — two small shader programs in `src/face/engine.ts`, no graphics library.
- Tailwind CSS v4 via the **`@tailwindcss/vite`** plugin — there is **no** `tailwind.config.js`; the light and dark palettes, fonts and type scale are in `src/index.css`.
- Fonts by `<link>` in `index.html`: **Satoshi** from Fontshare for the headline and display type; **Inter**, **Instrument Serif**, **Unbounded** and **JetBrains Mono** from Google Fonts (the last three mostly set the press-strip wordmarks). Both hosts are built to be linked to; leave the links as they are.
- The dependency list in `package.json` below is complete and exact — do not add, remove, or substitute a package.

### package.json

```json
{
  "name": "otis",
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
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.14",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "@vitejs/plugin-react": "^5.0.4",
    "tailwindcss": "^4.1.14",
    "typescript": "~5.8.2",
    "vite": "^6.2.3"
  }
}
```

## Assets — download them, do not hotlink

The page needs Otis's fourteen expressions (1024×1024 transparent WebP cut-outs, about 2.5 MB in one zip). The zip already contains the `faces/` folder, so it unpacks straight into `public/`.

```bash
mkdir -p public
curl -L -o faces.zip "https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/prompt-assets/otis/faces.zip"
unzip -q faces.zip -d public/
rm faces.zip
```

When you are done, `public/faces/` holds `base.webp` (neutral, looking straight out), `l_left.webp` and `l_right.webp` (eyes following the cursor), the release and idle faces `x_cross`, `x_tongue`, `x_shock`, `x_laugh`, `x_skeptic`, `x_whistle`, `x_smug` and `x_dizzy`, and the grab faces `g_grimace`, `g_ouch` and `g_squish` — fourteen files in all.

**The download URL above must not appear anywhere in the project you generate** — not in `index.html`, not in `src/content.ts`. The page loads every face from `/faces/`. The images are registered to each other and to the landmarks in `rig`; do not crop, resize or re-export them.

## Steps to build

1. Scaffold a new Vite React + TypeScript project named `otis`, then delete every file the scaffolder generated under `src/` and `public/`.
2. Write `package.json` exactly as given above and install with it.
3. Download and unpack the faces as described in **Assets** above — do this before the first run, or the stage shows an empty disc.
4. Write `index.html`, `vite.config.ts`, `tsconfig.json`, `.gitignore` and everything under `src/` with the exact contents below.
5. Re-read **How the page works** above before you touch `src/face/engine.ts`, `src/face/FaceCanvas.tsx` or `rig`.
6. Run `npm run dev`, pull the face from the hair, a cheek and the chin, tap it, keep stretching until the patience bar runs out, then leave it alone and move the cursor across it; then run `npm run lint` and `npm run build` — both must finish without errors.

## File: `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#e8ebf1" />
    <title>Otis Pell — character designer</title>
    <meta name="description" content="Otis Pell sculpts and animates cartoon characters, and builds small tools for rigging faces. Grab his face." />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8' fill='%232f4bf0'/><circle cx='5.6' cy='7' r='1.2' fill='%23fff'/><circle cx='10.4' cy='7' r='1.2' fill='%23fff'/></svg>" />
    <link rel="preload" as="image" href="/faces/base.webp" />
    <link rel="preconnect" href="https://api.fontshare.com" />
    <link href="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Unbounded:wght@700&family=JetBrains+Mono:wght@500&display=swap"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## File: `package.json`

```json
{
  "name": "otis",
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
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.14",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "@vitejs/plugin-react": "^5.0.4",
    "tailwindcss": "^4.1.14",
    "typescript": "~5.8.2",
    "vite": "^6.2.3"
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
  build: {
    // Expression cutouts live in public/faces and are served as-is.
    target: 'es2020',
  },
});
```

## File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

## File: `.gitignore`

```
node_modules
dist
*.local
.DS_Store
```

## File: `src/main.tsx`

```tsx
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

## File: `src/vite-env.d.ts`

```ts
/// <reference types="vite/client" />
```

## File: `src/index.css`

```css
@import 'tailwindcss';

/* Cool fog page, near-black ink; the cobalt disc and mustard marker come from Otis himself. */
:root {
  --page: #e8ebf1;
  --ink: #12141b;
  --mute: #12141b99;
  --line: #12141b1f;
  --field: #f6f7fa;
  --disc: #2f4bf0;
  --sun: #f2b31b;
  color-scheme: light;
}
:root[data-theme='dark'] {
  --page: #0e1015;
  --ink: #eef0f5;
  --mute: #eef0f599;
  --line: #eef0f526;
  --field: #171a21;
  color-scheme: dark;
}

@theme inline {
  --color-page: var(--page);
  --color-ink: var(--ink);
  --color-mute: var(--mute);
  --color-line: var(--line);
  --color-field: var(--field);
  --color-disc: var(--disc);
  --color-sun: var(--sun);
}

@theme {
  --font-display: 'Satoshi', 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-serif: 'Instrument Serif', Georgia, serif;
  --font-wide: 'Unbounded', 'Satoshi', sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;

  --text-lede: clamp(14px, 1.05vw, 16px);
  --text-lede--line-height: 1.5;
  --text-lede--letter-spacing: -0.006em;
  --text-ui: 12px;
  --text-ui--line-height: 1;
  --text-ui--letter-spacing: 0.08em;
  --text-micro: 11px;
  --text-micro--line-height: 1.2;
  --text-micro--letter-spacing: 0.1em;
  --text-wordmark: clamp(15px, 1.35vw, 20px);
  --text-wordmark--line-height: 1;
}

html,
body,
#root {
  min-height: 100%;
}
html {
  background: var(--page);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  transition: background-color 0.3s;
}
body {
  margin: 0;
  overflow-x: hidden;
  font-family: var(--font-sans);
  background: var(--page);
}

/* Satoshi Black, tracked in hard — it reads as one slab behind the head. */
.headline {
  font-family: var(--font-display);
  font-weight: 900;
  line-height: 0.84;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}

/* The marker sits on the lower half of the name, like a highlighter pass. */
.marker {
  background: linear-gradient(transparent 52%, var(--sun) 52%, var(--sun) 92%, transparent 92%);
  padding-inline: 0.04em;
}

/* Stage tucks up under the headline so the hair breaks over the type. */
.stage {
  margin-top: calc(var(--mega, 80px) * -0.3);
}
@media (min-width: 768px) {
  .stage {
    margin-top: calc(var(--mega, 160px) * -0.62);
  }
}

/* Grab cursor: a ring that shows over the face and tightens while held. */
.grab-ring {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  pointer-events: none;
}
.grab-ring::before,
.grab-ring::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  transition:
    transform 0.18s cubic-bezier(0.3, 1.6, 0.5, 1),
    opacity 0.18s;
  opacity: 0;
}
.grab-ring::before {
  width: 34px;
  height: 34px;
  margin: -17px 0 0 -17px;
  border: 1.5px solid #fff;
  mix-blend-mode: difference;
  transform: scale(0.6);
}
.grab-ring::after {
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  background: #fff;
  mix-blend-mode: difference;
}
.grab-ring[data-on='1']::before,
.grab-ring[data-on='1']::after {
  opacity: 1;
  transform: scale(1);
}
.grab-ring[data-held='1']::before {
  transform: scale(0.62);
}

.hint {
  transition:
    opacity 0.4s,
    transform 0.4s;
}

@media (prefers-reduced-motion: reduce) {
  .grab-ring::before,
  .grab-ring::after,
  .hint {
    transition: none;
  }
}
```

## File: `src/content.ts`

```ts
export const person = {
  name: 'Otis',
  handle: '@otispell',
};

export const nav = [
  {label: 'Work', href: '#work'},
  {label: 'Notes', href: '#notes'},
];

export const bio = [
  'I make faces for a living.',
  'Eleven years of sculpting and animating cartoon characters — mostly for games, a few for cereal boxes, one for a very confused bank. I still can’t draw hands.',
  'These days I build small tools that let anyone rig a face in an afternoon. I write about what breaks every other Sunday:',
];

/** Invented outlets — set as wordmarks in different faces, like a press strip. */
export const press = [
  {name: 'The Polygon Review', font: 'font-serif italic'},
  {name: 'RIGGED', font: 'font-wide tracking-[0.08em]'},
  {name: 'frameline', font: 'font-display font-black lowercase tracking-[-0.04em]'},
  {name: 'Keyframe Quarterly', font: 'font-serif'},
  {name: 'TOON/DAILY', font: 'font-mono tracking-[0.04em]'},
  {name: 'Squash & Stretch', font: 'font-display font-medium italic'},
];

/**
 * Every expression is registered to the same 2:3 bust framing, padded to a
 * square, so they swap in place. A file that fails to load falls back to the base face
 * (a missing grab face falls back to g_grimace).
 */
export const faces = {
  base: {src: '/faces/base.webp', mood: 'chill'},
  l_left: {src: '/faces/l_left.webp', mood: 'watching you'},
  l_right: {src: '/faces/l_right.webp', mood: 'watching you'},
  x_cross: {src: '/faces/x_cross.webp', mood: 'suspicious'},
  x_tongue: {src: '/faces/x_tongue.webp', mood: 'goofy'},
  x_shock: {src: '/faces/x_shock.webp', mood: 'startled'},
  x_laugh: {src: '/faces/x_laugh.webp', mood: 'cackling'},
  x_skeptic: {src: '/faces/x_skeptic.webp', mood: 'unconvinced'},
  x_whistle: {src: '/faces/x_whistle.webp', mood: 'innocent'},
  x_smug: {src: '/faces/x_smug.webp', mood: 'smug'},
  x_dizzy: {src: '/faces/x_dizzy.webp', mood: 'seeing stars'},
  g_grimace: {src: '/faces/g_grimace.webp', mood: 'being squeezed'},
  g_ouch: {src: '/faces/g_ouch.webp', mood: 'OW'},
  g_squish: {src: '/faces/g_squish.webp', mood: 'pinched'},
} as const;

export type FaceKey = keyof typeof faces;

/** Faces dealt at random when a stretch is let go. */
export const releaseFaces: FaceKey[] = ['x_tongue', 'x_laugh', 'x_skeptic', 'x_whistle', 'x_smug', 'x_cross'];

/**
 * Landmarks in image UV (0–1, v from the top) measured on the prepared faces
 * (2:3 busts padded to square, so the sweater spans u 0.167–0.833 and meets
 * the frame edge from v 0.845 down). The disc is drawn in the same space and
 * sized so its arc clips the shoulders before they reach those edges.
 */
export const rig = {
  disc: {x: 0.5, y: 0.58, r: 0.41},
  nose: {x: 0.505, y: 0.505, r: 0.04},
  cheeks: [
    {x: 0.385, y: 0.53},
    {x: 0.625, y: 0.53},
  ],
  face: {x: 0.5, y: 0.51, rx: 0.175, ry: 0.23},
  hairLine: 0.26,
  /** |u − 0.5| beyond which a grab above the jaw is the ears / side hair. */
  sides: 0.19,
};
```

## File: `src/face/engine.ts`

```ts
import {rig} from '../content';

/**
 * Taffy-face renderer. The portrait is a dense grid; every grab drags the
 * vertices around its anchor by a gaussian of their rest distance, so a long
 * pull draws the skin out into a tapering tube. Let go and a damped spring
 * snaps it back with a wobble. A flush value reddens the cheeks, then the
 * whole face, the longer it is mistreated.
 */

const GRID = 128;
const SLOTS = 4;
const SIGMA = 0.072; // grab falloff, in image UV
const SPRING = 260;
const DAMPING = 11;
const FADE = 0.09; // expression crossfade, seconds

const faceVert = `#version 300 es
in vec2 aUv;
uniform vec2 uView;
uniform vec3 uStage;
uniform vec4 uGrab[${SLOTS}];
out vec2 vUv;
out float vStretch;
void main() {
  vec2 p = uStage.xy + aUv * uStage.z;
  float s = 0.0;
  for (int i = 0; i < ${SLOTS}; i++) {
    vec2 d = aUv - uGrab[i].xy;
    float len = length(uGrab[i].zw) / uStage.z;
    float sig = ${SIGMA} * (1.0 + 0.35 * len);
    float w = exp(-dot(d, d) / (2.0 * sig * sig));
    p += uGrab[i].zw * w;
    s += w * len;
  }
  vUv = aUv;
  vStretch = s;
  vec2 c = p / uView * 2.0 - 1.0;
  gl_Position = vec4(c.x, -c.y, 0.0, 1.0);
}`;

const faceFrag = `#version 300 es
precision highp float;
in vec2 vUv;
in float vStretch;
uniform sampler2D uA;
uniform sampler2D uB;
uniform float uMix;
uniform vec4 uDisc;
uniform float uFlush;
uniform vec4 uCheeks;
uniform vec4 uFace;
uniform vec3 uNose;
out vec4 outColor;

float blob(vec2 p, vec2 c, float r) {
  vec2 d = p - c;
  return exp(-dot(d, d) / (2.0 * r * r));
}

void main() {
  vec4 c = mix(texture(uA, vUv), texture(uB, vUv), uMix);

  // Below the disc centre the bust is cut by the disc; above it the head breaks out.
  float inDisc = 1.0 - smoothstep(uDisc.z - uDisc.w, uDisc.z + uDisc.w, length(vUv - uDisc.xy));
  c *= max(step(vUv.y, uDisc.y), inDisc);

  // Flush: cheeks and nose first, then the whole face. Only skin-like pixels
  // (red well above blue) take it, so eye whites and irises stay clean.
  vec3 rgb = c.a > 0.0 ? c.rgb / c.a : vec3(0.0);
  float skin = smoothstep(0.04, 0.16, rgb.r - rgb.b);
  float blush = blob(vUv, uCheeks.xy, 0.055) + blob(vUv, uCheeks.zw, 0.055) + 0.8 * blob(vUv, uNose.xy, uNose.z);
  vec2 e = (vUv - uFace.xy) / uFace.zw;
  float face = 1.0 - smoothstep(0.55, 1.05, length(e));
  float m = blush * smoothstep(0.0, 0.5, uFlush) + face * smoothstep(0.4, 1.0, uFlush) * 0.9;
  m += clamp(vStretch * 0.7, 0.0, 0.45);
  m = clamp(m, 0.0, 1.0) * skin;
  rgb *= mix(vec3(1.0), vec3(1.08, 0.56, 0.54), m);

  outColor = vec4(rgb * c.a, c.a);
}`;

const discVert = `#version 300 es
in vec2 aUv;
uniform vec2 uView;
uniform vec3 uStage;
uniform vec3 uDisc;
out vec2 vP;
void main() {
  vP = (aUv * 2.0 - 1.0) * (uDisc.z + 0.01);
  vec2 p = uStage.xy + (uDisc.xy + vP) * uStage.z;
  vec2 c = p / uView * 2.0 - 1.0;
  gl_Position = vec4(c.x, -c.y, 0.0, 1.0);
}`;

const discFrag = `#version 300 es
precision highp float;
in vec2 vP;
uniform vec3 uDisc;
uniform float uAa;
uniform vec3 uColor;
out vec4 outColor;
void main() {
  float a = 1.0 - smoothstep(uDisc.z - uAa, uDisc.z + uAa, length(vP));
  outColor = vec4(uColor * a, a);
}`;

type Slot = {
  pointer: number | null;
  ax: number;
  ay: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  live: boolean;
};

export type Stage = {x: number; y: number; size: number};

function compile(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const prog = gl.createProgram()!;
  for (const [type, src] of [
    [gl.VERTEX_SHADER, vs],
    [gl.FRAGMENT_SHADER, fs],
  ] as const) {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? 'shader');
    gl.attachShader(prog, sh);
  }
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'link');
  return prog;
}

function uniforms(gl: WebGL2RenderingContext, prog: WebGLProgram, names: string[]) {
  return Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(prog, n)])) as Record<
    string,
    WebGLUniformLocation | null
  >;
}

export class FaceEngine {
  flush = 0;
  private gl: WebGL2RenderingContext;
  private face: WebGLProgram;
  private disc: WebGLProgram;
  private fu: Record<string, WebGLUniformLocation | null>;
  private du: Record<string, WebGLUniformLocation | null>;
  private faceVao: WebGLVertexArrayObject;
  private discVao: WebGLVertexArrayObject;
  private indexCount: number;
  private textures = new Map<string, WebGLTexture>();
  private images: Map<string, HTMLImageElement>;
  private alpha: Uint8ClampedArray;
  private alphaSize = 256;
  private slots: Slot[] = Array.from({length: SLOTS}, () => ({
    pointer: null,
    ax: 0,
    ay: 0,
    ox: 0,
    oy: 0,
    vx: 0,
    vy: 0,
    tx: 0,
    ty: 0,
    live: false,
  }));
  private stage: Stage = {x: 0, y: 0, size: 1};
  private view = {w: 1, h: 1, dpr: 1};
  private texA: string;
  private texB: string;
  private mix = 0;
  private lastHeld = 0;
  private raf = 0;
  private last = 0;
  private discColor: [number, number, number];

  constructor(
    private canvas: HTMLCanvasElement,
    images: Map<string, HTMLImageElement>,
    base: string,
    discColor: string,
  ) {
    const gl = canvas.getContext('webgl2', {premultipliedAlpha: true, antialias: true, alpha: true});
    if (!gl) throw new Error('webgl2');
    this.gl = gl;
    this.images = images;
    this.texA = this.texB = base;
    this.discColor = [1, 3, 5].map((i) => parseInt(discColor.slice(i, i + 2), 16) / 255) as [number, number, number];

    this.face = compile(gl, faceVert, faceFrag);
    this.disc = compile(gl, discVert, discFrag);
    this.fu = uniforms(gl, this.face, ['uView', 'uStage', 'uGrab', 'uA', 'uB', 'uMix', 'uDisc', 'uFlush', 'uCheeks', 'uFace', 'uNose']);
    this.du = uniforms(gl, this.disc, ['uView', 'uStage', 'uDisc', 'uAa', 'uColor']);

    // Grid mesh in UV space; the vertex shader places and warps it.
    const n = GRID + 1;
    const uv = new Float32Array(n * n * 2);
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++) {
        uv[(y * n + x) * 2] = x / GRID;
        uv[(y * n + x) * 2 + 1] = y / GRID;
      }
    const idx = new Uint16Array(GRID * GRID * 6);
    let k = 0;
    for (let y = 0; y < GRID; y++)
      for (let x = 0; x < GRID; x++) {
        const a = y * n + x;
        idx.set([a, a + 1, a + n, a + 1, a + n + 1, a + n], k);
        k += 6;
      }
    this.indexCount = idx.length;
    this.faceVao = this.vao(this.face, uv, idx);
    this.discVao = this.vao(this.disc, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), null);

    // Low-res alpha copy of the base face for hit testing.
    const c = document.createElement('canvas');
    c.width = c.height = this.alphaSize;
    const ctx = c.getContext('2d', {willReadFrequently: true})!;
    ctx.drawImage(images.get(base)!, 0, 0, this.alphaSize, this.alphaSize);
    this.alpha = ctx.getImageData(0, 0, this.alphaSize, this.alphaSize).data;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    this.texture(base);
  }

  private vao(prog: WebGLProgram, data: Float32Array, idx: Uint16Array | null) {
    const gl = this.gl;
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aUv');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    if (idx) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    }
    gl.bindVertexArray(null);
    return vao;
  }

  private texture(key: string) {
    let tex = this.textures.get(key);
    if (tex) return tex;
    const gl = this.gl;
    tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.images.get(key)!);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    this.textures.set(key, tex);
    return tex;
  }

  /** Upload the remaining expressions one per idle slot so the first swap never hitches. */
  warm() {
    const keys = [...this.images.keys()].filter((k) => !this.textures.has(k));
    const next = () => {
      const k = keys.shift();
      if (!k) return;
      this.texture(k);
      setTimeout(next, 30);
    };
    next();
  }

  resize(w: number, h: number, dpr: number) {
    this.view = {w, h, dpr};
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
  }

  setStage(stage: Stage) {
    this.stage = stage;
  }

  setFace(key: string) {
    if (key === this.texB) return;
    // Mid-fade, keep whichever face dominates as the one we fade from.
    if (this.mix >= 0.5) this.texA = this.texB;
    this.texB = key;
    this.mix = 0;
  }

  /** Displacement of a rest UV point from all slots, in px. */
  private displace(u: number, v: number) {
    let dx = 0;
    let dy = 0;
    for (const s of this.slots) {
      if (!s.live) continue;
      const len = Math.hypot(s.ox, s.oy) / this.stage.size;
      const sig = SIGMA * (1 + 0.35 * len);
      const w = Math.exp(-((u - s.ax) ** 2 + (v - s.ay) ** 2) / (2 * sig * sig));
      dx += s.ox * w;
      dy += s.oy * w;
    }
    return [dx, dy];
  }

  /** Rest UV under a canvas point (undoing any wobble in flight), or null if it misses the cut-out. */
  pick(px: number, py: number) {
    const {x, y, size} = this.stage;
    let u = (px - x) / size;
    let v = (py - y) / size;
    for (let i = 0; i < 5; i++) {
      const [dx, dy] = this.displace(u, v);
      u = (px - dx - x) / size;
      v = (py - dy - y) / size;
    }
    if (u < 0 || v < 0 || u >= 1 || v >= 1) return null;
    const {disc} = rig;
    if (v > disc.y && Math.hypot(u - disc.x, v - disc.y) > disc.r) return null;
    const a = this.alpha[(Math.floor(v * this.alphaSize) * this.alphaSize + Math.floor(u * this.alphaSize)) * 4 + 3];
    return a > 120 ? {u, v} : null;
  }

  grab(pointer: number, u: number, v: number, px: number, py: number) {
    const free =
      this.slots.find((s) => !s.live) ??
      this.slots.filter((s) => s.pointer === null).sort((a, b) => Math.hypot(a.ox, a.oy) - Math.hypot(b.ox, b.oy))[0];
    if (!free) return;
    Object.assign(free, {pointer, ax: u, ay: v, ox: 0, oy: 0, vx: 0, vy: 0, live: true});
    this.drag(pointer, px, py);
  }

  drag(pointer: number, px: number, py: number) {
    const s = this.slots.find((s) => s.pointer === pointer);
    if (!s) return;
    const {x, y, size} = this.stage;
    // Clamp to the canvas, then rubber-band so the pull gets heavier the further it goes.
    const cx = Math.min(Math.max(px, 4), this.view.w - 4);
    const cy = Math.min(Math.max(py, 4), this.view.h - 4);
    const tx = cx - (x + s.ax * size);
    const ty = cy - (y + s.ay * size);
    const len = Math.hypot(tx, ty);
    const max = size * 1.1;
    const k = len > 0 ? (max * Math.tanh(len / max)) / len : 0;
    s.tx = tx * k;
    s.ty = ty * k;
  }

  release(pointer: number) {
    const s = this.slots.find((s) => s.pointer === pointer);
    if (s) s.pointer = null;
  }

  /** A tap: no stretch, just a jolt so the face jiggles. */
  poke(u: number, v: number) {
    const s = this.slots.find((s) => !s.live);
    if (!s) return;
    const size = this.stage.size;
    Object.assign(s, {pointer: null, ax: u, ay: v, ox: 0, oy: 0, vx: (0.5 - u) * size * 2.2, vy: size * 0.9, live: true});
  }

  get held() {
    return this.slots.some((s) => s.pointer !== null);
  }

  /** Longest current pull as a fraction of the stage. */
  get stretch() {
    return Math.max(0, ...this.slots.map((s) => (s.live ? Math.hypot(s.ox, s.oy) / this.stage.size : 0)));
  }

  start() {
    if (this.raf) return;
    const tick = (t: number) => {
      this.raf = requestAnimationFrame(tick);
      const dt = Math.min((t - (this.last || t)) / 1000, 1 / 30);
      this.last = t;
      this.step(dt, t);
      this.draw();
    };
    this.raf = requestAnimationFrame(tick);
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.last = 0;
  }

  private step(dt: number, now: number) {
    for (const s of this.slots) {
      if (!s.live) continue;
      if (s.pointer !== null) {
        // Follow the finger almost rigidly; keep the velocity for the release.
        const nx = s.ox + (s.tx - s.ox) * Math.min(1, dt * 38);
        const ny = s.oy + (s.ty - s.oy) * Math.min(1, dt * 38);
        s.vx = dt > 0 ? (nx - s.ox) / dt : 0;
        s.vy = dt > 0 ? (ny - s.oy) / dt : 0;
        s.ox = nx;
        s.oy = ny;
        continue;
      }
      const h = dt / 3;
      for (let i = 0; i < 3; i++) {
        s.vx += (-SPRING * s.ox - DAMPING * s.vx) * h;
        s.vy += (-SPRING * s.oy - DAMPING * s.vy) * h;
        s.ox += s.vx * h;
        s.oy += s.vy * h;
      }
      if (Math.hypot(s.ox, s.oy) < 0.25 && Math.hypot(s.vx, s.vy) < 6) s.live = false;
    }

    if (this.held) {
      this.lastHeld = now;
      this.flush = Math.min(1, this.flush + dt * 0.3 * Math.min(1, this.stretch / 0.4 + 0.15));
    } else if (now - this.lastHeld > 1600) {
      this.flush = Math.max(0, this.flush - dt * 0.07);
    }

    if (this.mix < 1) {
      this.mix = Math.min(1, this.mix + dt / FADE);
      if (this.mix >= 1) this.texA = this.texB;
    }
  }

  private draw() {
    const gl = this.gl;
    const {w, h, dpr} = this.view;
    const {x, y, size} = this.stage;
    const {disc, cheeks, face, nose} = rig;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.disc);
    gl.uniform2f(this.du.uView, w, h);
    gl.uniform3f(this.du.uStage, x, y, size);
    gl.uniform3f(this.du.uDisc, disc.x, disc.y, disc.r);
    gl.uniform1f(this.du.uAa, 1 / (size * dpr));
    gl.uniform3f(this.du.uColor, ...this.discColor);
    gl.bindVertexArray(this.discVao);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.useProgram(this.face);
    gl.uniform2f(this.fu.uView, w, h);
    gl.uniform3f(this.fu.uStage, x, y, size);
    const g = new Float32Array(SLOTS * 4);
    this.slots.forEach((s, i) => s.live && g.set([s.ax, s.ay, s.ox, s.oy], i * 4));
    gl.uniform4fv(this.fu.uGrab, g);
    gl.uniform4f(this.fu.uDisc, disc.x, disc.y, disc.r, 1 / (size * dpr));
    gl.uniform1f(this.fu.uFlush, this.flush);
    gl.uniform4f(this.fu.uCheeks, cheeks[0].x, cheeks[0].y, cheeks[1].x, cheeks[1].y);
    gl.uniform4f(this.fu.uFace, face.x, face.y, face.rx, face.ry);
    gl.uniform3f(this.fu.uNose, nose.x, nose.y, nose.r);
    gl.uniform1f(this.fu.uMix, this.mix);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture(this.texA));
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.texture(this.texB));
    gl.uniform1i(this.fu.uA, 0);
    gl.uniform1i(this.fu.uB, 1);
    gl.bindVertexArray(this.faceVao);
    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
  }

  destroy() {
    this.stop();
    this.gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}
```

## File: `src/face/FaceCanvas.tsx`

```tsx
import {useEffect, useRef, useState, type RefObject} from 'react';
import {faces, releaseFaces, rig, type FaceKey} from '../content';
import {FaceEngine} from './engine';

export type Mood = {face: FaceKey; patience: number; pulls: number};

type Props = {
  stageRef: RefObject<HTMLDivElement | null>;
  discColor: string;
  onMood: (m: Mood) => void;
};

/** Neutral time after a release before he goes back to just watching the cursor. */
const HOLD_MS = 5000;

function load(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/** Which face a grab pulls, by where it lands. */
function grabFace(u: number, v: number): FaceKey {
  const side = Math.abs(u - 0.5);
  if (v < rig.hairLine || (side > rig.sides && v < 0.6)) return 'g_ouch';
  if (side > 0.07 && v > 0.44 && v < 0.66) return 'g_squish';
  return 'g_grimace';
}

/**
 * Full-hero canvas plus a hit layer over the stage. The canvas never takes
 * pointer events, so the stretched face can spill over the copy without
 * blocking it; grabs only start on opaque pixels of the cut-out.
 */
export function FaceCanvas({stageRef, discColor, onMood}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hitRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const onMoodRef = useRef(onMood);
  onMoodRef.current = onMood;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const hit = hitRef.current!;
    const ring = ringRef.current!;
    let engine: FaceEngine | null = null;
    let disposed = false;
    const cleanups: (() => void)[] = [];

    const stage = {x: 0, y: 0, size: 1};
    const layout = () => {
      const s = stageRef.current;
      if (!s) return;
      const c = canvas.getBoundingClientRect();
      const r = s.getBoundingClientRect();
      Object.assign(stage, {x: r.left - c.left, y: r.top - c.top, size: r.width});
      Object.assign(hit.style, {
        left: `${stage.x}px`,
        top: `${stage.y}px`,
        width: `${stage.size}px`,
        height: `${stage.size}px`,
      });
      engine?.resize(c.width, c.height, Math.min(window.devicePixelRatio || 1, 2));
      engine?.setStage(stage);
    };

    (async () => {
      const keys = Object.keys(faces) as FaceKey[];
      const loaded = await Promise.all(keys.map((k) => load(faces[k].src)));
      if (disposed) return;
      const base = loaded[0];
      if (!base) return setFailed(true);
      // Expressions that fail to load fall back to the base face.
      const images = new Map<string, HTMLImageElement>();
      const available = new Set<FaceKey>();
      keys.forEach((k, i) => {
        images.set(k, loaded[i] ?? base);
        if (loaded[i]) available.add(k);
      });

      try {
        engine = new FaceEngine(canvas, images, 'base', discColor);
      } catch {
        return setFailed(true);
      }
      const e = engine;
      layout();
      e.start();
      e.warm();

      // --- director -------------------------------------------------------
      let face: FaceKey = 'base';
      let mode: 'neutral' | 'held' | 'after' = 'neutral';
      let afterAt = 0;
      let pulls = 0;
      let lastRelease: FaceKey | null = null;
      let cursor: {x: number; y: number} | null = null;
      const downs = new Map<number, {t: number; x: number; y: number; moved: number; u: number; v: number}>();
      let reported = '';

      const report = () => {
        const m = {face, patience: Math.round((1 - e.flush) * 100), pulls};
        const key = `${m.face}|${m.patience}|${m.pulls}`;
        if (key !== reported) {
          reported = key;
          onMoodRef.current(m);
        }
      };
      // A missing grab face borrows the grimace; anything else falls back to base.
      const resolve = (k: FaceKey): FaceKey =>
        available.has(k) ? k : k.startsWith('g_') && available.has('g_grimace') ? 'g_grimace' : 'base';
      const show = (k: FaceKey) => {
        k = resolve(k);
        face = k;
        e.setFace(k);
        report();
      };

      // Idle: the eyes follow the cursor; hovering the nose makes him cross-eyed.
      const neutralFace = (): FaceKey => {
        if (!cursor) return 'base';
        const p = e.pick(cursor.x, cursor.y);
        if (p && Math.hypot(p.u - rig.nose.x, p.v - rig.nose.y) < rig.nose.r * 1.4) return 'x_cross';
        const dx = (cursor.x - (stage.x + stage.size / 2)) / stage.size;
        if (dx < -0.42) return 'l_left';
        if (dx > 0.42) return 'l_right';
        return 'base';
      };

      const local = (ev: PointerEvent) => {
        const c = canvas.getBoundingClientRect();
        return {x: ev.clientX - c.left, y: ev.clientY - c.top};
      };

      const setRing = (ev: PointerEvent, over: boolean) => {
        if (ev.pointerType !== 'mouse') return;
        ring.style.transform = `translate3d(${ev.clientX}px, ${ev.clientY}px, 0)`;
        const on = over || e.held;
        ring.dataset.on = on ? '1' : '';
        ring.dataset.held = e.held ? '1' : '';
        hit.style.cursor = on ? 'none' : '';
      };

      const onDown = (ev: PointerEvent) => {
        layout();
        const p = local(ev);
        const at = e.pick(p.x, p.y);
        if (!at) return;
        ev.preventDefault();
        hit.setPointerCapture(ev.pointerId);
        e.grab(ev.pointerId, at.u, at.v, p.x, p.y);
        downs.set(ev.pointerId, {t: performance.now(), x: p.x, y: p.y, moved: 0, u: at.u, v: at.v});
        if (downs.size === 1) show(grabFace(at.u, at.v));
        mode = 'held';
        setRing(ev, true);
      };

      const onMove = (ev: PointerEvent) => {
        const p = local(ev);
        const d = downs.get(ev.pointerId);
        if (d) {
          d.moved = Math.max(d.moved, Math.hypot(p.x - d.x, p.y - d.y));
          e.drag(ev.pointerId, p.x, p.y);
        }
        setRing(ev, !!e.pick(p.x, p.y));
      };

      const onUp = (ev: PointerEvent) => {
        const d = downs.get(ev.pointerId);
        if (!d) return;
        downs.delete(ev.pointerId);
        e.release(ev.pointerId);
        setRing(ev, !!e.pick(local(ev).x, local(ev).y));
        if (downs.size) return;
        const tap = performance.now() - d.t < 240 && d.moved < 8;
        if (tap) {
          e.poke(d.u, d.v);
          show('x_shock');
        } else {
          pulls += 1;
          let next: FaceKey;
          if (e.flush > 0.8) next = 'x_dizzy';
          else {
            const pool = releaseFaces.filter((k) => k !== lastRelease && available.has(k));
            next = pool.length ? pool[Math.floor(Math.random() * pool.length)] : 'base';
          }
          lastRelease = next;
          show(next);
        }
        mode = 'after';
        afterAt = performance.now();
      };

      // Touch: block the page scroll only when the finger lands on the face.
      const onTouchStart = (ev: TouchEvent) => {
        const c = canvas.getBoundingClientRect();
        const t = ev.touches[0];
        if (t && e.pick(t.clientX - c.left, t.clientY - c.top)) ev.preventDefault();
      };

      const onWindowMove = (ev: PointerEvent) => {
        if (ev.pointerType !== 'mouse') return;
        cursor = local(ev);
        if (mode === 'neutral') {
          const n = neutralFace();
          if (n !== face) show(n);
        }
      };
      const onLeave = () => {
        ring.dataset.on = '';
      };

      hit.addEventListener('pointerdown', onDown);
      hit.addEventListener('pointermove', onMove);
      hit.addEventListener('pointerup', onUp);
      hit.addEventListener('pointercancel', onUp);
      hit.addEventListener('pointerleave', onLeave);
      hit.addEventListener('touchstart', onTouchStart, {passive: false});
      window.addEventListener('pointermove', onWindowMove, {passive: true});

      const timer = window.setInterval(() => {
        if (mode === 'after' && !e.held && performance.now() - afterAt > HOLD_MS) {
          mode = 'neutral';
          show(neutralFace());
        }
        report();
      }, 120);

      // Only run the loop while the hero is on screen.
      const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? e.start() : e.stop()));
      io.observe(canvas);

      cleanups.push(() => {
        hit.removeEventListener('pointerdown', onDown);
        hit.removeEventListener('pointermove', onMove);
        hit.removeEventListener('pointerup', onUp);
        hit.removeEventListener('pointercancel', onUp);
        hit.removeEventListener('pointerleave', onLeave);
        hit.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('pointermove', onWindowMove);
        window.clearInterval(timer);
        io.disconnect();
        e.destroy();
      });
    })();

    const ro = new ResizeObserver(layout);
    ro.observe(canvas);
    if (stageRef.current) ro.observe(stageRef.current);
    document.fonts?.ready.then(layout);

    return () => {
      disposed = true;
      ro.disconnect();
      cleanups.forEach((f) => f());
    };
  }, [stageRef, discColor]);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 z-20 h-full w-full" />
      <div
        ref={hitRef}
        role="img"
        aria-label="Otis. Grab and stretch his face to change his expression."
        className="absolute z-30 select-none"
      >
        {failed && (
          <>
            <div
              className="absolute rounded-full bg-disc"
              style={{
                left: `${(rig.disc.x - rig.disc.r) * 100}%`,
                top: `${(rig.disc.y - rig.disc.r) * 100}%`,
                width: `${rig.disc.r * 200}%`,
                height: `${rig.disc.r * 200}%`,
              }}
            />
            <img src={faces.base.src} alt="" className="absolute inset-0 h-full w-full" />
          </>
        )}
      </div>
      <div ref={ringRef} aria-hidden className="grab-ring" />
    </>
  );
}
```

## File: `src/hooks.ts`

```ts
import {useEffect, useLayoutEffect, useRef, useState} from 'react';

/**
 * From md up, sizes the one-line headline (inline-block, nowrap) to span its
 * parent's content box exactly. Below md it keeps its CSS size and wraps.
 * Either way the final size is published on the parent as --mega, which the
 * stage uses to tuck up under the type.
 */
export function useFitHeadline<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const wide = window.matchMedia('(min-width: 768px)');

    const PROBE = 100;
    const fit = () => {
      if (wide.matches) {
        el.style.fontSize = `${PROBE}px`;
        const styles = getComputedStyle(parent);
        const available = parent.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
        const natural = el.offsetWidth;
        if (natural > 0) el.style.fontSize = `${(PROBE * available) / natural}px`;
      } else {
        el.style.fontSize = '';
      }
      parent.style.setProperty('--mega', getComputedStyle(el).fontSize);
    };

    fit();
    // Re-fit once Satoshi swaps in; its advances differ from the fallback.
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  return ref;
}

const THEME_KEY = 'otis-theme';

export function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved === 'dark';
    } catch {
      /* storage blocked — fall through to the system setting */
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0e1015' : '#e8ebf1');
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    } catch {
      /* not persisted; fine */
    }
  }, [dark]);

  return [dark, () => setDark((d) => !d)] as const;
}
```

## File: `src/App.tsx`

```tsx
import {useCallback, useRef, useState, type FormEvent} from 'react';
import {bio, faces, nav, person, press} from './content';
import {FaceCanvas, type Mood} from './face/FaceCanvas';
import {useFitHeadline, useTheme} from './hooks';

const DISC = '#2f4bf0';

function Header({dark, onToggle}: {dark: boolean; onToggle: () => void}) {
  return (
    <header className="relative z-40 flex items-center justify-between gap-4 px-[clamp(16px,2.4vw,36px)] pt-[clamp(14px,2.4vh,24px)]">
      <a href="#" className="flex items-center gap-2.5 font-display text-[15px] font-bold tracking-[-0.01em]">
        <span className="relative size-8 overflow-hidden rounded-full bg-disc">
          <img src={faces.base.src} alt="" className="absolute top-[-2%] left-[-30%] w-[160%] max-w-none" />
        </span>
        {person.handle}
      </a>
      <nav aria-label="Main" className="flex items-center gap-1.5">
        {nav.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            className={`rounded-full px-3.5 py-2 text-ui font-semibold uppercase transition-colors ${
              i === 0 ? 'bg-ink text-page' : 'hover:bg-line'
            }`}
          >
            {l.label}
          </a>
        ))}
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={dark}
          aria-label="Dark mode"
          className="ml-2 flex h-7 w-12 items-center rounded-full bg-sun p-1"
        >
          <span
            className={`size-5 rounded-full bg-ink transition-transform duration-300 ${dark ? 'translate-x-5' : ''}`}
          />
        </button>
      </nav>
    </header>
  );
}

function Subscribe() {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };
  return (
    <form onSubmit={submit} className="w-full max-w-[380px]">
      <label htmlFor="email" className="mb-2.5 block text-micro font-medium uppercase text-mute">
        Every other Sunday · one email
      </label>
      {done ? (
        <p className="flex h-11 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-page">
          You’re in. He’s pulling a face about it.
        </p>
      ) : (
        <div className="flex h-11 gap-1.5">
          <input
            id="email"
            type="email"
            required
            placeholder="you@email.com"
            className="min-w-0 flex-1 rounded-full border border-line bg-field px-5 text-[14px] outline-none placeholder:text-mute focus:border-ink"
          />
          <button
            type="submit"
            className="rounded-full bg-disc px-5 text-ui font-semibold uppercase text-white transition-transform active:scale-95"
          >
            Subscribe →
          </button>
        </div>
      )}
    </form>
  );
}

function MoodMeter({mood}: {mood: Mood}) {
  const p = mood.patience;
  return (
    <div className="w-full max-w-[380px] space-y-3" aria-live="polite">
      <div className="flex items-baseline justify-between text-micro uppercase">
        <span className="text-mute">Current mood</span>
        <span className="font-display text-[15px] font-bold tracking-[-0.01em] normal-case">{faces[mood.face].mood}</span>
      </div>
      <div>
        <div className="mb-1.5 flex justify-between text-micro uppercase text-mute">
          <span>Patience</span>
          <span className="tabular-nums">{p}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full transition-[width] duration-150"
            style={{width: `${p}%`, background: `color-mix(in oklab, var(--disc) ${p}%, #e8412c)`}}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [dark, toggle] = useTheme();
  const title = useFitHeadline<HTMLHeadingElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<Mood>({face: 'base', patience: 100, pulls: 0});
  const onMood = useCallback((m: Mood) => setMood(m), []);

  return (
    <div className="flex min-h-[100svh] flex-col bg-page text-ink">
      <Header dark={dark} onToggle={toggle} />

      <main className="relative isolate flex flex-1 flex-col px-[clamp(16px,2.4vw,36px)] pt-[clamp(20px,5vh,56px)] text-center">
        <h1 ref={title} className="headline relative z-0 inline-block text-[21vw] md:whitespace-nowrap">
          <span className="block md:inline">Hey, I’m </span>
          <span className="marker">{person.name}</span>
        </h1>

        <div className="relative grid flex-1 grid-cols-1 items-end gap-x-8 gap-y-8 text-left md:grid-cols-[1fr_auto_1fr]">
          <div ref={stageRef} className="stage relative mx-auto aspect-square w-[min(100vw,580px)] md:order-2 md:w-[min(46vw,78svh)]">
            <p
              className={`hint absolute top-[24%] right-[-2%] rotate-6 font-serif text-[clamp(17px,1.5vw,22px)] italic md:right-[-8%] ${
                mood.pulls ? 'translate-y-2 opacity-0' : ''
              }`}
            >
              pull my face
              <svg viewBox="0 0 60 40" className="ml-6 block h-8 w-12 -scale-x-100" fill="none" aria-hidden>
                <path d="M4 4c18 2 34 12 44 30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M40 31l8 4 1-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>
          </div>

          <div className="relative z-10 max-w-[380px] space-y-3 pb-[clamp(20px,5vh,48px)] text-lede md:order-1">
            {bio.map((b, i) => (
              <p key={i} className={i === 0 ? 'font-display text-[1.25em] font-bold tracking-[-0.015em]' : 'text-mute'}>
                {b}
              </p>
            ))}
          </div>

          <div className="relative z-10 flex flex-col gap-7 pb-[clamp(20px,5vh,48px)] md:order-3 md:items-end">
            <MoodMeter mood={mood} />
            <Subscribe />
          </div>
        </div>

        <FaceCanvas stageRef={stageRef} discColor={DISC} onMood={onMood} />
      </main>

      <footer className="relative z-10 border-t border-line px-[clamp(16px,2.4vw,36px)] py-5">
        <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-mute">
          <li className="text-micro font-medium uppercase">As seen in</li>
          {press.map((p) => (
            <li key={p.name} className={`text-wordmark ${p.font}`}>
              {p.name}
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
```

## Design notes (context, not instructions to change anything)

- **The headline is fitted, then the stage tucks under it.** From 768 px up, `useFitHeadline` sets the one-line "HEY, I'M OTIS" to a 100 px probe, measures it and scales the font so it spans the content box exactly, then publishes the final size as `--mega`. `.stage` pulls itself up by `0.62 × --mega` (0.3× on phones, where the headline wraps onto two lines), which is what puts his quiff over the type at every width. It refits on resize and once the web fonts are ready.
- **The flush only touches skin.** The fragment shader adds two cheek blobs and a nose blob as `flush` rises past 0, then the whole face oval past 0.4, plus a little extra wherever the skin is being stretched right now — but multiplies it by `smoothstep(0.04, 0.16, r − b)`, so only pixels whose red is well above their blue take it. Eye whites, irises, hair highlights and the cobalt disc stay clean.
- **Patience is the flush, inverted.** `flush` climbs while any slot is held (faster the longer the pull), starts decaying 1.6 s after the last release, and drains slowly. The mood meter shows `1 − flush` as a percentage and mixes the bar from the disc's cobalt toward red in `oklab` as it falls; below 20% a release deals `x_dizzy` instead of a random face.
- **Which face a grab pulls depends on where it lands, in image UV.** Above `rig.hairLine`, or out at the sides above the jaw, is the hair or an ear (`g_ouch`); a band across the cheeks is `g_squish`; anything else is `g_grimace`. Release faces are drawn from `releaseFaces` at random, never the same one twice in a row.
- **A tap is a poke, not a pull.** Under 240 ms with under 8 px of travel counts as a tap: it fires a slot with an initial velocity and no offset, so the spring alone produces a jiggle, and he looks startled.
- **Missing faces degrade instead of breaking.** Every image loads independently; one that fails falls back to the base face (a missing grab face borrows the grimace). If the base face itself fails, or the browser has no WebGL2, the stage falls back to a plain `<img>` of him on a CSS disc in the same position.
- **The render loop sleeps off screen.** An `IntersectionObserver` stops the engine's `requestAnimationFrame` loop when the hero leaves the viewport, and the canvas renders at no more than 2× device pixel ratio.
- **Touch only blocks scrolling on the face.** A finger that lands on an opaque pixel of the cut-out calls `preventDefault` so it can pull; a finger anywhere else scrolls the page as usual.
- **Light and dark are one palette swap.** The page colours are CSS variables on `:root`, overridden under `[data-theme='dark']`; the disc and the mustard marker are the same in both. The toggle starts from the system setting, remembers the choice in `localStorage` (and survives storage being blocked), and also rewrites the `theme-color` meta tag.
- **Copy lives in `src/content.ts`.** The name, handle, nav, bio, the invented press outlets with their wordmark fonts, each face's mood label, the release pool and the `rig` landmarks are all there. If the portrait is ever replaced, `rig` has to be re-measured on the new images.
