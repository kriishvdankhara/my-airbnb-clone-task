/**
 * Domain types for the listing content in `src/data/listing.ts`.
 *
 * The icon unions are the keys the section components use to look up an SVG in
 * `src/lib/icons.tsx`, so widening one here without adding the matching entry
 * to that component's icon map is a type error rather than a blank icon.
 */

export type HighlightIconKey = "outdoor" | "cool" | "key";

export type AmenityIconKey =
  | "kitchen"
  | "wifi"
  | "workspace"
  | "parking"
  | "pool"
  | "hottub"
  | "pets"
  | "camera"
  | "co"
  | "smoke";

export type CategoryScoreIconKey =
  | "cleanliness"
  | "accuracy"
  | "checkin"
  | "communication"
  | "location"
  | "value";

export interface HostProfile {
  name: string;
  tenure: string;
  avatar: string;
  superhost: boolean;
  reviews: string;
  ratingValue: string;
  yearsHosting: string;
  born: string;
  school: string;
  responseRate: string;
  responseTime: string;
}

export interface Highlight {
  icon: HighlightIconKey;
  title: string;
  text: string;
}

export interface SleepArea {
  name: string;
  detail: string;
  img: string;
}

export interface Amenity {
  icon: AmenityIconKey;
  label: string;
  unavailable?: boolean;
}

export interface AmenityGroupItem {
  label: string;
  unavailable?: boolean;
}

export interface AmenityGroup {
  group: string;
  items: AmenityGroupItem[];
}

export interface Booking {
  price: string;
  priceUnit: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  freeCancel: string;
  promo: string;
  promoTerms: string;
}

/** Month is 0-indexed, matching the `Date` constructor. */
export interface CalendarMonth {
  year: number;
  month: number;
}

export interface CalendarDate extends CalendarMonth {
  day: number;
}

export interface ListingCalendar {
  heading: string;
  range: string;
  months: CalendarMonth[];
  selectStart: CalendarDate;
  selectEnd: CalendarDate;
}

export interface RatingBreakdownRow {
  star: number;
  pct: number;
}

export interface CategoryScore {
  icon: CategoryScoreIconKey;
  label: string;
  score: string;
}

export interface ReviewTopic {
  icon: string;
  label: string;
  count: number;
}

/** A review renders either `avatar` or the `letter`/`color` monogram fallback. */
export interface Review {
  name: string;
  tenure: string;
  date: string;
  text: string;
  avatar?: string;
  letter?: string;
  color?: string;
  textColor?: string;
}

export interface CoHost {
  name: string;
  avatar?: string;
  letter?: string;
  color?: string;
}

export interface ThingsToKnowInfo {
  cancellation: string[];
  houseRules: string[];
  safety: string[];
}

export interface NearbyStay {
  title: string;
  price: string;
  rating: string;
  img: string;
}

export interface Listing {
  title: string;
  subtitle: string;
  specs: string;
  rating: number;
  reviewCount: number;
  location: string;
  hero: string[];
  host: HostProfile;
  highlights: Highlight[];
  description: string;
  sleep: SleepArea[];
  amenities: Amenity[];
  amenitiesFull: AmenityGroup[];
  booking: Booking;
  calendar: ListingCalendar;
  ratingBreakdown: RatingBreakdownRow[];
  categoryScores: CategoryScore[];
  reviewTopics: ReviewTopic[];
  reviews: Review[];
  cohosts: CoHost[];
  neighbourhood: string;
  thingsToKnow: ThingsToKnowInfo;
  moreStays: NearbyStay[];
}

/** `rows` is the layout pattern: 1 = full-width row, 2 = side-by-side pair. */
export interface PhotoCategory {
  id: string;
  title: string;
  subtitle: string;
  rows: number[];
  photos: string[];
}

export interface TourPhoto {
  src: string;
  category: string;
}

/** Accepts either a new index or an updater, mirroring a React state setter. */
export type LightboxIndexUpdate = number | ((current: number) => number);
