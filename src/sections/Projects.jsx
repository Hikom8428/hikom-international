// src/sections/Projects.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const Projects = React.memo(() => {
  const [brokenImages, setBrokenImages] = useState({});
  const projects = [
    {
      title: "Apollo Hospital OT Project",
      category: "Healthcare Infrastructure",
      description: "State-of-the-art modular operating theater designed for absolute sterility, precision airflow, and zero-downtime performance.",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Pharma Cleanroom Installation",
      category: "Pharmaceutical Setup",
      description: "ISO Class 5 cleanroom facility featuring specialized insulated panels, seamless flooring, and automated hermetic sliding doors.",
      image: "https://i.postimg.cc/rwZ7BSqy/Pharma-cleanroom-installation.webp?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Radiation Shielding Room",
      category: "Specialized Containment",
      description: "Custom lead-lined doors and shielding partitions engineered for advanced oncology and diagnostic imaging centers.",
      image: "https://i.postimg.cc/KzGLtggr/radiation-sheilding-room.jpg?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Research Laboratory Setup",
      category: "Biotech & Research",
      description: "End-to-end BSL-3 laboratory implementation with custom hermetic sealing, integrated airlocks, and premium hygienic paneling.",
      image: "https://i.postimg.cc/JhbcNLYk/research-laborarory-setup.png?auto=format&fit=crop&q=80&w=1200",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="projects" className="relative py-28 bg-[#0F2942] overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00B4D8]/5 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#0F2942] rounded-full blur-[120px] shadow-[0_0_100px_rgba(0,180,216,0.1)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="h-px w-8 bg-[#00B4D8]"></span>
              <span className="text-[#00B4D8] font-bold tracking-widest uppercase text-xs sm:text-sm">
                Featured Work
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            >
              Projects <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-blue-200">Showcase</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-md md:text-right"
          >
            Explore our portfolio of high-precision cleanroom installations and contamination-free structural solutions.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Background Image with Hover Zoom */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#13304d] to-[#0a1c2e]">
                {!brokenImages[index] && (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    onError={() => setBrokenImages((b) => ({ ...b, [index]: true }))}
                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                  />
                )}
              </div>

              {/* Glassmorphism / Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2942] via-[#0F2942]/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

              {/* Content Container */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                
                {/* Category Tag */}
                <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#00B4D8] text-xs font-bold uppercase tracking-wider mb-4 shadow-xl">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-lg opacity-0 transform translate-y-8 transition-all duration-500 delay-75 group-hover:opacity-100 group-hover:translate-y-0 line-clamp-3">
                  {project.description}
                </p>

                {/* CTA Button */}
                <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="inline-flex items-center text-white font-semibold text-sm uppercase tracking-wider group-hover:text-[#00B4D8] transition-colors duration-300">
                    View Project
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative Border Glow on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00B4D8]/40 rounded-3xl transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#all-projects"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white uppercase tracking-widest overflow-hidden rounded-full bg-[#0b1e30] border border-[#00B4D8]/30 hover:border-[#00B4D8] transition-colors"
          >
            <span className="absolute inset-0 bg-[#00B4D8] w-0 group-hover:w-full transition-all duration-500 ease-out" />
            <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
              View All Projects
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
});
Projects.displayName = "Projects";

export default Projects;