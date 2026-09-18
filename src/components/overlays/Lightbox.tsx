import { useCallback, useEffect } from "react";

import { allPhotos } from "@/data/listing";
import { Close, LbNext, LbPrev } from "@/lib/icons";
import { iconBtn } from "@/lib/styles";
import type { LightboxIndexUpdate } from "@/types/listing";

interface LightboxProps {
  /** Position in `allPhotos`, or `null` when the viewer is closed. */
  index: number | null;
  onClose: () => void;
  setIndex: (update: LightboxIndexUpdate) => void;
}

const GridIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
  </svg>
);

/** Fades over .25s; visibility is held until the fade-out finishes. */
const lightboxBase =
  "fixed inset-0 z-[140] flex items-center justify-center bg-white " +
  "transition-[opacity,visibility] [transition-duration:.25s,0s] " +
  "[transition-timing-function:ease,linear]";

const gridBtn =
  "inline-flex size-10 items-center justify-center rounded-full border-none bg-transparent " +
  "transition-[background-color,scale] [transition-duration:.16s,.08s] " +
  "hover:bg-grey100 active:scale-90 [&_svg]:size-[18px]";

const navBtn =
  "absolute top-1/2 z-[3] flex size-10 -translate-y-1/2 items-center justify-center rounded-full " +
  "border border-ink bg-white enabled:hover:bg-grey100 active:scale-[.92] " +
  "disabled:cursor-default disabled:border-[#ccc] disabled:opacity-[.28]";

/**
 * Single-photo viewer with prev/next arrows and ←/→ keyboard navigation.
 * `index` is null when closed, otherwise the position in allPhotos.
 */
export default function Lightbox({ index, onClose, setIndex }: LightboxProps) {
  const open = index != null;
  const total = allPhotos.length;
  const atStart = index === 0;
  const atEnd = index === total - 1;

  const prev = useCallback(() => setIndex((i) => (i > 0 ? i - 1 : i)), [setIndex]);
  const next = useCallback(() => setIndex((i) => (i < total - 1 ? i + 1 : i)), [setIndex, total]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      else if (e.key === "Escape") { e.preventDefault(); onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prev, next, onClose]);

  const photo = index === null ? null : allPhotos[index];

  return (
    <div
      className={`${lightboxBase} ${
        open ? "visible opacity-100 [transition-delay:0s,0s]" : "invisible opacity-0 [transition-delay:0s,.25s]"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      aria-hidden={!open}
    >
      <div className="absolute inset-x-0 top-0 z-[3] flex h-[72px] items-center px-6">
        <button className={gridBtn} onClick={onClose} aria-label="Show all photos">
          <GridIcon />
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 text-base font-medium text-ink">
          {photo ? photo.category || "Exterior" : ""}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm font-normal text-ink">
            {index === null ? "" : `${index + 1} of ${total}`}
          </span>
          <button className={`${iconBtn} p-2`} onClick={onClose} aria-label="Close">
            <Close />
          </button>
        </div>
      </div>

      <button
        className={`${navBtn} left-5`}
        onClick={prev}
        disabled={atStart}
        aria-label="Previous photo"
      >
        <LbPrev className="size-4" />
      </button>

      <div className="flex size-full items-center justify-center px-24 py-22">
        {photo && (
          <img
            key={index}
            className="h-auto max-h-full w-auto max-w-[min(1100px,100%)] animate-lb-fade object-contain"
            src={photo.src}
            alt={photo.category || ""}
          />
        )}
      </div>

      <button
        className={`${navBtn} right-5`}
        onClick={next}
        disabled={atEnd}
        aria-label="Next photo"
      >
        <LbNext className="size-4" />
      </button>
    </div>
  );
}
