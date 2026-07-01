import React, { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshStandardMaterial, ACESFilmicToneMapping, TextureLoader, CanvasTexture, SRGBColorSpace } from "three";
import { useScrollProgress } from "../hooks/useScrollProgress";

// Drawn as a flat forced-perspective texture (same trick as the mobile SVG's
// trapezoid panels) rather than real rotated 3D planes - those kept coming
// out unlit/black depending on normal direction, while a textured, unlit
// (MeshBasicMaterial) quad always shows exactly what's painted, no lighting
// math involved.
const useCorridorTexture = () => {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 420;
    const ctx = canvas.getContext("2d");

    // Ceiling trapezoid (white, converging toward the back wall)
    ctx.fillStyle = "#f1efe9";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(240, 0);
    ctx.lineTo(186, 60);
    ctx.lineTo(54, 60);
    ctx.closePath();
    ctx.fill();

    // Side walls - warm light beige, like real cleanroom wall panels
    ctx.fillStyle = "#cdc8bd";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(54, 60);
    ctx.lineTo(54, 348);
    ctx.lineTo(0, 420);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(240, 0);
    ctx.lineTo(186, 60);
    ctx.lineTo(186, 348);
    ctx.lineTo(240, 420);
    ctx.closePath();
    ctx.fill();

    // Vertical seam lines on the side walls, mimicking modular panel joints
    ctx.strokeStyle = "#b9b3a7";
    ctx.lineWidth = 1.5;
    [16, 36].forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, 75);
      ctx.lineTo(x, 335);
      ctx.stroke();
    });
    [204, 224].forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, 75);
      ctx.lineTo(x, 335);
      ctx.stroke();
    });

    // Floor - light blue-grey, like cleanroom vinyl flooring
    ctx.fillStyle = "#9fb7bc";
    ctx.beginPath();
    ctx.moveTo(0, 420);
    ctx.lineTo(54, 348);
    ctx.lineTo(186, 348);
    ctx.lineTo(240, 420);
    ctx.closePath();
    ctx.fill();

    // Back wall, glimpsed at the far end of the corridor
    ctx.fillStyle = "#bdb7ac";
    ctx.fillRect(54, 60, 132, 288);

    // Recessed ceiling light panels
    [80, 130].forEach((x) => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x, 40, 30, 14);
      ctx.strokeStyle = "#cfcac0";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, 40, 30, 14);
    });

    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }, []);
};

// Drop the product logo file in public/product-logo/Logo.png - it's picked up
// here by a fixed path, so replacing that file (same exact name) is all a
// future update needs. Filenames are case-sensitive on the live server.
const PRODUCT_LOGO_SRC = "/product-logo/Logo.png";

// Loads the logo as a texture instead of a DOM overlay - a plane in the scene
// rotates/lights with the door leaf for free, and a manual loader (vs.
// drei's suspense-based useTexture) lets a missing file fail silently rather
// than crashing the scene before the user has dropped a logo in.
const useOptionalTexture = (src) => {
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    let active = true;
    new TextureLoader().load(
      src,
      (loaded) => active && setTexture(loaded),
      undefined,
      () => active && setTexture(null)
    );
    return () => {
      active = false;
    };
  }, [src]);
  return texture;
};

// Each leaf swings open about a hinge on its outer edge, like a real double door.
const LEAF_WIDTH = 1.2;
const HINGE_X = 1.22;
const MAX_OPEN_ANGLE = (78 * Math.PI) / 180;

