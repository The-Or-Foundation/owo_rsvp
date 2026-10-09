"use client";

import { useEffect, useState } from "react";

/**
 * A "Secure Your Tickets" button that stays on screen while scrolling. It only
 * appears after the hero's Untamed Empire reveal, and hides while the
 * hero's own ticket button (.lx-cta) is in view, so it shows up once
 * people scroll past that button.
 */
export default function StickyTicket({ href }: { href: string }) {
  const [revealed, setRevealed] = useState(false);
  const [heroCtaInView, setHeroCtaInView] = useState(false);

  // Track whether the reveal has happened and the hero's Buy Ticket is on screen
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-slide]");
    const cta = document.querySelector(".lx-cta");
    if (!hero || !cta) return;

    setRevealed(hero.dataset.slide === "b");
    const slideObserver = new MutationObserver(() => {
      setRevealed(hero.dataset.slide === "b");
    });
    slideObserver.observe(hero, {
      attributes: true,
      attributeFilter: ["data-slide"],
    });

    const viewObserver = new IntersectionObserver(([entry]) => {
      setHeroCtaInView(entry.isIntersecting);
    });
    viewObserver.observe(cta);

    return () => {
      slideObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  const visible = revealed && !heroCtaInView;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed z-50 bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:bottom-6 sm:translate-x-0 w-[calc(100%-2rem)] max-w-sm sm:w-auto flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#E9C3A8] bg-white px-6 py-3 font-['Avenir_Next',Avenir,'Helvetica_Neue',Helvetica,Arial,sans-serif] text-base font-semibold text-[#E07B36] shadow-[0_6px_24px_rgba(0,0,0,0.25)] transition-[opacity,translate,background-color,color,border-color] duration-300 hover:border-[#63DE9F] hover:bg-[#63DE9F] hover:text-white active:border-[#63DE9F] active:bg-[#63DE9F] active:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07B36] ${
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-4"
      }`}
    >
      Secure Your Tickets
      <span aria-hidden="true">→</span>
    </a>
  );
}
