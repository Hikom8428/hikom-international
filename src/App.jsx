import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./sections/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";

// Lazy-load route-specific pages so their code (and the constants/components they
// pull in, e.g. BrochureModal) isn't shipped on every first page load - only Home
// needs to be in the main bundle, the rest can wait until that route is visited.
const Management = lazy(() => import("./pages/Management"));
const Media = lazy(() => import("./pages/Media"));
const Gallery = lazy(() => import("./pages/Gallery"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));

// Matches each lazy page's own bg-[#0F2942] so there's no white flash while it loads.
const PageFallback = () => <div className="min-h-screen bg-[#0F2942]" />;

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/management" element={<Management />} />
            <Route path="/media" element={<Media />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/:categorySlug/:itemSlug" element={<ProductDetail />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />

      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}

export default App;