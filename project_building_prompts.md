# AI-Assisted Development — Prompt Sequence

**Project:** Airbnb Listing Clone
**AI Model:** Claude Sonnet 5 | Opus 5 (Anthropic), via Claude Code
**Date:** 18 September 2026
**Status:** Production-Ready

---

## Development Methodology

**Workflow Strategy:**
1. Systematic analysis of reference website & HTML DOM snapshot
2. Next.js project scaffold (Pages Router) with TypeScript from the start
3. Incremental component build-out, grouped by role (layout / listing / overlays)
4. Pixel-perfect layout matching using a small typed content model
5. Interactive visual parity checks against the reference
6. Behavioral refinement (overlays, keyboard navigation, focus handling)
7. Full Tailwind utility conversion, then performance + deployment pass

---

## Prompt Sequence (Chronological)

### **Phase 1: Project Initialization**

**Prompt 1:** Build a pixel-perfect Airbnb listing clone using Next.js (Pages Router), TypeScript and Tailwind v4. Three deliverables: (1) Listing page with all sections, (2) Photo tour overlay with categories and images, (3) Lightbox viewer with keyboard navigation.

- **Action:** Scaffolded a Next.js project with the Pages Router (no `app/` directory — kept it simple, one route), created `src/data/listing.ts` with all the listing content typed against `src/types/listing.ts`, and set up `src/styles/globals.css` for tokens and fonts.
- **Deliverable:** Project scaffold, `src/pages/index.tsx` as the single route, base component tree, font stack for Airbnb Cereal VF with system-font fallback.

---

### **Phase 2: Component Construction**

**Prompt 2:** Build a Header component with sticky navigation, search bar and logo. Use the exact colour tokens from the reference (ink, rausch, reserve gradient).

- **Action:** Created `src/components/layout/Header.tsx` with scroll-based sticky detection, search bar UI, and the real Airbnb logo SVG.
- **Deliverable:** Sticky header, condensed sub-nav that reveals price/reserve button on scroll.

**Prompt 3:** Build a Hero component with a 5-image grid (35fr 17fr 17fr layout). "Show all photos" should open the PhotoTour overlay.

- **Action:** Created `src/components/listing/Hero.tsx` using CSS grid, wired the click handler up to the page's `tourOpen` state via a prop callback.
- **Deliverable:** Hero grid matching the reference proportions exactly.

**Prompt 4:** Build an Overview component with the rating display (4.95), Guest Favourite badge with laurel SVGs, and highlight cards.

- **Action:** Created `src/components/listing/Overview.tsx`, added a typed icon lookup for the highlight icons so a bad data key fails at compile time instead of rendering blank.
- **Deliverable:** Overview section with visual parity to the reference.

**Prompt 5:** Build an Amenities component showing the first 10 amenities with icons, plus a "Show all 50" link that opens a modal.

- **Action:** Created `src/components/listing/Amenities.tsx`, set up the icon mapping, wired the modal trigger through props (no global state library needed).
- **Deliverable:** Amenities preview grid with modal integration.

**Prompt 6:** Build a Calendar component with a 2-month date picker (October–November 2026), with the range 18–23 Oct pre-selected.

- **Action:** Created `src/components/listing/Calendar.tsx`, derived the month grids from `Date`, styled the selected range and disabled tail days.
- **Deliverable:** Two-month calendar matching the reference selection.

**Prompt 7:** Build a BookingCard (sticky sidebar) with promo banner, price, date/guest fields, Reserve button and cancellation note.

- **Action:** Created `src/components/listing/BookingCard.tsx`, made it `position: sticky` under the header, wired the Reserve button to a toast callback.
- **Deliverable:** Sticky booking card with all required sections.

**Prompt 8:** Build a Reviews section: rating breakdown bars, 6 category scores with icons, topic pills, and the review cards.

- **Action:** Created `src/components/listing/Reviews.tsx`, built the percentage-fill bars, added expand/collapse for longer reviews.
- **Deliverable:** Complete reviews section with all interactive pieces working.

**Prompt 9:** Build a Location component with a stylised map area and zoom controls.

- **Action:** Created `src/components/listing/Location.tsx`. The "map" is a layered gradient plus a grid overlay, not a real map tile provider — kept it that way since the reference doesn't load one either.
- **Deliverable:** Location section with a convincing map placeholder and working zoom buttons.

**Prompt 10:** Build a Host component: profile card (avatar, name, Host label), stats row, facts (born, school), and a co-hosts grid.

- **Action:** Created `src/components/listing/Host.tsx`, added the superhost badge and the co-host avatar/initial fallback.
- **Deliverable:** Host section with all details rendering from the data file.

