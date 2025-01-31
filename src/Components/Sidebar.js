import React from "react";
import { Link } from "react-router-dom";
import CeemotGif from "../images/CeemotIcon.gif";
import { motion, AnimatePresence } from "framer-motion";

// same yearsData definition
const yearsData = [
  {
    year: 2025,
    subLinks: [
      { label: "Full List", path: "/GameGallery/2025/full" },
      { label: "Game of the Year", path: "/GameGallery/2025/goty" },
    ],
  },
  {
    year: 2024,
    subLinks: [
      { label: "Full List", path: "/GameGallery/2024/full" },
      { label: "Game of the Year", path: "/GameGallery/2024/goty" },
    ],
  },
  {
    year: 2023,
    subLinks: [
      { label: "Full List", path: "/GameGallery/2023/full" },
      { label: "Game of the Year", path: "/GameGallery/2023/goty" },
    ],
  },
];

export default function Sidebar({ isCollapsed, onToggleCollapse }) {
  const [expandedYear, setExpandedYear] = React.useState(null);

  const toggleYear = (year) => {
    if (isCollapsed) return;
    setExpandedYear((prevYear) => (prevYear === year ? null : year));
  };

  return (
    <div
      className={`h-full flex flex-col bg-[#1e1e1e] ${
        isCollapsed ? "pointer-events-none" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-gray-800">
        {/* If not collapsed, show the logo. If collapsed, maybe show a small icon */}
        {!isCollapsed ? (
          <Link to="/GameGallery">
            <div
              className="bg-center bg-no-repeat bg-contain w-[180px] h-[60px]"
              style={{ backgroundImage: `url(${CeemotGif})` }}
            />
          </Link>
        ) : (
          <div
            className="w-10 h-10 bg-center bg-no-repeat bg-contain"
            style={{}}
          />
        )}

        {/* Toggle button */}
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-md hover:bg-gray-700 text-white transition transform hover:scale-105 pointer-events-auto"
        >
          {isCollapsed ? ">" : "X"}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {yearsData.map(({ year, subLinks }) => {
          const isYearOpen = expandedYear === year;

          return (
            <div key={year} className="mb-2">
              {/* Clickable year */}
              <div
                onClick={() => toggleYear(year)}
                className="
                  flex items-center justify-between
                  cursor-pointer
                  px-2 py-2
                  rounded
                  transition-colors
                  mb-1
                  hover:bg-gray-600
                "
              >
                <span className="font-semibold">{year}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isYearOpen ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              {/* Expand sub-links with framer-motion */}
              <AnimatePresence>
                {!isCollapsed && isYearOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-6 overflow-hidden"
                  >
                    {subLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="
                          block px-2 py-1 rounded
                          hover:bg-gray-600
                          transition-colors
                        "
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
