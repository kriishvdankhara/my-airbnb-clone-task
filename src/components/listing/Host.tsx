import { listing } from "@/data/listing";
import { HostBorn, HostSchool, Shield, Star, SuperhostBadge } from "@/lib/icons";
import { section, sectionTitle } from "@/lib/styles";

const hostStat =
  "py-2.5 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-line-soft";

const hostFact = "flex items-center gap-3.5 text-[15px]";

const subHeading = "mb-4 text-lg font-medium";

/** "Meet your host" section. */
export default function Host() {
  const h = listing.host;
  return (
    <div className={section}>
      <h2 className={sectionTitle}>Meet your host</h2>
      <div className="grid grid-cols-[340px_1fr] items-start gap-12 max-[1128px]:grid-cols-1">
        <div>
          <div className="grid grid-cols-[1fr_100px] items-center rounded-[20px] border border-card-border px-6 py-[30px] shadow-card">
            <div className="text-center">
              <div className="relative mx-auto mb-3 size-[88px]">
                <img className="size-[88px] rounded-full object-cover" src={h.avatar} alt={h.name} />
                {h.superhost && (
                  <span className="absolute bottom-1 right-0 flex size-7 items-center justify-center rounded-full border-2 border-white bg-rausch">
                    <SuperhostBadge className="size-[15px] text-white" />
                  </span>
                )}
              </div>
              <div className="text-[26px] font-medium">{h.name}</div>
              <div className="mt-1 text-[13px]">Host</div>
            </div>
            <div className="border-l border-line-soft pl-5">
              <div className={hostStat}>
                <b className="text-xl font-medium">{h.reviews}</b>
                <small className="block text-xs">Reviews</small>
              </div>
              <div className={hostStat}>
                <b className="text-xl font-medium">
                  {h.ratingValue}
                  <Star className="ml-[3px] size-[15px] [vertical-align:-1px]" />
                </b>
                <small className="block text-xs">Rating</small>
              </div>
              <div className={hostStat}>
                <b className="text-xl font-medium">{h.yearsHosting}</b>
                <small className="block text-xs">Years hosting</small>
              </div>
            </div>
          </div>

          <div className="mt-[22px] flex flex-col gap-3.5">
            <div className={hostFact}>
              <HostBorn className="size-6 shrink-0 text-ink" />
              {h.born}
            </div>
            <div className={hostFact}>
              <HostSchool className="size-6 shrink-0 text-ink" />
              {h.school}
            </div>
          </div>
        </div>

        <div>
          <div>
            <h3 className={subHeading}>Co-Hosts</h3>
            <div className="mb-[30px] grid grid-cols-3 gap-x-2 gap-y-4">
              {listing.cohosts.map((c) => (
                <div className="flex items-center gap-2.5 text-sm" key={c.name}>
                  {c.avatar ? (
                    <img
                      className="size-[34px] rounded-full object-cover"
                      src={c.avatar}
                      alt={c.name}
                      loading="lazy"
                    />
                  ) : (
                    <span
                      className="flex size-[34px] items-center justify-center rounded-full text-[13px] font-medium text-white"
                      style={{ background: c.color }}
                    >
                      {c.letter}
                    </span>
                  )}
                  {c.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={subHeading}>Host details</h3>
            <p className="text-[15px] leading-[1.6]">Response rate: {h.responseRate}</p>
            <p className="text-[15px] leading-[1.6]">{h.responseTime}</p>
            <button className="mt-[18px] rounded-lg border-none bg-grey200 px-6 py-3.5 text-[15px] font-medium hover:bg-grey300">
              Message host
            </button>
          </div>

          <div className="mt-[30px] flex items-start gap-2.5 text-xs text-muted2">
            <Shield className="size-6 shrink-0" />
            <span>
              To help protect your payment, always use Airbnb to send money and communicate with
              hosts.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
