"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Background() {
  const pathname = usePathname();

  // The home page has its own background; showing this one behind it
  // makes the old colours flash through when the page bounces on scroll.
  if (pathname === "/" || pathname?.startsWith("/landing")) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#24f1af] bg-[url('/owo_waves.png')] bg-no-repeat bg-cover bg-center -z-10"></div>
  );
}
