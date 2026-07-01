import { useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";

const EMAILJS_SERVICE_ID = "service_pfg3e7h";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_ll26q8t";
const EMAILJS_AUTOREPLY_TEMPLATE_ID = "template_gkfg7qm";
const EMAILJS_PUBLIC_KEY = "ka7Y-kgsxoRKfzqDl";

const BrochureModal = ({ item, onClose }) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", interested: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const handleClose = () => {
    onClose();
    setForm({ name: "", phone: "", email: "", interested: false });
    setError("");
    setUnlocked(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.phone && form.phone.length < 10) {
      setError("Please enter a valid contact number.");
      return;
    }
    if (!form.interested) {
      setError('Please check "Interested In" to continue.');
      return;
    }

    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: `Interested in: ${item.name} (${item.category})`,
          time: new Date().toLocaleString(),
          title: `Brochure Request - ${item.name}`,
        },
        EMAILJS_PUBLIC_KEY
      );

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY_TEMPLATE_ID,
        { name: form.name, email: form.email, phone: form.phone },
        EMAILJS_PUBLIC_KEY
      );

      setUnlocked(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-5 right-5 text-gray-400 hover:text-[#0F2942] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!unlocked ? (
              <>
                <h3 className="text-2xl font-bold text-[#0F2942] mb-1">Get a Quote</h3>
                <p className="text-gray-500 text-sm mb-6">
                  {item.category} &middot; {item.name}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3.5 rounded-xl bg-gray-100 text-[#0F2942] border border-gray-200 outline-none focus:border-[#00B4D8]"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Contact No."
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full p-3.5 rounded-xl bg-gray-100 text-[#0F2942] border border-gray-200 outline-none focus:border-[#00B4D8]"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3.5 rounded-xl bg-gray-100 text-[#0F2942] border border-gray-200 outline-none focus:border-[#00B4D8]"
                    required
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name="interested"
                      checked={form.interested}
                      onChange={handleChange}
                      className="w-4 h-4 accent-[#00B4D8]"
                    />
                    Interested in {item.name}
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[#0F2942] text-white font-bold uppercase tracking-wide text-sm hover:bg-[#00B4D8] transition-colors disabled:opacity-60"
                  >
                    {loading ? "Submitting..." : "Submit & Unlock Download"}
                  </button>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-[#0F2942] mb-3">Thank You!</h3>
                <p className="text-gray-500 text-sm mb-8">
                  Your details have been received. You can now download the brochure.
                </p>
                <a
                  href={item.file}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#00B4D8] text-[#0F2942] px-6 py-3 rounded-xl font-bold uppercase tracking-wide text-sm hover:opacity-90 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download {item.name}
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrochureModal;
