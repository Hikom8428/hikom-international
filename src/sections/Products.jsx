// src/sections/Products.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { productCategories } from "../constants/productCategories";
import { productDescriptions } from "../constants/productDescriptions";
import { slugify } from "../utils/slugify";

const DEFAULT_DESCRIPTION =
  "Engineered to the highest standards of precision, hygiene, and durability, this solution is built for hospitals, pharmaceutical manufacturers, and critical-care facilities that demand uncompromising contamination control.";

// Card photos can be dropped in as any of these formats - on a load error we
// just try the next extension instead of requiring a fixed type.
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "svg"];
const PHOTOS_PER_PRODUCT = 4;
const ROTATE_INTERVAL_MS = 3000;

// Every item across all three categories gets a catalog card here, generated
// straight from productCategories - add/rename an item there and it shows up
// (and links to its real product page) automatically, no manual card upkeep.
const products = productCategories.flatMap((category) => {
  const categorySlug = slugify(category.title);
  return category.items.map((item) => {
    const itemSlug = slugify(item);
    const key = `${categorySlug}/${itemSlug}`;
    return {
      key,
      title: item,
      description: productDescriptions[key] || DEFAULT_DESCRIPTION,
      link: `/${categorySlug}/${itemSlug}`,
    };
  });
});

// Tries every extension for a given photo-Na until one actually loads, or
// resolves null if none of them exist. Each product detail frame is its own
// 2-photo (a/b) carousel - the card here just shows the "a" photo of each of
// the 4 frames, so it stays in sync with whatever the detail page resolves.
const resolvePhoto = (key, photoNumber) =>
  new Promise((resolve) => {
    let extIndex = 0;
    const tryNext = () => {
      if (extIndex >= IMAGE_EXTENSIONS.length) {
        resolve(null);
        return;
      }
      const src = `/products/${key}/photo-${photoNumber}a.${IMAGE_EXTENSIONS[extIndex]}`;
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

// Auto-rotating carousel for a single card - resolves which of photo-1..4
// actually exist once on mount, then crossfades between just those (pausing
// while hovered so the zoom-on-hover effect isn't fighting a slide change).
const ProductCardImage = ({ productKey, title }) => {
  const [photos, setPhotos] = useState(null);
  const [slide, setSlide] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    let active = true;
    Promise.all(
      Array.from({ length: PHOTOS_PER_PRODUCT }, (_, i) => resolvePhoto(productKey, i + 1))
    ).then((results) => {
      if (active) setPhotos(results.filter(Boolean));
    });
    return () => {
      active = false;
    };
  }, [productKey]);

  useEffect(() => {
    if (!photos || photos.length < 2) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setSlide((s) => (s + 1) % photos.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [photos]);

  if (photos === null) {
    return <div className="w-full h-full" />;
  }

  if (photos.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <svg className="w-10 h-10 text-[#00B4D8]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={photos[slide]}
          src={photos[slide]}
          alt={title}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
      </AnimatePresence>
      {photos.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1.5">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                i === slide ? "bg-[#00B4D8]" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Products = React.memo(() => {
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
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section id="products" className="relative py-24 bg-[#0F2942] overflow-hidden">
      {/* Background Subtle Highlights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00B4D8]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-[#00B4D8]"></span>
            <span className="text-[#00B4D8] font-bold tracking-widest uppercase text-sm">
              Premium Solutions
            </span>
            <span className="h-px w-8 bg-[#00B4D8]"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Our Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-blue-200">Catalog</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 text-base md:text-lg font-light leading-relaxed"
          >
            Discover our comprehensive range of high-performance doors and modular panels,
            engineered for absolute precision, hygiene, and durability in critical environments.
          </motion.p>
        </div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.key}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-[#13304d] border border-white/5 hover:border-[#00B4D8]/30 rounded-2xl transition-all duration-500 overflow-hidden shadow-lg hover:shadow-[0_15px_40px_rgba(0,180,216,0.15)] flex flex-col h-full"
            >
              {/* Premium Image Header with Carousel + Hover Zoom */}
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-[#13304d] to-[#0a1c2e]">
                <div className="absolute inset-0 bg-[#0F2942]/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <ProductCardImage productKey={product.key} title={product.title} />
                {/* Bottom gradient fade into card */}
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#13304d] to-transparent z-10 pointer-events-none" />
              </div>

              <div className="relative z-20 flex-grow p-6 pt-2">
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00B4D8] transition-colors duration-300">
                  {product.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="relative z-20 mt-auto p-6 pt-0 border-t border-transparent group-hover:border-white/5 transition-colors duration-300">
                <Link
                  to={product.link}
                  className="inline-flex items-center text-[#00B4D8] font-semibold text-sm uppercase tracking-wider hover:text-white transition-colors"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});
Products.displayName = "Products";

export default Products;
