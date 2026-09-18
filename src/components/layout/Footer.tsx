import { container } from "@/lib/styles";

/** Minimal footer bar. */
export default function Footer() {
  return (
    <footer className="border-t border-line-soft bg-grey100">
      <div className={`${container} flex items-center justify-between py-10 text-sm text-ink`}>
        <span>© 2026 Airbnb clone · Built for the Playpower assignment</span>
        <div className="flex items-center gap-4">
          <a className="hover:underline" href="#">
            Privacy
          </a>
          <a className="hover:underline" href="#">
            Terms
          </a>
          <a className="hover:underline" href="#">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}
