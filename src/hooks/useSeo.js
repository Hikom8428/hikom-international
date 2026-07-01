import { useEffect } from "react";

// Data file written by the PHP admin panel at /seo-admin/ - lives directly on
// the live server (gitignored, never part of the Vite build) so admin edits
// there go live immediately without a new deploy.
const SEO_DATA_URL = "/seo-admin/seo-data.json";

let cachedSeoData = null;
let fetchPromise = null;

const loadSeoData = () => {
  if (cachedSeoData) return Promise.resolve(cachedSeoData);
  if (!fetchPromise) {
    fetchPromise = fetch(SEO_DATA_URL)
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        cachedSeoData = data;
        return data;
      })
      .catch(() => ({}));
  }
  return fetchPromise;
};

const upsertMeta = (attr, value, content) => {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const applySeo = ({ title, description, image }) => {
  if (title) document.title = title;
  upsertMeta("name", "description", description);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:image", image);
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", image);
};

// Sets title/meta-description/OG+Twitter tags for the current page. Applies
// `fallback` (the page's own sensible default) immediately so there's no
// flash of wrong content, then overrides with whatever the SEO admin panel
// has saved for `pageKey`, if anything.
export const useSeo = (pageKey, fallback = {}) => {
  const { title: fallbackTitle, description: fallbackDescription, image: fallbackImage } = fallback;

  useEffect(() => {
    let active = true;

    applySeo({ title: fallbackTitle, description: fallbackDescription, image: fallbackImage });

    loadSeoData().then((data) => {
      if (!active) return;
      const entry = data?.[pageKey];
      if (!entry) return;
      applySeo({
        title: entry.title || fallbackTitle,
        description: entry.description || fallbackDescription,
        image: entry.image || fallbackImage,
      });
    });

    return () => {
      active = false;
    };
  }, [pageKey, fallbackTitle, fallbackDescription, fallbackImage]);
};
