import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-4 bg-white sticky top-0 z-40 shadow-sm w-full">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="font-bold text-xl text-brand-600 hover:opacity-90 transition-opacity">
            Verify<span className="text-brand-800">Check</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6 text-sm font-medium">
            <a
              href="#services"
              className="text-gray-700 hover:text-brand-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#benefits"
              className="text-gray-700 hover:text-brand-600 transition-colors"
            >
              Benefits
            </a>
            <a
              href="#industries"
              className="text-gray-700 hover:text-brand-600 transition-colors"
            >
              Industries
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-brand-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-brand-600 transition-colors"
            >
              Testimonials
            </a>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700"
          >
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-4 z-50 animate-fade-in">
            <nav className="flex flex-col space-y-3 text-sm font-medium">
              <a
                href="#services"
                className="text-gray-700 hover:text-brand-600 transition-colors py-2"
              >
                Services
              </a>
              <a
                href="#benefits"
                className="text-gray-700 hover:text-brand-600 transition-colors py-2"
              >
                Benefits
              </a>
              <a
                href="#industries"
                className="text-gray-700 hover:text-brand-600 transition-colors py-2"
              >
                Industries
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-brand-600 transition-colors py-2"
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-brand-600 transition-colors py-2"
              >
                Testimonials
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
