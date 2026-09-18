import { listing } from "@/data/listing";
import { HouseMarker, MapSearch, Minus, Plus } from "@/lib/icons";
import { linkBtn, section } from "@/lib/styles";

// Tailwind scans raw source text for class names, so each arbitrary value below
// has to stay on one line — splitting one across string concatenation hides it
// from the scanner and the utility is silently never generated.

/** Stylised stand-in for a map tile: two shrub blobs over a coast gradient. */
const mapBase =
  "absolute inset-0 bg-[image:radial-gradient(circle_at_30%_40%,#cfe3c8_0_6%,transparent_6%),radial-gradient(circle_at_70%_60%,#cfe3c8_0_8%,transparent_8%),linear-gradient(115deg,#acd3e6_0_34%,#e9f0e4_34%_100%)]";

/** 90px street grid laid over the base. */
const mapGrid =
  "before:absolute before:inset-0 before:opacity-50 before:content-[''] before:bg-[image:linear-gradient(90deg,rgba(180,180,170,.5)_1px,transparent_1px),linear-gradient(0deg,rgba(180,180,170,.35)_1px,transparent_1px)] before:bg-[length:90px_90px,90px_90px]";

const mapControl =
  "absolute top-3 flex size-10 items-center justify-center border-none bg-white shadow-[0_2px_6px_#0003]";

/** "Where you'll be" map section. */
export default function Location() {
  return (
    <div className={section} id="location">
      <h2 className="text-2xl font-medium leading-[26px]">Where you'll be</h2>
      <div className="mb-6 mt-6 text-base">{listing.location}</div>

      <div className="relative h-[480px] overflow-hidden rounded-xl bg-[#e8eef0]">
        <div className={`${mapBase} ${mapGrid}`} />
        <button className={`${mapControl} left-3 rounded-full`} aria-label="Search this area">
          <MapSearch className="size-5" />
        </button>
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            className="flex size-10 items-center justify-center rounded-lg border-none bg-white shadow-[0_2px_6px_#0003]"
            aria-label="Zoom in"
          >
            <Plus className="size-5" />
          </button>
          <button
            className="flex size-10 items-center justify-center rounded-lg border-none bg-white shadow-[0_2px_6px_#0003]"
            aria-label="Zoom out"
          >
            <Minus className="size-5" />
          </button>
        </div>
        <div className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-white shadow-[0_4px_12px_#0000004d]">
          <HouseMarker className="size-9" />
        </div>
      </div>
      <div className="mt-[18px] text-sm text-ink">
        Exact location will be provided after booking.
      </div>

      <h3 className="mb-3 mt-10 text-lg font-medium">Neighbourhood highlights</h3>
      <p className="text-[15px] leading-[1.5]">{listing.neighbourhood}</p>
      <button className={`${linkBtn} mt-[18px]`}>Show more ›</button>
    </div>
  );
}
