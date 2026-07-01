import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { productCategories } from "../constants/productCategories";
import { slugify } from "../utils/slugify";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [logoError, setLogoError] = useState(false);

  // Handle Sticky Navbar Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categoryDropdown = (category) =>
    category.items.map((item) => ({
      name: item,
      href: `/${slugify(category.title)}/${slugify(item)}`,
    }));

  const navLinks = [
    { name: "Home", href: "/#home" },
    {
      name: "About Us",
      href: "/#about",
      dropdown: [
        { name: "Management", href: "/management" },
        { name: "Industries", href: "/#industries" },
        { name: "Projects", href: "/#projects" },
        { name: "Quality", href: "/#certifications" },
        { name: "Clientele", href: "/#clients" },
        { name: "Media", href: "/media" },
      ],
    },
    {
      name: "Clean Room And Pharma Industries",
      href: "/#cleanroom",
      dropdown: categoryDropdown(productCategories[0]),
    },
    {
      name: "Medical Infrastructure",
      href: "/#medical-pharma",
      dropdown: categoryDropdown(productCategories[1]),
    },
    {
      name: "Industrial Doors",
      href: "/#doors",
      dropdown: categoryDropdown(productCategories[2]),
    },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-lg py-3" : "bg-white/95 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer mr-4">
            {logoError ? (
              <span className="text-[#0F2942] font-extrabold text-2xl tracking-tight">
                HIKOM <span className="text-[#00B4D8]">Intl.</span>
              </span>
            ) : (
              <img
                src="/logo/logo-name.png"
                alt="HIKOM International"
                width="500"
                height="74"
                loading="eager"
                decoding="async"
                onError={() => setLogoError(true)}
                className="h-11 w-auto object-contain"
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex space-x-5 items-center">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                onFocus={() => link.dropdown && setActiveDropdown(link.name)}
                onBlur={(e) => {
                  if (link.dropdown && !e.currentTarget.contains(e.relatedTarget)) {
                    setActiveDropdown(null);
                  }
                }}
              >
                <Link
                  to={link.href}
                  onClick={() => setActiveDropdown(null)}
                  className="text-[#0F2942] hover:text-[#00B4D8] font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap transition-colors flex items-center gap-1 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] focus-visible:ring-offset-2"
                >
                  {link.name}
                  {link.dropdown && (
                    <svg
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                        activeDropdown === link.name ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Desktop Dropdown */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 transform -translate-x-1/2 mt-6 w-72 bg-white border border-gray-100 shadow-2xl rounded-xl p-3"
                      >
                        {/* Invisible bridge to keep hover active */}
                        <div className="absolute -top-6 left-0 w-full h-6 bg-transparent" />

                        {link.dropdown.map((item, idx) => {
                          const label = typeof item === "string" ? item : item.name;
                          const itemHref = typeof item === "string" ? "#" : item.href;
                          const isRoute = itemHref.startsWith("/");
                          const LinkTag = isRoute ? Link : "a";
                          const linkProps = isRoute ? { to: itemHref } : { href: itemHref };
                          return (
                            <LinkTag
                              key={idx}
                              {...linkProps}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-start text-[#0F2942] hover:text-[#00B4D8] hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                            >
                              <svg className="w-4 h-4 mr-2 mt-0.5 text-[#00B4D8] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                              {label}
                            </LinkTag>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="text-[#0F2942] hover:text-[#00B4D8] focus:outline-none"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="xl:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <button
                      type="button"
                      className="w-full flex justify-between items-center px-3 py-3 text-[#0F2942] font-semibold hover:text-[#00B4D8] hover:bg-gray-50 rounded-md cursor-pointer"
                      onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                      aria-expanded={activeDropdown === link.name}
                    >
                      <span className="uppercase tracking-wide text-sm">{link.name}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === link.name ? "rotate-180" : ""
                        }`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex justify-between items-center px-3 py-3 text-[#0F2942] font-semibold hover:text-[#00B4D8] hover:bg-gray-50 rounded-md cursor-pointer"
                    >
                      <span className="uppercase tracking-wide text-sm">{link.name}</span>
                    </Link>
                  )}

                  {/* Mobile Dropdown */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pl-6 pr-3 overflow-hidden"
                        >
                          {link.dropdown.map((item, idx) => {
                            const label = typeof item === "string" ? item : item.name;
                            const itemHref = typeof item === "string" ? "#" : item.href;
                            const isRoute = itemHref.startsWith("/");
                            const LinkTag = isRoute ? Link : "a";
                            const linkProps = isRoute ? { to: itemHref } : { href: itemHref };
                            return (
                              <LinkTag
                                key={idx}
                                {...linkProps}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-2 text-sm text-gray-600 hover:text-[#00B4D8]"
                              >
                                - {label}
                              </LinkTag>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;