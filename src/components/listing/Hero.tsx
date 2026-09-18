import { useState } from "react";

import { listing } from "@/data/listing";
import { Grid, Heart, Share } from "@/lib/icons";
import { focusOutset } from "@/lib/styles";

interface HeroProps {
  onOpenTour: () => void;
  onShare: () => void;
  onSave: (message: string) => void;
}

const textBtn =
  "inline-flex items-center gap-2 rounded-lg border-none bg-transparent px-2.5 py-2 text-sm " +
  "font-medium transition-[background-color,scale] [transition-duration:.15s,.05s] " +
  "hover:bg-grey200 active:scale-[.96]";

/** Listing title row + the 5-image hero grid. */
export default function Hero({ onOpenTour, onShare, onSave }: HeroProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const nextSaved = !saved;
    setSaved(nextSaved);
    onSave(nextSaved ? "Saved to wishlist" : "Removed from wishlist");
  }

  return (
    <>
      <div className="flex items-start justify-between gap-4 pb-[18px] pt-8">
        <h1 className="text-[26px] font-medium leading-[30px]">{listing.title}</h1>
        <div className="flex shrink-0 gap-0.5">
          <button className={textBtn} onClick={onShare}>
            <Share className="size-4" />
            <span className="underline underline-offset-2">Share</span>
          </button>
          <button className={textBtn} onClick={handleSave} aria-pressed={saved}>
            <Heart className={`size-4 ${saved ? "text-rausch" : ""}`} filled={saved} />
            <span className="underline underline-offset-2">Save</span>
          </button>
        </div>
      </div>

      <section className="relative mb-12" id="photos">
        <div className="grid aspect-[1120/494] grid-cols-[35fr_17fr_17fr] grid-rows-[1fr_1fr] gap-2 overflow-hidden rounded-xl">
          {listing.hero.map((src, i) => (
            <button
              key={src}
              className={`relative block overflow-hidden border-none bg-[#eee] p-0 first:row-span-2 after:absolute after:inset-0 after:bg-transparent after:transition-[background-color] after:duration-200 after:ease-[ease] after:content-[''] hover:after:bg-[#0000001a] active:scale-[.997] ${focusOutset}`}
              onClick={() => onOpenTour()}
              aria-label={`View photo ${i + 1} of the property`}
            >
              <img
                className="size-full object-cover transition-[filter] duration-200 ease-[ease]"
                src={src}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
              />
            </button>
          ))}
        </div>
        <button
          className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-lg border border-ink bg-white px-[15px] py-[7px] text-xs font-medium leading-4 shadow-[0_2px_8px_#00000026] transition-[scale,background-color] [transition-duration:.1s,.15s] hover:bg-grey100 active:scale-[.96]"
          onClick={() => onOpenTour()}
        >
          <Grid className="size-[15px]" />
          Show all photos
        </button>
      </section>
    </>
  );
}
