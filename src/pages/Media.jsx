import { motion } from "framer-motion";
import { useSeo } from "../hooks/useSeo";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Single company-wide brochure - drop it at public/brochures/company-brochure.pdf.
const COMPANY_BROCHURE = "/brochures/company-brochure.pdf";
const COMPANY_LOGO = "/logo/logo-name.png";

const Media = () => {
  useSeo("media", {
    title: "Press & Media | HIKOM International LLP",
    description:
      "Company brochure and media resources for HIKOM International LLP - cleanroom, modular OT, and technical door manufacturer.",
  });

  return (
    <main className="bg-[#0F2942] min-h-screen">
      {/* Page Header */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00B4D8]/5 blur-[150px] rounded-full mix-blend-screen" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-[#00B4D8]"></span>
            <span className="text-[#00B4D8] font-bold tracking-widest uppercase text-xs sm:text-sm">
              Press &amp; Media
            </span>
            <span className="h-px w-8 bg-[#00B4D8]"></span>
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6"
          >
            Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-blue-200">Kit</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg font-light leading-relaxed"
          >
            Company overview, brand assets, and brochure downloads for journalists, partners, and
            media professionals covering HIKOM International.
          </motion.p>
        </div>
      </section>

      {/* Downloads */}
      <section className="relative py-12 border-t border-white/[0.05]">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Company Brochure */}
            <div className="rounded-2xl p-8 bg-white/[0.02] border border-white/5 hover:border-[#00B4D8]/30 transition-all duration-300 flex flex-col items-start gap-4">
              <svg className="w-10 h-10 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <h3 className="text-xl font-bold text-white">Company Brochure</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Full overview of HIKOM's product range, capabilities, and certifications in a
                single downloadable PDF.
              </p>
              <a
                href={COMPANY_BROCHURE}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 bg-[#00B4D8] text-[#0F2942] px-5 py-3 rounded-md font-bold uppercase tracking-wide text-sm hover:opacity-90 transition-colors"
              >
                Download Brochure
              </a>
            </div>

            {/* Company Logo */}
            <div className="rounded-2xl p-8 bg-white/[0.02] border border-white/5 hover:border-[#00B4D8]/30 transition-all duration-300 flex flex-col items-start gap-4">
              <svg className="w-10 h-10 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <h3 className="text-xl font-bold text-white">Company Logo</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Official HIKOM International logo for use in press coverage, partner listings,
                and media features.
              </p>
              <a
                href={COMPANY_LOGO}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 bg-[#00B4D8] text-[#0F2942] px-5 py-3 rounded-md font-bold uppercase tracking-wide text-sm hover:opacity-90 transition-colors"
              >
                Download Logo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Media Inquiries */}
      <section className="relative py-12 border-t border-white/[0.05]">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Media Inquiries</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            For interviews, partnership features, or additional media assets, reach out to our
            team directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="mailto:info@hikom.com" className="text-[#00B4D8] hover:text-white font-semibold transition-colors">
              info@hikom.com
            </a>
            <a href="tel:+919015055777" className="text-[#00B4D8] hover:text-white font-semibold transition-colors">
              +91 90150 55777
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Media;
