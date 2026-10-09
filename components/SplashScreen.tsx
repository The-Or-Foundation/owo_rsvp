"use client";

import Image from "next/image";
import { Archivo_Black } from "next/font/google";
import { useEffect, useState } from "react";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
});

// The counter never finishes faster than this, so the splash doesn't just flicker
const MIN_DURATION_MS = 1600;
// If something hangs, stop waiting and show the page anyway
const MAX_WAIT_MS = 8000;
// At 100% the text fades out first, then the background clears
// (it matches the page behind it) and the landing intro starts
const TEXT_FADE_MS = 350;
const CLEAR_MS = 400;

// How much of the page has loaded, from 0 to 100. Lazy images are skipped
// because they only load once scrolled to, so they'd never finish here.
function loadedPercent() {
  if (document.readyState === "complete") return 100;
  const images = Array.from(document.images).filter(
    (img) => img.loading !== "lazy",
  );
  if (images.length === 0) return 90;
  const done = images.filter((img) => img.complete).length;
  // Hold back the last 10% until the browser says the page has fully loaded
  return Math.round((done / images.length) * 90);
}

export default function SplashScreen() {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<"loading" | "fading" | "clearing">(
    "loading",
  );
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let shown = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let finished = false;

    document.documentElement.style.overflow = "hidden";
    // Reset so the landing intro waits for this splash, even on a repeat visit
    delete document.documentElement.dataset.intro;

    const tick = () => {
      const elapsed = performance.now() - start;
      const target = elapsed > MAX_WAIT_MS ? 100 : loadedPercent();
      const timeCap = Math.min(100, (elapsed / MIN_DURATION_MS) * 100);
      const goal = Math.min(target, timeCap);

      // Ease towards the goal so the number climbs smoothly
      shown += (goal - shown) * 0.12;
      if (goal - shown < 0.5) shown = goal;
      setPercent(Math.floor(shown));

      if (shown >= 100) {
        finished = true;
        setTimeout(() => setPhase("fading"), 200);
        setTimeout(() => {
          setPhase("clearing");
          // Start the landing intro animation (see globals.css)
          document.documentElement.dataset.intro = "play";
        }, 200 + TEXT_FADE_MS);
        setTimeout(
          () => {
            setHidden(true);
            document.documentElement.style.overflow = "";
          },
          200 + TEXT_FADE_MS + CLEAR_MS,
        );
        return;
      }
      timer = setTimeout(tick, 16);
    };

    tick();
    return () => {
      clearTimeout(timer);
      if (!finished) document.documentElement.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      id="splash"
      aria-hidden="true"
      className={`${archivoBlack.className} fixed inset-0 z-[100] bg-[#F5473A] bg-[url(/owo_landing_bg.png)] bg-[length:100%_100%] bg-no-repeat text-white uppercase transition-opacity ease-out ${
        phase === "clearing" ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${CLEAR_MS}ms` }}
    >
      {/* Without JavaScript the counter can't run, so don't block the page */}
      <noscript>
        <style>{`#splash{display:none}[class*="intro-"]{opacity:1!important}`}</style>
      </noscript>

      <div
        className={`transition-opacity ease-out ${
          phase === "loading" ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: `${TEXT_FADE_MS}ms` }}
      >
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl tabular-nums">
          {percent}%
        </p>

        <p className="absolute left-5 sm:left-10 bottom-6 sm:bottom-10 max-w-[14rem] sm:max-w-xs text-xs sm:text-base leading-tight">
          Ghana&apos;s largest celebration of upcycling.
        </p>

        <Image
          src="/owo_badge.png"
          alt=""
          width={2400}
          height={1086}
          priority
          sizes="120px"
          className="absolute right-5 sm:right-10 bottom-6 sm:bottom-10 w-20 sm:w-28 h-auto"
        />
      </div>
    </div>
  );
}
