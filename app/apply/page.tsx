"use client";

import { useEffect } from "react";

export default function Apply() {
  useEffect(() => {
    // Load Tally embed script when component mounts
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        margin: 0,
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "white", // 🔹 force white background
      }}
    >
      <iframe
        data-tally-src="https://tally.so/r/m6qGV5"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="OWO 2025 Interest Form"
        style={{
          border: 0,
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "white", // 🔹 iframe fallback white
        }}
      />
    </div>
  );
}
