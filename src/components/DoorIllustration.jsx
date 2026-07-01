import { useState } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";

// Each leaf's hinge sits on its outer edge (against the frame) - scaling the
// leaf toward that edge fakes the foreshortening of a door swinging open on a
// hinge, without needing a real 3D perspective transform for this flat SVG.
const MAX_FOLD = 0.6;
const LEFT_HINGE_X = 22;
const RIGHT_HINGE_X = 178;

// Drop the product logo file in public/product-logo/Logo.png - it's picked up
// here by a fixed path, so replacing that file (same exact name) is all a
// future update needs. Filenames are case-sensitive on the live server.
const PRODUCT_LOGO_SRC = "/product-logo/Logo.png";

// Lightweight static stand-in for ThreeScene on mobile - a flat SVG double-leaf
// hinge door (frame, vision window, kickplate, handle per leaf) at a fraction
// of the cost, so mobile never has to load the three.js bundle.
// The leaves swing open in sync with scroll position via useScrollProgress,
// matching the desktop door without an extra per-frame animation loop.
const DoorIllustration = () => {
  const progress = useScrollProgress();
  const scaleX = 1 - progress * MAX_FOLD;
  const [logoHidden, setLogoHidden] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 200 320"
        className="h-full max-h-full w-auto drop-shadow-2xl"
        role="img"
        aria-label="Modular OT double-leaf hinge door"
      >
        {/* Outer Frame */}
        <rect x="10" y="10" width="180" height="300" rx="6" fill="#2d3748" />
        {/* Recessed cleanroom corridor glimpsed through the doorway - drawn
            as a forced-perspective trapezoid (back wall + side/ceiling/floor
            faces) so it reads as depth rather than a flat-colored void */}
        <polygon points="20,18 180,18 155,50 45,50" fill="#f1efe9" />
        <polygon points="20,18 45,50 45,270 20,302" fill="#cdc8bd" />
        <polygon points="180,18 155,50 155,270 180,302" fill="#cdc8bd" />
        <polygon points="20,302 180,302 155,270 45,270" fill="#9fb7bc" />
        <polygon points="45,50 155,50 155,270 45,270" fill="#bdb7ac" />

        {/* Panel seam lines on the side walls, mimicking modular wall joints */}
        <line x1="28" y1="58" x2="28" y2="262" stroke="#b9b3a7" strokeWidth="1.5" />
        <line x1="35" y1="58" x2="35" y2="262" stroke="#b9b3a7" strokeWidth="1.5" />
        <line x1="165" y1="58" x2="165" y2="262" stroke="#b9b3a7" strokeWidth="1.5" />
        <line x1="172" y1="58" x2="172" y2="262" stroke="#b9b3a7" strokeWidth="1.5" />

        <rect x="58" y="34" width="30" height="10" rx="2" fill="#ffffff" stroke="#cfcac0" />
        <rect x="112" y="34" width="30" height="10" rx="2" fill="#ffffff" stroke="#cfcac0" />

        {/* Left Leaf - hinged on its left edge */}
        <g transform={`translate(${LEFT_HINGE_X} 0) scale(${scaleX} 1) translate(${-LEFT_HINGE_X} 0)`}>
          <rect x="22" y="20" width="76" height="280" rx="4" fill="#f8fafc" />
          <rect x="22" y="230" width="76" height="50" fill="#e2e8f0" />
          <rect x="34" y="55" width="50" height="84" rx="4" fill="#2d3748" />
          <rect x="40" y="63" width="38" height="68" rx="2" fill="#0F2942" opacity="0.9" />
          <rect x="88" y="130" width="6" height="60" rx="3" fill="#ffffff" />

          {/* Product logo plate, top-left of the left leaf - folds open with the door */}
          {!logoHidden && (
            <image
              href={PRODUCT_LOGO_SRC}
              x="26"
              y="22"
              width="56"
              height="30"
              preserveAspectRatio="xMidYMid meet"
              onError={() => setLogoHidden(true)}
            />
          )}
        </g>

        {/* Right Leaf - hinged on its right edge */}
        <g transform={`translate(${RIGHT_HINGE_X} 0) scale(${scaleX} 1) translate(${-RIGHT_HINGE_X} 0)`}>
          <rect x="102" y="20" width="76" height="280" rx="4" fill="#f8fafc" />
          <rect x="102" y="230" width="76" height="50" fill="#e2e8f0" />
          <rect x="116" y="55" width="50" height="84" rx="4" fill="#2d3748" />
          <rect x="122" y="63" width="38" height="68" rx="2" fill="#0F2942" opacity="0.9" />
          <rect x="106" y="130" width="6" height="60" rx="3" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};

export default DoorIllustration;
