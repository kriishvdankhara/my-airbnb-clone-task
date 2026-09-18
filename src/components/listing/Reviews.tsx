import { useState } from "react";

import { listing } from "@/data/listing";
import type { IconComponent } from "@/lib/icons";
import {
  Star, ScCleanliness, ScAccuracy, ScCheckin, ScCommunication, ScLocation, ScValue,
} from "@/lib/icons";
import { btnOutline, container, noScrollbar } from "@/lib/styles";
import type { CategoryScoreIconKey, Review } from "@/types/listing";

const scoreIcons: Record<CategoryScoreIconKey, IconComponent> = {
  cleanliness: ScCleanliness, accuracy: ScAccuracy, checkin: ScCheckin,
  communication: ScCommunication, location: ScLocation, value: ScValue,
};

const ratingCol = "px-6 max-[1128px]:px-0 max-[1128px]:py-2.5";
const colHeading = "mb-3 text-sm font-medium";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="flex gap-px">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="size-2.5" />
      ))}
    </span>
  );
}

function ReviewCard({ r }: { r: Review }) {
  const [expanded, setExpanded] = useState(false);
  const long = r.text.length > 160;
  return (
    <div>
      <div className="mb-2.5 flex items-center gap-3">
        {r.avatar ? (
          <img
            className="size-[42px] rounded-full object-cover"
            src={r.avatar}
            alt={r.name}
            loading="lazy"
          />
        ) : (
          <span
            className="flex size-[42px] items-center justify-center rounded-full text-[17px] font-medium text-white"
            style={{ background: r.color, color: r.textColor || "#fff" }}
          >
            {r.letter}
          </span>
        )}
        <div>
          <div className="text-[15px] font-medium">{r.name}</div>
          <div className="text-[13px] text-muted2">{r.tenure}</div>
        </div>
      </div>
      <div className="mb-1.5 flex items-center gap-1.5 text-[13px]">
        <Stars />
        <span>·</span>
        <span>{r.date}</span>
      </div>
      <p
        className={`whitespace-pre-line text-[15px] leading-[1.4] ${
          long && !expanded ? "line-clamp-4" : ""
        }`}
      >
        {r.text}
      </p>
      {long && (
        <button
          className="mt-2 border-none bg-transparent p-0 text-[15px] font-medium underline"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

/** Full reviews section: score hero, rating breakdown, topics and review cards. */
export default function Reviews() {
  return (
    <div className="border-t border-line-soft" id="reviews">
      <div className={container}>
        <div className="pt-12">
          <div className="pb-10 pt-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <img className="h-[110px]" src="/images/laurel-left.png" alt="" />
              <span className="text-[100px] font-medium tracking-[-.03em]">{listing.rating}</span>
              <img className="h-[110px]" src="/images/laurel-right.png" alt="" />
            </div>
            <div className="mt-2 text-2xl font-medium">Guest favourite</div>
            <p className="mx-auto mt-2 max-w-[420px] text-[15px] leading-[1.35] text-ink">
              This home is a guest favourite based on ratings, reviews and reliability
            </p>
            <button className="mt-3.5 border-none bg-transparent text-sm font-medium underline">
              How reviews work
            </button>
          </div>

          <div className="grid grid-cols-[1.4fr_repeat(6,1fr)] pb-10 pt-2 max-[1128px]:grid-cols-2">
            <div className={`${ratingCol} pl-0`}>
              <div className={colHeading}>Overall rating</div>
              <div className="flex flex-col gap-[5px]">
                {listing.ratingBreakdown.map((b) => (
                  <div className="grid grid-cols-[8px_1fr] items-center gap-2.5" key={b.star}>
                    <span className="text-xs text-ink">{b.star}</span>
                    <span className="block h-1 overflow-hidden rounded-[2px] bg-line-soft">
                      <span
                        className="block h-full rounded-[2px] bg-ink"
                        style={{ width: `${b.pct}%` }}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {listing.categoryScores.map((c) => {
              const Icon = scoreIcons[c.icon];
              return (
                <div
                  className={`${ratingCol} border-l border-line max-[1128px]:border-l-0`}
                  key={c.label}
                >
                  <div className={colHeading}>{c.label}</div>
                  <div className="mb-3 text-lg font-medium">{c.score}</div>
                  <span className="block size-8 text-ink">
                    <Icon className="block size-8" />
                  </span>
                </div>
              );
            })}
          </div>

          <div className={`flex gap-3 overflow-x-auto pb-[30px] pt-1 ${noScrollbar}`}>
            {listing.reviewTopics.map((t) => (
              <div
                className="flex shrink-0 items-center gap-2 rounded-2xl border border-line bg-white py-[13px] pl-3.5 pr-[18px] text-sm font-medium"
                key={t.label}
              >
                <img className="size-5 shrink-0 object-contain" src={t.icon} alt="" />
                {t.label} <span className="font-normal text-muted2">{t.count}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-20 gap-y-12 pb-10 max-[1128px]:grid-cols-1 max-[1128px]:gap-[30px]">
            {listing.reviews.map((r) => (
              <ReviewCard key={r.name} r={r} />
            ))}
          </div>

          <button className={`${btnOutline} mb-12`}>Show all {listing.reviewCount} reviews</button>
        </div>
      </div>
    </div>
  );
}
