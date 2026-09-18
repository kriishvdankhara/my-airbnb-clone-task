import { useEffect, useState } from "react";

import { listing } from "@/data/listing";
import { Globe, Logo, Menu, SearchGo } from "@/lib/icons";
import { btnReserve, btnReserveSm } from "@/lib/styles";

interface ReserveHandler {
  onReserve: () => void;
}

const navLinks = [
  { id: "photos", label: "Photos" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
];

const searchSeg =
  "inline-flex h-12 items-center gap-2 rounded-[40px] border-none bg-transparent px-4 text-sm font-medium";

const navIcon =
  "inline-flex size-10 items-center justify-center rounded-full border-none bg-grey200 text-ink " +
  "transition-[background-color] duration-[.18s] hover:bg-grey300";

/** Main top navigation bar. */
function TopBar() {
  return (
    <header className="relative z-50 border-b border-line-soft bg-white px-20">
      <div className="mx-auto grid h-22 max-w-[1760px] grid-cols-[1fr_auto_1fr] items-center">
        <a
          className="inline-flex items-center justify-self-start text-rausch"
          href="#"
          aria-label="Airbnb home"
        >
          <Logo className="block h-8 w-auto" />
        </a>

        <div
          className="inline-flex h-12 items-center justify-self-center rounded-[40px] border border-line bg-white px-2 shadow-[0_1px_4px_#00000014] transition-shadow duration-200 ease-[ease] hover:shadow-[0_2px_8px_#0000001f]"
          role="search"
        >
          <button className={searchSeg}>
            <img
              className="-ml-1.5 block size-12 object-fill"
              src="/images/searchbar-house.png"
              alt=""
              aria-hidden="true"
            />
            Anywhere
          </button>
          <span className="h-6 w-px bg-line" />
          <button className={searchSeg}>Anytime</button>
          <span className="h-6 w-px bg-line" />
          <button className={`${searchSeg} font-normal text-muted2`}>Add guests</button>
          <span
            className="ml-2 inline-flex size-8 items-center justify-center rounded-full border-none bg-rausch text-white"
            aria-label="Search"
          >
            <SearchGo className="size-3.5" />
          </span>
        </div>

        <div className="inline-flex items-center gap-2 justify-self-end">
          <a
            className="rounded-[22px] px-3.5 py-3 text-sm font-medium transition-[background-color] duration-[.18s] hover:bg-grey100"
            href="#"
          >
            Become a host
          </a>
          <button className={navIcon} aria-label="Choose a language and region">
            <Globe className="size-4" />
          </button>
          <button className={navIcon} aria-label="Main menu">
            <Menu className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

/** Sticky condensed nav that appears on scroll. */
function StickyBar({ onReserve }: ReserveHandler) {
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState(navLinks[0].id);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section link nearest the top of the viewport.
  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={
        "fixed inset-x-0 top-0 z-[45] border-b border-line-soft bg-white transition-[translate,opacity] duration-[.25s] ease-[ease] " +
        (shown
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none")
      }
      aria-hidden={!shown}
    >
      <div className="mx-auto flex h-[66px] max-w-[1280px] items-center justify-between px-20">
        <div className="flex gap-1">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={
                "relative px-2 py-[22px] text-sm font-medium text-ink hover:text-black " +
                (active === l.id
                  ? "after:absolute after:inset-x-2 after:bottom-3 after:h-0.5 after:bg-ink after:content-['']"
                  : "")
              }
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <div className="text-right text-[13px] leading-[1.2]">
            <b className="text-[15px] font-medium">{listing.booking.price}</b>{" "}
            {listing.booking.priceUnit.replace("for ", "for ")}
            <small className="mt-0.5 block text-[13px] text-ink">
              ★ {listing.rating} · {listing.reviewCount} reviews
            </small>
          </div>
          <button className={`${btnReserve} ${btnReserveSm}`} onClick={onReserve}>
            Reserve
          </button>
        </div>
      </div>
    </nav>
  );
}

export default function Header({ onReserve }: ReserveHandler) {
  return (
    <>
      <TopBar />
      <StickyBar onReserve={onReserve} />
    </>
  );
}
