import { listing } from "@/data/listing";
import type { IconComponent } from "@/lib/icons";
import {
  AmKitchen, AmWifi, AmWorkspace, AmParking, AmPool, AmHottub, AmPets, AmCamera, AmCo, AmSmoke,
} from "@/lib/icons";
import { btnOutline, section, sectionTitle } from "@/lib/styles";
import type { AmenityIconKey } from "@/types/listing";

const amenityIcons: Record<AmenityIconKey, IconComponent> = {
  kitchen: AmKitchen, wifi: AmWifi, workspace: AmWorkspace, parking: AmParking, pool: AmPool,
  hottub: AmHottub, pets: AmPets, camera: AmCamera, co: AmCo, smoke: AmSmoke,
};

interface AmenitiesProps {
  onShowAll: () => void;
}

/** "What this place offers" grid + show-all button. */
export default function Amenities({ onShowAll }: AmenitiesProps) {
  return (
    <div className={section} id="amenities">
      <h2 className={sectionTitle}>What this place offers</h2>
      <div className="mb-6 grid grid-cols-2 gap-x-2 gap-y-4">
        {listing.amenities.map((a) => {
          const Icon = amenityIcons[a.icon];
          return (
            <div
              className={`flex items-center gap-4 py-1 text-base ${a.unavailable ? "text-muted2" : ""}`}
              key={a.label}
            >
              <span className="size-6 shrink-0">
                <Icon className="block size-full" />
              </span>
              <span className={a.unavailable ? "line-through" : ""}>{a.label}</span>
            </div>
          );
        })}
      </div>
      <button className={btnOutline} onClick={onShowAll}>
        Show all 50 amenities
      </button>
    </div>
  );
}
