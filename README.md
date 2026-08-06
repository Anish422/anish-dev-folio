# Anish Shah — Portfolio

A single-page React portfolio (Vite + TypeScript + Tailwind + shadcn/ui) deployed to GitHub Pages at [anishs.ca](https://anishs.ca).

The design language is **"spec sheet"** — editorial-brutalist: hard hairline rules instead of shadows, near-zero corner radii, two neutrals plus exactly one loud colour, and interaction that is structural rather than decorative.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Application Architecture](#application-architecture)
- [Pages](#pages)
- [Interaction Primitives](#interaction-primitives)
- [Components](#components)
- [Content Layer](#content-layer)
- [Hooks](#hooks)
- [Design System](#design-system)
- [Accessibility](#accessibility)
- [Maintenance Notes](#maintenance-notes)
- [Build & Deployment](#build--deployment)
- [Known Dead Code](#known-dead-code)

---

## Quick Start

```bash
npm install
npm run dev      # http://localhost:8080
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server on port `8080` (host `::`, so LAN-accessible) |
| `npm run build` | Production build to `dist/` |
| `postbuild` | Auto-runs after build: copies `dist/index.html` → `dist/404.html` (GitHub Pages SPA fallback) |
| `npm run deploy` | Writes `dist/CNAME` with `anishs.ca`, then publishes `dist/` via `gh-pages` (runs `build` first through `predeploy`) |

No `lint` or `test` script is defined, though ESLint is configured in [eslint.config.js](eslint.config.js).

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Build | Vite 5 + `@vitejs/plugin-react-swc` |
| Language | TypeScript 5.8 (non-strict — see below) |
| UI | React 18 |
| Styling | Tailwind CSS 3.4 + CSS custom properties |
| Components | shadcn/ui (Radix UI primitives) |
| Animation | Framer Motion 12 |
| Routing | React Router DOM 6 (`HashRouter`) |
| Command palette | cmdk (via shadcn `command`) |
| Data fetching | TanStack Query (provider-mounted, unused — all content is static) |

**Typefaces** — three roles, loaded from Google Fonts in [index.html](index.html):

| Role | Family | Used for |
| --- | --- | --- |
| Display | **Archivo** (variable `wdth` 62–125, `wght` 100–900) | Headlines, set expanded and heavy |
| Editorial | **Instrument Serif** | One-sentence standfirsts and summaries |
| Mono | **IBM Plex Mono** | Every label, tag, number and piece of metadata |

**TypeScript config note:** [tsconfig.app.json](tsconfig.app.json) disables `strict`, `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`, and `strictNullChecks`. Unused imports and implicit `any` will not fail the build.

---

## Directory Structure

```
anish-dev-folio/
├── index.html                  # SEO meta, JSON-LD, fonts, pre-paint theme script
├── vite.config.ts              # base path, port 8080, "@" → ./src alias
├── tailwind.config.ts          # tokens → Tailwind names, type families, keyframes
├── components.json             # shadcn/ui CLI config
├── eslint.config.js
├── tsconfig{,.app,.node}.json
│
├── public/                     # copied verbatim into dist/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── placeholder.svg
│   └── assets/resume/          # 3 PDFs — orphaned, see Known Dead Code
│
├── dist/                       # build output (committed; also the gh-pages source)
│
└── src/
    ├── main.tsx                # createRoot → <App />
    ├── App.tsx                 # providers, router, page transitions, layout chrome
    ├── index.css               # design tokens + type roles + component classes
    │
    ├── pages/
    │   ├── Home.tsx            # long-form landing page (currently unrouted)
    │   ├── Projects.tsx        # searchable / filterable project index
    │   ├── Experience.tsx      # timeline, skill matrix, key results
    │   ├── Contact.tsx         # details table + mailto form
    │   └── NotFound.tsx        # 404
    │
    ├── components/
    │   ├── Cursor.tsx          # ── interaction primitives ──
    │   ├── Backdrop.tsx
    │   ├── ScrambleText.tsx
    │   ├── Magnetic.tsx
    │   ├── Reveal.tsx
    │   ├── CommandPalette.tsx
    │   ├── Header.tsx          # ── layout & content ──
    │   ├── Footer.tsx
    │   ├── Hero.tsx
    │   ├── Section.tsx
    │   ├── ProjectCard.tsx
    │   ├── Timeline.tsx
    │   ├── TechMarquee.tsx
    │   ├── Badge.tsx
    │   ├── Metric.tsx
    │   ├── CTA.tsx
    │   ├── ThemeToggle.tsx
    │   ├── Navbar.tsx          # unused
    │   └── ui/                 # ~48 shadcn/ui primitives
    │
    ├── content/                # all site copy as typed TS objects
    │   ├── profile.ts
    │   ├── projects.ts
    │   ├── experience.ts
    │   └── skills.ts
    │
    ├── hooks/
    │   ├── use-theme.tsx
    │   ├── use-fine-pointer.ts
    │   ├── use-toast.ts
    │   └── use-mobile.tsx
    │
    ├── lib/
    │   ├── utils.ts            # cn()
    │   └── analytics.ts        # no-op analytics shim
    │
    └── assets/                 # 7 headshot images (bundled by Vite)
```

---

## Application Architecture

[src/main.tsx](src/main.tsx) mounts `<App />` into `#root`. [src/App.tsx](src/App.tsx) composes the provider stack and the persistent chrome:

```
QueryClientProvider
└── ThemeProvider (defaultTheme="system", storageKey="portfolio-theme")
    └── TooltipProvider
        ├── <Toaster /> + <Sonner />
        └── HashRouter
            ├── <Backdrop />          ← fixed grid + pointer spotlight + grain
            ├── <Cursor />            ← custom pointer
            ├── <CommandPalette />    ← ⌘K
            ├── skip-to-content link
            ├── <Header />            ← sticky, always rendered
            ├── <RoutedContent />     ← <Routes> + transitions + scroll reset
            └── <Footer />            ← always rendered
```

### Routing

`HashRouter` is deliberate — GitHub Pages has no server-side rewrite, so URLs look like `anishs.ca/#/projects`. The `postbuild` 404 copy is a second line of defence.

| Path | Renders |
| --- | --- |
| `/` | `<Hero />` (the component, **not** `pages/Home.tsx`) |
| `/projects` | `pages/Projects.tsx` |
| `/experience` | `pages/Experience.tsx` |
| `/contact` | `pages/Contact.tsx` |
| `*` | `pages/NotFound.tsx` |

Nav links live in one `navigation` array at [Header.tsx:9-14](src/components/Header.tsx#L9-L14) — add or remove tabs there and in the `<Routes>` block.

### Page transitions

`RoutedContent` wraps `<Routes>` in `AnimatePresence` (mode `wait`) and additionally renders a signal-coloured panel keyed to `location.pathname`, which wipes down and off on every navigation. It also resets scroll on route change — `HashRouter` does not do this on its own. Under `prefers-reduced-motion`, both are skipped and routes render bare.

---

## Pages

### `pages/Projects.tsx`
The project index. Free-text search (title, summary, any stack entry) plus a category filter derived from the data at runtime, with a live `NN / NN entries` readout. Empty state is a diagonally-hatched panel with a reset action.

### `pages/Experience.tsx`
Three sections: the scroll-tracked `<Timeline>`, a proficiency matrix rendering `skills.languages/frameworks/tools` as 5-segment bars, and a key-results grid. Closes with a `<CTA>`.

### `pages/Contact.tsx`
Two columns: a hairline details table (email doubles as a copy-to-clipboard button) with outbound links, and the message form. Submit does **not** POST anywhere — it URL-encodes the fields into a `mailto:` link and sets `window.location.href`, then fires a toast. Unchanged behaviour from before the redesign.

### `pages/NotFound.tsx`
Prints the attempted path, offers the four real routes as a hairline list, and a button that opens the ⌘K palette. Navigation uses router `<Link>` (previously plain `<a href>`, which forced a full page reload under `HashRouter`).

### `pages/Home.tsx`
The long-form landing page — Hero (with scroll cue) + TechMarquee + a record table + featured projects + CTA. **Imported by `App.tsx` but never routed**; `/` renders the bare `<Hero />`. See [Known Dead Code](#known-dead-code).

---

## Interaction Primitives

These five components carry most of the site's character. All of them degrade cleanly.

| Component | What it does |
| --- | --- |
| `Cursor.tsx` | Two-part pointer: a dot that tracks exactly, and a ring that lags on a spring and grows over interactive targets. Both use `mix-blend-mode: difference`, so they invert against whatever is beneath and stay legible in either theme. Any element can annotate it with `data-cursor="open"` and that verb prints beside the ring. |
| `Backdrop.tsx` | Fixed engineering grid, near-invisible until the pointer passes over it, plus static film grain. The spotlight is pure CSS — a radial mask positioned from `--mx` / `--my` on `<html>`, written once per frame by a `pointermove` handler. **No React state, so nothing re-renders on pointer move.** |
| `ScrambleText.tsx` | Decodes text out of random glyphs, on `mount`, on `view`, or on `hover`. The real string is always in the DOM in a `sr-only` span, so assistive tech never sees the scramble and layout never reflows. |
| `Magnetic.tsx` | Pulls its child toward the pointer while inside it, springs back on exit. Applied to primary CTAs. |
| `Reveal.tsx` | The site-wide scroll-in: a clip-path wipe rather than the usual fade-and-rise. See [Maintenance Notes](#maintenance-notes) for why its structure matters. |

`CommandPalette.tsx` (⌘K / Ctrl+K) covers navigation, copy-email, compose, outbound profiles, and theme switching. Anything can open it by dispatching `window.dispatchEvent(new CustomEvent("open-command-palette"))` — the header button and the 404 page both do.

---

## Components

| Component | Responsibility |
| --- | --- |
| `Header.tsx` | Sticky numbered nav (`00 INDEX`, `01 PROJECTS`, …) with a scramble-on-hover label and a spring-animated active underline. Border hardens past 24px of scroll. Carries a `useScroll`-driven reading-progress hairline, the ⌘K trigger, and `<ThemeToggle />`. Mobile: a full-bleed clip-path overlay where the nav becomes the page. |
| `Footer.tsx` | Colophon plate — contact block, sitemap and outbound columns, then the name set at full page width as a sign-off. |
| `Hero.tsx` | Status bar (availability, coordinates, **live Toronto clock**), the name set at `clamp(3rem, 13vw, 10rem)` with every glyph individually hoverable, an editorial statement, the portrait framed with corner registration ticks (cycles through 7 images on hover, greyscale → colour, with a scan line), and the stats table. Takes `showScrollCue` — off by default, because at `/` the hero is the entire route and the cue would point at the footer. |
| `Section.tsx` | Structural unit. Hairline rule, numbered mono eyebrow in the left margin (`[02.1]`), display title, serif standfirst. |
| `ProjectCard.tsx` | A catalogue entry, not a card: index number, mono metadata line, display title, serif summary, stack chips. Engineering detail sits behind a `SPEC (n)` disclosure. A signal rule wipes across the top edge on hover. |
| `Timeline.tsx` | Vertical rail whose signal fill tracks `useScroll` progress through the section — the timeline doubles as its own progress indicator. Square nodes, outcomes as a hairline table, first two bullets always visible with the rest behind a disclosure. |
| `TechMarquee.tsx` | Two rows wired to **scroll velocity**: they drift on their own, accelerate as you scroll, reverse direction when you scroll back, and skew with the velocity. Falls back to a static wrapped list under reduced motion. |
| `Badge.tsx` | Hard-edged mono tag. Variants `default` / `accent` / `outline` / `signal`. |
| `Metric.tsx` | Stats-table row. Counts up on entry with tabular figures so the row never changes width; parses `"10+"` into a number and a suffix. |
| `CTA.tsx` | Full-bleed closing block that inverts against the page. Variants `default` / `accent` (ink) / `signal` (vermilion). |
| `ThemeToggle.tsx` | Three-state segmented control (☀ / ☾ / ⌥) with a `layoutId` selection block — "system" is a real selectable option, not an invisible state you cycle past. |

### `components/ui/`
~48 unmodified shadcn/ui primitives. Most are unused — they ship with the scaffold and tree-shake out. They inherit the new tokens automatically, so they render hard-edged rather than rounded. Regenerate or add via the shadcn CLI, which reads [components.json](components.json).

---

## Content Layer

All copy is static TypeScript in [src/content/](src/content/) — **this is where you edit the site**, not the components.

| File | Shape |
| --- | --- |
| [profile.ts](src/content/profile.ts) | `name`, `title`, `blurb`, `location`, `email`, `phone`, `github`, `linkedin`, `deansList[]`, `graduation`, `heroTitle`, `heroSubtitle`, `metrics[]`. |
| [projects.ts](src/content/projects.ts) | `{ title, when, stack[], summary, bullets[], links[{label, href}], category, featured }`. `category` populates the filter row automatically; `featured: true` surfaces it on the Home page. |
| [experience.ts](src/content/experience.ts) | `{ company, role, location, start, end, bullets[], tech[], metrics[{label, value}] }`, newest first. |
| [skills.ts](src/content/skills.ts) | `{ languages[], frameworks[], tools[] }` — each `{ name, proficiency }` on a 1–5 scale rendered as segment bars — plus a flat `marquee[]`. |

`Hero.tsx` derives its statement from `heroTitle` by taking everything after the first `!`, so the greeting stays in the content file without being printed twice.

---

## Hooks

| Hook | Notes |
| --- | --- |
| `use-theme.tsx` | Context provider + `useTheme()`. Persists to `localStorage`, resolves `"system"` against `prefers-color-scheme`, toggles `.dark` on `<html>`. Also **syncs `color-scheme`** (without it dark mode shows a white overscroll gutter) and **subscribes to OS theme changes** while set to `system`. |
| `use-fine-pointer.ts` | `(hover: hover) and (pointer: fine)`. Every cursor-driven effect gates on this so touch devices skip work that has no hover state to respond to. |
| `use-toast.ts` | shadcn's reducer-based toast store. |
| `use-mobile.tsx` | `matchMedia` breakpoint hook (used by the shadcn sidebar primitive). |

---

## Design System

Tokens are HSL triplets in [src/index.css](src/index.css) with a full `.dark` override; [tailwind.config.ts](tailwind.config.ts) maps them onto Tailwind colour names.

```css
:root {                          .dark {
  --background: 40 27% 93%;        --background: 24  9%  7%;   /* warm near-black */
  --foreground: 24 12%  9%;        --foreground: 40 22% 91%;
  --signal:     12 88% 50%;        --signal:     14 100% 58%;  /* vermilion */
  --border:     28 12% 80%;        --border:     26  7% 21%;
  --radius:     2px;             }
}
```

Rules of the system:

- **Two neutrals and one loud colour.** `--signal` is the only saturated hue; `--accent` is ink, used for inverted blocks, not a second hue.
- **Structure is drawn with 1px hairlines, never shadows.** There is no `box-shadow` anywhere in the system.
- **Corners are hard** — `--radius` is 2px, and mostly 0.
- **No gradient text.** Type does the work instead.

**Type roles** (component classes in `index.css`): `.display` (Archivo, `wdth` 112 / `wght` 800, uppercase, `line-height: 0.88`), `.display-sm`, `.editorial` (Instrument Serif), `.label` (mono, 10px, `0.16em` tracking — worn by every piece of metadata), `.tabular`.

**Structural classes**: `.rule`, `.cell`, `.ticks` (corner registration marks that appear on hover), `.hatch`, `.columns-guide`, `.grain`.

**Interaction classes**: `.focus-ring`, `.link-sweep` / `.link-retract`, `.btn-block`, `.btn-ghost`, `.chip`.

---

## Accessibility

- **`prefers-reduced-motion` is honoured throughout**, not just globally clamped: `Reveal` renders content outright, `CTA` skips its clip, `TechMarquee` falls back to a static list, `Cursor` and `Magnetic` disable entirely, `ScrambleText` prints the final string, `Metric` skips the count-up, and route transitions are bypassed.
- **The native cursor is only hidden once `<Cursor />` has mounted** (it adds `.has-custom-cursor` to `<html>` in an effect). A JS failure can never leave a visitor without a pointer.
- `ScrambleText` keeps the real string in an `sr-only` span; screen readers never see scrambled glyphs.
- Disclosures use real `<button>`s with `aria-expanded` / `aria-controls`; the theme toggle is a `radiogroup`; the skip-to-content link is first in the DOM.
- Focus is a 2px signal outline with offset, never removed.

---

## Maintenance Notes

**Never observe a clip-path-hidden element with an IntersectionObserver.** Chrome computes an observer's intersection rect *after* applying `clip-path`, so an element hidden by `inset(0 100% 0 0)` has zero intersection area and can never trigger the animation that would reveal it. It deadlocks — and does so intermittently, because it races with when Framer attaches the observer.

Both [Reveal.tsx](src/components/Reveal.tsx) and [CTA.tsx](src/components/CTA.tsx) therefore split the two roles: an **outer wrapper is observed** (`useInView`) and an **inner element carries the clip**. If you add another clip-based reveal, follow the same shape — `whileInView` directly on the clipped element will appear to work in dev and drop content in production.

---

## Build & Deployment

- **Base path:** `base: "./"` in production, so the bundle works at a domain root and under `/anish-dev-folio/`.
- **Path alias:** `@/…` → `./src/…`, in both `vite.config.ts` and the tsconfigs.
- **Target:** GitHub Pages via `gh-pages`, custom domain `anishs.ca` written into `dist/CNAME` at deploy time.
- **Theme flash:** an inline script in `<head>` reads `localStorage` and stamps the theme class + `color-scheme` before first paint.
- **SEO:** `index.html` carries title, description, canonical, Open Graph, Twitter Card and a `Person` JSON-LD block. This is a client-rendered SPA, so per-route meta does not change.
- **Bundle:** ~527 kB JS (~170 kB gzipped) in one chunk; no route-based code splitting. The largest asset is `headshot4.png` at ~2 MB — converting it to WebP is still the highest-value performance win available.

---

## Known Dead Code

1. **`pages/Home.tsx` is unreachable.** `App.tsx` imports it but routes `/` to `<Hero />`. To restore the fuller landing page — record table, featured projects, tech marquee, closing CTA — change the `/` route to `element={<Home />}`. The hero's scroll cue turns itself on there automatically.
2. **`components/Navbar.tsx` is unused.** `Header.tsx` is the live nav, and `Navbar.tsx` was never restyled.
3. **`components/TechMarquee.tsx`** is only referenced from the unreachable `Home.tsx`.
4. **`lib/analytics.ts`** has no call sites.
5. **`public/assets/resume/`** still holds three PDFs. Nothing links to them — the Resume tab and page were removed — but they remain reachable by direct URL. Delete the folder to remove them entirely.
6. **TanStack Query, react-hook-form, and zod** are installed and (for Query) provider-mounted, but no query or resolver is defined.

---

## Contact

**Anish Shah**
- Email: anish.shah@mail.utoronto.ca
- LinkedIn: [linkedin.com/in/anish-shah422](https://linkedin.com/in/anish-shah422)
- GitHub: [github.com/Anish422](https://github.com/Anish422)
