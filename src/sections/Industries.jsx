// src/sections/Industries.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const Industries = React.memo(() => {
  const [brokenImages, setBrokenImages] = useState({});
  const industries = [
    {
      title: "Hospitals & Healthcare",
      description: "Sterile, hermetically sealed environments tailored for operating theaters, ICUs, and advanced critical care units.",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Pharmaceuticals",
      description: "Contamination-free zones ensuring strict regulatory compliance for drug manufacturing, testing, and packaging.",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Biotechnology",
      description: "Precision-controlled modular cleanrooms engineered for sensitive biological research, cell cultures, and development.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Research Laboratories",
      description: "Advanced containment solutions designed for maximum safety, hygiene, and efficiency in high-tech scientific facilities.",
      // Original photo-1581093458791-9f3c3900df4b returned 404 - reusing the
      // Biotechnology photo (already verified working) until a unique one is added.
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Food Processing",
      description: "Hygienic paneling and specialized doors engineered to meet strict food safety, sanitation, and temperature control standards.",
      image: "https://i.postimg.cc/CLg07HKY/food-processing.webp",
    },
    {
      title: "Medical Device Mfg.",
      description: "Particulate-free environments crucial for the flawless assembly, testing, and packaging of critical medical instruments.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="industries" className="relative py-28 bg-[#0F2942] overflow-hidden">
      {/* Background Gradient & Ambient Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2942] via-[#0b1e30] to-[#050f1a]" />
        <div className="animate-opacity-pulse absolute top-0 left-[-10%] w-[500px] h-[500px] bg-[#00B4D8] rounded-full blur-[150px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "48px 48px"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-[#00B4D8]"></span>
            <span className="text-[#00B4D8] font-bold tracking-widest uppercase text-xs sm:text-sm">
              Global Applications
            </span>
            <span className="h-px w-8 bg-[#00B4D8]"></span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Industries We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-blue-200">Serve</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg font-light leading-relaxed"
          >
            Delivering uncompromising cleanliness and precision engineering to the world's most critical and demanding sectors.
          </motion.p>
        </div>

        {/* Industries Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative h-[350px] lg:h-[400px] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Premium Background Image */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#13304d] to-[#0a1c2e]">
                {!brokenImages[index] && (
                  <img
                    src={industry.image}
                    alt={industry.title}
                    loading="lazy"
                    decoding="async"
                    onError={() => setBrokenImages((b) => ({ ...b, [index]: true }))}
                    className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                )}
              </div>

              {/* Glassmorphism Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2942] via-[#0F2942]/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
              
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-wide group-hover:text-[#00B4D8] transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {industry.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed font-light opacity-0 transform translate-y-8 transition-all duration-500 delay-75 group-hover:opacity-100 group-hover:translate-y-0">
                  {industry.description}
                </p>

                {/* Aesthetic 'Learn More' Indicator */}
                <div className="mt-6 flex items-center text-[#00B4D8] font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  Explore Solutions
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Decorative Border Glow */}
              <div className="absolute inset-0 border border-white/10 group-hover:border-[#00B4D8]/50 rounded-2xl transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});
Industries.displayName = "Industries";

export default Industries;