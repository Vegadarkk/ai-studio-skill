# The free shelf

Nine builds from the Scrolltide library, each the **complete source of a real shipped project**
written out as one rebuild prompt: what the page is, which parts are load-bearing, the exact stack,
every file verbatim, and where to download its assets. They are byte-identical to the library's own
copies. Read the one you pick in full before writing any code.

Pick by **the scroll moment and the shape of the page** first, the subject matter last. Any of these
can be re-dressed for a different business: NAÏADE's camera move works for a watch, a car or a
building as well as for jewellery.

| File | Build | The scroll moment | Shape | Best for |
|---|---|---|---|---|
| `naiade.md` | NAÏADE · landing | A 481-frame film played by the scrollbar: one camera move from a wide shot into three product close-ups, a card landing on each hold, then a fast rewind | Long pinned stage + closing sheet + bag drawer | Luxury product, e-commerce, anything with 2–4 hero products |
| `selene.md` | SELENE · landing | Six layers cut from one render part as you scroll: the dust clears and the Earth rises over the Moon; then a route draws itself and a reel of stills slides past | Layered hero + drawn path + sideways reel + cards + waitlist | Travel, launches, expeditions, any story told in stages |
| `otis.md` | Otis · hero | Not scroll: you grab a cartoon face and pull it like taffy (WebGL2 mesh, spring release, 14 expressions) | One screen, light/dark toggle | Personal portfolio, character or illustration work, playful brands |
| `visor.md` | Visor · hero | A looping film in a rounded 16:9 frame, giant type split around the wearer's head, three fanned cards beneath | Light page, nav in its own row | Hardware product, device launch, a light page |
| `fluxora.md` | Fluxora · landing hero | Ambient looping film (a glowing visor) behind a four-line headline with one italic serif word | Dark ember single screen, glass stat cards | Agency, studio, consultancy |
| `aurora.md` | Aurora · hero | Ambient looping film, copy anchored bottom-left, avatar trust badge | Dark single screen, green accent | SaaS, design studio, a first-five-seconds hero |
| `monsoon.md` | Monsoon · hero | Bright misty looping film, dark text on light, frosted pill nav, logo strip | Light single screen | Operations or B2B SaaS that should feel calm |
| `glacier.md` | Glacier · hero | Full-bleed film with a centred exhibition-poster layout and a floating glass icon dock | Centred single screen, serif display | Events, exhibitions, culture, premium launches |
| `drop-a-line.md` | Drop a Line · footer section | A dark panel of drifting WebGL mesh-gradient light beside a contact column, a giant measured word, an inspect mode | One band added to an existing page | Closing any page: contact, newsletter, studio sign-off |

## What each one needs

| Build | Stack | Assets to download | Prompt size |
|---|---|---|---|
| NAÏADE | Vite 6, React 19, TS, Tailwind v4, Lenis | 965 files, ~17 MB (frames in two cuts + stills) | 75 KB |
| SELENE | Vite 6, React 19, TS, Tailwind v4, Lenis | 17 files, ~3 MB (six layers in two cuts + stills) | 62 KB |
| Otis | Vite 6, React 19, TS, Tailwind v4, raw WebGL2 | 14 face cut-outs, ~2.5 MB | 59 KB |
| Visor | Vite 6, React 19, TS, Tailwind v4, Motion, lucide-react | one hero video | 56 KB |
| Fluxora | Vite, React 19 (JSX), plain CSS, no animation library | one ~11 MB hero video | 46 KB |
| Aurora | Vite, React 19, TS, Tailwind v4, framer-motion | one hero video | 15 KB |
| Monsoon | Vite, React 19, TS, Tailwind v4, framer-motion | one hero video | 14 KB |
| Glacier | Vite, React 19, TS, Tailwind v4, framer-motion | one hero video | 19 KB |
| Drop a Line | React 19, TS, Tailwind v4, raw WebGL2 (drops into Vite or Next.js) | none | 81 KB |

## Using a build

- **The prompt says "reproduce exactly".** That is how you get a working base: build it as written
  first, run it, then make your changes on top (see SKILL.md). Don't improvise the base.
- **Assets are downloaded, never hotlinked.** Each prompt gives a download URL for its media. Fetch it
  once into `public/`; that URL must not appear in the finished project.
- **Every word lives in one content file** in most of these builds (`src/content.ts`), and the
  palette lives in one `@theme` or `:root` block. That is where a rebrand starts.
- **The "How the page works" section of each prompt lists what is load-bearing.** Keep those parts
  when you change the brand.
- The brands, people, products and prices in these builds are invented. Replace them before shipping.

## Where these come from

Every file here is a free item from the Scrolltide library, with its own page:

| Build | Page |
|---|---|
| NAÏADE | https://www.scrolltide.co/templates/naiade |
| SELENE | https://www.scrolltide.co/templates/selene |
| Otis | https://www.scrolltide.co/templates/otis |
| Visor | https://www.scrolltide.co/templates/visor |
| Fluxora | https://www.scrolltide.co/templates/fluxora |
| Aurora | https://www.scrolltide.co/templates/aurora |
| Monsoon | https://www.scrolltide.co/templates/monsoon |
| Glacier | https://www.scrolltide.co/templates/glacier |
| Drop a Line | https://www.scrolltide.co/sections#s-drop-a-line |
