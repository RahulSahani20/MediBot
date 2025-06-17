import React from 'react';
import { FaFacebookF, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';
import { PiXLogoBold } from 'react-icons/pi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-white text-4xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-indigo-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18m9-9H3" />
              </svg>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>About</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>Terms of service</li>
                <li>Privacy policy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400">© 2025 Your Company, Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-lg text-gray-400">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <PiXLogoBold className="hover:text-white cursor-pointer" />
            <FaGithub className="hover:text-white cursor-pointer" />
            <FaYoutube className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
