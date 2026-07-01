import React from "react";
import { motion } from "framer-motion";

const Certifications = () => {
  const certifications = [
    {
      title: "ISO 9001:2015",
      subtitle: "Quality Management System",
      description: "Certified for maintaining rigorous international standards in engineering, manufacturing, and customer satisfaction.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"></path>
        </svg>
      ),
    },
    
    
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Apple-style premium easing
      },
    },
  };

  return (
    <section id="certifications" className="relative py-28 bg-[#0F2942] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[#00B4D8]/5 blur-[150px] rounded-full mix-blend-screen" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-[#00B4D8]"></span>
            <span className="text-[#00B4D8] font-bold tracking-widest uppercase text-xs sm:text-sm">
              Global Standards
            </span>
            <span className="h-px w-8 bg-[#00B4D8]"></span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Accreditations & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-blue-200">Certifications</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg font-light leading-relaxed"
          >
            Our commitment to absolute quality, safety, and precision is validated by the world's most rigorous industrial regulatory bodies.
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl p-8 bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.04] hover:border-[#00B4D8]/30 transition-all duration-500 shadow-2xl overflow-hidden cursor-default flex flex-col h-full text-center items-center"
            >
              {/* Premium Inner Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#00B4D8]/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Icon / Logo Placeholder */}
              <div className="relative mb-8">
                {/* Subtle back-glow for the icon */}
                <div className="absolute inset-0 bg-[#00B4D8] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#13304d] to-[#0a1c2e] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center text-white group-hover:text-[#00B4D8] group-hover:scale-110 transition-all duration-500 z-10">
                  <div className="w-10 h-10">
                    {cert.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-1 tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00B4D8] group-hover:to-blue-200 transition-all duration-300">
                  {cert.title}
                </h3>
                <h4 className="text-[#00B4D8] text-xs font-semibold uppercase tracking-widest mb-4 opacity-80">
                  {cert.subtitle}
                </h4>
                <p className="text-gray-400 text-sm font-light leading-relaxed mt-auto">
                  {cert.description}
                </p>
              </div>

              {/* Bottom Edge Accent */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#00B4D8] to-transparent group-hover:w-full transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Certifications;