const DoubleLeafDoor = React.memo(({ progress = 0 }) => {
  const logoTexture = useOptionalTexture(PRODUCT_LOGO_SRC);
  const corridorTexture = useCorridorTexture();
  const materials = useMemo(
    () => ({
      frame: new MeshStandardMaterial({
        color: "#2d3748",
        metalness: 0.85,
        roughness: 0.25,
      }),
      panel: new MeshStandardMaterial({
        color: "#f8fafc",
        metalness: 0.2,
        roughness: 0.3,
      }),
      kickplate: new MeshStandardMaterial({
        color: "#e2e8f0",
        metalness: 0.9,
        roughness: 0.15,
      }),
      glass: new MeshStandardMaterial({
        color: "#0F2942",
        metalness: 0.3,
        roughness: 0.1,
        transparent: true,
        opacity: 0.85,
      }),
      handle: new MeshStandardMaterial({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.1,
      }),
    }),
    []
  );

  // Pivot group sits at the hinge (the leaf's outer edge, against the frame)
  // and rotates about Y - the leaf body is nested inside, offset back to its
  // hinge so it swings open like a real door instead of sliding sideways.
  // Sign is flipped vs. what you'd guess: this rotates the leaf's free edge
  // toward +z (out toward the camera/viewer) rather than back into the frame.
  const renderLeaf = (sign) => (
    <group position={[sign * HINGE_X, 0, 0.05]} rotation={[0, sign < 0 ? -progress * MAX_OPEN_ANGLE : progress * MAX_OPEN_ANGLE, 0]}>
      <group position={[-sign * (LEAF_WIDTH / 2), 0, 0]}>
        {/* Leaf Panel */}
        <mesh material={materials.panel}>
          <boxGeometry args={[LEAF_WIDTH, 4.2, 0.15]} />
        </mesh>

        {/* Kickplate */}
        <mesh position={[0, -1.7, 0.08]} material={materials.kickplate}>
          <boxGeometry args={[LEAF_WIDTH, 0.8, 0.02]} />
        </mesh>

        {/* Vision Window */}
        <mesh position={[0, 0.8, 0.08]} material={materials.glass}>
          <boxGeometry args={[0.6, 1.1, 0.02]} />
        </mesh>
        <mesh position={[0, 0.8, 0.09]} material={materials.frame}>
          <boxGeometry args={[0.68, 1.18, 0.01]} />
        </mesh>
        <mesh position={[0, 0.8, 0.095]} material={materials.glass}>
          <boxGeometry args={[0.58, 1.08, 0.02]} />
        </mesh>

        {/* Handle near the inner meeting edge */}
        <mesh position={[sign * -0.48, 0, 0.1]} material={materials.handle}>
          <boxGeometry args={[0.05, 1.0, 0.05]} />
        </mesh>

        {/* Product logo plate, top-left of the left leaf - swings open with the door */}
        {sign < 0 && logoTexture && (
          <mesh position={[-0.22, 1.85, 0.12]}>
            <planeGeometry args={[0.7, 0.32]} />
            <meshBasicMaterial map={logoTexture} transparent toneMapped={false} />
          </mesh>
        )}
      </group>
    </group>
  );

  return (
    <group dispose={null}>
      {/* Static outer frame */}
      <mesh position={[0, 0, -0.05]} material={materials.frame}>
        <boxGeometry args={[2.8, 4.6, 0.1]} />
      </mesh>

      {/* Recessed cleanroom corridor glimpsed through the doorway as the
          leaves swing open - a forced-perspective texture instead of a flat
          painted backdrop, so it reads as depth rather than a black void. */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.4, 4.2]} />
        <meshBasicMaterial map={corridorTexture} toneMapped={false} />
      </mesh>

      {renderLeaf(-1)}
      {renderLeaf(1)}
    </group>
  );
});
DoubleLeafDoor.displayName = "DoubleLeafDoor";

// ThreeScene only ever mounts at >=1024px (Hero.jsx gates it), but a narrow
// laptop/tablet window in that range can still have a weak GPU - antialiasing is
// one of the more expensive parts of the render pass, so skip it below desktop width.
const isNarrowViewport = () => typeof window !== "undefined" && window.innerWidth < 1280;

const ThreeScene = () => {
  // The door itself is static - only the scroll-driven hinge angle changes,
  // so frameloop="demand" re-renders just on that prop update with no
  // per-frame render loop needed.
  const progress = useScrollProgress();

  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[700px]">
      <Canvas
        dpr={1}
        frameloop="demand"
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{
          antialias: !isNarrowViewport(),
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          powerPreference: "high-performance",
        }}
      >
        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight position={[5, 10, 7]} intensity={1.5} color="#ffffff" />

        {/* Single cyan accent light */}
        <spotLight position={[-8, 5, 8]} angle={0.5} penumbra={1} intensity={40} color="#00B4D8" distance={25} />

        <DoubleLeafDoor progress={progress} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
