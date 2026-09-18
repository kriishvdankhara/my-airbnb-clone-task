playpower_assignment-main/
├── src/
│   ├── app/                        ← Next.js App Router: folder path = URL route
│   │   ├── layout.tsx                 Root layout (Server Component). The <html>/<body> shell with
│   │   │                              lang="en", imports globals.css once, and exports the
│   │   │                              `metadata` (page title) and `viewport` objects.
│   │   ├── page.tsx                   Route "/" — THE page. A Client Component ("use client")
│   │   │                              because it owns all overlay state (tourOpen, lightboxIndex,
│   │   │                              amenitiesOpen, toast). Renders every section + overlay in
│   │   │                              order, passing callbacks down as props.
│   │   └── payment/
│   │       └── page.tsx               Route "/payment" — Server Component, no client state.
│   │
│   ├── components/
│   │   ├── layout/                 ← Chrome that isn't listing content
│   │   │   ├── Header.tsx             Top nav bar + the sticky subnav that fades in on scroll
│   │   │   └── Footer.tsx             Exists but deliberately unused (reference has no footer)
│   │   │
│   │   ├── listing/                ← The 11 sections that make up the page body, in render order
│   │   │   ├── Hero.tsx               Title row + 5-photo grid + "Show all photos"
│   │   │   ├── Overview.tsx           Subtitle, Guest favourite card, host row, highlights, description
│   │   │   ├── Sleep.tsx              "Where you'll sleep" cards
│   │   │   ├── Amenities.tsx          First-10 amenities grid + "Show all" button
│   │   │   ├── Calendar.tsx           Two-month availability calendar
│   │   │   ├── BookingCard.tsx        Sticky right-column price/reserve card
│   │   │   ├── Reviews.tsx            Rating hero, category scores, topics, review cards
│   │   │   ├── Location.tsx           Stylised map + neighbourhood text
│   │   │   ├── Host.tsx               Host profile card + co-hosts
│   │   │   ├── ThingsToKnow.tsx       Cancellation/rules/safety 3-column
│   │   │   └── MoreStays.tsx          Horizontal carousel of other listings
│   │   │
│   │   └── overlays/                ← Full-screen/modal layers, stacked on top of everything
│   │       ├── PhotoTour.tsx           Full-screen photo browser (9 categories, 43 photos)
│   │       ├── Lightbox.tsx            Single-photo viewer, nests inside PhotoTour
│   │       └── AmenitiesModal.tsx      "Show all 50 amenities" modal
│   │
│   ├── data/
│   │   └── listing.ts              ← ALL content lives here: one big `listing` object (title,
│   │                                  price, host, reviews, amenities, etc.), plus `photoTour`
│   │                                  (photo categories) and `allPhotos` (flat list for the
│   │                                  lightbox's prev/next) and `amenityIconMap` (label → icon name).
│   │                                  Components never hardcode text — they read from here.
│   │
│   ├── types/
│   │   └── listing.ts              ← TypeScript interfaces for everything in data/listing.ts.
│   │                                  Icon keys (HighlightIconKey, AmenityIconKey, etc.) are typed
│   │                                  unions, so adding a data entry with an unmapped icon is a
│   │                                  compile error, not a blank icon at runtime.
│   │
│   ├── lib/
│   │   ├── icons.tsx                  ~46 Airbnb SVG icons, one component each, raw path data
│   │   └── styles.ts                  Shared Tailwind class strings used by 2+ components
│   │                                  (container, section, iconBtn, btnReserve, btnOutline, linkBtn)
│   │
│   └── styles/
│       └── globals.css             ← Deliberately tiny (~124 lines). Only: @theme tokens (colors,
│                                      font, shadow, easing), @font-face, keyframes, and element
│                                      defaults / body classes that JS toggles (no-scroll, kbd).
│                                      No component styling lives here — that's all Tailwind
│                                      utility classes written directly in the .tsx files.
│
├── public/
│   ├── images/                     71 property photos + a few UI icons (searchbar, discount badge)
│   └── logo/logo.svg
│
├── next.config.ts                  Security headers (X-Frame-Options etc.)
├── postcss.config.mjs              Wires @tailwindcss/postcss into the build
├── tsconfig.json                   strict TS, @/* → src/* path alias
├── .oxlintrc.json                  Linter config + the a11y/img rules turned off on purpose
├── package.json                    dev / build / start / lint / typecheck scripts
├── CLAUDE.md                       Architecture notes for AI agents working in this repo
└── README.md                       Human-facing project overview