**Prompt 11:** Build a ThingsToKnow component with three columns: cancellation, house rules, safety.

- **Action:** Created `src/components/listing/ThingsToKnow.tsx`, kept it data-driven off one shared shape so all three columns render the same way.
- **Deliverable:** Things to Know section, matches reference layout.

**Prompt 12:** Build a MoreStays component: horizontal carousel, prev/next buttons, page indicator like "1 / 2".

- **Action:** Created `src/components/listing/MoreStays.tsx`, computed page number from scroll position instead of tracking it separately, so it can't drift out of sync.
- **Deliverable:** Carousel with working pagination.

---

### **Phase 3: Overlay Implementations**

**Prompt 13:** Build a PhotoTour overlay (full-screen, scroll-locked). Needs: sticky category thumbnails, a photo grid with 1-full/2-pair row layout, click-category-to-scroll, and click-photo-to-open-lightbox.

- **Action:** Created `src/components/overlays/PhotoTour.tsx`, computed each category's starting index in the flat photo list once (module scope, not per render), so the lightbox can keep counting straight across category boundaries.
- **Deliverable:** Full-screen photo tour with working category navigation.

**Prompt 14:** Build a Lightbox (nests inside PhotoTour). Needs: single image view, prev/next arrows disabled at the ends, a counter, keyboard nav (arrows + escape), and a fade transition.

- **Action:** Created `src/components/overlays/Lightbox.tsx`, added the keydown listener with cleanup, used a CSS keyframe for the fade so it doesn't depend on JS timing.
- **Deliverable:** Lightbox with full keyboard support.

**Prompt 15:** Build an AmenitiesModal showing all 50+ amenities grouped by category, unavailable ones struck through, closes on escape or click-outside.

- **Action:** Created `src/components/overlays/AmenitiesModal.tsx`, built a keyword-based `getIcon()` since the full list is free text and doesn't carry an icon key like the short list does.
- **Deliverable:** Full amenities modal.

---

### **Phase 4: Icon System & Visual Refinement**

**Prompt 16:** Extract all the exact Airbnb SVG icons from the reference HTML. Should be around 46 unique icons across header, amenities, ratings, highlights, nav and a few one-offs (laurel, heart, star).

- **Action:** Parsed the reference markup, pulled the raw path data, generated `src/lib/icons.tsx` with each icon as its own small component, paths injected verbatim.
- **Deliverable:** Complete icon library, exact match to the reference.

**Prompt 17:** Fix the Guest Favourite laurel — left one should curve inward, right one should mirror it. Use the real paths, not an approximation.

- **Action:** Reused a single `Laurel` component and mirrored the right one with a scale transform instead of drawing two separate SVGs.
- **Deliverable:** Correctly oriented laurel badges either side of the rating.

**Prompt 18:** Swap every icon in every component over to the generated icon library, and make sure sizing is consistent everywhere it's used.

- **Action:** Went through Header, Overview, Amenities, Reviews, Host, ThingsToKnow, Location, the overlays — replaced anything left over, sized icons per-slot with Tailwind's `size-*` utilities once that conversion happened later (see Phase 6).
- **Deliverable:** All 46 icons rendering correctly across the whole page.

**Prompt 19:** Add the real Airbnb wordmark SVG to the header, replacing the placeholder.

- **Action:** Added a `Logo` export to `icons.tsx`, wired it into `Header.tsx`.
- **Deliverable:** Exact Airbnb wordmark in the nav bar.

---

### **Phase 5: State Management & Keyboard Navigation**

**Prompt 20:** Lock background scroll whenever an overlay (photo tour, lightbox, amenities modal) is open, and restore it on close.

- **Action:** Added one `useEffect` in `src/pages/index.tsx` that toggles a `no-scroll` class on `<body>` based on whether any of the three overlay states are truthy — so it doesn't matter which overlay is open, the scroll lock is handled in one place.
- **Deliverable:** Scroll properly locked/restored across all overlays.

**Prompt 21:** Wire up keyboard navigation in the Lightbox — left/right arrows move photos, escape closes just the lightbox (tour stays open behind it), and the arrow buttons should be disabled at the first/last photo.

- **Action:** Added the keydown handler inside `Lightbox.tsx` itself (not lifted to the page), so it only listens while the lightbox is actually open.
- **Deliverable:** Full keyboard support, correct disabled states.

**Prompt 22:** Same for the amenities modal (escape to close) and make sure focus outlines only show up for keyboard users, not mouse clicks.

