"use client";

import { useEffect } from "react";

/**
 * Marks activities whose day is over as done: every element with
 * data-day="YYYY-MM-DD" before today gets a data-past attribute, which the
 * cards style (greyed out with a "Done" tag). Ghana is on UTC all year, so
 * today's UTC date is the date in Accra. Runs in the browser so it stays
 * current without redeploying.
 */
export default function PastActivities() {
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    document.querySelectorAll<HTMLElement>("[data-day]").forEach((el) => {
      el.toggleAttribute("data-past", (el.dataset.day ?? "") < today);
    });
  }, []);

  return null;
}
