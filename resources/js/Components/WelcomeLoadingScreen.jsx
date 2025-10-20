import React, { useEffect, useState } from "react";

export default function LoadingScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show for 2.5s, then fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onFinish(), 800); // wait for fade animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-50 transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-5xl md:text-6xl font-mono font-bold">
        <span className="text-red-500">&lt;</span>AJR
        <span className="text-red-500">/&gt;</span>
      </div>

      <div className="mt-6 w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-sm text-gray-400 tracking-wide">Loading portfolio...</p>
    </div>
  );
}
