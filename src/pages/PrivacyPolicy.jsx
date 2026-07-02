import { motion } from "framer-motion";
import { useSeo } from "../hooks/useSeo";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const LAST_UPDATED = "July 2, 2026";

const PrivacyPolicy = () => {
  useSeo("privacy-policy", {
    title: "Privacy Policy | HIKOM International LLP",
    description: "How HIKOM International LLP collects, uses, and protects information submitted through this website.",
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
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-blue-200">Policy</span>
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
            <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
            <p>
              HIKOM International LLP ("HIKOM", "we", "us", or "our") respects your privacy. This
              Privacy Policy explains what information we collect through hikom.in (the
              "Website"), how we use it, and the choices you have.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3">
              We only collect information you choose to submit to us. When you use our Contact
              form, we collect:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your phone number (optional)</li>
              <li>The message you send us</li>
            </ul>
            <p className="mt-3">
              The Website does not use analytics or advertising cookies, and we do not track your
              browsing activity across other sites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p>
              Information submitted through the Contact form is used solely to respond to your
              inquiry - for example, to provide product information, quotations, or follow up on
              a request. We do not use this information for marketing without your consent.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">4. Sharing of Information</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. Your
              contact form submission is delivered to us via a third-party email delivery service
              (EmailJS), which processes the message solely to route it to our team and is bound
              by its own privacy and security practices.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">5. Data Retention</h2>
            <p>
              We retain inquiry information for as long as necessary to respond to your request
              and maintain business records, after which it may be deleted.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of any personal information
              you have submitted to us by contacting us using the details below.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">7. Third-Party Links</h2>
            <p>
              The Website may link to third-party sites (such as social media pages). We are not
              responsible for the privacy practices of those external sites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated "Last updated" date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">9. Contact Us</h2>
            <p>
              For questions about this Privacy Policy, contact us at{" "}
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

export default PrivacyPolicy;
