import React from "react";
import { Link } from "react-router-dom";
import { CircleDot } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-[#860038] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <CircleDot size={32} />
            <span className="font-bold text-xl">Cleveland Cavaliers</span>
          </Link>
          <div className="flex space-x-8">
            <Link to="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link
              to="/roster"
              className="hover:text-gray-300 transition-colors"
            >
              Roster
            </Link>
            <Link to="/stats" className="hover:text-gray-300 transition-colors">
              Stats
            </Link>
            <Link
              to="/schedule"
              className="hover:text-gray-300 transition-colors"
            >
              Schedule
            </Link>
            <Link
              to="/standings"
              className="hover:text-gray-300 transition-colors"
            >
              Standings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
