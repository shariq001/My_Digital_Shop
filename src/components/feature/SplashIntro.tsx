"use client";

import { useEffect, useState } from "react";

export default function SplashIntro() {
  const [showSplash, setShowSplash] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // Only run on the client side
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (!hasSeenSplash) {
      setShowSplash(true);
      sessionStorage.setItem("hasSeenSplash", "true");
      
      // Start fade out after 1.5s
      const outTimer = setTimeout(() => {
        setIsAnimatingOut(true);
      }, 1500);

      // Remove from DOM after fade out completes (2.5s total)
      const removeTimer = setTimeout(() => {
        setShowSplash(false);
      }, 2500);

      return () => {
        clearTimeout(outTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  if (!showSplash) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base transition-opacity duration-1000 ${
        isAnimatingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute top-1/2 left-1/2 aspect-square w-64 -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,var(--color-primary)_360deg)] opacity-20 blur-3xl rounded-full" />
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight animate-fade-up z-10">
          Welcome to DevThemes<span className="text-primary">.</span>
        </h1>
        <p className="mt-4 text-muted animate-fade-up z-10" style={{ animationDelay: '200ms' }}>
          Redirecting you to the shop...
        </p>
      </div>
    </div>
  );
}
