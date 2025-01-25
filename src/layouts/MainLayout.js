// src/layouts/MainLayout.js
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const MainLayout = () => {
  // Track whether the sidebar is collapsed
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    // A flex container for sidebar + main content
    <div className="flex min-h-screen bg-[#121212] text-white">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
      />
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