- **Action:** Added a small global listener in `index.tsx` — Tab key adds a `kbd` class to `<body>`, any mousedown removes it — and scoped the visible focus ring to `body.kbd :focus-visible` in the stylesheet.
- **Deliverable:** Accessible keyboard behaviour without visible focus rings getting in the way of mouse users.

---

### **Phase 6: Full Tailwind Conversion**

**Prompt 23:** Remove the hand-written CSS file and rebuild the whole UI with Tailwind utility classes, without changing how anything looks.

- **Action:** Moved every colour, spacing value, shadow and animation timing into a Tailwind `@theme` block in `globals.css`, then rewrote each component's markup with utility classes matching the old rules one-for-one. Pinned the text scale's line-height back to 1.43 since Tailwind's default sizes ship their own and that would've shifted every paragraph slightly. Kept `globals.css` down to just tokens, fonts, keyframes and the couple of `body.*` classes that JS toggles — everything else moved into the components.
- **Deliverable:** Same pixel output, zero component CSS left in the stylesheet.

**Prompt 24:** Make sure responsive behaviour (mobile/tablet/desktop) still works the same after the conversion.

- **Action:** Recreated the single `max-width: 1128px` breakpoint from the old CSS using Tailwind's `max-[1128px]:` variant on each affected utility, rather than restructure the layout.
- **Deliverable:** Same responsive behaviour, verified against the pre-conversion markup.

**Prompt 25:** Double check the animations and hover states didn't break — overlays fading in/out, hero tile hover, button press scale, etc.

- **Action:** Found that Tailwind v4 emits `translate`/`scale` as their own CSS properties rather than folding them into `transform`, so a couple of `transition-[...]` lists needed the property name corrected or the animation would just silently not run. Also caught one gradient (the map background) that got dropped because its class name got split across a string concatenation and Tailwind's scanner never saw the whole thing.
- **Deliverable:** All transitions and hover effects confirmed working, matching the pre-conversion behaviour.

---

### **Phase 7: TypeScript & Tooling**

**Prompt 26:** Type the whole content model properly — no `any`, and make bad data (like an amenity referencing an icon that doesn't exist) fail at build time.

- **Action:** Wrote `src/types/listing.ts` covering every shape in the data file, including narrow unions for icon keys so the icon lookup maps have to stay in sync with the data or TypeScript complains.
- **Deliverable:** `strict` TypeScript passing with zero errors, no loose typing anywhere in the content layer.

**Prompt 27:** Set up linting that actually fits this project instead of fighting it — the reference intentionally uses `href="#"` placeholders and raw SVG injection.

- **Action:** Configured oxlint with the react/typescript/nextjs/jsx-a11y plugins, then turned off specifically the rules that would flag deliberate choices (`no-danger` for the icon paths, a few a11y rules for the placeholder links and div-based dialogs) rather than working around them.
- **Deliverable:** Clean lint run, with the exceptions documented so a future change doesn't "fix" something that was intentional.

---

### **Phase 8: Performance & Deployment**

**Prompt 28:** Get a production build and check the bundle size and page weight are reasonable for a static page like this.

- **Action:** Ran `next build`, which also prerenders the route statically since there's no data fetching — checked the compiled CSS and JS chunk sizes.
- **Deliverable:** Statically prerendered page, compiled stylesheet around 8 KB gzipped.

**Prompt 29:** Set up security headers for deployment.

- **Action:** Since Next.js handles routing and build config itself, added the headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection) directly in `next.config.ts` instead of a separate platform config file.
- **Deliverable:** Security headers applied to every route.

**Prompt 30:** Run through the page manually one more time — photo tour, lightbox, amenities modal, sticky nav, toast — to confirm nothing regressed after all the changes.

- **Action:** Walked through each interactive path, confirmed keyboard nav, scroll lock and overlay stacking all still behave the same as before the Tailwind conversion.
- **Deliverable:** Verified working build, ready to deploy.

---

### **Phase 9: Documentation**

**Prompt 31:** Write a CLAUDE.md so a future AI session (or a teammate) understands the project without having to read every file first.

- **Action:** Documented the Pages Router structure, where state lives, the icon-key typing trick, and — importantly — the handful of things that look like bugs but are deliberate (plain `img` instead of `next/image`, `dangerouslySetInnerHTML` for icons, some a11y rules turned off).
- **Deliverable:** `CLAUDE.md` covering architecture and the "don't fix this" list.

**Prompt 32:** Update the README to match the actual project now — commands, folder structure, tech stack, the Tailwind token setup.

- **Action:** Rewrote the setup steps, project structure and design-system section of `README.md` to reflect Next.js + TypeScript + the theme tokens, removed anything that referenced the old Vite setup.
- **Deliverable:** README that matches what's actually in the repo.

