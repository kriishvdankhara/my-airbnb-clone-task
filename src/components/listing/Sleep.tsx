import { listing } from "@/data/listing";
import { section, sectionTitle } from "@/lib/styles";

/** "Where you'll sleep" cards. */
export default function Sleep() {
  return (
    <div className={section}>
      <h2 className={sectionTitle}>Where you'll sleep</h2>
      <div className="grid grid-cols-2 gap-4">
        {listing.sleep.map((s) => (
          <div key={s.name}>
            <img
              className="aspect-[3/2] w-full rounded-lg border border-card-border object-cover"
              src={s.img}
              alt={s.name}
              loading="lazy"
            />
            <b className="mt-3.5 block text-[15px] font-medium">{s.name}</b>
            <div className="mt-0.5 text-sm text-muted2">{s.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
