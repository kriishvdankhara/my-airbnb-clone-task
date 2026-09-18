"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Header from "@/components/layout/Header";
import Amenities from "@/components/listing/Amenities";
import BookingCard from "@/components/listing/BookingCard";
import Calendar from "@/components/listing/Calendar";
import Hero from "@/components/listing/Hero";
import Host from "@/components/listing/Host";
import Location from "@/components/listing/Location";
import MoreStays from "@/components/listing/MoreStays";
import Overview from "@/components/listing/Overview";
import Reviews from "@/components/listing/Reviews";
import Sleep from "@/components/listing/Sleep";
import ThingsToKnow from "@/components/listing/ThingsToKnow";
import AmenitiesModal from "@/components/overlays/AmenitiesModal";
import Lightbox from "@/components/overlays/Lightbox";
import PhotoTour from "@/components/overlays/PhotoTour";
import { container } from "@/lib/styles";
import type { LightboxIndexUpdate } from "@/types/listing";

const TOAST_DURATION_MS = 2200;

export default function ListingPage() {
  const [tourOpen, setTourOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<number | undefined>(undefined);

  const anyOverlay = tourOpen || lightboxIndex != null || amenitiesOpen;

  // Lock background scroll while an overlay is open.
  useEffect(() => {
    document.body.classList.toggle("no-scroll", anyOverlay);
  }, [anyOverlay]);

  // Show keyboard focus outlines only for keyboard users.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Tab" && document.body.classList.add("kbd");
    const onClick = () => document.body.classList.remove("kbd");
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), TOAST_DURATION_MS);
  }, []);

  const onShare = useCallback(() => showToast("Link copied to clipboard"), [showToast]);
  const onSave = useCallback((msg: string) => showToast(msg), [showToast]);
  const onReserve = useCallback(
    () => showToast("You won't be charged yet"),
    [showToast],
  );

  const openTour = useCallback(() => setTourOpen(true), []);
  const closeTour = useCallback(() => setTourOpen(false), []);
  const openAmenities = useCallback(() => setAmenitiesOpen(true), []);
  const closeAmenities = useCallback(() => setAmenitiesOpen(false), []);
  const openPhoto = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const updateLightboxIndex = useCallback((update: LightboxIndexUpdate) => {
    setLightboxIndex((current) => {
      if (typeof update !== "function") return update;
      return current === null ? current : update(current);
    });
  }, []);

  return (
    <>
      <Header onReserve={onReserve} />

      <main className={container}>
        <Hero onOpenTour={openTour} onShare={onShare} onSave={onSave} />

        <div className="grid grid-cols-[minmax(0,1fr)_372px] items-stretch gap-x-24 max-[1128px]:grid-cols-1">
          <div className="min-w-0">
            <Overview />
            <Sleep />
            <Amenities onShowAll={openAmenities} />
            <Calendar />
          </div>
          <aside className="relative self-stretch max-[1128px]:hidden">
            <BookingCard onReserve={onReserve} />
          </aside>
        </div>
      </main>

      <Reviews />

      <div className={container}>
        <Location />
        <Host />
        <ThingsToKnow />
        <MoreStays />
      </div>

      {/* <Footer /> */}

      {/* Overlays */}
      <PhotoTour open={tourOpen} onClose={closeTour} onOpenPhoto={openPhoto} />
      <Lightbox index={lightboxIndex} onClose={closeLightbox} setIndex={updateLightboxIndex} />
      <AmenitiesModal open={amenitiesOpen} onClose={closeAmenities} />

      <div
        className={
          "pointer-events-none fixed bottom-8 left-1/2 z-[200] -translate-x-1/2 rounded-lg bg-ink px-[22px] py-3.5 text-sm font-medium text-white transition-[opacity,translate] duration-200 " +
          (toast ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0")
        }
      >
        {toast}
      </div>
    </>
  );
}
