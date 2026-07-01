import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { productCategories } from "../constants/productCategories";
import { productDescriptions } from "../constants/productDescriptions";
import { productPhotoCaptions } from "../constants/productPhotoCaptions";
import { productPhotoDescriptions } from "../constants/productPhotoDescriptions";
import { slugify } from "../utils/slugify";
import BrochureModal from "../components/BrochureModal";
import { useSeo } from "../hooks/useSeo";

const DEFAULT_DESCRIPTION =
  "Engineered to the highest standards of precision, hygiene, and durability, this solution is built for hospitals, pharmaceutical manufacturers, and critical-care facilities that demand uncompromising contamination control.";

// Photo files can be dropped in as any of these formats - on a load error we
// just try the next extension instead of requiring every photo to be a fixed
// type, so jpg/jpeg/png/webp/svg all work without per-file configuration.
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "svg"];
// Each of the 4 frames is its own 2-photo carousel - drop photo-1a/photo-1b
// for frame 1, photo-2a/photo-2b for frame 2, and so on through frame 4.
const FRAME_SUFFIXES = ["a", "b"];
const ROTATE_INTERVAL_MS = 3000;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Tries every extension for a given photo-Nx until one actually loads, or
// resolves null if none of them exist.
const resolvePhoto = (categorySlug, itemSlug, frameNumber, suffix) =>
  new Promise((resolve) => {
    let extIndex = 0;
    const tryNext = () => {
      if (extIndex >= IMAGE_EXTENSIONS.length) {
        resolve(null);
        return;
      }
      const src = `/products/${categorySlug}/${itemSlug}/photo-${frameNumber}${suffix}.${IMAGE_EXTENSIONS[extIndex]}`;
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => {
        extIndex += 1;
        tryNext();
      };
      img.src = src;
    };
    tryNext();
  });

const MAX_FRAMES = 4;

// Resolves which of the MAX_FRAMES frames actually have photos dropped in
// (photo-{N}a / photo-{N}b), skipping frames with none entirely so the grid
// only ever shows as many boxes as there are real photos.
const useResolvedFrames = (categorySlug, itemSlug) => {
  const [frames, setFrames] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all(
      Array.from({ length: MAX_FRAMES }, (_, i) => {
        const frameNumber = i + 1;
        return Promise.all(
          FRAME_SUFFIXES.map((suffix) => resolvePhoto(categorySlug, itemSlug, frameNumber, suffix))
        ).then((results) => ({ frameNumber, photos: results.filter(Boolean) }));
      })
    ).then((results) => {
      if (active) setFrames(results.filter((frame) => frame.photos.length > 0));
    });
    return () => {
      active = false;
    };
  }, [categorySlug, itemSlug]);

  return frames;
};

