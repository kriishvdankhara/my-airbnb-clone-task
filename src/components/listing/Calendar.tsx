import { listing } from "@/data/listing";
import { ChevronLeft, ChevronRight, Keyboard } from "@/lib/icons";
import { section } from "@/lib/styles";
import type { CalendarDate, CalendarMonth } from "@/types/listing";

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW = ["S", "M", "T", "W", "T", "F", "S"];

const cal = listing.calendar;
const sameDay = (a: CalendarDate, y: number, m: number, d: number) =>
  a.year === y && a.month === m && a.day === d;

const dayBase = "relative flex aspect-square items-center justify-center text-sm";

/** Selected endpoint: dark circle plus a grey half-bar joining it to the range. */
const dayEdge =
  "rounded-full bg-ink text-white before:absolute before:inset-y-0 before:w-1/2 " +
  "before:bg-grey200 before:[z-index:-1] before:content-['']";

const navBtn =
  "inline-flex size-8 items-center justify-center rounded-full border-none bg-transparent hover:bg-grey200";

function Month({ year, month }: CalendarMonth) {
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);

  const { selectStart: s, selectEnd: e } = cal;

  const cls = (d: number | null) => {
    if (d == null) return `${dayBase} invisible rounded-full`;
    // November availability tail is blocked (matches reference)
    if (month === 10 && d >= 15) return `${dayBase} rounded-full text-[#ddd] line-through`;
    if (sameDay(s, year, month, d)) return `${dayBase} ${dayEdge} before:right-0`;
    if (sameDay(e, year, month, d)) return `${dayBase} ${dayEdge} before:left-0`;
    // In-range days are square so they tile into a continuous band.
    if (month === s.month && d > s.day && d < e.day) return `${dayBase} bg-grey200`;
    return `${dayBase} rounded-full`;
  };

  return (
    <div>
      <div className="mb-[18px] text-center text-base font-medium">
        {MONTH_NAMES[month]} {year}
      </div>
      <div className="mb-1.5 grid grid-cols-7">
        {DOW.map((d, i) => (
          <span className="text-center text-xs font-medium text-ink" key={i}>
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((d, i) => (
          <div key={i} className={cls(d)}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

/** "5 nights in Candolim" availability calendar (two months). */
export default function Calendar() {
  return (
    <div className={section}>
      <b className="text-2xl font-medium">{cal.heading}</b>
      <div className="mb-[22px] mt-1.5 text-sm text-muted2">{cal.range}</div>
      <div className="relative grid grid-cols-2 gap-x-14">
        <div className="absolute top-[-4px] flex w-full justify-between">
          <button className={navBtn} aria-label="Previous month">
            <ChevronLeft className="size-3" />
          </button>
          <button className={navBtn} aria-label="Next month">
            <ChevronRight className="size-3" />
          </button>
        </div>
        {cal.months.map((m) => (
          <Month key={`${m.year}-${m.month}`} {...m} />
        ))}
      </div>
      <div className="mt-[18px] flex items-center justify-between">
        <span className="inline-flex h-[22px] w-[30px] items-center justify-center rounded-[4px] border border-[#b0b0b0]">
          <Keyboard className="block h-3.5 w-5" />
        </span>
        <button className="border-none bg-transparent text-sm font-medium underline">
          Clear dates
        </button>
      </div>
    </div>
  );
}
