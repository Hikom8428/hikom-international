import { motion } from "framer-motion";
import { useSeo } from "../hooks/useSeo";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const LAST_UPDATED = "July 2, 2026";

const TermsOfService = () => {
  useSeo("terms-of-service", {
    title: "Terms of Service | HIKOM International LLP",
    description: "The terms and conditions governing use of the HIKOM International LLP website.",
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
              Legal
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
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-blue-200">Service</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm font-light"
          >
            Last updated: {LAST_UPDATED}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12 border-t border-white/[0.05]">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-gray-300 text-sm leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using hikom.in (the "Website"), operated by HIKOM International LLP
              ("HIKOM", "we", "us", or "our"), you agree to be bound by these Terms of Service. If
              you do not agree, please do not use the Website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">2. Use of the Website</h2>
            <p>
              This Website is provided to give information about HIKOM's products, services, and
              company background, and to allow visitors to make inquiries. You agree to use the
              Website only for lawful purposes and not to interfere with its normal operation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">3. Intellectual Property</h2>
            <p>
              All content on this Website - including text, images, logos, product photos, and
              brochures - is the property of HIKOM International LLP unless otherwise noted, and
              may not be reproduced or used without our prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">4. Product Information</h2>
            <p>
              Product descriptions, specifications, and images on this Website are provided for
              general reference and are subject to change without notice. Final specifications,
              pricing, and availability will be confirmed directly with our team.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">5. Inquiries and Quotations</h2>
            <p>
              Submitting an inquiry or requesting a quotation through this Website does not
              constitute a binding order or contract. Any commercial agreement is formed only
              through a separate, formal agreement between you and HIKOM International LLP.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">6. Limitation of Liability</h2>
            <p>
              While we make reasonable efforts to keep information on this Website accurate and
              up to date, HIKOM International LLP makes no warranties, express or implied,
              regarding the completeness or accuracy of the content, and is not liable for any
              loss or damage arising from reliance on this Website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">7. Third-Party Links</h2>
            <p>
              This Website may contain links to third-party websites (such as social media). We
              are not responsible for the content or practices of any linked external sites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">8. Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of India, and any disputes shall be
              subject to the exclusive jurisdiction of the courts having jurisdiction over Greater
              Noida, Uttar Pradesh.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">9. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Changes will be posted on
              this page with an updated "Last updated" date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">10. Contact Us</h2>
            <p>
              For questions about these Terms of Service, contact us at{" "}
              <a href="mailto:info@hikom.com" className="text-[#00B4D8] hover:text-white transition-colors">
                info@hikom.com
              </a>{" "}
              or{" "}
              <a href="tel:+919015055777" className="text-[#00B4D8] hover:text-white transition-colors">
                +91 90150 55777
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsOfService;
