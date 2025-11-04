"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Feedback() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["/first-image.JPG", "/second-image.JPG"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Softer Black Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      {/* Optional gradient for subtle fade effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center p-6">
        {/* Logo */}
        <img
          src="/owo_logo.gif"
          alt="OWO Logo"
          className="w-60 sm:w-72 md:w-80 h-auto mb-3"
        />

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">
          OWO 2025 Feedback Form
        </h1>

        {/* Description */}
        <p className="mb-6 text-base sm:text-lg md:text-2xl font-bold text-gray-200">
          Please click below to fill out the feedback form.
        </p>

        {/* Button */}
        <a
          href="https://forms.gle/3JpVRemvixJ8Yemm6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="px-6 sm:px-8 md:px-9 py-3 sm:py-4 md:py-6 text-base sm:text-lg md:text-xl bg-[#E97A29] hover:bg-[#24F1AF] text-white hover:text-[#E97A29] transition-all duration-300">
            Open Form
          </Button>
        </a>
      </div>
    </div>
  );
}
