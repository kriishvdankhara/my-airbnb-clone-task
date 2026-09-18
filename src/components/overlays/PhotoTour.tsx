import { useEffect, useRef } from "react";

import { photoTour } from "@/data/listing";
import { Heart, Share, TourBack } from "@/lib/icons";
import { focusOutset, iconBtn } from "@/lib/styles";

interface PhotoTourProps {
  open: boolean;
  onClose: () => void;
  onOpenPhoto: (index: number) => void;
}

/**
 * Opacity and transform animate over .3s; visibility is instant on open but
 * delayed by .3s on close so the fade-out stays on screen.
 */
const tourBase =
  "fixed inset-0 z-[120] flex flex-col bg-white transition-[opacity,translate,visibility] " +
  "[transition-duration:.3s,.3s,0s] " +
  "[transition-timing-function:cubic-bezier(.2,0,0,1),cubic-bezier(.2,0,0,1),linear]";

const tourOpen = "visible translate-y-0 opacity-100 [transition-delay:0s,0s,0s]";
const tourClosed = "invisible translate-y-[28px] opacity-0 [transition-delay:0s,0s,.3s]";

const thumbImg =
  "aspect-[106/100] w-full rounded-lg object-cover transition-[scale,filter] " +
  "[transition-duration:.25s,.2s] " +
  "[transition-timing-function:cubic-bezier(.2,0,0,1),ease] " +
  "group-hover:scale-[1.04] group-hover:brightness-[.94] group-active:scale-[.99]";

const tourPhoto =
  "group relative block aspect-[3/2] w-full overflow-hidden rounded-lg border-none bg-[#eee] p-0 " +
  "after:absolute after:inset-0 after:bg-transparent after:transition-[background-color] " +
  "after:duration-200 after:content-[''] hover:after:bg-[#00000014]";

// Group a category's photos into rows following its layout pattern (1 = full, 2 = pair).
function buildRows(photos: string[], pattern: number[]) {
  const rows: string[][] = [];
  let i = 0;
  let p = 0;
  while (i < photos.length) {
    const size = pattern[p] ?? 2; // default to pairs once the pattern is exhausted
    const chunk = photos.slice(i, i + size);
    rows.push(chunk);
    i += chunk.length;
    p++;
  }
  return rows;
}

// Each category's start index in the flat allPhotos list, so a photo's position
// there can be derived from its position within its category.
const catOffsets: number[] = [];
for (let i = 0, running = 0; i < photoTour.length; i++) {
  catOffsets.push(running);
  running += photoTour[i].photos.length;
}

/**
 * Full-screen photo tour. `startIndex` for each photo is its position in the
 * flat allPhotos list, so the lightbox can continue prev/next seamlessly.
 */
export default function PhotoTour({ open, onClose, onOpenPhoto }: PhotoTourProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const catRefs = useRef<Record<string, HTMLElement | null>>({});

  // Reset scroll to top whenever the tour opens.
  useEffect(() => {
    if (open && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [open]);

  const scrollToCat = (id: string) => {
    const el = catRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className={`${tourBase} ${open ? tourOpen : tourClosed}`}
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      aria-hidden={!open}
    >
      <div className="z-[5] flex h-22 shrink-0 items-center bg-white px-8">
        <button className={`${iconBtn} -ml-2`} onClick={onClose} aria-label="Close photo tour">
          <TourBack />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 text-base font-medium">Photo tour</div>
        <div className="ml-auto flex gap-0.5">
          <button className={iconBtn} aria-label="Share">
            <Share />
          </button>
          <button className={iconBtn} aria-label="Save">
            <Heart />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto" ref={scrollRef}>
        <div className="mx-auto max-w-[1024px] px-6 pb-24">
          {/* Category thumbnail navigation */}
          <div className="mb-10 grid grid-cols-8 gap-3 max-[1128px]:grid-cols-4">
            {photoTour.map((c) => (
              <button
                key={c.id}
                className={`group flex flex-col gap-2 border-none bg-transparent p-0 text-left ${focusOutset}`}
                onClick={() => scrollToCat(c.id)}
              >
                <img className={thumbImg} src={c.photos[0]} alt="" loading="lazy" />
                <small className="text-sm text-muted2">{c.title}</small>
              </button>
            ))}
          </div>

          {/* Category sections */}
          {photoTour.map((c, ci) => {
            const rows = buildRows(c.photos, c.rows);
            let local = 0;
            return (
              <section
                className="grid grid-cols-2 items-start gap-x-[60px] gap-y-5 pb-1 pt-4 max-[1128px]:grid-cols-1"
                key={c.id}
                ref={(el) => {
                  catRefs.current[c.id] = el;
                }}
              >
                <div className="sticky top-5 max-[1128px]:static">
                  <h2 className="text-[32px] font-medium leading-[1.1] tracking-[-.02em]">
                    {c.title}
                  </h2>
                  {c.subtitle && <p className="mt-2 text-base leading-[1.4] text-muted2">{c.subtitle}</p>}
                </div>
                <div className="flex flex-col gap-3">
                  {rows.map((row, ri) => (
                    <div
                      className={`grid gap-3 ${row.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
                      key={ri}
                    >
                      {row.map((src) => {
                        const globalIndex = catOffsets[ci] + local++;
                        return (
                          <button
                            className={`${tourPhoto} ${focusOutset}`}
                            key={src}
                            onClick={() => onOpenPhoto(globalIndex)}
                            aria-label={`Open photo ${globalIndex + 1}`}
                          >
                            <img
                              className="size-full object-cover transition-transform duration-[.4s] ease-airbnb group-hover:scale-[1.04] group-active:scale-100"
                              src={src}
                              alt=""
                              loading="lazy"
                            />
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
