import { lazy, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import WhyChoose from "../sections/WhyChoose";
import ContactCTA from "../sections/ContactCTA";
import ContactForm from "../sections/ContactForm";
import LazySection from "../components/LazySection";
import { useSeo } from "../hooks/useSeo";

const HOME_SEO_FALLBACK = {
  title: "HIKOM International LLP | Cleanroom, Modular OT & Technical Door Manufacturer",
  description:
    "HIKOM International LLP is an ISO 9001:2015 certified manufacturer specializing in Cleanrooms, Modular Operation Theatres, Technical Doors, Pharmaceutical Infrastructure and Healthcare Solutions.",
  image: "https://hikom.in/logo/logo-name.png",
};

// Each of these only loads once it's about to scroll into view, instead of all
// loading right after Hero mounts.
const Products = lazy(() => import("../sections/Products"));
const Industries = lazy(() => import("../sections/Industries"));
const Projects = lazy(() => import("../sections/Projects"));
const Certifications = lazy(() => import("../sections/Certifications"));
const Clients = lazy(() => import("../sections/Clients"));

function Home() {
  const location = useLocation();

  useSeo("home", HOME_SEO_FALLBACK);

  useEffect(() => {
    // location.key is "default" only for the page's very first location (a hard
    // refresh or a fresh load) - skipping it stops a stale hash left over in the
    // URL bar from previous browsing re-triggering a scroll-down on every reload.
    // In-app nav clicks (e.g. "Industries Served") always get a fresh key, so
    // those still scroll to the right section as expected.
    if (!location.hash || location.key === "default") return;
    // The target section may be a lazy-loaded chunk that hasn't finished mounting
    // yet, so retry briefly instead of a single immediate querySelector attempt.
    let attempts = 0;
    let timeoutId;
    const tryScroll = () => {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempts < 20) {
        attempts += 1;
        timeoutId = setTimeout(tryScroll, 100);
      }
    };
    tryScroll();
    return () => clearTimeout(timeoutId);
  }, [location.key, location.hash]);

  return (
    <>
      <Hero />
      <LazySection anchorId="products">
        <Products />
      </LazySection>
      <LazySection anchorId="industries">
        <Industries />
      </LazySection>
      <WhyChoose />
      <LazySection anchorId="projects">
        <Projects />
      </LazySection>
      <LazySection anchorId="certifications">
        <Certifications />
      </LazySection>
      <LazySection anchorId="clients">
        <Clients />
      </LazySection>
      <ContactCTA />
      <ContactForm />
    </>
  );
}

export default Home;
