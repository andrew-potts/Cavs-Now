import React from "react";
import { Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#860038] text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Cleveland Cavaliers</h3>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.ticketmaster.com/"
                  className="text-gray-300 hover:text-white"
                >
                  Tickets
                </a>
              </li>
              <li>
                <a href="/team" className="text-gray-300 hover:text-white">
                  Team
                </a>
              </li>
              <li>
                <a href="/news" className="text-gray-300 hover:text-white">
                  News
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/cavs"
                className="hover:text-gray-300"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://facebook.com/cavs"
                className="hover:text-gray-300"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com/cavs"
                className="hover:text-gray-300"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>This is a fan website.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
