/**
 * Tailwind class composites for the patterns that repeat across components.
 *
 * These were single classes in the old stylesheet (`.container`, `.iconbtn`,
 * `.btn-reserve`, …). Keeping them in one place means the shared chrome stays
 * consistent; anything used in only one component is written inline there.
 */

/** Page gutter. 80px normally, 40px under the 1128px breakpoint. */
export const container = "mx-auto max-w-[1280px] px-20 max-[1128px]:px-10";

/** Vertical section rhythm with a hairline divider; the first one has none. */
export const section = "border-t border-line-soft py-8 first:border-t-0";

export const sectionTitle = "mb-6 text-2xl font-medium leading-[26px]";

/**
 * Round 40px icon button used in the overlay bars.
 *
 * Tailwind v4 emits `scale` as its own CSS property rather than folding it into
 * `transform`, so the transition lists below name `scale`, not `transform`.
 */
export const iconBtn =
  "inline-flex size-10 items-center justify-center rounded-full border-none bg-transparent " +
  "transition-[background-color,scale] [transition-duration:.16s,.08s] " +
  "hover:bg-grey200 active:scale-90 [&_svg]:size-[18px]";

/** Primary gradient CTA. */
export const btnReserve =
  "h-12 rounded-full border-none px-6 text-base font-medium text-white " +
  "bg-[image:var(--reserve)] transition-[filter,scale] [transition-duration:.15s,.05s] " +
  "hover:bg-[image:var(--reserve-hover)] active:scale-[.985]";

/** Condensed CTA for the sticky subnav. */
export const btnReserveSm = "h-10 px-5 text-sm";

/** Secondary outlined button ("Show all …"). */
export const btnOutline =
  "rounded-xl border border-ink bg-white px-[23px] py-[13px] text-base font-medium " +
  "transition-[background-color,scale] [transition-duration:.15s,.05s] " +
  "hover:bg-grey100 active:scale-[.98]";

/**
 * Underlined text button with an optional trailing chevron. Carries no margin
 * so callers set their own without fighting a utility conflict.
 */
export const linkBtn =
  "inline-flex items-center gap-1.5 border-none bg-transparent p-0 text-base " +
  "font-medium text-ink underline underline-offset-[3px] [&_svg]:size-3.5";

/** Hides the scrollbar on a horizontally scrolling track. */
export const noScrollbar = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

/**
 * Wider keyboard focus ring for large image targets. The base 2px/6px ring
 * comes from the `body.kbd :focus-visible` rule in globals.css; this only
 * pushes the offset out so it clears the image corners.
 */
export const focusOutset = "[body.kbd_&]:focus-visible:outline-offset-[3px]";
