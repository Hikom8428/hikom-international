import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSeo } from "../hooks/useSeo";

// Photo files can be dropped in as any of these formats - on a load error we
// just try the next extension instead of requiring every photo to be a fixed
// type, so jpg/jpeg/png/webp/svg all work without per-file configuration.
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "svg"];

// Upper bound on how many photo-N.* files we'll look for - the grid only
// ever renders however many of these actually resolve, so dropping fewer (or
// more, up to this cap) photos into public/media/gallery just works with no
// count to update.
const MAX_GALLERY_PHOTOS = 60;

// TODO: replace with real video files at the same paths once available
const galleryVideos = [
  { title: "Factory Walkthrough", src: "/media/gallery/video-1.mp4" },
  { title: "Cleanroom Installation", src: "/media/gallery/video-2.mp4" },
  { title: "Product Showcase", src: "/media/gallery/video-3.mp4" },
];

// Tries every extension for a given photo-N until one actually loads, or
// resolves null if none of them exist.
const resolvePhoto = (n) =>
  new Promise((resolve) => {
    let extIndex = 0;
    const tryNext = () => {
      if (extIndex >= IMAGE_EXTENSIONS.length) {
        resolve(null);
        return;
      }
      const src = `/media/gallery/photo-${n}.${IMAGE_EXTENSIONS[extIndex]}`;
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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Gallery = () => {
  const [galleryPhotos, setGalleryPhotos] = useState(null);

  useSeo("gallery", {
    title: "Gallery | HIKOM International LLP",
    description:
      "Photos and videos of HIKOM International LLP's cleanroom, modular OT, and technical door installations.",
  });

  useEffect(() => {
    let active = true;
    Promise.all(
      Array.from({ length: MAX_GALLERY_PHOTOS }, (_, i) => resolvePhoto(i + 1))
    ).then((results) => {
      if (active) setGalleryPhotos(results.filter(Boolean));
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="bg-[#0F2942]">
      {/* Page Header */}
      <section className="relative pt-40 pb-16 overflow-hidden">
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
              Photos &amp; Videos
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-blue-200">
              Gallery
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Gallery: Pictures */}
      <section className="relative py-12">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Pictures</h2>
          {galleryPhotos && galleryPhotos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryPhotos.map((src, idx) => (
                <div
                  key={src}
                  className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#13304d] to-[#0a1c2e]"
                >
                  <img
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="800"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery: Videos */}
      <section className="relative py-12">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryVideos.map((video, idx) => (
              <div
                key={idx}
                className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#13304d] to-[#0a1c2e]"
              >
                <video src={video.src} controls preload="metadata" className="w-full h-full object-cover" />
                <span className="absolute top-3 left-4 text-white text-sm font-semibold drop-shadow pointer-events-none">
                  {video.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Gallery;
