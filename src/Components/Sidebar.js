// src/Components/Sidebar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
  // Track which years are expanded (accordion style).
  // e.g. { 2025: true, 2024: false, 2023: false }
  const [expandedYears, setExpandedYears] = useState({});

  // Toggle expand/collapse for a specific year
  const toggleYear = (year) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
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
        <span className="font-bold text-lg">
          {isCollapsed ? "" : "GameGallery"}
        </span>
        <button
          onClick={onToggleCollapse}
          className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 ml-2 rounded"
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {yearsData.map((yearItem) => {
          const { year, subLinks } = yearItem;
          const isOpen = expandedYears[year] || false;

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
                  <span className="font-semibold text-sm">
                    {String(year).slice(-2)}
                  </span>
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
