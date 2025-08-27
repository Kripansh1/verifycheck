import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div>
            <div className="font-bold text-xl mb-4">
              Verify<span className="text-brand-500">Check</span>
            </div>
            <p className="text-gray-400 mb-4">
              Comprehensive background verification services for businesses of all sizes.
              Trusted by companies across India for accurate and reliable checks.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/verifycheck/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Background Checks</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Identity Verification</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Education Verification</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Criminal Record Checks</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Employment History</a></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
              <li>
                <a href="/b2c/profile-verification" className="text-gray-400 hover:text-white">
                  B2C Profile Verification
                </a>
              </li>
              <li><a href="#benefits" className="text-gray-400 hover:text-white">Benefits</a></li>
              <li><a href="#industries" className="text-gray-400 hover:text-white">Industries</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white">How It Works</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>

            </ul>
          </div>
        </div>

        {/* Bottom footer with copyright and address */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} VerifyCheck. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm">
              <address className="not-italic">
                Bangalore , Karnataka India | <a href="tel:+9340128637" className="hover:text-white">+91 9340128637</a>
              </address>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
