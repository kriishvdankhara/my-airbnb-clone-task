import { useRef, useState } from "react";

import { listing } from "@/data/listing";
import { ChevronLeft, ChevronRight, Star } from "@/lib/icons";
import { noScrollbar, section } from "@/lib/styles";

const navBtn =
  "flex size-8 items-center justify-center rounded-full border border-[#b0b0b0] bg-white disabled:opacity-30";

/** Five cards per page normally, three under the 1128px breakpoint. */
const card =
  "min-w-0 flex-[0_0_calc((100%_-_80px)/5)] max-[1128px]:flex-[0_0_calc((100%_-_40px)/3)]";

/** "More stays nearby" horizontal carousel. */
export default function MoreStays() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(listing.moreStays.length / 5);

  const updatePage = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setPage(1);
      return;
    }
    const currPage = Math.round((el.scrollLeft / maxScroll) * (totalPages - 1)) + 1;
    setPage(Math.min(totalPages, Math.max(1, currPage)));
  };

  const scrollToPage = (targetPage: number) => {
    const el = trackRef.current;
    if (!el) return;
    const validPage = Math.min(totalPages, Math.max(1, targetPage));
    const maxScroll = el.scrollWidth - el.clientWidth;
    const scrollAmount = (maxScroll * (validPage - 1)) / (totalPages - 1);
    el.scrollTo({ left: scrollAmount, behavior: "smooth" });
    setPage(validPage);
  };

  return (
    <div className={section}>
      <div className="mb-5 flex items-center justify-between">
        <b className="text-2xl font-medium">More stays nearby</b>
        <div className="flex items-center gap-2">
          <span className="mr-1.5 text-sm text-muted2">
            {page} / {totalPages}
          </span>
          <button
            className={navBtn}
            onClick={() => scrollToPage(page - 1)}
            disabled={page === 1}
            aria-label="Previous"
          >
            <ChevronLeft className="size-3" />
          </button>
          <button
            className={navBtn}
            onClick={() => scrollToPage(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next"
          >
            <ChevronRight className="size-3" />
          </button>
        </div>
      </div>
      <div
        className={`flex gap-5 overflow-x-auto scroll-smooth pb-1 ${noScrollbar}`}
        ref={trackRef}
        onScroll={updatePage}
      >
        {listing.moreStays.map((s) => (
          <a
            className={card}
            key={s.title}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <img
              className="aspect-square w-full rounded-xl object-cover"
              src={s.img}
              alt={s.title}
              loading="lazy"
            />
            <b className="mt-2 line-clamp-2 text-ellipsis text-sm font-medium">{s.title}</b>
            <div className="mt-1 text-[13px]">
              {s.price} · <Star className="inline-block size-2.5 [vertical-align:-1px]" /> {s.rating}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
