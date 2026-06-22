import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";
import DoorIllustration from "./DoorIllustration";

// Code-split the three.js/@react-three/fiber bundle out of the main chunk - it's
// ~880KB even fully trimmed (three.js's renderer/shader core isn't tree-shakeable
// below that), so mobile skips it entirely via DoorIllustration below instead.
const ThreeScene = lazy(() => import("./ThreeScene"));

const Hero = React.memo(() => {
  const isMobile = useIsMobile();
  const textRef = useRef(null);
  const [textVisible, setTextVisible] = useState(false);

  // Don't even start the ThreeScene import() until the hero text has actually
  // entered the viewport - decouples the ~880KB three.js fetch from the initial
  // render commit so the text paints first, regardless of network/CPU speed.
  useEffect(() => {
    if (isMobile) return;
    const el = textRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTextVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="home" className="relative min-h-screen bg-[#0F2942] overflow-hidden flex items-center pt-20 lg:pt-0">
      {/* Animated Ambient Background Glow Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2942] via-[#0b1e30] to-[#050f1a] opacity-90" />

        <div className="animate-glow-pulse-a absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#00B4D8] blur-[150px]" />

        <div className="animate-glow-pulse-b absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#00B4D8] blur-[180px]" />

        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            ref={textRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center text-center lg:text-left pt-10 lg:pt-0"
          >
            {/* Company Badge */}
            <motion.div 
              variants={itemVariants} 
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <span className="h-px w-10 bg-[#00B4D8]"></span>
              <span className="text-[#00B4D8] font-bold tracking-widest uppercase text-xs sm:text-sm">
                HIKOM International LLP
              </span>
              <span className="h-px w-10 bg-[#00B4D8] lg:hidden"></span>
            </motion.div>

            {/* TEMPORARY: deployment test marker - remove after verifying auto-deploy */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-block bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-[#00B4D8] text-xs sm:text-sm font-bold uppercase tracking-wide px-4 py-2 rounded-full">
                Updated via GitHub Actions 🚀
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
            >
              Leading the Future of <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-blue-200">
                Cleanroom Manufacturing!
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              Engineered for precision, hygiene, and performance. We deliver advanced 
              contamination-free modular solutions for modern hospitals, pharma industries, 
              and critical care environments.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#products"
                className="w-full sm:w-auto bg-[#00B4D8] text-[#0F2942] px-8 py-4 rounded-md font-bold uppercase tracking-wider text-sm hover:-translate-y-1 transition-all duration-300 shadow-[0_0_20px_rgba(0,180,216,0.3)] text-center"
              >
                Explore Our Products
              </a>
              <a
                href="#quote"
                className="w-full sm:w-auto bg-transparent text-white border border-gray-400 px-8 py-4 rounded-md font-bold uppercase tracking-wider text-sm hover:border-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-center"
              >
                Get a Quote
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[400px] sm:h-[500px] lg:h-[700px] relative flex items-center justify-center"
          >
            {/* Subtle glow behind the 3D model */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00B4D8]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
            
            <div className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing">
              {isMobile ? (
                <DoorIllustration />
              ) : textVisible ? (
                <Suspense fallback={<div className="w-full h-full rounded-3xl bg-white/5 animate-pulse" />}>
                  <ThreeScene />
                </Suspense>
              ) : (
                <div className="w-full h-full rounded-3xl bg-white/5 animate-pulse" />
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});
Hero.displayName = "Hero";

export default Hero;