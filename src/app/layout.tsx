import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { listing } from "@/data/listing";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: `${listing.title} - Airbnb`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
