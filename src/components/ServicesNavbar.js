"use client";
import Link from "next/link";
import { useState } from "react";

export default function ServicesNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="bg-white backdrop-blur-lg border border-white/30 rounded-xl px-6 py-2.5 flex justify-between items-center shadow-lg">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <span className="font-semibold text-xl text-green-600 tracking-tight">
              Raizn Beauty Spa
            </span>
          </Link>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/login"
              onClick={(e) => e.preventDefault()}
              className="bg-green-600 text-white px-4 py-2.5 rounded-xl transition-colors duration-200 text-sm font-medium shadow-sm opacity-50 cursor-not-allowed"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
            {/* Mobile / Tablet Auth Buttons */}
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200/50 mt-4">
              <Link
                href="/admin/login"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-green-600 text-white px-6 py-2.5 rounded-xl transition-colors duration-200 text-sm font-medium shadow-sm text-center opacity-50 cursor-not-allowed"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
