import { useEffect } from "react";
import { amenityIconMap, listing } from "@/data/listing";
import * as Icons from "@/lib/icons";
import { iconBtn } from "@/lib/styles";

interface AmenitiesModalProps {
  open: boolean;
  onClose: () => void;
}

// The full list is free-text, so icons are matched on keywords rather than a key.
const getIcon = (label: string) => {
  const iconName = amenityIconMap[label] as keyof typeof Icons;
  // If the label exists in our map, use it; otherwise, default to Star
  const IconComponent = Icons[iconName] || Icons.Star;
  return <IconComponent />;
};

const overlayBase =
  "fixed inset-0 z-[150] flex items-center justify-center bg-[#00000080] " +
  "transition-[opacity,visibility] [transition-duration:.2s,0s] " +
  "[transition-timing-function:ease,linear]";

const modalBase =
  "flex max-h-[calc(100vh_-_96px)] w-[780px] max-w-[calc(100vw_-_48px)] flex-col " +
  "overflow-hidden rounded-xl bg-white transition-[translate] duration-[.25s] ease-airbnb";

/** "Show all 50 amenities" modal dialog. */
export default function AmenitiesModal({ open, onClose }: AmenitiesModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={`${overlayBase} ${open ? "visible opacity-100 [transition-delay:0s,0s]" : "invisible opacity-0 [transition-delay:0s,.2s]"
        }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-hidden={!open}
    >
      <div
        className={`${modalBase} ${open ? "translate-y-0" : "translate-y-5"}`}
        role="dialog"
        aria-modal="true"
        aria-label="What this place offers"
      >
        <div className="flex h-16 shrink-0 items-center px-6">
          <button className={`${iconBtn} -ml-2`} onClick={onClose} aria-label="Close">
            <Icons.Close />
          </button>
        </div>
        <div className="overflow-y-auto px-12 pb-12">
          <h2 className="mb-6 mt-3 text-2xl font-medium">What this place offers</h2>
          {listing.amenitiesFull.map((g) => (
            <div className="mb-[30px]" key={g.group}>
              <h3 className="mb-1 text-lg font-medium">{g.group}</h3>
              {g.items.map((it) => (
                <div
                  className={`flex items-center gap-4 border-b border-line-soft py-4 text-base ${it.unavailable ? "text-muted2" : ""
                    }`}
                  key={it.label}
                >
                  <span className="size-6 shrink-0 [&_svg]:block [&_svg]:size-full">
                    {getIcon(it.label)}
                  </span>
                  <span className={it.unavailable ? "line-through" : ""}>{it.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
