# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pixel-perfect clone of a single Airbnb listing detail page, built with Next.js 16 (**App Router**) + React 19 + TypeScript + Tailwind v4. No backend and no data fetching — the page is a static prerender of one hardcoded listing.

## Commands

```bash
npm install
npm run dev        # next dev (http://localhost:3000)
npm run build      # next build — also runs a full TypeScript check
npm start          # serve the production build
npm run lint       # oxlint (config in .oxlintrc.json)
npm run typecheck  # tsc --noEmit
```

There is no test suite/framework configured in this repo.

## Architecture

- **App Router, not Pages Router.** Routes live in [src/app/](src/app/): [src/app/page.tsx](src/app/page.tsx) is `/` and [src/app/payment/page.tsx](src/app/payment/page.tsx) is `/payment`. Do not add `src/pages/` — mixing routers here would be a regression.
- **[src/app/layout.tsx](src/app/layout.tsx) is the root layout**, a Server Component. It renders the `<html lang="en">` / `<body>` shell, imports [src/styles/globals.css](src/styles/globals.css) once, and exports the `metadata` (page title) and `viewport` objects. Metadata and viewport exports only work in Server Components, which is why they live here and not in `page.tsx`.
- **`src/app/page.tsx` is the state owner**, and carries `"use client"` for that reason. No Context/Redux. It holds all cross-cutting UI state (`tourOpen`, `lightboxIndex`, `amenitiesOpen`, `toast`) and passes callbacks down as props. The callbacks are wrapped in `useCallback` because child overlays list them in `useEffect` dependency arrays — dropping that would resubscribe their key listeners on every render.
- **Only `src/app/page.tsx` needs `"use client"`.** Everything it imports is pulled into the client bundle automatically, so the components under [src/components/](src/components/) carry no directive of their own. Add `"use client"` to a component only if a Server Component starts importing it directly.
- **Single source of truth for content**: [src/data/listing.ts](src/data/listing.ts) holds all listing copy and image paths as one object typed against [src/types/listing.ts](src/types/listing.ts). Components are presentational and read from it directly. To change displayed text or data, edit the data module, not a component.
- **Component grouping**: [src/components/layout/](src/components/layout/) (nav chrome), [src/components/listing/](src/components/listing/) (page sections), [src/components/overlays/](src/components/overlays/) (full-screen/modal layers). Import via the `@/*` alias, which maps to `src/*`.
- **Icon keys are typed unions.** `HighlightIconKey`, `AmenityIconKey` and `CategoryScoreIconKey` in [src/types/listing.ts](src/types/listing.ts) are the keys of `Record<…, IconComponent>` lookup maps in the consuming components. Adding a data entry with a new icon key is a type error rather than a silently blank icon — add the map entry too.
- **Overlay layering**: `PhotoTour` (opened from Hero's "show all photos") can open `Lightbox` on top of itself; `AmenitiesModal` is independent. `anyOverlay` in `page.tsx` toggles a `no-scroll` class on `<body>` to lock background scroll while any overlay is open.
- **Keyboard/focus handling**: a global `keydown`/`mousedown` listener in `page.tsx` toggles a `kbd` class on `<body>` so focus rings only show for keyboard users. `Lightbox` owns its `ArrowLeft`/`ArrowRight`/`Escape` bindings; `AmenitiesModal` owns its `Escape` binding.

## Conventions that exist for visual fidelity

These look like things worth "fixing". They are not — the whole point of the project is matching the reference exactly.

- **Plain `<img>`, never `next/image`.** The CSS in [src/styles/globals.css](src/styles/globals.css) targets bare `img` elements inside layout classes. `next/image` injects wrapper markup and its own sizing, which breaks the pixel-perfect grids. `nextjs/no-img-element` is off in the lint config for this reason.
- **Icons are raw SVG injected with `dangerouslySetInnerHTML`.** [src/lib/icons.tsx](src/lib/icons.tsx) carries ~46 Airbnb icons verbatim; the path data must not be reformatted or "optimised". `react/no-danger` is off for this reason.
- **Several a11y rules are off** in [.oxlintrc.json](.oxlintrc.json) (`anchor-is-valid`, `prefer-tag-over-role`, `click-events-have-key-events`, `no-static-element-interactions`). The clone uses placeholder `href="#"` links and `div` + `role="dialog"` + `aria-modal` overlays; switching to real `<dialog>` elements would change layout and animation behaviour. `react/only-export-components` is off as well, because App Router route files must export `metadata` and `viewport` alongside their component.
- **All component styling is Tailwind utilities in the JSX.** [src/styles/globals.css](src/styles/globals.css) is deliberately minimal and holds only what cannot be a utility: the `@theme` token block, `@font-face`, the `lb-fade` keyframes, element defaults (`html`, `body`, `button` cursor, `:focus`), the `body.no-scroll` / `body.kbd` classes that JS toggles on `<body>`, and the `prefers-reduced-motion` override. Do not grow it — put new styling in the components.
- **Use the theme tokens, not raw hex.** `@theme` publishes the palette as utilities: `bg-rausch`, `text-muted2`, `border-line-soft`, `shadow-card`, `ease-airbnb`, `animate-lb-fade`. Gradients stay plain vars and are applied as `bg-[image:var(--reserve)]`.
- **The text scale is pinned to `line-height: 1.43`** in `@theme` (`--text-sm--line-height` and friends). The original stylesheet set only `font-size` and let the unitless `1.43` on `body` inherit and recompute per element; Tailwind's named sizes normally ship their own line-height, which would shift every multi-line block. Pair a `text-*` with `leading-*` only where the original set an explicit line-height.
- **Tailwind v4 emits `translate`, `scale` and `rotate` as standalone CSS properties**, not folded into `transform`. So a transition must name the property actually animating — `transition-[opacity,translate,visibility]`, not `...,transform`. Getting this wrong silently kills the animation.
- **Keep each class name on one line.** Tailwind scans raw source text for candidates, so splitting a long arbitrary value across string concatenation (`"...bg-[image:linear-gradient(a," + "b)]"`) hides it from the scanner and the utility is never generated — with no error. The map gradients in [src/components/listing/Location.tsx](src/components/listing/Location.tsx) are the long ones.
- **Repeated composites live in [src/lib/styles.ts](src/lib/styles.ts)** (`container`, `section`, `iconBtn`, `btnReserve`, `btnOutline`, `linkBtn`, `noScrollbar`, `focusOutset`). These carry no margin, so callers can set their own without a utility conflict. Anything used in one place is written inline.
- **Responsive rules use `max-[1128px]:`.** The original had a single `@media (max-width: 1128px)` block; Tailwind is min-width-first, so the breakpoint is expressed as a max-width variant rather than restructuring the layout.
- [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx) exists but is intentionally not rendered — the reference page has no footer. The commented-out `{/* <Footer /> */}` in `src/app/page.tsx` is deliberate.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
