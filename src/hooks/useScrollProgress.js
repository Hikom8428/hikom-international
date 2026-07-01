import { useEffect, useState } from "react";

// Tracks how far the page has been scrolled as a 0-1 value, ramping from 0 at
// the top of the page to 1 after `distance` px of scroll - drives the hero
// door's open animation off real scroll position instead of a fixed timer, so
// it opens while scrolling down and closes again when scrolling back up.
export const useScrollProgress = (distance = 130) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = null;
    const measure = () => {
      frame = null;
      setProgress(Math.min(1, Math.max(0, window.scrollY / distance)));
    };
    const handleScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [distance]);

  return progress;
};
