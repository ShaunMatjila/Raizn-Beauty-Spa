"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="bg-white backdrop-blur-lg border border-white/30 rounded-xl px-6 py-2.5 flex justify-between items-center shadow-lg">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <span className="font-bold text-xl text-primary tracking-tight">
              Raizn Beauty Spa
            </span>
          </Link>

          {/* Center Nav Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.href.startsWith("/")) {
                // External link - use Next.js Link
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-sm font-medium cursor-pointer uppercase"
                  >
                    {item.name}
                  </Link>
                );
              } else {
                // Internal anchor - use scroll behavior
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-sm font-medium cursor-pointer uppercase"
                  >
                    {item.name}
                  </a>
                );
              }
            })}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* <Link
              href="/login"
              className="bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition-colors duration-200 text-sm font-medium shadow-sm"
            >
              Log In
            </Link> */}
            <Link
              href="/admin/login"
              onClick={(e) => e.preventDefault()}
              className="bg-primary text-primary-foreground px-4 py-2.5 rounded-xl transition-colors duration-200 text-sm font-medium shadow-sm opacity-50 cursor-not-allowed"
            >
              Login
            </Link>
            {/* <Link
              href="/signup"
              className="bg-green-600 text-white px-6 py-2.5 rounded-full hover:bg-green-700 transition-colors duration-200 text-sm font-medium shadow-sm"
            >
              Sign Up
            </Link> */}
          </div>

          {/* Mobile / Tablet Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-900 focus:outline-none p-1 rounded-lg hover:bg-gray-100/50 transition-colors"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-200 ${
                isMobileMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Menu */}
      <div
        className={`fixed top-[5.5rem] left-0 right-0 z-40 w-full px-[2.5%] transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl p-4 shadow-lg w-full">
          <div className="flex flex-col space-y-1">
            {/* Mobile / Tablet Nav Links */}
            {navItems.map((item) => {
              if (item.href.startsWith("/")) {
                // External link - use Next.js Link
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-base font-medium py-3 px-4 rounded-lg hover:bg-gray-100/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              } else {
                // Internal anchor - use scroll behavior
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-base font-medium py-3 px-4 rounded-lg hover:bg-gray-100/50"
                  >
                    {item.name}
                  </a>
                );
              }
            })}

            {/* Mobile / Tablet Auth Buttons */}
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200/50 mt-4">
              {/* <Link
                href="/login"
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200 text-base font-medium text-center shadow-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Link> */}
              <Link
                href="/admin/login"
                onClick={(e) => e.preventDefault()}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl transition-colors duration-200 text-base font-medium text-center shadow-sm opacity-50 cursor-not-allowed"
              >
                Login
              </Link>
              {/* <Link
                href="/signup"
                className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-200 text-base font-medium text-center shadow-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