// One "frame" in the Photos grid - an auto-rotating 2-photo carousel (pausing
// on hover) over whichever of photo-{N}a / photo-{N}b were actually resolved,
// falling back to a single static photo if only one exists.
const PhotoFrame = ({ photos, caption, onOpenLightbox }) => {
  const [slide, setSlide] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (photos.length < 2) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setSlide((s) => (s + 1) % photos.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [photos]);

  return (
    <button
      type="button"
      onClick={() => onOpenLightbox(photos[slide], caption)}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      className="relative block w-full h-full cursor-zoom-in"
      aria-label={`View larger image: ${caption}`}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={photos[slide]}
          src={photos[slide]}
          alt={caption}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
      {photos.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1.5">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                i === slide ? "bg-[#00B4D8]" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </button>
  );
};

const ProductDetail = () => {
  const { categorySlug, itemSlug } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [fullDescriptionIndex, setFullDescriptionIndex] = useState(null);

  const category = productCategories.find((c) => slugify(c.title) === categorySlug);
  const itemName = category?.items.find((i) => slugify(i) === itemSlug);
  const frames = useResolvedFrames(categorySlug, itemSlug);

  useSeo(`${categorySlug}/${itemSlug}`, {
    title: category && itemName ? `${itemName} | ${category.title} | HIKOM International LLP` : undefined,
    description: productDescriptions[`${categorySlug}/${itemSlug}`] || DEFAULT_DESCRIPTION,
  });

  if (!category || !itemName) {
    return (
      <main className="bg-[#0F2942] min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <Link to="/" className="text-[#00B4D8] font-semibold hover:underline">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // There's a single company-wide brochure (not one per product) - drop it
  // at public/brochures/company-brochure.pdf.
  const file = "/brochures/company-brochure.pdf";
  const description = productDescriptions[`${categorySlug}/${itemSlug}`] || DEFAULT_DESCRIPTION;
  // TODO: drop real photos/video at public/products/<category>/<item>/...
  const captions = productPhotoCaptions[`${categorySlug}/${itemSlug}`] || ["Photo 1", "Photo 2", "Photo 3", "Photo 4"];
  const photoDescriptions = productPhotoDescriptions[`${categorySlug}/${itemSlug}`] || captions;
  const video = `/products/${categorySlug}/${itemSlug}/video.mp4`;

  return (
    <main className="bg-[#0F2942]">
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00B4D8]/5 blur-[150px] rounded-full mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-[#00B4D8]"></span>
            <span className="text-[#00B4D8] font-bold tracking-widest uppercase text-xs sm:text-sm">
              {category.title}
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
            {itemName}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-10"
          >
            {description}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setSelectedItem({ name: itemName, category: category.title, file })}
              className="bg-[#00B4D8] text-[#0F2942] px-8 py-4 rounded-md font-bold uppercase tracking-wider text-sm hover:-translate-y-1 transition-all duration-300 shadow-[0_0_20px_rgba(0,180,216,0.3)]"
            >
              Get a Quote
            </button>
          </motion.div>
        </div>
      </section>

      {/* Photos & Video */}
      <section className="relative py-16 border-t border-white/[0.05]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">Photos &amp; Video</h2>

          {frames && frames.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {frames.map(({ frameNumber, photos }) => {
                const idx = frameNumber - 1;
                return (
                  <div
                    key={frameNumber}
                    className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#13304d] to-[#0a1c2e]"
                  >
                    <div className="aspect-square rounded-t-2xl overflow-hidden">
                      <PhotoFrame
                        photos={photos}
                        caption={captions[idx]}
                        onOpenLightbox={(src, caption) => setLightbox({ src, caption })}
                      />
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-gray-400 text-xs leading-relaxed">{captions[idx]}</p>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mt-1.5">
                        {photoDescriptions[idx]}
                      </p>
                      <button
                        type="button"
                        onClick={() => setFullDescriptionIndex(idx)}
                        className="text-[#00B4D8] text-xs font-bold uppercase tracking-wide mt-1.5 hover:underline"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#13304d] to-[#0a1c2e]">
            <video src={video} controls preload="metadata" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Other items in this category */}
      <section className="relative py-16 border-t border-white/[0.05]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">
            More in {category.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items
              .filter((i) => i !== itemName)
              .map((i) => (
                <Link
                  key={i}
                  to={`/${categorySlug}/${slugify(i)}`}
                  className="rounded-2xl p-6 bg-white/[0.02] border border-white/5 hover:border-[#00B4D8]/30 transition-all duration-300 text-white font-medium text-sm flex items-center justify-between gap-3"
                >
                  {i}
                  <svg className="w-4 h-4 text-[#00B4D8] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                loading="lazy"
                decoding="async"
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-gray-300 text-sm text-center mt-4">{lightbox.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Description Popup */}
      <AnimatePresence>
        {fullDescriptionIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setFullDescriptionIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setFullDescriptionIndex(null)}
                aria-label="Close"
                className="absolute top-5 right-5 text-gray-400 hover:text-[#0F2942] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className="text-[#00B4D8] font-bold tracking-widest uppercase text-xs">Description</span>
              <p className="text-[#0F2942] text-sm font-medium leading-relaxed mt-3 max-h-[60vh] overflow-y-auto">
                {photoDescriptions[fullDescriptionIndex]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BrochureModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  );
};

export default ProductDetail;
