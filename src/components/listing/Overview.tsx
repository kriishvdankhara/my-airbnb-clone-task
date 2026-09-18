import { useState } from "react";

import { listing } from "@/data/listing";
import type { IconComponent } from "@/lib/icons";
import { Star, ChevronDown, ChevronUp, HiOutdoor, HiCool, HiKey, Laurel } from "@/lib/icons";
import { linkBtn } from "@/lib/styles";
import type { HighlightIconKey } from "@/types/listing";

const highlightIcons: Record<HighlightIconKey, IconComponent> = {
  outdoor: HiOutdoor,
  cool: HiCool,
  key: HiKey,
};

const clamped =
  "max-h-[6.2em] overflow-hidden [-webkit-mask-image:linear-gradient(#000_62%,transparent)] " +
  "[mask-image:linear-gradient(#000_62%,transparent)]";

/** Subtitle, Guest favourite card, host row, highlights and description. */
export default function Overview() {
  const [expanded, setExpanded] = useState(false);
  const h = listing.host;

  return (
    <div className="pb-8">
      <div className="pb-6">
        <h2 className="text-2xl font-medium leading-[26px]">{listing.subtitle}</h2>
        <div className="mt-1.5 text-base">{listing.specs}</div>
      </div>

      {/* Guest favourite */}
      <div className="mt-2 flex items-center gap-[22px] rounded-2xl border border-line px-7 py-4">
        <div className="flex shrink-0 items-center gap-1 text-ink">
          <span className="inline-flex h-9 items-center">
            <Laurel className="block h-9 w-auto" />
          </span>
          <span className="text-center text-[15px] font-medium leading-[1.15]">
            Guest
            <br />
            favourite
          </span>
          <span className="inline-flex h-9 -scale-x-100 items-center">
            <Laurel className="block h-9 w-auto" />
          </span>
        </div>
        <div className="flex-1 text-sm leading-[1.3]">
          One of the most loved homes on Airbnb, according to guests
        </div>
        <div className="flex shrink-0 items-center gap-[22px]">
          <div className="text-center">
            <b className="block text-xl font-bold">{listing.rating}</b>
            <span className="mt-0.5 flex justify-center gap-0.5 text-ink">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-2.5" />
              ))}
            </span>
          </div>
          <span className="h-[34px] w-px bg-line" />
          <div className="text-center">
            <b className="block text-xl font-bold">{listing.reviewCount}</b>
            <small className="mt-0.5 block text-xs font-medium leading-none">Reviews</small>
          </div>
        </div>
      </div>

      {/* Host row */}
      <div className="flex items-center gap-4 py-[26px]">
        <img className="size-[46px] rounded-full object-cover" src={h.avatar} alt={h.name} />
        <div>
          <b className="text-base font-medium">Hosted by {h.name}</b>
          <div className="mt-0.5 text-sm text-muted2">{h.tenure}</div>
        </div>
      </div>

      {/* Highlights */}
      <div className="flex flex-col gap-6 pb-8 pt-1.5">
        {listing.highlights.map((hl) => {
          const Icon = highlightIcons[hl.icon];
          return (
            <div className="flex items-start gap-6" key={hl.title}>
              <span className="size-6 shrink-0 text-ink">
                <Icon className="block size-full" />
              </span>
              <div>
                <b className="text-sm font-medium leading-5">{hl.title}</b>
                <p className="mt-0.5 text-sm text-muted2">{hl.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Description */}
      <div className="pb-8 pt-[26px]">
        <div className="mb-2 flex items-center gap-2.5 rounded-xl bg-grey100 px-[18px] py-4 text-sm text-ink">
          <span>
            Some info has been automatically translated.{" "}
            <a className="font-medium underline" href="#">
              Show original
            </a>
          </span>
        </div>
        <p className={`whitespace-pre-line text-base leading-[1.5] ${expanded ? "" : clamped}`}>
          {listing.description}
        </p>
        <button className={`${linkBtn} mt-3.5`} onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Show less" : "Show more"}
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
    </div>
  );
}