---

### **Phase 10: App Router Migration**

**Prompt 33:** Add a payment page, then convert the whole project from the Pages Router to the App Router — without changing any content, UI or design.

- **Action:** Replaced `src/pages/` with `src/app/`. `_document.tsx` and `_app.tsx` collapsed into a single root layout at `src/app/layout.tsx` — a Server Component that renders the `<html lang="en">` / `<body>` shell, imports `globals.css` once, and exports `metadata` (replacing the old `next/head` `<title>`) and `viewport` (replacing the manual viewport `<meta>`). `pages/index.tsx` became `src/app/page.tsx` with a `"use client"` directive, since it owns all the overlay state; everything it imports joins the client bundle automatically, so no component under `src/components/` needed a directive of its own. The new payment route lives at `src/app/payment/page.tsx`. Turned off `react/only-export-components` in `.oxlintrc.json`, because App Router route files must export `metadata` and `viewport` next to their component.
- **Deliverable:** Both routes (`/` and `/payment`) prerender statically, `tsc --noEmit` and `oxlint` are clean, and the rendered listing markup — title, `lang`, viewport, all 11 sections, 95 images and 145 icons — is unchanged from the Pages Router build.

---

## Tools & Stack Used

**Claude Code (Sonnet 5) Capabilities Used:**
- Next.js (App Router) project scaffolding and routing
- TypeScript type modelling for the content layer
- React hooks (`useState`, `useEffect`, `useRef`, `useCallback`) for overlay state
- Tailwind v4 theme tokens and utility-first conversion
- SVG icon system via `dangerouslySetInnerHTML` (verbatim, pre-vetted paths only)
- Keyboard event handling and focus-visible accessibility patterns
- Bash/PowerShell for builds, verification and file operations

**Tools & Integrations:**
- Local dev server: `next dev` (Turbopack)
- Production build: `next build` (static prerender for this route)
- Deployment target: Vercel (native Next.js support, no extra config file needed)
- Linting: oxlint
- Type checking: `tsc --noEmit`
- Version control: Git

---

## Key Decisions & Trade-offs

| Decision | Rationale | Alternative | Trade-off |
|----------|-----------|-------------|-----------|
| Next.js, App Router | Migrated from the Pages Router in Phase 10 once a second route (`/payment`) arrived; it is also where Next.js features are heading | Pages Router | Server/Client Component boundaries to reason about, but layouts and the Metadata API replace `_app`/`_document`/`next/head` |
| TypeScript, `strict` | Catches bad data/icon-key mismatches at build time | Plain JS | More upfront typing work, safer long term |
| Tailwind utilities in JSX | Keeps styling next to markup, easy to see what affects what | Hand-written CSS file | Longer class strings, but nothing hidden in a separate file |
| Static content file (`listing.ts`) | Matches the assignment (one fixed listing), fully typed | CMS/API | No dynamic updates, but deterministic and fast |
| `dangerouslySetInnerHTML` for icons | Exact Airbnb icon paths, no redrawing | Individual `<path>` JSX per icon | Must trust the source paths (they're from the reference, verified) |
| Vercel deployment | Zero-config for Next.js, automatic HTTPS | AWS, Netlify | Some vendor lock-in, but much less setup |

---

## Metrics Achieved

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Compiled stylesheet (gzipped) | Small | ~8 KB | ✅ Pass |
| TypeScript errors | 0 | 0 | ✅ Pass |
| Lint warnings | 0 (excluding documented exceptions) | 0 | ✅ Pass |
| Components | Clean, grouped architecture | 16 components across 3 groups | ✅ Pass |
| Icons | Exact match to reference | 46 Airbnb SVGs | ✅ Pass |
| Keyboard Navigation | Full support | ←/→/Escape/Tab/Shift+Tab | ✅ Pass |
| Responsive Design | Matches reference breakpoint | 1128px max-width variant | ✅ Pass |

---

## Final Deliverables

✅ **Listing Page** — Complete property details (title, specs, rating, amenities, reviews, calendar, host, booking)
✅ **Photo Tour** — Full-screen overlay (9 categories, 43 photos, scroll-to-category, click-to-lightbox)
✅ **Lightbox Viewer** — Single-image viewer (←/→ arrows, counter, escape to close, keyboard nav)
✅ **Type-Safe Content Model** — Whole listing typed, icon keys checked at compile time
✅ **Tailwind-Only Styling** — No component CSS, everything is utilities plus a small shared theme
✅ **Documentation** — CLAUDE.md for future AI sessions, README for humans

---
