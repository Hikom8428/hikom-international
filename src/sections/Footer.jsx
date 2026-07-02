import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [logoError, setLogoError] = useState(false);

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Industries Served", href: "#" },
    { name: "Projects Showcase", href: "#" },
    { name: "Certifications", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  const products = [
    { name: "Fire Rated Doors", href: "#" },
    { name: "Anti Radiation Doors", href: "#" },
    { name: "Medical OT Doors", href: "#" },
    { name: "Clean Room Doors", href: "#" },
    { name: "Sliding & Hinged Doors", href: "#" },
    { name: "Insulated Panels", href: "#" },
  ];

  return (
    <footer className="relative bg-[#050f1a] pt-20 pb-10 border-t border-white/[0.05] overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#00B4D8]/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00B4D8]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Company Info (Takes up more space) */}
          <div className="lg:col-span-4">
            <div className="flex-shrink-0 flex items-center cursor-pointer mb-6">
              {logoError ? (
                <span className="text-white font-extrabold text-2xl tracking-tight">
                  HIKOM <span className="text-[#00B4D8]">Intl.</span>
                </span>
              ) : (
                <img
                  src="/logo/logo-name.png"
                  alt="HIKOM International"
                  width="500"
                  height="74"
                  onError={() => setLogoError(true)}
                  loading="lazy"
                  decoding="async"
                  className="h-8 w-auto object-contain"
                />
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light mb-8 pr-4">
              Engineering the future of contamination-free modular solutions. We deliver uncompromising precision, hygiene, and durability for the world's most critical environments.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/hikom-international-llp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
                className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#00B4D8] hover:text-[#0F2942] hover:border-[#00B4D8] transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61557992475083"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#00B4D8] hover:text-[#0F2942] hover:border-[#00B4D8] transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/hikominternationalllp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#00B4D8] hover:text-[#0F2942] hover:border-[#00B4D8] transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@Hikom_International"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on YouTube"
                className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#00B4D8] hover:text-[#0F2942] hover:border-[#00B4D8] transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-[#00B4D8] text-sm font-light transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-[1px] bg-[#00B4D8] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">
              Premium Solutions
            </h3>
            <ul className="space-y-4">
              {products.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-[#00B4D8] text-sm font-light transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-[1px] bg-[#00B4D8] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">
              Contact Us
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00B4D8] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-gray-400 text-sm font-light leading-relaxed">
                  2F Ecotech-II, Udyog Vihar,<br />
                  Greater Noida, Uttar Pradesh,<br />
                  India - 201306
                </span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-[#00B4D8] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href="tel:+919015055777" className="text-gray-400 hover:text-[#00B4D8] text-sm font-light transition-colors">
                  +91 90150 55777
                </a>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-[#00B4D8] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:info@hikom.com" className="text-gray-400 hover:text-[#00B4D8] text-sm font-light transition-colors">
                  info@hikom.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs font-light">
            &copy; {currentYear} HIKOM International LLP. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-xs font-light transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-white text-xs font-light transition-colors">
              Terms of Service
            </Link>
            <a href="/sitemap.xml" className="text-gray-400 hover:text-white text-xs font-light transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;