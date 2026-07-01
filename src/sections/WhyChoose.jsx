import React, { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";

// Custom Animated Counter Component
const Counter = ({ from = 0, to, suffix = "" }) => {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1], // Premium easing
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.floor(value) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, suffix]);

  return <span ref={nodeRef} className="text-4xl font-extrabold text-[#00B4D8]">{from}{suffix}</span>;
};

const WhyChoose = () => {
  const reasons = [
    {
      title: "ISO Certified Quality",
      description: "ISO 9001:2015 certified processes ensuring our engineering meets the highest international quality standards.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"></path>
        </svg>
      ),
      stat: null,
    },
    {
      title: "Projects Delivered",
      description: "A proven track record of successful, high-complexity cleanroom installations across multiple sectors.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"></path>
        </svg>
      ),
      stat: { to: 5000, suffix: "+" },
    },
    {
      title: "Expert Engineering Team",
      description: "Our in-house specialists design tailored, technically rigorous solutions for critical contamination control.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.492-3.396c.41-.56.94-1.01 1.54-1.31l-3.37-3.37a4.49 4.49 0 00-6.35 0l-1.06 1.06a4.49 4.49 0 000 6.35l3.37 3.37c.3-.6.75-1.13 1.31-1.54l3.396-2.492z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      stat: null,
    },
    {
      title: "Cleanroom Specialists",
      description: "Dedicated exclusively to sterile environments, giving us unmatched domain expertise and precision.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-.813 2.846a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
        </svg>
      ),
      stat: null,
    },
    {
      title: "On-Time Delivery",
      description: "Optimized manufacturing and logistics pipelines to ensure your critical projects are completed precisely on schedule.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      stat: { to: 100, suffix: "%" },
    },
    {
      title: "Pan India Support",
      description: "Comprehensive nationwide presence providing rapid response, installation, and ongoing maintenance support.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"></path>
        </svg>
      ),
      stat: null,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="relative py-28 bg-[#0F2942] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#00B4D8]/10 to-transparent rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[#0F2942]/80 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-[#00B4D8]"></span>
            <span className="text-[#00B4D8] font-bold tracking-widest uppercase text-xs sm:text-sm">
              The HIKOM Advantage
            </span>
            <span className="h-px w-8 bg-[#00B4D8]"></span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-blue-200">HIKOM?</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg font-light leading-relaxed"
          >
            We blend engineering precision, uncompromising quality, and industry-leading expertise 
            to deliver modular cleanroom infrastructure you can trust.
          </motion.p>
        </div>

        {/* Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-[#00B4D8]/50 backdrop-blur-lg transition-all duration-500 shadow-xl"
            >
              {/* Card Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00B4D8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#0F2942] border border-white/10 flex items-center justify-center text-[#00B4D8] group-hover:bg-[#00B4D8] group-hover:text-[#0F2942] transition-all duration-500 shadow-lg">
                    <div className="w-7 h-7">
                      {reason.icon}
                    </div>
                  </div>

                  {/* Animated Counter (if applicable) */}
                  {reason.stat && (
                    <div className="text-right">
                      <Counter to={reason.stat.to} suffix={reason.stat.suffix} />
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00B4D8] transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {reason.description}
                </p>

                {/* Bottom decorative accent */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#00B4D8] group-hover:w-full transition-all duration-500 ease-in-out" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;