// src/layouts/MainLayout.js
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
// 1) Import from framer-motion
import { motion, AnimatePresence } from "framer-motion";

const MainLayout = () => {
  // Track whether the sidebar is collapsed
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#111111] text-white">
      {/* 2) Animate the sidebar's width */}
      <AnimatePresence initial={false}>
        <motion.div
          // Since the sidebar is always visible in some form (expanded or collapsed),
          // we control its width with Framer Motion. We don't unmount it, so no 'exit' is needed.
          animate={{ width: isCollapsed ? 64 : 256 }} // Adjust to your preference
          transition={{ duration: 0.3 }}
          // Ensures content doesn't overflow when collapsed
          className="overflow-hidden"
          key="sidebar"
        >
          <Sidebar
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
