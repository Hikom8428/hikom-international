import React, { useState } from "react";
import { motion } from "framer-motion";

// Drop each client's logo in public/client-logos/, named exactly after the
// client below (e.g. "Apollo Hospitals.png") - any of these extensions
// works, and replacing that file later needs no code change. Filenames are
// case-sensitive on the live server, so match the name exactly.
const LOGO_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "svg"];

const CLIENT_NAMES = [
  "Yatharth Hospitals",
  "Apollo Hospitals",
  "AIIMS",
  "KIMS Hospitals",
  "Sarvodaya Healthcare",
  "Max Healthcare",
  "Yashoda Hospitals",
  "Indian Navy",
  "Kailash Hospital",
  "Indian Air Force",
  "St. Martha's Hospital",
];

const FALLBACK_ICON = (
  <svg
    className="h-8 w-auto text-gray-400 group-hover:text-[#00B4D8] transition-colors duration-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const ClientLogo = ({ name }) => {
  const [extIndex, setExtIndex] = useState(0);
  const [broken, setBroken] = useState(false);

  if (broken) return FALLBACK_ICON;

  return (
    <img
      src={`/client-logos/${encodeURIComponent(name)}.${LOGO_EXTENSIONS[extIndex]}`}
      alt={name}
      className="h-10 w-auto max-w-[140px] object-contain opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
      onError={() => {
        const next = extIndex + 1;
        if (next < LOGO_EXTENSIONS.length) {
          setExtIndex(next);
        } else {
          setBroken(true);
        }
      }}
    />
  );
};

const Clients = () => {
  const clients = CLIENT_NAMES.map((name) => ({ name }));

  // Duplicate the array to create a seamless infinite loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section id="clients" className="relative py-20 bg-[#0F2942] overflow-hidden border-y border-white/[0.02]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00B4D8]/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-3"
        >
          <span className="h-px w-6 bg-[#00B4D8]"></span>
          <span className="text-[#00B4D8] font-bold tracking-widest uppercase text-xs">
            Trusted Partners
          </span>
          <span className="h-px w-6 bg-[#00B4D8]"></span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-3xl font-extrabold text-white tracking-tight"
        >
          Powering Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-blue-200">Leaders</span>
        </motion.h2>
      </div>

      {/* Infinite Slider Container */}
      <div className="relative z-10 max-w-screen-2xl mx-auto overflow-hidden">

        {/* Left and Right Gradient Masks for smooth fading */}
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#0F2942] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#0F2942] to-transparent z-20 pointer-events-none" />

        {/* Sliding Track */}
        <div className="animate-marquee flex w-max">
          {duplicatedClients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-64 px-8"
            >
              <div className="group relative w-full h-24 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#00B4D8]/30 backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300 flex items-center justify-center px-6 cursor-default">
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#00B4D8]/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />

                <div className="flex flex-col items-center gap-2 relative z-10">
                  <ClientLogo name={client.name} />
                  <span className="text-gray-400 text-sm font-semibold tracking-wide group-hover:text-white transition-colors duration-300">
                    {client.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
