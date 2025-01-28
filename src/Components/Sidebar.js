import React, { useState } from "react";
import { Link } from "react-router-dom";
import CeemotGif from "../images/CeemotIcon.gif";
import CGif from "../images/CIcon.gif";

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
  // Track which year is currently expanded (accordion style).
  // Store only one expanded year (e.g., 2025).
  const [expandedYear, setExpandedYear] = useState(null);

  // Toggle expand/collapse for a specific year.
  const toggleYear = (year) => {
    setExpandedYear((prevYear) => (prevYear === year ? null : year));
  };

  return (
    <div
      className={`
        text-white
        shadow-xl
        flex flex-col
        transition-all duration-300
      `}
      style={{
        width: isCollapsed ? "4rem" : "16rem", // 64px vs 256px
      }}
    >
      <div className="flex items-center justify-between px-3 py-4 border-b">
        <div className="flex items-center">
          {isCollapsed ? (
            ""
          ) : (
            <img src={CeemotGif} alt="Ceemot Logo" className="h-50" />
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="bg-gray-800 hover:bg-gray-500 text-white px-2 py-1 ml-2 rounded"
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {yearsData.map((yearItem) => {
          const { year, subLinks } = yearItem;
          const isOpen = expandedYear === year;

          return (
            <div key={year} className="mb-2">
              <div
                onClick={() => toggleYear(year)}
                className="
                  flex items-center
                  cursor-pointer
                  px-2 py-2
                  rounded
                  transition-colors
                  mb-1
                "
              >
                {isCollapsed ? (
                  <span className="font-semibold"></span>
                ) : (
                  <span className="font-semibold">{year}</span>
                )}
              </div>

              {!isCollapsed && isOpen && (
                <div className="ml-4 space-y-1">
                  {subLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="
                        block px-2 py-1 rounded
                        transition-colors
                      "
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
