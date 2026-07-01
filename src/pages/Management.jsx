import { useState } from "react";
import { motion } from "framer-motion";
import { useSeo } from "../hooks/useSeo";

// Photo file can be dropped in as any of these formats - on a load error we
// just try the next extension instead of requiring a fixed type, so
// jpg/jpeg/png/webp/svg all work without further code changes.
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "svg"];

// TODO: replace with the real name, designation, bio and LinkedIn URL.
// TODO: drop the actual photo at public/md-photo.* (any extension above).
const md = {
  name: "Shrey Bafna",
  designation: "Managing Director",
  bio: "With over a decade of experience in industrial infrastructure and contamination-control engineering, our Managing Director has been the driving force behind HIKOM International's commitment to precision, hygiene, and uncompromising quality. Under this leadership, HIKOM has grown into a trusted partner for hospitals, pharmaceutical manufacturers, and critical-care facilities across the country.",
  linkedin: "https://www.linkedin.com/in/shrey-bafna-044728118/",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Management = () => {
  const [photoError, setPhotoError] = useState(false);
  const [photoExtIndex, setPhotoExtIndex] = useState(0);
  const mdPhoto = `/md-photo.${IMAGE_EXTENSIONS[photoExtIndex]}`;

  useSeo("management", {
    title: "Management | HIKOM International LLP",
    description: `Meet ${md.name}, ${md.designation} at HIKOM International LLP, leading the company's commitment to precision, hygiene, and uncompromising quality in industrial infrastructure.`,
  });

  return (
    <main className="bg-[#0F2942]">
      {/* Page Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00B4D8]/5 blur-[150px] rounded-full mix-blend-screen" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-[#00B4D8]"></span>
            <span className="text-[#00B4D8] font-bold tracking-widest uppercase text-xs sm:text-sm">
              About HIKOM International
            </span>
            <span className="h-px w-8 bg-[#00B4D8]"></span>
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Management &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-blue-200">
              Leadership
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-10 bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:border-[#00B4D8]/30 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#13304d] to-[#0a1c2e] border border-white/10 flex items-center justify-center text-[#00B4D8] mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Our Vision</h2>
              <p className="text-gray-400 text-base font-light leading-relaxed">
                To be the most trusted name in contamination-free infrastructure, setting the global
                benchmark for precision-engineered cleanrooms, modular panels, and specialized doors
                across the healthcare and pharmaceutical industries.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl p-10 bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:border-[#00B4D8]/30 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#13304d] to-[#0a1c2e] border border-white/10 flex items-center justify-center text-[#00B4D8] mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Our Mission</h2>
              <p className="text-gray-400 text-base font-light leading-relaxed">
                To engineer and deliver uncompromising quality, hygiene, and safety solutions that
                empower hospitals, pharmaceutical manufacturers, and critical-care facilities to
                operate at the highest standards, backed by innovation, integrity, and customer-first
                service.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MD Profile */}
      <section className="relative py-20 border-t border-white/[0.05]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="relative w-full max-w-sm mx-auto aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                {photoError ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#13304d] to-[#0a1c2e]">
                    <svg className="w-24 h-24 text-[#00B4D8]/40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-9 1.79-9 4.5V21h18v-2.5c0-2.71-5.134-4.5-9-4.5z" />
                    </svg>
                  </div>
                ) : (
                  <img
                    src={mdPhoto}
                    alt={md.name}
                    width="800"
                    height="800"
                    loading="lazy"
                    decoding="async"
                    onError={() => {
                      const nextExt = photoExtIndex + 1;
                      if (nextExt < IMAGE_EXTENSIONS.length) {
                        setPhotoExtIndex(nextExt);
                      } else {
                        setPhotoError(true);
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <span className="text-[#00B4D8] font-bold tracking-widest uppercase text-xs sm:text-sm">
                Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-1 tracking-tight">
                {md.name}
              </h2>
              <p className="text-gray-400 font-semibold uppercase tracking-wide text-sm mb-6">
                {md.designation}
              </p>
              <p className="text-gray-400 text-base font-light leading-relaxed mb-8">{md.bio}</p>

              <a
                href={md.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/10 text-white px-5 py-2.5 rounded-md text-sm font-bold uppercase tracking-wide hover:bg-[#00B4D8] hover:text-[#0F2942] hover:border-[#00B4D8] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                Connect on LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Management;
