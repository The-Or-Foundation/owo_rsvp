"use client";

import { Button } from "@/components/ui/button";

export default function Apply() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-6">
      {/* Logo */}
      <img src="/owo_logo.gif" alt="OWO Logo" className="w-80 h-auto mb-3" />

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">OWO 2025 Interest Form</h1>

      {/* Description */}
      <p className="mb-6 text-gray-600">
        Please click below to fill out the application form.
      </p>

      {/* Button */}
      <a
        href="https://forms.gle/xbfESz6Q6ryXw2JD9"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="px-6 py-3 text-lg">Open Form</Button>
      </a>
    </div>
  );
}
