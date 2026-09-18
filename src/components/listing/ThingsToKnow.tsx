import { listing } from "@/data/listing";
import type { IconComponent } from "@/lib/icons";
import { Shield, TkCancellation, TkRules } from "@/lib/icons";
import { section, sectionTitle } from "@/lib/styles";

const t = listing.thingsToKnow;

interface KnowColumn {
  icon: IconComponent;
  title: string;
  lines: string[];
}

const columns: KnowColumn[] = [
  { icon: TkCancellation, title: "Cancellation policy", lines: t.cancellation },
  { icon: TkRules, title: "House rules", lines: t.houseRules },
  { icon: Shield, title: "Safety & property", lines: t.safety },
];

/** "Things to know" three-column section. */
export default function ThingsToKnow() {
  return (
    <div className={section}>
      <h2 className={sectionTitle}>Things to know</h2>
      <div className="grid grid-cols-3 gap-8 max-[1128px]:grid-cols-1 max-[1128px]:gap-6">
        {columns.map((col) => {
          const Icon = col.icon;
          return (
            <div key={col.title}>
              <Icon className="mb-[18px] size-6 text-ink" />
              <b className="mb-3.5 block text-base font-medium">{col.title}</b>
              {col.lines.map((l, i) => (
                <p className="mb-2 text-sm leading-[1.5]" key={i}>
                  {l}
                </p>
              ))}
              <button className="text-sm font-medium underline">Learn more</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
