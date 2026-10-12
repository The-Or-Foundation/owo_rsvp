"use client";

import { useEffect, useState } from "react";

/**
 * Phone-only bar fixed to the bottom of the RSVP page, like Eventbrite's,
 * linking down to the form. It hides once the form (#rsvp) is on screen.
 */
export default function ReserveBar({ date }: { date: string }) {
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const form = document.getElementById("rsvp");
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => {
      setFormInView(entry.isIntersecting);
    });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={formInView}
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-black/10 bg-white px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.12)] transition-transform duration-300 ${
        formInView ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="leading-tight">
        <p className="font-bold text-[#111418]">Free</p>
        <p className="text-sm text-[#4B4B4B]">{date}</p>
      </div>
      <a
        href="#rsvp"
        tabIndex={formInView ? -1 : 0}
        className="rounded-lg bg-[#E97A29] px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#63DE9F] active:bg-[#63DE9F]"
      >
        Reserve a spot
      </a>
    </div>
  );
}
