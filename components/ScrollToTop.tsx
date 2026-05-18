"use client";
import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Disable browser's scroll restoration so page always starts at top
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
