"use client";

import { useEffect, useState, type ReactNode } from "react";

// The intro takes about 3s, then the Bazaar poster holds before the reveal
const REVEAL_AFTER_MS = 6500;

/**
 * Shows the Bazaar poster (slide "a"), then once, a few seconds after the
 * landing intro starts, plays the light transition into the Untamed Empire /
 * Buy Ticket screen (slide "b") and stays there until the page is reloaded.
 * It only sets data-slide; the animations live in globals.css.
 */
export default function HeroReveal({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [slide, setSlide] = useState<"a" | "b">("a");

  useEffect(() => {
    const html = document.documentElement;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      timer = setTimeout(() => setSlide("b"), REVEAL_AFTER_MS);
    };

    if (html.dataset.intro === "play") {
      start();
      return () => clearTimeout(timer);
    }

    // Wait for the splash screen to hand over to the intro
    const observer = new MutationObserver(() => {
      if (html.dataset.intro === "play") {
        observer.disconnect();
        start();
      }
    });
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-intro"],
    });
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className={className} data-slide={slide}>
      {children}
    </section>
  );
}
