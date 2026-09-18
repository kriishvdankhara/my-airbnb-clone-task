import { listing } from "@/data/listing";
import { ChevronDown, Flag } from "@/lib/icons";
import { btnReserve } from "@/lib/styles";

const b = listing.booking;

interface BookingCardProps {
  onReserve: () => void;
}

const dateCell = "border border-transparent px-3 py-2.5";
const dateLabel = "text-[10px] font-bold tracking-[.04em]";
const dateValue = "mt-0.5 text-sm";

/** Sticky promo + reservation card in the right column. */
export default function BookingCard({ onReserve }: BookingCardProps) {
  return (
    <div className="sticky top-[100px]">
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-line bg-white p-4">
        <img className="size-8 shrink-0" src="/images/discount.svg" alt="" />
        <div className="flex-1 text-sm leading-[1.3]">
          {b.promo}{" "}
          <br />
          <a className="font-medium underline" href="#">
            {b.promoTerms}
          </a>
        </div>
        <button className="rounded-lg border-none bg-[#f7f7f7] px-3.5 py-2 text-sm font-medium hover:bg-grey200">
          Claim
        </button>
      </div>

      <div className="rounded-xl border border-card-border px-6 pb-6 pt-[22px] shadow-card">
        <div className="mb-[18px] flex items-baseline gap-1.5">
          <b className="text-2xl font-medium underline underline-offset-2">{b.price}</b>
          <span className="text-[15px] text-ink">{b.priceUnit}</span>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#b0b0b0]">
          <div className="grid grid-cols-2">
            <div className={dateCell}>
              <div className={dateLabel}>CHECK-IN</div>
              <div className={dateValue}>{b.checkIn}</div>
            </div>
            <div className={`${dateCell} border-l-[#b0b0b0]`}>
              <div className={dateLabel}>CHECKOUT</div>
              <div className={dateValue}>{b.checkOut}</div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-[#b0b0b0] px-3 py-2.5">
            <div>
              <div className={dateLabel}>GUESTS</div>
              <div className={dateValue}>{b.guests}</div>
            </div>
            <ChevronDown className="size-4" />
          </div>
        </div>

        <div className="my-4 rounded-lg bg-grey100 p-2 text-center text-[13px] text-muted2">
          Free cancellation before <b className="font-medium text-ink">17 October</b>
        </div>

        <button className={`${btnReserve} mt-0.5 w-full`} onClick={onReserve}>
          Reserve
        </button>
        <div className="mt-4 text-center text-sm text-muted2">You won't be charged yet</div>
      </div>

      <div className="mt-[26px] flex items-center justify-center gap-2 text-sm text-muted2">
        <Flag className="size-4" />
        <a className="underline" href="#">
          Report this listing
        </a>
      </div>
    </div>
  );
}
